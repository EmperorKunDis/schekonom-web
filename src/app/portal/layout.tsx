"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Activity, Building2, ChevronRight, LogOut, User } from "lucide-react";
import Logo from "@/components/shared/Logo";
import KpiCard from "@/components/portal/KpiCard";
import { useAuth } from "@/lib/auth/context";
import { PortalGuard } from "@/lib/auth/guard";
import type { DemoNavKey } from "@/lib/demo/types";

const labelStyle = {
  fontFamily: "SF Mono, Monaco, Consolas, monospace",
  fontSize: "0.62rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "rgba(0,229,255,0.72)",
};

const navKeyToRoute: Record<DemoNavKey, string> = {
  overview: "/portal/prehled",
  clients: "/portal/klienti",
  tasks: "/portal/ukoly",
  documents: "/portal/dokumenty",
  automation: "/portal/automatizace",
  risks: "/portal/rizika",
  deadlines: "/portal/terminy",
  recommendations: "/portal/doporuceni",
  security: "/portal/schvaleni",
};

function StatusLine({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-sm border border-cyan-500/10 bg-white/[0.02] px-3 py-2">
      <span style={{ color: "#7A8A9E" }}>{label}</span>
      <span className="hud-chip" data-tone={tone}>
        {value}
      </span>
    </div>
  );
}

function PortalShell({ children }: { children: React.ReactNode }) {
  const { session, logout } = useAuth();
  const pathname = usePathname();

  if (!session) return null;

  const workspace = session.workspace;

  const summaryBadges = [
    `${workspace.clients.length} klientů`,
    `${workspace.tasks.length} otevřených úkolů`,
    `${workspace.alerts.length} rizik`,
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top right, rgba(0,229,255,0.08), transparent 25%), linear-gradient(180deg, #02060A 0%, #03080D 45%, #081420 100%)",
      }}
    >
      {/* Top header bar */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          background: "rgba(2, 6, 10, 0.82)",
          borderBottom: "1px solid rgba(0,229,255,0.08)",
        }}
      >
        <div
          className="mx-auto flex flex-col gap-4 px-6 py-4 xl:flex-row xl:items-center xl:justify-between"
          style={{ maxWidth: 1480 }}
        >
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/portal/prehled">
              <Logo size={40} showText={true} />
            </Link>
            <span className="hud-chip" data-tone="cyan">
              CONTROL CENTER
            </span>
            <span
              className="hud-chip"
              data-tone={workspace.profile.role === "client" ? "gold" : "green"}
            >
              {workspace.profile.title}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {summaryBadges.map((badge) => (
              <span key={badge} className="hud-chip" data-tone="slate">
                {badge}
              </span>
            ))}
            <Link
              href="/prihlaseni"
              className="hud-button-secondary"
              onClick={logout}
            >
              Změnit profil
              <LogOut size={15} />
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full px-6 py-6" style={{ maxWidth: 1480 }}>
        <div className="grid gap-6 xl:grid-cols-12">
          {/* Sidebar */}
          <aside className="xl:col-span-3">
            <div className="hud-panel sticky top-28 p-5">
              {/* Profile info */}
              <div className="mb-5 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center"
                  style={{
                    border: "1px solid rgba(0,229,255,0.18)",
                    background: "rgba(0,229,255,0.06)",
                  }}
                >
                  <User size={18} color="#00E5FF" />
                </div>
                <div>
                  <div style={labelStyle}>ACTIVE PROFILE</div>
                  <div
                    style={{
                      color: "#FFFFFF",
                      fontSize: "1rem",
                      fontWeight: 600,
                    }}
                  >
                    {workspace.profile.surname}
                  </div>
                  <div style={{ color: "#7A8A9E", fontSize: "0.82rem" }}>
                    {workspace.profile.title}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="mb-5 space-y-2">
                {workspace.nav.map((navItem) => {
                  const route = navKeyToRoute[navItem.key];
                  const isActive = pathname === route;
                  return (
                    <Link
                      key={navItem.key}
                      href={route}
                      className={`hud-nav-button ${isActive ? "hud-nav-button-active" : ""}`}
                    >
                      <span>{navItem.label}</span>
                      <ChevronRight size={16} />
                    </Link>
                  );
                })}
              </div>

              {/* System status */}
              <div className="border-t border-cyan-500/10 pt-5">
                <div
                  className="mb-3 flex items-center gap-2"
                  style={labelStyle}
                >
                  <Activity size={13} color="#00E5FF" />
                  System status
                </div>
                <div className="space-y-2">
                  <StatusLine label="Sync" value="Live" tone="green" />
                  <StatusLine
                    label="Rizika"
                    value={`${workspace.alerts.length}`}
                    tone="red"
                  />
                  <StatusLine
                    label="Termíny"
                    value={`${workspace.deadlines.length}`}
                    tone="gold"
                  />
                </div>
              </div>

              {/* Mini client list */}
              <div className="mt-5 border-t border-cyan-500/10 pt-5">
                <div
                  className="mb-3 flex items-center gap-2"
                  style={labelStyle}
                >
                  <Building2 size={13} color="#00E5FF" />
                  Viditelní klienti
                </div>
                <div className="space-y-2">
                  {workspace.clients.map((client) => {
                    const clientRoute = `/portal/klienti/${client.id}`;
                    const isClientActive = pathname === clientRoute;
                    return (
                      <Link
                        key={client.id}
                        href={clientRoute}
                        className={`hud-mini-client ${isClientActive ? "hud-mini-client-active" : ""}`}
                      >
                        <span>{client.name}</span>
                        <span>{client.nextDeadline}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="space-y-6 xl:col-span-9">
            {/* KPI header panel */}
            <div className="hud-panel p-6 md:p-7">
              <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                <div>
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="hud-chip" data-tone="cyan">
                      {workspace.profile.role === "client"
                        ? "CLIENT VIEW"
                        : "EMPLOYEE VIEW"}
                    </span>
                  </div>
                  <h1
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      color: "#FFFFFF",
                      fontSize: "clamp(2rem, 3vw, 3.2rem)",
                      lineHeight: 1.06,
                      marginBottom: 10,
                    }}
                  >
                    {workspace.headline}
                  </h1>
                  <p
                    style={{
                      color: "#B8C1C8",
                      maxWidth: 900,
                      lineHeight: 1.74,
                    }}
                  >
                    {workspace.helperText}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="hud-chip" data-tone="green">
                    24/7 orchestrace
                  </span>
                  <span className="hud-chip" data-tone="cyan">
                    Role-based data
                  </span>
                  <span className="hud-chip" data-tone="gold">
                    Human approval gates
                  </span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {workspace.kpis.map((kpi) => (
                  <KpiCard key={kpi.label} kpi={kpi} />
                ))}
              </div>
            </div>

            {/* Page content */}
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortalGuard>
      <PortalShell>{children}</PortalShell>
    </PortalGuard>
  );
}
