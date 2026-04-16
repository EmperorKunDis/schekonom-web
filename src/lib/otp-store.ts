// Shared in-memory OTP store (works for dev/showcase)
interface OtpRecord {
  code: string;
  expiresAt: number;
  profileId: string;
}

const store = new Map<string, OtpRecord>();

export function setOtp(phone: string, code: string, profileId: string) {
  store.set(phone, {
    code,
    expiresAt: Date.now() + 5 * 60 * 1000,
    profileId,
  });
}

export function verifyOtp(
  phone: string,
  code: string,
): { valid: boolean; profileId?: string } {
  const record = store.get(phone);
  if (!record) return { valid: false };
  if (record.expiresAt < Date.now()) {
    store.delete(phone);
    return { valid: false };
  }
  if (record.code !== code.trim()) return { valid: false };
  store.delete(phone);
  return { valid: true, profileId: record.profileId };
}

export function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
