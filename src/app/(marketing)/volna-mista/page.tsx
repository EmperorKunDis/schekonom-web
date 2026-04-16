"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  MapPin,
  Banknote,
  ArrowRight,
  Mail,
  Phone,
  Users,
  CheckCircle2,
  Clock,
  Building2,
  ChevronDown,
  Star,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";

const positions = [
  {
    code: "POS-001",
    title: "Vedouci ucetniho oddeleni",
    titleDisplay: "Vedoucí účetního oddělení",
    salary: "50 000 - 85 000 Kč",
    location: "Cheb",
    type: "Plný úvazek",
    desc: "Hledame zkuseneho vedouciho ucetniho oddeleni, ktery prevezme odpovednost za vedeni tymu ucetnich a zajisteni kvality ucetnich sluzeb pro nase klienty.",
    descDisplay:
      "Hledáme zkušeného vedoucího účetního oddělení, který převezme odpovědnost za vedení týmu účetních a zajištění kvality účetních služeb pro naše klienty.",
    requirements: [
      "Minimálně 5 let praxe v účetnictví",
      "Zkušenost s vedením týmu",
      "Znalost české daňové legislativy",
      "Komunikativnost a organizační schopnosti",
      "Aktivní znalost účetního softwaru (POHODA, Money S3 nebo podobný)",
      "Schopnost plánovat a řídit práci týmu v termínech",
      "Orientace v oblasti DPH, daně z příjmů PO a FO",
    ],
    fullDescription: `Jako vedoucí účetního oddělení budete zodpovídat za řízení týmu 8–10 účetních, kteří zpracovávají kompletní účetnictví pro portfolio přibližně 120 klientů. Vaší hlavní úlohou bude zajistit kvalitu a včasnost zpracování účetních agend, koordinovat práci týmu a být odborným garantem pro složitější účetní případy.

Budete se podílet na rozvoji interních procesů a implementaci nových technologií do účetní praxe. Naše firma aktivně investuje do digitalizace a automatizace — očekáváme, že přinesete svůj pohled na efektivitu práce a pomůžete nám s přechodem na modernější způsoby zpracování účetnictví.

Pozice zahrnuje i komunikaci s klienty na strategické úrovni — účast na schůzkách s klíčovými klienty, prezentace výsledků hospodaření a poradenství v oblasti účetní optimalizace. Spolupracovat budete úzce s daňovými poradci a vedením firmy.

Nabízíme zázemí stabilní firmy s více než 30letou historií, přátelský kolektiv a reálnou možnost kariérního růstu. Pozice je vhodná pro zkušeného účetního, který chce posunout svou kariéru do manažerské role a podílet se na rozvoji moderní účetní firmy.`,
    weOffer: [
      "Mzda 50 000 – 85 000 Kč dle zkušeností",
      "5 týdnů dovolené",
      "Příspěvek na stravování a penzijní připojištění",
      "Flexibilní pracovní doba s možností home-office",
      "Moderní kancelářské prostory v budově Chebana",
      "Průběžné vzdělávání a účast na odborných seminářích",
      "Služební notebook a telefon",
      "Možnost podílet se na strategickém rozvoji firmy",
    ],
    highlight: true,
  },
  {
    code: "POS-002",
    title: "Datovy analytik",
    titleDisplay: "Datový analytik",
    salary: "50 000 - 85 000 Kč",
    location: "Cheb",
    type: "Plný úvazek",
    desc: "Hledame datoveho analytika pro vyvoj a spravu nasich internich analytickych nastroju a AI platformy pro financni analyzu.",
    descDisplay:
      "Hledáme datového analytika pro vývoj a správu našich interních analytických nástrojů a AI platformy pro finanční analýzu.",
    requirements: [
      "Znalost SQL, Python nebo R",
      "Zkušenost s datovou vizualizací",
      "Analytické myšlení a pozornost k detailu",
      "Výhodou: zkušenost s účetními/finančními daty",
      "Zkušenost s nástroji pro BI (Power BI, Metabase, Grafana)",
      "Základní znalost statistických metod a modelování",
      "Schopnost komunikovat výsledky analýz srozumitelně netechnickému publiku",
      "Zkušenost s ETL procesy a datovými pipeline",
    ],
    fullDescription: `Hledáme datového analytika, který se stane klíčovým členem našeho technologického týmu. Budete mít na starosti vývoj a správu interních analytických nástrojů, které používáme pro finanční analýzu portfolia klientů, predikci cash-flow a automatizované reportování.

Naše firma se odlišuje od tradičních účetních kanceláří aktivním využíváním dat a technologií. Vyvíjíme vlastní AI platformu pro analýzu účetních dat, detekci anomálií a automatizované generování manažerských reportů. Jako datový analytik budete mít přímý vliv na podobu těchto nástrojů a na způsob, jakým naši klienti pracují s finančními daty.

Denní práce zahrnuje zpracování a čištění dat z účetních systémů, tvorbu dashboardů a vizualizací, přípravu ad-hoc analýz pro klienty a spolupráci s účetními na interpretaci dat. Budete pracovat s reálnými finančními daty stovek firem, což poskytuje unikátní pohled na ekonomiku malých a středních podniků v regionu.

Pozice je ideální pro analytika, který hledá prostředí, kde může mít přímý dopad na produkt a kde nejsou jen „další kolečko v soukolí". Pracujeme v malém technologickém týmu s plochou hierarchií a rychlým rozhodováním.`,
    weOffer: [
      "Mzda 50 000 – 85 000 Kč dle zkušeností a dovedností",
      "Práce na vlastním produktu s reálným dopadem",
      "Moderní technologický stack (Python, PostgreSQL, Next.js)",
      "Flexibilní pracovní doba a možnost remote práce",
      "5 týdnů dovolené",
      "Budget na vzdělávání a konference",
      "Služební notebook dle vlastního výběru",
      "Přátelský tým bez korporátní byrokracie",
    ],
    highlight: true,
  },
  {
    code: "POS-003",
    title: "Financni ucetni senior",
    titleDisplay: "Finanční účetní senior",
    salary: "25 000 - 40 000 Kč",
    location: "Cheb",
    type: "Plný úvazek",
    desc: "Zkuseny ucetni pro samostatne vedeni ucetnictvi portfolia klientu vcetne zpracovani danovych priznani a ucetnich zaverek.",
    descDisplay:
      "Zkušený účetní pro samostatné vedení účetnictví portfolia klientů včetně zpracování daňových přiznání a účetních závěrek.",
    requirements: [
      "Minimálně 3 roky praxe v účetnictví",
      "Znalost podvojného účetnictví a daňové evidence",
      "Zkušenost s účetním softwarem",
      "Samostatnost a spolehlivost",
      "Znalost legislativy v oblasti DPH a daně z příjmů",
      "Zkušenost se zpracováním účetních závěrek",
      "Pečlivost a schopnost dodržovat termíny",
    ],
    fullDescription: `Na pozici seniorního finančního účetního budete samostatně vést účetnictví pro portfolio 15–20 klientů z různých oborů podnikání. Práce zahrnuje kompletní zpracování podvojného účetnictví a daňové evidence, přípravu přiznání k DPH, silniční dani, dani z nemovitostí a dalších daňových povinností.

Klíčovou součástí práce je zpracování ročních účetních závěrek a příprava podkladů pro daňová přiznání k dani z příjmů. Spolupracovat budete s daňovými poradci, kteří vám poskytnou odbornou podporu u složitějších případů. Budete mít možnost konzultovat problematické účetní případy s vedoucím oddělení i externími odborníky.

Očekáváme schopnost samostatné práce a zodpovědný přístup k termínům. Naši klienti oceňují proaktivní přístup — pokud při zpracování účetnictví identifikujete prostor pro optimalizaci, očekáváme, že klienta upozorníte a navrhnete řešení. Komunikace s klienty je běžnou součástí práce.

Nabízíme stabilní zaměstnání v přátelském kolektivu s možností profesního růstu. Podporujeme vzdělávání zaměstnanců formou interních školení i externích seminářů a kurzů.`,
    weOffer: [
      "Mzda 25 000 – 40 000 Kč dle zkušeností",
      "5 týdnů dovolené",
      "Příspěvek na stravování",
      "Flexibilní pracovní doba",
      "Možnost částečného home-office po zapracování",
      "Průběžné vzdělávání a profesní rozvoj",
      "Přátelský kolektiv a rodinná atmosféra",
    ],
    highlight: false,
  },
  {
    code: "POS-004",
    title: "Financni ucetni junior",
    titleDisplay: "Finanční účetní junior",
    salary: "25 000 - 30 000 Kč",
    location: "Cheb",
    type: "Plný úvazek",
    desc: "Pozice vhodna pro absolventy nebo ucetni s kratsi praxi, kteri chtejí rust v oboru ucetnictvi pod vedenim zkusenych kolegu.",
    descDisplay:
      "Pozice vhodná pro absolventy nebo účetní s kratší praxí, kteří chtějí růst v oboru účetnictví pod vedením zkušených kolegů.",
    requirements: [
      "SŠ/VŠ vzdělání ekonomického směru",
      "Základní znalost účetnictví",
      "Chuť učit se a rozvíjet",
      "Pečlivost a zodpovědnost",
      "Znalost práce s PC (MS Office, zejména Excel)",
      "Komunikativnost a týmový duch",
    ],
    fullDescription: `Juniorní pozice finančního účetního je ideální startovací bod pro absolventy ekonomických škol nebo účetní s kratší praxí, kteří chtějí získat komplexní zkušenosti v oboru. Budete pracovat pod vedením zkušených seniorních účetních, kteří vám předají své znalosti a pomůžou vám růst.

Zpočátku se budete věnovat jednodušším agendám — zpracování prvotních dokladů, účtování faktur, bankovních výpisů a pokladních dokladů. Postupně přeberete zodpovědnost za kompletní vedení účetnictví menších klientů a naučíte se zpracovávat přiznání k DPH a další daňové povinnosti.

Naše firma je známá kvalitním zaškolením nových kolegů. Máme propracovaný systém mentoringu, kde každý junior má přiděleného zkušeného kolegu, na kterého se může kdykoli obrátit. Pravidelně pořádáme interní školení zaměřená na aktuální legislativní změny a praktické účetní postupy.

Pokud jste šikovní a motivovaní, kariérní postup je u nás reálný a poměrně rychlý. Mnoho našich současných seniorních účetních a vedoucích začínalo na juniorních pozicích. Nabízíme prostředí, kde se můžete učit od nejlepších v oboru.`,
    weOffer: [
      "Mzda 25 000 – 30 000 Kč s možností rychlého růstu",
      "Propracovaný systém zaškolení a mentoring",
      "5 týdnů dovolené",
      "Příspěvek na stravování",
      "Možnost profesního růstu na seniorní pozici",
      "Přátelský kolektiv ochotný pomoci",
    ],
    highlight: false,
  },
  {
    code: "POS-005",
    title: "Asistent/ka danoveho poradce",
    titleDisplay: "Asistent/ka daňového poradce",
    salary: null,
    location: "Cheb",
    type: "Plný úvazek",
    desc: "Podpora danovych poradcu pri priprave danovych priznani, analyze legislativnich zmen a komunikaci s financnimi urady.",
    descDisplay:
      "Podpora daňových poradců při přípravě daňových přiznání, analýze legislativních změn a komunikaci s finančními úřady.",
    requirements: [
      "VŠ vzdělání (ekonomie, právo nebo příbuzný obor)",
      "Zájem o daňovou problematiku",
      "Analytické myšlení",
      "Znalost AJ nebo NJ výhodou",
      "Pečlivost a schopnost práce s legislativními texty",
      "Dobré komunikační a organizační schopnosti",
      "Znalost základů daňového práva (DPH, DPPO, DPFO)",
    ],
    fullDescription: `Pozice asistenta daňového poradce nabízí unikátní příležitost nahlédnout do světa daňového poradenství a postupně se vypracovat na samostatného daňového specialistu. Budete pracovat přímo pod vedením certifikovaných daňových poradců a podílet se na přípravě daňových přiznání, analýze daňových dopadů obchodních transakcí a komunikaci s finančními úřady.

Vaší hlavní náplní bude příprava podkladů pro daňová přiznání k dani z příjmů právnických a fyzických osob, kontrolních hlášení a souhrnných hlášení k DPH. Budete se podílet na rešerších aktuální judikatury a stanovisek finanční správy, sledování legislativních změn a přípravě informačních materiálů pro klienty.

Důležitou součástí práce je komunikace s finančními úřady — podávání daňových přiznání, vyřizování výzev k odstranění pochybností a zastupování klientů při daňových kontrolách. Postupně se naučíte samostatně řešit běžné daňové situace a komunikovat s úřady.

Pro zájemce o složení kvalifikační zkoušky daňového poradce nabízíme podporu formou studijního volna a úhrady nákladů na přípravu. Několik našich současných daňových poradců začínalo právě na pozici asistenta.`,
    weOffer: [
      "Práce pod vedením certifikovaných daňových poradců",
      "Podpora při přípravě na zkoušku daňového poradce",
      "5 týdnů dovolené",
      "Příspěvek na stravování a vzdělávání",
      "Flexibilní pracovní doba",
      "Přístup k odborné literatuře a databázím",
      "Možnost kariérního růstu na pozici daňového poradce",
    ],
    highlight: false,
  },
  {
    code: "POS-006",
    title: "Asistentka / recepcni danove kancelare",
    titleDisplay: "Asistentka / recepční daňové kanceláře",
    salary: null,
    location: "Cheb",
    type: "Plný úvazek",
    desc: "Prvni kontakt pro nase klienty. Zajisteni hladkeho chodu kancelare, komunikace s klienty a administrativa.",
    descDisplay:
      "První kontakt pro naše klienty. Zajištění hladkého chodu kanceláře, komunikace s klienty a administrativa.",
    requirements: [
      "Příjemné vystupování a komunikativnost",
      "Organizační schopnosti",
      "Znalost práce s PC (MS Office)",
      "Znalost NJ výhodou",
      "Spolehlivost a diskrétnost",
      "Schopnost práce pod časovým tlakem",
      "Zkušenost s administrativní prací výhodou",
    ],
    fullDescription: `Jako asistentka a recepční daňové kanceláře budete prvním kontaktním bodem pro naše klienty. Vaše role je klíčová pro celkový dojem, který si klient z návštěvy naší kanceláře odnese. Hledáme pozitivního a organizovaného člověka, který zvládne multitasking a udrží přehled v rychle se měnícím prostředí.

Náplň práce zahrnuje přijímání a evidenci pošty a dokumentů od klientů, správu spisů a archivaci, organizaci schůzek a správu kalendářů poradců, přípravu podkladů pro jednání s klienty a základní administrativní podporu celé kanceláře. Budete také zodpovídat za objednávání kancelářských potřeb a komunikaci s dodavateli.

Důležitou součástí práce je telefonická a e-mailová komunikace s klienty — přijímání dotazů, přesměrování na správného poradce a poskytování základních informací o stavu zpracování. Vzhledem k blízkosti německých hranic je znalost němčiny výhodou, ale není podmínkou.

Nabízíme příjemné pracovní prostředí v moderní budově Chebana v centru Chebu, stabilní pracovní dobu a přátelský kolektiv. Pozice je vhodná i pro kandidáty bez předchozí zkušenosti v účetní firmě — důležitější je pro nás pozitivní přístup a ochota učit se.`,
    weOffer: [
      "Stabilní pracovní doba (Po–Pá)",
      "Příjemné pracovní prostředí v centru Chebu",
      "5 týdnů dovolené",
      "Příspěvek na stravování",
      "Přátelský kolektiv",
      "Možnost naučit se základy účetnictví a daní",
    ],
    highlight: false,
  },
  {
    code: "POS-007",
    title: "IT Junior",
    titleDisplay: "IT Junior",
    salary: null,
    location: "Cheb",
    type: "Plný úvazek",
    desc: "Sprava IT infrastruktury, podpora uzivatelu a ucast na vyvoji internich nastroju a automatizaci procesu.",
    descDisplay:
      "Správa IT infrastruktury, podpora uživatelů a účast na vývoji interních nástrojů a automatizaci procesů.",
    requirements: [
      "Základní znalost sítí a serverové infrastruktury",
      "Znalost Windows/Linux prostředí",
      "Chuť učit se nové technologie",
      "Výhodou: zkušenost s webovými technologiemi",
      "Základy skriptování (Bash, PowerShell nebo Python)",
      "Schopnost řešit problémy a hledat řešení",
      "Komunikativnost a trpělivost při podpoře uživatelů",
      "Zájem o automatizaci a moderní technologie",
    ],
    fullDescription: `Pozice IT Junior je vstupní branou do technologického týmu účetní firmy, která aktivně investuje do digitalizace a automatizace. Budete se podílet na správě IT infrastruktury pro 40+ zaměstnanců, včetně serverů, sítí, pracovních stanic a tiskáren, a současně se zapojíte do vývoje interních nástrojů.

Denní práce zahrnuje technickou podporu uživatelů (helpdesk), správu a údržbu serverové infrastruktury, zálohování dat, správu uživatelských účtů a oprávnění, a řešení běžných IT problémů. Postupně se zapojíte i do zajímavějších projektů — automatizace procesů pomocí skriptů, integrace účetních systémů a správa webových aplikací.

Naše firma se technologicky výrazně liší od běžných účetních kanceláří. Používáme moderní nástroje — od cloudových služeb přes automatizační platformy (N8N) až po vlastní webové aplikace postavené na Next.js a PostgreSQL. Jako IT Junior budete mít příležitost seznámit se s celým spektrem technologií a najít si oblast, která vás baví nejvíce.

Hledáme někoho, kdo je zvídavý, nebojí se zkoušet nové věci a dokáže komunikovat s netechnickými kolegy. Předchozí pracovní zkušenost není podmínkou — důležitější je motivace a ochota učit se. Nabízíme mentoring od zkušených kolegů a prostor pro profesní růst.`,
    weOffer: [
      "Široké spektrum technologií k naučení",
      "Mentoring od zkušených kolegů",
      "5 týdnů dovolené",
      "Příspěvek na stravování",
      "Flexibilní pracovní doba",
      "Budget na vzdělávání a certifikace",
      "Služební notebook",
      "Možnost podílet se na vývoji vlastních produktů",
    ],
    highlight: false,
  },
  {
    code: "POS-008",
    title: "Mzdovy ucetni junior",
    titleDisplay: "Mzdový účetní junior",
    salary: null,
    location: "Cheb",
    type: "Plný úvazek",
    desc: "Zpracovani mezd, personalni administrativa a komunikace s institucemi pod vedenim zkusenych mzdovych ucetnich.",
    descDisplay:
      "Zpracování mezd, personální administrativa a komunikace s institucemi pod vedením zkušených mzdových účetních.",
    requirements: [
      "SŠ/VŠ ekonomického směru",
      "Zájem o mzdovou problematiku",
      "Pečlivost a diskrétnost",
      "Znalost pracovního práva výhodou",
      "Znalost práce s PC (MS Office, zejména Excel)",
      "Komunikativnost a spolehlivost",
    ],
    fullDescription: `Jako juniorní mzdový účetní se zapojíte do týmu zkušených mzdových specialistů, kteří zpracovávají mzdy pro desítky firem z různých odvětví. Jedná se o ideální pozici pro absolventy nebo účetní s kratší praxí, kteří se chtějí specializovat na mzdovou agendu a personalistiku.

Pod vedením seniorních kolegů se postupně naučíte kompletní zpracování mezd — od evidence docházky přes výpočet hrubé a čisté mzdy, srážek, příplatků a odvodů až po přípravu výplatních pásek a měsíčních přehledů pro instituce (ČSSZ, zdravotní pojišťovny, finanční úřad). Práce zahrnuje i personální administrativu — přípravu pracovních smluv, evidenčních listů a hlášení.

Mzdová agenda je specifická v tom, že vyžaduje absolutní přesnost a dodržování termínů. Každý měsíc musí být mzdy zpracovány a odvody odeslány ve stanovených lhůtách. Současně se legislativa v oblasti pracovního práva a pojistného neustále mění, takže je potřeba průběžně sledovat novinky a aplikovat je do praxe.

Nabízíme strukturované zaškolení a mentoring, pravidelná interní školení k legislativním změnám a podporu při dalším vzdělávání. Mzdové účetnictví je obor s vynikající uplatnitelností na trhu práce — zkušený mzdový účetní je vždy žádaný.`,
    weOffer: [
      "Strukturované zaškolení a mentoring",
      "Pravidelná školení k legislativním změnám",
      "5 týdnů dovolené",
      "Příspěvek na stravování",
      "Flexibilní pracovní doba",
      "Možnost profesního růstu na seniorní pozici",
      "Přátelský kolektiv a vzájemná podpora",
    ],
    highlight: false,
  },
];

