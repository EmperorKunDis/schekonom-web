"use client";

import { MessageSquare, Mail, Phone, MessageCircle, Video } from "lucide-react";
import { useAuth } from "@/lib/auth/context";
import { getCompaniesForProfile, communicationLog } from "@/lib/erp/data";

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
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const channelIcons: Record<string, typeof Mail> = {
  email: Mail,
  phone: Phone,
  chat: MessageCircle,
  video: Video,
  sms: MessageSquare,
};

const sentimentTone: Record<string, string> = {
  positive: "green",
  neutral: "slate",
  negative: "red",
};

const sentimentLabel: Record<string, string> = {
  positive: "Pozitivní",
  neutral: "Neutrální",
  negative: "Negativní",
};

export default function KomunikacePage() {
  const { profile } = useAuth();
  if (!profile) return null;

  const companies = getCompaniesForProfile(profile);
  const companyIds = new Set(companies.map((c) => c.id));

  const logs = communicationLog
    .filter((c) => companyIds.has(c.companyId))
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="hud-chip" data-tone="cyan">
            KOMUNIKACE
          </span>
          <span className="hud-chip" data-tone="slate">
            {logs.length} záznamů
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
          Komunikační log
        </h1>
        <p style={{ color: "#7A8A9E", maxWidth: 600, lineHeight: 1.6 }}>
          Timeline e-mailů, hovorů a chatů s klienty včetně analýzy sentimentu.
        </p>
      </div>

      {/* Timeline */}
      <div className="hud-panel p-6">
        <div className="space-y-3">
          {logs.map((log) => {
            const ChannelIcon = channelIcons[log.channel] || MessageSquare;
            return (
              <div key={log.id} className="hud-list-row hud-list-row-stacked">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className="flex h-9 w-9 items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        background: "rgba(0,229,255,0.06)",
                        border: "1px solid rgba(0,229,255,0.15)",
                      }}
                    >
                      <ChannelIcon size={16} className="text-cyan" />
                    </div>
                    <div>
                      <div
                        style={{
                          color: "#FFFFFF",
                          fontWeight: 600,
                          fontSize: "0.9rem",
                          marginBottom: 2,
                        }}
                      >
                        {log.subject}
                      </div>
                      <div style={{ color: "#7A8A9E", fontSize: "0.78rem" }}>
                        {companies.find((c) => c.id === log.companyId)?.name} //{" "}
                        {log.channel} // {log.direction}
                      </div>
                      {(log.from || log.to) && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {[log.from, log.to].map((p) => (
                            <span
                              key={p}
                              className="hud-chip"
                              data-tone="slate"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      )}
                      {log.preview && (
                        <div
                          style={{
                            color: "#B8C1C8",
                            fontSize: "0.85rem",
                            lineHeight: 1.6,
                            marginTop: 8,
                          }}
                        >
                          {log.preview}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span className="hud-time-stamp">
                      {fmtDateTime.format(new Date(log.timestamp))}
                    </span>
                    {log.sentiment && (
                      <span
                        className="hud-chip"
                        data-tone={sentimentTone[log.sentiment] || "slate"}
                      >
                        {sentimentLabel[log.sentiment] || log.sentiment}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {logs.length === 0 && (
            <div className="text-center py-12" style={{ color: "#7A8A9E" }}>
              <MessageSquare
                size={32}
                className="mx-auto mb-3"
                style={{ color: "rgba(0,229,255,0.2)" }}
              />
              <div>Zatím žádná komunikace.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
