"use client";

import {
  Calendar,
  FileQuestion,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { useAuth } from "@/lib/auth/context";
import {
  getCompaniesForProfile,
  getDataForProfile,
  invoices,
  deadlines,
  documents,
  cashFlowForecasts,
} from "@/lib/erp/data";
import { CashFlowChart } from "@/components/erp/Charts";

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

export default function PrehledPage() {
  const { profile } = useAuth();
  if (!profile) return null;

  const companies = getCompaniesForProfile(profile);
  const data = getDataForProfile(profile);
  const myCompany = companies[0];
  const companyIds = new Set(companies.map((c) => c.id));

  // Company metrics
  const myInvoices = invoices.filter((i) => companyIds.has(i.companyId));
  const receivables = myInvoices
    .filter(
      (i) =>
        i.type === "issued" && (i.status === "sent" || i.status === "overdue"),
    )
    .reduce((s, i) => s + i.amount, 0);
  const payables = myInvoices
    .filter((i) => i.type === "received" && i.status !== "paid")
    .reduce((s, i) => s + i.amount, 0);

  const missingDocs = (
    documents as {
      id: string;
      companyId: string;
      status: string;
      title: string;
      type: string;
      dueDate?: string;
    }[]
  ).filter((d) => companyIds.has(d.companyId) && d.status === "missing");

  const upcomingDeadlines = deadlines
    .filter((d) => companyIds.has(d.companyId) && d.status !== "completed")
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    )
    .slice(0, 6);

  const forecasts = cashFlowForecasts;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="hud-chip" data-tone="green">
            KLIENTSKÝ PORTÁL
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
          Přehled vaší firmy
        </h1>
        <p style={{ color: "#7A8A9E", maxWidth: 600, lineHeight: 1.6 }}>
          Stav účetnictví, chybějící dokumenty, termíny a doporučení na jednom
          místě.
        </p>
      </div>

      {/* Company status card */}
      {myCompany && (
        <div className="hud-panel p-6">
          <div className="mb-5">
            <div style={labelStyle} className="mb-1">
              VAŠE FIRMA
            </div>
            <div
              style={{
                color: "#FFFFFF",
                fontSize: "1.3rem",
                fontWeight: 700,
                fontFamily: "Space Grotesk, sans-serif",
              }}
            >
              {myCompany.name}
            </div>
            <div
              style={{ color: "#7A8A9E", fontSize: "0.88rem", marginTop: 4 }}
            >
              IČO: {myCompany.ico} // {myCompany.city}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="hud-metric-card" data-tone="cyan">
              <div className="mb-2 flex items-center gap-2">
                <TrendingUp size={14} className="text-cyan" />
                <span style={labelStyle}>Pohledávky</span>
              </div>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                {fmt.format(receivables)}
              </div>
            </div>
            <div className="hud-metric-card" data-tone="gold">
              <div className="mb-2 flex items-center gap-2">
                <TrendingUp
                  size={14}
                  style={{ color: "rgba(212,175,55,0.9)" }}
                />
                <span style={labelStyle}>Závazky</span>
              </div>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                {fmt.format(payables)}
              </div>
            </div>
            <div
              className="hud-metric-card"
              data-tone={missingDocs.length > 0 ? "red" : "green"}
            >
              <div className="mb-2 flex items-center gap-2">
                <FileQuestion
                  size={14}
                  style={{
                    color: missingDocs.length > 0 ? "#FF7B7B" : "#00E5A0",
                  }}
                />
                <span style={labelStyle}>Chybějící dokumenty</span>
              </div>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                {missingDocs.length}
              </div>
            </div>
            <div className="hud-metric-card" data-tone="slate">
              <div className="mb-2 flex items-center gap-2">
                <Calendar size={14} className="text-cyan" />
                <span style={labelStyle}>Termíny</span>
              </div>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                {upcomingDeadlines.length}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-12">
        {/* Missing docs */}
        <div className="xl:col-span-6">
          <div className="hud-panel p-6 h-full">
            <div className="mb-5">
              <div className="mb-2 flex items-center gap-2">
                <FileQuestion size={16} className="text-cyan" />
                <span style={labelStyle}>CHYBĚJÍCÍ DOKUMENTY</span>
              </div>
              <div
                style={{
                  color: "#FFFFFF",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                }}
              >
                Co od vás potřebujeme
              </div>
            </div>
            {missingDocs.length === 0 ? (
              <div
                className="flex items-center gap-3 px-4 py-6"
                style={{ color: "#7A8A9E" }}
              >
                <CheckCircle2 size={20} className="text-status-green" />
                <span>Všechny dokumenty jsou v pořádku.</span>
              </div>
            ) : (
              <div className="space-y-2">
                {missingDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="hud-list-row hud-list-row-stacked"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div
                          style={{
                            color: "#FFFFFF",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                          }}
                        >
                          {doc.title}
                        </div>
                        <div
                          style={{
                            color: "#7A8A9E",
                            fontSize: "0.82rem",
                            marginTop: 2,
                          }}
                        >
                          {doc.type} // {doc.type}
                        </div>
                      </div>
                      <span className="hud-chip" data-tone="red">
                        {doc.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Upcoming deadlines */}
        <div className="xl:col-span-6">
          <div className="hud-panel p-6 h-full">
            <div className="mb-5">
              <div className="mb-2 flex items-center gap-2">
                <Calendar size={16} className="text-cyan" />
                <span style={labelStyle}>TERMÍNY</span>
              </div>
              <div
                style={{
                  color: "#FFFFFF",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                }}
              >
                Nadcházející povinnosti
              </div>
            </div>
            <div className="space-y-2">
              {upcomingDeadlines.map((dl) => {
                const dueDate = new Date(dl.dueDate);
                const daysLeft = Math.ceil(
                  (dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
                );
                const isUrgent = daysLeft <= 7;
                return (
                  <div key={dl.id} className="hud-list-row">
                    <div className="flex items-center gap-3">
                      {isUrgent ? (
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
                      <div>
                        <div
                          style={{
                            color: "#FFFFFF",
                            fontWeight: 600,
                            fontSize: "0.88rem",
                          }}
                        >
                          {dl.title}
                        </div>
                        <div style={{ color: "#7A8A9E", fontSize: "0.78rem" }}>
                          {dl.type} // {dl.responsibleName}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span
                        className="hud-chip"
                        data-tone={isUrgent ? "red" : "slate"}
                      >
                        {fmtDate.format(dueDate)}
                      </span>
                      {isUrgent && (
                        <span className="hud-chip" data-tone="red">
                          {daysLeft <= 0 ? "Po termínu!" : `${daysLeft} dní`}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Cash flow placeholder + AI recommendations */}
      <div className="grid gap-6 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <div className="hud-panel p-6">
            <div className="mb-5">
              <div className="mb-2 flex items-center gap-2">
                <TrendingUp size={16} className="text-cyan" />
                <span style={labelStyle}>CASH FLOW</span>
              </div>
              <div
                style={{
                  color: "#FFFFFF",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                }}
              >
                Predikce peněžních toků
              </div>
            </div>
            {forecasts.length > 0 ? (
              <CashFlowChart data={forecasts} />
            ) : (
              <div
                className="flex items-center justify-center py-12"
                style={{ color: "#7A8A9E" }}
              >
                <div className="text-center">
                  <TrendingUp size={32} className="mx-auto mb-3 text-cyan/30" />
                  <div>Cash flow data se pripravuji.</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="xl:col-span-5">
          <div className="hud-panel p-6 h-full">
            <div className="mb-5">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles size={16} style={{ color: "rgba(212,175,55,0.9)" }} />
                <span style={labelStyle}>AI DOPORUČENÍ</span>
              </div>
              <div
                style={{
                  color: "#FFFFFF",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                }}
              >
                Virtuální CFO
              </div>
            </div>
            <div className="space-y-3">
              {[
                {
                  title: "Optimalizace DPH",
                  desc: "Zvažte změnu zdaňovacího období na měsíční pro lepší cash flow.",
                  tone: "cyan",
                },
                {
                  title: "Zálohy na daň z příjmu",
                  desc: "Na základě aktuálního obratu doporučujeme navýšit zálohy o 15 %.",
                  tone: "gold",
                },
                {
                  title: "Silniční daň",
                  desc: "Přezkum vozového parku — 2 vozidla splňují podmínky pro osvobození.",
                  tone: "green",
                },
              ].map((rec) => (
                <div
                  key={rec.title}
                  className="hud-alert-card"
                  data-tone={rec.tone}
                >
                  <div
                    style={{
                      color: "#FFFFFF",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      marginBottom: 4,
                    }}
                  >
                    {rec.title}
                  </div>
                  <div
                    style={{
                      color: "#B8C1C8",
                      lineHeight: 1.6,
                      fontSize: "0.85rem",
                    }}
                  >
                    {rec.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
