"use client";

import { Globe, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { useAuth } from "@/lib/auth/context";
import { getCompaniesForProfile, germanTaxCases } from "@/lib/erp/data";

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

const statusConfig: Record<string, { tone: string; label: string }> = {
  completed: { tone: "green", label: "Dokončeno" },
  in_progress: { tone: "cyan", label: "Zpracovává se" },
  pending: { tone: "gold", label: "Čeká" },
  blocked: { tone: "red", label: "Blokováno" },
  submitted: { tone: "green", label: "Odesláno" },
};

export default function DaneDePage() {
  const { profile } = useAuth();
  if (!profile) return null;

  const companies = getCompaniesForProfile(profile);
  const companyIds = new Set(companies.map((c) => c.id));

  const cases = germanTaxCases
    .filter((c) => companyIds.has(c.companyId))
    .sort((a, b) => b.year.localeCompare(a.year));

  const types = [...new Set(cases.map((c) => c.type))];

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="hud-chip" data-tone="cyan">
            NĚMECKÉ DANĚ
          </span>
          <span className="hud-chip" data-tone="gold">
            CROSS-BORDER
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
          Německá daňová agenda
        </h1>
        <p style={{ color: "#7A8A9E", maxWidth: 600, lineHeight: 1.6 }}>
          Steuererklärung, Freistellung, Kindergeld, A1 a přeshraniční případy.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="hud-metric-card" data-tone="cyan">
          <div className="mb-2" style={labelStyle}>
            Celkem případů
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {cases.length}
          </div>
        </div>
        <div className="hud-metric-card" data-tone="green">
          <div className="mb-2" style={labelStyle}>
            Dokončeno
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {
              cases.filter(
                (c) =>
                  c.status === "filed" ||
                  c.status === "accepted" ||
                  c.status === "refund-received",
              ).length
            }
          </div>
        </div>
        <div className="hud-metric-card" data-tone="gold">
          <div className="mb-2" style={labelStyle}>
            Aktivních
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {
              cases.filter(
                (c) =>
                  c.status === "processing" ||
                  c.status === "data-collection" ||
                  c.status === "review",
              ).length
            }
          </div>
        </div>
        <div
          className="hud-metric-card"
          data-tone={
            cases.some((c) => c.status === "data-collection") ? "gold" : "green"
          }
        >
          <div className="mb-2" style={labelStyle}>
            Blokovaných
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {cases.filter((c) => c.status === "data-collection").length}
          </div>
        </div>
      </div>

      {/* Cases by type */}
      {types.map((type) => {
        const typeCases = cases.filter((c) => c.type === type);
        return (
          <div key={type} className="hud-panel p-6">
            <div className="mb-5 flex items-center gap-2">
              <Globe size={16} className="text-cyan" />
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
                {typeCases.length}
              </span>
            </div>
            <div className="space-y-2">
              {typeCases.map((tc) => {
                const config = statusConfig[tc.status] || {
                  tone: "slate",
                  label: tc.status,
                };
                return (
                  <div key={tc.id} className="hud-list-row">
                    <div className="flex items-center gap-3 min-w-0">
                      {tc.status === "filed" ||
                      tc.status === "accepted" ||
                      tc.status === "refund-received" ? (
                        <CheckCircle2
                          size={16}
                          className="text-status-green flex-shrink-0"
                        />
                      ) : tc.status === "data-collection" ? (
                        <AlertTriangle
                          size={16}
                          className="text-status-gold flex-shrink-0"
                        />
                      ) : (
                        <Clock
                          size={16}
                          className="text-text-muted flex-shrink-0"
                        />
                      )}
                      <div className="min-w-0">
                        <div
                          style={{
                            color: "#FFFFFF",
                            fontWeight: 600,
                            fontSize: "0.88rem",
                          }}
                          className="truncate"
                        >
                          {tc.personName ||
                            companies.find((c) => c.id === tc.companyId)
                              ?.name ||
                            tc.companyId}
                        </div>
                        <div style={{ color: "#7A8A9E", fontSize: "0.78rem" }}>
                          {tc.year} // {tc.finanzamt || "N/A"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {tc.refundAmount != null && tc.refundAmount > 0 && (
                        <span className="hud-chip" data-tone="green">
                          Refund:{" "}
                          {new Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "EUR",
                          }).format(tc.refundAmount)}
                        </span>
                      )}
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

      {cases.length === 0 && (
        <div className="hud-panel p-6">
          <div
            className="flex items-center justify-center py-12"
            style={{ color: "#7A8A9E" }}
          >
            <div className="text-center">
              <Globe
                size={32}
                className="mx-auto mb-3"
                style={{ color: "rgba(0,229,255,0.2)" }}
              />
              <div>Žádné německé daňové případy pro vaše firmy.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
