import { NextRequest, NextResponse } from 'next/server';
import { signToken, SESSION_COOKIE, COOKIE_MAX_AGE } from '@/lib/session';

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  const expected = process.env.SITE_PASSWORD;
  const secret = process.env.SESSION_SECRET;

  if (!expected || !secret) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  if (!password || password !== expected) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const token = await signToken(password, secret);

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });

  return response;
}
