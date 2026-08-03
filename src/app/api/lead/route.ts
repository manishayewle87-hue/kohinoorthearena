import { NextResponse } from 'next';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Here you would typically integrate with a CRM, SendGrid, Resend, or Google Sheets.
    // For now, we simulate a successful database insertion.
    console.log("New Lead Captured:", body);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

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
