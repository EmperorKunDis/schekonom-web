// Centralized logger for SCH-EKONOM ERP showcase
// Server logs: visible in terminal (npm run dev)
// Client logs: visible in browser DevTools console

const isServer = typeof window === "undefined";

function timestamp() {
  return new Date().toISOString().slice(11, 23);
}

function mask(value: string, showLast = 3): string {
  if (!value || value.length <= showLast + 3) return "***";
  return value.slice(0, 4) + "***" + value.slice(-showLast);
}

export const log = {
  // ===== AUTH =====
  otpSendRequest(data: { profileId: string; phone: string }) {
    console.log(
      `[${timestamp()}] [OTP:SEND] Request received: profileId=${data.profileId}, phone=${mask(data.phone)}`,
    );
  },
  otpSendProfileFound(profile: { id: string; name: string; role: string }) {
    console.log(
      `[${timestamp()}] [OTP:SEND] Profile found: id=${profile.id}, name=${profile.name}, role=${profile.role}`,
    );
  },
  otpSendProfileNotFound(profileId: string) {
    console.error(
      `[${timestamp()}] [OTP:SEND] ✗ Profile NOT FOUND: ${profileId}`,
    );
  },
  otpSendCodeGenerated() {
    console.log(`[${timestamp()}] [OTP:SEND] Code generated (6 digits)`);
  },
  otpSendTwilioConfig(config: {
    sid: string | undefined;
    from: string | undefined;
    configured: boolean;
  }) {
    console.log(
      `[${timestamp()}] [OTP:SEND] Twilio config: sid=${config.sid ? mask(config.sid) : "NOT SET"}, from=${config.from || "NOT SET"}, configured=${config.configured}`,
    );
  },
  otpSendTwilioSending(phone: string) {
    console.log(
      `[${timestamp()}] [OTP:SEND] Twilio sending SMS to: ${mask(phone)}`,
    );
  },
  otpSendTwilioSuccess(messageSid: string) {
    console.log(
      `[${timestamp()}] [OTP:SEND] ✓ SMS SENT successfully. Message SID: ${messageSid}`,
    );
  },
  otpSendTwilioError(error: string) {
    console.error(`[${timestamp()}] [OTP:SEND] ✗ TWILIO ERROR: ${error}`);
  },
  otpSendEnvMissing(varName: string) {
    console.error(
      `[${timestamp()}] [OTP:SEND] ✗ ENV MISSING: ${varName} is not set!`,
    );
  },

  otpVerifyRequest(data: { phone: string; codeLength: number }) {
    console.log(
      `[${timestamp()}] [OTP:VERIFY] Request: phone=${mask(data.phone)}, code=${data.codeLength} digits`,
    );
  },
  otpVerifyFound(found: boolean, expired: boolean) {
    console.log(
      `[${timestamp()}] [OTP:VERIFY] Store lookup: found=${found}, expired=${expired}`,
    );
  },
  otpVerifySuccess(profile: { id: string; name: string; role: string }) {
    console.log(
      `[${timestamp()}] [OTP:VERIFY] ✓ Code VALID. Profile: id=${profile.id}, name=${profile.name}, role=${profile.role}`,
    );
  },
  otpVerifyFailed(reason: string) {
    console.error(`[${timestamp()}] [OTP:VERIFY] ✗ FAILED: ${reason}`);
  },

  // ===== CLIENT-SIDE AUTH =====
  authProfileSelected(profile: { id: string; name: string; role: string }) {
    if (isServer) return;
    console.log(
      `%c[AUTH:LOGIN] Profile selected: ${profile.name} (${profile.role})`,
      "color: #00E5FF; font-weight: bold",
    );
  },
  authRequestingOtp(phone: string) {
    if (isServer) return;
    console.log(
      `%c[AUTH:LOGIN] Requesting OTP for: ${mask(phone)}`,
      "color: #E6C65C",
    );
  },
  authOtpResponse(status: string, error?: string) {
    if (isServer) return;
    if (error) {
      console.error(
        `%c[AUTH:LOGIN] ✗ OTP Error: ${error}`,
        "color: #FF7B7B; font-weight: bold",
      );
    } else {
      console.log(`%c[AUTH:LOGIN] OTP response: ${status}`, "color: #00E5A0");
    }
  },
  authVerifying() {
    if (isServer) return;
    console.log(`%c[AUTH:LOGIN] Verifying code...`, "color: #E6C65C");
  },
  authLoginSuccess(name: string) {
    if (isServer) return;
    console.log(
      `%c[AUTH:LOGIN] ✓ LOGIN SUCCESSFUL: ${name} → redirecting to /portal`,
      "color: #00E5A0; font-weight: bold; font-size: 14px",
    );
  },
  authLoginFailed(error: string) {
    if (isServer) return;
    console.error(
      `%c[AUTH:LOGIN] ✗ LOGIN FAILED: ${error}`,
      "color: #FF7B7B; font-weight: bold",
    );
  },

  // ===== AUTH CONTEXT =====
  authCtxInit(restored: boolean, name?: string) {
    if (isServer) return;
    if (restored) {
      console.log(
        `%c[AUTH:CTX] Init: profile restored from localStorage: ${name}`,
        "color: #00E5FF",
      );
    } else {
      console.log(
        `%c[AUTH:CTX] Init: no saved profile in localStorage`,
        "color: #7A8A9E",
      );
    }
  },
  authCtxLogin(name: string) {
    if (isServer) return;
    console.log(
      `%c[AUTH:CTX] Login: saving "${name}" to localStorage`,
      "color: #00E5A0; font-weight: bold",
    );
  },
  authCtxLogout() {
    if (isServer) return;
    console.log(`%c[AUTH:CTX] Logout: clearing localStorage`, "color: #FF7B7B");
  },

  // ===== PORTAL =====
  portalLoaded(
    profile: { name: string; role: string },
    companiesCount: number,
    navCount: number,
  ) {
    if (isServer) return;
    console.log(
      `%c[PORTAL] Loaded: ${profile.name} (${profile.role}), ${companiesCount} companies, ${navCount} nav items`,
      "color: #00E5FF; font-weight: bold",
    );
  },
  portalNoProfile() {
    if (isServer) return;
    console.warn(
      `%c[PORTAL] ✗ No profile — redirecting to /prihlaseni`,
      "color: #FF7B7B; font-weight: bold",
    );
  },
};
