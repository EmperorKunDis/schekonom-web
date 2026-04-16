"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Mail,
  Paperclip,
  Search,
  ChevronRight,
  X,
  ScanLine,
  UserPlus,
  Inbox,
  AlertTriangle,
  CheckCircle2,
  MinusCircle,
  Bot,
  RefreshCw,
} from "lucide-react";

interface Email {
  id: string;
  from: string;
  fromName: string;
  to: string;
  subject: string;
  preview: string;
  body?: string;
  date: string;
  read: boolean;
  hasAttachments: boolean;
  attachmentCount: number;
  companyId: string;
  sentiment: "positive" | "neutral" | "negative";
  category: string;
}

const labelStyle = {
  fontFamily: "SF Mono, Monaco, Consolas, monospace",
  fontSize: "0.62rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "rgba(0,229,255,0.72)",
};

const fmtDateTime = new Intl.DateTimeFormat("cs-CZ", {
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

const fmtDateFull = new Intl.DateTimeFormat("cs-CZ", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const sentimentConfig: Record<
  string,
  { tone: string; label: string; Icon: typeof CheckCircle2 }
> = {
  positive: { tone: "green", label: "Pozitivni", Icon: CheckCircle2 },
  neutral: { tone: "slate", label: "Neutralni", Icon: MinusCircle },
  negative: { tone: "red", label: "Negativni", Icon: AlertTriangle },
};

const categoryConfig: Record<string, { tone: string; label: string }> = {
  documents: { tone: "cyan", label: "Dokumenty" },
  tax: { tone: "gold", label: "Dane" },
  payroll: { tone: "green", label: "Mzdy" },
  compliance: { tone: "red", label: "Compliance" },
  internal: { tone: "slate", label: "Interni" },
  system: { tone: "cyan", label: "System" },
  spam: { tone: "slate", label: "Marketing" },
};

export default function EmailInbox() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [assigningId, setAssigningId] = useState<string | null>(null);
  const [ocrProcessing, setOcrProcessing] = useState<string | null>(null);

  const fetchEmails = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/email/inbox");
      const data = await res.json();
      setEmails(data.emails || []);
    } catch {
      // Demo fallback
      setEmails([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  const selected = emails.find((e) => e.id === selectedId) || null;

  // Filter emails
  let filtered = emails;
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (e) =>
        e.subject.toLowerCase().includes(q) ||
        e.fromName.toLowerCase().includes(q) ||
        e.from.toLowerCase().includes(q) ||
        e.preview.toLowerCase().includes(q),
    );
  }
  if (filterCategory !== "all") {
    filtered = filtered.filter((e) => e.category === filterCategory);
  }

  const unreadCount = emails.filter((e) => !e.read).length;
  const categories = [...new Set(emails.map((e) => e.category))];

  const handleSelect = (email: Email) => {
    setSelectedId(email.id);
    // Mark as read
    setEmails((prev) =>
      prev.map((e) => (e.id === email.id ? { ...e, read: true } : e)),
    );
  };

  const handleAssign = (emailId: string) => {
    setAssigningId(emailId);
    setTimeout(() => {
      setAssigningId(null);
    }, 1500);
  };

  const handleOcr = (emailId: string) => {
    setOcrProcessing(emailId);
    setTimeout(() => {
      setOcrProcessing(null);
    }, 2500);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="hud-loading-box">
          <RefreshCw size={16} className="animate-spin-slow" />
          <span>Nacitam dorucenou postu...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="mb-2 flex flex-wrap gap-2">
            <span className="hud-chip" data-tone="cyan">
              E-MAIL
            </span>
            <span className="hud-chip" data-tone="slate">
              {emails.length} zprav
            </span>
            {unreadCount > 0 && (
              <span className="hud-chip" data-tone="red">
                {unreadCount} neprectenych
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
            Prichozi posta
          </h1>
          <p style={{ color: "#7A8A9E", maxWidth: 600, lineHeight: 1.6 }}>
            Centralizovany prehled vsech e-mailu s AI analytikou sentimentu a
            automatickou kategorizaci.
          </p>
        </div>
        <button className="hud-button self-start" onClick={fetchEmails}>
          <RefreshCw size={15} /> Obnovit
        </button>
      </div>

      {/* Filters */}
      <div className="hud-panel p-4">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <div className="mb-1" style={labelStyle}>
              Hledat
            </div>
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                className="hud-input pl-10"
                placeholder="Predmet, odesilatel..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="mb-1" style={labelStyle}>
              Kategorie
            </div>
            <select
              className="hud-input"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{ minWidth: 150 }}
            >
              <option value="all">Vsechny</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {categoryConfig[cat]?.label || cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Split layout: email list + preview */}
      <div className="grid gap-6 xl:grid-cols-12">
        {/* Email list */}
        <div
          className={`${selected ? "xl:col-span-5" : "xl:col-span-12"} transition-all`}
        >
          <div className="hud-panel p-4">
            <div className="space-y-1">
              {filtered.map((email) => {
                const isSelected = email.id === selectedId;
                const sentCfg = sentimentConfig[email.sentiment];
                const catCfg = categoryConfig[email.category];

                return (
                  <button
                    key={email.id}
                    onClick={() => handleSelect(email)}
                    className={`
                      w-full text-left transition-all duration-200
                      ${
                        isSelected
                          ? "hud-list-row hud-list-row-stacked border-cyan-500/40 bg-cyan-500/[0.06]"
                          : "hud-list-row hud-list-row-stacked hover:border-cyan-500/20"
                      }
                    `}
                    style={
                      isSelected
                        ? {
                            borderColor: "rgba(0,229,255,0.4)",
                            background: "rgba(0,229,255,0.06)",
                          }
                        : undefined
                    }
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        {/* Unread indicator */}
                        <div className="flex-shrink-0 mt-1.5">
                          {!email.read ? (
                            <div
                              className="w-2.5 h-2.5 rounded-full"
                              style={{
                                background: "#00E5FF",
                                boxShadow: "0 0 8px rgba(0,229,255,0.5)",
                              }}
                            />
                          ) : (
                            <div className="w-2.5 h-2.5" />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          {/* From name */}
                          <div
                            style={{
                              color: email.read ? "#B8C1C8" : "#FFFFFF",
                              fontWeight: email.read ? 400 : 600,
                              fontSize: "0.88rem",
                              marginBottom: 2,
                            }}
                            className="truncate"
                          >
                            {email.fromName}
                          </div>

                          {/* Subject */}
                          <div
                            style={{
                              color: email.read ? "#7A8A9E" : "#B8C1C8",
                              fontSize: "0.82rem",
                              fontWeight: email.read ? 400 : 500,
                              marginBottom: 4,
                            }}
                            className="truncate"
                          >
                            {email.subject}
                          </div>

                          {/* Preview */}
                          <div
                            style={{
                              color: "#58758C",
                              fontSize: "0.78rem",
                              lineHeight: 1.4,
                            }}
                            className="line-clamp-1"
                          >
                            {email.preview}
                          </div>

                          {/* Chips row */}
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {catCfg && (
                              <span
                                className="hud-chip"
                                data-tone={catCfg.tone}
                              >
                                {catCfg.label}
                              </span>
                            )}
                            {sentCfg && (
                              <span
                                className="hud-chip"
                                data-tone={sentCfg.tone}
                              >
                                {sentCfg.label}
                              </span>
                            )}
                            {email.hasAttachments && (
                              <span className="hud-chip" data-tone="slate">
                                <Paperclip
                                  size={10}
                                  style={{ display: "inline" }}
                                />{" "}
                                {email.attachmentCount}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Date + arrow */}
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <span className="hud-time-stamp">
                          {fmtDateTime.format(new Date(email.date))}
                        </span>
                        {isSelected && (
                          <ChevronRight size={14} className="text-cyan/50" />
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
              {filtered.length === 0 && (
                <div className="text-center py-12" style={{ color: "#7A8A9E" }}>
                  <Inbox
                    size={32}
                    className="mx-auto mb-3"
                    style={{ color: "rgba(0,229,255,0.2)" }}
                  />
                  <div>Zadne e-maily odpovidajici filtrum.</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preview panel */}
        {selected && (
          <div className="xl:col-span-7">
            <div className="hud-panel p-6 sticky top-24">
              {/* Preview header */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="min-w-0 flex-1">
                  <h2
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      color: "#FFFFFF",
                      fontSize: "1.15rem",
                      fontWeight: 600,
                      lineHeight: 1.3,
                      marginBottom: 8,
                    }}
                  >
                    {selected.subject}
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {categoryConfig[selected.category] && (
                      <span
                        className="hud-chip"
                        data-tone={categoryConfig[selected.category].tone}
                      >
                        {categoryConfig[selected.category].label}
                      </span>
                    )}
                    {sentimentConfig[selected.sentiment] && (
                      <span
                        className="hud-chip"
                        data-tone={sentimentConfig[selected.sentiment].tone}
                      >
                        {sentimentConfig[selected.sentiment].label}
                      </span>
                    )}
                    {selected.hasAttachments && (
                      <span className="hud-chip" data-tone="slate">
                        <Paperclip size={10} /> {selected.attachmentCount}{" "}
                        {selected.attachmentCount === 1
                          ? "priloha"
                          : selected.attachmentCount < 5
                            ? "prilohy"
                            : "priloh"}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedId(null)}
                  className="text-text-muted hover:text-white transition-colors p-1 flex-shrink-0"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Sender info */}
              <div className="hud-list-row hud-list-row-stacked mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(212,175,55,0.1))",
                      border: "2px solid rgba(0,229,255,0.2)",
                    }}
                  >
                    <Mail size={16} className="text-cyan" />
                  </div>
                  <div className="min-w-0">
                    <div
                      style={{
                        color: "#FFFFFF",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                      }}
                    >
                      {selected.fromName}
                    </div>
                    <div style={{ color: "#7A8A9E", fontSize: "0.78rem" }}>
                      {selected.from} &rarr; {selected.to}
                    </div>
                    <div className="hud-time-stamp mt-1">
                      {fmtDateFull.format(new Date(selected.date))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Email body */}
              <div
                className="mb-6"
                style={{
                  color: "#B8C1C8",
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  whiteSpace: "pre-wrap",
                  padding: "1rem",
                  background: "rgba(2,6,10,0.6)",
                  border: "1px solid rgba(0,229,255,0.08)",
                }}
              >
                {selected.body || selected.preview}
              </div>

              {/* AI Analysis badge */}
              <div
                className="hud-alert-card mb-4"
                data-tone="green"
                style={{
                  borderColor: "rgba(0,229,255,0.15)",
                  background: "rgba(0,229,255,0.04)",
                }}
              >
                <div className="flex items-start gap-3">
                  <Bot size={18} className="text-cyan flex-shrink-0 mt-0.5" />
                  <div>
                    <div
                      style={{
                        color: "#00E5FF",
                        fontWeight: 600,
                        fontSize: "0.82rem",
                        marginBottom: 4,
                      }}
                    >
                      AI Analyza
                    </div>
                    <div style={{ color: "#7A8A9E", fontSize: "0.82rem" }}>
                      Sentiment:{" "}
                      <span
                        style={{
                          color:
                            selected.sentiment === "positive"
                              ? "#00E5A0"
                              : selected.sentiment === "negative"
                                ? "#FF7B7B"
                                : "#B8C1C8",
                        }}
                      >
                        {sentimentConfig[selected.sentiment]?.label}
                      </span>{" "}
                      // Kategorie:{" "}
                      {categoryConfig[selected.category]?.label ||
                        selected.category}
                      {selected.companyId &&
                        ` // Klient: ${selected.companyId.replace("comp_", "").toUpperCase()}`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  className="hud-button"
                  onClick={() => handleAssign(selected.id)}
                  disabled={assigningId === selected.id}
                >
                  {assigningId === selected.id ? (
                    <>
                      <CheckCircle2 size={15} /> Prirazeno
                    </>
                  ) : (
                    <>
                      <UserPlus size={15} /> Priradit ke klientovi
                    </>
                  )}
                </button>

                {selected.hasAttachments && (
                  <button
                    className="hud-button-secondary"
                    onClick={() => handleOcr(selected.id)}
                    disabled={ocrProcessing === selected.id}
                  >
                    {ocrProcessing === selected.id ? (
                      <>
                        <RefreshCw size={15} className="animate-spin-slow" />{" "}
                        OCR zpracovani...
                      </>
                    ) : (
                      <>
                        <ScanLine size={15} /> Extrahovat prilohy &rarr; OCR
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
