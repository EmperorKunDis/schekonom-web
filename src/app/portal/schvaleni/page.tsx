"use client";

import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  Receipt,
  FileCheck,
  AlertTriangle,
  Check,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useAuth } from "@/lib/auth/context";

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

type Priority = "urgent" | "high" | "medium" | "low";
type ItemType = "invoice" | "tax" | "contract";
type Status = "pending" | "approved" | "rejected";

interface ApprovalItem {
  id: string;
  type: ItemType;
  title: string;
  amount: number;
  requestedBy: string;
  date: string;
  priority: Priority;
  description: string;
}

const initialItems: ApprovalItem[] = [
  {
    id: "appr_001",
    type: "tax",
    title: "DPH přiznání — MontServis Švanda, duben 2026",
    amount: 47200,
    requestedBy: "F. Schneider",
    date: "2026-04-15",
    priority: "urgent",
    description:
      "Měsíční DPH přiznání k podpisu a elektronickému odeslání na Finanční úřad Cheb. Termín podání: 20.04.2026.",
  },
  {
    id: "appr_002",
    type: "invoice",
    title: "Faktura FV2026008 — BauTeam Nord GmbH",
    amount: 96000,
    requestedBy: "J. Seitzová",
    date: "2026-04-14",
    priority: "high",
    description:
      "Platba za vedení účetnictví a zpracování DE daňové agendy za Q1 2026. Splatnost: 30.04.2026.",
  },
  {
    id: "appr_003",
    type: "tax",
    title: "DPPO přiznání — Restaurace U Mostu s.r.o. 2025",
    amount: 128000,
    requestedBy: "F. Schneider",
    date: "2026-04-12",
    priority: "high",
    description:
      "Roční přiznání k dani z příjmů právnických osob za rok 2025. Přílohy: rozvaha, výsledovka, příloha k účetní závěrce.",
  },
  {
    id: "appr_004",
    type: "contract",
    title: "Smlouva o vedení účetnictví — LogiTrans CZ s.r.o.",
    amount: 0,
    requestedBy: "F. Schneider",
    date: "2026-04-13",
    priority: "medium",
    description:
      "Nová rámcová smlouva na vedení účetnictví a zpracování mezd od 01.05.2026. Měsíční paušál: 8 500 Kč.",
  },
  {
    id: "appr_005",
    type: "invoice",
    title: "Faktura FV2026011 — Elektro Projekt DE-CZ s.r.o.",
    amount: 34800,
    requestedBy: "J. Seitzová",
    date: "2026-04-10",
    priority: "medium",
    description:
      "Platba za zpracování DPH a přeshraničního poradenství za Q1 2026.",
  },
  {
    id: "appr_006",
    type: "invoice",
    title: "Faktura FV2026014 — Wellness & Spa Francisci",
    amount: 22500,
    requestedBy: "J. Novotná",
    date: "2026-04-09",
    priority: "low",
    description:
      "Poradenství ke zdanění zaměstnaneckých benefitů a optimalizaci mzdových nákladů.",
  },
];

const priorityTone: Record<Priority, string> = {
  urgent: "red",
  high: "gold",
  medium: "cyan",
  low: "slate",
};
const priorityLabel: Record<Priority, string> = {
  urgent: "Urgentní",
  high: "Vysoká",
  medium: "Střední",
  low: "Nízká",
};
const typeIcon: Record<ItemType, React.ElementType> = {
  invoice: Receipt,
  tax: FileText,
  contract: FileCheck,
};
const typeLabel: Record<ItemType, string> = {
  invoice: "Faktura",
  tax: "Daňový dokument",
  contract: "Smlouva",
};

