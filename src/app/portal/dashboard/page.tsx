"use client";

import Link from "next/link";
import {
  Building2,
  TrendingUp,
  Users,
  ListTodo,
  FileWarning,
  ShieldAlert,
  Files,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/lib/auth/context";
import {
  getCompaniesForProfile,
  getDataForProfile,
  invoices,
  riskAlerts,
  documents,
  auditLog,
  cashFlowForecasts,
} from "@/lib/erp/data";
import { CashFlowChart, RiskDonut } from "@/components/erp/Charts";

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

const fmtDate = new Intl.DateTimeFormat("cs-CZ", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export default function DashboardPage() {
  const { profile } = useAuth();
  if (!profile) return null;

  const companies = getCompaniesForProfile(profile);
  const data = getDataForProfile(profile);
  const companyIds = new Set(companies.map((c) => c.id));

  // KPIs
  const totalRevenue = invoices
    .filter((inv) => companyIds.has(inv.companyId) && inv.type === "issued")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const totalClients = companies.length;

  const openTasks = data.deadlines.filter(
    (d) =>
      d.status === "upcoming" ||
      d.status === "due-soon" ||
      d.status === "overdue",
  ).length;

  const overdueInvoices = invoices.filter(
    (inv) => companyIds.has(inv.companyId) && inv.status === "overdue",
  ).length;

  const activeRisks = riskAlerts.filter(
    (r) => companyIds.has(r.companyId) && !r.resolvedAt,
  ).length;

  const docsProcessed = documents.filter(
    (d) => companyIds.has(d.companyId) && d.status === "processed",
  ).length;

  const recentAudit = auditLog
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )
    .slice(0, 8);

  const recentRisks = riskAlerts
    .filter((r) => companyIds.has(r.companyId) && !r.resolvedAt)
    .slice(0, 5);

  const kpis = [
    {
      label: "Celkový obrat",
      value: fmt.format(totalRevenue),
      icon: TrendingUp,
      tone: "cyan",
    },
    {
      label: "Klienti",
      value: String(totalClients),
      icon: Building2,
      tone: "green",
    },
    {
      label: "Otevřené úkoly",
      value: String(openTasks),
      icon: ListTodo,
      tone: "gold",
    },
    {
      label: "Faktury po splatnosti",
      value: String(overdueInvoices),
      icon: FileWarning,
      tone: overdueInvoices > 0 ? "red" : "green",
    },
    {
      label: "Aktivní rizika",
      value: String(activeRisks),
      icon: ShieldAlert,
      tone: activeRisks > 0 ? "red" : "green",
    },
    {
      label: "Zpracované dokumenty",
      value: String(docsProcessed),
      icon: Files,
      tone: "cyan",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <div className="mb-2 flex flex-wrap gap-2">
          <span
            className="hud-chip"
            data-tone={profile.role === "owner" ? "gold" : "cyan"}
          >
            {profile.role === "owner"
              ? "OWNER DASHBOARD"
              : "EMPLOYEE DASHBOARD"}
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
          {profile.role === "owner" ? "Řídící centrum" : "Pracovní přehled"}
        </h1>
        <p style={{ color: "#7A8A9E", maxWidth: 600, lineHeight: 1.6 }}>
          {profile.role === "owner"
            ? "Kompletní přehled všech klientů, financí a operačních metrik."
            : `Přiřazení klienti a úkoly pro ${profile.name}.`}
        </p>
      </div>

      {/* KPI grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="hud-metric-card"
              data-tone={kpi.tone}
            >
              <div className="mb-3 flex items-center gap-2">
                <Icon size={16} className="text-cyan" />
                <span style={labelStyle}>{kpi.label}</span>
              </div>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                {kpi.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts: Cash Flow + Risk Donut */}
      <div className="grid gap-6 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <div className="hud-panel p-6">
            <div className="mb-5">
              <div style={labelStyle} className="mb-1">
                CASH FLOW
              </div>
              <div
                style={{
                  color: "#FFFFFF",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                }}
              >
                Predikce vs. skutecnost
              </div>
            </div>
            <CashFlowChart data={cashFlowForecasts} />
          </div>
        </div>
        <div className="xl:col-span-5">
          <div className="hud-panel p-6 h-full">
            <div className="mb-5">
              <div style={labelStyle} className="mb-1">
                RIZIKA
              </div>
              <div
                style={{
                  color: "#FFFFFF",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                }}
              >
                Rozlozeni podle zavaznosti
              </div>
            </div>
            <RiskDonut
              critical={
                riskAlerts.filter(
                  (r) =>
                    companyIds.has(r.companyId) &&
                    !r.resolvedAt &&
                    r.severity === "critical",
                ).length
              }
              high={
                riskAlerts.filter(
                  (r) =>
                    companyIds.has(r.companyId) &&
                    !r.resolvedAt &&
                    r.severity === "high",
                ).length
              }
              medium={
                riskAlerts.filter(
                  (r) =>
                    companyIds.has(r.companyId) &&
                    !r.resolvedAt &&
                    r.severity === "medium",
                ).length
              }
              low={
                riskAlerts.filter(
                  (r) =>
                    companyIds.has(r.companyId) &&
                    !r.resolvedAt &&
                    r.severity === "low",
                ).length
              }
            />
          </div>
        </div>
      </div>

      {/* Companies + Activity */}
      <div className="grid gap-6 xl:grid-cols-12">
        {/* Company list */}
        <div className="xl:col-span-7">
          <div className="hud-panel p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div style={labelStyle} className="mb-1">
                  KLIENTI
                </div>
                <div
                  style={{
                    color: "#FFFFFF",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                  }}
                >
                  Portfolio firem
                </div>
              </div>
              <Link href="/portal/klienti" className="hud-button-secondary">
                Zobrazit vše <ArrowRight size={14} />
              </Link>
            </div>
            <div className="space-y-3">
              {companies.slice(0, 6).map((company) => {
                const companyInvoices = invoices.filter(
                  (i) => i.companyId === company.id && i.status === "overdue",
                );
                const companyRisks = riskAlerts.filter(
                  (r) => r.companyId === company.id && !r.resolvedAt,
                );
                return (
                  <Link
                    key={company.id}
                    href={`/portal/klienti/${company.id}`}
                    className="hud-list-row hover:border-cyan-500/25 transition-colors block"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="flex h-9 w-9 items-center justify-center flex-shrink-0"
                          style={{
                            background: "rgba(0,229,255,0.06)",
                            border: "1px solid rgba(0,229,255,0.15)",
                          }}
                        >
                          <Building2 size={16} className="text-cyan" />
                        </div>
                        <div className="min-w-0">
                          <div
                            style={{
                              color: "#FFFFFF",
                              fontWeight: 600,
                              fontSize: "0.92rem",
                            }}
                            className="truncate"
                          >
                            {company.name}
                          </div>
                          <div
                            style={{ color: "#7A8A9E", fontSize: "0.78rem" }}
                          >
                            {company.ico} // {company.city}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {companyRisks.length > 0 && (
                          <span className="hud-chip" data-tone="red">
                            {companyRisks.length} rizik
                          </span>
                        )}
                        {companyInvoices.length > 0 && (
                          <span className="hud-chip" data-tone="gold">
                            {companyInvoices.length} po splatnosti
                          </span>
                        )}
                        <span
                          className="hud-chip"
                          data-tone={
                            company.status === "active" ? "green" : "slate"
                          }
                        >
                          {company.status === "active"
                            ? "Aktivní"
                            : company.status}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column: activity + risks */}
        <div className="xl:col-span-5 space-y-6">
          {/* Recent activity */}
          <div className="hud-panel p-6">
            <div className="mb-5">
              <div style={labelStyle} className="mb-1">
                AKTIVITA
              </div>
              <div
                style={{
                  color: "#FFFFFF",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                }}
              >
                Poslední operace
              </div>
            </div>
            <div className="space-y-2">
              {recentAudit.map((log) => (
                <div key={log.id} className="hud-list-row hud-list-row-stacked">
                  <div className="flex items-start justify-between gap-2">
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
                      <div
                        style={{
                          color: "#7A8A9E",
                          fontSize: "0.78rem",
                          marginTop: 2,
                        }}
                      >
                        {log.userName} // {log.entity}
                      </div>
                    </div>
                    <span className="hud-time-stamp flex-shrink-0">
                      {fmtDate.format(new Date(log.timestamp))}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk summary */}
          {recentRisks.length > 0 && (
            <div className="hud-panel p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div style={labelStyle} className="mb-1">
                    RIZIKA
                  </div>
                  <div
                    style={{
                      color: "#FFFFFF",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                    }}
                  >
                    Otevřená upozornění
                  </div>
                </div>
                <Link href="/portal/rizika" className="hud-button-secondary">
                  Detail <ArrowRight size={14} />
                </Link>
              </div>
              <div className="space-y-2">
                {recentRisks.map((risk) => (
                  <div
                    key={risk.id}
                    className="hud-alert-card"
                    data-tone={
                      risk.severity === "critical"
                        ? "red"
                        : risk.severity === "high"
                          ? "red"
                          : "gold"
                    }
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div
                          style={{
                            color: "#FFFFFF",
                            fontWeight: 600,
                            fontSize: "0.88rem",
                            marginBottom: 4,
                          }}
                        >
                          {risk.title}
                        </div>
                        <div
                          style={{
                            color: "#7A8A9E",
                            fontSize: "0.82rem",
                            lineHeight: 1.5,
                          }}
                        >
                          {risk.description}
                        </div>
                      </div>
                      <span
                        className="hud-chip flex-shrink-0"
                        data-tone={
                          risk.severity === "critical" ||
                          risk.severity === "high"
                            ? "red"
                            : "gold"
                        }
                      >
                        {risk.severity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
