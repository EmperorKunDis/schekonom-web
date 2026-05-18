"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";
import { useState } from "react";
import { Mail, Phone as PhoneIcon, Smartphone, Award } from "lucide-react";
import { assetPath } from "@/lib/paths";
import {
  departments,
  teamMembers,
  getInitials,
  getPrimaryPhone,
  type TeamMember,
  type Department,
  type DepartmentId,
} from "@/lib/team-data";

function toneColors(tone: string) {
  switch (tone) {
    case "gold":
      return {
        border: "border-gold/20",
        bg: "bg-gold/8",
        text: "text-gold",
        hoverBorder: "group-hover:border-gold/35",
        chipTone: "gold" as const,
        initialsBg: "rgba(212,175,55,0.12)",
        initialsColor: "#D4AF37",
      };
    case "green":
      return {
        border: "border-status-green/20",
        bg: "bg-status-green/5",
        text: "text-status-green",
        hoverBorder: "group-hover:border-status-green/35",
        chipTone: "green" as const,
        initialsBg: "rgba(0,229,160,0.12)",
        initialsColor: "#00E5A0",
      };
    case "slate":
      return {
        border: "border-steel/20",
        bg: "bg-steel/5",
        text: "text-steel",
        hoverBorder: "group-hover:border-steel/35",
        chipTone: "slate" as const,
        initialsBg: "rgba(88,117,140,0.15)",
        initialsColor: "#58758C",
      };
    default:
      return {
        border: "border-cyan/20",
        bg: "bg-cyan/5",
        text: "text-cyan",
        hoverBorder: "group-hover:border-cyan/35",
        chipTone: "cyan" as const,
        initialsBg: "rgba(0,229,255,0.12)",
        initialsColor: "#00E5FF",
      };
  }
}

