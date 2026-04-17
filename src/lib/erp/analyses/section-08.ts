import type { AnalysisDetail } from "./types";

export const section08Analyses: AnalysisDetail[] = [
  {
    id: "8-01",
    sectionId: 8,
    sectionTitle: "Hlasová a lingvistická analýza",
    name: "Rychlost řeči",
    source: "audio",
    good: "140 slov/min — klidný",
    bad: "220 slov/min — rozrušený",
    description:
      "Analýza rychlosti řeči v telefonních hovorech a videokonferencích je jedním z nejspolehlivějších indikátorů emocionálního stavu klienta. Zvýšená rychlost řeči koreluje se stresem, nespokojeností nebo urgencí, zatímco příliš pomalá řeč může signalizovat únavu nebo depresi.\n\nSystém automaticky analyzuje audio záznamy z Daktely a měří počet slov za minutu, pauzy, intonaci a variabilitu tempa. Výsledky jsou agregovány per klient a sledovány v čase.\n\nKombinace s dalšími lingvistickými ukazateli (sentiment, slovník, ironie) vytváří komplexní obraz komunikačního stylu klienta.",
    methodology:
      "Akustická analýza: 1) Speech-to-text s timestamps per slovo, 2) Výpočet WPM (words per minute) per segment, 3) Detekce pauz a jejich délky, 4) Variabilita tempa (std. odchylka), 5) Porovnání s baseline klienta (jeho normální tempo).",
    dataInputs: [
      "Audio záznamy z Daktely",
      "Přepisy hovorů (STT)",
      "Historické baseline per klient",
      "Metadata hovorů (čas, délka, iniciátor)",
    ],
    outputMetrics: [
      "WPM (slov za minutu)",
      "Odchylka od baseline klienta",
      "Počet a délka pauz",
      "Variabilita tempa",
      "Trend rychlosti řeči v čase",
    ],
    goodScenario: {
      title: "Klidná a vyrovnaná komunikace",
      description:
        "Klient mluví průměrně 140 slov/min, což odpovídá jeho baseline. Pauzy jsou přirozené, tempo stabilní. Komunikace je konstruktivní a věcná.",
      indicators: [
        "140 WPM — v normálu (baseline 135–150)",
        "Přirozené pauzy 0.5–1.5s",
        "Stabilní tempo bez výkyvů",
        "Konzistentní s posledními 6 hovory",
      ],
      actions: ["Žádná akce nutná", "Archivovat jako referenční záznam"],
    },
    badScenario: {
      title: "Rozrušený klient",
      description:
        "Rychlost řeči dosáhla 220 WPM — o 60 % nad baseline. Klient mluví bez pauz, přeskakuje témata a opakuje se. Jasný indikátor frustrace nebo urgence.",
      indicators: [
        "220 WPM — 60 % nad baseline",
        "Minimální pauzy (< 0.2s)",
        "Vysoká variabilita tempa",
        "Koreluje s negativním sentimentem v emailech",
      ],
      actions: [
        "Prioritně vyřešit klientův problém",
        "Nabídnout osobní schůzku",
        "Informovat vedoucího o eskalaci",
        "Zkontrolovat poslední interakce — co způsobilo frustraci",
      ],
    },
    frequency: "Per hovor (automaticky)",
    automationLevel: "88 % automatizováno",
    relatedAnalyses: ["8-02", "8-06", "7-01", "7-03"],
    businessImpact: "Střední — doplňkový indikátor emocionálního stavu",
    implementationStatus: "Beta",
    scope: "client",
  },
  {
    id: "8-02",
    sectionId: 8,
    sectionTitle: "Hlasová a lingvistická analýza",
    name: "Změna hlasu v čase",
    source: "akustika",
    good: "Konzistentní tón",
    bad: "Monotónní hlas — únava/deprese",
    description:
      "Dlouhodobá akustická analýza hlasového profilu klienta. Změny základního frekvenčního rozsahu (F0), energie hlasu a prozodické variability v čase mohou indikovat zdravotní problémy, únavu, depresi nebo stres. Tato analýza je citlivá (GDPR čl. 9 — zvláštní kategorie dat) a používá se pouze pro interní retention signály.",
    methodology:
      "librosa extrakce akustických featur: pitch mean/std (F0), jitter, shimmer, spectral tilt, energy RMS. Per-klient baseline z prvních 10 hovorů. Anomaly detection (Isolation Forest) na akustickém vektoru. pyAudioAnalysis pro klasifikaci emocionální valence.",
    dataInputs: [
      "Audio záznamy Daktela (GET /api/v6/records)",
      "librosa audio features (pitch, energy, tempo)",
      "pyAudioAnalysis emocionální klasifikátor",
      "Baseline akustický profil per klient",
      "Metadata hovoru (čas, délka)",
    ],
    outputMetrics: [
      "Prozodická variabilita (std F0)",
      "Energy RMS trend",
      "Jitter / shimmer (kvalita hlasu)",
      "Emocionální valence score",
      "Anomaly score akustický",
    ],
    goodScenario: {
      title: "Konzistentní vokální profil",
      description:
        "Klient má stabilní akustický profil, prozodická variabilita v normálu, energie vyvážená. Hlas zní 'normálně' napříč hovory.",
      indicators: [
        "F0 std konstantní ±5 %",
        "Energy RMS stabilní",
        "0 anomalies za 6M",
        "Valence neutral/positive",
      ],
      actions: ["Pokračovat v monitoringu"],
    },
    badScenario: {
      title: "Monotónní hlas — varovný signál",
      description:
        "Dlouhodobý pokles prozodické variability o 40 %, plochá intonace, pokles energie. Akustický profil odpovídá vzorci deprese nebo dlouhodobé únavy. Klient potřebuje lidský kontakt, ne jen service.",
      indicators: [
        "F0 std pokles −40 %",
        "Energy RMS −25 %",
        "Monotónní intonace 3+ měsíce",
        "Valence negative",
      ],
      actions: [
        "Empatický outreach partnerem kanceláře",
        "Nabídnout osobní schůzku v klidném prostředí",
        "Zjistit kontext (zdraví, rodina, business)",
        "Diskrétně — NIKDY nediagnostikovat (§ 9 GDPR)",
      ],
    },
    frequency: "Měsíčně (agregace)",
    automationLevel: "70 % automatizováno",
    relatedAnalyses: ["8-01", "8-06", "7-01", "7-08"],
    businessImpact: "Střední — včasná detekce well-being klienta",
    implementationStatus: "Beta",
    scope: "client",
  },
  {
    id: "8-03",
    sectionId: 8,
    sectionTitle: "Hlasová a lingvistická analýza",
    name: "Odborný vs. laický slovník",
    source: "lexikální",
    good: "Klient rozumí 80% termínů",
    bad: "Nerozumí ničemu — špatná komunikace",
    description:
      "Lexikální analýza slovníku klienta — jak často používá odbornou účetní/daňovou terminologii. Určuje úroveň finanční gramotnosti a pomáhá kanceláři kalibrovat komunikační styl. Klient, který nerozumí termínům 'dohadná položka', 'opravná položka' nebo 'daňově uznatelný náklad', potřebuje zjednodušenou komunikaci.",
    methodology:
      "spaCy cs_core_news_lg lemmatizace + dictionary matching proti slovníku účetních termínů (~1200 termů). Výpočet term_usage_rate = domain_terms / total_words. Dále detekce misuse (špatně použitý termín). Klasifikace do 4 úrovní: laik / začátečník / pokročilý / expert.",
    dataInputs: [
      "Přepisy hovorů Daktela (STT)",
      "Emailová komunikace (IMAP body)",
      "spaCy cs_core_news_lg",
      "Slovník účetních/daňových termínů (interní)",
      "Historická baseline per klient",
    ],
    outputMetrics: [
      "Term usage rate (%)",
      "Klasifikace úrovně (laik/pokročilý/expert)",
      "Top používané termíny",
      "Misuse rate (chybné použití)",
      "Trend 12M (učí se klient?)",
    ],
    goodScenario: {
      title: "Finančně gramotný klient",
      description:
        "Klient aktivně používá odbornou terminologii, správně chápe 80 % termínů. Komunikace je efektivní, bez nutnosti překládat každý pojem.",
      indicators: [
        "Term usage 18 %",
        "Klasifikace 'pokročilý'",
        "Misuse rate 2 %",
        "Rozumí 80 % termínů",
      ],
      actions: [
        "Zvážit upsell advisory služeb",
        "Používat přímou odbornou komunikaci",
      ],
    },
    badScenario: {
      title: "Lost in translation",
      description:
        "Klient nepoužívá odborné termíny, na dotazy účetního 'Budete potřebovat opravnou položku' odpovídá 'co to je?'. Opakované misuse. Kancelář posílá reporty, kterým klient nerozumí.",
      indicators: [
        "Term usage 2 %",
        "Klasifikace 'laik'",
        "Misuse rate 45 %",
        "Opakované žádosti o vysvětlení",
      ],
      actions: [
        "Přepnout komunikační šablony na 'plain Czech'",
        "Vytvořit glossary pro klienta",
        "Edukační materiál (video / PDF)",
        "Při reportech přidat manažerské shrnutí",
      ],
    },
    frequency: "Kvartálně",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["8-04", "8-05", "7-02"],
    businessImpact: "Střední — kvalita vzájemného porozumění",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "8-04",
    sectionId: 8,
    sectionTitle: "Hlasová a lingvistická analýza",
    name: "«My» vs. «já»",
    source: "pronominální",
    good: "Identifikace s firmou",
    bad: "Jen «já» — odtržení od firmy",
    description:
      "Pronominální analýza — poměr použití 'my/naše' vs. 'já/moje' v řeči jednatele klienta. Vysoký podíl 'my' znamená identifikaci s firmou, zdravou firemní kulturu. Dominance 'já' může indikovat odtržení zakladatele od firmy, plánovaný exit nebo osamocenost v rozhodování.",
    methodology:
      "spaCy cs_core_news_lg POS tagging + dependency parsing. Extrakce všech osobních zájmen v 1. osobě: sg (já, mě, mi, mně, mnou, můj/má/mé) vs. pl (my, nás, nám, námi, náš/naše). Výpočet plural_ratio = pl_count / (sg_count + pl_count). Porovnání baseline + trend.",
    dataInputs: [
      "Přepisy hovorů Daktela",
      "Emailová komunikace",
      "spaCy cs_core_news_lg (POS, DEP)",
      "Historická baseline (12M)",
      "Kontext: počet zaměstnanců klienta (ARES)",
    ],
    outputMetrics: [
      "Plural ratio (my / celkem 1. osoba)",
      "Změna ratio vs. baseline",
      "Trend 12M (zvyšuje / snižuje)",
      "Korelace s firemními výsledky",
      "Alert threshold: ratio < 0.3",
    ],
    goodScenario: {
      title: "Jednatel = hrdý člen týmu",
      description:
        "Jednatel používá 'my/naše' v 65 % případů, jasně se identifikuje s firmou. 'U nás ve firmě jsme se rozhodli...' — zdravý přístup.",
      indicators: [
        "Plural ratio 0.65",
        "Konzistentní 12M",
        "Mluví o týmu, ne 'já'",
        "Pozitivní kontext 'my'",
      ],
      actions: [
        "Zdravý signál — udržet vztah",
        "Potenciál pro dlouhodobou spolupráci",
      ],
    },
    badScenario: {
      title: "Odtržení od firmy",
      description:
        "Jednatel mluví výhradně 'já' (ratio 0.12), firmu popisuje jako 'oni', 'to moje s.r.o.'. Signál plánovaného exitu, prodeje firmy nebo hluboké demotivace.",
      indicators: [
        "Plural ratio 0.12",
        "Pokles z 0.6 → 0.12 za 6M",
        "'Oni ve firmě' — distance",
        "Korelace s vypnutou komunikací",
      ],
      actions: [
        "Osobní schůzka — zjistit co se děje",
        "Monitorovat signály prodeje firmy (10-xx)",
        "Připravit retention scenario pro případ prodeje",
        "Alert na churn risk (10-01)",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["8-03", "8-08", "7-01", "10-01"],
    businessImpact: "Střední — prediktor strategických změn klienta",
    implementationStatus: "Beta",
    scope: "client",
  },
  {
    id: "8-05",
    sectionId: 8,
    sectionTitle: "Hlasová a lingvistická analýza",
    name: "Dialekt",
    source: "fonetika",
    good: "Standardní čeština",
    bad: "Silný dialekt — možné nedorozumění",
    description:
      "Detekce regionálního dialektu / sociolektu klienta. Silný moravský, hanácký, lašský nebo slovenský dialekt může vést k nedorozumění při přepisu hovorů i v ústní komunikaci. Systém identifikuje dialekt a doporučuje přiřazení účetního se stejným nebo kompatibilním jazykovým zázemím.",
    methodology:
      "Fonetická analýza na audio pomocí pyAudioAnalysis + klasifikátor dialektu (trained na CZ regional accents). Lexikální analýza v přepisech (diagnostická slova: 'bylo' vs. 'buło', 'chleba' vs. 'chléb'). Výsledek: confidence per dialekt (standard CZ, moravský, slezský, slovenský).",
    dataInputs: [
      "Audio Daktela (akustické rysy)",
      "Přepisy s regionalismy",
      "Dialektový klasifikátor (pretrained)",
      "Diagnostický slovník (~200 slov per region)",
      "Matching účetní ↔ dialekt",
    ],
    outputMetrics: [
      "Primary dialekt + confidence",
      "Dialekt strength (0-100)",
      "Mutual intelligibility score",
      "Doporučený účetní (match)",
      "Flag misunderstanding risk",
    ],
    goodScenario: {
      title: "Standardní čeština bez bariér",
      description:
        "Klient mluví spisovnou češtinou, přepisy STT mají 98 % přesnost. Žádné nedorozumění, žádný dialektický drift.",
      indicators: [
        "Standard CZ confidence 0.96",
        "STT accuracy 98 %",
        "0 misunderstanding cases",
        "Dialekt strength < 20",
      ],
      actions: ["Standardní komunikace"],
    },
    badScenario: {
      title: "Silný dialekt — nedorozumění",
      description:
        "Klient mluví silným lašským dialektem, STT má 72 % přesnost. Účetní (z Prahy) nerozumí 15 % sdělení. Opakované dotazy 'co jste říkal?'.",
      indicators: [
        "Lašský dialekt confidence 0.88",
        "STT accuracy 72 %",
        "3 misunderstanding cases / měsíc",
        "Dialekt strength 78",
      ],
      actions: [
        "Přiřadit účetního z Moravy/Slezska",
        "Vyžadovat písemné potvrzení klíčových instrukcí",
        "Fine-tune STT model na lašský dialekt",
        "Reenio schůzky s video (usnadní rozumění)",
      ],
    },
    frequency: "Jednorázově při onboardingu + kvartální review",
    automationLevel: "80 % automatizováno",
    relatedAnalyses: ["8-01", "8-03", "8-07"],
    businessImpact: "Nízký — operativní efektivita",
    implementationStatus: "V přípravě",
    scope: "client",
  },
  {
    id: "8-06",
    sectionId: 8,
    sectionTitle: "Hlasová a lingvistická analýza",
    name: "Ironie a sarkasmus",
    source: "kontextové NLP",
    good: "0 detekovaných",
    bad: "4 ironické poznámky — skrytá nespokojenost",
    description:
      "Detekce ironie a sarkasmu v klientské komunikaci. Ironie je sofistikovaný signál skryté nespokojenosti — klient nemluví přímo, ale sarkastickou poznámkou ('No, aspoň to DPH jste podali včas, že?'). Detekce vyžaduje kontextové NLP, nikoli pouhou sentiment analýzu.",
    methodology:
      "Fine-tuned transformer (XLM-RoBERTa) na CZ sarkasm dataset + kontextová analýza. Kombinace signálů: 1) Pozitivní slova v negativním kontextu, 2) Hyperbola ('konečně', 'aspoň', 'výborně' ironicky), 3) Prozodie (audio, stoupající intonace), 4) Negativní události v předchozí komunikaci.",
    dataInputs: [
      "Přepisy hovorů Daktela",
      "Emailová komunikace",
      "Audio prozodie (pyAudioAnalysis)",
      "Sentiment kontext z 7-01",
      "XLM-RoBERTa fine-tuned klasifikátor",
    ],
    outputMetrics: [
      "Počet ironických poznámek / měsíc",
      "Sarcasm confidence per výrok",
      "Top témata ironie",
      "Sarkasm trend 6M",
      "Korelace s CRM událostmi",
    ],
    goodScenario: {
      title: "Přímá a otevřená komunikace",
      description:
        "Klient komunikuje přímo, bez ironie. Pokud má problém, řekne to otevřeně. Žádné skryté signály nespokojenosti.",
      indicators: [
        "0 detekovaných ironických poznámek",
        "Přímá konstruktivní kritika",
        "Sarkasm score 0.04 (velmi nízké)",
        "Konzistentní tón",
      ],
      actions: ["Ocenit přímost", "Udržet otevřenou komunikaci"],
    },
    badScenario: {
      title: "Skrytá nespokojenost pod vrstvou sarkasmu",
      description:
        "4 ironické poznámky za poslední měsíc: 'No, aspoň jednou se mi ozvete', 'Super, že jste DPH podali včas', 'Výborně, jen 3 chyby tentokrát'. Sentiment povrchně neutrální, ale skryté silné napětí.",
      indicators: [
        "4 ironické poznámky / měsíc",
        "Sarcasm score 0.82",
        "Témata: rychlost, chyby, compliance",
        "Sentiment neutrální (povrchně OK)",
      ],
      actions: [
        "Okamžitá osobní schůzka — otevřít témata přímo",
        "Ocenit pravdu: 'Vnímám, že jste nespokojen'",
        "Root cause fix oblastí zmíněných ironicky",
        "Monitoring eskalace (7-03)",
      ],
    },
    frequency: "Týdně",
    automationLevel: "75 % automatizováno",
    relatedAnalyses: ["7-01", "7-03", "8-01"],
    businessImpact: "Vysoký — detekce skrytých problémů",
    implementationStatus: "Beta",
    scope: "client",
  },
  {
    id: "8-07",
    sectionId: 8,
    sectionTitle: "Hlasová a lingvistická analýza",
    name: "Jazyk komunikace",
    source: "per-klient",
    good: "Konzistentně CZ",
    bad: "Přepíná CZ/DE — signál změny partnera",
    description:
      "Detekce primárního jazyka komunikace per klient a jeho změn v čase. Klient, který náhle začne komunikovat v němčině nebo angličtině, může mít nového strategického partnera (např. německá matka zvažuje centralizaci účetnictví), novou generaci vedení nebo připravuje expanzi.",
    methodology:
      "Language detection (langdetect / fastText lid.176) per zpráva. Agregace v čase, detekce switch pointů. Korelace s business kontexty: zahraniční transakce ARES, nový partner v OR, cross-border DPH.",
    dataInputs: [
      "IMAP emailové body",
      "Přepisy Daktela (jazyk hovoru)",
      "Chat zprávy",
      "fastText lid.176 klasifikátor",
      "ARES data (zahraniční vlastník)",
    ],
    outputMetrics: [
      "Primary language per zpráva",
      "Language mix distribuce (%)",
      "Switch point detection",
      "Korelace se změnami OR",
      "Flag cross-border risk",
    ],
    goodScenario: {
      title: "Stabilní jazykový profil",
      description:
        "Klient komunikuje konzistentně v češtině, 98 % zpráv CZ, 2 % DE (faktury zahraničním dodavatelům — očekávané).",
      indicators: [
        "98 % CZ konzistentně",
        "0 switch points",
        "DE jen u zahr. faktur",
        "Stabilní 12M",
      ],
      actions: ["Standardní provoz"],
    },
    badScenario: {
      title: "Jazyková změna — signál strategické proměny",
      description:
        "Klient v posledních 2 měsících přepnul na 60 % DE komunikaci. Korelace s registrací nového jednatele z Německa v OR. Možná centralizace účetnictví k německé matce — high churn risk.",
      indicators: [
        "Switch 100% CZ → 60% DE za 2M",
        "Nový DE jednatel v OR (ARES)",
        "Emailové kopie na DE adresy",
        "Otázky k cross-border DPH",
      ],
      actions: [
        "Osobní schůzka — zjistit strategický plán",
        "Nabídnout DE-speaking account team",
        "Prezentovat DE kapability kanceláře",
        "Proaktivní retention — connect s matkou",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["8-05", "8-08", "10-01"],
    businessImpact: "Vysoký — prediktor strategické změny klienta",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "8-08",
    sectionId: 8,
    sectionTitle: "Hlasová a lingvistická analýza",
    name: "Kdo rozhoduje",
    source: "analýza autority",
    good: "Jednatel = rozhodovatel",
    bad: "Rozhoduje asistentka — jednatel outsider",
    description:
      "Analýza autority v komunikaci — kdo fakticky rozhoduje u klienta? Jednatel, finanční ředitel, asistentka? Identifikace skutečného rozhodovatele je klíčová pro efektivní prodej, retention a strategickou komunikaci. Pokud rozhoduje někdo jiný než oficiální signatář, je riziko, že oficiální kontakty směřují na nepravého adresáta.",
    methodology:
      "NLP analýza formálnosti (Vy/ty, formální x neformální slovník), detekce rozhodovacích marker frází ('schválím', 'rozhodl jsem', 'musím konzultovat s...'). Korelace s email signatures + CC/BCC patterns. Social network analysis kdo inicuje klíčové emaily (platby, smlouvy, strategická rozhodnutí).",
    dataInputs: [
      "Email headers (From/To/CC)",
      "Email signatures extraction",
      "Přepisy Daktela (kdo inicioval)",
      "Formality classifier CZ (Vy/ty detector)",
      "CRM kontakty s role flags",
    ],
    outputMetrics: [
      "Decision maker identifikace",
      "Authority score per kontakt",
      "Email iniciace rate per osoba",
      "Formality rozložení",
      "Gap: oficiální vs. reálný rozhodovatel",
    ],
    goodScenario: {
      title: "Jednatel aktivně rozhoduje",
      description:
        "Jednatel je primární kontakt, iniciuje 80 % strategických emailů, schvaluje rozhodnutí. Shoda mezi oficiálním a reálným rozhodovatelem.",
      indicators: [
        "Jednatel iniciuje 80 % strategie",
        "Authority score 0.91",
        "Alignment oficiální = reálný",
        "Decision marker frequency vysoká",
      ],
      actions: [
        "Pokračovat v komunikaci s jednatelem",
        "Strategické nabídky cílit na něj",
      ],
    },
    badScenario: {
      title: "Jednatel mimo — rozhoduje asistentka",
      description:
        "Asistentka iniciuje 75 % emailů, deleguje za jednatele, rozhoduje o platbách 'z jeho jména'. Jednatel ve skutečnosti mimo provoz. Riziko, že oficiální nabídky a retention akce míří k nepravému adresátovi.",
      indicators: [
        "Asistentka iniciuje 75 %",
        "Jednatel authority score 0.18",
        "Misalignment oficiální ≠ reálný",
        "'Pan jednatel se k tomu nevyjádří' opakovaně",
      ],
      actions: [
        "Retention aktivity cílit na asistentku (je to ona, kdo rozhodne)",
        "Zjistit, proč je jednatel mimo (nemoc? exit?)",
        "Oficiální smlouvy — kontakt na oba",
        "Monitoring průběhu (asistentka může odejít)",
      ],
    },
    frequency: "Kvartálně",
    automationLevel: "75 % automatizováno",
    relatedAnalyses: ["8-04", "8-07", "12-01"],
    businessImpact: "Vysoký — efektivita retence a upsellu",
    implementationStatus: "Beta",
    scope: "client",
  },
];
