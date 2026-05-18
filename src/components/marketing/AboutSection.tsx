"use client";

import Image from "next/image";
import { Heart, Map, UserCheck, MapPin, Building2 } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { assetPath } from "@/lib/paths";

const values = [
  {
    icon: Heart,
    title: "Rodinná čestnost",
    desc: "Budujeme vztahy založené na důvěře a transparentnosti. Každý klient je pro nás partner, ne číslo v systému. Naše rodinné kořeny garantují osobní přístup ke každému případu.",
    accent: "gold",
  },
  {
    icon: Map,
    title: "Regionální expertíza",
    desc: "Znalost přeshraničního regionu Cheb-Bavorsko je naše DNA. Rozumíme české i německé legislativě a pomáháme firmám překonávat bariéry mezi oběma systémy.",
    accent: "cyan",
  },
  {
    icon: UserCheck,
    title: "Osobní přístup",
    desc: "Každého klienta známe jménem. Věnujeme se malým i středním podnikům, živnostníkům i fyzickým osobám pracujícím v Německu s maximální pozorností.",
    accent: "cyan",
  },
];

const offices = [
  {
    name: "Hlavní sídlo — Cheb",
    building: "Chebana",
    address: "Obrněné brigády 553/31",
    city: "350 02 Cheb",
    phone: "+420 354 433 005",
    type: "Centrála",
  },
  {
    name: "Pobočka — Plzeň",
    building: "Kolektiv Hub",
    address: "Kopeckého sady 329/8",
    city: "301 00 Plzeň",
    phone: "+420 354 433 005",
    type: "Pobočka",
  },
];

export default function AboutSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="o-nas"
      className="py-28 relative"
      ref={ref as React.RefObject<HTMLElement>}
    >
      {/* Subtle top border line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div
          className={`mb-16 text-center ${inView ? "animate-float-up" : "opacity-0"}`}
        >
          <div className="section-tag justify-center mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />O
            NÁS // HODNOTY
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Na čem <span className="text-gold">stavíme</span>
          </h2>
          <p className="mt-4 text-text-secondary text-lg max-w-2xl mx-auto">
            Jsme rodinná účetní firma z Chebu, která už více než 30 let
            poskytuje komplexní účetní služby. Kombinace tradičních hodnot a
            moderních technologií je naší cestou k dokonalosti.
          </p>
        </div>

        {/* Image + story row */}
        <div
          className={`mb-20 grid lg:grid-cols-2 gap-10 items-center ${inView ? "animate-float-up delay-100" : "opacity-0"}`}
        >
          <div className="relative group">
            <div
              className="absolute -inset-3 opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-700"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(0,229,255,0.2), transparent 70%)",
              }}
            />
            <div className="relative glass-panel p-2 overflow-hidden">
              <Image
                src={assetPath("/images/cheb/cheb-drone.jpg")}
                alt="Chebana - sídlo SCH-EKONOM"
                width={720}
                height={480}
                className="w-full h-auto object-cover"
                style={{ aspectRatio: "3/2" }}
              />
              <div className="absolute bottom-2 left-2 right-2 glass-panel-dark px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin size={12} className="text-cyan" />
                  <span
                    className="text-text-secondary"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                    }}
                  >
                    CHEBANA, CHEB
                  </span>
                </div>
                <span
                  className="text-text-muted"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  50.0735°N, 12.3702°E
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3
              className="text-white text-2xl sm:text-3xl font-bold mb-6"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Více než 30 let
              <br />
              <span className="text-gold">vašeho klidu</span>
            </h3>
            <div className="space-y-4 text-text-secondary text-base leading-relaxed">
              <p>
                SCH-EKONOM s.r.o. vznikl jako rodinná firma v Chebu a od svého
                založení se specializuje na komplexní účetní a daňové služby.
                Díky poloze v příhraničním regionu jsme se stali odborníky na
                přeshraniční problematiku CZ/DE.
              </p>
              <p>
                Dnes zaměstnáváme více než 40 specialistů ve dvou pobočkách — v
                Chebu a Plzni. Naším klientům poskytujeme plný servis od vedení
                účetnictví přes mzdovou agendu až po německé daňové poradenství.
              </p>
              <p>
                Věříme, že každý klient si zaslouží individuální přístup a
                maximální péči. Proto investujeme do moderních technologií a
                neustálého vzdělávání našeho týmu.
              </p>
            </div>
          </div>
        </div>

        {/* Value cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {values.map((value, i) => (
            <div
              key={value.title}
              className={`glass-panel p-8 relative group hover:border-cyan/25 transition-all duration-300 ${
                inView ? `animate-float-up delay-${(i + 1) * 200}` : "opacity-0"
              }`}
            >
              {/* Accent line top */}
              <div
                className={`absolute top-0 left-6 right-6 h-px ${
                  value.accent === "gold"
                    ? "bg-gradient-to-r from-transparent via-gold/40 to-transparent"
                    : "bg-gradient-to-r from-transparent via-cyan/40 to-transparent"
                }`}
              />

              <div
                className={`inline-flex p-3 border mb-6 ${
                  value.accent === "gold"
                    ? "border-gold/20 bg-gold/5"
                    : "border-cyan/20 bg-cyan/5"
                }`}
              >
                <value.icon
                  size={24}
                  className={
                    value.accent === "gold" ? "text-gold" : "text-cyan"
                  }
                />
              </div>

              <h3
                className="text-white text-xl font-semibold mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {value.title}
              </h3>

              <p className="text-text-muted text-sm leading-relaxed">
                {value.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Offices subsection */}
        <div
          className={`${inView ? "animate-float-up delay-600" : "opacity-0"}`}
        >
          <div className="section-tag mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            NAŠE KANCELÁŘE
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {offices.map((office) => (
              <div
                key={office.name}
                className="glass-panel p-6 flex gap-5 group hover:border-cyan/25 transition-all duration-300"
              >
                <div className="p-3 border border-cyan/15 bg-cyan/5 h-fit flex-shrink-0">
                  <Building2 size={22} className="text-cyan" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4
                      className="text-white font-semibold"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {office.name}
                    </h4>
                    <span className="hud-chip" data-tone="cyan">
                      {office.type}
                    </span>
                  </div>
                  <p className="text-text-muted text-sm mb-1">
                    {office.building}
                  </p>
                  <p className="text-text-secondary text-sm">
                    {office.address}
                  </p>
                  <p className="text-text-secondary text-sm">{office.city}</p>
                  <p className="text-cyan text-sm mt-2">{office.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
