import type { AnalysisDetail } from "./types";

export const section07Analyses: AnalysisDetail[] = [
  {
    id: "7-01",
    sectionId: 7,
    sectionTitle: "Klientská komunikace",
    name: "Sentiment v čase",
    source: "NLP Daktela",
    good: "Stabilně pozitivní 78%",
    bad: "Propad z 82% na 34% za 3 měsíce",
    description:
      "NLP analýza sentimentu v klientské komunikaci (emaily, hovory, chat) sleduje vývoj spokojenosti klienta v čase. Systém detekuje nejen aktuální sentiment, ale zejména jeho trendy — náhlý propad je silným prediktorem odchodu klienta.\n\nAnalýza pracuje s texty z Daktely (contact center), emailů a zápisů z osobních schůzek. Model je natrénován na českém a německém jazyce s porozuměním oborovým termínům.\n\nKlíčovou funkcí je detekce change pointů — momentů, kdy se sentiment výrazně změní. Tyto body jsou korelovány s konkrétními událostmi (chyba v účetnictví, zdražení, změna účetní).",
    methodology:
      "Transformer-based NLP model s fine-tuningem na CZ/DE účetní komunikaci: 1) Klasifikace sentimentu per zpráva (pozitivní/neutrální/negativní), 2) Agregace do týdenního score, 3) Change point detection (Bayesovská metoda), 4) Korelace s CRM událostmi, 5) Predikce trendu na 30 dní.",
    dataInputs: [
      "Emailová komunikace (IMAP)",
      "Přepisy hovorů z Daktely",
      "Chat zprávy",
      "Zápisy z osobních schůzek",
      "CRM události (zdražení, reklamace, změna účetní)",
    ],
    outputMetrics: [
      "Sentiment score (0–100 %)",
      "Trend (rostoucí/klesající/stabilní)",
      "Change point data s příčinou",
      "Predikce sentimentu na 30 dní",
      "Top negativní témata",
    ],
    goodScenario: {
      title: "Stabilně spokojený klient",
      description:
        "Sentiment se drží na 78 % (pozitivní) s minimálními výkyvy. Klient proaktivně komunikuje, oceňuje práci kanceláře a doporučuje ji dalším.",
      indicators: [
        "Sentiment 78 % — stabilní 6 měsíců",
        "0 change pointů v negativním směru",
        "Klient zmínil doporučení 2×",
        "Response rate 95 % do 24h",
      ],
      actions: [
        "Udržovat aktuální kvalitu služeb",
        "Zvážit upsell — klient je vhodný kandidát",
        "Požádat o referenci / testimonial",
      ],
    },
    badScenario: {
      title: "Dramatický propad sentimentu",
      description:
        "Sentiment klesl z 82 % na 34 % za 3 měsíce. Change point identifikován na 12.1.2026 — koreluje se změnou účetní a 2 chybami v DPH přiznání.",
      indicators: [
        "Propad z 82 % na 34 % (−48 bodů)",
        "Change point: 12.1.2026",
        "2 negativní témata: chyby, komunikace",
        "Response rate klesl na 40 %",
      ],
      actions: [
        "Okamžitá osobní schůzka s klientem",
        "Identifikovat a opravit root cause (chyby v DPH)",
        "Zvážit změnu přiděleného účetního",
        "Nabídnout kompenzaci za způsobené problémy",
      ],
    },
    frequency: "Denně (automaticky)",
    automationLevel: "92 % automatizováno",
    relatedAnalyses: ["7-03", "7-04", "7-06", "10-01"],
    businessImpact:
      "Vysoký — včasná detekce nespokojenosti zabrání odchodu klienta",
    implementationStatus: "Produkce",
  },
  {
    id: "7-02",
    sectionId: 7,
    sectionTitle: "Klientská komunikace",
    name: "Témata dotazů",
    source: "topic modeling",
    good: "60% proaktivní konzultace",
    bad: "85% stížnosti a urgence",
    description:
      "Topic modeling (LDA/BERTopic) nad přepisy hovorů z Daktela Cloud a emailovými konverzacemi identifikuje dominantní témata, o kterých klient komunikuje. Distribuce témat ukazuje, zda je vztah orientovaný na hodnotu (konzultace, rozvoj) nebo na řešení problémů (stížnosti, urgence).\n\nSystém klasifikuje zprávy do 12 standardních témat (DPH, mzdy, uzávěrka, faktury, reklamace, konzultace, legislativa, upsell, cena, chyby, dotaz na stav, jiné) a sleduje jejich podíl v čase.",
    methodology:
      "BERTopic s českým embedding modelem (Seznam/small-e-czech) nad přepisy z Daktela Cloud API (GET /api/v6/records) a emaily (imapflow). Ke každé zprávě se přiřadí top-1 topic + pravděpodobnost. Trend-over-time analýza podílu stížnostních vs. konzultačních témat. Threshold: > 50 % stížnostní témata = alert.",
    dataInputs: [
      "Přepisy hovorů — Daktela GET /api/v6/records",
      "Chat zprávy — Daktela GET /api/v6/chat/conversations",
      "Emailová komunikace (imapflow IMAP)",
      "Historické označení témat (training data)",
      "CRM štítky typů interakcí",
    ],
    outputMetrics: [
      "Podíl proaktivních témat (%)",
      "Podíl stížnostních témat (%)",
      "Top 5 témat per klient",
      "Trend témat 6M",
      "Topic entropy (diverzita komunikace)",
    ],
    goodScenario: {
      title: "Konzultativní vztah",
      description:
        "60 % komunikace tvoří proaktivní konzultace o rozvoji, daňové optimalizaci a legislativních změnách. Klient vnímá kancelář jako partnera, ne jen dodavatele.",
      indicators: [
        "60 % proaktivní konzultace",
        "25 % provozní dotazy",
        "15 % operativa",
        "0 % stížnosti za 3 měsíce",
      ],
      actions: [
        "Dokumentovat konzultační cases pro marketing",
        "Nabídnout advisory balíček",
        "Použít pro referenční marketing",
      ],
    },
    badScenario: {
      title: "Reaktivní hasičský mód",
      description:
        "85 % komunikace jsou stížnosti, reklamace a urgence. Klient má pocit, že kancelář jen hasí požáry, které sama způsobuje.",
      indicators: [
        "85 % stížnosti/urgence",
        "5 stížností za měsíc (3× průměr)",
        "Topic drift — rostoucí podíl reklamací",
        "0 % strategické konzultace",
      ],
      actions: [
        "Root cause analýza opakujících se stížností",
        "Eskalace na senior partnera kanceláře",
        "Retention plán s konkrétními akcemi",
        "Zvážit změnu týmu obsluhujícího klienta",
      ],
    },
    frequency: "Týdně (BERTopic re-fit měsíčně)",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["7-01", "7-03", "7-09", "12-02"],
    businessImpact: "Vysoký — indikátor typu vztahu s klientem",
    implementationStatus: "Produkce",
  },
  {
    id: "7-03",
    sectionId: 7,
    sectionTitle: "Klientská komunikace",
    name: "Frustrace a eskalace",
    source: "change point",
    good: "0 eskalací za kvartál",
    bad: "3 eskalace — bod zlomu: 12.3.2026",
    description:
      "Change point detection (PELT algoritmus) nad sentiment time series identifikuje konkrétní okamžiky, kdy došlo ke skokové změně v komunikaci klienta. Slouží k detekci frustrace dřív, než vyústí ve výpověď smlouvy.\n\nSystém automaticky označuje eskalační události — výskyt vulgarismů, požadavek na mluvení s vedoucím, pohrůžka odchodem, zmínka právníka — a mapuje je na časovou osu.",
    methodology:
      "PELT change point detection (ruptures Python library) na denní sentiment time series z 7-01. Pro každý detekovaný bod: 1) Extrakce okolních zpráv (±3 dny), 2) Klasifikace eskalačních triggerů (keyword matching + NLP), 3) Korelace s CRM událostmi, 4) Alert při detekci eskalace do 1 hodiny.",
    dataInputs: [
      "Denní sentiment time series (7-01)",
      "Přepisy Daktela hovorů (GET /api/v6/calls)",
      "Emaily s flag priority",
      "CRM events log (ticket eskalace)",
      "Eskalační keyword slovník (CZ/DE)",
    ],
    outputMetrics: [
      "Počet change pointů / kvartál",
      "Počet eskalačních událostí",
      "Mean time to eskalace",
      "Top triggers eskalace",
      "Mapa eskalací → root cause",
    ],
    goodScenario: {
      title: "Klidný průběh spolupráce",
      description:
        "Za poslední kvartál 0 eskalací, žádný change point v negativním směru. Klient komunikuje konzistentně klidně.",
      indicators: [
        "0 eskalací za Q1",
        "0 change pointů",
        "0 výskytů eskalačních keywords",
        "Konzistentní sentiment 75 %+",
      ],
      actions: [
        "Pokračovat v standardní komunikaci",
        "Použít jako benchmark pro tým",
      ],
    },
    badScenario: {
      title: "Kumulace eskalací",
      description:
        "3 eskalace za kvartál, major change point 12.3.2026 (zhoršení o 40 sentiment bodů). Trigger: chyba v DPH + pozdní reakce účetního.",
      indicators: [
        "3 eskalace za kvartál",
        "Change point: 12.3.2026 (−40 bodů)",
        "2× zmínka 'právník' / 'výpověď'",
        "1× požadavek na vedení",
      ],
      actions: [
        "Okamžitá schůzka partnera kanceláře s klientem",
        "Kompenzační nabídka (sleva / bezplatná služba)",
        "Výměna account managera",
        "Týdenní review status do stabilizace",
      ],
    },
    frequency: "Real-time alerty + týdenní review",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["7-01", "7-02", "7-06", "10-01"],
    businessImpact: "Kritický — predikce akutního churn rizika",
    implementationStatus: "Produkce",
  },
  {
    id: "7-04",
    sectionId: 7,
    sectionTitle: "Klientská komunikace",
    name: "Frekvence kontaktů",
    source: "metadata",
    good: "Pravidelný kontakt 2×/měsíc",
    bad: "0 kontaktů 4 měsíce — tichý odchod",
    description:
      "Monitoring frekvence a kadence kontaktů mezi klientem a kanceláří. Ztichlý klient (zero communication window) je často signálem tichého odchodu — klient si vybírá konkurenci a ukončí spolupráci v okamžiku, kdy bude připraven.\n\nSystém agreguje kontakty napříč kanály (email, Daktela, WhatsApp, osobní schůzky) a porovnává s baseline klienta.",
    methodology:
      "Metadata aggregation z Daktela (GET /api/v6/calls), IMAP message headers, WhatsApp Business API a Reenio booking API. Výpočet baseline kontaktní frekvence per klient (medián za 12M). Alert při zero communication window > baseline × 2.5. Kadence analýza (pravidelnost vs. shluk).",
    dataInputs: [
      "Daktela call metadata (GET /api/v6/calls)",
      "Email headers (IMAP, imapflow)",
      "WhatsApp Business API conversation log",
      "Reenio booking API /api/bookings",
      "Baseline frekvence per klient (12M medián)",
    ],
    outputMetrics: [
      "Kontaktů za měsíc",
      "Odchylka od baseline (%)",
      "Dny od posledního kontaktu",
      "Kanálová distribuce",
      "Kadence (std dev intervalů)",
    ],
    goodScenario: {
      title: "Zdravá kadence komunikace",
      description:
        "Klient kontaktuje kancelář pravidelně 2× měsíčně, v mix kanálech (email + osobní schůzka). Žádný silent window delší než 3 týdny.",
      indicators: [
        "2 kontakty / měsíc",
        "Max silent window 18 dní",
        "Mix email + schůzka",
        "Kadence stabilní 12M",
      ],
      actions: ["Udržet pravidelnost", "Využít k proaktivnímu upsellu"],
    },
    badScenario: {
      title: "Tichý odchod",
      description:
        "Klient 4 měsíce nekontaktoval kancelář, na poslední email neodpověděl. Historicky kontaktoval 3×/měsíc — jasný signál tichého odchodu.",
      indicators: [
        "120 dní bez kontaktu",
        "Baseline 3 kontakty/měsíc → 0",
        "2 neodpovězené emaily",
        "Zrušil poslední 2 schůzky",
      ],
      actions: [
        "Okamžitý proactive outreach (telefon, ne email)",
        "Partner kanceláře volá osobně",
        "Retention nabídka připravena",
        "Zkontrolovat, zda nezakládal novou účetní firmu (ARES)",
      ],
    },
    frequency: "Denně",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["7-01", "7-06", "7-10", "10-01"],
    businessImpact: "Vysoký — klíčový prediktor tichého odchodu",
    implementationStatus: "Produkce",
  },
  {
    id: "7-05",
    sectionId: 7,
    sectionTitle: "Klientská komunikace",
    name: "Preferovaný kanál",
    source: "logy",
    good: "Email 65%, efektivní",
    bad: "Jen telefon — nemožné trasovat",
    description:
      "Analýza kanálové distribuce komunikace per klient. Mix kanálů s převahou dokumentovatelných (email, chat) umožňuje efektivní trasování a audit. Naopak 100 % telefon je operativně i právně rizikové — žádný záznam, ústní instrukce bez auditu.",
    methodology:
      "Agregace metadat z Daktela (hovory, chat), IMAP (emaily), WhatsApp Business API a Reenio (osobní). Výpočet podílu každého kanálu v % zpráv i v % času obsluhy. Klasifikace: dokumentovatelný (email, chat, WhatsApp s přepisem) vs. volatilní (telefon bez přepisu).",
    dataInputs: [
      "Daktela GET /api/v6/calls (hovory)",
      "Daktela GET /api/v6/chat/conversations",
      "IMAP emailové konverzace",
      "WhatsApp Business API",
      "Reenio booking API (osobní schůzky)",
    ],
    outputMetrics: [
      "Podíl per kanál (%)",
      "Čas obsluhy per kanál",
      "Dokumentovatelnost mix (%)",
      "Preferenční skóre",
      "Trend kanálů 12M",
    ],
    goodScenario: {
      title: "Zdravý kanálový mix",
      description:
        "65 % email, 20 % osobní schůzka, 15 % telefon. Veškerá instrukce dokumentovaná, auditovatelná, traceable.",
      indicators: [
        "Email 65 %, Telefon 15 %",
        "100 % hovorů s přepisem (Daktela)",
        "Dokumentace 95 %",
        "Low operational risk",
      ],
      actions: ["Udržet mix", "Nabídnout self-service portál jako 4. kanál"],
    },
    badScenario: {
      title: "Výhradně telefonická komunikace",
      description:
        "100 % komunikace přes osobní telefon jednatele, hovory nejsou nahrávané. Žádný audit trail, klient si pak pamatuje 'jinak'.",
      indicators: [
        "100 % telefon bez přepisu",
        "0 emailových potvrzení",
        "Sporné instrukce — 3× měsíčně",
        "Compliance risk (GDPR article 5 accountability)",
      ],
      actions: [
        "Vynutit přepis všech hovorů přes Daktela",
        "Vyžadovat emailové potvrzení kritických instrukcí",
        "Edukovat klienta o audit trail",
        "Případně refuse telefonické přijímání závazných instrukcí",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["7-04", "7-06", "11-07"],
    businessImpact: "Střední — operativní efektivita + compliance",
    implementationStatus: "Produkce",
  },
  {
    id: "7-06",
    sectionId: 7,
    sectionTitle: "Klientská komunikace",
    name: "Rychlost odpovědí",
    source: "timestamps",
    good: "Průměr 2.4h",
    bad: "Průměr 72h — ztráta důvěry",
    description:
      "Response time analýza — čas od přijetí požadavku klienta k první smysluplné odpovědi účetního. Klíčový faktor vnímané kvality služby. Empiricky: odpověď nad 24h systematicky kazí NPS, nad 72h generuje stížnosti.",
    methodology:
      "Pairing request-response z IMAP thread headers a Daktela ticket timestamps. Výpočet first_response_time = response.received_at − request.sent_at. Filtr pracovní doby (po-pá 8-17). Percentilové metriky (p50, p90, p95). SLA threshold per segment klienta.",
    dataInputs: [
      "IMAP email thread timestamps",
      "Daktela ticket system events",
      "Daktela chat conversation logs",
      "Pracovní kalendář (svátky, dovolená)",
      "SLA definice per klient",
    ],
    outputMetrics: [
      "Průměrný first response time (h)",
      "p50 / p90 / p95 response time",
      "SLA compliance rate (%)",
      "Trend 6M",
      "Distribuce per účetní",
    ],
    goodScenario: {
      title: "Bleskové reakce",
      description:
        "Průměrná reakce 2.4 h během pracovní doby, p95 pod 8 h. Klient vnímá kancelář jako responzivní a profesionální.",
      indicators: [
        "Průměr 2.4 h",
        "p95 = 7.2 h",
        "SLA compliance 98 %",
        "0 stížností na rychlost",
      ],
      actions: [
        "Použít v marketingu (fast response)",
        "Benchmarkovat tým proti této metrice",
      ],
    },
    badScenario: {
      title: "Pomalé reakce — ztráta důvěry",
      description:
        "Průměr 72 h na odpověď. Klient si stěžuje v každém druhém hovoru. Opakovaně 'jsem musel urgovat 3×'.",
      indicators: [
        "Průměr 72 h",
        "p95 = 168 h (týden)",
        "SLA compliance 42 %",
        "12 stížností za kvartál na rychlost",
      ],
      actions: [
        "Auto-acknowledgement email do 1 h",
        "Navýšit kapacitu účetního týmu",
        "Redistribuovat klienty z přetíženého účetního",
        "SLA dashboard real-time pro vedení",
      ],
    },
    frequency: "Denně (real-time dashboard)",
    automationLevel: "98 % automatizováno",
    relatedAnalyses: ["7-01", "7-05", "11-01", "11-09"],
    businessImpact: "Vysoký — přímý driver NPS a retence",
    implementationStatus: "Produkce",
  },
  {
    id: "7-07",
    sectionId: 7,
    sectionTitle: "Klientská komunikace",
    name: "Délka zpráv",
    source: "délka textů",
    good: "Stabilní 120 slov",
    bad: "Zkrácení z 150 na 12 slov — odchází",
    description:
      "Lingvistická analýza průměrné délky zpráv klienta. Dramatické zkrácení zpráv je behaviorální mikrosignál disengagementu — klient už nevynakládá energii na podrobný popis, protože mentálně odchází.",
    methodology:
      "Word count per zpráva (spaCy cs_core_news_lg tokenizace), klouzavý 30denní průměr. Porovnání current window vs. historical baseline (12M). Change point detection PELT na word count time series. Alert při poklesu > 50 % vs. baseline.",
    dataInputs: [
      "Emailová komunikace (IMAP body text)",
      "Chat zprávy (Daktela)",
      "WhatsApp zprávy",
      "Baseline word count per klient (12M)",
      "spaCy tokenizer cs_core_news_lg",
    ],
    outputMetrics: [
      "Průměrná délka zprávy (slov)",
      "30-day rolling mean",
      "Odchylka od baseline (%)",
      "Trend (změna slope)",
      "Change points detekovány",
    ],
    goodScenario: {
      title: "Konzistentní zapojení",
      description:
        "Klient píše průměrně 120 slov / zpráva, stabilně 12 měsíců. Vyjadřuje kontext, klade doplňující otázky, vysvětluje záměr.",
      indicators: [
        "120 slov / zpráva",
        "Odchylka od baseline ±8 %",
        "0 change pointů",
        "Plnohodnotné věty, kontext",
      ],
      actions: ["Udržet stávající úroveň komunikace"],
    },
    badScenario: {
      title: "Disengagement — telegrafický styl",
      description:
        "Průměrná délka klesla ze 150 na 12 slov za 2 měsíce. Klient odpovídá jen 'ok', 'ano', 'ne'. Silný prediktor nadcházejícího odchodu.",
      indicators: [
        "Pokles 150 → 12 slov (−92 %)",
        "Change point před 2 měsíci",
        "Telegrafické odpovědi",
        "Přestal klást doplňující otázky",
      ],
      actions: [
        "Partner kanceláře osobně kontaktuje klienta",
        "Identifikovat příčinu disengagementu",
        "Retention intervence (sleva / osobní schůzka)",
        "Připravit exit scenario pro případ odchodu",
      ],
    },
    frequency: "Týdně",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["7-01", "7-04", "10-01"],
    businessImpact: "Vysoký — behaviorální mikrosignál churn",
    implementationStatus: "Beta",
  },
  {
    id: "7-08",
    sectionId: 7,
    sectionTitle: "Klientská komunikace",
    name: "Kdy klient píše",
    source: "timestamps",
    good: "Po-Pá 9-17",
    bad: "Neděle 23:00 — stress",
    description:
      "Circadian analysis kdy klient komunikuje. Pravidelná komunikace v pracovní době indikuje zdravý business. Noční a víkendové zprávy signalizují stress, přepracování nebo krizový mód — často předchází eskalaci nebo odchodu.",
    methodology:
      "Histogram timestampů zpráv (hour of day, day of week). Kategorizace: working_hours (po-pá 8-17), evening (17-22), night (22-8), weekend. Výpočet podílu non-working hours. Anomaly detection ISO forest na circadian pattern.",
    dataInputs: [
      "IMAP message headers (Date)",
      "Daktela call timestamps",
      "WhatsApp message timestamps",
      "Chat conversation events",
      "Pracovní kalendář ČR (svátky)",
    ],
    outputMetrics: [
      "Podíl working hours (%)",
      "Podíl night hours (%)",
      "Podíl weekend (%)",
      "Peak hour komunikace",
      "Anomaly score circadian",
    ],
    goodScenario: {
      title: "Normální pracovní rytmus",
      description:
        "95 % komunikace v po-pá 9-17. Klient má zdravý business, komunikuje v rozumných hodinách.",
      indicators: [
        "95 % working hours",
        "0 % night (22-8)",
        "2 % weekend (akceptovatelné)",
        "Peak 10:00-11:00",
      ],
      actions: ["Pokračovat ve standardu"],
    },
    badScenario: {
      title: "Krizový mód — noční a víkendová komunikace",
      description:
        "Klient píše v neděli 23:00, pondělí 6:00, sobotu 22:00. 35 % zpráv mimo pracovní dobu. Silný signál stresu nebo likviditní krize.",
      indicators: [
        "35 % zpráv non-working",
        "8 zpráv v noci (22-6)",
        "12 víkendových zpráv",
        "Anomaly score 0.91 (max 1.0)",
      ],
      actions: [
        "Osobní schůzka — identifikovat příčinu stresu",
        "Zkontrolovat likviditu klienta (9-03, 10-09)",
        "Nabídnout cash flow konzultaci",
        "Alert na churn risk (10-01)",
      ],
    },
    frequency: "Týdně",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["7-01", "7-03", "10-01", "10-09"],
    businessImpact: "Střední — indikátor celkového stavu klienta",
    implementationStatus: "Produkce",
  },
  {
    id: "7-09",
    sectionId: 7,
    sectionTitle: "Klientská komunikace",
    name: "Opakované problémy",
    source: "deduplikace",
    good: "0 opakování",
    bad: "Stejný problém 5× za rok",
    description:
      "Deduplikace a klastrování klientských problémů. Opakující se stejný problém signalizuje nevyřešený root cause — klient se zeptá, dostane odpověď, ale systémový problém zůstává. Kumulativně vede k frustraci.",
    methodology:
      "Semantic similarity clustering (sentence-transformers multilingual model) nad tématy z 7-02. Pro každý ticket/email výpočet cosine similarity s historickými problémy. Threshold 0.85 = opakování. Root cause analysis pomocí LLM shrnutí.",
    dataInputs: [
      "Kategorizované problémy z 7-02",
      "Ticket systém (Daktela)",
      "Emailové threads",
      "Resolution notes účetního",
      "Sentence-transformers embeddings",
    ],
    outputMetrics: [
      "Počet opakujících se problémů",
      "Top 5 opakovaných témat",
      "Average time between recurrence",
      "Resolution effectiveness (%)",
      "Root cause map",
    ],
    goodScenario: {
      title: "Problémy řešené napoprvé",
      description:
        "0 opakujících se problémů za 12 měsíců. Každý issue je uzavřen s root cause fix, klient se neptá znovu.",
      indicators: [
        "0 opakování",
        "First-call resolution 94 %",
        "Issue closure s root cause",
        "Klient nepožaduje eskalace",
      ],
      actions: [
        "Dokumentovat best practices",
        "Použít v onboardingu nových účetních",
      ],
    },
    badScenario: {
      title: "Stejný problém bez fixu",
      description:
        "Klient hlásí stejný problém (chyba v zaúčtování mzdy) 5× za rok. Account team neeliminoval root cause — problém vzniká znovu při každém měsíčním zpracování.",
      indicators: [
        "5 opakování za rok",
        "Průměrný interval 2 měsíce",
        "Stejný root cause (mzdový šablon)",
        "Eskalační sentiment ++ s každým opakováním",
      ],
      actions: [
        "Hluboká root cause analýza (5 Whys)",
        "Permanent fix šablony",
        "Code review procesu zaúčtování mezd",
        "Proaktivní informování klienta o fixu",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "80 % automatizováno",
    relatedAnalyses: ["7-02", "11-02", "11-07"],
    businessImpact: "Vysoký — hlavní driver eskalací a churn",
    implementationStatus: "Produkce",
  },
  {
    id: "7-10",
    sectionId: 7,
    sectionTitle: "Klientská komunikace",
    name: "Reenio rezervace",
    source: "kalendář",
    good: "Pravidelné schůzky, 0 zrušených",
    bad: "3 zrušené po sobě — klient ztrácí zájem",
    description:
      "Analýza osobních schůzek přes Reenio booking systém. Kadence schůzek a především míra zrušení jsou silné signály engagementu. 3 zrušení po sobě je v praxi téměř jistý prediktor odchodu klienta.",
    methodology:
      "Reenio booking API (/api/bookings) timestamps + status events. Metriky: booking_rate (schůzek/kvartál), cancellation_rate, no_show_rate, reschedule_chain_length. Alert při 2+ cancelations consecutively nebo no_show_rate > 20 %.",
    dataInputs: [
      "Reenio API /api/bookings",
      "Reenio API /api/bookings/{id}/events",
      "Historická frekvence schůzek",
      "Kontext zrušení (reason field)",
      "CRM link event → klient",
    ],
    outputMetrics: [
      "Schůzek / kvartál",
      "Cancellation rate (%)",
      "No-show rate (%)",
      "Consecutive cancellation count",
      "Průměrná délka schůzky",
    ],
    goodScenario: {
      title: "Pravidelné osobní schůzky",
      description:
        "Klient absolvuje kvartální review schůzku, měsíční status call. 0 zrušení za rok, vždy přichází připraven.",
      indicators: [
        "4 schůzky / kvartál",
        "0 % cancellation",
        "0 % no-show",
        "Průměrná délka 68 min (plně využitá)",
      ],
      actions: ["Udržet kadenci", "Rozšířit o strategický review 1×/rok"],
    },
    badScenario: {
      title: "Ztrácí zájem o osobní kontakt",
      description:
        "3 zrušené schůzky po sobě, vždy na poslední chvíli. Klient na email žádá přesunutí 'na později' bez konkrétního termínu. Silný signál disengagementu.",
      indicators: [
        "3 consecutive cancellations",
        "Cancellation rate 80 %",
        "2× přesunutí bez nového termínu",
        "Reason: 'nemám čas' (2×), 'přesunu později' (1×)",
      ],
      actions: [
        "Partner kanceláře volá osobně, ne email",
        "Nabídka remote meeting (Teams) místo osobní",
        "Retention alert — churn risk (10-01)",
        "Zkrácení schůzky na 20 min 'quick sync'",
      ],
    },
    frequency: "Týdně",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["7-04", "7-11", "10-01"],
    businessImpact: "Vysoký — prediktor odchodu při 2+ zrušeních",
    implementationStatus: "Produkce",
  },
  {
    id: "7-11",
    sectionId: 7,
    sectionTitle: "Klientská komunikace",
    name: "Osobní vs. digitální",
    source: "segmentace",
    good: "Mix 30/70 — gramotný klient",
    bad: "100% osobně — digitální transformace nemožná",
    description:
      "Segmentace klienta podle preference osobní vs. digitální komunikace. Mix naznačuje digitálně gramotného klienta, se kterým lze škálovat a automatizovat. 100 % osobní kontakt omezuje škálovatelnost a blokuje self-service portál.",
    methodology:
      "Poměr osobních schůzek (Reenio) a telefonátů vs. digitálních kanálů (email, chat, self-service portal logins). Výpočet digital_literacy_score = digital_interactions / total_interactions. Korelace s využitím self-service portálu a mobilní aplikace.",
    dataInputs: [
      "Reenio osobní schůzky",
      "Daktela hovory",
      "IMAP / chat digitální",
      "Self-service portál login logs",
      "Mobilní aplikace analytika",
    ],
    outputMetrics: [
      "Digital literacy score (0-100)",
      "Poměr osobní / digitální (%)",
      "Self-service adoption rate",
      "Cost-to-serve per kanál",
      "Trend digitalizace 12M",
    ],
    goodScenario: {
      title: "Digitálně gramotný klient",
      description:
        "70 % digitální komunikace (email, chat, self-service), 30 % osobní (schůzky pro strategii). Klient aktivně využívá portál pro stahování dokumentů.",
      indicators: [
        "Digital literacy 72 / 100",
        "Osobní 30 % : digitální 70 %",
        "Self-service logins 15×/měsíc",
        "Cost-to-serve 40 % pod průměrem",
      ],
      actions: [
        "Nabídnout API integraci (ERP ↔ kancelář)",
        "Pilot program pro nové digitální služby",
        "Upsell automation balíčku",
      ],
    },
    badScenario: {
      title: "Pouze osobní kontakt",
      description:
        "100 % komunikace osobně nebo telefonicky. Klient nikdy nepoužil self-service portál, nečte emaily, vyžaduje fyzické dokumenty. Blokuje digitální transformaci.",
      indicators: [
        "Digital literacy 8 / 100",
        "100 % osobní + telefon",
        "0 logins do portálu za rok",
        "Cost-to-serve 3× průměr",
      ],
      actions: [
        "Edukační workshop (1-on-1)",
        "Zjednodušený onboarding portálu (video návod)",
        "Přecenění: digitální sleva, osobní prémie",
        "Pokud odmítne — přesunout do premium cenové kategorie",
      ],
    },
    frequency: "Kvartálně",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["7-05", "7-10", "12-01"],
    businessImpact: "Střední — dopad na škálovatelnost kanceláře",
    implementationStatus: "Produkce",
  },
];
