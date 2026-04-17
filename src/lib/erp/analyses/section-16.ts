import type { AnalysisDetail } from "./types";

export const section16Analyses: AnalysisDetail[] = [
  {
    id: "16-01",
    sectionId: 16,
    sectionTitle: "Produktová inteligence",
    name: "Využití služeb vs. smlouva",
    source: "logy",
    good: "Využívá 95% smluvního rozsahu",
    bad: "Využívá 20% — platí za to co nepoužívá",
    description:
      "Porovnání skutečného využití služeb s tím, co má klient ve smlouvě. Systém měří engagement per služba a identifikuje jak nevyužité služby (potenciál pro eduaci nebo snížení), tak přetížené služby (potenciál pro upgrade).\n\nNevyužité služby jsou problém — klient platí za něco, co nepoužívá, a může to vnímat jako předraženost. Proaktivní komunikace o hodnotě služeb nebo úprava balíčku zvyšuje spokojenost.\n\nNaopak, služby s vysokým engagement jsou příležitostí pro upsell — klient zjevně hodnotu vidí.",
    methodology:
      "Engagement scoring: 1) Definice metriky využití per typ služby, 2) Měření skutečného využití z logů, 3) Porovnání se smluvním rozsahem, 4) Gap analýza, 5) Doporučení (edukace / downgrade / upsell).",
    dataInputs: [
      "Smlouvy a definice služeb",
      "Logy využití (přístupy, dotazy, zpracované doklady)",
      "Fakturace per služba",
      "Peer benchmark (co využívají podobní klienti)",
    ],
    outputMetrics: [
      "% využití per služba",
      "Celkový engagement score",
      "Nevyužité služby (gap)",
      "Přetížené služby",
      "Upsell příležitosti",
    ],
    goodScenario: {
      title: "Plné využití",
      description:
        "Klient využívá 95 % smluvního rozsahu. Všechny služby jsou aktivně používány a klient z nich prokazatelně benefituje.",
      indicators: [
        "95 % využití",
        "Všechny služby aktivní",
        "Klient referuje hodnotu",
        "Žádná nevyužitá služba",
      ],
      actions: [
        "Zvážit rozšíření o další služby",
        "Dokumentovat úspěch pro případovou studii",
        "Nabídnout premium tier",
      ],
    },
    badScenario: {
      title: "Platí za nevyužité",
      description:
        "Klient využívá jen 20 % služeb. 4 z 5 služeb nebyly použity za poslední 3 měsíce. Klient pravděpodobně vnímá cenu jako nepřiměřenou.",
      indicators: [
        "20 % využití",
        "4 služby neaktivní 3+ měsíce",
        "Klient zmínil «drahé» 2× za kvartál",
        "Peer využívá 75 %",
      ],
      actions: [
        "Naplánovat edukační schůzku",
        "Představit hodnotu nevyužitých služeb",
        "Zvážit úpravu balíčku",
        "Prevence churnu — klient může cítit nízkou hodnotu",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["16-02", "16-03", "9-06", "12-01"],
    businessImpact: "Vysoký — retence a revenue optimalizace",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "16-02",
    sectionId: 16,
    sectionTitle: "Produktová inteligence",
    name: "Skryté mezery",
    source: "peer benchmark",
    good: "Žádné nevyužité příležitosti",
    bad: "Nemá mzdové služby — peer ano",
    description:
      "Identifikace služeb, které klient nevyužívá, ale jeho peer group (podobní klienti dle velikosti, oboru, struktury) ano. Tyto 'skryté mezery' představují upsell příležitosti — klient potřebuje službu, ale neví o ní nebo ji nevnímá jako potřebnou.\n\nPeer group je definována jako klienti se stejným NACE kódem, ±30 % obratem a podobnou strukturou (FTE, pendleři, exportéři). Pro každou peer group systém vypočítá 'typický balíček služeb' a porovná ho s aktuálním balíčkem klienta.\n\nMezery s nejvyšší penetrací v peer group (>70 %) a vysokou spokojeností (NPS > 8) jsou prioritní pro nabídku.",
    methodology:
      "Peer benchmark gap analysis: 1) Definice peer group per klient (NACE, obrat ±30 %, FTE ±50 %), 2) Výpočet service penetration per peer group (% klientů s danou službou), 3) Identifikace gaps (klient nemá, peer >50 % má), 4) Prioritizace: penetration × satisfaction × revenue potential, 5) Generování personalizované nabídky.",
    dataInputs: [
      "Smlouvy a služby per klient — smluvní evidence v CRM",
      "Peer group definice — NACE z ARES, obrat z účetnictví, FTE z mezd",
      "Service catalog — kompletní nabídka služeb kanceláře",
      "Penetration data — % klientů per služba per segment",
      "Spokojenost per služba — NPS/CSAT pokud existuje",
    ],
    outputMetrics: [
      "Počet identifikovaných mezer per klient",
      "Top 3 prioritní mezery (penetration × satisfaction × revenue)",
      "Estimated revenue uplift per mezera",
      "Peer benchmark pozice (% služeb vs. peer average)",
      "Personalizovaná nabídka (auto-generated)",
    ],
    goodScenario: {
      title: "Žádné nevyužité příležitosti",
      description:
        "Klient využívá 95 % služeb, které používá jeho peer group. Zbývající 5 % (1 služba) je irelevantní pro jeho specifický případ. Klient je plně saturovaný.",
      indicators: [
        "Peer coverage: 95 %",
        "0 prioritních mezer",
        "Revenue upsell potenciál: minimální",
        "Klient nad průměrem peer group",
      ],
      actions: [
        "Focus na kvalitu stávajících služeb",
        "Sledovat nové služby v katalogu — mohou vytvořit nové mezery",
        "Klient může být ambasadorem pro peer group",
      ],
    },
    badScenario: {
      title: "Nemá mzdové služby — peer ano",
      description:
        "Klient (výrobní firma, 45 zaměstnanců) nemá mzdové služby. 82 % jeho peer group mzdové služby využívá s NPS 8.4. Klient zpracovává mzdy interně — neefektivně, s chybami. Revenue potenciál: 180K/rok.",
      indicators: [
        "Gap: mzdové služby (penetration 82 %, NPS 8.4)",
        "Gap: controlling (penetration 65 %, NPS 7.8)",
        "Gap: reporting (penetration 71 %, NPS 8.1)",
        "Revenue potenciál: 420K/rok (všechny gaps)",
      ],
      actions: [
        "Připravit case study z peer group — 'firma jako vaše ušetřila XY'",
        "Nabídnout trial / bezplatnou analýzu mzdového procesu",
        "Kvantifikovat náklady interního zpracování vs. outsourcing",
        "Naplánovat prezentaci pro jednatele",
      ],
    },
    frequency: "Kvartálně",
    automationLevel: "75 % automatizováno",
    relatedAnalyses: ["16-01", "16-03", "16-04", "12-01"],
    businessImpact: "Vysoký — upsell a revenue growth",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "16-03",
    sectionId: 16,
    sectionTitle: "Produktová inteligence",
    name: "Predikce další potřeby",
    source: "collaborative filtering",
    good: "80% přesnost predikce",
    bad: "Model nelze natrénovat — málo dat",
    description:
      "Collaborative filtering model predikující, jakou službu klient pravděpodobně bude potřebovat jako další. Model se učí z historických vzorců: klienti, kteří si objednali službu A a B, si typicky do 6 měsíců objednají službu C.\n\nImplementace používá matrix factorization (SVD) na matici klient×služba, doplněnou o content-based features (obor, velikost, fáze). Model je trénován na historických akvizicích služeb s validation split na posledních 12 měsících.\n\nPredikce jsou využívány pro timing marketingových kampaní — klientovi nabídneme službu v momentě, kdy ji s nejvyšší pravděpodobností potřebuje.",
    methodology:
      "Hybrid collaborative filtering: 1) Matrix factorization (SVD, rank=20) na matici klient×služba (binary), 2) Content-based features: NACE, obrat, FTE, stáří vztahu, 3) Temporal patterns: sequence mining (SPADE algorithm) — typické pořadí akvizice služeb, 4) Ensemble: SVD score × content score × temporal score, 5) Precision@3 validace na held-out datech.",
    dataInputs: [
      "Matice klient×služba — historická (kdo co kdy objednal) z CRM",
      "Klientské features — NACE (ARES), obrat (účetnictví), FTE (mzdy)",
      "Temporal data — datum aktivace každé služby per klient",
      "Service dependency graph — které služby jsou prerekvizity",
      "Churn data — vyloučit churned klienty z training setu",
    ],
    outputMetrics: [
      "Top 3 predikované služby per klient (s pravděpodobností)",
      "Precision@3 na validation setu",
      "Recall@3 na validation setu",
      "Predicted timing (kdy bude potřebovat)",
      "Revenue potential per predikce",
    ],
    goodScenario: {
      title: "80 % přesnost predikce",
      description:
        "Model dosahuje Precision@3 = 80 % na validation setu. Pro klienta ABC predikuje: 1) Controlling (P=0.85, timing: Q2), 2) Cash flow reporting (P=0.72, timing: Q3), 3) Daňové poradenství DE (P=0.68, timing: Q4).",
      indicators: [
        "Precision@3: 80 %",
        "Recall@3: 65 %",
        "3 konkrétní predikce s P > 0.65",
        "Timing predikce: Q2/Q3/Q4",
      ],
      actions: [
        "Naplánovat nabídku controllingu na Q2",
        "Připravit demo cash flow reportingu na Q3",
        "Informovat DE tým o predikci daňového poradenství",
        "A/B test: predikce-based vs. random nabídka",
      ],
    },
    badScenario: {
      title: "Model nelze natrénovat — málo dat",
      description:
        "Matice klient×služba je příliš řídká (sparsity 95 %) — většina klientů má jen 1–2 služby. Model konverguje na triviální predikci (predikuje vždy nejpopulárnější službu). Precision@3: 22 % (= random baseline).",
      indicators: [
        "Precision@3: 22 % (≈ random)",
        "Matice sparsity: 95 %",
        "Průměr 1.4 služby per klient",
        "Nedostatek variance pro SVD",
      ],
      actions: [
        "Přepnout na rule-based doporučení (peer benchmark)",
        "Sbírat více dat — explicitní preference (průzkumy)",
        "Rozšířit feature set o implicitní signály (dotazy, čtení reportů)",
        "Re-evaluovat za 6M s více daty",
      ],
    },
    frequency: "Měsíčně (model retrain), denně (predikce)",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["16-01", "16-02", "16-04", "12-01"],
    businessImpact: "Vysoký — prediktivní upsell",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "16-04",
    sectionId: 16,
    sectionTitle: "Produktová inteligence",
    name: "Doporučovací systém",
    source: "«klienti jako tento»",
    good: "3 relevantní upsell příležitosti",
    bad: "Klient max. saturovaný",
    description:
      "Content-based + collaborative doporučovací systém generující personalizované upsell nabídky na základě profilu klienta a chování podobných klientů. Na rozdíl od predikce (16-03) se tento systém zaměřuje na 'co nabídnout TEĎ' — akční doporučení pro obchodní tým.\n\nSystém kombinuje peer benchmark (co mají podobní) s individuálními signály (o co se klient ptal, co hledal, jaké problémy řeší) a generuje personalizovanou nabídku se zdůvodněním pro obchodníka.\n\nKaždé doporučení obsahuje: službu, důvod (proč zrovna toto), argumenty (jak prodat), timing (kdy nabídnout) a expected response (jak pravděpodobně zareaguje).",
    methodology:
      "Recommendation engine: 1) Kandidátní služby z peer benchmark gaps (16-02) + collaborative filtering (16-03), 2) Filtr: vyloučit nekompatibilní služby (prerekvizity nesplněny), 3) Ranking: combined score = 0.4×CF + 0.3×peer + 0.3×signal, 4) Enrichment: generování argumentů z knowledge base, 5) Personalizace sdělení dle psychografického profilu (15-01 rozhodovací styl).",
    dataInputs: [
      "Výstupy z 16-02 (peer gaps) a 16-03 (CF predikce)",
      "Signály zájmu — search queries v portálu, dotazy v emailu (NLP)",
      "Psychografický profil z 15-01 (rozhodovací styl)",
      "Service catalog s prerekvizitami a pricing",
      "Historická success rate per služba per segment",
    ],
    outputMetrics: [
      "Top 3 doporučení per klient (služba + score + argumenty)",
      "Expected conversion rate per doporučení",
      "Expected revenue per doporučení",
      "Timing doporučení (optimal moment)",
      "A/B test results (recommendation vs. random)",
    ],
    goodScenario: {
      title: "3 relevantní upsell příležitosti",
      description:
        "Pro klienta XYZ systém doporučuje: 1) Mzdové služby (score 0.91, revenue 180K/rok, klient se 2× ptal na mzdy), 2) Controlling (score 0.78, revenue 120K/rok, peer 80 % má), 3) DPH poradenství DE (score 0.72, revenue 90K/rok, expanduje do DE).",
      indicators: [
        "3 doporučení s score > 0.70",
        "Celkový revenue potenciál: 390K/rok",
        "Expected conversion: 45 % (historical similar)",
        "Všechna doporučení mají explicitní klientský signál",
      ],
      actions: [
        "Obchodník kontaktuje klienta — nabídka mzdových služeb",
        "Připravit kalkulaci: interní mzdy vs. outsourcing",
        "Naplánovat controlling demo za měsíc (second offer)",
        "DE poradenství nabídnout při příští DE konzultaci",
      ],
    },
    badScenario: {
      title: "Klient max. saturovaný",
      description:
        "Klient využívá 100 % služeb v katalogu relevantních pro jeho segment. Žádné doporučení s score > 0.3. Klient je plně saturovaný — upsell prostor vyčerpán.",
      indicators: [
        "0 doporučení s score > 0.3",
        "Klient má 12/12 relevantních služeb",
        "Revenue per klient: 680K/rok (max. pro segment)",
        "Cross-sell do jiného segmentu: nerelevantní",
      ],
      actions: [
        "Focus na retenci — nezdražovat, nesaturovat",
        "Zvážit premium tier s vyšší hodnotou (ne více služeb, ale lepší)",
        "Klient jako kandidát na advisory board / beta testing",
        "Monitorovat nové služby v katalogu — mohou vytvořit prostor",
      ],
    },
    frequency: "Měsíčně (recommendations refresh)",
    automationLevel: "80 % automatizováno",
    relatedAnalyses: ["16-01", "16-02", "16-03", "15-01"],
    businessImpact: "Vysoký — konverze upsell příležitostí",
    implementationStatus: "Produkce",
    scope: "client",
  },
];
