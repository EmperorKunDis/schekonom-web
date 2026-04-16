"use client";

import {
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Lightbulb,
  Zap,
} from "lucide-react";
import { useAuth } from "@/lib/auth/context";
import {
  getCompaniesForProfile,
  invoices,
  riskAlerts,
  deadlines,
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

interface Recommendation {
  title: string;
  description: string;
  impact: string;
  category: string;
  tone: string;
  icon: typeof Sparkles;
}

export default function DoporuceniPage() {
  const { profile } = useAuth();
  if (!profile) return null;

  const companies = getCompaniesForProfile(profile);
  const companyIds = new Set(companies.map((c) => c.id));

  const overdueInvoices = invoices.filter(
    (i) => companyIds.has(i.companyId) && i.status === "overdue",
  );
  const openRisks = riskAlerts.filter(
    (r) => companyIds.has(r.companyId) && !r.resolvedAt,
  );
  const pendingDeadlines = deadlines.filter(
    (d) => companyIds.has(d.companyId) && d.status === "upcoming",
  );

  // Dynamic recommendations based on data
  const recommendations: Recommendation[] = [];

  if (overdueInvoices.length > 0) {
    const totalOverdue = overdueInvoices.reduce((s, i) => s + i.amount, 0);
    recommendations.push({
      title: "Upomínky na nezaplacené faktury",
      description: `Máte ${overdueInvoices.length} faktur po splatnosti v celkové hodnotě ${fmt.format(totalOverdue)}. Doporučujeme automatické upomínky.`,
      impact: `Potenciální inkaso: ${fmt.format(totalOverdue)}`,
      category: "Cash flow",
      tone: "red",
      icon: TrendingUp,
    });
  }

  if (openRisks.length > 0) {
    recommendations.push({
      title: "Řešení otevřených rizik",
      description: `${openRisks.length} rizikových upozornění vyžaduje pozornost. Prioritizujte kritická rizika.`,
      impact: "Snížení operačního rizika",
      category: "Compliance",
      tone: "gold",
      icon: ShieldCheck,
    });
  }

  if (pendingDeadlines.length > 3) {
    recommendations.push({
      title: "Plánování kapacity",
      description: `${pendingDeadlines.length} čekajících termínů. Zvažte přerozdělení úkolů v týmu.`,
      impact: "Prevence promeškání termínů",
      category: "Operativa",
      tone: "gold",
      icon: Zap,
    });
  }

  // Static AI recommendations
  recommendations.push(
    {
      title: "Optimalizace DPH zdaňovacího období",
      description:
        "Na základě objemu faktur doporučujeme přechod na měsíční zdaňovací období DPH pro lepší cash flow management.",
      impact: "Odhadované zlepšení cash flow: 8-12 %",
      category: "Daňová optimalizace",
      tone: "cyan",
      icon: Lightbulb,
    },
    {
      title: "Digitalizace příjmu dokumentů",
      description:
        "Automatické zpracování příloh z e-mailu a OCR rozpoznávání faktur ušetří 4-6 hodin týdně.",
      impact: "Úspora: ~20 hodin měsíčně",
      category: "Automatizace",
      tone: "cyan",
      icon: Zap,
    },
    {
      title: "Cross-border daňové zvýhodnění",
      description:
        "Klienti s německými příjmy mohou využít DBA CZ-DE pro snížení srážkové daně. Zkontrolujte oprávněnost.",
      impact: "Průměrný refund: 2 000-5 000 EUR/klient",
      category: "Přeshraniční daně",
      tone: "green",
      icon: Sparkles,
    },
  );

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="hud-chip" data-tone="gold">
            AI DOPORUČENÍ
          </span>
          <span className="hud-chip" data-tone="cyan">
            VIRTUÁLNÍ CFO
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
          Inteligentní doporučení
        </h1>
        <p style={{ color: "#7A8A9E", maxWidth: 600, lineHeight: 1.6 }}>
          Personalizované návrhy na základě analýzy vašich dat a účetních
          vzorců.
        </p>
      </div>

      {/* Recommendations */}
      <div className="space-y-4">
        {recommendations.map((rec) => {
          const Icon = rec.icon;
          return (
            <div key={rec.title} className="hud-panel p-6">
              <div className="flex items-start gap-4">
                <div
                  className="flex h-11 w-11 items-center justify-center flex-shrink-0"
                  style={{
                    background:
                      rec.tone === "red"
                        ? "rgba(255,123,123,0.06)"
                        : rec.tone === "gold"
                          ? "rgba(212,175,55,0.06)"
                          : "rgba(0,229,255,0.06)",
                    border: `1px solid ${rec.tone === "red" ? "rgba(255,123,123,0.15)" : rec.tone === "gold" ? "rgba(212,175,55,0.15)" : "rgba(0,229,255,0.15)"}`,
                  }}
                >
                  <Icon
                    size={20}
                    style={{
                      color:
                        rec.tone === "red"
                          ? "#FF7B7B"
                          : rec.tone === "gold"
                            ? "#E6C65C"
                            : "#00E5FF",
                    }}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div
                        style={{
                          color: "#FFFFFF",
                          fontWeight: 700,
                          fontSize: "1.05rem",
                          marginBottom: 4,
                        }}
                      >
                        {rec.title}
                      </div>
                      <span className="hud-chip" data-tone={rec.tone}>
                        {rec.category}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      color: "#B8C1C8",
                      lineHeight: 1.7,
                      fontSize: "0.9rem",
                      marginTop: 8,
                    }}
                  >
                    {rec.description}
                  </div>
                  <div
                    className="mt-4 border-t border-cyan-500/8 pt-3 flex items-center gap-2"
                    style={{
                      color: "#00E5FF",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    <TrendingUp size={14} />
                    {rec.impact}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
