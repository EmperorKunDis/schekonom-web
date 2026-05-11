import {
  DEMO_MODE,
  OWNER_DEMO_PHONE,
  buildWorkspaceSnapshot,
  demoProfiles,
  findProfileByCredentials,
  getClientDetail,
} from "./data";
import type { ClientDetail, DemoProfile, WorkspaceSnapshot } from "./types";

interface ChallengeRecord {
  id: string;
  profileId: string;
  code: string;
  expiresAt: number;
}

export interface RequestCodeResponse {
  challengeId: string;
  status: "owner_sms_sent";
  expiresIn: number;
  ownerPhone: string;
  relayCode?: string;
}

export interface VerifyCodeResponse {
  token: string;
  user: DemoProfile;
  workspace: WorkspaceSnapshot;
}

const challenges = new Map<string, ChallengeRecord>();

const wait = (ms: number) =>
  new Promise((resolve) => window.setTimeout(resolve, ms));

const maskOwnerPhone = (phone: string) => {
  const compact = phone.replace(/\s+/g, "");
  if (compact.length < 6) return phone;
  return `${compact.slice(0, 4)} *** ${compact.slice(-3)}`;
};

const OWNER_OTP_ENDPOINT =
  process.env.NEXT_PUBLIC_OWNER_OTP_ENDPOINT ?? "/api/auth/send-otp";

const normalizeOwnerPhone = (phone: string) => phone.replace(/\s+/g, "");

const sendOwnerOtpSms = async (profile: DemoProfile) => {
  const ownerPhone = normalizeOwnerPhone(OWNER_DEMO_PHONE);
  const response = await fetch(OWNER_OTP_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: profile.demoCode,
      otp: profile.demoCode,
      to: ownerPhone,
      phone: ownerPhone,
      ownerPhone,
      recipientPhone: ownerPhone,
      profileTitle: profile.title,
      profileSurname: profile.surname,
    }),
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;

    throw new Error(
      payload?.error || "SMS se nepodařilo odeslat. Zkuste to znovu.",
    );
  }
};

export async function requestDemoCode(
  surname: string,
  phone: string,
): Promise<RequestCodeResponse> {
  await wait(450);

  const profile = findProfileByCredentials(surname, phone);
  if (!profile) {
    throw new Error(
      "Profil nebyl nalezen. Použijte jednu z demo kombinací příjmení a telefonu.",
    );
  }

  const challengeId = `challenge_${Date.now()}`;
  const record: ChallengeRecord = {
    id: challengeId,
    profileId: profile.id,
    code: profile.demoCode,
    expiresAt: Date.now() + 5 * 60 * 1000,
  };

  await sendOwnerOtpSms(profile);

  challenges.set(challengeId, record);

  return {
    challengeId,
    status: "owner_sms_sent",
    expiresIn: 300,
    ownerPhone: maskOwnerPhone(OWNER_DEMO_PHONE),
    relayCode: DEMO_MODE ? profile.demoCode : undefined,
  };
}

export async function verifyDemoCode(
  challengeId: string,
  code: string,
): Promise<VerifyCodeResponse> {
  await wait(380);

  const record = challenges.get(challengeId);
  if (!record) {
    throw new Error("Ověřovací výzva nebyla nalezena. Požádejte o nový kód.");
  }

  if (record.expiresAt < Date.now()) {
    challenges.delete(challengeId);
    throw new Error("Kód vypršel. Vygenerujte nový ověřovací kód.");
  }

  if (record.code !== code.trim()) {
    throw new Error("Ověřovací kód nesouhlasí.");
  }

  const user = demoProfiles.find((profile) => profile.id === record.profileId);
  if (!user) {
    throw new Error("Profil pro tuto výzvu neexistuje.");
  }

  challenges.delete(challengeId);

  return {
    token: `demo_${user.id}_${Date.now()}`,
    user,
    workspace: buildWorkspaceSnapshot(user),
  };
}

export async function getWorkspace(
  profileId: string,
): Promise<WorkspaceSnapshot> {
  await wait(260);
  const profile = demoProfiles.find((item) => item.id === profileId);
  if (!profile) {
    throw new Error("Workspace pro daný profil neexistuje.");
  }

  return buildWorkspaceSnapshot(profile);
}

export async function getClientMissionControl(
  profileId: string,
  clientId: string,
): Promise<ClientDetail> {
  await wait(280);

  const profile = demoProfiles.find((item) => item.id === profileId);
  if (!profile) {
    throw new Error("Profil neexistuje.");
  }

  if (!profile.visibleClientIds.includes(clientId)) {
    throw new Error("Tento klient není pro profil dostupný.");
  }

  const detail = getClientDetail(clientId);
  if (!detail) {
    throw new Error("Detail klienta nebyl nalezen.");
  }

  return detail;
}
