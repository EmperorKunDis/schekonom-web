"use client";

import { useState, useEffect } from "react";
import {
  X,
  AlertTriangle,
  FileText,
  Banknote,
  Calendar,
  CheckCircle2,
} from "lucide-react";

interface LiveNotif {
  id: number;
  type: "warning" | "alert" | "info" | "success";
  title: string;
  body: string;
  icon: "alert" | "file" | "money" | "calendar" | "check";
}

const queue: Omit<LiveNotif, "id">[] = [
  {
    type: "warning",
    title: "Nová faktura přijata",
    body: "BauTeam Nord GmbH — 48 000 Kč (DPH 19%)",
    icon: "money",
  },
  {
    type: "alert",
    title: "Termín DPH za 3 dny",
    body: "Restaurace U Mostu — DPH přiznání do 20.04.2026",
    icon: "calendar",
  },
  {
    type: "info",
    title: "Dokument nahrán klientem",
    body: "MontServis Švanda — Lohnsteuerbescheinigung 2025",
    icon: "file",
  },
  {
    type: "success",
    title: "Platba přijata",
    body: "Kovo Dílna Cheb — faktura FV2026003 uhrazena",
    icon: "check",
  },
];

const toneMap = {
  warning: {
    border: "rgba(212,175,55,0.35)",
    bg: "rgba(212,175,55,0.08)",
    color: "#D4AF37",
  },
  alert: {
    border: "rgba(255,123,123,0.35)",
    bg: "rgba(255,123,123,0.07)",
    color: "#FF7B7B",
  },
  info: {
    border: "rgba(0,229,255,0.28)",
    bg: "rgba(0,229,255,0.07)",
    color: "#00E5FF",
  },
  success: {
    border: "rgba(0,229,160,0.35)",
    bg: "rgba(0,229,160,0.07)",
    color: "#00E5A0",
  },
};

function NotifIcon({
  icon,
  color,
}: {
  icon: LiveNotif["icon"];
  color: string;
}) {
  const props = { size: 13, style: { color } };
  if (icon === "calendar") return <Calendar {...props} />;
  if (icon === "file") return <FileText {...props} />;
  if (icon === "money") return <Banknote {...props} />;
  if (icon === "check") return <CheckCircle2 {...props} />;
  return <AlertTriangle {...props} />;
}

export default function LiveNotifications() {
  const [notifs, setNotifs] = useState<LiveNotif[]>([]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    queue.forEach((n, i) => {
      // First one after ~20s, then every ~22s with slight jitter
      const delay = 20000 + i * 22000 + Math.random() * 4000;
      const t = setTimeout(() => {
        const id = Date.now() + i;
        setNotifs((prev) => [...prev, { ...n, id }]);
        const dismiss = setTimeout(
          () => setNotifs((prev) => prev.filter((x) => x.id !== id)),
          9000,
        );
        timers.push(dismiss);
      }, delay);
      timers.push(t);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  const dismiss = (id: number) =>
    setNotifs((prev) => prev.filter((x) => x.id !== id));

  if (notifs.length === 0) return null;

  return (
    <div
      className="fixed bottom-28 right-6 z-40 flex flex-col gap-2"
      style={{ maxWidth: 300 }}
    >
      {notifs.map((n) => {
        const tone = toneMap[n.type];
        return (
          <div
            key={n.id}
            style={{
              background:
                "linear-gradient(135deg, rgba(5,18,32,0.98), rgba(3,8,13,0.98))",
              border: `1px solid ${tone.border}`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.55), 0 0 20px ${tone.bg}`,
              backdropFilter: "blur(16px)",
              animation: "slideInRight 0.3s ease-out",
            }}
            className="p-3"
          >
            <div className="flex items-start gap-2.5">
              <div
                style={{
                  width: 28,
                  height: 28,
                  background: tone.bg,
                  border: `1px solid ${tone.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <NotifIcon icon={n.icon} color={tone.color} />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  style={{
                    color: tone.color,
                    fontSize: "0.76rem",
                    fontWeight: 600,
                    marginBottom: 2,
                  }}
                >
                  {n.title}
                </div>
                <div
                  style={{
                    color: "#B8C1C8",
                    fontSize: "0.7rem",
                    lineHeight: 1.45,
                  }}
                >
                  {n.body}
                </div>
              </div>
              <button
                onClick={() => dismiss(n.id)}
                style={{ color: "rgba(255,255,255,0.25)", flexShrink: 0 }}
              >
                <X size={13} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
