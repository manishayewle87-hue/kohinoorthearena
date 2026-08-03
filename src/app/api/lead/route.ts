import { NextResponse } from 'next';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("New Lead Captured:", body);

    // TODO: Replace with your actual Zapier / CRM Webhook URL
    const CRM_WEBHOOK_URL = process.env.CRM_WEBHOOK_URL || null;

    if (CRM_WEBHOOK_URL) {
      // Forward the lead data to the CRM asynchronously
      await fetch(CRM_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }).catch(err => console.error("Webhook forwarding failed:", err));
    } else {
      // Simulate network delay if no webhook is present
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    return NextResponse.json(
      { message: "Lead captured successfully", success: true },
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