export default function SchvaleniPage() {
  const { profile } = useAuth();
  const [statuses, setStatuses] = useState<Record<string, Status>>({});
  const [expanded, setExpanded] = useState<string | null>(null);
  const [comment, setComment] = useState<Record<string, string>>({});

  if (!profile) return null;
  if (profile.role === "client") {
    return (
      <div className="flex items-center justify-center h-48">
        <p style={{ color: "#7A8A9E" }}>
          Sekce schválení je přístupná pouze pro zaměstnance a majitele.
        </p>
      </div>
    );
  }

  const approve = (id: string) =>
    setStatuses((prev) => ({ ...prev, [id]: "approved" }));
  const reject = (id: string) =>
    setStatuses((prev) => ({ ...prev, [id]: "rejected" }));
  const toggle = (id: string) =>
    setExpanded((prev) => (prev === id ? null : id));

  const pending = initialItems.filter((i) => !statuses[i.id]);
  const done = initialItems.filter((i) => statuses[i.id]);

  const approvedCount = Object.values(statuses).filter(
    (s) => s === "approved",
  ).length;
  const rejectedCount = Object.values(statuses).filter(
    (s) => s === "rejected",
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="hud-chip" data-tone="cyan">
            SCHVÁLENÍ
          </span>
          {pending.length > 0 && (
            <span className="hud-chip" data-tone="red">
              {pending.length} čeká
            </span>
          )}
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
          Schvalovací workflow
        </h1>
        <p style={{ color: "#7A8A9E", maxWidth: 600, lineHeight: 1.6 }}>
          Faktury, daňové dokumenty a smlouvy čekající na schválení.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 grid-cols-3">
        <div className="hud-metric-card" data-tone="gold">
          <div className="mb-2" style={labelStyle}>
            Čeká na schválení
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.8rem",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {pending.length}
          </div>
        </div>
        <div className="hud-metric-card" data-tone="green">
          <div className="mb-2" style={labelStyle}>
            Schváleno
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.8rem",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {approvedCount}
          </div>
        </div>
        <div className="hud-metric-card" data-tone="red">
          <div className="mb-2" style={labelStyle}>
            Zamítnuto
          </div>
          <div
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.8rem",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {rejectedCount}
          </div>
        </div>
      </div>

      {/* Pending items */}
      {pending.length > 0 && (
        <div className="hud-panel p-6">
          <div className="mb-4" style={labelStyle}>
            Čeká na schválení — {pending.length} položek
          </div>
          <div className="space-y-3">
            {pending.map((item) => {
              const Icon = typeIcon[item.type];
              const isExpanded = expanded === item.id;
              return (
                <div
                  key={item.id}
                  style={{
                    border: "1px solid rgba(0,229,255,0.1)",
                    background: "rgba(255,255,255,0.02)",
                    transition: "border-color 0.2s",
                  }}
                >
                  {/* Row */}
                  <div className="flex items-center gap-3 p-4">
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(0,229,255,0.07)",
                        border: "1px solid rgba(0,229,255,0.15)",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={16} style={{ color: "#00E5FF" }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          style={{
                            color: "#FFFFFF",
                            fontWeight: 600,
                            fontSize: "0.88rem",
                          }}
                        >
                          {item.title}
                        </span>
                        <span
                          className="hud-chip"
                          data-tone={priorityTone[item.priority]}
                        >
                          {priorityLabel[item.priority]}
                        </span>
                        <span className="hud-chip" data-tone="slate">
                          {typeLabel[item.type]}
                        </span>
                      </div>
                      <div
                        style={{
                          color: "#7A8A9E",
                          fontSize: "0.78rem",
                          marginTop: 2,
                        }}
                      >
                        {item.requestedBy} · {item.date}
                        {item.amount > 0 && (
                          <span style={{ color: "#B8C1C8", marginLeft: 8 }}>
                            · {fmt.format(item.amount)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => approve(item.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 transition-all"
                        style={{
                          background: "rgba(0,229,160,0.1)",
                          border: "1px solid rgba(0,229,160,0.3)",
                          color: "#00E5A0",
                          fontSize: "0.78rem",
                          fontWeight: 600,
                        }}
                      >
                        <Check size={13} />
                        Schválit
                      </button>
                      <button
                        onClick={() => reject(item.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 transition-all"
                        style={{
                          background: "rgba(255,123,123,0.08)",
                          border: "1px solid rgba(255,123,123,0.25)",
                          color: "#FF7B7B",
                          fontSize: "0.78rem",
                          fontWeight: 600,
                        }}
                      >
                        <X size={13} />
                        Zamítnout
                      </button>
                      <button
                        onClick={() => toggle(item.id)}
                        style={{ color: "#7A8A9E" }}
                      >
                        {isExpanded ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <div
                      style={{
                        borderTop: "1px solid rgba(0,229,255,0.08)",
                        padding: "12px 16px 16px",
                      }}
                    >
                      <p
                        style={{
                          color: "#B8C1C8",
                          fontSize: "0.82rem",
                          lineHeight: 1.6,
                          marginBottom: 12,
                        }}
                      >
                        {item.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <input
                          placeholder="Komentář ke schválení / zamítnutí (volitelné)..."
                          value={comment[item.id] || ""}
                          onChange={(e) =>
                            setComment((prev) => ({
                              ...prev,
                              [item.id]: e.target.value,
                            }))
                          }
                          style={{
                            flex: 1,
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(0,229,255,0.12)",
                            color: "#FFFFFF",
                            fontSize: "0.8rem",
                            padding: "6px 12px",
                            outline: "none",
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* All approved */}
      {pending.length === 0 && (
        <div className="hud-panel p-10 text-center">
          <CheckCircle2
            size={40}
            className="mx-auto mb-4"
            style={{ color: "#00E5A0" }}
          />
          <div
            style={{
              color: "#FFFFFF",
              fontSize: "1.1rem",
              fontWeight: 600,
              marginBottom: 6,
            }}
          >
            Vše vyřízeno
          </div>
          <div style={{ color: "#7A8A9E" }}>
            Žádné položky nečekají na schválení.
          </div>
        </div>
      )}

      {/* Done items */}
      {done.length > 0 && (
        <div className="hud-panel p-6">
          <div className="mb-4" style={labelStyle}>
            Vyřízeno — {done.length} položek
          </div>
          <div className="space-y-2">
            {done.map((item) => {
              const status = statuses[item.id];
              const Icon = typeIcon[item.type];
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3 px-4 py-3"
                  style={{
                    border: `1px solid ${status === "approved" ? "rgba(0,229,160,0.15)" : "rgba(255,123,123,0.15)"}`,
                    background:
                      status === "approved"
                        ? "rgba(0,229,160,0.04)"
                        : "rgba(255,123,123,0.04)",
                    opacity: 0.8,
                  }}
                >
                  <Icon size={14} style={{ color: "#7A8A9E", flexShrink: 0 }} />
                  <span
                    style={{
                      color: "#B8C1C8",
                      fontSize: "0.85rem",
                      flex: 1,
                    }}
                    className="truncate"
                  >
                    {item.title}
                  </span>
                  {status === "approved" ? (
                    <span
                      className="flex items-center gap-1 hud-chip"
                      data-tone="green"
                    >
                      <CheckCircle2 size={11} />
                      Schváleno
                    </span>
                  ) : (
                    <span
                      className="flex items-center gap-1 hud-chip"
                      data-tone="red"
                    >
                      <XCircle size={11} />
                      Zamítnuto
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
