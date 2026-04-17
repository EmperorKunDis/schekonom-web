"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Activity,
  Banknote,
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  Building2,
  Calendar,
  ChevronRight,
  FileText,
  Files,
  Globe,
  LayoutDashboard,
  ListTodo,
  Home,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Search,
  Settings,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import Logo from "@/components/shared/Logo";
import VoiceWidget from "@/components/erp/VoiceWidget";
import AiChat from "@/components/erp/AiChat";
import CommandPalette from "@/components/portal/CommandPalette";
import LiveNotifications from "@/components/portal/LiveNotifications";
import { AuthProvider, useAuth } from "@/lib/auth/context";
import { PortalGuard } from "@/lib/auth/guard";
import { getNavForRole, type NavItem } from "@/lib/erp/navigation";
import type { LucideIcon } from "lucide-react";

const labelStyle = {
  fontFamily: "SF Mono, Monaco, Consolas, monospace",
  fontSize: "0.62rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "rgba(0,229,255,0.72)",
};

const iconMap: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  prehled: LayoutDashboard,
  klienti: Building2,
  zamestnanci: Users,
  ucetnictvi: BookOpen,
  mzdy: Banknote,
  "dane-cz": FileText,
  "dane-de": Globe,
  dokumenty: Files,
  komunikace: MessageSquare,
  email: Mail,
  automatizace: Bot,
  rizika: ShieldAlert,
  terminy: Calendar,
  reporting: BarChart3,
  nastaveni: Settings,
  ukoly: ListTodo,
  finance: TrendingUp,
  doporuceni: Sparkles,
};

const roleBadge: Record<string, { label: string; tone: string }> = {
  owner: { label: "OWNER", tone: "gold" },
  employee: { label: "EMPLOYEE", tone: "cyan" },
  client: { label: "CLIENT", tone: "green" },
};

