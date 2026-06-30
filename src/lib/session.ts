const enc = new TextEncoder();

async function getKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']
  );
}

export async function signToken(password: string, secret: string): Promise<string> {
  const key = await getKey(secret);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(password));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyToken(token: string, password: string, secret: string): Promise<boolean> {
  const expected = await signToken(password, secret);
  return token === expected;
}

export const SESSION_COOKIE = 'mikami-session';
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
