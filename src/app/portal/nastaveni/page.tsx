"use client";

import {
  Settings,
  Phone,
  Mail,
  Mic,
  ScanLine,
  Database,
  Cloud,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useAuth } from "@/lib/auth/context";

const labelStyle = {
  fontFamily: "SF Mono, Monaco, Consolas, monospace",
  fontSize: "0.62rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "rgba(0,229,255,0.72)",
};

const integrations = [
  {
    name: "Twilio SMS",
    description: "OTP ověření, notifikace klientům, upomínky na telefon.",
    icon: Phone,
    status: "connected",
    details: "Aktivní na +420 731 037 123",
  },
  {
    name: "E-mail Gateway",
    description: "Příjem a odesílání e-mailů, automatická extrakce příloh.",
    icon: Mail,
    status: "connected",
    details: "IMAP + SMTP nakonfigurováno",
  },
  {
    name: "ElevenLabs Voice",
    description: "AI hlasový asistent pro příchozí hovory klientů.",
    icon: Mic,
    status: "configured",
    details: "Voice ID nastaveno, testovací režim",
  },
  {
    name: "OCR Engine",
    description: "Automatické rozpoznávání textu z faktur a dokumentů.",
    icon: ScanLine,
    status: "connected",
    details: "Azure Document Intelligence",
  },
  {
    name: "PostgreSQL",
    description: "Primární databáze pro všechna ERP data.",
    icon: Database,
    status: "connected",
    details: "Supabase PostgreSQL, 99.9 % uptime",
  },
  {
    name: "N8N Automation",
    description: "Workflow orchestrace pro automatizované procesy.",
    icon: Cloud,
    status: "configured",
    details: "12 aktivních workflows",
  },
];

const statusConfig: Record<
  string,
  { tone: string; label: string; icon: typeof CheckCircle2 }
> = {
  connected: { tone: "green", label: "Připojeno", icon: CheckCircle2 },
  configured: { tone: "cyan", label: "Nakonfigurováno", icon: CheckCircle2 },
  disconnected: { tone: "red", label: "Odpojeno", icon: XCircle },
  error: { tone: "red", label: "Chyba", icon: XCircle },
};

export default function NastaveniPage() {
  const { profile } = useAuth();
  if (!profile) return null;

  if (profile.role !== "owner") {
    return (
      <div className="hud-panel p-6">
        <div className="text-center py-12" style={{ color: "#7A8A9E" }}>
          <Settings
            size={32}
            className="mx-auto mb-3"
            style={{ color: "rgba(0,229,255,0.2)" }}
          />
          <div>Nastavení je dostupné pouze pro majitele.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="hud-chip" data-tone="gold">
            OWNER ONLY
          </span>
          <span className="hud-chip" data-tone="cyan">
            NASTAVENÍ
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
          Systémové nastavení
        </h1>
        <p style={{ color: "#7A8A9E", maxWidth: 600, lineHeight: 1.6 }}>
          Stav integračních služeb a konfigurace systému.
        </p>
      </div>

      {/* Integration cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {integrations.map((integration) => {
          const Icon = integration.icon;
          const config =
            statusConfig[integration.status] || statusConfig.disconnected;
          const StatusIcon = config.icon;

          return (
            <div key={integration.name} className="hud-panel p-6">
              <div className="mb-4 flex items-center justify-between">
                <div
                  className="flex h-11 w-11 items-center justify-center"
                  style={{
                    background: "rgba(0,229,255,0.06)",
                    border: "1px solid rgba(0,229,255,0.15)",
                  }}
                >
                  <Icon size={20} className="text-cyan" />
                </div>
                <div className="flex items-center gap-1.5">
                  <StatusIcon
                    size={14}
                    style={{
                      color:
                        config.tone === "green"
                          ? "#00E5A0"
                          : config.tone === "cyan"
                            ? "#00E5FF"
                            : "#FF7B7B",
                    }}
                  />
                  <span className="hud-chip" data-tone={config.tone}>
                    {config.label}
                  </span>
                </div>
              </div>
              <div
                style={{
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  marginBottom: 6,
                }}
              >
                {integration.name}
              </div>
              <div
                style={{
                  color: "#7A8A9E",
                  lineHeight: 1.6,
                  fontSize: "0.85rem",
                  marginBottom: 12,
                }}
              >
                {integration.description}
              </div>
              <div
                className="border-t border-cyan-500/8 pt-3"
                style={{ color: "#B8C1C8", fontSize: "0.82rem" }}
              >
                {integration.details}
              </div>
            </div>
          );
        })}
      </div>

      {/* General settings */}
      <div className="hud-panel p-6">
        <div className="mb-5">
          <div style={labelStyle} className="mb-1">
            OBECNÉ NASTAVENÍ
          </div>
          <div
            style={{ color: "#FFFFFF", fontSize: "1.05rem", fontWeight: 600 }}
          >
            Konfigurace portálu
          </div>
        </div>
        <div className="space-y-3">
          {[
            {
              label: "Demo režim",
              value:
                process.env.NEXT_PUBLIC_DEMO_MODE === "true"
                  ? "Aktivní"
                  : "Neaktivní",
              tone: "gold",
            },
            { label: "Jazyk", value: "Čeština", tone: "slate" },
            {
              label: "Časová zóna",
              value: "Europe/Prague (CET)",
              tone: "slate",
            },
            { label: "Měna", value: "CZK / EUR", tone: "slate" },
          ].map((setting) => (
            <div key={setting.label} className="hud-list-row">
              <span style={{ color: "#B8C1C8", fontSize: "0.88rem" }}>
                {setting.label}
              </span>
              <span className="hud-chip" data-tone={setting.tone}>
                {setting.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
