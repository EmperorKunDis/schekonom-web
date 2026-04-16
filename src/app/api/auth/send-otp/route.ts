import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";
import { setOtp, generateCode } from "@/lib/otp-store";
import { erpProfiles } from "@/lib/erp/data";
import { log } from "@/lib/logger";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const phone = body.phone as string | undefined;
  const profileId = body.profileId as string | undefined;

  log.otpSendRequest({
    profileId: profileId || "MISSING",
    phone: phone || "MISSING",
  });

  if (!phone || !profileId) {
    console.error("[OTP:SEND] ✗ Missing required fields: phone or profileId");
    return NextResponse.json(
      { error: "Zadejte telefonní číslo." },
      { status: 400 },
    );
  }

  // Find profile (user picks profile, enters their OWN phone)
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

  // Generate OTP
  const code = generateCode();
  setOtp(phone, code, profile.id);
  log.otpSendCodeGenerated();

  // Check Twilio config
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_PHONE_NUMBER;

  const configured = !!(sid && token && from);
  log.otpSendTwilioConfig({ sid, from, configured });

  if (!configured) {
    if (!sid) log.otpSendEnvMissing("TWILIO_ACCOUNT_SID");
    if (!token) log.otpSendEnvMissing("TWILIO_AUTH_TOKEN");
    if (!from) log.otpSendEnvMissing("TWILIO_PHONE_NUMBER");
    return NextResponse.json(
      { error: "SMS služba není nakonfigurována. Kontaktujte administrátora." },
      { status: 500 },
    );
  }

  // Send SMS via Twilio
  log.otpSendTwilioSending(phone);

  try {
    const client = twilio(sid!, token!);
    const message = await client.messages.create({
      body: `SCH-EKONOM: Váš ověřovací kód je ${code}`,
      from: from!,
      to: phone,
    });

    log.otpSendTwilioSuccess(message.sid);

    return NextResponse.json({
      status: "sms_sent",
      expiresIn: 300,
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown Twilio error";
    log.otpSendTwilioError(msg);

    return NextResponse.json(
      {
        error: "SMS se nepodařilo odeslat. Zkuste to znovu.",
        debug: msg,
      },
      { status: 500 },
    );
  }
}
