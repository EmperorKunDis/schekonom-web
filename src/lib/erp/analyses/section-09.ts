import type { AnalysisDetail } from "./types";

export const section09Analyses: AnalysisDetail[] = [
  {
    id: "9-01",
    sectionId: 9,
    sectionTitle: "Finanční profil a CLV",
    name: "CLV",
    source: "fakturace − cost to serve",
    good: "CLV 480K za 5 let",
    bad: "CLV −120K — ztrátový klient",
    description:
      "Customer Lifetime Value (CLV) je celková hodnota klienta za dobu spolupráce, očištěná o náklady na obsluhu. Systém počítá CLV na základě historické i prediktivní fakturace, odečtených o timesheetové náklady, režii a rizikovou přirážku.\n\nKlíčovou metrikou je poměr CLV ku cost-to-serve — klienti se záporným CLV jsou aktivně identifikováni a navrhuje se buď zdražení, změna rozsahu služeb nebo ukončení spolupráce.\n\nModel predikuje budoucí CLV na základě trendu komunikace, platební morálky a využití služeb.",
    methodology:
      "Prediktivní model: 1) Historická fakturace (12–60 měsíců), 2) Cost-to-serve z timesheetů × interní sazby, 3) Diskontní sazba pro budoucí tok, 4) Churn pravděpodobnost z ML modelu, 5) Expected CLV = SUM(predikované příjmy × (1-churn_prob) - predikované náklady) / (1+r)^t.",
    dataInputs: [
      "Fakturace per klient (historie + pipeline)",
      "Timesheety zaměstnanců per klient",
      "Interní sazby a režijní koeficient",
      "Churn pravděpodobnost z ML modelu",
      "Platební morálka a trend komunikace",
    ],
    outputMetrics: [
      "CLV v Kč (5letý horizont)",
      "Cost-to-serve per měsíc",
      "Marže per klient",
      "CLV trend (rostoucí/klesající)",
      "Ranking klientů dle CLV",
    ],
    goodScenario: {
      title: "Vysoce hodnotný klient",
      description:
        "CLV dosahuje 480 000 Kč za 5 let s rostoucím trendem. Klient využívá 6 z 8 služeb, platí včas a marže je 42 %.",
      indicators: [
        "CLV 480 000 Kč / 5 let",
        "Marže 42 %",
        "Platí do 14 dní",
        "Využívá 6/8 služeb",
      ],
      actions: [
        "Nabídnout premium služby",
        "Připravit personalizovaný reporting",
        "Zvážit loyalty program",
      ],
    },
    badScenario: {
      title: "Ztrátový klient",
      description:
        "CLV je záporné: −120 000 Kč. Klient vyžaduje nepřiměřený čas (22 hodin/měsíc), platí se zpožděním a využívá jen základní služby za nízkou cenu.",
      indicators: [
        "CLV −120 000 Kč / 5 let",
        "Cost-to-serve 22 000 Kč/měsíc vs. platba 9 000 Kč",
        "Průměrná splatnost 67 dní",
        "Využívá 1/8 služeb",
      ],
      actions: [
        "Připravit cenovou revizi",
        "Definovat minimální rozsah služeb za aktuální cenu",
        "Prezentovat klientovi data o skutečných nákladech",
        "Zvážit ukončení spolupráce při odmítnutí úprav",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "70 % automatizováno",
    relatedAnalyses: ["9-02", "9-03", "9-06", "9-07"],
    businessImpact: "Kritický — řízení portfolia klientů",
    implementationStatus: "Produkce",
  },
  {
    id: "9-02",
    sectionId: 9,
    sectionTitle: "Finanční profil a CLV",
    name: "Marže na klienta",
    source: "výnosy vs. timesheety",
    good: "Marže 42%",
    bad: "Marže −8%",
    description:
      "Per-klient P&L analýza — skutečná marže konkrétního klienta vychází z fakturace mínus náklady na obsluhu (timesheety × interní hodinová sazba + režie). Klient může mít vysoký obrat, ale zároveň být ztrátový, pokud spotřebovává nadměrné hodiny účetního týmu.",
    methodology:
      "Monthly close: SUM(fakturace klienta) − SUM(timesheet_hours × internal_rate × overhead_coefficient). Interní sazba senior účetní 850 Kč/h, junior 450 Kč/h, partner 1800 Kč/h. Overhead koeficient 1.4 (zahrnuje pracoviště, software licence, výcvik). Alert při marži < 15 %.",
    dataInputs: [
      "Money S3 fakturační modul (výstup faktur per klient)",
      "Timesheety zaměstnanců (hours × klient × role)",
      "Interní sazby per pozice",
      "Overhead koeficient (z režijních nákladů)",
      "CRM klient → projekt mapping",
    ],
    outputMetrics: [
      "Revenue per klient (Kč/měsíc)",
      "Cost-to-serve (Kč/měsíc)",
      "Marže v Kč a v %",
      "Hodiny per služba",
      "Ranking klientů dle marže",
    ],
    goodScenario: {
      title: "Zdravá marže 42 %",
      description:
        "Klient generuje měsíčně 45 000 Kč fakturace při cost-to-serve 26 000 Kč (29 hodin). Marže 42 % odpovídá efektivnímu procesu a odpovídající ceně.",
      indicators: [
        "Marže 42 %",
        "Revenue 45K / měs",
        "Cost 26K / měs",
        "Efektivita: 1.55K revenue / hour",
      ],
      actions: ["Udržet rozsah služeb", "Sdílet best practices s týmem"],
    },
    badScenario: {
      title: "Ztrátový klient (marže −8 %)",
      description:
        "Klient platí 9 000 Kč/měsíc, ale cost-to-serve dosahuje 9 720 Kč (17 hodin). Klient vyžaduje nadměrnou osobní komunikaci, časté konzultace a nestandardní požadavky, které nejsou v ceně.",
      indicators: [
        "Marže −8 %",
        "Revenue 9K / měs",
        "Cost 9.72K / měs",
        "Efektivita: 0.53K revenue / hour",
      ],
      actions: [
        "Cenová revize +40 % nebo redukce rozsahu",
        "Dokumentovat skutečné hodiny klientovi",
        "Nabídnout samoobslužný portál (redukce hodin)",
        "Při odmítnutí — exit strategie",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "80 % automatizováno",
    relatedAnalyses: ["9-01", "9-07", "11-09"],
    businessImpact: "Kritický — identifikace ztrátových klientů",
    implementationStatus: "Produkce",
  },
  {
    id: "9-03",
    sectionId: 9,
    sectionTitle: "Finanční profil a CLV",
    name: "Platební chování",
    source: "historie úhrad",
    good: "Průměr 14 dní, vždy včas",
    bad: "Průměr 67 dní, 3× upomínka",
    description:
      "Analýza platební morálky klienta — Days Sales Outstanding (DSO) per klient, počet upomínek, trend platební morálky. Klíčový prediktor kreditního rizika, cashflow dopadu i blížícího se churn (zpomalující platby jsou klasický behaviorální signál).",
    methodology:
      "Bankovní API (FIO /ib_api/rest/, KB, ČSOB ConnectAPI) párování příchozích plateb s fakturami. Výpočet DSO_client = (payment_date − invoice_due_date) průměr. Upomínkový workflow sledování. Trend DSO 12M rolling. Alert při DSO > 30 dní nebo trend rostoucí.",
    dataInputs: [
      "Bankovní API (FIO, KB, ČSOB) — příchozí platby",
      "Money S3 faktury vydané (VS, splatnost, částka)",
      "Párovací engine platba ↔ faktura",
      "Upomínkový log",
      "Historická platební baseline 24M",
    ],
    outputMetrics: [
      "DSO per klient (dny)",
      "On-time payment rate (%)",
      "Počet upomínek / kvartál",
      "DSO trend 12M",
      "Predikce inkasa (pravděpodobnost)",
    ],
    goodScenario: {
      title: "Vzorný plátce",
      description:
        "Klient platí průměrně 14 dní před splatností, 100 % plateb včas, 0 upomínek za poslední 2 roky.",
      indicators: [
        "DSO = 14 dní",
        "On-time rate 100 %",
        "0 upomínek",
        "Stabilní 24M",
      ],
      actions: [
        "Nabídnout early payment discount (2/10 net 14)",
        "Použít jako reference pro factoringovou partnerskou banku",
      ],
    },
    badScenario: {
      title: "Špatná platební morálka — churn signál",
      description:
        "DSO klesl z 21 na 67 dní za 6 měsíců. 3 upomínky, poslední předžalobní výzva. Kombinace likviditní krize klienta + signál odcházení (už nechce zaplatit).",
      indicators: [
        "DSO = 67 dní (baseline 21)",
        "On-time rate 12 %",
        "3 upomínky / kvartál",
        "Předžalobní výzva odeslána",
      ],
      actions: [
        "Okamžité zastavení dalších služeb (embargo)",
        "Zkontrolovat insolvenci klienta (ISIR API)",
        "Návrh splátkového kalendáře",
        "Alert na churn risk + kreditní riziko",
      ],
    },
    frequency: "Týdně",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["1-04", "9-01", "10-03", "10-09"],
    businessImpact: "Kritický — cashflow a kreditní riziko",
    implementationStatus: "Produkce",
  },
  {
    id: "9-04",
    sectionId: 9,
    sectionTitle: "Finanční profil a CLV",
    name: "Cenová elasticita",
    source: "reakce na zdražení",
    good: "Akceptoval +15% bez reakce",
    bad: "Při +5% vyhrožoval odchodem",
    description:
      "Měření cenové elasticity poptávky per klient — jak klient reaguje na zdražení? Kancelář potřebuje vědět, kterým klientům může bezpečně zdražit (nízká elasticita) a kteří odejdou při minimální změně (vysoká elasticita). Elasticita souvisí s CLV i se segmentací.",
    methodology:
      "Historická analýza: cenová změna × churn probability × sentiment reaction. Pro každou cenovou úpravu (CRM pricing history) měření: 1) Sentiment změna v 30D okně, 2) Churn probability change, 3) Explicit reakce (email/hovor se zmínkou ceny). Elasticita = %Δ churn_prob / %Δ cena.",
    dataInputs: [
      "CRM pricing history per klient",
      "Sentiment time series (7-01)",
      "Churn probability history (10-01)",
      "Price-mention keywords v komunikaci",
      "Competitor price benchmarks",
    ],
    outputMetrics: [
      "Price elasticity koeficient",
      "Maximum bezpečné zdražení (%)",
      "Reakční čas na zdražení (dny)",
      "Price-sensitivity segment",
      "Churn risk při +X%",
    ],
    goodScenario: {
      title: "Cenově neelastický klient",
      description:
        "Historicky akceptoval +15 % zdražení bez negativní reakce, sentiment nehnutý, 0 zmínek ceny v komunikaci. Klient oceňuje hodnotu služby, ne cenu.",
      indicators: [
        "Elasticita 0.12 (nízká)",
        "Poslední +15 % akceptováno bez reakce",
        "0 price-mentions v 6M",
        "Sentiment stabilní po zdražení",
      ],
      actions: [
        "Možnost dalšího zdražení až +20 %",
        "Premium upsell nabídka",
        "Nepoužívat slevy (nemají efekt)",
      ],
    },
    badScenario: {
      title: "Extrémně cenově citlivý",
      description:
        "Při minulém zdražení o 5 % klient vyhrožoval odchodem, 8× zmínka 'konkurence levnější'. Sentiment propadl o 30 bodů. Elasticita 2.8 — každé 1 % zdražení vyvolá 2.8 % růst churn rizika.",
      indicators: [
        "Elasticita 2.8 (vysoká)",
        "Vyhrožoval odchodem při +5 %",
        "8 price-mentions / kvartál",
        "Sentiment −30 po zdražení",
      ],
      actions: [
        "NEZDRAŽUJ — zásah by vyvolal odchod",
        "Alternativa: value-add místo price-add",
        "Loyalty lock-in (roční smlouva se slevou)",
        "Rebalanc cost-to-serve (zlevnit obsluhu)",
      ],
    },
    frequency: "Ročně + ad-hoc před zdražením",
    automationLevel: "65 % automatizováno",
    relatedAnalyses: ["9-01", "9-05", "10-01", "12-02"],
    businessImpact: "Vysoký — podpora pricing rozhodnutí",
    implementationStatus: "Beta",
  },
  {
    id: "9-05",
    sectionId: 9,
    sectionTitle: "Finanční profil a CLV",
    name: "Vnímání ceny",
    source: "řeč klienta",
    good: "Říká «férová cena»",
    bad: "Říká «drahé» v každém hovoru",
    description:
      "Lingvistická analýza toho, jak klient mluví o ceně služeb. Frekvence a kontext slov 'drahé / levné / férové / hodnota' odhalují skutečné vnímání hodnoty. Komplementární metrika k 9-04 (tvrdá elasticita) — měkký signál nespokojenosti s cenou.",
    methodology:
      "Keyword extraction + kontextová analýza (spaCy cs_core_news_lg) hledá price-related terms: 'drahé', 'levné', 'férové', 'hodnota', 'zaplatit', 'stojí za', 'výhodné'. Sentiment kolem těchto slov (±5 tokens). Frekvence / měsíc + change detection.",
    dataInputs: [
      "Přepisy hovorů Daktela",
      "Emailová komunikace",
      "Price keyword dictionary (CZ)",
      "Context sentiment ±5 tokens",
      "Baseline price-mention rate",
    ],
    outputMetrics: [
      "Price-mention frequency / měsíc",
      "Price sentiment (positive/negative)",
      "Top přídavná jména u 'cena'",
      "Trend 12M",
      "Value perception score",
    ],
    goodScenario: {
      title: "Férové vnímání hodnoty",
      description:
        "Klient v komunikaci opakovaně říká 'férová cena', 'stojí to za to', 'hodnota přesahuje cenu'. 0 zmínek 'drahé'. Vnímá kancelář jako investici, ne náklad.",
      indicators: [
        "4 pozitivní price-mentions / měsíc",
        "0 negativních",
        "Adjektiva: 'férová', 'rozumná', 'odpovídající'",
        "Value perception 0.84",
      ],
      actions: [
        "Reference z klientových slov pro marketing",
        "Zvážit upsell premium",
      ],
    },
    badScenario: {
      title: "Klient vnímá cenu jako problém",
      description:
        "V každém hovoru 'to je drahé', 'platím moc', 'konkurence by to udělala za polovinu'. 15 negativních price-mentions za měsíc. Cena je přední příčinou jeho frustrace.",
      indicators: [
        "15 neg price-mentions / měsíc",
        "0 pozitivních",
        "Adjektiva: 'drahé', 'přehnané', 'neúměrné'",
        "Value perception 0.18",
      ],
      actions: [
        "Edukace o rozsahu služeb (transparentní breakdown)",
        "Konkrétní srovnání s konkurencí",
        "Prezentace ROI (ušetřené pokuty, optimalizace)",
        "Při nemožnosti přesvědčit — off-boarding plán",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["7-01", "9-04", "12-03"],
    businessImpact: "Vysoký — indikátor value perception a churn",
    implementationStatus: "Produkce",
  },
  {
    id: "9-06",
    sectionId: 9,
    sectionTitle: "Finanční profil a CLV",
    name: "Upsell/cross-sell",
    source: "gap analýza",
    good: "Využívá 6/8 služeb",
    bad: "Využívá 1/8 — 7 příležitostí",
    description:
      "Gap analýza využití služeb portfolia kanceláře. Kancelář nabízí 8 primárních služeb (účetnictví, mzdy, DPH, daňové poradenství, audit, reporting, controlling, ESG). Porovnání kontraktované vs. reálně fakturované × dostupné služby identifikuje upsell příležitosti.",
    methodology:
      "Matrix klient × služba ze Money S3 fakturace + kontraktů. Flag 1 = služba fakturována v 12M, 0 = není. Per-klient utilization rate = Σ services / 8. Cross-reference s potřebami klienta (velikost, obor NACE, legislativní povinnosti — např. audit > 40M Kč obratu).",
    dataInputs: [
      "Money S3 fakturační položky per klient",
      "Kontrakty a SLA klienta (CRM)",
      "Služby katalog kanceláře",
      "ARES data klienta (obrat, zaměstnanci, obor)",
      "Legislativní matice služeb (audit, ESG povinnosti)",
    ],
    outputMetrics: [
      "Service utilization rate (%)",
      "Nevyužité služby per klient",
      "Upsell potenciál v Kč/měsíc",
      "Legislativní gap (povinnosti klienta vs. služby)",
      "Cross-sell matrix",
    ],
    goodScenario: {
      title: "Maximální využití portfolia",
      description:
        "Klient využívá 6 z 8 služeb (účetnictví, mzdy, DPH, daně, reporting, controlling). Chybí audit (pod prahem) a ESG (zatím nepovinné). Optimální stav.",
      indicators: [
        "Utilization 75 % (6/8)",
        "Nevyužité legitimně (pod prahem)",
        "Revenue 68K / měsíc",
        "Žádný legislativní gap",
      ],
      actions: [
        "Monitoring růstu klienta (audit trigger při > 40M)",
        "Připravit ESG nabídku před 2027 (CSRD)",
      ],
    },
    badScenario: {
      title: "Masivní nevyužitý potenciál",
      description:
        "Klient fakturuje pouze 1 službu (základní účetnictví) za 8K/měsíc. Přitom má obrat 55M Kč, musí mít audit (povinnost ZoÚ) a má 42 zaměstnanců (mzdy jdou jinam). 7 příležitostí, potenciál 85K/měsíc upsellu.",
      indicators: [
        "Utilization 12 % (1/8)",
        "Upsell potenciál 85K / měsíc",
        "Legislativní gap: audit povinný",
        "Konkurence dělá 7 služeb (rozdělené dodavatele)",
      ],
      actions: [
        "Strukturovaný upsell pitch (začít auditem — povinnost)",
        "Bundle nabídka se slevou při 3+ službách",
        "Prezentace total cost of fragmentation",
        "Quarterly review s cross-sell plánem",
      ],
    },
    frequency: "Kvartálně",
    automationLevel: "75 % automatizováno",
    relatedAnalyses: ["9-01", "12-01", "16-01"],
    businessImpact: "Vysoký — revenue expansion",
    implementationStatus: "Produkce",
  },
  {
    id: "9-07",
    sectionId: 9,
    sectionTitle: "Finanční profil a CLV",
    name: "Klienti ve ztrátě",
    source: "per-klient P&L",
    good: "0 ztrátových klientů",
    bad: "3 klienti generují −180K/rok",
    description:
      "Portfolio-level přehled všech ztrátových klientů. Kombinuje 9-02 (marže) napříč portfoliem a identifikuje kumulativní ztrátu. Slouží jako základ pro strategická rozhodnutí: komu zdražit, koho offboardovat, kde automatizovat.",
    methodology:
      "Portfolio aggregation of 9-02 per-klient marží. Filtr marže < 0. Analýza příčin ztráty (over-servicing, podceněná cena, nestandardní požadavky). Action matrix: zdražit / redukovat rozsah / offboard. Simulace revenue impact per scenario.",
    dataInputs: [
      "Per-klient marže (9-02)",
      "Historická analýza příčin ztráty",
      "Timesheet breakdown per aktivita",
      "Kontraktní struktura (fix/variable)",
      "Alternativní pricing scenarios",
    ],
    outputMetrics: [
      "Počet ztrátových klientů",
      "Kumulativní ztráta (Kč/rok)",
      "% portfolia ztrátového",
      "Root cause distribuce",
      "Action impact simulace (Kč)",
    ],
    goodScenario: {
      title: "Zdravé portfolio",
      description:
        "0 ztrátových klientů, nejnižší marže v portfoliu 18 %. Pricing discipline napříč portfoliem, žádný over-servicing.",
      indicators: [
        "0 ztrátových klientů",
        "Min marže 18 %",
        "Průměr 34 %",
        "100 % klientů s pozitivním CLV",
      ],
      actions: [
        "Udržet pricing discipline",
        "Benchmark pro onboarding nových klientů",
      ],
    },
    badScenario: {
      title: "Portfolio krvácí na 3 ztrátových klientech",
      description:
        "3 klienti generují kumulativní ztrátu 180 000 Kč/rok. Root cause: 1× podceněná cena (historicky), 1× over-servicing (klient volá denně), 1× nestandardní požadavky bez extra fakturace. Portfolio krvácí 1.5 % revenue.",
      indicators: [
        "3 ztrátoví klienti",
        "Ztráta −180K / rok",
        "Root causes: 33% pricing, 33% over-service, 33% scope creep",
        "2 roky trvající problém",
      ],
      actions: [
        "Individuální akční plán per klient",
        "Klient A: cenová revize +35 %",
        "Klient B: redukce rozsahu na smluvní minimum",
        "Klient C: offboarding s 90denní notifikací",
      ],
    },
    frequency: "Kvartálně",
    automationLevel: "70 % automatizováno",
    relatedAnalyses: ["9-01", "9-02", "9-06", "12-01"],
    businessImpact: "Kritický — portfolio rentability",
    implementationStatus: "Produkce",
  },
];
