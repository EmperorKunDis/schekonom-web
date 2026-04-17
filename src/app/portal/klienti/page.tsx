"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  ArrowRight,
  ShieldAlert,
  FileWarning,
  Users,
  Plus,
  X,
  Check,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/lib/auth/context";
import {
  getCompaniesForProfile,
  invoices,
  riskAlerts,
  payrollRecords,
} from "@/lib/erp/data";

const labelStyle = {
  fontFamily: "SF Mono, Monaco, Consolas, monospace",
  fontSize: "0.62rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "rgba(0,229,255,0.72)",
};

const fmt = new Intl.NumberFormat("cs-CZ", {
  style: "currency",
  currency: "CZK",
  maximumFractionDigits: 0,
});

// ── Onboarding Wizard ────────────────────────────────────────────────────────

const SERVICES = [
  "Vedení účetnictví",
  "Zpracování mezd",
  "DPH přiznání",
  "DPPO / DPFO",
  "Německé daně",
  "Freistellung",
  "Přeshraniční poradenství",
  "Certifikační autorita",
];

const CLIENT_TYPES = [
  { id: "cz", label: "CZ firma", sub: "Česká právnická nebo fyzická osoba" },
  { id: "de", label: "DE firma", sub: "Německá GmbH, UG nebo živnostník" },
  { id: "pendler", label: "Pendler", sub: "CZ rezident pracující v Německu" },
  { id: "cz-de", label: "CZ/DE", sub: "Přeshraniční provoz v obou zemích" },
];

interface WizardData {
  ico: string;
  name: string;
  city: string;
  type: string;
  services: string[];
  contact: string;
  email: string;
}

function OnboardingWizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<WizardData>({
    ico: "",
    name: "",
    city: "",
    type: "",
    services: [],
    contact: "",
    email: "",
  });

  const toggleService = (s: string) =>
    setData((prev) => ({
      ...prev,
      services: prev.services.includes(s)
        ? prev.services.filter((x) => x !== s)
        : [...prev.services, s],
    }));

  const finish = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setDone(true);
  };

  const steps = ["Základní info", "Typ klienta", "Služby", "Kontakt"];

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,28,48,0.99) 0%, rgba(3,8,13,0.99) 100%)",
          border: "1px solid rgba(0,229,255,0.2)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid rgba(0,229,255,0.12)" }}
        >
          <div>
            <div
              style={{
                color: "#FFFFFF",
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              {done ? "Klient přidán" : "Nový klient — onboarding"}
            </div>
            {!done && (
              <div style={{ ...labelStyle, marginTop: 2 }}>
                KROK {step} / {steps.length} — {steps[step - 1]}
              </div>
            )}
          </div>
          <button onClick={onClose} style={{ color: "rgba(255,255,255,0.3)" }}>
            <X size={18} />
          </button>
        </div>

        {/* Progress bar */}
        {!done && (
          <div
            style={{
              height: 2,
              background: "rgba(0,229,255,0.08)",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${(step / steps.length) * 100}%`,
                background: "rgba(0,229,255,0.6)",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-6">
          {/* Step 1 — Základní info */}
          {step === 1 && !done && (
            <div className="space-y-4">
              <div>
                <label
                  style={{ ...labelStyle, display: "block", marginBottom: 6 }}
                >
                  IČO *
                </label>
                <input
                  value={data.ico}
                  onChange={(e) =>
                    setData((p) => ({ ...p, ico: e.target.value }))
                  }
                  placeholder="např. 28735421"
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(0,229,255,0.15)",
                    color: "#FFFFFF",
                    fontSize: "0.88rem",
                    padding: "10px 14px",
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <label
                  style={{ ...labelStyle, display: "block", marginBottom: 6 }}
                >
                  Název firmy *
                </label>
                <input
                  value={data.name}
                  onChange={(e) =>
                    setData((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="např. Kovář s.r.o."
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(0,229,255,0.15)",
                    color: "#FFFFFF",
                    fontSize: "0.88rem",
                    padding: "10px 14px",
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <label
                  style={{ ...labelStyle, display: "block", marginBottom: 6 }}
                >
                  Sídlo / Město
                </label>
                <input
                  value={data.city}
                  onChange={(e) =>
                    setData((p) => ({ ...p, city: e.target.value }))
                  }
                  placeholder="např. Cheb"
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(0,229,255,0.15)",
                    color: "#FFFFFF",
                    fontSize: "0.88rem",
                    padding: "10px 14px",
                    outline: "none",
                  }}
                />
              </div>
            </div>
          )}

          {/* Step 2 — Typ klienta */}
          {step === 2 && !done && (
            <div className="space-y-2">
              {CLIENT_TYPES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setData((p) => ({ ...p, type: t.id }))}
                  className="w-full flex items-center gap-3 p-4 text-left transition-all"
                  style={{
                    border: `1px solid ${data.type === t.id ? "rgba(0,229,255,0.4)" : "rgba(0,229,255,0.1)"}`,
                    background:
                      data.type === t.id
                        ? "rgba(0,229,255,0.08)"
                        : "rgba(255,255,255,0.02)",
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      border: `2px solid ${data.type === t.id ? "#00E5FF" : "rgba(0,229,255,0.2)"}`,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {data.type === t.id && (
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: "#00E5FF",
                        }}
                      />
                    )}
                  </div>
                  <div>
                    <div
                      style={{
                        color: "#FFFFFF",
                        fontWeight: 600,
                        fontSize: "0.88rem",
                      }}
                    >
                      {t.label}
                    </div>
                    <div style={{ color: "#7A8A9E", fontSize: "0.78rem" }}>
                      {t.sub}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Step 3 — Služby */}
          {step === 3 && !done && (
            <div>
              <p
                style={{
                  color: "#7A8A9E",
                  fontSize: "0.82rem",
                  marginBottom: 14,
                }}
              >
                Vyberte požadované služby:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {SERVICES.map((s) => {
                  const selected = data.services.includes(s);
                  return (
                    <button
                      key={s}
                      onClick={() => toggleService(s)}
                      className="flex items-center gap-2 p-3 text-left transition-all"
                      style={{
                        border: `1px solid ${selected ? "rgba(0,229,255,0.4)" : "rgba(0,229,255,0.1)"}`,
                        background: selected
                          ? "rgba(0,229,255,0.08)"
                          : "rgba(255,255,255,0.02)",
                      }}
                    >
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          border: `1px solid ${selected ? "#00E5FF" : "rgba(0,229,255,0.2)"}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          background: selected
                            ? "rgba(0,229,255,0.2)"
                            : "transparent",
                        }}
                      >
                        {selected && (
                          <Check size={10} style={{ color: "#00E5FF" }} />
                        )}
                      </div>
                      <span
                        style={{
                          color: selected ? "#FFFFFF" : "#B8C1C8",
                          fontSize: "0.8rem",
                        }}
                      >
                        {s}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4 — Kontakt */}
          {step === 4 && !done && (
            <div className="space-y-4">
              <div>
                <label
                  style={{ ...labelStyle, display: "block", marginBottom: 6 }}
                >
                  Kontaktní osoba *
                </label>
                <input
                  value={data.contact}
                  onChange={(e) =>
                    setData((p) => ({ ...p, contact: e.target.value }))
                  }
                  placeholder="Jméno a příjmení"
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(0,229,255,0.15)",
                    color: "#FFFFFF",
                    fontSize: "0.88rem",
                    padding: "10px 14px",
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <label
                  style={{ ...labelStyle, display: "block", marginBottom: 6 }}
                >
                  E-mail *
                </label>
                <input
                  value={data.email}
                  onChange={(e) =>
                    setData((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="kontakt@firma.cz"
                  type="email"
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(0,229,255,0.15)",
                    color: "#FFFFFF",
                    fontSize: "0.88rem",
                    padding: "10px 14px",
                    outline: "none",
                  }}
                />
              </div>
              <div
                className="p-3"
                style={{
                  background: "rgba(0,229,255,0.05)",
                  border: "1px solid rgba(0,229,255,0.12)",
                }}
              >
                <div style={{ ...labelStyle, marginBottom: 6 }}>Souhrn</div>
                <div
                  style={{
                    color: "#B8C1C8",
                    fontSize: "0.8rem",
                    lineHeight: 1.8,
                  }}
                >
                  <div>
                    IČO:{" "}
                    <span style={{ color: "#FFFFFF" }}>{data.ico || "—"}</span>
                  </div>
                  <div>
                    Firma:{" "}
                    <span style={{ color: "#FFFFFF" }}>{data.name || "—"}</span>
                  </div>
                  <div>
                    Typ:{" "}
                    <span style={{ color: "#FFFFFF" }}>{data.type || "—"}</span>
                  </div>
                  <div>
                    Služby:{" "}
                    <span style={{ color: "#FFFFFF" }}>
                      {data.services.length > 0
                        ? data.services.join(", ")
                        : "—"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Done state */}
          {done && (
            <div className="text-center py-4">
              <div
                className="w-16 h-16 mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: "rgba(0,229,160,0.1)",
                  border: "2px solid rgba(0,229,160,0.3)",
                }}
              >
                <Check size={28} style={{ color: "#00E5A0" }} />
              </div>
              <div
                style={{
                  color: "#FFFFFF",
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  marginBottom: 6,
                }}
              >
                {data.name || "Klient"} přidán
              </div>
              <div
                style={{
                  color: "#7A8A9E",
                  fontSize: "0.85rem",
                  lineHeight: 1.6,
                }}
              >
                N8N workflow spuštěn — klient bude kontaktován do 24 hodin.
                <br />
                Složka v portálu vytvořena automaticky.
              </div>
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {[
                  "N8N: Onboarding",
                  "Email: Uvítací zpráva",
                  "Složka: Dokumenty",
                ].map((tag) => (
                  <span key={tag} className="hud-chip" data-tone="green">
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!done && (
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderTop: "1px solid rgba(0,229,255,0.1)" }}
          >
            <button
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              style={{
                color: step === 1 ? "rgba(255,255,255,0.2)" : "#7A8A9E",
                fontSize: "0.85rem",
                cursor: step === 1 ? "not-allowed" : "pointer",
              }}
            >
              ← Zpět
            </button>
            {step < steps.length ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                className="flex items-center gap-2"
                style={{
                  background: "rgba(0,229,255,0.12)",
                  border: "1px solid rgba(0,229,255,0.3)",
                  color: "#00E5FF",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  padding: "8px 18px",
                }}
              >
                Další <ChevronRight size={14} />
              </button>
            ) : (
              <button
                onClick={finish}
                disabled={loading}
                className="flex items-center gap-2"
                style={{
                  background: "rgba(0,229,160,0.15)",
                  border: "1px solid rgba(0,229,160,0.35)",
                  color: "#00E5A0",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  padding: "8px 18px",
                }}
              >
                {loading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Přidávám...
                  </>
                ) : (
                  <>
                    <Check size={14} />
                    Přidat klienta
                  </>
                )}
              </button>
            )}
          </div>
        )}
        {done && (
          <div
            className="px-6 py-4"
            style={{ borderTop: "1px solid rgba(0,229,255,0.1)" }}
          >
            <button
              onClick={onClose}
              className="w-full py-2"
              style={{
                background: "rgba(0,229,255,0.08)",
                border: "1px solid rgba(0,229,255,0.2)",
                color: "#00E5FF",
                fontSize: "0.88rem",
                fontWeight: 600,
              }}
            >
              Zavřít
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function KlientiPage() {
  const { profile } = useAuth();
  const [wizardOpen, setWizardOpen] = useState(false);

  if (!profile) return null;

  const companies = getCompaniesForProfile(profile);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex flex-wrap gap-2">
            <span className="hud-chip" data-tone="cyan">
              KLIENTI
            </span>
            <span className="hud-chip" data-tone="slate">
              {companies.length} firem
            </span>
          </div>
          <h1
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              color: "#FFFFFF",
              fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)",
              lineHeight: 1.1,
              marginBottom: 8,
            }}
          >
            Portfolio klientů
          </h1>
          <p style={{ color: "#7A8A9E", maxWidth: 600, lineHeight: 1.6 }}>
            Kompletní přehled všech spravovaných firem s metrikami a stavem.
          </p>
        </div>

        {(profile.role === "owner" || profile.role === "employee") && (
          <button
            onClick={() => setWizardOpen(true)}
            className="flex items-center gap-2 flex-shrink-0"
            style={{
              background: "rgba(0,229,255,0.08)",
              border: "1px solid rgba(0,229,255,0.25)",
              color: "#00E5FF",
              fontSize: "0.82rem",
              fontWeight: 600,
              padding: "8px 16px",
              marginTop: 4,
            }}
          >
            <Plus size={15} />
            Nový klient
          </button>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {companies.map((company) => {
          const companyInvoices = invoices.filter(
            (i) => i.companyId === company.id,
          );
          const revenue = companyInvoices
            .filter((i) => i.type === "issued")
            .reduce((s, i) => s + i.amount, 0);
          const overdue = companyInvoices.filter(
            (i) => i.status === "overdue",
          ).length;
          const risks = riskAlerts.filter(
            (r) => r.companyId === company.id && !r.resolvedAt,
          ).length;
          const employees = new Set(
            payrollRecords
              .filter((p) => p.companyId === company.id)
              .map((p) => p.employeeName),
          ).size;

          return (
            <Link
              key={company.id}
              href={`/portal/klienti/${company.id}`}
              className="hud-client-card block group"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <div
                    style={{
                      color: "#FFFFFF",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      fontFamily: "Space Grotesk, sans-serif",
                    }}
                  >
                    {company.name}
                  </div>
                  <div
                    style={{
                      color: "#7A8A9E",
                      fontSize: "0.82rem",
                      marginTop: 2,
                    }}
                  >
                    IČO: {company.ico} // {company.city}
                  </div>
                </div>
                <span
                  className="hud-chip"
                  data-tone={company.status === "active" ? "green" : "slate"}
                >
                  {company.status === "active" ? "Aktivní" : company.status}
                </span>
              </div>

              {company.tags && company.tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-1">
                  {company.tags.slice(0, 4).map((svc) => (
                    <span key={svc} className="hud-chip" data-tone="slate">
                      {svc}
                    </span>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="hud-mini-metric" data-tone="slate">
                  <div className="mb-1 flex items-center gap-1">
                    <Building2 size={12} className="text-cyan" />
                    <span style={{ ...labelStyle, fontSize: "0.55rem" }}>
                      Obrat
                    </span>
                  </div>
                  <div
                    style={{
                      color: "#FFFFFF",
                      fontWeight: 600,
                      fontSize: "0.88rem",
                    }}
                  >
                    {fmt.format(revenue)}
                  </div>
                </div>
                <div className="hud-mini-metric" data-tone="slate">
                  <div className="mb-1 flex items-center gap-1">
                    <Users size={12} className="text-cyan" />
                    <span style={{ ...labelStyle, fontSize: "0.55rem" }}>
                      Zaměstnanců
                    </span>
                  </div>
                  <div
                    style={{
                      color: "#FFFFFF",
                      fontWeight: 600,
                      fontSize: "0.88rem",
                    }}
                  >
                    {employees}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {overdue > 0 && (
                    <span className="hud-chip" data-tone="red">
                      <FileWarning size={11} /> {overdue} po splatnosti
                    </span>
                  )}
                  {risks > 0 && (
                    <span className="hud-chip" data-tone="red">
                      <ShieldAlert size={11} /> {risks} rizik
                    </span>
                  )}
                  {overdue === 0 && risks === 0 && (
                    <span className="hud-chip" data-tone="green">
                      Vše OK
                    </span>
                  )}
                </div>
                <ArrowRight
                  size={16}
                  className="text-text-muted group-hover:text-cyan transition-colors"
                />
              </div>
            </Link>
          );
        })}
      </div>

      {wizardOpen && <OnboardingWizard onClose={() => setWizardOpen(false)} />}
    </div>
  );
}
