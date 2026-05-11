import { OWNER_DEMO_PHONE } from "@/lib/demo/data";

export const runtime = "nodejs";

type SendOtpBody = {
  code?: unknown;
  profileTitle?: unknown;
  profileSurname?: unknown;
};

const normalizePhoneForSms = (phone: string) => phone.replace(/\s+/g, "");

const getRequiredEnv = (name: string) => {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing ${name}`);
  }
  return value;
};

const buildMessageBody = ({
  code,
  profileTitle,
  profileSurname,
}: {
  code: string;
  profileTitle?: string;
  profileSurname?: string;
}) => {
  const profileLabel = profileTitle || profileSurname;
  const suffix = profileLabel ? ` Profil: ${profileLabel}.` : "";
  return `SCH-EKONOM ověřovací kód: ${code}.${suffix}`;
};

async function sendTwilioSms({ to, body }: { to: string; body: string }) {
  const accountSid = getRequiredEnv("TWILIO_ACCOUNT_SID");
  const authToken = getRequiredEnv("TWILIO_AUTH_TOKEN");
  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID?.trim();
  const fromNumber = process.env.TWILIO_FROM_NUMBER?.trim();

  if (!messagingServiceSid && !fromNumber) {
    throw new Error(
      "Missing TWILIO_MESSAGING_SERVICE_SID or TWILIO_FROM_NUMBER",
    );
  }

  const params = new URLSearchParams({
    To: to,
    Body: body,
  });

  if (messagingServiceSid) {
    params.set("MessagingServiceSid", messagingServiceSid);
  } else if (fromNumber) {
    params.set("From", fromNumber);
  }

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${accountSid}:${authToken}`,
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    },
  );

  const payload = (await response.json().catch(() => null)) as {
    sid?: string;
    message?: string;
  } | null;

  if (!response.ok) {
    throw new Error(
      payload?.message || `Twilio returned HTTP ${response.status}`,
    );
  }

  return payload?.sid;
}

export async function POST(request: Request) {
  let body: SendOtpBody;

  try {
    body = (await request.json()) as SendOtpBody;
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (typeof body.code !== "string" || !/^\d{6}$/.test(body.code)) {
    return Response.json({ error: "Invalid OTP code." }, { status: 400 });
  }

  const recipient = normalizePhoneForSms(OWNER_DEMO_PHONE);
  const messageBody = buildMessageBody({
    code: body.code,
    profileTitle:
      typeof body.profileTitle === "string" ? body.profileTitle : undefined,
    profileSurname:
      typeof body.profileSurname === "string" ? body.profileSurname : undefined,
  });

  try {
    const sid = await sendTwilioSms({ to: recipient, body: messageBody });

    return Response.json({
      status: "sent",
      to: recipient,
      sid,
    });
  } catch (error) {
    console.error("[AUTH:OTP] Twilio send failed", error);

    return Response.json(
      { error: "SMS se nepodařilo odeslat. Zkuste to znovu." },
      { status: 500 },
    );
  }
}
