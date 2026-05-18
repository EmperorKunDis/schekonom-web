import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
  Cpu,
  TrendingUp,
  Activity,
  Database,
  BarChart3,
  Zap,
  Link2,
} from "lucide-react";
import { getAllAnalyses, getAnalysisById } from "@/lib/erp/analyses";

const labelStyle = {
  fontFamily: "SF Mono, Monaco, Consolas, monospace",
  fontSize: "0.62rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "rgba(0,229,255,0.72)",
};

export function generateStaticParams() {
  return getAllAnalyses().map((analysis) => ({
    analysisId: analysis.id,
  }));
}

export default async function AnalysisDetailPage({
  params,
}: {
  params: Promise<{ analysisId: string }>;
}) {
  const { analysisId } = await params;
  const analysis = getAnalysisById(analysisId);

  if (!analysis) {
    return (
      <div className="space-y-6">
        <Link
          href="/portal/reporting"
          className="inline-flex items-center gap-2 transition-colors"
          style={{ color: "#00E5FF", fontSize: "0.85rem" }}
        >
          <ArrowLeft size={14} />
          Zpět na reporting
        </Link>
        <div className="hud-panel p-8">
          <div
            className="text-center py-12"
            style={{ color: "#7A8A9E", fontSize: "1.1rem" }}
          >
            Analýza nenalezena.
          </div>
        </div>
      </div>
    );
  }

  const descriptionParagraphs = analysis.description.split("\n\n");

  return (
    <div className="space-y-6">
      {/* ----------------------------------------------------------------- */}
      {/* Back link                                                         */}
      {/* ----------------------------------------------------------------- */}
      <Link
        href="/portal/reporting"
        className="inline-flex items-center gap-2 transition-colors"
        style={{ color: "#00E5FF", fontSize: "0.85rem" }}
      >
        <ArrowLeft size={14} />
        Zpět na reporting
      </Link>

      {/* ----------------------------------------------------------------- */}
      {/* Header                                                            */}
      {/* ----------------------------------------------------------------- */}
      <div>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="hud-chip" data-tone="cyan">
            {String(analysis.sectionId).padStart(2, "0")} —{" "}
            {analysis.sectionTitle}
          </span>
          <span
            className="hud-chip"
            data-tone="gold"
            style={{ fontSize: "0.65rem" }}
          >
            {analysis.source}
          </span>
        </div>
        <h1
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            color: "#FFFFFF",
            fontSize: "clamp(1.4rem, 2.2vw, 2rem)",
            lineHeight: 1.15,
            marginBottom: 4,
          }}
        >
          {analysis.name}
        </h1>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Metadata chips                                                    */}
      {/* ----------------------------------------------------------------- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            icon: Clock,
            label: "Frekvence",
            value: analysis.frequency,
            tone: "cyan",
          },
          {
            icon: Cpu,
            label: "Automatizace",
            value: analysis.automationLevel,
            tone: "cyan",
          },
          {
            icon: TrendingUp,
            label: "Business dopad",
            value: analysis.businessImpact,
            tone: analysis.businessImpact.toLowerCase().includes("kritick")
              ? "red"
              : "gold",
          },
          {
            icon: Activity,
            label: "Status",
            value: analysis.implementationStatus,
            tone:
              analysis.implementationStatus === "Produkce" ? "green" : "gold",
          },
        ].map((meta) => {
          const MetaIcon = meta.icon;
          return (
            <div
              key={meta.label}
              className="hud-metric-card"
              data-tone={meta.tone}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <MetaIcon size={12} style={{ color: "rgba(0,229,255,0.6)" }} />
                <span style={labelStyle}>{meta.label}</span>
              </div>
              <div
                style={{
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: "0.82rem",
                  lineHeight: 1.4,
                }}
              >
                {meta.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Description                                                       */}
      {/* ----------------------------------------------------------------- */}
      <div className="hud-panel p-6">
        <div className="flex items-center gap-2 mb-4">
          <Database size={14} style={{ color: "#00E5FF" }} />
          <span style={labelStyle}>Popis analýzy</span>
        </div>
        <div className="space-y-3">
          {descriptionParagraphs.map((p, i) => (
            <p
              key={i}
              style={{
                color: "#B8C1C8",
                fontSize: "0.88rem",
                lineHeight: 1.7,
              }}
            >
              {p}
            </p>
          ))}
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Methodology                                                       */}
      {/* ----------------------------------------------------------------- */}
      <div className="hud-panel p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={14} style={{ color: "#D4AF37" }} />
          <span style={{ ...labelStyle, color: "rgba(212,175,55,0.72)" }}>
            Metodologie
          </span>
        </div>
        <p
          style={{
            color: "#B8C1C8",
            fontSize: "0.88rem",
            lineHeight: 1.7,
          }}
        >
          {analysis.methodology}
        </p>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Data Inputs / Output Metrics — two columns                        */}
      {/* ----------------------------------------------------------------- */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Data Inputs */}
        <div className="hud-panel p-6">
          <div className="flex items-center gap-2 mb-4">
            <Database size={14} style={{ color: "#00E5FF" }} />
            <span style={labelStyle}>Vstupní data</span>
          </div>
          <div className="space-y-2">
            {analysis.dataInputs.map((input, i) => (
              <div
                key={i}
                className="hud-list-row"
                style={{
                  padding: "8px 12px",
                  fontSize: "0.82rem",
                  color: "#B8C1C8",
                  borderLeft: "2px solid rgba(0,229,255,0.2)",
                }}
              >
                {input}
              </div>
            ))}
          </div>
        </div>

        {/* Output Metrics */}
        <div className="hud-panel p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={14} style={{ color: "#00E5FF" }} />
            <span style={labelStyle}>Výstupní metriky</span>
          </div>
          <div className="space-y-2">
            {analysis.outputMetrics.map((metric, i) => (
              <div
                key={i}
                className="hud-list-row"
                style={{
                  padding: "8px 12px",
                  fontSize: "0.82rem",
                  color: "#B8C1C8",
                  borderLeft: "2px solid rgba(0,229,255,0.2)",
                }}
              >
                {metric}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Scenarios — Good / Bad                                            */}
      {/* ----------------------------------------------------------------- */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Good scenario */}
        <div
          className="hud-panel p-6"
          style={{ borderColor: "rgba(0,229,160,0.2)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle size={14} style={{ color: "#00E5A0" }} />
            <span
              style={{
                ...labelStyle,
                color: "#00E5A0",
              }}
            >
              {analysis.goodScenario.title}
            </span>
          </div>
          <p
            style={{
              color: "#B8C1C8",
              fontSize: "0.85rem",
              lineHeight: 1.6,
              marginBottom: 16,
            }}
          >
            {analysis.goodScenario.description}
          </p>

          {/* Indicators */}
          <div style={{ marginBottom: 16 }}>
            <div
              style={{
                ...labelStyle,
                color: "rgba(0,229,160,0.6)",
                marginBottom: 8,
              }}
            >
              Indikátory
            </div>
            <div className="space-y-1.5">
              {analysis.goodScenario.indicators.map((ind, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle
                    size={12}
                    style={{
                      color: "#00E5A0",
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  />
                  <span
                    style={{
                      color: "#B8C1C8",
                      fontSize: "0.8rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {ind}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div>
            <div
              style={{
                ...labelStyle,
                color: "rgba(0,229,160,0.6)",
                marginBottom: 8,
              }}
            >
              Doporučené kroky
            </div>
            <div className="space-y-1.5">
              {analysis.goodScenario.actions.map((action, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span
                    style={{
                      fontFamily: "SF Mono, Monaco, Consolas, monospace",
                      fontSize: "0.7rem",
                      color: "#00E5A0",
                      fontWeight: 700,
                      flexShrink: 0,
                      width: 18,
                      textAlign: "right",
                    }}
                  >
                    {i + 1}.
                  </span>
                  <span
                    style={{
                      color: "#B8C1C8",
                      fontSize: "0.8rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {action}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bad scenario */}
        <div
          className="hud-panel p-6"
          style={{ borderColor: "rgba(255,123,123,0.2)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <XCircle size={14} style={{ color: "#FF7B7B" }} />
            <span
              style={{
                ...labelStyle,
                color: "#FF7B7B",
              }}
            >
              {analysis.badScenario.title}
            </span>
          </div>
          <p
            style={{
              color: "#B8C1C8",
              fontSize: "0.85rem",
              lineHeight: 1.6,
              marginBottom: 16,
            }}
          >
            {analysis.badScenario.description}
          </p>

          {/* Indicators */}
          <div style={{ marginBottom: 16 }}>
            <div
              style={{
                ...labelStyle,
                color: "rgba(255,123,123,0.6)",
                marginBottom: 8,
              }}
            >
              Indikátory
            </div>
            <div className="space-y-1.5">
              {analysis.badScenario.indicators.map((ind, i) => (
                <div key={i} className="flex items-start gap-2">
                  <XCircle
                    size={12}
                    style={{
                      color: "#FF7B7B",
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  />
                  <span
                    style={{
                      color: "#B8C1C8",
                      fontSize: "0.8rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {ind}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div>
            <div
              style={{
                ...labelStyle,
                color: "rgba(255,123,123,0.6)",
                marginBottom: 8,
              }}
            >
              Doporučené kroky
            </div>
            <div className="space-y-1.5">
              {analysis.badScenario.actions.map((action, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span
                    style={{
                      fontFamily: "SF Mono, Monaco, Consolas, monospace",
                      fontSize: "0.7rem",
                      color: "#FF7B7B",
                      fontWeight: 700,
                      flexShrink: 0,
                      width: 18,
                      textAlign: "right",
                    }}
                  >
                    {i + 1}.
                  </span>
                  <span
                    style={{
                      color: "#B8C1C8",
                      fontSize: "0.8rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {action}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Related analyses                                                  */}
      {/* ----------------------------------------------------------------- */}
      {analysis.relatedAnalyses.length > 0 && (
        <div className="hud-panel p-6">
          <div className="flex items-center gap-2 mb-4">
            <Link2 size={14} style={{ color: "#00E5FF" }} />
            <span style={labelStyle}>Související analýzy</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.relatedAnalyses.map((relId) => (
              <Link
                key={relId}
                href={`/portal/reporting/${relId}`}
                className="hud-chip transition-colors"
                data-tone="cyan"
                style={{
                  border: "1px solid rgba(0,229,255,0.2)",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                {relId}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* Bottom back button                                                */}
      {/* ----------------------------------------------------------------- */}
      <div className="flex justify-center pt-4 pb-8">
        <Link
          href="/portal/reporting"
          className="hud-chip cursor-pointer transition-colors"
          data-tone="cyan"
          style={{
            border: "1px solid rgba(0,229,255,0.25)",
            padding: "10px 24px",
            fontSize: "0.82rem",
            textDecoration: "none",
          }}
        >
          <span className="flex items-center gap-2">
            <ArrowLeft size={14} />
            Zpět na reporting
          </span>
        </Link>
      </div>
    </div>
  );
}
