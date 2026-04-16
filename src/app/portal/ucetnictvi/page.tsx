"use client";

import { useState } from "react";
import { BookOpen, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { useAuth } from "@/lib/auth/context";
import { getCompaniesForProfile, invoices, agingBuckets } from "@/lib/erp/data";
import { AgingChart } from "@/components/erp/Charts";

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

const tabs = [
  { id: "invoices", label: "Faktury" },
  { id: "hlavni-kniha", label: "Hlavní kniha" },
  { id: "rozvaha", label: "Rozvaha" },
  { id: "vysledovka", label: "Výsledovka" },
  { id: "dph", label: "DPH" },
  { id: "saldokonto", label: "Saldokonto" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const statusTone: Record<string, string> = {
  paid: "green",
  sent: "cyan",
  overdue: "red",
  draft: "slate",
  cancelled: "slate",
};

const statusLabel: Record<string, string> = {
  paid: "Uhrazena",
  sent: "Odesláno",
  overdue: "Po splatnosti",
  draft: "Koncept",
  cancelled: "Storno",
};

export default function UcetnictviPage() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>("invoices");

  if (!profile) return null;

  const companies = getCompaniesForProfile(profile);
  const companyIds = new Set(companies.map((c) => c.id));

  const visibleInvoices = invoices
    .filter((i) => companyIds.has(i.companyId))
    .sort(
      (a, b) =>
        new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime(),
    );

  const totalReceivables = visibleInvoices
    .filter(
      (i) =>
        i.type === "issued" && (i.status === "sent" || i.status === "overdue"),
    )
    .reduce((s, i) => s + i.amount, 0);

  const totalPayables = visibleInvoices
    .filter((i) => i.type === "received" && i.status !== "paid")
    .reduce((s, i) => s + i.amount, 0);

  const overdueCount = visibleInvoices.filter(
    (i) => i.status === "overdue",
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="hud-chip" data-tone="cyan">
            ÚČETNICTVÍ
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
          Účetní modul
        </h1>
        <p style={{ color: "#7A8A9E", maxWidth: 600, lineHeight: 1.6 }}>
          Faktury, hlavní kniha, rozvaha a výkazy na jednom místě.
        </p>
      </div>

      {/* Summary KPIs */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="hud-metric-card" data-tone="cyan">
          <div className="mb-2" style={labelStyle}>
            Pohledávky
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.6rem",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {fmt.format(totalReceivables)}
          </div>
        </div>
        <div className="hud-metric-card" data-tone="gold">
          <div className="mb-2" style={labelStyle}>
            Závazky
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.6rem",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {fmt.format(totalPayables)}
          </div>
        </div>
        <div
          className="hud-metric-card"
          data-tone={overdueCount > 0 ? "red" : "green"}
        >
          <div className="mb-2" style={labelStyle}>
            Po splatnosti
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.6rem",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {overdueCount} faktur
          </div>
        </div>
      </div>

      {/* Aging receivables chart */}
      {agingBuckets.length > 0 && (
        <div className="hud-panel p-6">
          <div className="mb-5">
            <div
              style={{
                fontFamily: "SF Mono, Monaco, Consolas, monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase" as const,
                color: "rgba(0,229,255,0.72)",
              }}
              className="mb-1"
            >
              SALDOKONTO
            </div>
            <div
              style={{
                color: "#FFFFFF",
                fontSize: "1.05rem",
                fontWeight: 600,
              }}
            >
              Stari pohledavek
            </div>
          </div>
          <AgingChart data={agingBuckets} />
        </div>
      )}

      {/* Tab bar */}
      <div className="hud-panel p-6">
        <div className="mb-5 flex flex-wrap gap-2 border-b border-cyan-500/10 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-[0.82rem] font-medium transition-all ${
                activeTab === tab.id
                  ? "text-cyan border border-cyan-500/40 bg-cyan-500/8"
                  : "text-text-muted border border-transparent hover:text-white hover:border-cyan-500/15"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Invoices tab (default) */}
        {activeTab === "invoices" && (
          <div>
            <div className="mb-4 flex items-center gap-2">
              <BookOpen size={16} className="text-cyan" />
              <span style={labelStyle}>{visibleInvoices.length} FAKTUR</span>
            </div>

            {/* Table header */}
            <div
              className="hidden md:grid gap-4 px-4 py-2 mb-2"
              style={{
                gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr 1fr",
                ...labelStyle,
              }}
            >
              <span>Číslo</span>
              <span>Partner</span>
              <span>Směr</span>
              <span>Datum</span>
              <span className="text-right">Částka</span>
              <span className="text-right">Status</span>
            </div>

            <div className="space-y-1">
              {visibleInvoices.slice(0, 25).map((inv) => (
                <div
                  key={inv.id}
                  className="hud-list-row hover:border-cyan-500/20 transition-colors"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr 1fr",
                    gap: "1rem",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "SF Mono, Monaco, Consolas, monospace",
                      color: "#FFFFFF",
                      fontSize: "0.82rem",
                    }}
                  >
                    {inv.number}
                  </span>
                  <span
                    style={{ color: "#B8C1C8", fontSize: "0.88rem" }}
                    className="truncate"
                  >
                    {inv.supplier || inv.customer}
                  </span>
                  <span>
                    {inv.type === "issued" ? (
                      <span className="flex items-center gap-1 text-status-green text-[0.82rem]">
                        <ArrowUpRight size={14} /> Vydaná
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-status-gold text-[0.82rem]">
                        <ArrowDownLeft size={14} /> Přijatá
                      </span>
                    )}
                  </span>
                  <span style={{ color: "#7A8A9E", fontSize: "0.82rem" }}>
                    {fmtDate.format(new Date(inv.issueDate))}
                  </span>
                  <span
                    style={{
                      color: "#FFFFFF",
                      fontWeight: 600,
                      fontSize: "0.88rem",
                      textAlign: "right",
                    }}
                  >
                    {fmt.format(inv.amount)}
                  </span>
                  <span className="text-right">
                    <span
                      className="hud-chip"
                      data-tone={statusTone[inv.status] || "slate"}
                    >
                      {statusLabel[inv.status] || inv.status}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Placeholder tabs */}
        {activeTab !== "invoices" && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <BookOpen
                size={40}
                className="mx-auto mb-4"
                style={{ color: "rgba(0,229,255,0.2)" }}
              />
              <div
                style={{
                  color: "#FFFFFF",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                {tabs.find((t) => t.id === activeTab)?.label}
              </div>
              <div style={{ color: "#7A8A9E", lineHeight: 1.6 }}>
                Tento výkaz bude dostupný po napojení na účetní systém.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
