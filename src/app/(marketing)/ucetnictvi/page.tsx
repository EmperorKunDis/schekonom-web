"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Calculator,
  CheckCircle2,
  ArrowRight,
  Phone,
  FileText,
  BookOpen,
  RefreshCw,
  MessageSquare,
  ShieldCheck,
  Send,
  ClipboardList,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { assetPath } from "@/lib/paths";

const services = [
  {
    icon: BookOpen,
    title: "Vedení podvojného účetnictví",
    desc: "Kompletní vedení podvojného účetnictví dle českých účetních standardů i mezinárodních pravidel (IFRS). Zajistíme správné účtování všech operací a průběžnou kontrolu.",
  },
  {
    icon: FileText,
    title: "Daňová evidence",
    desc: "Vedení daňové evidence pro OSVČ a menší podnikatele. Přehledná evidence příjmů a výdajů, evidence majetku a závazků.",
  },
  {
    icon: ClipboardList,
    title: "Účetní závěrky",
    desc: "Zpracování řádných i mimořádných účetních závěrek včetně výkazů (rozvaha, výkaz zisku a ztráty, příloha). Zajistíme i audit-ready podklady.",
  },
  {
    icon: RefreshCw,
    title: "Rekonstrukce účetnictví",
    desc: "Oprava a rekonstrukce zanedbaného nebo chybně vedeného účetnictví. Uvedení do souladu s legislativou a příprava na případnou kontrolu.",
  },
  {
    icon: MessageSquare,
    title: "Účetní konzultace",
    desc: "Průběžné účetní konzultace a metodická podpora. Poradíme s účtováním specifických transakcí, leasingem, dotacemi nebo zahraničními operacemi.",
  },
  {
    icon: ShieldCheck,
    title: "Zastupování před finančním úřadem",
    desc: "Zastoupení na základě plné moci při komunikaci s finančním úřadem, při daňových kontrolách a v odvolacím řízení.",
  },
  {
    icon: Send,
    title: "Přehledy pro ČSSZ a zdravotní pojišťovny",
    desc: "Zpracování a elektronické podání přehledů o příjmech a výdajích pro Českou správu sociálního zabezpečení a zdravotní pojišťovny.",
  },
];

const advantages = [
  "30+ let zkušeností s vedením účetnictví",
  "340+ spokojených klientů z různých oborů",
  "Moderní účetní software a digitalizované procesy",
  "Přehledný klientský portál s 24/7 přístupem",
  "Pojištění profesní odpovědnosti",
  "Zastoupení před úřady v ceně služby",
  "Elektronická komunikace s úřady přes datovou schránku",
  "Osobní přístup a dedikovaný účetní pro každého klienta",
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

export default function UcetnictviPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <div className="mb-20 animate-float-up">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            SLUŽBY // ÚČETNICTVÍ
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            <span className="text-cyan">Účetnictví</span> a outsourcing
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-3xl leading-relaxed">
            Kompletní vedení podvojného účetnictví a daňové evidence pro firmy i
            OSVČ. Využíváme moderní účetní software propojený s naší platformou
            pro maximální přesnost a efektivitu.
          </p>
        </div>

        {/* Image + intro */}
        <FadeInSection className="mb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative glass-panel p-2">
                <Image
                  src={assetPath(
                    "/images/editorial/12027a_8497d15dcdca4e478a3b7deaee0da57f_mv2.jpg",
                  )}
                  alt="Ucetnictvi a outsourcing — SCH-EKONOM"
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
                Proč svěřit účetnictví <span className="text-cyan">nám?</span>
              </h2>
              <p className="text-text-secondary leading-relaxed mb-5">
                Outsourcing účetnictví vám umožní soustředit se na váš core
                business, zatímco se o vaše finance starají zkušení odborníci.
                Snížíte riziko chyb, ušetříte náklady na interní účtárnu a
                získáte přístup k týmu specialistů.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Každému klientovi přidělujeme dedikovaného účetního, který zná
                jeho firmu a obor. Komunikace je rychlá a přímá — přes telefon,
                e-mail nebo náš klientský portál.
              </p>
            </div>
          </div>
        </FadeInSection>

        {/* Why us panel */}
        <FadeInSection className="mb-24">
          <div className="hud-panel p-8 rounded-sm">
            <div className="flex items-center gap-3 mb-6">
              <Calculator size={20} className="text-cyan" />
              <span
                className="text-cyan"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Nase vyhody
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

        {/* Services list */}
        <FadeInSection className="mb-4">
          <div className="section-tag mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            SLUŽBY // CO ZAHRNUJE
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-12"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Co vše <span className="text-cyan">zajistíme</span>
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
              <Calculator size={32} className="text-cyan mx-auto mb-5" />
              <h3
                className="text-white text-2xl font-semibold mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Potřebujete účetní služby?
              </h3>
              <p className="text-text-secondary mb-8 max-w-md leading-relaxed">
                Rádi vám připravíme nabídku na míru. Úvodní konzultace je zdarma
                a nezávazná.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/kontakt" className="btn-primary">
                  Nezávazná poptávka
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
