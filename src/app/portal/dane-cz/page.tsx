"use client";

import { FileText, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { useAuth } from "@/lib/auth/context";
import { getCompaniesForProfile, taxReturns } from "@/lib/erp/data";

const labelStyle = {
  fontFamily: "SF Mono, Monaco, Consolas, monospace",
  fontSize: "0.62rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "rgba(0,229,255,0.72)",
};

const fmtDate = new Intl.DateTimeFormat("cs-CZ", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const statusConfig: Record<
  string,
  { tone: string; label: string; icon: typeof CheckCircle2 }
> = {
  filed: { tone: "green", label: "Podáno", icon: CheckCircle2 },
  draft: { tone: "slate", label: "Koncept", icon: Clock },
  in_progress: { tone: "cyan", label: "Zpracovává se", icon: Clock },
  pending: { tone: "gold", label: "Čeká na podání", icon: Clock },
  overdue: { tone: "red", label: "Po termínu", icon: AlertTriangle },
};

export default function DaneCzPage() {
  const { profile } = useAuth();
  if (!profile) return null;

  const companies = getCompaniesForProfile(profile);
  const companyIds = new Set(companies.map((c) => c.id));

  const returns = taxReturns
    .filter((r) => companyIds.has(r.companyId))
    .sort(
      (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime(),
    );

  const filed = returns.filter((r) => r.status === "filed").length;
  const pending = returns.filter((r) => r.status !== "filed").length;

  // Group by tax type
  const types = [...new Set(returns.map((r) => r.type))];

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="hud-chip" data-tone="cyan">
            ČESKÉ DANĚ
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
          Daňová přiznání CZ
        </h1>
        <p style={{ color: "#7A8A9E", maxWidth: 600, lineHeight: 1.6 }}>
          Přehled DPPO, DPH, silniční daně a dalších českých daňových
          povinností.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="hud-metric-card" data-tone="cyan">
          <div className="mb-2" style={labelStyle}>
            Celkem přiznání
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {returns.length}
          </div>
        </div>
        <div className="hud-metric-card" data-tone="green">
          <div className="mb-2" style={labelStyle}>
            Podáno
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {filed}
          </div>
        </div>
        <div
          className="hud-metric-card"
          data-tone={pending > 0 ? "gold" : "green"}
        >
          <div className="mb-2" style={labelStyle}>
            Ke zpracování
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {pending}
          </div>
        </div>
      </div>

      {/* By tax type */}
      {types.map((type) => {
        const typeReturns = returns.filter((r) => r.type === type);
        return (
          <div key={type} className="hud-panel p-6">
            <div className="mb-5 flex items-center gap-2">
              <FileText size={16} className="text-cyan" />
              <span
                style={{
                  color: "#FFFFFF",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                }}
              >
                {type}
              </span>
              <span className="hud-chip" data-tone="slate">
                {typeReturns.length} záznamů
              </span>
            </div>
            <div className="space-y-2">
              {typeReturns.map((ret) => {
                const config = statusConfig[ret.status] || statusConfig.pending;
                const StatusIcon = config.icon;
                return (
                  <div key={ret.id} className="hud-list-row">
                    <div className="flex items-center gap-3 min-w-0">
                      <StatusIcon
                        size={16}
                        className="flex-shrink-0"
                        style={{
                          color:
                            config.tone === "green"
                              ? "#00E5A0"
                              : config.tone === "red"
                                ? "#FF7B7B"
                                : config.tone === "gold"
                                  ? "#E6C65C"
                                  : "#00E5FF",
                        }}
                      />
                      <div className="min-w-0">
                        <div
                          style={{
                            color: "#FFFFFF",
                            fontWeight: 600,
                            fontSize: "0.88rem",
                          }}
                          className="truncate"
                        >
                          {companies.find((c) => c.id === ret.companyId)
                            ?.name || ret.companyId}
                        </div>
                        <div style={{ color: "#7A8A9E", fontSize: "0.78rem" }}>
                          Období: {ret.period} // {ret.type}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="hud-chip" data-tone="slate">
                        {fmtDate.format(new Date(ret.dueDate))}
                      </span>
                      <span className="hud-chip" data-tone={config.tone}>
                        {config.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {returns.length === 0 && (
        <div className="hud-panel p-6">
          <div
            className="flex items-center justify-center py-12"
            style={{ color: "#7A8A9E" }}
          >
            <div className="text-center">
              <FileText
                size={32}
                className="mx-auto mb-3"
                style={{ color: "rgba(0,229,255,0.2)" }}
              />
              <div>Žádná česká daňová přiznání pro vaše firmy.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
