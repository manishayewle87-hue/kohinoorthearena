import { NextResponse } from 'next';
import nodemailer from 'nodemailer';

// CRITICAL: Forces this route onto the full Node.js runtime.
// Without this, Vercel may run it on the Edge runtime where
// Nodemailer native modules are completely blocked.
export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("New Lead Captured:", body);

    const { name, phone, email, source, utm } = body;
    
    // Parse UTM String for Email
    const utmHtml = utm && Object.keys(utm).length > 0 
      ? Object.entries(utm).map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`).join('')
      : '<li>No ad tracking data (Direct/Organic)</li>';

    // 1. Send Email Notification to propsmartrealty@gmail.com using Nodemailer
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;

    if (EMAIL_USER && EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS,
        },
      });

      // Verify credentials before attempting to send
      await transporter.verify().catch((err) => {
        console.error('[NODEMAILER] Credential verification FAILED:', err.message);
        throw new Error(`Nodemailer auth failed: ${err.message}`);
      });

      const mailOptions = {
        from: `"Mahalaxmi The Arena Leads" <${EMAIL_USER}>`,
        to: 'propsmartrealty@gmail.com',
        subject: `🏠 New Lead: ${name || 'Unknown'} - Mahalaxmi The Arena`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ccc; max-width: 600px;">
            <h2 style="color: #0D0818;">New Lead Notification</h2>
            <p><strong>Project:</strong> Mahalaxmi The Arena / Kohinoor The Arena</p>
            <hr />
            <p><strong>Name:</strong> ${name || 'Not provided'}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Email:</strong> ${email || 'Not provided'}</p>
            <p><strong>Source URL:</strong> ${source || 'Website'}</p>
            <hr />
            <h3>Ad Tracking Data (UTM)</h3>
            <ul>${utmHtml}</ul>
            <br/>
            <p style="font-size: 12px; color: #888;">Automated by Antigravity God-Tier Lead Engine</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log('[NODEMAILER] Email sent successfully to propsmartrealty@gmail.com');
    } else {
      console.warn('[NODEMAILER] Skipped: EMAIL_USER or EMAIL_PASS env vars are not set in Vercel.');
    }

    // 2. Forward to CRM Webhook (with UTMs)
    const CRM_WEBHOOK_URL = process.env.CRM_WEBHOOK_URL;
    if (CRM_WEBHOOK_URL) {
      await fetch(CRM_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...body,
          timestamp: new Date().toISOString()
        })
      }).catch(err => console.error("Webhook forwarding failed:", err));
    }

    // 3. Instant WhatsApp Automation via Meta Cloud API
    const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
    const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID;
    if (WHATSAPP_TOKEN && WHATSAPP_PHONE_ID && phone) {
      // Clean phone number (remove spaces/special chars)
      const cleanPhone = phone.replace(/[^0-9]/g, '');
      
      await fetch(`https://graph.facebook.com/v19.0/${WHATSAPP_PHONE_ID}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: cleanPhone,
          type: "template",
          template: {
            name: "brochure_delivery", // The pre-approved Meta Template Name
            language: { code: "en" },
            components: [
              {
                type: "body",
                parameters: [
                  { type: "text", text: name || "Future Resident" }
                ]
              }
            ]
          }
        })
      }).catch(err => console.error("WhatsApp API failed:", err));
    }

    return NextResponse.json(
      { message: "Lead captured and notifications processed", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
