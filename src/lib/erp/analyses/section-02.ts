import type { AnalysisDetail } from "./types";

export const section02Analyses: AnalysisDetail[] = [
  {
    id: "2-01",
    sectionId: 2,
    sectionTitle: "Náklady, rozpočty, prognózy",
    name: "Skutečnost vs. plán",
    source: "rozpočet + reál",
    good: "Odchylka +3%",
    bad: "Odchylka −28%",
    description:
      "Porovnání skutečných nákladů a výnosů s plánovaným rozpočtem je klíčovým nástrojem finančního řízení. Analýza sleduje odchylky na úrovni středisek, projektů i celé společnosti a identifikuje trendy, které vyžadují manažerskou pozornost.\n\nSystém automaticky importuje rozpočtová data a průběžně je porovnává se skutečností z účetního systému. Výsledky jsou prezentovány ve formě variance analýzy s drill-down možností.\n\nKlíčovou přidanou hodnotou je včasná detekce negativních trendů — systém upozorní na odchylku dříve, než se stane kritickou, a navrhne konkrétní nápravná opatření.",
    methodology:
      "Variance analýza na úrovni nákladových středisek a účtových skupin. Systém porovnává: 1) Absolutní odchylku skutečnost vs. plán, 2) Procentuální odchylku, 3) Trend odchylky za 3/6/12 měsíců, 4) Sezónní adjustaci pro fair srovnání. Threshold pro alert: > 10 % negativní odchylka.",
    dataInputs: [
      "Rozpočet na aktuální období (Excel / ERP modul)",
      "Skutečné náklady z účetního deníku",
      "Skutečné výnosy z fakturace",
      "Historická data pro sezónní korekci",
      "Střediskové přiřazení nákladů",
    ],
    outputMetrics: [
      "Celková odchylka v Kč a %",
      "Odchylka per středisko",
      "Top 5 nejvíce odchýlených položek",
      "Trend odchylky (zlepšuje se / zhoršuje)",
      "Forecast do konce období na základě aktuálního trendu",
    ],
    goodScenario: {
      title: "Rozpočet pod kontrolou",
      description:
        "Skutečné náklady se liší od plánu o pouhá 3 %, což je v rámci přijatelné tolerance. Největší odchylka je na energiích (+8 %), ale je kompenzována úsporou na materiálu (−5 %).",
      indicators: [
        "Celková odchylka +3 % (tolerance 10 %)",
        "Žádné středisko nepřekročilo 15 %",
        "Pozitivní trend — odchylka klesá",
        "Forecast do konce roku: +2.1 %",
      ],
      actions: [
        "Pokračovat v měsíčním monitoringu",
        "Zvážit úpravu rozpočtu energií pro Q3",
        "Připravit kvartální report pro management",
      ],
    },
    badScenario: {
      title: "Rozpočet výrazně překročen",
      description:
        "Skutečné náklady převyšují plán o 28 %. Hlavní příčiny: neplánovaná investice do IT infrastruktury, překročení mzdových nákladů kvůli přesčasům a nečekaná oprava budovy.",
      indicators: [
        "Celková odchylka −28 % (3× nad tolerancí)",
        "3 střediska překročila rozpočet o > 30 %",
        "Trend se zhoršuje třetí měsíc v řadě",
        "Forecast: −34 % do konce roku",
      ],
      actions: [
        "Okamžitá schůzka s managementem — přehodnocení rozpočtu",
        "Zmrazení neurgentních výdajů",
        "Identifikace kompenzačních úspor",
        "Aktualizace forecastu s realistickými čísly",
      ],
    },
    frequency: "Měsíčně (automaticky), ad-hoc na vyžádání",
    automationLevel: "80 % automatizováno",
    relatedAnalyses: ["2-02", "2-04", "2-06", "1-02"],
    businessImpact: "Vysoký — řízení nákladů a ziskovosti",
    implementationStatus: "Produkce",
  },
  {
    id: "2-02",
    sectionId: 2,
    sectionTitle: "Náklady, rozpočty, prognózy",
    name: "Klouzavé prognózy",
    source: "historie úprav",
    good: "v3 se liší od v1 o 4%",
    bad: "Reforecast mění o 30%+ měsíčně",
    description:
      "Klouzavý (rolling) forecast nahrazuje statický roční rozpočet — každý měsíc se aktualizuje na 12 měsíců dopředu. Analýza stability prognózy odhaluje kvalitu plánování: pokud se forecast dramaticky mění měsíc od měsíce, plánovací proces je neřízený.",
    methodology:
      "Verzování forecastů (v1, v2, v3…) v ERP rozpočtovém modulu. Forecast accuracy = |skutečnost − forecast| / skutečnost. Forecast stability = std(verze) / mean(verze). Porovnání forecast_v1 (před 3 měsíci) vs. aktuální skutečnost.",
    dataInputs: [
      "ERP rozpočtový modul — historie verzí",
      "Skutečné obraty z účetního systému",
      "Timesheety pro kapacitní forecast",
      "Pipeline z CRM",
      "Sezónní koeficienty z historie",
    ],
    outputMetrics: [
      "Forecast accuracy (%)",
      "Forecast stability (σ/μ)",
      "Počet reforecastů za měsíc",
      "Maximální změna verze v3 vs. v1 (%)",
      "Bias — systematicky příliš optimistický / pesimistický",
    ],
    goodScenario: {
      title: "Stabilní a přesný forecast",
      description:
        "Forecast se mezi verzemi mění jen o jednotky procent, skutečnost v rozpětí ±5 % od forecastu z před 3 měsíci, plánovací proces zralý.",
      indicators: [
        "v3 − v1 = 4 %",
        "Forecast accuracy 96 %",
        "1 reforecast měsíčně",
        "Bias < 2 %",
      ],
      actions: ["Pokračovat v měsíční kadenci", "Prezentovat metodiku boardu"],
    },
    badScenario: {
      title: "Nestabilní forecast",
      description:
        "Verze forecastu se liší o 30%+, plánovač nevěří vlastním číslům, board nemůže dělat rozhodnutí.",
      indicators: [
        "Reforecast +30 % měsíčně",
        "Accuracy 62 %",
        "4 reforecasty/měsíc",
        "Systematický pozitivní bias",
      ],
      actions: [
        "Workshop plánovacího procesu",
        "Identifikovat zdroje nejistoty",
        "Zavést scenario planning",
        "Vyměnit plánovače",
      ],
    },
    frequency: "Měsíčně (rolling 12M)",
    automationLevel: "70 % automatizováno",
    relatedAnalyses: ["2-01", "2-06", "11-05"],
    businessImpact: "Vysoký — kvalita strategických rozhodnutí",
    implementationStatus: "Produkce",
  },
  {
    id: "2-03",
    sectionId: 2,
    sectionTitle: "Náklady, rozpočty, prognózy",
    name: "Dohady (accruals)",
    source: "modul dohadů",
    good: "Vše reconcilováno",
    bad: "3 dohady za 890K starší 6 měsíců",
    description:
      "Sledování dohadných položek (účet 389/388) podle § 19 ZoÚ — náklady/výnosy, ke kterým nebyla přijata faktura. Systém monitoruje stáří dohadů a jejich párování se skutečnými fakturami. Staré nepárované dohady signalizují buď chybu v ocenění, nebo zapomenuté položky.",
    methodology:
      "Evidence dohadů v ERP modulu. Pro každý dohad: created_at, amount, description, expected_invoice_date. Párování s přijatými fakturami (fuzzy match dodavatel + částka ±10 %). Aging: 0-30, 31-90, 90+ dní. Automatické upozornění nad 90 dní.",
    dataInputs: [
      "ERP modul dohadů (accrual_items)",
      "Přijaté faktury (supplier_invoices)",
      "Smlouvy a objednávky",
      "Historické vzory dohadů",
      "DocuWare — očekávané doklady",
    ],
    outputMetrics: [
      "Suma aktivních dohadů (Kč)",
      "Počet dohadů > 90 dní",
      "Průměrná doba páru dohad → faktura",
      "Přesnost odhadu (actual vs. accrual)",
      "Top 5 dodavatelů dle objemu dohadů",
    ],
    goodScenario: {
      title: "Kontrolované dohady",
      description:
        "Všechny dohady jsou spárované s fakturami do 60 dnů, odchylka odhad vs. skutečnost pod 5 %, žádné dohady starší 6 měsíců.",
      indicators: [
        "0 dohadů > 90 dní",
        "Přesnost 96 %",
        "Průměrný pár 42 dní",
        "0 zapomenutých",
      ],
      actions: ["Pokračovat v měsíční kontrole", "Kalibrovat odhady"],
    },
    badScenario: {
      title: "Zapomenuté staré dohady",
      description:
        "3 dohady za 890K jsou starší 6 měsíců bez párování — možné duplicitní zaúčtování nebo chybné ocenění. Zkreslují výsledek hospodaření.",
      indicators: [
        "3 dohady > 180 dní",
        "890K nepárováno",
        "Přesnost 68 %",
        "Chybí dodavatelská komunikace",
      ],
      actions: [
        "Kontaktovat dodavatele pro faktury",
        "Revize oprávněnosti dohadu",
        "Rozpuštění do výsledku pokud neopodstatněný",
        "Zlepšit proces workflow přijatých faktur",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "80 % automatizováno",
    relatedAnalyses: ["1-02", "11-10"],
    businessImpact: "Střední — zkreslení účetních výkazů",
    implementationStatus: "Produkce",
  },
  {
    id: "2-04",
    sectionId: 2,
    sectionTitle: "Náklady, rozpočty, prognózy",
    name: "Marže po projektech",
    source: "výnosy vs. výkazy",
    good: "Průměr 34%, minimum 18%",
    bad: "2 projekty pod 5%",
    description:
      "Projektová kontribuce — výpočet marže na úrovni jednotlivých projektů/zakázek. Kombinace fakturovaných výnosů a skutečných nákladů (timesheety × sazba + přímé výdaje + alokovaný overhead). Identifikace ztrátových projektů a benchmarking.",
    methodology:
      "Pro každý projekt: Marge = (výnosy − přímé náklady − alokovaný OH) / výnosy. Timesheety Caflou/Jira × hourly rate zaměstnance. Alokace overheadu dle klíče (hodiny, výnos, plocha). Segmentace projektů po typech, velikosti, týmu.",
    dataInputs: [
      "Fakturace po projektech (ERP)",
      "Timesheety Caflou / Jira (GET /timesheet/entries)",
      "Hourly rates zaměstnanců",
      "Přímé projektové náklady",
      "Overhead alokační klíč",
    ],
    outputMetrics: [
      "Marže po projektech (%)",
      "Průměr / medián / minimum marže",
      "Počet ztrátových projektů",
      "Top 10 nejziskovějších / nejztrátovějších",
      "Marže podle project managera",
    ],
    goodScenario: {
      title: "Zdravé projektové marže",
      description:
        "Průměrná marže 34 %, minimum nad 18 %, žádný projekt ve ztrátě, konzistentní napříč týmy.",
      indicators: [
        "Průměr 34 %",
        "Min 18 %",
        "0 ztrátových",
        "σ mezi PM = 4 %",
      ],
      actions: ["Benchmark dalších projektů", "Bonusy nejlepším PM"],
    },
    badScenario: {
      title: "Ztrátové projekty",
      description:
        "2 projekty s marží pod 5 % (jeden dokonce −8 %), scope creep bez change requestu, neúčtovaný overtime.",
      indicators: [
        "2 projekty < 5 %",
        "1 projekt marže −8 %",
        "Scope creep bez CR",
        "Overtime neúčtován",
      ],
      actions: [
        "Project recovery plan",
        "Jednání s klientem o cenové úpravě",
        "Zavést schvalovací proces pro CR",
        "Stop-loss — ukončit projekt",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "75 % automatizováno",
    relatedAnalyses: ["9-01", "9-07", "2-01"],
    businessImpact: "Vysoký — priorizace portfolia",
    implementationStatus: "Produkce",
  },
  {
    id: "2-05",
    sectionId: 2,
    sectionTitle: "Náklady, rozpočty, prognózy",
    name: "Interní přefakturace",
    source: "mezistřediskové doklady",
    good: "Vyrovnané",
    bad: "Nezaúčtováno 210K",
    description:
      "Evidence a kontrola interních přefakturací mezi středisky/entitami. Důležité pro správné projektové P&L i pro transfer pricing u skupinových transakcí. Nezaúčtované interní transakce zkreslují segmentový reporting.",
    methodology:
      "Mezistřediskové doklady evidovány jako dvoustranné operace: středisko A (náklad), středisko B (výnos). Cross-check SUM(A) = SUM(B). Eliminace při konsolidaci. Pro TP dokumentace: porovnání s arm's length cenami.",
    dataInputs: [
      "ERP mezistřediskové doklady",
      "Plán sdílených služeb (alokační klíče)",
      "Smlouvy o sdílení služeb (SLA)",
      "TP dokumentace (pro skupinu)",
      "Nákladová struktura středisek",
    ],
    outputMetrics: [
      "Objem interních přefakturací (Kč)",
      "Nespárované transakce (Kč)",
      "Eliminační rozdíl",
      "Marže interních služeb (%)",
      "Top 3 interní dodavatelé / odběratelé",
    ],
    goodScenario: {
      title: "Vyrovnané interní toky",
      description:
        "Všechny mezistřediskové transakce spárované, eliminace sedí, arm's length podloženo TP dokumentací.",
      indicators: [
        "0 nespárovaných",
        "Eliminace sedí",
        "TP dokumentace OK",
        "Arm's length potvrzeno",
      ],
      actions: ["Archivovat TP reporty", "Měsíční review"],
    },
    badScenario: {
      title: "Nezaúčtované interní transakce",
      description:
        "210K nezaúčtováno jedno-stranně — zkresluje výsledky středisek, riziko při auditu, problém pro TP dokumentaci.",
      indicators: [
        "210K nespárováno",
        "Chybí TP dokumentace",
        "Segmentový report nesedí",
        "Riziko TP doměrku",
      ],
      actions: [
        "Okamžitě doúčtovat",
        "Aktualizovat TP dokumentaci",
        "Revize interních smluv",
        "Konzultace s TP specialistou",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "80 % automatizováno",
    relatedAnalyses: ["5-02", "2-04"],
    businessImpact: "Vysoký — TP riziko + reporting",
    implementationStatus: "Produkce",
  },
  {
    id: "2-06",
    sectionId: 2,
    sectionTitle: "Náklady, rozpočty, prognózy",
    name: "Predikce cash flow",
    source: "splatnosti + vzorce",
    good: "Pozitivní ve všech horizontech",
    bad: "Negativní za 47 dní",
    description:
      "13-week rolling cash flow forecast kombinující smluvní splatnosti, historické platební chování a sezónní vzorce. Kritický nástroj treasury — umožňuje včasnou reakci na hrozící cash gap.",
    methodology:
      "Pro každou pohledávku: expected_payment_date = due_date + avg_delay(customer). Pro závazky: plánované platby dle DPP. Sezónní koeficienty. Monte Carlo simulace pro confidence intervals. Daily cash position = starting + inflows − outflows.",
    dataInputs: [
      "Saldokonto pohledávek (splatnosti)",
      "Saldokonto závazků",
      "Historické platební chování klientů",
      "Fixní platby (mzdy, nájmy, úvěry)",
      "Bankovní zůstatky (FIO, KB, ČSOB API)",
    ],
    outputMetrics: [
      "Denní cash position po 90 dní",
      "Minimum cash za horizont (Kč)",
      "Datum nejnižšího zůstatku",
      "Confidence interval (P10, P90)",
      "Dny do cash-out v nejhorším scénáři",
    ],
    goodScenario: {
      title: "Zdravá likviditní pozice",
      description:
        "CF forecast pozitivní ve všech horizontech (30/60/90 dní), minimum 1.2M, dostatečný buffer.",
      indicators: [
        "CF +30/+60/+90 dní pozitivní",
        "Min 1.2M Kč",
        "Buffer 45 dní operativních nákladů",
        "P10 scénář stále kladný",
      ],
      actions: ["Termínovaný vklad přebytku", "Vyjednat lepší podmínky úvěru"],
    },
    badScenario: {
      title: "Hrozící cash gap",
      description:
        "Za 47 dní záporný zůstatek, při neočekávaném výpadku platby již za 21 dní. Nutná okamžitá akce.",
      indicators: [
        "Cash gap za 47 dní",
        "P10 scénář: gap za 21 dní",
        "Buffer jen 8 dní",
        "Kontokorent z 87 %",
      ],
      actions: [
        "Zrychlit inkaso pohledávek",
        "Jednat s bankou o kontokorentu",
        "Odložit nepriorizené výdaje",
        "Faktoring vybraných pohledávek",
      ],
    },
    frequency: "Týdně (13-week rolling)",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["1-03", "1-04", "2-02"],
    businessImpact: "Kritický — přežití firmy",
    implementationStatus: "Produkce",
  },
  {
    id: "2-07",
    sectionId: 2,
    sectionTitle: "Náklady, rozpočty, prognózy",
    name: "True cost to serve",
    source: "timesheety × sazba",
    good: "Klient stojí 8.2K, generuje 14K",
    bad: "Klient stojí 22K, platí 9K",
    description:
      "Skutečná nákladová cena obsluhy klienta = timesheety všech zaměstnanců × interní sazby + přímé náklady + alokovaný overhead. Odhaluje klienty, kteří vypadají ziskově podle fakturace, ale ve skutečnosti generují ztrátu díky vysoké servisní zátěži.",
    methodology:
      "Per-klient agregace: SUM(timesheet_hours × employee_rate) + direct_costs + overhead_allocation. Porovnání s měsíční fakturací. True margin = (revenue − true_cost) / revenue. Identifikace 'scope creep' klientů.",
    dataInputs: [
      "Timesheety (Caflou API, Jira worklog)",
      "Hourly rates zaměstnanců",
      "Fakturace klientovi (ERP)",
      "Přímé klientské náklady (cestovné, licence)",
      "Overhead allocation klíč",
    ],
    outputMetrics: [
      "True cost per klient (Kč/měsíc)",
      "Revenue per klient (Kč/měsíc)",
      "True margin (%)",
      "Hours per tisíc výnosů",
      "Top 10 ztrátových vs. ziskových klientů",
    ],
    goodScenario: {
      title: "Efektivní obsluha klienta",
      description:
        "Klient stojí 8.2K měsíčně, generuje 14K — marže 41 %, timesheety odpovídají scope, žádný nekompenzovaný overtime.",
      indicators: [
        "True cost 8.2K",
        "Revenue 14K",
        "Marže 41 %",
        "Scope dodržen",
      ],
      actions: ["Udržet stávající pricing", "Prezentovat hodnotu klientovi"],
    },
    badScenario: {
      title: "Klient v hluboké ztrátě",
      description:
        "Klient stojí 22K měsíčně (hodně hodin top seniorů), platí 9K. Scope creep, neustálé urgentní požadavky. Marže −144 %.",
      indicators: [
        "True cost 22K",
        "Revenue 9K",
        "Marže −144 %",
        "Scope creep +60 %",
      ],
      actions: [
        "Renegociace smlouvy (revize sazeb)",
        "Přeúčtování overtime",
        "Downgrade služeb na fix scope",
        "Offboarding klienta",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "75 % automatizováno",
    relatedAnalyses: ["9-01", "9-02", "9-07"],
    businessImpact: "Vysoký — portfolio optimalizace",
    implementationStatus: "Produkce",
  },
];
