"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Newspaper,
  Calendar,
  ArrowRight,
  TrendingUp,
  Gift,
  Heart,
  Scale,
  Sparkles,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";

const articles = [
  {
    id: 1,
    date: "15. ledna 2026",
    dateShort: "01/2026",
    icon: TrendingUp,
    title: "Novinky v personalistice a mzdovem ucetnictvi od 1. 1. 2026",
    titleDisplay: "Novinky v personalistice a mzdovém účetnictví od 1. 1. 2026",
    excerpt:
      "Přehled klíčových legislativních změn platných od nového roku — zvýšení minimální mzdy, nové sazby pojistného, změny v nemocenském pojištění a úpravy v oblasti zaměstnaneckých benefitů.",
    tags: ["Mzdy", "Legislativa", "2026"],
    fullContent: `Od 1. ledna 2026 dochází k významnému zvýšení minimální mzdy na 20 900 Kč měsíčně, což představuje nárůst o 1 400 Kč oproti roku 2025. S tím souvisí i zvýšení zaručených mezd ve všech skupinách prací. Zaměstnavatelé by měli zkontrolovat, zda mzdy všech zaměstnanců odpovídají novým minimálním úrovním, a případně provést úpravy mzdových výměrů.

V oblasti sociálního pojištění se mění sazba pojistného na nemocenské pojištění zaměstnanců, která nově činí 0,9 % z vyměřovacího základu. Současně se upravuje rozhodný příjem pro účast na nemocenském pojištění na 4 500 Kč. Pro zaměstnavatele to znamená nutnost aktualizovat mzdové systémy a zkontrolovat nastavení výpočtů pojistného.

Novinkou roku 2026 je rozšíření možností v oblasti zaměstnaneckých benefitů. Zvyšuje se limit pro osvobození příspěvků na stravování na 130 Kč za směnu, a nově je možné daňově zvýhodněně poskytovat příspěvky na sportovní aktivity dětí zaměstnanců. Změny se dotýkají i home-office paušálu, který se zvyšuje na 5,50 Kč za hodinu práce z domova.

Důležitou změnou je také nová povinnost elektronického podávání přehledů o výši pojistného. Od dubna 2026 budou zaměstnavatelé povinni zasílat měsíční přehledy výhradně elektronicky prostřednictvím datové schránky nebo portálu ČSSZ. Doporučujeme všem klientům ověřit funkčnost datových schránek a připravit se na přechod na elektronické podání.`,
  },
  {
    id: 2,
    date: "12. prosince 2025",
    dateShort: "12/2025",
    icon: Gift,
    title: "Vanocni firemni darky: Co je v roce 2025 danove uznatelne?",
    titleDisplay: "Vánoční firemní dárky: Co je v roce 2025 daňově uznatelné?",
    excerpt:
      "Blíží se Vánoce a s nimi i otázka, jaké dárky pro zaměstnance a obchodní partnery si můžete uplatnit jako daňový náklad. Přinášíme přehled aktuálních limitů a podmínek pro rok 2025.",
    tags: ["Daně", "Benefity", "Vánoce"],
    fullContent: `Vánoční dárky pro zaměstnance mohou být při správném nastavení daňově výhodné jak pro zaměstnavatele, tak pro zaměstnance. V roce 2025 platí, že nepeněžní plnění poskytovaná zaměstnancům z fondu kulturních a sociálních potřeb nebo ze sociálního fondu jsou na straně zaměstnance osvobozena od daně z příjmů do úhrnného limitu poloviny průměrné mzdy za rok, tedy přibližně 21 983 Kč.

Pro zaměstnavatele je klíčové rozlišovat mezi dárky pro zaměstnance a dárky pro obchodní partnery. Dárky pro obchodní partnery do hodnoty 500 Kč bez DPH na osobu za zdaňovací období jsou daňově uznatelné jako reklamní nebo propagační předměty, pokud jsou opatřeny logem firmy. Dárky vyšší hodnoty je nutné posuzovat individuálně jako náklady na reprezentaci, které obecně nejsou daňově uznatelné.

U zaměstnaneckých dárků doporučujeme využít formu nepeněžního plnění — poukázky na kulturu, sport, wellness nebo vzdělávání. Tyto benefity jsou pro zaměstnavatele daňově uznatelným nákladem a současně pro zaměstnance osvobozeny od daně z příjmů v rámci výše uvedeného limitu. Peněžní dárky (prémie, odměny) podléhají standardnímu zdanění a odvodům pojistného.

Pokud plánujete vánoční večírek pro zaměstnance, náklady na něj jsou daňově uznatelné za předpokladu, že se jedná o akci pro zaměstnance (nikoli obchodní partnery) a je financována z provozních prostředků firmy. Doporučujeme vést řádnou evidenci, kdo se akce zúčastnil, a uchovat doklady o vynaložených nákladech.`,
  },
  {
    id: 3,
    date: "20. listopadu 2025",
    dateShort: "11/2025",
    icon: Heart,
    title: 'SCH-EKONOM jako soucast projektu "Socialni auto"',
    titleDisplay: 'SCH-EKONOM jako součást projektu „Sociální auto"',
    excerpt:
      'S hrdostí oznamujeme naši účast v charitativním projektu „Sociální auto", který pomáhá zajistit mobilitu pro sociálně potřebné. Společenská odpovědnost je nedílnou součástí naší firemní kultury.',
    tags: ["CSR", "Charita", "Region"],
    fullContent: `Projekt „Sociální auto" je charitativní iniciativa zaměřená na zajištění dopravní dostupnosti pro seniory, osoby se zdravotním postižením a rodiny v tíživé životní situaci v Karlovarském kraji. Cílem projektu je poskytnout těmto lidem možnost dopravy k lékaři, na úřady nebo za rodinou, a to zdarma nebo za symbolický poplatek.

SCH-EKONOM se do projektu zapojil jako finanční partner a současně poskytuje bezplatné účetní poradenství neziskové organizaci, která projekt provozuje. Naši účetní pomáhají s vedením účetnictví projektu, zpracováním grantových žádostí a vyúčtováním dotací. Jsme přesvědčeni, že odborné znalosti mohou být stejně cenné jako finanční příspěvky.

Společenská odpovědnost je pro nás důležitou součástí firemní kultury. V regionu, kde působíme více než 30 let, chceme být nejen poskytovatelem kvalitních služeb, ale také aktivním členem komunity. Kromě projektu Sociální auto dlouhodobě podporujeme místní sportovní kluby, kulturní akce a vzdělávací programy pro mládež.

Pokud byste se chtěli k projektu přidat jako dobrovolníci nebo sponzoři, neváhejte nás kontaktovat. Rádi vám poskytneme více informací o tom, jak se zapojit a jaké jsou možnosti spolupráce. Každá pomoc se počítá a společně můžeme zlepšit kvalitu života v našem regionu.`,
  },
  {
    id: 4,
    date: "1. června 2025",
    dateShort: "06/2025",
    icon: Scale,
    title: "Zakonik prace 2025: Prehled klicovych zmen od 1. cervna",
    titleDisplay: "Zákoník práce 2025: Přehled klíčových změn od 1. června",
    excerpt:
      "Novela zákoníku práce přináší důležité změny v oblasti práce na dálku, dohod o pracích konaných mimo pracovní poměr a informační povinnosti zaměstnavatelů. Shrnujeme, co potřebujete vědět.",
    tags: ["Zákoník práce", "Novela", "HR"],
    fullContent: `Novela zákoníku práce účinná od 1. června 2025 přináší zásadní změny v oblasti práce na dálku (home-office). Zaměstnavatel je nově povinen písemně dohodnout podmínky práce na dálku, včetně rozvržení pracovní doby, způsobu zadávání úkolů a náhrady nákladů. Zaměstnanec pečující o dítě mladší 9 let nebo těhotná zaměstnankyně mají právo na práci na dálku, pokud tomu nebrání vážné provozní důvody.

Významné změny se dotýkají dohod o pracích konaných mimo pracovní poměr (DPP a DPČ). Zaměstnanci pracující na dohody mají nově nárok na dovolenou, jejíž výpočet se řídí stejnými pravidly jako u zaměstnanců v pracovním poměru. Dále se zavádí povinnost rozvrhovat pracovní dobu i u dohod, a to nejméně 3 dny předem, pokud se zaměstnavatel se zaměstnancem nedohodnou jinak.

Novela rozšiřuje informační povinnost zaměstnavatele. Zaměstnavatel je povinen písemně informovat zaměstnance o podstatných aspektech pracovního poměru nejpozději do 7 dnů od vzniku pracovního poměru. Informace musí zahrnovat údaje o délce dovolené, výpovědních dobách, odměňování, pracovní době a dalších podmínkách. Při vyslání zaměstnance do zahraničí přibývají další informační povinnosti.

Doporučujeme všem zaměstnavatelům revidovat interní dokumenty — pracovní smlouvy, vnitřní předpisy a dohody o práci na dálku — a uvést je do souladu s novou právní úpravou. Naši pracovněprávní poradci jsou připraveni pomoci s aktualizací dokumentace a zodpovědět vaše dotazy k nové legislativě.`,
  },
  {
    id: 5,
    date: "8. ledna 2025",
    dateShort: "01/2025",
    icon: Sparkles,
    title: "Zmeny a novinky pro rok 2025",
    titleDisplay: "Změny a novinky pro rok 2025",
    excerpt:
      "Komplexní přehled všech legislativních změn ovlivňujících podnikatele, zaměstnavatele i zaměstnance v roce 2025. Od daňových sazeb přes pojistné až po nové povinnosti v oblasti elektronizace.",
    tags: ["Legislativa", "Přehled", "2025"],
    fullContent: `Rok 2025 přináší řadu změn v daňové oblasti. Sazba daně z příjmů právnických osob zůstává na 21 %, avšak mění se pravidla pro uplatnění některých daňových odpočtů. Nově se zpřísňují podmínky pro odpočet na výzkum a vývoj — firmy budou muset dokládat výdaje podrobněji a evidovat je v reálném čase. Sleva na poplatníka se zvyšuje na 30 840 Kč ročně a strop pro solidární zvýšení daně se posouvá na čtyřnásobek průměrné mzdy.

V oblasti pojistného dochází ke zvýšení maximálního vyměřovacího základu pro sociální pojištění na 2 234 736 Kč ročně. Minimální zálohy pro OSVČ na sociální pojištění rostou na 3 852 Kč měsíčně a na zdravotní pojištění na 2 968 Kč měsíčně. Živnostníci by měli zkontrolovat nastavení trvalých příkazů a případně je aktualizovat.

Elektronizace státní správy pokračuje zavedením povinné elektronické komunikace s finančními úřady pro všechny plátce DPH. Od července 2025 budou daňová přiznání k DPH přijímána výhradně elektronicky. Současně se rozšiřuje povinnost elektronické evidence tržeb (EET) na další obory — nově se týká i poskytovatelů ubytovacích služeb a stravovacích zařízení.

Pro zaměstnavatele je důležitá změna v oblasti příspěvků na stravování. Od ledna 2025 se zvyšuje limit pro daňovou uznatelnost stravenkového paušálu na 116,20 Kč za směnu. Současně se mění pravidla pro poskytování stravenek — maximální nominální hodnota stravenky s plným daňovým zvýhodněním se zvyšuje na 170 Kč. Doporučujeme přehodnotit nastavení stravovacích benefitů ve vaší firmě.`,
  },
  {
    id: 6,
    date: "říjen 2024",
    dateShort: "10/2024",
    icon: MapPin,
    title: "Nova pobocka v Plzni otevrena",
    titleDisplay: "Nová pobočka v Plzni otevřena",
    excerpt:
      "Otevřeli jsme novou pobočku v Plzni v prostorách Kolektiv Hubu na Kopeckého sadech. Rozšiřujeme tak naše služby pro klienty v Plzeňském kraji a nabízíme osobní konzultace i mimo Cheb.",
    tags: ["Pobočka", "Plzeň", "Expanze"],
    fullContent: `S radostí oznamujeme otevření naší nové pobočky v Plzni, která se nachází v moderních prostorách Kolektiv Hubu na Kopeckého sadech 26. Tímto krokem rozšiřujeme naše služby do Plzeňského kraje a přibližujeme se klientům, kteří dosud museli za osobními konzultacemi dojíždět do Chebu.

Na plzeňské pobočce nabízíme kompletní portfolio našich služeb — od vedení účetnictví a daňového poradenství přes mzdovou agendu až po finanční analýzy a podnikové poradenství. Pobočka je otevřena každé úterý a čtvrtek od 9:00 do 16:00, v ostatní dny po předchozí domluvě. Osobní konzultace je možné sjednat telefonicky nebo e-mailem.

Kolektiv Hub je moderní coworkingový prostor, který sdružuje progresivní firmy a profesionály z různých oborů. Toto prostředí nám umožňuje nabídnout klientům nejen kvalitní služby, ale také komfortní zázemí pro osobní schůzky a poradenské konzultace. Prostory jsou plně bezbariérové a snadno dostupné městskou hromadnou dopravou i autem.

Otevření plzeňské pobočky je součástí naší dlouhodobé strategie regionální expanze. V budoucnu plánujeme rozšířit působnost i do dalších krajských měst. Pokud jste z Plzeňského kraje a máte zájem o naše služby, neváhejte nás kontaktovat. Rádi vám připravíme nezávaznou nabídku a představíme, jak vám můžeme pomoci s účetnictvím, daněmi a financemi.`,
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

function NewsCard({
  article,
  index,
  expanded,
  onToggle,
}: {
  article: (typeof articles)[0];
  index: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  const { ref, inView } = useInView(0.08);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`service-card p-0 overflow-hidden group cursor-pointer ${
        inView
          ? `animate-float-up delay-${((index % 3) + 1) * 100}`
          : "opacity-0"
      }`}
      onClick={onToggle}
    >
      {/* Date header strip */}
      <div className="px-8 pt-6 pb-4 border-b border-cyan/8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 border border-cyan/15 bg-cyan/5">
            <article.icon size={16} className="text-cyan/70" />
          </div>
          <div className="section-tag !text-[0.6rem]">
            <Calendar size={10} />
            {article.dateShort}
          </div>
        </div>
        <span
          className="text-text-muted"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.1em",
          }}
        >
          {article.date}
        </span>
      </div>

      {/* Content */}
      <div className="p-8">
        <h3
          className="text-white text-lg font-semibold mb-3 group-hover:text-cyan transition-colors leading-snug"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {article.titleDisplay}
        </h3>

        <p className="text-text-muted text-sm leading-relaxed mb-6">
          {article.excerpt}
        </p>

        {/* Expanded content */}
        <div
          className={`grid transition-all duration-500 ease-in-out ${
            expanded
              ? "grid-rows-[1fr] opacity-100 mb-6"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="text-text-secondary text-sm leading-relaxed whitespace-pre-line border-t border-cyan/8 pt-6">
              {article.fullContent}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {article.tags.map((tag) => (
            <span key={tag} className="hud-chip" data-tone="slate">
              {tag}
            </span>
          ))}
        </div>

        {/* Toggle button */}
        <button
          className="inline-flex items-center gap-2 text-cyan text-sm font-medium hover:gap-3 transition-all"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
        >
          {expanded ? "Skrýt" : "Číst dále"}
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </div>
  );
}

export default function AktualityPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page header */}
        <div className="mb-20 animate-float-up">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
            AKTUALITY // NOVINKY A LEGISLATIVA
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            <span className="text-cyan">Aktuality</span> a novinky
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-3xl leading-relaxed">
            Sledujeme legislativní změny, novinky v daňovém a účetním prostředí
            a sdílíme praktické informace pro podnikatele, zaměstnavatele i
            zaměstnance.
          </p>
        </div>

        {/* Newsletter CTA */}
        <FadeInSection className="mb-16">
          <div className="hud-panel p-8 rounded-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 border border-cyan/20 bg-cyan/8">
                  <Newspaper size={22} className="text-cyan" />
                </div>
                <div>
                  <h3
                    className="text-white font-semibold"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    Chcete mít přehled o změnách?
                  </h3>
                  <p className="text-text-muted text-sm mt-0.5">
                    Kontaktujte nás a zařadíme vás do našeho informačního
                    newsletteru.
                  </p>
                </div>
              </div>
              <Link href="/kontakt" className="btn-primary flex-shrink-0">
                Kontaktovat nás
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </FadeInSection>

        {/* Articles grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {articles.map((article, i) => (
            <NewsCard
              key={article.title}
              article={article}
              index={i}
              expanded={expandedId === article.id}
              onToggle={() =>
                setExpandedId((prev) =>
                  prev === article.id ? null : article.id,
                )
              }
            />
          ))}
        </div>

        {/* CTA */}
        <FadeInSection>
          <div className="text-center">
            <div className="glass-panel inline-block p-12 max-w-xl">
              <Newspaper size={32} className="text-cyan mx-auto mb-5" />
              <h3
                className="text-white text-2xl font-semibold mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Potřebujete poradit?
              </h3>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Máte dotaz k aktuálním legislativním změnám nebo potřebujete
                poradit s jejich dopadem na vaše podnikání? Ozvěte se nám.
              </p>
              <Link href="/kontakt" className="btn-primary">
                Domluvit konzultaci
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
