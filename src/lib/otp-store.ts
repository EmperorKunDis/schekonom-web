// Stateless HMAC-based OTP tokens — works correctly across multiple worker instances
import { createHmac } from "crypto";

const OTP_SECRET = process.env.OTP_SECRET ?? "sch-ekonom-demo-otp-secret-2026";

export function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Creates a signed session token that encodes (phone, profileId, expiresAt).
 * The OTP code is NOT stored anywhere — it lives only in the SMS.
 * Returns a base64url token to be sent back to the client.
 */
export function setOtp(phone: string, code: string, profileId: string): string {
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 min
  const payload = `${phone}:${code}:${profileId}:${expiresAt}`;
  const mac = createHmac("sha256", OTP_SECRET).update(payload).digest("hex");
  const tokenData = JSON.stringify({ phone, profileId, expiresAt, mac });
  return Buffer.from(tokenData).toString("base64url");
}

/**
 * Verifies the sessionToken + code pair without any server-side state.
 */
export function verifyOtp(
  sessionToken: string,
  code: string,
): { valid: boolean; profileId?: string } {
  try {
    const { phone, profileId, expiresAt, mac } = JSON.parse(
      Buffer.from(sessionToken, "base64url").toString("utf8"),
    ) as { phone: string; profileId: string; expiresAt: number; mac: string };

    if (Date.now() > expiresAt) return { valid: false };

    const payload = `${phone}:${code.trim()}:${profileId}:${expiresAt}`;
    const expected = createHmac("sha256", OTP_SECRET)
      .update(payload)
      .digest("hex");

    if (mac !== expected) return { valid: false };
    return { valid: true, profileId };
  } catch {
    return { valid: false };
  }
}
