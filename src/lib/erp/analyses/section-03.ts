import type { AnalysisDetail } from "./types";

export const section03Analyses: AnalysisDetail[] = [
  {
    id: "3-01",
    sectionId: 3,
    sectionTitle: "Mzdy a personální data",
    name: "Mzdové náklady",
    source: "mzdový modul",
    good: "32% tržeb",
    bad: "58% tržeb",
    description:
      "Analýza poměru mzdových nákladů k tržbám je klíčovým ukazatelem efektivity lidských zdrojů. Sledujeme nejen celkový poměr, ale i jeho vývoj v čase, srovnání s oborem a strukturu mzdových nákladů (základní mzda, příplatky, přesčasy, benefity).\n\nSystém automaticky agreguje data z mzdového modulu a porovnává je s tržbami z fakturace. Výsledky jsou segmentovány podle středisek, projektů a typů zaměstnanců.\n\nKritickým aspektem je identifikace neefektivit — například přesčasy, které nevytváří odpovídající hodnotu, nebo nerovnoměrné rozložení práce mezi zaměstnanci.",
    methodology:
      "Poměrová analýza mzdových nákladů vs. tržby s rozpadem na komponenty: 1) Základní mzdy, 2) Příplatky a přesčasy, 3) Odvody (SP, ZP), 4) Benefity. Benchmark vůči oboru (NACE kód). Trend analýza 12 měsíců. Alert při překročení oborového průměru o > 15 %.",
    dataInputs: [
      "Mzdové záznamy z ERP",
      "Tržby z fakturačního modulu",
      "Docházka a přesčasy",
      "Oborové benchmarky (ČSÚ)",
      "Struktura benefitů",
    ],
    outputMetrics: [
      "Poměr mzdových nákladů / tržby (%)",
      "Mzdový náklad na zaměstnance",
      "Přesčasová složka jako % celku",
      "Srovnání s oborovým průměrem",
      "Predikce na následující kvartál",
    ],
    goodScenario: {
      title: "Efektivní mzdové náklady",
      description:
        "Mzdové náklady tvoří 32 % tržeb, což je pod oborovým průměrem 38 %. Struktura je zdravá — přesčasy tvoří jen 4 % celku, benefity jsou cílené a efektivní.",
      indicators: [
        "32 % tržeb (obor: 38 %)",
        "Přesčasy jen 4 % mzdových nákladů",
        "Rovnoměrné rozložení mezi zaměstnanci",
        "Trend stabilní 6 měsíců",
      ],
      actions: [
        "Udržovat aktuální úroveň",
        "Zvážit investici do rozvoje zaměstnanců",
        "Připravit benchmarkový report pro klienta",
      ],
    },
    badScenario: {
      title: "Neudržitelné mzdové náklady",
      description:
        "Mzdové náklady dosáhly 58 % tržeb, což je 20 bodů nad oborovým průměrem. Hlavní příčiny: nekontrolované přesčasy (18 % celku), neefektivní alokace zaměstnanců a vysoká fluktuace vyžadující náborové náklady.",
      indicators: [
        "58 % tržeb (obor: 38 % — překročení o 20 b.)",
        "Přesčasy 18 % mzdových nákladů",
        "3 zaměstnanci s 50 %+ přesčasovou složkou",
        "Fluktuace 24 % ročně",
      ],
      actions: [
        "Audit vytíženosti zaměstnanců",
        "Přehodnotit organizační strukturu",
        "Implementovat systém řízení přesčasů",
        "Zvážit outsourcing non-core aktivit",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["3-02", "3-07", "3-08", "11-06"],
    businessImpact:
      "Vysoký — personální náklady jsou typicky největší položkou",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "3-02",
    sectionId: 3,
    sectionTitle: "Mzdy a personální data",
    name: "Výpočet mezd",
    source: "docházka + smlouvy",
    good: "0 chyb",
    bad: "3 přepočty",
    description:
      "Měsíční výpočet mezd v systému Vema/Nugget na základě docházky (Anet), pracovních smluv a kolektivní smlouvy. Systém validuje správnost výpočtu oproti pravidlům zákoníku práce (zákon 262/2006 Sb.) a detekuje potřebu dodatečných přepočtů.",
    methodology:
      "Import docházky z Anet API /attendance/monthly → Vema mzdový engine. Validace: minimální mzda (§ 111 ZP), příplatky za přesčas (§ 114), noční práci (§ 116), víkend (§ 118). Cross-check brutto × koeficient → netto. Detekce anomálií oproti minulému měsíci (>10 % odchylka).",
    dataInputs: [
      "Anet docházkový systém (REST API)",
      "Pracovní smlouvy a dodatky",
      "Kolektivní smlouva",
      "Sazebník příplatků",
      "Historie mezd 12 měsíců",
    ],
    outputMetrics: [
      "Počet chybných výpočtů",
      "Počet přepočtů (opravných)",
      "Průměrná odchylka oproti minulému měsíci (%)",
      "Čas zpracování mzdového období (h)",
      "Compliance score (§ ZP)",
    ],
    goodScenario: {
      title: "Bezchybný výpočet mezd",
      description:
        "Všechny mzdy vypočítány správně na první pokus, 0 reklamací od zaměstnanců, podání včas.",
      indicators: [
        "0 chyb",
        "0 reklamací",
        "Podáno do 10.",
        "100 % ZP compliance",
      ],
      actions: ["Archivovat výplatní listiny", "Měsíční report klientovi"],
    },
    badScenario: {
      title: "Opakované přepočty",
      description:
        "3 přepočty v jednom měsíci — chybná docházka, neaktualizovaný sazebník, neplatný dodatek ke smlouvě.",
      indicators: [
        "3 přepočty",
        "5 reklamací",
        "Opožděné podání",
        "Chybějící dodatky",
      ],
      actions: [
        "Audit docházky Anet",
        "Aktualizace master dat (smlouvy)",
        "Školení mzdové účetní",
        "Revize workflow",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["3-05", "3-07", "3-08"],
    businessImpact: "Kritický — zákonná povinnost + důvěra zaměstnanců",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "3-03",
    sectionId: 3,
    sectionTitle: "Mzdy a personální data",
    name: "Exekuční srážky",
    source: "API justice.cz",
    good: "0 nových exekucí",
    bad: "2 nové v ISIR",
    description:
      "Monitoring ISIR (Insolvenční rejstřík) a Centrální evidence exekucí justice.cz pro zaměstnance. Automatické nastavení srážek dle OSŘ § 276 a oznámení zaměstnavatele dle § 294a OSŘ. Nesrážení podléhá sankcím a plátce může ručit za neodvedené částky.",
    methodology:
      "Denní dávkový dotaz na ISIR API (justice.cz/isir/isir.ws) a CEE pro všechny zaměstnance podle rodného čísla. Nové záznamy → workflow: 1) verifikace, 2) výpočet nezabavitelné částky, 3) oznámení zaměstnavateli, 4) nastavení srážky v mzdě, 5) odvody oprávněným.",
    dataInputs: [
      "ISIR API justice.cz/isir/isir.ws (SOAP)",
      "CEE — Centrální evidence exekucí",
      "Zaměstnanci z Vema (rodné čísla)",
      "Usnesení soudu / exekuční příkaz",
      "Nezabavitelná částka (vyhláška MSp)",
    ],
    outputMetrics: [
      "Počet aktivních exekucí",
      "Počet nových za měsíc",
      "Celková srážka (Kč)",
      "Počet věřitelů",
      "Compliance status oznámení § 294a",
    ],
    goodScenario: {
      title: "Čistý profil zaměstnanců",
      description:
        "Žádné nové exekuce, stávající exekuce řádně spravovány, všechny odvody včas.",
      indicators: [
        "0 nových exekucí",
        "Odvody včas",
        "Oznámení § 294a OK",
        "0 sankcí",
      ],
      actions: ["Pokračovat v denním monitoringu", "Měsíční report"],
    },
    badScenario: {
      title: "Nové exekuce v ISIR",
      description:
        "2 zaměstnanci nově v ISIR — nutné okamžité nastavení srážek, riziko duplicitní exekuce, možné HR implikace (trust-based pozice).",
      indicators: [
        "2 nové v ISIR",
        "Chybí usnesení",
        "Riziko duplicitní srážky",
        "HR review nutný",
      ],
      actions: [
        "Dohledat usnesení soudu",
        "Vypočítat nezabavitelnou částku",
        "Oznámit § 294a OSŘ do 8 dnů",
        "HR konzultace pro citlivé role",
      ],
    },
    frequency: "Denně (ISIR monitoring)",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["10-03", "10-09"],
    businessImpact: "Vysoký — zákonná povinnost + ručení",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "3-04",
    sectionId: 3,
    sectionTitle: "Mzdy a personální data",
    name: "eNeschopenky",
    source: "ČSSZ e-Podání",
    good: "Real-time, 2 aktivní",
    bad: "Nezaregistrovaná 5 dní",
    description:
      "Real-time napojení na ČSSZ e-Podání pro automatický příjem eNeschopenek. Od 2020 (zákon 259/2017 Sb.) povinná elektronická forma. Systém přijímá notifikace o začátku, pokračování a ukončení DPN a automaticky nastavuje náhradu mzdy dle § 192 ZP.",
    methodology:
      "ČSSZ e-Podání webhook na endpoint /api/eneschopenky/receive. Pro každou DPN: match podle rodného čísla, kontrola karenční doby (první 3 dny bez náhrady), výpočet náhrady (60 % z redukovaného průměrného výdělku). Handoff do Vema mzdového enginu.",
    dataInputs: [
      "ČSSZ e-Podání API (webhook)",
      "Zaměstnanci Vema",
      "Historie DPN zaměstnance",
      "Průměrný výdělek (poslední 12 M)",
      "Redukční hranice ČSSZ",
    ],
    outputMetrics: [
      "Počet aktivních DPN",
      "Průměrná délka DPN (dny)",
      "Náhrada mzdy celkem (Kč)",
      "Delay registrace (dny)",
      "Frekvence DPN per zaměstnanec",
    ],
    goodScenario: {
      title: "Real-time příjem eNeschopenek",
      description:
        "Všechny DPN přijaty do 5 minut od vystavení, 2 aktivní případy, náhrada mzdy správně vypočtena.",
      indicators: [
        "Real-time příjem",
        "2 aktivní DPN",
        "Správná náhrada",
        "0 delay",
      ],
      actions: ["Měsíční report", "Pokračovat v monitoringu"],
    },
    badScenario: {
      title: "Neregistrovaná eNeschopenka",
      description:
        "DPN nezaregistrována 5 dní — webhook nefunguje, zaměstnanec nedostal náhradu, riziko stížnosti.",
      indicators: [
        "Delay 5 dnů",
        "Náhrada neproplacena",
        "Stížnost zaměstnance",
        "Webhook down",
      ],
      actions: [
        "Obnovit ČSSZ webhook connection",
        "Manuální import zpětně",
        "Doplatit náhradu s úroky",
        "Monitoring webhook uptime",
      ],
    },
    frequency: "Real-time + denní kontrola",
    automationLevel: "98 % automatizováno",
    relatedAnalyses: ["3-02", "3-05"],
    businessImpact: "Vysoký — zákonná povinnost + rychlost",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "3-05",
    sectionId: 3,
    sectionTitle: "Mzdy a personální data",
    name: "ELDP, ONZ",
    source: "mzdový engine",
    good: "Podáno do 20.",
    bad: "Po termínu — pokuta",
    description:
      "Evidenční list důchodového pojištění (ELDP) a Oznámení o nástupu/ukončení zaměstnání (ONZ) dle zákona 582/1991 Sb. Elektronické podání na ČSSZ přes e-Podání do 8 dnů od události (ONZ) a do 30. 4. následujícího roku (ELDP).",
    methodology:
      "Trigger events: nástup/výstup zaměstnance → ONZ XML. Roční: ELDP XML se všemi zaměstnanci. Validace XSD, elektronický podpis kvalifikovaný certifikát (Česká pošta / PostSignum). Podání přes ČSSZ e-Podání portál s potvrzením o přijetí.",
    dataInputs: [
      "Vema mzdový engine (nástupy/výstupy)",
      "Pracovní smlouvy",
      "Roční data o pojistném (ELDP)",
      "Kvalifikovaný certifikát",
      "ČSSZ e-Podání API",
    ],
    outputMetrics: [
      "Počet ONZ podání",
      "Počet podání po termínu",
      "Delay vs. zákonný termín (dny)",
      "Pokuty (Kč)",
      "% úspěšných podání (bez vrácení)",
    ],
    goodScenario: {
      title: "Včasná podání ELDP/ONZ",
      description:
        "Všechna podání do 8 dnů (ONZ) nebo do 20. měsíce, 100 % přijato ČSSZ napoprvé, 0 pokut.",
      indicators: ["100 % včas", "0 pokut", "Podáno do 20.", "0 vrácených"],
      actions: ["Archivovat potvrzení", "Měsíční report"],
    },
    badScenario: {
      title: "Podání po termínu",
      description:
        "ONZ podáno 15 dní po termínu — pokuta dle § 22 zákona 582/1991 Sb. až 50K Kč.",
      indicators: [
        "+15 dní delay",
        "Pokuta 20K",
        "Vrácené XML",
        "Chybný podpis",
      ],
      actions: [
        "Okamžitě podat s vysvětlením",
        "Požádat o prominutí",
        "Audit workflow podání",
        "Obnovit certifikát",
      ],
    },
    frequency: "Průběžně (ONZ) + ročně (ELDP)",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["3-02", "3-04"],
    businessImpact: "Vysoký — zákonná povinnost + sankce",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "3-06",
    sectionId: 3,
    sectionTitle: "Mzdy a personální data",
    name: "Predikce fluktuace",
    source: "docházka + nástupy/výstupy",
    good: "Stabilní, 0 signálů",
    bad: "3 lidé 78%+ pravděpodobnost odchodu",
    description:
      "ML model predikce odchodu zaměstnance (XGBoost) kombinuje 30+ feature: délka zaměstnání, mzdový vývoj, docházka (prodloužené víkendy), přesčasy, frekvence DPN, zapojení do projektů. Model predikuje pravděpodobnost odchodu v příštích 3/6/12 měsících.",
    methodology:
      "Feature engineering z Vema + Anet + Jira + Slack metadata. Training: historie odchodů 3 roky, positive class = výstup do 6 měsíců. XGBoost classifier, SHAP values pro vysvětlitelnost. Threshold 0.7 → aktivní retention intervention.",
    dataInputs: [
      "Vema HR data (mzda, pozice, tenure)",
      "Anet docházka (overtime, prodloužené víkendy)",
      "Jira aktivita (tickety, code commits)",
      "Slack metadata (hours, channels)",
      "Historie výstupů 3 roky",
    ],
    outputMetrics: [
      "Churn probability per zaměstnanec (%)",
      "Počet high-risk (>70 %)",
      "SHAP top features (proč)",
      "Predicted attrition rate (%)",
      "ROI retention akcí",
    ],
    goodScenario: {
      title: "Stabilní tým",
      description:
        "0 zaměstnanců nad threshold 70 %, průměrná churn probability pod oborovým průměrem (12 %).",
      indicators: [
        "0 high-risk",
        "Avg 8 %",
        "Pod oborem",
        "Žádné negativní trendy",
      ],
      actions: ["Pokračovat v retention", "Kvartální revize modelu"],
    },
    badScenario: {
      title: "Vlna odchodů hrozí",
      description:
        "3 zaměstnanci s pravděpodobností 78 %+ — top features: overtime 60h+/měsíc, stagnace mzdy 18M, redukce Jira aktivity.",
      indicators: [
        "3 × 78 %+",
        "Overtime 60h+",
        "Stagnace mzdy",
        "Pokles aktivity",
      ],
      actions: [
        "1-on-1 s manažerem do 1 týdne",
        "Retention nabídka (mzda/projekt)",
        "Redistribuce overtime",
        "Career development plan",
      ],
    },
    frequency: "Měsíčně (scoring), týdně (alerty)",
    automationLevel: "80 % automatizováno",
    relatedAnalyses: ["3-07", "11-06"],
    businessImpact: "Vysoký — retention top performerů",
    implementationStatus: "Pilot",
    scope: "client",
  },
  {
    id: "3-07",
    sectionId: 3,
    sectionTitle: "Mzdy a personální data",
    name: "Detekce přesčasů",
    source: "docházka vs. ZP",
    good: "Průměr 2h/týden",
    bad: "68h/týden — porušení §93",
    description:
      "Automatická kontrola docházky proti limitům zákoníku práce § 93 (max 8 h/týden průměrně, celkem max 150 h/rok, výjimečně 416 h). Překročení znamená porušení ZP, riziko inspekce práce (SÚIP) a pokut až 2M Kč.",
    methodology:
      "Anet API /attendance/overtime → týdenní a roční agregace per zaměstnanec. Rolling average 26 týdnů pro 8 h limit. Detekce: 1) týdenní > 12 h, 2) rolling avg > 8 h, 3) roční > 150 h (bez dohody), 4) roční > 416 h (absolutní strop § 93a).",
    dataInputs: [
      "Anet docházkový systém",
      "Pracovní smlouvy (úvazek, typ práce)",
      "Dohody o práci přesčas (§ 93a)",
      "Kolektivní smlouva (limity)",
      "Rozvržení pracovní doby",
    ],
    outputMetrics: [
      "Přesčasy per zaměstnanec (h/týden, h/rok)",
      "Počet porušení § 93",
      "Rolling avg 26 týdnů",
      "Distribuce přesčasů (histogram)",
      "SÚIP risk score",
    ],
    goodScenario: {
      title: "Přesčasy pod limitem ZP",
      description:
        "Průměr 2 h/týden napříč firmou, 0 porušení § 93, kompenzace náhradním volnem nebo příplatkem 25 %.",
      indicators: [
        "Avg 2 h/týden",
        "0 porušení § 93",
        "Kompenzace OK",
        "SÚIP risk low",
      ],
      actions: ["Pokračovat v monitoringu", "Roční review"],
    },
    badScenario: {
      title: "Porušení zákoníku práce",
      description:
        "1 zaměstnanec 68 h/týden (tj. 28 h přesčasu) — porušení § 93 a § 93a. SÚIP kontrola by znamenala pokutu až 2M.",
      indicators: [
        "68 h/týden",
        "Rolling avg 22 h",
        "Porušení § 93",
        "Riziko SÚIP 2M",
      ],
      actions: [
        "Okamžitě snížit úvazek",
        "Přijmout výpomoc",
        "Kompenzovat náhradním volnem",
        "Audit rozvržení práce",
      ],
    },
    frequency: "Týdně",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["3-02", "3-06", "11-06"],
    businessImpact: "Kritický — compliance + zdraví zaměstnanců",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "3-08",
    sectionId: 3,
    sectionTitle: "Mzdy a personální data",
    name: "Efektivní hodinová mzda",
    source: "mzdy/hodiny",
    good: "Rozptyl 8%",
    bad: "Rozptyl 45% — diskriminace",
    description:
      "Výpočet efektivní hodinové mzdy (brutto / odpracované hodiny) pro stejné pozice a detekce nepřiměřeného rozptylu. Antidiskriminační zákon 198/2009 Sb. vyžaduje stejnou odměnu za stejnou práci (pay gap). Evropská směrnice 2023/970 o transparentnosti mezd zvyšuje reporting.",
    methodology:
      "Per pozice: effective_hourly = brutto / (fund prac. doby − absence). Grupy: job_title + seniority + region. Coefficient of variation (σ/μ) per grupa. Gender pay gap: (avg_male − avg_female) / avg_male. Regression adjusted pro senioritu a výkon.",
    dataInputs: [
      "Vema mzdy (brutto)",
      "Anet docházka (odpracované h)",
      "Pracovní pozice (job title + seniority)",
      "Gender, region, tenure",
      "Performance reviews",
    ],
    outputMetrics: [
      "Rozptyl CV per pozice (%)",
      "Gender pay gap (%)",
      "Regression-adjusted gap",
      "Počet pozic s CV > 20 %",
      "Outliers (>2σ od mediánu)",
    ],
    goodScenario: {
      title: "Férové mzdy",
      description:
        "Rozptyl 8 % je vysvětlitelný seniority a performance, gender gap pod 3 %, connected to EU directive 2023/970 reporting.",
      indicators: [
        "CV 8 %",
        "Gender gap 2.1 %",
        "0 neodůvodněných outliers",
        "EU directive OK",
      ],
      actions: ["Roční pay equity audit", "Report boardu"],
    },
    badScenario: {
      title: "Diskriminační rozptyl",
      description:
        "CV 45 % na stejné pozici, gender gap 18 %, riziko žaloby dle antidiskriminačního zákona.",
      indicators: ["CV 45 %", "Gender gap 18 %", "5 outliers", "Žaloby riziko"],
      actions: [
        "Okamžité pay equity audit",
        "Plán narovnání mezd (12 měsíců)",
        "Transparentnost pásem",
        "Konzultace s právníkem",
      ],
    },
    frequency: "Kvartálně",
    automationLevel: "80 % automatizováno",
    relatedAnalyses: ["3-02", "3-06"],
    businessImpact: "Vysoký — riziko žalob + reputace",
    implementationStatus: "Pilot",
    scope: "client",
  },
  {
    id: "3-09",
    sectionId: 3,
    sectionTitle: "Mzdy a personální data",
    name: "Šifrované výplatní pásky",
    source: "kanál",
    good: "100% šifrovaně",
    bad: "12% nešifrovaně — GDPR",
    description:
      "Výplatní pásky obsahují osobní údaje (mzda, rodné číslo, srážky, exekuce) a musí být předávány šifrovaně dle GDPR čl. 32. Systém monitoruje kanály doručení (email, portál, tisk) a vynucuje šifrování PDF heslem / via self-service portál.",
    methodology:
      "Pro každou výplatní pásku: delivery_channel (email/portal/print), encryption_status. Email: povinné AES-256 PDF heslo (rodné číslo + PIN). Portal: HTTPS + SSO. Audit trail doručení. GDPR compliance check před odesláním.",
    dataInputs: [
      "Vema mzdový engine (výplatní pásky)",
      "Employee self-service portal logs",
      "Email server (audit doručení)",
      "GDPR role + oprávnění",
      "PDF encryption status",
    ],
    outputMetrics: [
      "% šifrovaně doručených",
      "Počet nešifrovaných (incidenty)",
      "Channel mix (email/portal/print)",
      "GDPR compliance score",
      "Open rate self-service portal",
    ],
    goodScenario: {
      title: "100 % šifrované doručení",
      description:
        "Všechny pásky přes self-service portál nebo AES-256 PDF, 0 incidentů, GDPR compliance 100 %.",
      indicators: [
        "100 % šifrovaně",
        "0 incidentů",
        "Portal adoption 87 %",
        "GDPR OK",
      ],
      actions: ["Pokračovat v monitoringu", "Zvýšit adoption portálu"],
    },
    badScenario: {
      title: "GDPR porušení — nešifrované pásky",
      description:
        "12 % pásek posíláno nešifrovaným emailem — porušení GDPR čl. 32, riziko pokuty až 4 % obratu nebo 20M EUR.",
      indicators: [
        "12 % nešifrovaně",
        "15 incidentů",
        "GDPR breach",
        "Riziko pokuty ÚOOÚ",
      ],
      actions: [
        "Okamžitě zavést PDF encryption",
        "Notifikace ÚOOÚ do 72 h (čl. 33)",
        "Migrace na self-service portál",
        "GDPR training mzdové účetní",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["10-10", "3-02"],
    businessImpact: "Kritický — GDPR compliance",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "3-10",
    sectionId: 3,
    sectionTitle: "Mzdy a personální data",
    name: "Roční zúčtování",
    source: "prohlášení",
    good: "98% do 15.2.",
    bad: "40% po termínu",
    description:
      "Roční zúčtování záloh daně z příjmů dle § 38ch ZDP — zaměstnanec žádá do 15. 2. následujícího roku, zaměstnavatel vypočítá a vrátí přeplatek / doplatek v březnové mzdě. Systém monitoruje progress sběru prohlášení a upozorňuje na zpoždění.",
    methodology:
      "Workflow: 1) prosinec — zaslání žádosti o prohlášení zaměstnancům, 2) sběr do 15. 2., 3) výpočet ročního zúčtování (slevy § 35ba, odpočty § 15), 4) vrácení přeplatku v březnové mzdě. Tracking completion rate per HR.",
    dataInputs: [
      "Zaměstnanci Vema",
      "Prohlášení poplatníka § 38k",
      "Doklady o odpočtech (hypotéka, dary, pojištění)",
      "Roční mzdová data",
      "ADIS API — potvrzení od zaměstnavatelů",
    ],
    outputMetrics: [
      "% zaměstnanců s prohlášením včas",
      "Celkový přeplatek / doplatek (Kč)",
      "Průměrná vratka per zaměstnanec (Kč)",
      "Počet zpožděných o 30+ dní",
      "Completion time (dny)",
    ],
    goodScenario: {
      title: "Roční zúčtování dokončeno včas",
      description:
        "98 % prohlášení do 15. 2., zúčtování provedeno v březnové mzdě, průměrná vratka 3 200 Kč.",
      indicators: [
        "98 % včas",
        "Vratka 3.2K",
        "Dokončeno v 3/2026",
        "0 stížností",
      ],
      actions: ["Archivovat prohlášení 10 let", "Roční report klientovi"],
    },
    badScenario: {
      title: "Masivní zpoždění prohlášení",
      description:
        "40 % prohlášení po termínu 15. 2. — komplikuje březnové mzdy, frustrace zaměstnanců čekajících na vratku, dodatečná práce mzdovky.",
      indicators: [
        "40 % po termínu",
        "Stížnosti 12×",
        "Dopad na březnovou mzdu",
        "Chybí podklady",
      ],
      actions: [
        "Automatizované reminder kampaně",
        "Self-service portal pro upload",
        "Prodloužený termín jednorázově",
        "HR workshop zaměstnancům",
      ],
    },
    frequency: "Ročně (leden-březen)",
    automationLevel: "75 % automatizováno",
    relatedAnalyses: ["3-02", "1-08"],
    businessImpact: "Střední — spokojenost zaměstnanců",
    implementationStatus: "Produkce",
    scope: "client",
  },
];
