import type { AnalysisDetail } from "./types";

export const section13Analyses: AnalysisDetail[] = [
  {
    id: "13-01",
    sectionId: 13,
    sectionTitle: "Časová dimenze",
    name: "Change point detection",
    source: "history",
    good: "Stabilní trajektorie",
    bad: "Zlom 15.1.2026 — po změně jednatele",
    description:
      "Bayesovská metoda detekce bodů zlomu v časových řadách klientských dat. Systém automaticky identifikuje momenty, kdy se chování klienta statisticky významně změnilo — a koreluje tyto body s konkrétními událostmi.\n\nAnalýza pokrývá všechny měřitelné dimenze: sentiment, platební morálku, frekvenci komunikace, využití služeb, obrat. Každý change point je ohodnocen silou (effect size) a přiřazena pravděpodobná příčina.\n\nTato analýza je fundamentem pro pochopení kauzality — neprovádíme jen korelace, ale aktivně hledáme co způsobilo změnu.",
    methodology:
      "Bayesovský change point detection (BCPD): 1) Segmentace časové řady na homogenní úseky, 2) Detekce bodů změny s posterior pravděpodobností, 3) Kvantifikace effect size, 4) Cross-reference s událostmi v CRM, 5) Kauzální inference.",
    dataInputs: [
      "Všechny časové řady per klient",
      "CRM události (změny, incidenty)",
      "Externí události (legislativa, trh)",
      "Personální změny (účetní, jednatel)",
    ],
    outputMetrics: [
      "Počet change pointů per období",
      "Síla změny (effect size)",
      "Pravděpodobná příčina",
      "Dopad na predikční modely",
    ],
    goodScenario: {
      title: "Stabilní trajektorie",
      description:
        "Za posledních 12 měsíců nebyl detekován žádný statisticky významný change point. Klient je na stabilní trajektorii — predikce jsou spolehlivé.",
      indicators: [
        "0 change pointů za 12 měsíců",
        "Nízká variance všech metrik",
        "Predikce vysoce spolehlivé",
        "Konzistentní chování",
      ],
      actions: [
        "Pokračovat v monitoringu",
        "Využít stabilitu pro long-term planning",
      ],
    },
    badScenario: {
      title: "Detekován zlom",
      description:
        "Silný change point detekován 15.1.2026. Koreluje se změnou jednatele. Od tohoto data: sentiment −30 bodů, frekvence kontaktů −60 %, platební morálka zhoršena o 20 dní.",
      indicators: [
        "Change point 15.1.2026 (p > 0.99)",
        "Effect size: silný",
        "Příčina: změna jednatele",
        "3 metriky simultánně zhoršeny",
      ],
      actions: [
        "Osobní schůzka s novým jednatelem",
        "Představit služby a tým",
        "Přehodnotit strategii pro klienta",
        "Sledovat další vývoj intenzivně 90 dní",
      ],
    },
    frequency: "Týdně",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["13-02", "13-05", "7-01", "10-01"],
    businessImpact: "Vysoký — pochopení příčin změn v chování klientů",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "13-02",
    sectionId: 13,
    sectionTitle: "Časová dimenze",
    name: "Životní cyklus vztahu",
    source: "timeline",
    good: "Fáze růstu, 8. rok spolupráce",
    bad: "Fáze úpadku — komunikace klesá od Q3",
    description:
      "Mapování fáze životního cyklu klientského vztahu na základě multi-dimenzionální časové řady. Systém klasifikuje vztah do fází: Onboarding → Růst → Stabilita → Saturace → Úpadek → Odchod/Obnova. Každá fáze má charakteristické signály v komunikaci, financích a engagementu.\n\nModel využívá hidden Markov model (HMM) trénovaný na historických datech o klientech, kteří prošli celým cyklem. Přechodové pravděpodobnosti mezi fázemi jsou kalibrovány na portfoliu 500+ klientů.\n\nKlíčovou hodnotou je včasná detekce přechodu do fáze Úpadku — v této fázi je retence ještě možná, v pozdějších fázích dramaticky klesá úspěšnost intervence.",
    methodology:
      "Hidden Markov Model (HMM): 1) Definice 6 skrytých stavů (fází), 2) Emission probabilities z 12 observovaných metrik (sentiment, frekvence kontaktu, platební morálka, využití služeb...), 3) Viterbi dekódování aktuální fáze, 4) Forward algorithm pro predikci další fáze, 5) Baum-Welch re-estimace parametrů kvartálně.",
    dataInputs: [
      "CRM interakce (Daktela hovory, emaily, schůzky) — celá historie",
      "Fakturační data z Money S3/Pohoda — měsíční obrat per klient",
      "Sentiment skóre z emailové komunikace (NLP pipeline)",
      "Engagement metriky (open rate, response time, portal logins)",
      "Smlouvy a jejich změny (DocuWare)",
    ],
    outputMetrics: [
      "Aktuální fáze životního cyklu (klasifikace)",
      "Pravděpodobnost přechodu do další fáze (1M/3M/6M horizont)",
      "Délka pobytu v aktuální fázi vs. průměr portfolia",
      "Composite health score (0–100)",
      "Doporučená akce per fáze (automation trigger)",
    ],
    goodScenario: {
      title: "Fáze růstu, 8. rok spolupráce",
      description:
        "Klient je ve fázi Růstu i po 8 letech — výjimečná trajektorie. Obrat roste 12 % YoY, využívá nové služby, komunikace je proaktivní. Model predikuje setrvání v růstové fázi s 85% pravděpodobností na 12M horizont.",
      indicators: [
        "Fáze: Růst (HMM posterior > 0.92)",
        "Obrat YoY: +12 %",
        "2 nové služby aktivovány za 6M",
        "Response time klesající (lepší engagement)",
      ],
      actions: [
        "Nabídnout premium tier / strategické poradenství",
        "Požádat o referenci a případovou studii",
        "Naplánovat kvartální strategickou schůzku",
        "Zafixovat long-term smlouvu s výhodnými podmínkami",
      ],
    },
    badScenario: {
      title: "Fáze úpadku — komunikace klesá od Q3",
      description:
        "Model detekoval přechod do fáze Úpadku v Q3. Komunikace klesla o 40 %, response time vzrostl z 4h na 72h, klient odmítl 2 schůzky. Bez intervence predikce: 65 % pravděpodobnost odchodu do 6M.",
      indicators: [
        "Fáze: Úpadek (posterior 0.78, přechod ze Saturace v Q3)",
        "Komunikace: −40 % frekvence kontaktu",
        "Response time: 4h → 72h",
        "2 odmítnuté schůzky za 2M",
      ],
      actions: [
        "Senior partner osobní schůzka do 7 dní",
        "Připravit analýzu hodnoty (co klient získal za poslední rok)",
        "Identifikovat trigger přechodu — co se stalo v Q3?",
        "Spustit retention workflow s eskalační maticí",
      ],
    },
    frequency: "Týdně (HMM re-evaluace), denně (metriky)",
    automationLevel: "85 % automatizováno",
    relatedAnalyses: ["13-01", "13-05", "10-01", "7-01"],
    businessImpact: "Vysoký — včasná detekce úpadku vztahu",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "13-03",
    sectionId: 13,
    sectionTitle: "Časová dimenze",
    name: "Sezónní vzorce",
    source: "časové řady",
    good: "Březen nervózní — očekávané",
    bad: "Nestandardní ticho v březnu",
    description:
      "Dekompozice časových řad klientských metrik na sezónní, trendovou a reziduální složku. Systém identifikuje opakující se vzorce v průběhu roku (daňové uzávěrky, účetní závěrky, dovolené, sezónní podnikání) a detekuje odchylky od očekávaného sezónního chování.\n\nPro každého klienta je vytvořen individuální sezónní profil na základě 2+ let dat. Odchylka od profilu (neočekávané ticho, neočekávaná aktivita) je silnějším signálem než absolutní hodnota metriky.\n\nSystém kalibruje sezónnost na české i německé kalendáře (svátky, školní prázdniny, daňové termíny) a oborové cykly.",
    methodology:
      "STL dekompozice (Seasonal-Trend decomposition using LOESS): 1) Extrakce sezónní složky per metrika per klient, 2) Konstrukce sezónního profilu (expected behavior per měsíc/týden), 3) Anomaly detection na reziduální složce (z-score > 2.5), 4) Cross-reference s externími kalendáři (ČNB, DE Feiertage, daňové termíny). Kalendáře: api.asvs.cz/svatky, feiertage-api.de/api.",
    dataInputs: [
      "Časové řady komunikace per klient (Daktela CDR + email logs, 24+ měsíců)",
      "Časové řady financí (fakturace, platby — Money S3 API export)",
      "Český kalendář svátků — api.asvs.cz/svatky + ruční MFČR daňové termíny",
      "Německý kalendář svátků — feiertage-api.de/api/?jahr={year}&nur_land=BY",
      "Oborová sezónnost (NACE kód klienta → referenční profil z ČSÚ)",
    ],
    outputMetrics: [
      "Sezónní profil per klient (12 měsíčních indexů per metrika)",
      "Aktuální odchylka od sezónního profilu (z-score)",
      "Detekované anomálie (neočekávané ticho/aktivita)",
      "Sezónní forecast na +3M (expected value ± CI)",
      "Korelace s externími kalendáři (R²)",
    ],
    goodScenario: {
      title: "Březen nervózní — očekávané",
      description:
        "V březnu (přiznání DPFO, roční zúčtování) klient vykazuje +180 % komunikace oproti průměru — přesně odpovídá jeho sezónnímu profilu z minulých 4 let. Reziduální složka v normě (z-score 0.3).",
      indicators: [
        "Březnová aktivita: +180 % (profil: +175 %)",
        "Reziduál z-score: 0.3 (norma < 2.5)",
        "Korelace s daňovým kalendářem: R² = 0.94",
        "Forecast přesný: MAE < 8 %",
      ],
      actions: [
        "Neeskalovat — jde o sezónní normu",
        "Proaktivně alokovat kapacitu na březen",
        "Předpřipravit standardní odpovědi na sezónní dotazy",
      ],
    },
    badScenario: {
      title: "Nestandardní ticho v březnu",
      description:
        "Klient, který 4 roky v březnu generoval +180 % komunikace, je letos v březnu −60 % pod průměrem. Reziduální z-score 4.1 — silná anomálie. Možné příčiny: přešel ke konkurenci, vnitřní krize, nemoc jednatele.",
      indicators: [
        "Březnová aktivita: −60 % (profil: +175 %)",
        "Reziduál z-score: 4.1 (alarm > 2.5)",
        "Žádný kontakt za 18 dní",
        "Daňové přiznání nepřipraveno",
      ],
      actions: [
        "Okamžitý telefonní kontakt — ověřit stav",
        "Zkontrolovat ARES/ISIR — insolvence?",
        "Ověřit, zda klient nekomunikuje s konkurencí",
        "Eskalovat na retention tým — vysoké riziko odchodu",
      ],
    },
    frequency: "Týdně (anomaly detection), měsíčně (profil update)",
    automationLevel: "90 % automatizováno",
    relatedAnalyses: ["13-01", "13-04", "19-06", "10-01"],
    businessImpact:
      "Střední — prevence falešných poplachů a detekce skutečných anomálií",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "13-04",
    sectionId: 13,
    sectionTitle: "Časová dimenze",
    name: "Reakce na legislativu",
    source: "korelace",
    good: "Proaktivní přizpůsobení",
    bad: "Ignoruje novely — compliance gap",
    description:
      "Korelační analýza mezi legislativními změnami a chováním klienta. Systém měří, jak rychle a intenzivně klient reaguje na nové zákony, novely a regulace — zda se ptá, přizpůsobuje procesy, nebo ignoruje změny.\n\nPro účetní kancelář zaměřenou na pendlery CZ/DE je klíčové sledovat reakce na novely DPH, daně z příjmů, sociálního pojištění, A1 formuláře a bilaterální smlouvy. Klient, který nereaguje na legislativní změnu, potřebuje proaktivní intervenci.\n\nSystém parsuje legislativní feedy (Sbírka zákonů, BGBl, EU Official Journal) a koreluje je s klientskou komunikací.",
    methodology:
      "Event study analysis: 1) Identifikace legislativních událostí z RSS feedů (zakonyprolidi.cz, beck-online.de, eur-lex.europa.eu), 2) Definice relevance per klient (dle NACE, pendler status, velikost), 3) Měření reakce (komunikace, dotazy, implementace) v okně T-7 až T+30 dní, 4) Klasifikace: Proaktivní / Reaktivní / Ignorující, 5) Gap analýza — klient ignoruje, ale měl by reagovat.",
    dataInputs: [
      "RSS feed Sbírka zákonů — zakonyprolidi.cz/feed",
      "RSS feed BGBl (DE) — bgbl.de/feed",
      "EUR-Lex CELLAR API — relevantní CZ/DE předpisy",
      "CRM komunikace per klient (email + Daktela hovory) — keyword match",
      "Klientský profil (pendler, NACE, DPH plátce, zaměstnanci v DE)",
    ],
    outputMetrics: [
      "Reakce skóre per legislativní událost per klient (0=ignoruje, 100=proaktivní)",
      "Průměrná doba reakce (dny od publikace)",
      "Compliance gap count — relevantní novely bez reakce",
      "Klasifikace klienta: Proaktivní / Reaktivní / Ignorující",
      "Risk score z compliance gapu (finanční dopad nereakce)",
    ],
    goodScenario: {
      title: "Proaktivní přizpůsobení",
      description:
        "Klient se ptá na novelu zákona o DPH ještě před její účinností. Sám identifikoval dopad na své podnikání a žádá o konzultaci. Compliance gap = 0.",
      indicators: [
        "Reakce skóre: 92/100",
        "Průměrná doba reakce: −5 dní (ptá se PŘED účinností)",
        "0 compliance gaps za 12M",
        "Klasifikace: Proaktivní",
      ],
      actions: [
        "Poskytnout premium konzultace — klient je připraven",
        "Nabídnout regulatory alert službu",
        "Využít jako referenci pro ostatní klienty",
      ],
    },
    badScenario: {
      title: "Ignoruje novely — compliance gap",
      description:
        "3 relevantní novely za posledních 6 měsíců — klient na žádnou nereagoval. Novela zákona o DPH ze dne 1.1. mění sazby pro jeho obor — bez přizpůsobení hrozí doměrek. Novela A1 formuláře mění povinnosti pendlerů.",
      indicators: [
        "Reakce skóre: 8/100",
        "3 compliance gaps (DPH novela, A1 změna, pojištění DE)",
        "0 dotazů od klienta na legislativu za 6M",
        "Estimovaný finanční risk: 280 000 Kč (DPH doměrek)",
      ],
      actions: [
        "Proaktivně informovat klienta o všech 3 novelách",
        "Připravit konkrétní dopad analýzu (Kč)",
        "Naplánovat implementační schůzku",
        "Nastavit automatické notifikace pro budoucí novely",
      ],
    },
    frequency: "Per legislativní událost (real-time RSS monitoring)",
    automationLevel: "75 % automatizováno",
    relatedAnalyses: ["13-03", "19-06", "4-01", "5-01"],
    businessImpact: "Vysoký — prevence compliance pokut a doměrků",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "13-05",
    sectionId: 13,
    sectionTitle: "Časová dimenze",
    name: "Longitudinální trajektorie",
    source: "10+ let",
    good: "Stabilní růst 8% ročně",
    bad: "Klesající trend 5 let — bez zásahu odejde",
    description:
      "Dlouhodobá analýza trajektorie klienta na horizontu 5–15 let. Na rozdíl od krátkodobých analýz (měsíce, kvartály) se tato analýza zaměřuje na sekulární trendy — pomalé, ale fundamentální změny ve vztahu, podnikání a spokojenosti klienta.\n\nModel fituje lineární a nelineární trendy na klíčové metriky a extrapoluje na horizonty 2–5 let. Klíčovou přidanou hodnotou je detekce pomalého, ale soustavného zhoršování — trend, který je neviditelný v měsíčních reportech, ale za 5 let vede k odchodu.\n\nData pocházejí z celé historie klienta v systému — od prvního kontaktu po současnost.",
    methodology:
      "Longitudinální regrese: 1) Sběr všech historických dat per klient (obrat, komunikace, spokojenost, služby), 2) Fit lineárního a kvadratického trendu, 3) Breakpoint detection (Chow test) pro strukturální zlomy, 4) Extrapolace s confidence intervals, 5) Klasifikace trajektorie: Růst / Stabilita / Úpadek / Obnova.",
    dataInputs: [
      "Kompletní CRM historie (5–15 let) — všechny interakce",
      "Fakturační historie z Money S3/Pohoda — měsíční obraty",
      "Smlouvy a jejich změny — DocuWare archiv",
      "NPS/CSAT data (pokud existují)",
      "Personální změny (na obou stranách — klient i kancelář)",
    ],
    outputMetrics: [
      "Sekulární trend (slope) per klíčová metrika",
      "R² trendu (síla trendu)",
      "Predikce na 2/5 let (extrapolace ± CI)",
      "Detekované strukturální zlomy (breakpoints)",
      "Klasifikace trajektorie (Růst/Stabilita/Úpadek/Obnova)",
    ],
    goodScenario: {
      title: "Stabilní růst 8 % ročně",
      description:
        "Klient vykazuje konzistentní 8% roční růst obratu i engagementu po celých 10 let spolupráce. Lineární trend s R² = 0.94. Žádné strukturální zlomy. Extrapolace: pokračující růst.",
      indicators: [
        "Trend: +8 % YoY (lineární, R² = 0.94)",
        "0 strukturálních zlomů za 10 let",
        "Engagement roste proporcionálně s obratem",
        "Extrapolace 5Y: obrat 2.4× současný",
      ],
      actions: [
        "Investovat do hlubšího vztahu — strategické poradenství",
        "Připravit kapacity na rostoucí objem",
        "Nabídnout exkluzivní podmínky pro long-term smlouvu",
      ],
    },
    badScenario: {
      title: "Klesající trend 5 let — bez zásahu odejde",
      description:
        "Obrat klesá −6 % ročně po 5 let. Engagement klesá −12 % ročně. Lineární extrapolace: obrat na nule za 3 roky. Detekován breakpoint 5 let zpět — koreluje s odchodem původního jednatele.",
      indicators: [
        "Trend: −6 % YoY (R² = 0.88)",
        "Breakpoint detekován: před 5 lety (odchod jednatele)",
        "Engagement: −12 % YoY",
        "Extrapolace 3Y: obrat → 0 (odchod klienta)",
      ],
      actions: [
        "Urgentní strategická schůzka s aktuálním jednatelem",
        "Prezentovat data — vizualizace 10letého trendu",
        "Identifikovat a adresovat root cause (vztah s novým jednatelem)",
        "Navrhnout restart vztahu — nová smlouva, nový tým, nový přístup",
      ],
    },
    frequency: "Kvartálně",
    automationLevel: "70 % automatizováno",
    relatedAnalyses: ["13-01", "13-02", "13-06", "10-01"],
    businessImpact: "Vysoký — detekce neviditelných dlouhodobých trendů",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "13-06",
    sectionId: 13,
    sectionTitle: "Časová dimenze",
    name: "Generační změna",
    source: "kontakty + styl",
    good: "Syn přebral — modernizuje",
    bad: "Syn přebral — nekomunikuje, nereaguje",
    description:
      "Detekce a analýza generační výměny ve vedení klientské firmy. Systém identifikuje signály předání firmy z jedné generace na druhou — změnu kontaktních osob, komunikačního stylu, rozhodovacích vzorců a technologických preferencí.\n\nGenerační výměna je kritický moment — může vést k modernizaci a prohloubení spolupráce, nebo k odchodu klienta (nová generace nemá historický vztah). Včasná identifikace umožňuje adaptaci přístupu.\n\nModel detekuje generační změnu z kombinace signálů: nové kontaktní osoby s jiným příjmením, OR zápis nového jednatele, změna komunikačního stylu (formální → neformální), nové technologické požadavky.",
    methodology:
      "Multi-signal detection: 1) Monitoring OR (ARES API) — změna jednatele/společníka, 2) CRM kontaktní změny — nová osoba s vazbou (příjmení, adresa), 3) NLP analýza komunikačního stylu — shift detection, 4) Behaviorální změny (čas odpovědí, kanál preference), 5) Klasifikace: Pozitivní generační změna / Negativní / Neutrální.",
    dataInputs: [
      "ARES API — GET /ares/v1/ekonomicke-subjekty/{ico} (statutární orgán, datum změny)",
      "CRM kontaktní databáze — historie změn osob",
      "Email komunikace — NLP stylová analýza (formálnost, slovní zásoba, délka)",
      "Daktela CDR — kdo volá, jak dlouho, jak často",
      "OR výpisy — sbírka listin justice.cz (zápisy změn)",
    ],
    outputMetrics: [
      "Detekce generační změny (boolean + confidence)",
      "Typ změny (syn/dcera, profesionální management, prodej)",
      "Impact score na vztah (−100 až +100)",
      "Komunikační gap (starý vs. nový styl)",
      "Adaptační doporučení (jak přizpůsobit přístup)",
    ],
    goodScenario: {
      title: "Syn přebral — modernizuje",
      description:
        "Syn jednatele převzal firmu před 6 měsíci. Komunikuje digitálně, ptá se na automatizaci, chce cloudové řešení a reporting na mobilu. Obrat +15 % od převzetí. Vztah se prohlubuje.",
      indicators: [
        "Generační změna detekována (OR zápis + CRM změna)",
        "Komunikace: +30 % frekvence, přechod na email/chat",
        "3 nové služby objednány za 6M",
        "Sentiment: +25 bodů od převzetí",
      ],
      actions: [
        "Nabídnout moderní balíček služeb (cloud, automatizace)",
        "Přizpůsobit komunikaci digitálním kanálům",
        "Nabídnout onboarding nového jednatele — představit vše",
        "Investovat do vztahu — nová generace = dalších 20 let",
      ],
    },
    badScenario: {
      title: "Syn přebral — nekomunikuje, nereaguje",
      description:
        "Syn převzal firmu po smrti otce. Nemá vztah ke kanceláři, nereaguje na emaily ani telefony. Platby se zpožďují. Nejspíš zvažuje změnu poskytovatele.",
      indicators: [
        "Generační změna detekována (OR zápis — nový jednatel)",
        "0 odpovědí na 5 kontaktních pokusů",
        "Platby: +25 dní zpoždění od převzetí",
        "Žádná komunikace 45 dní",
      ],
      actions: [
        "Senior partner osobní návštěva — ne email/telefon",
        "Připravit přehled hodnoty služeb (co děláme, proč je to důležité)",
        "Nabídnout osobní onboarding a přizpůsobení služeb",
        "Zvážit přechodnou slevu jako gesto dobré vůle",
      ],
    },
    frequency: "Měsíčně (ARES scan), průběžně (CRM monitoring)",
    automationLevel: "70 % automatizováno",
    relatedAnalyses: ["13-01", "13-02", "18-01", "19-01"],
    businessImpact: "Vysoký — generační změna = kritický bod pro retenci",
    implementationStatus: "Produkce",
    scope: "client",
  },
  {
    id: "13-07",
    sectionId: 13,
    sectionTitle: "Časová dimenze",
    name: "Paměť systému",
    source: "full-text",
    good: "Historie 10 let dostupná",
    bad: "Klient říká X, ale před 3 lety řekl opak",
    description:
      "Full-text vyhledávání v celé historii komunikace s klientem jako nástroj pro verifikaci tvrzení, detekci rozporů a budování institucionální paměti. Systém indexuje veškerou komunikaci (emaily, záznamy hovorů, zápisy ze schůzek, interní poznámky) do Elasticsearch clusteru.\n\nKlíčovou funkcí je detekce rozporů — když klient tvrdí něco, co je v rozporu s jeho historickou komunikací. Tato schopnost chrání kancelář před manipulací a zajišťuje konzistenci.\n\nSystém také slouží jako knowledge base — nový účetní převezme klienta a během hodin má přístup k 10 letům kontextu.",
    methodology:
      "Full-text indexing (Elasticsearch): 1) Indexace všech komunikačních kanálů (IMAP email sync, Daktela transcription, DocuWare OCR, CRM notes), 2) Entity extraction (osoby, firmy, částky, data), 3) Contradiction detection — NLI model na nových vs. historických tvrzeních, 4) Timeline reconstruction per téma, 5) Semantic search pro knowledge retrieval.",
    dataInputs: [
      "IMAP email archiv — kompletní korespondence (10+ let)",
      "Daktela CDR + VoIP transcription (speech-to-text)",
      "DocuWare OCR texty ze skenovaných dokumentů",
      "CRM poznámky a zápisy ze schůzek",
      "Interní ticketovací systém — komunikace per ticket",
    ],
    outputMetrics: [
      "Počet indexovaných dokumentů per klient",
      "Detekované rozpory (contradiction alerts)",
      "Pokrytí historie (od–do, kompletnost)",
      "Top témata per klient (topic modeling)",
      "Využití knowledge base (queries per účetní per den)",
    ],
    goodScenario: {
      title: "Historie 10 let dostupná",
      description:
        "Kompletní historie komunikace za 10 let je indexována a prohledatelná. Nový účetní přebírající klienta během 2 hodin prochází klíčové momenty a kontexty. Žádné informace nebyly ztraceny.",
      indicators: [
        "12 450 indexovaných dokumentů",
        "Pokrytí: 100 % (2016–2026)",
        "0 rozporů detekováno za 12M",
        "Knowledge base využívána 3×/týden",
      ],
      actions: [
        "Udržovat kvalitu indexace",
        "Pravidelně čistit duplicity",
        "Školit nové zaměstnance na práci se systémem",
      ],
    },
    badScenario: {
      title: "Klient říká X, ale před 3 lety řekl opak",
      description:
        "Klient tvrdí, že nikdy nesouhlasil s navýšením ceny. Systém nalezl email z 15.3.2023 kde explicitně píše: 'S navýšením o 15 % souhlasím.' Rozpor detekován automaticky, evidence dokumentována.",
      indicators: [
        "Contradiction alert: vysoká konfidence (0.95)",
        "Evidence: email z 15.3.2023 vs. aktuální tvrzení",
        "Téma: cenotvorba (opakovaný problém)",
        "Historicky 3 podobné incidenty",
      ],
      actions: [
        "Připravit evidenci (screenshot emailu) pro schůzku",
        "Komunikovat diplomaticky — ne konfrontačně",
        "Navrhnout písemné potvrzení budoucích dohod",
        "Aktualizovat risk score klienta",
      ],
    },
    frequency: "Real-time (indexace), on-demand (vyhledávání)",
    automationLevel: "80 % automatizováno",
    relatedAnalyses: ["13-02", "13-05", "7-01", "18-01"],
    businessImpact:
      "Střední — ochrana proti manipulaci a budování znalostní báze",
    implementationStatus: "Produkce",
    scope: "client",
  },
];
