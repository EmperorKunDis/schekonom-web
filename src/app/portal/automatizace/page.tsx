"use client";

import {
  Bot,
  Zap,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/lib/auth/context";
import { getCompaniesForProfile, auditLog } from "@/lib/erp/data";

const labelStyle = {
  fontFamily: "SF Mono, Monaco, Consolas, monospace",
  fontSize: "0.62rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "rgba(0,229,255,0.72)",
};

const fmtDateTime = new Intl.DateTimeFormat("cs-CZ", {
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

const workflows = [
  {
    name: "Příjem faktur (OCR)",
    description:
      "Automatické rozpoznání a zařazení faktur z e-mailu a datové schránky.",
    status: "active",
    runs: 234,
    lastRun: "2026-04-12T08:15:00",
  },
  {
    name: "Párování plateb",
    description:
      "Automatické párování bankovních výpisů s fakturami v účetním systému.",
    status: "active",
    runs: 189,
    lastRun: "2026-04-12T07:30:00",
  },
  {
    name: "Upomínky po splatnosti",
    description:
      "3stupňový systém upomínek: e-mail (7 dní), SMS (14 dní), telefonát (21 dní).",
    status: "active",
    runs: 47,
    lastRun: "2026-04-11T16:00:00",
  },
  {
    name: "DPH kontrolní hlášení",
    description: "Měsíční příprava kontrolního hlášení DPH z podkladových dat.",
    status: "active",
    runs: 12,
    lastRun: "2026-04-01T09:00:00",
  },
  {
    name: "Mzdové uzávěrky",
    description:
      "Automatický výpočet mezd, odvodů a generování výplatních pásek.",
    status: "paused",
    runs: 24,
    lastRun: "2026-03-31T14:00:00",
  },
  {
    name: "Riziková detekce",
    description:
      "Průběžná kontrola IBAN fraud, duplicitních faktur a nesouladů.",
    status: "active",
    runs: 1205,
    lastRun: "2026-04-12T09:45:00",
  },
  {
    name: "Klientský onboarding",
    description:
      "Automatické vytvoření klientského prostoru, nastavení přístupů a úvodní komunikace.",
    status: "active",
    runs: 8,
    lastRun: "2026-04-10T11:00:00",
  },
  {
    name: "ELSTER podání DE",
    description:
      "Automatické podání německých daňových přiznání přes ELSTER rozhraní.",
    status: "paused",
    runs: 15,
    lastRun: "2026-03-15T10:00:00",
  },
];

const statusConfig: Record<
  string,
  { tone: string; label: string; icon: typeof CheckCircle2 }
> = {
  active: { tone: "green", label: "Aktivní", icon: CheckCircle2 },
  paused: { tone: "gold", label: "Pozastaveno", icon: Clock },
  error: { tone: "red", label: "Chyba", icon: AlertTriangle },
};

export default function AutomatizacePage() {
  const { profile } = useAuth();
  if (!profile) return null;

  const companies = getCompaniesForProfile(profile);
  const companyIds = new Set(companies.map((c) => c.id));

  const recentLogs = auditLog
    .filter(
      (a) =>
        a.action === "create" || a.action === "approve" || a.action === "send",
    )
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )
    .slice(0, 10);

  const activeCount = workflows.filter((w) => w.status === "active").length;
  const totalRuns = workflows.reduce((s, w) => s + w.runs, 0);

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="hud-chip" data-tone="cyan">
            AUTOMATIZACE
          </span>
          <span className="hud-chip" data-tone="green">
            {activeCount} AKTIVNÍCH
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
          Automatizační vrstva
        </h1>
        <p style={{ color: "#7A8A9E", maxWidth: 600, lineHeight: 1.6 }}>
          N8N workflow, agentní procesy a orchestrační pravidla.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="hud-metric-card" data-tone="cyan">
          <div className="mb-2 flex items-center gap-2">
            <Bot size={14} className="text-cyan" />
            <span style={labelStyle}>Workflows</span>
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {workflows.length}
          </div>
        </div>
        <div className="hud-metric-card" data-tone="green">
          <div className="mb-2 flex items-center gap-2">
            <Zap size={14} className="text-status-green" />
            <span style={labelStyle}>Celkem spuštění</span>
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {new Intl.NumberFormat("cs-CZ").format(totalRuns)}
          </div>
        </div>
        <div className="hud-metric-card" data-tone="slate">
          <div className="mb-2 flex items-center gap-2">
            <CheckCircle2 size={14} className="text-cyan" />
            <span style={labelStyle}>Aktivních</span>
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {activeCount} / {workflows.length}
          </div>
        </div>
      </div>

      {/* Workflow cards */}
      <div className="grid gap-4 lg:grid-cols-2">
        {workflows.map((wf) => {
          const config = statusConfig[wf.status] || statusConfig.active;
          const StatusIcon = config.icon;
          return (
            <div
              key={wf.name}
              className="hud-panel p-5 hover:border-cyan-500/25 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center flex-shrink-0"
                    style={{
                      background: "rgba(0,229,255,0.06)",
                      border: "1px solid rgba(0,229,255,0.15)",
                    }}
                  >
                    <Bot size={18} className="text-cyan" />
                  </div>
                  <div>
                    <div
                      style={{
                        color: "#FFFFFF",
                        fontWeight: 700,
                        fontSize: "0.95rem",
                      }}
                    >
                      {wf.name}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <StatusIcon
                    size={13}
                    style={{
                      color:
                        config.tone === "green"
                          ? "#00E5A0"
                          : config.tone === "gold"
                            ? "#E6C65C"
                            : "#FF7B7B",
                    }}
                  />
                  <span className="hud-chip" data-tone={config.tone}>
                    {config.label}
                  </span>
                </div>
              </div>
              <div
                style={{
                  color: "#7A8A9E",
                  lineHeight: 1.6,
                  fontSize: "0.85rem",
                  marginBottom: 12,
                }}
              >
                {wf.description}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="hud-chip" data-tone="slate">
                    {wf.runs} spuštění
                  </span>
                  <span className="hud-chip" data-tone="slate">
                    {fmtDateTime.format(new Date(wf.lastRun))}
                  </span>
                </div>
                <ArrowRight size={14} className="text-text-muted" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent automation logs */}
      {recentLogs.length > 0 && (
        <div className="hud-panel p-6">
          <div className="mb-5">
            <div style={labelStyle} className="mb-1">
              AUTOMATIZAČNÍ LOG
            </div>
            <div
              style={{
                color: "#FFFFFF",
                fontSize: "1.05rem",
                fontWeight: 600,
              }}
            >
              Poslední automatické akce
            </div>
          </div>
          <div className="space-y-1">
            {recentLogs.map((log) => (
              <div key={log.id} className="hud-list-row">
                <div className="min-w-0">
                  <div
                    style={{
                      color: "#FFFFFF",
                      fontWeight: 600,
                      fontSize: "0.88rem",
                    }}
                    className="truncate"
                  >
                    {log.action}
                  </div>
                  <div style={{ color: "#7A8A9E", fontSize: "0.78rem" }}>
                    {log.userName} // {log.entity}
                  </div>
                </div>
                <span className="hud-time-stamp">
                  {fmtDateTime.format(new Date(log.timestamp))}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
