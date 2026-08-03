import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

// ─────────────────────────────────────────────
// 1. RATE LIMITER (In-memory, per IP)
//    Limits: 3 submissions per 10 minutes per IP
// ─────────────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (record.count >= RATE_LIMIT_MAX) {
    return true;
  }
  record.count += 1;
  return false;
}

// ─────────────────────────────────────────────
// 2. INPUT SANITIZER (Strips HTML/script tags)
// ─────────────────────────────────────────────
function sanitize(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .slice(0, 500) // Hard max length
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// ─────────────────────────────────────────────
// 3. INPUT VALIDATOR
// ─────────────────────────────────────────────
function validate(name: string, phone: string): string | null {
  if (!name || name.length < 2) return 'Name must be at least 2 characters.';
  if (!phone || !/^[0-9\s\+\-\(\)]{7,15}$/.test(phone)) return 'A valid phone number is required.';
  return null; // null = valid
}

// ─────────────────────────────────────────────
// 4. FETCH WITH TIMEOUT WRAPPER
// ─────────────────────────────────────────────
async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = 8000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

// ─────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    // ── A. Request Size Guard (max 16KB) ──────
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 16_000) {
      return NextResponse.json({ success: false, error: 'Payload too large.' }, { status: 413 });
    }

    // ── B. Rate Limit Check ───────────────────
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait 10 minutes before submitting again.' },
        { status: 429 }
      );
    }

    // ── C. Parse & Validate Body ──────────────
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid JSON payload.' }, { status: 400 });
    }

    // ── D. Honeypot Check (bots fill this field) ──
    if (body.website) {
      // Silent success to confuse bots
      return NextResponse.json({ success: true, message: 'Received.' }, { status: 200 });
    }

    // ── E. Sanitize all inputs ────────────────
    const name = sanitize(body.name);
    const phone = sanitize(body.phone);
    const email = sanitize(body.email);
    const source = sanitize(body.source);

    // ── F. Server-side Validation ─────────────
    const validationError = validate(name, phone);
    if (validationError) {
      return NextResponse.json({ success: false, error: validationError }, { status: 422 });
    }

    // ── G. Build safe UTM block for email ─────
    const utmRaw = typeof body.utm === 'object' && body.utm !== null ? body.utm as Record<string, unknown> : {};
    const utmHtml = Object.keys(utmRaw).length > 0
      ? Object.entries(utmRaw)
          .map(([k, v]) => `<li><strong>${sanitize(k)}:</strong> ${sanitize(String(v))}</li>`)
          .join('')
      : '<li>Direct / Organic (no UTM params)</li>';

    // ─────────────────────────────────────────
    // STEP 1: Nodemailer Email
    // ─────────────────────────────────────────
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;
    let emailStatus = 'skipped';

    if (EMAIL_USER && EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: EMAIL_USER, pass: EMAIL_PASS },
          pool: true,
        });

        await transporter.sendMail({
          from: `"Arena Leads 🏠" <${EMAIL_USER}>`,
          to: 'propsmartrealty@gmail.com',
          replyTo: email || EMAIL_USER,
          subject: `🏠 New Lead: ${name} — Mahalaxmi The Arena`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;">
              <div style="background:#0D0818;padding:24px;text-align:center;">
                <h1 style="color:#DFFE00;margin:0;font-size:22px;">🏠 New Lead — Mahalaxmi The Arena</h1>
              </div>
              <div style="padding:24px;background:#fff;">
                <table cellpadding="10" width="100%" style="border-collapse:collapse;">
                  <tr style="background:#f9f9f9;">
                    <td style="font-weight:bold;width:140px;border:1px solid #eee;">Name</td>
                    <td style="border:1px solid #eee;">${name}</td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold;border:1px solid #eee;">Phone</td>
                    <td style="border:1px solid #eee;"><a href="tel:${phone}">${phone}</a></td>
                  </tr>
                  <tr style="background:#f9f9f9;">
                    <td style="font-weight:bold;border:1px solid #eee;">Email</td>
                    <td style="border:1px solid #eee;">${email || '—'}</td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold;border:1px solid #eee;">Source</td>
                    <td style="border:1px solid #eee;font-size:12px;">${source || 'Direct'}</td>
                  </tr>
                  <tr style="background:#f9f9f9;">
                    <td style="font-weight:bold;border:1px solid #eee;">Timestamp</td>
                    <td style="border:1px solid #eee;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold;border:1px solid #eee;">IP</td>
                    <td style="border:1px solid #eee;font-size:12px;">${ip}</td>
                  </tr>
                </table>

                <h3 style="margin-top:20px;color:#0D0818;">Ad Attribution (UTM)</h3>
                <ul style="padding-left:16px;color:#555;">${utmHtml}</ul>
              </div>
              <div style="background:#f5f5f5;padding:12px;text-align:center;font-size:11px;color:#999;">
                Sent by Antigravity God-Tier Lead Engine • ${new Date().toISOString()}
              </div>
            </div>
          `,
        });

        emailStatus = 'sent';
        console.log(`[LEAD] Email sent for ${name} (${phone}) from ${ip}`);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`[LEAD][ERROR] Nodemailer failed: ${msg}`);
        emailStatus = `failed: ${msg}`;
      }
    } else {
      console.warn('[LEAD] EMAIL_USER or EMAIL_PASS env vars not set.');
    }

    // ─────────────────────────────────────────
    // STEP 2: CRM Webhook (non-blocking, with timeout)
    // ─────────────────────────────────────────
    const CRM_WEBHOOK_URL = process.env.CRM_WEBHOOK_URL;
    if (CRM_WEBHOOK_URL) {
      fetchWithTimeout(CRM_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, source, utm: utmRaw, timestamp: new Date().toISOString(), ip }),
      }).catch(err => console.error('[LEAD][CRM] Webhook failed:', err));
    }

    // ─────────────────────────────────────────
    // STEP 3: WhatsApp Cloud API (non-blocking, with timeout)
    // ─────────────────────────────────────────
    const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
    const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID;
    if (WHATSAPP_TOKEN && WHATSAPP_PHONE_ID && phone) {
      const cleanPhone = phone.replace(/[^0-9]/g, '');
      fetchWithTimeout(
        `https://graph.facebook.com/v19.0/${WHATSAPP_PHONE_ID}/messages`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: cleanPhone,
            type: 'template',
            template: {
              name: 'brochure_delivery',
              language: { code: 'en' },
              components: [{ type: 'body', parameters: [{ type: 'text', text: name }] }],
            },
          }),
        },
        8000
      ).catch(err => console.error('[LEAD][WHATSAPP] API failed:', err));
    }

    // Return success. Email status logged.
    console.log(`[LEAD] Processing complete for ${name}. Email status: ${emailStatus}`);
    return NextResponse.json(
      { success: true, message: 'Lead received. Our team will contact you shortly.' },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
          'X-Content-Type-Options': 'nosniff',
        },
      }
    );

  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('[LEAD][FATAL]', msg);
    return NextResponse.json(
      { success: false, error: 'Server error. Please try calling us directly.' },
      { status: 500 }
    );
  }
}

// Block all other HTTP methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
}
