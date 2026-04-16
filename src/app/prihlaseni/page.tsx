"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  Lock,
  Phone,
  Shield,
  User,
  Building2,
  Crown,
  Briefcase,
} from "lucide-react";
import Logo from "@/components/shared/Logo";
import { useAuth } from "@/lib/auth/context";
import { erpProfiles } from "@/lib/erp/data";
import type { ErpProfile } from "@/lib/erp/types";
import { log } from "@/lib/logger";

const labelStyle = {
  fontFamily: "SF Mono, Monaco, Consolas, monospace",
  fontSize: "0.62rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "rgba(0,229,255,0.72)",
};

const roleIcons: Record<string, typeof User> = {
  owner: Crown,
  employee: Briefcase,
  client: User,
};

const roleBadgeColors: Record<string, string> = {
  owner: "gold",
  employee: "cyan",
  client: "green",
};

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [selectedProfile, setSelectedProfile] = useState<ErpProfile | null>(
    null,
  );
  const [phoneInput, setPhoneInput] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"pick" | "phone" | "code">("pick");
  const [loadingStage, setLoadingStage] = useState<"request" | "verify" | null>(
    null,
  );
  const [error, setError] = useState("");
  const [smsSent, setSmsSent] = useState(false);

  const pickProfile = (profile: ErpProfile) => {
    log.authProfileSelected({
      id: profile.id,
      name: profile.name,
      role: profile.role,
    });
    setSelectedProfile(profile);
    setPhoneInput("");
    setCode("");
    setError("");
    setSmsSent(false);
    setStep("phone");
  };

  const handleRequestCode = async (event: FormEvent) => {
    event.preventDefault();
    if (!selectedProfile || !phoneInput) return;
    setLoadingStage("request");
    setError("");

    log.authRequestingOtp(phoneInput);

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profileId: selectedProfile.id,
          phone: phoneInput,
        }),
      });
      const data = await res.json();

      log.authOtpResponse(data.status, data.error || data.debug);

      if (!res.ok) throw new Error(data.error || "Nepodařilo se odeslat kód.");

      setSmsSent(true);
      setStep("code");
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Chyba při odesílání SMS.";
      log.authOtpResponse("error", msg);
      setError(msg);
    } finally {
      setLoadingStage(null);
    }
  };

  const handleVerifyCode = async (event: FormEvent) => {
    event.preventDefault();
    if (!code || !phoneInput) return;
    setLoadingStage("verify");
    setError("");

    log.authVerifying();

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneInput, code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ověření selhalo.");

      log.authLoginSuccess(data.profile.name);
      login(data.profile);
      router.push("/portal");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Chyba při ověřování.";
      log.authLoginFailed(msg);
      setError(msg);
    } finally {
      setLoadingStage(null);
    }
  };

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
                ERP SHOWCASE
              </span>
              <span className="hud-chip" data-tone="gold">
                OTP OVĚŘENÍ
              </span>
              <span className="hud-chip" data-tone="green">
                3 ROLE
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
                Kompletní ERP pro účetní firmu. Vyberte roli a vstupte.
              </div>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid gap-6 xl:grid-cols-12">
          {/* Left column — profile cards + auth */}
          <div className="xl:col-span-7">
            <div className="hud-panel mb-6 p-6 md:p-8">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="hud-chip" data-tone="cyan">
                  CONTROLLED ACCESS
                </span>
                <span className="hud-chip" data-tone="slate">
                  3 profily
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
                  Control Center
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
                Každá role vidí jiný rozsah dat, jinou navigaci a jiné metriky.
                Přihlášení přes OTP zajišťuje bezpečný přístup bez klasických
                hesel.
              </p>

              {/* Profile cards */}
              <div className="grid gap-4 md:grid-cols-3">
                {erpProfiles.map((profile) => {
                  const isActive = selectedProfile?.id === profile.id;
                  const RoleIcon = roleIcons[profile.role] || User;
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
                          {profile.role.toUpperCase()}
                        </span>
                        <RoleIcon
                          size={18}
                          color={isActive ? "#00E5FF" : "#7A8A9E"}
                        />
                      </div>

                      {profile.photo ? (
                        <div
                          className="mb-3 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full"
                          style={{ border: "2px solid rgba(0,229,255,0.2)" }}
                        >
                          <div
                            className="flex h-full w-full items-center justify-center"
                            style={{
                              background: `linear-gradient(135deg, rgba(0,229,255,0.15), rgba(212,175,55,0.1))`,
                              fontFamily: "Space Grotesk, sans-serif",
                              fontSize: "1.1rem",
                              fontWeight: 700,
                              color: "#00E5FF",
                            }}
                          >
                            {profile.name.split(" ")[0][0]}
                            {profile.surname[0]?.toUpperCase()}
                          </div>
                        </div>
                      ) : (
                        <div
                          className="mb-3 flex h-12 w-12 items-center justify-center rounded-full"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(212,175,55,0.1))",
                            border: "2px solid rgba(0,229,255,0.2)",
                            fontFamily: "Space Grotesk, sans-serif",
                            fontSize: "1.1rem",
                            fontWeight: 700,
                            color: "#00E5FF",
                          }}
                        >
                          {profile.name.split(" ")[0][0]}
                          {profile.surname[0]?.toUpperCase()}
                        </div>
                      )}

                      <div
                        style={{
                          fontFamily: "Space Grotesk, sans-serif",
                          fontSize: "1.35rem",
                          color: "#FFFFFF",
                          fontWeight: 700,
                          marginBottom: 4,
                        }}
                      >
                        {profile.name.split(" ")[0]} {profile.surname}
                      </div>
                      <div
                        style={{
                          color: "#FFFFFF",
                          fontSize: "0.88rem",
                          marginBottom: 4,
                        }}
                      >
                        {profile.title}
                      </div>
                      <div
                        style={{
                          color: "#B8C1C8",
                          lineHeight: 1.65,
                          fontSize: "0.83rem",
                          marginBottom: 4,
                        }}
                      >
                        {profile.department}
                      </div>
                      <div
                        className="mt-4 flex items-center gap-2"
                        style={{ color: "#7A8A9E" }}
                      >
                        <Building2 size={14} />
                        <span style={{ fontSize: "0.78rem" }}>
                          {profile.visibleCompanyIds.length}{" "}
                          {profile.visibleCompanyIds.length === 1
                            ? "firma"
                            : profile.visibleCompanyIds.length < 5
                              ? "firmy"
                              : "firem"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Auth form — step-based */}
            {step === "phone" && selectedProfile && (
              <div className="max-w-lg">
                <form className="hud-panel p-6" onSubmit={handleRequestCode}>
                  <div className="mb-5 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center"
                      style={{
                        border: "1px solid rgba(0,229,255,0.22)",
                        background: "rgba(0,229,255,0.06)",
                      }}
                    >
                      <Phone size={18} color="#00E5FF" />
                    </div>
                    <div>
                      <div style={labelStyle}>STEP 01 // SMS OVĚŘENÍ</div>
                      <div style={{ color: "#FFFFFF", fontSize: "0.92rem" }}>
                        Zadejte váš telefon pro zaslání kódu
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 rounded-sm border border-cyan-500/10 bg-cyan-500/5 p-3">
                    <div style={labelStyle}>Vybraný profil</div>
                    <div
                      style={{
                        color: "#FFFFFF",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        marginTop: 4,
                      }}
                    >
                      {selectedProfile.name} — {selectedProfile.title}
                    </div>
                  </div>

                  <label className="mb-4 block">
                    <span style={labelStyle}>Váš telefonní číslo</span>
                    <input
                      className="hud-input"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="+420..."
                      disabled={!selectedProfile}
                    />
                  </label>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      className="hud-button"
                      type="submit"
                      disabled={!phoneInput || loadingStage === "request"}
                    >
                      {loadingStage === "request"
                        ? "Odesílám SMS..."
                        : "Odeslat ověřovací kód"}
                      <ArrowRight size={15} />
                    </button>
                    <button
                      type="button"
                      className="hud-button-secondary"
                      onClick={() => {
                        setStep("pick");
                        setSelectedProfile(null);
                        setError("");
                      }}
                    >
                      Zpět
                    </button>
                  </div>

                  <div
                    className="mt-4"
                    style={{
                      color: "#7A8A9E",
                      fontSize: "0.78rem",
                      lineHeight: 1.5,
                    }}
                  >
                    Na zadané číslo přijde SMS s 6místným ověřovacím kódem z
                    čísla +1 (276) 800-1167.
                  </div>

                  {error && (
                    <div className="hud-inline-alert mt-5">
                      <AlertTriangle size={16} />
                      <span>{error}</span>
                    </div>
                  )}
                </form>
              </div>
            )}

            {/* Step 2: Enter OTP code */}
            {step === "code" && selectedProfile && (
              <div className="max-w-lg">
                <form className="hud-panel p-6" onSubmit={handleVerifyCode}>
                  <div className="mb-5 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center"
                      style={{
                        border: "1px solid rgba(0,229,160,0.22)",
                        background: "rgba(0,229,160,0.06)",
                      }}
                    >
                      <Lock size={18} color="#00E5A0" />
                    </div>
                    <div>
                      <div style={labelStyle}>STEP 02 // OVĚŘENÍ</div>
                      <div style={{ color: "#FFFFFF", fontSize: "0.92rem" }}>
                        Zadejte kód z SMS
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 rounded-sm border border-status-green/15 bg-status-green/5 p-3">
                    <div
                      style={{
                        color: "#00E5A0",
                        fontSize: "0.85rem",
                        fontWeight: 500,
                      }}
                    >
                      ✓ SMS odeslána na {phoneInput}
                    </div>
                    <div
                      style={{
                        color: "#7A8A9E",
                        fontSize: "0.75rem",
                        marginTop: 4,
                      }}
                    >
                      Profil: {selectedProfile.name} ({selectedProfile.role})
                    </div>
                  </div>

                  <label className="mb-4 block">
                    <span style={labelStyle}>6místný ověřovací kód</span>
                    <input
                      className="hud-input"
                      value={code}
                      onChange={(e) =>
                        setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                      }
                      placeholder="000000"
                      maxLength={6}
                      autoFocus
                      style={{
                        fontSize: "1.5rem",
                        letterSpacing: "0.3em",
                        textAlign: "center",
                      }}
                    />
                  </label>

                  {/* Kód se NIKDY nezobrazuje — přijde POUZE přes SMS */}

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      className="hud-button"
                      type="submit"
                      disabled={code.length < 6 || loadingStage === "verify"}
                    >
                      {loadingStage === "verify"
                        ? "Ověřuji..."
                        : "Vstoupit do portálu"}
                      <ArrowRight size={15} />
                    </button>
                    <button
                      type="button"
                      className="hud-button-secondary"
                      onClick={() => {
                        setStep("phone");
                        setCode("");
                        setError("");
                      }}
                    >
                      Zpět
                    </button>
                  </div>

                  {error && (
                    <div className="hud-inline-alert mt-5">
                      <AlertTriangle size={16} />
                      <span>{error}</span>
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>

          {/* Right column — info panels */}
          <div className="space-y-6 xl:col-span-5">
            {selectedProfile && (
              <div className="hud-panel p-6">
                <div className="mb-4 flex items-center gap-3">
                  <User size={18} color="#00E5FF" />
                  <div>
                    <div style={labelStyle}>VYBRANÝ PROFIL</div>
                    <div
                      style={{
                        color: "#FFFFFF",
                        fontSize: "1rem",
                        fontWeight: 600,
                      }}
                    >
                      {selectedProfile.name.split(" ")[0]}{" "}
                      {selectedProfile.surname}
                    </div>
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="hud-mini-metric" data-tone="slate">
                    <div className="mb-2" style={labelStyle}>
                      Role
                    </div>
                    <div style={{ color: "#FFFFFF", fontWeight: 600 }}>
                      {selectedProfile.title}
                    </div>
                  </div>
                  <div className="hud-mini-metric" data-tone="slate">
                    <div className="mb-2" style={labelStyle}>
                      Viditelné firmy
                    </div>
                    <div style={{ color: "#FFFFFF", fontWeight: 600 }}>
                      {selectedProfile.visibleCompanyIds.length}
                    </div>
                  </div>
                  <div className="hud-mini-metric" data-tone="slate">
                    <div className="mb-2" style={labelStyle}>
                      Oddělení
                    </div>
                    <div style={{ color: "#FFFFFF", fontWeight: 600 }}>
                      {selectedProfile.department}
                    </div>
                  </div>
                  <div className="hud-mini-metric" data-tone="slate">
                    <div className="mb-2" style={labelStyle}>
                      Přístup
                    </div>
                    <div style={{ color: "#FFFFFF", fontWeight: 600 }}>
                      OTP ověření
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="hud-panel p-6">
              <div className="mb-4 flex items-center gap-3">
                <Shield size={18} color="#00E5FF" />
                <div>
                  <div style={labelStyle}>ROLE-BASED ACCESS</div>
                  <div style={{ color: "#FFFFFF", fontSize: "0.92rem" }}>
                    Co vidí každá role
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  {
                    role: "Owner",
                    desc: "Kompletní přehled: 14 modulů, všichni klienti, financování, rizika",
                  },
                  {
                    role: "Employee",
                    desc: "Přiřazení klienti, úkoly, daně CZ/DE, dokumenty, komunikace",
                  },
                  {
                    role: "Client",
                    desc: "Vlastní firma: stav, dokumenty, termíny, doporučení, finance",
                  },
                ].map((item) => (
                  <div
                    key={item.role}
                    className="hud-list-row hud-list-row-stacked"
                  >
                    <div className="mb-2">
                      <span
                        className="hud-chip"
                        data-tone={
                          item.role === "Owner"
                            ? "gold"
                            : item.role === "Employee"
                              ? "cyan"
                              : "green"
                        }
                      >
                        {item.role}
                      </span>
                    </div>
                    <div
                      style={{
                        color: "#B8C1C8",
                        lineHeight: 1.6,
                        fontSize: "0.88rem",
                      }}
                    >
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hud-panel p-6">
              <div className="mb-4 flex items-center gap-3">
                <Lock size={18} color="#00E5FF" />
                <div>
                  <div style={labelStyle}>TECHNOLOGIE</div>
                  <div style={{ color: "#FFFFFF", fontSize: "0.92rem" }}>
                    Bezpečnostní vrstva
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  "Twilio SMS OTP na telefon majitele",
                  "Role-based navigace a data filtering",
                  "Žádná hesla, pouze jednorázové kódy",
                  "Automatický redirect podle role",
                ].map((step, i) => (
                  <div key={step} className="hud-list-row">
                    <span className="hud-step-index">{i + 1}</span>
                    <span style={{ color: "#B8C1C8", lineHeight: 1.6 }}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
