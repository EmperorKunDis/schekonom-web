import type { AnalysisDetail } from "./types";

export const section12Analyses: AnalysisDetail[] = [
  {
    id: "12-01",
    sectionId: 12,
    sectionTitle: "Strategie a segmentace",
    name: "Segmentace",
    source: "clustering",
    good: "4 jasné segmenty, cílený přístup",
    bad: "Všem stejný servis — neefektivní",
    description:
      "Automatická segmentace klientského portfolia pomocí clusteringových algoritmů identifikuje přirozené skupiny klientů s podobnými charakteristikami. Segmentace umožňuje cílený přístup — jiný servis pro velké firmy, jiný pro OSVČ pendlery.\n\nModel zohledňuje: obrat, počet zaměstnanců, obor, typ služeb, komunikační styl, platební morálku a CLV. Výsledkem jsou 3–5 segmentů s jasným profilem a doporučenou strategií.\n\nSegmentace se automaticky aktualizuje kvartálně a detekuje klienty, kteří migrují mezi segmenty — což je samo o sobě důležitý signál.",
    methodology:
      "K-means clustering s optimalizací k (silhouette score): 1) Normalizace featur, 2) PCA pro redukci dimenzí, 3) Clustering, 4) Profilování segmentů, 5) Přiřazení strategie per segment, 6) Detekce migrace mezi segmenty.",
    dataInputs: [
      "Finanční profil klientů (9-xx)",
      "Komunikační vzorce (7-xx)",
      "Využití služeb (16-xx)",
      "Oborová klasifikace (NACE)",
      "Platební morálka",
    ],
    outputMetrics: [
      "Počet segmentů a jejich velikost",
      "Profil každého segmentu",
      "CLV per segment",
      "Migrace mezi segmenty",
      "Doporučená strategie per segment",
    ],
    goodScenario: {
      title: "Jasná segmentace",
      description:
        "Portfolio je rozděleno do 4 jasných segmentů: Premium (12 klientů, CLV > 300K), Standard (28), OSVČ-pendleři (45), Start-up (8). Každý segment má cílenou strategii.",
      indicators: [
        "4 segmenty s jasným profilem",
        "Silhouette score 0.72",
        "0 klientů bez přiřazení",
        "Strategie definována per segment",
      ],
      actions: [
        "Implementovat cílenou komunikaci",
        "Upravit ceníky per segment",
        "Přiřadit specializované účetní per segment",
      ],
    },
    badScenario: {
      title: "Jedna velikost pro všechny",
      description:
        "Neexistuje funkční segmentace — všichni klienti dostávají identický servis bez ohledu na velikost, potřeby a hodnotu. Premium klienti jsou podservisovaní, malí klienti přeservisovaní.",
      indicators: [
        "Žádná segmentace",
        "Premium klienti stěžují na generický přístup",
        "OSVČ dostávají reporty pro korporáty",
        "Marže nekoreluje s effort",
      ],
      actions: [
        "Implementovat segmentaci dle tohoto modelu",
        "Definovat SLA per segment",
        "Přiřadit account managery per segment",
        "Upravit komunikační šablony",
      ],
    },
    frequency: "Kvartálně",
    automationLevel: "80 % automatizováno",
    relatedAnalyses: ["12-02", "12-04", "9-01", "16-01"],
    businessImpact: "Vysoký — efektivita obsluhy a spokojenost klientů",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "12-02",
    sectionId: 12,
    sectionTitle: "Strategie a segmentace",
    name: "Voice of Customer",
    source: "topic modeling",
    good: "Top téma: digitalizace",
    bad: "Top téma: stížnosti na cenu",
    description:
      "Portfolio-wide Voice of Customer analýza — agregace témat z klientské komunikace identifikuje, co nejvíc rezonuje napříč portfoliem. Strategický vstup pro produktový roadmap, marketing a pricing. Posun top tématu z 'stížnosti na cenu' na 'digitalizace' je indikátor zdravého vývoje vztahu se klienty.",
    methodology:
      "LDA topic modeling (gensim) na všech Daktela přepisech + emailech za posledních 12M. Top 20 topics extrakce + ranking podle frekvence × sentiment weight. Trend topics per kvartál. Competitor mention detection (regex + NLP) jako submetric.",
    dataInputs: [
      "Daktela přepisy (agregace portfolio)",
      "Email komunikace portfolio",
      "NPS/CSAT dotazníky",
      "Exit interviews (odcházející klienti)",
      "Reenio schůzek notes",
    ],
    outputMetrics: [
      "Top 10 témat portfolio",
      "Topic sentiment score",
      "Topic trend 12M",
      "Themes by segment (12-01)",
      "Emerging topics (acceleration)",
    ],
    goodScenario: {
      title: "Klienti volají po inovaci",
      description:
        "Top téma napříč portfoliem: 'digitalizace, API integrace, automation'. 62 % klientů aktivně zmiňuje zájem o pokročilé služby. Sentiment tématu pozitivní.",
      indicators: [
        "Top topic: 'digitalizace' (28 %)",
        "62 % klientů zmiňuje",
        "Topic sentiment +0.72",
        "Rostoucí trend 12M",
      ],
      actions: [
        "Investovat do digital offer",
        "Pilot s 3-5 premium klienty",
        "Marketing message: innovation partner",
      ],
    },
    badScenario: {
      title: "Stížnosti na cenu dominují",
      description:
        "Top téma: stížnosti na cenu (41 % komunikace), 'drahé', 'konkurence levnější'. Sentiment negativní. Klienti vnímají service jako commoditu, ne hodnotu.",
      indicators: [
        "Top topic: 'stížnosti na cenu' (41 %)",
        "Topic sentiment −0.58",
        "18 % klientů zmiňuje konkurenci",
        "Rostoucí trend",
      ],
      actions: [
        "Value re-positioning kampaň",
        "Transparentní pricing breakdown",
        "Upsell na nižší-cena + vyšší-value packages",
        "Competitor intelligence (12-03)",
      ],
    },
    frequency: "Kvartálně (LDA re-fit)",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["7-02", "9-05", "12-03"],
    businessImpact: "Vysoký — strategický input pro business",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "12-03",
    sectionId: 12,
    sectionTitle: "Strategie a segmentace",
    name: "Competitor intelligence",
    source: "zmínky",
    good: "0 zmínek konkurence",
    bad: "Klient zmínil 3× levnější nabídku",
    description:
      "Monitoring zmínek konkurenčních kanceláří (ASB, BDO, KPMG, Deloitte, regionální firmy) v komunikaci klientů. Zmínky konkurence jsou silný leading indicator churn rizika — klient aktivně porovnává nebo už dostává konkurenční nabídky. Agregace poskytuje portfolio-level competitive intelligence.",
    methodology:
      "Named Entity Recognition (spaCy cs_core_news_lg) + custom competitor dictionary (~80 jmen CZ účetních firem + auditoři). Kontext extrakce: price mentioned, service mentioned, switching intent. Per-klient alert při detekci. Portfolio-level aggregation + trend analysis.",
    dataInputs: [
      "Daktela přepisy + emaily (full text)",
      "Competitor dictionary (maintained list)",
      "spaCy NER pro organizace",
      "Kontextový NLP (±10 tokens)",
      "ARES registry konkurence (pro IČO matching)",
    ],
    outputMetrics: [
      "Mentions počet / kvartál",
      "Top zmiňovaní konkurenti",
      "Kontext distribuce (price/service/team)",
      "Switching intent score",
      "Portfolio churn risk signal",
    ],
    goodScenario: {
      title: "Žádná konkurenční hrozba",
      description:
        "0 zmínek konkurence za poslední kvartál. Klienti spokojeni, neuvažují o změně, neporovnávají s jinými nabídkami.",
      indicators: [
        "0 mentions / kvartál",
        "Historical avg 0.4 / Q",
        "0 switching intent",
        "Stable competitive position",
      ],
      actions: ["Udržet kvalitu", "Marketing: 'klienti zůstávají' message"],
    },
    badScenario: {
      title: "Klient aktivně porovnává",
      description:
        "Klient zmínil konkurenci 3× za měsíc — konkrétně ASB ('dělali by to za polovinu') a 2× KPMG ('mají portál pro self-service'). Switching intent detekováno. Vysoká pravděpodobnost churn.",
      indicators: [
        "3 mentions / měsíc",
        "ASB (price) + KPMG (service)",
        "Switching intent 0.82",
        "Churn risk 10-01: 74 %",
      ],
      actions: [
        "Okamžitá retention intervence",
        "Konkurenční nabídka breakdown — proč my",
        "Match relevant features (self-service portál)",
        "Loyalty incentive (2 roky pricing lock)",
      ],
    },
    frequency: "Týdně",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["10-01", "9-04", "12-02"],
    businessImpact: "Kritický — direct churn predictor",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "12-04",
    sectionId: 12,
    sectionTitle: "Strategie a segmentace",
    name: "Benchmark",
    source: "portfolio",
    good: "Klient nad průměrem oboru",
    bad: "Klient 40% pod průměrem — riziko úpadku",
    description:
      "Portfolio-wide benchmarking klienta proti průměru jeho oboru (NACE) i proti interním peer group. Klient výrazně pod průměrem je nejen riziko insolvence (10-09), ale i strategická výzva — kancelář může proaktivně nabídnout konzultace, controllingové služby, turnaround podporu.",
    methodology:
      "Bisnode/Creditinfo NACE benchmarks + internal portfolio peer group. Computation: klient percentile per KPI (obrat, marže, produktivita, platební morálka). Composite benchmark score. Peer group: 10 klientů ze stejného NACE + obrat ±30 %. Gap analysis + improvement roadmap.",
    dataInputs: [
      "Klient finanční výkazy (1-02)",
      "Bisnode/Creditinfo NACE data",
      "Internal portfolio peer group",
      "Produktivita KPIs",
      "Platební morálka (9-03)",
    ],
    outputMetrics: [
      "Benchmark percentile per KPI",
      "Composite score (0-100)",
      "Peer group comparison",
      "Gap to median (%)",
      "Improvement potential (Kč)",
    ],
    goodScenario: {
      title: "Above-average performer",
      description:
        "Klient v 78. percentilu oboru (NACE 69.20 Účetnické služby). Obrat +34 % vs. medián, marže +18 %, produktivita +22 %. Zdravý performer.",
      indicators: [
        "Percentile 78",
        "Obrat +34 % vs. medián",
        "Marže +18 %",
        "Composite 84/100",
      ],
      actions: [
        "Prezentovat klientovi pozitivní benchmark (value-add)",
        "Upsell advisory služby",
        "Reference pro marketing",
      ],
    },
    badScenario: {
      title: "Under-performer — hrozba úpadku",
      description:
        "Klient 40 % pod oborovým průměrem. Obrat −40 %, marže −28 %, produktivita −22 %. Kombinace s 10-09 predikcí insolvence (score 34/100). Vysoké riziko do 12M.",
      indicators: [
        "Percentile 8",
        "Obrat −40 %",
        "Marže −28 %",
        "Insolvency risk (10-09): 54 %",
      ],
      actions: [
        "Proaktivní strategická konzultace",
        "Nabídnout turnaround advisory",
        "Identifikovat quick wins (cash, margin)",
        "Risk plan pro kancelář (retention + credit)",
      ],
    },
    frequency: "Kvartálně",
    automationLevel: "70 % automatizováno",
    relatedAnalyses: ["1-02", "10-09", "12-01"],
    businessImpact: "Vysoký — strategická hodnota pro klienta",
    implementationStatus: "Produkce",
    scope: "client",
  },
];
