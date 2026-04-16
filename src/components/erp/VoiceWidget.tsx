"use client";

import { useState, useCallback } from "react";
import { Phone, PhoneOff, X, Bot, AlertTriangle } from "lucide-react";
import { useAuth } from "@/lib/auth/context";
import { documents, deadlines, companies } from "@/lib/erp/data";
import { buildCallScript, type CallScriptData } from "@/lib/call-script";

type CallState = "idle" | "initiating" | "ringing" | "error";

// Keep old signature for compatibility but now delegate to call-script
function buildCallContext(companyIds: string[]): {
  clientName: string;
  context: string;
  clientPhone: string;
} {
  const company = companies.find((c) => companyIds.includes(c.id));
  const companyName = company?.name || "klienta";

  const missingDocs = documents.filter(
    (d) => companyIds.includes(d.companyId) && d.status === "missing",
  );

  const urgentDeadlines = deadlines.filter(
    (d) =>
      companyIds.includes(d.companyId) &&
      (d.status === "overdue" || d.status === "due-soon"),
  );

  const missingList =
    missingDocs.length > 0
      ? missingDocs
          .slice(0, 3)
          .map((d) => d.title)
          .join(", ")
      : "účetní podklady";

  const deadlineInfo =
    urgentDeadlines.length > 0 ? urgentDeadlines[0].title : "daňové přiznání";

  const deadlineDate =
    urgentDeadlines.length > 0
      ? new Intl.DateTimeFormat("cs-CZ", {
          day: "numeric",
          month: "long",
        }).format(new Date(urgentDeadlines[0].dueDate))
      : "konec měsíce";

  // In real scenario, client phone would come from company contact data
  // For showcase, we use the client profile phone from env
  const clientPhone =
    process.env.NEXT_PUBLIC_CLIENT_CALL_PHONE || "+420733296961";

  return {
    clientName: companyName,
    clientPhone,
    context: `Volám z účetní kanceláře SCH-EKONOM ohledně firmy ${companyName}. Potřebujeme dodat: ${missingList}. Termín pro ${deadlineInfo} je ${deadlineDate}. Prosím klienta, aby dokumenty nahrál do klientského portálu.`,
  };
}

