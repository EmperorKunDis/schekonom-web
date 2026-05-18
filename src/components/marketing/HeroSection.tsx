"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, FileText, Calculator, Wallet, Globe } from "lucide-react";
import { assetPath } from "@/lib/paths";

const stats = [
  { value: "30+", label: "Let praxe" },
  { value: "40+", label: "Zaměstnanců" },
  { value: "2", label: "Pobočky (Cheb & Plzeň)" },
  { value: "340+", label: "Klientů" },
];

const badges = [
  { icon: FileText, label: "Daňové poradenství" },
  { icon: Calculator, label: "Účetnictví" },
  { icon: Wallet, label: "Mzdy" },
  { icon: Globe, label: "CZ / DE" },
];

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Slow zoom effect on video
  const videoScale = 1 + scrollY * 0.0002;
  const overlayOpacity = Math.min(0.85, 0.55 + scrollY * 0.0003);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: `scale(${videoScale})`,
            transformOrigin: "center center",
            willChange: "transform",
          }}
        >
          <source src={assetPath("/video/hero.mp4")} type="video/mp4" />
        </video>
      </div>

      {/* Dark gradient overlay on top of video */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `linear-gradient(180deg, rgba(3,8,13,${overlayOpacity}) 0%, rgba(3,8,13,0.70) 40%, rgba(3,8,13,0.85) 70%, rgba(3,8,13,0.97) 100%)`,
        }}
      />

      {/* Cinematic side gradients */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 70% at 20% 50%, rgba(0,229,255,0.06) 0%, transparent 70%), radial-gradient(ellipse 35% 50% at 85% 30%, rgba(212,175,55,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Grid bg subtle */}
      <div className="absolute inset-0 z-[2] grid-bg opacity-15 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
        {/* Section tag */}
        <div className="section-tag opacity-0 animate-float-up mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
          SCH-EKONOM &nbsp;// &nbsp;30+ LET ZKUŠENOSTÍ &nbsp;// &nbsp;CHEB &
          PLZEŇ
        </div>

        {/* Heading */}
        <h1
          className="opacity-0 animate-float-up delay-100 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.06] tracking-tight text-white max-w-4xl"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Ušetřete si čas
          <br />
          i&nbsp;starosti s&nbsp;
          <span className="text-cyan">účetnictvím</span>
          <br />
          a&nbsp;daňovými <span className="text-gold">povinnostmi.</span>
        </h1>

        {/* Subtitle */}
        <p className="opacity-0 animate-float-up delay-200 mt-7 text-text-secondary text-lg sm:text-xl leading-relaxed max-w-2xl">
          Jsme rodinná účetní firma z Chebu, která už více než 30 let poskytuje
          komplexní účetní služby pro malé i střední podniky, ale rádi se
          věnujeme také živnostníkům nebo fyzickým osobám pracujícím v Německu.
        </p>

        {/* Badges */}
        <div className="opacity-0 animate-float-up delay-300 mt-8 flex flex-wrap gap-3">
          {badges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2.5 px-4 py-2.5 border border-cyan/15 bg-cyan/5 hover:border-cyan/30 hover:bg-cyan/8 transition-all duration-300"
            >
              <badge.icon size={14} className="text-cyan" />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
                className="text-text-secondary"
              >
                {badge.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="opacity-0 animate-float-up delay-400 mt-10 flex flex-wrap gap-4">
          <Link href="#sluzby" className="btn-primary">
            Zobrazit služby
            <ArrowRight size={16} />
          </Link>
          <Link href="#kontakt" className="btn-ghost">
            Kontaktujte nás
          </Link>
        </div>

        {/* Bottom HUD stats */}
        <div className="opacity-0 animate-float-up delay-600 mt-24 grid grid-cols-2 md:grid-cols-4 gap-px bg-cyan/10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-void-deep/80 backdrop-blur-sm px-6 py-5 text-center"
            >
              <div
                className="text-cyan text-2xl sm:text-3xl font-bold"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {stat.value}
              </div>
              <div
                className="mt-1 text-text-muted"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-0 animate-float-up delay-800">
        <div className="flex flex-col items-center gap-2">
          <span
            className="text-text-muted"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-cyan/40 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
