"use client";

import { Banknote, Users } from "lucide-react";
import { useAuth } from "@/lib/auth/context";
import { getCompaniesForProfile, payrollRecords } from "@/lib/erp/data";

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

const statusTone: Record<string, string> = {
  processed: "green",
  pending: "gold",
  draft: "slate",
  error: "red",
};

const statusLabel: Record<string, string> = {
  processed: "Zpracováno",
  pending: "Ke zpracování",
  draft: "Koncept",
  error: "Chyba",
};

export default function MzdyPage() {
  const { profile } = useAuth();
  if (!profile) return null;

  const companies = getCompaniesForProfile(profile);
  const companyIds = new Set(companies.map((c) => c.id));

  const records = payrollRecords
    .filter((r) => companyIds.has(r.companyId))
    .sort((a, b) => new Date(b.month).getTime() - new Date(a.month).getTime());

  const totalGross = records.reduce((s, r) => s + r.gross, 0);
  const totalNet = records.reduce((s, r) => s + r.net, 0);
  const totalEmployees = new Set(records.map((r) => r.employeeName)).size;

  // Group by company
  const byCompany = companies.map((c) => {
    const compRecs = records.filter((r) => r.companyId === c.id);
    return {
      company: c,
      records: compRecs,
      totalGross: compRecs.reduce((s, r) => s + r.gross, 0),
      totalNet: compRecs.reduce((s, r) => s + r.net, 0),
      employees: new Set(compRecs.map((r) => r.employeeName)).size,
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="hud-chip" data-tone="cyan">
            MZDY
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
          Mzdový modul
        </h1>
        <p style={{ color: "#7A8A9E", maxWidth: 600, lineHeight: 1.6 }}>
          Přehled mezd, odvodů a personalistiky napříč klienty.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="hud-metric-card" data-tone="cyan">
          <div className="mb-2 flex items-center gap-2">
            <Banknote size={14} className="text-cyan" />
            <span style={labelStyle}>Hrubé mzdy celkem</span>
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {fmt.format(totalGross)}
          </div>
        </div>
        <div className="hud-metric-card" data-tone="green">
          <div className="mb-2 flex items-center gap-2">
            <Banknote size={14} className="text-status-green" />
            <span style={labelStyle}>Čisté mzdy celkem</span>
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {fmt.format(totalNet)}
          </div>
        </div>
        <div className="hud-metric-card" data-tone="slate">
          <div className="mb-2 flex items-center gap-2">
            <Users size={14} className="text-cyan" />
            <span style={labelStyle}>Zaměstnanců</span>
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {totalEmployees}
          </div>
        </div>
      </div>

      {/* Per-company summary */}
      <div className="grid gap-4 lg:grid-cols-2">
        {byCompany.map(
          ({ company, records: compRecs, totalGross: cGross, employees }) => (
            <div key={company.id} className="hud-panel p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div style={{ color: "#FFFFFF", fontWeight: 600 }}>
                    {company.name}
                  </div>
                  <div style={{ color: "#7A8A9E", fontSize: "0.82rem" }}>
                    {employees} zaměstnanců // {compRecs.length} období
                  </div>
                </div>
                <span className="hud-chip" data-tone="cyan">
                  {fmt.format(cGross)}
                </span>
              </div>
            </div>
          ),
        )}
      </div>

      {/* Payroll records table */}
      <div className="hud-panel p-6">
        <div className="mb-5">
          <div style={labelStyle} className="mb-1">
            MZDOVÉ ZÁZNAMY
          </div>
          <div
            style={{ color: "#FFFFFF", fontSize: "1.05rem", fontWeight: 600 }}
          >
            Poslední zpracované mzdy
          </div>
        </div>

        <div className="space-y-1">
          {records.slice(0, 20).map((rec) => (
            <div key={rec.id} className="hud-list-row">
              <div className="flex items-center gap-3 min-w-0">
                <Banknote size={16} className="text-cyan flex-shrink-0" />
                <div className="min-w-0">
                  <div
                    style={{
                      color: "#FFFFFF",
                      fontWeight: 600,
                      fontSize: "0.88rem",
                    }}
                    className="truncate"
                  >
                    {companies.find((c) => c.id === rec.companyId)?.name ||
                      rec.companyId}
                  </div>
                  <div style={{ color: "#7A8A9E", fontSize: "0.78rem" }}>
                    Období: {rec.month} // {1} zaměstnanců
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="text-right">
                  <div
                    style={{
                      color: "#FFFFFF",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                    }}
                  >
                    {fmt.format(rec.gross)}
                  </div>
                  <div style={{ color: "#7A8A9E", fontSize: "0.72rem" }}>
                    hrubá
                  </div>
                </div>
                <span
                  className="hud-chip"
                  data-tone={statusTone[rec.status] || "slate"}
                >
                  {statusLabel[rec.status] || rec.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
