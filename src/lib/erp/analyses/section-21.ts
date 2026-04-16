import type { AnalysisDetail } from "./types";

export const section21Analyses: AnalysisDetail[] = [
  {
    id: "21-01",
    sectionId: 21,
    sectionTitle: "Virtuální CFO",
    name: "Real-time ziskovost",
    source: "BI dashboard",
    good: "Marže 28%, trend rostoucí",
    bad: "Marže klesá z 24% na 11% za 6 měsíců",
    description:
      "Real-time monitoring ziskovosti klientské firmy na základě kontinuálního zpracování účetních dat. Systém poskytuje aktuální pohled na marži, zisk a rentabilitu bez nutnosti čekat na měsíční uzávěrku.\n\nVirtuální CFO modul agreguje data z fakturace, bankovních výpisů, mzdového modulu a nákladového účetnictví do real-time dashboardu. Klient vidí svou aktuální finanční situaci kdykoliv.\n\nKlíčovou funkcí je predikce — na základě aktuálního trendu systém predikuje ziskovost na 3/6/12 měsíců a proaktivně navrhuje opatření.",
    methodology:
      "Real-time agregace: 1) Průběžné zpracování transakcí z ERP, 2) Výpočet kumulativní marže a zisku, 3) Porovnání s plánem a historií, 4) Trend extrapolace, 5) Proaktivní alerting při negativním trendu.",
    dataInputs: [
      "Účetní data (průběžně aktualizovaná)",
      "Bankovní výpisy (denně)",
      "Mzdové náklady",
      "Rozpočet a plán",
      "Oborové benchmarky",
    ],
    outputMetrics: [
      "Aktuální marže (%)",
      "Kumulativní zisk/ztráta",
      "Trend (3/6/12 měsíců)",
      "Odchylka od plánu",
      "Benchmark vs. obor",
    ],
    goodScenario: {
      title: "Zdravá a rostoucí ziskovost",
      description:
        "Marže dosahuje 28 % s rostoucím trendem. Klient je nad oborovým průměrem a plní plán na 112 %.",
      indicators: [
        "Marže 28 % (obor: 22 %)",
        "Trend rostoucí 6 měsíců",
        "Plán plněn na 112 %",
        "Likvidita dostatečná",
      ],
      actions: [
        "Připravit expanzní scénáře",
        "Diskutovat investiční příležitosti",
        "Optimalizovat daňovou strukturu",
      ],
    },
    badScenario: {
      title: "Dramatický pokles ziskovosti",
      description:
        "Marže klesá z 24 % na 11 % za 6 měsíců. Hlavní příčiny: ztráta klíčového klienta, růst mzdových nákladů a neefektivní nákupní proces.",
      indicators: [
        "Marže 11 % (z 24 %)",
        "Trend klesající 6 měsíců",
        "3 hlavní příčiny identifikovány",
        "Předpokládaná ztráta do Q3",
      ],
      actions: [
        "Urgentní schůzka s jednatelem",
        "Prezentovat analýzu příčin",
        "Navrhnout krizový plán (cost cutting)",
        "Restrukturalizovat nákladovou základnu",
      ],
    },
    frequency: "Real-time (kontinuálně)",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["21-02", "21-03", "21-04", "2-01"],
    businessImpact: "Kritický — finanční řízení klienta",
    implementationStatus: "Produkce",
  },
  {
    id: "21-02",
    sectionId: 21,
    sectionTitle: "Virtuální CFO",
    name: "Predikce likvidity",
    source: "model",
    good: "Likvidita OK 90+ dní",
    bad: "«Dojdou vám peníze za 3 týdny»",
    description:
      "ML model predikující cash flow a likviditu klienta na horizontu 7/30/90 dní. Model integruje historické platební vzorce, sezónnost, otevřené pohledávky/závazky, plánované investice a makroekonomické faktory (kurzy, sazby).\n\nPredikce likvidity je nejcennější službou Virtual CFO — dává klientovi čas reagovat. Propad likvidity predikovaný 30 dní předem umožňuje kontokorent, factoring nebo akceleraci inkasa. Propad predikovaný 3 dny předem je krize.\n\nModel je trénovaný na historických cash flow datech a dosahuje MAE < 8 % na 30D horizontu.",
    methodology:
      "Cash flow prediction: 1) Feature engineering: historické CF (rolling 12M), sezónní profil, otevřené pohledávky (aging bucket), otevřené závazky (splatnost), smluvní platby (nájmy, leasingy, mzdy), FX exposure, 2) Model: XGBoost ensemble na denní granularitě, 3) Horizont: 7D (high confidence) / 30D (medium) / 90D (low, trend), 4) Alert thresholds: available_cash < 2× monthly_opex (warning), < 1× (critical), < 0 (emergency).",
    dataInputs: [
      "Bankovní výpisy — denní zůstatky a pohyby (FIO/KB/ČSOB API)",
      "Otevřené pohledávky — saldokonto z ERP (Money S3/Pohoda), aging buckets",
      "Otevřené závazky — splatné a budoucí (faktury, mzdy, nájmy, leasingy)",
      "Smluvní platby — pravidelné (mzdy 15., nájem 1., pojistné kvartálně)",
      "ČNB sazby a kurzovní lístek — dopad na úvěry a FX expozici",
    ],
    outputMetrics: [
      "Predicted cash position na 7D/30D/90D",
      "Confidence interval (95 %)",
      "Days to zero (pokud klesající trend)",
      "Hlavní rizikové faktory (which payables/receivables drive risk)",
      "Recommended actions (accelerate receivables / delay payables / credit line)",
    ],
    goodScenario: {
      title: "Likvidita OK 90+ dní",
      description:
        "Model predikuje dostatečnou likviditu na 90+ dní. Cash position: 2.8M Kč (6× monthly opex). Žádné rizikové faktory. Trend: stabilní s mírným růstem.",
      indicators: [
        "Cash position 7D: 2.8M Kč (CI: 2.6–3.0M)",
        "Cash position 30D: 2.5M Kč (CI: 2.1–2.9M)",
        "Cash position 90D: 2.3M Kč (CI: 1.7–2.9M)",
        "Days to zero: N/A (vždy pozitivní)",
      ],
      actions: [
        "Informovat klienta: finanční zdraví excelentní",
        "Diskutovat investiční příležitosti (přebytek likvidity)",
        "Zvážit termínovaný vklad na přebytek (optimalizace výnosu)",
      ],
    },
    badScenario: {
      title: "«Dojdou vám peníze za 3 týdny»",
      description:
        "Model predikuje negativní cash position za 21 dní. Příčina: velká splatná faktura (1.2M) + mzdy (800K) vs. nezaplacené pohledávky (2.1M po splatnosti). Days to zero: 21 (CI: 16–28 dní).",
      indicators: [
        "Days to zero: 21 dní (CI: 16–28)",
        "Kritická faktura: 1.2M splatná za 14D",
        "Mzdy: 800K splatné za 12D",
        "Pohledávky po splatnosti: 2.1M (nevymožené)",
      ],
      actions: [
        "Urgentní schůzka s jednatelem — prezentovat predikci",
        "Akce 1: aktivní inkaso pohledávek 2.1M (telefonát, urgence)",
        "Akce 2: vyjednat odložení faktury 1.2M (dodavatel kontakt)",
        "Akce 3: aktivovat kontokorentní úvěr (banka — předschválený?)",
      ],
    },
    frequency: "Denně (model prediction), real-time (bankovní data)",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["21-01", "21-03", "1-03", "1-04"],
    businessImpact: "Kritický — prevence platební neschopnosti",
    implementationStatus: "Produkce",
  },
  {
    id: "21-03",
    sectionId: 21,
    sectionTitle: "Virtuální CFO",
    name: "Automatická optimalizace",
    source: "proaktivní AI",
    good: "3 doporučení implementována — úspora 180K",
    bad: "Klient ignoruje doporučení — přichází o 420K ročně",
    description:
      "Proaktivní AI engine generující automatická doporučení pro finanční optimalizaci klienta. Systém analyzuje účetní data, benchmarky a best practices a generuje konkrétní, akcionovatelné návrhy s kvantifikovaným dopadem.\n\nTypy doporučení: daňová optimalizace (legální), cost reduction (identifikace plýtvání), revenue optimization (pricing, mix), working capital optimization (zkrácení DSO, prodloužení DPO), strukturální změny (právní forma, holdingová struktura).\n\nKaždé doporučení má: popis, kvantifikovaný benefit (Kč/rok), implementační effort, risk level a deadline.",
    methodology:
      "Rule-based + ML recommendation engine: 1) Rule-based layer: 50+ business rules (if DPPO sazba × obrat > threshold → zvážit s.r.o., if DSO > 45D → implementovat inkasní process...), 2) ML layer: anomaly detection na nákladech vs. peer benchmark (obor, velikost), 3) Prioritizace: benefit × feasibility × urgency, 4) Tracking implementace a actual vs. predicted benefit, 5) Feedback loop — úspěšná doporučení zvyšují váhu podobných.",
    dataInputs: [
      "Účetní data klienta (Money S3/Pohoda) — kompletní výsledovka a rozvaha",
      "Oborové benchmarky — ČSÚ NACE statistiky, Bisnode/Creditinfo databáze",
      "Daňové parametry — aktuální sazby, odpočty, slevy (MF ČR)",
      "Klientský profil — právní forma, obor, velikost, pendler status",
      "Historie doporučení — která byla implementována, jaký byl skutečný benefit",
    ],
    outputMetrics: [
      "Počet aktivních doporučení per klient",
      "Celkový potenciální benefit (Kč/rok)",
      "Implementation rate (% doporučení implementovaných)",
      "Actual vs. predicted benefit (validace modelu)",
      "Missed opportunity cost (ignorovaná doporučení × benefit)",
    ],
    goodScenario: {
      title: "3 doporučení implementována — úspora 180K",
      description:
        "Za posledních 12 měsíců klient implementoval 3 ze 5 doporučení: 1) Přechod na paušální výdaje (úspora 80K na dani), 2) Změna dodavatele energií (úspora 60K), 3) Optimalizace mzdových příplatků (úspora 40K). Celkem: 180K/rok.",
      indicators: [
        "Implementation rate: 60 % (3/5)",
        "Actual benefit: 180K/rok",
        "Predicted benefit: 195K/rok (accuracy 92 %)",
        "2 zbývající doporučení: zvažuje",
      ],
      actions: [
        "Prezentovat ROI — 'naše doporučení ušetřila 180K'",
        "Followup na 2 neimplementovaná doporučení",
        "Generovat nové doporučení na základě aktuálních dat",
        "Využít success story pro marketing",
      ],
    },
    badScenario: {
      title: "Klient ignoruje doporučení — přichází o 420K ročně",
      description:
        "5 doporučení za 12 měsíců — 0 implementováno. Klient reaguje: 'nemám čas', 'to je složité', 'příště'. Missed opportunity: 420K/rok. Klient si stěžuje na 'vysoké daně' — přitom odmítá legální optimalizaci.",
      indicators: [
        "Implementation rate: 0 % (0/5)",
        "Missed opportunity: 420K/rok",
        "3 odmítnutí, 2 bez odpovědi",
        "Klient stěžuje na daně 2×/rok",
      ],
      actions: [
        "Osobní schůzka — prezentovat celkový missed benefit",
        "Zjednodušit doporučení — připravit implementaci za klienta",
        "Nabídnout implementation-as-a-service (my to zařídíme)",
        "Dokumentovat odmítnutí — ochrana kanceláře",
      ],
    },
    frequency: "Měsíčně (nová doporučení), kvartálně (review implementace)",
    automationLevel: "80 % automatizováno",
    relatedAnalyses: ["21-01", "21-02", "21-04", "2-01"],
    businessImpact: "Vysoký — přímý finanční dopad pro klienty",
    implementationStatus: "Produkce",
  },
  {
    id: "21-04",
    sectionId: 21,
    sectionTitle: "Virtuální CFO",
    name: "Srovnání s oborem",
    source: "benchmark",
    good: "Top 20% v sektoru",
    bad: "Spodních 10% — nutná restrukturalizace",
    description:
      "Benchmarkové srovnání finančních ukazatelů klienta s oborem (dle NACE kódu) a velikostní kategorií. Systém porovnává klíčové ratia: rentabilita, likvidita, zadluženost, aktivita (obrat aktiv, DSO, DPO) a produktivita (revenue per FTE).\n\nData pro benchmark pocházejí z Bisnode/Creditinfo databáze (agregované finanční výkazy CZ firem) a ČSÚ oborových statistik. Klient vidí svou pozici v percentilu — top 10 %, průměr, nebo spodních 10 %.\n\nSrovnání motivuje klienty ke zlepšení — 'jste pod průměrem oboru v likviditě' je silnější argument než 'vaše likvidita je nízká'.",
    methodology:
      "Peer benchmark analysis: 1) Definice peer group: NACE L2 kód + velikostní kategorie (mikro/malá/střední dle EU definice), 2) Sběr benchmark dat: Bisnode/Creditinfo API — percentilové distribuce per KPI per peer group, 3) Výpočet klientských KPIs z účetních dat, 4) Positioning: percentil per KPI, 5) Gap analysis: kde je klient pod mediánem a kolik to 'stojí', 6) Radar chart vizualizace.",
    dataInputs: [
      "Účetní data klienta — výsledovka, rozvaha, CF výkaz",
      "Bisnode/Creditinfo API — oborové benchmarky (percentilové distribuce per NACE L2)",
      "ČSÚ — oborové statistiky (průměrné mzdy, produktivita per NACE)",
      "NACE kód klienta z ARES API",
      "EU velikostní kategorizace (mikro < 10 zaměstnanců, malá < 50, střední < 250)",
    ],
    outputMetrics: [
      "Percentilová pozice per KPI (rentabilita, likvidita, zadluženost, aktivita, produktivita)",
      "Celkový benchmark score (vážený průměr percentilů, 0–100)",
      "Top 3 silné stránky (kde je klient nad mediánem)",
      "Top 3 slabé stránky (kde je pod mediánem)",
      "Gap cost: kolik Kč by klient získal při dosažení mediánu",
    ],
    goodScenario: {
      title: "Top 20 % v sektoru",
      description:
        "Klient je v top 20 % svého oboru (NACE 25 — výroba kovových konstrukcí). Silné stránky: produktivita (P85) a rentabilita (P82). Likvidita a zadluženost: nad mediánem. Celkový benchmark score: 79/100.",
      indicators: [
        "Benchmark score: 79/100 (top 20 %)",
        "Produktivita: P85 (revenue 3.2M/FTE vs. medián 2.1M)",
        "Rentabilita: P82 (ROE 18 % vs. medián 11 %)",
        "Likvidita: P65 (current ratio 1.8 vs. medián 1.4)",
      ],
      actions: [
        "Prezentovat výsledky jednateli — motivace + validace",
        "Identifikovat zbývající prostor pro zlepšení (likvidita: z P65 na P80)",
        "Využít benchmark pro strategické plánování",
        "Nabídnout benchmark jako pravidelnou službu (kvartálně)",
      ],
    },
    badScenario: {
      title: "Spodních 10 % — nutná restrukturalizace",
      description:
        "Klient je ve spodních 10 % oboru. Rentabilita: P8 (ROE 2 %, medián 11 %). Zadluženost: P92 risk (debt/equity 4.5, medián 1.2). Produktivita: P12. Celkový score: 15/100. Bez restrukturalizace: predikce insolvence 24M.",
      indicators: [
        "Benchmark score: 15/100 (spodních 10 %)",
        "ROE: 2 % (P8, medián 11 %)",
        "Debt/equity: 4.5 (P92 risk, medián 1.2)",
        "Revenue/FTE: 1.1M (P12, medián 2.1M)",
      ],
      actions: [
        "Urgentní schůzka s jednatelem — prezentovat benchmark data",
        "Navrhnout restrukturalizační plán (cost cutting, debt restructuring)",
        "Priorita: snížení zadluženosti (refinancing, prodej nepotřebných aktiv)",
        "Monitorovat měsíčně — zlepšuje se pozice?",
      ],
    },
    frequency: "Kvartálně (benchmark update)",
    automationLevel: "75 % automatizováno",
    relatedAnalyses: ["21-01", "21-02", "21-03", "2-01"],
    businessImpact: "Vysoký — strategické řízení klienta",
    implementationStatus: "Produkce",
  },
];
