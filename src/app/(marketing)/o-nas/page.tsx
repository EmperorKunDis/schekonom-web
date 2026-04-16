"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Map,
  BrainCircuit,
  ArrowRight,
  Award,
  Building2,
  MapPin,
  Phone,
  Clock,
  Handshake,
  Mail,
  Smartphone,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useState } from "react";
import {
  departments,
  teamMembers,
  getInitials,
  type TeamMember,
  type Department,
  type DepartmentId,
} from "@/lib/team-data";

const timeline = [
  {
    year: "1993",
    text: "Založení společnosti SCH-EKONOM v Chebu",
    detail:
      "Rodinná firma s vizí poskytovat účetní služby na úrovni velkých kanceláří s osobním přístupem.",
  },
  {
    year: "2000",
    text: "Rozšíření o přeshraniční služby CZ/DE",
    detail:
      "Reakce na rostoucí poptávku pendlerů a firem s operacemi v Bavorsku.",
  },
  {
    year: "2008",
    text: "Otevření oddělení německých daní",
    detail:
      "Specializovaný tým pro Steuererklärung, Freistellung a Kindergeld.",
  },
  {
    year: "2014",
    text: "Certifikační autorita pro eIDAS",
    detail: "Vydávání kvalifikovaných certifikátů pro elektronické podpisy.",
  },
  {
    year: "2019",
    text: "Interní digitalizace",
    detail: "Nasazení DocuWare, Exchange a automatizace interních procesů.",
  },
  {
    year: "2023",
    text: "Otevření pobočky Plzeň",
    detail: "Expanze do Kopeckého sadů — nová kancelář v Kolektiv Hubu.",
  },
  {
    year: "2025",
    text: "Implementace AI platformy",
    detail:
      "Prediktivní analýza, automatizovaný reporting a inteligentní detekce rizik.",
  },
];

const values = [
  {
    icon: Heart,
    title: "Rodinná tradice a čestnost",
    desc: "Budujeme vztahy založené na důvěře a transparentnosti. Každý klient je pro nás partner, ne číslo v systému. Za více než 30 let jsme vybudovali reputaci, na kterou jsme hrdí.",
  },
  {
    icon: Map,
    title: "Regionální odbornost",
    desc: "Znalost regionu Cheb a česko-německého příhraničí je naše DNA. Rozumíme české i německé legislativě a lokálním specifikům jako nikdo jiný.",
  },
  {
    icon: Handshake,
    title: "Osobní přístup",
    desc: "Ke každému klientovi přistupujeme individuálně. Známe vaše jméno, váš business a vaše potřeby. Komunikujeme s úsměvem a jsme vždy dostupní.",
  },
  {
    icon: BrainCircuit,
    title: "Technologická inovace",
    desc: "AI technologie a digitalizaci nasazujeme tam, kde přinášejí reálnou hodnotu. Spojujeme lidskou expertízu s precizností strojů.",
  },
];

const offices = [
  {
    name: "Cheb — hlavní kancelář",
    building: "Chebana",
    address: "Obrněné brigády 553/31",
    city: "350 02 Cheb",
    phone: "+420 354 433 005",
    email: "mail@schekonom.cz",
    hours: "Po-Čt 7:00-15:30, Pá 7:00-14:00",
    image: "/images/cheb/Chebana_dron_edited.jpg",
    mapLabel: "50.0735°N, 12.3703°E",
  },
  {
    name: "Plzeň — pobočka",
    building: "Kolektiv Hub",
    address: "Kopeckého sady 329/8",
    city: "301 00 Plzeň",
    phone: "+420 354 433 005",
    email: "mail@schekonom.cz",
    hours: "Po dohodě",
    image: "/images/office/office-01.jpg",
    mapLabel: "49.7473°N, 13.3776°E",
  },
];

function FadeInSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, inView } = useInView(0.08);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${inView ? "animate-float-up" : "opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}

function getDeptColorClasses(color: string) {
  switch (color) {
    case "gold":
      return {
        bg: "bg-gold/10",
        border: "border-gold/20",
        text: "text-gold",
        chip: "gold" as const,
        initialsBg: "rgba(212,175,55,0.12)",
        initialsColor: "#D4AF37",
      };
    case "green":
      return {
        bg: "bg-status-green/10",
        border: "border-status-green/20",
        text: "text-status-green",
        chip: "green" as const,
        initialsBg: "rgba(0,229,160,0.12)",
        initialsColor: "#00E5A0",
      };
    case "cyan":
      return {
        bg: "bg-cyan/10",
        border: "border-cyan/20",
        text: "text-cyan",
        chip: "cyan" as const,
        initialsBg: "rgba(0,229,255,0.12)",
        initialsColor: "#00E5FF",
      };
    default:
      return {
        bg: "bg-steel/10",
        border: "border-steel/20",
        text: "text-steel",
        chip: "slate" as const,
        initialsBg: "rgba(88,117,140,0.15)",
        initialsColor: "#58758C",
      };
  }
}

function TeamDepartmentFilter({
  active,
  onSelect,
}: {
  active: DepartmentId | "all";
  onSelect: (id: DepartmentId | "all") => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
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
        const deptColors = getDeptColorClasses(dept.color);
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
            data-tone={deptColors.chip}
          >
            {dept.name} ({memberCount})
          </button>
        );
      })}
    </div>
  );
}

