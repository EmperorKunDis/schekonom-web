import type { AnalysisDetail } from "./types";

export const section14Analyses: AnalysisDetail[] = [
  {
    id: "14-01",
    sectionId: 14,
    sectionTitle: "Síťová analýza",
    name: "Graf klientů",
    source: "cross-match IČO",
    good: "12 vzájemných obchodních vztahů",
    bad: "Uzavřená smyčka A→B→C→A — fraud?",
    description:
      "Grafová analýza obchodních vztahů mezi klienty kanceláře na základě křížového porovnání IČO v dodavatelských a odběratelských fakturách. Systém buduje graf propojení a detekuje jak legitimní obchodní vazby, tak podezřelé vzorce.\n\nZnalost vzájemných vazeb mezi klienty je strategicky cenná — umožňuje proaktivní komunikaci při problémech (pokud klient A dluží klientu B, a oba jsou naši klienti).\n\nSystém také detekuje potenciální konflikty zájmů a zajišťuje compliance s profesní etikou.",
    methodology:
      "Grafové algoritmy: 1) Budování grafu z fakturačních dat (IČO matching), 2) Community detection (Louvain), 3) Cycle detection, 4) Centrality measures (betweenness, degree), 5) Anomaly detection (neočekávané hrany).",
    dataInputs: [
      "Vydané faktury všech klientů (IČO odběratele)",
      "Přijaté faktury všech klientů (IČO dodavatele)",
      "ARES data pro doplnění",
      "Historický vývoj grafu",
    ],
    outputMetrics: [
      "Počet hran (obchodních vztahů)",
      "Počet komunit",
      "Detekované cykly",
      "Centrální uzly (influenceři)",
      "Anomálie (nové/zmizelé hrany)",
    ],
    goodScenario: {
      title: "Transparentní vztahy",
      description:
        "Systém identifikoval 12 vzájemných obchodních vztahů mezi klienty. Všechny jsou legitimní a transparentní — žádné podezřelé cykly ani anomálie.",
      indicators: [
        "12 identifikovaných vztahů",
        "0 uzavřených cyklů",
        "Stabilní graf 6 měsíců",
        "Žádné anomálie",
      ],
      actions: [
        "Využít znalost vazeb pro cross-selling",
        "Proaktivně informovat při problémech v řetězci",
        "Aktualizovat graf měsíčně",
      ],
    },
    badScenario: {
      title: "Podezřelá smyčka",
      description:
        "Detekována uzavřená smyčka A→B→C→A s identickými částkami (±3 %). Transakce probíhají pravidelně 1× měsíčně. Možný karusel nebo fiktivní obraty.",
      indicators: [
        "1 uzavřený cyklus (3 uzly)",
        "Identické částky (±3 %)",
        "Pravidelnost 1×/měsíc",
        "1 firma v cyklu mladší 6 měsíců",
      ],
      actions: [
        "Konzultovat s compliance odd.",
        "Diskrétně ověřit podstatu transakcí",
        "Zvážit nahlášení dle AML zákona",
        "Dokumentovat nálezy",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["14-02", "14-03", "6-01", "10-06"],
    businessImpact: "Vysoký — detekce fraud a strategické využití vazeb",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "14-02",
    sectionId: 14,
    sectionTitle: "Síťová analýza",
    name: "Influenceři",
    source: "centralita",
    good: "Žádný single point of failure",
    bad: "1 klient propojený s 8 dalšími — domino riziko",
    description:
      "Identifikace nejvlivnějších uzlů v klientské síti pomocí centrality measures. Klient s vysokou betweenness centralitou je 'bridge' — pokud odejde nebo má problémy, ovlivní to řetězově další klienty. Klient s vysokou degree centralitou je 'hub' — má nejvíce obchodních vazeb.\n\nAnalýza identifikuje single points of failure — klienty, jejichž odchod by způsobil kaskádové ztráty. Tito klienti vyžadují zvláštní péči a retention strategii.\n\nSystém vizualizuje síť v grafu s uzly proporcionálními k centralitě a barevně odlišenými dle risk skóre.",
    methodology:
      "Graph centrality analysis: 1) Betweenness centrality — identifikace bridge uzlů, 2) Degree centrality — identifikace hub uzlů, 3) PageRank — celkový vliv v síti, 4) Eigenvector centrality — vliv sousedů, 5) Cascade simulation — Monte Carlo simulace dopadu odchodu top-N uzlů na síť. SQL: SELECT i1.supplier_ico, i1.customer_ico, COUNT(*) FROM invoices i1 JOIN invoices i2 ON i1.supplier_ico = i2.customer_ico GROUP BY 1,2.",
    dataInputs: [
      "Graf klientů z 14-01 (adjacency matrix z fakturačních IČO)",
      "Doporučení databáze — kdo koho přivedl (CRM field 'referral_source')",
      "Společní zaměstnanci — cross-match RČ z mzdových záznamů",
      "Sdílení jednateli/společníci — ARES API statutární orgány",
      "Revenue per klient (pro weighted graph)",
    ],
    outputMetrics: [
      "Top 10 klientů dle betweenness centrality",
      "Top 10 klientů dle degree centrality",
      "Cascade risk score per klient (% portfolia at risk)",
      "Single point of failure count",
      "Network resilience index (0–100)",
    ],
    goodScenario: {
      title: "Žádný single point of failure",
      description:
        "Síť je distribuovaná — žádný klient nemá betweenness centrality > 0.15. Odchod libovolného klienta ovlivní maximálně 2 % portfolia. Network resilience index: 87.",
      indicators: [
        "Max betweenness centrality: 0.12",
        "Max cascade risk: 2 % portfolia",
        "Network resilience: 87/100",
        "0 single points of failure",
      ],
      actions: [
        "Udržovat diverzifikaci portfolia",
        "Monitorovat nové vazby, které by mohly vytvořit závislost",
        "Kvartální report pro management",
      ],
    },
    badScenario: {
      title: "1 klient propojený s 8 dalšími — domino riziko",
      description:
        "Klient ABC s.r.o. (IČO 12345678) má betweenness centrality 0.45 — je bridge pro 8 dalších klientů. 3 z nich jsou jeho dodavatelé, 2 odběratelé, 3 přivedl jako referenci. Pokud ABC odejde, cascade risk = 18 % portfolia (2.4M Kč/rok).",
      indicators: [
        "Betweenness centrality: 0.45 (alarm > 0.3)",
        "8 přímých vazeb na další klienty",
        "Cascade risk: 18 % portfolia (2.4M Kč/rok)",
        "3 klienti přišli přes referenci od ABC",
      ],
      actions: [
        "Prioritizovat retenci ABC — senior partner management",
        "Budovat přímé vztahy s 8 propojenými klienty",
        "Redukovat závislost — diverzifikovat referenční zdroje",
        "Připravit contingency plán pro odchod ABC",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "80 % automatizováno",
    relatedAnalyses: ["14-01", "14-03", "14-06", "10-01"],
    businessImpact: "Vysoký — identifikace systémového rizika v portfoliu",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "14-03",
    sectionId: 14,
    sectionTitle: "Síťová analýza",
    name: "Sdílené kontakty",
    source: "deduplikace",
    good: "Každý klient unikátní",
    bad: "Stejná kontaktní osoba u 4 firem — švarcsystém?",
    description:
      "Deduplikace kontaktních osob napříč klientským portfoliem. Systém hledá totožné nebo velmi podobné kontaktní osoby u různých firem — stejné jméno, telefon, email, rodné číslo. Sdílený kontakt může signalizovat legitimní holdingovou strukturu, ale také švarcsystém nebo podvodné schéma.\n\nPro pendlerskou klientelu je toto zvláště relevantní — stejná osoba může být formálně zaměstnána u více firem, což je v kontextu CZ/DE pracovního práva potenciální problém.\n\nSystém provádí fuzzy matching na jménech (Levenshtein distance < 2), exact match na RČ a telefonu, a domain match na emailech.",
    methodology:
      "Entity resolution: 1) Exact match na rodné číslo (RČ) z mzdových záznamů, 2) Fuzzy match na jména (Levenshtein ≤ 2, Soundex CZ), 3) Phone/email exact match, 4) Address proximity (< 50m = same location), 5) Klasifikace: Holding / Švarcsystém / Rodinná firma / False positive. SQL: SELECT rc, COUNT(DISTINCT company_id) as firms FROM employees GROUP BY rc HAVING firms > 1.",
    dataInputs: [
      "CRM kontaktní databáze — všichni kontakti všech klientů",
      "Mzdové záznamy — RČ, jméno, adresa zaměstnanců",
      "ARES API — statutární orgány všech klientských firem",
      "Email adresy a telefonní čísla z komunikace",
      "OR výpisy — společníci a jednatelé",
    ],
    outputMetrics: [
      "Počet sdílených kontaktů (unique osob u 2+ firem)",
      "Klasifikace per sdílený kontakt (holding/švarcsystém/family)",
      "Risk score sdílení (0=legitimní, 100=podezřelé)",
      "Počet firem per sdílená osoba",
      "Finanční expozice (obrat firem se sdílenými kontakty)",
    ],
    goodScenario: {
      title: "Každý klient unikátní",
      description:
        "Žádné sdílené kontaktní osoby detekovány. Všichni zaměstnanci jsou unikátní pro svou firmu. CRM je čistý a konzistentní.",
      indicators: [
        "0 sdílených kontaktů",
        "0 duplikátních RČ v mzdových záznamech",
        "CRM deduplication score: 100 %",
        "Žádné cross-company vazby",
      ],
      actions: [
        "Pokračovat v měsíčním scanu",
        "Udržovat kvalitu CRM dat",
        "Ověřovat nové kontakty při onboardingu",
      ],
    },
    badScenario: {
      title: "Stejná kontaktní osoba u 4 firem — švarcsystém?",
      description:
        "Jan Novák (RČ 850515/1234) nalezen v mzdových záznamech 4 firem — všechny na DPP, celkový úvazek ekvivalent 2.8 FTE. 3 firmy jsou naši klienti. Podezření na švarcsystém nebo zastřený pracovní poměr.",
      indicators: [
        "1 osoba u 4 firem (3 naši klienti)",
        "Celkový úvazek: 2.8 FTE (nereálné)",
        "Všechny DPP — vyhýbání se pojistnému",
        "Risk score: 85/100",
      ],
      actions: [
        "Diskrétně ověřit s klienty podstatu vztahu",
        "Konzultovat pracovněprávní oddělení",
        "Upozornit klienty na riziko requalifikace (ČSSZ, OSSZ)",
        "Dokumentovat nález pro případnou kontrolu",
      ],
    },
    frequency: "Měsíčně (full scan), denně (nové kontakty)",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["14-01", "14-04", "23-27", "3-01"],
    businessImpact: "Vysoký — detekce švarcsystému a compliance rizik",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "14-04",
    sectionId: 14,
    sectionTitle: "Síťová analýza",
    name: "Supplier-client",
    source: "transakce",
    good: "Transparentní dodavatelské řetězce",
    bad: "Klient je dodavatel jiného klienta a neví o tom",
    description:
      "Identifikace dodavatelsko-odběratelských vztahů mezi klienty kanceláře na základě křížového matchingu IČO na fakturách. Pokud klient A vystavuje faktury na IČO klienta B, a oba jsou naši klienti, máme unikátní vhled do obou stran transakce.\n\nToto je strategicky cenné — vidíme obě strany pohledávky/závazku, můžeme proaktivně řešit platební problémy a optimalizovat cash flow obou stran. Zároveň to vyžaduje absolutní diskrétnost a dodržení informační bariéry.\n\nSystém automaticky identifikuje tyto vazby a taguje je v CRM pro informaci account managerů (bez sdílení konkrétních dat).",
    methodology:
      "IČO cross-matching: 1) SQL JOIN vydané faktury (supplier_ico) s přijatými fakturami (customer_ico) across all clients, 2) Identifikace párů klient-A ↔ klient-B, 3) Kvantifikace objemu vzájemných transakcí, 4) Detekce platebních problémů v řetězci, 5) Alert při insolvenci jedné strany. Query: SELECT a.client_id, b.client_id, SUM(a.amount) FROM issued_invoices a JOIN received_invoices b ON a.supplier_ico = b.ico AND a.customer_ico = b.ico.",
    dataInputs: [
      "Vydané faktury všech klientů — IČO odběratele, částka, splatnost",
      "Přijaté faktury všech klientů — IČO dodavatele, částka, splatnost",
      "Saldokonto — stav úhrad per faktura",
      "ARES API — ověření aktuálnosti IČO",
      "Insolvence monitoring (ISIR justice.cz) per IČO v řetězci",
    ],
    outputMetrics: [
      "Počet supplier-client párů v portfoliu",
      "Objem vzájemných transakcí (Kč/rok)",
      "Platební gap — splatnost A→B vs. skutečná úhrada",
      "Rizikové páry (jeden z páru má problémy)",
      "Potenciál pro cash flow optimalizaci",
    ],
    goodScenario: {
      title: "Transparentní dodavatelské řetězce",
      description:
        "Identifikováno 8 supplier-client párů. Všechny transakce jsou transparentní, platby probíhají včas. Obě strany vědí o vztahu a kancelář může optimalizovat cash flow.",
      indicators: [
        "8 identifikovaných párů",
        "Průměrná platba: 3 dny před splatností",
        "0 problematických párů",
        "Cash flow optimalizace: úspora 120K/rok",
      ],
      actions: [
        "Nabídnout cash flow optimalizaci oběma stranám",
        "Proaktivně informovat při blížící se splatnosti",
        "Využít znalost pro lepší plánování",
      ],
    },
    badScenario: {
      title: "Klient je dodavatel jiného klienta a neví o tom",
      description:
        "Klient ABC dodává klientu XYZ za 2.1M Kč/rok. XYZ má platby 45 dní po splatnosti a zhoršující se sentiment. ABC netuší, že XYZ je náš klient a že víme o platebních problémech. Riziko: ABC přijde o 2.1M pohledávku.",
      indicators: [
        "Supplier-client pár: ABC → XYZ (2.1M/rok)",
        "XYZ: platby +45 dní po splatnosti, trend zhoršující",
        "ABC: netuší o problémech XYZ",
        "ISIR check XYZ: zatím čistý, ale risk score 72",
      ],
      actions: [
        "Proaktivně (a diskrétně) upozornit ABC na zpomalení plateb v sektoru",
        "Nesdílet konkrétní data o XYZ — informační bariéra",
        "Navrhnout ABC pojištění pohledávek (obecně)",
        "Intenzivně pracovat s XYZ na zlepšení morálky",
      ],
    },
    frequency: "Měsíčně (full scan), týdně (platební monitoring)",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["14-01", "14-02", "1-04", "19-02"],
    businessImpact: "Vysoký — ochrana klientů a strategický vhled",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "14-05",
    sectionId: 14,
    sectionTitle: "Síťová analýza",
    name: "Zaměstnanec <-> klient",
    source: "komunikace",
    good: "Rovnoměrné přidělení",
    bad: "1 účetní komunikuje s 80% klientů — bus factor",
    description:
      "Bipartitní graf zaměstnanec–klient mapující, kdo s kým komunikuje a v jakém objemu. Analýza detekuje nerovnoměrné rozložení práce, závislost na jednom zaměstnanci (bus factor) a preferenční přidělování klientů.\n\nBus factor = 1 je kritické riziko — pokud odejde nebo onemocní jediný zaměstnanec, který zná klienta, dojde k výpadku služby. Systém měří bus factor per klient a per zaměstnanec.\n\nAnalýza také odhaluje 'tiché přetěžování' — zaměstnance, kteří de facto obsluhují více klientů, než by měli, protože kolegové delegují.",
    methodology:
      "Bipartite graph analysis: 1) Konstrukce grafu zaměstnanec↔klient z komunikačních dat, 2) Váhy hran = objem komunikace (emaily + hovory + tickety), 3) Výpočet bus factor per klient (min. počet zaměstnanců se znalostí), 4) Load balancing index per zaměstnanec (skutečný vs. expected objem), 5) Detekce přetížení (> 1.5× expected load).",
    dataInputs: [
      "Email komunikace — From/To per klient per zaměstnanec (IMAP headers)",
      "Daktela CDR — hovory per agent per klient",
      "Ticketovací systém — přiřazení ticketů per zaměstnanec per klient",
      "Docházkový systém — pracovní doba per zaměstnanec",
      "CRM — formální přiřazení účetní↔klient",
    ],
    outputMetrics: [
      "Bus factor per klient (počet zaměstnanců se znalostí)",
      "Load balancing index per zaměstnanec (actual/expected)",
      "Top 5 přetížených zaměstnanců",
      "Top 5 klientů s bus factor = 1",
      "Knowledge distribution heatmap (zaměstnanec × klient)",
    ],
    goodScenario: {
      title: "Rovnoměrné přidělení",
      description:
        "Průměrný bus factor = 2.8 (min. 2 zaměstnanci znají každého klienta). Load balancing index: 0.85–1.15 u všech zaměstnanců. Žádné přetížení, žádné knowledge silos.",
      indicators: [
        "Min. bus factor: 2 (žádný klient s bus factor 1)",
        "Load balancing: 0.85–1.15 u všech",
        "Knowledge distribution: rovnoměrná",
        "0 přetížených zaměstnanců",
      ],
      actions: [
        "Udržovat cross-training program",
        "Rotovat klienty kvartálně (sekundární kontakt)",
        "Dokumentovat klientské specifika v knowledge base",
      ],
    },
    badScenario: {
      title: "1 účetní komunikuje s 80% klientů — bus factor",
      description:
        "Účetní Petra komunikuje s 80 % klientů (de facto primary contact). Její load index: 3.2× expected. Bus factor u 12 klientů = 1 (jen Petra). Pokud Petra onemocní nebo odejde, kolaps služby.",
      indicators: [
        "Petra: 80 % klientů, load index 3.2×",
        "12 klientů s bus factor = 1",
        "Ostatní účetní: load index 0.3–0.5×",
        "Petra: přesčasy 25h/měsíc",
      ],
      actions: [
        "Okamžitě zahájit knowledge transfer — Petra dokumentuje",
        "Přiřadit sekundární kontakt ke každému klientovi",
        "Přerozdělit portfolio — max. 40 % per účetní",
        "Zvážit nábor dalšího zaměstnance",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "80 % automatizováno",
    relatedAnalyses: ["14-01", "23-48", "11-07", "11-09"],
    businessImpact: "Kritický — bus factor = operační riziko",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "14-06",
    sectionId: 14,
    sectionTitle: "Síťová analýza",
    name: "Doporučení klientů",
    source: "kdo koho přivedl",
    good: "40% klientů z doporučení",
    bad: "0 doporučení za 2 roky — klienti nedoporučují",
    description:
      "Analýza referenční sítě — kdo koho přivedl jako klienta. Systém mapuje referral chain a měří net promoter score (NPS) implicitně z chování — klient, který doporučuje, je prokazatelně spokojený.\n\nReferenční klienti mají v průměru 2.3× vyšší CLV, 40 % nižší churn rate a kratší sales cycle. Proto je referenční síť klíčovým růstovým motorem.\n\nSystém identifikuje 'super-referrery' — klienty s 3+ doporučeními — a doporučuje jim VIP péči. Také detekuje, kdy referenční aktivita klesá, což je signál klesající spokojenosti.",
    methodology:
      "Referral network analysis: 1) Extrakce referral dat z CRM (field 'referral_source'), 2) Konstrukce referral tree, 3) Výpočet referral rate per klient (referrals / years), 4) Identifikace super-referrerů (3+ referrals), 5) Trend analýza referral rate per segment, 6) Korelace s NPS/CSAT a CLV.",
    dataInputs: [
      "CRM — pole 'referral_source' / 'doporučil' per klient",
      "Onboarding záznamy — jak se klient dozvěděl o kanceláři",
      "NPS/CSAT průzkumy (pokud existují)",
      "CLV a churn data per klient",
      "Marketingové kanály (Google Ads, web, sociální sítě) — pro non-referral srovnání",
    ],
    outputMetrics: [
      "% klientů z doporučení vs. jiné kanály",
      "Referral rate per klient (doporučení/rok)",
      "Super-referreři (3+ doporučení)",
      "CLV referral vs. non-referral klientů",
      "Churn rate referral vs. non-referral",
    ],
    goodScenario: {
      title: "40 % klientů z doporučení",
      description:
        "40 % nových klientů za posledních 12 měsíců přišlo z doporučení. 5 super-referrerů přineslo 60 % všech referralů. Referral klienti mají 2.3× vyšší CLV.",
      indicators: [
        "40 % klientů z doporučení",
        "5 super-referrerů (3+ doporučení každý)",
        "CLV referral klientů: 2.3× vyšší",
        "Churn referral klientů: 40 % nižší",
      ],
      actions: [
        "VIP program pro super-referrery (sleva, exkluzivní služby)",
        "Referral bonus program (sleva za doporučení)",
        "Case study s doporučenými klienty",
        "Proaktivně žádat o referenci spokojeně klienty",
      ],
    },
    badScenario: {
      title: "0 doporučení za 2 roky — klienti nedoporučují",
      description:
        "Za poslední 2 roky žádný nový klient z doporučení. Buď klienti nejsou dostatečně spokojeni, nebo nejsou požádáni. Historický referral rate: 4 klienti/rok → 0.",
      indicators: [
        "0 referralů za 24 měsíců",
        "Historický průměr: 4/rok (pokles na 0)",
        "NPS neměřeno — chybí data",
        "100 % nových klientů z placených kanálů",
      ],
      actions: [
        "Spustit NPS průzkum — změřit spokojenost",
        "Identifikovat příčinu — proč nedoporučují",
        "Implementovat strukturovaný referral program",
        "Zvážit osobní rozhovory s top klienty o spokojenosti",
      ],
    },
    frequency: "Kvartálně",
    automationLevel: "60 % automatizováno",
    relatedAnalyses: ["14-01", "14-02", "10-01", "9-01"],
    businessImpact: "Vysoký — referral = nejlevnější akvizice s nejvyšší CLV",
    implementationStatus: "Produkce",
    scope: "client",
  },
];
