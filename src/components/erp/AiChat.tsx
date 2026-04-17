"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";
import {
  companies,
  deadlines,
  invoices,
  riskAlerts,
  documents,
} from "@/lib/erp/data";
import { useAuth } from "@/lib/auth/context";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
}

// Keyword-based response engine over real ERP data
function getResponse(query: string): string {
  const q = query.toLowerCase();

  if (
    q.includes("termin") ||
    q.includes("termín") ||
    q.includes("deadline") ||
    q.includes("lhůt")
  ) {
    const overdue = deadlines.filter((d) => d.status === "overdue");
    const soon = deadlines.filter((d) => d.status === "due-soon");
    const fmt = new Intl.DateTimeFormat("cs-CZ", {
      day: "numeric",
      month: "long",
    });
    const lines = [...overdue, ...soon]
      .slice(0, 3)
      .map((d) => `• ${d.title} — ${fmt.format(new Date(d.dueDate))}`);
    return lines.length > 0
      ? `Máme ${overdue.length} termínů po splatnosti a ${soon.length} blízkých termínů:\n${lines.join("\n")}`
      : "Aktuálně nejsou žádné urgentní termíny.";
  }

  if (
    q.includes("faktura") ||
    q.includes("pohledávk") ||
    q.includes("splatnost") ||
    q.includes("dluh")
  ) {
    const overdueInvs = invoices.filter((i) => i.status === "overdue");
    const total = overdueInvs.reduce((s, i) => s + i.amount, 0);
    const fmt = new Intl.NumberFormat("cs-CZ", {
      style: "currency",
      currency: "CZK",
      maximumFractionDigits: 0,
    });
    return `Celkem ${overdueInvs.length} faktur po splatnosti v hodnotě ${fmt.format(total)}. Nejvíce problematické: ${overdueInvs
      .slice(0, 2)
      .map((i) => i.number)
      .join(", ")}.`;
  }

  if (
    q.includes("rizik") ||
    q.includes("alert") ||
    q.includes("upozornění") ||
    q.includes("problém")
  ) {
    const critical = riskAlerts.filter(
      (r) => r.severity === "critical" && !r.resolvedAt,
    );
    const high = riskAlerts.filter(
      (r) => r.severity === "high" && !r.resolvedAt,
    );
    return critical.length > 0
      ? `⚠ ${critical.length} kritická rizika a ${high.length} vysokých: ${critical
          .slice(0, 2)
          .map((r) => r.title)
          .join("; ")}.`
      : `${high.length} rizik vysoké závažnosti. Systém nedetekoval žádná kritická rizika.`;
  }

  if (
    q.includes("dokument") ||
    q.includes("chybí") ||
    q.includes("nahrát") ||
    q.includes("podkla")
  ) {
    const missing = documents.filter((d) => d.status === "missing");
    const byCompany = companies
      .map((c) => ({
        name: c.name,
        count: missing.filter((d) => d.companyId === c.id).length,
      }))
      .filter((c) => c.count > 0)
      .sort((a, b) => b.count - a.count);
    return byCompany.length > 0
      ? `Celkem ${missing.length} chybějících dokumentů. Nejvíce chybí: ${byCompany
          .slice(0, 3)
          .map((c) => `${c.name} (${c.count})`)
          .join(", ")}.`
      : "Skvěle — žádné dokumenty nechybí!";
  }

  if (
    q.includes("klient") ||
    q.includes("firma") ||
    q.includes("portfolio") ||
    q.includes("kolik")
  ) {
    const active = companies.filter((c) => c.status === "active");
    return `Ve správě máme ${active.length} aktivních klientů. Největší: ${companies
      .sort((a, b) => b.monthlyRevenue - a.monthlyRevenue)
      .slice(0, 2)
      .map((c) => c.name)
      .join(", ")}.`;
  }

  if (
    q.includes("dph") ||
    q.includes("daň") ||
    q.includes("přiznání") ||
    q.includes("finančák")
  ) {
    const taxDeadlines = deadlines.filter(
      (d) =>
        d.title.toLowerCase().includes("dph") ||
        d.title.toLowerCase().includes("daň"),
    );
    return taxDeadlines.length > 0
      ? `Daňových termínů: ${taxDeadlines.length}. Nejbližší: ${taxDeadlines[0]?.title} (${new Intl.DateTimeFormat("cs-CZ").format(new Date(taxDeadlines[0].dueDate))}).`
      : "Aktuálně žádné urgentní daňové termíny.";
  }

  if (
    q.includes("mzda") ||
    q.includes("mzdy") ||
    q.includes("zaměstnanc") ||
    q.includes("plat")
  ) {
    return "Mzdová agenda je zpracovávána měsíčně. Aktuálně spravujeme výplaty pro 10 klientských firem s celkem 180+ zaměstnanci.";
  }

  if (
    q.includes("německo") ||
    q.includes("německý") ||
    q.includes("de") ||
    q.includes("pendler") ||
    q.includes("bauteam")
  ) {
    const deCompanies = companies.filter((c) =>
      c.tags?.some((t) => t.includes("DE") || t.includes("Pendler")),
    );
    return `Ve správě máme ${deCompanies.length} klientů s vazbou na Německo: ${deCompanies.map((c) => c.name).join(", ")}.`;
  }

  if (
    q.includes("portal") ||
    q.includes("portál") ||
    q.includes("schekonom") ||
    q.includes("sch-ekonom")
  ) {
    return "Portál SCH-EKONOM slouží pro správu klientů, dokumentů, termínů, faktur a automatizaci účetních procesů. Přístupný na portal.schekonom.cz.";
  }

  if (
    q.includes("ahoj") ||
    q.includes("dobrý") ||
    q.includes("hello") ||
    q.includes("nazdar")
  ) {
    return "Dobrý den! Jsem váš AI asistent portálu SCH-EKONOM. Mohu vám pomoci s přehledem termínů, faktur, chybějících dokumentů nebo rizik. Na co se chcete zeptat?";
  }

  if (q.includes("díky") || q.includes("dekuju") || q.includes("děkuji")) {
    return "Rádo se stalo! Kdybyste potřeboval cokoliv dalšího, jsem tu.";
  }

  return "Rozumím vašemu dotazu. Pro podrobnosti doporučuji navštívit příslušnou sekci portálu — Termíny, Rizika, Dokumenty nebo Účetnictví. Mohu vám pomoci najít konkrétní informaci?";
}

