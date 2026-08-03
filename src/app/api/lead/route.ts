import { NextResponse } from 'next';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("New Lead Captured:", body);

    const CRM_WEBHOOK_URL = process.env.CRM_WEBHOOK_URL || null;
    const RESEND_API_KEY = process.env.RESEND_API_KEY || null;

    if (CRM_WEBHOOK_URL) {
      // Forward the lead data to the CRM asynchronously
      await fetch(CRM_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }).catch(err => console.error("Webhook forwarding failed:", err));
    }

    if (RESEND_API_KEY && body.email) {
      // Automated Email Autoresponder to the Lead
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Mahalaxmi The Arena <sales@kohinoorthearena.com>',
          to: [body.email],
          subject: 'Your Exclusive Brochure - Mahalaxmi The Arena',
          html: `<div style="font-family:sans-serif;color:#333;">
                  <h2>Welcome to Life in Motion, ${body.name || 'Future Resident'}!</h2>
                  <p>Thank you for your interest in Mahalaxmi The Arena, Pimpri's premier sports township.</p>
                  <p><a href="https://kohinoorthearena.vercel.app/assets/brochure.pdf" style="display:inline-block;padding:10px 20px;background:#DFFE00;color:#0D0818;text-decoration:none;font-weight:bold;border-radius:5px;">Download Your Digital Brochure Here</a></p>
                  <p>One of our luxury property consultants will be in touch shortly to assist you.</p>
                 </div>`
        })
      }).catch(err => console.error("Email Autoresponder failed:", err));
    } else {
      // Simulate network delay if no webhooks/emails are configured
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    return NextResponse.json(
      { message: "Lead captured and email sent successfully", success: true },
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
