/**
 * Lightweight signed-session helper built on the Web Crypto API (available
 * as a global in both the Edge runtime used by middleware and modern Node
 * runtimes used by route handlers), so the same code verifies sessions in
 * middleware.ts and in API routes without a Node-only `crypto` import.
 *
 * This is intentionally simple — a single admin session, no refresh tokens,
 * no revocation list. It's designed to be swapped out later: everything
 * that needs "is this request authenticated?" goes through `verifySession`
 * / `getAdminSession` in this file and `adminAuth.ts`, so replacing this
 * with NextAuth/Auth.js or a full JWT provider only means changing this
 * module, not every call site.
 */

export type AdminSessionPayload = {
  email: string;
  iat: number; // issued-at, epoch seconds
  exp: number; // expiry, epoch seconds
};

const SESSION_COOKIE_NAME = "easycred_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET is not set. Add a long random string to .env.local (see .env.example)."
    );
  }
  return secret;
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(value: string): ArrayBuffer {
  const padded = value
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(value.length + ((4 - (value.length % 4)) % 4), "=");

  const binary = atob(padded);
  const bytes = new Uint8Array([...binary].map((c) => c.charCodeAt(0)));

  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
}

async function getHmacKey(secret: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
    "verify",
  ]);
}

/** Creates a signed session token for the given admin email. */
export async function createSessionToken(email: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: AdminSessionPayload = { email, iat: now, exp: now + SESSION_TTL_SECONDS };

  const encoder = new TextEncoder();
  const payloadB64 = base64UrlEncode(encoder.encode(JSON.stringify(payload)));

  const key = await getHmacKey(getSecret());
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payloadB64));
  const signatureB64 = base64UrlEncode(new Uint8Array(signature));

  return `${payloadB64}.${signatureB64}`;
}

/** Verifies a session token and returns its payload if valid and unexpired. */
export async function verifySessionToken(token: string | undefined | null): Promise<AdminSessionPayload | null> {
  if (!token) return null;
  const [payloadB64, signatureB64] = token.split(".");
  if (!payloadB64 || !signatureB64) return null;

  try {
    const encoder = new TextEncoder();
    const key = await getHmacKey(getSecret());
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      base64UrlDecode(signatureB64),
      encoder.encode(payloadB64)
    );
    if (!valid) return null;

    const payload: AdminSessionPayload = JSON.parse(new TextDecoder().decode(base64UrlDecode(payloadB64)));
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;

    return payload;
  } catch {
    return null;
  }
}

export { SESSION_COOKIE_NAME, SESSION_TTL_SECONDS };
