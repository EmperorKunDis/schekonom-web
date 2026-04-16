"use client";

import { Calendar, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { useAuth } from "@/lib/auth/context";
import { getCompaniesForProfile, deadlines } from "@/lib/erp/data";

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

const statusTone: Record<string, string> = {
  completed: "green",
  in_progress: "cyan",
  pending: "gold",
  overdue: "red",
};

const statusLabel: Record<string, string> = {
  completed: "Splněno",
  in_progress: "Probíhá",
  pending: "Čeká",
  overdue: "Po termínu",
};

export default function TerminyPage() {
  const { profile } = useAuth();
  if (!profile) return null;

  const companies = getCompaniesForProfile(profile);
  const companyIds = new Set(companies.map((c) => c.id));

  const allDeadlines = deadlines
    .filter((d) => companyIds.has(d.companyId))
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    );

  const upcoming = allDeadlines.filter((d) => d.status !== "completed");
  const completed = allDeadlines.filter((d) => d.status === "completed");

  // Group by month
  const byMonth: Record<string, typeof upcoming> = {};
  for (const dl of upcoming) {
    const date = new Date(dl.dueDate);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const monthLabel = new Intl.DateTimeFormat("cs-CZ", {
      month: "long",
      year: "numeric",
    }).format(date);
    if (!byMonth[monthLabel]) byMonth[monthLabel] = [];
    byMonth[monthLabel].push(dl);
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="hud-chip" data-tone="cyan">
            TERMÍNY
          </span>
          <span className="hud-chip" data-tone="gold">
            {upcoming.length} aktivních
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
          Kalendář termínů
        </h1>
        <p style={{ color: "#7A8A9E", maxWidth: 600, lineHeight: 1.6 }}>
          Daňové, mzdové a přeshraniční termíny seřazené chronologicky.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="hud-metric-card" data-tone="cyan">
          <div className="mb-2" style={labelStyle}>
            Celkem
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {allDeadlines.length}
          </div>
        </div>
        <div className="hud-metric-card" data-tone="gold">
          <div className="mb-2" style={labelStyle}>
            Čeká
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {upcoming.filter((d) => d.status === "upcoming").length}
          </div>
        </div>
        <div
          className="hud-metric-card"
          data-tone={
            upcoming.some((d) => d.status === "overdue") ? "red" : "green"
          }
        >
          <div className="mb-2" style={labelStyle}>
            Po termínu
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {upcoming.filter((d) => d.status === "overdue").length}
          </div>
        </div>
        <div className="hud-metric-card" data-tone="green">
          <div className="mb-2" style={labelStyle}>
            Splněno
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {completed.length}
          </div>
        </div>
      </div>

      {/* By month */}
      {Object.entries(byMonth).map(([month, items]) => (
        <div key={month} className="hud-panel p-6">
          <div className="mb-5 flex items-center gap-2">
            <Calendar size={16} className="text-cyan" />
            <span
              style={{
                color: "#FFFFFF",
                fontSize: "1.05rem",
                fontWeight: 600,
                textTransform: "capitalize",
              }}
            >
              {month}
            </span>
            <span className="hud-chip" data-tone="slate">
              {items.length}
            </span>
          </div>
          <div className="space-y-2">
            {items.map((dl) => {
              const dueDate = new Date(dl.dueDate);
              const daysLeft = Math.ceil(
                (dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
              );
              const isUrgent = daysLeft <= 7 && daysLeft >= 0;
              const isOverdue = daysLeft < 0;

              return (
                <div key={dl.id} className="hud-list-row">
                  <div className="flex items-center gap-3 min-w-0">
                    {isOverdue ? (
                      <AlertTriangle
                        size={16}
                        className="text-status-red flex-shrink-0"
                      />
                    ) : isUrgent ? (
                      <Clock
                        size={16}
                        className="text-status-gold flex-shrink-0"
                      />
                    ) : (
                      <Calendar
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
                        {dl.title}
                      </div>
                      <div style={{ color: "#7A8A9E", fontSize: "0.78rem" }}>
                        {companies.find((c) => c.id === dl.companyId)?.name} //{" "}
                        {dl.type} // {dl.responsibleName}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="hud-chip" data-tone="slate">
                      {fmtDate.format(dueDate)}
                    </span>
                    <span
                      className="hud-chip"
                      data-tone={
                        statusTone[dl.status] ||
                        (isOverdue ? "red" : isUrgent ? "gold" : "slate")
                      }
                    >
                      {statusLabel[dl.status] || dl.status}
                    </span>
                    {isUrgent && !isOverdue && (
                      <span className="hud-chip" data-tone="gold">
                        {daysLeft} dní
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
