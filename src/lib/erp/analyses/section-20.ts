import type { AnalysisDetail } from "./types";

export const section20Analyses: AnalysisDetail[] = [
  {
    id: "20-01",
    sectionId: 20,
    sectionTitle: "Certifikační autorita a IT",
    name: "Životní cyklus certifikátů",
    source: "IT logy",
    good: "Vše platné, 0 expirace do 90 dní",
    bad: "3 certifikáty expirují za 14 dní",
    description:
      "Centrální správa a monitoring všech digitálních certifikátů — kvalifikovaných elektronických podpisů, SSL/TLS certifikátů, ELSTER certifikátů a dalších. Systém sleduje platnost, automaticky upozorňuje na blížící se expirace a spouští obnovovací workflow.\n\nExpirovaný certifikát může paralyzovat podání daňových přiznání, elektronickou komunikaci s úřady nebo způsobit výpadek webových služeb. Prevence je mnohonásobně levnější než řešení následků.\n\nSystém udržuje kompletní inventář certifikátů per klient a per interní systém s jasným vlastníkem a procesem obnovy.",
    methodology:
      "Lifecycle management: 1) Inventarizace všech certifikátů, 2) Denní kontrola platnosti, 3) Alerting: 90 dní (info), 30 dní (warning), 14 dní (critical), 4) Automatický trigger obnovovacího workflow, 5) Verifikace po obnově.",
    dataInputs: [
      "Inventář certifikátů (databáze)",
      "CT log monitoring (SSL/TLS)",
      "ELSTER certifikáty (soubory)",
      "Kvalifikované podpisy (USB tokeny / cloud)",
      "Kontaktní údaje vlastníků",
    ],
    outputMetrics: [
      "Počet aktivních certifikátů",
      "Expirující do 90/30/14 dní",
      "Expirované (kritické)",
      "Úspěšnost včasné obnovy (%)",
      "Průměrná doba obnovy",
    ],
    goodScenario: {
      title: "Vše pod kontrolou",
      description:
        "Všechny certifikáty jsou platné a žádný neexpiruje v následujících 90 dnech. Obnovovací workflow byl spuštěn pro 2 certifikáty s expirací za 120 dní.",
      indicators: [
        "0 expirace do 90 dní",
        "100 % pokrytí inventářem",
        "Proaktivní obnova 120 dní předem",
        "0 výpadků za rok",
      ],
      actions: [
        "Pokračovat v monitoringu",
        "Aktualizovat inventář při nových klientech",
      ],
    },
    badScenario: {
      title: "Kritické expirace",
      description:
        "3 certifikáty expirují za 14 dní — 2 ELSTER certifikáty pro pendlery a 1 kvalifikovaný podpis pro DIS+. Bez obnovy nebude možné podat přiznání.",
      indicators: [
        "3 certifikáty expirují za 14 dní",
        "2 ELSTER + 1 kvalifikovaný podpis",
        "Blokuje podání 8 přiznání",
        "Kontaktní osoby nereagují",
      ],
      actions: [
        "Eskalovat na nejvyšší prioritu",
        "Kontaktovat klienty telefonicky",
        "Připravit záložní postup (plná moc)",
        "Objednat obnovu certifikátů okamžitě",
      ],
    },
    frequency: "Denně",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["20-02", "20-04", "20-05", "20-06"],
    businessImpact: "Kritický — výpadek certifikátu blokuje klíčové služby",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "20-02",
    sectionId: 20,
    sectionTitle: "Certifikační autorita a IT",
    name: "Klientská mapa certifikátů",
    source: "databáze",
    good: "100% pokrytí",
    bad: "40% klientů bez kvalifikovaného certifikátu",
    description:
      "Kompletní inventář digitálních certifikátů per klient — kvalifikované elektronické podpisy (I.CA, PostSignum), ELSTER certifikáty pro DE podání, SSL certifikáty webů a elektronické pečetě. Mapa identifikuje klienty bez potřebných certifikátů.\n\nKlienti bez kvalifikovaného certifikátu nemohou podávat elektronicky přes MOJE daně, datové schránky vyžadující podpis, nebo ELSTER (DE). Kancelář musí buď zastoupit (plná moc) nebo certifikát zajistit.\n\nSystém udržuje inventář v databázi s vazbou na klienta, typ certifikátu, vydavatele, platnost a účel použití.",
    methodology:
      "Certificate inventory management: 1) Inventarizace všech certifikátů z I.CA management API a PostSignum admin, 2) ELSTER certifikáty z lokální databáze (PKCS#12 files), 3) Mapping certifikát → klient → účel, 4) Gap analysis: klient potřebuje (dle služeb) vs. má, 5) Coverage metric per portfolio/segment.",
    dataInputs: [
      "I.CA management API — seznam vydaných certifikátů per IČO/RČ",
      "PostSignum admin — certifikáty vydané přes Českou poštu",
      "ELSTER lokální databáze — .pfx soubory per klient per rok",
      "CRM — služby per klient (které vyžadují certifikát)",
      "Datové schránky — ISDS seznam aktivních schránek per klient",
    ],
    outputMetrics: [
      "Celkový počet certifikátů v inventáři",
      "Coverage: % klientů s potřebnými certifikáty",
      "Gap count: klienti bez potřebného certifikátu",
      "Typ certifikátu distribuce (kvalifikovaný/komerční/ELSTER)",
      "Expiring within 90D (cross-reference s 20-01)",
    ],
    goodScenario: {
      title: "100 % pokrytí",
      description:
        "Všichni klienti mají certifikáty odpovídající jejich potřebám. 100 % pendlerů má ELSTER certifikát. 100 % s.r.o./a.s. má kvalifikovaný podpis pro MOJE daně. Inventář kompletní a aktuální.",
      indicators: [
        "Coverage: 100 %",
        "0 certifikačních gaps",
        "Inventář: 100 % kompletní",
        "Expiring 90D: řešeno (20-01)",
      ],
      actions: [
        "Udržovat inventář při onboardingu nových klientů",
        "Kvartální audit coverage vs. služby",
        "Dokumentovat certifikační mapu pro ISO/audit",
      ],
    },
    badScenario: {
      title: "40 % klientů bez kvalifikovaného certifikátu",
      description:
        "Z 200 klientů 80 nemá kvalifikovaný elektronický podpis — podáváme za ně na plnou moc. 15 pendlerů nemá ELSTER certifikát — DPFO DE podání blokováno. Riziko: plné moci mohou být zpochybněny.",
      indicators: [
        "Coverage: 60 % (gap: 80 klientů bez certifikátu)",
        "15 pendlerů bez ELSTER (DE podání blokováno)",
        "65 klientů na plné moci (riziková závislost)",
        "Certifikační gap roste (nový klienti bez certifikátu)",
      ],
      actions: [
        "Spustit kampaň: asistovaná registrace certifikátů",
        "Priorita: 15 pendlerů bez ELSTER (deadline DE přiznání)",
        "Nabídnout I.CA certifikát jako součást služby (bundle)",
        "Cíl: coverage > 90 % do 6 měsíců",
      ],
    },
    frequency: "Měsíčně (inventář audit)",
    automationLevel: "75 % automatizováno",
    relatedAnalyses: ["20-01", "20-04", "20-06", "5-01"],
    businessImpact: "Vysoký — certifikáty blokují podání",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "20-03",
    sectionId: 20,
    sectionTitle: "Certifikační autorita a IT",
    name: "SSL/TLS monitoring",
    source: "automatický scan",
    good: "Vše A+ rating",
    bad: "2 weby s expirovaným SSL",
    description:
      "Automatický monitoring SSL/TLS certifikátů na webech a službách klientů i kanceláře. Systém denně kontroluje platnost, konfiguraci a bezpečnostní rating pomocí crt.sh API (Certificate Transparency logs) a vlastního SSL scanneru.\n\nExpirovaný SSL certifikát způsobuje browser warning, ztrátu důvěry zákazníků a potenciální GDPR problém (nešifrovaná komunikace). Proaktivní monitoring předchází těmto situacím.\n\nSystém také detekuje weak ciphers, outdated TLS verze (< 1.2) a misconfigurations.",
    methodology:
      "SSL/TLS monitoring: 1) crt.sh API — GET https://crt.sh/?q={domain}&output=json — monitoring Certificate Transparency logů, 2) OpenSSL check — ssl_scan per doména (certificate chain, expiry, ciphers), 3) Rating: A+ (perfect), A, B, C, F (failure), 4) Alert: expiry < 30D (warning), < 14D (critical), expired (emergency), 5) Configuration check: TLS version, cipher suite, HSTS header.",
    dataInputs: [
      "crt.sh API — https://crt.sh/?q={domain}&output=json — CT log monitoring",
      "SSL scan — openssl s_client -connect {domain}:443 (certificate details)",
      "Klientské domény z CRM (webové stránky, e-shop, portál)",
      "Interní domény kanceláře (portál, email, API)",
      "Qualys SSL Labs API — SSL Server Test (rating, pokud dostupné)",
    ],
    outputMetrics: [
      "Počet monitorovaných domén",
      "SSL rating distribuce (A+/A/B/C/F)",
      "Expiring < 30D / < 14D / expired",
      "TLS version distribuce (1.2/1.3)",
      "Weak cipher count",
    ],
    goodScenario: {
      title: "Vše A+ rating",
      description:
        "Všech 35 monitorovaných domén má SSL rating A+. TLS 1.3 na 90 %, TLS 1.2 na 10 %. Žádný certifikát neexpiruje do 90 dní. HSTS nasazen na 100 % domén.",
      indicators: [
        "35/35 domén: A+ rating",
        "0 expiring < 90D",
        "TLS 1.3: 90 %, TLS 1.2: 10 %",
        "HSTS: 100 %",
      ],
      actions: [
        "Pokračovat v denním monitoringu",
        "Upgrade zbývajících 10 % na TLS 1.3",
        "Kvartální security report pro management",
      ],
    },
    badScenario: {
      title: "2 weby s expirovaným SSL",
      description:
        "2 klientské weby (e-shop a portál) mají expirovaný SSL certifikát — prohlížeč zobrazuje 'Připojení není zabezpečené'. Klienti ztrácí zákazníky. Certifikáty vypršely před 5 dny — systém detekoval, ale klient nereagoval.",
      indicators: [
        "2 domény: SSL expired (5 dní)",
        "Browser warning aktivní — ztráta zákazníků",
        "Klient nereagoval na 3 automatické upomínky",
        "GDPR risk: nešifrovaná komunikace na e-shopu",
      ],
      actions: [
        "Okamžitě kontaktovat klienta telefonicky",
        "Nabídnout asistenci s obnovou (Let's Encrypt: automatizace)",
        "Doporučit automatický renewal (certbot, ACME)",
        "Pro e-shop: upozornit na GDPR riziko nešifrovaných dat",
      ],
    },
    frequency: "Denně (SSL check), okamžitý alert při expiraci",
    automationLevel: "95 % automatizováno",
    relatedAnalyses: ["20-01", "20-02", "20-04", "20-05"],
    businessImpact: "Střední — bezpečnost a důvěra klientských webů",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "20-04",
    sectionId: 20,
    sectionTitle: "Certifikační autorita a IT",
    name: "Predikce obnovy",
    source: "automatické upomínky",
    good: "Obnova 30 dní předem",
    bad: "Obnova po expiraci — výpadek služby",
    description:
      "Prediktivní systém pro obnovu certifikátů na základě historických dat o obnově per klient. Systém se učí, jak rychle klient reaguje na upomínky a přizpůsobuje timing první upomínky tak, aby obnova proběhla před expirací.\n\nNěkteří klienti obnovují den po upomínce (early adopters), jiní potřebují 5 upomínek a osobní telefonát (procrastinators). Systém personalizuje komunikační strategii per klient.\n\nAutomatizovaný workflow: upomínka → reminder → eskalace → telefonát → manuální obnova. Každý step má konfigurovaný timing dle klientského profilu.",
    methodology:
      "Renewal prediction model: 1) Historická data obnov per klient (upomínka timestamp → obnova timestamp), 2) Feature engineering: průměrná doba reakce, počet upomínek potřebných, kanál preference, 3) Regression model: predicted_renewal_date = expiry − f(client_profile), 4) Upomínkový workflow: start_date = predicted_renewal_date − safety_margin, 5) Adaptive learning — model se updatuje s každou obnovou.",
    dataInputs: [
      "Certifikátní databáze — expiry dates per certifikát per klient",
      "Upomínkový log — datum odeslání, kanál (email/SMS/telefon), reakce",
      "Historická obnovy — datum obnovy vs. datum upomínky per klient",
      "Klientský profil — reaktivita (z 15-01, 17-01)",
      "Certifikát metadata — typ, vydavatel, náročnost obnovy (online/návštěva)",
    ],
    outputMetrics: [
      "Predicted renewal date per certifikát",
      "Optimal first reminder date",
      "Počet upomínek potřebných (predicted)",
      "On-time renewal rate (%)",
      "Post-expiry renewal count (failures)",
    ],
    goodScenario: {
      title: "Obnova 30 dní předem",
      description:
        "Model správně predikoval, že klient potřebuje 2 upomínky a 10 dní na obnovu. První upomínka odeslána 45 dní předem. Klient obnovil 30 dní před expirací. On-time rate: 98 % portfolia.",
      indicators: [
        "Obnova: 30 dní před expirací",
        "2 upomínky (as predicted)",
        "On-time renewal rate: 98 %",
        "Model accuracy: MAE 4 dny",
      ],
      actions: [
        "Pokračovat s prediktivním workflow",
        "Fine-tune model s novými daty",
        "Zvážit automatickou obnovu pro jednoduché certifikáty",
      ],
    },
    badScenario: {
      title: "Obnova po expiraci — výpadek služby",
      description:
        "ELSTER certifikát expiroval před 3 dny — 5 upomínek ignorováno, telefon nezvednut. Pendlerovo DE daňové přiznání nemůže být podáno. Model selhání: klient změnil telefon a email nečte (17-01 drop detected).",
      indicators: [
        "Expirace: 3 dny po (5 upomínek ignorováno)",
        "0 odpovědí na emaily a hovory",
        "ELSTER podání blokováno",
        "Deadline DE přiznání: za 11 dní",
      ],
      actions: [
        "Osobní návštěva / doporučený dopis — urgentní kontakt",
        "Připravit emergency obnovu (asistovaná návštěva Czech POINT)",
        "Alternativa: podání přes plnou moc (pokud máme)",
        "Post-mortem: proč model selhal → update contact verification",
      ],
    },
    frequency: "Denně (model update), per certifikát (workflow trigger)",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["20-01", "20-02", "20-06", "17-01"],
    businessImpact: "Vysoký — prevence výpadků služby",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "20-05",
    sectionId: 20,
    sectionTitle: "Certifikační autorita a IT",
    name: "Detekce zneužití",
    source: "anomálie podepisování",
    good: "Standardní vzory",
    bad: "Certifikát použit v 3:00 ráno z neznámé IP",
    description:
      "Monitoring vzorů používání digitálních certifikátů pro detekci zneužití nebo kompromitace. Systém analyzuje čas, IP adresu, frekvenci a typ podepisovaných dokumentů a detekuje anomálie oproti normálnímu profilu klienta.\n\nZneužití certifikátu může znamenat: krádež identity, neautorizované podání daňového přiznání, falšování podpisu. Včasná detekce umožňuje revokaci certifikátu a minimalizaci škod.\n\nSystém buduje behaviorální profil per certifikát — typické časy použití, IP rozsahy, typy operací — a detekuje odchylky.",
    methodology:
      "Certificate usage anomaly detection: 1) Logging všech podpisových operací (timestamp, IP, document_type, certificate_id), 2) Profiling per certifikát: typical_hours, typical_IPs, typical_operations, frequency, 3) Anomaly scoring: Isolation Forest na feature vektoru [hour, IP_distance, operation_type, frequency_delta], 4) Alert při anomaly score > threshold (0.8), 5) OCSP responder check — certifikát nebyl revokován externně?",
    dataInputs: [
      "Podpisový log — timestamp, IP, certificate_id, document_type, result",
      "OCSP responder — http://ocsp.ica.cz — real-time revocation check",
      "CRL listy — I.CA, PostSignum — Certificate Revocation Lists",
      "IP geolocation — MaxMind GeoIP2 (lokace podpisu)",
      "Historický profil per certifikát (baseline 90D)",
    ],
    outputMetrics: [
      "Anomaly score per podpisová operace (0–1)",
      "Detekované anomálie per den/týden",
      "Typový breakdown anomálií (time/IP/frequency/operation)",
      "False positive rate (manuálně ověřené)",
      "Revokační alert (OCSP/CRL change)",
    ],
    goodScenario: {
      title: "Standardní vzory",
      description:
        "Všechna použití certifikátů odpovídají normálnímu profilu. Podpisy: Po–Pá 8–17h, z kancelářských IP rozsahů, standardní dokumenty. Anomaly score < 0.3 u 100 % operací.",
      indicators: [
        "0 anomálií za měsíc (threshold 0.8)",
        "Max anomaly score: 0.25",
        "100 % operací v office hours a known IPs",
        "OCSP/CRL: 0 revokací",
      ],
      actions: [
        "Pokračovat v monitoringu",
        "Updatovat baseline profily kvartálně",
        "Testovat false positive threshold",
      ],
    },
    badScenario: {
      title: "Certifikát použit v 3:00 ráno z neznámé IP",
      description:
        "Kvalifikovaný podpis klienta (I.CA, certifikát ID 45678) použit ve 3:00 z IP adresy v Rumunsku (mimo klientský rozsah) k podpisu neznámého dokumentu. Anomaly score: 0.97. Historicky: klient používá certifikát Po–Pá 9–16h z CZ IP.",
      indicators: [
        "Anomaly score: 0.97 (alarm > 0.8)",
        "Čas: 3:00 (profil: 9–16h)",
        "IP: Rumunsko (profil: CZ, 10.0.1.x rozsah)",
        "Dokument: neznámý typ (profil: DPH přiznání, faktury)",
      ],
      actions: [
        "Okamžitě kontaktovat klienta — ověřit operaci",
        "Pokud neautorizováno: revokovat certifikát (I.CA API)",
        "Incident response: zjistit rozsah kompromitace",
        "Ověřit všechny dokumenty podepsané tímto certifikátem za 7D",
      ],
    },
    frequency: "Real-time (per podpisová operace)",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["20-01", "20-03", "18-04", "23-15"],
    businessImpact: "Kritický — ochrana před zneužitím identity",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "20-06",
    sectionId: 20,
    sectionTitle: "Certifikační autorita a IT",
    name: "Klient mimo kontakt",
    source: "cross-reference",
    good: "Komunikace aktivní",
    bad: "Certifikát za 7 dní, klient neodpovídá 3 týdny",
    description:
      "Cross-reference analýza: certifikáty blížící se k expiraci × komunikační status klienta. Nejkritičtější situace: certifikát expiruje za dny, ale klient neodpovídá na žádný kontaktní pokus. Systém kombinuje data z 20-01 (expirace) a 17-01 (engagement).\n\nTento scénář vyžaduje eskalační workflow mimo standardní kanály — osobní návštěva, kontaktování jiných osob v firmě, doporučený dopis. V extrémním případě: podání přes plnou moc (pokud existuje).\n\nSystém automaticky detekuje tuto kombinaci a spouští emergency workflow.",
    methodology:
      "Cross-reference alert: 1) Join: certifikáty s expiry < 30D (z 20-01) × klienti s 0 komunikací > 14D (z 17-01), 2) Priority scoring: urgency = 1 / (days_to_expiry) × impact_weight, 3) Eskalační workflow: email → SMS → telefon → náhradní kontakt → osobní návštěva → plná moc fallback, 4) Tracking resolution per klient, 5) Post-mortem analýza příčin nedostupnosti.",
    dataInputs: [
      "Certifikátní databáze — expiry < 30D (z analýzy 20-01)",
      "Komunikační log — poslední kontakt per klient (email/telefon/portál)",
      "CRM — náhradní kontaktní osoby (účetní, spolumajitel, asistentka)",
      "Plné moci — existující platné plné moci per klient",
      "Eskalační historie — předchozí pokusy o kontakt a jejich výsledek",
    ],
    outputMetrics: [
      "Počet klientů v 'mimo kontakt + expiring' stavu",
      "Urgency score per klient",
      "Eskalační level per klient (1–5)",
      "Resolution rate (% vyřešených před expirací)",
      "Fallback actions executed (plná moc, náhradní kontakt)",
    ],
    goodScenario: {
      title: "Komunikace aktivní",
      description:
        "Žádný klient s blížící se expirací není mimo kontakt. Všechny upomínky byly potvrzeny. Obnovy probíhají dle plánu.",
      indicators: [
        "0 klientů v 'mimo kontakt + expiring' stavu",
        "100 % upomínek potvrzeno",
        "Resolution rate: 100 %",
        "0 emergency eskalací za kvartál",
      ],
      actions: [
        "Pokračovat v proaktivní komunikaci",
        "Aktualizovat náhradní kontakty per klient",
        "Ověřovat platnost plných mocí jednou ročně",
      ],
    },
    badScenario: {
      title: "Certifikát za 7 dní, klient neodpovídá 3 týdny",
      description:
        "ELSTER certifikát pendlera expiruje za 7 dní. Klient neodpověděl na 4 emaily, 3 telefonáty a 1 SMS za 3 týdny. Deadline DE přiznání za 14 dní. Bez certifikátu: penále Finanzamt.",
      indicators: [
        "Certifikát: expiry za 7 dní (ELSTER)",
        "Kontaktní pokusy: 8 (0 odpovědí za 21 dní)",
        "DE deadline: 14 dní",
        "Penále risk: 0.25 % per měsíc z daně",
      ],
      actions: [
        "Eskalace level 5: osobní návštěva (pokud adresa známá)",
        "Kontaktovat náhradní osobu (manželka, spolumajitel)",
        "Zkontrolovat: je klient v pořádku? (ISIR, media, nehoda?)",
        "Připravit fallback: podání přes plnou moc (pokud platná)",
      ],
    },
    frequency: "Denně (cross-reference check)",
    automationLevel: "80 % automatizováno",
    relatedAnalyses: ["20-01", "20-04", "17-01", "23-42"],
    businessImpact: "Kritický — poslední záchrana před výpadkem",
    implementationStatus: "Produkce",
    scope: "client",
  },
];
