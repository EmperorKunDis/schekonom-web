"use client";

import {
  FileText,
  Calculator,
  TrendingUp,
  Users,
  Globe,
  Archive,
  Cpu,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Briefcase,
  Phone,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";

const services = [
  {
    icon: Calculator,
    code: "SVC-001",
    title: "Ucetnictvi a outsourcing ucetnictvi",
    titleDisplay: "Účetnictví a outsourcing",
    desc: "Kompletní vedení podvojného účetnictví a daňové evidence pro firmy i OSVČ. Využíváme moderní účetní software propojený s naší AI platformou pro maximální přesnost a efektivitu.",
    tags: ["Podvojné účetnictví", "Daňová evidence", "Závěrky", "Outsourcing"],
    ai: false,
    href: "/ucetnictvi",
    image: "/images/editorial/12027a_8497d15dcdca4e478a3b7deaee0da57f_mv2.jpg",
    features: [
      "Vedení podvojného účetnictví dle českých i mezinárodních standardů",
      "Vedení daňové evidence pro OSVČ a menší podnikatele",
      "Zpracování řádných i mimořádných účetních závěrek",
      "Rekonstrukce zanedbaného nebo chybného účetnictví",
      "Průběžné účetní konzultace a metodická podpora",
      "Zastupování před finančním úřadem na základě plné moci",
      "Zpracování přehledů pro ČSSZ a zdravotní pojišťovny",
      "Elektronická komunikace s úřady přes datovou schránku",
    ],
  },
  {
    icon: FileText,
    code: "SVC-002",
    title: "Danove poradenstvi",
    titleDisplay: "Daňové poradenství",
    desc: "Komplexní daňové poradenství pro právnické i fyzické osoby. Zajistíme optimální nastavení daňových povinností, zastoupíme vás při komunikaci s finančním úřadem a pohlídáme všechny termíny.",
    tags: ["DPPO", "DPFO", "DPH", "Optimalizace"],
    ai: false,
    href: "/danove-poradenstvi",
    image: "/images/editorial/12027a_370f322571a947f9b32170d3cab54e4e_mv2.jpg",
    features: [
      "Přiznání k dani z příjmů právnických osob (DPPO)",
      "Přiznání k dani z příjmů fyzických osob (DPFO)",
      "Přiznání k DPH, kontrolní a souhrnná hlášení",
      "Daňová optimalizace a strategické plánování",
      "Zastoupení a poradenství při daňových kontrolách",
      "Odložené daňové povinnosti a daňové plánování",
      "Silniční daň, daň z nemovitostí a další přiznání",
      "Monitoring legislativních změn a proaktivní poradenství",
    ],
  },
  {
    icon: TrendingUp,
    code: "SVC-003",
    title: "Mzdove ucetnictvi",
    titleDisplay: "Mzdové účetnictví",
    desc: "Kompletní zpracování mezd a personální administrativa. Od pracovní smlouvy po roční zúčtování — postaráme se o vše. Garantujeme bezchybné výpočty a včasná hlášení.",
    tags: ["Mzdy", "Personalistika", "ČSSZ", "Zúčtování"],
    ai: false,
    href: "/mzdove-ucetnictvi",
    image: "/images/editorial/12027a_7c3bfba7d2f4484a9e0fbf991a54c2c9_mv2.jpg",
    features: [
      "Kompletní měsíční zpracování mezd pro libovolný počet zaměstnanců",
      "Personální administrativa — smlouvy, dohody, změny",
      "Měsíční hlášení na ČSSZ, zdravotní pojišťovny a finanční úřad",
      "Příprava pracovních smluv, DPP, DPČ a jejich dodatků",
      "Výpočet nemocenských dávek, náhrad a příplatků",
      "Roční zúčtování daně z příjmů ze závislé činnosti",
      "Evidenční listy důchodového pojištění",
      "Potvrzení o příjmech a srážkách pro zaměstnance",
    ],
  },
  {
    icon: Globe,
    code: "SVC-004",
    title: "Nemecke dane",
    titleDisplay: "Německé daně",
    desc: "Kompletní správa německých daňových povinností pro české subjekty. Od Steuererklärung přes Freistellung až po Kindergeld — vše z jednoho místa v Chebu.",
    tags: ["Steuererklärung", "Freistellung", "Kindergeld", "ELSTER"],
    ai: false,
    image: "/images/editorial/12027a_aab4b581b3624b8f9e5ba8b90774b19a_mv2.jpg",
    href: "/nemecke-dane",
    features: [
      "Kompletní zpracování německého daňového přiznání (Steuererklärung)",
      "Žádosti o osvobození od srážkové daně (Freistellung)",
      "Služby pro přeshraniční zaměstnance — pendlery",
      "Vyřízení nároku na Kindergeld (přídavky na děti)",
      "ELSTER registrace a elektronická komunikace s Finanzamt",
      "Přímá komunikace s německými úřady v němčině",
    ],
  },
  {
    icon: Users,
    code: "SVC-005",
    title: "Preshranicni CZ/DE poradenstvi",
    titleDisplay: "Přeshraniční CZ/DE poradenství",
    desc: "Specializované služby pro české a německé subjekty v příhraničním regionu. Řešíme specifické situace firem s přeshraničními operacemi, transferové ceny a dvojí zdanění.",
    tags: ["Dvojí zdanění", "Transfer pricing", "Investoři", "A1"],
    ai: false,
    href: "/preshranicni-poradenstvi",
    image: "/images/editorial/12027a_3837e0058d824b70bf6cedf116a089db_mv2.jpg",
    features: [
      "Daňové poradenství pro německé subjekty podnikající v ČR",
      "Založení firmy v ČR pro německé investory — kompletní servis",
      "Nastavení a dokumentace transferových cen",
      "Aplikace smluv o zamezení dvojího zdanění (DBA CZ/DE)",
      "Koordinace sociálního pojištění pro vyslané pracovníky",
      "Formuláře A1 a další povinnosti při přeshraničním zaměstnávání",
    ],
  },
  {
    icon: Archive,
    code: "SVC-006",
    title: "Certifikacni autorita",
    titleDisplay: "Certifikační autorita",
    desc: "Vydávání a správa kvalifikovaných digitálních certifikátů pro elektronické podpisy dle nařízení eIDAS. Bezpečná elektronická komunikace s úřady a obchodními partnery.",
    tags: ["eIDAS", "Kvalifikovaný podpis", "Certifikáty"],
    ai: false,
    href: "/certifikacni-autorita",
    image: "/images/editorial/12027a_8fff885c31134da0ba826e99ef1b53a7_mv2.jpg",
    features: [
      "Vydávání kvalifikovaných certifikátů pro elektronický podpis",
      "Elektronické podpisy v souladu s nařízením eIDAS",
      "Správa, obnova a revokace certifikátů",
      "Podpora při nastavení elektronického podepisování",
      "Integrace s datovými schránkami a portály veřejné správy",
      "Školení a poradenství k elektronické identitě",
    ],
  },
  {
    icon: Cpu,
    code: "SVC-AI1",
    title: "AI Financni analyza",
    titleDisplay: "AI Finanční analýza",
    desc: "Prediktivní analýza cash-flow a automatická detekce daňových rizik. Naše ML modely identifikují anomálie a optimalizační příležitosti dříve, než se stanou problémem.",
    tags: ["Predikce", "Risk Detection", "ML", "Cash-flow"],
    ai: true,
    features: [
      "Predikce cash-flow na 12 měsíců dopředu s přesností 94%+",
      "Automatická detekce daňových rizik a nesrovnalostí",
      "Analýza optimalizačních příležitostí v reálném čase",
      "Benchmarking finanční výkonnosti v rámci oboru",
      "Kontinuální monitoring finanční kondice firmy",
      "Early-warning systém pro potenciální problémy",
      "Scénářové modelování — What-If analýzy",
      "Personalizovaná doporučení na míru vaší firmě",
    ],
  },
  {
    icon: BarChart3,
    code: "SVC-AI2",
    title: "AI Reporting",
    titleDisplay: "AI Reporting",
    desc: "Automatizované generování reportů a dashboardů v reálném čase. Mějte přehled o financích firmy kdykoli a odkudkoli — z počítače i mobilního telefonu.",
    tags: ["Real-time", "Dashboards", "Auto-report", "KPI"],
    ai: true,
    features: [
      "Real-time finanční dashboardy přístupné 24/7",
      "Automatické generování měsíčních a čtvrtletních reportů",
      "Customizované KPI přehledy dle vašich potřeb",
      "Export dat ve všech běžných formátech (PDF, Excel, CSV)",
      "Alerting při překročení nastavených prahových hodnot",
      "Srovnávací analýzy meziročního vývoje",
      "Mobilní přístup — reporty vždy po ruce",
      "Integrace s účetním softwarem v reálném čase",
    ],
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const { ref, inView } = useInView(0.08);

  const content = (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`service-card ${service.ai ? "service-card-ai" : ""} p-0 overflow-hidden group ${
        inView
          ? `animate-float-up delay-${((index % 4) + 1) * 100}`
          : "opacity-0"
      }`}
    >
      {/* Image header */}
      {service.image && (
        <div className="relative h-44 overflow-hidden">
          <Image
            src={service.image}
            alt={service.titleDisplay}
            width={640}
            height={280}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,34,54,0.95)] via-[rgba(10,34,54,0.5)] to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div
              className={`p-3 border ${service.ai ? "border-cyan/30 bg-cyan/10" : "border-cyan/15 bg-void/80"} backdrop-blur-sm`}
            >
              <service.icon
                size={24}
                className={service.ai ? "text-cyan" : "text-cyan/70"}
              />
            </div>
            <div className="flex items-center gap-2">
              {service.ai && (
                <span className="hud-chip" data-tone="cyan">
                  AI-Powered
                </span>
              )}
              <span
                className="text-text-muted"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                }}
              >
                {service.code}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* No image header — AI services */}
      {!service.image && (
        <div className="relative h-44 overflow-hidden bg-gradient-to-br from-cyan/8 via-void-light to-void">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 30% 50%, rgba(0,229,255,0.06), transparent 60%)",
            }}
          />
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div className="p-3 border border-cyan/30 bg-cyan/10 backdrop-blur-sm">
              <service.icon size={24} className="text-cyan" />
            </div>
            <div className="flex items-center gap-2">
              <span className="hud-chip" data-tone="cyan">
                AI-Powered
              </span>
              <span
                className="text-text-muted"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                }}
              >
                {service.code}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-8">
        {/* Title */}
        <h3
          className="text-white text-xl font-semibold mb-3"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {service.titleDisplay}
        </h3>

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed mb-6">
          {service.desc}
        </p>

        {/* Features list */}
        <ul className="space-y-2.5 mb-6">
          {service.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 text-text-muted text-sm"
            >
              <CheckCircle2
                size={14}
                className={`${service.ai ? "text-cyan/70" : "text-cyan/50"} mt-0.5 flex-shrink-0`}
              />
              {feature}
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="hud-chip"
              data-tone={service.ai ? "cyan" : "slate"}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Detail link */}
        <div className="mt-6 pt-4 border-t border-cyan/8">
          {service.href ? (
            <Link
              href={service.href}
              className="inline-flex items-center gap-2 text-cyan text-sm font-medium hover:gap-3 transition-all"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Více informací
              <ArrowRight size={14} />
            </Link>
          ) : (
            <span
              className="inline-flex items-center gap-2 text-text-muted text-sm"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Připravujeme
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return service.href ? (
    <Link href={service.href} className="block">
      {content}
    </Link>
  ) : (
    content
  );
}

function FadeInSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${inView ? "animate-float-up" : "opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function SluzbyPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page header */}
        <div className="mb-20 animate-float-up">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            SLUŽBY // KOMPLETNÍ PORTFOLIO
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Kompletní <span className="text-cyan">finanční servis</span>
            <br />
            pro vaše podnikání
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-3xl leading-relaxed">
            Od tradičního účetnictví a daňového poradenství po AI-podpořenou
            finanční analýzu. 8 specializovaných služeb pokrývajících vše, co
            váš business potřebuje — v regionu Cheb, Plzeň a přeshraničním
            prostoru CZ/DE.
          </p>
        </div>

        {/* Quick stats */}
        <FadeInSection className="mb-20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-cyan/10">
            {[
              { val: "30+", label: "Let zkušeností" },
              { val: "340+", label: "Aktivních klientů" },
              { val: "40+", label: "Odborníků v týmu" },
              { val: "8", label: "Specializací" },
            ].map((s) => (
              <div key={s.label} className="bg-void px-5 py-5 text-center">
                <div
                  className="text-cyan text-2xl font-bold"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {s.val}
                </div>
                <div
                  className="text-text-muted mt-1"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* Traditional services label */}
        <FadeInSection className="mb-8">
          <div className="flex items-center gap-4">
            <div className="section-tag">
              <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
              KLASICKÉ SLUŽBY // 6 ODDĚLENÍ
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-gold/20 to-transparent" />
          </div>
        </FadeInSection>

        {/* Traditional services grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-24">
          {services
            .filter((s) => !s.ai)
            .map((service, i) => (
              <ServiceCard key={service.code} service={service} index={i} />
            ))}
        </div>

        {/* AI services label */}
        <FadeInSection className="mb-8">
          <div className="flex items-center gap-4">
            <div className="section-tag">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block animate-pulse-dot" />
              AI SLUŽBY // INTELIGENTNÍ FINANCE
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan/20 to-transparent" />
          </div>
        </FadeInSection>

        {/* AI services grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-24">
          {services
            .filter((s) => s.ai)
            .map((service, i) => (
              <ServiceCard key={service.code} service={service} index={i} />
            ))}
        </div>

        {/* How it works */}
        <FadeInSection className="mb-24">
          <div className="section-tag mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            PROCES // JAK SPOLUPRACUJEME
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-12"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Jednoduché <span className="text-cyan">zahájení spolupráce</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Nezávazná konzultace",
                desc: "Zdarma probereme vaši situaci a navrhneme optimální rozsah služeb. Online nebo osobně v Chebu či Plzni.",
              },
              {
                step: "02",
                title: "Nabídka na míru",
                desc: "Připravíme transparentní cenovou nabídku přesně podle vašich potřeb. Bez skrytých poplatků.",
              },
              {
                step: "03",
                title: "Předání podkladů",
                desc: "Bezpečně nám předáte dokumenty — elektronicky přes portál, datovou schránkou nebo osobně.",
              },
              {
                step: "04",
                title: "Průběžný servis",
                desc: "Staráme se o vaše finance průběžně. Reporty, přehledy a konzultace máte vždy k dispozici.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="glass-panel p-6 group hover:border-cyan/25 transition-all"
              >
                <div
                  className="text-cyan text-3xl font-bold mb-4 opacity-40 group-hover:opacity-80 transition-opacity"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {item.step}
                </div>
                <h3
                  className="text-white text-lg font-semibold mb-2"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {item.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* CTA */}
        <FadeInSection>
          <div className="text-center">
            <div className="glass-panel inline-block p-12 max-w-xl">
              <Briefcase size={32} className="text-cyan mx-auto mb-5" />
              <h3
                className="text-white text-2xl font-semibold mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Potřebujete poradit?
              </h3>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Nezávazná konzultace zdarma. Společně najdeme optimální řešení
                pro vaši situaci — ať už jste OSVČ, firma nebo pendler pracující
                v Německu.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/kontakt" className="btn-primary">
                  Domluvit konzultaci
                  <ArrowRight size={16} />
                </Link>
                <a href="tel:+420354433005" className="btn-ghost">
                  <Phone size={16} />
                  +420 354 433 005
                </a>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
