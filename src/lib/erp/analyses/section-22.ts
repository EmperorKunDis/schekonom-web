import type { AnalysisDetail } from "./types";

export const section22Analyses: AnalysisDetail[] = [
  {
    id: "22-01",
    sectionId: 22,
    sectionTitle: "Prediktivní vrstva",
    name: "Kdy klient odejde",
    source: "ML",
    good: "0% riziko odchodu",
    bad: "87% pravděpodobnost odchodu do 60 dní",
    description:
      "Hlavní prediktivní model kombinující všechny dostupné signály do jedné predikce: kdy klient odejde. Model integruje data z komunikace, financí, behaviorálních signálů a externích zdrojů.\n\nNa rozdíl od churn prediction (10-01), který predikuje pravděpodobnost, tento model predikuje timing — konkrétní období, kdy k odchodu s největší pravděpodobností dojde. To umožňuje přesné načasování intervence.\n\nModel je validován na historických datech a dosahuje mediánové chyby 12 dní (predikovaný vs. skutečný odchod).",
    methodology:
      "Survival analysis (Cox proportional hazards) + deep learning: 1) Feature engineering z 200+ analýz, 2) Survival function per klient, 3) Hazard rate estimation, 4) Expected time to churn, 5) Confidence interval, 6) Optimal intervention window.",
    dataInputs: [
      "Výstupy všech ostatních analýz (200+)",
      "Historická data o odchodech",
      "Seasonality patterns",
      "External events calendar",
    ],
    outputMetrics: [
      "Predikovaný datum odchodu",
      "Confidence interval",
      "Hazard rate",
      "Optimal intervention window",
      "Expected retention probability s/bez intervence",
    ],
    goodScenario: {
      title: "Klient zůstává",
      description:
        "Hazard rate blízko nule. Klient je stabilní, spokojený a loajální. Žádný prediktivní signál nenaznačuje odchod v horizontu 12 měsíců.",
      indicators: [
        "Hazard rate 0.02",
        "0 % pravděpodobnost odchodu 12M",
        "Všechny signály pozitivní",
        "CLV rostoucí",
      ],
      actions: [
        "Investovat do vztahu",
        "Nabídnout long-term smlouvu se slevou",
        "Požádat o referenci",
      ],
    },
    badScenario: {
      title: "Odchod za 60 dní",
      description:
        "Model predikuje 87 % pravděpodobnost odchodu v horizontu 60 dní (CI: 45–75 dní). Hlavní faktory: zmínka konkurence, propad sentimentu, zpomalení plateb.",
      indicators: [
        "87 % pravděpodobnost odchodu",
        "Predikovaný čas: 60 dní (±15)",
        "3 silné prediktory",
        "Revenue at risk: 480K/rok",
      ],
      actions: [
        "Okamžitá intervence — osobní schůzka do 7 dní",
        "Připravit retention nabídku",
        "Identifikovat a adresovat root cause",
        "Zapojit senior management",
      ],
    },
    frequency: "Denně",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["22-02", "22-03", "10-01", "7-01"],
    businessImpact: "Kritický — timing je klíčový pro úspěšnou retenci",
    implementationStatus: "Produkce",
  },
  {
    id: "22-02",
    sectionId: 22,
    sectionTitle: "Prediktivní vrstva",
    name: "Co ho zachrání",
    source: "uplift modeling",
    good: "Klient stabilní — nepotřeba",
    bad: "Osobní schůzka + sleva 10% = 64% šance na udržení",
    description:
      "Uplift model predikující, jaká intervence má nejvyšší šanci zachránit ohrožený klientský vztah. Na rozdíl od standardního churn modelu (22-01), který predikuje KDY odejde, tento model predikuje CO pomůže.\n\nModel porovnává treatment effect různých intervencí: osobní schůzka, cenová sleva, upgrade služby, změna account managera, executive engagement. Pro každého klienta predikuje uplift — o kolik se zvýší retention probability po dané intervenci.\n\nKlíčové: model rozlišuje 'persuadable' klienty (intervence pomůže) od 'sure things' (zůstanou i bez intervence) a 'lost causes' (odejdou bez ohledu). Investujeme jen do persuadable.",
    methodology:
      "Uplift modeling (T-learner): 1) Training: historická data o intervencích a jejich výsledcích (klient zůstal/odešel po intervenci X), 2) T-learner: 2 modely — P(retain|treatment) a P(retain|no_treatment), uplift = P(T) − P(C), 3) Features: churn score (z 22-01), sentiment, tenure, revenue, reason_for_risk, 4) Treatment options: meeting, discount_5/10/15%, service_upgrade, AM_change, exec_engagement, 5) Output: ranked interventions per klient s expected uplift.",
    dataInputs: [
      "Churn model output (22-01) — aktuální churn probability per klient",
      "Historická data intervencí — typ, datum, výsledek (CRM activity log)",
      "Klientský profil — tenure, revenue, segment, psychografický profil (15-01)",
      "Sentiment timeline — aktuální a historický sentiment",
      "Cost per intervention (meeting: 2h × rate, discount: margin impact, ...)",
    ],
    outputMetrics: [
      "Ranked interventions per klient (intervention + expected uplift + cost)",
      "ROI per intervention (uplift × CLV ÷ intervention_cost)",
      "Klient klasifikace: Persuadable / Sure Thing / Lost Cause / Sleeping Dog",
      "Optimal intervention timing (kdy)",
      "Expected retention rate po intervenci",
    ],
    goodScenario: {
      title: "Klient stabilní — nepotřeba",
      description:
        "Klient klasifikován jako 'Sure Thing' — churn probability < 5 %, uplift jakékoli intervence < 2 %. Klient je stabilní, spokojený, intervence by neměla přidanou hodnotu (a mohla by být kontraproduktivní — 'proč se ptáte?').",
      indicators: [
        "Klasifikace: Sure Thing",
        "Churn probability: 3 %",
        "Max uplift: 1.8 % (statisticky nevýznamný)",
        "Žádná intervence doporučena",
      ],
      actions: [
        "Neinvestovat retention budget — klient nepotřebuje záchranu",
        "Pokračovat v běžné kvalitě služby",
        "Zvážit upsell (klient je spokojený = příležitost)",
      ],
    },
    badScenario: {
      title: "Osobní schůzka + sleva 10 % = 64 % šance na udržení",
      description:
        "Klient klasifikován jako 'Persuadable' — churn probability 75 %, ale intervence může dramaticky změnit výsledek. Top doporučení: 1) Osobní schůzka + sleva 10 % → uplift 39 %, retention 64 %. 2) Executive engagement → uplift 28 %, retention 53 %.",
      indicators: [
        "Klasifikace: Persuadable (highest ROI target)",
        "Churn probability: 75 % (bez intervence → 25 % retention)",
        "Intervention 1: meeting + 10% discount → 64 % retention (uplift +39pp)",
        "ROI: CLV 480K × 0.39 uplift ÷ 15K cost = 12.5× ROI",
      ],
      actions: [
        "Implementovat doporučenou intervenci do 7 dní",
        "Senior partner: osobní schůzka s jednatelem",
        "Připravit nabídku: 10% sleva na 12M smlouvu",
        "Monitorovat efekt intervence 90 dní (actual vs. predicted)",
      ],
    },
    frequency: "Denně (model scoring), ad-hoc (per at-risk klient)",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["22-01", "22-03", "10-01", "15-01"],
    businessImpact: "Kritický — optimalizace retention investic",
    implementationStatus: "Produkce",
  },
  {
    id: "22-03",
    sectionId: 22,
    sectionTitle: "Prediktivní vrstva",
    name: "Optimální moment kontaktu",
    source: "analýza",
    good: "Úterý 10:00 — response rate 89%",
    bad: "Pátek 16:00 — response rate 12%",
    description:
      "Predikce optimálního momentu pro kontaktování klienta — den v týdnu, hodina, kanál (email/telefon/meeting) a kontext (co sdělit). Model maximalizuje response rate a kvalitu interakce.\n\nKaždý klient má unikátní 'reachability profile' — někdo odpovídá nejlépe v úterý ráno, jiný ve čtvrtek odpoledne. Model se učí z historických response dat a průběžně se adaptuje.\n\nOptimalizace timingu zvyšuje efektivitu celého týmu — méně nevyzvednutých hovorů, rychlejší odpovědi, produktivnější schůzky.",
    methodology:
      "Contact optimization: 1) Feature engineering: day_of_week, hour, channel, email_subject_type, prior_context, 2) Response model: P(response | features) — logistic regression per klient (nebo global model pro nové klienty), 3) Quality model: response_quality_score (quick + positive = high), 4) Optimization: maximize P(response) × quality subject to channel constraints, 5) A/B testing: random 20 % control group pro model validaci.",
    dataInputs: [
      "Email komunikace — sent timestamp, response timestamp (IMAP logs)",
      "Daktela CDR — call timestamp, duration, answered/missed, callback",
      "CRM — schůzky a jejich outcome (productive/neutral/negative)",
      "Klientský profil — timezone (CZ/DE), pracovní doba, device preference (17-04)",
      "Kalendář — svátky CZ/DE, dovolené klienta (pokud známy)",
    ],
    outputMetrics: [
      "Optimal contact window per klient (day × hour × channel)",
      "Predicted response rate per window",
      "Worst windows (avoid)",
      "A/B test lift (optimized vs. random timing)",
      "Average response time (optimized vs. baseline)",
    ],
    goodScenario: {
      title: "Úterý 10:00 — response rate 89 %",
      description:
        "Model identifikoval optimální window: Úterý 10:00 ± 1h, kanál email, předmět typu 'Monthly update'. Historický response rate v tomto okně: 89 % (vs. 45 % random). Klient je v kanceláři, na desktopu, soustředěný.",
      indicators: [
        "Optimal window: Út 10:00 (email)",
        "Response rate: 89 % (vs. 45 % baseline)",
        "Average response time: 2.5h (vs. 18h baseline)",
        "A/B test lift: +44pp",
      ],
      actions: [
        "Plánovat důležitou komunikaci na Út 10:00",
        "Automatizovat odesílání reportů na optimal window",
        "Reservovat Út ráno pro klientskou komunikaci",
      ],
    },
    badScenario: {
      title: "Pátek 16:00 — response rate 12 %",
      description:
        "Klient v pátek odpoledne prakticky nekomunikuje — response rate 12 %. Přesto 30 % naší komunikace odcházelo v pátek 15–17h (convenience bias — účetní dokončuje práci a odesílá). Model doporučuje přesunout vše na Út–Čt dopoledne.",
      indicators: [
        "Pá 16:00 response rate: 12 %",
        "30 % komunikace odesíláno v tomto okně (suboptimální)",
        "Estimated lost responses: 15 per měsíc",
        "Potential improvement: +200 % response rate",
      ],
      actions: [
        "Přenastavit automatické odesílání z Pá na Út–Čt",
        "Informovat účetní o optimal windows per klient",
        "Implementovat scheduled sending — píše kdykoli, odesílá optimálně",
        "Monitorovat zlepšení response rate po změně",
      ],
    },
    frequency: "Per kontakt (real-time doporučení), měsíčně (model retrain)",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["22-01", "22-02", "17-01", "17-04"],
    businessImpact: "Střední — efektivita komunikace a produktivita týmu",
    implementationStatus: "Produkce",
  },
  {
    id: "22-04",
    sectionId: 22,
    sectionTitle: "Prediktivní vrstva",
    name: "Cenová elasticita",
    source: "historie",
    good: "Toleruje +20% bez reakce",
    bad: "Zlomový bod při +3% — okamžitý odchod",
    description:
      "Odhad cenové elasticity per klient — jak reaguje na změny ceny služeb. Model predikuje pravděpodobnost odchodu jako funkci procentuálního navýšení ceny, a identifikuje 'breaking point' — maximální navýšení, které klient akceptuje.\n\nPro pricing strategii je to klíčové — u elastických klientů (citlivých na cenu) zvyšujeme opatrně a kompenzujeme hodnotou. U neelastických klientů (loajálních) můžeme navýšit bez rizika.\n\nModel se trénuje na historických price increase events a jejich důsledcích (klient zůstal/odešel/vyjednal slevu).",
    methodology:
      "Price elasticity estimation: 1) Historická data: price_increase_pct, client_response (stayed/left/negotiated), time_since_increase, 2) Survival analysis: Cox PH model — P(churn | price_increase, client_features), 3) Elasticity curve per klient/segment: P(churn) = f(price_increase_pct), 4) Breaking point: P(churn) = 50 % → what price increase?, 5) Confidence interval — bootstrap na historických datech.",
    dataInputs: [
      "Historické cenové změny per klient — datum, % navýšení, absolutní částka",
      "Klientova reakce na cenovou změnu — akceptace/vyjednávání/odchod (CRM)",
      "Klientský profil — loyalty score (15-03), tenure, revenue, segment",
      "Competitor pricing intelligence (pokud dostupné)",
      "Smlouvy — fixní cena vs. variabilní, délka smlouvy",
    ],
    outputMetrics: [
      "Cenová elasticita per klient (0=neelastický, 1=vysoce elastický)",
      "Breaking point: max akceptovatelné navýšení (%)",
      "P(churn) per navýšení scenario (5%/10%/15%/20%)",
      "Expected revenue impact per pricing scenario",
      "Optimal price increase: max revenue × min churn risk",
    ],
    goodScenario: {
      title: "Toleruje +20 % bez reakce",
      description:
        "Klient je neelastický (elasticita 0.05). Breaking point: +35 %. P(churn) při +20 %: 3 %. Klient oceňuje kvalitu a vztah — cena není primární faktor. Historicky 2 navýšení bez jakékoli reakce.",
      indicators: [
        "Elasticita: 0.05 (neelastický)",
        "Breaking point: +35 %",
        "P(churn) při +20 %: 3 %",
        "Historicky 2 navýšení (10 %, 12 %) — 0 reakce",
      ],
      actions: [
        "Bezpečné navýšení: až +20 % s minimálním rizikem",
        "Navýšit cenu s transparentní komunikací o hodnotě",
        "Nenavyšovat maximálně — udržet goodwill",
        "Kompenzovat navýšení přidanou hodnotou (nová služba zdarma)",
      ],
    },
    badScenario: {
      title: "Zlomový bod při +3 % — okamžitý odchod",
      description:
        "Klient je vysoce elastický (elasticita 0.85). Breaking point: +4 %. P(churn) při +5 %: 72 %. Klient aktivně porovnává ceny (15-03: oportunista, loyalty score 82). Jakékoli navýšení vyvolá porovnání s konkurencí.",
      indicators: [
        "Elasticita: 0.85 (vysoce elastický)",
        "Breaking point: +4 %",
        "P(churn) při +5 %: 72 %",
        "Historicky: vyjednal slevu 2× po navýšení",
      ],
      actions: [
        "NENAVYŠOVAT cenu — nebo maximálně symbolicky (+2 %)",
        "Investovat do lockin mechanismů (integrace, custom řešení)",
        "Zvýšit vnímanou hodnotu (přidat službu bez navýšení ceny)",
        "Zvážit: je klient profitabilní? Pokud ne, akceptovat odchod",
      ],
    },
    frequency: "Ročně (model retrain), ad-hoc (před pricing decision)",
    automationLevel: "75 % automatizováno",
    relatedAnalyses: ["22-01", "22-02", "15-03", "9-01"],
    businessImpact: "Kritický — pricing strategie a revenue optimization",
    implementationStatus: "Produkce",
  },
  {
    id: "22-05",
    sectionId: 22,
    sectionTitle: "Prediktivní vrstva",
    name: "Predikce akvizice/fúze",
    source: "signály",
    good: "Stabilní struktura",
    bad: "3 signály fúze — připravit transition plán",
    description:
      "Multi-signal detektor pravděpodobnosti, že klient bude akvírován, fúzuje, nebo je prodáván. Akvizice/fúze je kritický moment — nový vlastník může změnit všechny dodavatele včetně účetní kanceláře.\n\nModel agreguje signály z více zdrojů: OR změny (noví společníci), neobvyklé finanční vzorce (due diligence aktivity, clean-up účtů), strategické konzultace (klient se ptá na valuaci), pracovní inzeráty (M&A pozice u klienta), mediální zmínky.\n\nVčasná detekce (6–12M před) umožňuje: budování vztahu s potenciálním acquirem, přípravu transition plánu, positioning jako partner (ne jen vendor).",
    methodology:
      "M&A signal detection: 1) OR monitoring — nový společník/jednatel z jiné firmy (ARES API), 2) Financial pattern detection — neobvyklé audit aktivity, asset revaluation, debt restructuring, 3) Communication signals — klíčová slova: 'due diligence', 'valuace', 'akvizice', 'prodej', 'investor' (NLP na emailech), 4) External signals — M&A news, pracovní inzeráty (CFO, M&A specialist), 5) Composite score: weighted sum of signals → P(M&A event in 12M).",
    dataInputs: [
      "ARES API — změny v OR (společníci, jednatelé, základní kapitál)",
      "Účetní data — neobvyklé vzorce (revaluace, čištění účtů, mimořádné odpisy)",
      "Email komunikace — NLP keyword detection (due diligence, valuace, investor)",
      "Pracovní inzeráty (19-03) — CFO, M&A, Corporate Development pozice",
      "Mediální zmínky (19-04) — M&A news per klient",
    ],
    outputMetrics: [
      "M&A probability score (0–100)",
      "Signál breakdown (which signals fired, confidence per signal)",
      "Predicted timeline (months to event)",
      "Impact assessment: co znamená M&A pro naši službu",
      "Recommended preparation actions",
    ],
    goodScenario: {
      title: "Stabilní struktura",
      description:
        "M&A probability: 5 %. Žádné signály — stabilní vlastnická struktura 5+ let, žádné OR změny, žádné neobvyklé finanční vzorce, žádné relevantní keyword v komunikaci.",
      indicators: [
        "M&A probability: 5 % (low)",
        "0 signálů fired",
        "Vlastnická struktura: stabilní 5+ let",
        "Žádné mediální zmínky o M&A",
      ],
      actions: [
        "Pokračovat v monitoringu",
        "Budovat vztah s vlastníky (pojistka pro budoucnost)",
        "Standardní kvartální review",
      ],
    },
    badScenario: {
      title: "3 signály fúze — připravit transition plán",
      description:
        "M&A probability: 72 %. Signály: 1) OR: nový společník (investiční fond, 30 % podíl, zápis před 2M), 2) Accounting: due diligence přípravy (mimořádná inventura, revaluace aktiv), 3) Communication: jednatel zmínil 'strategického partnera' v emailu. Predicted timeline: 6–9M.",
      indicators: [
        "M&A probability: 72 %",
        "Signal 1: nový společník — investiční fond (OR, confidence 0.9)",
        "Signal 2: due diligence aktivity (accounting, confidence 0.7)",
        "Signal 3: keyword 'strategický partner' (communication, confidence 0.6)",
      ],
      actions: [
        "Připravit transition plán — co se stane s naší službou po M&A",
        "Identifikovat acquirera — má vlastní kancelář? Využije nás?",
        "Positioning: stát se 'transition partner' (due diligence support)",
        "Budovat vztah s novým společníkem — osobní schůzka",
      ],
    },
    frequency: "Měsíčně (model scoring), real-time (OR alert)",
    automationLevel: "70 % automatizováno",
    relatedAnalyses: ["22-01", "19-01", "19-04", "13-06"],
    businessImpact: "Vysoký — příprava na ownership change",
    implementationStatus: "Produkce",
  },
];
