import type { AnalysisDetail } from "./types";

export const section23Analyses: AnalysisDetail[] = [
  {
    id: "23-01",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Čas přijetí->zaúčtování",
    source: "DocuWare timestamps",
    good: "Průměr 4h — efektivní",
    bad: "Průměr 96h u klienta X — odkládání",
    description:
      "Měření doby od přijetí dokladu v DocuWare po jeho zaúčtování v ERP. Tento zdánlivě jednoduchý ukazatel odhaluje skryté vzorce — které klienty účetní odkládají, kde jsou procesní bottlenecky a kdo má problémy se zaúčtováním.\n\nData ukazují, že doba zpracování silně koreluje s kvalitou podkladů od klienta, složitostí jeho účetnictví a vztahem účetní–klient. Neobvykle dlouhá doba zpracování u konkrétního klienta signalizuje problém.\n\nSystematické vyhodnocení tohoto ukazatele per účetní per klient odhaluje preference, předsudky i kompetence.",
    methodology:
      "Process mining: 1) Extrakce timestamps z DocuWare (přijetí) a ERP (zaúčtování), 2) Výpočet delta per doklad, 3) Agregace per klient × účetní, 4) Statistická analýza distribuce, 5) Outlier detection, 6) Korelace s kvalitou podkladů a složitostí.",
    dataInputs: [
      "DocuWare timestamps (přijetí, skenování)",
      "ERP timestamps (zaúčtování, schválení)",
      "Přiřazení účetní–klient",
      "Klasifikace typu dokladu",
      "Metadata dokladu (kvalita, jazyk, formát)",
    ],
    outputMetrics: [
      "Průměrná doba zpracování (celková, per klient, per účetní)",
      "Distribuce (median, P90, P99)",
      "Outliers per klient × účetní",
      "Trend v čase",
      "Korelace s kvalitou podkladů",
    ],
    goodScenario: {
      title: "Efektivní zpracování",
      description:
        "Průměrná doba zpracování je 4 hodiny. Distribuce je rovnoměrná bez extrémních outlierů. Všichni účetní zpracovávají všechny klienty s podobnou rychlostí.",
      indicators: [
        "Průměr 4h, median 3.5h",
        "P90 < 8h",
        "Žádný outlier > 24h",
        "Rovnoměrné rozložení per účetní",
      ],
      actions: [
        "Monitorovat a udržovat",
        "Použít jako benchmark pro nové účetní",
      ],
    },
    badScenario: {
      title: "Systematické odkládání",
      description:
        "Klient X má průměrnou dobu zpracování 96h — 24× celkový průměr. Účetní A jeho doklady systematicky odkládá na konec fronty. Příčina: složité účetnictví + špatná komunikace.",
      indicators: [
        "96h průměr u klienta X (norm: 4h)",
        "Účetní A zpracovává X vždy poslední",
        "Korelace s nízkou kvalitou podkladů",
        "Klient si stěžuje na rychlost",
      ],
      actions: [
        "Proškolit účetní A na specifika klienta X",
        "Zvážit přeřazení klienta na zkušenějšího",
        "Komunikovat s klientem o kvalitě podkladů",
        "Implementovat SLA s automatickou eskalací",
      ],
    },
    frequency: "Denně",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["23-02", "23-05", "11-09", "11-07"],
    businessImpact: "Střední — procesní efektivita a spokojenost klienta",
    implementationStatus: "Produkce",
  },
  {
    id: "23-02",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Kolikrát faktura otevřena",
    source: "DocuWare open log",
    good: "1-2× — jasný doklad",
    bad: "12× otevřena — účetní neví jak zaúčtovat",
    description:
      "Sledování počtu otevření každého dokumentu v DocuWare REST API. Neobvykle vysoký počet otevření konkrétní faktury signalizuje, že účetní má problém s jejím zaúčtováním — nejasný předmět plnění, chybějící údaje, neobvyklá struktura. Naopak doklady otevřené 0× po přijetí indikují, že je někdo systematicky přehlíží.\n\nData z DocuWare document view/open logů jsou agregovány per doklad per uživatel. Systém detekuje outliers (> 2σ od průměrného počtu otevření pro daný typ dokladu) a koreluje je s dobou zpracování a error rate.\n\nTato metrika je silným leading indikátorem problémů s kvalitou podkladů od klienta — pokud účetní opakovaně otevírá faktury jednoho klienta, pravděpodobně potřebuje lepší instrukce.",
    methodology:
      "DocuWare REST API — GET /Documents/{id}/History filtrovaný na event_type='View'. Agregace: count(views) per document_id per user_id. Statistická analýza: z-score per document_type. Outlier threshold: z > 2.0. Korelace s processing_time (Pearson r). Trend per client over 6M window.",
    dataInputs: [
      "DocuWare REST API — /Documents/{id}/History (view events)",
      "DocuWare document metadata (document_type, client_id, received_date)",
      "ERP processing timestamps (zaúčtování)",
      "User assignment table (účetní → klient)",
    ],
    outputMetrics: [
      "Průměrný počet otevření per doklad per klient",
      "Outlier doklady (> 2σ) — list s document_id a count",
      "Korelace otevření × processing_time (Pearson r)",
      "Trend per klient (zlepšuje/zhoršuje se kvalita podkladů)",
      "Top 5 klientů s nejvyšším avg view count",
    ],
    goodScenario: {
      title: "Jasné doklady, 1-2 otevření",
      description:
        "Průměrný počet otevření je 1.3× per doklad. Žádné outliers. Účetní zpracovávají doklady efektivně bez opakovaného vracení se k nim.",
      indicators: [
        "Avg views per document: 1.3",
        "0 outlier dokladů za měsíc",
        "Pearson r (views × time) < 0.2",
        "Trend stabilní",
      ],
      actions: [
        "Monitorovat a udržovat",
        "Použít klienta jako benchmark pro kvalitu podkladů",
      ],
    },
    badScenario: {
      title: "Účetní neví jak zaúčtovat — 12× otevřeno",
      description:
        "Faktura FV-2026-0847 od klienta X byla otevřena 12×. Účetní se k ní vracela 4 dny. Příčina: nejasný předmět plnění (generický popis 'služby'), chybí rozpad na položky.",
      indicators: [
        "12 otevření jednoho dokladu (norm: 1.3)",
        "Processing time: 96h (norm: 4h)",
        "Klient X má avg 4.7 views/doc (portfolio avg: 1.3)",
        "3 další faktury stejného klienta v outlier zóně",
      ],
      actions: [
        "Kontaktovat klienta — požádat o detailnější popis plnění",
        "Vytvořit šablonu pro zaúčtování typických dokladů klienta",
        "Zvážit školení účetní na specifika daného oboru",
        "Navrhnout klientovi standardizovaný formát faktur",
      ],
    },
    frequency: "Denně",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["23-01", "23-05", "11-09"],
    businessImpact: "Střední — efektivita zpracování a kvalita podkladů",
    implementationStatus: "Produkce",
  },
  {
    id: "23-03",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Přepínání oken",
    source: "OS telemetrie",
    good: "Průměr 3 přepnutí",
    bad: "45 přepnutí — kognitivní přetížení",
    description:
      "Volitelná analýza kontextového přepínání (window switching) na pracovní stanici účetní při zpracování konkrétního klienta. Vysoký počet přepnutí mezi aplikacemi (ERP, DocuWare, email, kalkulačka, legislativní portál) signalizuje kognitivní přetížení a složitost klienta.\n\nData jsou sbírána opt-in z OS telemetrie (focus change events) a korelována s aktuálně zpracovávaným klientem. Systém měří window switches per task session a porovnává s průměrem.\n\nMetrika je silným indikátorem potřeby automatizace nebo zjednodušení procesu pro daného klienta.",
    methodology:
      "OS-level focus change event logging (opt-in). Mapování: session_id → client_id (z aktivního ERP kontextu). Metrika: window_switches_per_session. Statistika: distribuce per klient, z-score per session. Korelace s error_rate a processing_time.",
    dataInputs: [
      "OS telemetrie — focus change events (timestamp, window_title, app_name)",
      "ERP session context (active client_id)",
      "Processing task boundaries (session start/end)",
      "Error log (chyby při zpracování per session)",
    ],
    outputMetrics: [
      "Window switches per session per klient",
      "Distribuce per klient (mean, median, P90)",
      "Korelace switches × error_rate (Pearson r)",
      "Top 5 nejsložitějších klientů (by switches)",
      "Trend v čase (klesá s rostoucí zkušeností?)",
    ],
    goodScenario: {
      title: "Nízká kognitivní zátěž — 3 přepnutí",
      description:
        "Účetní zpracovává klienta plynule — průměrně 3 přepnutí oken per session. Práce je rutinní, procesy zautomatizované.",
      indicators: [
        "Avg switches: 3 per session",
        "Error rate: 0.1 %",
        "Processing time v normě",
        "Žádné outlier sessions",
      ],
      actions: [
        "Monitorovat jako benchmark",
        "Dokumentovat workflow pro knowledge transfer",
      ],
    },
    badScenario: {
      title: "Kognitivní přetížení — 45 přepnutí",
      description:
        "Účetní při zpracování klienta Z přepíná 45× mezi okny. Koreluje s 3× vyšší chybovostí a 5× delší dobou zpracování. Indikátor potřeby zjednodušení procesu nebo automatizace.",
      indicators: [
        "45 window switches per session (norm: 3)",
        "Error rate: 2.8 % (norm: 0.1 %)",
        "Processing time: 5× průměr",
        "Konzistentně vysoké přes 6 měsíců",
      ],
      actions: [
        "Analyzovat workflow — kde jsou největší bottlenecky",
        "Vytvořit integrated view (single pane of glass) pro klienta",
        "Automatizovat opakující se kroky (RPA)",
        "Zvážit přeřazení na zkušenějšího účetního",
      ],
    },
    frequency: "Denně (opt-in)",
    automationLevel: "70 % automatizováno",
    relatedAnalyses: ["23-01", "23-05", "11-07"],
    businessImpact: "Nízký — volitelná optimalizace procesů",
    implementationStatus: "Pilot",
  },
  {
    id: "23-04",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Pořadí zpracování",
    source: "queue log",
    good: "FIFO — spravedlivé",
    bad: "Klient Y vždy poslední — neoblíbený",
    description:
      "Analýza pořadí, v jakém účetní zpracovává klienty. Systém sleduje processing queue logs a detekuje systematické odchylky od FIFO principu. Pokud je klient konzistentně zpracováván jako poslední, signalizuje to negativní vztah účetní ke klientovi nebo složitost jeho agendy.\n\nData z DocuWare queue + ERP task logů jsou transformována na rank per den per účetní. Statistický test (Friedman) ověřuje, zda je pozice klienta v pořadí náhodná, nebo systematicky nízká/vysoká.\n\nOdhalení systematického odkládání umožňuje intervenci — buď přeřazení, nebo dialog o příčinách.",
    methodology:
      "Queue mining: 1) Extrakce task_start timestamps per účetní per klient per den, 2) Výpočet rank (pořadí) per den, 3) Friedman test na signifikanci pozice, 4) Korelace rank × processing_quality, 5) Vizualizace heatmap (účetní × klient × avg rank).",
    dataInputs: [
      "DocuWare processing queue logs (task_id, user_id, client_id, start_time)",
      "ERP task completion logs",
      "Přiřazení účetní ↔ klient (assignment table)",
      "Processing quality metrics (error_rate per task)",
    ],
    outputMetrics: [
      "Průměrná pozice klienta v daily queue per účetní",
      "Friedman test p-value (je pozice systematická?)",
      "Korelace rank × error_rate",
      "Heatmap: účetní × klient × avg rank",
      "Klienti s konzistentně poslední pozicí",
    ],
    goodScenario: {
      title: "FIFO zpracování — spravedlivé",
      description:
        "Pořadí zpracování odpovídá FIFO principu. Friedman test nevykazuje signifikantní odchylky. Všichni klienti mají rovnoměrnou pozici v queue.",
      indicators: [
        "Friedman p > 0.05 — bez systematické odchylky",
        "Avg rank variance per klient: nízká",
        "Žádný klient konzistentně poslední",
        "Error rate nezávisí na pozici",
      ],
      actions: ["Pokračovat v monitoringu", "Pochválit rovnoměrný přístup"],
    },
    badScenario: {
      title: "Klient Y vždy poslední",
      description:
        "Klient Y je u účetní A konzistentně na poslední pozici v queue (avg rank 8.7 z 9 klientů) po dobu 4 měsíců. Friedman test p < 0.001. Processing quality u tohoto klienta je o 40 % horší (více chyb).",
      indicators: [
        "Avg rank 8.7/9 po 4 měsíce",
        "Friedman p < 0.001 — signifikantní bias",
        "Error rate u klienta Y: 3.2 % (avg 1.1 %)",
        "Processing time: 2.3× průměr",
      ],
      actions: [
        "Dialog s účetní A — proč odkládá klienta Y?",
        "Zvážit přeřazení klienta Y na jiného účetního",
        "Implementovat automatickou rotaci pořadí",
        "Nastavit SLA alert pokud rank > threshold po N dní",
      ],
    },
    frequency: "Denně",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["23-01", "23-05", "23-29"],
    businessImpact: "Střední — kvalita služby a interní férovost",
    implementationStatus: "Produkce",
  },
  {
    id: "23-05",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Kdo první ráno",
    source: "login × klient",
    good: "Rovnoměrné",
    bad: "Účetní A vždy odkládá klienta B",
    description:
      "Analýza korelace mezi ranním login patternem účetních a volbou prvního zpracovávaného klienta. Systém sleduje VPN/SSO login timestamps a první task_start per den. Účetní přirozeně začínají s 'příjemnými' klienty — systematické vyhýbání se konkrétnímu klientovi na začátku dne je silný signál problematického vztahu.\n\nData z VPN/login logů (timestamp prvního přihlášení) a ERP task logů (první klient dne) jsou korelovány. Systém buduje first-client frequency matrix a detekuje anomálie.\n\nOdhalení vzorců pomáhá managementu identifikovat skryté problémy v alokaci klientů.",
    methodology:
      "Login analysis: 1) VPN/SSO login event → first_login_time per user per day, 2) ERP task log → first_client_id per user per day, 3) Frequency matrix: user × client → count(first_client), 4) Chi-squared test na rovnoměrnost distribuce, 5) Correlation login_time × first_client choice.",
    dataInputs: [
      "VPN/SSO login logs (user_id, login_timestamp, IP)",
      "ERP task start logs (user_id, client_id, task_start_time)",
      "Přiřazení účetní ↔ klient (assignment table)",
      "Absence calendar (dovolená, nemoc)",
    ],
    outputMetrics: [
      "First-client frequency matrix (kdo koho zpracovává první)",
      "Chi-squared p-value per účetní (rovnoměrnost?)",
      "Klienti nikdy/zřídka zpracovaní jako první",
      "Korelace login_time × client_choice",
      "Trend v čase (mění se preference?)",
    ],
    goodScenario: {
      title: "Rovnoměrné přidělení",
      description:
        "Účetní střídají klienty rovnoměrně jako první ranní úkol. Chi-squared test nevykazuje signifikantní odchylku. Žádný klient není systematicky vynecháván.",
      indicators: [
        "Chi-squared p > 0.05 per účetní",
        "Všichni klienti alespoň 1× first v posledním měsíci",
        "Žádný klient < 5 % first-frequency (při rovnoměrném rozložení)",
        "Stabilní vzorec v čase",
      ],
      actions: [
        "Pokračovat v monitoringu",
        "Vyhodnotit pozitivní vliv na kvalitu služby",
      ],
    },
    badScenario: {
      title: "Účetní A vždy odkládá klienta B",
      description:
        "Klient B nebyl za 3 měsíce ani jednou zpracován jako první (0/65 dní). Chi-squared p < 0.001. Ostatní klienti rovnoměrně. Koreluje s nižší kvalitou zpracování klienta B.",
      indicators: [
        "Klient B: 0× first za 3 měsíce",
        "Chi-squared p < 0.001",
        "Processing quality klienta B: −25 % vs. průměr",
        "Účetní A begins with client C 62 % of days",
      ],
      actions: [
        "Dialog s účetní A — identifikovat příčinu",
        "Zvážit redistribuci klientů",
        "Implementovat random rotation systém",
        "Sledovat dopad na kvalitu po intervenci",
      ],
    },
    frequency: "Denně",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["23-04", "23-29", "23-32"],
    businessImpact: "Střední — interní efektivita a férovost",
    implementationStatus: "Produkce",
  },
  {
    id: "23-06",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Kdy vytištěn doklad",
    source: "printer log",
    good: "0 tisků — plně digitální",
    bad: "340 tisků/měsíc — papírový středověk",
    description:
      "Monitoring tiskových úloh z SNMP logů síťových tiskáren korelovaných s klientským kontextem. Vysoký počet tisků signalizuje, že klient nebo účetní stále pracuje papírově — příležitost pro digitalizaci a upsell.\n\nSystém parsuje SNMP print job logs (tiskárna, uživatel, timestamp, počet stran) a koreluje s aktivním klientem v ERP. Agregace per klient per měsíc odhaluje digitalizační potenciál.\n\nTato metrika je cenná pro commercial team — klienti s vysokým tiskem jsou ideální kandidáti na digitalizační služby.",
    methodology:
      "SNMP polling tiskáren (OID: hrPrinterStatus, prtJobCount). Job log: user, timestamp, pages. Mapování na aktivního klienta z ERP session context. Agregace: total_pages per client per month. Trend analysis: linear regression. Benchmark: portfolio median.",
    dataInputs: [
      "Síťové tiskárny — SNMP job logs (user, timestamp, pages, printer_id)",
      "ERP session context (active client_id per user per timestamp)",
      "Digitalizační status klienta (paper/mixed/digital)",
      "DocuWare scan vs. print ratio",
    ],
    outputMetrics: [
      "Total pages printed per client per month",
      "Print trend (rostoucí/klesající/stabilní)",
      "Scan-to-print ratio per client",
      "Portfolio percentile (kolik % klientů tiskne méně)",
      "Estimated paper cost per client (CZK/month)",
    ],
    goodScenario: {
      title: "Plně digitální — 0 tisků",
      description:
        "Za klienta nebylo za poslední 3 měsíce vytištěno nic. Veškerá komunikace a dokumentace je digitální. Klient je v top 10 % portfolia.",
      indicators: [
        "0 stran za 3 měsíce",
        "Scan-to-print ratio: ∞ (only scans)",
        "Top 10 % digitalizace v portfoliu",
        "DocuWare adoption: 100 %",
      ],
      actions: [
        "Použít jako případovou studii pro ostatní klienty",
        "Monitorovat — udržet standard",
      ],
    },
    badScenario: {
      title: "Papírový středověk — 340 tisků/měsíc",
      description:
        "340 stran za měsíc. Účetní tiskne faktury, sestavy, výpisy. Klient vyžaduje papírové kopie. Estimated paper cost: 680 Kč/měsíc + čas účetní.",
      indicators: [
        "340 stran/měsíc (portfolio median: 12)",
        "Trend: stabilní (bez zlepšení)",
        "Scan-to-print ratio: 0.2 (5× více tisků než skenů)",
        "Estimated cost: 680 Kč/měsíc + 4h čas účetní",
      ],
      actions: [
        "Nabídnout digitalizační balíček (upsell příležitost)",
        "Edukovat klienta o výhodách paperless",
        "Navrhnout postupný přechod (hybrid → digital)",
        "Kalkulovat ROI digitalizace pro klienta",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "80 % automatizováno",
    relatedAnalyses: ["23-52", "16-01", "16-02"],
    businessImpact: "Střední — upsell příležitost + efektivita",
    implementationStatus: "Produkce",
  },
  {
    id: "23-07",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Tón pondělí vs. pátek",
    source: "sentiment × čas",
    good: "Konzistentní",
    bad: "Pondělí negativní, pátek pozitivní — stres z práce",
    description:
      "NLP sentiment analýza emailové komunikace bucketed per den v týdnu. Systém detekuje systematické rozdíly v emočním tónu zpráv v závislosti na dni — pondělní zprávy bývají stručnější a negativnější, páteční vstřícnější. Signifikantní rozdíl indikuje pracovní stres klienta.\n\nSentiment je měřen per zpráva (compound score −1 až +1) pomocí Czech NLP pipeline. Výsledky jsou agregovány per day_of_week per client a testovány Kruskal-Wallis testem na signifikanci rozdílu.\n\nPraktické využití: timing komunikace. Důležité zprávy posílat v dny s pozitivním sentimentem klienta.",
    methodology:
      "NLP pipeline: 1) Email parsing (From, Date, Body), 2) Czech sentiment analysis (BERT-based classifier, compound score), 3) Bucketing per day_of_week, 4) Kruskal-Wallis test na rozdíl sentimentu mezi dny, 5) Post-hoc Dunn test pro pairwise comparison, 6) Effect size (eta²).",
    dataInputs: [
      "Email corpus per klient (From, Date header, Body text)",
      "Czech NLP sentiment model (fine-tuned BERT)",
      "Calendar context (svátky, dovolené — pro filtraci)",
      "Daktela call transcripts (optional — doplňkový sentiment)",
    ],
    outputMetrics: [
      "Sentiment per day_of_week per client (mean, CI)",
      "Kruskal-Wallis H-statistic a p-value",
      "Best day / worst day per client",
      "Effect size (eta²) — jak silný je rozdíl",
      "Doporučený den pro důležitou komunikaci",
    ],
    goodScenario: {
      title: "Konzistentní tón celý týden",
      description:
        "Kruskal-Wallis p > 0.3 — sentiment klienta je konzistentní bez ohledu na den. Žádný systematický vzorec stresu. Komunikace je kdykoli vhodná.",
      indicators: [
        "Kruskal-Wallis p > 0.3",
        "Eta² < 0.01 — zanedbatelný efekt",
        "Mean sentiment: 0.45 ± 0.12 (pozitivní)",
        "Variabilita per day < 10 %",
      ],
      actions: [
        "Komunikovat v jakýkoli den",
        "Monitorovat kvartálně pro změny",
      ],
    },
    badScenario: {
      title: "Pondělní negativita",
      description:
        "Signifikantní rozdíl: pondělní sentiment 0.12, páteční 0.58 (p < 0.01). Klient je v pondělí stručný, negativní, pomalý v odpovědích. Pátek je jeho nejlepší den.",
      indicators: [
        "Kruskal-Wallis p < 0.01",
        "Eta² = 0.15 — střední efekt",
        "Monday sentiment: 0.12 vs. Friday: 0.58",
        "Monday response time: 48h vs. Friday: 4h",
      ],
      actions: [
        "Důležitou komunikaci plánovat na čtvrtek/pátek",
        "V pondělí posílat pouze rutinní záležitosti",
        "Nabídky a ceníky posílat v pozitivní dny",
        "Informovat account managera o optimálním timingu",
      ],
    },
    frequency: "Měsíčně (recalibrace)",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["15-01", "17-01", "22-03"],
    businessImpact: "Střední — optimalizace komunikačního timingu",
    implementationStatus: "Produkce",
  },
  {
    id: "23-08",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Délka pozdravů",
    source: "textová analýza",
    good: "Stabilní formální",
    bad: "Z «Vážený pane» na «Dobrý den» na «Ahoj» — blízkost nebo nerespekt?",
    description:
      "Tracking evoluce úvodních a závěrečných formulí v emailech klienta. Systém parsuje greeting/salutation z emailového body a klasifikuje formálnost na škále 1-5 (1 = neformální 'Ahoj', 5 = 'Vážený pane inženýre'). Změna formálnosti v čase signalizuje posun ve vztahu.\n\nNáhlý pokles formálnosti (z 'Vážený' na 'Ahoj' za 2 týdny) může znamenat buď budování důvěry, nebo ztrátu respektu. Kontext rozhoduje — systém koreluje s dalšími signály (sentiment, payment behavior).\n\nGraduální pokles formálnosti přes měsíce je normální a pozitivní. Skokový pokles je red flag.",
    methodology:
      "Regex extraction: greeting patterns (Vážený|Dobrý den|Ahoj|Hi|Dear...). Formality score: rule-based classifier (5-point scale). Time series: formality_score per email per client. Change detection: CUSUM algorithm for shift detection. Context enrichment: korelace s sentiment a payment data.",
    dataInputs: [
      "Email corpus — first 5 lines (greeting extraction)",
      "Email corpus — last 5 lines (salutation extraction)",
      "Client relationship metadata (tenure, contract type)",
      "Sentiment scores (for context correlation)",
    ],
    outputMetrics: [
      "Current formality score per client (1-5 scale)",
      "Formality trend (slope per month)",
      "Change points detected (CUSUM)",
      "Korelace formality × sentiment × payment",
      "Anomálie (sudden drop > 2 points)",
    ],
    goodScenario: {
      title: "Stabilní formální komunikace",
      description:
        "Formality score je stabilní na úrovni 4.0 (Dobrý den pane/paní) po celou dobu spolupráce. Konzistentní a profesionální komunikace.",
      indicators: [
        "Formality score: 4.0 ± 0.3 (stabilní)",
        "Trend: 0 (flat)",
        "0 change points za 12M",
        "Consistent across all contacts",
      ],
      actions: ["Udržovat formální tón z naší strany", "Monitorovat kvartálně"],
    },
    badScenario: {
      title: "Prudký pokles formálnosti",
      description:
        "Formality score spadl z 4.5 na 1.5 za 3 týdny. CUSUM detekoval change point 15.3.2026. Koreluje s pozdní platbou naší faktury (−14 dní) a negativním sentimentem. Interpretace: ztráta respektu, ne budování důvěry.",
      indicators: [
        "Score drop: 4.5 → 1.5 za 3 týdny",
        "CUSUM change point: 15.3.2026",
        "Korelace s payment delay (r = −0.72)",
        "Sentiment současně klesá",
      ],
      actions: [
        "Upozornit account managera na shift v komunikaci",
        "Proaktivní osobní kontakt — zjistit co se stalo",
        "Zkontrolovat kvalitu naší služby za poslední měsíc",
        "Aktivovat retention protokol pokud koreluje s dalšími signály",
      ],
    },
    frequency: "Týdně",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["23-10", "23-07", "15-01"],
    businessImpact: "Nízký — early warning indikátor",
    implementationStatus: "Produkce",
  },
  {
    id: "23-09",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Smajlíky",
    source: "emotikon tracking",
    good: "Konzistentní",
    bad: "Přestal 15.2. — přesný bod ochlazení",
    description:
      "Regex-based detekce emotikon a emoji v emailové komunikaci klienta. Sledování frekvence a typů emotikonů v čase jako proxy indikátor emocionálního angažmá. Náhlé vymizení emotikonů (dříve používal, teď ne) je přesný marker změny postoje.\n\nSystém detekuje Unicode emoji (\\p{Emoji}) i text-based emoticons (:-), :), ;-) etc.) per email per klient. Frekvence je normalizována na emoji per 100 words. Change point detection identifikuje přesné datum změny.\n\nToto je jeden z nejpřesnějších behavioral markers — lidé přestanou používat emoji ve chvíli, kdy se vztah ochladí, často dny před jakýmkoli explicitním signálem.",
    methodology:
      "Regex detection: 1) Unicode emoji range (\\p{Emoji_Presentation}), 2) Text emoticons pattern (:-?[)(/|DS>]|[;8B][-]?[)(/|DS>]|<3|xD), 3) Normalization: count per 100 words, 4) Time series per client, 5) PELT change point detection, 6) Korelace s sentiment a formality scores.",
    dataInputs: [
      "Email body text per klient (full corpus)",
      "Timestamp per email",
      "Word count per email (for normalization)",
      "Sentiment score per email (for correlation)",
    ],
    outputMetrics: [
      "Emoji frequency per 100 words per client",
      "Emoji type distribution (positive, negative, neutral)",
      "Change points detected (PELT algorithm)",
      "Date of last emoji used per client",
      "Correlation emoji_freq × sentiment (Spearman ρ)",
    ],
    goodScenario: {
      title: "Konzistentní použití emotikonů",
      description:
        "Klient konzistentně používá 2-3 emoji per email (mostly 🙂 a 👍). Stabilní vzorec po 18 měsíců. Pozitivní vztah indikátor.",
      indicators: [
        "Avg 2.5 emoji per email (stable)",
        "0 change points za 18M",
        "Predominantly positive emoji (87 %)",
        "Korelace se sentimentem: ρ = 0.65",
      ],
      actions: [
        "Reciprokovat — používat emoji v odpovědích",
        "Monitorovat pro případnou změnu",
      ],
    },
    badScenario: {
      title: "Přestal používat emoji 15.2.",
      description:
        "PELT detekoval change point 15.2.2026. Klient, který 14 měsíců konzistentně používal emoji (avg 3.1/email), náhle přestal (0/email od 15.2.). Koreluje s eskalací ohledně chybné daňové kalkulace 14.2.",
      indicators: [
        "PELT change point: 15.2.2026 (confidence > 0.99)",
        "Before: 3.1 emoji/email, After: 0.0 emoji/email",
        "Korelace s incidentem: chybná kalkulace 14.2.",
        "Sentiment simultánně poklesl o 0.4 bodu",
      ],
      actions: [
        "Identifikovat příčinu — incident z 14.2.",
        "Proaktivně adresovat problém (omluvit se, napravit)",
        "Sledovat návrat emoji jako indikátor usmíření",
        "Zapsat do CRM jako relationship warning",
      ],
    },
    frequency: "Týdně",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["23-08", "23-10", "23-07", "15-01"],
    businessImpact: "Nízký — early warning indikátor vztahu",
    implementationStatus: "Produkce",
  },
  {
    id: "23-10",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Vykání/tykání",
    source: "analýza",
    good: "Konzistentní vykání",
    bad: "Přešel na tykání — buď důvěra nebo nerespekt",
    description:
      "Formality classifier rozlišující Vy/ty formy v české emailové komunikaci. V českém kontextu je přechod z vykání na tykání signifikantní sociální marker — může signalizovat budování důvěry (pozitivní) nebo ztrátu respektu (negativní). Kontext rozhoduje.\n\nSystém parsuje morfologické tvary (Vy/Vám/Vás vs. ty/tobě/tebe + slovesné koncovky) a klasifikuje každý email. Změna je korelována s dalšími signály pro interpretaci.\n\nV kombinaci s formality score a sentimentem vytváří kompletní obraz komunikačního vztahu.",
    methodology:
      "Czech morphological analysis: 1) Tokenization, 2) POS tagging, 3) Vy-form detection (Vy, Vám, Vás, Váš, Vaše + verb 2nd person plural), 4) Ty-form detection (ty, tobě, tebe, tvůj, tvá + verb 2nd person singular), 5) Classification: formal/informal/mixed, 6) Time series tracking, 7) Context enrichment from sentiment + formality.",
    dataInputs: [
      "Email body text per klient",
      "Czech morphological analyzer (MorphoDiTa/UDPipe)",
      "Sentiment score per email",
      "Formality score per email (23-08)",
      "Client relationship tenure",
    ],
    outputMetrics: [
      "Vy/ty classification per email",
      "Transition date (pokud nastala změna)",
      "Direction: formalizace / informalizace",
      "Context score: positive transition / negative transition",
      "Historical pattern per client",
    ],
    goodScenario: {
      title: "Konzistentní vykání",
      description:
        "Klient konzistentně vyká po celou dobu spolupráce (3+ roky). Profesionální, respektful komunikace bez změn.",
      indicators: [
        "100 % Vy-form za celé období",
        "Formality score: stable 4+",
        "Sentiment: pozitivní a stabilní",
        "Konzistentní across all kontaktní osoby",
      ],
      actions: [
        "Udržovat vykání recipročně",
        "Monitorovat pro případnou změnu",
      ],
    },
    badScenario: {
      title: "Přechod na tykání — ambivalentní signál",
      description:
        "Klient přešel z vykání na tykání 20.3.2026. Sentiment klesá (−0.3), formality score klesá (4→2). Interpretace: negativní posun — spíše ztráta respektu než budování důvěry.",
      indicators: [
        "Transition: Vy → ty od 20.3.2026",
        "Concurrent sentiment drop: −0.3",
        "Concurrent formality drop: 4 → 2",
        "Context: po nedodržení termínu z naší strany",
      ],
      actions: [
        "Vyhodnotit kontext — co předcházelo",
        "Pokud negativní: proaktivně adresovat problém",
        "Pokud pozitivní: reciprokovat (nabídnout tykání)",
        "Sledovat další vývoj komunikace",
      ],
    },
    frequency: "Týdně",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["23-08", "23-09", "15-01"],
    businessImpact: "Nízký — relationship quality indikátor",
    implementationStatus: "Produkce",
  },
  {
    id: "23-11",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Křestní jméno v předmětu",
    source: "email metadata",
    good: "Ano — osobní vztah",
    bad: "Ne — formální distance",
    description:
      "Detekce přítomnosti křestního jména (klienta nebo naší kontaktní osoby) v Subject headeru emailů. Použití jména v předmětu signalizuje osobní vztah — klient cílí zprávu konkrétní osobě, ne 'kanceláři'. Absence jména při dřívějším používání signalizuje depersonalizaci.\n\nSystém porovnává Subject header s databází kontaktních osob (CRM). Sleduje frekvenci per klient over time a detekuje změny.",
    methodology:
      "Subject header parsing: 1) Extrakce Subject z email headers, 2) Name matching against CRM contact list (first_name), 3) Boolean per email: name_present yes/no, 4) Frequency: percentage of emails with name in subject per client per month, 5) Trend analysis and change detection.",
    dataInputs: [
      "Email Subject headers per klient",
      "CRM contact database (first_name, last_name per contact)",
      "Account manager ↔ client mapping",
    ],
    outputMetrics: [
      "% emails with name in subject per client",
      "Trend v čase (increasing/decreasing)",
      "Change point detection (sudden drop)",
      "Comparison: name-usage per client vs. portfolio avg",
    ],
    goodScenario: {
      title: "Osobní vztah — jméno v předmětu",
      description:
        "Klient adresuje 73 % emailů jménem ('Petro, prosím o...', 'Jano, dotaz k...'). Osobní vztah s konkrétním účetním. Stabilní vzorec.",
      indicators: [
        "73 % emails s jménem v předmětu",
        "Trend: stabilní",
        "Adresuje konkrétní osobu — silná vazba",
        "Koreluje s vysokým sentimentem",
      ],
      actions: [
        "Zajistit kontinuitu — při změně účetního řádně předat",
        "Využít silnou vazbu pro upsell",
      ],
    },
    badScenario: {
      title: "Formální distance — bez jména",
      description:
        "Klient přestal používat jméno v předmětu (dříve 65 %, nyní 5 %). Signalizuje depersonalizaci vztahu. Koreluje s obecnými předměty ('Faktura', 'Dotaz').",
      indicators: [
        "Name frequency drop: 65 % → 5 % za 2 měsíce",
        "Předměty se staly generickými",
        "Koreluje se změnou kontaktní osoby na straně klienta",
        "Sentiment mírně klesá",
      ],
      actions: [
        "Proaktivní osobní kontakt — znovu navázat vztah",
        "Představit se nové kontaktní osobě",
        "Nabídnout osobní schůzku",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["23-08", "23-10", "18-01"],
    businessImpact: "Nízký — relationship personalization indikátor",
    implementationStatus: "Produkce",
  },
  {
    id: "23-12",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Pravopisné chyby",
    source: "text analýza",
    good: "0 chyb — pečlivý",
    bad: "Rostoucí chyby — stres/únava/alkohol",
    description:
      "Spell-check error rate měření v emailech klienta pomocí Czech spell-check engine (Hunspell s cs_CZ dictionary). Rostoucí počet pravopisných chyb v čase signalizuje stres, únavu nebo jiné problémy na straně klienta. Stabilně nízká chybovost indikuje pečlivost.\n\nSystém normalizuje error rate na chyby per 100 slov a sleduje trend. Náhlý nárůst (dříve 0.5 % → nyní 4 %) je red flag. Korelace s dalšími ukazateli (sentiment, response time, emoji) vytváří kompletní obraz.",
    methodology:
      "Hunspell cs_CZ spell-check: 1) Email body tokenization, 2) Spell-check each token, 3) Error rate = misspelled / total_words × 100, 4) Exclude proper nouns, technical terms, abbreviations, 5) Time series per client, 6) Trend analysis (linear regression), 7) Change point detection.",
    dataInputs: [
      "Email body text per klient",
      "Hunspell cs_CZ dictionary + custom accounting terms",
      "Client name/company exclusion list",
      "Technical term whitelist (DPH, DPPO, DPFO, KH...)",
    ],
    outputMetrics: [
      "Error rate per 100 words per client per month",
      "Trend slope (increasing = concern)",
      "Change points (sudden increase)",
      "Korelace error_rate × sentiment × response_time",
      "Comparison vs. client's historical baseline",
    ],
    goodScenario: {
      title: "Nulová chybovost — pečlivý klient",
      description:
        "Error rate stabilně 0.2 % (1 chyba na 500 slov). Klient píše pečlivě, kontroluje zprávy. Koreluje s kvalitními podklady a včasnými platbami.",
      indicators: [
        "Error rate: 0.2 % (stable 24M)",
        "Trend: flat",
        "Korelace s kvalitou podkladů: positive",
        "Korelace s platební morálkou: positive",
      ],
      actions: [
        "Monitorovat pro změnu",
        "Klient je nízké riziko — standard service",
      ],
    },
    badScenario: {
      title: "Rostoucí chybovost — stress signál",
      description:
        "Error rate vzrostl z 0.5 % na 4.2 % za 6 týdnů. Koreluje s kratšími emaily, horším sentimentem a pozdějšími odpověďmi. Klient je pod tlakem.",
      indicators: [
        "Error rate: 0.5 % → 4.2 % za 6 týdnů",
        "Korelace se zkrácením emailů (avg words −60 %)",
        "Sentiment: −0.3 bodu za stejné období",
        "Response time: 4h → 36h",
      ],
      actions: [
        "Nabídnout pomoc — 'vnímáme, že jste pod tlakem'",
        "Být proaktivnější s informacemi (snížit zátěž klienta)",
        "Zkontrolovat kvalitu podkladů — pravděpodobně klesne",
        "Alert pro account managera",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["23-08", "23-13", "15-01"],
    businessImpact: "Nízký — wellbeing indikátor klienta",
    implementationStatus: "Produkce",
  },
  {
    id: "23-13",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "CAPS LOCK",
    source: "frustrace heatmap",
    good: "0 CAPS",
    bad: "3 maily v CAPS — zuří",
    description:
      "Detekce a kvantifikace CAPS LOCK použití v emailech klienta. Nadměrné psaní VELKÝMI PÍSMENY je univerzální digitální indikátor frustrace a agrese. Systém měří procento slov v CAPS per email (exkluzí akronymů a standardních zkratek).\n\nMetrika je binární na email level (contains_caps_shouting: yes/no) a continuous per word (caps_percentage). Threshold: > 15 % slov v CAPS v emailu = 'shouting detected'.\n\nI jeden email v CAPS je významný signál — vyžaduje okamžitou pozornost a deeskalaci.",
    methodology:
      "CAPS detection: 1) Tokenize email body, 2) Filter out known acronyms (DPH, IČO, DIČ, DPFO, DPPO, KH, SH, ČNB, EUR, CZK...), 3) Calculate caps_ratio = uppercase_words / total_words, 4) Threshold: caps_ratio > 0.15 = shouting, 5) Aggregate per client over time, 6) Alert on any single caps_shouting email.",
    dataInputs: [
      "Email body text per klient",
      "Czech/accounting acronym whitelist",
      "Historical caps_ratio per client (baseline)",
      "Context: subject line + previous thread",
    ],
    outputMetrics: [
      "Caps ratio per email per client",
      "Number of 'shouting' emails per month",
      "Client caps_ratio vs. portfolio baseline",
      "Trending: increasing caps usage",
      "Trigger context (what caused the frustration)",
    ],
    goodScenario: {
      title: "Nulové CAPS — klidná komunikace",
      description:
        "Klient nepoužívá CAPS (caps_ratio < 2 % = jen akronymy). Klidná, profesionální komunikace bez známek frustrace.",
      indicators: [
        "Caps ratio: 1.5 % (pouze akronymy)",
        "0 shouting emails za 12M",
        "Sentiment: pozitivní",
        "Stabilní komunikační vzorec",
      ],
      actions: ["Monitorovat jako standard", "Alert na první CAPS email"],
    },
    badScenario: {
      title: "3 emaily v CAPS — akutní frustrace",
      description:
        "Klient poslal 3 emaily za týden s caps_ratio > 40 %. Kontext: opakovaná chyba v daňovém přiznání. 'PROSÍM OPRAVTE TO KONEČNĚ' — vyžaduje okamžitou eskalaci.",
      indicators: [
        "3 emails s caps_ratio > 40 % za 7 dní",
        "Historický caps_ratio: 1.5 % (100× nárůst)",
        "Kontext: opakovaná chyba v DPPO",
        "Sentiment: silně negativní (−0.8)",
      ],
      actions: [
        "Okamžitá eskalace na senior partnera",
        "Osobní telefonát do 2 hodin",
        "Připravit kompletní nápravu + omluvu",
        "Nabídnout kompenzaci (sleva, extra service)",
      ],
    },
    frequency: "Real-time (per email)",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["23-07", "23-12", "15-04"],
    businessImpact: "Vysoký — okamžitý indikátor klientské krize",
    implementationStatus: "Produkce",
  },
  {
    id: "23-14",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Font faktur",
    source: "vizuální analýza PDF",
    good: "Konzistentní branding",
    bad: "Změna fontu — nový software = reorganizace",
    description:
      "Extrakce font metadata z PDF faktur pomocí pdfplumber/PyMuPDF. Změna fontu v fakturách signalizuje změnu fakturačního software na straně klienta — což často koreluje s organizační změnou (nový účetní, nový ERP, nový management).\n\nSystém extrahuje font_name a font_size z každé PDF faktury, buduje profil per klient a detekuje change points. Změna fontu je jeden z nejspolehlivějších machine-readable indikátorů reorganizace.\n\nDoplňkově systém detekuje i layout changes (pozice loga, struktura tabulky) pomocí bounding box analýzy.",
    methodology:
      "PDF analysis: 1) pdfplumber.open(pdf) → page.chars → font_name, font_size, 2) Dominant font extraction (mode of font_name), 3) Per-client font profile (expected font_name, font_size), 4) Change detection: new font_name != historical font_name, 5) Layout change: bounding box comparison for key elements (logo, table, totals).",
    dataInputs: [
      "PDF faktury per klient (DocuWare REST API → download)",
      "pdfplumber / PyMuPDF font extraction",
      "Historical font profile per client",
      "Layout template per client (bounding boxes)",
    ],
    outputMetrics: [
      "Current dominant font per client",
      "Font change detected (boolean + date)",
      "Layout change detected (boolean + date)",
      "Software inference (font → probable software mapping)",
      "Change frequency (how often client changes layout)",
    ],
    goodScenario: {
      title: "Konzistentní branding",
      description:
        "Klient používá stejný font (Calibri 10pt) a layout ve fakturách po celou dobu spolupráce. Stabilní ERP, stabilní procesy.",
      indicators: [
        "Font: Calibri 10pt (stable 36M)",
        "Layout: unchanged",
        "Software inference: Money S3 (consistent)",
        "0 changes detected",
      ],
      actions: ["Standard monitoring", "Font profile aktuální"],
    },
    badScenario: {
      title: "Změna fontu — nový software",
      description:
        "Od faktury FV-2026-0300 (1.3.2026) změna fontu z Calibri 10pt na Arial 9pt. Layout zcela jiný. Inference: přechod z Money S3 na Pohoda. Signalizuje reorganizaci — nový účetní/management.",
      indicators: [
        "Font change: Calibri → Arial od 1.3.2026",
        "Layout change: complete restructure",
        "Software inference: Money S3 → Pohoda",
        "Koreluje se změnou kontaktní osoby",
      ],
      actions: [
        "Proaktivně kontaktovat — 'všimli jsme si změny, potřebujete pomoc?'",
        "Nabídnout podporu při migraci na nový systém",
        "Aktualizovat zaúčtovací šablony",
        "Představit se novému účetnímu/managementu",
      ],
    },
    frequency: "Per faktura (real-time)",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["23-16", "23-17", "18-01"],
    businessImpact: "Střední — early detection reorganizace klienta",
    implementationStatus: "Produkce",
  },
  {
    id: "23-15",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Hodina vystavení",
    source: "timestamps",
    good: "Po-Pá 9-17",
    bad: "Sobota 2:00 — workaholik/krize",
    description:
      "Analýza creation timestamps faktur a dalších dokladů klienta. Doklady vystavené mimo pracovní dobu (víkendy, noci) signalizují buď workoholismus jednatele, krizovou situaci, nebo nestandardní provoz. Systém parsuje timestamps z PDF metadata (CreationDate) a z účetního software.\n\nDistribuce vystavení per hour-of-day a day-of-week vytváří 'working pattern' klienta. Anomálie (sobota 2:00 AM) jsou flagovány a korelovány s dalšími signály.\n\nPro klienty s nočním/víkendovým vzorcem může být relevantní přizpůsobit timing komunikace.",
    methodology:
      "Timestamp analysis: 1) PDF CreationDate extraction (pdfplumber metadata), 2) ERP document timestamps (invoice created_at), 3) Hour-of-day + day-of-week bucketing, 4) Heatmap construction (7×24 matrix), 5) Off-hours ratio: docs_outside_business / total_docs, 6) Anomaly detection: sudden shift to off-hours, 7) Korelace s business health indicators.",
    dataInputs: [
      "PDF metadata — CreationDate (pdfplumber/PyMuPDF)",
      "ERP document timestamps (Money S3 / Pohoda API export)",
      "Business hours definition per client (default: Po-Pá 8-18)",
      "Calendar (svátky, dovolené)",
    ],
    outputMetrics: [
      "Working pattern heatmap (7×24 matrix)",
      "Off-hours ratio (%)",
      "Peak working hours per client",
      "Anomálie (sudden shift to nights/weekends)",
      "Trend v off-hours ratio (increasing = concern)",
    ],
    goodScenario: {
      title: "Standardní pracovní doba",
      description:
        "95 % dokladů vystaveno Po-Pá 9-17. Klient má standardní provoz. Off-hours ratio: 5 % (občasné páteční podvečery).",
      indicators: [
        "Off-hours ratio: 5 %",
        "Peak: úterý-čtvrtek 10-14",
        "0 víkendových dokladů",
        "Stabilní pattern 12M",
      ],
      actions: ["Standard monitoring", "Komunikovat v peak hours klienta"],
    },
    badScenario: {
      title: "Noční/víkendová aktivita — workaholik nebo krize",
      description:
        "Od Q1 2026 nárůst off-hours ratio z 5 % na 38 %. Faktury vystavovány sobota 2:00, neděle 23:00. Koreluje s poklesem platební morálky a rostoucí komunikací. Klient pravděpodobně v cash flow krizi — pracuje přesčas.",
      indicators: [
        "Off-hours ratio: 5 % → 38 % za 3M",
        "Sobotní/nedělní doklady: 12 za Q1",
        "Noční doklady (22:00-06:00): 8 za Q1",
        "Korelace s payment delay (+15 dní)",
      ],
      actions: [
        "Proaktivní kontakt — nabídnout finanční poradenství",
        "Prověřit cash flow situaci klienta",
        "Nabídnout automatizaci (snížit jeho workload)",
        "Přizpůsobit komunikaci jeho reálnému schedule",
      ],
    },
    frequency: "Týdně",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["23-14", "23-20", "17-04"],
    businessImpact: "Střední — wellbeing a finanční zdraví klienta",
    implementationStatus: "Produkce",
  },
  {
    id: "23-16",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Číselná řada faktur",
    source: "gap analýza",
    good: "Sekvenční, bez mezer",
    bad: "Gap 2001-2047 — 46 neviditelných faktur?",
    description:
      "Detekce mezer v číselné řadě faktur klienta. Systém extrahuje čísla faktur (invoice_number) a buduje sekvenční model. Mezery v číslování (gap) signalizují buď smazané faktury, paralelní fakturaci jiným odběratelům, nebo systémovou chybu.\n\nGap > 10 v řadě je red flag — klient může mít 'neviditelné' faktury směřující jinam. V kontextu daňového poradenství je to compliance riziko.\n\nSystém buduje expected_next_number model a porovnává s actual_number per doklad.",
    methodology:
      "Sequence analysis: 1) Extract invoice_number per client (regex pattern matching), 2) Sort chronologically, 3) Calculate gaps: next_number − current_number − 1, 4) Flag gaps > configurable threshold (default: 3), 5) Aggregate: total_missing_numbers per period, 6) Trend: growing gaps = parallel invoicing increasing.",
    dataInputs: [
      "Invoice numbers per client (DocuWare + ERP)",
      "Invoice date (for chronological ordering)",
      "Client numbering pattern (prefix + sequence)",
      "Historical gap data (for trend)",
    ],
    outputMetrics: [
      "Total gaps per period per client",
      "Largest single gap (consecutive missing numbers)",
      "Gap frequency trend (increasing/stable/decreasing)",
      "Estimated missing invoices count",
      "Gap × date correlation (gaps cluster around specific dates?)",
    ],
    goodScenario: {
      title: "Sekvenční řada bez mezer",
      description:
        "Faktury klienta tvoří nepřerušenou řadu: FV-001, FV-002, ..., FV-247. Žádné gaps. Klient fakturuje výhradně přes nás.",
      indicators: [
        "0 gaps za 12M",
        "Kompletní sekvence 001-247",
        "Konzistentní numbering pattern",
        "Trend: stable (žádné nové gaps)",
      ],
      actions: [
        "Standard monitoring",
        "Pochválit klienta za pořádek v evidenci",
      ],
    },
    badScenario: {
      title: "46 neviditelných faktur",
      description:
        "Gap mezi FV-2001 a FV-2047 — 46 chybějících čísel. Klient buď fakturuje paralelně mimo náš dohled, nebo mazal faktury. Compliance riziko: nepřiznaný příjem.",
      indicators: [
        "Gap 2001-2047: 46 missing numbers",
        "Celkem 73 missing numbers za Q1",
        "Trend: gaps rostou (Q4: 12, Q1: 73)",
        "Gaps cluster around month-end dates",
      ],
      actions: [
        "Dotázat se klienta na chybějící čísla",
        "Prověřit zda nemá druhý fakturační systém",
        "Upozornit na compliance riziko (§ 11 zákona o účetnictví)",
        "Navrhnout centralizaci fakturace přes jeden systém",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["23-17", "23-18", "23-44"],
    businessImpact: "Vysoký — compliance a fraud detection",
    implementationStatus: "Produkce",
  },
  {
    id: "23-17",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Variabilní symboly",
    source: "pattern analýza",
    good: "Systematické (datum+číslo)",
    bad: "Náhodné — chaos v evidenci",
    description:
      "Analýza vzorců v variabilních symbolech (VS) faktur klienta pomocí regex pattern matching. Systematické VS (např. 20260301001 = datum+seq) indikují organizovaný systém. Náhodné VS signalizují chaos v evidenci a zvyšují riziko chyb při párování plateb.\n\nSystém klasifikuje VS patterns do kategorií: date-based, sequential, invoice-mirroring, random. Per-client pattern consistency je měřena a trend sledován.\n\nZměna patternu (z systematického na chaotický) je warning signál organizační změny.",
    methodology:
      "Regex classification: 1) Extract VS from invoices/payments, 2) Pattern matching: date-pattern (\\d{8}\\d{3}), sequential (\\d+), invoice-mirror (matches invoice_number), random (no detectable pattern), 3) Consistency score: % of VS matching dominant pattern, 4) Trend analysis, 5) Change point detection on pattern type.",
    dataInputs: [
      "Variabilní symboly z faktur (DocuWare/ERP)",
      "Variabilní symboly z plateb (bankovní API — FIO, KB, ČSOB)",
      "Invoice numbers (for mirror detection)",
      "Payment matching success rate",
    ],
    outputMetrics: [
      "Dominant VS pattern type per client",
      "Pattern consistency score (%)",
      "Payment matching success rate (related to VS quality)",
      "Change detection: pattern shift",
      "Comparison vs. portfolio (% with systematic VS)",
    ],
    goodScenario: {
      title: "Systematické VS — datum+číslo",
      description:
        "98 % VS odpovídá patternu YYYYMMDDNNN. Payment matching success: 99.5 %. Klient má organizovanou evidenci.",
      indicators: [
        "Pattern: date-based (YYYYMMDDNNN)",
        "Consistency: 98 %",
        "Payment match rate: 99.5 %",
        "0 neidentifikovaných plateb za Q1",
      ],
      actions: ["Standard monitoring", "Klient je benchmark pro VS systém"],
    },
    badScenario: {
      title: "Náhodné VS — chaos v evidenci",
      description:
        "VS nemají žádný detekovaný pattern. Consistency score: 12 %. Payment matching: 67 % (33 % vyžaduje manuální párování). Účetní stráví extra 3h/měsíc párováním.",
      indicators: [
        "Pattern: random (no detectable pattern)",
        "Consistency: 12 %",
        "Payment match rate: 67 %",
        "Extra work: 3h/month manual matching",
      ],
      actions: [
        "Navrhnout klientovi systematický VS formát",
        "Implementovat fuzzy matching pro jeho platby",
        "Kalkulovat cost of chaos (3h × hourly rate)",
        "Zvážit příplatek za extra manuální práci",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["23-16", "23-18", "1-01"],
    businessImpact: "Střední — efektivita párování plateb",
    implementationStatus: "Produkce",
  },
  {
    id: "23-18",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Zaokrouhlování",
    source: "statistická analýza",
    good: "Přirozené rozložení",
    bad: "80% kulatých částek v hotovosti — podezřelé",
    description:
      "Benford's law analýza distribuce částek na fakturách a platbách klienta. Přirozené finanční data sledují Benfordovo rozložení (první číslice: 1 se vyskytuje ~30 %, 9 se vyskytuje ~5 %). Výrazná odchylka od Benfordova rozložení indikuje manipulaci s částkami.\n\nDoplňkově systém detekuje nadměrné zastoupení 'kulatých' částek (tisíce, statisíce) vs. přirozených. V hotovostních transakcích je kulatost podezřelejší než u bezhotovostních.\n\nTato analýza je standardní forenzní auditorská technika implementovaná automaticky.",
    methodology:
      "Benford analysis: 1) Extract all amounts (invoices + payments per client), 2) First-digit distribution, 3) Chi-squared goodness-of-fit test vs. Benford expected, 4) Mantissa Arc test for second-order anomalies, 5) Round number detection: amount % 1000 == 0 or amount % 100 == 0, 6) Round ratio: round_amounts / total_amounts, 7) Segment by payment_type (cash vs. bank transfer).",
    dataInputs: [
      "Všechny částky faktur per client (amount_total, amount_vat, amount_base)",
      "Platby per client (bankovní API + pokladna)",
      "Payment type (hotovost vs. bezhotovostní)",
      "Historical amounts (pro trend analýzu min. 100 transakcí)",
    ],
    outputMetrics: [
      "Benford chi-squared p-value per client",
      "First-digit distribution vs. expected (deviation %)",
      "Round number ratio (overall + per payment_type)",
      "Cash round ratio vs. bank transfer round ratio",
      "Anomaly score (composite)",
    ],
    goodScenario: {
      title: "Přirozené rozložení částek",
      description:
        "First-digit distribuce odpovídá Benfordovu zákonu (chi-squared p > 0.3). Round ratio: 8 % (přirozené). Žádné anomálie.",
      indicators: [
        "Benford chi-sq p > 0.3",
        "First-digit deviation: < 5 %",
        "Round ratio: 8 % (in norm)",
        "Cash round ratio: 12 % (acceptable)",
      ],
      actions: ["Standard monitoring", "Recalibrate annually"],
    },
    badScenario: {
      title: "80 % kulatých hotovostních částek",
      description:
        "Cash round ratio: 80 % (norm: 15 %). Benford chi-squared p < 0.001. Nadměrné zaokrouhlování v hotovostních transakcích — potenciální daňový únik (nepřiznané tržby, fiktivní výdaje).",
      indicators: [
        "Cash round ratio: 80 % (norm: 15 %)",
        "Benford p < 0.001 — signifikantní odchylka",
        "First digit '5' overrepresented (22 % vs. expected 8 %)",
        "Bank transfer amounts: normal distribution",
      ],
      actions: [
        "Prozkoumat hotovostní transakce podrobně",
        "Upozornit klienta na compliance riziko",
        "Dokumentovat pro případ kontroly FÚ",
        "Navrhnout přechod na bezhotovostní platby",
      ],
    },
    frequency: "Kvartálně",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["23-16", "23-19", "1-01", "1-05"],
    businessImpact: "Vysoký — fraud detection a compliance",
    implementationStatus: "Produkce",
  },
  {
    id: "23-19",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Jednorázový dodavatel",
    source: "frequency",
    good: "95% opakujících se",
    bad: "12 jednorázových dodavatelů za Q1 — fraud risk",
    description:
      "Analýza frekvence dodavatelů v účetnictví klienta. Systém klasifikuje dodavatele na opakující se (2+ faktury za 12M) a jednorázové (1 faktura). Vysoký poměr jednorázových dodavatelů je red flag — potenciální fiktivní faktury, shell companies, nebo dezorganizace.\n\nSystém cross-referuje jednorázové dodavatele s ARES databází (existence, datum vzniku, obor). Nově vzniklé firmy (< 6 měsíců) s jedinou fakturou jsou highest risk.\n\nDoplňkově systém kontroluje, zda jednorázový dodavatel není propojen s klientem (stejná adresa, stejný jednatel, příbuzenské vztahy).",
    methodology:
      "Supplier frequency analysis: 1) Group invoices by supplier_ico, 2) Count invoices per supplier per 12M, 3) Classify: one-time (1) vs. recurring (2+), 4) One-time ratio = one_time / total_suppliers, 5) ARES check per one-time supplier (GET /ares/v1/ekonomicke-subjekty/{ico}), 6) Age check: company_age < 6M = high risk, 7) Address/person cross-match with client.",
    dataInputs: [
      "Přijaté faktury per client (supplier_ico, amount, date)",
      "ARES REST API — GET /ares/v1/ekonomicke-subjekty/{ico}",
      "OR data (justice.cz — jednatel, společníci, sídlo)",
      "Client data (adresa, jednatel) pro cross-match",
    ],
    outputMetrics: [
      "One-time supplier ratio per client",
      "Total one-time suppliers count per period",
      "High-risk one-time suppliers (new company + single invoice)",
      "Cross-match hits (supplier linked to client)",
      "Average one-time invoice amount vs. recurring",
    ],
    goodScenario: {
      title: "95 % opakujících se dodavatelů",
      description:
        "Klient má stabilní dodavatelský řetězec. 95 % dodavatelů se opakuje. One-time suppliers: 3 za Q1 (nový IT dodavatel, jednorázový servis, sezónní nákup — all verified).",
      indicators: [
        "One-time ratio: 5 %",
        "3 one-time suppliers (all verified via ARES)",
        "0 high-risk suppliers",
        "Stable supplier base 12M",
      ],
      actions: ["Standard monitoring", "Pokračovat v quarterly review"],
    },
    badScenario: {
      title: "12 jednorázových dodavatelů za Q1",
      description:
        "One-time ratio: 35 %. 12 nových dodavatelů s jedinou fakturou. 3 z nich: firmy mladší 6 měsíců, 1 se shodnou adresou s klientem. High fraud risk.",
      indicators: [
        "One-time ratio: 35 % (norm: < 10 %)",
        "12 one-time suppliers za Q1 (prev Q: 2)",
        "3 suppliers: company_age < 6M",
        "1 supplier: matching address with client",
      ],
      actions: [
        "Prověřit 3 nové firmy podrobně (ARES + OR)",
        "Konfrontovat klienta s matching address",
        "Dokumentovat pro případ kontroly FÚ",
        "Nastavit alert na nové one-time suppliers",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["23-18", "23-25", "14-04", "19-01"],
    businessImpact: "Vysoký — fraud detection",
    implementationStatus: "Produkce",
  },
  {
    id: "23-20",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Čas vystavení->zaplacení",
    source: "trend",
    good: "Klesající — zlepšuje se",
    bad: "Rostoucí — zhoršuje se",
    description:
      "Linear regression trend na payment speed (days from invoice_date to payment_date) per klient over time. Klesající trend indikuje zlepšující se finanční zdraví a organizaci. Rostoucí trend je early warning finanční tísně.\n\nNa rozdíl od statického aging (snapshot) tato analýza sleduje dynamiku — i klient s aktuálně dobrým aging může mít zhoršující se trend. Slope koeficient je klíčový output.\n\nSystém zahrnuje i sezónní adjustaci (STL) — rostoucí trend po odfiltrování sezónnosti je silnější signál.",
    methodology:
      "Payment speed trend: 1) Per invoice: payment_speed = payment_date − invoice_date (days), 2) Time series: payment_speed per month (median), 3) STL decomposition (sezónní adjustace), 4) Linear regression on trend component, 5) Slope significance (t-test), 6) Forecast: expected payment_speed at +3M, +6M.",
    dataInputs: [
      "Vydané faktury per client (invoice_date, amount)",
      "Bankovní výpisy — platby (payment_date, matched_invoice_id)",
      "Sezónní calendar (daňové termíny, dovolené)",
      "Historical data (min. 12M pro trend)",
    ],
    outputMetrics: [
      "Current median payment speed (days)",
      "Trend slope (days per month) — positive = worsening",
      "Slope significance (p-value)",
      "Seasonally adjusted trend",
      "Forecast: expected payment speed at +3M, +6M",
    ],
    goodScenario: {
      title: "Klesající trend — klient se zlepšuje",
      description:
        "Payment speed klesá o 0.8 dne/měsíc (p < 0.01). Aktuální median: 12 dní. Forecast 6M: 7 dní. Klient zlepšuje finanční disciplínu.",
      indicators: [
        "Slope: −0.8 day/month (p < 0.01)",
        "Current median: 12 days",
        "Forecast 6M: 7 days",
        "Consistent improvement 9M",
      ],
      actions: [
        "Pochválit klienta za zlepšení",
        "Zvážit early payment discount",
        "Sledovat udržitelnost trendu",
      ],
    },
    badScenario: {
      title: "Rostoucí trend — zhoršení platební morálky",
      description:
        "Payment speed roste o 2.3 dne/měsíc (p < 0.001). Aktuální median: 28 dní. Forecast 6M: 42 dní (za splatností). Koreluje s poklesem obratu klienta.",
      indicators: [
        "Slope: +2.3 days/month (p < 0.001)",
        "Current median: 28 days (splatnost: 30)",
        "Forecast 6M: 42 days (over due!)",
        "Korelace s revenue decline (r = −0.68)",
      ],
      actions: [
        "Proaktivní kontakt — nabídnout finanční poradenství",
        "Zkrátit splatnost na dalších fakturách",
        "Zvážit požadavek na zálohy",
        "Sledovat intenzivně — měsíční review",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["1-04", "21-02", "23-15"],
    businessImpact: "Vysoký — predikce finanční tísně",
    implementationStatus: "Produkce",
  },
  {
    id: "23-21",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "GPS z knih jízd",
    source: "pendleři",
    good: "Trasa konzistentní s bydlištěm",
    bad: "Bydlí 200km od deklarovaného — podvod?",
    description:
      "Analýza GPS dat z elektronických knih jízd (GPX formát) zaměstnanců klientů-pendlerů (CZ-DE). Systém porovnává skutečné trasy s deklarovaným bydlištěm a pracovištěm. Nesrovnalosti signalizují potenciální daňový problém (nesprávný domicil, fiktivní bydliště).\n\nGPX track logy jsou parsovány na start/end body a porovnány s declared_address z payroll systému. Vzdálenost start_point × declared_home > threshold je flag.\n\nPro pendlery je tato analýza compliance-critical — špatný domicil = špatné zdanění.",
    methodology:
      "GPX analysis: 1) Parse GPX trackpoints (lat, lon, timestamp), 2) Extract daily start_point (first trackpoint) and end_point (last trackpoint), 3) Geocode start_point → address (reverse geocoding), 4) Compare with declared_home address (Haversine distance), 5) Flag: distance > 20 km threshold, 6) Pattern: consistent discrepancy over N days.",
    dataInputs: [
      "Knihy jízd — GPX track logs per zaměstnanec",
      "Payroll: declared home address per zaměstnanec",
      "Payroll: declared workplace address",
      "Geocoding API (Mapy.cz / Google Maps)",
    ],
    outputMetrics: [
      "Daily start_point × declared_home distance (km)",
      "Discrepancy frequency (days with distance > threshold)",
      "Pattern: consistent alternative start location",
      "Average commute distance (actual vs. declared)",
      "Flagged employees count",
    ],
    goodScenario: {
      title: "Trasa konzistentní s bydlištěm",
      description:
        "GPS start body odpovídají deklarovanému bydlišti (avg distance: 1.2 km). Trasa je konzistentní 6M. Žádné discrepancies.",
      indicators: [
        "Avg start-home distance: 1.2 km",
        "0 flagged days (threshold: 20 km)",
        "Trasa: declared_home → declared_work",
        "Consistent 6M pattern",
      ],
      actions: ["Standard monitoring", "Quarterly re-check"],
    },
    badScenario: {
      title: "Bydlí 200 km od deklarovaného",
      description:
        "Zaměstnanec start body: consistently Plzeň (avg). Declared home: Liberec (200 km). 85 % pracovních dní start z Plzně. Potenciálně nesprávný domicil → špatné zdanění.",
      indicators: [
        "Avg start-home distance: 198 km",
        "85 % dní start z alternativní lokace (Plzeň)",
        "Declared: Liberec, Actual: Plzeň",
        "Pattern consistent 4M",
      ],
      actions: [
        "Konfrontovat klienta s GPS daty",
        "Prověřit daňové důsledky (nesprávný domicil)",
        "Aktualizovat payroll data pokud je skutečné bydliště jiné",
        "Přepočítat daňové povinnosti za dotčené období",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "75 % automatizováno",
    relatedAnalyses: ["23-22", "23-23", "23-24"],
    businessImpact: "Vysoký — daňová compliance pendlerů",
    implementationStatus: "Produkce",
  },
  {
    id: "23-22",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Čas na hranici",
    source: "GPS",
    good: "Pravidelné přejezdy",
    bad: "0 přejezdů — pracuje skutečně v DE?",
    description:
      "Detekce border crossing timestamps z GPS dat knih jízd. Pro pendlery (CZ-DE) je počet a frekvence přejezdů hranice klíčový compliance indikátor. 183-day rule (daňový domicil) závisí na fyzické přítomnosti.\n\nSystém detekuje překročení hranice (latitude crossing CZ-DE border polygon) a počítá dny strávené v každé zemi. Nesrovnalost s deklarovaným pracovním režimem je flagována.\n\n0 přejezdů za měsíc u deklarovaného pendlera = neexistující pendlerství.",
    methodology:
      "Border crossing detection: 1) CZ-DE border polygon (GeoJSON), 2) GPX trackpoint intersection with border, 3) Timestamp of crossing, 4) Days-in-country calculation (CZ vs. DE per day based on last crossing), 5) Monthly summary: days_in_CZ, days_in_DE, crossings_count, 6) Comparison with declared work schedule, 7) 183-day rule tracking (rolling 12M).",
    dataInputs: [
      "GPX track logs per zaměstnanec",
      "CZ-DE border polygon (GeoJSON from OSM)",
      "Declared work schedule (days_in_DE per month)",
      "Calendar (work days, holidays CZ + DE)",
    ],
    outputMetrics: [
      "Border crossings per month",
      "Days in CZ vs. DE per month",
      "Rolling 183-day status (which country for tax)",
      "Discrepancy: declared vs. actual days_in_DE",
      "Flagged employees (0 crossings or major discrepancy)",
    ],
    goodScenario: {
      title: "Pravidelné přejezdy — konzistentní pendler",
      description:
        "20 crossings/month (10 tam, 10 zpět). Days in DE: 22, CZ: 8 (matches declared schedule). 183-day tracking: on track for DE domicil.",
      indicators: [
        "20 crossings/month (consistent 12M)",
        "Days in DE: 22/month (declared: 22)",
        "183-day status: DE (on track)",
        "0 discrepancy days",
      ],
      actions: ["Standard monitoring", "Quarterly 183-day rule review"],
    },
    badScenario: {
      title: "0 přejezdů — neexistující pendlerství?",
      description:
        "Zaměstnanec deklarovaný jako pendler (22 dní/měsíc v DE) má 0 border crossings za poslední 2 měsíce. Buď nepracuje v DE, nebo má chybný GPS tracker. Critical compliance risk.",
      indicators: [
        "0 border crossings za 2M",
        "Declared: 22 days/month in DE",
        "GPS shows: activity only in CZ",
        "183-day tracking: reverting to CZ domicil",
      ],
      actions: [
        "Urgentně ověřit s klientem — pracuje zaměstnanec skutečně v DE?",
        "Zkontrolovat GPS zařízení (technická porucha?)",
        "Přehodnotit daňový domicil",
        "Přepočítat daně pokud zaměstnanec nepracuje v DE",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "80 % automatizováno",
    relatedAnalyses: ["23-21", "23-24", "23-37"],
    businessImpact: "Vysoký — pendler compliance (183-day rule)",
    implementationStatus: "Produkce",
  },
  {
    id: "23-23",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Vzorce tankování",
    source: "stvrzenky",
    good: "Odpovídá trase",
    bad: "Tankuje 500km od trasy — osobní jízdy?",
    description:
      "Geo-matching účtenek za pohonné hmoty s GPS trasami z knih jízd. Systém extrahuje lokaci čerpací stanice z účtenky (adresa nebo GPS metadata) a porovnává s trasou ve stejný den. Tankování mimo trasu signalizuje osobní jízdy účtované jako služební.\n\nSystém používá buffer zone (default: 15 km od trasy) — tankování mimo buffer je flag. Opakované off-route tankování u stejné lokace identifikuje pattern (např. bydliště zaměstnance).\n\nTato analýza je klíčová pro klienty s firemními vozidly a knihami jízd.",
    methodology:
      "Fuel receipt geo-matching: 1) Extract location from receipt (OCR → address → geocode, or GPS metadata), 2) Load GPX route for same date, 3) Calculate minimum distance: receipt_location to nearest_trackpoint, 4) Flag: distance > buffer_zone (15 km), 5) Pattern analysis: repeated off-route locations, 6) Aggregate: off_route_ratio per employee per month.",
    dataInputs: [
      "Účtenky za PHM (DocuWare — OCR extraction: station_name, address, date)",
      "GPX track logs per zaměstnanec per day",
      "Geocoding API (address → lat/lon)",
      "Employee home address (for pattern detection)",
    ],
    outputMetrics: [
      "Off-route fuel ratio per employee per month",
      "Total off-route fuel amount (CZK)",
      "Repeated off-route locations (pattern)",
      "Distance from route per receipt",
      "Estimated personal use amount (CZK)",
    ],
    goodScenario: {
      title: "Tankování odpovídá trase",
      description:
        "100 % tankování within 15 km buffer od GPS trasy. Zaměstnanec tankuje na trase dom-práce. Žádné anomálie.",
      indicators: [
        "Off-route ratio: 0 %",
        "All receipts within 15 km of route",
        "Consistent pattern 12M",
        "0 flagged receipts",
      ],
      actions: ["Standard monitoring", "Quarterly review"],
    },
    badScenario: {
      title: "Tankuje 500 km od trasy",
      description:
        "Zaměstnanec tankoval v Chorvatsku (500 km od declared route CZ-DE). Opakovaně: 3× za léto. Total off-route fuel: 4 800 Kč. Pattern: osobní dovolená na firemní PHM.",
      indicators: [
        "Off-route ratio: 15 % (summer months)",
        "3 receipts from HR (500 km from route)",
        "Total: 4 800 Kč off-route fuel",
        "Pattern: vacation destination",
      ],
      actions: [
        "Upozornit klienta — osobní jízdy na firemní PHM",
        "Vyčíslit daňový dopad (nepeněžní příjem zaměstnance)",
        "Navrhnout úpravu vnitřní směrnice (soukromé jízdy)",
        "Přeúčtovat jako benefit zaměstnance",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "75 % automatizováno",
    relatedAnalyses: ["23-21", "23-22", "23-24"],
    businessImpact: "Střední — daňová compliance firemní vozidla",
    implementationStatus: "Produkce",
  },
  {
    id: "23-24",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Dny bez dojíždění",
    source: "absence",
    good: "Koreluje s dovolenou",
    bad: "10 pracovních dní bez dojíždění — nemoc?",
    description:
      "Korelace GPS absence (žádné GPS trackpoints za den) s absence calendar (dovolená, nemoc, sick day). Dny bez GPS aktivity, které nejsou pokryty absencí, signalizují nedeklarovanou nepřítomnost — potenciální problém se mzdami a pojistným.\n\nSystém buduje daily status: GPS_active / GPS_absent a porovnává s HR calendar: holiday / sick / work_day. Mismatch (GPS_absent + work_day) je flagován.\n\nToto je compliance-critical pro pendlery — nezachycená nepřítomnost ovlivňuje 183-day rule.",
    methodology:
      "Absence correlation: 1) Daily GPS status: active (>= 1 trackpoint) / absent (0 trackpoints), 2) HR calendar: holiday, sick, work_day, 3) Match matrix: GPS_status × calendar_status, 4) Flag: GPS_absent ∩ work_day (unexcused absence), 5) Count flagged days per employee per month, 6) Impact on 183-day calculation.",
    dataInputs: [
      "GPX track logs per zaměstnanec (daily activity detection)",
      "HR absence calendar (dovolená, nemocenská, OČR...)",
      "Work day calendar (CZ + DE holidays)",
      "183-day tracking data",
    ],
    outputMetrics: [
      "Unexcused absence days per employee per month",
      "GPS-calendar mismatch ratio",
      "Impact on 183-day calculation (days to recalculate)",
      "Pattern: recurring unexcused days (e.g., Mondays)",
      "Total mismatch days portfolio-wide",
    ],
    goodScenario: {
      title: "GPS koreluje s kalendářem — 0 mismatch",
      description:
        "Každý den bez GPS odpovídá zapsané dovolené nebo nemoci. 0 unexcused absences. Perfektní evidence.",
      indicators: [
        "0 mismatch days za 6M",
        "GPS-calendar correlation: 100 %",
        "183-day tracking: accurate",
        "All absences properly documented",
      ],
      actions: [
        "Standard monitoring",
        "Pochválit klienta za kvalitní HR evidenci",
      ],
    },
    badScenario: {
      title: "10 dní bez dojíždění — nedeklarovaná absence",
      description:
        "10 pracovních dní bez GPS aktivity, ale v HR kalendáři jako 'work_day'. Zaměstnanec nepracoval, ale mzda běžela. Potenciální dopad na SZP a 183-day rule.",
      indicators: [
        "10 unexcused absence days",
        "GPS: 0 trackpoints tyto dny",
        "HR calendar: work_day (no leave recorded)",
        "Impact: 10 days shift in 183-day calculation",
      ],
      actions: [
        "Urgentně vyjasnit s klientem — kde byl zaměstnanec?",
        "Opravit HR evidenci (doplnit dovolenou/nemocenskou)",
        "Přepočítat mzdu pokud nebylo odpracováno",
        "Aktualizovat 183-day tracking",
      ],
    },
    frequency: "Týdně",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["23-21", "23-22", "23-32"],
    businessImpact: "Vysoký — mzdová a daňová compliance",
    implementationStatus: "Produkce",
  },
  {
    id: "23-25",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Vzájemné fakturace",
    source: "cross-match IČO",
    good: "Transparentní obchod",
    bad: "3 klienti si fakturují v kruhu",
    description:
      "IČO cross-match SQL query přes faktury vydané a přijaté všech klientů kanceláře. Systém identifikuje případy, kdy klient A fakturuje klientu B, a oba jsou naši klienti. Legitimní obchodní vztah vs. umělé transakce — kontext rozhoduje.\n\nVzájemné fakturace (A↔B: A fakturuje B AND B fakturuje A) jsou zvlášť zajímavé — mohou být legitimní (vzájemný obchod) nebo podezřelé (umělé navyšování obratu).\n\nQuery: SELECT a.supplier_ico, a.customer_ico FROM invoices a JOIN clients c1 ON a.supplier_ico = c1.ico JOIN clients c2 ON a.customer_ico = c2.ico.",
    methodology:
      "SQL cross-match: 1) JOIN invoices ON supplier_ico = client.ico AND customer_ico = client.ico, 2) Build directed graph: client → client (weighted by invoice amount), 3) Detect mutual invoicing: A→B AND B→A, 4) Amount symmetry check: |amount_AB − amount_BA| / max(amount_AB, amount_BA), 5) Temporal pattern: synchronized invoicing dates.",
    dataInputs: [
      "Vydané faktury — all clients (supplier_ico, customer_ico, amount, date)",
      "Přijaté faktury — all clients (same fields)",
      "Client list (ico, name, industry)",
      "Historical transaction data for trend",
    ],
    outputMetrics: [
      "Cross-invoicing pairs detected (count)",
      "Mutual invoicing pairs (A↔B, both directions)",
      "Amount symmetry per pair (high symmetry = suspicious)",
      "Total cross-invoiced amount per pair",
      "Temporal synchronization score",
    ],
    goodScenario: {
      title: "Transparentní obchodní vztahy",
      description:
        "4 cross-invoicing pairs detected. All are legitimate: IT support (A→B), consulting (C→D). Amounts asymmetric. No mutual pairs. Transparentní dodavatelský řetězec.",
      indicators: [
        "4 cross-invoicing pairs (one-directional)",
        "0 mutual pairs",
        "Amount asymmetry: all > 0.5 (different business)",
        "Industries match relationship type",
      ],
      actions: [
        "Monitorovat pro nové pairs",
        "Využít znalost vztahů pro proaktivní komunikaci",
      ],
    },
    badScenario: {
      title: "3 klienti fakturují v kruhu",
      description:
        "A→B: 500K, B→C: 480K, C→A: 520K. Amounts suspiciously similar (within 8 %). Dates synchronized (all within 5 days). Classic carousel pattern — potenciální fraud.",
      indicators: [
        "Circular invoicing: A→B→C→A",
        "Amount symmetry > 0.92 (suspicious)",
        "Date synchronization: all within 5 days",
        "No clear business rationale",
      ],
      actions: [
        "Prověřit business rationale — co si fakturují?",
        "Zkontrolovat substance transakcí",
        "Upozornit klienty na compliance riziko",
        "Dokumentovat pro případ kontroly FÚ",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["23-26", "14-01", "14-04"],
    businessImpact: "Vysoký — fraud detection a compliance",
    implementationStatus: "Produkce",
  },
  {
    id: "23-26",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Uzavřené smyčky",
    source: "graf",
    good: "Žádné",
    bad: "A->B->C->A za identické částky",
    description:
      "Cycle detection (DFS) na grafu fakturačních vazeb mezi klienty. Uzavřená smyčka (A→B→C→A) kde toky mají podobné částky je klasický carousel fraud pattern. Systém buduje directed weighted graph z faktur a spouští DFS pro cykly délky 3-6.\n\nKaždý detekovaný cyklus je ohodnocen suspicion score na základě: amount similarity, temporal synchronization, business rationale (industry match), entity age.\n\nToto je automatizovaná verze forenzního auditu, která běží kontinuálně.",
    methodology:
      "Graph cycle detection: 1) Build directed graph G(V=clients, E=invoices, weight=amount), 2) DFS-based cycle detection (length 3-6), 3) Per cycle: amount_similarity = 1 − std(amounts)/mean(amounts), 4) Temporal sync = max(date_diff) within cycle, 5) Suspicion score = f(amount_similarity, temporal_sync, entity_ages), 6) Rank cycles by suspicion score.",
    dataInputs: [
      "Invoice graph (supplier_ico → customer_ico, amount, date)",
      "Client metadata (industry NACE, company_age, entity_type)",
      "Historical cycles (for tracking persistence)",
      "ARES data for entity verification",
    ],
    outputMetrics: [
      "Number of cycles detected per period",
      "Cycle details (participants, amounts, dates)",
      "Suspicion score per cycle (0-1)",
      "Cycle persistence (how long has it existed)",
      "Total amount circulated per cycle",
    ],
    goodScenario: {
      title: "Žádné uzavřené smyčky",
      description:
        "DFS nedetekoval žádné cykly v invoicing grafu. Všechny obchodní vztahy jsou lineární (dodavatel → odběratel). Čisté prostředí.",
      indicators: [
        "0 cycles detected",
        "Graph is DAG (directed acyclic)",
        "All relationships uni-directional",
        "Clean 12M",
      ],
      actions: [
        "Standard monitoring (monthly DFS)",
        "Alert na první detekovaný cyklus",
      ],
    },
    badScenario: {
      title: "A→B→C→A za identické částky",
      description:
        "Cyklus: A→B (510K), B→C (490K), C→A (505K). Amount similarity: 0.96. Temporal sync: 3 dny. Suspicion score: 0.89. Všechny entity < 2 roky staré.",
      indicators: [
        "3-node cycle detected",
        "Amount similarity: 0.96",
        "Temporal sync: 3 days",
        "All entities < 2 years old",
      ],
      actions: [
        "Okamžitá eskalace na senior partnera",
        "Prověřit substance transakcí u všech 3 klientů",
        "ARES deep check na všechny entity",
        "Zvážit oznámení FAÚ pokud substance chybí",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["23-25", "14-01", "14-03"],
    businessImpact: "Kritický — carousel fraud detection",
    implementationStatus: "Produkce",
  },
  {
    id: "23-27",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Sdílení zaměstnanců",
    source: "RČ cross-match",
    good: "Unikátní zaměstnanci",
    bad: "Stejné RČ u 3 klientů — švarcsystém",
    description:
      "Deduplikace rodných čísel (RČ) across payroll tabulek všech klientů kanceláře. Stejné RČ u více klientů odhaluje zaměstnance pracující pro více firem — legitimní (DPP/DPČ) nebo nelegitimní (švarcsystém, fiktivní zaměstnání).\n\nSystém provádí hash-based RČ matching (privacy-preserving) přes payroll data. Matches jsou obohaceny o kontext: typ úvazku, obor klientů, vzájemné propojení klientů.\n\nStejné RČ u propojených klientů (stejný jednatel) je highest risk — potenciální optimalizace mzdových nákladů.",
    methodology:
      "RČ deduplication: 1) Hash RČ from all payroll tables (SHA-256 with salt), 2) Cross-match hashes, 3) For each match: gather context (employment_type, client_industry, client_relationship), 4) Risk scoring: same_RČ + connected_clients + full_time_at_both = HIGH risk, 5) Alert per match with context.",
    dataInputs: [
      "Payroll data per client — RČ (hashed), employment_type, working_hours",
      "Client relationship graph (14-01)",
      "Client metadata (jednatel, společníci)",
      "Employment type classification (HPP, DPP, DPČ, OSVČ)",
    ],
    outputMetrics: [
      "Number of shared employees (same RČ across clients)",
      "Risk classification per match (low/medium/high)",
      "Connected client pairs sharing employees",
      "Employment type distribution of shared employees",
      "Total shared employees as % of total workforce",
    ],
    goodScenario: {
      title: "Unikátní zaměstnanci",
      description:
        "0 RČ matches across portfolio. Každý zaměstnanec je unikátní u jednoho klienta. Čistá evidence.",
      indicators: [
        "0 shared RČ across portfolio",
        "All employees unique per client",
        "Clean payroll data",
        "No cross-employment",
      ],
      actions: ["Standard monitoring (quarterly)", "Maintain hash database"],
    },
    badScenario: {
      title: "Stejné RČ u 3 propojených klientů",
      description:
        "RČ hash ABC123 found in payroll of clients X, Y, Z. All three clients share same jednatel. Employee listed as HPP (full-time) at all three. Physically impossible — švarcsystém nebo fiktivní zaměstnání.",
      indicators: [
        "1 RČ at 3 clients simultaneously",
        "All 3 clients share jednatel",
        "Employment type: HPP at all three",
        "Combined declared hours: 120h/week (impossible)",
      ],
      actions: [
        "Konfrontovat klienty/jednatele s nálezem",
        "Prověřit oprávněnost zaměstnání (reálný výkon práce)",
        "Upozornit na právní riziko (§ 5 ZP — švarcsystém)",
        "Navrhnout legální řešení (DPP, OSVČ kontrakt)",
      ],
    },
    frequency: "Kvartálně",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["23-28", "14-03", "14-05"],
    businessImpact: "Vysoký — pracovněprávní a daňová compliance",
    implementationStatus: "Produkce",
  },
  {
    id: "23-28",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Sdílené adresy",
    source: "address matching",
    good: "Unikátní sídla",
    bad: "5 firem na 1 adrese — virtuální sídla",
    description:
      "Normalizace a matching adres sídel klientů pro detekci shared addresses. Více firem na stejné adrese může být legitimní (kancelářský komplex) nebo podezřelé (virtuální sídla, schránkové firmy).\n\nSystém normalizuje adresy (lowercase, remove diacritics, standardize street names) a provádí fuzzy matching (Levenshtein distance < 3 or geocode distance < 50m). Clustery > 3 firem na adrese jsou flagovány.\n\nDoplňkově systém prověřuje adresy přes ARES (deklarované vs. skutečné sídlo) a detekuje known virtual office providers.",
    methodology:
      "Address normalization + matching: 1) Normalize: lowercase, strip diacritics, standardize (ul. → ulice, nám. → náměstí), 2) Geocode all addresses, 3) Cluster by proximity (< 50m) OR string similarity (Levenshtein < 3), 4) Count companies per cluster, 5) Flag clusters > 3, 6) Cross-reference with known virtual office addresses, 7) ARES verification.",
    dataInputs: [
      "Client sídlo addresses (from registration / ARES)",
      "ARES REST API — GET /ares/v1/ekonomicke-subjekty/{ico} (registered address)",
      "Geocoding API (address → lat/lon)",
      "Known virtual office provider list",
    ],
    outputMetrics: [
      "Address clusters (groups of companies at same address)",
      "Cluster size distribution",
      "Virtual office matches (known providers)",
      "ARES address verification status per client",
      "New clusters formed (quarterly delta)",
    ],
    goodScenario: {
      title: "Unikátní sídla",
      description:
        "Každý klient má unikátní adresu. Max cluster size: 2 (legitimní sdílená kancelář). 0 virtual office matches.",
      indicators: [
        "Max cluster size: 2",
        "0 virtual office matches",
        "All addresses ARES-verified",
        "No new clusters in 12M",
      ],
      actions: ["Standard monitoring (quarterly)", "Update address database"],
    },
    badScenario: {
      title: "5 firem na 1 adrese — virtuální sídla",
      description:
        "5 klientů na adrese Václavské nám. 12. Adresa identifikována jako virtual office provider. 3 z 5 firem < 1 rok staré, stejné NACE kódy. Suspicion: coordinated entity creation.",
      indicators: [
        "Cluster size: 5 companies",
        "Address: known virtual office provider",
        "3/5 companies < 1 year old",
        "Same NACE codes: 6920 (accounting)",
      ],
      actions: [
        "Prověřit substance — mají reálnou kancelář?",
        "ARES + OR deep check na všech 5",
        "Prověřit propojení (společný jednatel, společník)",
        "Zvýšená due diligence na tyto klienty",
      ],
    },
    frequency: "Kvartálně",
    automationLevel: "80 % automatizováno",
    relatedAnalyses: ["23-27", "14-01", "19-01"],
    businessImpact: "Střední — AML/KYC compliance",
    implementationStatus: "Produkce",
  },
  {
    id: "23-29",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Účetní × platební morálka",
    source: "korelace",
    good: "Rovnoměrná — systém funguje",
    bad: "Účetní A: 95% včas, B: 40% — kauzalita?",
    description:
      "Korelační analýza mezi přiřazeným účetním a platební morálkou jeho klientů. Pokud klienti jednoho účetního platí signifikantně lépe než klienti druhého, příčina může být v kvalitě komunikace, upomínek a vztahu účetní–klient.\n\nSystém kontroluje confounding variables: složitost klientů (obrat, obor), délku spolupráce, počet klientů na účetního. Po adjustaci je residuální rozdíl připsatelný účetnímu.\n\nToto je manažerský nástroj — neobviňuje, ale identifikuje kde pomoci.",
    methodology:
      "Accountant-payment correlation: 1) Per accountant: avg client payment_on_time_ratio, 2) Adjust for confounders: client_revenue, industry, tenure, complexity, 3) ANOVA / mixed-effects model: accountant as random effect, 4) Residual per accountant (adjusted for client mix), 5) Rank accountants by adjusted payment performance, 6) Delta from mean.",
    dataInputs: [
      "Payment data per client (on_time / late per invoice)",
      "Accountant assignment (client_id ↔ accountant_id)",
      "Client metadata (revenue, industry, tenure, complexity score)",
      "Upomínka logs per accountant",
    ],
    outputMetrics: [
      "Adjusted on-time payment rate per accountant",
      "ANOVA p-value (is accountant effect significant?)",
      "Rank: accountant performance (adjusted)",
      "Delta from mean per accountant",
      "Upomínka effectiveness per accountant",
    ],
    goodScenario: {
      title: "Rovnoměrná — systém funguje",
      description:
        "ANOVA p > 0.1 — accountant effect not significant after adjustment. All accountants have similar adjusted payment performance (within ±5 %). System works, not individuals.",
      indicators: [
        "ANOVA p > 0.1 (no accountant effect)",
        "Max delta: ±5 % from mean",
        "All accountants within normal range",
        "Consistent across quarters",
      ],
      actions: ["Pokračovat s aktuální alokací", "Quarterly re-assessment"],
    },
    badScenario: {
      title: "Účetní A: 95 %, B: 40 % — signifikantní rozdíl",
      description:
        "ANOVA p < 0.001. Účetní A: adjusted on-time ratio 95 %. Účetní B: 40 %. After adjusting for client complexity, accountant B underperforms by 35 points. Likely cause: B doesn't send upomínky, doesn't follow up.",
      indicators: [
        "ANOVA p < 0.001 — accountant effect significant",
        "Accountant A: 95 % adjusted, B: 40 % adjusted",
        "B's delta: −35 % from mean",
        "B's upomínka count: 60 % lower than A",
      ],
      actions: [
        "Coaching pro účetní B — sdílet best practices z A",
        "Analyzovat B's upomínka process",
        "Implementovat standardní upomínkový workflow",
        "Zvážit redistribuci klientů pokud B nezlepší za 3M",
      ],
    },
    frequency: "Kvartálně",
    automationLevel: "80 % automatizováno",
    relatedAnalyses: ["23-04", "23-05", "23-30"],
    businessImpact: "Střední — interní performance management",
    implementationStatus: "Produkce",
  },
  {
    id: "23-30",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Opravy po audit trail",
    source: "počet",
    good: "0.1% — excelentní",
    bad: "4.8% — potřebuje školení",
    description:
      "Měření error rate per účetní na základě audit trail — počet opravných zápisů, stornovacích dokladů a manuálních korekcí v poměru k celkovému počtu zápisů. Vysoký error rate signalizuje potřebu školení nebo přetíženost.\n\nSystém parsuje ERP audit trail (storno, opravný zápis, manuální korekce) a normalizuje na total_entries per user. Trend per účetní per kvartál identifikuje zlepšení/zhoršení.\n\nKombinace s dalšími metrikami (window switching, overtime) dává holistický obraz výkonu.",
    methodology:
      "Error rate analysis: 1) ERP audit trail: count events with type IN (storno, opravný_zápis, manuální_korekce), 2) Total entries per user per period, 3) Error rate = error_entries / total_entries × 100, 4) Trend: linear regression per user per quarter, 5) Benchmark: portfolio median error rate, 6) Korelace s overtime, client complexity, training history.",
    dataInputs: [
      "ERP audit trail (event_type, user_id, timestamp, affected_entry)",
      "Total entries per user per period",
      "User metadata (experience, training dates, certifications)",
      "Client complexity scores per user's portfolio",
    ],
    outputMetrics: [
      "Error rate per user per period (%)",
      "Trend (improving/worsening)",
      "Benchmark: percentile vs. team",
      "Error type distribution (storno vs. korekce vs. other)",
      "Korelace error_rate × overtime_hours",
    ],
    goodScenario: {
      title: "Excelentní — 0.1 % chybovost",
      description:
        "Error rate 0.1 % — 1 oprava na 1000 zápisů. Top performer v kanceláři. Trend: stable nebo improving. Žádné korelace s overtime.",
      indicators: [
        "Error rate: 0.1 %",
        "Percentile: top 5 % in team",
        "Trend: flat (consistently low)",
        "0 storno entries za měsíc",
      ],
      actions: [
        "Recognize excellent performance",
        "Use as mentor for new hires",
      ],
    },
    badScenario: {
      title: "4.8 % error rate — potřebuje školení",
      description:
        "Error rate 4.8 % — 48× horší než top performer. Trend: worsening (+0.3 %/quarter). Koreluje s 15h overtime/month. Likely cause: přetížení + nedostatečné školení na nové předpisy.",
      indicators: [
        "Error rate: 4.8 % (portfolio median: 1.2 %)",
        "Trend: +0.3 %/quarter (worsening)",
        "Overtime: 15h/month",
        "Korelace error × overtime: r = 0.78",
      ],
      actions: [
        "Snížit workload (přerozdělit klienty)",
        "Naplánovat targeted školení (chybové typy)",
        "Mentoring od top performera",
        "Sledovat error rate po intervenci (3M)",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["23-29", "23-46", "23-32"],
    businessImpact: "Střední — quality management",
    implementationStatus: "Produkce",
  },
  {
    id: "23-31",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Klienti zdarma",
    source: "fakturace vs. čas",
    good: "0 ztrátových",
    bad: "4 klienti stojí víc než platí",
    description:
      "Porovnání fakturované částky (revenue per client) s odhadnutým časem stráveným na klientovi (cost per client). Klienti, kde cost > revenue, jsou ztrátovými — buď je třeba zvýšit cenu, nebo přehodnotit scope služeb.\n\nSystém kombinuje billing logs (fakturované hodiny × sazba) s timesheet data (skutečně odpracované hodiny × interní cost rate). Delta = revenue − cost per client per month.\n\nIdentifikace ztrátových klientů je klíčová pro profitabilitu kanceláře.",
    methodology:
      "Profitability analysis: 1) Revenue per client per month (billing logs: hours × rate), 2) Cost per client per month (timesheet × internal_cost_rate + overhead allocation), 3) Profit = revenue − cost, 4) Margin = profit / revenue × 100, 5) Rank clients by margin, 6) Trend: improving or worsening margin.",
    dataInputs: [
      "Billing logs (client_id, hours_billed, rate_per_hour)",
      "Timesheet data (client_id, hours_actual, user_id)",
      "Internal cost rates per user (salary + overhead)",
      "Fixed fee contracts (client_id, monthly_fee)",
    ],
    outputMetrics: [
      "Profit per client per month (CZK)",
      "Margin per client (%)",
      "Loss-making clients count",
      "Total subsidy amount (how much are we losing)",
      "Hours_actual / hours_billed ratio (efficiency)",
    ],
    goodScenario: {
      title: "0 ztrátových klientů",
      description:
        "Všichni klienti mají pozitivní margin. Lowest margin: 12 % (still profitable). Portfolio avg margin: 38 %. Pricing je korektní.",
      indicators: [
        "0 loss-making clients",
        "Lowest margin: 12 %",
        "Portfolio avg margin: 38 %",
        "Hours_actual / hours_billed: 1.1 (minor overdelivery)",
      ],
      actions: [
        "Monitor lowest-margin clients for trend",
        "Annual pricing review",
      ],
    },
    badScenario: {
      title: "4 klienti stojí víc než platí",
      description:
        "4 klienti mají negativní margin. Total monthly loss: 28 000 Kč. Worst: klient X (margin −45 %, subsidy 12 000 Kč/month). Cause: fixed fee set 5 years ago, complexity grew 3×.",
      indicators: [
        "4 loss-making clients (portfolio: 85 total)",
        "Total monthly subsidy: 28 000 Kč",
        "Worst margin: −45 % (client X)",
        "Cause: outdated fixed fee pricing",
      ],
      actions: [
        "Renegociovat ceny u 4 klientů",
        "Připravit cost breakdown pro argumentaci",
        "Nabídnout tiered pricing (basic + premium)",
        "Zvážit ukončení spolupráce pokud odmítnou",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "75 % automatizováno",
    relatedAnalyses: ["23-29", "23-30", "16-01"],
    businessImpact: "Vysoký — profitabilita kanceláře",
    implementationStatus: "Produkce",
  },
  {
    id: "23-32",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Práce přes dovolenou",
    source: "login × absence",
    good: "0 lidí",
    bad: "2 pracují na dovolené — burnout",
    description:
      "Korelace VPN/ERP login logů s absence calendar. Přihlášení do systému v době dovolené signalizuje nedokončenou práci, závislost na jedné osobě (bus factor), nebo burnout. Systém detekuje login events v době deklarované dovolené.\n\nKaždý login na dovolené je flagován s kontextem: duration (quick check vs. full work session), client context, frequency. Opakované logins na dovolené = systémový problém.",
    methodology:
      "Vacation-login correlation: 1) VPN/SSO login events (user_id, timestamp, duration), 2) HR absence calendar (vacation periods per user), 3) Match: login ∩ vacation = flag, 4) Classify: quick_check (< 15min) vs. work_session (> 15min), 5) Aggregate per user per vacation, 6) Trend: increasing = burnout risk.",
    dataInputs: [
      "VPN/SSO login logs (user_id, login_time, session_duration)",
      "HR absence calendar (vacation start/end per user)",
      "ERP access logs (complement to VPN)",
      "Client context during vacation sessions",
    ],
    outputMetrics: [
      "Users with vacation logins per quarter",
      "Total vacation work hours (across team)",
      "Work session vs. quick check ratio",
      "Client context (which clients cause vacation work)",
      "Trend per user (frequency increasing?)",
    ],
    goodScenario: {
      title: "Nikdo nepracuje na dovolené",
      description:
        "0 vacation login events za Q1. Dovolená je skutečně dovolená. Zastupitelnost funguje, práce je předávána.",
      indicators: [
        "0 vacation logins za Q1",
        "All vacation days: 0 system access",
        "Handover process working",
        "No client escalations during vacations",
      ],
      actions: [
        "Pochválit tým za work-life balance",
        "Udržovat handover culture",
      ],
    },
    badScenario: {
      title: "2 pracují na dovolené — burnout riziko",
      description:
        "2 účetní se přihlásili do systému během dovolené celkem 14×. Work sessions: avg 2.5h. Clients: klient X (complex, no backup). Pattern: vacation work increasing quarter-over-quarter.",
      indicators: [
        "2 users with vacation logins",
        "14 login events during vacation (Q1)",
        "Avg session: 2.5h (not quick checks)",
        "Same client: X (no backup assigned)",
      ],
      actions: [
        "Okamžitě přiřadit zástupce pro klienta X",
        "Dialog o workloadu s dotčenými účetními",
        "Implementovat mandatory handover before vacation",
        "Sledovat burnout indikátory (23-46)",
      ],
    },
    frequency: "Kvartálně",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["23-05", "23-46", "23-48"],
    businessImpact: "Střední — employee wellbeing a retention",
    implementationStatus: "Produkce",
  },
  {
    id: "23-33",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "TeamViewer frekvence",
    source: "logy",
    good: "2×/měsíc — autonomní klient",
    bad: "15×/měsíc — bezmocný klient",
    description:
      "Analýza TeamViewer session logů (API) per klient. Vysoká frekvence remote support sessions signalizuje, že klient neumí pracovat s dodanými nástroji — příležitost pro školení nebo zjednodušení. Nízká frekvence = autonomní klient.\n\nSystém parsuje TeamViewer session logs (client_id, duration, topic) a agreguje per client per month. Trend a porovnání s portfolio avg identifikuje outliers.\n\nCommercial insight: high-support clients by měli platit premium, nebo potřebují investici do školení.",
    methodology:
      "TeamViewer API log analysis: 1) GET /sessions — extract per client: session_count, total_duration, topic, 2) Aggregate per client per month, 3) Benchmark: portfolio median sessions/month, 4) Outlier detection (z-score > 2), 5) Trend per client, 6) Topic clustering (NLP on session notes).",
    dataInputs: [
      "TeamViewer session logs (API or local logs)",
      "Client ↔ session mapping (client_id from session metadata)",
      "Session notes/topics (free text)",
      "Billing data (is support included in fee?)",
    ],
    outputMetrics: [
      "Sessions per client per month",
      "Total support hours per client per month",
      "Portfolio percentile (how demanding vs. others)",
      "Topic distribution (what are they calling about)",
      "Trend (increasing = growing dependency)",
    ],
    goodScenario: {
      title: "Autonomní klient — 2× za měsíc",
      description:
        "2 sessions/month, avg 15 min each. Klient zvládá rutinu sám, support pouze pro edge cases. Below portfolio median.",
      indicators: [
        "2 sessions/month (median: 5)",
        "Total support time: 30 min/month",
        "Topics: edge cases only",
        "Trend: decreasing (learning)",
      ],
      actions: [
        "Standard level support",
        "Klient je self-sufficient — low-touch account",
      ],
    },
    badScenario: {
      title: "15× za měsíc — bezmocný klient",
      description:
        "15 sessions/month, avg 45 min each. Total: 11.25h support/month. Topics: basic operations (same questions). Klient nezvládá software — needs training, not support.",
      indicators: [
        "15 sessions/month (3× median)",
        "Total: 11.25h/month support time",
        "Recurring topics: 60 % are same basic questions",
        "No improvement trend (flat 6M)",
      ],
      actions: [
        "Navrhnout formální školení (investice → snížení support)",
        "Vytvořit video tutorial pro opakující se dotazy",
        "Kalkulovat ROI: training cost vs. ongoing support cost",
        "Zvážit premium support pricing pokud školení odmítne",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["23-31", "23-35", "16-02"],
    businessImpact: "Střední — service efficiency a pricing",
    implementationStatus: "Produkce",
  },
  {
    id: "23-34",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Kdo odhalí odchod",
    source: "intuice",
    good: "Systém detekuje dřív",
    bad: "Účetní věděla měsíce ale neřekla",
    description:
      "Meta-analýza: kdo první identifikoval churn risk — automatický systém, nebo člověk? Systém retrospektivně porovnává datum churn prediction alert vs. datum, kdy účetní/management poprvé zmínil riziko odchodu (z CRM notes, meeting minutes).\n\nPokud systém detekuje dříve = funguje. Pokud člověk detekuje dříve ale neescaluje = knowledge retention problém. Pokud nikdo nedetekuje = gap v systému.\n\nTato meta-analýza zlepšuje sám detekční systém — feedback loop.",
    methodology:
      "Retrospective analysis: 1) Identify churned clients (last 24M), 2) Extract system_alert_date (first churn prediction), 3) Extract human_detection_date (first CRM note mentioning risk, NLP search), 4) Compare: system_first vs. human_first, 5) Calculate detection_lead_time (days before actual churn), 6) Analyze false negatives (no detection at all).",
    dataInputs: [
      "Churn prediction logs (alert_date, confidence, client_id)",
      "CRM notes and meeting minutes (full text search for churn keywords)",
      "Actual churn dates (contract_end_date)",
      "Account manager communications (email search)",
    ],
    outputMetrics: [
      "System detection rate (% of churns detected pre-event)",
      "Human detection rate",
      "System lead time (days before churn)",
      "Human lead time",
      "False negative rate (undetected churns)",
    ],
    goodScenario: {
      title: "Systém detekuje dříve než člověk",
      description:
        "Systém detekoval 85 % churns s avg 47 dní lead time. Člověk: 60 % with 22 dní. System outperforms by 25 days. Model works.",
      indicators: [
        "System detection rate: 85 %",
        "System avg lead time: 47 days",
        "Human detection rate: 60 %",
        "Human avg lead time: 22 days",
      ],
      actions: [
        "Trust and act on system alerts",
        "Use human input to improve model (feedback loop)",
      ],
    },
    badScenario: {
      title: "Účetní věděla ale neřekla",
      description:
        "CRM notes show accountant knew about risk 3 months before churn, but never escalated. System detected only 2 weeks before. Knowledge was trapped in individual — not shared.",
      indicators: [
        "Human knew: 90 days before churn",
        "Human escalated: never",
        "System detected: 14 days before",
        "Result: client lost, no intervention attempted",
      ],
      actions: [
        "Implementovat structured churn reporting (monthly questionnaire)",
        "Vytvořit incentives pro early churn reporting",
        "Train on importance of escalation",
        "Improve system model with new signals from this case",
      ],
    },
    frequency: "Kvartálně (retrospective)",
    automationLevel: "60 % automatizováno",
    relatedAnalyses: ["22-01", "22-02", "10-01"],
    businessImpact: "Vysoký — meta-improvement churn detection",
    implementationStatus: "Produkce",
  },
  {
    id: "23-35",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "DocuWare hledání",
    source: "search logy",
    good: "Rychlé nalezení",
    bad: "Stejná informace hledána 12×/rok — chybí KB",
    description:
      "Analýza DocuWare search query logů. Opakované hledání stejné informace signalizuje chybějící knowledge base nebo nedostatečný filing systém. Systém identifikuje frequently searched queries a neúspěšné searches (0 results).\n\nQuery clustering (TF-IDF + cosine similarity) identifikuje tématické clustery opakovaných hledání. Každý cluster s > 3 searches je kandidát na KB článek nebo lepší indexování.\n\nPraktická hodnota: automaticky generované FAQ/KB z reálných search patterns.",
    methodology:
      "Search log analysis: 1) DocuWare search query logs (query_text, user_id, timestamp, results_count), 2) Query clustering: TF-IDF vectorization → cosine similarity → DBSCAN, 3) Frequency per cluster, 4) Zero-result queries analysis, 5) Per-user search patterns, 6) Repeated query detection (same user, same query cluster > 3×/year).",
    dataInputs: [
      "DocuWare search query logs (REST API audit trail)",
      "Search results count per query",
      "User context (who searched)",
      "Document metadata (for understanding what was found/not found)",
    ],
    outputMetrics: [
      "Top 20 repeated query clusters",
      "Zero-result query rate (%)",
      "Searches per user per month (workload proxy)",
      "Time-to-find (query_submit → document_open)",
      "KB article candidates (auto-generated from clusters)",
    ],
    goodScenario: {
      title: "Rychlé nalezení — efektivní DMS",
      description:
        "Avg time-to-find: 12 seconds. Zero-result rate: 3 %. No repeated query clusters > 3×/year. Filing system is effective.",
      indicators: [
        "Time-to-find: 12 sec avg",
        "Zero-result rate: 3 %",
        "No frequent repeated queries",
        "User satisfaction: high (implied)",
      ],
      actions: ["Maintain current filing structure", "Monitor for degradation"],
    },
    badScenario: {
      title: "Stejná informace hledána 12×/rok",
      description:
        "Query cluster 'DPPO sazba 2026 snížení' searched 12× by 4 different users. Zero-result rate: 18 %. Knowledge is not captured — recreated from scratch each time.",
      indicators: [
        "Top cluster: 12× repeated search",
        "Zero-result rate: 18 %",
        "4 different users searching same thing",
        "Estimated wasted time: 6h/year on this one topic",
      ],
      actions: [
        "Create KB article for top repeated queries",
        "Improve DocuWare indexing (add keywords to documents)",
        "Implement auto-suggest based on frequent queries",
        "Set up Slack/email notification for zero-result queries",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["23-03", "23-06", "11-07"],
    businessImpact: "Střední — knowledge management efficiency",
    implementationStatus: "Produkce",
  },
  {
    id: "23-36",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Počasí × platby",
    source: "ČHMÚ × úhrady",
    good: "Žádná korelace",
    bad: "Deštivé pondělky = o 23% horší morálka",
    description:
      "Korelační analýza mezi meteorologickými daty (ČHMÚ API) a platební morálkou klientů. Výzkumy ukazují, že počasí ovlivňuje rozhodování — deštivé dny korelují s horší náladou a pomalejšími rozhodnutími. Systém testuje tuto hypotézu na našich datech.\n\nČHMÚ API poskytuje denní data (teplota, srážky, délka slunečního svitu) per region. Korelace s payment events (platby provedené v daný den) testuje weather effect.\n\nI pokud je efekt malý, může informovat timing upomínek a komunikace.",
    methodology:
      "Weather-payment correlation: 1) ČHMÚ API — daily weather data (temperature, precipitation, sunshine_hours) per client region, 2) Payment events per day per client, 3) Logistic regression: P(payment) = f(weather_vars, day_of_week, due_date_proximity), 4) Test weather coefficient significance, 5) Effect size quantification.",
    dataInputs: [
      "ČHMÚ API — denní meteorologická data per region",
      "Payment events (client_id, payment_date, amount)",
      "Client region (for matching weather station)",
      "Due dates per invoice (for controlling proximity effect)",
    ],
    outputMetrics: [
      "Weather × payment correlation (regression coefficients)",
      "Precipitation effect on payment probability",
      "Temperature effect on payment probability",
      "Best weather conditions for payment collection",
      "Statistical significance of weather effect",
    ],
    goodScenario: {
      title: "Žádná korelace — počasí neovlivňuje",
      description:
        "Regression coefficients for weather variables are not significant (p > 0.1). Weather has no detectable effect on payment behavior. Decision timing is driven by other factors.",
      indicators: [
        "Weather coefficients: p > 0.1 (not significant)",
        "R² improvement from weather: < 0.01",
        "No seasonal weather pattern in payments",
        "Other factors dominant (due_date proximity)",
      ],
      actions: [
        "Do not factor weather into communication timing",
        "Re-test annually (conditions may change)",
      ],
    },
    badScenario: {
      title: "Deštivé pondělky — 23 % horší morálka",
      description:
        "Precipitation on Monday has significant negative effect (p < 0.01). Payment probability drops 23 % on rainy Mondays vs. sunny Mondays. Effect size: medium (Cohen's d = 0.35).",
      indicators: [
        "Rain × Monday: payment probability −23 %",
        "p < 0.01 (significant)",
        "Cohen's d = 0.35 (medium effect)",
        "Consistent across 3 years of data",
      ],
      actions: [
        "Neposílat upomínky v deštivá pondělí",
        "Preferovat slunečné dny pro payment reminders",
        "Informovat team o weather effect",
        "A/B test: weather-timed vs. random reminders",
      ],
    },
    frequency: "Ročně (recalibrace)",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["23-37", "23-07", "22-03"],
    businessImpact: "Nízký — marginální optimalizace komunikace",
    implementationStatus: "Experiment",
  },
  {
    id: "23-37",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Svátky DE × pendleři",
    source: "kalendář",
    good: "Aktivita klesá prediktovatelně",
    bad: "Nečekaný výpadek — klient odjel bez A1",
    description:
      "Korelace německých svátků (Feiertage API — per Bundesland) s aktivitou pendlerů-klientů. Systém predikuje, kdy klient nebude komunikovat (DE svátky) a detekuje neočekávané výpadky mimo svátkový kalendář.\n\nDůležité: Německé svátky se liší per Bundesland (Bayern má víc než ostatní). Systém přiřazuje klientovi relevantní Bundesland a aplikuje správný svátkový kalendář.\n\nNeočekávaný výpadek (mimo svátky + mimo dovolenou) může signalizovat, že klient odjel pracovat do DE bez A1 formuláře — compliance risk.",
    methodology:
      "DE holiday correlation: 1) Feiertage API — GET /api/?jahr={year}&nur_land={bundesland}, 2) Per client: assign bundesland (from work location), 3) Build expected_silence calendar (DE holidays + client vacation), 4) Compare with actual communication pattern, 5) Flag: unexpected silence (not holiday + not vacation), 6) Flag: unexpected activity (during holiday — possible A1 violation).",
    dataInputs: [
      "DE Feiertage API — feiertage-api.de/api/?jahr={year}&nur_land={BW|BY|...}",
      "Client Bundesland assignment",
      "Communication pattern per client (emails, calls, portal)",
      "Client vacation calendar",
      "A1 certificate records (issued/valid/expired)",
    ],
    outputMetrics: [
      "Predicted silence days vs. actual (accuracy)",
      "Unexpected silences (non-holiday, non-vacation gaps)",
      "Unexpected activity during DE holidays",
      "A1 coverage check (working in DE without valid A1?)",
      "Bundesland holiday accuracy (correct assignment?)",
    ],
    goodScenario: {
      title: "Prediktovatelná aktivita",
      description:
        "Communication pattern matches expected calendar perfectly. Silence during Bayern holidays, active otherwise. A1 certificates valid and covering all work periods.",
      indicators: [
        "Prediction accuracy: 95 %",
        "0 unexpected silences",
        "0 unexpected activities during holidays",
        "A1 coverage: 100 %",
      ],
      actions: [
        "Standard monitoring",
        "Pre-renew A1 certificates 30 days before expiry",
      ],
    },
    badScenario: {
      title: "Nečekaný výpadek — odjel bez A1",
      description:
        "Klient was silent for 5 days outside any holiday/vacation. Last A1 expired 2 weeks ago. GPS data (if available) shows DE activity. Client is working in DE without valid A1 — social insurance violation.",
      indicators: [
        "5-day unexpected silence",
        "A1 expired 14 days ago",
        "No vacation recorded",
        "GPS suggests DE activity",
      ],
      actions: [
        "Urgentní kontakt — je klient v DE?",
        "Pokud ano: okamžitě podat žádost o A1",
        "Informovat o riziku (pokuta DE authorities)",
        "Nastavit A1 auto-renewal reminder",
      ],
    },
    frequency: "Týdně",
    automationLevel: "80 % automatizováno",
    relatedAnalyses: ["23-22", "23-24", "13-03"],
    businessImpact: "Vysoký — A1/pendler compliance",
    implementationStatus: "Produkce",
  },
  {
    id: "23-38",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Legislativa × sentiment",
    source: "korelace",
    good: "Klidná reakce",
    bad: "Novela DPH = 400% nárůst dotazů za týden",
    description:
      "Korelace legislativních změn (legislative gazette RSS feed) s klientským sentimentem a communication volume. Systém sleduje publikované novely a měří impact na klientské chování v následujících dnech/týdnech.\n\nRSS feed ze Sbírky zákonů a MFČR je parsován na relevantní legislativní změny (DPH, daně, mzdy, účetnictví). Communication volume per klient per den je korelováno s publication_date.\n\nPomáhá kanceláři připravit se na vlnu dotazů — proaktivní komunikace místo reaktivní.",
    methodology:
      "Legislative impact analysis: 1) RSS/scraping — Sbírka zákonů, MFČR announcements, 2) NLP classification: relevant (daně, účetnictví, mzdy) vs. irrelevant, 3) Communication volume per client per day, 4) Event study: volume_after_publication / volume_before, 5) Client sentiment change post-publication, 6) Predict expected volume surge per legislation type.",
    dataInputs: [
      "Legislative gazette RSS feed (zakonyprolidi.cz, MFČR)",
      "Communication volume per client per day",
      "Client sentiment per day",
      "Historical legislative events + client response (training data)",
    ],
    outputMetrics: [
      "Communication volume surge per legislation event",
      "Sentiment change per legislation event",
      "Response time to surge (how fast we handle the wave)",
      "Most impacted client segments (by industry/size)",
      "Predicted surge for upcoming legislation",
    ],
    goodScenario: {
      title: "Klidná reakce na novelu",
      description:
        "DPH novela published. Communication volume increased only 15 % (expected: 50 %). Kanceláře proaktivní email odeslán den před platností. Klienti klidní, sentiment stable.",
      indicators: [
        "Volume surge: +15 % (below predicted +50 %)",
        "Sentiment: stable (no drop)",
        "Proactive communication sent: yes",
        "0 escalations from clients",
      ],
      actions: [
        "Continue proactive communication strategy",
        "Document template for future similar novely",
      ],
    },
    badScenario: {
      title: "DPH novela = 400 % nárůst dotazů",
      description:
        "DPH novela published Monday. By Friday: +400 % communication volume. Sentiment dropped −0.4. Team overwhelmed — avg response time: 72h (norm: 8h). No proactive communication was sent.",
      indicators: [
        "Volume surge: +400 %",
        "Sentiment drop: −0.4",
        "Response time: 72h (norm: 8h)",
        "No proactive email sent",
      ],
      actions: [
        "Immediately send bulk explanatory email to all affected clients",
        "Prepare FAQ document for the specific novela",
        "Set up legislative monitoring → auto-trigger proactive comms",
        "Post-mortem: why wasn't proactive email sent?",
      ],
    },
    frequency: "Real-time (per publication event)",
    automationLevel: "70 % automatizováno",
    relatedAnalyses: ["19-06", "13-04", "23-07"],
    businessImpact: "Střední — proactive service quality",
    implementationStatus: "Produkce",
  },
  {
    id: "23-39",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Cooling-off time",
    source: "timestamps",
    good: "Odpověď do 24h i po krizi",
    bad: "14 dní ticha po chybě kanceláře",
    description:
      "Měření response time po krizových událostech (naše chyba, nespokojenost, konflikt). Cooling-off time = doba od krizového emailu po první normální interakci. Krátký cooling-off = odolný vztah. Dlouhý = trvalé poškození.\n\nSystém identifikuje krizové události (negative sentiment spike, CAPS email, escalation note v CRM) a měří čas do normalizace komunikace (sentiment > baseline).\n\nKlíčový indikátor resilience vztahu — některé vztahy přežijí krizi za dny, jiné se nikdy nezotaví.",
    methodology:
      "Crisis recovery measurement: 1) Identify crisis event (sentiment < threshold OR caps_detected OR CRM escalation), 2) Track subsequent communication, 3) Calculate recovery_time = first_email_with_sentiment > baseline − crisis_date, 4) Classify: quick_recovery (< 3 days), normal (3-14 days), slow (14-30 days), no_recovery (> 30 days), 5) Korelace s crisis_severity and intervention_type.",
    dataInputs: [
      "Crisis events (sentiment alerts, CAPS detection, CRM escalations)",
      "Post-crisis communication (emails, calls)",
      "Sentiment scores per post-crisis message",
      "Intervention log (what we did to resolve: call, meeting, discount)",
    ],
    outputMetrics: [
      "Average cooling-off time per client",
      "Recovery classification (quick/normal/slow/none)",
      "Korelace intervention_type × recovery_speed",
      "Historical recovery pattern per client",
      "Overall relationship resilience score",
    ],
    goodScenario: {
      title: "Resilientní vztah — odpověď do 24h po krizi",
      description:
        "Po chybě v DPPO kalkulaci: klient odpověděl do 24h, sentiment normalizován za 3 dny. Quick recovery. Relationship strong enough to absorb incidents.",
      indicators: [
        "Cooling-off: 24h (response)",
        "Sentiment normalization: 3 days",
        "Classification: quick_recovery",
        "Historical pattern: 3/3 quick recoveries",
      ],
      actions: [
        "Pokračovat v kvalitní komunikaci",
        "Klient je resilient — relationship health high",
      ],
    },
    badScenario: {
      title: "14 dní ticha po chybě",
      description:
        "Po opakované chybě v DPH: klient neodpovídá 14 dní na žádnou komunikaci. Sentiment before silence: strongly negative. Classification: slow_recovery (borderline no_recovery). Relationship severely damaged.",
      indicators: [
        "Cooling-off: 14 days (and counting)",
        "0 responses to 4 contact attempts",
        "Pre-crisis sentiment: −0.7",
        "Historical: first crisis — no recovery pattern",
      ],
      actions: [
        "Senior partner osobní schůzka (ne email/telefon)",
        "Připravit kompletní nápravu + kompenzaci",
        "Aktivovat retention workflow",
        "Pokud neodpoví do 21 dní: fysická návštěva / dopis",
      ],
    },
    frequency: "Per crisis event (real-time)",
    automationLevel: "80 % automatizováno",
    relatedAnalyses: ["15-04", "23-13", "22-02"],
    businessImpact: "Vysoký — relationship damage control",
    implementationStatus: "Produkce",
  },
  {
    id: "23-40",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Neotevřený report",
    source: "login logy",
    good: "Všechny reporty otevřeny",
    bad: "12 měsíců bez otevření — proč platí?",
    description:
      "Tracking otevření reportů a výstupů doručených klientům přes klientský portál. Systém sleduje, zda klient skutečně otevírá reporty, které pro něj připravujeme. Report nečtený 30+ dní je flag — klient buď nepoužívá portál, nebo nepotřebuje report.\n\nKlienti, kteří platí za službu ale nekonzumují výstupy, jsou paradoxně highest churn risk — nezná hodnotu služby, snadno odejde.\n\nPortal login tracking (session_id, page_views, document_opens) je primární datový zdroj.",
    methodology:
      "Report engagement tracking: 1) Portal document delivery log (report_id, client_id, delivered_date), 2) Portal open log (report_id, client_id, opened_date, view_duration), 3) Calculate: open_rate = opened / delivered per client, 4) Time-to-open: delivered_date → first_open_date, 5) Unread reports: delivered > 30 days ago, opened = false, 6) Trend per client.",
    dataInputs: [
      "Portal document delivery logs",
      "Portal open/view logs (session tracking)",
      "Report metadata (type, importance level)",
      "Client portal login frequency",
    ],
    outputMetrics: [
      "Report open rate per client (%)",
      "Avg time-to-open (days)",
      "Unread reports count per client",
      "Longest unread report age (days)",
      "Portal login frequency per client",
    ],
    goodScenario: {
      title: "Všechny reporty otevřeny",
      description:
        "100 % open rate. Avg time-to-open: 1.5 days. Klient aktivně konzumuje výstupy. Portal login: 8×/month. Engaged client.",
      indicators: [
        "Open rate: 100 %",
        "Time-to-open: 1.5 days",
        "Portal logins: 8/month",
        "0 unread reports",
      ],
      actions: [
        "Continue current report format",
        "Ask for feedback — are reports useful?",
      ],
    },
    badScenario: {
      title: "12 měsíců bez otevření",
      description:
        "0 % open rate za 12 měsíců. 12 reports delivered, 0 opened. Portal login: 0 za 12M. Klient platí za službu ale nevidí hodnotu. Churn risk: very high.",
      indicators: [
        "Open rate: 0 % (12M)",
        "12 unread reports",
        "Portal login: 0 za 12M",
        "Pays full fee despite zero engagement",
      ],
      actions: [
        "Kontaktovat klienta — ví, že má portál?",
        "Přepnout doručování na email (portal nepoužívá)",
        "Prezentovat klíčové insights osobně (ukázat hodnotu)",
        "Retention risk — proaktivně budovat awareness hodnoty",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["17-03", "23-42", "10-01"],
    businessImpact: "Vysoký — engagement a retention",
    implementationStatus: "Produkce",
  },
  {
    id: "23-41",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Chybějící faktura",
    source: "anomálie",
    good: "Pravidelná dodávka",
    bad: "Vždy do 5., tentokrát ne — problém?",
    description:
      "Detekce anomálií v pravidelnosti dodávky dokladů od klienta. Systém buduje expected_delivery_pattern per klient (např. faktury vždy do 5. dne měsíce) a detekuje odchylky. Chybějící expected doklad je flag — klient má buď problém, nebo přestal aktivitu.\n\nPattern je budován z historických dat (min. 6M). Expected_date ± tolerance (default: 3 dny). Missing_document alert po překročení tolerance.\n\nTento signál je silnějším indikátorem problému než absence komunikace — klient může nekomunikovat protože je busy, ale chybějící faktura znamená chybějící byznys.",
    methodology:
      "Delivery pattern anomaly: 1) Build delivery schedule per client (historical: avg delivery_day_of_month ± std), 2) Expected delivery window: avg_day ± max(std, 3 days), 3) Monitor: document received within window? 4) Flag: expected but not received (after window close), 5) Severity: 1 missing = low, 2+ consecutive = high, 6) Korelace s communication pattern.",
    dataInputs: [
      "Document delivery history per client (DocuWare receive_date per doc_type)",
      "Expected delivery schedule (learned from history)",
      "Communication logs (is client responsive?)",
      "Client activity status (active/dormant)",
    ],
    outputMetrics: [
      "Expected delivery date per client per doc_type",
      "Missing documents count per month",
      "Consecutive missing months",
      "Historical delivery reliability per client (%)",
      "Korelace missing_docs × communication_gap",
    ],
    goodScenario: {
      title: "Pravidelná dodávka",
      description:
        "Klient dodává faktury do 5. dne měsíce s 98 % reliability (24/24 měsíců). No missing documents. Predictable and reliable.",
      indicators: [
        "Delivery reliability: 98 %",
        "Avg delivery day: 4th (±1 day)",
        "0 missing documents 24M",
        "Consistent pattern",
      ],
      actions: ["Monitor as standard", "Flag any deviation immediately"],
    },
    badScenario: {
      title: "Vždy do 5., tentokrát ne",
      description:
        "Klient who always delivers by 5th hasn't delivered by 10th. No communication either. Last contact: 3 weeks ago. Pattern break after 18 months of perfect reliability.",
      indicators: [
        "Expected: by 5th, now 10th — missing",
        "18-month reliability: 100 % broken",
        "No communication for 3 weeks",
        "Last contact: routine email (no issues mentioned)",
      ],
      actions: [
        "Kontaktovat klienta — 'čekáme na doklady, je vše OK?'",
        "Prověřit další signály (portal login, payment behavior)",
        "Pokud neodpoví 48h: telefon",
        "Zapsat do CRM jako concern flag",
      ],
    },
    frequency: "Denně",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["23-42", "23-40", "10-01"],
    businessImpact: "Střední — early warning klientského problému",
    implementationStatus: "Produkce",
  },
  {
    id: "23-42",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Měsíc bez kontaktu",
    source: "drop detection",
    good: "Pravidelný kontakt",
    bad: "4 měsíce ticho — tichý odchod",
    description:
      "Communication gap detection — měření doby od posledního kontaktu (email, telefon, portal login, document delivery) s klientem. Threshold > 30 dní je warning, > 60 dní je alert, > 90 dní je critical.\n\nSystém agreguje všechny komunikační kanály (last_email_date, last_call_date, last_portal_login, last_document_received) a bere MAX jako last_contact_date. Days_since_last_contact = today − last_contact_date.\n\nTichý odchod je nejčastější forma churnu u účetních kanceláří — klient prostě přestane komunikovat.",
    methodology:
      "Gap detection: 1) Per client: last_contact_date = MAX(last_email, last_call, last_portal, last_document), 2) days_since_last_contact = current_date − last_contact_date, 3) Severity: 30-60 days = warning, 60-90 = alert, >90 = critical, 4) Compare with client's historical contact_frequency (personalized thresholds), 5) Auto-escalation workflow per severity level.",
    dataInputs: [
      "Email logs (last received email per client)",
      "Daktela call logs (last call per client)",
      "Portal login logs (last login per client)",
      "DocuWare receive logs (last document per client)",
    ],
    outputMetrics: [
      "Days since last contact per client",
      "Severity level (warning/alert/critical)",
      "Historical contact frequency per client (for baseline)",
      "Clients in each severity bucket (count)",
      "Trend: new entries in alert/critical per month",
    ],
    goodScenario: {
      title: "Pravidelný kontakt",
      description:
        "Max gap: 12 days (between monthly reports). All clients contacted within 30 days. 0 warnings, 0 alerts, 0 critical.",
      indicators: [
        "0 clients in warning zone",
        "0 clients in alert zone",
        "0 clients in critical zone",
        "Avg contact frequency: bi-weekly",
      ],
      actions: ["Maintain current contact rhythm", "Monitor dashboard daily"],
    },
    badScenario: {
      title: "4 měsíce ticho — tichý odchod",
      description:
        "Klient: 127 days since last contact (critical). Last email: 4 months ago (routine). No response to 3 follow-ups. Portal: 0 logins. Documents: none received. Classic silent churn pattern.",
      indicators: [
        "127 days since last contact (critical)",
        "3 unanswered follow-up emails",
        "Portal: 0 logins for 4M",
        "0 documents received for 4M",
      ],
      actions: [
        "Osobní telefonát (senior partner, ne junior)",
        "Pokud neodpoví: doporučený dopis",
        "Prověřit ARES — firma ještě existuje?",
        "Připravit exit plan (finální vyúčtování, archivace)",
      ],
    },
    frequency: "Denně",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["23-41", "23-40", "10-01", "22-01"],
    businessImpact: "Kritický — churn detection",
    implementationStatus: "Produkce",
  },
  {
    id: "23-43",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Chybějící pozice",
    source: "peer benchmark",
    good: "Kompletní tým",
    bad: "Nemá controllera — každý peer má",
    description:
      "Peer benchmark: porovnání organizační struktury klienta s obdobnými firmami (same industry, same size). Chybějící typická pozice (controller, HR manager, IT admin) signalizuje buď nedostatečnou organizační zralost, nebo outsourcing příležitost.\n\nSystém agreguje organizační data z payroll (job titles) across portfolio a buduje 'typical structure' per industry × size segment. Klient bez typické pozice je kandidát na naše doplňkové služby.\n\nCommercial insight: pokud klient nemá controllera ale peers mají, nabídnout outsourced controlling.",
    methodology:
      "Organizational peer benchmark: 1) Extract job_title per employee per client (from payroll), 2) Standardize job titles (NLP mapping to standard roles), 3) Build role_frequency per industry × size segment, 4) Compare client roles vs. segment typical roles, 5) Missing roles = gap, 6) Score: gap_count / expected_roles.",
    dataInputs: [
      "Payroll data — job_title per client per employee",
      "Client metadata (industry NACE, employee count, revenue)",
      "Portfolio-wide role frequency database",
      "Standard role mapping dictionary",
    ],
    outputMetrics: [
      "Missing roles per client (vs. segment typical)",
      "Gap score (0-1, higher = more missing roles)",
      "Most commonly missing role per segment",
      "Upsell opportunities (services we could fill the gap)",
      "Client organizational maturity score",
    ],
    goodScenario: {
      title: "Kompletní tým — žádné missing roles",
      description:
        "Klient má všechny typické role pro svůj segment (industry: manufacturing, 50-100 employees). Includes: controller, HR manager, IT admin. Organizational maturity: high.",
      indicators: [
        "0 missing roles vs. segment",
        "Gap score: 0",
        "All typical positions filled",
        "Organizational maturity: high",
      ],
      actions: ["Standard service — no upsell needed", "Annual re-assessment"],
    },
    badScenario: {
      title: "Nemá controllera — peers mají",
      description:
        "Client (manufacturing, 70 employees) lacks controller position. 85 % of peers in same segment have one. Also missing: HR manager (60 % of peers have one). Gap score: 0.4.",
      indicators: [
        "Missing: controller (85 % peers have)",
        "Missing: HR manager (60 % peers have)",
        "Gap score: 0.4 (moderate)",
        "No controlling outputs in last 12M",
      ],
      actions: [
        "Nabídnout outsourced controlling service",
        "Prezentovat peer benchmark data klientovi",
        "Kalkulovat ROI controlling služby",
        "Nabídnout HR administration jako doplňkovou službu",
      ],
    },
    frequency: "Ročně",
    automationLevel: "70 % automatizováno",
    relatedAnalyses: ["16-02", "16-04", "23-31"],
    businessImpact: "Střední — upsell identifikace",
    implementationStatus: "Produkce",
  },
  {
    id: "23-44",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Gap v číselné řadě",
    source: "doklady",
    good: "Kompletní",
    bad: "Chybí 12 dokladů — kam zmizely?",
    description:
      "Rozšířená verze 23-16 (faktury) na VŠECHNY typy dokladů — příjemky, výdejky, pokladní doklady, interní doklady. Systém kontroluje číselnou řadu per typ dokladu per klient. Mezery v jakékoli řadě jsou compliance concern.\n\nDle zákona o účetnictví (§ 11) musí být doklady číslovány průběžně. Mezera v řadě pokladních dokladů je zvlášť critical — může signalizovat nepřiznaný hotovostní příjem.\n\nSystém buduje per-document-type sequence model a reports gaps periodicky.",
    methodology:
      "Universal document number continuity check: 1) Per client per document_type: extract document_numbers, 2) Sort chronologically, 3) Detect gaps (consecutive missing numbers), 4) Risk scoring: gap_size × document_type_risk (cash receipts > invoices > internal), 5) Aggregate: total gaps per client, 6) Trend: new gaps per quarter.",
    dataInputs: [
      "All document numbers per client per type (ERP export)",
      "Document type classification (invoice, receipt, internal, payroll...)",
      "Document type risk weights (cash > bank > internal)",
      "Historical gap data for trend",
    ],
    outputMetrics: [
      "Gaps per document type per client",
      "Risk-weighted gap score",
      "Largest gap per type",
      "Trend: new gaps per quarter",
      "Compliance risk classification (low/medium/high)",
    ],
    goodScenario: {
      title: "Kompletní řady — 0 gaps",
      description:
        "All document types have complete, unbroken sequences. 0 gaps across all types. Perfect record-keeping.",
      indicators: [
        "0 gaps across all document types",
        "All sequences complete and continuous",
        "Risk-weighted score: 0",
        "Clean 12M",
      ],
      actions: ["Standard quarterly check", "Excellent compliance status"],
    },
    badScenario: {
      title: "12 chybějících pokladních dokladů",
      description:
        "12 gaps in cash receipt sequence (PPD-045 to PPD-056 missing). High risk: cash documents. Possible unreported cash income. Also: 3 gaps in internal docs (lower concern).",
      indicators: [
        "12 gaps in cash receipts (highest risk type)",
        "3 gaps in internal documents",
        "Risk-weighted score: 0.85 (high)",
        "Pattern: gaps cluster around month-end",
      ],
      actions: [
        "Urgentně konfrontovat klienta",
        "Požádat o vysvětlení chybějících dokladů",
        "Dokumentovat jako compliance risk",
        "Zvážit odmítnutí zodpovědnosti za neúplné účetnictví",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["23-16", "23-18", "1-07"],
    businessImpact: "Vysoký — zákonná compliance",
    implementationStatus: "Produkce",
  },
  {
    id: "23-45",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Kolektivní nálada",
    source: "interní sentiment",
    good: "Stabilně pozitivní",
    bad: "Propad po restrukturalizaci",
    description:
      "Agregovaný sentiment z interní komunikace kanceláře (Slack, email, meeting notes). Systém měří celkovou náladu týmu a detekuje signifikantní propady, které korelují s událostmi (restrukturalizace, ztráta klíčového klienta, personální změny).\n\nSentiment je měřen per message, agregován per den/týden pro celý tým. Moving average (14 dní) vyhlazuje denní fluktuace. Propad > 2σ je alert.\n\nZdravá kancelář = zdravé klienti. Interní sentiment přímo ovlivňuje kvalitu služby.",
    methodology:
      "Internal sentiment aggregation: 1) Collect internal Slack messages + internal emails (opt-in), 2) NLP sentiment per message, 3) Daily aggregate (weighted by message length), 4) 14-day moving average, 5) Z-score per day (deviation from 90-day rolling mean), 6) Alert: z < −2, 7) Event correlation: link sentiment drops to specific events (CRM).",
    dataInputs: [
      "Internal Slack messages (opt-in, anonymized for individual protection)",
      "Internal emails between team members",
      "Meeting notes and summaries",
      "HR events (hires, departures, restructuring)",
    ],
    outputMetrics: [
      "Team sentiment index (daily, weekly)",
      "14-day moving average",
      "Z-score per day",
      "Event correlation (sentiment drop ↔ specific event)",
      "Individual variance (optional, anonymized)",
    ],
    goodScenario: {
      title: "Stabilně pozitivní nálada",
      description:
        "Team sentiment index: 0.65 (positive). 14-day MA stable. No z-drops below −1 for 6M. Team is healthy and engaged.",
      indicators: [
        "Sentiment index: 0.65 (positive zone)",
        "Z-score: all within ±1 for 6M",
        "No event-triggered drops",
        "Low variance across team",
      ],
      actions: ["Maintain current culture", "Quarterly team health check"],
    },
    badScenario: {
      title: "Propad po restrukturalizaci",
      description:
        "Sentiment index dropped from 0.65 to 0.15 after restructuring announcement. Z-score: −3.2. Duration: 3 weeks and not recovering. Risk: increased errors, decreased service quality, potential departures.",
      indicators: [
        "Sentiment drop: 0.65 → 0.15",
        "Z-score: −3.2 (severe)",
        "Duration: 3 weeks (no recovery)",
        "Correlated event: restructuring (announced 3 weeks ago)",
      ],
      actions: [
        "Management transparent communication — address concerns",
        "1:1 meetings with each team member",
        "Increased monitoring of service quality (errors, response time)",
        "Consider slowing restructuring pace",
      ],
    },
    frequency: "Denně",
    automationLevel: "75 % automatizováno",
    relatedAnalyses: ["23-46", "23-30", "23-48"],
    businessImpact: "Vysoký — team health → service quality",
    implementationStatus: "Pilot",
  },
  {
    id: "23-46",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Burnout index",
    source: "chyby × přesčasy",
    good: "Index 12 — zdravý",
    bad: "Index 78 — kritické vyhoření",
    description:
      "Composite burnout index per zaměstnanec vypočítaný z: error rate, overtime hours, vacation usage, sick days, communication sentiment, response time degradation. Index 0-100 where 0 = healthy, 100 = critical burnout.\n\nKaždá dimenze je normalizována na 0-1 škálu a vážena. Weights: overtime (0.25), error_rate_trend (0.20), sick_days_trend (0.15), vacation_unused (0.15), sentiment_decline (0.15), response_time_increase (0.10).\n\nIndex > 60 = concern, > 80 = intervention needed.",
    methodology:
      "Burnout composite index: 1) Collect per user: overtime_hours, error_rate, sick_days, unused_vacation, sentiment_trend, response_time_trend, 2) Normalize each to 0-1 (min-max per portfolio), 3) Weighted sum: index = Σ(weight_i × norm_i), 4) Scale to 0-100, 5) Thresholds: < 30 = healthy, 30-60 = watch, 60-80 = concern, > 80 = critical.",
    dataInputs: [
      "Overtime hours per user (HR/timesheet system)",
      "Error rate per user (audit trail — 23-30)",
      "Sick days per user (HR)",
      "Unused vacation days per user (HR)",
      "Internal sentiment per user (23-45, anonymized opt-in)",
      "Response time per user (email/task response times)",
    ],
    outputMetrics: [
      "Burnout index per user (0-100)",
      "Burnout classification (healthy/watch/concern/critical)",
      "Dominant contributing factor per user",
      "Trend: index trajectory (improving/worsening)",
      "Team average burnout index",
    ],
    goodScenario: {
      title: "Burnout index 12 — zdravý",
      description:
        "Index: 12 (healthy zone). All dimensions in normal range. Employee takes regular vacation, has low overtime, low error rate, positive sentiment.",
      indicators: [
        "Burnout index: 12/100 (healthy)",
        "Overtime: 2h/month (low)",
        "Error rate: 0.3 % (excellent)",
        "Vacation used: 90 % (healthy)",
      ],
      actions: ["Maintain current workload", "Quarterly re-assessment"],
    },
    badScenario: {
      title: "Burnout index 78 — kritické",
      description:
        "Index: 78 (concern, approaching critical). Dominant factors: overtime 25h/month (weight: 0.25 × 0.9 = 0.225), error_rate_trend +0.5 %/month (weight: 0.20 × 0.8 = 0.16), unused vacation 15 days (weight: 0.15 × 0.75 = 0.11). Intervention needed.",
      indicators: [
        "Burnout index: 78/100 (concern/critical boundary)",
        "Overtime: 25h/month",
        "Error rate trend: +0.5 %/month (worsening)",
        "15 unused vacation days",
      ],
      actions: [
        "Okamžitě redistribuovat workload",
        "Naplánovat dovolenou (minimálně 5 dní)",
        "1:1 meeting s manažerem — identifikovat stresory",
        "Sledovat index po intervenci (weekly)",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "80 % automatizováno",
    relatedAnalyses: ["23-30", "23-32", "23-45"],
    businessImpact: "Vysoký — employee retention a service quality",
    implementationStatus: "Produkce",
  },
  {
    id: "23-47",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Graf vzájemné podpory",
    source: "kdo komu pomáhá",
    good: "Hustá síť — spolupráce",
    bad: "3 izolovaní jedinci — knowledge silos",
    description:
      "Grafová analýza interních help-request patterns: kdo komu pomáhá? Systém buduje directed graph z interních komunikací (Slack mentions, forwarded emails, shared task assignments) a měří network density a isolated nodes.\n\nHustá síť = zdravá spolupráce. Isolated nodes = knowledge silos. Central nodes = potential bus factor. Graph je analyzován standardními network metrics (degree, betweenness, clustering coefficient).\n\nPrakticky: pokud Alice nikdy nepomáhá nikomu a nikdo nepomáhá jí, buď je self-sufficient (good) nebo isolated (bad).",
    methodology:
      "Help network analysis: 1) Parse internal Slack mentions (@user + question context), 2) Forwarded email detection (Fwd: + CC additions), 3) Shared task assignments (ERP task forwarding), 4) Build directed graph: helper → helpee (weighted by frequency), 5) Metrics: degree centrality, betweenness, clustering coefficient, isolates, 6) Identify: hubs (helpers), isolates (neither help nor get help).",
    dataInputs: [
      "Slack message logs (mentions, threads, channels)",
      "Internal email forwarding patterns",
      "ERP task assignment/forwarding logs",
      "Team member list and roles",
    ],
    outputMetrics: [
      "Network density (0-1, higher = more collaboration)",
      "Isolated nodes (users with 0 help connections)",
      "Hub nodes (top helpers — potential bus factor)",
      "Clustering coefficient (subgroup formation)",
      "Graph visualization (force-directed layout)",
    ],
    goodScenario: {
      title: "Hustá síť — zdravá spolupráce",
      description:
        "Network density: 0.72 (high). 0 isolated nodes. Everyone both gives and receives help. No single hub dominates (max betweenness: 0.18). Healthy, collaborative team.",
      indicators: [
        "Network density: 0.72",
        "0 isolates",
        "Max betweenness: 0.18 (no single hub)",
        "Avg clustering: 0.65 (strong subgroups)",
      ],
      actions: [
        "Maintain collaborative culture",
        "Use graph to identify mentoring pairs",
      ],
    },
    badScenario: {
      title: "3 izolovaní jedinci — knowledge silos",
      description:
        "3 team members are isolated (0 help connections both in and out). They neither ask for help nor provide it. Knowledge is siloed. If any leaves, their clients' knowledge is lost.",
      indicators: [
        "3 isolates (out of 12 team members)",
        "Network density: 0.35 (low)",
        "1 dominant hub (betweenness 0.45 — single point of failure)",
        "Clustering: 0.25 (weak subgroups)",
      ],
      actions: [
        "Pair isolated members with mentors",
        "Implement cross-training program",
        "Create knowledge sharing sessions (weekly)",
        "Redistribute workload to create natural collaboration needs",
      ],
    },
    frequency: "Kvartálně",
    automationLevel: "70 % automatizováno",
    relatedAnalyses: ["23-48", "14-05", "23-45"],
    businessImpact: "Střední — knowledge management a resilience",
    implementationStatus: "Produkce",
  },
  {
    id: "23-48",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Bus factor",
    source: "exkluzivní tickety",
    good: "Min. 3 lidé umí vše",
    bad: "1 člověk — zítra může chybět",
    description:
      "Bus factor analýza: kolik lidí umí zpracovat daného klienta / daný typ úkolu? Systém analyzuje task assignment history — pokud klient X byl VŽDY zpracován výhradně účetním A (nikdy nikým jiným), bus factor = 1. Pokud A onemocní, nikdo nezná specifika klienta X.\n\nMetrika: per klient × task_type → unique_handlers count. Bus factor = min(unique_handlers) across task_types per client.\n\nCíl: bus factor >= 3 per client (primární + 2 backup).",
    methodology:
      "Bus factor calculation: 1) Task history per client: extract handler_user_id per task per period, 2) Count unique handlers per client per task_type, 3) Bus factor = MIN(unique_handlers) across task_types, 4) Identify: exclusive handlers (only person who ever handled a task_type for client), 5) Risk ranking: clients by bus factor (ascending).",
    dataInputs: [
      "ERP task assignment history (client_id, task_type, handler_user_id, date)",
      "User absence data (for impact estimation)",
      "Client complexity score (higher complexity = higher risk)",
      "Knowledge documentation status per client",
    ],
    outputMetrics: [
      "Bus factor per client (minimum unique handlers)",
      "Exclusive handler pairs (user → client, no backup)",
      "Clients with bus factor = 1 (highest risk)",
      "Team bus factor distribution",
      "Estimated impact if top exclusive handler absent 2 weeks",
    ],
    goodScenario: {
      title: "Bus factor >= 3 — resilient",
      description:
        "All clients have bus factor >= 3. Each client has been handled by at least 3 different accountants in the past 12M. If any person is absent, 2 backups exist.",
      indicators: [
        "Min bus factor: 3 (across all clients)",
        "0 exclusive handler pairs",
        "Cross-training complete",
        "Documentation up-to-date per client",
      ],
      actions: ["Maintain rotation schedule", "Annual cross-training refresh"],
    },
    badScenario: {
      title: "1 člověk — zítra může chybět",
      description:
        "12 clients have bus factor = 1. All exclusively handled by accountant Marie. If Marie is absent, 12 clients have zero coverage. Marie handles 35 % of all tickets — massive concentration risk.",
      indicators: [
        "12 clients with bus factor = 1",
        "All tied to Marie (single person)",
        "Marie: 35 % of all tickets",
        "0 knowledge documentation for 8 of 12 clients",
      ],
      actions: [
        "Immediately start cross-training backup for Marie's clients",
        "Document Marie's client specifics (knowledge capture)",
        "Create rotation plan — Marie + backup alternate quarterly",
        "Priority: document top 5 highest-revenue clients first",
      ],
    },
    frequency: "Kvartálně",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["23-47", "14-05", "23-32"],
    businessImpact: "Kritický — operational resilience",
    implementationStatus: "Produkce",
  },
  {
    id: "23-49",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "AI Act / ViDA zmínky",
    source: "hovory",
    good: "Klient se ptá — premium",
    bad: "Nikdo se neptá — budou překvapeni",
    description:
      "Keyword detection v Daktela call transcripts a emailech pro strategicky relevantní regulační témata (AI Act, ViDA — VAT in the Digital Age, IFRS updates, DAC7, CBAM). Klienti, kteří se ptají na budoucí regulace, jsou premium — proaktivní a investují do compliance.\n\nKlienti, kteří se neptají, potřebují edukaci — jsou potenciálně ohroženi regulací, o které nevědí.\n\nSystém slouží i jako trigger pro proaktivní poradenství — jakmile detekuje keyword u jednoho klienta, nabídne edukaci všem relevantním.",
    methodology:
      "Keyword detection: 1) Daktela call transcript search (ASR output), 2) Email body full-text search, 3) Keyword dictionary: {AI_Act, ViDA, DAC7, CBAM, IFRS_16, IFRS_17, digitální_daň, KYC, AML_6}, 4) Per client: mention_count per keyword per quarter, 5) Segment: proactive (mentions > 0) vs. silent (mentions = 0), 6) Portfolio-wide: which topics are trending.",
    dataInputs: [
      "Daktela call transcripts (ASR/AI transcription)",
      "Email corpus per client (full text)",
      "Keyword dictionary (regulatory topics)",
      "Client industry data (for relevance scoring)",
    ],
    outputMetrics: [
      "Keyword mentions per client per quarter",
      "Proactive clients count (mentioned at least 1 keyword)",
      "Silent clients count (0 mentions, but relevant industry)",
      "Trending topics (portfolio-wide keyword frequency)",
      "Relevance score per client per topic (industry match)",
    ],
    goodScenario: {
      title: "Klient se ptá na AI Act",
      description:
        "Klient zmínil AI Act ve 3 hovorech za Q1. Also asked about ViDA and DAC7. Proactive, forward-thinking client. Premium consulting opportunity.",
      indicators: [
        "3 AI Act mentions in Q1",
        "Also: ViDA (2), DAC7 (1)",
        "Classification: proactive",
        "Industry relevance: high (IT services)",
      ],
      actions: [
        "Nabídnout AI Act compliance konzultaci",
        "Připravit personalized briefing na ViDA/DAC7",
        "Pozice: 'strategic advisor, not just accountant'",
        "Premium pricing justified by proactive engagement",
      ],
    },
    badScenario: {
      title: "Nikdo se neptá — budou překvapeni",
      description:
        "75 % klientů v IT sektoru: 0 mentions of AI Act (highly relevant for them). They will be impacted but are unaware. Our role: educate proactively.",
      indicators: [
        "75 % relevant clients: 0 keyword mentions",
        "AI Act effective date: 12 months away",
        "Industry relevance: high (but awareness: zero)",
        "Competitor positioning: some already offering AI Act advisory",
      ],
      actions: [
        "Připravit AI Act briefing pro IT klienty",
        "Odeslat proaktivní email/newsletter",
        "Nabídnout compliance assessment workshop",
        "First-mover advantage: nabídnout dřív než konkurence",
      ],
    },
    frequency: "Kvartálně",
    automationLevel: "80 % automatizováno",
    relatedAnalyses: ["23-50", "23-51", "19-06"],
    businessImpact: "Střední — strategic positioning a upsell",
    implementationStatus: "Produkce",
  },
  {
    id: "23-50",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "IFRS 16 dotazy",
    source: "komunikace",
    good: "Proaktivní — ideální konzultace",
    bad: "Ignoruje — bude mít problém",
    description:
      "Specifická detekce dotazů na IFRS 16 (Leases) a další IFRS standardy v komunikaci s klienty. IFRS adoption v CZ je growing trend (zejména pro firmy s mezinárodními matkami). Klient, který se ptá = potential premium consulting client.\n\nSystém detekuje zmínky IFRS (IFRS 16, IFRS 15, IFRS 9) a kontextualizuje — ptá se klient obecně (awareness stage) nebo specificky (implementation stage)?\n\nTéma analýzy komunikace rozšiřuje na všechny strategické konzultační příležitosti.",
    methodology:
      "Communication topic analysis: 1) Full-text search: IFRS patterns (IFRS\\s*\\d+, IAS\\s*\\d+), 2) Context classification: general_question vs. specific_implementation, 3) Per client: topic_engagement_level (none/aware/implementing), 4) Cross-reference with client profile (international parent? audit requirement?), 5) Consulting opportunity scoring.",
    dataInputs: [
      "Email corpus per client",
      "Daktela call transcripts",
      "Client profile (parent company, audit requirements)",
      "Service portfolio (do we offer IFRS consulting?)",
    ],
    outputMetrics: [
      "IFRS mention count per client",
      "Engagement level classification (none/aware/implementing)",
      "Clients with international parent (IFRS likely mandatory)",
      "Consulting opportunity score per client",
      "Total addressable market for IFRS service in portfolio",
    ],
    goodScenario: {
      title: "Proaktivní klient — IFRS consulting opportunity",
      description:
        "Client asked specific IFRS 16 implementation questions (2 emails, 1 call). Has international parent requiring IFRS reporting. Ready for consulting engagement.",
      indicators: [
        "3 IFRS 16 mentions (specific implementation questions)",
        "International parent: yes (German AG)",
        "Audit requirement: yes (mandatory IFRS)",
        "Engagement level: implementing",
      ],
      actions: [
        "Nabídnout IFRS 16 implementation project",
        "Připravit proposal s scope a pricing",
        "Connect with IFRS specialist (internal/external)",
        "Premium engagement opportunity: 200K+ CZK project",
      ],
    },
    badScenario: {
      title: "Ignoruje IFRS — bude mít problém",
      description:
        "Client has German parent requiring IFRS, but 0 IFRS mentions in communication. Likely unaware of obligation or postponing. Audit risk: non-compliance with parent's requirements.",
      indicators: [
        "0 IFRS mentions (awareness: none)",
        "International parent: German AG (requires IFRS)",
        "Upcoming audit: Q4 2026",
        "No IFRS adjustments in current reporting",
      ],
      actions: [
        "Proaktivně informovat o IFRS povinnosti",
        "Nabídnout gap analysis (current vs. IFRS required)",
        "Varovat před audit riskem",
        "Urgence: Q4 audit → start ASAP",
      ],
    },
    frequency: "Kvartálně",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["23-49", "23-51", "19-06"],
    businessImpact: "Střední — premium consulting opportunity",
    implementationStatus: "Produkce",
  },
  {
    id: "23-51",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "«Moc papírování»",
    source: "stížnosti",
    good: "0 stížností",
    bad: "Opakovaně — target pro automatizaci",
    description:
      "Sentiment-aware keyword detection pro stížnosti na administrativní zátěž. Variace: 'moc papírování', 'složité', 'zbytečná byrokracie', 'proč to nemůže být jednodušší', 'zase formulář'. Systém detekuje frustraci s procesem, ne s naší službou.\n\nKlienti, kteří si stěžují na papírování, jsou ideální kandidáti pro automatizační služby (document upload portal, OCR, auto-classification). Stížnost = sales opportunity.\n\nSystém klasifikuje stížnosti do kategorií: paperwork, complexity, speed, cost, communication.",
    methodology:
      "Complaint detection: 1) Keyword + sentiment combined search (keywords IN negative context), 2) Keywords: papírování, papíry, formuláře, byrokracie, složité, zbytečné, administrativa, 3) Sentiment filter: only negative context (exclude neutral mentions), 4) Categorize: paperwork_complaint, complexity_complaint, speed_complaint, 5) Aggregate per client, 6) Automation opportunity scoring.",
    dataInputs: [
      "Email corpus per client (full text + sentiment)",
      "Daktela call transcripts + sentiment",
      "Complaint keyword dictionary (Czech + Slovak variations)",
      "Client's current service level (basic/standard/premium/digital)",
    ],
    outputMetrics: [
      "Complaint count per client per category",
      "Automation opportunity score per client",
      "Current digitalization level vs. complaint frequency",
      "Most complained-about process (per portfolio)",
      "Revenue opportunity from automation upsell",
    ],
    goodScenario: {
      title: "0 stížností na administrativu",
      description:
        "Client: 0 paperwork complaints in 12M. Uses digital portal, uploads documents electronically. Happy with process efficiency.",
      indicators: [
        "0 paperwork complaints",
        "Digital service level: premium",
        "Portal usage: active (weekly)",
        "Satisfaction: high",
      ],
      actions: [
        "Use as reference for automation benefits",
        "Maintain service level",
      ],
    },
    badScenario: {
      title: "Opakované stížnosti — automatizační příležitost",
      description:
        "Client complained about paperwork 7× in 6M. Phrases: 'zase papíry', 'proč to nejde elektronicky', 'v roce 2026 stále tiskneme'. Currently on basic (paper) service level. Clear automation upsell target.",
      indicators: [
        "7 paperwork complaints in 6M",
        "Current level: basic (paper)",
        "Recurring phrases: 'proč elektronicky ne?'",
        "Frustration trend: increasing",
      ],
      actions: [
        "Nabídnout digital upgrade balíček",
        "Připravit ROI kalkulaci (time saved + cost)",
        "Demo klientského portálu",
        "Pricing: premium tier s digitalizací included",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["23-06", "23-52", "16-02"],
    businessImpact: "Střední — upsell a customer satisfaction",
    implementationStatus: "Produkce",
  },
  {
    id: "23-52",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "Teplocitlivé účtenky",
    source: "typy dokladů",
    good: "Digitální doklady",
    bad: "Stále papír — digitální negramotnost",
    description:
      "Detekce podílu teplocitlivých (thermal) účtenek v dokladové agendy klienta. Thermal receipts fade over time — long-term archival risk. Systém detekuje thermal receipts z: 1) OCR quality score (thermal prints have specific characteristics), 2) Document age vs. readability degradation.\n\nVysoký podíl thermal receipts = klient preferuje papírové doklady = digitální negramotnost / malé podniky / gastro/retail.\n\nRiziko: thermal receipts older than 2 years may be unreadable → archival compliance risk (§ 31 ZoÚ — 5 year retention).",
    methodology:
      "Thermal receipt detection: 1) OCR confidence score distribution (thermal: lower, inconsistent), 2) Document classification: thermal_receipt vs. printed_invoice vs. digital_pdf, 3) Thermal ratio: thermal_receipts / total_receipts per client, 4) Age × readability check: OCR score of old thermal receipts, 5) Archival risk scoring.",
    dataInputs: [
      "DocuWare documents with OCR metadata (confidence scores)",
      "Document classification (type: receipt, invoice, etc.)",
      "Document age (received_date)",
      "OCR re-scan results for older documents",
    ],
    outputMetrics: [
      "Thermal receipt ratio per client (%)",
      "Archival risk: unreadable receipts count",
      "Digitalization score (% digital vs. paper)",
      "Trend: thermal ratio over time (decreasing = improving)",
      "Estimated archival cost (re-scanning degraded receipts)",
    ],
    goodScenario: {
      title: "Digitální doklady — 0 thermal",
      description:
        "Client: 100 % digital documents (PDF invoices, digital receipts). 0 thermal receipts. Archival risk: zero. Modern, digitally literate client.",
      indicators: [
        "Thermal ratio: 0 %",
        "Digitalization: 100 %",
        "Archival risk: none",
        "All documents: long-term readable",
      ],
      actions: [
        "Maintain digital workflow",
        "Use as case study for paper-to-digital migration",
      ],
    },
    badScenario: {
      title: "85 % thermal receipts — archival risk",
      description:
        "Client: 85 % thermal receipts (gastro/retail business). 23 receipts from 2024 already partially unreadable (OCR confidence < 40 %). 5-year retention requirement not met for these.",
      indicators: [
        "Thermal ratio: 85 %",
        "23 partially unreadable receipts (2024)",
        "OCR confidence < 40 % on degraded receipts",
        "Archival compliance risk: HIGH",
      ],
      actions: [
        "Urgentně naskenovat/vyfotit degradující receipts",
        "Navrhnout přechod na digitální pokladnu",
        "Educate: thermal receipts + zákon o účetnictví",
        "Nabídnout document management service",
      ],
    },
    frequency: "Kvartálně",
    automationLevel: "80 % automatizováno",
    relatedAnalyses: ["23-06", "23-51", "23-14"],
    businessImpact: "Střední — archival compliance a upsell",
    implementationStatus: "Produkce",
  },
  {
    id: "23-53",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "První datovka",
    source: "detekce",
    good: "Používá datovku 3+ roky",
    bad: "Poprvé — generační zlom v řízení",
    description:
      "Detekce prvního použití datové schránky (datovka) klientem. Pro firmy, které historicky nepoužívaly datovku (e.g., vše přes poštu), je první datovka signálem generační změny v řízení — nový management, digitalizace, nebo zákonná povinnost.\n\nSystém sleduje prvni_datovka_date per client z komunikačních logů (příchozí zprávy z ISDS). Nový datovka uživatel = event pro account managera.\n\nKontext: od 2023 povinná datovka pro právnické osoby — ale mnozí ignorují. První skutečné použití (ne jen aktivace) je milestone.",
    methodology:
      "First datovka detection: 1) ISDS communication logs — first message from client via datovka, 2) Compare with historical communication channels per client, 3) If first_datovka_date is recent (< 6M): flag as 'first-time datovka user', 4) Korelace s management changes (new contact person?), 5) Alert account manager.",
    dataInputs: [
      "ISDS/datovka message logs (sender_id, date, subject)",
      "Client communication history (channels used historically)",
      "Client contact person changes (CRM)",
      "Datovka activation date vs. first actual message date",
    ],
    outputMetrics: [
      "First datovka date per client",
      "Time since datovka activation vs. first use",
      "Channel evolution per client (paper → email → datovka)",
      "Correlation with management change",
      "Clients still not using datovka (despite obligation)",
    ],
    goodScenario: {
      title: "Zkušený uživatel datovky — 3+ roky",
      description:
        "Client has been using datovka for 5+ years. Regular usage (monthly). Comfortable with digital communication. Digitally mature.",
      indicators: [
        "Datovka usage: 5+ years",
        "Monthly message frequency",
        "No paper correspondence for 3+ years",
        "Digital maturity: high",
      ],
      actions: [
        "Standard digital communication",
        "No special attention needed",
      ],
    },
    badScenario: {
      title: "První datovka — generační zlom",
      description:
        "Client's first datovka message received 3 weeks ago. Previously: only paper and email. Coincides with new contact person (son of founder). Generational leadership change in progress.",
      indicators: [
        "First datovka: 3 weeks ago",
        "Previous channels: paper + email only",
        "New contact person: son of founder",
        "Multiple digital first events in parallel",
      ],
      actions: [
        "Proaktivně přivítat digitální posun",
        "Nabídnout digitální upgrade služeb",
        "Představit se novému kontaktu (synovi)",
        "Mapovat nové potřeby nového vedení",
      ],
    },
    frequency: "Týdně",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["13-06", "18-01", "23-54"],
    businessImpact: "Střední — relationship management a upsell",
    implementationStatus: "Produkce",
  },
  {
    id: "23-54",
    sectionId: 23,
    sectionTitle: "Skryté signály — co tam je, ale nikoho nenapadne to hledat",
    name: "«Odesláno z iPhonu»",
    source: "podpisy",
    good: "Desktop — kancelář",
    bad: "Vždy iPhone — rozhoduje na cestách",
    description:
      "Detekce device signature v emailech klienta. 'Odesláno z iPhonu' / 'Sent from my iPad' / 'Sent from Samsung Galaxy' v email footer signalizuje mobilní komunikaci. Klient, který vždy odpovídá z mobilu, rozhoduje na cestách — kratší pozornost, rychlejší (ale méně promyšlená) rozhodnutí.\n\nSystém parsuje email footer/signature pro known mobile signatures a User-Agent header (pokud dostupný). Per-client mobile_ratio = mobile_emails / total_emails.\n\nPraktické využití: pro mobile-first klienty zjednodušit komunikaci (kratší emaily, bullet points, mobile-friendly reporty).",
    methodology:
      "Device detection: 1) Parse email body — last 5 lines for known mobile signatures ('Odesláno z', 'Sent from my', 'Get Outlook for'), 2) Parse email User-Agent header (if present), 3) Classify: desktop / mobile / tablet / unknown, 4) Mobile ratio: mobile_emails / total per client, 5) Trend: increasing mobile usage, 6) Response time × device correlation.",
    dataInputs: [
      "Email body text — last 5 lines (signature/footer)",
      "Email headers — User-Agent, X-Mailer (if available)",
      "Known mobile signature dictionary",
      "Response time per email (for device correlation)",
    ],
    outputMetrics: [
      "Mobile ratio per client (%)",
      "Device distribution (desktop/mobile/tablet)",
      "Response time × device (faster on mobile?)",
      "Trend: mobile ratio increasing over time?",
      "Time-of-day × device (mobile at night/weekend?)",
    ],
    goodScenario: {
      title: "Desktop — kancelářový komunikátor",
      description:
        "Client: 92 % desktop emails. Responds from office during business hours. Detailed, thorough responses. Desktop-optimized communication works well.",
      indicators: [
        "Mobile ratio: 8 % (occasional travel)",
        "Primary device: desktop (Outlook)",
        "Response hours: 9-17 weekdays",
        "Avg email length: 150+ words (thoughtful)",
      ],
      actions: [
        "Standard communication format (detailed, attached reports)",
        "Desktop-optimized portal",
      ],
    },
    badScenario: {
      title: "Vždy iPhone — mobile-first rozhodovatel",
      description:
        "Client: 87 % mobile emails ('Odesláno z iPhonu'). Responds at all hours (23:00, weekends). Short responses (avg 12 words). Makes quick decisions but may miss details in long emails/reports.",
      indicators: [
        "Mobile ratio: 87 %",
        "Primary device: iPhone",
        "Response hours: distributed (no clear business hours)",
        "Avg email length: 12 words (very brief)",
      ],
      actions: [
        "Přizpůsobit komunikaci: krátké emaily, bullet points",
        "Mobile-friendly report formát (key takeaways first)",
        "Pro důležitá rozhodnutí: telefonát, ne email",
        "Klíčové info v prvních 2 větách (above the fold on mobile)",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["17-04", "23-53", "15-01"],
    businessImpact: "Nízký — komunikační optimalizace",
    implementationStatus: "Produkce",
  },
];
