import {
  buildWorkspaceSnapshot,
  demoProfiles,
  findProfileByCredentials,
  getClientDetail,
} from "./data";
import type { ClientDetail, DemoProfile, WorkspaceSnapshot } from "./types";

export const STATIC_LOGIN_PASSWORD = "N4sr4tN4Hr4d";

export interface VerifyCodeResponse {
  token: string;
  user: DemoProfile;
  workspace: WorkspaceSnapshot;
}

const wait = (ms: number) =>
  new Promise((resolve) => window.setTimeout(resolve, ms));

export async function loginWithPassword(
  surname: string,
  phone: string,
  password: string,
): Promise<VerifyCodeResponse> {
  await wait(380);

  const profile = findProfileByCredentials(surname, phone);
  if (!profile) {
    throw new Error(
      "Profil nebyl nalezen. Použijte jednu z demo kombinací příjmení a telefonu.",
    );
  }

  if (password.trim() !== STATIC_LOGIN_PASSWORD) {
    throw new Error("Heslo nesouhlasí.");
  }

  return {
    token: `demo_${profile.id}_${Date.now()}`,
    user: profile,
    workspace: buildWorkspaceSnapshot(profile),
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