function TeamMemberCard({
  member,
  dept,
}: {
  member: TeamMember;
  dept: Department;
}) {
  const colors = getDeptColorClasses(dept.color);
  const phoneNumbers = member.tel
    ? member.tel.split(";").map((p) => p.trim())
    : [];

  return (
    <div className="glass-panel p-5 group hover:border-cyan/20 transition-all flex items-start gap-4">
      {/* Avatar */}
      {member.photo ? (
        <div
          className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-full border"
          style={{ borderColor: `${colors.initialsColor}33` }}
        >
          <Image
            src={member.photo}
            alt={member.name}
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div
          className={`w-24 h-24 flex-shrink-0 flex items-center justify-center rounded-full border ${colors.border} ${colors.bg}`}
        >
          <span
            className={`${colors.text} text-lg font-bold`}
            style={{
              fontFamily: "var(--font-space-grotesk)",
            }}
          >
            {getInitials(member.name)}
          </span>
        </div>
      )}

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div
          className="text-white text-base font-semibold leading-tight"
          style={{
            fontFamily: "var(--font-space-grotesk)",
          }}
        >
          {member.name}
        </div>
        <div
          className="text-text-muted mt-1"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.06em",
          }}
        >
          {member.position}
        </div>

        {/* Department badge */}
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span
            className="hud-chip !text-[0.55rem] !px-1.5 !py-0.5"
            data-tone={colors.chip}
          >
            {dept.name}
          </span>
          {member.badge && (
            <span className="inline-flex items-center gap-1">
              <Award size={11} className={colors.text} />
              <span
                className={colors.text}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.06em",
                }}
              >
                {member.badge}
              </span>
            </span>
          )}
        </div>

        {/* Contact info — always visible */}
        <div className="mt-2.5 space-y-1">
          {phoneNumbers.length > 0 && (
            <div className="flex items-start gap-1.5">
              <Phone
                size={12}
                className="text-text-muted flex-shrink-0 mt-0.5"
              />
              <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                {phoneNumbers.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="text-text-muted hover:text-white transition-colors"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </div>
          )}
          {member.mob && (
            <div className="flex items-center gap-1.5">
              <Smartphone size={12} className="text-text-muted flex-shrink-0" />
              <a
                href={`tel:${member.mob.replace(/\s/g, "")}`}
                className="text-text-muted hover:text-white transition-colors"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.03em",
                }}
              >
                {member.mob}
              </a>
            </div>
          )}
          {member.email && (
            <div className="flex items-center gap-1.5">
              <Mail size={12} className="text-text-muted flex-shrink-0" />
              <a
                href={`mailto:${member.email}`}
                className="text-text-muted hover:text-white transition-colors truncate"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.03em",
                }}
              >
                {member.email}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ONasPage() {
  const [teamFilter, setTeamFilter] = useState<DepartmentId | "all">("all");

  const visibleDepartments =
    teamFilter === "all"
      ? departments
      : departments.filter((d) => d.id === teamFilter);

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page header */}
        <div className="mb-20 animate-float-up">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />O
            NÁS // PŘÍBĚH
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Více než <span className="text-gold">30 let</span>
            <br />
            ve vašich službách
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-3xl leading-relaxed">
            SCH-EKONOM s.r.o. je rodinná účetní firma z Chebu, která už více než
            30 let poskytuje komplexní účetní služby pro malé i střední podniky,
            ale rádi se věnujeme také živnostníkům nebo fyzickým osobám
            pracujícím v Německu.
          </p>
        </div>

        {/* Story + Image */}
        <FadeInSection>
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-28">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Building2 size={20} className="text-gold" />
                <span
                  className="text-gold"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  Náš příběh
                </span>
              </div>
              <p className="text-text-secondary leading-relaxed mb-5">
                Kromě komunikace s úsměvem se můžete spolehnout především na
                kvalitní a přesné zpracování vaší účetní dokumentace našimi
                zkušenými účetními. Vznikli jsme v 90. letech s jasnou vizí —
                poskytnout podnikatelům v regionu Cheb služby na úrovni velkých
                pražských kanceláří, ale s osobním přístupem a znalostí místního
                prostředí.
              </p>
              <p className="text-text-secondary leading-relaxed mb-5">
                Postupně jsme se stali jedním z předních daňových poradců v
                přeshraničním regionu CZ/DE. Naše znalost obou právních systémů
                a jazyků nám umožňuje řešit i ty nejsložitější případy pendlerů,
                vyslaných pracovníků a firem s operacemi na obou stranách
                hranice.
              </p>
              <p className="text-text-secondary leading-relaxed">
                V roce 2025 jsme jako jedni z prvních v regionu začali
                implementovat AI technologie pro finanční analýzu a
                automatizovaný reporting — protože věříme, že budoucnost patří
                těm, kdo spojují lidskou expertízu s precizností strojů.
              </p>

              {/* Quick stats inline */}
              <div className="mt-8 grid grid-cols-3 gap-px bg-gold/10">
                {[
                  { val: "30+", label: "Let na trhu" },
                  { val: "340+", label: "Klientů" },
                  {
                    val: `${teamMembers.length}`,
                    label: "V týmu",
                  },
                ].map((s) => (
                  <div key={s.label} className="bg-void py-4 px-3 text-center">
                    <div
                      className="text-gold text-xl font-bold"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {s.val}
                    </div>
                    <div
                      className="text-text-muted mt-0.5"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.55rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div
                className="absolute -inset-4 opacity-20 blur-3xl"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(212,175,55,0.15), transparent 70%)",
                }}
              />
              <div className="relative glass-panel p-2">
                <Image
                  src="/images/cheb/Chebana_dron_2.jpg"
                  alt="Letecký pohled na sídlo SCH-EKONOM v Chebu — budova Chebana"
                  width={640}
                  height={420}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2 glass-panel-dark px-4 py-2 flex items-center justify-between">
                  <span
                    className="text-text-muted"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                    }}
                  >
                    CHEBANA, CHEB
                  </span>
                  <span
                    className="text-gold/70"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                    }}
                  >
                    EST. 1993
                  </span>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Timeline */}
        <FadeInSection className="mb-28">
          <div className="section-tag mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            HISTORIE // MILNÍKY
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-12"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Klíčové <span className="text-cyan">milníky</span>
          </h2>

          {/* Timeline line */}
          <div className="relative">
            <div className="absolute left-[18px] top-0 bottom-0 w-px bg-gradient-to-b from-cyan/30 via-cyan/15 to-transparent hidden sm:block" />
            <div className="space-y-4">
              {timeline.map((item, i) => (
                <div
                  key={item.year}
                  className="glass-panel p-6 sm:pl-14 relative group hover:border-cyan/25 transition-all"
                >
                  {/* Dot on timeline */}
                  <div className="absolute left-[14px] top-7 w-[9px] h-[9px] rounded-full bg-cyan/60 group-hover:bg-cyan transition-colors hidden sm:block" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                    <div
                      className="text-cyan text-2xl font-bold flex-shrink-0"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {item.year}
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-1">
                        {item.text}
                      </div>
                      <p className="text-text-muted text-sm">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* Values */}
        <FadeInSection className="mb-28">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            HODNOTY // DNA
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-12"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Naše <span className="text-gold">hodnoty</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="glass-panel p-8 group hover:border-gold/20 transition-all"
              >
                <div className="p-3 border border-gold/15 bg-gold/5 inline-flex mb-5 group-hover:border-gold/30 transition-colors">
                  <v.icon size={22} className="text-gold" />
                </div>
                <h3
                  className="text-white text-lg font-semibold mb-3"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {v.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* Team */}
        <FadeInSection className="mb-28">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            TÝM // {teamMembers.length} ODBORNÍKŮ
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Náš <span className="text-cyan">tým</span>
          </h2>
          <p className="text-text-secondary text-lg mb-8 max-w-2xl">
            {teamMembers.length} odborníků v {departments.length} odděleních.
            Každý člen týmu přináší specializované znalosti a zkušenosti ve svém
            oboru.
          </p>

          {/* Team group photo */}
          <div className="relative mb-12 overflow-hidden glass-panel">
            <Image
              src="/images/team/team-group.jpg"
              alt="Celý tým SCH-EKONOM"
              width={1400}
              height={600}
              className="w-full h-auto object-cover"
              style={{ filter: "brightness(0.85)" }}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  color: "rgba(0,229,255,0.7)",
                  marginBottom: 4,
                }}
              >
                // TEAM.GROUP
              </div>
              <div
                className="text-white text-lg font-semibold"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Tým SCH-EKONOM — Cheb
              </div>
              <div className="text-text-secondary text-sm mt-1">
                {teamMembers.length} odborníků připravených vám pomoci
              </div>
            </div>
          </div>

          {/* Department filter */}
          <TeamDepartmentFilter active={teamFilter} onSelect={setTeamFilter} />

          <div className="space-y-8">
            {visibleDepartments.map((dept) => {
              const colors = getDeptColorClasses(dept.color);
              const members = teamMembers.filter(
                (m) => m.department === dept.id,
              );

              if (members.length === 0) return null;

              return (
                <div key={dept.id}>
                  {/* Department header */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="hud-chip" data-tone={colors.chip}>
                      {dept.name}
                    </span>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {members.map((member) => (
                      <TeamMemberCard
                        key={member.name}
                        member={member}
                        dept={dept}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </FadeInSection>

        {/* Offices */}
        <FadeInSection className="mb-28">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            KANCELÁŘE // 2 POBOČKY
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-12"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Naše <span className="text-cyan">kanceláře</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {offices.map((office) => (
              <div
                key={office.name}
                className="service-card p-0 overflow-hidden group"
              >
                {/* Office image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={office.image}
                    alt={office.name}
                    width={640}
                    height={320}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(3,8,13,0.95)] via-[rgba(3,8,13,0.4)] to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <h3
                      className="text-white text-xl font-semibold"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {office.name}
                    </h3>
                  </div>
                </div>

                {/* Office details */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Building2
                      size={15}
                      className="text-cyan/60 mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <div className="text-white text-sm font-medium">
                        {office.building}
                      </div>
                      <div className="text-text-muted text-sm">
                        {office.address}
                      </div>
                      <div className="text-text-muted text-sm">
                        {office.city}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={15} className="text-cyan/60 flex-shrink-0" />
                    <a
                      href={`tel:${office.phone.replace(/\s/g, "")}`}
                      className="text-text-secondary text-sm hover:text-white transition-colors"
                    >
                      {office.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={15} className="text-cyan/60 flex-shrink-0" />
                    <span className="text-text-muted text-sm">
                      {office.hours}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={15} className="text-cyan/60 flex-shrink-0" />
                    <span
                      className="text-text-muted"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {office.mapLabel}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* Legal info */}
        <FadeInSection className="mb-20">
          <div className="hud-panel p-8 rounded-sm">
            <div className="flex items-center gap-3 mb-6">
              <Award size={18} className="text-gold" />
              <span
                className="text-gold"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Údaje o společnosti
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Obchodní firma", value: "SCH-EKONOM s.r.o." },
                { label: "IČO", value: "64832694" },
                { label: "DIČ", value: "CZ64832694" },
                {
                  label: "Spisová značka",
                  value: "C 7431 vedená u Krajského soudu v Plzni",
                },
              ].map((item) => (
                <div key={item.label}>
                  <div
                    className="text-text-muted mb-1"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.label}
                  </div>
                  <div className="text-white text-sm font-medium">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* CTA */}
        <FadeInSection>
          <div className="text-center">
            <div className="glass-panel inline-block p-12 max-w-xl">
              <Award size={32} className="text-gold mx-auto mb-5" />
              <h3
                className="text-white text-2xl font-semibold mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Staňte se součástí příběhu
              </h3>
              <p className="text-text-secondary mb-8 max-w-md leading-relaxed">
                340+ klientů nám důvěřuje. Pojďte zjistit, co můžeme udělat pro
                vás — nezávazná konzultace zdarma.
              </p>
              <Link href="/kontakt" className="btn-primary">
                Kontaktovat nás
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
