import { NextRequest, NextResponse } from "next/server";
import { verifyOtp } from "@/lib/otp-store";
import { erpProfiles } from "@/lib/erp/data";
import { log } from "@/lib/logger";

export async function POST(req: NextRequest) {
  const { sessionToken, code } = await req.json();

  log.otpVerifyRequest({
    phone: sessionToken ? "(token)" : "MISSING",
    codeLength: code?.length || 0,
  });

  if (!sessionToken || !code) {
    log.otpVerifyFailed("Missing sessionToken or code");
    return NextResponse.json({ error: "Zadejte kód." }, { status: 400 });
  }

  const result = verifyOtp(sessionToken, code);
  log.otpVerifyFound(!!result.valid, false);

  if (!result.valid || !result.profileId) {
    log.otpVerifyFailed("Invalid or expired code");
    return NextResponse.json(
      { error: "Neplatný nebo expirovaný kód. Zkuste to znovu." },
      { status: 401 },
    );
  }

  const profile = erpProfiles.find((p) => p.id === result.profileId);
  if (!profile) {
    log.otpVerifyFailed(`Profile ${result.profileId} not found in data`);
    return NextResponse.json({ error: "Profil nenalezen." }, { status: 404 });
  }

  log.otpVerifySuccess({
    id: profile.id,
    name: profile.name,
    role: profile.role,
  });

  // Return COMPLETE profile for auth context
  return NextResponse.json({
    status: "verified",
    profile: {
      id: profile.id,
      name: profile.name,
      surname: profile.surname,
      role: profile.role,
      title: profile.title,
      department: profile.department,
      email: profile.email,
      phone: profile.phone,
      photo: profile.photo,
      visibleCompanyIds: profile.visibleCompanyIds,
    },
  });
}
