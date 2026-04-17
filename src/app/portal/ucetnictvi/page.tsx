"use client";

import { useState } from "react";
import {
  BookOpen,
  ArrowUpRight,
  ArrowDownLeft,
  Printer,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
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

// ── Hlavní kniha mock data ──────────────────────────────────────────────────
const hlavniKnihaRows = [
  { ucet: "211", nazev: "Pokladna", md: 45200, dal: 38600, zustatek: 6600 },
  {
    ucet: "221",
    nazev: "Bankovní účty",
    md: 2840000,
    dal: 2210000,
    zustatek: 630000,
  },
  {
    ucet: "311",
    nazev: "Pohledávky z obch. vztahů",
    md: 1620000,
    dal: 980000,
    zustatek: 640000,
  },
  {
    ucet: "321",
    nazev: "Závazky z obch. vztahů",
    md: 410000,
    dal: 720000,
    zustatek: -310000,
  },
  { ucet: "343", nazev: "DPH", md: 184200, dal: 96800, zustatek: 87400 },
  {
    ucet: "411",
    nazev: "Základní kapitál",
    md: 0,
    dal: 200000,
    zustatek: -200000,
  },
  {
    ucet: "428",
    nazev: "Nerozdělený zisk",
    md: 0,
    dal: 890000,
    zustatek: -890000,
  },
  {
    ucet: "501",
    nazev: "Spotřeba materiálu",
    md: 320000,
    dal: 0,
    zustatek: 320000,
  },
  {
    ucet: "511",
    nazev: "Opravy a udržování",
    md: 48000,
    dal: 0,
    zustatek: 48000,
  },
  {
    ucet: "521",
    nazev: "Mzdové náklady",
    md: 680000,
    dal: 0,
    zustatek: 680000,
  },
  {
    ucet: "524",
    nazev: "Sociální a zdrav. pojistné",
    md: 231200,
    dal: 0,
    zustatek: 231200,
  },
  { ucet: "551", nazev: "Odpisy", md: 84000, dal: 0, zustatek: 84000 },
  {
    ucet: "601",
    nazev: "Tržby za výrobky a služby",
    md: 0,
    dal: 3240000,
    zustatek: -3240000,
  },
  {
    ucet: "648",
    nazev: "Ostatní provozní výnosy",
    md: 0,
    dal: 128000,
    zustatek: -128000,
  },
];

// ── Rozvaha mock data ───────────────────────────────────────────────────────
const rozvahaAktiva = [
  {
    group: "Stálá aktiva",
    items: [
      { label: "Dlouhodobý nehmotný majetek", value: 84000 },
      { label: "Dlouhodobý hmotný majetek", value: 1240000 },
      { label: "Dlouhodobý finanční majetek", value: 0 },
    ],
  },
  {
    group: "Oběžná aktiva",
    items: [
      { label: "Zásoby", value: 212000 },
      { label: "Pohledávky z obch. vztahů", value: 640000 },
      { label: "Krátkodobé pohledávky ostatní", value: 87400 },
      { label: "Peníze a bankovní účty", value: 636600 },
    ],
  },
  {
    group: "Časové rozlišení aktiv",
    items: [{ label: "Náklady příštích období", value: 24000 }],
  },
];

const rozvahaPasiva = [
  {
    group: "Vlastní kapitál",
    items: [
      { label: "Základní kapitál", value: 200000 },
      { label: "Nerozdělený zisk minulých let", value: 890000 },
      { label: "Výsledek hospodaření běžného roku", value: 724600 },
    ],
  },
  {
    group: "Cizí zdroje",
    items: [
      { label: "Závazky z obch. vztahů", value: 310000 },
      { label: "Závazky k zaměstnancům", value: 184000 },
      { label: "Závazky ze sociál. zabezpečení", value: 231200 },
      { label: "Bankovní úvěry krátkodobé", value: 384800 },
    ],
  },
];

// ── Výsledovka mock data ────────────────────────────────────────────────────
const vysledovkaVynosy = [
  { label: "Tržby za prodej zboží", value: 840000 },
  { label: "Tržby za prodej výrobků a služeb", value: 2400000 },
  { label: "Ostatní provozní výnosy", value: 128000 },
  { label: "Výnosové úroky", value: 12400 },
];

const vysledovkaNaklady = [
  { label: "Náklady na prodané zboží", value: 612000 },
  { label: "Spotřeba materiálu a energie", value: 320000 },
  { label: "Opravy a udržování", value: 48000 },
  { label: "Mzdové náklady", value: 680000 },
  { label: "Sociální a zdravotní pojistné", value: 231200 },
  { label: "Odpisy DNM a DHM", value: 84000 },
  { label: "Ostatní provozní náklady", value: 80600 },
];

// ── DPH mock data ───────────────────────────────────────────────────────────
const dphPeriody = [
  {
    period: "Leden 2026",
    zakladni: 1240000,
    snizena: 180000,
    vystup: 297600,
    vstup: 184200,
    vysledek: 113400,
    status: "paid",
  },
  {
    period: "Únor 2026",
    zakladni: 1380000,
    snizena: 210000,
    vystup: 321800,
    vstup: 198400,
    vysledek: 123400,
    status: "paid",
  },
  {
    period: "Březen 2026",
    zakladni: 1520000,
    snizena: 195000,
    vystup: 349700,
    vstup: 212600,
    vysledek: 137100,
    status: "paid",
  },
  {
    period: "Duben 2026",
    zakladni: 1640000,
    snizena: 220000,
    vystup: 377600,
    vstup: 228800,
    vysledek: 148800,
    status: "pending",
  },
];

function SectionRow({
  label,
  value,
  bold,
}: {
  label: string;
  value: number;
  bold?: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between px-3 py-2"
      style={{
        borderBottom: "1px solid rgba(0,229,255,0.05)",
        fontWeight: bold ? 600 : 400,
      }}
    >
      <span
        style={{ color: bold ? "#FFFFFF" : "#B8C1C8", fontSize: "0.85rem" }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "SF Mono, Monaco, Consolas, monospace",
          color: bold ? "#FFFFFF" : "#B8C1C8",
          fontSize: "0.85rem",
        }}
      >
        {fmt.format(value)}
      </span>
    </div>
  );
}

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

  const aktivaCelkem = rozvahaAktiva
    .flatMap((g) => g.items)
    .reduce((s, i) => s + i.value, 0);
  const pasivaCelkem = rozvahaAktiva
    .flatMap((g) => g.items)
    .reduce((s, i) => s + i.value, 0);
  const vynosyCelkem = vysledovkaVynosy.reduce((s, i) => s + i.value, 0);
  const nakladyCelkem = vysledovkaNaklady.reduce((s, i) => s + i.value, 0);
  const vysledek = vynosyCelkem - nakladyCelkem;

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

      {/* Aging chart */}
      {agingBuckets.length > 0 && (
        <div className="hud-panel p-6">
          <div className="mb-5">
            <div style={{ ...labelStyle, marginBottom: 4 }}>SALDOKONTO</div>
            <div
              style={{ color: "#FFFFFF", fontSize: "1.05rem", fontWeight: 600 }}
            >
              Stáří pohledávek
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

        {/* ── FAKTURY ── */}
        {activeTab === "invoices" && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-cyan" />
                <span style={labelStyle}>{visibleInvoices.length} FAKTUR</span>
              </div>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-3 py-1.5 transition-all"
                style={{
                  border: "1px solid rgba(0,229,255,0.2)",
                  color: "#00E5FF",
                  fontSize: "0.78rem",
                  background: "rgba(0,229,255,0.06)",
                }}
              >
                <Printer size={13} />
                Tisk / Export
              </button>
            </div>
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

        {/* ── HLAVNÍ KNIHA ── */}
        {activeTab === "hlavni-kniha" && (
          <div>
            <div className="mb-4 flex items-center gap-2">
              <BookOpen size={16} className="text-cyan" />
              <span style={labelStyle}>
                ÚČETNÍ DENÍK — Q1 2026 (KUMULATIVNĚ)
              </span>
            </div>
            <div
              className="hidden md:grid gap-3 px-3 py-2 mb-1"
              style={{
                gridTemplateColumns: "80px 1fr 1fr 1fr 1fr",
                ...labelStyle,
              }}
            >
              <span>Účet</span>
              <span>Název</span>
              <span className="text-right">Md (Debet)</span>
              <span className="text-right">Dal (Kredit)</span>
              <span className="text-right">Zůstatek</span>
            </div>
            <div className="space-y-0.5">
              {hlavniKnihaRows.map((row) => (
                <div
                  key={row.ucet}
                  className="hud-list-row hover:border-cyan-500/20 transition-colors"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "80px 1fr 1fr 1fr 1fr",
                    gap: "0.75rem",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "SF Mono, Monaco, Consolas, monospace",
                      color: "#00E5FF",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                    }}
                  >
                    {row.ucet}
                  </span>
                  <span style={{ color: "#B8C1C8", fontSize: "0.85rem" }}>
                    {row.nazev}
                  </span>
                  <span
                    style={{
                      color: "#00E5A0",
                      fontSize: "0.82rem",
                      textAlign: "right",
                      fontFamily: "SF Mono, Monaco, Consolas, monospace",
                    }}
                  >
                    {row.md > 0 ? fmt.format(row.md) : "—"}
                  </span>
                  <span
                    style={{
                      color: "#FF7B7B",
                      fontSize: "0.82rem",
                      textAlign: "right",
                      fontFamily: "SF Mono, Monaco, Consolas, monospace",
                    }}
                  >
                    {row.dal > 0 ? fmt.format(row.dal) : "—"}
                  </span>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      textAlign: "right",
                      fontWeight: 600,
                      fontFamily: "SF Mono, Monaco, Consolas, monospace",
                      color: row.zustatek >= 0 ? "#FFFFFF" : "#D4AF37",
                    }}
                  >
                    {fmt.format(Math.abs(row.zustatek))}
                    {row.zustatek < 0 && (
                      <span style={{ color: "#7A8A9E", fontSize: "0.7rem" }}>
                        {" "}
                        (pasivum)
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
            <div
              className="mt-4 px-3 py-3 flex justify-end"
              style={{ borderTop: "1px solid rgba(0,229,255,0.1)" }}
            >
              <span style={{ ...labelStyle, color: "rgba(0,229,255,0.5)" }}>
                Celkem obratů Md:{" "}
                {fmt.format(hlavniKnihaRows.reduce((s, r) => s + r.md, 0))} ·
                Dal:{" "}
                {fmt.format(hlavniKnihaRows.reduce((s, r) => s + r.dal, 0))}
              </span>
            </div>
          </div>
        )}

        {/* ── ROZVAHA ── */}
        {activeTab === "rozvaha" && (
          <div>
            <div className="mb-4 flex items-center gap-2">
              <BookOpen size={16} className="text-cyan" />
              <span style={labelStyle}>ROZVAHA K 31.03.2026 (v CZK)</span>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Aktiva */}
              <div>
                <div
                  className="px-3 py-2 mb-2"
                  style={{
                    background: "rgba(0,229,255,0.06)",
                    borderLeft: "3px solid rgba(0,229,255,0.4)",
                  }}
                >
                  <span style={{ ...labelStyle, color: "#00E5FF" }}>
                    AKTIVA CELKEM — {fmt.format(aktivaCelkem)}
                  </span>
                </div>
                {rozvahaAktiva.map((group) => {
                  const total = group.items.reduce((s, i) => s + i.value, 0);
                  return (
                    <div key={group.group} className="mb-4">
                      <div
                        className="px-3 py-1.5 mb-1"
                        style={{ background: "rgba(255,255,255,0.03)" }}
                      >
                        <span
                          style={{
                            ...labelStyle,
                            color: "rgba(0,229,255,0.55)",
                          }}
                        >
                          {group.group} — {fmt.format(total)}
                        </span>
                      </div>
                      {group.items.map((item) => (
                        <SectionRow
                          key={item.label}
                          label={item.label}
                          value={item.value}
                        />
                      ))}
                    </div>
                  );
                })}
              </div>
              {/* Pasiva */}
              <div>
                <div
                  className="px-3 py-2 mb-2"
                  style={{
                    background: "rgba(212,175,55,0.06)",
                    borderLeft: "3px solid rgba(212,175,55,0.4)",
                  }}
                >
                  <span style={{ ...labelStyle, color: "#D4AF37" }}>
                    PASIVA CELKEM — {fmt.format(pasivaCelkem)}
                  </span>
                </div>
                {rozvahaAktiva
                  .flatMap((g) => g.items)
                  .reduce((s, i) => s + i.value, 0) > 0 &&
                  rozvahaAktiva
                    .flatMap((g) => g.items)
                    .reduce((s, i) => s + i.value, 0) > 0 && (
                    <>
                      {rozvahaPasiva.map((group) => {
                        const total = group.items.reduce(
                          (s, i) => s + i.value,
                          0,
                        );
                        return (
                          <div key={group.group} className="mb-4">
                            <div
                              className="px-3 py-1.5 mb-1"
                              style={{ background: "rgba(255,255,255,0.03)" }}
                            >
                              <span
                                style={{
                                  ...labelStyle,
                                  color: "rgba(212,175,55,0.55)",
                                }}
                              >
                                {group.group} — {fmt.format(total)}
                              </span>
                            </div>
                            {group.items.map((item) => (
                              <SectionRow
                                key={item.label}
                                label={item.label}
                                value={item.value}
                              />
                            ))}
                          </div>
                        );
                      })}
                    </>
                  )}
              </div>
            </div>
          </div>
        )}

        {/* ── VÝSLEDOVKA ── */}
        {activeTab === "vysledovka" && (
          <div>
            <div className="mb-4 flex items-center gap-2">
              <BookOpen size={16} className="text-cyan" />
              <span style={labelStyle}>VÝKAZ ZISKU A ZTRÁTY — Q1 2026</span>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Výnosy */}
              <div>
                <div
                  className="px-3 py-2 mb-3"
                  style={{
                    background: "rgba(0,229,160,0.06)",
                    borderLeft: "3px solid rgba(0,229,160,0.4)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span style={{ ...labelStyle, color: "#00E5A0" }}>
                      VÝNOSY CELKEM
                    </span>
                    <span
                      style={{
                        ...labelStyle,
                        color: "#00E5A0",
                        fontSize: "0.75rem",
                      }}
                    >
                      {fmt.format(vynosyCelkem)}
                    </span>
                  </div>
                </div>
                {vysledovkaVynosy.map((item) => (
                  <SectionRow
                    key={item.label}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </div>
              {/* Náklady */}
              <div>
                <div
                  className="px-3 py-2 mb-3"
                  style={{
                    background: "rgba(255,123,123,0.06)",
                    borderLeft: "3px solid rgba(255,123,123,0.4)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span style={{ ...labelStyle, color: "#FF7B7B" }}>
                      NÁKLADY CELKEM
                    </span>
                    <span
                      style={{
                        ...labelStyle,
                        color: "#FF7B7B",
                        fontSize: "0.75rem",
                      }}
                    >
                      {fmt.format(nakladyCelkem)}
                    </span>
                  </div>
                </div>
                {vysledovkaNaklady.map((item) => (
                  <SectionRow
                    key={item.label}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </div>
            </div>
            {/* Výsledek */}
            <div
              className="mt-6 p-4 flex items-center justify-between"
              style={{
                background:
                  vysledek > 0
                    ? "rgba(0,229,160,0.08)"
                    : "rgba(255,123,123,0.08)",
                border: `1px solid ${vysledek > 0 ? "rgba(0,229,160,0.25)" : "rgba(255,123,123,0.25)"}`,
              }}
            >
              <div className="flex items-center gap-3">
                {vysledek > 0 ? (
                  <TrendingUp size={22} style={{ color: "#00E5A0" }} />
                ) : (
                  <TrendingDown size={22} style={{ color: "#FF7B7B" }} />
                )}
                <div>
                  <div
                    style={{
                      ...labelStyle,
                      color: vysledek > 0 ? "#00E5A0" : "#FF7B7B",
                    }}
                  >
                    VÝSLEDEK HOSPODAŘENÍ PŘED ZDANĚNÍM
                  </div>
                  <div
                    style={{
                      color: "#7A8A9E",
                      fontSize: "0.75rem",
                      marginTop: 2,
                    }}
                  >
                    Q1 2026 (leden–březen)
                  </div>
                </div>
              </div>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  color: vysledek > 0 ? "#00E5A0" : "#FF7B7B",
                }}
              >
                {vysledek > 0 ? "+" : ""}
                {fmt.format(vysledek)}
              </div>
            </div>
          </div>
        )}

        {/* ── DPH ── */}
        {activeTab === "dph" && (
          <div>
            <div className="mb-4 flex items-center gap-2">
              <BookOpen size={16} className="text-cyan" />
              <span style={labelStyle}>DPH PŘIZNÁNÍ — 2026</span>
            </div>
            <div
              className="hidden md:grid gap-3 px-3 py-2 mb-2"
              style={{
                gridTemplateColumns: "1.2fr 1fr 1fr 1fr 1fr 1fr 1fr",
                ...labelStyle,
              }}
            >
              <span>Období</span>
              <span className="text-right">Základ 21 %</span>
              <span className="text-right">Základ 12 %</span>
              <span className="text-right">DPH výstup</span>
              <span className="text-right">DPH vstup</span>
              <span className="text-right">Výsledek</span>
              <span className="text-right">Status</span>
            </div>
            <div className="space-y-1">
              {dphPeriody.map((row) => {
                const isPlus = row.vysledek > 0;
                return (
                  <div
                    key={row.period}
                    className="hud-list-row hover:border-cyan-500/20 transition-colors"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.2fr 1fr 1fr 1fr 1fr 1fr 1fr",
                      gap: "0.75rem",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontWeight: 600,
                        fontSize: "0.88rem",
                      }}
                    >
                      {row.period}
                    </span>
                    <span
                      style={{
                        color: "#B8C1C8",
                        fontSize: "0.82rem",
                        textAlign: "right",
                        fontFamily: "SF Mono, Monaco, Consolas, monospace",
                      }}
                    >
                      {fmt.format(row.zakladni)}
                    </span>
                    <span
                      style={{
                        color: "#B8C1C8",
                        fontSize: "0.82rem",
                        textAlign: "right",
                        fontFamily: "SF Mono, Monaco, Consolas, monospace",
                      }}
                    >
                      {fmt.format(row.snizena)}
                    </span>
                    <span
                      style={{
                        color: "#FF7B7B",
                        fontSize: "0.82rem",
                        textAlign: "right",
                        fontFamily: "SF Mono, Monaco, Consolas, monospace",
                      }}
                    >
                      {fmt.format(row.vystup)}
                    </span>
                    <span
                      style={{
                        color: "#00E5A0",
                        fontSize: "0.82rem",
                        textAlign: "right",
                        fontFamily: "SF Mono, Monaco, Consolas, monospace",
                      }}
                    >
                      {fmt.format(row.vstup)}
                    </span>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        textAlign: "right",
                        fontWeight: 700,
                        fontFamily: "SF Mono, Monaco, Consolas, monospace",
                        color: isPlus ? "#FF7B7B" : "#00E5A0",
                      }}
                    >
                      {isPlus ? "+" : ""}
                      {fmt.format(row.vysledek)}
                    </span>
                    <span className="flex justify-end">
                      <span
                        className="hud-chip"
                        data-tone={row.status === "paid" ? "green" : "gold"}
                      >
                        {row.status === "paid" ? "Podáno" : "Ke zpracování"}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
            <div
              className="mt-4 px-3 py-3 flex items-center justify-between"
              style={{
                borderTop: "1px solid rgba(0,229,255,0.1)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <span style={{ ...labelStyle, color: "rgba(0,229,255,0.5)" }}>
                ROČNÍ SOUHRN 2026 (Q1)
              </span>
              <div className="flex items-center gap-6">
                <span style={{ color: "#7A8A9E", fontSize: "0.8rem" }}>
                  Výstup celkem:{" "}
                  <span style={{ color: "#FF7B7B", fontWeight: 600 }}>
                    {fmt.format(dphPeriody.reduce((s, r) => s + r.vystup, 0))}
                  </span>
                </span>
                <span style={{ color: "#7A8A9E", fontSize: "0.8rem" }}>
                  Vstup celkem:{" "}
                  <span style={{ color: "#00E5A0", fontWeight: 600 }}>
                    {fmt.format(dphPeriody.reduce((s, r) => s + r.vstup, 0))}
                  </span>
                </span>
                <span style={{ color: "#7A8A9E", fontSize: "0.8rem" }}>
                  Odvod celkem:{" "}
                  <span style={{ color: "#FFFFFF", fontWeight: 700 }}>
                    {fmt.format(dphPeriody.reduce((s, r) => s + r.vysledek, 0))}
                  </span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ── SALDOKONTO (existing aging chart) ── */}
        {activeTab === "saldokonto" && (
          <div>
            <div className="mb-4 flex items-center gap-2">
              <BookOpen size={16} className="text-cyan" />
              <span style={labelStyle}>SALDOKONTO POHLEDÁVEK</span>
            </div>
            {agingBuckets.length > 0 ? (
              <AgingChart data={agingBuckets} />
            ) : (
              <p style={{ color: "#7A8A9E" }}>Žádná data.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
