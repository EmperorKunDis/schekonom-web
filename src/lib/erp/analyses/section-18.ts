import type { AnalysisDetail } from "./types";

export const section18Analyses: AnalysisDetail[] = [
  {
    id: "18-01",
    sectionId: 18,
    sectionTitle: "Organizační inteligence klienta",
    name: "Fluktuace v týmu",
    source: "změny kontaktů",
    good: "Stabilní kontakty 3+ roky",
    bad: "4. kontaktní osoba za rok",
    description:
      "Monitoring změn kontaktních osob na straně klienta je důležitým indikátorem organizační stability. Vysoká fluktuace kontaktů signalizuje interní problémy — restrukturalizace, špatné pracovní podmínky nebo nespokojenost.\n\nKaždá změna kontaktní osoby vyžaduje re-onboarding, který stojí čas i peníze. Systém sleduje počet změn, důvody a dopad na kvalitu spolupráce.\n\nKlíčovým signálem je korelace fluktuace kontaktů se sentimentem a platební morálkou — pokud se zároveň zhoršuje komunikace a platby, je to silný signál problémů.",
    methodology:
      "Change detection: 1) Monitoring kontaktních osob v CRM, 2) Detekce změny (email, telefon, podpis), 3) Korelace s dalšími metrikami, 4) Kvantifikace re-onboarding nákladů.",
    dataInputs: [
      "CRM kontakty per klient",
      "Email podpisy a adresy",
      "Záznamy z hovorů (kdo volá)",
      "Historické kontakty",
    ],
    outputMetrics: [
      "Počet změn kontaktů za 12 měsíců",
      "Průměrná délka kontaktu",
      "Korelace se sentimentem",
      "Re-onboarding náklady",
    ],
    goodScenario: {
      title: "Stabilní tým",
      description:
        "Kontaktní osoby jsou stabilní 3+ roky. Účetní a jednatel se nemění — spolupráce je efektivní a znalost kontextu je vysoká.",
      indicators: [
        "0 změn za 12 měsíců",
        "Průměrná délka kontaktu 3.5 roku",
        "Pozitivní sentiment",
        "Efektivní komunikace",
      ],
      actions: [
        "Udržovat personální vztahy",
        "Investovat do osobní komunikace",
        "Nabídnout advanced služby — tým je připraven",
      ],
    },
    badScenario: {
      title: "Vysoká fluktuace",
      description:
        "4. kontaktní osoba za rok. Každá změna znamená re-onboarding a ztrátu kontextu. Kvalita spolupráce klesá, chyby přibývají.",
      indicators: [
        "4 změny za 12 měsíců",
        "Průměrná délka kontaktu 3 měsíce",
        "Sentiment klesající",
        "Re-onboarding náklady 40h/rok",
      ],
      actions: [
        "Zjistit příčinu fluktuace (exit interview)",
        "Vytvořit standardizovaný onboarding",
        "Dokumentovat vše písemně (ne ústně)",
        "Zvážit eskalaci na jednatele",
      ],
    },
    frequency: "Průběžně (per změna)",
    automationLevel: "75 % automatizováno",
    relatedAnalyses: ["18-02", "18-03", "7-01", "13-01"],
    businessImpact: "Střední — dopad na efektivitu spolupráce",
    implementationStatus: "Produkce",
  },
  {
    id: "18-02",
    sectionId: 18,
    sectionTitle: "Organizační inteligence klienta",
    name: "Interní konflikty",
    source: "tón osob",
    good: "Konzistentní komunikace",
    bad: "Spolumajitel vs. účetní — protichůdné instrukce",
    description:
      "Detekce interních konfliktů u klienta na základě rozporné komunikace od různých kontaktních osob. Pokud spolumajitel říká 'investujte' a účetní říká 'šetřete', existuje interní konflikt, který ovlivňuje naši práci.\n\nSystém porovnává sentiment, instrukce a priority od různých kontaktních osob stejného klienta. Rozpory jsou detekovány NLP modelem trénovaným na contradiction detection (NLI — Natural Language Inference).\n\nPro účetní kancelář je klíčové nestat se rukojmím interního konfliktu — systém doporučuje eskalaci na jednu autoritativní kontaktní osobu.",
    methodology:
      "Multi-source contradiction detection: 1) Segmentace komunikace per kontaktní osoba per klient, 2) NLI model (Natural Language Inference) na párech instrukcí od různých osob, 3) Sentiment comparison per osoba per téma, 4) Priority conflict detection (osoba A: urgentní, osoba B: neprioritní), 5) Alert při detekci rozporu (confidence > 0.8).",
    dataInputs: [
      "Email komunikace segmentovaná per kontaktní osoba (From header parsing)",
      "Daktela hovory — transcription per volající (caller_id → CRM kontakt)",
      "CRM kontakty — role per osoba (jednatel, spolumajitel, účetní, asistentka)",
      "Tickety a požadavky — kdo zadal, jaká priorita, jaký obsah",
      "DocuWare podpisy — kdo podepisuje jaké dokumenty",
    ],
    outputMetrics: [
      "Počet detekovaných rozporů per klient per měsíc",
      "Konfliktní osoby (kdo vs. kdo)",
      "Témata konfliktu (investice, úspory, strategie, operativa)",
      "Severity konfliktu (nízký/střední/vysoký)",
      "Doporučení: kdo je autoritativní kontakt",
    ],
    goodScenario: {
      title: "Konzistentní komunikace",
      description:
        "Všechny kontaktní osoby klienta komunikují konzistentně. Jednatel definuje strategii, účetní realizuje operativu — žádné rozpory. NLI model: 0 kontradikčních párů za 12M.",
      indicators: [
        "0 detekovaných rozporů za 12M",
        "Sentiment alignment: 95 % mezi osobami",
        "Jasná hierarchie: jednatel → účetní → asistentka",
        "Konzistentní instrukce a priority",
      ],
      actions: [
        "Udržovat komunikaci se všemi kontakty",
        "Pokračovat v monitoringu — konflikty mohou vzniknout nečekaně",
        "Dokumentovat distribuci komunikace per role",
      ],
    },
    badScenario: {
      title: "Spolumajitel vs. účetní — protichůdné instrukce",
      description:
        "Spolumajitel A posílá email: 'Investujte do nového stroje, potřebujeme úvěr.' Spolumajitel B volá tentýž den: 'Šetřete, žádné investice.' Účetní píše: 'Nevím, co mám dělat.' 4 kontradikce za 3 měsíce — interní konflikt eskaluje.",
      indicators: [
        "4 kontradikce za 3M (NLI confidence > 0.85)",
        "Konflikt: spolumajitel A vs. spolumajitel B",
        "Témata: investice, cash management, strategie",
        "Účetní (třetí strana) zmatená — chybovost roste",
      ],
      actions: [
        "Svolat společnou schůzku se všemi spolumajiteli",
        "Požadovat jednu autoritativní kontaktní osobu pro rozhodnutí",
        "Dokumentovat všechny instrukce písemně (ochrana kanceláře)",
        "Nezasahovat do konfliktu — zůstat neutrální",
      ],
    },
    frequency: "Per komunikace (real-time NLI), týdenní agregace",
    automationLevel: "65 % automatizováno",
    relatedAnalyses: ["18-01", "18-03", "15-04", "7-01"],
    businessImpact: "Střední — prevence chyb z rozporných instrukcí",
    implementationStatus: "Produkce",
  },
  {
    id: "18-03",
    sectionId: 18,
    sectionTitle: "Organizační inteligence klienta",
    name: "Formální vs. reálná hierarchie",
    source: "kdo schvaluje",
    good: "Jednatel = rozhodovatel",
    bad: "Jednatel podepíše ale nerozumí — riziko",
    description:
      "Mapování skutečné rozhodovací hierarchie klienta versus formální struktury z OR. Systém identifikuje, kdo skutečně rozhoduje (de facto), oproti tomu, kdo je formálně oprávněn (de jure).\n\nPokud jednatel pouze podepisuje dokumenty, ale nerozumí jim (rozhoduje někdo jiný), vzniká riziko — podpis bez porozumění je právně problematický. Systém detekuje tyto situace z komunikačních vzorců.\n\nAnalýza je klíčová pro compliance — kancelář musí komunikovat s osobou, která skutečně rozhoduje, a zároveň zajistit, že formální podpis odpovídá skutečnému souhlasu.",
    methodology:
      "Decision authority mapping: 1) OR analýza — formální struktura (ARES API statutární orgán), 2) Komunikační analýza — kdo odpovídá na rozhodovací otázky (email content analysis), 3) Podpisová analýza — kdo podepisuje dokumenty (DocuWare metadata, DocuSign audit trail), 4) Schvalovací workflow — kdo schvaluje faktury, smlouvy, daňové přiznání (ERP approval logs), 5) Gap analysis: formální vs. reálný rozhodovatel.",
    dataInputs: [
      "ARES API — statutární orgán, jednatel, prokurista, společníci",
      "DocuWare — podpisy na dokumentech (metadata: signer_name, timestamp)",
      "Email komunikace — kdo odpovídá na rozhodovací otázky (keyword: 'souhlasím', 'schvaluji', 'potvrzuji')",
      "ERP approval logs — kdo schvaluje faktury v systému",
      "Daktela hovory — kdo volá při rozhodovacích záležitostech",
    ],
    outputMetrics: [
      "Formální hierarchie (OR): jednatel → prokurista → ...",
      "Reálná hierarchie (detekovaná): kdo skutečně rozhoduje",
      "Gap score: 0 (shodná) až 100 (zcela odlišná)",
      "Risk score: podpis bez porozumění (0–100)",
      "Doporučení: s kým komunikovat per typ rozhodnutí",
    ],
    goodScenario: {
      title: "Jednatel = rozhodovatel",
      description:
        "Formální a reálná hierarchie se shodují. Jednatel odpovídá na strategické i operativní otázky, podepisuje dokumenty, schvaluje faktury. Gap score: 0.",
      indicators: [
        "Gap score: 0 (formální = reálná hierarchie)",
        "Jednatel: 90 % rozhodovacích emailů, 100 % podpisů",
        "Risk score: 5/100 (minimální)",
        "Konzistentní 2+ roky",
      ],
      actions: [
        "Komunikovat přímo s jednatelem",
        "Jednoduchý schvalovací proces — 1 osoba rozhoduje",
        "Udržovat vztah s jednatelem jako primárním kontaktem",
      ],
    },
    badScenario: {
      title: "Jednatel podepíše ale nerozumí — riziko",
      description:
        "Jednatel podepisuje vše do 5 minut od odeslání — bez dotazů, bez studia. Všechny obsahové dotazy odpovídá účetní nebo manželka (není v OR). Gap score: 75. Jednatel je 'rubber stamp' — de facto rozhoduje někdo jiný.",
      indicators: [
        "Gap score: 75 (vysoký rozpor)",
        "Jednatel: podpis za < 5 min (0 dotazů)",
        "Reálný rozhodovatel: manželka (0 formální role)",
        "Risk score: 82/100 (podpis bez porozumění)",
      ],
      actions: [
        "Diskrétně ověřit: rozumí jednatel tomu, co podepisuje?",
        "Navrhnout konzultační schůzku PŘED podpisem",
        "Dokumentovat kdo dává instrukce (ochrana kanceláře)",
        "Zvážit formalizaci role manželky (prokura, plná moc)",
      ],
    },
    frequency: "Kvartálně (full analysis), průběžně (podpisový monitoring)",
    automationLevel: "60 % automatizováno",
    relatedAnalyses: ["18-01", "18-02", "18-04", "15-01"],
    businessImpact: "Vysoký — compliance a právní riziko",
    implementationStatus: "Produkce",
  },
  {
    id: "18-04",
    sectionId: 18,
    sectionTitle: "Organizační inteligence klienta",
    name: "Podpisové vzory",
    source: "reorganizace",
    good: "Stabilní podpisy",
    bad: "3 změny podpisu za rok — nestabilita",
    description:
      "Monitoring změn v podpisových vzorech klientské firmy — kdo podepisuje, jak se podpisy mění v čase, a co změny signalizují. Častá změna podpisového práva indikuje organizační nestabilitu (výměna vedení, konflikty, restrukturalizace).\n\nSystém extrahuje podpisové vzory z DocuWare (skenované dokumenty s OCR), digitálních podpisů (DocuSign/SignPoint) a OR zápisů. Změny jsou korelovány s událostmi v OR (změna jednatele, prokury).\n\nPro pendlerskou klientelu je zvláště důležité sledovat podpisové právo pro formuláře A1, ELSTER přiznání a bilaterální dokumenty.",
    methodology:
      "Signature pattern monitoring: 1) Extrakce podpisů z DocuWare (OCR + signature detection ML model), 2) Digitální podpisy — DocuSign/SignPoint audit trail (signer identity, certificate), 3) OR monitoring — ARES API + justice.cz sbírka listin (změny jednatele, prokury), 4) Change detection: nový podpisující, chybějící podpisující, neautorizovaný podpisující, 5) Timeline vizualizace podpisových změn.",
    dataInputs: [
      "DocuWare — skenované dokumenty s podpisy (OCR + signature region detection)",
      "DocuSign/SignPoint audit trail — digitální podpisy (signer, certificate, timestamp)",
      "ARES API — aktuální statutární orgán (GET /ares/v1/ekonomicke-subjekty/{ico})",
      "Justice.cz sbírka listin — zápisy změn v OR (notářské zápisy)",
      "CRM — autorizované podpisové vzory per klient (manuálně spravované)",
    ],
    outputMetrics: [
      "Počet změn podpisového práva per klient per rok",
      "Aktuální autorizovaní podpisující vs. OR",
      "Neautorizované podpisy (detekované, ale ne v OR)",
      "Stabilita score (0=chaotické, 100=stabilní)",
      "Korelace změn s OR událostmi",
    ],
    goodScenario: {
      title: "Stabilní podpisy",
      description:
        "Podpisový vzor stabilní 3+ roky. Jednatel a prokurista podepisují konzistentně. Vše odpovídá OR zápisu. Žádné neautorizované podpisy.",
      indicators: [
        "0 změn podpisového práva za 36M",
        "2 autorizovaní podpisující (jednatel + prokurista)",
        "100 % shoda s OR zápisem",
        "Stabilita score: 98/100",
      ],
      actions: [
        "Udržovat aktuální podpisové vzory v CRM",
        "Kvartální verifikace proti OR",
        "Pokračovat v monitoringu",
      ],
    },
    badScenario: {
      title: "3 změny podpisu za rok — nestabilita",
      description:
        "3 změny jednatele za 12 měsíců. Aktuální jednatel není v některých dokumentech uveden — podpisuje předchozí jednatel (neautorizovaný). Sbírka listin na justice.cz ukazuje sporné notářské zápisy.",
      indicators: [
        "3 změny jednatele za 12M",
        "2 neautorizované podpisy detekované",
        "OR zápis: poslední změna 15.3.2026",
        "Stabilita score: 12/100",
      ],
      actions: [
        "Ověřit aktuální stav v OR (stáhnout výpis)",
        "Odmítnout dokumenty s neautorizovaným podpisem",
        "Konzultovat právní oddělení — platnost podepsaných dokumentů",
        "Zvýšit monitoring — týdenní check OR pro tohoto klienta",
      ],
    },
    frequency: "Měsíčně (OR check), per dokument (podpisová verifikace)",
    automationLevel: "70 % automatizováno",
    relatedAnalyses: ["18-01", "18-03", "19-01", "13-06"],
    businessImpact: "Vysoký — právní validita dokumentů",
    implementationStatus: "Produkce",
  },
];
