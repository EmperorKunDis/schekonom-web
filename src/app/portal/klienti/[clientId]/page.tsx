"use client";

import { use } from "react";
import Link from "next/link";
import {
  Building2,
  ArrowLeft,
  FileText,
  Calendar,
  MessageSquare,
  ShieldAlert,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import { useAuth } from "@/lib/auth/context";
import {
  companies,
  invoices,
  documents,
  deadlines,
  communicationLog,
  riskAlerts,
} from "@/lib/erp/data";

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

const invoiceStatusTone: Record<string, string> = {
  paid: "green",
  sent: "cyan",
  overdue: "red",
  draft: "slate",
};

const invoiceStatusLabel: Record<string, string> = {
  paid: "Uhrazena",
  sent: "Odesláno",
  overdue: "Po splatnosti",
  draft: "Koncept",
};

export default function ClientDetailPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = use(params);
  const { profile } = useAuth();
  if (!profile) return null;

  const company = companies.find((c) => c.id === clientId);
  if (!company) {
    return (
      <div className="hud-panel p-6">
        <div className="text-center py-12" style={{ color: "#7A8A9E" }}>
          Firma nebyla nalezena.
        </div>
      </div>
    );
  }

  const companyInvoices = invoices
    .filter((i) => i.companyId === clientId)
    .sort(
      (a, b) =>
        new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime(),
    );

  const companyDocs = documents
    .filter((d) => d.companyId === clientId)
    .sort(
      (a, b) =>
        new Date(b.uploadedAt || "").getTime() -
        new Date(a.uploadedAt || "").getTime(),
    );

  const companyDeadlines = deadlines
    .filter((d) => d.companyId === clientId && d.status !== "completed")
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    );

  const companyComms = communicationLog
    .filter((c) => c.companyId === clientId)
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );

  const companyRisks = riskAlerts.filter(
    (r) => r.companyId === clientId && !r.resolvedAt,
  );

  const receivables = companyInvoices
    .filter(
      (i) =>
        i.type === "issued" && (i.status === "sent" || i.status === "overdue"),
    )
    .reduce((s, i) => s + i.amount, 0);

  const payables = companyInvoices
    .filter((i) => i.type === "received" && i.status !== "paid")
    .reduce((s, i) => s + i.amount, 0);

  return (
    <div className="space-y-6">
      {/* Back + Header */}
      <div>
        <Link
          href="/portal/klienti"
          className="inline-flex items-center gap-2 mb-4 text-text-muted hover:text-white transition-colors text-[0.85rem]"
        >
          <ArrowLeft size={16} /> Zpět na klienty
        </Link>
        <div className="hud-panel p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className="flex h-14 w-14 items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(0,229,255,0.06)",
                  border: "2px solid rgba(0,229,255,0.2)",
                }}
              >
                <Building2 size={24} className="text-cyan" />
              </div>
              <div>
                <h1
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    color: "#FFFFFF",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    lineHeight: 1.2,
                  }}
                >
                  {company.name}
                </h1>
                <div
                  style={{
                    color: "#7A8A9E",
                    fontSize: "0.88rem",
                    marginTop: 2,
                  }}
                >
                  IČO: {company.ico} // DIČ: {company.dic || "N/A"} //{" "}
                  {company.city}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span
                className="hud-chip"
                data-tone={company.status === "active" ? "green" : "slate"}
              >
                {company.status === "active" ? "Aktivní" : company.status}
              </span>
              {company.tags?.map((svc) => (
                <span key={svc} className="hud-chip" data-tone="slate">
                  {svc}
                </span>
              ))}
            </div>
          </div>

          {/* Financial summary */}
          <div className="grid gap-4 md:grid-cols-4 mt-6">
            <div className="hud-metric-card" data-tone="cyan">
              <div className="mb-1" style={labelStyle}>
                Pohledávky
              </div>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                {fmt.format(receivables)}
              </div>
            </div>
            <div className="hud-metric-card" data-tone="gold">
              <div className="mb-1" style={labelStyle}>
                Závazky
              </div>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                {fmt.format(payables)}
              </div>
            </div>
            <div
              className="hud-metric-card"
              data-tone={companyRisks.length > 0 ? "red" : "green"}
            >
              <div className="mb-1" style={labelStyle}>
                Rizika
              </div>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                {companyRisks.length}
              </div>
            </div>
            <div className="hud-metric-card" data-tone="slate">
              <div className="mb-1" style={labelStyle}>
                Dokumenty
              </div>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                {companyDocs.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-12">
        {/* Invoices */}
        <div className="xl:col-span-7">
          <div className="hud-panel p-6">
            <div className="mb-5 flex items-center gap-2">
              <FileText size={16} className="text-cyan" />
              <span style={labelStyle}>FAKTURY</span>
              <span className="hud-chip" data-tone="slate">
                {companyInvoices.length}
              </span>
            </div>
            <div className="space-y-1">
              {companyInvoices.slice(0, 15).map((inv) => (
                <div key={inv.id} className="hud-list-row">
                  <div className="flex items-center gap-3 min-w-0">
                    {inv.type === "issued" ? (
                      <ArrowUpRight
                        size={14}
                        className="text-status-green flex-shrink-0"
                      />
                    ) : (
                      <ArrowDownLeft
                        size={14}
                        className="text-status-gold flex-shrink-0"
                      />
                    )}
                    <div className="min-w-0">
                      <div
                        style={{
                          color: "#FFFFFF",
                          fontWeight: 600,
                          fontSize: "0.85rem",
                        }}
                        className="truncate"
                      >
                        {inv.number} — {inv.supplier || inv.customer}
                      </div>
                      <div style={{ color: "#7A8A9E", fontSize: "0.75rem" }}>
                        {fmtDate.format(new Date(inv.issueDate))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                      }}
                    >
                      {fmt.format(inv.amount)}
                    </span>
                    <span
                      className="hud-chip"
                      data-tone={invoiceStatusTone[inv.status] || "slate"}
                    >
                      {invoiceStatusLabel[inv.status] || inv.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Deadlines + Risks */}
        <div className="xl:col-span-5 space-y-6">
          <div className="hud-panel p-6">
            <div className="mb-5 flex items-center gap-2">
              <Calendar size={16} className="text-cyan" />
              <span style={labelStyle}>TERMÍNY</span>
              <span className="hud-chip" data-tone="slate">
                {companyDeadlines.length}
              </span>
            </div>
            <div className="space-y-2">
              {companyDeadlines.slice(0, 6).map((dl) => (
                <div key={dl.id} className="hud-list-row hud-list-row-stacked">
                  <div className="flex items-start justify-between gap-2">
                    <div
                      style={{
                        color: "#FFFFFF",
                        fontWeight: 600,
                        fontSize: "0.88rem",
                      }}
                    >
                      {dl.title}
                    </div>
                    <span className="hud-chip" data-tone="gold">
                      {fmtDate.format(new Date(dl.dueDate))}
                    </span>
                  </div>
                  <div
                    style={{
                      color: "#7A8A9E",
                      fontSize: "0.78rem",
                      marginTop: 4,
                    }}
                  >
                    {dl.type} // {dl.responsibleName}
                  </div>
                </div>
              ))}
              {companyDeadlines.length === 0 && (
                <div
                  style={{
                    color: "#7A8A9E",
                    padding: "1rem",
                    textAlign: "center",
                  }}
                >
                  Žádné aktivní termíny.
                </div>
              )}
            </div>
          </div>

          {companyRisks.length > 0 && (
            <div className="hud-panel p-6">
              <div className="mb-5 flex items-center gap-2">
                <ShieldAlert size={16} className="text-status-red" />
                <span style={labelStyle}>RIZIKA</span>
              </div>
              <div className="space-y-2">
                {companyRisks.map((risk) => (
                  <div
                    key={risk.id}
                    className="hud-alert-card"
                    data-tone={
                      risk.severity === "critical" || risk.severity === "high"
                        ? "red"
                        : "gold"
                    }
                  >
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
                        color: "#B8C1C8",
                        fontSize: "0.82rem",
                        lineHeight: 1.5,
                      }}
                    >
                      {risk.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Documents */}
      <div className="hud-panel p-6">
        <div className="mb-5 flex items-center gap-2">
          <FileText size={16} className="text-cyan" />
          <span style={labelStyle}>DOKUMENTY</span>
          <span className="hud-chip" data-tone="slate">
            {companyDocs.length}
          </span>
        </div>
        <div className="space-y-1">
          {companyDocs.slice(0, 10).map((doc) => (
            <div key={doc.id} className="hud-list-row">
              <div className="min-w-0">
                <div
                  style={{
                    color: "#FFFFFF",
                    fontWeight: 600,
                    fontSize: "0.88rem",
                  }}
                  className="truncate"
                >
                  {doc.title}
                </div>
                <div style={{ color: "#7A8A9E", fontSize: "0.78rem" }}>
                  {doc.type} // {doc.type}
                </div>
              </div>
              <span
                className="hud-chip flex-shrink-0"
                data-tone={
                  doc.status === "processed"
                    ? "green"
                    : doc.status === "missing"
                      ? "red"
                      : "slate"
                }
              >
                {doc.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Communication log */}
      {companyComms.length > 0 && (
        <div className="hud-panel p-6">
          <div className="mb-5 flex items-center gap-2">
            <MessageSquare size={16} className="text-cyan" />
            <span style={labelStyle}>KOMUNIKACE</span>
          </div>
          <div className="space-y-2">
            {companyComms.slice(0, 8).map((comm) => (
              <div key={comm.id} className="hud-list-row hud-list-row-stacked">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div
                      style={{
                        color: "#FFFFFF",
                        fontWeight: 600,
                        fontSize: "0.88rem",
                      }}
                    >
                      {comm.subject}
                    </div>
                    <div
                      style={{
                        color: "#7A8A9E",
                        fontSize: "0.78rem",
                        marginTop: 2,
                      }}
                    >
                      {comm.channel} // {comm.direction} //{" "}
                      {`${comm.from} → ${comm.to}`}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {comm.sentiment && (
                      <span
                        className="hud-chip"
                        data-tone={
                          comm.sentiment === "positive"
                            ? "green"
                            : comm.sentiment === "negative"
                              ? "red"
                              : "slate"
                        }
                      >
                        {comm.sentiment}
                      </span>
                    )}
                    <span className="hud-time-stamp">
                      {fmtDate.format(new Date(comm.timestamp))}
                    </span>
                  </div>
                </div>
                {comm.preview && (
                  <div
                    style={{
                      color: "#B8C1C8",
                      fontSize: "0.82rem",
                      lineHeight: 1.5,
                      marginTop: 6,
                    }}
                  >
                    {comm.preview}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
