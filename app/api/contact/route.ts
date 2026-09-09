import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, topic, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields (name, email, or message).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address provided.' },
        { status: 400 }
      );
    }

    // In a production app, here you would dispatch an email via Resend/Postmark/Sendgrid
    // or store to database. For now, log and return success response.
    console.log('[Studio Contact Transmission]', {
      timestamp: new Date().toISOString(),
      topic: topic || 'General',
      name,
      email,
      messageLength: message.length,
    });

    return NextResponse.json({
      success: true,
      message: 'Transmission successfully received.',
      data: {
        receiptId: `TX-${Date.now().toString(36).toUpperCase()}`,
      },
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error processing transmission.' },
      { status: 500 }
    );
  }
}