export default function AiChat() {
  const { profile } = useAuth();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      text: "Dobrý den! Jsem AI asistent portálu SCH-EKONOM. Zeptejte se mě na termíny, faktury, rizika nebo chybějící dokumenty.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!profile || profile.role === "client") return null;

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const userMsg: Message = { id: Date.now(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700 + Math.random() * 500));
    const reply = getResponse(text);
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + 1, role: "assistant", text: reply },
    ]);
    setLoading(false);
  }, [input, loading]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80);
  }, [open]);

  return (
    <div className="fixed bottom-6 left-6 z-50" style={{ maxWidth: 360 }}>
      {open && (
        <div
          className="mb-3 flex flex-col overflow-hidden"
          style={{
            width: 360,
            height: 460,
            background:
              "linear-gradient(180deg, rgba(8,26,44,0.97) 0%, rgba(3,8,13,0.99) 100%)",
            border: "1px solid rgba(212,175,55,0.2)",
            boxShadow:
              "0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(212,175,55,0.05)",
            backdropFilter: "blur(24px)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: "1px solid rgba(212,175,55,0.12)" }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 items-center justify-center"
                style={{
                  background: "rgba(212,175,55,0.1)",
                  border: "1px solid rgba(212,175,55,0.25)",
                }}
              >
                <Bot size={15} style={{ color: "#D4AF37" }} />
              </div>
              <div>
                <div
                  style={{
                    color: "#FFFFFF",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    fontFamily: "Space Grotesk, sans-serif",
                  }}
                >
                  AI Asistent
                </div>
                <div
                  style={{
                    fontFamily: "SF Mono, Monaco, Consolas, monospace",
                    fontSize: "0.55rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(212,175,55,0.7)",
                  }}
                >
                  SCH-EKONOM · LIVE DATA
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-text-muted hover:text-white transition-colors p-1"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
            style={{ minHeight: 0 }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  style={{
                    width: 26,
                    height: 26,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      msg.role === "assistant"
                        ? "rgba(212,175,55,0.1)"
                        : "rgba(0,229,255,0.1)",
                    border: `1px solid ${msg.role === "assistant" ? "rgba(212,175,55,0.2)" : "rgba(0,229,255,0.2)"}`,
                    flexShrink: 0,
                  }}
                >
                  {msg.role === "assistant" ? (
                    <Bot size={12} style={{ color: "#D4AF37" }} />
                  ) : (
                    <User size={12} style={{ color: "#00E5FF" }} />
                  )}
                </div>
                <div
                  style={{
                    background:
                      msg.role === "assistant"
                        ? "rgba(255,255,255,0.04)"
                        : "rgba(0,229,255,0.08)",
                    border: `1px solid ${msg.role === "assistant" ? "rgba(255,255,255,0.06)" : "rgba(0,229,255,0.15)"}`,
                    padding: "8px 12px",
                    maxWidth: "85%",
                    color: "#B8C1C8",
                    fontSize: "0.8rem",
                    lineHeight: 1.55,
                    whiteSpace: "pre-line",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-start gap-2">
                <div
                  style={{
                    width: 26,
                    height: 26,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(212,175,55,0.1)",
                    border: "1px solid rgba(212,175,55,0.2)",
                  }}
                >
                  <Bot size={12} style={{ color: "#D4AF37" }} />
                </div>
                <div
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    padding: "10px 14px",
                  }}
                >
                  <Loader2
                    size={14}
                    style={{ color: "#D4AF37" }}
                    className="animate-spin"
                  />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {messages.length === 1 && (
            <div
              className="px-4 pb-2 flex flex-wrap gap-1.5"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              {[
                "Jaké jsou termíny?",
                "Kolik faktur po splatnosti?",
                "Která rizika jsou kritická?",
              ].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setInput(s);
                    setTimeout(() => inputRef.current?.focus(), 10);
                  }}
                  style={{
                    fontSize: "0.7rem",
                    color: "rgba(212,175,55,0.8)",
                    border: "1px solid rgba(212,175,55,0.2)",
                    background: "rgba(212,175,55,0.06)",
                    padding: "3px 8px",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div
            className="flex items-center gap-2 px-3 py-3"
            style={{ borderTop: "1px solid rgba(212,175,55,0.12)" }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Zeptejte se na data portálu..."
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(212,175,55,0.15)",
                outline: "none",
                color: "#FFFFFF",
                fontSize: "0.82rem",
                padding: "8px 12px",
              }}
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              style={{
                width: 34,
                height: 34,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  input.trim() && !loading
                    ? "rgba(212,175,55,0.2)"
                    : "rgba(255,255,255,0.04)",
                border: `1px solid ${input.trim() && !loading ? "rgba(212,175,55,0.4)" : "rgba(255,255,255,0.06)"}`,
                transition: "all 0.2s",
                flexShrink: 0,
              }}
            >
              <Send
                size={14}
                style={{
                  color: input.trim() && !loading ? "#D4AF37" : "#7A8A9E",
                }}
              />
            </button>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center transition-all duration-300"
        style={{
          width: 50,
          height: 50,
          borderRadius: "50%",
          background: open ? "rgba(255,123,123,0.12)" : "rgba(212,175,55,0.12)",
          border: `2px solid ${open ? "rgba(255,123,123,0.35)" : "rgba(212,175,55,0.35)"}`,
          boxShadow:
            "0 4px 28px rgba(212,175,55,0.18), 0 0 50px rgba(212,175,55,0.06)",
        }}
      >
        {open ? (
          <X size={20} style={{ color: "#FF7B7B" }} />
        ) : (
          <MessageSquare size={20} style={{ color: "#D4AF37" }} />
        )}
      </button>
    </div>
  );
}
