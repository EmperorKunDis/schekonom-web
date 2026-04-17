import type { AnalysisDetail } from "./types";

export const section19Analyses: AnalysisDetail[] = [
  {
    id: "19-01",
    sectionId: 19,
    sectionTitle: "Externí signály",
    name: "ARES + VIES",
    source: "API",
    good: "Vše validní, plátce DPH",
    bad: "Dodavatel zrušen v ARES — fiktivní firma",
    description:
      "Automatická validace obchodních partnerů klientů proti registrům ARES (Administrativní registr ekonomických subjektů) a VIES (VAT Information Exchange System). Systém průběžně ověřuje platnost IČO, DIČ, sídlo a stav registrace.\n\nDetekce neplatných nebo zrušených subjektů chrání klienty před obchodováním s fiktivními firmami, nespolehlivými plátci DPH a subjekty v insolvenci.\n\nSystém kontroluje i změny — pokud se partner přestěhuje, změní právní formu nebo je zrušen, okamžitě informuje.",
    methodology:
      "API monitoring: 1) Denní kontrola IČO proti ARES, 2) Denní kontrola DIČ proti VIES, 3) Cross-reference se seznamem nespolehlivých plátců, 4) Alert při změně nebo zrušení, 5) Historický audit trail kontrol.",
    dataInputs: [
      "IČO a DIČ obchodních partnerů klientů",
      "ARES REST API",
      "VIES SOAP API",
      "Seznam nespolehlivých plátců DPH (MF ČR)",
      "Insolvenční rejstřík",
    ],
    outputMetrics: [
      "Počet ověřených subjektů",
      "Počet neplatných / zrušených",
      "Počet nespolehlivých plátců",
      "Změny oproti poslednímu ověření",
    ],
    goodScenario: {
      title: "Všichni partneři validní",
      description:
        "Všechna IČO a DIČ jsou platná, všichni partneři jsou spolehliví plátci DPH a žádný není v insolvenci.",
      indicators: [
        "100 % validních subjektů",
        "0 nespolehlivých plátců",
        "0 insolvencí",
        "Žádné změny za měsíc",
      ],
      actions: [
        "Pokračovat v denním monitoringu",
        "Archivovat výsledky pro audit trail",
      ],
    },
    badScenario: {
      title: "Detekován problematický subjekt",
      description:
        "Dodavatel s IČO 12345678 byl zrušen v ARES. Klient s ním má aktivní smlouvu a nezaplacené faktury v hodnotě 340 000 Kč. Riziko ztráty a ručení za DPH.",
      indicators: [
        "1 zrušený subjekt v ARES",
        "Aktivní smlouva s klientem",
        "Nezaplacené faktury 340 000 Kč",
        "Subjekt na seznamu nespolehlivých plátců",
      ],
      actions: [
        "Okamžitě informovat klienta",
        "Pozastavit platby dodavateli",
        "Konzultovat právní oddělení",
        "Přihlásit pohledávku do insolvence",
      ],
    },
    frequency: "Denně",
    automationLevel: "98 % automatizováno",
    relatedAnalyses: ["19-02", "19-08", "10-03", "6-01"],
    businessImpact: "Vysoký — ochrana před podvody a ručením",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "19-02",
    sectionId: 19,
    sectionTitle: "Externí signály",
    name: "Insolvenční rejstřík",
    source: "justice.cz",
    good: "0 nálezů",
    bad: "Klient podal insolvenční návrh",
    description:
      "Denní monitoring insolvenčního rejstříku (ISIR) na justice.cz pro všechna IČO v klientském portfoliu — jak klientů samotných, tak jejich klíčových obchodních partnerů. Systém detekuje nové insolvenční návrhy, zahájení řízení, rozhodnutí o úpadku a oddlužení.\n\nVčasná detekce insolvence partnera klienta umožňuje přihlásit pohledávky ve lhůtě. Detekce vlastní insolvence klienta vyžaduje okamžitou reakci — úpravu fakturace, přihlášku pohledávek a právní konzultaci.\n\nSystém monitoruje ISIR API a parsuje XML odpovědi s novými událostmi per IČO.",
    methodology:
      "ISIR monitoring: 1) Denní dotaz na ISIR API — GET https://isir.justice.cz/isir/common/stat.do?ico={ico} per IČO, 2) Parsování XML odpovědi — nové spisy, události, rozhodnutí, 3) Klasifikace závažnosti: návrh (warning) / zahájení (high) / úpadek (critical) / oddlužení (info), 4) Cross-reference s fakturačními daty (máme pohledávku?), 5) Automatická notifikace s doporučenou akcí.",
    dataInputs: [
      "ISIR API — https://isir.justice.cz (IČO klientů + IČO partnerů z faktur)",
      "Fakturační data — otevřené pohledávky per klient/partner",
      "Saldokonto — stav úhrad per obchodní partner",
      "CRM — vazby klient↔partner (z analýzy 14-04)",
      "Právní databáze — lhůty pro přihlášení pohledávek",
    ],
    outputMetrics: [
      "Počet monitorovaných IČO",
      "Nové insolvenční události per den",
      "Pohledávky at risk (Kč)",
      "Lhůty pro přihlášení (dny do deadline)",
      "Status per insolvence (návrh/zahájení/úpadek/oddlužení)",
    ],
    goodScenario: {
      title: "0 nálezů",
      description:
        "Žádné IČO v portfoliu nemá záznam v ISIR. Všichni klienti a jejich klíčoví partneři jsou solventní. Monitoring probíhá bez incidentu.",
      indicators: [
        "0 insolvenčních nálezů",
        "450 monitorovaných IČO (klienti + partneři)",
        "Denní scan: 100 % kompletní",
        "Pohledávky at risk: 0 Kč",
      ],
      actions: [
        "Pokračovat v denním monitoringu",
        "Rozšiřovat monitoring o nové partnery z faktur",
        "Kvartální report pro management",
      ],
    },
    badScenario: {
      title: "Klient podal insolvenční návrh",
      description:
        "Klient DEF s.r.o. (IČO 98765432) podal insolvenční návrh — zahájeno řízení. Naše pohledávky: 180K Kč (4 nezaplacené faktury). Lhůta pro přihlášení: 30 dní. Navíc: 3 naši klienti jsou dodavatelé DEF s expozicí 2.1M Kč.",
      indicators: [
        "Insolvence: DEF s.r.o. — řízení zahájeno",
        "Naše pohledávky: 180K Kč",
        "Lhůta přihlášení: 30 dní",
        "3 klienti-dodavatelé at risk: 2.1M Kč celkem",
      ],
      actions: [
        "Okamžitě přihlásit pohledávku 180K do insolvence",
        "Informovat 3 klienty-dodavatele (diskrétně, obecně)",
        "Zastavit poskytování služeb DEF (konzultace s právníkem)",
        "Připravit opravné daňové doklady (DPH)",
      ],
    },
    frequency: "Denně (automatický scan)",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["19-01", "19-08", "14-04", "1-04"],
    businessImpact: "Kritický — ochrana pohledávek a compliance",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "19-03",
    sectionId: 19,
    sectionTitle: "Externí signály",
    name: "Pracovní inzeráty",
    source: "scraping",
    good: "Najímá — roste",
    bad: "Najímá účetní — chce nás nahradit?",
    description:
      "Web scraping pracovních inzerátů klientských firem na jobs.cz, indeed.cz, profesia.cz a LinkedIn. Inzeráty obsahují cenné signály: najímání = růst, najímání účetního = potenciální insourcing (nahrazení naší služby), propouštění = problémy.\n\nSystém scrapuje portály denně a matchuje firmy dle názvu a IČO. Inzeráty jsou klasifikovány: pozice, obor, seniorita. Zvláštní pozornost je věnována účetním/finančním pozicím — ty přímo ohrožují naši službu.\n\nPro klienty s 50+ zaměstnanci je najímání CFO/controllera signálem sofistikace — příležitost pro premium služby.",
    methodology:
      "Job listing intelligence: 1) Denní scraping: jobs.cz API (partners), indeed.cz (public), LinkedIn Jobs (RSS), 2) Company matching: název firmy (fuzzy) + IČO (exact, pokud dostupné), 3) Klasifikace pozice: NLP classification (účetní/finance/jiné), seniorita (junior/senior/management), 4) Signal extraction: growth (mnoho pozic) / insourcing risk (účetní pozice) / distress (propouštění zmíněno), 5) Alert při detekci účetní/finanční pozice.",
    dataInputs: [
      "Jobs.cz — partner API / public scraping (firma, pozice, popis, datum)",
      "Indeed.cz — public scraping",
      "LinkedIn Jobs — RSS feed per firma (pokud public)",
      "CRM — IČO a název firmy per klient pro matching",
      "Historické inzeráty — trend databáze",
    ],
    outputMetrics: [
      "Počet aktivních inzerátů per klient",
      "Typ pozic (účetní/finance vs. jiné)",
      "Growth signal (počet pozic vs. historie)",
      "Insourcing risk score (0–100)",
      "Alert: finance/accounting position detected",
    ],
    goodScenario: {
      title: "Najímá — roste",
      description:
        "Klient inzeruje 5 pozic (2× výrobní, 1× obchodní, 1× IT, 1× HR). Žádná finance/accounting pozice. Signál růstu — obrat pravděpodobně poroste, budou potřebovat rozšíření služeb.",
      indicators: [
        "5 aktivních inzerátů (0 finance/accounting)",
        "Insourcing risk: 0/100",
        "Growth signal: silný (+5 pozic vs. 0 historicky)",
        "Predikce: +20 % obrat do 12M",
      ],
      actions: [
        "Proaktivně nabídnout rozšíření služeb (více zaměstnanců = více mezd)",
        "Připravit kapacity na rostoucí objem",
        "Nabídnout onboarding nových zaměstnanců (pracovní smlouvy, přihlášky)",
      ],
    },
    badScenario: {
      title: "Najímá účetní — chce nás nahradit?",
      description:
        "Klient inzeruje 'Hlavní účetní/účetní manažer' na jobs.cz. Popis pozice: 'Vedení účetnictví, daňová přiznání, mzdy.' To je přesně to, co děláme my. Insourcing risk: 85/100.",
      indicators: [
        "1 inzerát: 'Hlavní účetní' (NLP: accounting, seniorita: senior)",
        "Insourcing risk: 85/100",
        "Popis pozice překrývá naše služby na 90 %",
        "Klient nezminil záměr insourcovat",
      ],
      actions: [
        "Proaktivní schůzka s jednatelem — 'Všimli jsme si, že hledáte účetní'",
        "Prezentovat TCO srovnání: interní účetní vs. naše služby",
        "Nabídnout hybridní model (interní operativa + naše supervize)",
        "Připravit retention nabídku — premium služba za lepší cenu",
      ],
    },
    frequency: "Denně (scraping), okamžitý alert při finance/accounting pozici",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["19-01", "19-04", "10-01", "16-01"],
    businessImpact: "Vysoký — včasná detekce insourcing rizika",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "19-04",
    sectionId: 19,
    sectionTitle: "Externí signály",
    name: "Tiskové zprávy",
    source: "RSS",
    good: "Pozitivní PR",
    bad: "Negativní média — reputační riziko",
    description:
      "Monitoring mediálních zmínek klientských firem v českých a německých médiích prostřednictvím RSS feedů a news API. Systém detekuje pozitivní i negativní publicitu a vyhodnocuje dopad na podnikání klienta.\n\nPozitivní PR (ocenění, expanze, nový produkt) je příležitostí pro gratulaci a prohloubení vztahu. Negativní PR (skandál, soudní spor, environmentální problém) vyžaduje proaktivní reakci — klient bude pod tlakem a může potřebovat podporu.\n\nSystém parsuje RSS feedy hlavních zpravodajských serverů a hledá zmínky dle názvu firmy a jmen klíčových osob.",
    methodology:
      "Media monitoring: 1) RSS feed aggregace: iDNES.cz, Aktuálně.cz, E15.cz, HN.cz, CzechCrunch, + DE: Handelsblatt, WirtschaftsWoche, 2) Keyword matching: název firmy, IČO, jména jednatelů/spolumajitelů, 3) NLP sentiment analýza: pozitivní/neutrální/negativní, 4) Impact scoring: reach × sentiment × relevance, 5) Alert při negativní zmínce s impact score > 50.",
    dataInputs: [
      "RSS feedy: iDNES, Aktuálně, E15, HN, CzechCrunch (CZ)",
      "RSS feedy: Handelsblatt, WirtschaftsWoche (DE — pro pendlery)",
      "Google News API — keyword alert per firma",
      "CRM — názvy firem, jména klíčových osob, obor",
      "Historické zmínky — trend databáze",
    ],
    outputMetrics: [
      "Počet mediálních zmínek per klient per měsíc",
      "Sentiment distribuce (pozitivní/neutrální/negativní)",
      "Impact score per zmínka (0–100)",
      "Top zmínky za období (headline + source + sentiment)",
      "Trend media presence (roste/klesá)",
    ],
    goodScenario: {
      title: "Pozitivní PR",
      description:
        "Klient zmíněn v E15.cz: 'Firma XYZ získala ocenění Podnikatel roku 2026 v Ústeckém kraji.' Sentiment: pozitivní. Impact score: 75. Příležitost pro gratulaci a case study.",
      indicators: [
        "1 pozitivní zmínka (E15.cz, impact 75)",
        "Sentiment: 100 % pozitivní za měsíc",
        "Ocenění = validace kvality firmy",
        "Mediální reach: ~200K čtenářů",
      ],
      actions: [
        "Gratulovat jednateli osobně",
        "Nabídnout PR spolupráci — zmínka o naší kanceláři jako partnera",
        "Požádat o referenci / testimonial",
        "Sdílet na sociálních sítích kanceláře",
      ],
    },
    badScenario: {
      title: "Negativní média — reputační riziko",
      description:
        "Klient zmíněn v Aktuálně.cz: 'Firma XYZ čelí žalobě za znečištění vody v průmyslové zóně.' Sentiment: negativní. Impact score: 85. Klient bude pod tlakem, možné finanční dopady (pokuta, náhrada škody).",
      indicators: [
        "1 negativní zmínka (Aktuálně.cz, impact 85)",
        "Téma: environmentální spor (potenciální pokuta)",
        "Mediální reach: ~400K čtenářů",
        "Potenciální finanční dopad: > 1M Kč",
      ],
      actions: [
        "Kontaktovat klienta — nabídnout podporu (ne komentovat případ)",
        "Připravit finanční scénáře (pokuta, náhrada, právní náklady)",
        "Monitorovat vývoj případu intenzivně",
        "Zvážit dopad na kredit a cash flow klienta",
      ],
    },
    frequency: "Denně (RSS scan), okamžitý alert při negativní zmínce",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["19-01", "19-03", "19-06", "7-01"],
    businessImpact: "Střední — proaktivní vztah management",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "19-05",
    sectionId: 19,
    sectionTitle: "Externí signály",
    name: "Výběrová řízení",
    source: "portál",
    good: "Vyhrál zakázku 12M",
    bad: "Prohrál 3 tendry v řadě",
    description:
      "Monitoring účasti klientů ve veřejných výběrových řízeních a zakázkách prostřednictvím portálů tender.cz, vestnikverejnychzakazek.cz a TED (EU). Výhra zakázky signalizuje růst a potřebu kapacit, prohra signalizuje možné problémy.\n\nPro účetní kancelář je klíčové vědět, zda klient vyhraje velkou zakázku — bude potřebovat rozšíření služeb (více faktur, subdodavatelé, reporting). Prohra tendru může vést ke cash flow problémům.\n\nSystém páruje klienty s tendry dle IČO a monitoruje výsledky.",
    methodology:
      "Public procurement monitoring: 1) Scraping vestnikverejnychzakazek.cz — search per IČO, 2) TED (Tenders Electronic Daily) API — EU zakázky per IČO, 3) Parsování výsledků: status (podáno/vyhráno/prohráno), hodnota, typ, 4) Impact analysis: vyhraná zakázka → obrat impact, prohraná → opportunity cost, 5) Alert při výhře > 1M Kč nebo 3 prohrách v řadě.",
    dataInputs: [
      "Věstník veřejných zakázek — vestnikverejnychzakazek.cz (IČO search)",
      "TED API — EU veřejné zakázky (EU/CZ scope)",
      "Tender.cz — soukromé tendry (pokud public)",
      "CRM — IČO klientů pro matching",
      "Finanční data klienta — obrat, cash flow (pro impact analýzu)",
    ],
    outputMetrics: [
      "Počet aktivních tendrů per klient",
      "Win/loss rate (%, historická)",
      "Hodnota vyhraných zakázek (Kč, YTD)",
      "Pipeline (podané, čekající na rozhodnutí)",
      "Impact na predikovaný obrat",
    ],
    goodScenario: {
      title: "Vyhrál zakázku 12M",
      description:
        "Klient vyhrál veřejnou zakázku na 12M Kč (stavební práce, Ústecký kraj). Realizace 18 měsíců. Bude potřebovat rozšíření fakturace, subdodavatelské smlouvy a cash flow management.",
      indicators: [
        "Vyhraná zakázka: 12M Kč / 18 měsíců",
        "Win rate klienta: 40 % (zdravý)",
        "Predikovaný obrat impact: +35 % YoY",
        "Potřeba rozšíření služeb: mzdy (nábor), fakturace (subdodavatelé)",
      ],
      actions: [
        "Gratulovat a nabídnout podporu při realizaci",
        "Proaktivně navrhnout rozšíření mzdových služeb (nábor)",
        "Nabídnout subdodavatelský accounting a cash flow reporting",
        "Připravit kapacity na zvýšený objem",
      ],
    },
    badScenario: {
      title: "Prohrál 3 tendry v řadě",
      description:
        "Klient prohrál 3 veřejné zakázky za 6 měsíců — celková hodnota 28M Kč. Win rate: 0 % (historicky 35 %). Firma je závislá na veřejných zakázkách — bez výhry hrozí cash flow krize.",
      indicators: [
        "3 prohraná tendry za 6M (hodnota 28M Kč)",
        "Win rate: 0 % (historicky 35 %)",
        "Žádná aktivní zakázka — prázdný pipeline",
        "Cash flow predikce: problém za 4M",
      ],
      actions: [
        "Proaktivně připravit cash flow scénáře",
        "Diskutovat diverzifikaci — snížit závislost na veřejných zakázkách",
        "Nabídnout cost optimization konzultaci",
        "Monitorovat cash flow intenzivně (týdně)",
      ],
    },
    frequency: "Týdně (tendr scraping), okamžitý alert při výsledku",
    automationLevel: "80 % automatizováno",
    relatedAnalyses: ["19-01", "19-04", "21-02", "2-01"],
    businessImpact: "Střední — predikce obratu a kapacitní plánování",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "19-06",
    sectionId: 19,
    sectionTitle: "Externí signály",
    name: "Regulatorní feeds",
    source: "CZ+DE+EU",
    good: "Připraven na novely",
    bad: "Novela ho zasáhne — neví o tom",
    description:
      "Monitoring legislativních změn relevantních pro klientské portfolio z českých, německých a EU zdrojů. Systém parsuje legislativní feedy, identifikuje relevantní novely per klient (dle NACE, velikosti, pendler status) a generuje impact analýzu.\n\nPro kancelář zaměřenou na pendlery CZ/DE je kritické sledovat: novely DPH (CZ i DE), změny v sociálním pojištění, A1 formuláře, daňové smlouvy CZ/DE, DSGVO/GDPR, a oborově specifické regulace.\n\nSystém proaktivně informuje klienty o relevatních změnách — přidaná hodnota, kterou konkurence neposkytuje.",
    methodology:
      "Regulatory intelligence: 1) RSS/API monitoring: zakonyprolidi.cz, Sbírka zákonů (MV ČR), BGBl (DE), EUR-Lex CELLAR API, 2) Relevance matching: novelizovaný zákon × klientský profil (NACE, pendler, DPH plátce, DE aktivity), 3) Impact scoring: rozsah změny × počet dotčených klientů × finanční dopad, 4) Auto-generování klientského briefu (CZ/DE dual language), 5) Distribution per klient per relevance.",
    dataInputs: [
      "Sbírka zákonů — zakonyprolidi.cz RSS feed (novelizace zákonů CZ)",
      "BGBl — bgbl.de RSS (novelizace zákonů DE, relevantní: EStG, SGB, UStG)",
      "EUR-Lex CELLAR API — EU direktivy a nařízení (ViDA, DAC8, Pillar Two)",
      "Klientské profily — NACE, pendler status, DPH plátce, DE aktivity",
      "Historická relevance — které novely ovlivnily které klienty (training data)",
    ],
    outputMetrics: [
      "Počet relevantních legislativních změn per měsíc",
      "Impact score per novela per klient (0–100)",
      "Počet dotčených klientů per novela",
      "Compliance gap — klient neimplementoval relevantní novelu",
      "Proactive briefings sent (počet per měsíc)",
    ],
    goodScenario: {
      title: "Připraven na novely",
      description:
        "Novela DPH (zákon 235/2004 Sb.) účinná od 1.1.2027 — systém identifikoval 45 dotčených klientů. Briefing odeslán 90 dní předem. 42 klientů implementovalo změny. 3 zbývající kontaktováni osobně.",
      indicators: [
        "Novela DPH: 45 dotčených klientů identifikováno",
        "Briefing: 90 dní předem",
        "Implementace: 93 % (42/45) do účinnosti",
        "0 compliance incidentů po účinnosti",
      ],
      actions: [
        "Pokračovat v proaktivním informování",
        "Followup se 3 klienty, kteří ještě neimplementovali",
        "Dokumentovat úspěch pro marketing (přidaná hodnota)",
      ],
    },
    badScenario: {
      title: "Novela ho zasáhne — neví o tom",
      description:
        "EU nařízení ViDA (VAT in the Digital Age) mění pravidla pro e-invoicing od 2028. Klient exportuje do 5 EU zemí — bude muset implementovat SAF-T a e-invoicing. Klient o ViDA neví. Impact score: 85.",
      indicators: [
        "ViDA: impact score 85 pro tohoto klienta",
        "Klient: 0 dotazů na ViDA (13-04 analysis: ignorující)",
        "Implementation deadline: 24 měsíců",
        "Estimated implementation cost: 200–400K Kč",
      ],
      actions: [
        "Proaktivní briefing — schůzka s jednatelem o ViDA",
        "Připravit implementační roadmap a cost estimate",
        "Nabídnout ViDA readiness assessment jako službu",
        "Naplánovat implementation timeline — 24M je méně než se zdá",
      ],
    },
    frequency: "Denně (feed monitoring), měsíčně (impact assessment)",
    automationLevel: "80 % automatizováno",
    relatedAnalyses: ["13-04", "19-01", "4-01", "5-01"],
    businessImpact: "Vysoký — compliance a přidaná hodnota pro klienty",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "19-07",
    sectionId: 19,
    sectionTitle: "Externí signály",
    name: "Kurzovní lístek",
    source: "ČNB+EZB API",
    good: "EUR stabilní, hedging nepotřeba",
    bad: "EUR +8% za měsíc — nezajištěná pozice",
    description:
      "Monitoring směnných kurzů z ČNB a ECB API s dopadem na klienty s cizoměnovými transakcemi. Pro pendlerskou klientelu je EUR/CZK kurz kritický — příjmy v EUR, výdaje v CZK. Výrazný pohyb kurzu ovlivňuje reálný příjem a daňovou povinnost.\n\nSystém denně stahuje kurzy z ČNB API, počítá volatilitu, detekuje trendy a identifikuje klienty s největší kurzovou expozicí. Pro tyto klienty generuje doporučení k hedgingu nebo konverzi.\n\nPro firmy exportující do EU je sledování kurzu klíčové pro cenotvorbu a marži.",
    methodology:
      "FX exposure monitoring: 1) Denní stahování kurzů: GET https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt, 2) ECB API: GET https://data-api.ecb.europa.eu/service/data/EXR/D.CZK.EUR.SP00.A, 3) Volatility calculation (30-day rolling std dev), 4) Exposure mapping per klient (cizoměnové faktury z účetnictví), 5) Alert při pohybu > 3 % za měsíc nebo volatilitě > historical 2σ.",
    dataInputs: [
      "ČNB kurzovní lístek API — denní kurzy (EUR, USD, GBP, PLN, CHF)",
      "ECB SDMX API — EUR referenční kurzy",
      "Účetní data klientů — cizoměnové faktury (vydané/přijaté, měna, částka)",
      "Mzdové záznamy pendlerů — příjem v EUR, výdaje v CZK",
      "Hedgingové instrumenty — existující zajištění per klient (pokud existuje)",
    ],
    outputMetrics: [
      "EUR/CZK denní kurz + 30D/90D/365D průměr",
      "Volatilita (30D rolling σ)",
      "Kurzová expozice per klient (Kč)",
      "Unrealized gain/loss z kurzových pohybů per klient",
      "Hedging recommendation (ano/ne, instrument, timing)",
    ],
    goodScenario: {
      title: "EUR stabilní, hedging nepotřeba",
      description:
        "EUR/CZK stabilní na 25.20 ± 0.15 za 90 dní. Volatilita: 0.3 % (historicky nízká). Žádný klient nemá expozici > 500K Kč. Hedging není nákladově efektivní.",
      indicators: [
        "EUR/CZK: 25.20 (30D avg: 25.18, 90D avg: 25.22)",
        "Volatilita 30D: 0.3 % (norma < 1 %)",
        "Max expozice per klient: 480K Kč",
        "Unrealized gain/loss: < ±2 % u všech klientů",
      ],
      actions: [
        "Pokračovat v denním monitoringu",
        "Informovat klienty: kurz stabilní, žádná akce potřeba",
        "Přehodnotit hedging potřebu za kvartál",
      ],
    },
    badScenario: {
      title: "EUR +8 % za měsíc — nezajištěná pozice",
      description:
        "EUR/CZK vzrostl z 25.00 na 27.00 za 30 dní (+8 %). 15 pendler-klientů s příjmy v EUR a výdaji v CZK — pozitivní dopad na příjem ale negativní na daňovou povinnost (vyšší základ daně v CZK). 3 exportní firmy s EUR expozicí > 2M Kč bez hedgingu.",
      indicators: [
        "EUR/CZK: +8 % za 30D (27.00 vs. 25.00)",
        "Volatilita 30D: 3.2 % (alarm > 2 %)",
        "15 pendlerů s kurzovým dopadem na DPFO",
        "3 firmy s nezajištěnou expozicí > 2M Kč",
      ],
      actions: [
        "Informovat pendlery o dopadu na daňovou povinnost",
        "Kontaktovat 3 firmy — nabídnout hedging konzultaci",
        "Přepočítat zálohy na DPFO pro pendlery",
        "Připravit scénáře: co když EUR pokračuje v růstu",
      ],
    },
    frequency: "Denně (kurzy), okamžitý alert při pohybu > 3 %/měsíc",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["19-01", "5-01", "21-02", "4-01"],
    businessImpact: "Střední–Vysoký — kurzový dopad na pendlery a exportéry",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "19-08",
    sectionId: 19,
    sectionTitle: "Externí signály",
    name: "Sbírka listin",
    source: "justice.cz",
    good: "Výkazy zveřejněny",
    bad: "Nezveřejněny 2 roky — pokuta 100K",
    description:
      "Monitoring povinnosti zveřejnění účetních závěrek ve sbírce listin na justice.cz. České s.r.o. a a.s. mají povinnost zveřejnit účetní závěrku do 12 měsíců po konci účetního období. Nesplnění = pokuta až 100K Kč, rejstříkový soud může zahájit řízení o zrušení.\n\nSystém automaticky kontroluje sbírku listin per IČO a ověřuje, zda jsou zveřejněny výkazy za poslední období. Pro naše klienty zajišťujeme zveřejnění — ale u nových klientů mohou chybět historické výkazy.\n\nSystém také monitoruje sbírku listin obchodních partnerů klientů — chybějící výkazy partnera signalizují neserióznost.",
    methodology:
      "Sbírka listin monitoring: 1) Justice.cz API — GET /sbirka-listin per IČO, 2) Parsování dostupných dokumentů: typ (výroční zpráva, účetní závěrka, zpráva auditora), období, datum zveřejnění, 3) Gap detection: chybějící období (aktuální rok − 1, − 2), 4) Compliance check: je vše zveřejněno v zákonné lhůtě?, 5) Alert při chybějícím období > 12M po konci účetního roku.",
    dataInputs: [
      "Justice.cz sbírka listin API — per IČO klientů a partnerů",
      "Účetní závěrky — interní (naši klienti: máme data)",
      "OR výpisy — typ společnosti (s.r.o., a.s.) → povinnost zveřejnění",
      "Kalendář — účetní období per klient (většina 1.1.–31.12.)",
      "Partneři klientů — IČO z faktur pro monitoring",
    ],
    outputMetrics: [
      "Počet klientů s kompletní sbírkou listin",
      "Počet klientů s chybějícím obdobím",
      "Dny od deadline do zveřejnění (negativní = po lhůtě)",
      "Partneři s chybějícími výkazy (risk signal)",
      "Potenciální pokuta exposure (Kč)",
    ],
    goodScenario: {
      title: "Výkazy zveřejněny",
      description:
        "Všichni klienti (s.r.o. a a.s.) mají zveřejněné účetní závěrky za poslední 3 roky. Průměrná doba zveřejnění: 45 dní po auditu (v zákonné lhůtě). Compliance: 100 %.",
      indicators: [
        "100 % compliance (všechny závěrky zveřejněny)",
        "Průměrná doba: 45 dní po schválení",
        "0 chybějících období za 3 roky",
        "0 Kč pokuta exposure",
      ],
      actions: [
        "Pokračovat v proaktivním zveřejňování",
        "Nastavit automatické připomínky per klient",
        "Ověřit i historické období nových klientů",
      ],
    },
    badScenario: {
      title: "Nezveřejněny 2 roky — pokuta 100K",
      description:
        "Klient GHI s.r.o. nemá zveřejněné závěrky za 2024 ani 2025. Lhůta pro 2024 vypršela před 6 měsíci. Rejstříkový soud může udělit pokutu až 100K Kč a zahájit řízení o zrušení společnosti. Klient o povinnosti neví.",
      indicators: [
        "2 chybějící období (2024, 2025)",
        "6 měsíců po zákonné lhůtě (2024)",
        "Pokuta exposure: 100K Kč per období",
        "Riziko: řízení o zrušení společnosti",
      ],
      actions: [
        "Okamžitě informovat klienta o povinnosti a riziku",
        "Urychleně připravit a zveřejnit závěrky za oba roky",
        "Podat omluvný dopis rejstříkovému soudu",
        "Nastavit automatické připomínky — prevence opakování",
      ],
    },
    frequency: "Měsíčně (full scan per IČO)",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["19-01", "19-02", "1-01", "4-01"],
    businessImpact: "Vysoký — compliance a reputace klientů",
    implementationStatus: "Produkce",
    scope: "client",
  },
];
