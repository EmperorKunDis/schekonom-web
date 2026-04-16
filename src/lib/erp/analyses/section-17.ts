import type { AnalysisDetail } from "./types";

export const section17Analyses: AnalysisDetail[] = [
  {
    id: "17-01",
    sectionId: 17,
    sectionTitle: "Behaviorální mikrosignály",
    name: "Kdy otevírá maily",
    source: "email tracking",
    good: "Do 2h v pracovní době",
    bad: "Neotevírá — ignoruje komunikaci",
    description:
      "Tracking otevírání emailů měří engagement klienta s naší komunikací. Čas otevření, frekvence a zařízení poskytují cenné informace o prioritě, kterou nám klient přikládá.\n\nEmail otevřený do 2 hodin v pracovní době signalizuje, že jsme pro klienta priorita. Email neotevřený 48+ hodin signalizuje nezájem nebo přetížení. Trend je klíčový — zpomalení reakcí je pre-churn signál.\n\nData jsou anonymizována a slouží výhradně pro zlepšení služby klientovi.",
    methodology:
      "Pixel tracking + link tracking: 1) Zaznamenání open timestamp, 2) Detekce zařízení a lokace, 3) Agregace per klient, 4) Trend analýza, 5) Korelace s churn modelem.",
    dataInputs: [
      "Email tracking data (open/click)",
      "Metadata emailů (předmět, typ, urgence)",
      "Baseline per klient",
      "Kalendář (pracovní dny/svátky)",
    ],
    outputMetrics: [
      "Průměrný čas do otevření",
      "Open rate per typ emailu",
      "Trend (zrychluje/zpomaluje)",
      "Zařízení a čas otevření",
    ],
    goodScenario: {
      title: "Engagovaný klient",
      description:
        "Klient otevírá emaily průměrně do 2 hodin v pracovní době. Open rate 95 %. Aktivně kliká na přílohy a odpovídá do 24 hodin.",
      indicators: [
        "Průměr 2h do otevření",
        "Open rate 95 %",
        "Přílohy otevřeny do 4h",
        "Stabilní trend",
      ],
      actions: [
        "Udržovat kvalitu emailové komunikace",
        "Klient je vhodný pro digitální kanály",
        "Zvážit rozšíření reportingu emailem",
      ],
    },
    badScenario: {
      title: "Ignorovaná komunikace",
      description:
        "Klient přestal otevírat emaily. Open rate klesl z 90 % na 15 % za 2 měsíce. Poslední 3 emaily neotevřeny vůbec.",
      indicators: [
        "Open rate 15 % (z 90 %)",
        "3 neotevřené emaily v řadě",
        "0 kliků na přílohy za měsíc",
        "Trend dramaticky klesající",
      ],
      actions: [
        "Přepnout na telefonní kontakt",
        "Ověřit, zda emaily nejdou do spamu",
        "Osobní schůzka — klient se zjevně odpojuje",
        "Eskalovat do retention workflow",
      ],
    },
    frequency: "Per email (automaticky)",
    automationLevel: "98 % automatizováno",
    relatedAnalyses: ["17-02", "17-03", "7-04", "10-01"],
    businessImpact: "Střední — doplňkový signál pro churn prediction",
    implementationStatus: "Produkce",
  },
  {
    id: "17-02",
    sectionId: 17,
    sectionTitle: "Behaviorální mikrosignály",
    name: "Kolikrát přečte nabídku",
    source: "open counts",
    good: "3× přečteno + odpověď",
    bad: "0 otevření — spam filtr nebo nezájem",
    description:
      "Měření počtu otevření specifických emailů — zejména nabídek, cenových kalkulací a důležitých dokumentů. Vysoký počet otevření signalizuje zájem a rozhodovací proces, nulový počet signalizuje spam filtr nebo ignoraci.\n\nSystém využívá tracking pixel (1x1 transparentní obrázek) a UTM parametrizované linky v emailech odesílaných přes SendGrid/Mailgun. Každé otevření je zaznamenáno s timestampem, IP adresou a user-agentem.\n\nVícenásobné otevření nabídky (3+) často předchází akceptaci — klient se vrací a studuje detaily. Jednorázové otevření bez odpovědi signalizuje 'viděl, nezajímá'.",
    methodology:
      "Email engagement analytics: 1) SendGrid/Mailgun webhook events (open, click, bounce), 2) Agregace open count per email per klient, 3) Time-between-opens analýza (urgence), 4) Korelace open count × conversion (nabídka přijata/odmítnuta), 5) Classification: High interest (3+ opens), Moderate (1-2), None (0), Bounce (technical issue).",
    dataInputs: [
      "SendGrid Event Webhook — event_type: 'open', timestamp, useragent, ip",
      "Mailgun Events API — GET /v3/{domain}/events?event=opened",
      "Interní email log — subject, recipient, email_type (nabídka/report/info)",
      "CRM — nabídky a jejich status (pending/accepted/rejected)",
      "Anti-spam check — SPF, DKIM, DMARC records per klientská doména",
    ],
    outputMetrics: [
      "Open count per email per klient",
      "Time-to-first-open (hodiny od odeslání)",
      "Re-open pattern (kolikrát se vrátil)",
      "Korelace opens → conversion (per email type)",
      "Bounce/spam rate per klientská doména",
    ],
    goodScenario: {
      title: "3× přečteno + odpověď",
      description:
        "Nabídka na rozšíření služeb otevřena 3× v průběhu 2 dní: 1× ihned (mobil, 15:22), 1× další den (desktop, 9:30), 1× před odpovědí (desktop, 14:15). Klient odpověděl: 'Pojďme to probrat.'",
      indicators: [
        "3 opens (mobil → desktop → desktop before reply)",
        "Time-to-first-open: 2h",
        "2-day decision cycle (matches 15-01 profil)",
        "Response: pozitivní, žádá schůzku",
      ],
      actions: [
        "Naplánovat schůzku do 48h — klient je v rozhodovací fázi",
        "Připravit detailní kalkulaci — klient studoval detaily",
        "Nezasílat reminder — klient je engagovaný",
      ],
    },
    badScenario: {
      title: "0 otevření — spam filtr nebo nezájem",
      description:
        "Poslední 4 nabídkové emaily mají 0 opens. Technická kontrola: SPF/DKIM OK, doména není na blacklistu. Závěr: klient buď ignoruje, nebo má agresivní firemní spam filtr.",
      indicators: [
        "0 opens na posledních 4 emailech",
        "SPF/DKIM/DMARC: PASS (ne technický problém)",
        "Historický open rate: 85 % → 0 % (dramatický propad)",
        "Žádná odpověď na 2 follow-up emaily",
      ],
      actions: [
        "Přepnout kanál — telefon (Daktela) nebo poštovní zásilka",
        "Ověřit u klienta, zda emaily dostává",
        "Zkontrolovat, zda klientská IT nezavedla nový spam filtr",
        "Eskalovat na retention — 0 engagement = pre-churn signál",
      ],
    },
    frequency: "Per email (real-time webhook)",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["17-01", "17-03", "17-04", "22-03"],
    businessImpact: "Střední — optimalizace obchodního procesu",
    implementationStatus: "Produkce",
  },
  {
    id: "17-03",
    sectionId: 17,
    sectionTitle: "Behaviorální mikrosignály",
    name: "Otevírá přílohy",
    source: "engagement",
    good: "Reporty otevřeny do 24h",
    bad: "0% otevřených příloh za kvartál",
    description:
      "Tracking otevírání příloh — reportů, analýz, dokumentů — měří, zda klient skutečně konzumuje obsah, který mu posíláme. Příloha otevřená a prostudovaná = klient vnímá hodnotu. Příloha ignorovaná = buď špatný formát, špatný timing, nebo klient nevidí hodnotu.\n\nSystém měří engagement s přílohami dvěma způsoby: 1) Link tracking — přílohy jsou sdíleny jako trackované linky (ne inline attachments), 2) Portálové logy — dokumenty nahrané na klientský portál mají view tracking.\n\nKlíčový insight: pokud klient neotevírá měsíční reporty 3+ měsíce, reporty nemají pro něj hodnotu — je třeba změnit formát, obsah nebo frekvenci.",
    methodology:
      "Attachment engagement scoring: 1) Link click tracking z SendGrid/Mailgun (click events), 2) Portálové view logy (klientský portál — session tracking), 3) Download tracking (pokud PDF), 4) Time-on-page proxy (link → next action timestamp), 5) Engagement score per dokument type: % opened, avg time-to-open, trend.",
    dataInputs: [
      "SendGrid/Mailgun click events — URL kliknuté v emailu (přílohy jako linky)",
      "Klientský portál — view/download logy (user_id, document_id, timestamp)",
      "Dokument metadata — typ (report, analýza, faktura, smlouva), stáří, autor",
      "Historical engagement per klient per document type",
      "Email delivery confirmation — vyloučení bounce/spam",
    ],
    outputMetrics: [
      "Attachment open rate per klient per document type",
      "Time-to-first-open per document type",
      "Trend engagement (3M/6M/12M)",
      "Most/least engaged document types",
      "Engagement score (composite: 0–100)",
    ],
    goodScenario: {
      title: "Reporty otevřeny do 24h",
      description:
        "Klient otevírá měsíční reporty průměrně do 6h od odeslání. Kvartální analýzy do 24h. Dokonce si stahuje PDF verze — pravděpodobně je tiskne nebo sdílí s management teamem.",
      indicators: [
        "Attachment open rate: 95 %",
        "Time-to-first-open: 6h (reporty), 24h (analýzy)",
        "PDF download: 80 % dokumentů",
        "Trend: stabilní 12M",
      ],
      actions: [
        "Udržovat kvalitu reportů — klient je čte",
        "Zvážit rozšíření obsahu (detailnější analýzy)",
        "Nabídnout interaktivní dashboard místo PDF",
        "Klient je vhodný pro premium reporting službu",
      ],
    },
    badScenario: {
      title: "0 % otevřených příloh za kvartál",
      description:
        "Za poslední 3 měsíce klient neotevřel jedinou přílohu (12 reportů, 3 analýzy, 2 nabídky). Historicky otevíral 70 %. Dramatický propad engagement — buď nevidí hodnotu, nebo se odpojuje.",
      indicators: [
        "0 % open rate za 3M (historicky 70 %)",
        "17 neotevřených dokumentů",
        "Email open rate: 40 % (čte emaily, ne přílohy)",
        "Žádný portálový login za 3M",
      ],
      actions: [
        "Osobní schůzka — zeptat se, co by klient chtěl dostávat",
        "Redukovat objem — posílat méně, ale relevantnější",
        "Změnit formát — zkusit video summary místo PDF",
        "Eskalovat — 0 engagement = strong pre-churn signál",
      ],
    },
    frequency: "Per dokument (real-time), měsíční agregace",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["17-01", "17-02", "23-40", "10-01"],
    businessImpact: "Střední — validace hodnoty služeb pro klienta",
    implementationStatus: "Produkce",
  },
  {
    id: "17-04",
    sectionId: 17,
    sectionTitle: "Behaviorální mikrosignály",
    name: "Zařízení a čas",
    source: "user-agent",
    good: "Desktop v kanceláři",
    bad: "iPhone 23:00 — rozhoduje pod stresem",
    description:
      "Analýza zařízení a času otevírání emailů a přístupu na portál. User-agent string identifikuje zařízení (desktop/mobil/tablet), operační systém a prohlížeč. V kombinaci s časem otevření vytváří profil pracovních návyků klienta.\n\nKlient, který čte emaily na desktopu v kanceláři (9–17h), je v klidném rozhodovacím režimu. Klient na iPhonu ve 23:00 rozhoduje pod stresem nebo ze špatného svědomí. Klient, který čte vše na mobilu, potřebuje mobile-first komunikaci.\n\nSystém parsuje user-agent stringy z SendGrid/Mailgun open events a webového portálu a vytváří profil device×time per klient.",
    methodology:
      "User-agent + temporal analysis: 1) Parsování UA string (ua-parser-js): device type, OS, browser, 2) Temporal binning: working hours (9-17 CZ, 8-16 DE), evening (17-22), night (22-6), weekend, 3) Heatmap device × time per klient, 4) Anomaly detection: změna vzorce (z desktop na mobil, z denního na noční), 5) Profilování: Office worker / Mobile decision-maker / Night owl / Weekend warrior.",
    dataInputs: [
      "SendGrid/Mailgun open events — user-agent header, timestamp, IP (geoloc)",
      "Klientský portál — session logs (user-agent, login time, duration)",
      "IP geolocation — GeoIP2 database (MaxMind) pro lokaci",
      "Klientský timezone (CZ/DE) z CRM profilu",
      "Historické vzorce (baseline per klient)",
    ],
    outputMetrics: [
      "Device split: desktop % / mobile % / tablet %",
      "Time split: office hours % / evening % / night % / weekend %",
      "Profil: Office worker / Mobile / Night owl / Weekend warrior",
      "Anomálie: změna vzorce (shift detection)",
      "Optimal send time per klient (max engagement window)",
    ],
    goodScenario: {
      title: "Desktop v kanceláři",
      description:
        "Klient 90 % komunikace řeší na desktopu v pracovní době (9–17h). Stabilní vzorec 2+ roky. Rozhodnutí dělá v kancelářském prostředí — klidně, s přístupem k dokumentům.",
      indicators: [
        "Desktop: 90 %, Mobile: 8 %, Tablet: 2 %",
        "Office hours: 85 %, Evening: 10 %, Night: 3 %, Weekend: 2 %",
        "Profil: Office worker (stable 2+ let)",
        "0 anomálií za 12M",
      ],
      actions: [
        "Posílat emaily v 9:00–10:00 (optimal window)",
        "Formát: desktop-optimized (tabulky, grafy, přílohy)",
        "Plánovat hovory v office hours",
        "Klient nepotřebuje mobilní app/portal",
      ],
    },
    badScenario: {
      title: "iPhone 23:00 — rozhoduje pod stresem",
      description:
        "Klient posledních 6 týdnů čte emaily výhradně na iPhonu po 22:00. Dříve: desktop, office hours. Shift detekován automaticky. Možné příčiny: osobní krize, workoholismus, vyhazov z kanceláře.",
      indicators: [
        "Shift: Desktop 90% → iPhone 95% za 6 týdnů",
        "Shift: Office hours 85% → Night 75%",
        "Anomaly score: 4.2 (alarm > 3.0)",
        "Odpovídá v 23:30 — stresová rozhodnutí",
      ],
      actions: [
        "Neodesílat důležité nabídky večer — klient je pod stresem",
        "Proaktivně se zeptat: 'Je vše v pořádku?'",
        "Nabídnout schůzku v kanceláři (vrátit do klidného prostředí)",
        "Monitorovat — pokud pokračuje, eskalovat na well-being check",
      ],
    },
    frequency: "Per interakce (real-time), týdenní profil update",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["17-01", "17-02", "22-03", "23-54"],
    businessImpact:
      "Nízký–Střední — optimalizace komunikačního kanálu a timingu",
    implementationStatus: "Produkce",
  },
  {
    id: "17-05",
    sectionId: 17,
    sectionTitle: "Behaviorální mikrosignály",
    name: "Kdo zpracovává maily",
    source: "podpisy + styl",
    good: "Jednatel osobně",
    bad: "Asistentka — jednatel se nezajímá",
    description:
      "Detekce, kdo skutečně zpracovává komunikaci na straně klienta — jednatel osobně, asistentka, účetní, nebo AI tool. Systém analyzuje email podpisy, stylometrii (délka vět, slovní zásoba, formálnost) a metadata (From vs. Reply-To, X-Mailer header).\n\nPokud jednatel delegoval komunikaci na asistentku, naše zprávy se k němu nemusí dostat v plném rozsahu. Strategická komunikace musí být adresována přímo jednateli.\n\nSystém detekuje i změnu — pokud jednatel přestal odpovídat osobně a odpovídá za něj někdo jiný, je to signál změny priorit.",
    methodology:
      "Authorship analysis: 1) Email signature parsing (regexp: /pozdravem|regards|sent from/i), 2) Stylometry: sentence length distribution, vocabulary richness (TTR), formality score, 3) Metadata: From header vs. Reply-To header discrepancy, X-Mailer/User-Agent, 4) Clustering emailů per autor (unsupervised), 5) Change detection — shift v autorství.",
    dataInputs: [
      "Email headers — From, Reply-To, X-Mailer, X-Originating-IP",
      "Email body — podpis, styl textu, oslovení",
      "CRM kontaktní databáze — kdo je jednatel, asistentka, účetní",
      "Historické emaily per kontakt — baseline stylometrie",
      "Daktela hovory — kdo volá vs. kdo píše",
    ],
    outputMetrics: [
      "Detekovaný autor per email (confidence score)",
      "% komunikace jednatele vs. delegované",
      "Autorský profil change detection (shift?)",
      "Delegace trend (roste/klesá)",
      "Komunikační dosah (dostane jednatel naše zprávy?)",
    ],
    goodScenario: {
      title: "Jednatel osobně",
      description:
        "95 % emailů odpovídá stylometricky jednateli. Podpisy konzistentní, styl formální ale osobní. Jednatel čte a odpovídá osobně — naše komunikace má přímý dopad na rozhodování.",
      indicators: [
        "95 % emailů: autorství jednatel (confidence > 0.9)",
        "Stylometrie: konzistentní 18M",
        "From = Reply-To (žádné delegování)",
        "Odpovídá na strategické i operativní emaily",
      ],
      actions: [
        "Komunikovat přímo s jednatelem — funguje",
        "Přizpůsobit obsah: jednatel chce stručně a k věci",
        "Využít přímý přístup pro strategické nabídky",
      ],
    },
    badScenario: {
      title: "Asistentka — jednatel se nezajímá",
      description:
        "Posledních 4 měsíce odpovídá jiný autor — kratší věty, jiná slovní zásoba, podpis 'S pozdravem, Jana (za p. Nováka)'. Jednatel delegoval veškerou komunikaci. Naše strategické nabídky se k němu pravděpodobně nedostávají.",
      indicators: [
        "Shift autorství: jednatel 95% → 15% za 4M",
        "Nový autor: 'Jana' (asistentka, confidence 0.88)",
        "Strategické emaily odpovězeny genericky",
        "Jednatel neodpověděl na přímý email 2×",
      ],
      actions: [
        "Kontaktovat jednatele přímo — telefon, ne email",
        "Osobní schůzka — 'chtěli bychom probrat strategii s vámi'",
        "Přizpůsobit komunikaci pro asistentku (operativa) + jednatele (strategie)",
        "Zvážit: delegování = klient ztrácí zájem?",
      ],
    },
    frequency: "Per email (real-time analysis), měsíční profil update",
    automationLevel: "75 % automatizováno",
    relatedAnalyses: ["17-01", "17-04", "18-01", "18-03"],
    businessImpact: "Střední — zajištění efektivní komunikace s rozhodovately",
    implementationStatus: "Produkce",
  },
];
