import type { AnalysisDetail } from "./types";

export const section15Analyses: AnalysisDetail[] = [
  {
    id: "15-01",
    sectionId: 15,
    sectionTitle: "Psychografický profil",
    name: "Rozhodovací styl",
    source: "délka cyklů",
    good: "Rozhoduje do 48h, data-driven",
    bad: "Odkládá rozhodnutí měsíce",
    description:
      "Analýza rozhodovacího stylu klienta na základě historických dat o tom, jak rychle a na jakém základě klient dělá rozhodnutí. Systém měří čas od prezentace návrhu po akceptaci/odmítnutí a identifikuje vzorce.\n\nZnalost rozhodovacího stylu umožňuje přizpůsobit komunikaci — data-driven klientům posíláme čísla a analýzy, emocionálním klientům příběhy a reference, nerozhodným klientům jasná doporučení s deadlinem.\n\nSystém také sleduje, zda se rozhodovací styl mění v čase — zpomalení rozhodování je signálem problémů.",
    methodology:
      "Behaviorální analýza: 1) Měření doby rozhodování per typ rozhodnutí, 2) Klasifikace stylu (analytický/intuitivní/delegující/odkládající), 3) Identifikace rozhodovacích triggerů, 4) Trend analýza rychlosti rozhodování.",
    dataInputs: [
      "Nabídky a jejich akceptace/odmítnutí (timestamps)",
      "Emailová komunikace (dotazy, argumenty)",
      "Záznamy z hovorů",
      "Historická rozhodnutí",
    ],
    outputMetrics: [
      "Průměrná doba rozhodování",
      "Klasifikace stylu",
      "Rozhodovací triggery",
      "Trend (zrychluje/zpomaluje)",
    ],
    goodScenario: {
      title: "Rozhodný klient",
      description:
        "Klient se rozhoduje do 48 hodin na základě dat. Pokládá konkrétní dotazy, vyžaduje čísla a analýzy. Komunikace je efektivní a produktivní.",
      indicators: [
        "Průměr 48h do rozhodnutí",
        "100 % rozhodnutí podloženo daty",
        "Dotazy jsou konkrétní a věcné",
        "Stabilní styl 2+ roky",
      ],
      actions: [
        "Posílat data-driven reporty",
        "Připravovat variantní analýzy s čísly",
        "Respektovat jeho čas — být stručný",
      ],
    },
    badScenario: {
      title: "Nerozhodný klient",
      description:
        "Klient odkládá rozhodnutí měsíce. Opakovaně žádá o další informace, ale nikdy se nerozhodne. Blokuje implementaci doporučení a přichází o příležitosti.",
      indicators: [
        "Průměr 45+ dní do rozhodnutí",
        "60 % rozhodnutí odloženo",
        "Opakované žádosti o další data",
        "3 promarněné příležitosti za rok",
      ],
      actions: [
        "Nastavit jasné deadliny s důsledky",
        "Prezentovat jednu jasnou rekomendaci (ne 5 variant)",
        "Nabídnout osobní schůzku pro rozhodnutí",
        "Kvantifikovat náklady odkládání",
      ],
    },
    frequency: "Průběžně (per interakce)",
    automationLevel: "65 % automatizováno",
    relatedAnalyses: ["15-02", "15-03", "7-01", "17-01"],
    businessImpact: "Střední — optimalizace komunikační strategie",
    implementationStatus: "Produkce",
  },
  {
    id: "15-02",
    sectionId: 15,
    sectionTitle: "Psychografický profil",
    name: "Riziková tolerance",
    source: "reakce na změny",
    good: "Akceptuje inovace",
    bad: "Odmítá jakoukoliv změnu",
    description:
      "Profilování rizikové tolerance klienta na základě historických reakcí na změny — nové služby, změny cen, procesní inovace, legislativní novinky. Systém klasifikuje klienty na spektru od 'early adopter' po 'change resistant'.\n\nZnalost rizikové tolerance je klíčová pro rollout nových služeb a funkcí. Early adopterům nabízíme nové věci jako prvním (beta testeři), konzervativním klientům prezentujeme změny opatrně s důrazem na bezpečnost a stabilitu.\n\nModel se trénuje na historických reakcích: kolik dní trvá akceptace nové služby, kolik otázek klient klade, kolikrát změnu odmítne než přijme.",
    methodology:
      "Behavioral profiling: 1) Katalog změnových událostí per klient (nová služba, cenová úprava, procesní změna), 2) Měření reakce: čas akceptace, počet dotazů, počet odmítnutí, 3) Feature engineering: průměrný acceptance time, rejection rate, question intensity, 4) Clustering (K-means, k=4): Early Adopter / Pragmatist / Conservative / Resistor, 5) Trend — posun na spektru v čase.",
    dataInputs: [
      "CRM — nabídky nových služeb a jejich akceptace/odmítnutí (timestamps)",
      "Email komunikace — dotazy a námitky per změnová událost",
      "Daktela hovory — sentiment analýza při diskuzi o změnách",
      "Fakturace — kdy začal novou službu reálně využívat",
      "Historické cenové změny — reakce (akceptace / eskalace / odchod)",
    ],
    outputMetrics: [
      "Klasifikace: Early Adopter / Pragmatist / Conservative / Resistor",
      "Průměrný acceptance time (dny)",
      "Rejection rate (%)",
      "Question intensity (dotazů per změna)",
      "Trend na spektru (posun za 12M)",
    ],
    goodScenario: {
      title: "Akceptuje inovace",
      description:
        "Klient klasifikován jako Early Adopter — průměrná akceptace nové služby za 3 dny, 0 % rejection rate. Aktivně se ptá na nové funkce a chce je testovat jako první.",
      indicators: [
        "Klasifikace: Early Adopter (cluster 1)",
        "Acceptance time: 3 dny (portfolio avg: 18 dní)",
        "Rejection rate: 0 %",
        "2 služby adoptovány proaktivně (bez nabídky)",
      ],
      actions: [
        "Zařadit do beta testing programu",
        "Nabídnout nové služby jako prvnímu",
        "Využít jako referenci pro konzervativní klienty",
        "Nabídnout inovační konzultace (automatizace, digitalizace)",
      ],
    },
    badScenario: {
      title: "Odmítá jakoukoliv změnu",
      description:
        "Klient klasifikován jako Resistor — odmítl 4 z 5 nabízených změn, průměrná akceptace (když přijme): 90 dní. Stěžuje si na 'zbytečné změny' a vyžaduje 'aby vše zůstalo jak bylo'.",
      indicators: [
        "Klasifikace: Resistor (cluster 4)",
        "Rejection rate: 80 %",
        "Acceptance time (kde přijal): 90 dní",
        "3 stížnosti na změny za rok",
      ],
      actions: [
        "Prezentovat změny opatrně — důraz na bezpečnost, ne novost",
        "Poskytnout osobní demo a podporu při přechodu",
        "Nezavádět změny naráz — postupně, po malých krocích",
        "Zvážit dedicovanou podporu při povinných změnách (legislativa)",
      ],
    },
    frequency: "Per změnová událost, kvartální profil update",
    automationLevel: "65 % automatizováno",
    relatedAnalyses: ["15-01", "15-03", "15-04", "13-04"],
    businessImpact: "Střední — optimalizace rollout strategie",
    implementationStatus: "Produkce",
  },
  {
    id: "15-03",
    sectionId: 15,
    sectionTitle: "Psychografický profil",
    name: "Loajalita vs. oportunismus",
    source: "reakce na nabídky",
    good: "Loyální 8+ let",
    bad: "Porovnává ceny každý rok",
    description:
      "Klasifikace klienta na spektru loajalita–oportunismus na základě historických vzorců chování. Loajální klient zůstává i při mírně vyšší ceně, protože oceňuje vztah a kvalitu. Oportunistický klient porovnává ceny a přechází k levnějšímu poskytovateli.\n\nSystém detekuje signály oportunismu: zmínky konkurence, žádosti o cenové srovnání, vyjednávání při každé faktuře, krátké smlouvy. Signály loajality: nepotřebuje porovnávat, referuje nás, akceptuje úpravy cen, dlouhodobá smlouva.\n\nKlasifikace ovlivňuje pricing strategii — loajálním klientům nabízíme fair cenu s přidanou hodnotou, oportunistickým klientům kompetitivní cenu s lockin mechanismy.",
    methodology:
      "Loyalty scoring model: 1) Feature engineering: délka vztahu, zmínky konkurence (NLP keyword detection v emailech), cenové vyjednávání (frequency), referral history, smlouva délka, 2) Logistická regrese: P(oportunista) = σ(β₀ + β₁×competitor_mentions + β₂×negotiation_freq + ...), 3) Skóre 0–100 (0=absolutní loajalista, 100=čistý oportunista), 4) Threshold: >60 = oportunista, <30 = loajalista, 30–60 = pragmatik.",
    dataInputs: [
      "Email komunikace — NLP keyword search: 'konkurence', 'nabídka', 'levnější', 'jiná kancelář'",
      "CRM — cenová vyjednávání (počet per rok, výsledek)",
      "Smlouvy — délka, prodloužení, výpovědní lhůta",
      "Referral history — počet doporučení (indikátor loajality)",
      "Reaction to price changes — historické cenové úpravy a reakce",
    ],
    outputMetrics: [
      "Loyalty score (0–100, nižší = loajálnější)",
      "Klasifikace: Loajalista / Pragmatik / Oportunista",
      "Competitor mention frequency (per kvartál)",
      "Price negotiation intensity (počet / rok)",
      "Churn probability conditional on price increase",
    ],
    goodScenario: {
      title: "Loyální 8+ let",
      description:
        "Klient je s kanceláří 8+ let, nikdy nezmínil konkurenci, doporučil 3 klienty. Loyalty score: 12/100 (silný loajalista). Při posledním navýšení ceny (+10 %) reagoval: 'Žádný problém, děláte dobrou práci.'",
      indicators: [
        "Loyalty score: 12/100",
        "0 zmínek konkurence za celou historii",
        "3 referraly",
        "Akceptoval cenové navýšení bez vyjednávání",
      ],
      actions: [
        "Zajistit excelentní servis — neztratit ho",
        "Nabídnout long-term smlouvu se stability bonusem",
        "Požádat o referenci a testimonial",
        "Osobní poděkování za loajalitu",
      ],
    },
    badScenario: {
      title: "Porovnává ceny každý rok",
      description:
        "Klient každý rok v lednu posílá 'dostal jsem nabídku od konkurence za X' a vyjednává slevu. Loyalty score: 82/100 (oportunista). Průměrně 3× ročně zmíní konkurenci. Smlouva vždy na 1 rok.",
      indicators: [
        "Loyalty score: 82/100",
        "3 zmínky konkurence/rok",
        "Cenové vyjednávání: každý leden",
        "Smlouva: 1 rok (odmítá delší)",
      ],
      actions: [
        "Pricing strategie: kompetitivní cena s jasným value proposition",
        "Připravit competitive analysis — proč jsme lepší",
        "Implementovat lockin mechanismy (integrace, custom řešení)",
        "Zvážit, zda je klient profitabilní po slevách",
      ],
    },
    frequency:
      "Kvartálně (profil update), real-time (competitor mention alert)",
    automationLevel: "70 % automatizováno",
    relatedAnalyses: ["15-01", "15-02", "10-01", "22-04"],
    businessImpact: "Vysoký — pricing a retention strategie",
    implementationStatus: "Produkce",
  },
  {
    id: "15-04",
    sectionId: 15,
    sectionTitle: "Psychografický profil",
    name: "Reakce na problémy",
    source: "historie krizí",
    good: "Konstruktivní komunikace",
    bad: "Eskaluje, vyhrožuje, tiše odchází",
    description:
      "Profilování reakce klienta na problémy a chyby — naše i jeho. Systém analyzuje historické krizové situace a klasifikuje klientův styl řešení problémů. Znalost tohoto profilu je klíčová pro krizovou komunikaci.\n\nTypy reakcí: Konstruktivní (hledá řešení, komunikuje), Eskalační (vyhrožuje, píše právníkovi, žádá management), Tiché odcházení (přestane komunikovat a odejde bez vysvětlení), Denial (popírá problém, nebere odpovědnost).\n\nPro každý typ máme odlišný krizový protokol — konstruktivním stačí upřímná komunikace, eskalačním potřebujeme senior management engagement, tichým musíme proaktivně volat.",
    methodology:
      "Crisis response profiling: 1) Identifikace krizových událostí z ticketů a eskalací, 2) Analýza klientovy reakce: čas do odpovědi, tón (sentiment NLP), kanál (email/telefon/právník), eskalační level, 3) Klasifikace: Konstruktivní / Eskalační / Tichý / Popírající, 4) Confidence score (počet pozorovaných krizí), 5) Příprava krizového playbook per profil.",
    dataInputs: [
      "Ticketovací systém — eskalované tickety per klient, severity, resolution",
      "Email komunikace v krizových obdobích — sentiment NLP (VADER + custom CZ model)",
      "Daktela hovory — krizové hovory (keyword: 'stížnost', 'problém', 'právník')",
      "CRM — incident log, stížnosti, reklamace",
      "Výsledky krizí — resolved / escalated / lost client",
    ],
    outputMetrics: [
      "Klasifikace: Konstruktivní / Eskalační / Tichý / Popírající",
      "Průměrný čas do eskalace (dny od problému)",
      "Severity threshold (při jak velkém problému reaguje)",
      "Recovery rate (% krizí vyřešených spokojeně)",
      "Krizový playbook (doporučený protokol)",
    ],
    goodScenario: {
      title: "Konstruktivní komunikace",
      description:
        "Při poslední chybě (špatně zaúčtované DPH) klient zavolal do 2h, klidně popsal problém, akceptoval omluvu a opravu. Recovery rate: 100 % — všechny krize vyřešeny spokojeně.",
      indicators: [
        "Klasifikace: Konstruktivní (5 pozorovaných krizí)",
        "Čas do odpovědi: 2h (konstruktivně)",
        "0 eskalací na management",
        "Recovery rate: 100 %",
      ],
      actions: [
        "Udržovat transparentní komunikaci",
        "Přiznat chyby rychle a upřímně",
        "Klient oceňuje proaktivní informování o problémech",
        "Dokumentovat jako best practice pro handling",
      ],
    },
    badScenario: {
      title: "Eskaluje, vyhrožuje, tiše odchází",
      description:
        "Klient má smíšený profil: při malých problémech tiše akumuluje nespokojenost, při velkém problému okamžitě eskaluje na právníka. 2 ze 4 krizí skončily hrozbou žaloby. Předchozí klient s podobným profilem odešel bez varování.",
      indicators: [
        "Klasifikace: Eskalační-Tichý hybrid",
        "2 hrozby žalobou za 3 roky",
        "Tiché období 3+ měsíce před eskalací",
        "Recovery rate: 50 % (2 ze 4 krizí)",
      ],
      actions: [
        "Preventivně řešit i malé problémy — neakumulovat",
        "Při chybě okamžitě senior partner engagement",
        "Připravit právní stanovisko preventivně",
        "Monitorovat ticha — 2+ týdny bez kontaktu = alarm",
      ],
    },
    frequency: "Per krizová událost, kvartální profil review",
    automationLevel: "55 % automatizováno",
    relatedAnalyses: ["15-01", "15-02", "7-01", "10-01"],
    businessImpact: "Vysoký — krizová komunikace a prevence eskalací",
    implementationStatus: "Produkce",
  },
];
