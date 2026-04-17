import type { AnalysisDetail } from "./types";

export const section11Analyses: AnalysisDetail[] = [
  {
    id: "11-01",
    sectionId: 11,
    sectionTitle: "Operativní reporty",
    name: "SLA dodržení",
    source: "timestamps",
    good: "98% v SLA",
    bad: "62% mimo SLA",
    description:
      "Monitoring dodržování SLA (Service Level Agreement) s klienty sleduje, zda jsou služby dodávány v dohodnutém čase a kvalitě. Systém měří čas od přijetí požadavku po jeho vyřízení a porovnává s kontraktovaným SLA.\n\nPro každého klienta je definován individuální SLA dle smlouvy — typicky: uzávěrka do X. dne měsíce, odpověď na dotaz do Y hodin, doklady zpracovány do Z dní. Systém automaticky sleduje plnění a eskaluje při ohrožení.\n\nHistorická data o SLA plnění jsou klíčová pro vyjednávání o cenách — prokazatelně vysoké SLA opravňuje premium cenu.",
    methodology:
      "Event-based tracking: 1) Záznam timestamp přijetí požadavku, 2) Záznam timestamp vyřízení, 3) Porovnání s kontraktovaným SLA per typ požadavku, 4) Agregace per klient, per účetní, per typ služby, 5) Trend analýza a predikce budoucího SLA plnění.",
    dataInputs: [
      "Ticketovací systém (timestamps)",
      "Workflow engine (stavy dokumentů)",
      "SLA definice per klient (smlouvy)",
      "Docházka zaměstnanců (kapacita)",
    ],
    outputMetrics: [
      "SLA compliance rate (%)",
      "Průměrný čas vyřízení",
      "Top porušení SLA (per klient, per typ)",
      "Trend SLA compliance",
      "Predikce SLA na následující měsíc",
    ],
    goodScenario: {
      title: "Výborné SLA plnění",
      description:
        "98 % požadavků vyřízeno v rámci SLA. Zbývající 2 % jsou edge cases s objektivními příčinami (chybějící podklady od klienta).",
      indicators: [
        "98 % SLA compliance",
        "Průměr 4h pod SLA limitem",
        "0 eskalací",
        "Trend stabilní",
      ],
      actions: [
        "Komunikovat úspěch klientům",
        "Zvážit zpřísnění SLA pro premium klienty",
        "Použít data při vyjednávání o cenách",
      ],
    },
    badScenario: {
      title: "SLA masivně porušeno",
      description:
        "Pouze 62 % požadavků vyřízeno v SLA. Hlavní příčiny: přetížení Q1, nemoc 2 účetních, nárůst klientů bez odpovídajícího navýšení kapacity.",
      indicators: [
        "62 % SLA compliance",
        "38 % porušení — 3× průměr",
        "5 eskalací za měsíc",
        "Trend klesající 3 měsíce",
      ],
      actions: [
        "Okamžitě navýšit kapacitu (brigádníci / outsource)",
        "Prioritizovat premium klienty",
        "Komunikovat klientům reálné termíny",
        "Přehodnotit kapacitní plán",
      ],
    },
    frequency: "Denně (automaticky)",
    automationLevel: "98 % automatizováno",
    relatedAnalyses: ["11-03", "11-05", "11-09", "11-10"],
    businessImpact: "Vysoký — SLA = spokojenost klienta = retence",
    implementationStatus: "Produkce",
    scope: "internal",
  },
  {
    id: "11-02",
    sectionId: 11,
    sectionTitle: "Operativní reporty",
    name: "Opakující se problémy",
    source: "kategorizace",
    good: "0 opakování",
    bad: "Klient X — 5× stejný problém",
    description:
      "Ticket-level analýza opakujících se problémů per klient. Pohled z operativního úhlu (doplněk k 7-09 který analyzuje z klientské strany). Systém identifikuje top recurring issues a umožňuje process improvement — fix root cause vs. hasit symptomy.",
    methodology:
      "Kategorizace ticketů (Daktela ticket system) pomocí rule engine + NLP clustering. Per klient počet opakování per kategorie za 12M. Pareto analýza top 20 % opakovaných problémů. Root cause tagging při resolution (template: cause + fix).",
    dataInputs: [
      "Daktela ticket system",
      "Ticket kategorie a tagy",
      "Resolution notes",
      "Klient metadata",
      "Historická data 24M",
    ],
    outputMetrics: [
      "Top opakující se problémy (portfolio)",
      "Recurring rate per kategorie",
      "Klient s nejvíce opakováními",
      "Root cause fix rate (%)",
      "Avg time mezi opakováními",
    ],
    goodScenario: {
      title: "Zdravá operativa",
      description:
        "0 opakujících se problémů v posledních 12M. First-call resolution 92 %, root cause fix coverage 95 %.",
      indicators: [
        "0 opakování",
        "FCR 92 %",
        "Root cause coverage 95 %",
        "Stabilní trend",
      ],
      actions: ["Udržet kvalitu", "Dokumentovat best practices"],
    },
    badScenario: {
      title: "Klient X — chronický problém",
      description:
        "Klient X hlásí stejný problém (chybné zaúčtování faktur z B2B portálu) 5× za rok. Pokaždé ad-hoc fix, žádný root cause. Frustrace roste.",
      indicators: [
        "5 opakování / rok",
        "Stejný root cause: šablona",
        "Každé opakování eskaluje sentiment",
        "Klient si stěžuje",
      ],
      actions: [
        "Formální root cause analysis (5 Whys)",
        "Permanent fix šablony",
        "Proaktivní komunikace klientovi",
        "Kompenzace za opakující se problémy",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "80 % automatizováno",
    relatedAnalyses: ["7-09", "11-07", "11-09"],
    businessImpact: "Vysoký — process quality a client satisfaction",
    implementationStatus: "Produkce",
    scope: "internal",
  },
  {
    id: "11-03",
    sectionId: 11,
    sectionTitle: "Operativní reporty",
    name: "Bottlenecky uzávěrky",
    source: "workflow",
    good: "Průměr 3 dny",
    bad: "14 dní — zásek u párování",
    description:
      "Workflow analysis měsíční uzávěrky. Identifikuje, který krok uzávěrky (párování, přiúčtování, rezervy, kontrola, schválení) je bottleneck. Prodloužení uzávěrky přímo ohrožuje SLA (dodání reportů klientovi) a indikuje kapacitní nebo procesní problém.",
    methodology:
      "DocuWare workflow timestamps + Money S3 uzávěrkový modul events. Process mining (PM4Py): extrakce process graph, výpočet cycle time per activity, identifikace longest path. Pareto distribuce délky per krok. Bottleneck = krok s > 40 % cycle time.",
    dataInputs: [
      "DocuWare workflow events (timestamps)",
      "Money S3 uzávěrkové events",
      "Zaměstnanecká aktivita per krok",
      "Historický cycle time baseline",
      "Process mining library PM4Py",
    ],
    outputMetrics: [
      "Celkový cycle time uzávěrky (dny)",
      "Cycle time per krok",
      "Bottleneck activity",
      "Queue time (čekání na zaměstnance)",
      "Trend 12M",
    ],
    goodScenario: {
      title: "Rychlá hladká uzávěrka",
      description:
        "Průměrná měsíční uzávěrka trvá 3 pracovní dny. Žádný krok netrvá déle než 25 % celkového času. Rovnoměrné vytížení, žádný bottleneck.",
      indicators: [
        "Průměr 3 dny",
        "Max krok 18 % cycle",
        "0 bottlenecků",
        "Stabilní 12M",
      ],
      actions: ["Benchmark pro tým", "Marketovat 'fast closing' klientům"],
    },
    badScenario: {
      title: "Bottleneck u párování",
      description:
        "Uzávěrka trvá 14 dní (baseline 3). Krok 'párování plateb s fakturami' trvá 9 dní — 64 % celkového času. Zaměstnanec přetížený, fronta 340 nepárovaných transakcí.",
      indicators: [
        "Cycle time 14 dní (baseline 3)",
        "Párování 9 dní (64 %)",
        "Queue 340 transakcí",
        "1 zaměstnanec vytížen 140 %",
      ],
      actions: [
        "Přidat kapacitu na párování",
        "Automation: AI assisted matching",
        "Redistribuce workload z přetíženého účetního",
        "Edukace klienta — dodávat VS v platbě",
      ],
    },
    frequency: "Měsíčně (po uzávěrce)",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["11-01", "11-05", "11-08", "11-09"],
    businessImpact: "Vysoký — přímý dopad na SLA",
    implementationStatus: "Produkce",
    scope: "internal",
  },
  {
    id: "11-04",
    sectionId: 11,
    sectionTitle: "Operativní reporty",
    name: "Sezónnost komunikace",
    source: "časové řady",
    good: "Predikovatelné špičky",
    bad: "Nečekaná špička +300%",
    description:
      "Analýza sezónních vzorců v komunikaci s klienty. Účetní kancelář má typické špičky: Q1 (uzávěrka), Q2 (daňová přiznání do 1.4./1.7.), měsíční cykly kolem 25. (DPH). Anomalní nárůst mimo sezónní pattern je varovným signálem (regulační změna, krizový trend, klíčový klient v problému).",
    methodology:
      "Time series decomposition (STL — Seasonal-Trend decomposition using Loess): trend + seasonal + residual. Prophet forecasting s Czech holidays kalendářem. Anomaly detection na residuals (3-sigma rule). Regresní analysis proti externí eventům (novela ZDP, COVID-style events).",
    dataInputs: [
      "Denní kontaktní objem (7-04)",
      "Ticket counts per day",
      "Český svátkový kalendář",
      "Daňový kalendář (DPH, DPPO deadlines)",
      "Historie 24M+",
    ],
    outputMetrics: [
      "Baseline seasonal pattern",
      "Current vs. predicted volume",
      "Anomaly events detekovány",
      "Peak intensity prediction",
      "Capacity requirement forecast",
    ],
    goodScenario: {
      title: "Predikovatelné vzorce",
      description:
        "Komunikační objem odpovídá sezónní predikci ±8 %. Q1 špička +180 %, květen −15 %, prosinec −25 % — vše v predikovaném rozsahu.",
      indicators: [
        "Deviation od predikce ±8 %",
        "0 anomaly events",
        "Peak Q1 predikovaný",
        "Forecast accuracy 94 %",
      ],
      actions: ["Capacity plán na základě forecast", "Early planning Q1 2027"],
    },
    badScenario: {
      title: "Nečekaná masivní špička",
      description:
        "Duben 2026 volume +300 % oproti predikci. Residual je 8 standard deviations nad normálem. Root cause: neočekávaná novela zákona o DPH → masivní klientské dotazy.",
      indicators: [
        "Volume +300 % vs. forecast",
        "8-sigma anomaly",
        "Root cause: zákonná změna",
        "3× SLA porušení",
      ],
      actions: [
        "Okamžitě navýšit kapacitu (outsource)",
        "Hromadný webinář k DPH změně",
        "FAQ/self-service materiál",
        "Rebuild forecast model s novým eventem",
      ],
    },
    frequency: "Týdně + ad-hoc",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["11-05", "11-06"],
    businessImpact: "Vysoký — kapacitní plánování",
    implementationStatus: "Produkce",
    scope: "internal",
  },
  {
    id: "11-05",
    sectionId: 11,
    sectionTitle: "Operativní reporty",
    name: "Predikce vytížení",
    source: "historické vzorce",
    good: "Q2 kapacita OK",
    bad: "Q1 přetížení 140% — nutný outsource",
    description:
      "Kapacitní forecast — porovnání predikovaného workloadu (z 11-04) s dostupnou kapacitou týmu (z docházkového systému Anet). Umožňuje proaktivní rozhodnutí o najmutí brigádníků, outsourcingu nebo posunutí interních projektů.",
    methodology:
      "Demand forecast (11-04) × service time per ticket type → required FTE. Supply: Anet docházka + planned dovolenky + produktivita koeficient. Gap = demand − supply. Threshold alert: gap > 15 % na horizont 30 dní. Monte Carlo simulace (konfidence 90 %).",
    dataInputs: [
      "Demand forecast (11-04)",
      "Anet docházkový systém (plánované absence)",
      "Historical productivity per role",
      "Service time per ticket type",
      "Outsource capacity options",
    ],
    outputMetrics: [
      "Predicted FTE demand",
      "Available FTE supply",
      "Gap (over/under capacity)",
      "Utilization forecast (%)",
      "Recommended actions",
    ],
    goodScenario: {
      title: "Balanced kapacita",
      description:
        "Q2 forecast ukazuje 92 % utilizaci — optimální. Žádný deficit, 3 % buffer. Tým má kapacitu pro plánované projekty.",
      indicators: [
        "Utilization forecast 92 %",
        "0 deficit days",
        "Buffer 3 %",
        "Plánované projekty fit",
      ],
      actions: ["Standardní plánování"],
    },
    badScenario: {
      title: "Q1 přetížení",
      description:
        "Q1 forecast 140 % utilizace — významný deficit 18 FTE-days. Hlavní driver: kumulace uzávěrky + daňových přiznání + 3 dovolenkové absence. Nutný outsource.",
      indicators: [
        "Utilization 140 %",
        "Deficit 18 FTE-days",
        "3 absence accumulated",
        "SLA risk vysoký",
      ],
      actions: [
        "Okamžitě zajistit brigádníky (senior + junior)",
        "Přesunout nepovinné projekty",
        "Outsource partneři: request kapacity",
        "Rebalanc dovolenek (pokud možno)",
      ],
    },
    frequency: "Týdně",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["11-04", "11-06"],
    businessImpact: "Vysoký — kapacitní rozhodnutí",
    implementationStatus: "Produkce",
    scope: "internal",
  },
  {
    id: "11-06",
    sectionId: 11,
    sectionTitle: "Operativní reporty",
    name: "Vyhoření týmu",
    source: "docházka SCH",
    good: "0 víkendová práce",
    bad: "3 účetní pracují 6 víkendů v řadě",
    description:
      "Burnout prevention — monitoring známek přepracování v týmu kanceláře SCH-EKONOM. Dlouhodobě víkendová práce, přesčasy, odchody pozdě večer jsou prediktory vyhoření, chybovosti a odchodu zaměstnance. Compliance s § 90-92 zákoníku práce 262/2006 Sb. (odpočinek).",
    methodology:
      "Anet docházkový systém: pracovní hodiny per den, víkendová práce, noční práce. Computation: weekly_hours, weekend_days_count (4+ weeks rolling), late_days (>19:00). Klouzavý průměr + trend. Threshold: 3 víkendy v řadě = alert; > 50h/týden = alert; > 12 dní bez odpočinku = compliance violation.",
    dataInputs: [
      "Anet docházkový systém SCH-EKONOM",
      "Plán směn",
      "Docházková karta per zaměstnanec",
      "Historická baseline per osoba",
      "§ 90-92 ZP limity",
    ],
    outputMetrics: [
      "Víkendové dny / 4 týdny",
      "Průměrné weekly hours",
      "Late days / měsíc",
      "Burnout risk score",
      "Compliance violations (ZP)",
    ],
    goodScenario: {
      title: "Zdravý rytmus týmu",
      description:
        "0 víkendové práce, průměr 38 h/týden, 0 late days. Tým má work-life balance, 0 compliance violations.",
      indicators: [
        "0 víkendů",
        "Avg 38 h/týden",
        "0 late days",
        "Burnout score 12/100",
      ],
      actions: ["Udržet kulturu", "Benchmark pro industry"],
    },
    badScenario: {
      title: "Kritický burnout risk",
      description:
        "3 účetní pracují 6 víkendů v řadě, průměr 58 h/týden. 1 zaměstnanec už 14 dní bez dne volna (porušení § 92 ZP). Chybovost roste (viz 11-07).",
      indicators: [
        "6 víkendů v řadě × 3 lidi",
        "Avg 58 h/týden",
        "14 dní bez volna (violation)",
        "Burnout score 82/100",
      ],
      actions: [
        "Okamžitě vynutit den volna (§ 92 ZP)",
        "Redistribuovat workload",
        "Najmout outsource kapacitu (11-05)",
        "1-on-1 rozhovor se 3 přetíženými",
      ],
    },
    frequency: "Týdně",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["11-05", "11-07"],
    businessImpact: "Vysoký — prevence ztráty klíčových lidí",
    implementationStatus: "Produkce",
    scope: "internal",
  },
  {
    id: "11-07",
    sectionId: 11,
    sectionTitle: "Operativní reporty",
    name: "Chybovost účetního",
    source: "audit trail",
    good: "0.2% opravných zápisů",
    bad: "4.8% — 24× průměr kanceláře",
    description:
      "Per-účetní quality scoring — míra opravných zápisů (storno + oprava) vzhledem k celkovému počtu zápisů. Indikátor odborné způsobilosti, přetížení (koreluje s 11-06 burnout), nebo tréninkové potřeby. Transparentní metric používán v ročním hodnocení.",
    methodology:
      "Audit trail DB (user_id, action, timestamp, entity_type, entity_id): filter reversal/correction actions. Computation: error_rate = reversal_count / total_entries per účetní. Benchmark: portfolio průměr, best-in-class. Context: klient složitost, objem. Fair comparison via normalizované metriky.",
    dataInputs: [
      "Audit trail DB (všechny ERP actions)",
      "User → role mapping",
      "Klient složitost index",
      "Objem entries per účetní",
      "Historická baseline",
    ],
    outputMetrics: [
      "Error rate per účetní (%)",
      "Benchmark delta vs. průměr",
      "Trend 6M",
      "Typ chyb (kategorie)",
      "Quality score (0-100)",
    ],
    goodScenario: {
      title: "Vynikající kvalita",
      description:
        "Účetní má error rate 0.2 % — významně pod průměrem 1.1 %. 0 chyb v kritických entries (DPH, mzdy). Quality score 94/100.",
      indicators: [
        "Error rate 0.2 %",
        "3× lepší než průměr",
        "0 kritických chyb",
        "Quality score 94/100",
      ],
      actions: ["Mentoring juniorů", "Bonus / uznání"],
    },
    badScenario: {
      title: "Kritická chybovost",
      description:
        "Účetní má error rate 4.8 % — 24× průměr kanceláře. 12 chyb v DPH přiznáních za kvartál. Možné příčiny: nedostatečný trénink, přetížení (11-06), osobní problémy.",
      indicators: [
        "Error rate 4.8 %",
        "24× průměr",
        "12 DPH chyb / kvartál",
        "Quality score 28/100",
      ],
      actions: [
        "Okamžitá supervize senior účetním",
        "Retraining na identifikovaných oblastech",
        "Zkontrolovat burnout (11-06)",
        "PIP (performance improvement plan)",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["1-07", "11-02", "11-06"],
    businessImpact: "Vysoký — riziko reputace + penalties klientů",
    implementationStatus: "Produkce",
    scope: "internal",
  },
  {
    id: "11-08",
    sectionId: 11,
    sectionTitle: "Operativní reporty",
    name: "3-way matching",
    source: "DocuWare",
    good: "91% STP",
    bad: "34% STP — většina manuálně",
    description:
      "Straight-Through Processing (STP) rate pro 3-way matching (objednávka ↔ dodací list ↔ faktura). Vysoký STP = efektivní automation, nízký STP = manuální práce, vyšší cost-to-serve, vyšší chybovost. Kombinuje s 10-08 (fakturační nesrovnalosti).",
    methodology:
      "DocuWare workflow metrics: pro každou fakturu tracking zda prošla 3-way match automaticky vs. potřebovala manuální intervenci. STP rate = auto_matched / total_invoices. Per klient analysis — klienti s nízkým STP vyžadují process improvement.",
    dataInputs: [
      "DocuWare workflow timestamps",
      "Invoice processing events",
      "Manual intervention flags",
      "Matching engine logs",
      "Per-klient invoice volume",
    ],
    outputMetrics: [
      "STP rate (%)",
      "Manual intervention rate",
      "Avg processing time per type",
      "Cost-to-serve delta (STP vs. manual)",
      "Top klienti s nízkým STP",
    ],
    goodScenario: {
      title: "Vysoká automatizace",
      description:
        "91 % faktur projde 3-way match automaticky, manuální intervence potřebná jen v 9 % (edge cases). Cost-to-serve 3× nižší u STP případů.",
      indicators: [
        "STP 91 %",
        "Manual 9 %",
        "Avg auto processing 14 min",
        "Cost delta 3×",
      ],
      actions: [
        "Scale automation k dalším klientům",
        "Benchmark industry-leading",
      ],
    },
    badScenario: {
      title: "Většina manuálně — drain na kapacitě",
      description:
        "Pouze 34 % STP, 66 % faktur manuálně. Hlavní bariéra: 3 top klienti nedodávají strukturované PO (PDF scany). Enormní cost-to-serve dopad.",
      indicators: [
        "STP 34 %",
        "Manual 66 %",
        "3 klienti = 70 % manual volume",
        "Avg processing 45 min manual",
      ],
      actions: [
        "Edukace top 3 klientů (strukturovaná PO)",
        "OCR + LLM pro PDF scany",
        "EDI integrace s dodavateli",
        "Přecenit klienty s nestandardním processem",
      ],
    },
    frequency: "Týdně",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["10-08", "11-03", "11-09"],
    businessImpact: "Vysoký — cost-to-serve driver",
    implementationStatus: "Produkce",
    scope: "internal",
  },
  {
    id: "11-09",
    sectionId: 11,
    sectionTitle: "Operativní reporty",
    name: "Doba zpracování dokladu",
    source: "workflow",
    good: "Průměr 4h",
    bad: "Průměr 72h — klient čeká",
    description:
      "End-to-end cycle time od přijetí dokladu (DocuWare ingest) po finalizaci (zaúčtováno, schváleno, archivováno). Klíčová UX metrika — klient vnímá rychlost podle toho, jak dlouho 'čeká'. Prodloužený cycle time indikuje kapacitní problém nebo neefektivní workflow.",
    methodology:
      "DocuWare workflow timestamps — per doklad extrakce: received_at, processing_started_at, processed_at, approved_at, archived_at. Cycle time = archived_at − received_at. Distribuce (p50, p90, p95). Per-klient, per-typ dokladu, per-účetní breakdown.",
    dataInputs: [
      "DocuWare workflow events",
      "Document metadata (type, klient, complexity)",
      "Stage transition timestamps",
      "Queue length per stage",
      "Účetní workload",
    ],
    outputMetrics: [
      "Průměrný cycle time (h)",
      "p50 / p90 / p95 cycle time",
      "Per klient breakdown",
      "Per typ dokladu breakdown",
      "Stage-level bottleneck",
    ],
    goodScenario: {
      title: "Bleskové zpracování",
      description:
        "Průměrný cycle time 4 h pracovní doby, p95 pod 16 h. Klient přinese doklad ráno, odpoledne má vyřízeno.",
      indicators: [
        "Průměr 4 h",
        "p95 = 16 h",
        "0 dokumentů v queue > 24 h",
        "Same-day processing 78 %",
      ],
      actions: ["Marketing: 'Same-day' jako USP", "Benchmark pro tým"],
    },
    badScenario: {
      title: "Klient čeká 3 dny",
      description:
        "Průměrný cycle time 72 h, p95 = 192 h (8 dní). Klient si opakovaně stěžuje 'poslal jsem vám to minulý týden'. Queue 340 neprocessed documentů.",
      indicators: [
        "Průměr 72 h (baseline 4)",
        "p95 = 192 h",
        "Queue 340 docs",
        "12 stížností / měsíc",
      ],
      actions: [
        "Okamžitě flush queue (outsource)",
        "Implementovat STP (11-08)",
        "Navýšit kapacitu per 11-05",
        "Klientům transparentní ETA",
      ],
    },
    frequency: "Denně (real-time dashboard)",
    automationLevel: "98 % automatizováno",
    relatedAnalyses: ["11-01", "11-03", "11-08", "11-10"],
    businessImpact: "Vysoký — přímý vliv na CX",
    implementationStatus: "Produkce",
    scope: "internal",
  },
  {
    id: "11-10",
    sectionId: 11,
    sectionTitle: "Operativní reporty",
    name: "Chybějící podklady",
    source: "DocuWare gap",
    good: "12% chybí",
    bad: "67% chybí — kancelář paralyzovaná",
    description:
      "Gap analýza podkladů — kolik dokumentů klient ještě nedodal vzhledem k očekávaným (dle fakturační historie, smlouvy, sezóny). Chybějící podklady blokují uzávěrku i aktuální zaúčtování. Vysoký gap rate indikuje chaotického klienta nebo komunikační problém.",
    methodology:
      "Expected document set per klient (baseline z historických 12M: typy dokumentů, měsíční frekvence). Current state DocuWare: co skutečně dorazilo. Gap = expected − received. Kategorizace: faktury přijaté, bankovní výpisy, pokladní doklady, smlouvy. Alert per typ.",
    dataInputs: [
      "DocuWare ingest logs per klient",
      "Expected document baseline (historie)",
      "Klient typ podnikání (volume prediction)",
      "Bankovní výpisy auto-ingest",
      "Sezónní predikce",
    ],
    outputMetrics: [
      "Gap rate (% missing)",
      "Missing docs count",
      "Missing types (faktury/výpisy/pokladna)",
      "Days delayed",
      "Impact na uzávěrku",
    ],
    goodScenario: {
      title: "Dobře zásobovaný klient",
      description:
        "12 % gap rate (v norma < 15 %). Klient dodává 88 % očekávaných podkladů včas, chybí jen okrajové doklady (kryté auto-reminder).",
      indicators: [
        "Gap 12 %",
        "Missing jen low-priority",
        "Auto-reminder vyřešil",
        "0 uzávěrka-blocking",
      ],
      actions: ["Standardní monitoring"],
    },
    badScenario: {
      title: "Klient paralyzuje kancelář",
      description:
        "67 % očekávaných podkladů chybí. Uzávěrka nemožná — chybí 120 faktur, 3 bankovní výpisy, celá pokladna. Účetní neví, co má dělat, klient neodpovídá.",
      indicators: [
        "Gap 67 %",
        "120 faktur chybí",
        "3 bank výpisy missing",
        "Uzávěrka blocked",
      ],
      actions: [
        "Eskalace partnerem kanceláře k jednateli",
        "Písemná výzva s hrozbou pozastavení služeb",
        "Scope contract review (zda to nejsou povinnosti klienta)",
        "Pokud persist — off-boarding",
      ],
    },
    frequency: "Týdně",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["11-03", "11-09"],
    businessImpact: "Kritický — blokuje základní služby",
    implementationStatus: "Produkce",
    scope: "internal",
  },
];
