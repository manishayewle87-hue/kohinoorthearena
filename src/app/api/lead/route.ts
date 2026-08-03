import { NextResponse } from 'next';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("New Lead Captured:", body);

    const { name, phone, email, source } = body;

    // 1. Send Email Notification to propsmartrealty@gmail.com using Nodemailer
    const EMAIL_USER = process.env.EMAIL_USER; // Should be set to your gmail address
    const EMAIL_PASS = process.env.EMAIL_PASS; // Should be the 16-character Google App Password

    if (EMAIL_USER && EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: EMAIL_USER,
        to: 'propsmartrealty@gmail.com', // Target email requested by user
        subject: `New Lead: ${name || 'Unknown'} - Mahalaxmi The Arena`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ccc; max-width: 600px;">
            <h2 style="color: #0D0818;">New Lead Notification</h2>
            <p><strong>Project:</strong> Mahalaxmi The Arena / Kohinoor The Arena</p>
            <hr />
            <p><strong>Name:</strong> ${name || 'Not provided'}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Email:</strong> ${email || 'Not provided'}</p>
            <p><strong>Source:</strong> ${source || 'Website'}</p>
            <br/>
            <p style="font-size: 12px; color: #888;">Automated by Antigravity God-Tier Lead Engine</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions).catch(err => {
        console.error("Nodemailer failed to send lead email:", err);
      });
    } else {
      console.warn("Nodemailer skipped: EMAIL_USER or EMAIL_PASS environment variables are missing.");
    }

    // 2. Forward to CRM Webhook (if configured)
    const CRM_WEBHOOK_URL = process.env.CRM_WEBHOOK_URL || null;
    if (CRM_WEBHOOK_URL) {
      await fetch(CRM_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }).catch(err => console.error("Webhook forwarding failed:", err));
    }

    // 3. Optional Autoresponder via Resend (if configured)
    const RESEND_API_KEY = process.env.RESEND_API_KEY || null;
    if (RESEND_API_KEY && email) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Mahalaxmi The Arena <sales@kohinoorthearena.com>',
          to: [email],
          subject: 'Your Exclusive Brochure - Mahalaxmi The Arena',
          html: `<div style="font-family:sans-serif;color:#333;">
                  <h2>Welcome to Life in Motion, ${name || 'Future Resident'}!</h2>
                  <p>Thank you for your interest in Mahalaxmi The Arena, Pimpri's premier sports township.</p>
                  <p><a href="https://kohinoorthearena.vercel.app/assets/brochure.pdf" style="display:inline-block;padding:10px 20px;background:#DFFE00;color:#0D0818;text-decoration:none;font-weight:bold;border-radius:5px;">Download Your Digital Brochure Here</a></p>
                  <p>One of our luxury property consultants will be in touch shortly to assist you.</p>
                 </div>`
        })
      }).catch(err => console.error("Email Autoresponder failed:", err));
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
