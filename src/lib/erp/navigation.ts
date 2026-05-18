import type { ErpRole } from "./types";

export interface NavItem {
  key: string;
  label: string;
  icon: string;
  href: string;
  badge?: number;
}

interface NavBadgeData {
  openTasks: number;
  risks: number;
  deadlines: number;
  missingDocs: number;
  messages: number;
}

const defaultBadges: NavBadgeData = {
  openTasks: 0,
  risks: 0,
  deadlines: 0,
  missingDocs: 0,
  messages: 0,
};

export function getNavForRole(
  role: ErpRole,
  data: Partial<NavBadgeData> = {},
): NavItem[] {
  const d = { ...defaultBadges, ...data };

  if (role === "owner") {
    return [
      {
        key: "dashboard",
        label: "Dashboard",
        icon: "LayoutDashboard",
        href: "/portal/dashboard",
      },
      {
        key: "klienti",
        label: "Klienti",
        icon: "Building2",
        href: "/portal/klienti",
        badge: d.openTasks || undefined,
      },
      {
        key: "zamestnanci",
        label: "Zaměstnanci",
        icon: "Users",
        href: "/portal/zamestnanci",
      },
      {
        key: "ucetnictvi",
        label: "Účetnictví",
        icon: "Calculator",
        href: "/portal/ucetnictvi",
      },
      { key: "mzdy", label: "Mzdy", icon: "Banknote", href: "/portal/mzdy" },
      {
        key: "dane-cz",
        label: "Daně CZ",
        icon: "Landmark",
        href: "/portal/dane-cz",
        badge: d.deadlines || undefined,
      },
      {
        key: "dane-de",
        label: "Daně DE",
        icon: "Globe",
        href: "/portal/dane-de",
      },
      {
        key: "dokumenty",
        label: "Dokumenty",
        icon: "FileStack",
        href: "/portal/dokumenty",
        badge: d.missingDocs || undefined,
      },
      {
        key: "komunikace",
        label: "Komunikace",
        icon: "MessageSquare",
        href: "/portal/komunikace",
        badge: d.messages || undefined,
      },
      {
        key: "email",
        label: "Příchozí pošta",
        icon: "Mail",
        href: "/portal/email",
      },
      {
        key: "automatizace",
        label: "Automatizace",
        icon: "Workflow",
        href: "/portal/automatizace",
      },
      {
        key: "rizika",
        label: "Rizika",
        icon: "ShieldAlert",
        href: "/portal/rizika",
        badge: d.risks || undefined,
      },
      {
        key: "terminy",
        label: "Termíny",
        icon: "CalendarClock",
        href: "/portal/terminy",
        badge: d.deadlines || undefined,
      },
      {
        key: "reporting",
        label: "Reporting",
        icon: "BarChart3",
        href: "/portal/reporting",
      },
      {
        key: "nastaveni",
        label: "Nastavení",
        icon: "Settings",
        href: "/portal/nastaveni",
      },
    ];
  }

  if (role === "employee") {
    return [
      {
        key: "dashboard",
        label: "Dashboard",
        icon: "LayoutDashboard",
        href: "/portal/dashboard",
      },
      {
        key: "klienti",
        label: "Moji klienti",
        icon: "Building2",
        href: "/portal/klienti",
        badge: d.openTasks || undefined,
      },
      {
        key: "ukoly",
        label: "Úkoly",
        icon: "ListTodo",
        href: "/portal/ukoly",
        badge: d.openTasks || undefined,
      },
      {
        key: "dokumenty",
        label: "Dokumenty",
        icon: "FileStack",
        href: "/portal/dokumenty",
        badge: d.missingDocs || undefined,
      },
      {
        key: "komunikace",
        label: "Komunikace",
        icon: "MessageSquare",
        href: "/portal/komunikace",
        badge: d.messages || undefined,
      },
      {
        key: "email",
        label: "Příchozí pošta",
        icon: "Mail",
        href: "/portal/email",
      },
      {
        key: "terminy",
        label: "Termíny",
        icon: "CalendarClock",
        href: "/portal/terminy",
        badge: d.deadlines || undefined,
      },
      {
        key: "rizika",
        label: "Rizika",
        icon: "ShieldAlert",
        href: "/portal/rizika",
        badge: d.risks || undefined,
      },
      {
        key: "dane-de",
        label: "Daně DE",
        icon: "Globe",
        href: "/portal/dane-de",
      },
      {
        key: "reporting",
        label: "Reporting",
        icon: "BarChart3",
        href: "/portal/reporting",
      },
    ];
  }

  // Client role
  return [
    {
      key: "prehled",
      label: "Přehled",
      icon: "LayoutDashboard",
      href: "/portal/prehled",
    },
    {
      key: "dokumenty",
      label: "Dokumenty",
      icon: "FileStack",
      href: "/portal/dokumenty",
      badge: d.missingDocs || undefined,
    },
    {
      key: "terminy",
      label: "Termíny",
      icon: "CalendarClock",
      href: "/portal/terminy",
      badge: d.deadlines || undefined,
    },
    {
      key: "finance",
      label: "Finance",
      icon: "Wallet",
      href: "/portal/finance",
    },
    {
      key: "komunikace",
      label: "Komunikace",
      icon: "MessageSquare",
      href: "/portal/komunikace",
      badge: d.messages || undefined,
    },
    {
      key: "doporuceni",
      label: "Doporučení",
      icon: "Lightbulb",
      href: "/portal/doporuceni",
    },
    {
      key: "nastaveni",
      label: "Nastavení",
      icon: "Settings",
      href: "/portal/nastaveni",
    },
  ];
}
