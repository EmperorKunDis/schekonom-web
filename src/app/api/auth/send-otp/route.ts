import { NextRequest, NextResponse } from "next/server";
import { setOtp, generateCode } from "@/lib/otp-store";
import { erpProfiles } from "@/lib/erp/data";
import { log } from "@/lib/logger";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const profileId = body.profileId as string | undefined;

  log.otpSendRequest({
    profileId: profileId || "MISSING",
    phone: "demo-phone",
  });

  if (!profileId) {
    return NextResponse.json({ error: "Chybí profileId." }, { status: 400 });
  }

  const profile = erpProfiles.find((p) => p.id === profileId);
  if (!profile) {
    log.otpSendProfileNotFound(profileId);
    return NextResponse.json({ error: "Profil neexistuje." }, { status: 404 });
  }
  log.otpSendProfileFound({
    id: profile.id,
    name: profile.name,
    role: profile.role,
  });

  const phone = process.env.DEMO_PHONE;
  if (!phone) {
    log.otpSendEnvMissing("DEMO_PHONE");
    return NextResponse.json(
      { error: "Demo telefon není nakonfigurován. Nastavte DEMO_PHONE." },
      { status: 500 },
    );
  }

  const code = generateCode();
  const sessionToken = setOtp(phone, code, profile.id);
  log.otpSendCodeGenerated();

  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_PHONE_NUMBER;

  if (!sid || !token || !from) {
    if (!sid) log.otpSendEnvMissing("TWILIO_ACCOUNT_SID");
    if (!token) log.otpSendEnvMissing("TWILIO_AUTH_TOKEN");
    if (!from) log.otpSendEnvMissing("TWILIO_PHONE_NUMBER");
    return NextResponse.json(
      { error: "SMS služba není nakonfigurována." },
      { status: 500 },
    );
  }

  log.otpSendTwilioSending(phone);

  // Use fetch directly — Twilio Node.js SDK is incompatible with Cloudflare Workers runtime
  const auth = btoa(`${sid}:${token}`);
  const twilioRes = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        From: from,
        To: phone,
        Body: `SCH-EKONOM: Váš ověřovací kód je ${code}`,
      }),
    },
  );

  if (!twilioRes.ok) {
    const err = await twilioRes.text();
    log.otpSendTwilioError(err);
    return NextResponse.json(
      { error: "SMS se nepodařilo odeslat. Zkuste to znovu.", debug: err },
      { status: 500 },
    );
  }

  const result = (await twilioRes.json()) as { sid: string };
  log.otpSendTwilioSuccess(result.sid);

  return NextResponse.json({
    status: "sms_sent",
    sessionToken,
    expiresIn: 300,
  });
}
