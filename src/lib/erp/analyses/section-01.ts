import type { AnalysisDetail } from "./types";

export const section01Analyses: AnalysisDetail[] = [
  {
    id: "1-01",
    sectionId: 1,
    sectionTitle: "Tvrdé účetnictví a finance",
    name: "Hlavní kniha — obraty účtů",
    source: "Money S3 / Pohoda",
    good: "Obraty vyrovnané, MD=D, 0 nesrovnalostí",
    bad: "Nesrovnalost 47 000 Kč na účtu 321",
    description:
      "Analýza obratů hlavní knihy je základním kamenem finančního zdraví každé společnosti. Systém automaticky porovnává stranu Má dáti a Dal na všech syntetických i analytických účtech a identifikuje jakékoliv nesrovnalosti, které by mohly signalizovat chybné zaúčtování, duplicitní zápisy nebo neoprávněné změny.\n\nSystém pracuje v reálném čase s daty z účetního software (Money S3, Pohoda) a provádí průběžnou kontrolu salda na každém účtu. Výsledky jsou vizualizovány v dashboardu s možností drill-down na konkrétní účetní zápisy.\n\nTato analýza je klíčová pro přípravu na audit, uzávěrky i pro denní operativu — jakákoliv nesrovnalost je okamžitě eskalována odpovědné osobě.",
    methodology:
      "Automatické porovnání obratů MD a D na všech účtech hlavní knihy. Systém kontroluje: 1) Shodu celkových obratů, 2) Saldo každého účtu vůči očekávané hodnotě, 3) Anomálie v denních pohybech (statistická odchylka > 2 sigma), 4) Cross-validace s bankovními výpisy a pokladními doklady.",
    dataInputs: [
      "Účetní deník z Money S3 / Pohoda",
      "Bankovní výpisy (FIO, KB, ČSOB API)",
      "Pokladní doklady",
      "Interní doklady a přeúčtování",
      "Historické obraty pro trend analýzu",
    ],
    outputMetrics: [
      "Celkový obrat MD vs. D (absolutní rozdíl)",
      "Počet účtů s nesrovnalostí",
      "Suma nesrovnalostí v Kč",
      "Trend nesrovnalostí měsíc/měsíc",
      "Čas od vzniku nesrovnalosti po detekci",
    ],
    goodScenario: {
      title: "Perfektní shoda obratů",
      description:
        "Všechny účty hlavní knihy vykazují nulový rozdíl mezi MD a D. Systém nedetekoval žádné anomálie v denních pohybech a veškeré zápisy jsou podloženy doklady.",
      indicators: [
        "MD = D na všech účtech",
        "0 nesrovnalostí za období",
        "Všechny zápisy mají dokladovou přílohu",
        "Bankovní výpisy 100% spárovány",
      ],
      actions: [
        "Pokračovat v měsíční kontrole",
        "Archivovat výsledky pro audit",
        "Aktualizovat benchmark hodnoty",
      ],
    },
    badScenario: {
      title: "Detekované nesrovnalosti",
      description:
        "Na účtu 321 (Dodavatelé) vznikl rozdíl 47 000 Kč, který nebyl vysvětlen. Možné příčiny: duplicitní zaúčtování, chybějící dobropis, neoprávněná změna po uzávěrce.",
      indicators: [
        "Rozdíl 47 000 Kč na účtu 321",
        "Nesrovnalost trvá déle než 5 pracovních dní",
        "Chybí dokladová příloha ke 3 zápisům",
        "Detekována změna po uzávěrkovém datu",
      ],
      actions: [
        "Okamžitě identifikovat zdroj nesrovnalosti",
        "Provést manuální reconciliaci účtu 321",
        "Zkontrolovat audit trail za posledních 30 dní",
        "Eskalovat na senior účetní a informovat klienta",
      ],
    },
    frequency: "Denně (automaticky), manuální review týdně",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["1-02", "1-03", "1-07", "1-09"],
    businessImpact: "Kritický — základ pro správnost celého účetnictví",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "1-02",
    sectionId: 1,
    sectionTitle: "Tvrdé účetnictví a finance",
    name: "Výsledovka a rozvaha",
    source: "účtová osnova",
    good: "Zisk 2.4M Kč, aktiva +12% meziročně",
    bad: "Ztráta 380K, záporný vlastní kapitál",
    description:
      "Průběžná tvorba výkazu zisku a ztráty a rozvahy podle směrné účtové osnovy (vyhláška 500/2002 Sb.). Systém agreguje obraty třídy 5/6 do výsledovky a třídy 0-4 do rozvahy, validuje bilanční rovnici Aktiva = Pasiva a sleduje meziroční trendy. Výstupy slouží jako podklad pro uzávěrku, audit i manažerský reporting.",
    methodology:
      "Automatizovaná agregace z Money S3 / Pohoda přes GET /api/accounts/balance endpoint. Výpočet výsledku hospodaření = SUM(třída 6) − SUM(třída 5). Bilanční kontrola |aktiva − pasiva| < 1 Kč. Trend: meziroční změny jednotlivých řádků, vertikální analýza (% struktura), horizontální analýza (index k bázi).",
    dataInputs: [
      "Money S3 API /api/accounts + /api/journal",
      "Pohoda mServer XML export rozvahy",
      "Účtová osnova dle vyhlášky 500/2002 Sb.",
      "Historie 3 roků pro trend",
      "Opravné položky a rezervy modul",
    ],
    outputMetrics: [
      "Výsledek hospodaření před a po zdanění (Kč)",
      "Suma aktiv / pasiv (bilanční suma)",
      "Vlastní kapitál / cizí zdroje poměr",
      "EBITDA marže (%)",
      "ROA, ROE (%)",
      "Meziroční změna jednotlivých řádků",
    ],
    goodScenario: {
      title: "Zdravá výsledovka a rozvaha",
      description:
        "Výsledek hospodaření kladný, bilanční rovnice sedí na Kč přesně, vlastní kapitál roste meziročně o 10%+, likvidita L2 > 1.0.",
      indicators: [
        "Zisk 2.4M Kč",
        "Aktiva +12 % YoY",
        "Bilanční rovnice splněna",
        "Vlastní kapitál / cizí zdroje = 1.4",
      ],
      actions: [
        "Předat podklady auditorovi",
        "Publikovat do sbírky listin (justice.cz)",
        "Aktualizovat ratingové metriky",
      ],
    },
    badScenario: {
      title: "Ztráta a předlužení",
      description:
        "Záporný výsledek hospodaření, vlastní kapitál pod 50 % základního kapitálu — povinnost dle § 68 ZOK svolat valnou hromadu. Riziko insolvence.",
      indicators: [
        "Ztráta 380K",
        "Záporný vlastní kapitál",
        "L2 likvidita 0.4",
        "Bilanční suma klesla o 18 %",
      ],
      actions: [
        "Svolat valnou hromadu (§ 68 ZOK)",
        "Připravit ozdravný plán",
        "Konzultace s insolvenčním správcem",
        "Informovat banku (covenants)",
      ],
    },
    frequency: "Měsíčně + kvartální uzávěrka",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["1-01", "1-03", "1-08"],
    businessImpact: "Kritický — základní výkazy pro stakeholdery",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "1-03",
    sectionId: 1,
    sectionTitle: "Tvrdé účetnictví a finance",
    name: "Cash flow",
    source: "bankovní API + účetní deník",
    good: "Provozní CF +1.8M Kč",
    bad: "Provozní CF −420K 3. měsíc v řadě",
    description:
      "Nepřímá metoda výpočtu cash flow dle ČÚS 023. Systém rozděluje peněžní toky na provozní, investiční a finanční a sleduje trend provozního CF jako nejdůležitějšího ukazatele likvidity. Opakovaně záporný provozní CF je silný signál problémů s platební schopností.",
    methodology:
      "Nepřímá metoda: EAT + odpisy + změny rezerv + změny pracovního kapitálu (zásoby, pohledávky, závazky). Vstupy z bankovních API (FIO, KB, ČSOB) pro validaci skutečných toků. Porovnání operativního CF s EBITDA jako quality-of-earnings indikátor.",
    dataInputs: [
      "Bankovní API: FIO /ib_api/rest, KB API, ČSOB ConnectAPI",
      "Účetní deník Money S3 (GET /api/journal)",
      "Modul rezerv a dohadů",
      "Saldokonto pohledávek a závazků",
      "Odpisy z evidence majetku",
    ],
    outputMetrics: [
      "Provozní CF (Kč)",
      "Investiční CF (Kč)",
      "Finanční CF (Kč)",
      "Čistý CF za období",
      "CF/EBITDA ratio (quality of earnings)",
      "Trend 12 měsíců",
    ],
    goodScenario: {
      title: "Zdravý provozní cash flow",
      description:
        "Provozní CF stabilně pozitivní, pokrývá investice i splátky úvěrů. CF/EBITDA > 0.9 znamená kvalitní zisky (ne jen účetní).",
      indicators: [
        "Provozní CF +1.8M Kč",
        "CF/EBITDA = 0.94",
        "Čistý CF +320K Kč",
        "Volný CF pokrývá CAPEX",
      ],
      actions: [
        "Investovat přebytek do termínovaných vkladů",
        "Zvážit předčasné splacení úvěru",
        "Aktualizovat 13-week CF forecast",
      ],
    },
    badScenario: {
      title: "Záporný provozní cash flow",
      description:
        "Třetí měsíc záporný provozní CF — firma pálí hotovost. Rostoucí pohledávky při stagnujících tržbách signalizují problémy s inkasem nebo fiktivní tržby.",
      indicators: [
        "Provozní CF −420K",
        "Pohledávky +35 % YoY",
        "CF/EBITDA = 0.2",
        "Čerpání kontokorentu 87 %",
      ],
      actions: [
        "Okamžitá 13-week CF analýza",
        "Zpřísnit inkaso pohledávek",
        "Jednat s bankou o navýšení kontokorentu",
        "Revize investičních výdajů",
      ],
    },
    frequency: "Týdně (13-week rolling forecast)",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["1-02", "2-06", "10-09"],
    businessImpact: "Kritický — přímý ukazatel platební schopnosti",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "1-04",
    sectionId: 1,
    sectionTitle: "Tvrdé účetnictví a finance",
    name: "Aging pohledávek",
    source: "saldokonto",
    good: "85% do 30 dnů",
    bad: "45% nad 90 dnů",
    description:
      "Aging reportu rozděluje pohledávky z účtu 311 do košů podle doby po splatnosti (0-30, 31-60, 61-90, 90+ dní). Slouží jako základ pro tvorbu opravných položek podle § 8a zákona 593/1992 Sb. a pro řízení likvidity.",
    methodology:
      "Bucket analýza saldokontonta: GET /api/saldo?account=311. Pro každou pohledávku výpočet days_overdue = today − due_date. Kategorizace do bucketů. Automatická tvorba OP: 50 % při 180+ dnech, 100 % při 360+ dnech (daňově uznatelné). DSO = (pohledávky / tržby) × 365.",
    dataInputs: [
      "Saldokonto účtu 311 (Money S3 API)",
      "Fakturační historie (splatnost, částka)",
      "Platební historie klientů",
      "Upomínky a předžalobní výzvy",
      "ISIR API pro insolvenční kontrolu",
    ],
    outputMetrics: [
      "Pohledávky po splatnosti (Kč) po bucketech",
      "DSO — Days Sales Outstanding",
      "Concentration risk (top 5 dlužníků v %)",
      "Potřebná tvorba opravných položek (Kč)",
      "Míra úspěšnosti inkasa (%)",
    ],
    goodScenario: {
      title: "Zdravé portfolio pohledávek",
      description:
        "Většina pohledávek do 30 dnů po splatnosti, DSO pod 35 dní, žádný klient nad 15 % portfolia, opravné položky minimální.",
      indicators: [
        "85 % pohledávek do 30 dnů",
        "DSO = 32 dní",
        "0 pohledávek nad 180 dnů",
        "Top dlužník 8 % portfolia",
      ],
      actions: [
        "Pokračovat v automatických upomínkách",
        "Měsíční review top 10 dlužníků",
      ],
    },
    badScenario: {
      title: "Kritické aging pohledávek",
      description:
        "45 % pohledávek starších 90 dnů, DSO přes 80 dní, riziko nedobytnosti a povinnost vysokých opravných položek.",
      indicators: [
        "45 % nad 90 dnů",
        "DSO = 82 dní",
        "3 klienti v ISIR",
        "Potřebné OP 680K Kč",
      ],
      actions: [
        "Předžalobní výzvy dle § 142a OSŘ",
        "Postoupení pohledávek factoringu",
        "Blokace dodávek neplatícím klientům",
        "Zahájit soudní vymáhání u top 3",
      ],
    },
    frequency: "Týdně",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["1-03", "9-03", "10-09"],
    businessImpact: "Vysoký — přímý dopad na likviditu",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "1-05",
    sectionId: 1,
    sectionTitle: "Tvrdé účetnictví a finance",
    name: "DPH, KH, SH",
    source: "MOJE daně",
    good: "0 neshod, podáno včas",
    bad: "3 neshody — penále 50K",
    description:
      "Automatizovaná příprava a podání přiznání k DPH (DPHDP3), kontrolního hlášení (DPHKH1) a souhrnného hlášení (DPHSH1) přes EPO portál MOJE daně. Systém cross-validuje data mezi moduly a detekuje neshody ještě před podáním.",
    methodology:
      "XML generace dle XSD schémat finanční správy. Cross-check: DPH přiznání ř. 1 = SUM(faktury vydané 21%). KH část A.4 = faktury s DUZP v období. Validace DIČ plátce přes ADIS API. Elektronické podání přes EPO s datovou schránkou / kvalifikovaný podpis.",
    dataInputs: [
      "Faktury vydané + přijaté z Money S3",
      "Evidence DPH z ERP",
      "ADIS API pro ověření DIČ",
      "EPO portál MOJE daně (odeslání XML)",
      "Datová schránka / kvalifikovaný podpis",
    ],
    outputMetrics: [
      "Vlastní daňová povinnost / nadměrný odpočet (Kč)",
      "Počet neshod KH vs. faktury",
      "Termín podání (do 25. dne následujícího měsíce)",
      "Validační status XML (OK / chyby)",
      "Riziko výzvy k odstranění pochybností (%)",
    ],
    goodScenario: {
      title: "DPH přiznání bez vad",
      description:
        "Všechny XML validní, 0 neshod s KH, podáno 5 dní před termínem, bez výzvy FÚ.",
      indicators: [
        "0 neshod KH vs. faktury",
        "Podáno 20. v měsíci",
        "Validní XSD",
        "DIČ všech partnerů ověřená",
      ],
      actions: [
        "Archivovat potvrzení o přijetí z EPO",
        "Měsíční report klientovi",
      ],
    },
    badScenario: {
      title: "Neshody a penále",
      description:
        "3 neshody mezi KH a přiznáním, FÚ vydal výzvu dle § 101g ZDPH, riziko pokuty až 500K Kč.",
      indicators: [
        "3 neshody v KH",
        "Výzva od FÚ",
        "Penále 50K",
        "Nepodáno včas",
      ],
      actions: [
        "Podat následné KH do 5 dnů",
        "Opravit fakturace",
        "Zkontrolovat DIČ partnerů",
        "Požádat o prominutí penále",
      ],
    },
    frequency: "Měsíčně (plátci)",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["6-01", "6-04", "5-04"],
    businessImpact: "Kritický — zákonná povinnost + penalizace",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "1-06",
    sectionId: 1,
    sectionTitle: "Tvrdé účetnictví a finance",
    name: "Víceměnové výstupy",
    source: "kurzovní lístek",
    good: "Kurzové zisky +34K",
    bad: "Kurzová ztráta −89K",
    description:
      "Přepočet cizích měn kurzem ČNB dle § 24 ZoÚ. Systém stahuje denní kurzovní lístek z API ČNB, přepočítává cizoměnové pohledávky, závazky a bankovní účty k rozvahovému dni a vyčísluje nerealizované kurzové rozdíly.",
    methodology:
      "Denní API call ČNB: https://api.cnb.cz/cnbapi/exrates/daily. Přepočet pevným kurzem (měsíční/roční průměr) nebo denním. K rozvahovému dni přecenění všech cizoměnových zůstatků. Kurzový zisk účet 663, ztráta 563. Realizované rozdíly při úhradě.",
    dataInputs: [
      "ČNB API /cnbapi/exrates/daily",
      "Cizoměnová saldokonta (účty 221, 311, 321)",
      "Fakturace v EUR, USD, GBP",
      "Bankovní výpisy cizoměnových účtů",
      "Nastavení pevného vs. denního kurzu",
    ],
    outputMetrics: [
      "Kurzové zisky / ztráty realizované (Kč)",
      "Nerealizované kurzové rozdíly (Kč)",
      "Expozice v jednotlivých měnách (EUR, USD)",
      "Citlivost: efekt ±10 % kurzu (Kč)",
      "Průměrný kurz vs. spot kurz",
    ],
    goodScenario: {
      title: "Pozitivní kurzové rozdíly",
      description:
        "Hedging a timing funguje, realizované kurzové zisky převažují, expozice do jedné měny pod 30 % obratu.",
      indicators: [
        "Kurzový zisk +34K",
        "EUR expozice 25 %",
        "Volatilita pod oborem",
        "Hedging dle policy",
      ],
      actions: ["Pokračovat v hedgingu", "Aktualizovat FX policy"],
    },
    badScenario: {
      title: "Kurzové ztráty z volatility",
      description:
        "Nehedgované pozice, oslabení CZK způsobilo kurzovou ztrátu 89K, nejistota ohledně budoucí expozice.",
      indicators: [
        "Kurzová ztráta −89K",
        "Žádný hedging",
        "EUR expozice 68 %",
        "Spot volatilita 12 %",
      ],
      actions: [
        "Zavést FX forwardy / opce",
        "Natural hedging (nákupy v EUR)",
        "Revize cenotvorby v cizí měně",
        "Konzultace s bankou",
      ],
    },
    frequency: "Denně (kurzy), měsíčně (přepočet)",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["1-02", "1-03"],
    businessImpact: "Střední — u exportérů vysoký",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "1-07",
    sectionId: 1,
    sectionTitle: "Tvrdé účetnictví a finance",
    name: "Audit trail",
    source: "DocuWare + ERP",
    good: "0 neoprávněných změn",
    bad: "17 změn po uzávěrce",
    description:
      "Kompletní log všech změn v účetním systému a DMS DocuWare — kdo, kdy, co změnil. Základ pro interní kontrolu, SOX compliance i pro detekci neoprávněných zásahů po uzávěrce (§ 8 ZoÚ nakazuje neporušitelnost uzavřených období).",
    methodology:
      "DocuWare REST API /docuware/platform/Audit pro DMS události, Money S3 audit_log tabulka pro účetní změny. Korelace user_id + timestamp + entity_id. Detekce anomálií: změny mimo pracovní dobu, bulk delete, editace uzavřených období.",
    dataInputs: [
      "DocuWare Audit API (/platform/Audit)",
      "Money S3 audit_log tabulka",
      "Active Directory — mapování user_id → jméno",
      "Uzávěrková data (locked_period_end)",
      "IP logy přihlášení",
    ],
    outputMetrics: [
      "Počet změn po uzávěrce",
      "Počet neoprávněných zásahů (mimo role)",
      "Počet bulk operací (>50 změn/min)",
      "Top 5 uživatelů dle počtu změn",
      "Changes at unusual hours (noc/víkend)",
    ],
    goodScenario: {
      title: "Čistý audit trail",
      description:
        "Všechny změny v uzavřených obdobích zdokumentované opravnými doklady, žádné přímé editace, oprávnění dle rolí RBAC.",
      indicators: [
        "0 neoprávněných změn",
        "100 % změn má opravný doklad",
        "0 bulk deletes",
        "Všechny role RBAC OK",
      ],
      actions: ["Měsíční report auditorovi", "Archivovat logy 10 let"],
    },
    badScenario: {
      title: "Neoprávněné zásahy do uzavřených období",
      description:
        "17 změn v uzavřeném období 2024, 3 změny v noci mimo pracovní dobu, 1 bulk delete 240 záznamů — možná manipulace před auditem.",
      indicators: [
        "17 změn po uzávěrce",
        "3 změny v 23:00-05:00",
        "1 bulk delete 240 záznamů",
        "1 uživatel mimo roli",
      ],
      actions: [
        "Okamžitá forenzní analýza",
        "Informovat kompliance a auditora",
        "Zablokovat podezřelý účet",
        "Konzultace s právníkem (možný trestný čin § 254 TZ)",
      ],
    },
    frequency: "Kontinuální (alerty), měsíční report",
    automationLevel: "98 % automatizováno",
    relatedAnalyses: ["1-01", "11-07", "10-04"],
    businessImpact: "Kritický — compliance a detekce fraudu",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "1-08",
    sectionId: 1,
    sectionTitle: "Tvrdé účetnictví a finance",
    name: "DPPO/DPFO simulace",
    source: "uzávěrková data",
    good: "Sazba 15.2%, úspora 280K",
    bad: "Přeplatek 120K kvůli chybě",
    description:
      "Simulace daně z příjmů právnických / fyzických osob na základě průběžných uzávěrkových dat. Systém počítá odhad DPPO (19 % pro PO) a DPFO (15 % / 23 % pro FO) včetně slev, odpočtů a úpravu základu dle § 23 ZDP. Umožňuje optimalizovat daňové výdaje ještě před koncem zdaňovacího období.",
    methodology:
      "Transformace účetního výsledku na daňový základ: HV +/− ř. 30-200 přiznání. Připočitatelné položky (neuznatelné náklady § 25), odečitatelné položky (dary, výzkum § 34). Aplikace slev (§ 35). Simulace Monte Carlo pro různé scénáře investičních pobídek.",
    dataInputs: [
      "Uzávěrkový HV z Money S3",
      "Evidence neuznatelných nákladů",
      "Odpisy daňové vs. účetní",
      "Evidence darů a výzkumu (§ 34)",
      "ADIS API pro zálohy",
    ],
    outputMetrics: [
      "Efektivní daňová sazba (%)",
      "Odhad DPPO / DPFO (Kč)",
      "Odhadovaný přeplatek / nedoplatek",
      "Úspora z optimalizace (Kč)",
      "Odchylka od loňska (%)",
    ],
    goodScenario: {
      title: "Optimalizovaná daňová povinnost",
      description:
        "Využity všechny dostupné odpočty a slevy, efektivní sazba pod průměrem oboru, úspora 280K oproti neoptimalizovanému scénáři.",
      indicators: [
        "Efektivní sazba 15.2 %",
        "Úspora 280K",
        "Zálohy v souladu s predikcí",
        "Všechny odpočty využity",
      ],
      actions: [
        "Potvrdit strategii auditorovi",
        "Plánovat investice pro další optimalizaci",
      ],
    },
    badScenario: {
      title: "Chybná daňová optimalizace",
      description:
        "Chybně klasifikované výdaje, nevyužité odpočty, zbytečný přeplatek 120K — peníze uvízly na ADIS účtu.",
      indicators: [
        "Přeplatek 120K",
        "Nevyužity odpočty § 34",
        "Zálohy vyšší než povinnost",
        "Efektivní sazba 22 %",
      ],
      actions: [
        "Podat dodatečné přiznání",
        "Požádat o vrácení přeplatku",
        "Revize klasifikace nákladů",
        "Konzultace s daňovým poradcem",
      ],
    },
    frequency: "Kvartálně + předuzávěrková simulace",
    automationLevel: "75 % automatizováno",
    relatedAnalyses: ["5-01", "5-06", "1-02"],
    businessImpact: "Vysoký — přímý finanční dopad",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "1-09",
    sectionId: 1,
    sectionTitle: "Tvrdé účetnictví a finance",
    name: "Dokladová inventarizace",
    source: "automatické porovnání MD/D",
    good: "100% shoda",
    bad: "4 účty s rozdílem 67K",
    description:
      "Inventarizace účtů podle § 29-30 ZoÚ — ověření, že účetní stavy souhlasí se skutečností. Systém automaticky porovnává saldokonto s fyzickou inventurou (zásoby, hotovost), bankovními výpisy (účty 221) a potvrzeními pohledávek/závazků.",
    methodology:
      "Porovnání účetního zůstatku vs. reálný stav: pokladna (fyzická inventura), banka (výpis), zásoby (skladová inventura), pohledávky (konfirmace), závazky (saldokonto dodavatelů). Inventarizační rozdíly: manko nad normu / přebytek. Protokoly o inventarizaci.",
    dataInputs: [
      "Saldokonto všech účtů (Money S3)",
      "Bankovní výpisy (FIO, KB, ČSOB)",
      "Skladová evidence",
      "Pokladní deník",
      "Konfirmace od partnerů (pohledávky/závazky)",
    ],
    outputMetrics: [
      "Počet účtů s rozdílem",
      "Absolutní rozdíl (Kč)",
      "Manka a přebytky",
      "Nedobytné pohledávky (k odpisu)",
      "% shoda účetní vs. skutečný stav",
    ],
    goodScenario: {
      title: "Kompletní shoda inventarizace",
      description:
        "Všechny účty vykazují 100% shodu, žádná manka, protokoly podepsané, podklady pro audit kompletní.",
      indicators: [
        "100 % shoda",
        "0 mank",
        "Všechny konfirmace doručeny",
        "Protokoly podepsané",
      ],
      actions: ["Archivovat inventarizační protokoly", "Předat auditorovi"],
    },
    badScenario: {
      title: "Inventarizační rozdíly",
      description:
        "4 účty s celkovým rozdílem 67K, chybí konfirmace od 3 dodavatelů, skladové manko přesahuje normu.",
      indicators: [
        "4 účty s rozdílem 67K",
        "Chybí 3 konfirmace",
        "Skladové manko 18K nad normu",
        "Nedobytné 24K",
      ],
      actions: [
        "Objasnit rozdíly a zaúčtovat do výsledku",
        "Urgovat konfirmace",
        "Předepsat manko k úhradě dle ZP § 250",
        "Opravné položky na nedobytné",
      ],
    },
    frequency: "Ročně (povinnost ZoÚ) + kvartálně",
    automationLevel: "70 % automatizováno",
    relatedAnalyses: ["1-01", "1-07"],
    businessImpact: "Kritický — zákonná povinnost",
    implementationStatus: "Produkce",
    scope: "client",
  },
];
