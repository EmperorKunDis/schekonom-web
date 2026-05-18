"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Calculator,
  Users,
  Globe,
  Scale,
  Receipt,
  MessageSquare,
  Mic,
  Wallet,
  ShieldAlert,
  BarChart3,
  Target,
  Clock,
  Network,
  Brain,
  MousePointer,
  Building2,
  Radio,
  Lock,
  PiggyBank,
  Sparkles,
  Search,
  Package,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  XCircle,
  Database,
  Layers,
  Activity,
  type LucideIcon,
} from "lucide-react";
import { useAuth } from "@/lib/auth/context";
import {
  companies,
  invoices,
  riskAlerts,
  documents,
  cashFlowForecasts,
  communicationLog,
  schEmployees,
  deadlines,
  payrollRecords,
  germanTaxCases,
} from "@/lib/erp/data";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Analysis {
  id?: string;
  name: string;
  source: string;
  good: string;
  bad: string;
}

interface Section {
  id: number;
  title: string;
  icon: LucideIcon;
  analyses: Analysis[];
  special?: boolean;
}

// ---------------------------------------------------------------------------
// All 23 sections with 200+ analyses
// ---------------------------------------------------------------------------

const sections: Section[] = [
  // =========================================================================
  // 1. Tvrd{{ e}} ucetnictvi a finance
  // =========================================================================
  {
    id: 1,
    title: "Tvrdé účetnictví a finance",
    icon: BookOpen,
    analyses: [
      {
        id: "1-01",
        name: "Hlavní kniha — obraty účtů",
        source: "Money S3 / Pohoda",
        good: "Obraty vyrovnané, MD=D, 0 nesrovnalostí",
        bad: "Nesrovnalost 47 000 Kč na účtu 321",
      },
      {
        id: "1-02",
        name: "Výsledovka a rozvaha",
        source: "účtová osnova",
        good: "Zisk 2.4M Kč, aktiva +12% meziročně",
        bad: "Ztráta 380K, záporný vlastní kapitál",
      },
      {
        id: "1-03",
        name: "Cash flow",
        source: "bankovní API + účetní deník",
        good: "Provozní CF +1.8M Kč",
        bad: "Provozní CF −420K 3. měsíc v řadě",
      },
      {
        id: "1-04",
        name: "Aging pohledávek",
        source: "saldokonto",
        good: "85% do 30 dnů",
        bad: "45% nad 90 dnů",
      },
      {
        id: "1-05",
        name: "DPH, KH, SH",
        source: "MOJE daně",
        good: "0 neshod, podáno včas",
        bad: "3 neshody — penále 50K",
      },
      {
        id: "1-06",
        name: "Víceměnové výstupy",
        source: "kurzovní lístek",
        good: "Kurzové zisky +34K",
        bad: "Kurzová ztráta −89K",
      },
      {
        id: "1-07",
        name: "Audit trail",
        source: "DocuWare + ERP",
        good: "0 neoprávněných změn",
        bad: "17 změn po uzávěrce",
      },
      {
        id: "1-08",
        name: "DPPO/DPFO simulace",
        source: "uzávěrková data",
        good: "Sazba 15.2%, úspora 280K",
        bad: "Přeplatek 120K kvůli chybě",
      },
      {
        id: "1-09",
        name: "Dokladová inventarizace",
        source: "automatické porovnání MD/D",
        good: "100% shoda",
        bad: "4 účty s rozdílem 67K",
      },
    ],
  },

  // =========================================================================
  // 2. Naklady, rozpocty, prognozy
  // =========================================================================
  {
    id: 2,
    title: "Náklady, rozpočty, prognózy",
    icon: Calculator,
    analyses: [
      {
        id: "2-01",
        name: "Skutečnost vs. plán",
        source: "rozpočet + reál",
        good: "Odchylka +3%",
        bad: "Odchylka −28%",
      },
      {
        id: "2-02",
        name: "Klouzavé prognózy",
        source: "historie úprav",
        good: "v3 se liší od v1 o 4%",
        bad: "Reforecast mění o 30%+ měsíčně",
      },
      {
        id: "2-03",
        name: "Dohady (accruals)",
        source: "modul dohadů",
        good: "Vše reconcilováno",
        bad: "3 dohady za 890K starší 6 měsíců",
      },
      {
        id: "2-04",
        name: "Marže po projektech",
        source: "výnosy vs. výkazy",
        good: "Průměr 34%, minimum 18%",
        bad: "2 projekty pod 5%",
      },
      {
        id: "2-05",
        name: "Interní přefakturace",
        source: "mezistřediskové doklady",
        good: "Vyrovnané",
        bad: "Nezaúčtováno 210K",
      },
      {
        id: "2-06",
        name: "Predikce cash flow",
        source: "splatnosti + vzorce",
        good: "Pozitivní ve všech horizontech",
        bad: "Negativní za 47 dní",
      },
      {
        id: "2-07",
        name: "True cost to serve",
        source: "timesheety × sazba",
        good: "Klient stojí 8.2K, generuje 14K",
        bad: "Klient stojí 22K, platí 9K",
      },
    ],
  },

  // =========================================================================
  // 3. Mzdy a personalni data
  // =========================================================================
  {
    id: 3,
    title: "Mzdy a personální data",
    icon: Users,
    analyses: [
      {
        id: "3-01",
        name: "Mzdové náklady",
        source: "mzdový modul",
        good: "32% tržeb",
        bad: "58% tržeb",
      },
      {
        id: "3-02",
        name: "Výpočet mezd",
        source: "docházka + smlouvy",
        good: "0 chyb",
        bad: "3 přepočty",
      },
      {
        id: "3-03",
        name: "Exekuční srážky",
        source: "API justice.cz",
        good: "0 nových exekucí",
        bad: "2 nové v ISIR",
      },
      {
        id: "3-04",
        name: "eNeschopenky",
        source: "ČSSZ e-Podání",
        good: "Real-time, 2 aktivní",
        bad: "Nezaregistrovaná 5 dní",
      },
      {
        id: "3-05",
        name: "ELDP, ONZ",
        source: "mzdový engine",
        good: "Podáno do 20.",
        bad: "Po termínu — pokuta",
      },
      {
        id: "3-06",
        name: "Predikce fluktuace",
        source: "docházka + nástupy/výstupy",
        good: "Stabilní, 0 signálů",
        bad: "3 lidé 78%+ pravděpodobnost odchodu",
      },
      {
        id: "3-07",
        name: "Detekce přesčasů",
        source: "docházka vs. ZP",
        good: "Průměr 2h/týden",
        bad: "68h/týden — porušení §93",
      },
      {
        id: "3-08",
        name: "Efektivní hodinová mzda",
        source: "mzdy/hodiny",
        good: "Rozptyl 8%",
        bad: "Rozptyl 45% — diskriminace",
      },
      {
        id: "3-09",
        name: "Šifrované výplatní pásky",
        source: "kanál",
        good: "100% šifrovaně",
        bad: "12% nešifrovaně — GDPR",
      },
      {
        id: "3-10",
        name: "Roční zúčtování",
        source: "prohlášení",
        good: "98% do 15.2.",
        bad: "40% po termínu",
      },
    ],
  },

  // =========================================================================
  // 4. Nemecke dane a pendleri
  // =========================================================================
  {
    id: 4,
    title: "Německé daně a pendleři",
    icon: Globe,
    analyses: [
      {
        id: "4-01",
        name: "Steuererklärung",
        source: "ELSTER",
        good: "100% elektronicky, 0 zamítnutí",
        bad: "3 zamítnutá",
      },
      {
        id: "4-02",
        name: "Optimalizace odpočtů",
        source: "knihy jízd",
        good: "Průměrná refundace 2,800 EUR",
        bad: "Nevyužitý odpočet 1,200 EUR",
      },
      {
        id: "4-03",
        name: "Kindergeld",
        source: "Familienkasse",
        good: "Všechny rodiny čerpají",
        bad: "2 rodiny nečerpají — 500 EUR/měsíc",
      },
      {
        id: "4-04",
        name: "Formuláře A1",
        source: "HR data",
        good: "Vydány před vysláním",
        bad: "Chybí — nelegální práce v DE",
      },
      {
        id: "4-05",
        name: "SOKA-BAU",
        source: "evidence",
        good: "Včas, zaplaceno",
        bad: "Penále 5,000 EUR",
      },
      {
        id: "4-06",
        name: "Freistellung",
        source: "registrace",
        good: "98.5% úspěšnost",
        bad: "Zamítnuto — srážka 15%",
      },
      {
        id: "4-07",
        name: "Kinderfreibetrag",
        source: "legislativa",
        good: "Automatická aktualizace",
        bad: "Nezaktualizováno — přeplatil",
      },
      {
        id: "4-08",
        name: "Zpětná přiznání",
        source: "archiv",
        good: "12K EUR nalezeno",
        bad: "4,800 EUR promlčeno",
      },
      {
        id: "4-09",
        name: "Stálé vs. proměnné pracoviště",
        source: "GPS",
        good: "Úspora 1,400 EUR/rok",
        bad: "Doměrek 3,200 EUR",
      },
      {
        id: "4-10",
        name: "Penze v zahraničí",
        source: "FÚ Neubrandenburg",
        good: "DBA, daň 0%",
        bad: "Zdaněno 18% místo 0%",
      },
      {
        id: "4-11",
        name: "ELSTER komunikace",
        source: "certifikáty",
        good: "Automatická, 0 manuálních",
        bad: "Certifikát expiroval — 5 nepodáno",
      },
    ],
  },

  // =========================================================================
  // 5. Danove poradenstvi
  // =========================================================================
  {
    id: 5,
    title: "Daňové poradenství",
    icon: Scale,
    analyses: [
      {
        id: "5-01",
        name: "Scénáře «co kdyby»",
        source: "simulační model",
        good: "Optimální struktura ušetří 15% efektivní sazby",
        bad: "Klient přeplatil 340K — neprovedena optimalizace",
      },
      {
        id: "5-02",
        name: "Transferové ceny",
        source: "smluvní data",
        good: "Dokumentace kompletní, v souladu s OECD",
        bad: "Chybí TP dokumentace — riziko doměrku 2M+",
      },
      {
        id: "5-03",
        name: "Zastupování při kontrolách",
        source: "DIS+",
        good: "5 kontrol za 3 roky, 0 doměrků",
        bad: "Doměrek 1.2M + penále 240K",
      },
      {
        id: "5-04",
        name: "Monitoring DIS+",
        source: "API FS",
        good: "Všechny předpisy spárovány, 0 nedoplatků",
        bad: "Nespárovaný předpis 89K — hrozí exekuce",
      },
      {
        id: "5-05",
        name: "Due diligence",
        source: "agregace modulů",
        good: "Čistý profil, žádné skryté závazky",
        bad: "Odkryty podmíněné závazky za 4.5M",
      },
      {
        id: "5-06",
        name: "Predikce kontroly FÚ",
        source: "vzorce",
        good: "Nízká pravděpodobnost 8%",
        bad: "78% pravděpodobnost kontroly — 3 rizikové faktory",
      },
    ],
  },

  // =========================================================================
  // 6. DPH, ViDA a e-fakturace
  // =========================================================================
  {
    id: 6,
    title: "DPH, ViDA a e-fakturace",
    icon: Receipt,
    analyses: [
      {
        id: "6-01",
        name: "Detekce karuselových vzorců",
        source: "KH + graf dodavatelů",
        good: "0 podezřelých vzorců",
        bad: "Dodavatel v řetězci 3 firem s identickými obraty",
      },
      {
        id: "6-02",
        name: "Připravenost na ViDA 2030",
        source: "audit ERP",
        good: "Systém ready, XML/UBL výstup OK",
        bad: "ERP nepodporuje e-fakturaci — nutný upgrade",
      },
      {
        id: "6-03",
        name: "XML/UBL výměna",
        source: "automatický výstup",
        good: "100% automatická konverze",
        bad: "32% faktur vyžaduje manuální zásah",
      },
      {
        id: "6-04",
        name: "Chybné sazby DPH",
        source: "validace",
        good: "0 chybných sazeb",
        bad: "4 faktury se špatnou sazbou 21% místo 15%",
      },
    ],
  },

  // =========================================================================
  // 7. Klientska komunikace
  // =========================================================================
  {
    id: 7,
    title: "Klientská komunikace",
    icon: MessageSquare,
    analyses: [
      {
        id: "7-01",
        name: "Sentiment v čase",
        source: "NLP Daktela",
        good: "Stabilně pozitivní 78%",
        bad: "Propad z 82% na 34% za 3 měsíce",
      },
      {
        id: "7-02",
        name: "Témata dotazů",
        source: "topic modeling",
        good: "60% proaktivní konzultace",
        bad: "85% stížnosti a urgence",
      },
      {
        id: "7-03",
        name: "Frustrace a eskalace",
        source: "change point",
        good: "0 eskalací za kvartál",
        bad: "3 eskalace — bod zlomu: 12.3.2026",
      },
      {
        id: "7-04",
        name: "Frekvence kontaktů",
        source: "metadata",
        good: "Pravidelný kontakt 2×/měsíc",
        bad: "0 kontaktů 4 měsíce — tichý odchod",
      },
      {
        id: "7-05",
        name: "Preferovaný kanál",
        source: "logy",
        good: "Email 65%, efektivní",
        bad: "Jen telefon — nemožné trasovat",
      },
      {
        id: "7-06",
        name: "Rychlost odpovědí",
        source: "timestamps",
        good: "Průměr 2.4h",
        bad: "Průměr 72h — ztráta důvěry",
      },
      {
        id: "7-07",
        name: "Délka zpráv",
        source: "délka textů",
        good: "Stabilní 120 slov",
        bad: "Zkrácení z 150 na 12 slov — odchází",
      },
      {
        id: "7-08",
        name: "Kdy klient píše",
        source: "timestamps",
        good: "Po-Pá 9-17",
        bad: "Neděle 23:00 — stress",
      },
      {
        id: "7-09",
        name: "Opakované problémy",
        source: "deduplikace",
        good: "0 opakování",
        bad: "Stejný problém 5× za rok",
      },
      {
        id: "7-10",
        name: "Reenio rezervace",
        source: "kalendář",
        good: "Pravidelné schůzky, 0 zrušených",
        bad: "3 zrušené po sobě — klient ztrácí zájem",
      },
      {
        id: "7-11",
        name: "Osobní vs. digitální",
        source: "segmentace",
        good: "Mix 30/70 — gramotný klient",
        bad: "100% osobně — digitální transformace nemožná",
      },
    ],
  },

  // =========================================================================
  // 8. Hlasova a lingvisticka analyza
  // =========================================================================
  {
    id: 8,
    title: "Hlasová a lingvistická analýza",
    icon: Mic,
    analyses: [
      {
        id: "8-01",
        name: "Rychlost řeči",
        source: "audio",
        good: "140 slov/min — klidný",
        bad: "220 slov/min — rozrušený",
      },
      {
        id: "8-02",
        name: "Změna hlasu v čase",
        source: "akustika",
        good: "Konzistentní tón",
        bad: "Monotónní hlas — únava/deprese",
      },
      {
        id: "8-03",
        name: "Odborný vs. laický slovník",
        source: "lexikální",
        good: "Klient rozumí 80% termínů",
        bad: "Nerozumí ničemu — špatná komunikace",
      },
      {
        id: "8-04",
        name: "«My» vs. «já»",
        source: "pronominální",
        good: "Identifikace s firmou",
        bad: "Jen «já» — odtržení od firmy",
      },
      {
        id: "8-05",
        name: "Dialekt",
        source: "fonetika",
        good: "Standardní čeština",
        bad: "Silný dialekt — možné nedorozumění",
      },
      {
        id: "8-06",
        name: "Ironie a sarkasmus",
        source: "kontextové NLP",
        good: "0 detekovaných",
        bad: "4 ironické poznámky — skrytá nespokojenost",
      },
      {
        id: "8-07",
        name: "Jazyk komunikace",
        source: "per-klient",
        good: "Konzistentně CZ",
        bad: "Přepíná CZ/DE — signál změny partnera",
      },
      {
        id: "8-08",
        name: "Kdo rozhoduje",
        source: "analýza autority",
        good: "Jednatel = rozhodovatel",
        bad: "Rozhoduje asistentka — jednatel outsider",
      },
    ],
  },

  // =========================================================================
  // 9. Financni profil a CLV
  // =========================================================================
  {
    id: 9,
    title: "Finanční profil a CLV",
    icon: Wallet,
    analyses: [
      {
        id: "9-01",
        name: "CLV",
        source: "fakturace − cost to serve",
        good: "CLV 480K za 5 let",
        bad: "CLV −120K — ztrátový klient",
      },
      {
        id: "9-02",
        name: "Marže na klienta",
        source: "výnosy vs. timesheety",
        good: "Marže 42%",
        bad: "Marže −8%",
      },
      {
        id: "9-03",
        name: "Platební chování",
        source: "historie úhrad",
        good: "Průměr 14 dní, vždy včas",
        bad: "Průměr 67 dní, 3× upomínka",
      },
      {
        id: "9-04",
        name: "Cenová elasticita",
        source: "reakce na zdražení",
        good: "Akceptoval +15% bez reakce",
        bad: "Při +5% vyhrožoval odchodem",
      },
      {
        id: "9-05",
        name: "Vnímání ceny",
        source: "řeč klienta",
        good: "Říká «férová cena»",
        bad: "Říká «drahé» v každém hovoru",
      },
      {
        id: "9-06",
        name: "Upsell/cross-sell",
        source: "gap analýza",
        good: "Využívá 6/8 služeb",
        bad: "Využívá 1/8 — 7 příležitostí",
      },
      {
        id: "9-07",
        name: "Klienti ve ztrátě",
        source: "per-klient P&L",
        good: "0 ztrátových klientů",
        bad: "3 klienti generují −180K/rok",
      },
    ],
  },

  // =========================================================================
  // 10. Rizika, fraud, deepfakes
  // =========================================================================
  {
    id: 10,
    title: "Rizika, fraud, deepfakes",
    icon: ShieldAlert,
    analyses: [
      {
        id: "10-01",
        name: "Churn prediction",
        source: "ML model",
        good: "0 klientů s >50% rizikem",
        bad: "2 klienti s 89% pravděpodobností odchodu",
      },
      {
        id: "10-02",
        name: "Early warning",
        source: "anomálie",
        good: "Žádné anomálie",
        bad: "Klient ztichl + zpomalil platby",
      },
      {
        id: "10-03",
        name: "Kreditní riziko",
        source: "historie + ISIR",
        good: "Všichni dodavatelé solventní",
        bad: "Dodavatel v insolvenci — 340K pohledávka",
      },
      {
        id: "10-04",
        name: "CEO fraud",
        source: "3-way matching",
        good: "0 podezřelých změn",
        bad: "Změna IBAN + neobvyklá platba 890K",
      },
      {
        id: "10-05",
        name: "Detekce změny IBAN",
        source: "porovnání",
        good: "IBAN stabilní 2+ roky",
        bad: "IBAN změněn 2× za měsíc — podvod?",
      },
      {
        id: "10-06",
        name: "AML signály",
        source: "vzory plateb",
        good: "Standardní vzory",
        bad: "Pravidelné platby 49K (pod hranicí 50K)",
      },
      {
        id: "10-07",
        name: "Compliance gap",
        source: "regulace × činnost",
        good: "100% pokrytí",
        bad: "Chybí 3 povinné licence",
      },
      {
        id: "10-08",
        name: "Fakturační nesrovnalosti",
        source: "doklady vs. objednávky",
        good: "100% match",
        bad: "17% faktur bez objednávky",
      },
      {
        id: "10-09",
        name: "Predikce insolvence",
        source: "platby + rejstříky",
        good: "Score 92/100 — stabilní",
        bad: "Score 23/100 — insolvence do 6 měsíců",
      },
      {
        id: "10-10",
        name: "Shadow AI detekce",
        source: "DLP logy",
        good: "0 úniků do LLM",
        bad: "Účetní vložila klientská data do ChatGPT",
      },
      {
        id: "10-11",
        name: "AI Act rizikové systémy",
        source: "audit nástrojů",
        good: "0 high-risk AI",
        bad: "2 systémy nesplňují AI Act — nutný audit",
      },
    ],
  },

  // =========================================================================
  // 11. Operativni reporty
  // =========================================================================
  {
    id: 11,
    title: "Operativní reporty",
    icon: BarChart3,
    analyses: [
      {
        id: "11-01",
        name: "SLA dodržení",
        source: "timestamps",
        good: "98% v SLA",
        bad: "62% mimo SLA",
      },
      {
        id: "11-02",
        name: "Opakující se problémy",
        source: "kategorizace",
        good: "0 opakování",
        bad: "Klient X — 5× stejný problém",
      },
      {
        id: "11-03",
        name: "Bottlenecky uzávěrky",
        source: "workflow",
        good: "Průměr 3 dny",
        bad: "14 dní — zásek u párování",
      },
      {
        id: "11-04",
        name: "Sezónnost komunikace",
        source: "časové řady",
        good: "Predikovatelné špičky",
        bad: "Nečekaná špička +300%",
      },
      {
        id: "11-05",
        name: "Predikce vytížení",
        source: "historické vzorce",
        good: "Q2 kapacita OK",
        bad: "Q1 přetížení 140% — nutný outsource",
      },
      {
        id: "11-06",
        name: "Vyhoření týmu",
        source: "docházka SCH",
        good: "0 víkendová práce",
        bad: "3 účetní pracují 6 víkendů v řadě",
      },
      {
        id: "11-07",
        name: "Chybovost účetního",
        source: "audit trail",
        good: "0.2% opravných zápisů",
        bad: "4.8% — 24× průměr kanceláře",
      },
      {
        id: "11-08",
        name: "3-way matching",
        source: "DocuWare",
        good: "91% STP",
        bad: "34% STP — většina manuálně",
      },
      {
        id: "11-09",
        name: "Doba zpracování dokladu",
        source: "workflow",
        good: "Průměr 4h",
        bad: "Průměr 72h — klient čeká",
      },
      {
        id: "11-10",
        name: "Chybějící podklady",
        source: "DocuWare gap",
        good: "12% chybí",
        bad: "67% chybí — kancelář paralyzovaná",
      },
    ],
  },

  // =========================================================================
  // 12. Strategie a segmentace
  // =========================================================================
  {
    id: 12,
    title: "Strategie a segmentace",
    icon: Target,
    analyses: [
      {
        id: "12-01",
        name: "Segmentace",
        source: "clustering",
        good: "4 jasné segmenty, cílený přístup",
        bad: "Všem stejný servis — neefektivní",
      },
      {
        id: "12-02",
        name: "Voice of Customer",
        source: "topic modeling",
        good: "Top téma: digitalizace",
        bad: "Top téma: stížnosti na cenu",
      },
      {
        id: "12-03",
        name: "Competitor intelligence",
        source: "zmínky",
        good: "0 zmínek konkurence",
        bad: "Klient zmínil 3× levnější nabídku",
      },
      {
        id: "12-04",
        name: "Benchmark",
        source: "portfolio",
        good: "Klient nad průměrem oboru",
        bad: "Klient 40% pod průměrem — riziko úpadku",
      },
    ],
  },

  // =========================================================================
  // 13. Casova dimenze
  // =========================================================================
  {
    id: 13,
    title: "Časová dimenze",
    icon: Clock,
    analyses: [
      {
        id: "13-01",
        name: "Change point detection",
        source: "history",
        good: "Stabilní trajektorie",
        bad: "Zlom 15.1.2026 — po změně jednatele",
      },
      {
        id: "13-02",
        name: "Životní cyklus vztahu",
        source: "timeline",
        good: "Fáze růstu, 8. rok spolupráce",
        bad: "Fáze úpadku — komunikace klesá od Q3",
      },
      {
        id: "13-03",
        name: "Sezónní vzorce",
        source: "časové řady",
        good: "Březen nervózní — očekávané",
        bad: "Nestandardní ticho v březnu",
      },
      {
        id: "13-04",
        name: "Reakce na legislativu",
        source: "korelace",
        good: "Proaktivní přizpůsobení",
        bad: "Ignoruje novely — compliance gap",
      },
      {
        id: "13-05",
        name: "Longitudinální trajektorie",
        source: "10+ let",
        good: "Stabilní růst 8% ročně",
        bad: "Klesající trend 5 let — bez zásahu odejde",
      },
      {
        id: "13-06",
        name: "Generační změna",
        source: "kontakty + styl",
        good: "Syn přebral — modernizuje",
        bad: "Syn přebral — nekomunikuje, nereaguje",
      },
      {
        id: "13-07",
        name: "Paměť systému",
        source: "full-text",
        good: "Historie 10 let dostupná",
        bad: "Klient říká X, ale před 3 lety řekl opak",
      },
    ],
  },

  // =========================================================================
  // 14. Sitova analyza
  // =========================================================================
  {
    id: 14,
    title: "Síťová analýza",
    icon: Network,
    analyses: [
      {
        id: "14-01",
        name: "Graf klientů",
        source: "cross-match IČO",
        good: "12 vzájemných obchodních vztahů",
        bad: "Uzavřená smyčka A→B→C→A — fraud?",
      },
      {
        id: "14-02",
        name: "Influenceři",
        source: "centralita",
        good: "Žádný single point of failure",
        bad: "1 klient propojený s 8 dalšími — domino riziko",
      },
      {
        id: "14-03",
        name: "Sdílené kontakty",
        source: "deduplikace",
        good: "Každý klient unikátní",
        bad: "Stejná kontaktní osoba u 4 firem — švarcsystém?",
      },
      {
        id: "14-04",
        name: "Supplier-client",
        source: "transakce",
        good: "Transparentní dodavatelské řetězce",
        bad: "Klient je dodavatel jiného klienta a neví o tom",
      },
      {
        id: "14-05",
        name: "Zaměstnanec <-> klient",
        source: "komunikace",
        good: "Rovnoměrné přidělení",
        bad: "1 účetní komunikuje s 80% klientů — bus factor",
      },
      {
        id: "14-06",
        name: "Doporučení klientů",
        source: "kdo koho přivedl",
        good: "40% klientů z doporučení",
        bad: "0 doporučení za 2 roky — klienti nedoporučují",
      },
    ],
  },

  // =========================================================================
  // 15. Psychograficky profil
  // =========================================================================
  {
    id: 15,
    title: "Psychografický profil",
    icon: Brain,
    analyses: [
      {
        id: "15-01",
        name: "Rozhodovací styl",
        source: "délka cyklů",
        good: "Rozhoduje do 48h, data-driven",
        bad: "Odkládá rozhodnutí měsíce",
      },
      {
        name: "Riziková tolerance",
        source: "reakce na změny",
        good: "Akceptuje inovace",
        bad: "Odmítá jakoukoliv změnu",
      },
      {
        name: "Loajalita vs. oportunismus",
        source: "reakce na nabídky",
        good: "Loyální 8+ let",
        bad: "Porovnává ceny každý rok",
      },
      {
        name: "Reakce na problémy",
        source: "historie krizí",
        good: "Konstruktivní komunikace",
        bad: "Eskaluje, vyhrožuje, tiše odchází",
      },
    ],
  },

  // =========================================================================
  // 16. Produktova inteligence
  // =========================================================================
  {
    id: 16,
    title: "Produktová inteligence",
    icon: Package,
    analyses: [
      {
        name: "Využití služeb vs. smlouva",
        source: "logy",
        good: "Využívá 95% smluvního rozsahu",
        bad: "Využívá 20% — platí za to co nepoužívá",
      },
      {
        name: "Skryté mezery",
        source: "peer benchmark",
        good: "Žádné nevyužité příležitosti",
        bad: "Nemá mzdové služby — peer ano",
      },
      {
        name: "Predikce další potřeby",
        source: "collaborative filtering",
        good: "80% přesnost predikce",
        bad: "Model nelze natrénovat — málo dat",
      },
      {
        name: "Doporučovací systém",
        source: "«klienti jako tento»",
        good: "3 relevantní upsell příležitosti",
        bad: "Klient max. saturovaný",
      },
    ],
  },

  // =========================================================================
  // 17. Behavioralni mikrosignaly
  // =========================================================================
  {
    id: 17,
    title: "Behaviorální mikrosignály",
    icon: MousePointer,
    analyses: [
      {
        name: "Kdy otevírá maily",
        source: "email tracking",
        good: "Do 2h v pracovní době",
        bad: "Neotevírá — ignoruje komunikaci",
      },
      {
        name: "Kolikrát přečte nabídku",
        source: "open counts",
        good: "3× přečteno + odpověď",
        bad: "0 otevření — spam filtr nebo nezájem",
      },
      {
        name: "Otevírá přílohy",
        source: "engagement",
        good: "Reporty otevřeny do 24h",
        bad: "0% otevřených příloh za kvartál",
      },
      {
        name: "Zařízení a čas",
        source: "user-agent",
        good: "Desktop v kanceláři",
        bad: "iPhone 23:00 — rozhoduje pod stresem",
      },
      {
        name: "Kdo zpracovává maily",
        source: "podpisy + styl",
        good: "Jednatel osobně",
        bad: "Asistentka — jednatel se nezajímá",
      },
    ],
  },

  // =========================================================================
  // 18. Organizacni inteligence klienta
  // =========================================================================
  {
    id: 18,
    title: "Organizační inteligence klienta",
    icon: Building2,
    analyses: [
      {
        name: "Fluktuace v týmu",
        source: "změny kontaktů",
        good: "Stabilní kontakty 3+ roky",
        bad: "4. kontaktní osoba za rok",
      },
      {
        name: "Interní konflikty",
        source: "tón osob",
        good: "Konzistentní komunikace",
        bad: "Spolumajitel vs. účetní — protichůdné instrukce",
      },
      {
        name: "Formální vs. reálná hierarchie",
        source: "kdo schvaluje",
        good: "Jednatel = rozhodovatel",
        bad: "Jednatel podepíše ale nerozumí — riziko",
      },
      {
        name: "Podpisové vzory",
        source: "reorganizace",
        good: "Stabilní podpisy",
        bad: "3 změny podpisu za rok — nestabilita",
      },
    ],
  },

  // =========================================================================
  // 19. Externi signaly
  // =========================================================================
  {
    id: 19,
    title: "Externí signály",
    icon: Radio,
    analyses: [
      {
        name: "ARES + VIES",
        source: "API",
        good: "Vše validní, plátce DPH",
        bad: "Dodavatel zrušen v ARES — fiktivní firma",
      },
      {
        name: "Insolvenční rejstřík",
        source: "justice.cz",
        good: "0 nálezů",
        bad: "Klient podal insolvenční návrh",
      },
      {
        name: "Pracovní inzeráty",
        source: "scraping",
        good: "Najímá — roste",
        bad: "Najímá účetní — chce nás nahradit?",
      },
      {
        name: "Tiskové zprávy",
        source: "RSS",
        good: "Pozitivní PR",
        bad: "Negativní média — reputační riziko",
      },
      {
        name: "Výběrová řízení",
        source: "portál",
        good: "Vyhrál zakázku 12M",
        bad: "Prohrál 3 tendry v řadě",
      },
      {
        name: "Regulatorní feeds",
        source: "CZ+DE+EU",
        good: "Připraven na novely",
        bad: "Novela ho zasáhne — neví o tom",
      },
      {
        name: "Kurzovní lístek",
        source: "ČNB+EZB API",
        good: "EUR stabilní, hedging nepotřeba",
        bad: "EUR +8% za měsíc — nezajištěná pozice",
      },
      {
        name: "Sbírka listin",
        source: "justice.cz",
        good: "Výkazy zveřejněny",
        bad: "Nezveřejněny 2 roky — pokuta 100K",
      },
    ],
  },

  // =========================================================================
  // 20. Certifikacni autorita a IT
  // =========================================================================
  {
    id: 20,
    title: "Certifikační autorita a IT",
    icon: Lock,
    analyses: [
      {
        name: "Životní cyklus certifikátů",
        source: "IT logy",
        good: "Vše platné, 0 expirace do 90 dní",
        bad: "3 certifikáty expirují za 14 dní",
      },
      {
        name: "Klientská mapa certifikátů",
        source: "databáze",
        good: "100% pokrytí",
        bad: "40% klientů bez kvalifikovaného certifikátu",
      },
      {
        name: "SSL/TLS monitoring",
        source: "automatický scan",
        good: "Vše A+ rating",
        bad: "2 weby s expirovaným SSL",
      },
      {
        name: "Predikce obnovy",
        source: "automatické upomínky",
        good: "Obnova 30 dní předem",
        bad: "Obnova po expiraci — výpadek služby",
      },
      {
        name: "Detekce zneužití",
        source: "anomálie podepisování",
        good: "Standardní vzory",
        bad: "Certifikát použit v 3:00 ráno z neznámé IP",
      },
      {
        name: "Klient mimo kontakt",
        source: "cross-reference",
        good: "Komunikace aktivní",
        bad: "Certifikát za 7 dní, klient neodpovídá 3 týdny",
      },
    ],
  },

  // =========================================================================
  // 21. Virtualni CFO
  // =========================================================================
  {
    id: 21,
    title: "Virtuální CFO",
    icon: PiggyBank,
    analyses: [
      {
        name: "Real-time ziskovost",
        source: "BI dashboard",
        good: "Marže 28%, trend rostoucí",
        bad: "Marže klesá z 24% na 11% za 6 měsíců",
      },
      {
        name: "Predikce likvidity",
        source: "model",
        good: "Likvidita OK 90+ dní",
        bad: "«Dojdou vám peníze za 3 týdny»",
      },
      {
        name: "Automatická optimalizace",
        source: "proaktivní AI",
        good: "3 doporučení implementována — úspora 180K",
        bad: "Klient ignoruje doporučení — přichází o 420K ročně",
      },
      {
        name: "Srovnání s oborem",
        source: "benchmark",
        good: "Top 20% v sektoru",
        bad: "Spodních 10% — nutná restrukturalizace",
      },
    ],
  },

  // =========================================================================
  // 22. Prediktivni vrstva
  // =========================================================================
  {
    id: 22,
    title: "Prediktivní vrstva",
    icon: Sparkles,
    analyses: [
      {
        name: "Kdy klient odejde",
        source: "ML",
        good: "0% riziko odchodu",
        bad: "87% pravděpodobnost odchodu do 60 dní",
      },
      {
        name: "Co ho zachrání",
        source: "uplift modeling",
        good: "Klient stabilní — nepotřeba",
        bad: "Osobní schůzka + sleva 10% = 64% šance na udržení",
      },
      {
        name: "Optimální moment kontaktu",
        source: "analýza",
        good: "Úterý 10:00 — response rate 89%",
        bad: "Pátek 16:00 — response rate 12%",
      },
      {
        name: "Cenová elasticita",
        source: "historie",
        good: "Toleruje +20% bez reakce",
        bad: "Zlomový bod při +3% — okamžitý odchod",
      },
      {
        name: "Predikce akvizice/fúze",
        source: "signály",
        good: "Stabilní struktura",
        bad: "3 signály fúze — připravit transition plán",
      },
    ],
  },

  // =========================================================================
  // 23. Skryte signaly
  // =========================================================================
  {
    id: 23,
    title: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    icon: Search,
    special: true,
    analyses: [
      // --- Metadata ---
      {
        name: "Čas přijetí->zaúčtování",
        source: "DocuWare timestamps",
        good: "Průměr 4h — efektivní",
        bad: "Průměr 96h u klienta X — odkládání",
      },
      {
        name: "Kolikrát faktura otevřena",
        source: "DocuWare open log",
        good: "1-2× — jasný doklad",
        bad: "12× otevřena — účetní neví jak zaúčtovat",
      },
      {
        name: "Přepínání oken",
        source: "OS telemetrie",
        good: "Průměr 3 přepnutí",
        bad: "45 přepnutí — kognitivní přetížení",
      },
      {
        name: "Pořadí zpracování",
        source: "queue log",
        good: "FIFO — spravedlivé",
        bad: "Klient Y vždy poslední — neoblíbený",
      },
      {
        name: "Kdo první ráno",
        source: "login × klient",
        good: "Rovnoměrné",
        bad: "Účetní A vždy odkládá klienta B",
      },
      {
        name: "Kdy vytištěn doklad",
        source: "printer log",
        good: "0 tisků — plně digitální",
        bad: "340 tisků/měsíc — papírový středověk",
      },
      // --- Jazyk a emoce ---
      {
        name: "Tón pondělí vs. pátek",
        source: "sentiment × čas",
        good: "Konzistentní",
        bad: "Pondělí negativní, pátek pozitivní — stres z práce",
      },
      {
        name: "Délka pozdravů",
        source: "textová analýza",
        good: "Stabilní formální",
        bad: "Z «Vážený pane» na «Dobrý den» na «Ahoj» — blízkost nebo nerespekt?",
      },
      {
        name: "Smajlíky",
        source: "emotikon tracking",
        good: "Konzistentní",
        bad: "Přestal 15.2. — přesný bod ochlazení",
      },
      {
        name: "Vykání/tykání",
        source: "analýza",
        good: "Konzistentní vykání",
        bad: "Přešel na tykání — buď důvěra nebo nerespekt",
      },
      {
        name: "Křestní jméno v předmětu",
        source: "email metadata",
        good: "Ano — osobní vztah",
        bad: "Ne — formální distance",
      },
      {
        name: "Pravopisné chyby",
        source: "text analýza",
        good: "0 chyb — pečlivý",
        bad: "Rostoucí chyby — stres/únava/alkohol",
      },
      {
        name: "CAPS LOCK",
        source: "frustrace heatmap",
        good: "0 CAPS",
        bad: "3 maily v CAPS — zuří",
      },
      // --- Doklady jako otisk prstu ---
      {
        name: "Font faktur",
        source: "vizuální analýza PDF",
        good: "Konzistentní branding",
        bad: "Změna fontu — nový software = reorganizace",
      },
      {
        name: "Hodina vystavení",
        source: "timestamps",
        good: "Po-Pá 9-17",
        bad: "Sobota 2:00 — workaholik/krize",
      },
      {
        name: "Číselná řada faktur",
        source: "gap analýza",
        good: "Sekvenční, bez mezer",
        bad: "Gap 2001-2047 — 46 neviditelných faktur?",
      },
      {
        name: "Variabilní symboly",
        source: "pattern analýza",
        good: "Systematické (datum+číslo)",
        bad: "Náhodné — chaos v evidenci",
      },
      {
        name: "Zaokrouhlování",
        source: "statistická analýza",
        good: "Přirozené rozložení",
        bad: "80% kulatých částek v hotovosti — podezřelé",
      },
      {
        name: "Jednorázový dodavatel",
        source: "frequency",
        good: "95% opakujících se",
        bad: "12 jednorázových dodavatelů za Q1 — fraud risk",
      },
      {
        name: "Čas vystavení->zaplacení",
        source: "trend",
        good: "Klesající — zlepšuje se",
        bad: "Rostoucí — zhoršuje se",
      },
      // --- Geograficka data ---
      {
        name: "GPS z knih jízd",
        source: "pendleři",
        good: "Trasa konzistentní s bydlištěm",
        bad: "Bydlí 200km od deklarovaného — podvod?",
      },
      {
        name: "Čas na hranici",
        source: "GPS",
        good: "Pravidelné přejezdy",
        bad: "0 přejezdů — pracuje skutečně v DE?",
      },
      {
        name: "Vzorce tankování",
        source: "stvrzenky",
        good: "Odpovídá trase",
        bad: "Tankuje 500km od trasy — osobní jízdy?",
      },
      {
        name: "Dny bez dojíždění",
        source: "absence",
        good: "Koreluje s dovolenou",
        bad: "10 pracovních dní bez dojíždění — nemoc?",
      },
      // --- Sitove efekty ---
      {
        name: "Vzájemné fakturace",
        source: "cross-match IČO",
        good: "Transparentní obchod",
        bad: "3 klienti si fakturují v kruhu",
      },
      {
        name: "Uzavřené smyčky",
        source: "graf",
        good: "Žádné",
        bad: "A->B->C->A za identické částky",
      },
      {
        name: "Sdílení zaměstnanců",
        source: "RČ cross-match",
        good: "Unikátní zaměstnanci",
        bad: "Stejné RČ u 3 klientů — švarcsystém",
      },
      {
        name: "Sdílené adresy",
        source: "address matching",
        good: "Unikátní sídla",
        bad: "5 firem na 1 adrese — virtuální sídla",
      },
      // --- Meta o SCH-EKONOM ---
      {
        name: "Účetní × platební morálka",
        source: "korelace",
        good: "Rovnoměrná — systém funguje",
        bad: "Účetní A: 95% včas, B: 40% — kauzalita?",
      },
      {
        name: "Opravy po audit trail",
        source: "počet",
        good: "0.1% — excelentní",
        bad: "4.8% — potřebuje školení",
      },
      {
        name: "Klienti zdarma",
        source: "fakturace vs. čas",
        good: "0 ztrátových",
        bad: "4 klienti stojí víc než platí",
      },
      {
        name: "Práce přes dovolenou",
        source: "login × absence",
        good: "0 lidí",
        bad: "2 pracují na dovolené — burnout",
      },
      {
        name: "TeamViewer frekvence",
        source: "logy",
        good: "2×/měsíc — autonomní klient",
        bad: "15×/měsíc — bezmocný klient",
      },
      {
        name: "Kdo odhalí odchod",
        source: "intuice",
        good: "Systém detekuje dřív",
        bad: "Účetní věděla měsíce ale neřekla",
      },
      {
        name: "DocuWare hledání",
        source: "search logy",
        good: "Rychlé nalezení",
        bad: "Stejná informace hledána 12×/rok — chybí KB",
      },
      // --- Temporalni kuriozity ---
      {
        name: "Počasí × platby",
        source: "ČHMÚ × úhrady",
        good: "Žádná korelace",
        bad: "Deštivé pondělky = o 23% horší morálka",
      },
      {
        name: "Svátky DE × pendleři",
        source: "kalendář",
        good: "Aktivita klesá prediktovatelně",
        bad: "Nečekaný výpadek — klient odjel bez A1",
      },
      {
        name: "Legislativa × sentiment",
        source: "korelace",
        good: "Klidná reakce",
        bad: "Novela DPH = 400% nárůst dotazů za týden",
      },
      {
        name: "Cooling-off time",
        source: "timestamps",
        good: "Odpověď do 24h i po krizi",
        bad: "14 dní ticha po chybě kanceláře",
      },
      // --- Absence jako data ---
      {
        name: "Neotevřený report",
        source: "login logy",
        good: "Všechny reporty otevřeny",
        bad: "12 měsíců bez otevření — proč platí?",
      },
      {
        name: "Chybějící faktura",
        source: "anomálie",
        good: "Pravidelná dodávka",
        bad: "Vždy do 5., tentokrát ne — problém?",
      },
      {
        name: "Měsíc bez kontaktu",
        source: "drop detection",
        good: "Pravidelný kontakt",
        bad: "4 měsíce ticho — tichý odchod",
      },
      {
        name: "Chybějící pozice",
        source: "peer benchmark",
        good: "Kompletní tým",
        bad: "Nemá controllera — každý peer má",
      },
      {
        name: "Gap v číselné řadě",
        source: "doklady",
        good: "Kompletní",
        bad: "Chybí 12 dokladů — kam zmizely?",
      },
      // --- Psychologie kancelare ---
      {
        name: "Kolektivní nálada",
        source: "interní sentiment",
        good: "Stabilně pozitivní",
        bad: "Propad po restrukturalizaci",
      },
      {
        name: "Burnout index",
        source: "chyby × přesčasy",
        good: "Index 12 — zdravý",
        bad: "Index 78 — kritické vyhoření",
      },
      {
        name: "Graf vzájemné podpory",
        source: "kdo komu pomáhá",
        good: "Hustá síť — spolupráce",
        bad: "3 izolovaní jedinci — knowledge silos",
      },
      {
        name: "Bus factor",
        source: "exkluzivní tickety",
        good: "Min. 3 lidé umí vše",
        bad: "1 člověk — zítra může chybět",
      },
      // --- Strategicke signaly ---
      {
        name: "AI Act / ViDA zmínky",
        source: "hovory",
        good: "Klient se ptá — premium",
        bad: "Nikdo se neptá — budou překvapeni",
      },
      {
        name: "IFRS 16 dotazy",
        source: "komunikace",
        good: "Proaktivní — ideální konzultace",
        bad: "Ignoruje — bude mít problém",
      },
      {
        name: "«Moc papírování»",
        source: "stížnosti",
        good: "0 stížností",
        bad: "Opakovaně — target pro automatizaci",
      },
      {
        name: "Teplocitlivé účtenky",
        source: "typy dokladů",
        good: "Digitální doklady",
        bad: "Stále papír — digitální negramotnost",
      },
      {
        name: "První datovka",
        source: "detekce",
        good: "Používá datovku 3+ roky",
        bad: "Poprvé — generační zlom v řízení",
      },
      {
        name: "«Odesláno z iPhonu»",
        source: "podpisy",
        good: "Desktop — kancelář",
        bad: "Vždy iPhone — rozhoduje na cestách",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Computed stats from live data
// ---------------------------------------------------------------------------

function computeStats() {
  const totalAnalyses = sections.reduce((sum, s) => sum + s.analyses.length, 0);
  const dataSources = new Set<string>();
  for (const s of sections) {
    for (const a of s.analyses) {
      dataSources.add(a.source);
    }
  }
  const activeAlerts = riskAlerts.filter((r) => !r.resolvedAt).length;
  return {
    totalAnalyses,
    uniqueSources: dataSources.size,
    activeAlerts,
    sectionCount: sections.length,
  };
}

// ---------------------------------------------------------------------------
// Sub-section labels for section 23 (special)
// ---------------------------------------------------------------------------

const section23Groups: { label: string; startIdx: number; endIdx: number }[] = [
  { label: "Metadata", startIdx: 0, endIdx: 5 },
  { label: "Jazyk a emoce", startIdx: 6, endIdx: 12 },
  { label: "Doklady jako otisk prstu", startIdx: 13, endIdx: 19 },
  { label: "Geografická data", startIdx: 20, endIdx: 23 },
  { label: "Síťové efekty", startIdx: 24, endIdx: 27 },
  { label: "Meta o SCH-EKONOM", startIdx: 28, endIdx: 34 },
  { label: "Temporální kuriozity", startIdx: 35, endIdx: 38 },
  { label: "Absence jako data", startIdx: 39, endIdx: 43 },
  { label: "Psychologie kanceláře", startIdx: 44, endIdx: 47 },
  { label: "Strategické signály", startIdx: 48, endIdx: 53 },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ReportingPage() {
  const { session } = useAuth();
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  if (!session) return null;

  const stats = computeStats();

  const toggle = (id: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => {
    setExpanded(new Set(sections.map((s) => s.id)));
  };

  const collapseAll = () => {
    setExpanded(new Set());
  };

  const allExpanded = expanded.size === sections.length;

  return (
    <div className="space-y-8">
      {/* ----------------------------------------------------------------- */}
      {/* Header                                                            */}
      {/* ----------------------------------------------------------------- */}
      <div>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="hud-chip" data-tone="cyan">
            ANALYTICKÉ CENTRUM
          </span>
          <span className="hud-chip" data-tone="gold">
            TOTÁLNÍ DATOVÁ MAPA
          </span>
        </div>
        <h1
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            color: "#FFFFFF",
            fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)",
            lineHeight: 1.1,
            marginBottom: 8,
          }}
        >
          Analytické centrum
        </h1>
        <p
          style={{
            color: "#7A8A9E",
            maxWidth: 700,
            lineHeight: 1.6,
            fontSize: "0.92rem",
          }}
        >
          {stats.sectionCount} kategorií. {stats.totalAnalyses}+ analýz. Každý
          úhel pohledu.
        </p>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* KPI Bar                                                           */}
      {/* ----------------------------------------------------------------- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Celkem analýz",
            value: stats.totalAnalyses.toString(),
            tone: "cyan",
          },
          {
            label: "Datových zdrojů",
            value: stats.uniqueSources.toString(),
            tone: "gold",
          },
          {
            label: "Aktivních alertů",
            value: stats.activeAlerts.toString(),
            tone: "red",
          },
          {
            label: "Kategorií",
            value: stats.sectionCount.toString(),
            tone: "cyan",
          },
        ].map((kpi) => (
          <div key={kpi.label} className="hud-metric-card" data-tone={kpi.tone}>
            <div
              style={{
                fontFamily: "SF Mono, Monaco, Consolas, monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(0,229,255,0.72)",
                marginBottom: 4,
              }}
            >
              {kpi.label}
            </div>
            <div
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "1.6rem",
                fontWeight: 700,
                color: "#FFFFFF",
              }}
            >
              {kpi.value}
            </div>
          </div>
        ))}
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Expand / Collapse all                                             */}
      {/* ----------------------------------------------------------------- */}
      <div className="flex items-center justify-between">
        <div
          style={{
            fontFamily: "SF Mono, Monaco, Consolas, monospace",
            fontSize: "0.62rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(0,229,255,0.72)",
          }}
        >
          {expanded.size} / {sections.length} rozbaleno
        </div>
        <button
          onClick={allExpanded ? collapseAll : expandAll}
          className="hud-chip cursor-pointer"
          data-tone="cyan"
          style={{ border: "1px solid rgba(0,229,255,0.25)" }}
        >
          {allExpanded ? "Sbalit vše" : "Rozbalit vše"}
        </button>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Accordion sections                                                */}
      {/* ----------------------------------------------------------------- */}
      <div className="space-y-3">
        {sections.map((section) => {
          const isOpen = expanded.has(section.id);
          const Icon = section.icon;
          const isSpecial = section.special;

          return (
            <div
              key={section.id}
              className="hud-panel overflow-hidden"
              style={{
                borderColor: isSpecial
                  ? "rgba(212,175,55,0.25)"
                  : "rgba(0,229,255,0.08)",
              }}
            >
              {/* Section header (clickable) */}
              <button
                onClick={() => toggle(section.id)}
                className="w-full flex items-center gap-3 p-5 text-left cursor-pointer transition-colors"
                style={{
                  background: isOpen ? "rgba(0,229,255,0.03)" : "transparent",
                }}
              >
                <div
                  className="flex h-9 w-9 items-center justify-center flex-shrink-0"
                  style={{
                    background: isSpecial
                      ? "rgba(212,175,55,0.1)"
                      : "rgba(0,229,255,0.06)",
                    border: isSpecial
                      ? "1px solid rgba(212,175,55,0.25)"
                      : "1px solid rgba(0,229,255,0.15)",
                  }}
                >
                  <Icon
                    size={16}
                    style={{
                      color: isSpecial ? "#D4AF37" : "#00E5FF",
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      style={{
                        fontFamily: "SF Mono, Monaco, Consolas, monospace",
                        fontSize: "0.6rem",
                        letterSpacing: "0.18em",
                        color: isSpecial
                          ? "rgba(212,175,55,0.7)"
                          : "rgba(0,229,255,0.5)",
                      }}
                    >
                      {String(section.id).padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontWeight: 700,
                        fontSize: "0.95rem",
                      }}
                    >
                      {isSpecial ? "\uD83D\uDD75\uFE0F " : ""}
                      {section.title}
                    </span>
                  </div>
                </div>

                <span
                  className="hud-chip flex-shrink-0"
                  data-tone={isSpecial ? "gold" : "cyan"}
                >
                  {section.analyses.length} analýz
                </span>

                {isOpen ? (
                  <ChevronDown
                    size={16}
                    style={{ color: "#7A8A9E", flexShrink: 0 }}
                  />
                ) : (
                  <ChevronRight
                    size={16}
                    style={{ color: "#7A8A9E", flexShrink: 0 }}
                  />
                )}
              </button>

              {/* Expanded content */}
              {isOpen && (
                <div
                  className="px-5 pb-5"
                  style={{
                    borderTop: "1px solid rgba(0,229,255,0.06)",
                  }}
                >
                  {/* For section 23 (special), render sub-groups */}
                  {isSpecial ? (
                    <div className="space-y-6 pt-4">
                      {section23Groups.map((group) => (
                        <div key={group.label}>
                          <div
                            style={{
                              fontFamily:
                                "SF Mono, Monaco, Consolas, monospace",
                              fontSize: "0.6rem",
                              letterSpacing: "0.18em",
                              textTransform: "uppercase",
                              color: "rgba(212,175,55,0.7)",
                              marginBottom: 12,
                              paddingBottom: 6,
                              borderBottom: "1px solid rgba(212,175,55,0.12)",
                            }}
                          >
                            {group.label}
                          </div>
                          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                            {section.analyses
                              .slice(group.startIdx, group.endIdx + 1)
                              .map((analysis, idx) => (
                                <AnalysisCard
                                  key={`${group.label}-${idx}`}
                                  analysis={analysis}
                                  isSpecial
                                  sectionId={section.id}
                                  index={group.startIdx + idx}
                                />
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid gap-3 pt-4 sm:grid-cols-2 xl:grid-cols-3">
                      {section.analyses.map((analysis, idx) => (
                        <AnalysisCard
                          key={idx}
                          analysis={analysis}
                          isSpecial={false}
                          sectionId={section.id}
                          index={idx}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Data sources grid                                                 */}
      {/* ----------------------------------------------------------------- */}
      <div className="hud-panel p-6">
        <div className="mb-5 flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center"
            style={{
              background: "rgba(0,229,255,0.08)",
              border: "1px solid rgba(0,229,255,0.2)",
            }}
          >
            <Database size={18} style={{ color: "#00E5FF" }} />
          </div>
          <div>
            <div
              style={{
                fontFamily: "SF Mono, Monaco, Consolas, monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(0,229,255,0.72)",
              }}
            >
              DATOVÉ ZDROJE // NAPOJENÍ
            </div>
            <div
              style={{ color: "#FFFFFF", fontSize: "1rem", fontWeight: 600 }}
            >
              Odkud data tečou
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[
            {
              name: "Money S3 / Pohoda",
              type: "Účetní systém",
              icon: Database,
            },
            { name: "DocuWare", type: "DMS", icon: Layers },
            { name: "Daktela", type: "Contact center", icon: MessageSquare },
            {
              name: "Bankovní API (FIO, KB, ČSOB)",
              type: "Transakce",
              icon: Wallet,
            },
            { name: "ARES + VIES", type: "Rejstříky", icon: ShieldAlert },
            {
              name: "ČSSZ + eNeschopenky",
              type: "Sociální pojištění",
              icon: Users,
            },
            {
              name: "DIS+ (Finanční správa)",
              type: "Daňový portál",
              icon: Scale,
            },
            { name: "ELSTER / Finanzamt", type: "Německé daně", icon: Globe },
            {
              name: "Email server (IMAP)",
              type: "Komunikace",
              icon: MessageSquare,
            },
            { name: "Justice.cz", type: "Rejstříky", icon: ShieldAlert },
            {
              name: "GPS + knihy jízd",
              type: "Geolokace",
              icon: Radio,
            },
            { name: "Reenio", type: "Rezervace", icon: Clock },
            { name: "TeamViewer", type: "Vzdálená podpora", icon: Lock },
            {
              name: "ČHMÚ",
              type: "Meteorologická data",
              icon: Activity,
            },
          ].map((src) => {
            const SrcIcon = src.icon;
            return (
              <div
                key={src.name}
                className="p-3 transition-colors"
                style={{
                  border: "1px solid rgba(0,229,255,0.1)",
                  background: "rgba(0,229,255,0.02)",
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <SrcIcon size={12} style={{ color: "#00E5FF" }} />
                  <div
                    className="flex items-center gap-1.5"
                    style={{ marginLeft: "auto" }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: "#00E5A0" }}
                    />
                    <span
                      style={{
                        fontFamily: "SF Mono, Monaco, Consolas, monospace",
                        fontSize: "0.5rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#00E5A0",
                      }}
                    >
                      PŘIPOJENO
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    color: "#FFFFFF",
                    fontWeight: 600,
                    fontSize: "0.82rem",
                    marginBottom: 2,
                  }}
                >
                  {src.name}
                </div>
                <div style={{ color: "#7A8A9E", fontSize: "0.7rem" }}>
                  {src.type}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Concluding quote                                                  */}
      {/* ----------------------------------------------------------------- */}
      <div
        className="hud-panel p-6 text-center"
        style={{ borderColor: "rgba(212,175,55,0.15)" }}
      >
        <Brain
          size={28}
          className="mx-auto mb-3"
          style={{ color: "#D4AF37" }}
        />
        <div
          style={{
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: "1.1rem",
            marginBottom: 8,
          }}
        >
          {stats.totalAnalyses} analýz. {stats.uniqueSources} datových zdrojů.{" "}
          {stats.sectionCount} úhlů pohledu.
        </div>
        <div
          style={{
            color: "#B8C1C8",
            maxWidth: 640,
            margin: "0 auto",
            lineHeight: 1.7,
            fontSize: "0.92rem",
          }}
        >
          Hodnota není v množství dat. Hodnota je v korelacích, které vznikají
          teprve propojením účetnictví + komunikace + mezd + rejstříků + geodat
          + behaviorálních stop. To je rozdíl mezi «účetní firmou s počítači» a{" "}
          <strong style={{ color: "#D4AF37" }}>
            autonomním finančním centrem
          </strong>
          .
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Analysis Card component
// ---------------------------------------------------------------------------

function AnalysisCard({
  analysis,
  isSpecial,
  sectionId,
  index,
}: {
  analysis: Analysis;
  isSpecial: boolean;
  sectionId: number;
  index: number;
}) {
  const analysisId = `${sectionId}-${String(index + 1).padStart(2, "0")}`;
  return (
    <Link
      href={`/portal/reporting/${analysisId}`}
      className="block hover:scale-[1.01] transition-transform"
    >
      <div
        style={{
          background: "rgba(255,255,255,0.02)",
          border: isSpecial
            ? "1px solid rgba(212,175,55,0.12)"
            : "1px solid rgba(0,229,255,0.08)",
          padding: "14px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {/* Card title + source */}
        <div>
          <div
            style={{
              color: "#FFFFFF",
              fontWeight: 600,
              fontSize: "0.85rem",
              lineHeight: 1.4,
              marginBottom: 3,
            }}
          >
            {analysis.name}
          </div>
          <div
            style={{
              fontFamily: "SF Mono, Monaco, Consolas, monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.06em",
              color: "#58758C",
            }}
          >
            &larr; {analysis.source}
          </div>
        </div>

        {/* Good state */}
        <div
          style={{
            borderLeft: "2px solid #00E5A0",
            paddingLeft: 10,
          }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <CheckCircle
              size={12}
              style={{ color: "#00E5A0", flexShrink: 0 }}
            />
            <span
              style={{
                fontFamily: "SF Mono, Monaco, Consolas, monospace",
                fontSize: "0.55rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#00E5A0",
                fontWeight: 600,
              }}
            >
              DOBRÝ STAV
            </span>
          </div>
          <div
            style={{
              color: "#B8C1C8",
              fontSize: "0.78rem",
              lineHeight: 1.5,
            }}
          >
            {analysis.good}
          </div>
        </div>

        {/* Bad state */}
        <div
          style={{
            borderLeft: "2px solid #FF7B7B",
            paddingLeft: 10,
          }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <XCircle size={12} style={{ color: "#FF7B7B", flexShrink: 0 }} />
            <span
              style={{
                fontFamily: "SF Mono, Monaco, Consolas, monospace",
                fontSize: "0.55rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#FF7B7B",
                fontWeight: 600,
              }}
            >
              RIZIKO
            </span>
          </div>
          <div
            style={{
              color: "#B8C1C8",
              fontSize: "0.78rem",
              lineHeight: 1.5,
            }}
          >
            {analysis.bad}
          </div>
        </div>

        {/* Detail link */}
        <div style={{ marginTop: 10, textAlign: "right" }}>
          <span
            style={{
              fontFamily: "SF Mono, Monaco, Consolas, monospace",
              fontSize: "0.58rem",
              letterSpacing: "0.12em",
              color: "rgba(0,229,255,0.5)",
            }}
          >
            DETAIL →
          </span>
        </div>
      </div>
    </Link>
  );
}
