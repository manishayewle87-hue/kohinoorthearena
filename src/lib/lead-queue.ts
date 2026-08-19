import fs from 'fs';
import path from 'path';

export type LeadPayload = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  configuration?: string;
  domain: string;
  source?: string;
  utm?: Record<string, unknown>;
  ip: string;
  timestamp: string;
  attempts: number;
  lastAttemptAt?: string;
  status: 'pending' | 'sent' | 'failed';
  error?: string;
};

const OUTBOX_FILE = '/tmp/arena_lead_outbox.json';

// In-memory memory fallback buffer if file system is read-only
const inMemoryQueue: LeadPayload[] = [];

// ── 1. Read Outbox Queue Safely ─────────────────────────────────
export function getPendingLeads(): LeadPayload[] {
  try {
    if (fs.existsSync(OUTBOX_FILE)) {
      const data = fs.readFileSync(OUTBOX_FILE, 'utf8');
      const leads = JSON.parse(data) as LeadPayload[];
      return leads.filter(l => l.status === 'pending' || l.status === 'failed');
    }
  } catch {
    // Fall back to in-memory queue
  }
  return inMemoryQueue.filter(l => l.status === 'pending' || l.status === 'failed');
}

// ── 2. Enqueue Lead to Outbox ────────────────────────────────────
export function enqueueLead(lead: Omit<LeadPayload, 'id' | 'attempts' | 'status'>): LeadPayload {
  const newLead: LeadPayload = {
    ...lead,
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    attempts: 0,
    status: 'pending',
  };

  inMemoryQueue.push(newLead);

  try {
    let existing: LeadPayload[] = [];
    if (fs.existsSync(OUTBOX_FILE)) {
      try {
        existing = JSON.parse(fs.readFileSync(OUTBOX_FILE, 'utf8'));
      } catch {}
    }
    existing.push(newLead);
    // Keep last 100 leads to prevent unbounded disk growth
    const trimmed = existing.slice(-100);
    fs.writeFileSync(OUTBOX_FILE, JSON.stringify(trimmed, null, 2), 'utf8');
  } catch {
    // In-memory fallback is active
  }

  return newLead;
}

// ── 3. Mark Lead as Successfully Sent ───────────────────────────
export function markLeadSent(id: string): void {
  const memLead = inMemoryQueue.find(l => l.id === id);
  if (memLead) {
    memLead.status = 'sent';
  }

  try {
    if (fs.existsSync(OUTBOX_FILE)) {
      const existing: LeadPayload[] = JSON.parse(fs.readFileSync(OUTBOX_FILE, 'utf8'));
      const target = existing.find(l => l.id === id);
      if (target) {
        target.status = 'sent';
        fs.writeFileSync(OUTBOX_FILE, JSON.stringify(existing, null, 2), 'utf8');
      }
    }
  } catch {}
}

// ── 4. Record Lead Delivery Failure ──────────────────────────────
export function recordLeadFailure(id: string, error: string): void {
  const memLead = inMemoryQueue.find(l => l.id === id);
  if (memLead) {
    memLead.attempts += 1;
    memLead.status = 'failed';
    memLead.error = error;
    memLead.lastAttemptAt = new Date().toISOString();
  }

  try {
    if (fs.existsSync(OUTBOX_FILE)) {
      const existing: LeadPayload[] = JSON.parse(fs.readFileSync(OUTBOX_FILE, 'utf8'));
      const target = existing.find(l => l.id === id);
      if (target) {
        target.attempts += 1;
        target.status = 'failed';
        target.error = error;
        target.lastAttemptAt = new Date().toISOString();
        fs.writeFileSync(OUTBOX_FILE, JSON.stringify(existing, null, 2), 'utf8');
      }
    }
  } catch {}
}

// ── 5. Enterprise Input Sanitizer & XSS Shield ──────────────────
export function deepSanitize(val: unknown): string {
  if (typeof val !== 'string') return '';
  return val
    .trim()
    .slice(0, 500)
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '');
}

// ── 6. Disposable Email & Spam Detection ─────────────────────────
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'tempmail.com', '10minutemail.com', 'guerrillamail.com',
  'throwawaymail.com', 'sharklasers.com', 'yopmail.com', 'dispostable.com',
]);

export function isDisposableEmail(email?: string): boolean {
  if (!email || !email.includes('@')) return false;
  const domain = email.split('@')[1]?.toLowerCase().trim();
  return DISPOSABLE_DOMAINS.has(domain);
}

// ── 7. Strict Indian Telecom Mobile Validator ────────────────────
export function validatePhone(phone: string): { valid: boolean; normalized: string; error?: string } {
  if (!phone) return { valid: false, normalized: '', error: 'Phone number is required.' };
  
  // Extract all digits
  const digits = phone.replace(/\D/g, '');

  // Case A: 10 digits starting with 6, 7, 8, 9 (Indian Mobile)
  if (digits.length === 10 && /^[6-9]/.test(digits)) {
    return { valid: true, normalized: `+91${digits}` };
  }

  // Case B: 12 digits starting with 91 followed by 6-9
  if (digits.length === 12 && digits.startsWith('91') && /^[6-9]/.test(digits.slice(2))) {
    return { valid: true, normalized: `+${digits}` };
  }

  // Case C: International number between 7 and 15 digits
  if (digits.length >= 7 && digits.length <= 15) {
    return { valid: true, normalized: `+${digits}` };
  }

  return { valid: false, normalized: phone, error: 'Please enter a valid 10-digit mobile number.' };
}