export default function VoiceWidget() {
  const { profile } = useAuth();
  const [open, setOpen] = useState(false);
  const [callState, setCallState] = useState<CallState>("idle");
  const [callResult, setCallResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(
    null,
  );

  // Only show for owner/employee
  if (!profile || profile.role === "client") return null;

  const visibleCompanies = companies.filter(
    (c) =>
      profile.visibleCompanyIds.includes("*") ||
      profile.visibleCompanyIds.includes(c.id),
  );

  const initiateCall = useCallback(async (companyId: string) => {
    setCallState("initiating");
    setError(null);
    setCallResult(null);

    if (!profile) return;
    const script = buildCallScript(profile.name, companyId);

    // Use phone from env or fallback
    const clientPhone =
      process.env.NEXT_PUBLIC_CLIENT_CALL_PHONE ||
      script.clientPhone ||
      "+420733296961";

    console.log(
      `[VOICE] Initiating call to ${script.greeting} (${script.companyName})`,
    );
    console.log(
      `[VOICE] First message: ${script.firstMessage.slice(0, 80)}...`,
    );

    try {
      const res = await fetch("/api/voice/call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientPhone,
          prompt: script.prompt,
          firstMessage: script.firstMessage,
          greeting: script.greeting,
          companyName: script.companyName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Hovor se nepodařilo zahájit.");
      }

      console.log(`[VOICE] ✓ Call initiated: ${data.conversationId || "OK"}`);
      setCallState("ringing");
      setCallResult(
        `AI agent volá ${script.greeting} ohledně ${script.companyName}.\n\nÚvodní zpráva: "${script.firstMessage}"`,
      );

      // Reset after 15 seconds
      setTimeout(() => {
        setCallState("idle");
      }, 15000);
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Nepodařilo se zahájit hovor.";
      console.error(`[VOICE] ✗ Error: ${msg}`);
      setError(msg);
      setCallState("error");
    }
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50" style={{ maxWidth: 380 }}>
      {/* Expanded panel */}
      {open && (
        <div
          className="mb-3 flex flex-col overflow-hidden"
          style={{
            width: 380,
            maxHeight: 520,
            background:
              "linear-gradient(180deg, rgba(10,34,54,0.97) 0%, rgba(3,8,13,0.99) 100%)",
            border: "1px solid rgba(0,229,255,0.18)",
            boxShadow:
              "0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(0,229,255,0.06)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: "1px solid rgba(0,229,255,0.12)" }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 items-center justify-center"
                style={{
                  background: "rgba(0,229,255,0.1)",
                  border: "1px solid rgba(0,229,255,0.25)",
                }}
              >
                <Bot size={15} style={{ color: "#00E5FF" }} />
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
                  AI Hovor s klientem
                </div>
                <div
                  style={{
                    fontFamily: "SF Mono, Monaco, Consolas, monospace",
                    fontSize: "0.55rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(0,229,255,0.7)",
                  }}
                >
                  ELEVENLABS AGENT // OUTBOUND CALL
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

          {/* Content */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            style={{ maxHeight: 380 }}
          >
            {callState === "idle" && (
              <>
                <div
                  style={{
                    color: "#B8C1C8",
                    fontSize: "0.85rem",
                    lineHeight: 1.6,
                    marginBottom: 12,
                  }}
                >
                  AI agent zavolá klientovi a zeptá se na chybějící dokumenty.
                  Vyberte firmu:
                </div>

                {visibleCompanies.map((company) => {
                  const missing = documents.filter(
                    (d) => d.companyId === company.id && d.status === "missing",
                  ).length;
                  const urgent = deadlines.filter(
                    (d) =>
                      d.companyId === company.id &&
                      (d.status === "overdue" || d.status === "due-soon"),
                  ).length;

                  return (
                    <button
                      key={company.id}
                      onClick={() => {
                        setSelectedCompanyId(company.id);
                        initiateCall(company.id);
                      }}
                      className="w-full text-left p-3 transition-all duration-200"
                      style={{
                        border: "1px solid rgba(0,229,255,0.1)",
                        background:
                          selectedCompanyId === company.id
                            ? "rgba(0,229,255,0.08)"
                            : "rgba(255,255,255,0.02)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(0,229,255,0.25)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(0,229,255,0.1)";
                      }}
                    >
                      <div
                        style={{
                          color: "#FFFFFF",
                          fontWeight: 600,
                          fontSize: "0.88rem",
                        }}
                      >
                        {company.name}
                      </div>
                      <div className="flex gap-2 mt-1.5">
                        {missing > 0 && (
                          <span className="hud-chip" data-tone="red">
                            {missing} chybí
                          </span>
                        )}
                        {urgent > 0 && (
                          <span className="hud-chip" data-tone="gold">
                            {urgent} urgentní
                          </span>
                        )}
                        {missing === 0 && urgent === 0 && (
                          <span className="hud-chip" data-tone="green">
                            vše OK
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </>
            )}

            {callState === "initiating" && (
              <div className="text-center py-8">
                <div
                  className="flex items-end justify-center gap-1.5 mb-5"
                  style={{ height: 40 }}
                >
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: 4,
                        background: "rgba(230,198,92,0.6)",
                        borderRadius: 2,
                        animation: `voice-bar 1.2s ease-in-out ${i * 0.12}s infinite`,
                      }}
                    />
                  ))}
                </div>
                <div
                  style={{
                    color: "#E6C65C",
                    fontSize: "0.88rem",
                    fontWeight: 500,
                  }}
                >
                  Připravuji hovor...
                </div>
                <div
                  style={{
                    color: "#7A8A9E",
                    fontSize: "0.72rem",
                    marginTop: 6,
                  }}
                >
                  ElevenLabs agent se připojuje
                </div>
              </div>
            )}

            {callState === "ringing" && callResult && (
              <div className="text-center py-6">
                <div
                  className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full"
                  style={{
                    background: "rgba(0,229,160,0.1)",
                    border: "2px solid rgba(0,229,160,0.3)",
                    animation: "pulse-dot 2s ease-in-out infinite",
                  }}
                >
                  <Phone size={24} style={{ color: "#00E5A0" }} />
                </div>
                <div
                  style={{
                    color: "#00E5A0",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    marginBottom: 8,
                  }}
                >
                  Hovor zahájen
                </div>
                <div
                  style={{
                    color: "#B8C1C8",
                    fontSize: "0.82rem",
                    lineHeight: 1.6,
                  }}
                >
                  {callResult}
                </div>
                <div
                  style={{
                    color: "#7A8A9E",
                    fontSize: "0.72rem",
                    marginTop: 12,
                  }}
                >
                  Přepis bude dostupný po ukončení hovoru.
                </div>
              </div>
            )}

            {callState === "error" && error && (
              <div className="py-6">
                <div
                  className="flex items-start gap-3 p-4"
                  style={{
                    border: "1px solid rgba(255,123,123,0.2)",
                    background: "rgba(255,123,123,0.05)",
                  }}
                >
                  <AlertTriangle
                    size={18}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: "#FF7B7B" }}
                  />
                  <div>
                    <div
                      style={{
                        color: "#FF7B7B",
                        fontWeight: 600,
                        fontSize: "0.88rem",
                        marginBottom: 4,
                      }}
                    >
                      Chyba při volání
                    </div>
                    <div
                      style={{
                        color: "#B8C1C8",
                        fontSize: "0.8rem",
                        lineHeight: 1.5,
                      }}
                    >
                      {error}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setCallState("idle");
                    setError(null);
                  }}
                  className="mt-4 w-full hud-button-secondary py-2"
                >
                  Zkusit znovu
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FAB button */}
      <button
        onClick={() => setOpen(!open)}
        className="ml-auto flex items-center justify-center transition-all duration-300"
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: open
            ? "rgba(255,123,123,0.12)"
            : callState === "ringing"
              ? "rgba(0,229,160,0.15)"
              : "rgba(0,229,255,0.1)",
          border: `2px solid ${open ? "rgba(255,123,123,0.35)" : callState === "ringing" ? "rgba(0,229,160,0.4)" : "rgba(0,229,255,0.3)"}`,
          boxShadow:
            callState === "ringing"
              ? "0 4px 32px rgba(0,229,160,0.25)"
              : "0 4px 32px rgba(0,229,255,0.15), 0 0 60px rgba(0,229,255,0.06)",
          animation:
            !open && callState === "idle"
              ? "voice-pulse 3s ease-in-out infinite"
              : callState === "ringing"
                ? "pulse-dot 2s ease-in-out infinite"
                : "none",
          float: "right",
        }}
      >
        {open ? (
          <X size={22} style={{ color: "#FF7B7B" }} />
        ) : callState === "ringing" ? (
          <PhoneOff size={22} style={{ color: "#00E5A0" }} />
        ) : (
          <Phone size={22} style={{ color: "#00E5FF" }} />
        )}
      </button>
    </div>
  );
}
