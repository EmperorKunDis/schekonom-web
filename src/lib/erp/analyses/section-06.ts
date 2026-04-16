import type { AnalysisDetail } from "./types";

export const section06Analyses: AnalysisDetail[] = [
  {
    id: "6-01",
    sectionId: 6,
    sectionTitle: "DPH, ViDA a e-fakturace",
    name: "Detekce karuselových vzorců",
    source: "KH + graf dodavatelů",
    good: "0 podezřelých vzorců",
    bad: "Dodavatel v řetězci 3 firem s identickými obraty",
    description:
      "Systém analyzuje transakční data z kontrolního hlášení a buduje graf obchodních vztahů mezi dodavateli. Pomocí grafových algoritmů detekuje podezřelé vzorce typické pro karuselové podvody s DPH — uzavřené smyčky, identické obraty, nově vzniklé firmy v řetězci.\n\nDetekce chrání klienty před nechtěným zapojením do podvodných řetězců, které by mohly vést k ručení za nezaplacenou DPH dle §109 zákona o DPH.\n\nSystém průběžně aktualizuje graf vztahů a porovnává nové transakce s databází podezřelých vzorců.",
    methodology:
      "Grafová analýza: 1) Budování grafu obchodních vztahů z KH dat, 2) Detekce cyklů (uzavřených smyček) v grafu, 3) Porovnání obratů v řetězci (shoda > 95 % = podezřelé), 4) Kontrola stáří IČO dodavatelů v ARES, 5) Cross-reference s nespolehlivými plátci DPH.",
    dataInputs: [
      "Kontrolní hlášení (oddíl A i B)",
      "Souhrnné hlášení",
      "ARES databáze",
      "Seznam nespolehlivých plátců DPH",
      "Historické transakce pro trend",
    ],
    outputMetrics: [
      "Počet detekovaných podezřelých vzorců",
      "Finanční objem v rizikových řetězcích",
      "Počet nových dodavatelů v rizikové kategorii",
      "Score rizika per dodavatel (0–100)",
    ],
    goodScenario: {
      title: "Čistý dodavatelský řetězec",
      description:
        "Analýza nedetekovala žádné podezřelé vzorce. Všichni dodavatelé jsou spolehliví plátci DPH s transparentní historií.",
      indicators: [
        "0 detekovaných cyklů v grafu",
        "Všichni dodavatelé spolehliví plátci",
        "Žádné identické obraty v řetězcích",
        "100 % dodavatelů s historií > 2 roky",
      ],
      actions: [
        "Pokračovat v měsíčním monitoringu",
        "Aktualizovat databázi vzorců",
        "Archivovat výsledky pro případnou kontrolu FÚ",
      ],
    },
    badScenario: {
      title: "Podezřelý řetězec detekován",
      description:
        "Systém identifikoval řetězec 3 firem s identickými obraty (odchylka < 2 %). Prostřední firma vznikla před 4 měsíci a nemá žádné zaměstnance. Riziko ručení dle §109 ZDPH.",
      indicators: [
        "1 uzavřená smyčka v grafu",
        "Obraty v řetězci identické (±2 %)",
        "1 firma mladší 6 měsíců",
        "Finanční objem v riziku: 890 000 Kč",
      ],
      actions: [
        "Okamžitě informovat klienta",
        "Pozastavit obchody s podezřelým dodavatelem",
        "Ověřit sídlo dodavatele fyzicky",
        "Konzultovat s daňovým poradcem — §109 ručení",
      ],
    },
    frequency: "Měsíčně (po podání KH)",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["6-04", "10-06", "19-01", "1-05"],
    businessImpact: "Kritický — ochrana před ručením za DPH v řádu milionů Kč",
    implementationStatus: "Produkce",
  },
  {
    id: "6-02",
    sectionId: 6,
    sectionTitle: "DPH, ViDA a e-fakturace",
    name: "Připravenost na ViDA 2030",
    source: "audit ERP",
    good: "Systém ready, XML/UBL výstup OK",
    bad: "ERP nepodporuje e-fakturaci — nutný upgrade",
    description:
      "ViDA (VAT in the Digital Age) — EU reforma DPH s účinností 2028-2030. Povinné e-fakturace strukturovaným formátem (EN 16931) pro B2B transakce, real-time digital reporting místo souhrnných hlášení. Systém auditem ERP odhalí mezery v připravenosti.",
    methodology:
      "Audit ERP: 1) podpora XML UBL 2.1 / PEPPOL, 2) strukturovaný formát dle EN 16931, 3) digital signatures, 4) archivace 10 let dle § 35 ZoÚ, 5) real-time reporting API. Gap analýza vs. ViDA requirements. Roadmap implementace do 2028.",
    dataInputs: [
      "ERP technický audit",
      "EN 16931 standard",
      "PEPPOL specifikace",
      "ViDA directive text (COM/2022/701)",
      "Roadmap EU (2028-2030)",
    ],
    outputMetrics: [
      "ViDA readiness score (0-100)",
      "Počet gap items",
      "Odhadovaný CAPEX na upgrade (Kč)",
      "Time to compliance (měsíce)",
      "Risk of non-compliance (pokuty)",
    ],
    goodScenario: {
      title: "ERP ViDA-ready",
      description:
        "Systém podporuje XML/UBL 2.1, PEPPOL, EN 16931. Readiness score 95/100. Stačí drobné úpravy do 2028.",
      indicators: [
        "Score 95/100",
        "PEPPOL OK",
        "XML/UBL OK",
        "EN 16931 validní",
      ],
      actions: ["Finální testy", "Pilot s vybranými klienty"],
    },
    badScenario: {
      title: "ERP nepřipraven — nutný upgrade",
      description:
        "Systém neumí strukturovaný XML, žádný PEPPOL, manuální export PDF. Readiness 25/100. Nutný zásadní upgrade (CAPEX 500K+).",
      indicators: [
        "Score 25/100",
        "Žádný XML/UBL",
        "Žádný PEPPOL",
        "CAPEX 500K+",
      ],
      actions: [
        "Vyhodnocení: upgrade vs. nový ERP",
        "RFP na integrátory",
        "Pilot B2B e-fakturace 2026",
        "Training účetní na strukturovaný formát",
      ],
    },
    frequency: "Ročně + při změnách ViDA",
    automationLevel: "70 % automatizováno",
    relatedAnalyses: ["6-01", "6-03"],
    businessImpact: "Kritický — 2028 povinnost",
    implementationStatus: "Roadmap",
  },
  {
    id: "6-03",
    sectionId: 6,
    sectionTitle: "DPH, ViDA a e-fakturace",
    name: "XML/UBL výměna",
    source: "automatický výstup",
    good: "100% automatická konverze",
    bad: "32% faktur vyžaduje manuální zásah",
    description:
      "Konverze vydaných a přijatých faktur do strukturovaného XML/UBL formátu (Universal Business Language 2.1) pro automatizovanou výměnu mezi ERP systémy. Kritické pro ViDA compliance a efektivní workflow přijatých faktur (OCR → ERP bez retyping).",
    methodology:
      "Výstup: faktury z ERP → XML transformace přes XSLT šablony (EN 16931 compliant). Vstup: příjem UBL XML / PEPPOL dokumentů → parsing → import do ERP. Validace XSD schema. Fallback: OCR + NER pro neformátované PDF.",
    dataInputs: [
      "Money S3 / Pohoda — fakturační data",
      "EN 16931 XSD schéma",
      "PEPPOL Access Point",
      "OCR engine (pro fallback)",
      "DocuWare přijaté faktury",
    ],
    outputMetrics: [
      "% automatická konverze",
      "Počet manuálních zásahů",
      "Validation error rate (%)",
      "Throughput (faktur/hodina)",
      "OCR accuracy (% pro fallback)",
    ],
    goodScenario: {
      title: "100 % automatická konverze",
      description:
        "Všechny faktury UBL 2.1 validní, 0 manuálních zásahů, PEPPOL routing funkční, přijaté faktury automaticky v ERP do 5 minut.",
      indicators: ["100 % auto", "0 errors", "PEPPOL OK", "Throughput 200 f/h"],
      actions: ["Rozšíření na další klienty", "Monitoring"],
    },
    badScenario: {
      title: "Vysoká míra manuálních zásahů",
      description:
        "32 % faktur vyžaduje manuální zásah — chybějící pole, nevalidní XSD, problémy s DIČ. Úspora z automatizace je neutralizována.",
      indicators: [
        "32 % manuál",
        "Error rate 18 %",
        "Throughput 60 f/h",
        "Overtime účetní",
      ],
      actions: [
        "Root cause: chybějící pole v ERP",
        "Rozšíření master dat",
        "Školení účetní",
        "Upgrade XSLT transformací",
      ],
    },
    frequency: "Kontinuální (real-time)",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["6-01", "6-02", "11-08"],
    businessImpact: "Vysoký — efektivita + ViDA",
    implementationStatus: "Produkce",
  },
  {
    id: "6-04",
    sectionId: 6,
    sectionTitle: "DPH, ViDA a e-fakturace",
    name: "Chybné sazby DPH",
    source: "validace",
    good: "0 chybných sazeb",
    bad: "4 faktury se špatnou sazbou 21% místo 15%",
    description:
      "Validace správnosti sazeb DPH (základní 21 %, snížená 12 % od 2024, sjednocení sazeb) dle přílohy 3 ZoDPH. Chybná sazba = chybné přiznání = doměrek + penále. Systém cross-validuje sazbu s kódem zboží/služby (KN kód).",
    methodology:
      "Validace: faktura → KN kód / položka v katalogu → mapa KN → DPH sazba. Cross-check: historické sazby (zda konzistentní), porovnání s typem plnění (zboží/služba/reverse charge), legislativní změny (2024 sjednocení 15/10 → 12 %).",
    dataInputs: [
      "Fakturace (ERP)",
      "Katalog položek s KN kódy",
      "Mapa KN → DPH sazba (příloha 3 ZoDPH)",
      "Historie fakturací (konzistence)",
      "Legislativní updates (BGBl CZ)",
    ],
    outputMetrics: [
      "Počet chybných sazeb",
      "Dopad na DPH (Kč)",
      "Riziko doměrku (Kč)",
      "Validation accuracy (%)",
      "Počet opravných daňových dokladů",
    ],
    goodScenario: {
      title: "Správné sazby DPH",
      description:
        "0 chybných sazeb, všechny položky mají KN kód, validace automatická před odesláním faktury.",
      indicators: [
        "0 chybných",
        "KN 100 % pokrytí",
        "Auto-validace",
        "0 opravných dokladů",
      ],
      actions: ["Udržovat katalog aktuální", "Monitoring legislativy"],
    },
    badScenario: {
      title: "Chybné sazby — potřeba oprav",
      description:
        "4 faktury se sazbou 21 % místo 12 % — přefakturováno klientovi, riziko doměrku + penále, nutnost opravných daňových dokladů.",
      indicators: [
        "4 chybné faktury",
        "Přeúčtováno 35K",
        "Riziko doměrku",
        "Nutné ODD",
      ],
      actions: [
        "Okamžitě vystavit ODD (§ 45 ZoDPH)",
        "Vrátit klientovi přeplatek",
        "Update KN mapování",
        "Školení fakturantek",
      ],
    },
    frequency: "Kontinuální (každá faktura)",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["6-01", "1-05"],
    businessImpact: "Vysoký — compliance + vztahy s klienty",
    implementationStatus: "Produkce",
  },
];