function PortalShell({ children }: { children: React.ReactNode }) {
  const { profile, logout } = useAuth();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);

  const openCmd = useCallback(() => setCmdOpen(true), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!profile) {
    console.warn(
      "[PORTAL] ✗ No profile in PortalShell — guard should redirect",
    );
    return null;
  }

  const navItems: NavItem[] = getNavForRole(profile.role);
  const badge = roleBadge[profile.role] || roleBadge.client;

  console.log(
    `[PORTAL] Rendering: ${profile.name} (${profile.role}), ${navItems.length} nav items, path=${pathname}`,
  );

  const initials = `${profile.name.split(" ")[0]?.[0] || ""}${profile.surname?.[0]?.toUpperCase() || ""}`;

  return (
    <div className="min-h-screen bg-void flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 xl:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-[280px] flex flex-col
          border-r border-cyan-500/10
          transition-transform duration-300 ease-in-out
          xl:relative xl:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{
          background:
            "linear-gradient(180deg, rgba(2,6,10,0.98) 0%, rgba(3,8,13,0.96) 100%)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-cyan-500/8">
          <Link href="/portal" onClick={() => setSidebarOpen(false)}>
            <Logo size={36} showText={true} />
          </Link>
          <button
            className="xl:hidden text-text-muted hover:text-white transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Profile section */}
        <div className="px-5 py-4 border-b border-cyan-500/8">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(212,175,55,0.1))",
                border: "2px solid rgba(0,229,255,0.2)",
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "#00E5FF",
              }}
            >
              {initials}
            </div>
            <div className="min-w-0">
              <div
                style={{
                  color: "#FFFFFF",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                }}
                className="truncate"
              >
                {profile.name.split(" ")[0]} {profile.surname}
              </div>
              <div className="mt-1">
                <span className="hud-chip" data-tone={badge.tone}>
                  {badge.label}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const route = `/portal/${item.key}`;
            const isActive =
              pathname === route || pathname.startsWith(`${route}/`);
            const Icon = iconMap[item.key] || LayoutDashboard;

            return (
              <Link
                key={item.key}
                href={route}
                onClick={() => setSidebarOpen(false)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 text-[0.88rem] transition-all duration-200
                  ${
                    isActive
                      ? "text-white bg-cyan-500/10 border-l-2 border-cyan-500/60"
                      : "text-text-secondary hover:text-white hover:bg-white/[0.03] border-l-2 border-transparent"
                  }
                `}
              >
                <Icon
                  size={17}
                  className={isActive ? "text-cyan" : "text-text-muted"}
                />
                <span className="flex-1">{item.label}</span>
                {isActive && (
                  <ChevronRight size={14} className="text-cyan/50" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* System status */}
        <div className="px-5 py-4 border-t border-cyan-500/8">
          <div className="flex items-center gap-2 mb-3" style={labelStyle}>
            <Activity size={13} color="#00E5FF" />
            SYSTEM STATUS
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between px-2 py-1.5">
              <span style={{ color: "#7A8A9E", fontSize: "0.82rem" }}>
                Sync
              </span>
              <span className="hud-chip" data-tone="green">
                Live
              </span>
            </div>
            <div className="flex items-center justify-between px-2 py-1.5">
              <span style={{ color: "#7A8A9E", fontSize: "0.82rem" }}>
                Role
              </span>
              <span className="hud-chip" data-tone={badge.tone}>
                {profile.role}
              </span>
            </div>
          </div>
        </div>

        {/* Back to main site */}
        <Link
          href="/"
          className="mt-4 flex items-center gap-2 px-3 py-2 text-text-muted hover:text-white transition-colors"
          style={{ fontSize: "0.78rem" }}
        >
          <Home size={14} />
          <span>Zpět na web</span>
        </Link>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header
          className="sticky top-0 z-30 flex items-center justify-between gap-4 px-4 py-3 xl:px-6"
          style={{
            background: "rgba(2,6,10,0.85)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            borderBottom: "1px solid rgba(0,229,255,0.08)",
          }}
        >
          <div className="flex items-center gap-3">
            <button
              className="xl:hidden text-text-muted hover:text-white transition-colors p-1"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>
            <span className="hud-chip" data-tone={badge.tone}>
              {profile.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openCmd}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 text-text-muted hover:text-white transition-colors"
              style={{
                border: "1px solid rgba(0,229,255,0.1)",
                background: "rgba(0,229,255,0.03)",
                fontSize: "0.78rem",
              }}
              title="Hledat (⌘K)"
            >
              <Search size={14} />
              <span>Hledat</span>
              <span
                style={{
                  fontFamily: "SF Mono, Monaco, Consolas, monospace",
                  fontSize: "0.6rem",
                  color: "rgba(0,229,255,0.4)",
                  letterSpacing: "0.05em",
                  marginLeft: 4,
                }}
              >
                ⌘K
              </span>
            </button>

            <button
              className="relative p-2 text-text-muted hover:text-white transition-colors"
              title="Notifikace"
            >
              <Bell size={19} />
              <span
                className="absolute top-1 right-1 w-2 h-2 rounded-full bg-status-red"
                style={{ boxShadow: "0 0 6px rgba(255,123,123,0.5)" }}
              />
            </button>

            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-cyan-500/8 bg-white/[0.02]">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full flex-shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,229,255,0.12), rgba(212,175,55,0.08))",
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  color: "#00E5FF",
                }}
              >
                {initials}
              </div>
              <span style={{ color: "#B8C1C8", fontSize: "0.82rem" }}>
                {profile.name.split(" ")[0]} {profile.surname}
              </span>
            </div>

            <Link
              href="/prihlaseni"
              className="hud-button-secondary flex items-center gap-2"
              onClick={logout}
            >
              <LogOut size={15} />
              <span className="hidden md:inline">Odhlásit</span>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 xl:p-6 overflow-auto">{children}</main>
      </div>

      {/* Voice AI widget — outbound calls for owner/employee */}
      {(profile.role === "owner" || profile.role === "employee") && (
        <VoiceWidget />
      )}

      {/* AI Chat assistant — owner/employee only */}
      <AiChat />

      {/* Live notifications */}
      <LiveNotifications />

      {/* Global command palette (⌘K) */}
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </div>
  );
}

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <PortalGuard>
        <PortalShell>{children}</PortalShell>
      </PortalGuard>
    </AuthProvider>
  );
}