function MemberCard({
  member,
  dept,
}: {
  member: TeamMember;
  dept: Department;
}) {
  const [hovered, setHovered] = useState(false);
  const colors = toneColors(dept.color);
  const primaryPhone = getPrimaryPhone(member.tel);

  return (
    <div
      className={`group relative p-4 border ${colors.border} ${colors.bg} transition-all duration-300 ${colors.hoverBorder} hover:translate-y-[-2px] hover:shadow-lg hover:shadow-black/20`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center gap-3">
        {/* Avatar / initials */}
        {member.photo ? (
          <div
            className="w-10 h-10 flex-shrink-0 overflow-hidden border"
            style={{ borderColor: `${colors.initialsColor}33` }}
          >
            <Image
              src={assetPath(member.photo)}
              alt={member.name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div
            className="w-10 h-10 flex-shrink-0 flex items-center justify-center border"
            style={{
              backgroundColor: colors.initialsBg,
              borderColor: `${colors.initialsColor}33`,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: colors.initialsColor,
                letterSpacing: "0.05em",
              }}
            >
              {getInitials(member.name)}
            </span>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div
            className="text-white text-sm font-medium truncate"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {member.name}
          </div>
          <div
            className="text-text-muted text-xs mt-0.5 truncate"
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem" }}
          >
            {member.position}
          </div>
        </div>
      </div>

      {/* Badge for KDP members */}
      {member.badge && (
        <div className="mt-2 flex items-center gap-1">
          <Award size={10} className={colors.text} />
          <span
            className={`${colors.text}`}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.5rem",
              letterSpacing: "0.08em",
            }}
          >
            {member.badge}
          </span>
        </div>
      )}

      {/* Hover reveal: contact details */}
      <div
        className={`mt-2 space-y-1 transition-all duration-300 overflow-hidden ${
          hovered ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="flex items-center gap-1.5 text-text-muted hover:text-white transition-colors"
          >
            <Mail size={10} className="flex-shrink-0" />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                letterSpacing: "0.04em",
              }}
            >
              {member.email}
            </span>
          </a>
        )}
        {primaryPhone && (
          <a
            href={`tel:${primaryPhone.replace(/\s/g, "")}`}
            className="flex items-center gap-1.5 text-text-muted hover:text-white transition-colors"
          >
            <PhoneIcon size={10} className="flex-shrink-0" />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                letterSpacing: "0.04em",
              }}
            >
              {primaryPhone}
            </span>
          </a>
        )}
        {member.mob && (
          <a
            href={`tel:${member.mob.replace(/\s/g, "")}`}
            className="flex items-center gap-1.5 text-text-muted hover:text-white transition-colors"
          >
            <Smartphone size={10} className="flex-shrink-0" />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                letterSpacing: "0.04em",
              }}
            >
              {member.mob}
            </span>
          </a>
        )}
      </div>

      {/* Department chip on hover */}
      <div
        className={`absolute top-2 right-2 transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}
      >
        <span className="hud-chip" data-tone={colors.chipTone}>
          {dept.name}
        </span>
      </div>
    </div>
  );
}

function DepartmentFilter({
  active,
  onSelect,
}: {
  active: DepartmentId | "all";
  onSelect: (id: DepartmentId | "all") => void;
}) {
  const colors = toneColors("cyan");

  return (
    <div className="flex flex-wrap gap-2 mb-10">
      <button
        onClick={() => onSelect("all")}
        className={`hud-chip cursor-pointer transition-all ${
          active === "all"
            ? "!bg-cyan/20 !border-cyan/50 !text-cyan"
            : "opacity-60 hover:opacity-100"
        }`}
        data-tone="cyan"
      >
        Vše
      </button>
      {departments.map((dept) => {
        const deptColors = toneColors(dept.color);
        const memberCount = teamMembers.filter(
          (m) => m.department === dept.id,
        ).length;
        const isActive = active === dept.id;

        return (
          <button
            key={dept.id}
            onClick={() => onSelect(dept.id)}
            className={`hud-chip cursor-pointer transition-all ${
              isActive
                ? `!bg-${dept.color === "gold" ? "gold" : dept.color === "green" ? "status-green" : dept.color === "slate" ? "steel" : "cyan"}/20 !border-${dept.color === "gold" ? "gold" : dept.color === "green" ? "status-green" : dept.color === "slate" ? "steel" : "cyan"}/50`
                : "opacity-60 hover:opacity-100"
            }`}
            data-tone={deptColors.chipTone}
          >
            {dept.name} ({memberCount})
          </button>
        );
      })}
    </div>
  );
}

export default function TeamSection() {
  const { ref, inView } = useInView(0.05);
  const [activeFilter, setActiveFilter] = useState<DepartmentId | "all">("all");

  const totalMembers = teamMembers.length;

  // Group members by department, respecting filter
  const visibleDepartments =
    activeFilter === "all"
      ? departments
      : departments.filter((d) => d.id === activeFilter);

  return (
    <section
      id="tym"
      className="py-28 relative"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Subtle background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 40%, rgba(212,175,55,0.02) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div
          className={`mb-8 text-center ${inView ? "animate-float-up" : "opacity-0"}`}
        >
          <div className="section-tag justify-center mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            TÝM // {totalMembers} SPECIALISTŮ
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Náš <span className="text-gold">tým</span>
          </h2>
          <p className="mt-4 text-text-secondary text-lg max-w-2xl mx-auto">
            {totalMembers} odborníků v {departments.length} specializovaných
            odděleních. Každý člen týmu přináší unikátní expertízu do celku,
            který funguje jako jeden organismus.
          </p>
        </div>

        {/* Department filter */}
        <div
          className={`flex justify-center ${inView ? "animate-float-up delay-100" : "opacity-0"}`}
        >
          <DepartmentFilter active={activeFilter} onSelect={setActiveFilter} />
        </div>

        {/* Department groups */}
        <div className="space-y-10">
          {visibleDepartments.map((dept, deptIndex) => {
            const colors = toneColors(dept.color);
            const members = teamMembers.filter((m) => m.department === dept.id);

            if (members.length === 0) return null;

            return (
              <div
                key={dept.id}
                className={`${inView ? `animate-float-up delay-${Math.min((deptIndex + 1) * 100, 800)}` : "opacity-0"}`}
              >
                {/* Department header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="hud-chip" data-tone={colors.chipTone}>
                    {dept.name}
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-cyan/10 to-transparent" />
                  <span
                    className="text-text-muted"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.12em",
                    }}
                  >
                    {members.length}{" "}
                    {members.length === 1
                      ? "člen"
                      : members.length < 5
                        ? "členové"
                        : "členů"}
                  </span>
                </div>

                {/* Members grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {members.map((member) => (
                    <MemberCard key={member.name} member={member} dept={dept} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
