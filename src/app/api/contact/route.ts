import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();
  // TODO: integrate Resend or Formspree.
  console.log('Incoming contact submission', data);
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
