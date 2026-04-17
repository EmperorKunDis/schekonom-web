"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Search,
  Building2,
  ArrowRight,
  X,
  LayoutDashboard,
  Files,
  TrendingUp,
  Calendar,
  ShieldAlert,
  BookOpen,
  Users,
  MessageSquare,
  Bot,
  FileText,
  Globe,
  BarChart3,
  Settings,
  CheckSquare,
  ListTodo,
  Sparkles,
  Mail,
} from "lucide-react";
import { companies } from "@/lib/erp/data";
import { useRouter } from "next/navigation";

const monoStyle = {
  fontFamily: "SF Mono, Monaco, Consolas, monospace",
  fontSize: "0.6rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
};

interface SearchItem {
  type: "page" | "company";
  label: string;
  sub?: string;
  href: string;
  Icon: React.ElementType;
}

const pageItems: SearchItem[] = [
  {
    type: "page",
    label: "Dashboard",
    href: "/portal/dashboard",
    Icon: LayoutDashboard,
  },
  {
    type: "page",
    label: "Přehled",
    href: "/portal/prehled",
    Icon: LayoutDashboard,
  },
  { type: "page", label: "Klienti", href: "/portal/klienti", Icon: Building2 },
  { type: "page", label: "Dokumenty", href: "/portal/dokumenty", Icon: Files },
  { type: "page", label: "Finance", href: "/portal/finance", Icon: TrendingUp },
  { type: "page", label: "Termíny", href: "/portal/terminy", Icon: Calendar },
  { type: "page", label: "Rizika", href: "/portal/rizika", Icon: ShieldAlert },
  {
    type: "page",
    label: "Účetnictví",
    href: "/portal/ucetnictvi",
    Icon: BookOpen,
  },
  {
    type: "page",
    label: "Schválení",
    href: "/portal/schvaleni",
    Icon: CheckSquare,
  },
  {
    type: "page",
    label: "Zaměstnanci",
    href: "/portal/zamestnanci",
    Icon: Users,
  },
  {
    type: "page",
    label: "Komunikace",
    href: "/portal/komunikace",
    Icon: MessageSquare,
  },
  { type: "page", label: "Email", href: "/portal/email", Icon: Mail },
  {
    type: "page",
    label: "Automatizace",
    href: "/portal/automatizace",
    Icon: Bot,
  },
  { type: "page", label: "Daně CZ", href: "/portal/dane-cz", Icon: FileText },
  { type: "page", label: "Daně DE", href: "/portal/dane-de", Icon: Globe },
  {
    type: "page",
    label: "Reporting",
    href: "/portal/reporting",
    Icon: BarChart3,
  },
  { type: "page", label: "Úkoly", href: "/portal/ukoly", Icon: ListTodo },
  {
    type: "page",
    label: "Doporučení",
    href: "/portal/doporuceni",
    Icon: Sparkles,
  },
  {
    type: "page",
    label: "Nastavení",
    href: "/portal/nastaveni",
    Icon: Settings,
  },
];

const companyItems: SearchItem[] = companies.map((c) => ({
  type: "company" as const,
  label: c.name,
  sub: `IČO ${c.ico} · ${c.city} · ${c.sector}`,
  href: `/portal/klienti/${c.id}`,
  Icon: Building2,
}));

const allItems: SearchItem[] = [...pageItems, ...companyItems];

export default function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  const filtered =
    query.length > 0
      ? allItems
          .filter(
            (item) =>
              item.label.toLowerCase().includes(query.toLowerCase()) ||
              item.sub?.toLowerCase().includes(query.toLowerCase()),
          )
          .slice(0, 8)
      : pageItems.slice(0, 8);

  const go = useCallback(
    (href: string) => {
      router.push(href);
      onClose();
    },
    [router, onClose],
  );

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown")
        setActiveIdx((i) => Math.min(i + 1, filtered.length - 1));
      if (e.key === "ArrowUp") setActiveIdx((i) => Math.max(i - 1, 0));
      if (e.key === "Enter" && filtered[activeIdx])
        go(filtered[activeIdx].href);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, activeIdx, go, onClose]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-24 px-4"
      style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,28,48,0.99) 0%, rgba(3,8,13,0.99) 100%)",
          border: "1px solid rgba(0,229,255,0.22)",
          boxShadow:
            "0 32px 80px rgba(0,0,0,0.85), 0 0 50px rgba(0,229,255,0.06)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div
          className="flex items-center gap-3 px-4 py-3.5"
          style={{ borderBottom: "1px solid rgba(0,229,255,0.12)" }}
        >
          <Search
            size={18}
            style={{ color: "rgba(0,229,255,0.65)", flexShrink: 0 }}
          />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Hledat stránky, klienty, moduly..."
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#FFFFFF",
              fontSize: "0.92rem",
              flex: 1,
            }}
          />
          <button
            onClick={onClose}
            style={{ color: "rgba(255,255,255,0.25)", flexShrink: 0 }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Label */}
        <div
          className="px-4 py-1.5"
          style={{
            ...monoStyle,
            color: "rgba(0,229,255,0.35)",
            borderBottom: "1px solid rgba(0,229,255,0.06)",
          }}
        >
          {query.length > 0 ? `${filtered.length} výsledků` : "RYCHLÁ NAVIGACE"}
        </div>

        {/* Results */}
        <div className="overflow-y-auto" style={{ maxHeight: 340 }}>
          {filtered.length === 0 ? (
            <div
              className="px-4 py-8 text-center"
              style={{ color: "#7A8A9E", fontSize: "0.85rem" }}
            >
              Žádné výsledky pro &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((item, i) => {
              const Icon = item.Icon;
              return (
                <button
                  key={`${item.type}-${item.href}-${i}`}
                  onMouseEnter={() => setActiveIdx(i)}
                  onClick={() => go(item.href)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                  style={{
                    background:
                      activeIdx === i ? "rgba(0,229,255,0.07)" : "transparent",
                    borderLeft:
                      activeIdx === i
                        ? "2px solid rgba(0,229,255,0.5)"
                        : "2px solid transparent",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(0,229,255,0.07)",
                      border: "1px solid rgba(0,229,255,0.14)",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={14} style={{ color: "#00E5FF" }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div
                      style={{
                        color: "#FFFFFF",
                        fontSize: "0.88rem",
                        fontWeight: 500,
                      }}
                    >
                      {item.label}
                    </div>
                    {item.sub && (
                      <div
                        style={{
                          color: "#7A8A9E",
                          fontSize: "0.72rem",
                          marginTop: 1,
                        }}
                        className="truncate"
                      >
                        {item.sub}
                      </div>
                    )}
                  </div>
                  <span
                    style={{
                      ...monoStyle,
                      color: "rgba(0,229,255,0.35)",
                      flexShrink: 0,
                    }}
                  >
                    {item.type === "company" ? "KLIENT" : "STRÁNKA"}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div
          className="px-4 py-2 flex items-center gap-5"
          style={{
            ...monoStyle,
            color: "rgba(0,229,255,0.3)",
            borderTop: "1px solid rgba(0,229,255,0.08)",
          }}
        >
          <span>↑↓ NAVIGACE</span>
          <span>↵ OTEVŘÍT</span>
          <span>ESC ZAVŘÍT</span>
          <span className="ml-auto">CMD+K</span>
        </div>
      </div>
    </div>
  );
}
