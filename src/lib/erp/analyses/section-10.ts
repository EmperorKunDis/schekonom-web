import type { AnalysisDetail } from "./types";

export const section10Analyses: AnalysisDetail[] = [
  {
    id: "10-01",
    sectionId: 10,
    sectionTitle: "Rizika, fraud, deepfakes",
    name: "Churn prediction",
    source: "ML model",
    good: "0 klientů s >50% rizikem",
    bad: "2 klienti s 89% pravděpodobností odchodu",
    description:
      "Machine learning model predikující pravděpodobnost odchodu klienta na základě desítek signálů: komunikační vzorce, platební morálka, využití služeb, sentiment, externí signály a behaviorální mikrosignály.\n\nModel je natrénován na historických datech o odchodech klientů a dosahuje přesnosti 84 % (AUC-ROC). Predikce se aktualizuje denně a při překročení thresholdu 50 % spouští automatický retention workflow.\n\nKlíčovou hodnotou je čas — model detekuje riziko odchodu průměrně 47 dní před tím, než klient odejde, což dává prostor pro intervenci.",
    methodology:
      "Gradient Boosted Trees (XGBoost): 1) 47 vstupních featur z 8 kategorií, 2) Denní scoring všech aktivních klientů, 3) SHAP values pro vysvětlení top faktorů, 4) Threshold 50 % pro alert, 70 % pro eskalaci, 5) Retention workflow s personalizovanými akcemi.",
    dataInputs: [
      "Sentiment trend (7-01)",
      "Platební morálka (9-03)",
      "Frekvence kontaktů (7-04)",
      "Využití služeb (16-01)",
      "Externí signály (19-01 až 19-08)",
      "Behaviorální mikrosignály (17-01 až 17-05)",
    ],
    outputMetrics: [
      "Churn pravděpodobnost (0–100 %)",
      "Top 3 rizikové faktory (SHAP)",
      "Čas do pravděpodobného odchodu",
      "Doporučená akce",
      "Expected revenue loss při odchodu",
    ],
    goodScenario: {
      title: "Portfolio stabilní",
      description:
        "Žádný klient nemá churn pravděpodobnost nad 50 %. Nejvyšší riziko je 23 % u klienta, který zrovna mění jednatele — přirozená dočasná turbulence.",
      indicators: [
        "0 klientů nad 50 % rizikem",
        "Max riziko 23 %",
        "Průměr portfolia 8 %",
        "3 klienti snížili riziko za poslední měsíc",
      ],
      actions: [
        "Pokračovat v monitoringu",
        "Sledovat klienta s 23 % — generační změna",
        "Aktualizovat model s novými daty",
      ],
    },
    badScenario: {
      title: "Hrozí ztráta klíčových klientů",
      description:
        "2 klienti s 89 % pravděpodobností odchodu do 60 dní. Hlavní faktory: propad sentimentu, 3× zmínka konkurence, zpomalení plateb. Combined revenue at risk: 1.2M Kč ročně.",
      indicators: [
        "2 klienti nad 85 % rizikem",
        "Combined revenue at risk: 1.2M Kč/rok",
        "Oba zmínili konkurenční nabídku",
        "Sentiment propadl o 40+ bodů",
      ],
      actions: [
        "Okamžitá osobní schůzka s oběma klienty",
        "Připravit retention nabídku (sleva / upgrade služeb)",
        "Analyzovat root cause — co se stalo",
        "Informovat management o riziku ztráty revenue",
      ],
    },
    frequency: "Denně",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["10-02", "22-01", "22-02", "7-01"],
    businessImpact: "Kritický — prevence ztráty revenue",
    implementationStatus: "Produkce",
  },
  {
    id: "10-02",
    sectionId: 10,
    sectionTitle: "Rizika, fraud, deepfakes",
    name: "Early warning",
    source: "anomálie",
    good: "Žádné anomálie",
    bad: "Klient ztichl + zpomalil platby",
    description:
      "Multi-signal early warning system kombinující slabé behaviorální signály do kompozitního skóre. Jednotlivé signály (ztichnutí, zpomalení plateb, zrušená schůzka) mohou být neškodné, ale jejich souběh tvoří silný prediktor problému. Systém detekuje kompozit dřív než ML churn model (10-01), protože reaguje na dynamickou kombinaci.",
    methodology:
      "Isolation Forest + rule engine: každý klient má vektor 12 signálů (silent days, DSO delta, cancelation count, sentiment drop, feature usage drop, etc.). Kombinované skóre anomaly_score × severity. Alert při ≥ 3 souběžných signálech nad threshold. Eskalace real-time do CRM.",
    dataInputs: [
      "Kontaktní frekvence (7-04)",
      "Platby (9-03)",
      "Reenio zrušení (7-10)",
      "Sentiment (7-01)",
      "Login aktivita portál (17-xx)",
      "ARES signály",
    ],
    outputMetrics: [
      "Anomaly score per klient (0-100)",
      "Počet souběžných signálů",
      "Time-to-alert (dny před 10-01)",
      "False positive rate",
      "Precision/recall na historických odchodech",
    ],
    goodScenario: {
      title: "Klidné portfolio bez varování",
      description:
        "0 klientů v early warning zóně, všechny signály pod threshold. Portfolio behaviorálně stabilní.",
      indicators: [
        "0 klientů s 3+ signály",
        "Anomaly score průměr 12/100",
        "Max skóre 34",
        "0 alerts za měsíc",
      ],
      actions: ["Udržet sledování"],
    },
    badScenario: {
      title: "Kombinované signály — klient odchází",
      description:
        "Klient vykazuje 4 souběžné signály: 45 dní bez kontaktu (baseline 7 dní), DSO vyskočil z 14 na 38 dní, zrušil 2 schůzky po sobě, login na portál −80 %. Skóre 87/100.",
      indicators: [
        "4 souběžné signály",
        "Anomaly score 87/100",
        "Detekováno 34 dní před potenciálním churn",
        "Churn risk 10-01 zatím jen 42 %",
      ],
      actions: [
        "Okamžitý personal outreach partnerem",
        "Skip standardní retention — jít rovnou k root cause",
        "Root cause interview",
        "24h window pro intervence",
      ],
    },
    frequency: "Real-time",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["10-01", "7-01", "7-04", "9-03"],
    businessImpact: "Kritický — nejranější detekce problému",
    implementationStatus: "Produkce",
  },
  {
    id: "10-03",
    sectionId: 10,
    sectionTitle: "Rizika, fraud, deepfakes",
    name: "Kreditní riziko",
    source: "historie + ISIR",
    good: "Všichni dodavatelé solventní",
    bad: "Dodavatel v insolvenci — 340K pohledávka",
    description:
      "Monitoring kreditního rizika obchodních partnerů klienta (dodavatelů i odběratelů). Systém denně kontroluje ISIR (insolvenční rejstřík), OR změny a platební morálku. Včas detekuje, že obchodní partner klienta směřuje k insolvenci — tím chrání klienta před ztrátou pohledávky.",
    methodology:
      "ISIR API (justice.cz/isir) denní check všech IČO z klientských saldokontonta. ARES API pro OR změny (likvidace, změny statutárních orgánů). Scoring: historie plateb + ISIR status + OR události + Creditinfo rating. Alert při insolvenci partnera s otevřenou pohledávkou.",
    dataInputs: [
      "Klient saldokonto — IČO dodavatelů i odběratelů",
      "ISIR API (/isir/api/search)",
      "ARES API /ares/v1/ekonomicke-subjekty/{ico}",
      "Creditinfo / Bisnode rating API",
      "Historical payment behavior partner",
    ],
    outputMetrics: [
      "Počet partnerů v insolvenci",
      "Exposure per partner (Kč)",
      "Portfolio kreditní skóre",
      "Top 10 rizikových partnerů",
      "Expected credit loss (IFRS 9)",
    ],
    goodScenario: {
      title: "Zdravé portfolio partnerů",
      description:
        "0 partnerů klienta v insolvenci, žádné OR varovné signály. Portfolio kreditní skóre 92/100.",
      indicators: [
        "0 partnerů v ISIR",
        "0 likvidací",
        "Portfolio score 92/100",
        "Expected credit loss < 0.5 %",
      ],
      actions: ["Pokračovat v monitoringu"],
    },
    badScenario: {
      title: "Dodavatel v insolvenci — ohrožená pohledávka",
      description:
        "Klíčový dodavatel klienta vstoupil do insolvence 12.3.2026. Klient má vůči němu pohledávku 340 000 Kč (zálohově placené zboží). Nutné přihlásit pohledávku do 2 měsíců (§ 173 IZ).",
      indicators: [
        "1 partner v ISIR",
        "Exposure 340K Kč",
        "Insolvenční řízení: 12.3.2026",
        "Deadline přihlášení: 12.5.2026",
      ],
      actions: [
        "Okamžitě informovat klienta",
        "Připravit přihlášku pohledávky (§ 173 IZ)",
        "Nabídnout zastoupení v insolvenčním řízení",
        "Opravná položka dle § 8a z. 593/1992 Sb.",
      ],
    },
    frequency: "Denně",
    automationLevel: "98 % automatizováno",
    relatedAnalyses: ["1-04", "10-09", "19-05"],
    businessImpact: "Vysoký — ochrana klientských pohledávek",
    implementationStatus: "Produkce",
  },
  {
    id: "10-04",
    sectionId: 10,
    sectionTitle: "Rizika, fraud, deepfakes",
    name: "CEO fraud",
    source: "3-way matching",
    good: "0 podezřelých změn",
    bad: "Změna IBAN + neobvyklá platba 890K",
    description:
      "Detekce CEO fraud / business email compromise. Klasický scénář: podvodník získá přístup k emailu jednatele (nebo podvrhne hlas deepfake), pošle urgentní pokyn k platbě na 'nový IBAN dodavatele'. Systém kombinuje 3-way matching (objednávka↔dodací list↔faktura), detekci změny IBAN a hlasovou biometriku.",
    methodology:
      "Multi-vrstvý detektor: 1) 3-way matching engine (objednávka ∈ systému ↔ dodací list ↔ faktura), 2) IBAN change detection v dodavatelské kartotéce, 3) Out-of-pattern platby (částka > baseline × 5 nebo nový dodavatel), 4) Hlasová biometrika na telefonických instrukcích (detekce deepfake), 5) Dual approval workflow při trigger.",
    dataInputs: [
      "Objednávky (ERP objednávkový modul)",
      "Dodací listy (DocuWare)",
      "Faktury přijaté (Money S3)",
      "Dodavatelská kartotéka (IBAN history)",
      "Hlasové záznamy autorizačních hovorů",
      "Hlasový otisk jednatele (baseline)",
    ],
    outputMetrics: [
      "Počet trigger eventů",
      "3-way match rate (%)",
      "IBAN changes detected",
      "Voice biometrics confidence",
      "Blocked payments (Kč, počet)",
    ],
    goodScenario: {
      title: "0 podezřelých transakcí",
      description:
        "Všechny platby mají 3-way match, IBAN dodavatelů stabilní 12+ měsíců, hlasová biometrika potvrzuje jednatele na 99.7 %.",
      indicators: [
        "3-way match 100 %",
        "0 IBAN changes",
        "Voice biometric 99.7 %",
        "0 trigger eventů",
      ],
      actions: ["Udržet kontroly", "Quarterly fraud awareness training"],
    },
    badScenario: {
      title: "Akutní podezření na CEO fraud",
      description:
        "Detekována kombinace: IBAN dodavatele změněn včera, dnes přišla urgentní faktura na 890 000 Kč bez objednávky, telefonická autorizace má voice biometric confidence jen 42 %. Vysoká pravděpodobnost podvodu.",
      indicators: [
        "IBAN changed 24h ago",
        "Invoice 890K bez objednávky",
        "Voice biometric 42 % (threshold 85)",
        "Urgent timing (pátek 16:30)",
      ],
      actions: [
        "OKAMŽITĚ zablokovat platbu",
        "Osobní ověření s jednatelem (ne telefon)",
        "Ověřit dodavatele přes alternativní kanál",
        "Pokud podvod — nahlásit policii (§ 209 TZ)",
      ],
    },
    frequency: "Real-time per každá platba",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["10-05", "10-08", "11-08"],
    businessImpact: "Kritický — přímá finanční ochrana",
    implementationStatus: "Produkce",
  },
  {
    id: "10-05",
    sectionId: 10,
    sectionTitle: "Rizika, fraud, deepfakes",
    name: "Detekce změny IBAN",
    source: "porovnání",
    good: "IBAN stabilní 2+ roky",
    bad: "IBAN změněn 2× za měsíc — podvod?",
    description:
      "Specializovaný monitoring změn IBAN v dodavatelské kartotéce. Změna IBAN je nejčastější vektor CEO fraud / invoice fraud. Legitimní změna je vzácná (1-2× za dekádu), vícenásobné změny v krátkém období jsou prakticky jistě podvod.",
    methodology:
      "History table dodavatelských IBAN s timestamp a change source (kdo, kdy, kde). Rate limiting: > 1 změna za 6M = flag. Verifikační workflow: nová IBAN změna musí být potvrzena: 1) emailem z ověřené domény dodavatele, 2) telefonicky na historické číslo, 3) dual approval.",
    dataInputs: [
      "Dodavatelská kartotéka (ERP)",
      "IBAN change history log",
      "Source email headers (SPF/DKIM validation)",
      "Historic dodavatel kontakty",
      "Dual approval workflow log",
    ],
    outputMetrics: [
      "IBAN changes / kvartál",
      "Rate change per dodavatel",
      "Change verification success rate",
      "Blocked suspicious changes",
      "Avg time od změny k platbě",
    ],
    goodScenario: {
      title: "IBAN stabilita",
      description:
        "Všechny dodavatelské IBAN stabilní 2+ roky, 0 změn za poslední rok. Vysoká data integrity.",
      indicators: [
        "0 změn za 12M",
        "Průměrná stabilita 38 měsíců",
        "0 verifikačních selhání",
        "100 % IBAN potvrzených zdrojem",
      ],
      actions: ["Udržet kontroly"],
    },
    badScenario: {
      title: "Podezřelá kaskáda IBAN změn",
      description:
        "Dodavatel X změnil IBAN 2× za měsíc (14.3.2026 a 28.3.2026). První změna nebyla ověřena, druhá přišla z emailu s SPF fail. Třetí pokus o změnu dnes — 3. IBAN. Invoice fraud kampaň.",
      indicators: [
        "2 změny / měsíc (baseline 0)",
        "SPF fail na 2. změně",
        "Dnes 3. pokus o změnu",
        "IBAN bank country mismatch (CZ → MT → LT)",
      ],
      actions: [
        "OKAMŽITĚ zablokovat všechny platby dodavateli X",
        "Forenzní review posledních plateb",
        "Ověřit na ověřené telefonní číslo dodavatele",
        "Ohlásit ČNB / FAU při potvrzení podvodu",
      ],
    },
    frequency: "Per každá změna (real-time)",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["10-04", "10-06", "10-08"],
    businessImpact: "Kritický — prevence přímých ztrát",
    implementationStatus: "Produkce",
  },
  {
    id: "10-06",
    sectionId: 10,
    sectionTitle: "Rizika, fraud, deepfakes",
    name: "AML signály",
    source: "vzory plateb",
    good: "Standardní vzory",
    bad: "Pravidelné platby 49K (pod hranicí 50K)",
    description:
      "Detekce AML (Anti-Money Laundering) signálů v platbách klienta. Systém hledá vzorce, které naznačují legalizaci výnosů z trestné činnosti: strukturování (smurf platby pod reporting threshold), neobvyklé destinace, komplikované řetězce, pass-through účty. Compliance s AML zákonem č. 253/2008 Sb.",
    methodology:
      "Pattern recognition na bankovních transakcích: 1) Structuring detector (platby 49K, 49.9K systematic), 2) Round-number frequency (podezřelé pravidelné kulaté částky), 3) Geografie odchozích plateb (high-risk jurisdictions FATF), 4) Pass-through accounts (rychlý in/out), 5) Velocity anomálií.",
    dataInputs: [
      "Bankovní transakce klienta (FIO, KB, ČSOB API)",
      "FATF high-risk jurisdictions list",
      "SDN sanction lists (EU, OFAC)",
      "Historical payment baseline",
      "Klient rizikový profil (NACE, obrat)",
    ],
    outputMetrics: [
      "Structuring risk score",
      "Geographic risk score",
      "Velocity anomaly count",
      "SDN match count",
      "AML composite risk",
    ],
    goodScenario: {
      title: "Standardní finanční chování",
      description:
        "Platby klienta odpovídají business profilu, žádné podezřelé vzorce, 0 transakcí do high-risk zemí, 0 structuring signálů.",
      indicators: [
        "0 structuring alerts",
        "0 high-risk destinations",
        "0 SDN matches",
        "AML risk score 8/100",
      ],
      actions: ["Standard monitoring"],
    },
    badScenario: {
      title: "Systematické structuring",
      description:
        "Klient dělá týdně 3-4 hotovostní vklady 49 000 Kč (pod report threshold 15 000 EUR). Kumulativně 680K měsíčně, nesedí s fakturovaným obratem. Klasické structuring.",
      indicators: [
        "12 structuring platby / měsíc",
        "Vklady 49K pod 50K threshold",
        "680K/měsíc mimo business",
        "AML risk score 84/100",
      ],
      actions: [
        "Zablokovat další zpracování (§ 20 AML z.)",
        "Ohlásit podezřelý obchod FAU ČR",
        "Informovat compliance officer",
        "Připravit off-boarding klienta",
      ],
    },
    frequency: "Denně",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["10-04", "10-05", "10-07"],
    businessImpact: "Kritický — AML zákonná povinnost",
    implementationStatus: "Produkce",
  },
  {
    id: "10-07",
    sectionId: 10,
    sectionTitle: "Rizika, fraud, deepfakes",
    name: "Compliance gap",
    source: "regulace × činnost",
    good: "100% pokrytí",
    bad: "Chybí 3 povinné licence",
    description:
      "Gap analýza compliance povinností klienta vs. reálný stav. Systém mapuje NACE obor × velikost klienta × území působnosti → seznam povinných licencí, certifikátů, registrací. Porovnává se skutečným stavem. Identifikuje mezery, které mohou vést k pokutě nebo zastavení činnosti.",
    methodology:
      "Rule engine nad legislativní matricí: NACE code × employee count × revenue × geography → required_licenses[]. Cross-check s ARES (živnostenský rejstřík), SÚKL (pokud farmacie), ČNB (finanční služby), SZPI (potraviny). Annual compliance audit report.",
    dataInputs: [
      "ARES živnostenský rejstřík",
      "SÚKL / ČNB / SZPI / ČOI registry",
      "GDPR compliance matrix",
      "ISO/BS/EN standards list",
      "Legislativní knowledge base (aktualizace)",
    ],
    outputMetrics: [
      "Compliance coverage (%)",
      "Missing licenses/permits count",
      "Expiring permits (< 90 days)",
      "Risk exposure (Kč — potenciální pokuta)",
      "Compliance score 0-100",
    ],
    goodScenario: {
      title: "Plná compliance",
      description:
        "Klient má 100 % pokrytí všech regulačních povinností. Všechny licence platné, žádná expirující do 90 dní.",
      indicators: [
        "Coverage 100 %",
        "0 missing permits",
        "0 expiring (90 dnů)",
        "Score 98/100",
      ],
      actions: ["Monitoring expiry dat", "Proaktivní renewal process"],
    },
    badScenario: {
      title: "Kritické compliance mezery",
      description:
        "Klient podniká v regulovaném oboru (potraviny) bez 3 povinných certifikátů: HACCP, SZPI registrace, IČP odpovědné osoby. Exposure: až 3M Kč pokuty + zastavení činnosti.",
      indicators: [
        "Coverage 62 %",
        "3 missing permits",
        "Risk exposure 3M Kč",
        "Score 34/100",
      ],
      actions: [
        "Okamžitě informovat klienta písemně",
        "Připravit timeline získání certifikátů",
        "Konzultace specialisty (HACCP, SZPI)",
        "Do získání — doporučit pozastavit rizikové aktivity",
      ],
    },
    frequency: "Kvartálně + při změně regulace",
    automationLevel: "70 % automatizováno",
    relatedAnalyses: ["10-11", "19-07"],
    businessImpact: "Kritický — zákonná povinnost klienta",
    implementationStatus: "Produkce",
  },
  {
    id: "10-08",
    sectionId: 10,
    sectionTitle: "Rizika, fraud, deepfakes",
    name: "Fakturační nesrovnalosti",
    source: "doklady vs. objednávky",
    good: "100% match",
    bad: "17% faktur bez objednávky",
    description:
      "3-way matching kontrola: každá přijatá faktura musí mít odpovídající objednávku a dodací list. Faktury bez párujícího POkázky jsou buď prošly bez kontroly (riziko dvojích plateb, fraud) nebo pochází od neautorizovaného dodavatele. Benford's law pro statistickou detekci manipulovaných čísel.",
    methodology:
      "3-way matching engine s fuzzy matching (IČO, DIČ, částka ±1 %, datum ±7 dní). Pro neshody: automated investigation (hledá dodací list manuálně). Benford's law test pro statistickou detekci: frequency distribution first digit faktur — odchylka od Benford = možná manipulace.",
    dataInputs: [
      "Faktury přijaté (Money S3)",
      "Objednávkový modul ERP",
      "Dodací listy (DocuWare workflow)",
      "Dodavatelská kartotéka",
      "Benford's law expected distribution",
    ],
    outputMetrics: [
      "3-way match rate (%)",
      "Unmatched invoices count",
      "Unmatched amount (Kč)",
      "Benford's law deviation",
      "Suspicious vendors (top 5)",
    ],
    goodScenario: {
      title: "Plná auditovatelnost fakturace",
      description:
        "100 % faktur má objednávku i dodací list. Benford's law odchylka 3 % (v normálu < 5 %). 0 podezřelých dodavatelů.",
      indicators: [
        "Match rate 100 %",
        "0 unmatched",
        "Benford deviation 3 %",
        "0 suspicious",
      ],
      actions: ["Pokračovat v kontrolách"],
    },
    badScenario: {
      title: "Masivní fakturační mezery",
      description:
        "17 % faktur nemá objednávku (280 faktur / 1.2M Kč). Benford's law odchylka 18 % — statisticky podezřelé. Top 5 dodavatelů bez PO — 2 neznámá IČO bez dřívější historie.",
      indicators: [
        "Match rate 83 %",
        "280 unmatched faktur",
        "1.2M Kč bez PO",
        "Benford deviation 18 %",
      ],
      actions: [
        "Forenzní audit 280 faktur",
        "Zavést mandatorní PO workflow",
        "Prošetřit neznámá IČO (ARES + ISIR)",
        "Trestní oznámení při potvrzení fraudu (§ 209 TZ)",
      ],
    },
    frequency: "Denně",
    automationLevel: "92 % automatizováno",
    relatedAnalyses: ["10-04", "10-05", "11-08"],
    businessImpact: "Kritický — detekce invoice fraud",
    implementationStatus: "Produkce",
  },
  {
    id: "10-09",
    sectionId: 10,
    sectionTitle: "Rizika, fraud, deepfakes",
    name: "Predikce insolvence",
    source: "platby + rejstříky",
    good: "Score 92/100 — stabilní",
    bad: "Score 23/100 — insolvence do 6 měsíců",
    description:
      "Prediktivní scoring insolvence klienta i jeho obchodních partnerů. Kombinuje platební historii, finanční ukazatele z účetních výkazů, ISIR/OR události a makroekonomické signály. Altman Z-score + vlastní ML model natrénovaný na českém kontextu.",
    methodology:
      "Hybrid model: 1) Altman Z-score (working capital, retained earnings, EBIT, equity, sales), 2) ML model (XGBoost) na CZ insolvencích 2015-2025, 3) ISIR realtime check, 4) OR events (výmaz, likvidace), 5) Makroekonomický overlay (sektor NACE). Výstup: insolvency probability v horizontu 6M, 12M, 24M.",
    dataInputs: [
      "Klient finanční výkazy (1-02)",
      "Platební chování (9-03)",
      "ISIR API (/isir/api/search)",
      "ARES / OR change events",
      "Altman Z-score formula",
      "Bisnode / Creditinfo rating",
    ],
    outputMetrics: [
      "Insolvency score (0-100)",
      "Altman Z-score",
      "Probability 6M / 12M / 24M",
      "Top contributing factors",
      "Sector benchmark delta",
    ],
    goodScenario: {
      title: "Finančně silný subjekt",
      description:
        "Score 92/100, Altman Z = 3.8 (safe zone > 3), 0 ISIR signálů, zdravé cash flow, likvidita L2 > 1.5.",
      indicators: [
        "Score 92/100",
        "Altman Z 3.8 (safe)",
        "Insolv. pravděp. 12M < 1 %",
        "Sector percentile 82",
      ],
      actions: ["Monitoring kvartální", "Nabídnout rozšíření služeb"],
    },
    badScenario: {
      title: "Vysoké riziko insolvence",
      description:
        "Score 23/100, Altman Z = 0.8 (distress zone < 1.8), 3 měsíce záporný CF, DSO 78 dní, úvěrové kovenanty porušené. Pravděpodobnost insolvence do 6 měsíců 62 %.",
      indicators: [
        "Score 23/100",
        "Altman Z 0.8 (distress)",
        "Insolv. pravděp. 6M = 62 %",
        "3M záporný CF",
      ],
      actions: [
        "Urgentní strategická konzultace (§ 98 IZ povinnost)",
        "Cash flow restructuring plán",
        "Informovat banku (covenants)",
        "Připravit insolvenční návrh pokud nutno",
      ],
    },
    frequency: "Měsíčně + real-time ISIR check",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["1-02", "1-03", "9-03", "10-03"],
    businessImpact: "Kritický — včasné varování insolvence",
    implementationStatus: "Produkce",
  },
  {
    id: "10-10",
    sectionId: 10,
    sectionTitle: "Rizika, fraud, deepfakes",
    name: "Shadow AI detekce",
    source: "DLP logy",
    good: "0 úniků do LLM",
    bad: "Účetní vložila klientská data do ChatGPT",
    description:
      "Detekce úniku citlivých klientských dat do externích LLM (ChatGPT, Claude, Gemini, Copilot). Zaměstnanci často používají LLM pro úlevu od práce, ale vkládají do nich klientské finanční údaje, IČO, osobní údaje — což je závažné porušení GDPR čl. 32 i smluvních závazků.",
    methodology:
      "DLP (Data Loss Prevention) monitoring: 1) Browser extension monitoring POST requests na known LLM domény (chatgpt.com, claude.ai, gemini.google.com, copilot.microsoft.com), 2) Content inspection — match na klientské IČO, jména, částky, 3) Network-level DLP (firewall egress rules), 4) Training + deterrence.",
    dataInputs: [
      "DLP browser extension logy",
      "Firewall egress logs (URL + payload hash)",
      "Klient IČO/jména z CRM",
      "Employee workstation inventory",
      "Known LLM endpoints list",
    ],
    outputMetrics: [
      "Detekovaných úniků / měsíc",
      "Účet s nejvíce incidenty",
      "Typ uniklých dat (IČO, částky, osobní)",
      "Volume dat (MB)",
      "Compliance risk score",
    ],
    goodScenario: {
      title: "Žádné úniky do AI",
      description:
        "0 detekovaných úniků, zaměstnanci používají firemní AI Gateway (on-premise RAG) pro sensitive úlohy. Kompletní audit trail.",
      indicators: [
        "0 úniků do external LLM",
        "100 % sensitive dotazů přes on-prem AI",
        "0 compliance incidenty",
        "Training coverage 100 %",
      ],
      actions: ["Udržet awareness training", "Quarterly red team test"],
    },
    badScenario: {
      title: "Klientská data v ChatGPT",
      description:
        "Účetní vložila do ChatGPT obraty hlavní knihy klienta včetně IČO a obratu (12M Kč). Data odeslána na servery OpenAI (USA, mimo EU) — porušení GDPR čl. 46 (transfer mimo EU), smluvní povinnosti NDA s klientem.",
      indicators: [
        "1 únik: 3.2 MB dat",
        "IČO + obraty v prompt",
        "Transfer do USA (ne EU)",
        "GDPR čl. 46 violation",
      ],
      actions: [
        "Okamžitě zablokovat LLM domény na firewall",
        "Disciplinární řízení dle ZP § 52",
        "GDPR breach notification do 72h (čl. 33)",
        "Informovat klienta o incidentu",
      ],
    },
    frequency: "Real-time monitoring",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["10-11", "11-07"],
    businessImpact: "Kritický — GDPR compliance + konkurenční data",
    implementationStatus: "Produkce",
  },
  {
    id: "10-11",
    sectionId: 10,
    sectionTitle: "Rizika, fraud, deepfakes",
    name: "AI Act rizikové systémy",
    source: "audit nástrojů",
    good: "0 high-risk AI",
    bad: "2 systémy nesplňují AI Act — nutný audit",
    description:
      "Compliance s EU AI Act (Nařízení (EU) 2024/1689). Systém klasifikuje všechny AI nástroje používané v kanceláři podle rizikových kategorií (minimal, limited, high, unacceptable). High-risk systémy (např. AI pro kreditní scoring, hodnocení zaměstnanců) mají striktní compliance povinnosti — CE značka, risk management system, data governance.",
    methodology:
      "AI inventory s klasifikací per system: 1) Use case (per Annex III AI Act), 2) Risk category, 3) Compliance status (technical documentation, risk management, transparency, human oversight), 4) Gap analysis vs. požadavky, 5) Remediation roadmap do 2.8.2026 (high-risk deadline).",
    dataInputs: [
      "AI system inventory (interní + vendored)",
      "AI Act Annex III use case list",
      "Vendor compliance documentation",
      "Internal AI governance policy",
      "Risk management system (ISO 42001)",
    ],
    outputMetrics: [
      "Počet AI systémů (per risk category)",
      "Compliance coverage (%)",
      "High-risk systémy bez CE značky",
      "Deadline countdown (2.8.2026)",
      "Remediation cost odhad",
    ],
    goodScenario: {
      title: "Plná AI Act compliance",
      description:
        "Všechny AI systémy klasifikované, 0 high-risk bez CE značky, 100 % transparency pro klienty (AI disclaimer). Ready na 2.8.2026 deadline.",
      indicators: [
        "100 % AI inventory",
        "0 non-compliant high-risk",
        "100 % transparency",
        "Full documentation",
      ],
      actions: ["Annual AI Act review", "Vendor re-assessment ročně"],
    },
    badScenario: {
      title: "2 high-risk systémy mimo compliance",
      description:
        "Kancelář používá 2 AI systémy klasifikované jako high-risk (credit scoring pro klienty, employee performance AI). Oba bez CE značky, bez technické dokumentace, bez risk management system. 4 měsíce do deadline, riziko pokuty až 7 % globálního obratu (čl. 99 AI Act).",
      indicators: [
        "2 non-compliant high-risk",
        "0 CE značek",
        "0 risk management system",
        "Deadline: 2.8.2026 (4M)",
      ],
      actions: [
        "Okamžitě pozastavit high-risk AI použití",
        "CE conformity assessment (notified body)",
        "Implementovat ISO 42001 AI management",
        "Připravit technickou dokumentaci",
      ],
    },
    frequency: "Ročně + při deployment nového AI",
    automationLevel: "60 % automatizováno",
    relatedAnalyses: ["10-07", "10-10"],
    businessImpact: "Kritický — EU AI Act deadline 2.8.2026",
    implementationStatus: "V přípravě",
  },
];
