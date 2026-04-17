import type { AnalysisDetail } from "./types";

export const section05Analyses: AnalysisDetail[] = [
  {
    id: "5-01",
    sectionId: 5,
    sectionTitle: "Daňové poradenství",
    name: "Scénáře «co kdyby»",
    source: "simulační model",
    good: "Optimální struktura ušetří 15% efektivní sazby",
    bad: "Klient přeplatil 340K — neprovedena optimalizace",
    description:
      "Simulační model «co kdyby» umožňuje testovat různé daňové strategie bez reálného dopadu. Systém modeluje alternativní scénáře (změna právní formy, optimalizace odpisů, přerozdělení příjmů) a kvantifikuje jejich dopad na efektivní daňovou sazbu.\n\nKaždý scénář zahrnuje kompletní výpočet DPPO/DPFO, zdravotního a sociálního pojištění a výsledný čistý příjem. Výsledky jsou vizualizovány v porovnávací tabulce s jasným doporučením.\n\nModel je průběžně aktualizován dle platné legislativy a automaticky přepočítává scénáře při změnách zákonů.",
    methodology:
      "Monte Carlo simulace s parametrickými vstupy: 1) Aktuální daňová struktura jako baseline, 2) Definice alternativních scénářů, 3) Výpočet celkové daňové zátěže per scénář, 4) Sensitivity analýza klíčových parametrů, 5) Ranking scénářů dle čistého příjmu po zdanění.",
    dataInputs: [
      "Aktuální příjmy a výdaje klienta",
      "Struktura majetku a odpisy",
      "Rodinné poměry (slevy, zvýhodnění)",
      "Platná legislativa (zákon o daních z příjmů)",
      "Historické výsledky pro trend",
    ],
    outputMetrics: [
      "Efektivní daňová sazba per scénář",
      "Absolutní úspora v Kč",
      "Ranking scénářů",
      "Rizikový profil scénáře",
      "Implementační náročnost",
    ],
    goodScenario: {
      title: "Optimální daňová struktura",
      description:
        "Simulace identifikovala strukturu, která sníží efektivní daňovou sazbu o 15 %. Kombinace optimalizace odpisů a správného načasování výdajů přinese úsporu 280 000 Kč ročně.",
      indicators: [
        "Úspora 15 % efektivní sazby",
        "Absolutní úspora 280 000 Kč/rok",
        "Scénář plně v souladu s legislativou",
        "Nízká implementační náročnost",
      ],
      actions: [
        "Prezentovat výsledky klientovi",
        "Připravit implementační plán",
        "Nastavit monitoring dodržování struktury",
      ],
    },
    badScenario: {
      title: "Zmeškaná optimalizace",
      description:
        "Klient nebyl informován o možnostech optimalizace a přeplatil na daních 340 000 Kč. Jednoduchá úprava odpisové politiky a načasování fakturace by přinesla výraznou úsporu.",
      indicators: [
        "Přeplatek 340 000 Kč",
        "Efektivní sazba 23 % vs. optimum 18 %",
        "Žádná optimalizace provedena",
        "Klient nebyl informován o možnostech",
      ],
      actions: [
        "Okamžitě provést simulaci pro aktuální rok",
        "Navrhnout zpětnou optimalizaci (dodatečné přiznání)",
        "Implementovat proaktivní alerting",
        "Zařadit klienta do pravidelného review cyklu",
      ],
    },
    frequency: "Kvartálně + při legislativních změnách",
    automationLevel: "60 % automatizováno",
    relatedAnalyses: ["5-02", "5-04", "1-08", "2-01"],
    businessImpact:
      "Kritický — přímý finanční dopad na klienty v řádu stovek tisíc Kč",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "5-02",
    sectionId: 5,
    sectionTitle: "Daňové poradenství",
    name: "Transferové ceny",
    source: "smluvní data",
    good: "Dokumentace kompletní, v souladu s OECD",
    bad: "Chybí TP dokumentace — riziko doměrku 2M+",
    description:
      "Transferové ceny (TP) mezi spřízněnými osobami dle § 23 odst. 7 ZDP a OECD TP Guidelines. Od 2014 povinná dokumentace (pokyn GFŘ D-334) pro transakce nad 200 M Kč. Systém agreguje smluvní data a validuje arm's length principle.",
    methodology:
      "Identifikace spřízněných osob (ownership > 25 %). Klasifikace transakcí (zboží, služby, licence, úvěry). Benchmark analýza (Amadeus/Bureau van Dijk DB). Dokumentace master + local file. Country-by-Country reporting (CbCR) pro skupiny > 750M EUR.",
    dataInputs: [
      "ERP smluvní data (intercompany)",
      "Ownership struktura (OR ARES)",
      "Amadeus / TP Catalyst DB",
      "Smlouvy intercompany",
      "Funkční profily entit",
    ],
    outputMetrics: [
      "Arm's length range (interquartile)",
      "Deviation od mediánu (%)",
      "TP dokumentace completeness (%)",
      "CbCR readiness",
      "Riziko doměrku (Kč)",
    ],
    goodScenario: {
      title: "TP dokumentace kompletní",
      description:
        "Master + local file aktuální, benchmarking v arm's length range, CbCR podán, 0 neshod s OECD.",
      indicators: [
        "Dokumentace 100 %",
        "Arm's length OK",
        "CbCR OK",
        "OECD compliant",
      ],
      actions: ["Roční update dokumentace", "Monitoring legislativy"],
    },
    badScenario: {
      title: "Chybí TP dokumentace",
      description:
        "Žádná TP dokumentace pro intercompany 280M — riziko doměrku 2M+ a pokut při kontrole FÚ. Základ pro reklasifikaci jako skrytá distribuce zisku.",
      indicators: [
        "0 dokumentace",
        "280M intercompany",
        "Riziko 2M+",
        "Pokuta § 38t",
      ],
      actions: [
        "Urgentně zpracovat local file",
        "Benchmark analýza",
        "Konzultace TP specialisty",
        "Přeceníní intercompany transakcí",
      ],
    },
    frequency: "Ročně (dokumentace) + při nových transakcích",
    automationLevel: "60 % automatizováno",
    relatedAnalyses: ["2-05", "5-03"],
    businessImpact: "Kritický — vysoké riziko doměrku",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "5-03",
    sectionId: 5,
    sectionTitle: "Daňové poradenství",
    name: "Zastupování při kontrolách",
    source: "DIS+",
    good: "5 kontrol za 3 roky, 0 doměrků",
    bad: "Doměrek 1.2M + penále 240K",
    description:
      "Zastupování klienta při daňové kontrole finanční správy. Systém agreguje podklady z DIS+ (Daňová informační schránka), komunikaci s FÚ, protokoly a rozhodnutí. Úspěšnost zastupování = míra uhájení původního přiznání bez doměrku.",
    methodology:
      "DIS+ API pro stahnutí výzev a rozhodnutí. Workflow: protokol o kontrole → dodání podkladů → vysvětlení sporných bodů → vyjádření k výsledkům → odvolání. Tracking: open kontroly, dny do deadline, sporné částky, result.",
    dataInputs: [
      "DIS+ API (MOJE daně)",
      "Daňová přiznání archiv",
      "Účetní podklady (Money S3)",
      "Historie kontrol a výsledků",
      "Korespondence s FÚ (datová schránka)",
    ],
    outputMetrics: [
      "Počet aktivních kontrol",
      "Sporné částky (Kč)",
      "Úspěšnost (% uhájeno)",
      "Průměrná doba kontroly (dny)",
      "Doměrky + penále (Kč)",
    ],
    goodScenario: {
      title: "Úspěšné zastupování",
      description:
        "5 kontrol za 3 roky, 0 doměrků — všechny spory uhájeny, dokumentace kvalitní, proaktivní komunikace s FÚ.",
      indicators: [
        "5 kontrol, 0 doměrků",
        "100 % úspěšnost",
        "Doklady OK",
        "0 odvolání",
      ],
      actions: ["Pokračovat v procesu", "Šířit best practice"],
    },
    badScenario: {
      title: "Doměrek + penále",
      description:
        "Doměrek 1.2M Kč + penále 240K (20 % z doměrku) — chybné zaúčtování neuznatelných nákladů, nedostatečná dokumentace při kontrole.",
      indicators: [
        "Doměrek 1.2M",
        "Penále 240K",
        "Chybí dokumentace",
        "Prohraná kontrola",
      ],
      actions: [
        "Odvolání do 30 dnů",
        "Žádost o posečkání platby",
        "Audit chybných zaúčtování",
        "Školení účetní — § 25 ZDP",
      ],
    },
    frequency: "Průběžně (dle kontrol FÚ)",
    automationLevel: "60 % automatizováno",
    relatedAnalyses: ["5-04", "5-06", "1-08"],
    businessImpact: "Kritický — vysoké finanční dopady",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "5-04",
    sectionId: 5,
    sectionTitle: "Daňové poradenství",
    name: "Monitoring DIS+",
    source: "API FS",
    good: "Všechny předpisy spárovány, 0 nedoplatků",
    bad: "Nespárovaný předpis 89K — hrozí exekuce",
    description:
      "Denní monitoring DIS+ (Daňová informační schránka) pro všechny klienty. Systém stahuje předpisy, výzvy, protokoly a rozhodnutí. Automatické párování předpisů s provedenými platbami a detekce nedoplatků. Nespárovaný předpis = hrozba daňové exekuce.",
    methodology:
      "REST API MOJE daně (finančnísprava.cz/api/dis) s klientským oprávněním. Denní stažení: účet daňového subjektu, předpisy, platby, zůstatek. Párování pomocí variabilního symbolu. Alert při nedoplatku > 7 dnů od splatnosti.",
    dataInputs: [
      "DIS+ API finanční správy",
      "Zálohy DPPO / DPFO / DPH",
      "Bankovní výpisy (platby)",
      "Daňový kalendář (termíny)",
      "Historie komunikace s FÚ",
    ],
    outputMetrics: [
      "Zůstatek daňového účtu (Kč)",
      "Nespárované předpisy (Kč)",
      "Nedoplatky > 7 dnů (Kč)",
      "Blížící se termíny (dny)",
      "Výzvy / kontroly status",
    ],
    goodScenario: {
      title: "DIS+ plně pod kontrolou",
      description:
        "Všechny předpisy spárovány s platbami, 0 nedoplatků, zálohy platí včas, 0 výzev od FÚ.",
      indicators: ["100 % spárováno", "0 nedoplatků", "Zálohy včas", "0 výzev"],
      actions: ["Pokračovat v denním monitoringu", "Měsíční report"],
    },
    badScenario: {
      title: "Nespárovaný předpis = exekuce",
      description:
        "Předpis 89K Kč nespárován 45 dní po splatnosti, FÚ vydal exekuční příkaz na účet klienta.",
      indicators: [
        "89K nespárováno",
        "45 dní po splatnosti",
        "Exekuční příkaz",
        "Blokace účtu",
      ],
      actions: [
        "Okamžitá platba + identifikace VS",
        "Žádost o zastavení exekuce",
        "Prošetření, proč nebylo detekováno",
        "Zlepšit monitoring",
      ],
    },
    frequency: "Denně",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["5-03", "1-05", "5-06"],
    businessImpact: "Kritický — prevence exekuce",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "5-05",
    sectionId: 5,
    sectionTitle: "Daňové poradenství",
    name: "Due diligence",
    source: "agregace modulů",
    good: "Čistý profil, žádné skryté závazky",
    bad: "Odkryty podmíněné závazky za 4.5M",
    description:
      "Finanční a daňová due diligence pro M&A, investiční projekty, úvěrové financování. Systém agreguje data ze všech modulů (účetnictví, daně, mzdy, smlouvy) a identifikuje rizika, skryté závazky a úskalí. Výstup: DD report s red flags.",
    methodology:
      "Automatizovaný sběr dat: HV posledních 3 let, DPH přiznání, mzdové závazky, soudní spory, soudní pohledávky, intercompany, kontingentní závazky (garance, sliby). Checklist 150+ bodů. AI-driven anomaly detection v datech.",
    dataInputs: [
      "Money S3 — 3 roky účetnictví",
      "DPH přiznání + KH",
      "Smlouvy (DocuWare)",
      "Soudní spory (justice.cz API)",
      "OR a ARES (vlastnictví, vazby)",
    ],
    outputMetrics: [
      "Celkové závazky (Kč)",
      "Podmíněné závazky (Kč)",
      "Red flags count",
      "Soudní riziko (Kč)",
      "Compliance score (0-100)",
    ],
    goodScenario: {
      title: "Čistý due diligence profil",
      description:
        "0 red flags, konzistentní účetnictví 3 roky, žádné skryté závazky, soudní spory minimální, vhodný pro M&A.",
      indicators: [
        "0 red flags",
        "Konzistence 3 roky",
        "0 skrytých závazků",
        "Compliance 95+",
      ],
      actions: ["Dokončit DD report", "Proceed s transakcí"],
    },
    badScenario: {
      title: "Odhalené skryté závazky",
      description:
        "Podmíněné závazky 4.5M (ručitelství, soudní spory), nezaúčtované dohady 800K, transferové ceny bez dokumentace.",
      indicators: [
        "4.5M podmíněných",
        "800K dohady",
        "Chybí TP dokumentace",
        "Red flags 12",
      ],
      actions: [
        "Re-pricing transakce",
        "Požadavek na escrow account",
        "Představení závazků prodávajícímu",
        "Consider exit z jednání",
      ],
    },
    frequency: "Na vyžádání (M&A, úvěry)",
    automationLevel: "65 % automatizováno",
    relatedAnalyses: ["5-02", "10-07", "1-02"],
    businessImpact: "Kritický — rozhodování o transakcích",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "5-06",
    sectionId: 5,
    sectionTitle: "Daňové poradenství",
    name: "Predikce kontroly FÚ",
    source: "vzorce",
    good: "Nízká pravděpodobnost 8%",
    bad: "78% pravděpodobnost kontroly — 3 rizikové faktory",
    description:
      "ML model predikující pravděpodobnost daňové kontroly v příštích 12 měsících. Vstupy: odvětví, obrat, marže, DPH nadměrné odpočty, intercompany, historie kontrol, červené příznaky (velké kurzové ztráty, odpisy pohledávek). Umožňuje proaktivní přípravu.",
    methodology:
      "Monte Carlo simulace + logistická regrese na historii kontrol (anonymizovaná data). Feature engineering 40+ signálů: odvětví CZ-NACE, obrat růst/pokles > 30 %, nadměrný odpočet DPH 3× v řadě, intercompany > 20 % obratu, vysoké odpisy. Kalibrace pomocí empirické úspěšnosti.",
    dataInputs: [
      "ARES — NACE kód",
      "Money S3 — HV, obrat, marže",
      "DPH přiznání (nadměrné odpočty)",
      "TP transakce objem",
      "Historie kontrol klienta",
    ],
    outputMetrics: [
      "Pravděpodobnost kontroly (%)",
      "Top 3 rizikové faktory",
      "Odhadovaný doměrek (pokud kontrola)",
      "Doporučená preventivní opatření",
      "Benchmark oboru (%)",
    ],
    goodScenario: {
      title: "Nízké riziko kontroly",
      description:
        "Pravděpodobnost 8 % (pod oborovým průměrem 15 %), konzervativní účetnictví, žádné červené příznaky.",
      indicators: [
        "P = 8 %",
        "Pod oborem",
        "0 red flags",
        "Konzervativní účetnictví",
      ],
      actions: ["Pokračovat v kvalitní evidenci", "Roční audit"],
    },
    badScenario: {
      title: "Vysoká pravděpodobnost kontroly",
      description:
        "Pravděpodobnost 78 % — 3 rizikové faktory: nadměrný odpočet DPH 4× po sobě, intercompany 35 % obratu bez TP dok., obrat +120 % YoY.",
      indicators: [
        "P = 78 %",
        "3 red flags",
        "Nadměrný odpočet 4×",
        "TP dok. chybí",
      ],
      actions: [
        "Urgentně zpracovat TP dokumentaci",
        "Preventivní audit DPH",
        "Konzultace daňového poradce",
        "Připravit dokumenty pro kontrolu",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["5-03", "5-04", "5-02"],
    businessImpact: "Vysoký — prevence finančních škod",
    implementationStatus: "Pilot",
    scope: "client",
  },
];
