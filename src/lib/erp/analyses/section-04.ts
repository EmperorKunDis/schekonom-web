import type { AnalysisDetail } from "./types";

export const section04Analyses: AnalysisDetail[] = [
  {
    id: "4-01",
    sectionId: 4,
    sectionTitle: "Německé daně a pendleři",
    name: "Steuererklärung",
    source: "ELSTER",
    good: "100% elektronicky, 0 zamítnutí",
    bad: "3 zamítnutá",
    description:
      "Správa a podání německých daňových přiznání (Steuererklärung) pro pendlery a české firmy s aktivitami v Německu. Systém automatizuje přípravu, validaci a elektronické podání přes ELSTER a sleduje status každého přiznání až do jeho vyřízení.\n\nPro pendlery je klíčová správná aplikace smlouvy o zamezení dvojího zdanění (DBA) a optimální využití všech dostupných odpočtů — Werbungskosten, Pendlerpauschale, Sonderausgaben.\n\nSystém monitoruje celý lifecycle přiznání: od sběru podkladů, přes validaci, podání, až po přijetí Steuerbescheidu a případné odvolání.",
    methodology:
      "End-to-end management: 1) Sběr podkladů (knihy jízd, potvrzení zaměstnavatele, doklady), 2) Validace kompletnosti vůči checklistu, 3) Výpočet daňové povinnosti s optimalizací, 4) Elektronické podání přes ELSTER API, 5) Monitoring statusu, 6) Porovnání Steuerbescheid vs. přiznání.",
    dataInputs: [
      "Potvrzení o příjmu (Lohnsteuerbescheinigung)",
      "Knihy jízd (GPS data)",
      "Doklady o výdajích (Werbungskosten)",
      "Rodinné údaje (Kindergeld, Kinderfreibetrag)",
      "ELSTER certifikáty a přihlašovací údaje",
    ],
    outputMetrics: [
      "Počet podaných přiznání",
      "% elektronicky podaných",
      "Průměrná refundace v EUR",
      "Počet zamítnutých / vrácených",
      "Průměrná doba vyřízení (dny)",
    ],
    goodScenario: {
      title: "Bezchybné podání",
      description:
        "Všechna přiznání byla podána elektronicky přes ELSTER bez jediného zamítnutí. Průměrná refundace dosáhla 2 800 EUR díky optimálnímu využití odpočtů.",
      indicators: [
        "100 % elektronicky podáno",
        "0 zamítnutých přiznání",
        "Průměrná refundace 2 800 EUR",
        "Vše podáno min. 14 dní před termínem",
      ],
      actions: [
        "Aktualizovat šablony pro nový Steuerjahr",
        "Ověřit platnost ELSTER certifikátů",
        "Připravit přehled pro klienty",
      ],
    },
    badScenario: {
      title: "Zamítnutá přiznání",
      description:
        "3 přiznání byla zamítnuta Finanzamtem — důvody: neplatný certifikát (1), chybějící Anlage N (1) a nesrovnalost v Pendlerpauschale (1). Klienti přicházejí o refundace v řádu tisíců EUR.",
      indicators: [
        "3 zamítnutá přiznání",
        "1 expirovaný ELSTER certifikát",
        "Průměrná ztracená refundace 1 900 EUR",
        "2 přiznání podána po termínu",
      ],
      actions: [
        "Okamžitě opravit a znovu podat zamítnutá přiznání",
        "Obnovit expirované certifikáty",
        "Prověřit checklist pro kompletnost podkladů",
        "Implementovat automatickou validaci před podáním",
      ],
    },
    frequency: "Ročně (sezóna leden–červenec), monitoring průběžně",
    automationLevel: "75 % automatizováno",
    relatedAnalyses: ["4-02", "4-04", "4-11", "5-01"],
    businessImpact: "Vysoký — přímý finanční dopad na klienty",
    implementationStatus: "Produkce",
  },
  {
    id: "4-02",
    sectionId: 4,
    sectionTitle: "Německé daně a pendleři",
    name: "Optimalizace odpočtů",
    source: "knihy jízd",
    good: "Průměrná refundace 2,800 EUR",
    bad: "Nevyužitý odpočet 1,200 EUR",
    description:
      "Maximalizace německých daňových odpočtů pro pendlery (Entfernungspauschale 0,30 €/km do 20 km, 0,38 € nad 20 km; Werbungskosten, Verpflegungsmehraufwand). Systém z GPS knih jízd a docházkových dat automaticky generuje maximální oprávněné odpočty pro Einkommensteuererklärung.",
    methodology:
      "GPS API knihy jízd → extrakce denních tras domov-pracoviště. Výpočet: entfernungspauschale = min(km, 20) × 0,30 + max(km − 20, 0) × 0,38 × pracovní dny. Verpflegungsmehraufwand dle délky nepřítomnosti (8/24 h). Double-Haushaltsführung pro druhou domácnost.",
    dataInputs: [
      "GPS knihy jízd (Webfleet / Geotab API)",
      "Docházka pendlera",
      "Pracovní smlouva (Arbeitgeber, místo)",
      "Účty za bydlení v DE (Doppelte Haushaltsführung)",
      "ELSTER přiznání minulé roky",
    ],
    outputMetrics: [
      "Celkový odpočet (EUR)",
      "Entfernungspauschale (EUR)",
      "Refundace daně (EUR)",
      "Nevyužitý potenciál (EUR)",
      "Compliance s EStG § 9",
    ],
    goodScenario: {
      title: "Maximalizovaná refundace",
      description:
        "Průměrná refundace 2 800 EUR, všechny odpočty využity, dokumentace GPS kompletní pro Finanzamt.",
      indicators: [
        "Refundace 2.8K EUR",
        "0 nevyužitých odpočtů",
        "GPS kompletní",
        "EStG § 9 OK",
      ],
      actions: ["Pokračovat v GPS trackingu", "Ročně podat ELSTER"],
    },
    badScenario: {
      title: "Nevyužitý daňový potenciál",
      description:
        "Nevyužitý odpočet 1 200 EUR — chybí GPS data, Doppelte Haushaltsführung nevyžádán, Verpflegung podceněn.",
      indicators: [
        "Nevyužito 1.2K EUR",
        "Chybí GPS 45 dní",
        "Doppelte Haushalt nevyužit",
        "Verpflegung 50 %",
      ],
      actions: [
        "Doplnit GPS zpětně",
        "Zpětné přiznání (4 roky)",
        "Doložit doklady o druhé domácnosti",
        "Konzultace daňového poradce DE",
      ],
    },
    frequency: "Ročně (Einkommensteuer) + průběžně (GPS)",
    automationLevel: "80 % automatizováno",
    relatedAnalyses: ["4-01", "4-08", "4-09"],
    businessImpact: "Vysoký — přímá finanční úspora",
    implementationStatus: "Produkce",
  },
  {
    id: "4-03",
    sectionId: 4,
    sectionTitle: "Německé daně a pendleři",
    name: "Kindergeld",
    source: "Familienkasse",
    good: "Všechny rodiny čerpají",
    bad: "2 rodiny nečerpají — 500 EUR/měsíc",
    description:
      "Monitoring čerpání Kindergeld (250 €/dítě/měsíc) přes Familienkasse pro pendlery s dětmi. Nárok i pro děti žijící v ČR (EU koordinace SV). Systém identifikuje rodiny, které nárok nevyužívají, a automatizuje žádost přes Formular KG1.",
    methodology:
      "HR evidence pendlerů × počet dětí. Cross-check s Familienkasse statusem (per rodina). Pro nečerpající: generace KG1 formuláře + přílohy (rodný list, potvrzení o studiu). EU koordinace: pokud druhý rodič čerpá přídavky v ČR, rozdíl doplácí DE.",
    dataInputs: [
      "HR evidence pendlerů + rodinný stav",
      "Familienkasse API status",
      "Rodné listy dětí",
      "Potvrzení o studiu (do 25 let)",
      "EU formulář E411 (koordinace)",
    ],
    outputMetrics: [
      "Počet rodin čerpajících",
      "Počet nečerpajících",
      "Nevyužitá částka (EUR/měsíc)",
      "Čas do schválení (dny)",
      "Celkem získáno per pendler (EUR/rok)",
    ],
    goodScenario: {
      title: "100 % čerpání Kindergeld",
      description:
        "Všech 42 rodin s dětmi čerpá Kindergeld, průměr 3 000 EUR/rok/rodina, EU koordinace funkční.",
      indicators: [
        "100 % čerpání",
        "3K EUR/rok/rodina",
        "EU E411 OK",
        "0 čekajících",
      ],
      actions: [
        "Každoroční revize (studující děti)",
        "Monitoring změn legislativy",
      ],
    },
    badScenario: {
      title: "Nevyužitý Kindergeld",
      description:
        "2 rodiny nečerpají — 500 EUR/měsíc = 6 000 EUR/rok promarněných. Chybí formulář KG1 nebo E411.",
      indicators: [
        "2 nečerpající",
        "6K EUR/rok promarněno",
        "Chybí KG1",
        "E411 nepodán",
      ],
      actions: [
        "Okamžitě podat KG1 + přílohy",
        "E411 přes ČSSZ pro koordinaci",
        "Zpětná žádost (až 6 měsíců)",
        "HR edukace pendlerů",
      ],
    },
    frequency: "Měsíčně + změny v rodinném stavu",
    automationLevel: "75 % automatizováno",
    relatedAnalyses: ["4-01", "4-07"],
    businessImpact: "Vysoký — benefit pro zaměstnance",
    implementationStatus: "Produkce",
  },
  {
    id: "4-04",
    sectionId: 4,
    sectionTitle: "Německé daně a pendleři",
    name: "Formuláře A1",
    source: "HR data",
    good: "Vydány před vysláním",
    bad: "Chybí — nelegální práce v DE",
    description:
      "Formulář A1 (Nařízení EU 883/2004) potvrzuje, že zaměstnanec podléhá sociálnímu pojištění v ČR, ne v DE. Pro pendlery a vyslané pracovníky povinný — bez A1 hrozí doplacení SV v Německu (cca 20 % mzdy) a pokuty Zollamt.",
    methodology:
      "Workflow: plán vyslání → ČSSZ e-Podání formulář A1 → získání potvrzení do 2 týdnů → archivace + předání zaměstnanci. Systém hlídá expiraci (max 24 měsíců) a alertuje na prolongaci. Kontrola před každou cestou.",
    dataInputs: [
      "HR plán vyslání (datum, místo DE)",
      "Pracovní smlouva + dodatek o vyslání",
      "ČSSZ e-Podání A1 formulář",
      "Historie A1 per zaměstnanec",
      "Zollamt/SVLFG registrace",
    ],
    outputMetrics: [
      "% zaměstnanců s platným A1",
      "Počet vyslání bez A1",
      "Doba vydání A1 (dny)",
      "Počet expirujících do 30 dnů",
      "Pokuty Zollamt (EUR)",
    ],
    goodScenario: {
      title: "A1 pro všechna vyslání",
      description:
        "100 % vyslání má A1 před výjezdem, průměrná doba vydání 10 dní, 0 pokut, roční prolongace automatická.",
      indicators: ["100 % A1", "Vydání 10 dní", "0 pokut", "Auto prolongace"],
      actions: ["Pokračovat v procesu", "Roční review expirací"],
    },
    badScenario: {
      title: "Chybějící A1 — riziko nelegální práce",
      description:
        "3 pendleři bez platného A1 — Zollamt kontrola by znamenala doplacení SV 15 % + pokuty. Reputační riziko.",
      indicators: [
        "3 bez A1",
        "Riziko doplatku 20 %",
        "Zollamt pokuta",
        "Reputační riziko",
      ],
      actions: [
        "Okamžitě podat A1 (expressní řízení)",
        "Stopstate vyslání do vydání A1",
        "Audit všech aktuálních vyslání",
        "Workflow improvement",
      ],
    },
    frequency: "Před každým vysláním + měsíčně kontrola expirací",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["4-05", "4-06"],
    businessImpact: "Kritický — compliance + pokuty",
    implementationStatus: "Produkce",
  },
  {
    id: "4-05",
    sectionId: 4,
    sectionTitle: "Německé daně a pendleři",
    name: "SOKA-BAU",
    source: "evidence",
    good: "Včas, zaplaceno",
    bad: "Penále 5,000 EUR",
    description:
      "SOKA-BAU (Sozialkasse des Baugewerbes) je povinný odvod pro stavební firmy působící v DE — financuje dovolenou, odborné vzdělávání a podpůrný fond. Pro české pendlery ve stavebnictví kritické, měsíční platby + reporting.",
    methodology:
      "Registrace u SOKA-BAU per projekt. Měsíční Meldung: počet zaměstnanců × odpracované hodiny × sazba (aktuálně 14.5 %). Platba do 20. následujícího měsíce. Automatický import z Anet docházky → SOKA-BAU portál export XML.",
    dataInputs: [
      "Docházka pendlerů v DE (Anet)",
      "Registrace SOKA-BAU (projekty)",
      "Sazebník SOKA-BAU",
      "Pracovní smlouvy (stavební profese)",
      "Bankovní platební systém (SEPA)",
    ],
    outputMetrics: [
      "Měsíční odvod (EUR)",
      "Počet registrovaných zaměstnanců",
      "Odpracované hodiny v DE",
      "Delay platby (dny)",
      "Penále (EUR)",
    ],
    goodScenario: {
      title: "SOKA-BAU řádně odvedeno",
      description:
        "Měsíční Meldung podán do 15., platba do 20., 0 penále, všichni zaměstnanci registrováni.",
      indicators: [
        "Meldung včas",
        "Platba včas",
        "100 % registrace",
        "0 penále",
      ],
      actions: ["Pokračovat v procesu", "Měsíční report"],
    },
    badScenario: {
      title: "SOKA-BAU penále",
      description:
        "Meldung 30 dní po termínu, penále 5 000 EUR, riziko pozastavení projektu v DE.",
      indicators: [
        "Delay 30 dní",
        "Penále 5K EUR",
        "Riziko pozastavení",
        "Chybí Meldung",
      ],
      actions: [
        "Okamžitě podat + zaplatit",
        "Žádost o prominutí penále",
        "Automatizace procesu",
        "Zavést reminder 5 dní před termínem",
      ],
    },
    frequency: "Měsíčně",
    automationLevel: "80 % automatizováno",
    relatedAnalyses: ["4-04", "4-11"],
    businessImpact: "Vysoký — compliance stavebního sektoru",
    implementationStatus: "Produkce",
  },
  {
    id: "4-06",
    sectionId: 4,
    sectionTitle: "Německé daně a pendleři",
    name: "Freistellung",
    source: "registrace",
    good: "98.5% úspěšnost",
    bad: "Zamítnuto — srážka 15%",
    description:
      "Freistellungsbescheinigung § 48b EStG — osvobození od srážkové daně 15 % při stavebních službách v DE. Subdodavatel bez Freistellung musí odvádět 15 % z každé faktury. Systém automaticky podává žádosti u Bundeszentralamt für Steuern (BZSt).",
    methodology:
      "BZSt online formulář → upload dokumentů (výpis z OR, finanční bezúhonnost, čestné prohlášení). Žádost vyřízena do 4 týdnů. Platnost 1-3 roky. Auto-renewal 60 dní před expirací. Tracking status per klient.",
    dataInputs: [
      "BZSt API pro Freistellung",
      "Výpis z obchodního rejstříku (ARES)",
      "Finanční bezúhonnost (FÚ)",
      "Kontrakty s německými odběrateli",
      "Historie Freistellung (expirace)",
    ],
    outputMetrics: [
      "% úspěšných žádostí",
      "Počet aktivních Freistellung",
      "Srážková daň zabráněná (EUR)",
      "Doba vydání (dny)",
      "Expirace v příštích 60 dnech",
    ],
    goodScenario: {
      title: "Úspěšné Freistellung",
      description:
        "98.5 % žádostí úspěšných, všichni klienti s platnou Freistellung, 0 srážkové daně zaplaceno.",
      indicators: [
        "98.5 % success",
        "100 % klientů OK",
        "0 srážky",
        "Auto-renewal",
      ],
      actions: ["Pokračovat v procesu", "Monitoring expirací"],
    },
    badScenario: {
      title: "Freistellung zamítnuta",
      description:
        "Žádost zamítnuta — srážka 15 % z faktur = 45K EUR zamražených. Důvod: neúplné doklady.",
      indicators: [
        "Zamítnuto",
        "Srážka 15 %",
        "45K EUR zamraženo",
        "Neúplné doklady",
      ],
      actions: [
        "Doplnit chybějící doklady",
        "Podat odvolání do 30 dnů",
        "Request Erstattung přeplatku",
        "Konzultace BZSt specialisty",
      ],
    },
    frequency: "Dle expirace (1-3 roky) + nové klienty",
    automationLevel: "80 % automatizováno",
    relatedAnalyses: ["4-11", "4-04"],
    businessImpact: "Vysoký — cash flow (srážka 15 %)",
    implementationStatus: "Produkce",
  },
  {
    id: "4-07",
    sectionId: 4,
    sectionTitle: "Německé daně a pendleři",
    name: "Kinderfreibetrag",
    source: "legislativa",
    good: "Automatická aktualizace",
    bad: "Nezaktualizováno — přeplatil",
    description:
      "Kinderfreibetrag (daňová sleva na dítě) v DE — aktuálně 6 384 €/dítě/rok (2024). Systém sleduje změny legislativy (Bundesfinanzministerium) a automaticky aktualizuje parametry pro výpočet Einkommensteuer. Neaktuální hodnoty znamenají špatné přiznání a přeplacenou daň.",
    methodology:
      "Web scraping bundesfinanzministerium.de + BGBl sledování legislativních změn. Parametrizace: Grundfreibetrag, Kinderfreibetrag, Entfernungspauschale sazby. Při změně: update DB parametrů + notifikace + re-výpočet open přiznání.",
    dataInputs: [
      "Bundesfinanzministerium RSS + scraping",
      "Bundesgesetzblatt (BGBl) changes",
      "Aktuální DB parametrů",
      "Open přiznání (Einkommensteuer)",
      "Kalendář plánovaných změn",
    ],
    outputMetrics: [
      "Počet aktualizovaných parametrů",
      "Delay od změny legislativy (dny)",
      "Počet přiznání re-počítaných",
      "Přeplatky vrácené zaměstnancům (EUR)",
      "Compliance score",
    ],
    goodScenario: {
      title: "Parametry vždy aktuální",
      description:
        "Automatická aktualizace do 5 dnů od BGBl, všechna přiznání s nejnovějšími hodnotami, 0 přeplatků.",
      indicators: [
        "Delay < 5 dnů",
        "100 % přiznání aktuálních",
        "0 přeplatků",
        "Auto-update OK",
      ],
      actions: ["Pokračovat v monitoringu BGBl", "Měsíční compliance check"],
    },
    badScenario: {
      title: "Neaktuální Freibetrag",
      description:
        "Kinderfreibetrag nezaktualizován po změně 2024 — pendleři přepláceli 400 EUR/rok × 40 lidí = 16K EUR.",
      indicators: [
        "Delay 180 dní",
        "Přeplatek 16K EUR",
        "40 pendlerů",
        "Nutné opravy",
      ],
      actions: [
        "Okamžitě aktualizovat parametry",
        "Re-počítat všechna otevřená přiznání",
        "Podat opravná přiznání (Berichtigung)",
        "Zlepšit monitoring legislativy",
      ],
    },
    frequency: "Průběžně (scraping), ročně (reset parametrů)",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["4-02", "4-08"],
    businessImpact: "Střední — přímé finanční dopady",
    implementationStatus: "Produkce",
  },
  {
    id: "4-08",
    sectionId: 4,
    sectionTitle: "Německé daně a pendleři",
    name: "Zpětná přiznání",
    source: "archiv",
    good: "12K EUR nalezeno",
    bad: "4,800 EUR promlčeno",
    description:
      "Zpětné Einkommensteuererklärung za 4 roky dozadu (§ 169 AO) — pro pendlery, kteří v minulých letech nepodávali. Systém analyzuje historická data a identifikuje potenciál refundace. Promlčecí lhůta 4 roky (freiwillige Veranlagung) nebo 7 let (Pflichtveranlagung).",
    methodology:
      "Archiv mezd + GPS knih jízd × 4 roky historie. Simulace Einkommensteuer s maximálními odpočty. Identifikace roků s potenciálem > 500 EUR → příprava ELSTER zpětně. Hlídání promlčecí lhůty — 31.12. roku + 4 roky.",
    dataInputs: [
      "Archiv mezd (4 roky)",
      "GPS knihy jízd historické",
      "Lohnsteuerbescheinigung (roční)",
      "Kinderfreibetrag historické hodnoty",
      "ELSTER archiv přiznání",
    ],
    outputMetrics: [
      "Refundace za zpětná přiznání (EUR)",
      "Počet pendlerů s potenciálem",
      "Rok do promlčení",
      "Průměrná refundace (EUR/rok)",
      "Promlčená částka (EUR)",
    ],
    goodScenario: {
      title: "Zpětné refundace získány",
      description:
        "12K EUR nalezeno a vyžádáno pro 8 pendlerů za 3 roky zpětně, 0 promlčených částek.",
      indicators: [
        "12K EUR získáno",
        "8 pendlerů",
        "3 roky zpětně",
        "0 promlčeno",
      ],
      actions: ["Pokračovat v monitoringu", "Proaktivní nabídka klientům"],
    },
    badScenario: {
      title: "Promlčená refundace",
      description:
        "4 800 EUR promlčeno — pendler nevěděl o nároku, lhůta uplynula 31. 12. Klient frustrován.",
      indicators: [
        "4.8K EUR promlčeno",
        "Chybí monitoring",
        "Frustrovaný klient",
        "Lhůta prošla",
      ],
      actions: [
        "Okamžitý audit všech pendlerů (4 roky)",
        "Alert system 60 dní před promlčením",
        "Proaktivní komunikace klientům",
        "Možná žádost o obnovu řízení",
      ],
    },
    frequency: "Ročně + při nástupu nového pendlera",
    automationLevel: "75 % automatizováno",
    relatedAnalyses: ["4-01", "4-02"],
    businessImpact: "Vysoký — přímá finanční hodnota klientům",
    implementationStatus: "Produkce",
  },
  {
    id: "4-09",
    sectionId: 4,
    sectionTitle: "Německé daně a pendleři",
    name: "Stálé vs. proměnné pracoviště",
    source: "GPS",
    good: "Úspora 1,400 EUR/rok",
    bad: "Doměrek 3,200 EUR",
    description:
      "Klasifikace Erste Tätigkeitsstätte (první pracoviště) vs. Einsatzwechseltätigkeit (proměnlivé pracoviště) má zásadní dopad na odpočty. Pro Erste TS: Entfernungspauschale (0,30 €/km jednosměrně). Pro Einsatzwechsel: Reisekosten (0,30 €/km obousměrně + Verpflegung).",
    methodology:
      "GPS analýza: pokud pendler jezdí do > 3 různých lokací za rok a žádná nedominuje (> 50 % dnů), klasifikace jako Einsatzwechseltätigkeit. Jinak Erste Tätigkeitsstätte. BFH judikatura pro edge cases. Automatická kategorizace per pendler.",
    dataInputs: [
      "GPS knihy jízd (detailní)",
      "Pracovní smlouva (Arbeitsort)",
      "Docházka per lokace",
      "BFH judikatura (case law DB)",
      "Einsatzplan od Arbeitgebera",
    ],
    outputMetrics: [
      "Počet pendlerů v Erste TS",
      "Počet v Einsatzwechsel",
      "Úspora / doměrek (EUR)",
      "Účty za Verpflegung (EUR/rok)",
      "BFH compliance status",
    ],
    goodScenario: {
      title: "Správná klasifikace = úspora",
      description:
        "Pendler správně klasifikován jako Einsatzwechsel — odpočet 1 400 EUR/rok navíc (obousměrná km + Verpflegung).",
      indicators: [
        "Einsatzwechsel OK",
        "Úspora 1.4K EUR/rok",
        "GPS podporuje",
        "BFH compliant",
      ],
      actions: ["Dokumentovat GPS pečlivě", "Roční review klasifikace"],
    },
    badScenario: {
      title: "Chybná klasifikace = doměrek",
      description:
        "Pendler deklarován jako Einsatzwechsel, ale Finanzamt reklasifikoval na Erste TS — doměrek 3 200 EUR + úroky.",
      indicators: [
        "Reklasifikace Finanzamt",
        "Doměrek 3.2K",
        "Úroky 6 %",
        "Chybí doklady",
      ],
      actions: [
        "Odvolání (Einspruch) do 1 měsíce",
        "Doložit GPS + Einsatzplan",
        "BFH judikatura argumentace",
        "Konzultace specialisty",
      ],
    },
    frequency: "Ročně (přiznání) + při změně pracoviště",
    automationLevel: "80 % automatizováno",
    relatedAnalyses: ["4-02", "4-08"],
    businessImpact: "Vysoký — přímé odpočty",
    implementationStatus: "Produkce",
  },
  {
    id: "4-10",
    sectionId: 4,
    sectionTitle: "Německé daně a pendleři",
    name: "Penze v zahraničí",
    source: "FÚ Neubrandenburg",
    good: "DBA, daň 0%",
    bad: "Zdaněno 18% místo 0%",
    description:
      "Zdanění penzí českých rezidentů z německé DRV (Deutsche Rentenversicherung) dle DBA ČR-DE (Smlouva o zamezení dvojího zdanění, 2003). Soukromé a státní penze zdaněny v zemi rezidence — ČR (15 %), ne v DE. FÚ Neubrandenburg však automaticky sráží, pokud není podána Antrag auf Freistellung.",
    methodology:
      "Identifikace pendlerů v důchodovém věku s německou penzí. Antrag auf Freistellung u FÚ Neubrandenburg + potvrzení ČR daňové rezidence. Po schválení: DRV vyplácí bez srážky. Zpětné vrácení (Erstattung) za již sražené částky až 4 roky zpětně.",
    dataInputs: [
      "DRV — seznam poživatelů penze",
      "DBA ČR-DE (čl. 18)",
      "Potvrzení daňové rezidence (FÚ ČR)",
      "FÚ Neubrandenburg Antragsformular",
      "Historie srážek",
    ],
    outputMetrics: [
      "Počet důchodců s DE penzí",
      "Srážková daň zabráněná (EUR)",
      "Erstattung zpětná (EUR)",
      "Doba vyřízení (měsíce)",
      "Compliance s DBA",
    ],
    goodScenario: {
      title: "DBA využita — 0 % srážka",
      description:
        "Antrag schválen, DE penze vyplácena bez srážky (jen v ČR zdaněna 15 %), úspora 1 800 EUR/rok/důchodce.",
      indicators: [
        "0 % DE srážka",
        "DBA OK",
        "Úspora 1.8K/rok",
        "Potvrzení rezidence aktuální",
      ],
      actions: ["Roční prolongace potvrzení", "Monitoring legislativních změn"],
    },
    badScenario: {
      title: "Dvojí zdanění — chybí Antrag",
      description:
        "DE sráží 18 % (vs. 0 % dle DBA) — ročně 2 400 EUR zbytečně. Nutná zpětná Erstattung + Antrag.",
      indicators: [
        "Srážka 18 %",
        "Ztráta 2.4K/rok",
        "Chybí Antrag",
        "4 roky zpětné Erstattung",
      ],
      actions: [
        "Podat Antrag auf Freistellung",
        "Erstattung zpětně 4 roky",
        "Potvrzení rezidence z FÚ ČR",
        "Monitoring FÚ Neubrandenburg",
      ],
    },
    frequency: "Při nástupu do důchodu + roční prolongace",
    automationLevel: "70 % automatizováno",
    relatedAnalyses: ["4-01", "4-02"],
    businessImpact: "Vysoký — významná úspora pro klienta",
    implementationStatus: "Produkce",
  },
  {
    id: "4-11",
    sectionId: 4,
    sectionTitle: "Německé daně a pendleři",
    name: "ELSTER komunikace",
    source: "certifikáty",
    good: "Automatická, 0 manuálních",
    bad: "Certifikát expiroval — 5 nepodáno",
    description:
      "ELSTER (Elektronische Steuererklärung) je oficiální DE portál pro elektronická přiznání. Systém komunikuje přes ERiC interface s kvalifikovaným certifikátem. Expirace certifikátu = nemožnost podání, expirace SSL = selhání automatiky.",
    methodology:
      "ELSTER ERiC API + Zertifikatsdatei (PFX). Monitoring expirace certifikátu (alert 60/30/7 dní). Automatický upload XML přiznání, tracking status (přijato / v kontrole / vydán výměr). Error handling pro ELSTER downtime.",
    dataInputs: [
      "ELSTER ERiC API",
      "Zertifikatsdatei (PFX) + PIN",
      "Einkommensteuer XML (ESt1A)",
      "Status tracking DB",
      "Monitoring dashboard",
    ],
    outputMetrics: [
      "% automaticky podaných",
      "Expirace certifikátu (dny)",
      "ELSTER uptime (%)",
      "Počet zamítnutých podání",
      "Doba vydání Bescheid (týdny)",
    ],
    goodScenario: {
      title: "Automatická ELSTER komunikace",
      description:
        "100 % přiznání podáno automaticky, certifikát prolongován 60 dní před expirací, 0 manuálních zásahů.",
      indicators: [
        "100 % auto",
        "Certifikát valid",
        "ELSTER uptime 99.9 %",
        "0 zamítnutých",
      ],
      actions: ["Monitoring expirace", "Roční test DR certifikátu"],
    },
    badScenario: {
      title: "Expirovaný certifikát — blokace podání",
      description:
        "Certifikát expiroval, 5 přiznání nepodáno, klienti čekají na Bescheid. Prolongace trvá 2 týdny.",
      indicators: [
        "Certifikát expired",
        "5 nepodaných",
        "Klienti čekají",
        "Prolongace 14 dní",
      ],
      actions: [
        "Okamžitě expressní prolongace",
        "Manuální podání přes ELSTER web",
        "Omluva klientům",
        "Alert system certifikát 60 dní předem",
      ],
    },
    frequency: "Kontinuální (monitoring), ročně (prolongace)",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["4-02", "4-08"],
    businessImpact: "Kritický — bez certifikátu nelze podávat",
    implementationStatus: "Produkce",
  },
];
