import { NextRequest } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend lazily (will be undefined if no API key provided)
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || process.env.NEXT_PUBLIC_CONTACT_TO_EMAIL || '';

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body: ContactBody = await req.json();
    const name = (body.name || '').trim();
    const email = (body.email || '').trim();
    const message = (body.message || '').trim();

    if (!name || name.length < 2 || !email || !message || message.length < 10) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Invalid input. Please check the fields and try again.' }),
        { status: 400 }
      );
    }

    if (!resend || !resendApiKey) {
      console.warn('Contact form attempted but RESEND_API_KEY not configured');
      return new Response(
        JSON.stringify({ ok: false, error: 'Email service not configured.' }),
        { status: 500 }
      );
    }

    if (!TO_EMAIL) {
      console.warn('CONTACT_TO_EMAIL (or NEXT_PUBLIC_CONTACT_TO_EMAIL) not set; using fallback console');
    }

    const fromAddress = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5;padding:8px 4px;">
        <h2 style="margin:0 0 12px;font-size:18px;">New portfolio contact</h2>
        <p style="margin:4px 0;">You received a new message from the contact form:</p>
        <ul style="margin:12px 0 16px;padding:0 0 0 16px;">
          <li><strong>Name:</strong> ${escapeHtml(name)}</li>
          <li><strong>Email:</strong> ${escapeHtml(email)}</li>
        </ul>
        <p style="margin:4px 0 8px;"><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap;background:#f5f5f5;padding:12px;border-radius:6px;font-size:14px;">${escapeHtml(
          message
        )}</pre>
        <hr style="margin:24px 0;border:none;border-top:1px solid #ddd;" />
        <p style="font-size:12px;color:#666;margin:0;">Sent via portfolio contact form.</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: TO_EMAIL ? [TO_EMAIL] : [email], // fallback to sender if no TO configured
      reply_to: email,
      subject: `New message from ${name}`,
      text: message,
      html
    });

    if (error) {
      console.error('Resend error', error);
      return new Response(JSON.stringify({ ok: false, error: 'Failed to send email.' }), { status: 500 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    console.error('Contact form server error', e);
    return new Response(JSON.stringify({ ok: false, error: 'Server error.' }), { status: 500 });
  }
}

// Basic HTML escaping to avoid accidental injection in email body
function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