const benefits = [
  "Stabilní zázemí firmy s 30+ lety na trhu",
  "Přátelský kolektiv a rodinná atmosféra",
  "Možnost profesního růstu a vzdělávání",
  "Moderní kancelářské prostory v Chebaně",
  "5 týdnů dovolené",
  "Příspěvek na stravování",
  "Flexibilní pracovní doba",
  "Možnost částečného home-office",
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

function PositionCard({
  position,
  index,
  expanded,
  onToggle,
}: {
  position: (typeof positions)[0];
  index: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  const { ref, inView } = useInView(0.08);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`service-card ${position.highlight ? "service-card-ai" : ""} p-8 cursor-pointer ${
        inView
          ? `animate-float-up delay-${((index % 4) + 1) * 100}`
          : "opacity-0"
      }`}
      onClick={onToggle}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className={`p-2.5 border ${position.highlight ? "border-cyan/30 bg-cyan/10" : "border-cyan/15 bg-cyan/5"}`}
          >
            <Briefcase
              size={18}
              className={position.highlight ? "text-cyan" : "text-cyan/70"}
            />
          </div>
          {position.highlight && (
            <span className="hud-chip" data-tone="cyan">
              Top pozice
            </span>
          )}
        </div>
        <span
          className="text-text-muted"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.12em",
          }}
        >
          {position.code}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-white text-xl font-semibold mb-3"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {position.titleDisplay}
      </h3>

      {/* Meta info */}
      <div className="flex flex-wrap gap-4 mb-5">
        {position.salary && (
          <div className="flex items-center gap-1.5 text-text-secondary text-sm">
            <Banknote size={14} className="text-status-green flex-shrink-0" />
            {position.salary}
          </div>
        )}
        <div className="flex items-center gap-1.5 text-text-muted text-sm">
          <MapPin size={14} className="text-cyan/60 flex-shrink-0" />
          {position.location}
        </div>
        <div className="flex items-center gap-1.5 text-text-muted text-sm">
          <Clock size={14} className="text-cyan/60 flex-shrink-0" />
          {position.type}
        </div>
      </div>

      {/* Description */}
      <p className="text-text-muted text-sm leading-relaxed mb-6">
        {position.descDisplay}
      </p>

      {/* Requirements (collapsed: show original short list) */}
      <ul className="space-y-2 mb-6">
        {(expanded
          ? position.requirements
          : position.requirements.slice(0, 4)
        ).map((req) => (
          <li
            key={req}
            className="flex items-start gap-2.5 text-text-muted text-sm"
          >
            <CheckCircle2
              size={14}
              className="text-cyan/50 mt-0.5 flex-shrink-0"
            />
            {req}
          </li>
        ))}
      </ul>

      {/* Expanded content */}
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          {/* Full description */}
          <div className="border-t border-cyan/8 pt-6 mb-6">
            <h4
              className="text-white text-sm font-semibold mb-3"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Popis pozice
            </h4>
            <div className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
              {position.fullDescription}
            </div>
          </div>

          {/* We offer */}
          <div className="border-t border-cyan/8 pt-6 mb-6">
            <h4
              className="text-white text-sm font-semibold mb-3 flex items-center gap-2"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              <Star size={14} className="text-gold" />
              Co nabízíme
            </h4>
            <ul className="space-y-2">
              {position.weOffer.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-text-secondary text-sm"
                >
                  <CheckCircle2
                    size={14}
                    className="text-status-green mt-0.5 flex-shrink-0"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="border-t border-cyan/8 pt-6 mb-6">
            <h4
              className="text-white text-sm font-semibold mb-3"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Kontakt
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Users size={14} className="text-cyan/60 flex-shrink-0" />
                <span className="text-text-secondary text-sm">
                  Klaudie Šulcová
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-cyan/60 flex-shrink-0" />
                <a
                  href={`mailto:klaudie.sulcova@schekonom.cz?subject=Zájem o pozici: ${position.titleDisplay}`}
                  className="text-cyan text-sm hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  klaudie.sulcova@schekonom.cz
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-cyan/60 flex-shrink-0" />
                <a
                  href="tel:+420731037177"
                  className="text-cyan text-sm hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  +420 731 037 177
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle CTA */}
      <div className="pt-4 border-t border-cyan/8">
        <button
          className="inline-flex items-center gap-2 text-cyan text-sm font-medium hover:gap-3 transition-all"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
        >
          {expanded ? "Skrýt detail" : "Více informací"}
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </div>
  );
}

