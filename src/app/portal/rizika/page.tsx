"use client";

import { ShieldAlert } from "lucide-react";
import { useAuth } from "@/lib/auth/context";
import { getCompaniesForProfile, riskAlerts } from "@/lib/erp/data";

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

const severityOrder: Record<string, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
};

const severityTone: Record<string, string> = {
  critical: "red",
  high: "red",
  medium: "gold",
  low: "slate",
};

const severityLabel: Record<string, string> = {
  critical: "Kritické",
  high: "Vysoké",
  medium: "Střední",
  low: "Nízké",
};

export default function RizikaPage() {
  const { profile } = useAuth();
  if (!profile) return null;

  const companies = getCompaniesForProfile(profile);
  const companyIds = new Set(companies.map((c) => c.id));

  const alerts = riskAlerts
    .filter((r) => companyIds.has(r.companyId))
    .sort(
      (a, b) =>
        (severityOrder[a.severity] ?? 99) - (severityOrder[b.severity] ?? 99),
    );

  const openAlerts = alerts.filter((a) => !a.resolvedAt);
  const resolvedAlerts = alerts.filter((a) => a.resolvedAt ? "resolved" : "open" !== "open");

  // Group open by severity
  const grouped: Record<string, typeof alerts> = {};
  for (const alert of openAlerts) {
    const sev = alert.severity;
    if (!grouped[sev]) grouped[sev] = [];
    grouped[sev].push(alert);
  }

  const severityKeys = Object.keys(grouped).sort(
    (a, b) => (severityOrder[a] ?? 99) - (severityOrder[b] ?? 99),
  );

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="hud-chip" data-tone="red">
            RIZIKA
          </span>
          <span className="hud-chip" data-tone="slate">
            {openAlerts.length} otevřených
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
          Riziková upozornění
        </h1>
        <p style={{ color: "#7A8A9E", maxWidth: 600, lineHeight: 1.6 }}>
          Automaticky detekovaná rizika seskupená podle závažnosti.
        </p>
      </div>

      {/* Summary KPIs */}
      <div className="grid gap-4 md:grid-cols-4">
        {(["critical", "high", "medium", "low"] as const).map((sev) => {
          const count = openAlerts.filter((a) => a.severity === sev).length;
          return (
            <div
              key={sev}
              className="hud-metric-card"
              data-tone={count > 0 ? severityTone[sev] : "slate"}
            >
              <div className="mb-2" style={labelStyle}>
                {severityLabel[sev]}
              </div>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                {count}
              </div>
            </div>
          );
        })}
      </div>

      {/* Grouped alerts */}
      {severityKeys.map((sev) => (
        <div key={sev} className="hud-panel p-6">
          <div className="mb-5 flex items-center gap-2">
            <ShieldAlert
              size={16}
              style={{
                color:
                  sev === "critical" || sev === "high"
                    ? "#FF7B7B"
                    : sev === "medium"
                      ? "#E6C65C"
                      : "#7A8A9E",
              }}
            />
            <span
              style={{
                color: "#FFFFFF",
                fontSize: "1.05rem",
                fontWeight: 600,
              }}
            >
              {severityLabel[sev]} rizika
            </span>
            <span className="hud-chip" data-tone={severityTone[sev]}>
              {grouped[sev].length}
            </span>
          </div>
          <div className="space-y-2">
            {grouped[sev].map((alert) => (
              <div
                key={alert.id}
                className="hud-alert-card"
                data-tone={severityTone[alert.severity]}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div
                      style={{
                        color: "#FFFFFF",
                        fontWeight: 600,
                        fontSize: "0.92rem",
                        marginBottom: 4,
                      }}
                    >
                      {alert.title}
                    </div>
                    <div
                      style={{
                        color: "#7A8A9E",
                        fontSize: "0.78rem",
                      }}
                    >
                      {companies.find((c) => c.id === alert.companyId)?.name} //{" "}
                      {alert.category}
                    </div>
                  </div>
                  <span
                    className="hud-chip flex-shrink-0"
                    data-tone={severityTone[alert.severity]}
                  >
                    {severityLabel[alert.severity]}
                  </span>
                </div>
                <div
                  style={{
                    color: "#B8C1C8",
                    lineHeight: 1.6,
                    fontSize: "0.85rem",
                  }}
                >
                  {alert.action}
                </div>
                {alert.action && (
                  <div
                    className="mt-3 border-t border-cyan-500/8 pt-3"
                    style={{
                      color: "#00E5FF",
                      fontSize: "0.82rem",
                      lineHeight: 1.5,
                    }}
                  >
                    Doporučení: {alert.action}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Resolved */}
      {resolvedAlerts.length > 0 && (
        <div className="hud-panel p-6">
          <div className="mb-5 flex items-center gap-2">
            <span style={labelStyle}>VYŘEŠENÁ RIZIKA</span>
            <span className="hud-chip" data-tone="green">
              {resolvedAlerts.length}
            </span>
          </div>
          <div className="space-y-1">
            {resolvedAlerts.slice(0, 10).map((alert) => (
              <div key={alert.id} className="hud-list-row">
                <div className="min-w-0">
                  <div
                    style={{
                      color: "#FFFFFF",
                      fontWeight: 600,
                      fontSize: "0.88rem",
                    }}
                    className="truncate"
                  >
                    {alert.title}
                  </div>
                  <div style={{ color: "#7A8A9E", fontSize: "0.78rem" }}>
                    {companies.find((c) => c.id === alert.companyId)?.name}
                  </div>
                </div>
                <span className="hud-chip" data-tone="green">
                  Vyřešeno
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {openAlerts.length === 0 && (
        <div className="hud-panel p-6">
          <div
            className="flex items-center justify-center py-12"
            style={{ color: "#7A8A9E" }}
          >
            <div className="text-center">
              <ShieldAlert
                size={32}
                className="mx-auto mb-3"
                style={{ color: "rgba(0,229,160,0.3)" }}
              />
              <div style={{ color: "#00E5A0" }}>
                Žádná otevřená rizika. Vše v pořádku.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
