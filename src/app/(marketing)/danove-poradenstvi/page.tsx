"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  CheckCircle2,
  ArrowRight,
  Phone,
  Building2,
  User,
  Receipt,
  Car,
  Home,
  ArrowLeftRight,
  Globe,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { assetPath } from "@/lib/paths";

const services = [
  {
    icon: Building2,
    title: "Daň z příjmů právnických osob (DPPO)",
    desc: "Zpracování přiznání k DPPO, optimalizace základu daně, uplatnění odpočtů a slev. Poradenství k odloženým daním a daňovým rezervám.",
  },
  {
    icon: User,
    title: "Daň z příjmů fyzických osob (DPFO)",
    desc: "Kompletní přiznání k DPFO pro podnikatele, zaměstnance s více příjmy i pronajímatele. Optimalizace daňové povinnosti a uplatnění všech dostupných odpočtů.",
  },
  {
    icon: Receipt,
    title: "DPH a nepřímé daně",
    desc: "Přiznání k DPH, kontrolní a souhrnná hlášení. Poradenství k registraci, odpočtům, přenesení daňové povinnosti a intrakomunitárním plněním.",
  },
  {
    icon: Car,
    title: "Silniční daň",
    desc: "Zpracování přiznání k silniční dani, posouzení povinnosti platby a optimalizace výše daně u firemních vozidel.",
  },
  {
    icon: Home,
    title: "Daň z nemovitostí",
    desc: "Přiznání k dani z nemovitých věcí, sledování změn v legislativě a koeficientech, řešení specifických situací (nové stavby, pozemky, změny vlastnictví).",
  },
  {
    icon: ArrowLeftRight,
    title: "Transferové ceny",
    desc: "Nastavení a dokumentace transferových cen pro propojené osoby. Zpracování lokální dokumentace i master file dle pokynů OECD a české legislativy.",
  },
  {
    icon: Globe,
    title: "Přeshraniční transakce",
    desc: "Daňové posouzení mezinárodních transakcí, aplikace smluv o zamezení dvojího zdanění, srážkové daně z příjmů nerezidentů.",
  },
  {
    icon: ShieldCheck,
    title: "Zastupování při daňových kontrolách",
    desc: "Kompletní zastoupení před finančním úřadem při daňové kontrole. Příprava podkladů, komunikace se správcem daně a obhajoba daňových pozic.",
  },
  {
    icon: TrendingUp,
    title: "Daňová optimalizace",
    desc: "Strategické daňové plánování a legální optimalizace celkového daňového zatížení. Analýza možností a doporučení šitá na míru vaší situaci.",
  },
];

const advantages = [
  "5 daňových poradkyň s certifikací KDP ČR",
  "Zkušenost s firmami od OSVČ po střední podniky",
  "Přeshraniční daňové poradenství CZ/DE",
  "Proaktivní monitoring legislativních změn",
  "Zastoupení při kontrolách v ceně služby",
  "Pojištění profesní odpovědnosti",
  "Elektronická komunikace s úřady",
  "Individuální přístup ke každému případu",
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

export default function DanovePoradenstviPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <div className="mb-20 animate-float-up">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            SLUŽBY // DAŇOVÉ PORADENSTVÍ
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            <span className="text-cyan">Daňové</span> poradenství
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-3xl leading-relaxed">
            Komplexní daňové poradenství pro právnické i fyzické osoby.
            Zajistíme optimální nastavení daňových povinností, zastoupíme vás
            při komunikaci s finančním úřadem a pohlídáme všechny termíny.
          </p>
        </div>

        {/* Image + intro */}
        <FadeInSection className="mb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative glass-panel p-2">
                <Image
                  src={assetPath(
                    "/images/editorial/12027a_370f322571a947f9b32170d3cab54e4e_mv2.jpg",
                  )}
                  alt="Danove poradenstvi — SCH-EKONOM"
                  width={640}
                  height={420}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-white mb-6"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Tým <span className="text-cyan">daňových poradkyň</span>
              </h2>
              <p className="text-text-secondary leading-relaxed mb-5">
                Náš tým 5 certifikovaných daňových poradkyň zapsaných v Komoře
                daňových poradců ČR má desetiletí praxe s řešením daňových
                situací od běžných přiznání po složité mezinárodní transakce.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Aktivně sledujeme legislativní změny a proaktivně informujeme
                klienty o dopadech na jejich podnikání. Zastoupíme vás při
                daňových kontrolách a řešíme za vás veškerou komunikaci s
                finančním úřadem.
              </p>

              {/* Quick stats */}
              <div className="mt-8 grid grid-cols-3 gap-px bg-cyan/10">
                {[
                  { val: "5", label: "Daňových poradkyň" },
                  { val: "30+", label: "Let praxe" },
                  { val: "340+", label: "Klientů" },
                ].map((s) => (
                  <div key={s.label} className="bg-void py-4 px-3 text-center">
                    <div
                      className="text-cyan text-xl font-bold"
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
          </div>
        </FadeInSection>

        {/* Advantages panel */}
        <FadeInSection className="mb-24">
          <div className="hud-panel p-8 rounded-sm">
            <div className="flex items-center gap-3 mb-6">
              <FileText size={20} className="text-cyan" />
              <span
                className="text-cyan"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Proc SCH-EKONOM
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {advantages.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="text-status-green mt-0.5 flex-shrink-0"
                  />
                  <span className="text-text-secondary text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* Services */}
        <FadeInSection className="mb-4">
          <div className="section-tag mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            SPECIALIZACE // 9 OBLASTÍ
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-12"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Oblasti <span className="text-cyan">poradenství</span>
          </h2>
        </FadeInSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {services.map((service, i) => {
            const { ref, inView } = useInView(0.08);
            return (
              <div
                key={service.title}
                ref={ref as React.RefObject<HTMLDivElement>}
                className={`service-card p-8 ${
                  inView
                    ? `animate-float-up delay-${((i % 3) + 1) * 100}`
                    : "opacity-0"
                }`}
              >
                <div className="p-3 border border-cyan/20 bg-cyan/8 inline-flex mb-5">
                  <service.icon size={22} className="text-cyan" />
                </div>
                <h3
                  className="text-white text-lg font-semibold mb-3"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {service.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <FadeInSection>
          <div className="text-center">
            <div className="glass-panel inline-block p-12 max-w-xl">
              <FileText size={32} className="text-cyan mx-auto mb-5" />
              <h3
                className="text-white text-2xl font-semibold mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Potřebujete daňového poradce?
              </h3>
              <p className="text-text-secondary mb-8 max-w-md leading-relaxed">
                Nezávazná konzultace zdarma. Společně najdeme optimální daňovou
                strategii pro vaši situaci.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/kontakt" className="btn-primary">
                  Nezávazná konzultace
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
