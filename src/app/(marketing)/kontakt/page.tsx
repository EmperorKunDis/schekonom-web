"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Building2,
  Users,
  ExternalLink,
  FileText,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";

const chebOffice = {
  name: "Cheb — hlavní kancelář",
  company: "SCH-EKONOM s.r.o.",
  building: "Chebana",
  street: "Obrněné brigády 553/31",
  city: "350 02 Cheb",
  image: "/images/cheb/Chebana_dron_edited.jpg",
};

const plzenOffice = {
  name: "Plzeň — pobočka",
  building: "Kolektiv Hub",
  street: "Kopeckého sady 329/8",
  city: "301 00 Plzeň",
  image: "/images/office/office-01.jpg",
};

const departments = [
  {
    label: "Recepce / obecné dotazy",
    phone: "+420 354 433 005",
    email: "mail@schekonom.cz",
  },
  {
    label: "Účetní oddělení",
    phone: "+420 354 433 007",
    email: "mail@schekonom.cz",
  },
  {
    label: "Německé daně",
    phone: "+420 351 011 820",
    email: "nemecko@schekonom.cz",
  },
  {
    label: "Linka Německo",
    phone: "+49 9632 92312 15",
    email: "nemecko@schekonom.cz",
  },
];

const serviceOptions = [
  "Účetnictví a outsourcing",
  "Daňové poradenství",
  "Mzdové účetnictví",
  "Německé daně — Steuererklärung",
  "Německé daně — Freistellung",
  "Německé daně — Kindergeld",
  "Přeshraniční CZ/DE poradenství",
  "Certifikační autorita / eIDAS",
  "AI Finanční analýza",
  "AI Reporting",
  "Jiné",
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com/schekonom",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/sch.ekonom/",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/schekonom",
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

export default function KontaktPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate network delay for realism
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    setSubmitted(true);
    setForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: "",
    });
    // Auto-hide after 6s
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-20 animate-float-up">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            KONTAKT // SPOJENÍ
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Kontaktujte <span className="text-cyan">nás</span>
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-2xl leading-relaxed">
            Nezávazná konzultace zdarma. Odpovídáme do 24 hodin v pracovních
            dnech. Preferujete osobní setkání? Jsme v centru Chebu i v Plzni.
          </p>
        </div>

        {/* Two offices side by side */}
        <FadeInSection className="mb-16">
          <div className="section-tag mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            KANCELÁŘE // 2 POBOČKY
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Cheb office */}
            <div className="service-card p-0 overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={chebOffice.image}
                  alt="Kancelar SCH-EKONOM Cheb — budova Chebana"
                  width={640}
                  height={300}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(3,8,13,0.95)] via-[rgba(3,8,13,0.4)] to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                  <h3
                    className="text-white text-lg font-semibold"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {chebOffice.name}
                  </h3>
                  <span className="hud-chip" data-tone="cyan">
                    Hlavní kancelář
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-start gap-3">
                  <Building2
                    size={15}
                    className="text-cyan/60 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <div className="text-white text-sm font-medium">
                      {chebOffice.company}
                    </div>
                    <div className="text-text-muted text-sm">
                      {chebOffice.building}, {chebOffice.street}
                    </div>
                    <div className="text-text-muted text-sm">
                      {chebOffice.city}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={15} className="text-cyan/60 flex-shrink-0" />
                  <a
                    href="tel:+420354433005"
                    className="text-text-secondary text-sm hover:text-white transition-colors"
                  >
                    +420 354 433 005
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={15} className="text-cyan/60 flex-shrink-0" />
                  <a
                    href="mailto:mail@schekonom.cz"
                    className="text-text-secondary text-sm hover:text-white transition-colors"
                  >
                    mail@schekonom.cz
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={15} className="text-cyan/60 flex-shrink-0" />
                  <span className="text-text-muted text-sm">
                    Po-Čt 7:00-15:30, Pá 7:00-14:00
                  </span>
                </div>
              </div>
            </div>

            {/* Plzen office */}
            <div className="service-card p-0 overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={plzenOffice.image}
                  alt="Kancelar SCH-EKONOM Plzen — Kolektiv Hub"
                  width={640}
                  height={300}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(3,8,13,0.95)] via-[rgba(3,8,13,0.4)] to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                  <h3
                    className="text-white text-lg font-semibold"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {plzenOffice.name}
                  </h3>
                  <span className="hud-chip" data-tone="green">
                    Pobočka
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-start gap-3">
                  <Building2
                    size={15}
                    className="text-cyan/60 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <div className="text-white text-sm font-medium">
                      {plzenOffice.building}
                    </div>
                    <div className="text-text-muted text-sm">
                      {plzenOffice.street}
                    </div>
                    <div className="text-text-muted text-sm">
                      {plzenOffice.city}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={15} className="text-cyan/60 flex-shrink-0" />
                  <a
                    href="tel:+420354433005"
                    className="text-text-secondary text-sm hover:text-white transition-colors"
                  >
                    +420 354 433 005
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={15} className="text-cyan/60 flex-shrink-0" />
                  <span className="text-text-muted text-sm">Po dohodě</span>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Departments */}
        <FadeInSection className="mb-16">
          <div className="section-tag mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            ODDĚLENÍ // PŘÍMÉ KONTAKTY
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {departments.map((dept) => (
              <div
                key={dept.label}
                className="glass-panel p-5 group hover:border-cyan/25 transition-all"
              >
                <div
                  className="text-text-muted mb-3"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {dept.label}
                </div>
                <a
                  href={`tel:${dept.phone.replace(/\s/g, "")}`}
                  className="block text-white text-sm font-medium hover:text-cyan transition-colors mb-1"
                >
                  {dept.phone}
                </a>
                <a
                  href={`mailto:${dept.email}`}
                  className="block text-text-secondary text-sm hover:text-white transition-colors"
                >
                  {dept.email}
                </a>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* Main content: form + sidebar */}
        <FadeInSection className="mb-20">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Contact form */}
            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="hud-panel p-8 rounded-sm space-y-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Send size={14} className="text-cyan" />
                  <span
                    className="text-cyan"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                    }}
                  >
                    Kontaktni formular
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-text-muted mb-2"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      Jméno a příjmení *
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="hud-input"
                      placeholder="Jan Novák"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-text-muted mb-2"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="hud-input"
                      placeholder="jan@firma.cz"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-text-muted mb-2"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="hud-input"
                      placeholder="+420 ..."
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-company"
                      className="block text-text-muted mb-2"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      Firma / IČO
                    </label>
                    <input
                      type="text"
                      id="contact-company"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      className="hud-input"
                      placeholder="Název firmy nebo IČO"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-service"
                    className="block text-text-muted mb-2"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    O jakou službu máte zájem?
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="hud-input"
                  >
                    <option value="">Vyberte službu...</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-text-muted mb-2"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    Vaše zpráva *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    className="hud-input resize-none"
                    placeholder="Popište váš požadavek nebo otázku..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="btn-primary w-full justify-center"
                  style={{ opacity: sending ? 0.7 : 1 }}
                >
                  <Send
                    size={16}
                    style={{
                      animation: sending ? "spin 1s linear infinite" : "none",
                    }}
                  />
                  {sending ? "Odesílám..." : "Odeslat zprávu"}
                </button>

                {submitted && (
                  <div
                    className="flex items-start gap-3 p-4"
                    style={{
                      background: "rgba(0,229,160,0.08)",
                      border: "1px solid rgba(0,229,160,0.3)",
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(0,229,160,0.15)",
                        border: "1px solid rgba(0,229,160,0.3)",
                        flexShrink: 0,
                      }}
                    >
                      <Send size={13} style={{ color: "#00E5A0" }} />
                    </div>
                    <div>
                      <div
                        style={{
                          color: "#00E5A0",
                          fontWeight: 600,
                          fontSize: "0.88rem",
                          marginBottom: 3,
                        }}
                      >
                        Zpráva odeslána
                      </div>
                      <div
                        style={{
                          color: "#B8C1C8",
                          fontSize: "0.8rem",
                          lineHeight: 1.5,
                        }}
                      >
                        Děkujeme za váš zájem. Ozveme se do 24 hodin v
                        pracovních dnech.
                      </div>
                    </div>
                  </div>
                )}

                <p
                  className="text-text-muted text-center"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.08em",
                  }}
                >
                  Odesláním souhlasíte se zpracováním osobních údajů dle GDPR.
                  Vaše údaje zpracováváme výhradně pro účely odpovědi na váš
                  dotaz.
                </p>
              </form>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Legal info */}
              <div className="glass-panel p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText size={14} className="text-gold" />
                  <span
                    className="text-gold"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                    }}
                  >
                    Udaje o spolecnosti
                  </span>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Obchodní firma", value: "SCH-EKONOM s.r.o." },
                    { label: "IČO", value: "64832694" },
                    { label: "DIČ", value: "CZ64832694" },
                    {
                      label: "Spisová značka",
                      value: "C 7431 vedená u Krajského soudu v Plzni",
                    },
                    {
                      label: "Sídlo",
                      value: "Obrněné brigády 553/31, 350 02 Cheb",
                    },
                  ].map((item) => (
                    <div key={item.label}>
                      <div
                        className="text-text-muted"
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.55rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        {item.label}
                      </div>
                      <div className="text-white text-sm">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Opening hours */}
              <div className="glass-panel p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={14} className="text-cyan" />
                  <span
                    className="text-cyan"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                    }}
                  >
                    Uredni hodiny — Cheb
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    { day: "Pondělí", hours: "7:00 — 15:30" },
                    { day: "Úterý", hours: "7:00 — 15:30" },
                    { day: "Středa", hours: "7:00 — 15:30" },
                    { day: "Čtvrtek", hours: "7:00 — 15:30" },
                    { day: "Pátek", hours: "7:00 — 14:00" },
                    { day: "Sobota — Neděle", hours: "Zavřeno" },
                  ].map((item) => (
                    <div
                      key={item.day}
                      className="flex justify-between items-center"
                    >
                      <span className="text-text-secondary text-sm">
                        {item.day}
                      </span>
                      <span
                        className={`text-sm ${item.hours === "Zavřeno" ? "text-text-muted" : "text-white"}`}
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social media */}
              <div className="glass-panel p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users size={14} className="text-cyan" />
                  <span
                    className="text-cyan"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                    }}
                  >
                    Socialni site
                  </span>
                </div>
                <div className="flex gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 border border-cyan/15 bg-cyan/5 hover:border-cyan/30 hover:bg-cyan/10 transition-all group"
                      title={link.label}
                    >
                      <ExternalLink
                        size={12}
                        className="text-cyan/50 group-hover:text-cyan transition-colors"
                      />
                      <span
                        className="text-text-muted group-hover:text-text-secondary transition-colors"
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        {link.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="glass-panel p-4">
                <div className="aspect-video bg-void-light flex items-center justify-center border border-cyan/8 relative overflow-hidden">
                  <div className="absolute inset-0 grid-bg opacity-30" />
                  <div className="text-center relative z-10">
                    <MapPin size={24} className="text-cyan/40 mx-auto mb-2" />
                    <span
                      className="text-text-muted block"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.1em",
                      }}
                    >
                      INTERAKTIVNI MAPA
                    </span>
                    <span
                      className="text-text-muted block mt-1"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.55rem",
                        letterSpacing: "0.08em",
                      }}
                    >
                      50.0735°N, 12.3703°E
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
