"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Bot,
  Building2,
  Cpu,
  Lock,
  Phone,
  Shield,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";
import Logo from "@/components/shared/Logo";
import { useAuth } from "@/lib/auth/context";
import { demoProfiles } from "@/lib/demo/data";
import { loginWithPassword } from "@/lib/demo/api";
import type { VerifyCodeResponse } from "@/lib/demo/api";
import type { DemoProfile } from "@/lib/demo/types";

const labelStyle = {
  fontFamily: "SF Mono, Monaco, Consolas, monospace",
  fontSize: "0.62rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "rgba(0,229,255,0.72)",
};

function InfoTile({
  title,
  value,
  sub,
  icon: Icon,
}: {
  title: string;
  value: string;
  sub: string;
  icon: LucideIcon;
}) {
  return (
    <div className="hud-mini-metric" data-tone="slate">
      <div className="mb-3 flex items-center gap-2">
        <Icon size={14} color="rgba(0,229,255,0.72)" />
        <span style={labelStyle}>{title}</span>
      </div>
      <div style={{ color: "#FFFFFF", fontWeight: 600, marginBottom: 6 }}>
        {value}
      </div>
      <div style={{ color: "#7A8A9E", lineHeight: 1.5 }}>{sub}</div>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const defaultProfile = demoProfiles[0];
  const [activeProfileId, setActiveProfileId] = useState(defaultProfile.id);
  const [surname, setSurname] = useState(defaultProfile.surname);
  const [phone, setPhone] = useState(defaultProfile.phone);
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const activeProfile =
    demoProfiles.find((p) => p.id === activeProfileId) ?? defaultProfile;

  const pickProfile = (profile: DemoProfile) => {
    setActiveProfileId(profile.id);
    setSurname(profile.surname);
    setPhone(profile.phone);
    setPassword("");
    setError("");
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const session: VerifyCodeResponse = await loginWithPassword(
        surname,
        phone,
        password,
      );
      login(session);
      router.push("/portal");
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "Nepodařilo se otevřít pracovní plochu.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const demoFlow = [
    "Vyberte showcase profil podle role.",
    "Zadejte sdílené heslo pro přístup do demo prostředí.",
    "Po ověření se otevře pracovní plocha přesně podle role.",
    "Každý profil vidí jen své klienty, termíny a výjimky.",
  ];

  const apiHandshake = [
    "POST /api/demo/auth/login",
    "GET /api/dashboard",
    "GET /api/clients/:id",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top right, rgba(0,229,255,0.08), transparent 32%), linear-gradient(180deg, #02060A 0%, #03080D 45%, #091724 100%)",
      }}
    >
      <div className="mx-auto w-full px-6 py-8" style={{ maxWidth: 1480 }}>
        {/* Header */}
        <div className="mb-8 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="hud-chip" data-tone="cyan">
                SHOWCASE BUILD
              </span>
              <span className="hud-chip" data-tone="gold">
                Sdílené heslo
              </span>
              <span className="hud-chip" data-tone="green">
                Agentní finance
              </span>
            </div>
            <Logo size={52} showText={true} />
          </div>

          <div className="hud-panel flex max-w-xl flex-wrap items-center gap-3 px-4 py-4">
            <div
              className="flex h-10 w-10 items-center justify-center"
              style={{
                border: "1px solid rgba(0,229,255,0.2)",
                background: "rgba(0,229,255,0.06)",
              }}
            >
              <Shield size={18} color="#00E5FF" />
            </div>
            <div>
              <div style={labelStyle}>SCH-EKONOM CONTROL CENTER</div>
              <div
                style={{
                  color: "#FFFFFF",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                }}
              >
                Jeden klient, tři role, jedna inteligentní operační vrstva.
              </div>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid gap-6 xl:grid-cols-12">
          {/* Left column */}
          <div className="xl:col-span-7">
            {/* Profile selector panel */}
            <div className="hud-panel mb-6 p-6 md:p-8">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="hud-chip" data-tone="cyan">
                  CONTROLLED ACCESS
                </span>
                <span className="hud-chip" data-tone="slate">
                  3 demo profily
                </span>
              </div>

              <h1
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "clamp(2.4rem, 4vw, 4.6rem)",
                  lineHeight: 1.02,
                  color: "#FFFFFF",
                  marginBottom: 16,
                }}
              >
                Vstup do
                <br />
                <span
                  style={{
                    background:
                      "linear-gradient(90deg, #00E5FF 0%, rgba(212,175,55,0.92) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  SCH-EKONOM Control Center
                </span>
              </h1>

              <p
                style={{
                  color: "#B8C1C8",
                  maxWidth: 760,
                  lineHeight: 1.78,
                  marginBottom: 28,
                }}
              >
                Místo další landing page tady vzniká produktový showcase. Login
                je řízený sdíleným heslem a po přihlášení se otevře
                role-specific pracovní plocha s klienty, workflow, riziky a
                agentními akcemi.
              </p>

              {/* Profile cards */}
              <div className="grid gap-4 md:grid-cols-3">
                {demoProfiles.map((profile) => {
                  const isActive = profile.id === activeProfile.id;
                  return (
                    <button
                      key={profile.id}
                      type="button"
                      className={`hud-card-selectable ${isActive ? "hud-card-selectable-active" : ""}`}
                      onClick={() => pickProfile(profile)}
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <span
                          className="hud-chip"
                          data-tone={isActive ? "cyan" : "slate"}
                        >
                          Demo access
                        </span>
                        <span
                          style={{
                            ...labelStyle,
                            color: "rgba(255,255,255,0.48)",
                          }}
                        >
                          {profile.role === "client" ? "CLIENT" : "EMPLOYEE"}
                        </span>
                      </div>
                      <div
                        style={{
                          fontFamily: "Space Grotesk, sans-serif",
                          fontSize: "1.55rem",
                          color: "#FFFFFF",
                          fontWeight: 700,
                          marginBottom: 8,
                        }}
                      >
                        {profile.surname}
                      </div>
                      <div
                        style={{
                          color: "#FFFFFF",
                          fontSize: "0.92rem",
                          marginBottom: 4,
                        }}
                      >
                        {profile.title}
                      </div>
                      <div
                        style={{
                          color: "#7A8A9E",
                          fontSize: "0.82rem",
                          marginBottom: 14,
                        }}
                      >
                        {profile.phone}
                      </div>
                      <div
                        style={{
                          color: "#B8C1C8",
                          lineHeight: 1.65,
                          fontSize: "0.83rem",
                        }}
                      >
                        {profile.summary}
                      </div>
                      <div
                        className="mt-4 flex items-center gap-2"
                        style={{ color: "#7A8A9E" }}
                      >
                        <Building2 size={14} />
                        <span style={{ fontSize: "0.78rem" }}>
                          {profile.domain}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Login form */}
            <form className="hud-panel p-6" onSubmit={handleLogin}>
              <div className="mb-5 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center"
                  style={{
                    border: "1px solid rgba(212,175,55,0.22)",
                    background: "rgba(212,175,55,0.06)",
                  }}
                >
                  <Lock size={18} color="rgba(212,175,55,0.92)" />
                </div>
                <div>
                  <div style={labelStyle}>LOGIN // PROFIL + HESLO</div>
                  <div style={{ color: "#FFFFFF", fontSize: "0.92rem" }}>
                    Otevřít pracovní plochu podle role
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <label>
                  <span style={labelStyle}>Příjmení</span>
                  <input
                    className="hud-input"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="svanda"
                  />
                </label>
                <label>
                  <span style={labelStyle}>Telefon</span>
                  <input
                    className="hud-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+491759096965"
                  />
                </label>
                <label>
                  <span style={labelStyle}>Heslo</span>
                  <input
                    className="hud-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                </label>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  className="hud-button"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Ověřuji..." : "Otevřít pracovní plochu"}
                  <ArrowRight size={15} />
                </button>
                <span className="hud-chip" data-tone="slate">
                  Sdílené heslo pro všechny profily
                </span>
              </div>

              {error && (
                <div className="hud-inline-alert mt-5">
                  <AlertTriangle size={16} />
                  <span>{error}</span>
                </div>
              )}
            </form>
          </div>

          {/* Right column */}
          <div className="space-y-6 xl:col-span-5">
            {/* Demo flow panel */}
            <div className="hud-panel p-6">
              <div className="mb-4 flex items-center gap-3">
                <Bot size={18} color="#00E5FF" />
                <div>
                  <div style={labelStyle}>WHAT OWNER SEES</div>
                  <div style={{ color: "#FFFFFF", fontSize: "0.92rem" }}>
                    Hlavní wow momenty showcase
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {demoFlow.map((step, index) => (
                  <div key={step} className="hud-list-row">
                    <span className="hud-step-index">{index + 1}</span>
                    <span style={{ color: "#B8C1C8", lineHeight: 1.6 }}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* API handshake panel */}
            <div className="hud-panel p-6">
              <div className="mb-4 flex items-center gap-3">
                <Cpu size={18} color="#00E5FF" />
                <div>
                  <div style={labelStyle}>API HANDSHAKE</div>
                  <div style={{ color: "#FFFFFF", fontSize: "0.92rem" }}>
                    Showcase je připravený jako produkt, ne jako obrázek.
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {apiHandshake.map((endpoint) => (
                  <div key={endpoint} className="hud-list-row">
                    <span className="hud-chip" data-tone="cyan">
                      200
                    </span>
                    <span
                      style={{
                        fontFamily: "SF Mono, Monaco, Consolas, monospace",
                        color: "#B8C1C8",
                        fontSize: "0.75rem",
                      }}
                    >
                      {endpoint}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected profile panel */}
            <div className="hud-panel p-6">
              <div className="mb-4 flex items-center gap-3">
                <Activity size={18} color="#00E5FF" />
                <div>
                  <div style={labelStyle}>SELECTED PROFILE</div>
                  <div
                    style={{
                      color: "#FFFFFF",
                      fontSize: "1rem",
                      fontWeight: 600,
                    }}
                  >
                    {activeProfile.surname} // {activeProfile.title}
                  </div>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <InfoTile
                  title="Role"
                  value={activeProfile.title}
                  sub={activeProfile.domain}
                  icon={User}
                />
                <InfoTile
                  title="Viditelní klienti"
                  value={String(activeProfile.visibleClientIds.length)}
                  sub="Role-based přístup"
                  icon={Users}
                />
                <InfoTile
                  title="Telefon"
                  value={activeProfile.phone}
                  sub="Showcase identifikátor"
                  icon={Phone}
                />
                <InfoTile
                  title="Workflow"
                  value="Heslo -> Workspace"
                  sub="Sdílené demo heslo"
                  icon={Shield}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
