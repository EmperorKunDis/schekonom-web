"use client";

import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  CreditCard,
} from "lucide-react";
import { useAuth } from "@/lib/auth/context";
import {
  getCompaniesForProfile,
  invoices,
  bankTransactions,
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

export default function FinancePage() {
  const { profile } = useAuth();
  if (!profile) return null;

  const companies = getCompaniesForProfile(profile);
  const companyIds = new Set(companies.map((c) => c.id));

  const myInvoices = invoices.filter((i) => companyIds.has(i.companyId));
  const myTransactions = bankTransactions
    .filter((t) => companyIds.has(t.companyId))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const forecasts = cashFlowForecasts;

  const receivables = myInvoices
    .filter(
      (i) =>
        i.type === "issued" && (i.status === "sent" || i.status === "overdue"),
    )
    .reduce((s, i) => s + i.amount, 0);

  const payables = myInvoices
    .filter((i) => i.type === "received" && i.status !== "paid")
    .reduce((s, i) => s + i.amount, 0);

  const totalIncome = myTransactions
    .filter((t) => t.amount > 0)
    .reduce((s, t) => s + t.amount, 0);

  const totalExpense = myTransactions
    .filter((t) => t.amount < 0)
    .reduce((s, t) => s + Math.abs(t.amount), 0);

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="hud-chip" data-tone="cyan">
            FINANCE
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
          Finanční přehled
        </h1>
        <p style={{ color: "#7A8A9E", maxWidth: 600, lineHeight: 1.6 }}>
          Cash flow, pohledávky, závazky a bankovní transakce.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="hud-metric-card" data-tone="cyan">
          <div className="mb-2 flex items-center gap-2">
            <ArrowUpRight size={14} className="text-cyan" />
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
            <ArrowDownLeft size={14} style={{ color: "#E6C65C" }} />
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
        <div className="hud-metric-card" data-tone="green">
          <div className="mb-2 flex items-center gap-2">
            <Wallet size={14} className="text-status-green" />
            <span style={labelStyle}>Příjmy</span>
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {fmt.format(totalIncome)}
          </div>
        </div>
        <div className="hud-metric-card" data-tone="red">
          <div className="mb-2 flex items-center gap-2">
            <CreditCard size={14} className="text-status-red" />
            <span style={labelStyle}>Výdaje</span>
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {fmt.format(totalExpense)}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-12">
        {/* Cash flow forecast */}
        <div className="xl:col-span-7">
          <div className="hud-panel p-6">
            <div className="mb-5">
              <div className="mb-2 flex items-center gap-2">
                <TrendingUp size={16} className="text-cyan" />
                <span style={labelStyle}>CASH FLOW PREDIKCE</span>
              </div>
              <div
                style={{
                  color: "#FFFFFF",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                }}
              >
                Měsíční predikce peněžních toků
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
                  <TrendingUp
                    size={32}
                    className="mx-auto mb-3"
                    style={{ color: "rgba(0,229,255,0.2)" }}
                  />
                  <div>Predikce cash flow se pripravuje.</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent transactions */}
        <div className="xl:col-span-5">
          <div className="hud-panel p-6 h-full">
            <div className="mb-5">
              <div className="mb-2 flex items-center gap-2">
                <Wallet size={16} className="text-cyan" />
                <span style={labelStyle}>BANKOVNÍ TRANSAKCE</span>
              </div>
              <div
                style={{
                  color: "#FFFFFF",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                }}
              >
                Poslední pohyby
              </div>
            </div>
            <div className="space-y-1">
              {myTransactions.slice(0, 12).map((tx) => (
                <div key={tx.id} className="hud-list-row">
                  <div className="flex items-center gap-2 min-w-0">
                    {tx.amount > 0 ? (
                      <ArrowUpRight
                        size={14}
                        className="text-status-green flex-shrink-0"
                      />
                    ) : (
                      <ArrowDownLeft
                        size={14}
                        className="text-status-red flex-shrink-0"
                      />
                    )}
                    <div className="min-w-0">
                      <div
                        style={{
                          color: "#FFFFFF",
                          fontWeight: 600,
                          fontSize: "0.82rem",
                        }}
                        className="truncate"
                      >
                        {tx.counterparty || tx.note}
                      </div>
                      <div style={{ color: "#7A8A9E", fontSize: "0.72rem" }}>
                        {fmtDate.format(new Date(tx.date))}
                      </div>
                    </div>
                  </div>
                  <span
                    style={{
                      color: tx.amount > 0 ? "#00E5A0" : "#FF7B7B",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      flexShrink: 0,
                    }}
                  >
                    {tx.amount > 0 ? "+" : ""}
                    {fmt.format(tx.amount)}
                  </span>
                </div>
              ))}
              {myTransactions.length === 0 && (
                <div className="text-center py-8" style={{ color: "#7A8A9E" }}>
                  Žádné transakce.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
