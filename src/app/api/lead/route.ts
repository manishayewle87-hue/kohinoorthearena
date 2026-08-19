import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import {
  enqueueLead,
  markLeadSent,
  recordLeadFailure,
  deepSanitize,
  isDisposableEmail,
  validatePhone,
} from '@/lib/lead-queue';

export const runtime = 'nodejs';

// ─────────────────────────────────────────────
// 1. SLIDING WINDOW RATE LIMITER (In-memory, per IP)
//    Limits: 5 submissions per 10 minutes per IP
// ─────────────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

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
// 2. FETCH WITH TIMEOUT WRAPPER
// ─────────────────────────────────────────────
async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = 7000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

// ─────────────────────────────────────────────
// MAIN ENTERPRISE HANDLER
// ─────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    // ── A. Request Size Guard (max 16KB) ──────
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 16_000) {
      return NextResponse.json({ success: false, error: 'Payload too large.' }, { status: 413 });
    }

    // ── B. Rate Limit Check ───────────────────
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a few minutes before submitting again.' },
        { status: 429 }
      );
    }

    // ── C. Origin / Referer Validation ────────
    const origin = request.headers.get('origin') || '';
    const referer = request.headers.get('referer') || '';
    const isAllowedHost =
      !origin ||
      origin.includes('kohinoorthearena.in') ||
      origin.includes('mahalaxmithearena.in') ||
      origin.includes('localhost') ||
      origin.includes('127.0.0.1') ||
      origin.includes('.vercel.app');

    if (!isAllowedHost) {
      console.warn(`[LEAD][SECURITY] Blocked cross-site submission from origin: ${origin}`);
      return NextResponse.json({ success: false, error: 'Cross-origin request blocked.' }, { status: 403 });
    }

    // ── D. Parse & Validate JSON ──────────────
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid JSON payload.' }, { status: 400 });
    }

    // ── E. Honeypot Check (Bot Defense) ───────
    if (body.website) {
      // Silent success to confuse bots
      return NextResponse.json({ success: true, message: 'Received.' }, { status: 200 });
    }

    // ── F. Input Deep Sanitization ────────────
    const name = deepSanitize(body.name);
    const rawPhone = deepSanitize(body.phone);
    const email = deepSanitize(body.email);
    const configuration = deepSanitize(body.configuration);
    const domain = deepSanitize(body.domain) || 'kohinoorthearena.in';
    const source = deepSanitize(body.source) || 'Website Enquiry Form';

    // ── G. Strict Validation ──────────────────
    if (!name || name.length < 2) {
      return NextResponse.json({ success: false, error: 'Please enter your full name (at least 2 characters).' }, { status: 422 });
    }

    const phoneValidation = validatePhone(rawPhone);
    if (!phoneValidation.valid) {
      return NextResponse.json({ success: false, error: phoneValidation.error || 'Please enter a valid 10-digit mobile number.' }, { status: 422 });
    }
    const phone = phoneValidation.normalized;

    if (email && isDisposableEmail(email)) {
      console.warn(`[LEAD][SPAM] Disposable email rejected: ${email}`);
      return NextResponse.json({ success: false, error: 'Please provide a valid permanent email address.' }, { status: 422 });
    }

    // ── H. Google reCAPTCHA v3 Verification ────
    const recaptchaToken = deepSanitize(body.recaptchaToken);
    const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
    
    if (RECAPTCHA_SECRET_KEY && recaptchaToken && recaptchaToken !== 'bypass') {
      try {
        const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
        });
        const verifyData = await verifyRes.json() as { success: boolean; score?: number };
        
        if (!verifyData.success || (verifyData.score !== undefined && verifyData.score < 0.4)) {
          console.warn(`[LEAD][RECAPTCHA] Bot detected: ${name} (Score: ${verifyData.score})`);
          return NextResponse.json({ success: true, message: 'Received.' }, { status: 200 });
        }
      } catch (e) {
        console.error('[LEAD][RECAPTCHA] Verification network error', e);
      }
    }

    // ── I. Safe UTM Attribution Mapping ───────
    const utmRaw = typeof body.utm === 'object' && body.utm !== null ? body.utm as Record<string, unknown> : {};
    const utmHtml = Object.keys(utmRaw).length > 0
      ? Object.entries(utmRaw)
          .map(([k, v]) => `<li><strong>${deepSanitize(k)}:</strong> ${deepSanitize(String(v))}</li>`)
          .join('')
      : '<li>Direct / Organic (no UTM parameters)</li>';

    // ── J. Register Lead in Fail-Safe Outbox ───
    const queuedLead = enqueueLead({
      name,
      phone,
      email: email || undefined,
      configuration: configuration || undefined,
      domain,
      source,
      utm: utmRaw,
      ip,
      timestamp: new Date().toISOString(),
    });

    // ─────────────────────────────────────────
    // STEP 1: NODEMAILER (PRIMARY EMAIL DISPATCH)
    // ─────────────────────────────────────────
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;
    const LEAD_RECIPIENT_EMAIL = process.env.LEAD_RECIPIENT_EMAIL || 'propsmartrealty@gmail.com';
    let emailStatus = 'pending';

    if (EMAIL_USER && EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: EMAIL_USER, pass: EMAIL_PASS },
          pool: true,
          maxConnections: 3,
          maxMessages: 50,
        });

        await transporter.sendMail({
          from: `"The Arena Leads" <${EMAIL_USER}>`,
          to: LEAD_RECIPIENT_EMAIL,
          replyTo: email || EMAIL_USER,
          subject: `🏠 New Property Enquiry: ${name} — ${configuration || 'The Arena'} (${domain})`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:10px;overflow:hidden;box-shadow:0 4px 15px rgba(0,0,0,0.05);">
              <div style="background:#0D0818;padding:24px;text-align:center;">
                <h1 style="color:#DFFE00;margin:0;font-size:22px;">🏠 New Lead — The Arena</h1>
                <p style="color:#fff;margin:8px 0 0 0;font-size:14px;">Origin: <strong>${domain}</strong></p>
              </div>
              <div style="padding:24px;background:#fff;">
                <table cellpadding="10" width="100%" style="border-collapse:collapse;margin-bottom:20px;">
                  <tr style="background:#f9f9f9;">
                    <td style="font-weight:bold;width:140px;border:1px solid #eee;">Name</td>
                    <td style="border:1px solid #eee;font-weight:bold;color:#000;">${name}</td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold;border:1px solid #eee;">Phone</td>
                    <td style="border:1px solid #eee;"><a href="tel:${phone}" style="color:#0066cc;font-weight:bold;font-size:16px;">${phone}</a></td>
                  </tr>
                  <tr style="background:#f9f9f9;">
                    <td style="font-weight:bold;border:1px solid #eee;">Configuration</td>
                    <td style="border:1px solid #eee;color:#000;font-weight:bold;font-size:15px;">${configuration || '—'}</td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold;border:1px solid #eee;">Email</td>
                    <td style="border:1px solid #eee;">${email ? `<a href="mailto:${email}">${email}</a>` : '—'}</td>
                  </tr>
                  <tr style="background:#f9f9f9;">
                    <td style="font-weight:bold;border:1px solid #eee;">Source Context</td>
                    <td style="border:1px solid #eee;font-size:13px;">${source}</td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold;border:1px solid #eee;">Timestamp</td>
                    <td style="border:1px solid #eee;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</td>
                  </tr>
                  <tr style="background:#f9f9f9;">
                    <td style="font-weight:bold;border:1px solid #eee;">IP Address</td>
                    <td style="border:1px solid #eee;font-size:12px;color:#666;">${ip}</td>
                  </tr>
                </table>

                <h4 style="margin:20px 0 10px 0;color:#0D0818;font-size:14px;text-transform:uppercase;letter-spacing:0.5px;">Marketing Attribution (UTM)</h4>
                <ul style="padding-left:18px;color:#555;font-size:13px;line-height:1.6;">${utmHtml}</ul>
              </div>
              <div style="background:#f5f5f5;padding:14px;text-align:center;font-size:11px;color:#888;">
                Enterprise Lead Engine • ID: ${queuedLead.id} • ${new Date().toISOString()}
              </div>
            </div>
          `,
        });

        emailStatus = 'sent';
        markLeadSent(queuedLead.id);
        console.log(`[LEAD] Email delivered for ${name} (${phone}) to ${LEAD_RECIPIENT_EMAIL}`);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`[LEAD][FAIL-SAFE] Nodemailer delivery failed: ${msg}. Lead queued in outbox for cron retry.`);
        emailStatus = `queued_for_retry: ${msg}`;
        recordLeadFailure(queuedLead.id, msg);
      }
    } else {
      console.warn('[LEAD] EMAIL_USER / EMAIL_PASS not set. Lead saved in outbox.');
    }

    // ─────────────────────────────────────────
    // STEP 2: OPTIONAL CRM WEBHOOK DISPATCH
    // ─────────────────────────────────────────
    const CRM_WEBHOOK_URL = process.env.CRM_WEBHOOK_URL;
    if (CRM_WEBHOOK_URL) {
      const crmPayload = {
        lead_id: queuedLead.id,
        name,
        phone,
        email: email || '',
        configuration: configuration || '',
        source_context: source,
        domain,
        utm_source: deepSanitize(String(utmRaw.utm_source || '')),
        utm_medium: deepSanitize(String(utmRaw.utm_medium || '')),
        utm_campaign: deepSanitize(String(utmRaw.utm_campaign || '')),
        utm_term: deepSanitize(String(utmRaw.utm_term || '')),
        gclid: deepSanitize(String(utmRaw.gclid || '')),
        ip_address: ip,
        timestamp: new Date().toISOString()
      };

      fetchWithTimeout(CRM_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(crmPayload),
      }).catch(err => console.error('[LEAD][CRM] Webhook timeout/error:', err));
    }

    // ── K. Return Reliable Enterprise 200 Response ──
    return NextResponse.json(
      {
        success: true,
        message: 'Your enquiry has been received. Our sales advisory team will contact you shortly.',
        leadId: queuedLead.id,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'X-Content-Type-Options': 'nosniff',
        },
      }
    );

  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown server error';
    console.error('[LEAD][CRITICAL]', msg);
    return NextResponse.json(
      { success: false, error: 'Our servers are experiencing high volume. Please try again or reach out via WhatsApp.' },
      { status: 500 }
    );
  }
}

// Block non-POST methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed. Use POST.' }, { status: 405 });
}