export default function VolnaMistaPage() {
  const [expandedCode, setExpandedCode] = useState<string | null>(null);

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page header */}
        <div className="mb-20 animate-float-up">
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            KARIÉRA // VOLNÁ MÍSTA
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Pracujte s námi
            <br />v <span className="text-gold">SCH-EKONOM</span>
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-3xl leading-relaxed">
            Hledáme kolegy, kteří chtějí růst v oboru účetnictví, daní a
            financí. Nabízíme stabilní zázemí, přátelský tým a možnost podílet
            se na moderní transformaci tradiční účetní firmy.
          </p>
        </div>

        {/* Stats */}
        <FadeInSection className="mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gold/10">
            {[
              { val: String(positions.length), label: "Otevřených pozic" },
              { val: "40+", label: "Kolegů v týmu" },
              { val: "30+", label: "Let na trhu" },
              { val: "2", label: "Pobočky" },
            ].map((s) => (
              <div key={s.label} className="bg-void px-5 py-5 text-center">
                <div
                  className="text-gold text-2xl font-bold"
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

        {/* Benefits panel */}
        <FadeInSection className="mb-20">
          <div className="hud-panel p-8 rounded-sm">
            <div className="flex items-center gap-3 mb-6">
              <Users size={20} className="text-gold" />
              <span
                className="text-gold"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Co nabizime
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {benefits.map((item) => (
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

        {/* Positions label */}
        <FadeInSection className="mb-8">
          <div className="flex items-center gap-4">
            <div className="section-tag">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
              POZICE // {positions.length} OTEVŘENÝCH MÍST
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan/20 to-transparent" />
          </div>
        </FadeInSection>

        {/* Positions grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-24">
          {positions.map((pos, i) => (
            <PositionCard
              key={pos.code}
              position={pos}
              index={i}
              expanded={expandedCode === pos.code}
              onToggle={() =>
                setExpandedCode((prev) => (prev === pos.code ? null : pos.code))
              }
            />
          ))}
        </div>

        {/* Contact for applications */}
        <FadeInSection className="mb-24">
          <div className="section-tag mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            KONTAKT // JAK SE PŘIHLÁSIT
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* How to apply */}
            <div className="glass-panel p-8">
              <h3
                className="text-white text-xl font-semibold mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Jak se přihlásit
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                Pošlete nám svůj životopis a motivační dopis na e-mail níže.
                Odpovíme do 5 pracovních dnů. Pokud máte jakékoli dotazy,
                neváhejte zavolat.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 border border-gold/15 bg-gold/5">
                    <Mail size={16} className="text-gold" />
                  </div>
                  <div>
                    <div
                      className="text-text-muted mb-0.5"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      E-mail
                    </div>
                    <a
                      href="mailto:klaudie.sulcova@schekonom.cz"
                      className="text-white text-sm hover:text-cyan transition-colors"
                    >
                      klaudie.sulcova@schekonom.cz
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2.5 border border-gold/15 bg-gold/5">
                    <Phone size={16} className="text-gold" />
                  </div>
                  <div>
                    <div
                      className="text-text-muted mb-0.5"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      Telefon
                    </div>
                    <a
                      href="tel:+420731037177"
                      className="text-white text-sm hover:text-cyan transition-colors"
                    >
                      +420 731 037 177
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Office */}
            <div className="glass-panel p-8 group hover:border-gold/20 transition-all">
              <h3
                className="text-white text-xl font-semibold mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Kde nás najdete
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                Naše hlavní kancelář se nachází v moderní budově Chebana v
                centru Chebu. Rádi vás uvítáme osobně.
              </p>
              <div className="flex items-start gap-4">
                <div className="p-2.5 border border-cyan/15 bg-cyan/5">
                  <Building2 size={16} className="text-cyan" />
                </div>
                <div>
                  <div className="text-white text-sm font-medium">Chebana</div>
                  <div className="text-text-muted text-sm">
                    Obrněné brigády 553/31
                  </div>
                  <div className="text-text-muted text-sm">350 02 Cheb</div>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* CTA */}
        <FadeInSection>
          <div className="text-center">
            <div className="glass-panel inline-block p-12 max-w-xl">
              <Briefcase size={32} className="text-gold mx-auto mb-5" />
              <h3
                className="text-white text-2xl font-semibold mb-3"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Nenašli jste vhodnou pozici?
              </h3>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Pošlete nám svůj životopis i tak. Rádi vás oslovíme, až se
                otevře pozice odpovídající vašemu profilu.
              </p>
              <a
                href="mailto:klaudie.sulcova@schekonom.cz?subject=Spontánní přihláška"
                className="btn-primary"
              >
                Poslat životopis
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
