"use client";

import Link from "next/link";
import {
  Building2,
  ArrowRight,
  ShieldAlert,
  FileWarning,
  Users,
} from "lucide-react";
import { useAuth } from "@/lib/auth/context";
import {
  getCompaniesForProfile,
  invoices,
  riskAlerts,
  payrollRecords,
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

export default function KlientiPage() {
  const { profile } = useAuth();
  if (!profile) return null;

  const companies = getCompaniesForProfile(profile);

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="hud-chip" data-tone="cyan">
            KLIENTI
          </span>
          <span className="hud-chip" data-tone="slate">
            {companies.length} firem
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
          Portfolio klientů
        </h1>
        <p style={{ color: "#7A8A9E", maxWidth: 600, lineHeight: 1.6 }}>
          Kompletní přehled všech spravovaných firem s metrikami a stavem.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {companies.map((company) => {
          const companyInvoices = invoices.filter(
            (i) => i.companyId === company.id,
          );
          const revenue = companyInvoices
            .filter((i) => i.type === "issued")
            .reduce((s, i) => s + i.amount, 0);
          const overdue = companyInvoices.filter(
            (i) => i.status === "overdue",
          ).length;
          const risks = riskAlerts.filter(
            (r) => r.companyId === company.id && !r.resolvedAt,
          ).length;
          const employees = new Set(
            payrollRecords
              .filter((p) => p.companyId === company.id)
              .map((p) => p.employeeName),
          ).size;

          return (
            <Link
              key={company.id}
              href={`/portal/klienti/${company.id}`}
              className="hud-client-card block group"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <div
                    style={{
                      color: "#FFFFFF",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      fontFamily: "Space Grotesk, sans-serif",
                    }}
                  >
                    {company.name}
                  </div>
                  <div
                    style={{
                      color: "#7A8A9E",
                      fontSize: "0.82rem",
                      marginTop: 2,
                    }}
                  >
                    IČO: {company.ico} // {company.city}
                  </div>
                </div>
                <span
                  className="hud-chip"
                  data-tone={company.status === "active" ? "green" : "slate"}
                >
                  {company.status === "active" ? "Aktivní" : company.status}
                </span>
              </div>

              {company.tags && company.tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-1">
                  {company.tags.slice(0, 4).map((svc) => (
                    <span key={svc} className="hud-chip" data-tone="slate">
                      {svc}
                    </span>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="hud-mini-metric" data-tone="slate">
                  <div className="mb-1 flex items-center gap-1">
                    <Building2 size={12} className="text-cyan" />
                    <span style={{ ...labelStyle, fontSize: "0.55rem" }}>
                      Obrat
                    </span>
                  </div>
                  <div
                    style={{
                      color: "#FFFFFF",
                      fontWeight: 600,
                      fontSize: "0.88rem",
                    }}
                  >
                    {fmt.format(revenue)}
                  </div>
                </div>
                <div className="hud-mini-metric" data-tone="slate">
                  <div className="mb-1 flex items-center gap-1">
                    <Users size={12} className="text-cyan" />
                    <span style={{ ...labelStyle, fontSize: "0.55rem" }}>
                      Zaměstnanců
                    </span>
                  </div>
                  <div
                    style={{
                      color: "#FFFFFF",
                      fontWeight: 600,
                      fontSize: "0.88rem",
                    }}
                  >
                    {employees}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {overdue > 0 && (
                    <span className="hud-chip" data-tone="red">
                      <FileWarning size={11} /> {overdue} po splatnosti
                    </span>
                  )}
                  {risks > 0 && (
                    <span className="hud-chip" data-tone="red">
                      <ShieldAlert size={11} /> {risks} rizik
                    </span>
                  )}
                  {overdue === 0 && risks === 0 && (
                    <span className="hud-chip" data-tone="green">
                      Vše OK
                    </span>
                  )}
                </div>
                <ArrowRight
                  size={16}
                  className="text-text-muted group-hover:text-cyan transition-colors"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
