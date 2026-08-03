import { NextResponse } from 'next';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

// TEST ENDPOINT: Visit /api/test-email in your browser after deployment.
// DELETE THIS FILE once email is confirmed working.
export async function GET() {
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;

  if (!EMAIL_USER || !EMAIL_PASS) {
    return NextResponse.json({
      success: false,
      error: 'ENV VARS MISSING',
      detail: `EMAIL_USER is ${EMAIL_USER ? 'SET' : 'NOT SET'}, EMAIL_PASS is ${EMAIL_PASS ? 'SET' : 'NOT SET'}`
    }, { status: 500 });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    });

    // Step 1: Verify credentials
    await transporter.verify();

    // Step 2: Send test email
    await transporter.sendMail({
      from: `"Arena Lead Test" <${EMAIL_USER}>`,
      to: 'propsmartrealty@gmail.com',
      subject: '✅ Nodemailer Test - Mahalaxmi The Arena',
      html: '<h2>Success!</h2><p>Nodemailer is working correctly. Leads will now be delivered to this inbox.</p>'
    });

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully to propsmartrealty@gmail.com',
      sentFrom: EMAIL_USER
    });

  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({
      success: false,
      error: 'NODEMAILER FAILED',
      detail: errorMessage,
      hint: 'Check that EMAIL_PASS is a 16-char Google App Password (not your Gmail login password), and that 2-Step Verification is enabled on your Google Account.'
    }, { status: 500 });
  }
}
