"use client";

import { ListTodo, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
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

const priorityTone: Record<string, string> = {
  critical: "red",
  high: "red",
  medium: "gold",
  low: "slate",
};

export default function UkolyPage() {
  const { profile } = useAuth();
  if (!profile) return null;

  const companies = getCompaniesForProfile(profile);
  const companyIds = new Set(companies.map((c) => c.id));

  // Use deadlines as task queue source
  const tasks = deadlines
    .filter((d) => companyIds.has(d.companyId))
    .sort((a, b) => {
      // Sort by status (pending first), then by due date
      const statusOrder: Record<string, number> = {
        overdue: 0,
        pending: 1,
        in_progress: 2,
        completed: 3,
      };
      const aOrder = statusOrder[a.status] ?? 5;
      const bOrder = statusOrder[b.status] ?? 5;
      if (aOrder !== bOrder) return aOrder - bOrder;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });

  const openTasks = tasks.filter((t) => t.status !== "completed");
  const completedTasks = tasks.filter((t) => t.status === "completed");

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="hud-chip" data-tone="cyan">
            ÚKOLY
          </span>
          <span className="hud-chip" data-tone="gold">
            {openTasks.length} otevřených
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
          Fronta úkolů
        </h1>
        <p style={{ color: "#7A8A9E", maxWidth: 600, lineHeight: 1.6 }}>
          Všechny úkoly a termíny seřazené podle priority a data.
        </p>
      </div>

      {/* Open tasks */}
      <div className="hud-panel p-6">
        <div className="mb-5 flex items-center gap-2">
          <ListTodo size={16} className="text-cyan" />
          <span style={labelStyle}>OTEVŘENÉ ÚKOLY</span>
          <span className="hud-chip" data-tone="gold">
            {openTasks.length}
          </span>
        </div>
        <div className="space-y-2">
          {openTasks.map((task) => {
            const dueDate = new Date(task.dueDate);
            const daysLeft = Math.ceil(
              (dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
            );
            const isOverdue = daysLeft < 0;

            return (
              <div key={task.id} className="hud-list-row">
                <div className="flex items-center gap-3 min-w-0">
                  {isOverdue ? (
                    <AlertTriangle
                      size={16}
                      className="text-status-red flex-shrink-0"
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
                      {task.title}
                    </div>
                    <div style={{ color: "#7A8A9E", fontSize: "0.78rem" }}>
                      {companies.find((c) => c.id === task.companyId)?.name} //{" "}
                      {task.type} // {task.responsibleName}
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
                      isOverdue
                        ? "red"
                        : task.status === "upcoming"
                          ? "gold"
                          : "cyan"
                    }
                  >
                    {isOverdue
                      ? "Po termínu"
                      : task.status === "upcoming"
                        ? "Čeká"
                        : "Probíhá"}
                  </span>
                </div>
              </div>
            );
          })}
          {openTasks.length === 0 && (
            <div className="text-center py-8" style={{ color: "#7A8A9E" }}>
              <CheckCircle2
                size={24}
                className="mx-auto mb-2 text-status-green"
              />
              <div>Všechny úkoly splněny.</div>
            </div>
          )}
        </div>
      </div>

      {/* Completed */}
      {completedTasks.length > 0 && (
        <div className="hud-panel p-6">
          <div className="mb-5 flex items-center gap-2">
            <CheckCircle2 size={16} className="text-status-green" />
            <span style={labelStyle}>DOKONČENÉ</span>
            <span className="hud-chip" data-tone="green">
              {completedTasks.length}
            </span>
          </div>
          <div className="space-y-1">
            {completedTasks.slice(0, 10).map((task) => (
              <div key={task.id} className="hud-list-row">
                <div className="min-w-0">
                  <div
                    style={{
                      color: "#FFFFFF",
                      fontWeight: 600,
                      fontSize: "0.88rem",
                    }}
                    className="truncate"
                  >
                    {task.title}
                  </div>
                  <div style={{ color: "#7A8A9E", fontSize: "0.78rem" }}>
                    {companies.find((c) => c.id === task.companyId)?.name}
                  </div>
                </div>
                <span className="hud-chip" data-tone="green">
                  Splněno
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
