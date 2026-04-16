# SCH-EKONOM — Datová mapa 205 analýz
> Kompletní dokumentace všech datových analýz autonomního ERP systému
> **Celkem:** 205 analýz ve 23 kategoriích

---

## Obsah

1. [**Tvrdé účetnictví a finance**](#sekce-1) — 9 analýz
2. [**Náklady, rozpočty, prognózy**](#sekce-2) — 7 analýz
3. [**Mzdy a personální data**](#sekce-3) — 10 analýz
4. [**Německé daně a pendleři**](#sekce-4) — 11 analýz
5. [**Daňové poradenství**](#sekce-5) — 6 analýz
6. [**DPH, ViDA a e-fakturace**](#sekce-6) — 4 analýz
7. [**Klientská komunikace**](#sekce-7) — 11 analýz
8. [**Hlasová a lingvistická analýza**](#sekce-8) — 8 analýz
9. [**Finanční profil a CLV**](#sekce-9) — 7 analýz
10. [**Rizika, fraud, deepfakes**](#sekce-10) — 11 analýz
11. [**Operativní reporty**](#sekce-11) — 10 analýz
12. [**Strategie a segmentace**](#sekce-12) — 4 analýz
13. [**Časová dimenze**](#sekce-13) — 7 analýz
14. [**Síťová analýza**](#sekce-14) — 6 analýz
15. [**Psychografický profil**](#sekce-15) — 4 analýz
16. [**Produktová inteligence**](#sekce-16) — 4 analýz
17. [**Behaviorální mikrosignály**](#sekce-17) — 5 analýz
18. [**Organizační inteligence klienta**](#sekce-18) — 4 analýz
19. [**Externí signály**](#sekce-19) — 8 analýz
20. [**Certifikační autorita a IT**](#sekce-20) — 6 analýz
21. [**Virtuální CFO**](#sekce-21) — 4 analýz
22. [**Prediktivní vrstva**](#sekce-22) — 5 analýz
23. [**Skryté signály — co tam je, ale nikoho nenapadne to hledat**](#sekce-23) — 54 analýz

---

<a id="sekce-1"></a>

## Sekce 1: Tvrdé účetnictví a finance

### 1-01 — Hlavní kniha — obraty účtů

**Zdroj:** Money S3 / Pohoda

| | |
|---|---|
| **Frekvence** | Denně (automaticky), manuální review týdně |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Kritický — základ pro správnost celého účetnictví |
| **Status** | Produkce |

**Popis:**

Analýza obratů hlavní knihy je základním kamenem finančního zdraví každé společnosti. Systém automaticky porovnává stranu Má dáti a Dal na všech syntetických i analytických účtech a identifikuje jakékoliv nesrovnalosti, které by mohly signalizovat chybné zaúčtování, duplicitní zápisy nebo neoprávněné změny.

Systém pracuje v reálném čase s daty z účetního software (Money S3, Pohoda) a provádí průběžnou kontrolu salda na každém účtu. Výsledky jsou vizualizovány v dashboardu s možností drill-down na konkrétní účetní zápisy.

Tato analýza je klíčová pro přípravu na audit, uzávěrky i pro denní operativu — jakákoliv nesrovnalost je okamžitě eskalována odpovědné osobě.

**Metodologie:**

Automatické porovnání obratů MD a D na všech účtech hlavní knihy. Systém kontroluje: 1) Shodu celkových obratů, 2) Saldo každého účtu vůči očekávané hodnotě, 3) Anomálie v denních pohybech (statistická odchylka > 2 sigma), 4) Cross-validace s bankovními výpisy a pokladními doklady.

**Datové vstupy:**

- Účetní deník z Money S3 / Pohoda
- Bankovní výpisy (FIO, KB, ČSOB API)
- Pokladní doklady
- Interní doklady a přeúčtování
- Historické obraty pro trend analýzu

**Výstupní metriky:**

- Celkový obrat MD vs. D (absolutní rozdíl)
- Počet účtů s nesrovnalostí
- Suma nesrovnalostí v Kč
- Trend nesrovnalostí měsíc/měsíc
- Čas od vzniku nesrovnalosti po detekci

#### ✅ Dobrý stav

**Perfektní shoda obratů**

Všechny účty hlavní knihy vykazují nulový rozdíl mezi MD a D. Systém nedetekoval žádné anomálie v denních pohybech a veškeré zápisy jsou podloženy doklady.

*Indikátory:*

- ✓ MD = D na všech účtech
- ✓ 0 nesrovnalostí za období
- ✓ Všechny zápisy mají dokladovou přílohu
- ✓ Bankovní výpisy 100% spárovány

*Doporučené akce:*

1. Pokračovat v měsíční kontrole
2. Archivovat výsledky pro audit
3. Aktualizovat benchmark hodnoty

#### ❌ Rizikový stav

**Detekované nesrovnalosti**

Na účtu 321 (Dodavatelé) vznikl rozdíl 47 000 Kč, který nebyl vysvětlen. Možné příčiny: duplicitní zaúčtování, chybějící dobropis, neoprávněná změna po uzávěrce.

*Indikátory:*

- ✗ Rozdíl 47 000 Kč na účtu 321
- ✗ Nesrovnalost trvá déle než 5 pracovních dní
- ✗ Chybí dokladová příloha ke 3 zápisům
- ✗ Detekována změna po uzávěrkovém datu

*Nápravná opatření:*

1. Okamžitě identifikovat zdroj nesrovnalosti
2. Provést manuální reconciliaci účtu 321
3. Zkontrolovat audit trail za posledních 30 dní
4. Eskalovat na senior účetní a informovat klienta

**Související analýzy:** 1-02, 1-03, 1-07, 1-09

---

### 1-02 — Výsledovka a rozvaha

**Zdroj:** účtová osnova

| | |
|---|---|
| **Frekvence** | Měsíčně + kvartální uzávěrka |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Kritický — základní výkazy pro stakeholdery |
| **Status** | Produkce |

**Popis:**

Průběžná tvorba výkazu zisku a ztráty a rozvahy podle směrné účtové osnovy (vyhláška 500/2002 Sb.). Systém agreguje obraty třídy 5/6 do výsledovky a třídy 0-4 do rozvahy, validuje bilanční rovnici Aktiva = Pasiva a sleduje meziroční trendy. Výstupy slouží jako podklad pro uzávěrku, audit i manažerský reporting.

**Metodologie:**

Automatizovaná agregace z Money S3 / Pohoda přes GET /api/accounts/balance endpoint. Výpočet výsledku hospodaření = SUM(třída 6) − SUM(třída 5). Bilanční kontrola |aktiva − pasiva| < 1 Kč. Trend: meziroční změny jednotlivých řádků, vertikální analýza (% struktura), horizontální analýza (index k bázi).

**Datové vstupy:**

- Money S3 API /api/accounts + /api/journal
- Pohoda mServer XML export rozvahy
- Účtová osnova dle vyhlášky 500/2002 Sb.
- Historie 3 roků pro trend
- Opravné položky a rezervy modul

**Výstupní metriky:**

- Výsledek hospodaření před a po zdanění (Kč)
- Suma aktiv / pasiv (bilanční suma)
- Vlastní kapitál / cizí zdroje poměr
- EBITDA marže (%)
- ROA, ROE (%)
- Meziroční změna jednotlivých řádků

#### ✅ Dobrý stav

**Zdravá výsledovka a rozvaha**

Výsledek hospodaření kladný, bilanční rovnice sedí na Kč přesně, vlastní kapitál roste meziročně o 10%+, likvidita L2 > 1.0.

*Indikátory:*

- ✓ Zisk 2.4M Kč
- ✓ Aktiva +12 % YoY
- ✓ Bilanční rovnice splněna
- ✓ Vlastní kapitál / cizí zdroje = 1.4

*Doporučené akce:*

1. Předat podklady auditorovi
2. Publikovat do sbírky listin (justice.cz)
3. Aktualizovat ratingové metriky

#### ❌ Rizikový stav

**Ztráta a předlužení**

Záporný výsledek hospodaření, vlastní kapitál pod 50 % základního kapitálu — povinnost dle § 68 ZOK svolat valnou hromadu. Riziko insolvence.

*Indikátory:*

- ✗ Ztráta 380K
- ✗ Záporný vlastní kapitál
- ✗ L2 likvidita 0.4
- ✗ Bilanční suma klesla o 18 %

*Nápravná opatření:*

1. Svolat valnou hromadu (§ 68 ZOK)
2. Připravit ozdravný plán
3. Konzultace s insolvenčním správcem
4. Informovat banku (covenants)

**Související analýzy:** 1-01, 1-03, 1-08

---

### 1-03 — Cash flow

**Zdroj:** bankovní API + účetní deník

| | |
|---|---|
| **Frekvence** | Týdně (13-week rolling forecast) |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Kritický — přímý ukazatel platební schopnosti |
| **Status** | Produkce |

**Popis:**

Nepřímá metoda výpočtu cash flow dle ČÚS 023. Systém rozděluje peněžní toky na provozní, investiční a finanční a sleduje trend provozního CF jako nejdůležitějšího ukazatele likvidity. Opakovaně záporný provozní CF je silný signál problémů s platební schopností.

**Metodologie:**

Nepřímá metoda: EAT + odpisy + změny rezerv + změny pracovního kapitálu (zásoby, pohledávky, závazky). Vstupy z bankovních API (FIO, KB, ČSOB) pro validaci skutečných toků. Porovnání operativního CF s EBITDA jako quality-of-earnings indikátor.

**Datové vstupy:**

- Bankovní API: FIO /ib_api/rest, KB API, ČSOB ConnectAPI
- Účetní deník Money S3 (GET /api/journal)
- Modul rezerv a dohadů
- Saldokonto pohledávek a závazků
- Odpisy z evidence majetku

**Výstupní metriky:**

- Provozní CF (Kč)
- Investiční CF (Kč)
- Finanční CF (Kč)
- Čistý CF za období
- CF/EBITDA ratio (quality of earnings)
- Trend 12 měsíců

#### ✅ Dobrý stav

**Zdravý provozní cash flow**

Provozní CF stabilně pozitivní, pokrývá investice i splátky úvěrů. CF/EBITDA > 0.9 znamená kvalitní zisky (ne jen účetní).

*Indikátory:*

- ✓ Provozní CF +1.8M Kč
- ✓ CF/EBITDA = 0.94
- ✓ Čistý CF +320K Kč
- ✓ Volný CF pokrývá CAPEX

*Doporučené akce:*

1. Investovat přebytek do termínovaných vkladů
2. Zvážit předčasné splacení úvěru
3. Aktualizovat 13-week CF forecast

#### ❌ Rizikový stav

**Záporný provozní cash flow**

Třetí měsíc záporný provozní CF — firma pálí hotovost. Rostoucí pohledávky při stagnujících tržbách signalizují problémy s inkasem nebo fiktivní tržby.

*Indikátory:*

- ✗ Provozní CF −420K
- ✗ Pohledávky +35 % YoY
- ✗ CF/EBITDA = 0.2
- ✗ Čerpání kontokorentu 87 %

*Nápravná opatření:*

1. Okamžitá 13-week CF analýza
2. Zpřísnit inkaso pohledávek
3. Jednat s bankou o navýšení kontokorentu
4. Revize investičních výdajů

**Související analýzy:** 1-02, 2-06, 10-09

---

### 1-04 — Aging pohledávek

**Zdroj:** saldokonto

| | |
|---|---|
| **Frekvence** | Týdně |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Vysoký — přímý dopad na likviditu |
| **Status** | Produkce |

**Popis:**

Aging reportu rozděluje pohledávky z účtu 311 do košů podle doby po splatnosti (0-30, 31-60, 61-90, 90+ dní). Slouží jako základ pro tvorbu opravných položek podle § 8a zákona 593/1992 Sb. a pro řízení likvidity.

**Metodologie:**

Bucket analýza saldokontonta: GET /api/saldo?account=311. Pro každou pohledávku výpočet days_overdue = today − due_date. Kategorizace do bucketů. Automatická tvorba OP: 50 % při 180+ dnech, 100 % při 360+ dnech (daňově uznatelné). DSO = (pohledávky / tržby) × 365.

**Datové vstupy:**

- Saldokonto účtu 311 (Money S3 API)
- Fakturační historie (splatnost, částka)
- Platební historie klientů
- Upomínky a předžalobní výzvy
- ISIR API pro insolvenční kontrolu

**Výstupní metriky:**

- Pohledávky po splatnosti (Kč) po bucketech
- DSO — Days Sales Outstanding
- Concentration risk (top 5 dlužníků v %)
- Potřebná tvorba opravných položek (Kč)
- Míra úspěšnosti inkasa (%)

#### ✅ Dobrý stav

**Zdravé portfolio pohledávek**

Většina pohledávek do 30 dnů po splatnosti, DSO pod 35 dní, žádný klient nad 15 % portfolia, opravné položky minimální.

*Indikátory:*

- ✓ 85 % pohledávek do 30 dnů
- ✓ DSO = 32 dní
- ✓ 0 pohledávek nad 180 dnů
- ✓ Top dlužník 8 % portfolia

*Doporučené akce:*

1. Pokračovat v automatických upomínkách
2. Měsíční review top 10 dlužníků

#### ❌ Rizikový stav

**Kritické aging pohledávek**

45 % pohledávek starších 90 dnů, DSO přes 80 dní, riziko nedobytnosti a povinnost vysokých opravných položek.

*Indikátory:*

- ✗ 45 % nad 90 dnů
- ✗ DSO = 82 dní
- ✗ 3 klienti v ISIR
- ✗ Potřebné OP 680K Kč

*Nápravná opatření:*

1. Předžalobní výzvy dle § 142a OSŘ
2. Postoupení pohledávek factoringu
3. Blokace dodávek neplatícím klientům
4. Zahájit soudní vymáhání u top 3

**Související analýzy:** 1-03, 9-03, 10-09

---

### 1-05 — DPH, KH, SH

**Zdroj:** MOJE daně

| | |
|---|---|
| **Frekvence** | Měsíčně (plátci) |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Kritický — zákonná povinnost + penalizace |
| **Status** | Produkce |

**Popis:**

Automatizovaná příprava a podání přiznání k DPH (DPHDP3), kontrolního hlášení (DPHKH1) a souhrnného hlášení (DPHSH1) přes EPO portál MOJE daně. Systém cross-validuje data mezi moduly a detekuje neshody ještě před podáním.

**Metodologie:**

XML generace dle XSD schémat finanční správy. Cross-check: DPH přiznání ř. 1 = SUM(faktury vydané 21%). KH část A.4 = faktury s DUZP v období. Validace DIČ plátce přes ADIS API. Elektronické podání přes EPO s datovou schránkou / kvalifikovaný podpis.

**Datové vstupy:**

- Faktury vydané + přijaté z Money S3
- Evidence DPH z ERP
- ADIS API pro ověření DIČ
- EPO portál MOJE daně (odeslání XML)
- Datová schránka / kvalifikovaný podpis

**Výstupní metriky:**

- Vlastní daňová povinnost / nadměrný odpočet (Kč)
- Počet neshod KH vs. faktury
- Termín podání (do 25. dne následujícího měsíce)
- Validační status XML (OK / chyby)
- Riziko výzvy k odstranění pochybností (%)

#### ✅ Dobrý stav

**DPH přiznání bez vad**

Všechny XML validní, 0 neshod s KH, podáno 5 dní před termínem, bez výzvy FÚ.

*Indikátory:*

- ✓ 0 neshod KH vs. faktury
- ✓ Podáno 20. v měsíci
- ✓ Validní XSD
- ✓ DIČ všech partnerů ověřená

*Doporučené akce:*

1. Archivovat potvrzení o přijetí z EPO
2. Měsíční report klientovi

#### ❌ Rizikový stav

**Neshody a penále**

3 neshody mezi KH a přiznáním, FÚ vydal výzvu dle § 101g ZDPH, riziko pokuty až 500K Kč.

*Indikátory:*

- ✗ 3 neshody v KH
- ✗ Výzva od FÚ
- ✗ Penále 50K
- ✗ Nepodáno včas

*Nápravná opatření:*

1. Podat následné KH do 5 dnů
2. Opravit fakturace
3. Zkontrolovat DIČ partnerů
4. Požádat o prominutí penále

**Související analýzy:** 6-01, 6-04, 5-04

---

### 1-06 — Víceměnové výstupy

**Zdroj:** kurzovní lístek

| | |
|---|---|
| **Frekvence** | Denně (kurzy), měsíčně (přepočet) |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Střední — u exportérů vysoký |
| **Status** | Produkce |

**Popis:**

Přepočet cizích měn kurzem ČNB dle § 24 ZoÚ. Systém stahuje denní kurzovní lístek z API ČNB, přepočítává cizoměnové pohledávky, závazky a bankovní účty k rozvahovému dni a vyčísluje nerealizované kurzové rozdíly.

**Metodologie:**

Denní API call ČNB: https://api.cnb.cz/cnbapi/exrates/daily. Přepočet pevným kurzem (měsíční/roční průměr) nebo denním. K rozvahovému dni přecenění všech cizoměnových zůstatků. Kurzový zisk účet 663, ztráta 563. Realizované rozdíly při úhradě.

**Datové vstupy:**

- ČNB API /cnbapi/exrates/daily
- Cizoměnová saldokonta (účty 221, 311, 321)
- Fakturace v EUR, USD, GBP
- Bankovní výpisy cizoměnových účtů
- Nastavení pevného vs. denního kurzu

**Výstupní metriky:**

- Kurzové zisky / ztráty realizované (Kč)
- Nerealizované kurzové rozdíly (Kč)
- Expozice v jednotlivých měnách (EUR, USD)
- Citlivost: efekt ±10 % kurzu (Kč)
- Průměrný kurz vs. spot kurz

#### ✅ Dobrý stav

**Pozitivní kurzové rozdíly**

Hedging a timing funguje, realizované kurzové zisky převažují, expozice do jedné měny pod 30 % obratu.

*Indikátory:*

- ✓ Kurzový zisk +34K
- ✓ EUR expozice 25 %
- ✓ Volatilita pod oborem
- ✓ Hedging dle policy

*Doporučené akce:*

1. Pokračovat v hedgingu
2. Aktualizovat FX policy

#### ❌ Rizikový stav

**Kurzové ztráty z volatility**

Nehedgované pozice, oslabení CZK způsobilo kurzovou ztrátu 89K, nejistota ohledně budoucí expozice.

*Indikátory:*

- ✗ Kurzová ztráta −89K
- ✗ Žádný hedging
- ✗ EUR expozice 68 %
- ✗ Spot volatilita 12 %

*Nápravná opatření:*

1. Zavést FX forwardy / opce
2. Natural hedging (nákupy v EUR)
3. Revize cenotvorby v cizí měně
4. Konzultace s bankou

**Související analýzy:** 1-02, 1-03

---

### 1-07 — Audit trail

**Zdroj:** DocuWare + ERP

| | |
|---|---|
| **Frekvence** | Kontinuální (alerty), měsíční report |
| **Automatizace** | 98 % automatizováno |
| **Business impact** | Kritický — compliance a detekce fraudu |
| **Status** | Produkce |

**Popis:**

Kompletní log všech změn v účetním systému a DMS DocuWare — kdo, kdy, co změnil. Základ pro interní kontrolu, SOX compliance i pro detekci neoprávněných zásahů po uzávěrce (§ 8 ZoÚ nakazuje neporušitelnost uzavřených období).

**Metodologie:**

DocuWare REST API /docuware/platform/Audit pro DMS události, Money S3 audit_log tabulka pro účetní změny. Korelace user_id + timestamp + entity_id. Detekce anomálií: změny mimo pracovní dobu, bulk delete, editace uzavřených období.

**Datové vstupy:**

- DocuWare Audit API (/platform/Audit)
- Money S3 audit_log tabulka
- Active Directory — mapování user_id → jméno
- Uzávěrková data (locked_period_end)
- IP logy přihlášení

**Výstupní metriky:**

- Počet změn po uzávěrce
- Počet neoprávněných zásahů (mimo role)
- Počet bulk operací (>50 změn/min)
- Top 5 uživatelů dle počtu změn
- Changes at unusual hours (noc/víkend)

#### ✅ Dobrý stav

**Čistý audit trail**

Všechny změny v uzavřených obdobích zdokumentované opravnými doklady, žádné přímé editace, oprávnění dle rolí RBAC.

*Indikátory:*

- ✓ 0 neoprávněných změn
- ✓ 100 % změn má opravný doklad
- ✓ 0 bulk deletes
- ✓ Všechny role RBAC OK

*Doporučené akce:*

1. Měsíční report auditorovi
2. Archivovat logy 10 let

#### ❌ Rizikový stav

**Neoprávněné zásahy do uzavřených období**

17 změn v uzavřeném období 2024, 3 změny v noci mimo pracovní dobu, 1 bulk delete 240 záznamů — možná manipulace před auditem.

*Indikátory:*

- ✗ 17 změn po uzávěrce
- ✗ 3 změny v 23:00-05:00
- ✗ 1 bulk delete 240 záznamů
- ✗ 1 uživatel mimo roli

*Nápravná opatření:*

1. Okamžitá forenzní analýza
2. Informovat kompliance a auditora
3. Zablokovat podezřelý účet
4. Konzultace s právníkem (možný trestný čin § 254 TZ)

**Související analýzy:** 1-01, 11-07, 10-04

---

### 1-08 — DPPO/DPFO simulace

**Zdroj:** uzávěrková data

| | |
|---|---|
| **Frekvence** | Kvartálně + předuzávěrková simulace |
| **Automatizace** | 75 % automatizováno |
| **Business impact** | Vysoký — přímý finanční dopad |
| **Status** | Produkce |

**Popis:**

Simulace daně z příjmů právnických / fyzických osob na základě průběžných uzávěrkových dat. Systém počítá odhad DPPO (19 % pro PO) a DPFO (15 % / 23 % pro FO) včetně slev, odpočtů a úpravu základu dle § 23 ZDP. Umožňuje optimalizovat daňové výdaje ještě před koncem zdaňovacího období.

**Metodologie:**

Transformace účetního výsledku na daňový základ: HV +/− ř. 30-200 přiznání. Připočitatelné položky (neuznatelné náklady § 25), odečitatelné položky (dary, výzkum § 34). Aplikace slev (§ 35). Simulace Monte Carlo pro různé scénáře investičních pobídek.

**Datové vstupy:**

- Uzávěrkový HV z Money S3
- Evidence neuznatelných nákladů
- Odpisy daňové vs. účetní
- Evidence darů a výzkumu (§ 34)
- ADIS API pro zálohy

**Výstupní metriky:**

- Efektivní daňová sazba (%)
- Odhad DPPO / DPFO (Kč)
- Odhadovaný přeplatek / nedoplatek
- Úspora z optimalizace (Kč)
- Odchylka od loňska (%)

#### ✅ Dobrý stav

**Optimalizovaná daňová povinnost**

Využity všechny dostupné odpočty a slevy, efektivní sazba pod průměrem oboru, úspora 280K oproti neoptimalizovanému scénáři.

*Indikátory:*

- ✓ Efektivní sazba 15.2 %
- ✓ Úspora 280K
- ✓ Zálohy v souladu s predikcí
- ✓ Všechny odpočty využity

*Doporučené akce:*

1. Potvrdit strategii auditorovi
2. Plánovat investice pro další optimalizaci

#### ❌ Rizikový stav

**Chybná daňová optimalizace**

Chybně klasifikované výdaje, nevyužité odpočty, zbytečný přeplatek 120K — peníze uvízly na ADIS účtu.

*Indikátory:*

- ✗ Přeplatek 120K
- ✗ Nevyužity odpočty § 34
- ✗ Zálohy vyšší než povinnost
- ✗ Efektivní sazba 22 %

*Nápravná opatření:*

1. Podat dodatečné přiznání
2. Požádat o vrácení přeplatku
3. Revize klasifikace nákladů
4. Konzultace s daňovým poradcem

**Související analýzy:** 5-01, 5-06, 1-02

---

### 1-09 — Dokladová inventarizace

**Zdroj:** automatické porovnání MD/D

| | |
|---|---|
| **Frekvence** | Ročně (povinnost ZoÚ) + kvartálně |
| **Automatizace** | 70 % automatizováno |
| **Business impact** | Kritický — zákonná povinnost |
| **Status** | Produkce |

**Popis:**

Inventarizace účtů podle § 29-30 ZoÚ — ověření, že účetní stavy souhlasí se skutečností. Systém automaticky porovnává saldokonto s fyzickou inventurou (zásoby, hotovost), bankovními výpisy (účty 221) a potvrzeními pohledávek/závazků.

**Metodologie:**

Porovnání účetního zůstatku vs. reálný stav: pokladna (fyzická inventura), banka (výpis), zásoby (skladová inventura), pohledávky (konfirmace), závazky (saldokonto dodavatelů). Inventarizační rozdíly: manko nad normu / přebytek. Protokoly o inventarizaci.

**Datové vstupy:**

- Saldokonto všech účtů (Money S3)
- Bankovní výpisy (FIO, KB, ČSOB)
- Skladová evidence
- Pokladní deník
- Konfirmace od partnerů (pohledávky/závazky)

**Výstupní metriky:**

- Počet účtů s rozdílem
- Absolutní rozdíl (Kč)
- Manka a přebytky
- Nedobytné pohledávky (k odpisu)
- % shoda účetní vs. skutečný stav

#### ✅ Dobrý stav

**Kompletní shoda inventarizace**

Všechny účty vykazují 100% shodu, žádná manka, protokoly podepsané, podklady pro audit kompletní.

*Indikátory:*

- ✓ 100 % shoda
- ✓ 0 mank
- ✓ Všechny konfirmace doručeny
- ✓ Protokoly podepsané

*Doporučené akce:*

1. Archivovat inventarizační protokoly
2. Předat auditorovi

#### ❌ Rizikový stav

**Inventarizační rozdíly**

4 účty s celkovým rozdílem 67K, chybí konfirmace od 3 dodavatelů, skladové manko přesahuje normu.

*Indikátory:*

- ✗ 4 účty s rozdílem 67K
- ✗ Chybí 3 konfirmace
- ✗ Skladové manko 18K nad normu
- ✗ Nedobytné 24K

*Nápravná opatření:*

1. Objasnit rozdíly a zaúčtovat do výsledku
2. Urgovat konfirmace
3. Předepsat manko k úhradě dle ZP § 250
4. Opravné položky na nedobytné

**Související analýzy:** 1-01, 1-07

---

<a id="sekce-2"></a>

## Sekce 2: Náklady, rozpočty, prognózy

### 2-01 — Skutečnost vs. plán

**Zdroj:** rozpočet + reál

| | |
|---|---|
| **Frekvence** | Měsíčně (automaticky), ad-hoc na vyžádání |
| **Automatizace** | 80 % automatizováno |
| **Business impact** | Vysoký — řízení nákladů a ziskovosti |
| **Status** | Produkce |

**Popis:**

Porovnání skutečných nákladů a výnosů s plánovaným rozpočtem je klíčovým nástrojem finančního řízení. Analýza sleduje odchylky na úrovni středisek, projektů i celé společnosti a identifikuje trendy, které vyžadují manažerskou pozornost.

Systém automaticky importuje rozpočtová data a průběžně je porovnává se skutečností z účetního systému. Výsledky jsou prezentovány ve formě variance analýzy s drill-down možností.

Klíčovou přidanou hodnotou je včasná detekce negativních trendů — systém upozorní na odchylku dříve, než se stane kritickou, a navrhne konkrétní nápravná opatření.

**Metodologie:**

Variance analýza na úrovni nákladových středisek a účtových skupin. Systém porovnává: 1) Absolutní odchylku skutečnost vs. plán, 2) Procentuální odchylku, 3) Trend odchylky za 3/6/12 měsíců, 4) Sezónní adjustaci pro fair srovnání. Threshold pro alert: > 10 % negativní odchylka.

**Datové vstupy:**

- Rozpočet na aktuální období (Excel / ERP modul)
- Skutečné náklady z účetního deníku
- Skutečné výnosy z fakturace
- Historická data pro sezónní korekci
- Střediskové přiřazení nákladů

**Výstupní metriky:**

- Celková odchylka v Kč a %
- Odchylka per středisko
- Top 5 nejvíce odchýlených položek
- Trend odchylky (zlepšuje se / zhoršuje)
- Forecast do konce období na základě aktuálního trendu

#### ✅ Dobrý stav

**Rozpočet pod kontrolou**

Skutečné náklady se liší od plánu o pouhá 3 %, což je v rámci přijatelné tolerance. Největší odchylka je na energiích (+8 %), ale je kompenzována úsporou na materiálu (−5 %).

*Indikátory:*

- ✓ Celková odchylka +3 % (tolerance 10 %)
- ✓ Žádné středisko nepřekročilo 15 %
- ✓ Pozitivní trend — odchylka klesá
- ✓ Forecast do konce roku: +2.1 %

*Doporučené akce:*

1. Pokračovat v měsíčním monitoringu
2. Zvážit úpravu rozpočtu energií pro Q3
3. Připravit kvartální report pro management

#### ❌ Rizikový stav

**Rozpočet výrazně překročen**

Skutečné náklady převyšují plán o 28 %. Hlavní příčiny: neplánovaná investice do IT infrastruktury, překročení mzdových nákladů kvůli přesčasům a nečekaná oprava budovy.

*Indikátory:*

- ✗ Celková odchylka −28 % (3× nad tolerancí)
- ✗ 3 střediska překročila rozpočet o > 30 %
- ✗ Trend se zhoršuje třetí měsíc v řadě
- ✗ Forecast: −34 % do konce roku

*Nápravná opatření:*

1. Okamžitá schůzka s managementem — přehodnocení rozpočtu
2. Zmrazení neurgentních výdajů
3. Identifikace kompenzačních úspor
4. Aktualizace forecastu s realistickými čísly

**Související analýzy:** 2-02, 2-04, 2-06, 1-02

---

### 2-02 — Klouzavé prognózy

**Zdroj:** historie úprav

| | |
|---|---|
| **Frekvence** | Měsíčně (rolling 12M) |
| **Automatizace** | 70 % automatizováno |
| **Business impact** | Vysoký — kvalita strategických rozhodnutí |
| **Status** | Produkce |

**Popis:**

Klouzavý (rolling) forecast nahrazuje statický roční rozpočet — každý měsíc se aktualizuje na 12 měsíců dopředu. Analýza stability prognózy odhaluje kvalitu plánování: pokud se forecast dramaticky mění měsíc od měsíce, plánovací proces je neřízený.

**Metodologie:**

Verzování forecastů (v1, v2, v3…) v ERP rozpočtovém modulu. Forecast accuracy = |skutečnost − forecast| / skutečnost. Forecast stability = std(verze) / mean(verze). Porovnání forecast_v1 (před 3 měsíci) vs. aktuální skutečnost.

**Datové vstupy:**

- ERP rozpočtový modul — historie verzí
- Skutečné obraty z účetního systému
- Timesheety pro kapacitní forecast
- Pipeline z CRM
- Sezónní koeficienty z historie

**Výstupní metriky:**

- Forecast accuracy (%)
- Forecast stability (σ/μ)
- Počet reforecastů za měsíc
- Maximální změna verze v3 vs. v1 (%)
- Bias — systematicky příliš optimistický / pesimistický

#### ✅ Dobrý stav

**Stabilní a přesný forecast**

Forecast se mezi verzemi mění jen o jednotky procent, skutečnost v rozpětí ±5 % od forecastu z před 3 měsíci, plánovací proces zralý.

*Indikátory:*

- ✓ v3 − v1 = 4 %
- ✓ Forecast accuracy 96 %
- ✓ 1 reforecast měsíčně
- ✓ Bias < 2 %

*Doporučené akce:*

1. Pokračovat v měsíční kadenci
2. Prezentovat metodiku boardu

#### ❌ Rizikový stav

**Nestabilní forecast**

Verze forecastu se liší o 30%+, plánovač nevěří vlastním číslům, board nemůže dělat rozhodnutí.

*Indikátory:*

- ✗ Reforecast +30 % měsíčně
- ✗ Accuracy 62 %
- ✗ 4 reforecasty/měsíc
- ✗ Systematický pozitivní bias

*Nápravná opatření:*

1. Workshop plánovacího procesu
2. Identifikovat zdroje nejistoty
3. Zavést scenario planning
4. Vyměnit plánovače

**Související analýzy:** 2-01, 2-06, 11-05

---

### 2-03 — Dohady (accruals)

**Zdroj:** modul dohadů

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 80 % automatizováno |
| **Business impact** | Střední — zkreslení účetních výkazů |
| **Status** | Produkce |

**Popis:**

Sledování dohadných položek (účet 389/388) podle § 19 ZoÚ — náklady/výnosy, ke kterým nebyla přijata faktura. Systém monitoruje stáří dohadů a jejich párování se skutečnými fakturami. Staré nepárované dohady signalizují buď chybu v ocenění, nebo zapomenuté položky.

**Metodologie:**

Evidence dohadů v ERP modulu. Pro každý dohad: created_at, amount, description, expected_invoice_date. Párování s přijatými fakturami (fuzzy match dodavatel + částka ±10 %). Aging: 0-30, 31-90, 90+ dní. Automatické upozornění nad 90 dní.

**Datové vstupy:**

- ERP modul dohadů (accrual_items)
- Přijaté faktury (supplier_invoices)
- Smlouvy a objednávky
- Historické vzory dohadů
- DocuWare — očekávané doklady

**Výstupní metriky:**

- Suma aktivních dohadů (Kč)
- Počet dohadů > 90 dní
- Průměrná doba páru dohad → faktura
- Přesnost odhadu (actual vs. accrual)
- Top 5 dodavatelů dle objemu dohadů

#### ✅ Dobrý stav

**Kontrolované dohady**

Všechny dohady jsou spárované s fakturami do 60 dnů, odchylka odhad vs. skutečnost pod 5 %, žádné dohady starší 6 měsíců.

*Indikátory:*

- ✓ 0 dohadů > 90 dní
- ✓ Přesnost 96 %
- ✓ Průměrný pár 42 dní
- ✓ 0 zapomenutých

*Doporučené akce:*

1. Pokračovat v měsíční kontrole
2. Kalibrovat odhady

#### ❌ Rizikový stav

**Zapomenuté staré dohady**

3 dohady za 890K jsou starší 6 měsíců bez párování — možné duplicitní zaúčtování nebo chybné ocenění. Zkreslují výsledek hospodaření.

*Indikátory:*

- ✗ 3 dohady > 180 dní
- ✗ 890K nepárováno
- ✗ Přesnost 68 %
- ✗ Chybí dodavatelská komunikace

*Nápravná opatření:*

1. Kontaktovat dodavatele pro faktury
2. Revize oprávněnosti dohadu
3. Rozpuštění do výsledku pokud neopodstatněný
4. Zlepšit proces workflow přijatých faktur

**Související analýzy:** 1-02, 11-10

---

### 2-04 — Marže po projektech

**Zdroj:** výnosy vs. výkazy

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 75 % automatizováno |
| **Business impact** | Vysoký — priorizace portfolia |
| **Status** | Produkce |

**Popis:**

Projektová kontribuce — výpočet marže na úrovni jednotlivých projektů/zakázek. Kombinace fakturovaných výnosů a skutečných nákladů (timesheety × sazba + přímé výdaje + alokovaný overhead). Identifikace ztrátových projektů a benchmarking.

**Metodologie:**

Pro každý projekt: Marge = (výnosy − přímé náklady − alokovaný OH) / výnosy. Timesheety Caflou/Jira × hourly rate zaměstnance. Alokace overheadu dle klíče (hodiny, výnos, plocha). Segmentace projektů po typech, velikosti, týmu.

**Datové vstupy:**

- Fakturace po projektech (ERP)
- Timesheety Caflou / Jira (GET /timesheet/entries)
- Hourly rates zaměstnanců
- Přímé projektové náklady
- Overhead alokační klíč

**Výstupní metriky:**

- Marže po projektech (%)
- Průměr / medián / minimum marže
- Počet ztrátových projektů
- Top 10 nejziskovějších / nejztrátovějších
- Marže podle project managera

#### ✅ Dobrý stav

**Zdravé projektové marže**

Průměrná marže 34 %, minimum nad 18 %, žádný projekt ve ztrátě, konzistentní napříč týmy.

*Indikátory:*

- ✓ Průměr 34 %
- ✓ Min 18 %
- ✓ 0 ztrátových
- ✓ σ mezi PM = 4 %

*Doporučené akce:*

1. Benchmark dalších projektů
2. Bonusy nejlepším PM

#### ❌ Rizikový stav

**Ztrátové projekty**

2 projekty s marží pod 5 % (jeden dokonce −8 %), scope creep bez change requestu, neúčtovaný overtime.

*Indikátory:*

- ✗ 2 projekty < 5 %
- ✗ 1 projekt marže −8 %
- ✗ Scope creep bez CR
- ✗ Overtime neúčtován

*Nápravná opatření:*

1. Project recovery plan
2. Jednání s klientem o cenové úpravě
3. Zavést schvalovací proces pro CR
4. Stop-loss — ukončit projekt

**Související analýzy:** 9-01, 9-07, 2-01

---

### 2-05 — Interní přefakturace

**Zdroj:** mezistřediskové doklady

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 80 % automatizováno |
| **Business impact** | Vysoký — TP riziko + reporting |
| **Status** | Produkce |

**Popis:**

Evidence a kontrola interních přefakturací mezi středisky/entitami. Důležité pro správné projektové P&L i pro transfer pricing u skupinových transakcí. Nezaúčtované interní transakce zkreslují segmentový reporting.

**Metodologie:**

Mezistřediskové doklady evidovány jako dvoustranné operace: středisko A (náklad), středisko B (výnos). Cross-check SUM(A) = SUM(B). Eliminace při konsolidaci. Pro TP dokumentace: porovnání s arm's length cenami.

**Datové vstupy:**

- ERP mezistřediskové doklady
- Plán sdílených služeb (alokační klíče)
- Smlouvy o sdílení služeb (SLA)
- TP dokumentace (pro skupinu)
- Nákladová struktura středisek

**Výstupní metriky:**

- Objem interních přefakturací (Kč)
- Nespárované transakce (Kč)
- Eliminační rozdíl
- Marže interních služeb (%)
- Top 3 interní dodavatelé / odběratelé

#### ✅ Dobrý stav

**Vyrovnané interní toky**

Všechny mezistřediskové transakce spárované, eliminace sedí, arm's length podloženo TP dokumentací.

*Indikátory:*

- ✓ 0 nespárovaných
- ✓ Eliminace sedí
- ✓ TP dokumentace OK
- ✓ Arm's length potvrzeno

*Doporučené akce:*

1. Archivovat TP reporty
2. Měsíční review

#### ❌ Rizikový stav

**Nezaúčtované interní transakce**

210K nezaúčtováno jedno-stranně — zkresluje výsledky středisek, riziko při auditu, problém pro TP dokumentaci.

*Indikátory:*

- ✗ 210K nespárováno
- ✗ Chybí TP dokumentace
- ✗ Segmentový report nesedí
- ✗ Riziko TP doměrku

*Nápravná opatření:*

1. Okamžitě doúčtovat
2. Aktualizovat TP dokumentaci
3. Revize interních smluv
4. Konzultace s TP specialistou

**Související analýzy:** 5-02, 2-04

---

### 2-06 — Predikce cash flow

**Zdroj:** splatnosti + vzorce

| | |
|---|---|
| **Frekvence** | Týdně (13-week rolling) |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Kritický — přežití firmy |
| **Status** | Produkce |

**Popis:**

13-week rolling cash flow forecast kombinující smluvní splatnosti, historické platební chování a sezónní vzorce. Kritický nástroj treasury — umožňuje včasnou reakci na hrozící cash gap.

**Metodologie:**

Pro každou pohledávku: expected_payment_date = due_date + avg_delay(customer). Pro závazky: plánované platby dle DPP. Sezónní koeficienty. Monte Carlo simulace pro confidence intervals. Daily cash position = starting + inflows − outflows.

**Datové vstupy:**

- Saldokonto pohledávek (splatnosti)
- Saldokonto závazků
- Historické platební chování klientů
- Fixní platby (mzdy, nájmy, úvěry)
- Bankovní zůstatky (FIO, KB, ČSOB API)

**Výstupní metriky:**

- Denní cash position po 90 dní
- Minimum cash za horizont (Kč)
- Datum nejnižšího zůstatku
- Confidence interval (P10, P90)
- Dny do cash-out v nejhorším scénáři

#### ✅ Dobrý stav

**Zdravá likviditní pozice**

CF forecast pozitivní ve všech horizontech (30/60/90 dní), minimum 1.2M, dostatečný buffer.

*Indikátory:*

- ✓ CF +30/+60/+90 dní pozitivní
- ✓ Min 1.2M Kč
- ✓ Buffer 45 dní operativních nákladů
- ✓ P10 scénář stále kladný

*Doporučené akce:*

1. Termínovaný vklad přebytku
2. Vyjednat lepší podmínky úvěru

#### ❌ Rizikový stav

**Hrozící cash gap**

Za 47 dní záporný zůstatek, při neočekávaném výpadku platby již za 21 dní. Nutná okamžitá akce.

*Indikátory:*

- ✗ Cash gap za 47 dní
- ✗ P10 scénář: gap za 21 dní
- ✗ Buffer jen 8 dní
- ✗ Kontokorent z 87 %

*Nápravná opatření:*

1. Zrychlit inkaso pohledávek
2. Jednat s bankou o kontokorentu
3. Odložit nepriorizené výdaje
4. Faktoring vybraných pohledávek

**Související analýzy:** 1-03, 1-04, 2-02

---

### 2-07 — True cost to serve

**Zdroj:** timesheety × sazba

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 75 % automatizováno |
| **Business impact** | Vysoký — portfolio optimalizace |
| **Status** | Produkce |

**Popis:**

Skutečná nákladová cena obsluhy klienta = timesheety všech zaměstnanců × interní sazby + přímé náklady + alokovaný overhead. Odhaluje klienty, kteří vypadají ziskově podle fakturace, ale ve skutečnosti generují ztrátu díky vysoké servisní zátěži.

**Metodologie:**

Per-klient agregace: SUM(timesheet_hours × employee_rate) + direct_costs + overhead_allocation. Porovnání s měsíční fakturací. True margin = (revenue − true_cost) / revenue. Identifikace 'scope creep' klientů.

**Datové vstupy:**

- Timesheety (Caflou API, Jira worklog)
- Hourly rates zaměstnanců
- Fakturace klientovi (ERP)
- Přímé klientské náklady (cestovné, licence)
- Overhead allocation klíč

**Výstupní metriky:**

- True cost per klient (Kč/měsíc)
- Revenue per klient (Kč/měsíc)
- True margin (%)
- Hours per tisíc výnosů
- Top 10 ztrátových vs. ziskových klientů

#### ✅ Dobrý stav

**Efektivní obsluha klienta**

Klient stojí 8.2K měsíčně, generuje 14K — marže 41 %, timesheety odpovídají scope, žádný nekompenzovaný overtime.

*Indikátory:*

- ✓ True cost 8.2K
- ✓ Revenue 14K
- ✓ Marže 41 %
- ✓ Scope dodržen

*Doporučené akce:*

1. Udržet stávající pricing
2. Prezentovat hodnotu klientovi

#### ❌ Rizikový stav

**Klient v hluboké ztrátě**

Klient stojí 22K měsíčně (hodně hodin top seniorů), platí 9K. Scope creep, neustálé urgentní požadavky. Marže −144 %.

*Indikátory:*

- ✗ True cost 22K
- ✗ Revenue 9K
- ✗ Marže −144 %
- ✗ Scope creep +60 %

*Nápravná opatření:*

1. Renegociace smlouvy (revize sazeb)
2. Přeúčtování overtime
3. Downgrade služeb na fix scope
4. Offboarding klienta

**Související analýzy:** 9-01, 9-02, 9-07

---

<a id="sekce-3"></a>

## Sekce 3: Mzdy a personální data

### 3-01 — Mzdové náklady

**Zdroj:** mzdový modul

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Vysoký — personální náklady jsou typicky největší položkou |
| **Status** | Produkce |

**Popis:**

Analýza poměru mzdových nákladů k tržbám je klíčovým ukazatelem efektivity lidských zdrojů. Sledujeme nejen celkový poměr, ale i jeho vývoj v čase, srovnání s oborem a strukturu mzdových nákladů (základní mzda, příplatky, přesčasy, benefity).

Systém automaticky agreguje data z mzdového modulu a porovnává je s tržbami z fakturace. Výsledky jsou segmentovány podle středisek, projektů a typů zaměstnanců.

Kritickým aspektem je identifikace neefektivit — například přesčasy, které nevytváří odpovídající hodnotu, nebo nerovnoměrné rozložení práce mezi zaměstnanci.

**Metodologie:**

Poměrová analýza mzdových nákladů vs. tržby s rozpadem na komponenty: 1) Základní mzdy, 2) Příplatky a přesčasy, 3) Odvody (SP, ZP), 4) Benefity. Benchmark vůči oboru (NACE kód). Trend analýza 12 měsíců. Alert při překročení oborového průměru o > 15 %.

**Datové vstupy:**

- Mzdové záznamy z ERP
- Tržby z fakturačního modulu
- Docházka a přesčasy
- Oborové benchmarky (ČSÚ)
- Struktura benefitů

**Výstupní metriky:**

- Poměr mzdových nákladů / tržby (%)
- Mzdový náklad na zaměstnance
- Přesčasová složka jako % celku
- Srovnání s oborovým průměrem
- Predikce na následující kvartál

#### ✅ Dobrý stav

**Efektivní mzdové náklady**

Mzdové náklady tvoří 32 % tržeb, což je pod oborovým průměrem 38 %. Struktura je zdravá — přesčasy tvoří jen 4 % celku, benefity jsou cílené a efektivní.

*Indikátory:*

- ✓ 32 % tržeb (obor: 38 %)
- ✓ Přesčasy jen 4 % mzdových nákladů
- ✓ Rovnoměrné rozložení mezi zaměstnanci
- ✓ Trend stabilní 6 měsíců

*Doporučené akce:*

1. Udržovat aktuální úroveň
2. Zvážit investici do rozvoje zaměstnanců
3. Připravit benchmarkový report pro klienta

#### ❌ Rizikový stav

**Neudržitelné mzdové náklady**

Mzdové náklady dosáhly 58 % tržeb, což je 20 bodů nad oborovým průměrem. Hlavní příčiny: nekontrolované přesčasy (18 % celku), neefektivní alokace zaměstnanců a vysoká fluktuace vyžadující náborové náklady.

*Indikátory:*

- ✗ 58 % tržeb (obor: 38 % — překročení o 20 b.)
- ✗ Přesčasy 18 % mzdových nákladů
- ✗ 3 zaměstnanci s 50 %+ přesčasovou složkou
- ✗ Fluktuace 24 % ročně

*Nápravná opatření:*

1. Audit vytíženosti zaměstnanců
2. Přehodnotit organizační strukturu
3. Implementovat systém řízení přesčasů
4. Zvážit outsourcing non-core aktivit

**Související analýzy:** 3-02, 3-07, 3-08, 11-06

---

### 3-02 — Výpočet mezd

**Zdroj:** docházka + smlouvy

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Kritický — zákonná povinnost + důvěra zaměstnanců |
| **Status** | Produkce |

**Popis:**

Měsíční výpočet mezd v systému Vema/Nugget na základě docházky (Anet), pracovních smluv a kolektivní smlouvy. Systém validuje správnost výpočtu oproti pravidlům zákoníku práce (zákon 262/2006 Sb.) a detekuje potřebu dodatečných přepočtů.

**Metodologie:**

Import docházky z Anet API /attendance/monthly → Vema mzdový engine. Validace: minimální mzda (§ 111 ZP), příplatky za přesčas (§ 114), noční práci (§ 116), víkend (§ 118). Cross-check brutto × koeficient → netto. Detekce anomálií oproti minulému měsíci (>10 % odchylka).

**Datové vstupy:**

- Anet docházkový systém (REST API)
- Pracovní smlouvy a dodatky
- Kolektivní smlouva
- Sazebník příplatků
- Historie mezd 12 měsíců

**Výstupní metriky:**

- Počet chybných výpočtů
- Počet přepočtů (opravných)
- Průměrná odchylka oproti minulému měsíci (%)
- Čas zpracování mzdového období (h)
- Compliance score (§ ZP)

#### ✅ Dobrý stav

**Bezchybný výpočet mezd**

Všechny mzdy vypočítány správně na první pokus, 0 reklamací od zaměstnanců, podání včas.

*Indikátory:*

- ✓ 0 chyb
- ✓ 0 reklamací
- ✓ Podáno do 10.
- ✓ 100 % ZP compliance

*Doporučené akce:*

1. Archivovat výplatní listiny
2. Měsíční report klientovi

#### ❌ Rizikový stav

**Opakované přepočty**

3 přepočty v jednom měsíci — chybná docházka, neaktualizovaný sazebník, neplatný dodatek ke smlouvě.

*Indikátory:*

- ✗ 3 přepočty
- ✗ 5 reklamací
- ✗ Opožděné podání
- ✗ Chybějící dodatky

*Nápravná opatření:*

1. Audit docházky Anet
2. Aktualizace master dat (smlouvy)
3. Školení mzdové účetní
4. Revize workflow

**Související analýzy:** 3-05, 3-07, 3-08

---

### 3-03 — Exekuční srážky

**Zdroj:** API justice.cz

| | |
|---|---|
| **Frekvence** | Denně (ISIR monitoring) |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Vysoký — zákonná povinnost + ručení |
| **Status** | Produkce |

**Popis:**

Monitoring ISIR (Insolvenční rejstřík) a Centrální evidence exekucí justice.cz pro zaměstnance. Automatické nastavení srážek dle OSŘ § 276 a oznámení zaměstnavatele dle § 294a OSŘ. Nesrážení podléhá sankcím a plátce může ručit za neodvedené částky.

**Metodologie:**

Denní dávkový dotaz na ISIR API (justice.cz/isir/isir.ws) a CEE pro všechny zaměstnance podle rodného čísla. Nové záznamy → workflow: 1) verifikace, 2) výpočet nezabavitelné částky, 3) oznámení zaměstnavateli, 4) nastavení srážky v mzdě, 5) odvody oprávněným.

**Datové vstupy:**

- ISIR API justice.cz/isir/isir.ws (SOAP)
- CEE — Centrální evidence exekucí
- Zaměstnanci z Vema (rodné čísla)
- Usnesení soudu / exekuční příkaz
- Nezabavitelná částka (vyhláška MSp)

**Výstupní metriky:**

- Počet aktivních exekucí
- Počet nových za měsíc
- Celková srážka (Kč)
- Počet věřitelů
- Compliance status oznámení § 294a

#### ✅ Dobrý stav

**Čistý profil zaměstnanců**

Žádné nové exekuce, stávající exekuce řádně spravovány, všechny odvody včas.

*Indikátory:*

- ✓ 0 nových exekucí
- ✓ Odvody včas
- ✓ Oznámení § 294a OK
- ✓ 0 sankcí

*Doporučené akce:*

1. Pokračovat v denním monitoringu
2. Měsíční report

#### ❌ Rizikový stav

**Nové exekuce v ISIR**

2 zaměstnanci nově v ISIR — nutné okamžité nastavení srážek, riziko duplicitní exekuce, možné HR implikace (trust-based pozice).

*Indikátory:*

- ✗ 2 nové v ISIR
- ✗ Chybí usnesení
- ✗ Riziko duplicitní srážky
- ✗ HR review nutný

*Nápravná opatření:*

1. Dohledat usnesení soudu
2. Vypočítat nezabavitelnou částku
3. Oznámit § 294a OSŘ do 8 dnů
4. HR konzultace pro citlivé role

**Související analýzy:** 10-03, 10-09

---

### 3-04 — eNeschopenky

**Zdroj:** ČSSZ e-Podání

| | |
|---|---|
| **Frekvence** | Real-time + denní kontrola |
| **Automatizace** | 98 % automatizováno |
| **Business impact** | Vysoký — zákonná povinnost + rychlost |
| **Status** | Produkce |

**Popis:**

Real-time napojení na ČSSZ e-Podání pro automatický příjem eNeschopenek. Od 2020 (zákon 259/2017 Sb.) povinná elektronická forma. Systém přijímá notifikace o začátku, pokračování a ukončení DPN a automaticky nastavuje náhradu mzdy dle § 192 ZP.

**Metodologie:**

ČSSZ e-Podání webhook na endpoint /api/eneschopenky/receive. Pro každou DPN: match podle rodného čísla, kontrola karenční doby (první 3 dny bez náhrady), výpočet náhrady (60 % z redukovaného průměrného výdělku). Handoff do Vema mzdového enginu.

**Datové vstupy:**

- ČSSZ e-Podání API (webhook)
- Zaměstnanci Vema
- Historie DPN zaměstnance
- Průměrný výdělek (poslední 12 M)
- Redukční hranice ČSSZ

**Výstupní metriky:**

- Počet aktivních DPN
- Průměrná délka DPN (dny)
- Náhrada mzdy celkem (Kč)
- Delay registrace (dny)
- Frekvence DPN per zaměstnanec

#### ✅ Dobrý stav

**Real-time příjem eNeschopenek**

Všechny DPN přijaty do 5 minut od vystavení, 2 aktivní případy, náhrada mzdy správně vypočtena.

*Indikátory:*

- ✓ Real-time příjem
- ✓ 2 aktivní DPN
- ✓ Správná náhrada
- ✓ 0 delay

*Doporučené akce:*

1. Měsíční report
2. Pokračovat v monitoringu

#### ❌ Rizikový stav

**Neregistrovaná eNeschopenka**

DPN nezaregistrována 5 dní — webhook nefunguje, zaměstnanec nedostal náhradu, riziko stížnosti.

*Indikátory:*

- ✗ Delay 5 dnů
- ✗ Náhrada neproplacena
- ✗ Stížnost zaměstnance
- ✗ Webhook down

*Nápravná opatření:*

1. Obnovit ČSSZ webhook connection
2. Manuální import zpětně
3. Doplatit náhradu s úroky
4. Monitoring webhook uptime

**Související analýzy:** 3-02, 3-05

---

### 3-05 — ELDP, ONZ

**Zdroj:** mzdový engine

| | |
|---|---|
| **Frekvence** | Průběžně (ONZ) + ročně (ELDP) |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Vysoký — zákonná povinnost + sankce |
| **Status** | Produkce |

**Popis:**

Evidenční list důchodového pojištění (ELDP) a Oznámení o nástupu/ukončení zaměstnání (ONZ) dle zákona 582/1991 Sb. Elektronické podání na ČSSZ přes e-Podání do 8 dnů od události (ONZ) a do 30. 4. následujícího roku (ELDP).

**Metodologie:**

Trigger events: nástup/výstup zaměstnance → ONZ XML. Roční: ELDP XML se všemi zaměstnanci. Validace XSD, elektronický podpis kvalifikovaný certifikát (Česká pošta / PostSignum). Podání přes ČSSZ e-Podání portál s potvrzením o přijetí.

**Datové vstupy:**

- Vema mzdový engine (nástupy/výstupy)
- Pracovní smlouvy
- Roční data o pojistném (ELDP)
- Kvalifikovaný certifikát
- ČSSZ e-Podání API

**Výstupní metriky:**

- Počet ONZ podání
- Počet podání po termínu
- Delay vs. zákonný termín (dny)
- Pokuty (Kč)
- % úspěšných podání (bez vrácení)

#### ✅ Dobrý stav

**Včasná podání ELDP/ONZ**

Všechna podání do 8 dnů (ONZ) nebo do 20. měsíce, 100 % přijato ČSSZ napoprvé, 0 pokut.

*Indikátory:*

- ✓ 100 % včas
- ✓ 0 pokut
- ✓ Podáno do 20.
- ✓ 0 vrácených

*Doporučené akce:*

1. Archivovat potvrzení
2. Měsíční report

#### ❌ Rizikový stav

**Podání po termínu**

ONZ podáno 15 dní po termínu — pokuta dle § 22 zákona 582/1991 Sb. až 50K Kč.

*Indikátory:*

- ✗ +15 dní delay
- ✗ Pokuta 20K
- ✗ Vrácené XML
- ✗ Chybný podpis

*Nápravná opatření:*

1. Okamžitě podat s vysvětlením
2. Požádat o prominutí
3. Audit workflow podání
4. Obnovit certifikát

**Související analýzy:** 3-02, 3-04

---

### 3-06 — Predikce fluktuace

**Zdroj:** docházka + nástupy/výstupy

| | |
|---|---|
| **Frekvence** | Měsíčně (scoring), týdně (alerty) |
| **Automatizace** | 80 % automatizováno |
| **Business impact** | Vysoký — retention top performerů |
| **Status** | Pilot |

**Popis:**

ML model predikce odchodu zaměstnance (XGBoost) kombinuje 30+ feature: délka zaměstnání, mzdový vývoj, docházka (prodloužené víkendy), přesčasy, frekvence DPN, zapojení do projektů. Model predikuje pravděpodobnost odchodu v příštích 3/6/12 měsících.

**Metodologie:**

Feature engineering z Vema + Anet + Jira + Slack metadata. Training: historie odchodů 3 roky, positive class = výstup do 6 měsíců. XGBoost classifier, SHAP values pro vysvětlitelnost. Threshold 0.7 → aktivní retention intervention.

**Datové vstupy:**

- Vema HR data (mzda, pozice, tenure)
- Anet docházka (overtime, prodloužené víkendy)
- Jira aktivita (tickety, code commits)
- Slack metadata (hours, channels)
- Historie výstupů 3 roky

**Výstupní metriky:**

- Churn probability per zaměstnanec (%)
- Počet high-risk (>70 %)
- SHAP top features (proč)
- Predicted attrition rate (%)
- ROI retention akcí

#### ✅ Dobrý stav

**Stabilní tým**

0 zaměstnanců nad threshold 70 %, průměrná churn probability pod oborovým průměrem (12 %).

*Indikátory:*

- ✓ 0 high-risk
- ✓ Avg 8 %
- ✓ Pod oborem
- ✓ Žádné negativní trendy

*Doporučené akce:*

1. Pokračovat v retention
2. Kvartální revize modelu

#### ❌ Rizikový stav

**Vlna odchodů hrozí**

3 zaměstnanci s pravděpodobností 78 %+ — top features: overtime 60h+/měsíc, stagnace mzdy 18M, redukce Jira aktivity.

*Indikátory:*

- ✗ 3 × 78 %+
- ✗ Overtime 60h+
- ✗ Stagnace mzdy
- ✗ Pokles aktivity

*Nápravná opatření:*

1. 1-on-1 s manažerem do 1 týdne
2. Retention nabídka (mzda/projekt)
3. Redistribuce overtime
4. Career development plan

**Související analýzy:** 3-07, 11-06

---

### 3-07 — Detekce přesčasů

**Zdroj:** docházka vs. ZP

| | |
|---|---|
| **Frekvence** | Týdně |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Kritický — compliance + zdraví zaměstnanců |
| **Status** | Produkce |

**Popis:**

Automatická kontrola docházky proti limitům zákoníku práce § 93 (max 8 h/týden průměrně, celkem max 150 h/rok, výjimečně 416 h). Překročení znamená porušení ZP, riziko inspekce práce (SÚIP) a pokut až 2M Kč.

**Metodologie:**

Anet API /attendance/overtime → týdenní a roční agregace per zaměstnanec. Rolling average 26 týdnů pro 8 h limit. Detekce: 1) týdenní > 12 h, 2) rolling avg > 8 h, 3) roční > 150 h (bez dohody), 4) roční > 416 h (absolutní strop § 93a).

**Datové vstupy:**

- Anet docházkový systém
- Pracovní smlouvy (úvazek, typ práce)
- Dohody o práci přesčas (§ 93a)
- Kolektivní smlouva (limity)
- Rozvržení pracovní doby

**Výstupní metriky:**

- Přesčasy per zaměstnanec (h/týden, h/rok)
- Počet porušení § 93
- Rolling avg 26 týdnů
- Distribuce přesčasů (histogram)
- SÚIP risk score

#### ✅ Dobrý stav

**Přesčasy pod limitem ZP**

Průměr 2 h/týden napříč firmou, 0 porušení § 93, kompenzace náhradním volnem nebo příplatkem 25 %.

*Indikátory:*

- ✓ Avg 2 h/týden
- ✓ 0 porušení § 93
- ✓ Kompenzace OK
- ✓ SÚIP risk low

*Doporučené akce:*

1. Pokračovat v monitoringu
2. Roční review

#### ❌ Rizikový stav

**Porušení zákoníku práce**

1 zaměstnanec 68 h/týden (tj. 28 h přesčasu) — porušení § 93 a § 93a. SÚIP kontrola by znamenala pokutu až 2M.

*Indikátory:*

- ✗ 68 h/týden
- ✗ Rolling avg 22 h
- ✗ Porušení § 93
- ✗ Riziko SÚIP 2M

*Nápravná opatření:*

1. Okamžitě snížit úvazek
2. Přijmout výpomoc
3. Kompenzovat náhradním volnem
4. Audit rozvržení práce

**Související analýzy:** 3-02, 3-06, 11-06

---

### 3-08 — Efektivní hodinová mzda

**Zdroj:** mzdy/hodiny

| | |
|---|---|
| **Frekvence** | Kvartálně |
| **Automatizace** | 80 % automatizováno |
| **Business impact** | Vysoký — riziko žalob + reputace |
| **Status** | Pilot |

**Popis:**

Výpočet efektivní hodinové mzdy (brutto / odpracované hodiny) pro stejné pozice a detekce nepřiměřeného rozptylu. Antidiskriminační zákon 198/2009 Sb. vyžaduje stejnou odměnu za stejnou práci (pay gap). Evropská směrnice 2023/970 o transparentnosti mezd zvyšuje reporting.

**Metodologie:**

Per pozice: effective_hourly = brutto / (fund prac. doby − absence). Grupy: job_title + seniority + region. Coefficient of variation (σ/μ) per grupa. Gender pay gap: (avg_male − avg_female) / avg_male. Regression adjusted pro senioritu a výkon.

**Datové vstupy:**

- Vema mzdy (brutto)
- Anet docházka (odpracované h)
- Pracovní pozice (job title + seniority)
- Gender, region, tenure
- Performance reviews

**Výstupní metriky:**

- Rozptyl CV per pozice (%)
- Gender pay gap (%)
- Regression-adjusted gap
- Počet pozic s CV > 20 %
- Outliers (>2σ od mediánu)

#### ✅ Dobrý stav

**Férové mzdy**

Rozptyl 8 % je vysvětlitelný seniority a performance, gender gap pod 3 %, connected to EU directive 2023/970 reporting.

*Indikátory:*

- ✓ CV 8 %
- ✓ Gender gap 2.1 %
- ✓ 0 neodůvodněných outliers
- ✓ EU directive OK

*Doporučené akce:*

1. Roční pay equity audit
2. Report boardu

#### ❌ Rizikový stav

**Diskriminační rozptyl**

CV 45 % na stejné pozici, gender gap 18 %, riziko žaloby dle antidiskriminačního zákona.

*Indikátory:*

- ✗ CV 45 %
- ✗ Gender gap 18 %
- ✗ 5 outliers
- ✗ Žaloby riziko

*Nápravná opatření:*

1. Okamžité pay equity audit
2. Plán narovnání mezd (12 měsíců)
3. Transparentnost pásem
4. Konzultace s právníkem

**Související analýzy:** 3-02, 3-06

---

### 3-09 — Šifrované výplatní pásky

**Zdroj:** kanál

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Kritický — GDPR compliance |
| **Status** | Produkce |

**Popis:**

Výplatní pásky obsahují osobní údaje (mzda, rodné číslo, srážky, exekuce) a musí být předávány šifrovaně dle GDPR čl. 32. Systém monitoruje kanály doručení (email, portál, tisk) a vynucuje šifrování PDF heslem / via self-service portál.

**Metodologie:**

Pro každou výplatní pásku: delivery_channel (email/portal/print), encryption_status. Email: povinné AES-256 PDF heslo (rodné číslo + PIN). Portal: HTTPS + SSO. Audit trail doručení. GDPR compliance check před odesláním.

**Datové vstupy:**

- Vema mzdový engine (výplatní pásky)
- Employee self-service portal logs
- Email server (audit doručení)
- GDPR role + oprávnění
- PDF encryption status

**Výstupní metriky:**

- % šifrovaně doručených
- Počet nešifrovaných (incidenty)
- Channel mix (email/portal/print)
- GDPR compliance score
- Open rate self-service portal

#### ✅ Dobrý stav

**100 % šifrované doručení**

Všechny pásky přes self-service portál nebo AES-256 PDF, 0 incidentů, GDPR compliance 100 %.

*Indikátory:*

- ✓ 100 % šifrovaně
- ✓ 0 incidentů
- ✓ Portal adoption 87 %
- ✓ GDPR OK

*Doporučené akce:*

1. Pokračovat v monitoringu
2. Zvýšit adoption portálu

#### ❌ Rizikový stav

**GDPR porušení — nešifrované pásky**

12 % pásek posíláno nešifrovaným emailem — porušení GDPR čl. 32, riziko pokuty až 4 % obratu nebo 20M EUR.

*Indikátory:*

- ✗ 12 % nešifrovaně
- ✗ 15 incidentů
- ✗ GDPR breach
- ✗ Riziko pokuty ÚOOÚ

*Nápravná opatření:*

1. Okamžitě zavést PDF encryption
2. Notifikace ÚOOÚ do 72 h (čl. 33)
3. Migrace na self-service portál
4. GDPR training mzdové účetní

**Související analýzy:** 10-10, 3-02

---

### 3-10 — Roční zúčtování

**Zdroj:** prohlášení

| | |
|---|---|
| **Frekvence** | Ročně (leden-březen) |
| **Automatizace** | 75 % automatizováno |
| **Business impact** | Střední — spokojenost zaměstnanců |
| **Status** | Produkce |

**Popis:**

Roční zúčtování záloh daně z příjmů dle § 38ch ZDP — zaměstnanec žádá do 15. 2. následujícího roku, zaměstnavatel vypočítá a vrátí přeplatek / doplatek v březnové mzdě. Systém monitoruje progress sběru prohlášení a upozorňuje na zpoždění.

**Metodologie:**

Workflow: 1) prosinec — zaslání žádosti o prohlášení zaměstnancům, 2) sběr do 15. 2., 3) výpočet ročního zúčtování (slevy § 35ba, odpočty § 15), 4) vrácení přeplatku v březnové mzdě. Tracking completion rate per HR.

**Datové vstupy:**

- Zaměstnanci Vema
- Prohlášení poplatníka § 38k
- Doklady o odpočtech (hypotéka, dary, pojištění)
- Roční mzdová data
- ADIS API — potvrzení od zaměstnavatelů

**Výstupní metriky:**

- % zaměstnanců s prohlášením včas
- Celkový přeplatek / doplatek (Kč)
- Průměrná vratka per zaměstnanec (Kč)
- Počet zpožděných o 30+ dní
- Completion time (dny)

#### ✅ Dobrý stav

**Roční zúčtování dokončeno včas**

98 % prohlášení do 15. 2., zúčtování provedeno v březnové mzdě, průměrná vratka 3 200 Kč.

*Indikátory:*

- ✓ 98 % včas
- ✓ Vratka 3.2K
- ✓ Dokončeno v 3/2026
- ✓ 0 stížností

*Doporučené akce:*

1. Archivovat prohlášení 10 let
2. Roční report klientovi

#### ❌ Rizikový stav

**Masivní zpoždění prohlášení**

40 % prohlášení po termínu 15. 2. — komplikuje březnové mzdy, frustrace zaměstnanců čekajících na vratku, dodatečná práce mzdovky.

*Indikátory:*

- ✗ 40 % po termínu
- ✗ Stížnosti 12×
- ✗ Dopad na březnovou mzdu
- ✗ Chybí podklady

*Nápravná opatření:*

1. Automatizované reminder kampaně
2. Self-service portal pro upload
3. Prodloužený termín jednorázově
4. HR workshop zaměstnancům

**Související analýzy:** 3-02, 1-08

---

<a id="sekce-4"></a>

## Sekce 4: Německé daně a pendleři

### 4-01 — Steuererklärung

**Zdroj:** ELSTER

| | |
|---|---|
| **Frekvence** | Ročně (sezóna leden–červenec), monitoring průběžně |
| **Automatizace** | 75 % automatizováno |
| **Business impact** | Vysoký — přímý finanční dopad na klienty |
| **Status** | Produkce |

**Popis:**

Správa a podání německých daňových přiznání (Steuererklärung) pro pendlery a české firmy s aktivitami v Německu. Systém automatizuje přípravu, validaci a elektronické podání přes ELSTER a sleduje status každého přiznání až do jeho vyřízení.

Pro pendlery je klíčová správná aplikace smlouvy o zamezení dvojího zdanění (DBA) a optimální využití všech dostupných odpočtů — Werbungskosten, Pendlerpauschale, Sonderausgaben.

Systém monitoruje celý lifecycle přiznání: od sběru podkladů, přes validaci, podání, až po přijetí Steuerbescheidu a případné odvolání.

**Metodologie:**

End-to-end management: 1) Sběr podkladů (knihy jízd, potvrzení zaměstnavatele, doklady), 2) Validace kompletnosti vůči checklistu, 3) Výpočet daňové povinnosti s optimalizací, 4) Elektronické podání přes ELSTER API, 5) Monitoring statusu, 6) Porovnání Steuerbescheid vs. přiznání.

**Datové vstupy:**

- Potvrzení o příjmu (Lohnsteuerbescheinigung)
- Knihy jízd (GPS data)
- Doklady o výdajích (Werbungskosten)
- Rodinné údaje (Kindergeld, Kinderfreibetrag)
- ELSTER certifikáty a přihlašovací údaje

**Výstupní metriky:**

- Počet podaných přiznání
- % elektronicky podaných
- Průměrná refundace v EUR
- Počet zamítnutých / vrácených
- Průměrná doba vyřízení (dny)

#### ✅ Dobrý stav

**Bezchybné podání**

Všechna přiznání byla podána elektronicky přes ELSTER bez jediného zamítnutí. Průměrná refundace dosáhla 2 800 EUR díky optimálnímu využití odpočtů.

*Indikátory:*

- ✓ 100 % elektronicky podáno
- ✓ 0 zamítnutých přiznání
- ✓ Průměrná refundace 2 800 EUR
- ✓ Vše podáno min. 14 dní před termínem

*Doporučené akce:*

1. Aktualizovat šablony pro nový Steuerjahr
2. Ověřit platnost ELSTER certifikátů
3. Připravit přehled pro klienty

#### ❌ Rizikový stav

**Zamítnutá přiznání**

3 přiznání byla zamítnuta Finanzamtem — důvody: neplatný certifikát (1), chybějící Anlage N (1) a nesrovnalost v Pendlerpauschale (1). Klienti přicházejí o refundace v řádu tisíců EUR.

*Indikátory:*

- ✗ 3 zamítnutá přiznání
- ✗ 1 expirovaný ELSTER certifikát
- ✗ Průměrná ztracená refundace 1 900 EUR
- ✗ 2 přiznání podána po termínu

*Nápravná opatření:*

1. Okamžitě opravit a znovu podat zamítnutá přiznání
2. Obnovit expirované certifikáty
3. Prověřit checklist pro kompletnost podkladů
4. Implementovat automatickou validaci před podáním

**Související analýzy:** 4-02, 4-04, 4-11, 5-01

---

### 4-02 — Optimalizace odpočtů

**Zdroj:** knihy jízd

| | |
|---|---|
| **Frekvence** | Ročně (Einkommensteuer) + průběžně (GPS) |
| **Automatizace** | 80 % automatizováno |
| **Business impact** | Vysoký — přímá finanční úspora |
| **Status** | Produkce |

**Popis:**

Maximalizace německých daňových odpočtů pro pendlery (Entfernungspauschale 0,30 €/km do 20 km, 0,38 € nad 20 km; Werbungskosten, Verpflegungsmehraufwand). Systém z GPS knih jízd a docházkových dat automaticky generuje maximální oprávněné odpočty pro Einkommensteuererklärung.

**Metodologie:**

GPS API knihy jízd → extrakce denních tras domov-pracoviště. Výpočet: entfernungspauschale = min(km, 20) × 0,30 + max(km − 20, 0) × 0,38 × pracovní dny. Verpflegungsmehraufwand dle délky nepřítomnosti (8/24 h). Double-Haushaltsführung pro druhou domácnost.

**Datové vstupy:**

- GPS knihy jízd (Webfleet / Geotab API)
- Docházka pendlera
- Pracovní smlouva (Arbeitgeber, místo)
- Účty za bydlení v DE (Doppelte Haushaltsführung)
- ELSTER přiznání minulé roky

**Výstupní metriky:**

- Celkový odpočet (EUR)
- Entfernungspauschale (EUR)
- Refundace daně (EUR)
- Nevyužitý potenciál (EUR)
- Compliance s EStG § 9

#### ✅ Dobrý stav

**Maximalizovaná refundace**

Průměrná refundace 2 800 EUR, všechny odpočty využity, dokumentace GPS kompletní pro Finanzamt.

*Indikátory:*

- ✓ Refundace 2.8K EUR
- ✓ 0 nevyužitých odpočtů
- ✓ GPS kompletní
- ✓ EStG § 9 OK

*Doporučené akce:*

1. Pokračovat v GPS trackingu
2. Ročně podat ELSTER

#### ❌ Rizikový stav

**Nevyužitý daňový potenciál**

Nevyužitý odpočet 1 200 EUR — chybí GPS data, Doppelte Haushaltsführung nevyžádán, Verpflegung podceněn.

*Indikátory:*

- ✗ Nevyužito 1.2K EUR
- ✗ Chybí GPS 45 dní
- ✗ Doppelte Haushalt nevyužit
- ✗ Verpflegung 50 %

*Nápravná opatření:*

1. Doplnit GPS zpětně
2. Zpětné přiznání (4 roky)
3. Doložit doklady o druhé domácnosti
4. Konzultace daňového poradce DE

**Související analýzy:** 4-01, 4-08, 4-09

---

### 4-03 — Kindergeld

**Zdroj:** Familienkasse

| | |
|---|---|
| **Frekvence** | Měsíčně + změny v rodinném stavu |
| **Automatizace** | 75 % automatizováno |
| **Business impact** | Vysoký — benefit pro zaměstnance |
| **Status** | Produkce |

**Popis:**

Monitoring čerpání Kindergeld (250 €/dítě/měsíc) přes Familienkasse pro pendlery s dětmi. Nárok i pro děti žijící v ČR (EU koordinace SV). Systém identifikuje rodiny, které nárok nevyužívají, a automatizuje žádost přes Formular KG1.

**Metodologie:**

HR evidence pendlerů × počet dětí. Cross-check s Familienkasse statusem (per rodina). Pro nečerpající: generace KG1 formuláře + přílohy (rodný list, potvrzení o studiu). EU koordinace: pokud druhý rodič čerpá přídavky v ČR, rozdíl doplácí DE.

**Datové vstupy:**

- HR evidence pendlerů + rodinný stav
- Familienkasse API status
- Rodné listy dětí
- Potvrzení o studiu (do 25 let)
- EU formulář E411 (koordinace)

**Výstupní metriky:**

- Počet rodin čerpajících
- Počet nečerpajících
- Nevyužitá částka (EUR/měsíc)
- Čas do schválení (dny)
- Celkem získáno per pendler (EUR/rok)

#### ✅ Dobrý stav

**100 % čerpání Kindergeld**

Všech 42 rodin s dětmi čerpá Kindergeld, průměr 3 000 EUR/rok/rodina, EU koordinace funkční.

*Indikátory:*

- ✓ 100 % čerpání
- ✓ 3K EUR/rok/rodina
- ✓ EU E411 OK
- ✓ 0 čekajících

*Doporučené akce:*

1. Každoroční revize (studující děti)
2. Monitoring změn legislativy

#### ❌ Rizikový stav

**Nevyužitý Kindergeld**

2 rodiny nečerpají — 500 EUR/měsíc = 6 000 EUR/rok promarněných. Chybí formulář KG1 nebo E411.

*Indikátory:*

- ✗ 2 nečerpající
- ✗ 6K EUR/rok promarněno
- ✗ Chybí KG1
- ✗ E411 nepodán

*Nápravná opatření:*

1. Okamžitě podat KG1 + přílohy
2. E411 přes ČSSZ pro koordinaci
3. Zpětná žádost (až 6 měsíců)
4. HR edukace pendlerů

**Související analýzy:** 4-01, 4-07

---

### 4-04 — Formuláře A1

**Zdroj:** HR data

| | |
|---|---|
| **Frekvence** | Před každým vysláním + měsíčně kontrola expirací |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Kritický — compliance + pokuty |
| **Status** | Produkce |

**Popis:**

Formulář A1 (Nařízení EU 883/2004) potvrzuje, že zaměstnanec podléhá sociálnímu pojištění v ČR, ne v DE. Pro pendlery a vyslané pracovníky povinný — bez A1 hrozí doplacení SV v Německu (cca 20 % mzdy) a pokuty Zollamt.

**Metodologie:**

Workflow: plán vyslání → ČSSZ e-Podání formulář A1 → získání potvrzení do 2 týdnů → archivace + předání zaměstnanci. Systém hlídá expiraci (max 24 měsíců) a alertuje na prolongaci. Kontrola před každou cestou.

**Datové vstupy:**

- HR plán vyslání (datum, místo DE)
- Pracovní smlouva + dodatek o vyslání
- ČSSZ e-Podání A1 formulář
- Historie A1 per zaměstnanec
- Zollamt/SVLFG registrace

**Výstupní metriky:**

- % zaměstnanců s platným A1
- Počet vyslání bez A1
- Doba vydání A1 (dny)
- Počet expirujících do 30 dnů
- Pokuty Zollamt (EUR)

#### ✅ Dobrý stav

**A1 pro všechna vyslání**

100 % vyslání má A1 před výjezdem, průměrná doba vydání 10 dní, 0 pokut, roční prolongace automatická.

*Indikátory:*

- ✓ 100 % A1
- ✓ Vydání 10 dní
- ✓ 0 pokut
- ✓ Auto prolongace

*Doporučené akce:*

1. Pokračovat v procesu
2. Roční review expirací

#### ❌ Rizikový stav

**Chybějící A1 — riziko nelegální práce**

3 pendleři bez platného A1 — Zollamt kontrola by znamenala doplacení SV 15 % + pokuty. Reputační riziko.

*Indikátory:*

- ✗ 3 bez A1
- ✗ Riziko doplatku 20 %
- ✗ Zollamt pokuta
- ✗ Reputační riziko

*Nápravná opatření:*

1. Okamžitě podat A1 (expressní řízení)
2. Stopstate vyslání do vydání A1
3. Audit všech aktuálních vyslání
4. Workflow improvement

**Související analýzy:** 4-05, 4-06

---

### 4-05 — SOKA-BAU

**Zdroj:** evidence

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 80 % automatizováno |
| **Business impact** | Vysoký — compliance stavebního sektoru |
| **Status** | Produkce |

**Popis:**

SOKA-BAU (Sozialkasse des Baugewerbes) je povinný odvod pro stavební firmy působící v DE — financuje dovolenou, odborné vzdělávání a podpůrný fond. Pro české pendlery ve stavebnictví kritické, měsíční platby + reporting.

**Metodologie:**

Registrace u SOKA-BAU per projekt. Měsíční Meldung: počet zaměstnanců × odpracované hodiny × sazba (aktuálně 14.5 %). Platba do 20. následujícího měsíce. Automatický import z Anet docházky → SOKA-BAU portál export XML.

**Datové vstupy:**

- Docházka pendlerů v DE (Anet)
- Registrace SOKA-BAU (projekty)
- Sazebník SOKA-BAU
- Pracovní smlouvy (stavební profese)
- Bankovní platební systém (SEPA)

**Výstupní metriky:**

- Měsíční odvod (EUR)
- Počet registrovaných zaměstnanců
- Odpracované hodiny v DE
- Delay platby (dny)
- Penále (EUR)

#### ✅ Dobrý stav

**SOKA-BAU řádně odvedeno**

Měsíční Meldung podán do 15., platba do 20., 0 penále, všichni zaměstnanci registrováni.

*Indikátory:*

- ✓ Meldung včas
- ✓ Platba včas
- ✓ 100 % registrace
- ✓ 0 penále

*Doporučené akce:*

1. Pokračovat v procesu
2. Měsíční report

#### ❌ Rizikový stav

**SOKA-BAU penále**

Meldung 30 dní po termínu, penále 5 000 EUR, riziko pozastavení projektu v DE.

*Indikátory:*

- ✗ Delay 30 dní
- ✗ Penále 5K EUR
- ✗ Riziko pozastavení
- ✗ Chybí Meldung

*Nápravná opatření:*

1. Okamžitě podat + zaplatit
2. Žádost o prominutí penále
3. Automatizace procesu
4. Zavést reminder 5 dní před termínem

**Související analýzy:** 4-04, 4-11

---

### 4-06 — Freistellung

**Zdroj:** registrace

| | |
|---|---|
| **Frekvence** | Dle expirace (1-3 roky) + nové klienty |
| **Automatizace** | 80 % automatizováno |
| **Business impact** | Vysoký — cash flow (srážka 15 %) |
| **Status** | Produkce |

**Popis:**

Freistellungsbescheinigung § 48b EStG — osvobození od srážkové daně 15 % při stavebních službách v DE. Subdodavatel bez Freistellung musí odvádět 15 % z každé faktury. Systém automaticky podává žádosti u Bundeszentralamt für Steuern (BZSt).

**Metodologie:**

BZSt online formulář → upload dokumentů (výpis z OR, finanční bezúhonnost, čestné prohlášení). Žádost vyřízena do 4 týdnů. Platnost 1-3 roky. Auto-renewal 60 dní před expirací. Tracking status per klient.

**Datové vstupy:**

- BZSt API pro Freistellung
- Výpis z obchodního rejstříku (ARES)
- Finanční bezúhonnost (FÚ)
- Kontrakty s německými odběrateli
- Historie Freistellung (expirace)

**Výstupní metriky:**

- % úspěšných žádostí
- Počet aktivních Freistellung
- Srážková daň zabráněná (EUR)
- Doba vydání (dny)
- Expirace v příštích 60 dnech

#### ✅ Dobrý stav

**Úspěšné Freistellung**

98.5 % žádostí úspěšných, všichni klienti s platnou Freistellung, 0 srážkové daně zaplaceno.

*Indikátory:*

- ✓ 98.5 % success
- ✓ 100 % klientů OK
- ✓ 0 srážky
- ✓ Auto-renewal

*Doporučené akce:*

1. Pokračovat v procesu
2. Monitoring expirací

#### ❌ Rizikový stav

**Freistellung zamítnuta**

Žádost zamítnuta — srážka 15 % z faktur = 45K EUR zamražených. Důvod: neúplné doklady.

*Indikátory:*

- ✗ Zamítnuto
- ✗ Srážka 15 %
- ✗ 45K EUR zamraženo
- ✗ Neúplné doklady

*Nápravná opatření:*

1. Doplnit chybějící doklady
2. Podat odvolání do 30 dnů
3. Request Erstattung přeplatku
4. Konzultace BZSt specialisty

**Související analýzy:** 4-11, 4-04

---

### 4-07 — Kinderfreibetrag

**Zdroj:** legislativa

| | |
|---|---|
| **Frekvence** | Průběžně (scraping), ročně (reset parametrů) |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Střední — přímé finanční dopady |
| **Status** | Produkce |

**Popis:**

Kinderfreibetrag (daňová sleva na dítě) v DE — aktuálně 6 384 €/dítě/rok (2024). Systém sleduje změny legislativy (Bundesfinanzministerium) a automaticky aktualizuje parametry pro výpočet Einkommensteuer. Neaktuální hodnoty znamenají špatné přiznání a přeplacenou daň.

**Metodologie:**

Web scraping bundesfinanzministerium.de + BGBl sledování legislativních změn. Parametrizace: Grundfreibetrag, Kinderfreibetrag, Entfernungspauschale sazby. Při změně: update DB parametrů + notifikace + re-výpočet open přiznání.

**Datové vstupy:**

- Bundesfinanzministerium RSS + scraping
- Bundesgesetzblatt (BGBl) changes
- Aktuální DB parametrů
- Open přiznání (Einkommensteuer)
- Kalendář plánovaných změn

**Výstupní metriky:**

- Počet aktualizovaných parametrů
- Delay od změny legislativy (dny)
- Počet přiznání re-počítaných
- Přeplatky vrácené zaměstnancům (EUR)
- Compliance score

#### ✅ Dobrý stav

**Parametry vždy aktuální**

Automatická aktualizace do 5 dnů od BGBl, všechna přiznání s nejnovějšími hodnotami, 0 přeplatků.

*Indikátory:*

- ✓ Delay < 5 dnů
- ✓ 100 % přiznání aktuálních
- ✓ 0 přeplatků
- ✓ Auto-update OK

*Doporučené akce:*

1. Pokračovat v monitoringu BGBl
2. Měsíční compliance check

#### ❌ Rizikový stav

**Neaktuální Freibetrag**

Kinderfreibetrag nezaktualizován po změně 2024 — pendleři přepláceli 400 EUR/rok × 40 lidí = 16K EUR.

*Indikátory:*

- ✗ Delay 180 dní
- ✗ Přeplatek 16K EUR
- ✗ 40 pendlerů
- ✗ Nutné opravy

*Nápravná opatření:*

1. Okamžitě aktualizovat parametry
2. Re-počítat všechna otevřená přiznání
3. Podat opravná přiznání (Berichtigung)
4. Zlepšit monitoring legislativy

**Související analýzy:** 4-02, 4-08

---

### 4-08 — Zpětná přiznání

**Zdroj:** archiv

| | |
|---|---|
| **Frekvence** | Ročně + při nástupu nového pendlera |
| **Automatizace** | 75 % automatizováno |
| **Business impact** | Vysoký — přímá finanční hodnota klientům |
| **Status** | Produkce |

**Popis:**

Zpětné Einkommensteuererklärung za 4 roky dozadu (§ 169 AO) — pro pendlery, kteří v minulých letech nepodávali. Systém analyzuje historická data a identifikuje potenciál refundace. Promlčecí lhůta 4 roky (freiwillige Veranlagung) nebo 7 let (Pflichtveranlagung).

**Metodologie:**

Archiv mezd + GPS knih jízd × 4 roky historie. Simulace Einkommensteuer s maximálními odpočty. Identifikace roků s potenciálem > 500 EUR → příprava ELSTER zpětně. Hlídání promlčecí lhůty — 31.12. roku + 4 roky.

**Datové vstupy:**

- Archiv mezd (4 roky)
- GPS knihy jízd historické
- Lohnsteuerbescheinigung (roční)
- Kinderfreibetrag historické hodnoty
- ELSTER archiv přiznání

**Výstupní metriky:**

- Refundace za zpětná přiznání (EUR)
- Počet pendlerů s potenciálem
- Rok do promlčení
- Průměrná refundace (EUR/rok)
- Promlčená částka (EUR)

#### ✅ Dobrý stav

**Zpětné refundace získány**

12K EUR nalezeno a vyžádáno pro 8 pendlerů za 3 roky zpětně, 0 promlčených částek.

*Indikátory:*

- ✓ 12K EUR získáno
- ✓ 8 pendlerů
- ✓ 3 roky zpětně
- ✓ 0 promlčeno

*Doporučené akce:*

1. Pokračovat v monitoringu
2. Proaktivní nabídka klientům

#### ❌ Rizikový stav

**Promlčená refundace**

4 800 EUR promlčeno — pendler nevěděl o nároku, lhůta uplynula 31. 12. Klient frustrován.

*Indikátory:*

- ✗ 4.8K EUR promlčeno
- ✗ Chybí monitoring
- ✗ Frustrovaný klient
- ✗ Lhůta prošla

*Nápravná opatření:*

1. Okamžitý audit všech pendlerů (4 roky)
2. Alert system 60 dní před promlčením
3. Proaktivní komunikace klientům
4. Možná žádost o obnovu řízení

**Související analýzy:** 4-01, 4-02

---

### 4-09 — Stálé vs. proměnné pracoviště

**Zdroj:** GPS

| | |
|---|---|
| **Frekvence** | Ročně (přiznání) + při změně pracoviště |
| **Automatizace** | 80 % automatizováno |
| **Business impact** | Vysoký — přímé odpočty |
| **Status** | Produkce |

**Popis:**

Klasifikace Erste Tätigkeitsstätte (první pracoviště) vs. Einsatzwechseltätigkeit (proměnlivé pracoviště) má zásadní dopad na odpočty. Pro Erste TS: Entfernungspauschale (0,30 €/km jednosměrně). Pro Einsatzwechsel: Reisekosten (0,30 €/km obousměrně + Verpflegung).

**Metodologie:**

GPS analýza: pokud pendler jezdí do > 3 různých lokací za rok a žádná nedominuje (> 50 % dnů), klasifikace jako Einsatzwechseltätigkeit. Jinak Erste Tätigkeitsstätte. BFH judikatura pro edge cases. Automatická kategorizace per pendler.

**Datové vstupy:**

- GPS knihy jízd (detailní)
- Pracovní smlouva (Arbeitsort)
- Docházka per lokace
- BFH judikatura (case law DB)
- Einsatzplan od Arbeitgebera

**Výstupní metriky:**

- Počet pendlerů v Erste TS
- Počet v Einsatzwechsel
- Úspora / doměrek (EUR)
- Účty za Verpflegung (EUR/rok)
- BFH compliance status

#### ✅ Dobrý stav

**Správná klasifikace = úspora**

Pendler správně klasifikován jako Einsatzwechsel — odpočet 1 400 EUR/rok navíc (obousměrná km + Verpflegung).

*Indikátory:*

- ✓ Einsatzwechsel OK
- ✓ Úspora 1.4K EUR/rok
- ✓ GPS podporuje
- ✓ BFH compliant

*Doporučené akce:*

1. Dokumentovat GPS pečlivě
2. Roční review klasifikace

#### ❌ Rizikový stav

**Chybná klasifikace = doměrek**

Pendler deklarován jako Einsatzwechsel, ale Finanzamt reklasifikoval na Erste TS — doměrek 3 200 EUR + úroky.

*Indikátory:*

- ✗ Reklasifikace Finanzamt
- ✗ Doměrek 3.2K
- ✗ Úroky 6 %
- ✗ Chybí doklady

*Nápravná opatření:*

1. Odvolání (Einspruch) do 1 měsíce
2. Doložit GPS + Einsatzplan
3. BFH judikatura argumentace
4. Konzultace specialisty

**Související analýzy:** 4-02, 4-08

---

### 4-10 — Penze v zahraničí

**Zdroj:** FÚ Neubrandenburg

| | |
|---|---|
| **Frekvence** | Při nástupu do důchodu + roční prolongace |
| **Automatizace** | 70 % automatizováno |
| **Business impact** | Vysoký — významná úspora pro klienta |
| **Status** | Produkce |

**Popis:**

Zdanění penzí českých rezidentů z německé DRV (Deutsche Rentenversicherung) dle DBA ČR-DE (Smlouva o zamezení dvojího zdanění, 2003). Soukromé a státní penze zdaněny v zemi rezidence — ČR (15 %), ne v DE. FÚ Neubrandenburg však automaticky sráží, pokud není podána Antrag auf Freistellung.

**Metodologie:**

Identifikace pendlerů v důchodovém věku s německou penzí. Antrag auf Freistellung u FÚ Neubrandenburg + potvrzení ČR daňové rezidence. Po schválení: DRV vyplácí bez srážky. Zpětné vrácení (Erstattung) za již sražené částky až 4 roky zpětně.

**Datové vstupy:**

- DRV — seznam poživatelů penze
- DBA ČR-DE (čl. 18)
- Potvrzení daňové rezidence (FÚ ČR)
- FÚ Neubrandenburg Antragsformular
- Historie srážek

**Výstupní metriky:**

- Počet důchodců s DE penzí
- Srážková daň zabráněná (EUR)
- Erstattung zpětná (EUR)
- Doba vyřízení (měsíce)
- Compliance s DBA

#### ✅ Dobrý stav

**DBA využita — 0 % srážka**

Antrag schválen, DE penze vyplácena bez srážky (jen v ČR zdaněna 15 %), úspora 1 800 EUR/rok/důchodce.

*Indikátory:*

- ✓ 0 % DE srážka
- ✓ DBA OK
- ✓ Úspora 1.8K/rok
- ✓ Potvrzení rezidence aktuální

*Doporučené akce:*

1. Roční prolongace potvrzení
2. Monitoring legislativních změn

#### ❌ Rizikový stav

**Dvojí zdanění — chybí Antrag**

DE sráží 18 % (vs. 0 % dle DBA) — ročně 2 400 EUR zbytečně. Nutná zpětná Erstattung + Antrag.

*Indikátory:*

- ✗ Srážka 18 %
- ✗ Ztráta 2.4K/rok
- ✗ Chybí Antrag
- ✗ 4 roky zpětné Erstattung

*Nápravná opatření:*

1. Podat Antrag auf Freistellung
2. Erstattung zpětně 4 roky
3. Potvrzení rezidence z FÚ ČR
4. Monitoring FÚ Neubrandenburg

**Související analýzy:** 4-01, 4-02

---

### 4-11 — ELSTER komunikace

**Zdroj:** certifikáty

| | |
|---|---|
| **Frekvence** | Kontinuální (monitoring), ročně (prolongace) |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Kritický — bez certifikátu nelze podávat |
| **Status** | Produkce |

**Popis:**

ELSTER (Elektronische Steuererklärung) je oficiální DE portál pro elektronická přiznání. Systém komunikuje přes ERiC interface s kvalifikovaným certifikátem. Expirace certifikátu = nemožnost podání, expirace SSL = selhání automatiky.

**Metodologie:**

ELSTER ERiC API + Zertifikatsdatei (PFX). Monitoring expirace certifikátu (alert 60/30/7 dní). Automatický upload XML přiznání, tracking status (přijato / v kontrole / vydán výměr). Error handling pro ELSTER downtime.

**Datové vstupy:**

- ELSTER ERiC API
- Zertifikatsdatei (PFX) + PIN
- Einkommensteuer XML (ESt1A)
- Status tracking DB
- Monitoring dashboard

**Výstupní metriky:**

- % automaticky podaných
- Expirace certifikátu (dny)
- ELSTER uptime (%)
- Počet zamítnutých podání
- Doba vydání Bescheid (týdny)

#### ✅ Dobrý stav

**Automatická ELSTER komunikace**

100 % přiznání podáno automaticky, certifikát prolongován 60 dní před expirací, 0 manuálních zásahů.

*Indikátory:*

- ✓ 100 % auto
- ✓ Certifikát valid
- ✓ ELSTER uptime 99.9 %
- ✓ 0 zamítnutých

*Doporučené akce:*

1. Monitoring expirace
2. Roční test DR certifikátu

#### ❌ Rizikový stav

**Expirovaný certifikát — blokace podání**

Certifikát expiroval, 5 přiznání nepodáno, klienti čekají na Bescheid. Prolongace trvá 2 týdny.

*Indikátory:*

- ✗ Certifikát expired
- ✗ 5 nepodaných
- ✗ Klienti čekají
- ✗ Prolongace 14 dní

*Nápravná opatření:*

1. Okamžitě expressní prolongace
2. Manuální podání přes ELSTER web
3. Omluva klientům
4. Alert system certifikát 60 dní předem

**Související analýzy:** 4-02, 4-08

---

<a id="sekce-5"></a>

## Sekce 5: Daňové poradenství

### 5-01 — Scénáře «co kdyby»

**Zdroj:** simulační model

| | |
|---|---|
| **Frekvence** | Kvartálně + při legislativních změnách |
| **Automatizace** | 60 % automatizováno |
| **Business impact** | Kritický — přímý finanční dopad na klienty v řádu stovek tisíc Kč |
| **Status** | Produkce |

**Popis:**

Simulační model «co kdyby» umožňuje testovat různé daňové strategie bez reálného dopadu. Systém modeluje alternativní scénáře (změna právní formy, optimalizace odpisů, přerozdělení příjmů) a kvantifikuje jejich dopad na efektivní daňovou sazbu.

Každý scénář zahrnuje kompletní výpočet DPPO/DPFO, zdravotního a sociálního pojištění a výsledný čistý příjem. Výsledky jsou vizualizovány v porovnávací tabulce s jasným doporučením.

Model je průběžně aktualizován dle platné legislativy a automaticky přepočítává scénáře při změnách zákonů.

**Metodologie:**

Monte Carlo simulace s parametrickými vstupy: 1) Aktuální daňová struktura jako baseline, 2) Definice alternativních scénářů, 3) Výpočet celkové daňové zátěže per scénář, 4) Sensitivity analýza klíčových parametrů, 5) Ranking scénářů dle čistého příjmu po zdanění.

**Datové vstupy:**

- Aktuální příjmy a výdaje klienta
- Struktura majetku a odpisy
- Rodinné poměry (slevy, zvýhodnění)
- Platná legislativa (zákon o daních z příjmů)
- Historické výsledky pro trend

**Výstupní metriky:**

- Efektivní daňová sazba per scénář
- Absolutní úspora v Kč
- Ranking scénářů
- Rizikový profil scénáře
- Implementační náročnost

#### ✅ Dobrý stav

**Optimální daňová struktura**

Simulace identifikovala strukturu, která sníží efektivní daňovou sazbu o 15 %. Kombinace optimalizace odpisů a správného načasování výdajů přinese úsporu 280 000 Kč ročně.

*Indikátory:*

- ✓ Úspora 15 % efektivní sazby
- ✓ Absolutní úspora 280 000 Kč/rok
- ✓ Scénář plně v souladu s legislativou
- ✓ Nízká implementační náročnost

*Doporučené akce:*

1. Prezentovat výsledky klientovi
2. Připravit implementační plán
3. Nastavit monitoring dodržování struktury

#### ❌ Rizikový stav

**Zmeškaná optimalizace**

Klient nebyl informován o možnostech optimalizace a přeplatil na daních 340 000 Kč. Jednoduchá úprava odpisové politiky a načasování fakturace by přinesla výraznou úsporu.

*Indikátory:*

- ✗ Přeplatek 340 000 Kč
- ✗ Efektivní sazba 23 % vs. optimum 18 %
- ✗ Žádná optimalizace provedena
- ✗ Klient nebyl informován o možnostech

*Nápravná opatření:*

1. Okamžitě provést simulaci pro aktuální rok
2. Navrhnout zpětnou optimalizaci (dodatečné přiznání)
3. Implementovat proaktivní alerting
4. Zařadit klienta do pravidelného review cyklu

**Související analýzy:** 5-02, 5-04, 1-08, 2-01

---

### 5-02 — Transferové ceny

**Zdroj:** smluvní data

| | |
|---|---|
| **Frekvence** | Ročně (dokumentace) + při nových transakcích |
| **Automatizace** | 60 % automatizováno |
| **Business impact** | Kritický — vysoké riziko doměrku |
| **Status** | Produkce |

**Popis:**

Transferové ceny (TP) mezi spřízněnými osobami dle § 23 odst. 7 ZDP a OECD TP Guidelines. Od 2014 povinná dokumentace (pokyn GFŘ D-334) pro transakce nad 200 M Kč. Systém agreguje smluvní data a validuje arm's length principle.

**Metodologie:**

Identifikace spřízněných osob (ownership > 25 %). Klasifikace transakcí (zboží, služby, licence, úvěry). Benchmark analýza (Amadeus/Bureau van Dijk DB). Dokumentace master + local file. Country-by-Country reporting (CbCR) pro skupiny > 750M EUR.

**Datové vstupy:**

- ERP smluvní data (intercompany)
- Ownership struktura (OR ARES)
- Amadeus / TP Catalyst DB
- Smlouvy intercompany
- Funkční profily entit

**Výstupní metriky:**

- Arm's length range (interquartile)
- Deviation od mediánu (%)
- TP dokumentace completeness (%)
- CbCR readiness
- Riziko doměrku (Kč)

#### ✅ Dobrý stav

**TP dokumentace kompletní**

Master + local file aktuální, benchmarking v arm's length range, CbCR podán, 0 neshod s OECD.

*Indikátory:*

- ✓ Dokumentace 100 %
- ✓ Arm's length OK
- ✓ CbCR OK
- ✓ OECD compliant

*Doporučené akce:*

1. Roční update dokumentace
2. Monitoring legislativy

#### ❌ Rizikový stav

**Chybí TP dokumentace**

Žádná TP dokumentace pro intercompany 280M — riziko doměrku 2M+ a pokut při kontrole FÚ. Základ pro reklasifikaci jako skrytá distribuce zisku.

*Indikátory:*

- ✗ 0 dokumentace
- ✗ 280M intercompany
- ✗ Riziko 2M+
- ✗ Pokuta § 38t

*Nápravná opatření:*

1. Urgentně zpracovat local file
2. Benchmark analýza
3. Konzultace TP specialisty
4. Přeceníní intercompany transakcí

**Související analýzy:** 2-05, 5-03

---

### 5-03 — Zastupování při kontrolách

**Zdroj:** DIS+

| | |
|---|---|
| **Frekvence** | Průběžně (dle kontrol FÚ) |
| **Automatizace** | 60 % automatizováno |
| **Business impact** | Kritický — vysoké finanční dopady |
| **Status** | Produkce |

**Popis:**

Zastupování klienta při daňové kontrole finanční správy. Systém agreguje podklady z DIS+ (Daňová informační schránka), komunikaci s FÚ, protokoly a rozhodnutí. Úspěšnost zastupování = míra uhájení původního přiznání bez doměrku.

**Metodologie:**

DIS+ API pro stahnutí výzev a rozhodnutí. Workflow: protokol o kontrole → dodání podkladů → vysvětlení sporných bodů → vyjádření k výsledkům → odvolání. Tracking: open kontroly, dny do deadline, sporné částky, result.

**Datové vstupy:**

- DIS+ API (MOJE daně)
- Daňová přiznání archiv
- Účetní podklady (Money S3)
- Historie kontrol a výsledků
- Korespondence s FÚ (datová schránka)

**Výstupní metriky:**

- Počet aktivních kontrol
- Sporné částky (Kč)
- Úspěšnost (% uhájeno)
- Průměrná doba kontroly (dny)
- Doměrky + penále (Kč)

#### ✅ Dobrý stav

**Úspěšné zastupování**

5 kontrol za 3 roky, 0 doměrků — všechny spory uhájeny, dokumentace kvalitní, proaktivní komunikace s FÚ.

*Indikátory:*

- ✓ 5 kontrol, 0 doměrků
- ✓ 100 % úspěšnost
- ✓ Doklady OK
- ✓ 0 odvolání

*Doporučené akce:*

1. Pokračovat v procesu
2. Šířit best practice

#### ❌ Rizikový stav

**Doměrek + penále**

Doměrek 1.2M Kč + penále 240K (20 % z doměrku) — chybné zaúčtování neuznatelných nákladů, nedostatečná dokumentace při kontrole.

*Indikátory:*

- ✗ Doměrek 1.2M
- ✗ Penále 240K
- ✗ Chybí dokumentace
- ✗ Prohraná kontrola

*Nápravná opatření:*

1. Odvolání do 30 dnů
2. Žádost o posečkání platby
3. Audit chybných zaúčtování
4. Školení účetní — § 25 ZDP

**Související analýzy:** 5-04, 5-06, 1-08

---

### 5-04 — Monitoring DIS+

**Zdroj:** API FS

| | |
|---|---|
| **Frekvence** | Denně |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Kritický — prevence exekuce |
| **Status** | Produkce |

**Popis:**

Denní monitoring DIS+ (Daňová informační schránka) pro všechny klienty. Systém stahuje předpisy, výzvy, protokoly a rozhodnutí. Automatické párování předpisů s provedenými platbami a detekce nedoplatků. Nespárovaný předpis = hrozba daňové exekuce.

**Metodologie:**

REST API MOJE daně (finančnísprava.cz/api/dis) s klientským oprávněním. Denní stažení: účet daňového subjektu, předpisy, platby, zůstatek. Párování pomocí variabilního symbolu. Alert při nedoplatku > 7 dnů od splatnosti.

**Datové vstupy:**

- DIS+ API finanční správy
- Zálohy DPPO / DPFO / DPH
- Bankovní výpisy (platby)
- Daňový kalendář (termíny)
- Historie komunikace s FÚ

**Výstupní metriky:**

- Zůstatek daňového účtu (Kč)
- Nespárované předpisy (Kč)
- Nedoplatky > 7 dnů (Kč)
- Blížící se termíny (dny)
- Výzvy / kontroly status

#### ✅ Dobrý stav

**DIS+ plně pod kontrolou**

Všechny předpisy spárovány s platbami, 0 nedoplatků, zálohy platí včas, 0 výzev od FÚ.

*Indikátory:*

- ✓ 100 % spárováno
- ✓ 0 nedoplatků
- ✓ Zálohy včas
- ✓ 0 výzev

*Doporučené akce:*

1. Pokračovat v denním monitoringu
2. Měsíční report

#### ❌ Rizikový stav

**Nespárovaný předpis = exekuce**

Předpis 89K Kč nespárován 45 dní po splatnosti, FÚ vydal exekuční příkaz na účet klienta.

*Indikátory:*

- ✗ 89K nespárováno
- ✗ 45 dní po splatnosti
- ✗ Exekuční příkaz
- ✗ Blokace účtu

*Nápravná opatření:*

1. Okamžitá platba + identifikace VS
2. Žádost o zastavení exekuce
3. Prošetření, proč nebylo detekováno
4. Zlepšit monitoring

**Související analýzy:** 5-03, 1-05, 5-06

---

### 5-05 — Due diligence

**Zdroj:** agregace modulů

| | |
|---|---|
| **Frekvence** | Na vyžádání (M&A, úvěry) |
| **Automatizace** | 65 % automatizováno |
| **Business impact** | Kritický — rozhodování o transakcích |
| **Status** | Produkce |

**Popis:**

Finanční a daňová due diligence pro M&A, investiční projekty, úvěrové financování. Systém agreguje data ze všech modulů (účetnictví, daně, mzdy, smlouvy) a identifikuje rizika, skryté závazky a úskalí. Výstup: DD report s red flags.

**Metodologie:**

Automatizovaný sběr dat: HV posledních 3 let, DPH přiznání, mzdové závazky, soudní spory, soudní pohledávky, intercompany, kontingentní závazky (garance, sliby). Checklist 150+ bodů. AI-driven anomaly detection v datech.

**Datové vstupy:**

- Money S3 — 3 roky účetnictví
- DPH přiznání + KH
- Smlouvy (DocuWare)
- Soudní spory (justice.cz API)
- OR a ARES (vlastnictví, vazby)

**Výstupní metriky:**

- Celkové závazky (Kč)
- Podmíněné závazky (Kč)
- Red flags count
- Soudní riziko (Kč)
- Compliance score (0-100)

#### ✅ Dobrý stav

**Čistý due diligence profil**

0 red flags, konzistentní účetnictví 3 roky, žádné skryté závazky, soudní spory minimální, vhodný pro M&A.

*Indikátory:*

- ✓ 0 red flags
- ✓ Konzistence 3 roky
- ✓ 0 skrytých závazků
- ✓ Compliance 95+

*Doporučené akce:*

1. Dokončit DD report
2. Proceed s transakcí

#### ❌ Rizikový stav

**Odhalené skryté závazky**

Podmíněné závazky 4.5M (ručitelství, soudní spory), nezaúčtované dohady 800K, transferové ceny bez dokumentace.

*Indikátory:*

- ✗ 4.5M podmíněných
- ✗ 800K dohady
- ✗ Chybí TP dokumentace
- ✗ Red flags 12

*Nápravná opatření:*

1. Re-pricing transakce
2. Požadavek na escrow account
3. Představení závazků prodávajícímu
4. Consider exit z jednání

**Související analýzy:** 5-02, 10-07, 1-02

---

### 5-06 — Predikce kontroly FÚ

**Zdroj:** vzorce

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Vysoký — prevence finančních škod |
| **Status** | Pilot |

**Popis:**

ML model predikující pravděpodobnost daňové kontroly v příštích 12 měsících. Vstupy: odvětví, obrat, marže, DPH nadměrné odpočty, intercompany, historie kontrol, červené příznaky (velké kurzové ztráty, odpisy pohledávek). Umožňuje proaktivní přípravu.

**Metodologie:**

Monte Carlo simulace + logistická regrese na historii kontrol (anonymizovaná data). Feature engineering 40+ signálů: odvětví CZ-NACE, obrat růst/pokles > 30 %, nadměrný odpočet DPH 3× v řadě, intercompany > 20 % obratu, vysoké odpisy. Kalibrace pomocí empirické úspěšnosti.

**Datové vstupy:**

- ARES — NACE kód
- Money S3 — HV, obrat, marže
- DPH přiznání (nadměrné odpočty)
- TP transakce objem
- Historie kontrol klienta

**Výstupní metriky:**

- Pravděpodobnost kontroly (%)
- Top 3 rizikové faktory
- Odhadovaný doměrek (pokud kontrola)
- Doporučená preventivní opatření
- Benchmark oboru (%)

#### ✅ Dobrý stav

**Nízké riziko kontroly**

Pravděpodobnost 8 % (pod oborovým průměrem 15 %), konzervativní účetnictví, žádné červené příznaky.

*Indikátory:*

- ✓ P = 8 %
- ✓ Pod oborem
- ✓ 0 red flags
- ✓ Konzervativní účetnictví

*Doporučené akce:*

1. Pokračovat v kvalitní evidenci
2. Roční audit

#### ❌ Rizikový stav

**Vysoká pravděpodobnost kontroly**

Pravděpodobnost 78 % — 3 rizikové faktory: nadměrný odpočet DPH 4× po sobě, intercompany 35 % obratu bez TP dok., obrat +120 % YoY.

*Indikátory:*

- ✗ P = 78 %
- ✗ 3 red flags
- ✗ Nadměrný odpočet 4×
- ✗ TP dok. chybí

*Nápravná opatření:*

1. Urgentně zpracovat TP dokumentaci
2. Preventivní audit DPH
3. Konzultace daňového poradce
4. Připravit dokumenty pro kontrolu

**Související analýzy:** 5-03, 5-04, 5-02

---

<a id="sekce-6"></a>

## Sekce 6: DPH, ViDA a e-fakturace

### 6-01 — Detekce karuselových vzorců

**Zdroj:** KH + graf dodavatelů

| | |
|---|---|
| **Frekvence** | Měsíčně (po podání KH) |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Kritický — ochrana před ručením za DPH v řádu milionů Kč |
| **Status** | Produkce |

**Popis:**

Systém analyzuje transakční data z kontrolního hlášení a buduje graf obchodních vztahů mezi dodavateli. Pomocí grafových algoritmů detekuje podezřelé vzorce typické pro karuselové podvody s DPH — uzavřené smyčky, identické obraty, nově vzniklé firmy v řetězci.

Detekce chrání klienty před nechtěným zapojením do podvodných řetězců, které by mohly vést k ručení za nezaplacenou DPH dle §109 zákona o DPH.

Systém průběžně aktualizuje graf vztahů a porovnává nové transakce s databází podezřelých vzorců.

**Metodologie:**

Grafová analýza: 1) Budování grafu obchodních vztahů z KH dat, 2) Detekce cyklů (uzavřených smyček) v grafu, 3) Porovnání obratů v řetězci (shoda > 95 % = podezřelé), 4) Kontrola stáří IČO dodavatelů v ARES, 5) Cross-reference s nespolehlivými plátci DPH.

**Datové vstupy:**

- Kontrolní hlášení (oddíl A i B)
- Souhrnné hlášení
- ARES databáze
- Seznam nespolehlivých plátců DPH
- Historické transakce pro trend

**Výstupní metriky:**

- Počet detekovaných podezřelých vzorců
- Finanční objem v rizikových řetězcích
- Počet nových dodavatelů v rizikové kategorii
- Score rizika per dodavatel (0–100)

#### ✅ Dobrý stav

**Čistý dodavatelský řetězec**

Analýza nedetekovala žádné podezřelé vzorce. Všichni dodavatelé jsou spolehliví plátci DPH s transparentní historií.

*Indikátory:*

- ✓ 0 detekovaných cyklů v grafu
- ✓ Všichni dodavatelé spolehliví plátci
- ✓ Žádné identické obraty v řetězcích
- ✓ 100 % dodavatelů s historií > 2 roky

*Doporučené akce:*

1. Pokračovat v měsíčním monitoringu
2. Aktualizovat databázi vzorců
3. Archivovat výsledky pro případnou kontrolu FÚ

#### ❌ Rizikový stav

**Podezřelý řetězec detekován**

Systém identifikoval řetězec 3 firem s identickými obraty (odchylka < 2 %). Prostřední firma vznikla před 4 měsíci a nemá žádné zaměstnance. Riziko ručení dle §109 ZDPH.

*Indikátory:*

- ✗ 1 uzavřená smyčka v grafu
- ✗ Obraty v řetězci identické (±2 %)
- ✗ 1 firma mladší 6 měsíců
- ✗ Finanční objem v riziku: 890 000 Kč

*Nápravná opatření:*

1. Okamžitě informovat klienta
2. Pozastavit obchody s podezřelým dodavatelem
3. Ověřit sídlo dodavatele fyzicky
4. Konzultovat s daňovým poradcem — §109 ručení

**Související analýzy:** 6-04, 10-06, 19-01, 1-05

---

### 6-02 — Připravenost na ViDA 2030

**Zdroj:** audit ERP

| | |
|---|---|
| **Frekvence** | Ročně + při změnách ViDA |
| **Automatizace** | 70 % automatizováno |
| **Business impact** | Kritický — 2028 povinnost |
| **Status** | Roadmap |

**Popis:**

ViDA (VAT in the Digital Age) — EU reforma DPH s účinností 2028-2030. Povinné e-fakturace strukturovaným formátem (EN 16931) pro B2B transakce, real-time digital reporting místo souhrnných hlášení. Systém auditem ERP odhalí mezery v připravenosti.

**Metodologie:**

Audit ERP: 1) podpora XML UBL 2.1 / PEPPOL, 2) strukturovaný formát dle EN 16931, 3) digital signatures, 4) archivace 10 let dle § 35 ZoÚ, 5) real-time reporting API. Gap analýza vs. ViDA requirements. Roadmap implementace do 2028.

**Datové vstupy:**

- ERP technický audit
- EN 16931 standard
- PEPPOL specifikace
- ViDA directive text (COM/2022/701)
- Roadmap EU (2028-2030)

**Výstupní metriky:**

- ViDA readiness score (0-100)
- Počet gap items
- Odhadovaný CAPEX na upgrade (Kč)
- Time to compliance (měsíce)
- Risk of non-compliance (pokuty)

#### ✅ Dobrý stav

**ERP ViDA-ready**

Systém podporuje XML/UBL 2.1, PEPPOL, EN 16931. Readiness score 95/100. Stačí drobné úpravy do 2028.

*Indikátory:*

- ✓ Score 95/100
- ✓ PEPPOL OK
- ✓ XML/UBL OK
- ✓ EN 16931 validní

*Doporučené akce:*

1. Finální testy
2. Pilot s vybranými klienty

#### ❌ Rizikový stav

**ERP nepřipraven — nutný upgrade**

Systém neumí strukturovaný XML, žádný PEPPOL, manuální export PDF. Readiness 25/100. Nutný zásadní upgrade (CAPEX 500K+).

*Indikátory:*

- ✗ Score 25/100
- ✗ Žádný XML/UBL
- ✗ Žádný PEPPOL
- ✗ CAPEX 500K+

*Nápravná opatření:*

1. Vyhodnocení: upgrade vs. nový ERP
2. RFP na integrátory
3. Pilot B2B e-fakturace 2026
4. Training účetní na strukturovaný formát

**Související analýzy:** 6-01, 6-03

---

### 6-03 — XML/UBL výměna

**Zdroj:** automatický výstup

| | |
|---|---|
| **Frekvence** | Kontinuální (real-time) |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Vysoký — efektivita + ViDA |
| **Status** | Produkce |

**Popis:**

Konverze vydaných a přijatých faktur do strukturovaného XML/UBL formátu (Universal Business Language 2.1) pro automatizovanou výměnu mezi ERP systémy. Kritické pro ViDA compliance a efektivní workflow přijatých faktur (OCR → ERP bez retyping).

**Metodologie:**

Výstup: faktury z ERP → XML transformace přes XSLT šablony (EN 16931 compliant). Vstup: příjem UBL XML / PEPPOL dokumentů → parsing → import do ERP. Validace XSD schema. Fallback: OCR + NER pro neformátované PDF.

**Datové vstupy:**

- Money S3 / Pohoda — fakturační data
- EN 16931 XSD schéma
- PEPPOL Access Point
- OCR engine (pro fallback)
- DocuWare přijaté faktury

**Výstupní metriky:**

- % automatická konverze
- Počet manuálních zásahů
- Validation error rate (%)
- Throughput (faktur/hodina)
- OCR accuracy (% pro fallback)

#### ✅ Dobrý stav

**100 % automatická konverze**

Všechny faktury UBL 2.1 validní, 0 manuálních zásahů, PEPPOL routing funkční, přijaté faktury automaticky v ERP do 5 minut.

*Indikátory:*

- ✓ 100 % auto
- ✓ 0 errors
- ✓ PEPPOL OK
- ✓ Throughput 200 f/h

*Doporučené akce:*

1. Rozšíření na další klienty
2. Monitoring

#### ❌ Rizikový stav

**Vysoká míra manuálních zásahů**

32 % faktur vyžaduje manuální zásah — chybějící pole, nevalidní XSD, problémy s DIČ. Úspora z automatizace je neutralizována.

*Indikátory:*

- ✗ 32 % manuál
- ✗ Error rate 18 %
- ✗ Throughput 60 f/h
- ✗ Overtime účetní

*Nápravná opatření:*

1. Root cause: chybějící pole v ERP
2. Rozšíření master dat
3. Školení účetní
4. Upgrade XSLT transformací

**Související analýzy:** 6-01, 6-02, 11-08

---

### 6-04 — Chybné sazby DPH

**Zdroj:** validace

| | |
|---|---|
| **Frekvence** | Kontinuální (každá faktura) |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Vysoký — compliance + vztahy s klienty |
| **Status** | Produkce |

**Popis:**

Validace správnosti sazeb DPH (základní 21 %, snížená 12 % od 2024, sjednocení sazeb) dle přílohy 3 ZoDPH. Chybná sazba = chybné přiznání = doměrek + penále. Systém cross-validuje sazbu s kódem zboží/služby (KN kód).

**Metodologie:**

Validace: faktura → KN kód / položka v katalogu → mapa KN → DPH sazba. Cross-check: historické sazby (zda konzistentní), porovnání s typem plnění (zboží/služba/reverse charge), legislativní změny (2024 sjednocení 15/10 → 12 %).

**Datové vstupy:**

- Fakturace (ERP)
- Katalog položek s KN kódy
- Mapa KN → DPH sazba (příloha 3 ZoDPH)
- Historie fakturací (konzistence)
- Legislativní updates (BGBl CZ)

**Výstupní metriky:**

- Počet chybných sazeb
- Dopad na DPH (Kč)
- Riziko doměrku (Kč)
- Validation accuracy (%)
- Počet opravných daňových dokladů

#### ✅ Dobrý stav

**Správné sazby DPH**

0 chybných sazeb, všechny položky mají KN kód, validace automatická před odesláním faktury.

*Indikátory:*

- ✓ 0 chybných
- ✓ KN 100 % pokrytí
- ✓ Auto-validace
- ✓ 0 opravných dokladů

*Doporučené akce:*

1. Udržovat katalog aktuální
2. Monitoring legislativy

#### ❌ Rizikový stav

**Chybné sazby — potřeba oprav**

4 faktury se sazbou 21 % místo 12 % — přefakturováno klientovi, riziko doměrku + penále, nutnost opravných daňových dokladů.

*Indikátory:*

- ✗ 4 chybné faktury
- ✗ Přeúčtováno 35K
- ✗ Riziko doměrku
- ✗ Nutné ODD

*Nápravná opatření:*

1. Okamžitě vystavit ODD (§ 45 ZoDPH)
2. Vrátit klientovi přeplatek
3. Update KN mapování
4. Školení fakturantek

**Související analýzy:** 6-01, 1-05

---

<a id="sekce-7"></a>

## Sekce 7: Klientská komunikace

### 7-01 — Sentiment v čase

**Zdroj:** NLP Daktela

| | |
|---|---|
| **Frekvence** | Denně (automaticky) |
| **Automatizace** | 92 % automatizováno |
| **Business impact** | Vysoký — včasná detekce nespokojenosti zabrání odchodu klienta |
| **Status** | Produkce |

**Popis:**

NLP analýza sentimentu v klientské komunikaci (emaily, hovory, chat) sleduje vývoj spokojenosti klienta v čase. Systém detekuje nejen aktuální sentiment, ale zejména jeho trendy — náhlý propad je silným prediktorem odchodu klienta.

Analýza pracuje s texty z Daktely (contact center), emailů a zápisů z osobních schůzek. Model je natrénován na českém a německém jazyce s porozuměním oborovým termínům.

Klíčovou funkcí je detekce change pointů — momentů, kdy se sentiment výrazně změní. Tyto body jsou korelovány s konkrétními událostmi (chyba v účetnictví, zdražení, změna účetní).

**Metodologie:**

Transformer-based NLP model s fine-tuningem na CZ/DE účetní komunikaci: 1) Klasifikace sentimentu per zpráva (pozitivní/neutrální/negativní), 2) Agregace do týdenního score, 3) Change point detection (Bayesovská metoda), 4) Korelace s CRM událostmi, 5) Predikce trendu na 30 dní.

**Datové vstupy:**

- Emailová komunikace (IMAP)
- Přepisy hovorů z Daktely
- Chat zprávy
- Zápisy z osobních schůzek
- CRM události (zdražení, reklamace, změna účetní)

**Výstupní metriky:**

- Sentiment score (0–100 %)
- Trend (rostoucí/klesající/stabilní)
- Change point data s příčinou
- Predikce sentimentu na 30 dní
- Top negativní témata

#### ✅ Dobrý stav

**Stabilně spokojený klient**

Sentiment se drží na 78 % (pozitivní) s minimálními výkyvy. Klient proaktivně komunikuje, oceňuje práci kanceláře a doporučuje ji dalším.

*Indikátory:*

- ✓ Sentiment 78 % — stabilní 6 měsíců
- ✓ 0 change pointů v negativním směru
- ✓ Klient zmínil doporučení 2×
- ✓ Response rate 95 % do 24h

*Doporučené akce:*

1. Udržovat aktuální kvalitu služeb
2. Zvážit upsell — klient je vhodný kandidát
3. Požádat o referenci / testimonial

#### ❌ Rizikový stav

**Dramatický propad sentimentu**

Sentiment klesl z 82 % na 34 % za 3 měsíce. Change point identifikován na 12.1.2026 — koreluje se změnou účetní a 2 chybami v DPH přiznání.

*Indikátory:*

- ✗ Propad z 82 % na 34 % (−48 bodů)
- ✗ Change point: 12.1.2026
- ✗ 2 negativní témata: chyby, komunikace
- ✗ Response rate klesl na 40 %

*Nápravná opatření:*

1. Okamžitá osobní schůzka s klientem
2. Identifikovat a opravit root cause (chyby v DPH)
3. Zvážit změnu přiděleného účetního
4. Nabídnout kompenzaci za způsobené problémy

**Související analýzy:** 7-03, 7-04, 7-06, 10-01

---

### 7-02 — Témata dotazů

**Zdroj:** topic modeling

| | |
|---|---|
| **Frekvence** | Týdně (BERTopic re-fit měsíčně) |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Vysoký — indikátor typu vztahu s klientem |
| **Status** | Produkce |

**Popis:**

Topic modeling (LDA/BERTopic) nad přepisy hovorů z Daktela Cloud a emailovými konverzacemi identifikuje dominantní témata, o kterých klient komunikuje. Distribuce témat ukazuje, zda je vztah orientovaný na hodnotu (konzultace, rozvoj) nebo na řešení problémů (stížnosti, urgence).

Systém klasifikuje zprávy do 12 standardních témat (DPH, mzdy, uzávěrka, faktury, reklamace, konzultace, legislativa, upsell, cena, chyby, dotaz na stav, jiné) a sleduje jejich podíl v čase.

**Metodologie:**

BERTopic s českým embedding modelem (Seznam/small-e-czech) nad přepisy z Daktela Cloud API (GET /api/v6/records) a emaily (imapflow). Ke každé zprávě se přiřadí top-1 topic + pravděpodobnost. Trend-over-time analýza podílu stížnostních vs. konzultačních témat. Threshold: > 50 % stížnostní témata = alert.

**Datové vstupy:**

- Přepisy hovorů — Daktela GET /api/v6/records
- Chat zprávy — Daktela GET /api/v6/chat/conversations
- Emailová komunikace (imapflow IMAP)
- Historické označení témat (training data)
- CRM štítky typů interakcí

**Výstupní metriky:**

- Podíl proaktivních témat (%)
- Podíl stížnostních témat (%)
- Top 5 témat per klient
- Trend témat 6M
- Topic entropy (diverzita komunikace)

#### ✅ Dobrý stav

**Konzultativní vztah**

60 % komunikace tvoří proaktivní konzultace o rozvoji, daňové optimalizaci a legislativních změnách. Klient vnímá kancelář jako partnera, ne jen dodavatele.

*Indikátory:*

- ✓ 60 % proaktivní konzultace
- ✓ 25 % provozní dotazy
- ✓ 15 % operativa
- ✓ 0 % stížnosti za 3 měsíce

*Doporučené akce:*

1. Dokumentovat konzultační cases pro marketing
2. Nabídnout advisory balíček
3. Použít pro referenční marketing

#### ❌ Rizikový stav

**Reaktivní hasičský mód**

85 % komunikace jsou stížnosti, reklamace a urgence. Klient má pocit, že kancelář jen hasí požáry, které sama způsobuje.

*Indikátory:*

- ✗ 85 % stížnosti/urgence
- ✗ 5 stížností za měsíc (3× průměr)
- ✗ Topic drift — rostoucí podíl reklamací
- ✗ 0 % strategické konzultace

*Nápravná opatření:*

1. Root cause analýza opakujících se stížností
2. Eskalace na senior partnera kanceláře
3. Retention plán s konkrétními akcemi
4. Zvážit změnu týmu obsluhujícího klienta

**Související analýzy:** 7-01, 7-03, 7-09, 12-02

---

### 7-03 — Frustrace a eskalace

**Zdroj:** change point

| | |
|---|---|
| **Frekvence** | Real-time alerty + týdenní review |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Kritický — predikce akutního churn rizika |
| **Status** | Produkce |

**Popis:**

Change point detection (PELT algoritmus) nad sentiment time series identifikuje konkrétní okamžiky, kdy došlo ke skokové změně v komunikaci klienta. Slouží k detekci frustrace dřív, než vyústí ve výpověď smlouvy.

Systém automaticky označuje eskalační události — výskyt vulgarismů, požadavek na mluvení s vedoucím, pohrůžka odchodem, zmínka právníka — a mapuje je na časovou osu.

**Metodologie:**

PELT change point detection (ruptures Python library) na denní sentiment time series z 7-01. Pro každý detekovaný bod: 1) Extrakce okolních zpráv (±3 dny), 2) Klasifikace eskalačních triggerů (keyword matching + NLP), 3) Korelace s CRM událostmi, 4) Alert při detekci eskalace do 1 hodiny.

**Datové vstupy:**

- Denní sentiment time series (7-01)
- Přepisy Daktela hovorů (GET /api/v6/calls)
- Emaily s flag priority
- CRM events log (ticket eskalace)
- Eskalační keyword slovník (CZ/DE)

**Výstupní metriky:**

- Počet change pointů / kvartál
- Počet eskalačních událostí
- Mean time to eskalace
- Top triggers eskalace
- Mapa eskalací → root cause

#### ✅ Dobrý stav

**Klidný průběh spolupráce**

Za poslední kvartál 0 eskalací, žádný change point v negativním směru. Klient komunikuje konzistentně klidně.

*Indikátory:*

- ✓ 0 eskalací za Q1
- ✓ 0 change pointů
- ✓ 0 výskytů eskalačních keywords
- ✓ Konzistentní sentiment 75 %+

*Doporučené akce:*

1. Pokračovat v standardní komunikaci
2. Použít jako benchmark pro tým

#### ❌ Rizikový stav

**Kumulace eskalací**

3 eskalace za kvartál, major change point 12.3.2026 (zhoršení o 40 sentiment bodů). Trigger: chyba v DPH + pozdní reakce účetního.

*Indikátory:*

- ✗ 3 eskalace za kvartál
- ✗ Change point: 12.3.2026 (−40 bodů)
- ✗ 2× zmínka 'právník' / 'výpověď'
- ✗ 1× požadavek na vedení

*Nápravná opatření:*

1. Okamžitá schůzka partnera kanceláře s klientem
2. Kompenzační nabídka (sleva / bezplatná služba)
3. Výměna account managera
4. Týdenní review status do stabilizace

**Související analýzy:** 7-01, 7-02, 7-06, 10-01

---

### 7-04 — Frekvence kontaktů

**Zdroj:** metadata

| | |
|---|---|
| **Frekvence** | Denně |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Vysoký — klíčový prediktor tichého odchodu |
| **Status** | Produkce |

**Popis:**

Monitoring frekvence a kadence kontaktů mezi klientem a kanceláří. Ztichlý klient (zero communication window) je často signálem tichého odchodu — klient si vybírá konkurenci a ukončí spolupráci v okamžiku, kdy bude připraven.

Systém agreguje kontakty napříč kanály (email, Daktela, WhatsApp, osobní schůzky) a porovnává s baseline klienta.

**Metodologie:**

Metadata aggregation z Daktela (GET /api/v6/calls), IMAP message headers, WhatsApp Business API a Reenio booking API. Výpočet baseline kontaktní frekvence per klient (medián za 12M). Alert při zero communication window > baseline × 2.5. Kadence analýza (pravidelnost vs. shluk).

**Datové vstupy:**

- Daktela call metadata (GET /api/v6/calls)
- Email headers (IMAP, imapflow)
- WhatsApp Business API conversation log
- Reenio booking API /api/bookings
- Baseline frekvence per klient (12M medián)

**Výstupní metriky:**

- Kontaktů za měsíc
- Odchylka od baseline (%)
- Dny od posledního kontaktu
- Kanálová distribuce
- Kadence (std dev intervalů)

#### ✅ Dobrý stav

**Zdravá kadence komunikace**

Klient kontaktuje kancelář pravidelně 2× měsíčně, v mix kanálech (email + osobní schůzka). Žádný silent window delší než 3 týdny.

*Indikátory:*

- ✓ 2 kontakty / měsíc
- ✓ Max silent window 18 dní
- ✓ Mix email + schůzka
- ✓ Kadence stabilní 12M

*Doporučené akce:*

1. Udržet pravidelnost
2. Využít k proaktivnímu upsellu

#### ❌ Rizikový stav

**Tichý odchod**

Klient 4 měsíce nekontaktoval kancelář, na poslední email neodpověděl. Historicky kontaktoval 3×/měsíc — jasný signál tichého odchodu.

*Indikátory:*

- ✗ 120 dní bez kontaktu
- ✗ Baseline 3 kontakty/měsíc → 0
- ✗ 2 neodpovězené emaily
- ✗ Zrušil poslední 2 schůzky

*Nápravná opatření:*

1. Okamžitý proactive outreach (telefon, ne email)
2. Partner kanceláře volá osobně
3. Retention nabídka připravena
4. Zkontrolovat, zda nezakládal novou účetní firmu (ARES)

**Související analýzy:** 7-01, 7-06, 7-10, 10-01

---

### 7-05 — Preferovaný kanál

**Zdroj:** logy

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Střední — operativní efektivita + compliance |
| **Status** | Produkce |

**Popis:**

Analýza kanálové distribuce komunikace per klient. Mix kanálů s převahou dokumentovatelných (email, chat) umožňuje efektivní trasování a audit. Naopak 100 % telefon je operativně i právně rizikové — žádný záznam, ústní instrukce bez auditu.

**Metodologie:**

Agregace metadat z Daktela (hovory, chat), IMAP (emaily), WhatsApp Business API a Reenio (osobní). Výpočet podílu každého kanálu v % zpráv i v % času obsluhy. Klasifikace: dokumentovatelný (email, chat, WhatsApp s přepisem) vs. volatilní (telefon bez přepisu).

**Datové vstupy:**

- Daktela GET /api/v6/calls (hovory)
- Daktela GET /api/v6/chat/conversations
- IMAP emailové konverzace
- WhatsApp Business API
- Reenio booking API (osobní schůzky)

**Výstupní metriky:**

- Podíl per kanál (%)
- Čas obsluhy per kanál
- Dokumentovatelnost mix (%)
- Preferenční skóre
- Trend kanálů 12M

#### ✅ Dobrý stav

**Zdravý kanálový mix**

65 % email, 20 % osobní schůzka, 15 % telefon. Veškerá instrukce dokumentovaná, auditovatelná, traceable.

*Indikátory:*

- ✓ Email 65 %, Telefon 15 %
- ✓ 100 % hovorů s přepisem (Daktela)
- ✓ Dokumentace 95 %
- ✓ Low operational risk

*Doporučené akce:*

1. Udržet mix
2. Nabídnout self-service portál jako 4. kanál

#### ❌ Rizikový stav

**Výhradně telefonická komunikace**

100 % komunikace přes osobní telefon jednatele, hovory nejsou nahrávané. Žádný audit trail, klient si pak pamatuje 'jinak'.

*Indikátory:*

- ✗ 100 % telefon bez přepisu
- ✗ 0 emailových potvrzení
- ✗ Sporné instrukce — 3× měsíčně
- ✗ Compliance risk (GDPR article 5 accountability)

*Nápravná opatření:*

1. Vynutit přepis všech hovorů přes Daktela
2. Vyžadovat emailové potvrzení kritických instrukcí
3. Edukovat klienta o audit trail
4. Případně refuse telefonické přijímání závazných instrukcí

**Související analýzy:** 7-04, 7-06, 11-07

---

### 7-06 — Rychlost odpovědí

**Zdroj:** timestamps

| | |
|---|---|
| **Frekvence** | Denně (real-time dashboard) |
| **Automatizace** | 98 % automatizováno |
| **Business impact** | Vysoký — přímý driver NPS a retence |
| **Status** | Produkce |

**Popis:**

Response time analýza — čas od přijetí požadavku klienta k první smysluplné odpovědi účetního. Klíčový faktor vnímané kvality služby. Empiricky: odpověď nad 24h systematicky kazí NPS, nad 72h generuje stížnosti.

**Metodologie:**

Pairing request-response z IMAP thread headers a Daktela ticket timestamps. Výpočet first_response_time = response.received_at − request.sent_at. Filtr pracovní doby (po-pá 8-17). Percentilové metriky (p50, p90, p95). SLA threshold per segment klienta.

**Datové vstupy:**

- IMAP email thread timestamps
- Daktela ticket system events
- Daktela chat conversation logs
- Pracovní kalendář (svátky, dovolená)
- SLA definice per klient

**Výstupní metriky:**

- Průměrný first response time (h)
- p50 / p90 / p95 response time
- SLA compliance rate (%)
- Trend 6M
- Distribuce per účetní

#### ✅ Dobrý stav

**Bleskové reakce**

Průměrná reakce 2.4 h během pracovní doby, p95 pod 8 h. Klient vnímá kancelář jako responzivní a profesionální.

*Indikátory:*

- ✓ Průměr 2.4 h
- ✓ p95 = 7.2 h
- ✓ SLA compliance 98 %
- ✓ 0 stížností na rychlost

*Doporučené akce:*

1. Použít v marketingu (fast response)
2. Benchmarkovat tým proti této metrice

#### ❌ Rizikový stav

**Pomalé reakce — ztráta důvěry**

Průměr 72 h na odpověď. Klient si stěžuje v každém druhém hovoru. Opakovaně 'jsem musel urgovat 3×'.

*Indikátory:*

- ✗ Průměr 72 h
- ✗ p95 = 168 h (týden)
- ✗ SLA compliance 42 %
- ✗ 12 stížností za kvartál na rychlost

*Nápravná opatření:*

1. Auto-acknowledgement email do 1 h
2. Navýšit kapacitu účetního týmu
3. Redistribuovat klienty z přetíženého účetního
4. SLA dashboard real-time pro vedení

**Související analýzy:** 7-01, 7-05, 11-01, 11-09

---

### 7-07 — Délka zpráv

**Zdroj:** délka textů

| | |
|---|---|
| **Frekvence** | Týdně |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Vysoký — behaviorální mikrosignál churn |
| **Status** | Beta |

**Popis:**

Lingvistická analýza průměrné délky zpráv klienta. Dramatické zkrácení zpráv je behaviorální mikrosignál disengagementu — klient už nevynakládá energii na podrobný popis, protože mentálně odchází.

**Metodologie:**

Word count per zpráva (spaCy cs_core_news_lg tokenizace), klouzavý 30denní průměr. Porovnání current window vs. historical baseline (12M). Change point detection PELT na word count time series. Alert při poklesu > 50 % vs. baseline.

**Datové vstupy:**

- Emailová komunikace (IMAP body text)
- Chat zprávy (Daktela)
- WhatsApp zprávy
- Baseline word count per klient (12M)
- spaCy tokenizer cs_core_news_lg

**Výstupní metriky:**

- Průměrná délka zprávy (slov)
- 30-day rolling mean
- Odchylka od baseline (%)
- Trend (změna slope)
- Change points detekovány

#### ✅ Dobrý stav

**Konzistentní zapojení**

Klient píše průměrně 120 slov / zpráva, stabilně 12 měsíců. Vyjadřuje kontext, klade doplňující otázky, vysvětluje záměr.

*Indikátory:*

- ✓ 120 slov / zpráva
- ✓ Odchylka od baseline ±8 %
- ✓ 0 change pointů
- ✓ Plnohodnotné věty, kontext

*Doporučené akce:*

1. Udržet stávající úroveň komunikace

#### ❌ Rizikový stav

**Disengagement — telegrafický styl**

Průměrná délka klesla ze 150 na 12 slov za 2 měsíce. Klient odpovídá jen 'ok', 'ano', 'ne'. Silný prediktor nadcházejícího odchodu.

*Indikátory:*

- ✗ Pokles 150 → 12 slov (−92 %)
- ✗ Change point před 2 měsíci
- ✗ Telegrafické odpovědi
- ✗ Přestal klást doplňující otázky

*Nápravná opatření:*

1. Partner kanceláře osobně kontaktuje klienta
2. Identifikovat příčinu disengagementu
3. Retention intervence (sleva / osobní schůzka)
4. Připravit exit scenario pro případ odchodu

**Související analýzy:** 7-01, 7-04, 10-01

---

### 7-08 — Kdy klient píše

**Zdroj:** timestamps

| | |
|---|---|
| **Frekvence** | Týdně |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Střední — indikátor celkového stavu klienta |
| **Status** | Produkce |

**Popis:**

Circadian analysis kdy klient komunikuje. Pravidelná komunikace v pracovní době indikuje zdravý business. Noční a víkendové zprávy signalizují stress, přepracování nebo krizový mód — často předchází eskalaci nebo odchodu.

**Metodologie:**

Histogram timestampů zpráv (hour of day, day of week). Kategorizace: working_hours (po-pá 8-17), evening (17-22), night (22-8), weekend. Výpočet podílu non-working hours. Anomaly detection ISO forest na circadian pattern.

**Datové vstupy:**

- IMAP message headers (Date)
- Daktela call timestamps
- WhatsApp message timestamps
- Chat conversation events
- Pracovní kalendář ČR (svátky)

**Výstupní metriky:**

- Podíl working hours (%)
- Podíl night hours (%)
- Podíl weekend (%)
- Peak hour komunikace
- Anomaly score circadian

#### ✅ Dobrý stav

**Normální pracovní rytmus**

95 % komunikace v po-pá 9-17. Klient má zdravý business, komunikuje v rozumných hodinách.

*Indikátory:*

- ✓ 95 % working hours
- ✓ 0 % night (22-8)
- ✓ 2 % weekend (akceptovatelné)
- ✓ Peak 10:00-11:00

*Doporučené akce:*

1. Pokračovat ve standardu

#### ❌ Rizikový stav

**Krizový mód — noční a víkendová komunikace**

Klient píše v neděli 23:00, pondělí 6:00, sobotu 22:00. 35 % zpráv mimo pracovní dobu. Silný signál stresu nebo likviditní krize.

*Indikátory:*

- ✗ 35 % zpráv non-working
- ✗ 8 zpráv v noci (22-6)
- ✗ 12 víkendových zpráv
- ✗ Anomaly score 0.91 (max 1.0)

*Nápravná opatření:*

1. Osobní schůzka — identifikovat příčinu stresu
2. Zkontrolovat likviditu klienta (9-03, 10-09)
3. Nabídnout cash flow konzultaci
4. Alert na churn risk (10-01)

**Související analýzy:** 7-01, 7-03, 10-01, 10-09

---

### 7-09 — Opakované problémy

**Zdroj:** deduplikace

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 80 % automatizováno |
| **Business impact** | Vysoký — hlavní driver eskalací a churn |
| **Status** | Produkce |

**Popis:**

Deduplikace a klastrování klientských problémů. Opakující se stejný problém signalizuje nevyřešený root cause — klient se zeptá, dostane odpověď, ale systémový problém zůstává. Kumulativně vede k frustraci.

**Metodologie:**

Semantic similarity clustering (sentence-transformers multilingual model) nad tématy z 7-02. Pro každý ticket/email výpočet cosine similarity s historickými problémy. Threshold 0.85 = opakování. Root cause analysis pomocí LLM shrnutí.

**Datové vstupy:**

- Kategorizované problémy z 7-02
- Ticket systém (Daktela)
- Emailové threads
- Resolution notes účetního
- Sentence-transformers embeddings

**Výstupní metriky:**

- Počet opakujících se problémů
- Top 5 opakovaných témat
- Average time between recurrence
- Resolution effectiveness (%)
- Root cause map

#### ✅ Dobrý stav

**Problémy řešené napoprvé**

0 opakujících se problémů za 12 měsíců. Každý issue je uzavřen s root cause fix, klient se neptá znovu.

*Indikátory:*

- ✓ 0 opakování
- ✓ First-call resolution 94 %
- ✓ Issue closure s root cause
- ✓ Klient nepožaduje eskalace

*Doporučené akce:*

1. Dokumentovat best practices
2. Použít v onboardingu nových účetních

#### ❌ Rizikový stav

**Stejný problém bez fixu**

Klient hlásí stejný problém (chyba v zaúčtování mzdy) 5× za rok. Account team neeliminoval root cause — problém vzniká znovu při každém měsíčním zpracování.

*Indikátory:*

- ✗ 5 opakování za rok
- ✗ Průměrný interval 2 měsíce
- ✗ Stejný root cause (mzdový šablon)
- ✗ Eskalační sentiment ++ s každým opakováním

*Nápravná opatření:*

1. Hluboká root cause analýza (5 Whys)
2. Permanent fix šablony
3. Code review procesu zaúčtování mezd
4. Proaktivní informování klienta o fixu

**Související analýzy:** 7-02, 11-02, 11-07

---

### 7-10 — Reenio rezervace

**Zdroj:** kalendář

| | |
|---|---|
| **Frekvence** | Týdně |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Vysoký — prediktor odchodu při 2+ zrušeních |
| **Status** | Produkce |

**Popis:**

Analýza osobních schůzek přes Reenio booking systém. Kadence schůzek a především míra zrušení jsou silné signály engagementu. 3 zrušení po sobě je v praxi téměř jistý prediktor odchodu klienta.

**Metodologie:**

Reenio booking API (/api/bookings) timestamps + status events. Metriky: booking_rate (schůzek/kvartál), cancellation_rate, no_show_rate, reschedule_chain_length. Alert při 2+ cancelations consecutively nebo no_show_rate > 20 %.

**Datové vstupy:**

- Reenio API /api/bookings
- Reenio API /api/bookings/{id}/events
- Historická frekvence schůzek
- Kontext zrušení (reason field)
- CRM link event → klient

**Výstupní metriky:**

- Schůzek / kvartál
- Cancellation rate (%)
- No-show rate (%)
- Consecutive cancellation count
- Průměrná délka schůzky

#### ✅ Dobrý stav

**Pravidelné osobní schůzky**

Klient absolvuje kvartální review schůzku, měsíční status call. 0 zrušení za rok, vždy přichází připraven.

*Indikátory:*

- ✓ 4 schůzky / kvartál
- ✓ 0 % cancellation
- ✓ 0 % no-show
- ✓ Průměrná délka 68 min (plně využitá)

*Doporučené akce:*

1. Udržet kadenci
2. Rozšířit o strategický review 1×/rok

#### ❌ Rizikový stav

**Ztrácí zájem o osobní kontakt**

3 zrušené schůzky po sobě, vždy na poslední chvíli. Klient na email žádá přesunutí 'na později' bez konkrétního termínu. Silný signál disengagementu.

*Indikátory:*

- ✗ 3 consecutive cancellations
- ✗ Cancellation rate 80 %
- ✗ 2× přesunutí bez nového termínu
- ✗ Reason: 'nemám čas' (2×), 'přesunu později' (1×)

*Nápravná opatření:*

1. Partner kanceláře volá osobně, ne email
2. Nabídka remote meeting (Teams) místo osobní
3. Retention alert — churn risk (10-01)
4. Zkrácení schůzky na 20 min 'quick sync'

**Související analýzy:** 7-04, 7-11, 10-01

---

### 7-11 — Osobní vs. digitální

**Zdroj:** segmentace

| | |
|---|---|
| **Frekvence** | Kvartálně |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Střední — dopad na škálovatelnost kanceláře |
| **Status** | Produkce |

**Popis:**

Segmentace klienta podle preference osobní vs. digitální komunikace. Mix naznačuje digitálně gramotného klienta, se kterým lze škálovat a automatizovat. 100 % osobní kontakt omezuje škálovatelnost a blokuje self-service portál.

**Metodologie:**

Poměr osobních schůzek (Reenio) a telefonátů vs. digitálních kanálů (email, chat, self-service portal logins). Výpočet digital_literacy_score = digital_interactions / total_interactions. Korelace s využitím self-service portálu a mobilní aplikace.

**Datové vstupy:**

- Reenio osobní schůzky
- Daktela hovory
- IMAP / chat digitální
- Self-service portál login logs
- Mobilní aplikace analytika

**Výstupní metriky:**

- Digital literacy score (0-100)
- Poměr osobní / digitální (%)
- Self-service adoption rate
- Cost-to-serve per kanál
- Trend digitalizace 12M

#### ✅ Dobrý stav

**Digitálně gramotný klient**

70 % digitální komunikace (email, chat, self-service), 30 % osobní (schůzky pro strategii). Klient aktivně využívá portál pro stahování dokumentů.

*Indikátory:*

- ✓ Digital literacy 72 / 100
- ✓ Osobní 30 % : digitální 70 %
- ✓ Self-service logins 15×/měsíc
- ✓ Cost-to-serve 40 % pod průměrem

*Doporučené akce:*

1. Nabídnout API integraci (ERP ↔ kancelář)
2. Pilot program pro nové digitální služby
3. Upsell automation balíčku

#### ❌ Rizikový stav

**Pouze osobní kontakt**

100 % komunikace osobně nebo telefonicky. Klient nikdy nepoužil self-service portál, nečte emaily, vyžaduje fyzické dokumenty. Blokuje digitální transformaci.

*Indikátory:*

- ✗ Digital literacy 8 / 100
- ✗ 100 % osobní + telefon
- ✗ 0 logins do portálu za rok
- ✗ Cost-to-serve 3× průměr

*Nápravná opatření:*

1. Edukační workshop (1-on-1)
2. Zjednodušený onboarding portálu (video návod)
3. Přecenění: digitální sleva, osobní prémie
4. Pokud odmítne — přesunout do premium cenové kategorie

**Související analýzy:** 7-05, 7-10, 12-01

---

<a id="sekce-8"></a>

## Sekce 8: Hlasová a lingvistická analýza

### 8-01 — Rychlost řeči

**Zdroj:** audio

| | |
|---|---|
| **Frekvence** | Per hovor (automaticky) |
| **Automatizace** | 88 % automatizováno |
| **Business impact** | Střední — doplňkový indikátor emocionálního stavu |
| **Status** | Beta |

**Popis:**

Analýza rychlosti řeči v telefonních hovorech a videokonferencích je jedním z nejspolehlivějších indikátorů emocionálního stavu klienta. Zvýšená rychlost řeči koreluje se stresem, nespokojeností nebo urgencí, zatímco příliš pomalá řeč může signalizovat únavu nebo depresi.

Systém automaticky analyzuje audio záznamy z Daktely a měří počet slov za minutu, pauzy, intonaci a variabilitu tempa. Výsledky jsou agregovány per klient a sledovány v čase.

Kombinace s dalšími lingvistickými ukazateli (sentiment, slovník, ironie) vytváří komplexní obraz komunikačního stylu klienta.

**Metodologie:**

Akustická analýza: 1) Speech-to-text s timestamps per slovo, 2) Výpočet WPM (words per minute) per segment, 3) Detekce pauz a jejich délky, 4) Variabilita tempa (std. odchylka), 5) Porovnání s baseline klienta (jeho normální tempo).

**Datové vstupy:**

- Audio záznamy z Daktely
- Přepisy hovorů (STT)
- Historické baseline per klient
- Metadata hovorů (čas, délka, iniciátor)

**Výstupní metriky:**

- WPM (slov za minutu)
- Odchylka od baseline klienta
- Počet a délka pauz
- Variabilita tempa
- Trend rychlosti řeči v čase

#### ✅ Dobrý stav

**Klidná a vyrovnaná komunikace**

Klient mluví průměrně 140 slov/min, což odpovídá jeho baseline. Pauzy jsou přirozené, tempo stabilní. Komunikace je konstruktivní a věcná.

*Indikátory:*

- ✓ 140 WPM — v normálu (baseline 135–150)
- ✓ Přirozené pauzy 0.5–1.5s
- ✓ Stabilní tempo bez výkyvů
- ✓ Konzistentní s posledními 6 hovory

*Doporučené akce:*

1. Žádná akce nutná
2. Archivovat jako referenční záznam

#### ❌ Rizikový stav

**Rozrušený klient**

Rychlost řeči dosáhla 220 WPM — o 60 % nad baseline. Klient mluví bez pauz, přeskakuje témata a opakuje se. Jasný indikátor frustrace nebo urgence.

*Indikátory:*

- ✗ 220 WPM — 60 % nad baseline
- ✗ Minimální pauzy (< 0.2s)
- ✗ Vysoká variabilita tempa
- ✗ Koreluje s negativním sentimentem v emailech

*Nápravná opatření:*

1. Prioritně vyřešit klientův problém
2. Nabídnout osobní schůzku
3. Informovat vedoucího o eskalaci
4. Zkontrolovat poslední interakce — co způsobilo frustraci

**Související analýzy:** 8-02, 8-06, 7-01, 7-03

---

### 8-02 — Změna hlasu v čase

**Zdroj:** akustika

| | |
|---|---|
| **Frekvence** | Měsíčně (agregace) |
| **Automatizace** | 70 % automatizováno |
| **Business impact** | Střední — včasná detekce well-being klienta |
| **Status** | Beta |

**Popis:**

Dlouhodobá akustická analýza hlasového profilu klienta. Změny základního frekvenčního rozsahu (F0), energie hlasu a prozodické variability v čase mohou indikovat zdravotní problémy, únavu, depresi nebo stres. Tato analýza je citlivá (GDPR čl. 9 — zvláštní kategorie dat) a používá se pouze pro interní retention signály.

**Metodologie:**

librosa extrakce akustických featur: pitch mean/std (F0), jitter, shimmer, spectral tilt, energy RMS. Per-klient baseline z prvních 10 hovorů. Anomaly detection (Isolation Forest) na akustickém vektoru. pyAudioAnalysis pro klasifikaci emocionální valence.

**Datové vstupy:**

- Audio záznamy Daktela (GET /api/v6/records)
- librosa audio features (pitch, energy, tempo)
- pyAudioAnalysis emocionální klasifikátor
- Baseline akustický profil per klient
- Metadata hovoru (čas, délka)

**Výstupní metriky:**

- Prozodická variabilita (std F0)
- Energy RMS trend
- Jitter / shimmer (kvalita hlasu)
- Emocionální valence score
- Anomaly score akustický

#### ✅ Dobrý stav

**Konzistentní vokální profil**

Klient má stabilní akustický profil, prozodická variabilita v normálu, energie vyvážená. Hlas zní 'normálně' napříč hovory.

*Indikátory:*

- ✓ F0 std konstantní ±5 %
- ✓ Energy RMS stabilní
- ✓ 0 anomalies za 6M
- ✓ Valence neutral/positive

*Doporučené akce:*

1. Pokračovat v monitoringu

#### ❌ Rizikový stav

**Monotónní hlas — varovný signál**

Dlouhodobý pokles prozodické variability o 40 %, plochá intonace, pokles energie. Akustický profil odpovídá vzorci deprese nebo dlouhodobé únavy. Klient potřebuje lidský kontakt, ne jen service.

*Indikátory:*

- ✗ F0 std pokles −40 %
- ✗ Energy RMS −25 %
- ✗ Monotónní intonace 3+ měsíce
- ✗ Valence negative

*Nápravná opatření:*

1. Empatický outreach partnerem kanceláře
2. Nabídnout osobní schůzku v klidném prostředí
3. Zjistit kontext (zdraví, rodina, business)
4. Diskrétně — NIKDY nediagnostikovat (§ 9 GDPR)

**Související analýzy:** 8-01, 8-06, 7-01, 7-08

---

### 8-03 — Odborný vs. laický slovník

**Zdroj:** lexikální

| | |
|---|---|
| **Frekvence** | Kvartálně |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Střední — kvalita vzájemného porozumění |
| **Status** | Produkce |

**Popis:**

Lexikální analýza slovníku klienta — jak často používá odbornou účetní/daňovou terminologii. Určuje úroveň finanční gramotnosti a pomáhá kanceláři kalibrovat komunikační styl. Klient, který nerozumí termínům 'dohadná položka', 'opravná položka' nebo 'daňově uznatelný náklad', potřebuje zjednodušenou komunikaci.

**Metodologie:**

spaCy cs_core_news_lg lemmatizace + dictionary matching proti slovníku účetních termínů (~1200 termů). Výpočet term_usage_rate = domain_terms / total_words. Dále detekce misuse (špatně použitý termín). Klasifikace do 4 úrovní: laik / začátečník / pokročilý / expert.

**Datové vstupy:**

- Přepisy hovorů Daktela (STT)
- Emailová komunikace (IMAP body)
- spaCy cs_core_news_lg
- Slovník účetních/daňových termínů (interní)
- Historická baseline per klient

**Výstupní metriky:**

- Term usage rate (%)
- Klasifikace úrovně (laik/pokročilý/expert)
- Top používané termíny
- Misuse rate (chybné použití)
- Trend 12M (učí se klient?)

#### ✅ Dobrý stav

**Finančně gramotný klient**

Klient aktivně používá odbornou terminologii, správně chápe 80 % termínů. Komunikace je efektivní, bez nutnosti překládat každý pojem.

*Indikátory:*

- ✓ Term usage 18 %
- ✓ Klasifikace 'pokročilý'
- ✓ Misuse rate 2 %
- ✓ Rozumí 80 % termínů

*Doporučené akce:*

1. Zvážit upsell advisory služeb
2. Používat přímou odbornou komunikaci

#### ❌ Rizikový stav

**Lost in translation**

Klient nepoužívá odborné termíny, na dotazy účetního 'Budete potřebovat opravnou položku' odpovídá 'co to je?'. Opakované misuse. Kancelář posílá reporty, kterým klient nerozumí.

*Indikátory:*

- ✗ Term usage 2 %
- ✗ Klasifikace 'laik'
- ✗ Misuse rate 45 %
- ✗ Opakované žádosti o vysvětlení

*Nápravná opatření:*

1. Přepnout komunikační šablony na 'plain Czech'
2. Vytvořit glossary pro klienta
3. Edukační materiál (video / PDF)
4. Při reportech přidat manažerské shrnutí

**Související analýzy:** 8-04, 8-05, 7-02

---

### 8-04 — «My» vs. «já»

**Zdroj:** pronominální

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Střední — prediktor strategických změn klienta |
| **Status** | Beta |

**Popis:**

Pronominální analýza — poměr použití 'my/naše' vs. 'já/moje' v řeči jednatele klienta. Vysoký podíl 'my' znamená identifikaci s firmou, zdravou firemní kulturu. Dominance 'já' může indikovat odtržení zakladatele od firmy, plánovaný exit nebo osamocenost v rozhodování.

**Metodologie:**

spaCy cs_core_news_lg POS tagging + dependency parsing. Extrakce všech osobních zájmen v 1. osobě: sg (já, mě, mi, mně, mnou, můj/má/mé) vs. pl (my, nás, nám, námi, náš/naše). Výpočet plural_ratio = pl_count / (sg_count + pl_count). Porovnání baseline + trend.

**Datové vstupy:**

- Přepisy hovorů Daktela
- Emailová komunikace
- spaCy cs_core_news_lg (POS, DEP)
- Historická baseline (12M)
- Kontext: počet zaměstnanců klienta (ARES)

**Výstupní metriky:**

- Plural ratio (my / celkem 1. osoba)
- Změna ratio vs. baseline
- Trend 12M (zvyšuje / snižuje)
- Korelace s firemními výsledky
- Alert threshold: ratio < 0.3

#### ✅ Dobrý stav

**Jednatel = hrdý člen týmu**

Jednatel používá 'my/naše' v 65 % případů, jasně se identifikuje s firmou. 'U nás ve firmě jsme se rozhodli...' — zdravý přístup.

*Indikátory:*

- ✓ Plural ratio 0.65
- ✓ Konzistentní 12M
- ✓ Mluví o týmu, ne 'já'
- ✓ Pozitivní kontext 'my'

*Doporučené akce:*

1. Zdravý signál — udržet vztah
2. Potenciál pro dlouhodobou spolupráci

#### ❌ Rizikový stav

**Odtržení od firmy**

Jednatel mluví výhradně 'já' (ratio 0.12), firmu popisuje jako 'oni', 'to moje s.r.o.'. Signál plánovaného exitu, prodeje firmy nebo hluboké demotivace.

*Indikátory:*

- ✗ Plural ratio 0.12
- ✗ Pokles z 0.6 → 0.12 za 6M
- ✗ 'Oni ve firmě' — distance
- ✗ Korelace s vypnutou komunikací

*Nápravná opatření:*

1. Osobní schůzka — zjistit co se děje
2. Monitorovat signály prodeje firmy (10-xx)
3. Připravit retention scenario pro případ prodeje
4. Alert na churn risk (10-01)

**Související analýzy:** 8-03, 8-08, 7-01, 10-01

---

### 8-05 — Dialekt

**Zdroj:** fonetika

| | |
|---|---|
| **Frekvence** | Jednorázově při onboardingu + kvartální review |
| **Automatizace** | 80 % automatizováno |
| **Business impact** | Nízký — operativní efektivita |
| **Status** | V přípravě |

**Popis:**

Detekce regionálního dialektu / sociolektu klienta. Silný moravský, hanácký, lašský nebo slovenský dialekt může vést k nedorozumění při přepisu hovorů i v ústní komunikaci. Systém identifikuje dialekt a doporučuje přiřazení účetního se stejným nebo kompatibilním jazykovým zázemím.

**Metodologie:**

Fonetická analýza na audio pomocí pyAudioAnalysis + klasifikátor dialektu (trained na CZ regional accents). Lexikální analýza v přepisech (diagnostická slova: 'bylo' vs. 'buło', 'chleba' vs. 'chléb'). Výsledek: confidence per dialekt (standard CZ, moravský, slezský, slovenský).

**Datové vstupy:**

- Audio Daktela (akustické rysy)
- Přepisy s regionalismy
- Dialektový klasifikátor (pretrained)
- Diagnostický slovník (~200 slov per region)
- Matching účetní ↔ dialekt

**Výstupní metriky:**

- Primary dialekt + confidence
- Dialekt strength (0-100)
- Mutual intelligibility score
- Doporučený účetní (match)
- Flag misunderstanding risk

#### ✅ Dobrý stav

**Standardní čeština bez bariér**

Klient mluví spisovnou češtinou, přepisy STT mají 98 % přesnost. Žádné nedorozumění, žádný dialektický drift.

*Indikátory:*

- ✓ Standard CZ confidence 0.96
- ✓ STT accuracy 98 %
- ✓ 0 misunderstanding cases
- ✓ Dialekt strength < 20

*Doporučené akce:*

1. Standardní komunikace

#### ❌ Rizikový stav

**Silný dialekt — nedorozumění**

Klient mluví silným lašským dialektem, STT má 72 % přesnost. Účetní (z Prahy) nerozumí 15 % sdělení. Opakované dotazy 'co jste říkal?'.

*Indikátory:*

- ✗ Lašský dialekt confidence 0.88
- ✗ STT accuracy 72 %
- ✗ 3 misunderstanding cases / měsíc
- ✗ Dialekt strength 78

*Nápravná opatření:*

1. Přiřadit účetního z Moravy/Slezska
2. Vyžadovat písemné potvrzení klíčových instrukcí
3. Fine-tune STT model na lašský dialekt
4. Reenio schůzky s video (usnadní rozumění)

**Související analýzy:** 8-01, 8-03, 8-07

---

### 8-06 — Ironie a sarkasmus

**Zdroj:** kontextové NLP

| | |
|---|---|
| **Frekvence** | Týdně |
| **Automatizace** | 75 % automatizováno |
| **Business impact** | Vysoký — detekce skrytých problémů |
| **Status** | Beta |

**Popis:**

Detekce ironie a sarkasmu v klientské komunikaci. Ironie je sofistikovaný signál skryté nespokojenosti — klient nemluví přímo, ale sarkastickou poznámkou ('No, aspoň to DPH jste podali včas, že?'). Detekce vyžaduje kontextové NLP, nikoli pouhou sentiment analýzu.

**Metodologie:**

Fine-tuned transformer (XLM-RoBERTa) na CZ sarkasm dataset + kontextová analýza. Kombinace signálů: 1) Pozitivní slova v negativním kontextu, 2) Hyperbola ('konečně', 'aspoň', 'výborně' ironicky), 3) Prozodie (audio, stoupající intonace), 4) Negativní události v předchozí komunikaci.

**Datové vstupy:**

- Přepisy hovorů Daktela
- Emailová komunikace
- Audio prozodie (pyAudioAnalysis)
- Sentiment kontext z 7-01
- XLM-RoBERTa fine-tuned klasifikátor

**Výstupní metriky:**

- Počet ironických poznámek / měsíc
- Sarcasm confidence per výrok
- Top témata ironie
- Sarkasm trend 6M
- Korelace s CRM událostmi

#### ✅ Dobrý stav

**Přímá a otevřená komunikace**

Klient komunikuje přímo, bez ironie. Pokud má problém, řekne to otevřeně. Žádné skryté signály nespokojenosti.

*Indikátory:*

- ✓ 0 detekovaných ironických poznámek
- ✓ Přímá konstruktivní kritika
- ✓ Sarkasm score 0.04 (velmi nízké)
- ✓ Konzistentní tón

*Doporučené akce:*

1. Ocenit přímost
2. Udržet otevřenou komunikaci

#### ❌ Rizikový stav

**Skrytá nespokojenost pod vrstvou sarkasmu**

4 ironické poznámky za poslední měsíc: 'No, aspoň jednou se mi ozvete', 'Super, že jste DPH podali včas', 'Výborně, jen 3 chyby tentokrát'. Sentiment povrchně neutrální, ale skryté silné napětí.

*Indikátory:*

- ✗ 4 ironické poznámky / měsíc
- ✗ Sarcasm score 0.82
- ✗ Témata: rychlost, chyby, compliance
- ✗ Sentiment neutrální (povrchně OK)

*Nápravná opatření:*

1. Okamžitá osobní schůzka — otevřít témata přímo
2. Ocenit pravdu: 'Vnímám, že jste nespokojen'
3. Root cause fix oblastí zmíněných ironicky
4. Monitoring eskalace (7-03)

**Související analýzy:** 7-01, 7-03, 8-01

---

### 8-07 — Jazyk komunikace

**Zdroj:** per-klient

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Vysoký — prediktor strategické změny klienta |
| **Status** | Produkce |

**Popis:**

Detekce primárního jazyka komunikace per klient a jeho změn v čase. Klient, který náhle začne komunikovat v němčině nebo angličtině, může mít nového strategického partnera (např. německá matka zvažuje centralizaci účetnictví), novou generaci vedení nebo připravuje expanzi.

**Metodologie:**

Language detection (langdetect / fastText lid.176) per zpráva. Agregace v čase, detekce switch pointů. Korelace s business kontexty: zahraniční transakce ARES, nový partner v OR, cross-border DPH.

**Datové vstupy:**

- IMAP emailové body
- Přepisy Daktela (jazyk hovoru)
- Chat zprávy
- fastText lid.176 klasifikátor
- ARES data (zahraniční vlastník)

**Výstupní metriky:**

- Primary language per zpráva
- Language mix distribuce (%)
- Switch point detection
- Korelace se změnami OR
- Flag cross-border risk

#### ✅ Dobrý stav

**Stabilní jazykový profil**

Klient komunikuje konzistentně v češtině, 98 % zpráv CZ, 2 % DE (faktury zahraničním dodavatelům — očekávané).

*Indikátory:*

- ✓ 98 % CZ konzistentně
- ✓ 0 switch points
- ✓ DE jen u zahr. faktur
- ✓ Stabilní 12M

*Doporučené akce:*

1. Standardní provoz

#### ❌ Rizikový stav

**Jazyková změna — signál strategické proměny**

Klient v posledních 2 měsících přepnul na 60 % DE komunikaci. Korelace s registrací nového jednatele z Německa v OR. Možná centralizace účetnictví k německé matce — high churn risk.

*Indikátory:*

- ✗ Switch 100% CZ → 60% DE za 2M
- ✗ Nový DE jednatel v OR (ARES)
- ✗ Emailové kopie na DE adresy
- ✗ Otázky k cross-border DPH

*Nápravná opatření:*

1. Osobní schůzka — zjistit strategický plán
2. Nabídnout DE-speaking account team
3. Prezentovat DE kapability kanceláře
4. Proaktivní retention — connect s matkou

**Související analýzy:** 8-05, 8-08, 10-01

---

### 8-08 — Kdo rozhoduje

**Zdroj:** analýza autority

| | |
|---|---|
| **Frekvence** | Kvartálně |
| **Automatizace** | 75 % automatizováno |
| **Business impact** | Vysoký — efektivita retence a upsellu |
| **Status** | Beta |

**Popis:**

Analýza autority v komunikaci — kdo fakticky rozhoduje u klienta? Jednatel, finanční ředitel, asistentka? Identifikace skutečného rozhodovatele je klíčová pro efektivní prodej, retention a strategickou komunikaci. Pokud rozhoduje někdo jiný než oficiální signatář, je riziko, že oficiální kontakty směřují na nepravého adresáta.

**Metodologie:**

NLP analýza formálnosti (Vy/ty, formální x neformální slovník), detekce rozhodovacích marker frází ('schválím', 'rozhodl jsem', 'musím konzultovat s...'). Korelace s email signatures + CC/BCC patterns. Social network analysis kdo inicuje klíčové emaily (platby, smlouvy, strategická rozhodnutí).

**Datové vstupy:**

- Email headers (From/To/CC)
- Email signatures extraction
- Přepisy Daktela (kdo inicioval)
- Formality classifier CZ (Vy/ty detector)
- CRM kontakty s role flags

**Výstupní metriky:**

- Decision maker identifikace
- Authority score per kontakt
- Email iniciace rate per osoba
- Formality rozložení
- Gap: oficiální vs. reálný rozhodovatel

#### ✅ Dobrý stav

**Jednatel aktivně rozhoduje**

Jednatel je primární kontakt, iniciuje 80 % strategických emailů, schvaluje rozhodnutí. Shoda mezi oficiálním a reálným rozhodovatelem.

*Indikátory:*

- ✓ Jednatel iniciuje 80 % strategie
- ✓ Authority score 0.91
- ✓ Alignment oficiální = reálný
- ✓ Decision marker frequency vysoká

*Doporučené akce:*

1. Pokračovat v komunikaci s jednatelem
2. Strategické nabídky cílit na něj

#### ❌ Rizikový stav

**Jednatel mimo — rozhoduje asistentka**

Asistentka iniciuje 75 % emailů, deleguje za jednatele, rozhoduje o platbách 'z jeho jména'. Jednatel ve skutečnosti mimo provoz. Riziko, že oficiální nabídky a retention akce míří k nepravému adresátovi.

*Indikátory:*

- ✗ Asistentka iniciuje 75 %
- ✗ Jednatel authority score 0.18
- ✗ Misalignment oficiální ≠ reálný
- ✗ 'Pan jednatel se k tomu nevyjádří' opakovaně

*Nápravná opatření:*

1. Retention aktivity cílit na asistentku (je to ona, kdo rozhodne)
2. Zjistit, proč je jednatel mimo (nemoc? exit?)
3. Oficiální smlouvy — kontakt na oba
4. Monitoring průběhu (asistentka může odejít)

**Související analýzy:** 8-04, 8-07, 12-01

---

<a id="sekce-9"></a>

## Sekce 9: Finanční profil a CLV

### 9-01 — CLV

**Zdroj:** fakturace − cost to serve

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 70 % automatizováno |
| **Business impact** | Kritický — řízení portfolia klientů |
| **Status** | Produkce |

**Popis:**

Customer Lifetime Value (CLV) je celková hodnota klienta za dobu spolupráce, očištěná o náklady na obsluhu. Systém počítá CLV na základě historické i prediktivní fakturace, odečtených o timesheetové náklady, režii a rizikovou přirážku.

Klíčovou metrikou je poměr CLV ku cost-to-serve — klienti se záporným CLV jsou aktivně identifikováni a navrhuje se buď zdražení, změna rozsahu služeb nebo ukončení spolupráce.

Model predikuje budoucí CLV na základě trendu komunikace, platební morálky a využití služeb.

**Metodologie:**

Prediktivní model: 1) Historická fakturace (12–60 měsíců), 2) Cost-to-serve z timesheetů × interní sazby, 3) Diskontní sazba pro budoucí tok, 4) Churn pravděpodobnost z ML modelu, 5) Expected CLV = SUM(predikované příjmy × (1-churn_prob) - predikované náklady) / (1+r)^t.

**Datové vstupy:**

- Fakturace per klient (historie + pipeline)
- Timesheety zaměstnanců per klient
- Interní sazby a režijní koeficient
- Churn pravděpodobnost z ML modelu
- Platební morálka a trend komunikace

**Výstupní metriky:**

- CLV v Kč (5letý horizont)
- Cost-to-serve per měsíc
- Marže per klient
- CLV trend (rostoucí/klesající)
- Ranking klientů dle CLV

#### ✅ Dobrý stav

**Vysoce hodnotný klient**

CLV dosahuje 480 000 Kč za 5 let s rostoucím trendem. Klient využívá 6 z 8 služeb, platí včas a marže je 42 %.

*Indikátory:*

- ✓ CLV 480 000 Kč / 5 let
- ✓ Marže 42 %
- ✓ Platí do 14 dní
- ✓ Využívá 6/8 služeb

*Doporučené akce:*

1. Nabídnout premium služby
2. Připravit personalizovaný reporting
3. Zvážit loyalty program

#### ❌ Rizikový stav

**Ztrátový klient**

CLV je záporné: −120 000 Kč. Klient vyžaduje nepřiměřený čas (22 hodin/měsíc), platí se zpožděním a využívá jen základní služby za nízkou cenu.

*Indikátory:*

- ✗ CLV −120 000 Kč / 5 let
- ✗ Cost-to-serve 22 000 Kč/měsíc vs. platba 9 000 Kč
- ✗ Průměrná splatnost 67 dní
- ✗ Využívá 1/8 služeb

*Nápravná opatření:*

1. Připravit cenovou revizi
2. Definovat minimální rozsah služeb za aktuální cenu
3. Prezentovat klientovi data o skutečných nákladech
4. Zvážit ukončení spolupráce při odmítnutí úprav

**Související analýzy:** 9-02, 9-03, 9-06, 9-07

---

### 9-02 — Marže na klienta

**Zdroj:** výnosy vs. timesheety

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 80 % automatizováno |
| **Business impact** | Kritický — identifikace ztrátových klientů |
| **Status** | Produkce |

**Popis:**

Per-klient P&L analýza — skutečná marže konkrétního klienta vychází z fakturace mínus náklady na obsluhu (timesheety × interní hodinová sazba + režie). Klient může mít vysoký obrat, ale zároveň být ztrátový, pokud spotřebovává nadměrné hodiny účetního týmu.

**Metodologie:**

Monthly close: SUM(fakturace klienta) − SUM(timesheet_hours × internal_rate × overhead_coefficient). Interní sazba senior účetní 850 Kč/h, junior 450 Kč/h, partner 1800 Kč/h. Overhead koeficient 1.4 (zahrnuje pracoviště, software licence, výcvik). Alert při marži < 15 %.

**Datové vstupy:**

- Money S3 fakturační modul (výstup faktur per klient)
- Timesheety zaměstnanců (hours × klient × role)
- Interní sazby per pozice
- Overhead koeficient (z režijních nákladů)
- CRM klient → projekt mapping

**Výstupní metriky:**

- Revenue per klient (Kč/měsíc)
- Cost-to-serve (Kč/měsíc)
- Marže v Kč a v %
- Hodiny per služba
- Ranking klientů dle marže

#### ✅ Dobrý stav

**Zdravá marže 42 %**

Klient generuje měsíčně 45 000 Kč fakturace při cost-to-serve 26 000 Kč (29 hodin). Marže 42 % odpovídá efektivnímu procesu a odpovídající ceně.

*Indikátory:*

- ✓ Marže 42 %
- ✓ Revenue 45K / měs
- ✓ Cost 26K / měs
- ✓ Efektivita: 1.55K revenue / hour

*Doporučené akce:*

1. Udržet rozsah služeb
2. Sdílet best practices s týmem

#### ❌ Rizikový stav

**Ztrátový klient (marže −8 %)**

Klient platí 9 000 Kč/měsíc, ale cost-to-serve dosahuje 9 720 Kč (17 hodin). Klient vyžaduje nadměrnou osobní komunikaci, časté konzultace a nestandardní požadavky, které nejsou v ceně.

*Indikátory:*

- ✗ Marže −8 %
- ✗ Revenue 9K / měs
- ✗ Cost 9.72K / měs
- ✗ Efektivita: 0.53K revenue / hour

*Nápravná opatření:*

1. Cenová revize +40 % nebo redukce rozsahu
2. Dokumentovat skutečné hodiny klientovi
3. Nabídnout samoobslužný portál (redukce hodin)
4. Při odmítnutí — exit strategie

**Související analýzy:** 9-01, 9-07, 11-09

---

### 9-03 — Platební chování

**Zdroj:** historie úhrad

| | |
|---|---|
| **Frekvence** | Týdně |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Kritický — cashflow a kreditní riziko |
| **Status** | Produkce |

**Popis:**

Analýza platební morálky klienta — Days Sales Outstanding (DSO) per klient, počet upomínek, trend platební morálky. Klíčový prediktor kreditního rizika, cashflow dopadu i blížícího se churn (zpomalující platby jsou klasický behaviorální signál).

**Metodologie:**

Bankovní API (FIO /ib_api/rest/, KB, ČSOB ConnectAPI) párování příchozích plateb s fakturami. Výpočet DSO_client = (payment_date − invoice_due_date) průměr. Upomínkový workflow sledování. Trend DSO 12M rolling. Alert při DSO > 30 dní nebo trend rostoucí.

**Datové vstupy:**

- Bankovní API (FIO, KB, ČSOB) — příchozí platby
- Money S3 faktury vydané (VS, splatnost, částka)
- Párovací engine platba ↔ faktura
- Upomínkový log
- Historická platební baseline 24M

**Výstupní metriky:**

- DSO per klient (dny)
- On-time payment rate (%)
- Počet upomínek / kvartál
- DSO trend 12M
- Predikce inkasa (pravděpodobnost)

#### ✅ Dobrý stav

**Vzorný plátce**

Klient platí průměrně 14 dní před splatností, 100 % plateb včas, 0 upomínek za poslední 2 roky.

*Indikátory:*

- ✓ DSO = 14 dní
- ✓ On-time rate 100 %
- ✓ 0 upomínek
- ✓ Stabilní 24M

*Doporučené akce:*

1. Nabídnout early payment discount (2/10 net 14)
2. Použít jako reference pro factoringovou partnerskou banku

#### ❌ Rizikový stav

**Špatná platební morálka — churn signál**

DSO klesl z 21 na 67 dní za 6 měsíců. 3 upomínky, poslední předžalobní výzva. Kombinace likviditní krize klienta + signál odcházení (už nechce zaplatit).

*Indikátory:*

- ✗ DSO = 67 dní (baseline 21)
- ✗ On-time rate 12 %
- ✗ 3 upomínky / kvartál
- ✗ Předžalobní výzva odeslána

*Nápravná opatření:*

1. Okamžité zastavení dalších služeb (embargo)
2. Zkontrolovat insolvenci klienta (ISIR API)
3. Návrh splátkového kalendáře
4. Alert na churn risk + kreditní riziko

**Související analýzy:** 1-04, 9-01, 10-03, 10-09

---

### 9-04 — Cenová elasticita

**Zdroj:** reakce na zdražení

| | |
|---|---|
| **Frekvence** | Ročně + ad-hoc před zdražením |
| **Automatizace** | 65 % automatizováno |
| **Business impact** | Vysoký — podpora pricing rozhodnutí |
| **Status** | Beta |

**Popis:**

Měření cenové elasticity poptávky per klient — jak klient reaguje na zdražení? Kancelář potřebuje vědět, kterým klientům může bezpečně zdražit (nízká elasticita) a kteří odejdou při minimální změně (vysoká elasticita). Elasticita souvisí s CLV i se segmentací.

**Metodologie:**

Historická analýza: cenová změna × churn probability × sentiment reaction. Pro každou cenovou úpravu (CRM pricing history) měření: 1) Sentiment změna v 30D okně, 2) Churn probability change, 3) Explicit reakce (email/hovor se zmínkou ceny). Elasticita = %Δ churn_prob / %Δ cena.

**Datové vstupy:**

- CRM pricing history per klient
- Sentiment time series (7-01)
- Churn probability history (10-01)
- Price-mention keywords v komunikaci
- Competitor price benchmarks

**Výstupní metriky:**

- Price elasticity koeficient
- Maximum bezpečné zdražení (%)
- Reakční čas na zdražení (dny)
- Price-sensitivity segment
- Churn risk při +X%

#### ✅ Dobrý stav

**Cenově neelastický klient**

Historicky akceptoval +15 % zdražení bez negativní reakce, sentiment nehnutý, 0 zmínek ceny v komunikaci. Klient oceňuje hodnotu služby, ne cenu.

*Indikátory:*

- ✓ Elasticita 0.12 (nízká)
- ✓ Poslední +15 % akceptováno bez reakce
- ✓ 0 price-mentions v 6M
- ✓ Sentiment stabilní po zdražení

*Doporučené akce:*

1. Možnost dalšího zdražení až +20 %
2. Premium upsell nabídka
3. Nepoužívat slevy (nemají efekt)

#### ❌ Rizikový stav

**Extrémně cenově citlivý**

Při minulém zdražení o 5 % klient vyhrožoval odchodem, 8× zmínka 'konkurence levnější'. Sentiment propadl o 30 bodů. Elasticita 2.8 — každé 1 % zdražení vyvolá 2.8 % růst churn rizika.

*Indikátory:*

- ✗ Elasticita 2.8 (vysoká)
- ✗ Vyhrožoval odchodem při +5 %
- ✗ 8 price-mentions / kvartál
- ✗ Sentiment −30 po zdražení

*Nápravná opatření:*

1. NEZDRAŽUJ — zásah by vyvolal odchod
2. Alternativa: value-add místo price-add
3. Loyalty lock-in (roční smlouva se slevou)
4. Rebalanc cost-to-serve (zlevnit obsluhu)

**Související analýzy:** 9-01, 9-05, 10-01, 12-02

---

### 9-05 — Vnímání ceny

**Zdroj:** řeč klienta

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Vysoký — indikátor value perception a churn |
| **Status** | Produkce |

**Popis:**

Lingvistická analýza toho, jak klient mluví o ceně služeb. Frekvence a kontext slov 'drahé / levné / férové / hodnota' odhalují skutečné vnímání hodnoty. Komplementární metrika k 9-04 (tvrdá elasticita) — měkký signál nespokojenosti s cenou.

**Metodologie:**

Keyword extraction + kontextová analýza (spaCy cs_core_news_lg) hledá price-related terms: 'drahé', 'levné', 'férové', 'hodnota', 'zaplatit', 'stojí za', 'výhodné'. Sentiment kolem těchto slov (±5 tokens). Frekvence / měsíc + change detection.

**Datové vstupy:**

- Přepisy hovorů Daktela
- Emailová komunikace
- Price keyword dictionary (CZ)
- Context sentiment ±5 tokens
- Baseline price-mention rate

**Výstupní metriky:**

- Price-mention frequency / měsíc
- Price sentiment (positive/negative)
- Top přídavná jména u 'cena'
- Trend 12M
- Value perception score

#### ✅ Dobrý stav

**Férové vnímání hodnoty**

Klient v komunikaci opakovaně říká 'férová cena', 'stojí to za to', 'hodnota přesahuje cenu'. 0 zmínek 'drahé'. Vnímá kancelář jako investici, ne náklad.

*Indikátory:*

- ✓ 4 pozitivní price-mentions / měsíc
- ✓ 0 negativních
- ✓ Adjektiva: 'férová', 'rozumná', 'odpovídající'
- ✓ Value perception 0.84

*Doporučené akce:*

1. Reference z klientových slov pro marketing
2. Zvážit upsell premium

#### ❌ Rizikový stav

**Klient vnímá cenu jako problém**

V každém hovoru 'to je drahé', 'platím moc', 'konkurence by to udělala za polovinu'. 15 negativních price-mentions za měsíc. Cena je přední příčinou jeho frustrace.

*Indikátory:*

- ✗ 15 neg price-mentions / měsíc
- ✗ 0 pozitivních
- ✗ Adjektiva: 'drahé', 'přehnané', 'neúměrné'
- ✗ Value perception 0.18

*Nápravná opatření:*

1. Edukace o rozsahu služeb (transparentní breakdown)
2. Konkrétní srovnání s konkurencí
3. Prezentace ROI (ušetřené pokuty, optimalizace)
4. Při nemožnosti přesvědčit — off-boarding plán

**Související analýzy:** 7-01, 9-04, 12-03

---

### 9-06 — Upsell/cross-sell

**Zdroj:** gap analýza

| | |
|---|---|
| **Frekvence** | Kvartálně |
| **Automatizace** | 75 % automatizováno |
| **Business impact** | Vysoký — revenue expansion |
| **Status** | Produkce |

**Popis:**

Gap analýza využití služeb portfolia kanceláře. Kancelář nabízí 8 primárních služeb (účetnictví, mzdy, DPH, daňové poradenství, audit, reporting, controlling, ESG). Porovnání kontraktované vs. reálně fakturované × dostupné služby identifikuje upsell příležitosti.

**Metodologie:**

Matrix klient × služba ze Money S3 fakturace + kontraktů. Flag 1 = služba fakturována v 12M, 0 = není. Per-klient utilization rate = Σ services / 8. Cross-reference s potřebami klienta (velikost, obor NACE, legislativní povinnosti — např. audit > 40M Kč obratu).

**Datové vstupy:**

- Money S3 fakturační položky per klient
- Kontrakty a SLA klienta (CRM)
- Služby katalog kanceláře
- ARES data klienta (obrat, zaměstnanci, obor)
- Legislativní matice služeb (audit, ESG povinnosti)

**Výstupní metriky:**

- Service utilization rate (%)
- Nevyužité služby per klient
- Upsell potenciál v Kč/měsíc
- Legislativní gap (povinnosti klienta vs. služby)
- Cross-sell matrix

#### ✅ Dobrý stav

**Maximální využití portfolia**

Klient využívá 6 z 8 služeb (účetnictví, mzdy, DPH, daně, reporting, controlling). Chybí audit (pod prahem) a ESG (zatím nepovinné). Optimální stav.

*Indikátory:*

- ✓ Utilization 75 % (6/8)
- ✓ Nevyužité legitimně (pod prahem)
- ✓ Revenue 68K / měsíc
- ✓ Žádný legislativní gap

*Doporučené akce:*

1. Monitoring růstu klienta (audit trigger při > 40M)
2. Připravit ESG nabídku před 2027 (CSRD)

#### ❌ Rizikový stav

**Masivní nevyužitý potenciál**

Klient fakturuje pouze 1 službu (základní účetnictví) za 8K/měsíc. Přitom má obrat 55M Kč, musí mít audit (povinnost ZoÚ) a má 42 zaměstnanců (mzdy jdou jinam). 7 příležitostí, potenciál 85K/měsíc upsellu.

*Indikátory:*

- ✗ Utilization 12 % (1/8)
- ✗ Upsell potenciál 85K / měsíc
- ✗ Legislativní gap: audit povinný
- ✗ Konkurence dělá 7 služeb (rozdělené dodavatele)

*Nápravná opatření:*

1. Strukturovaný upsell pitch (začít auditem — povinnost)
2. Bundle nabídka se slevou při 3+ službách
3. Prezentace total cost of fragmentation
4. Quarterly review s cross-sell plánem

**Související analýzy:** 9-01, 12-01, 16-01

---

### 9-07 — Klienti ve ztrátě

**Zdroj:** per-klient P&L

| | |
|---|---|
| **Frekvence** | Kvartálně |
| **Automatizace** | 70 % automatizováno |
| **Business impact** | Kritický — portfolio rentability |
| **Status** | Produkce |

**Popis:**

Portfolio-level přehled všech ztrátových klientů. Kombinuje 9-02 (marže) napříč portfoliem a identifikuje kumulativní ztrátu. Slouží jako základ pro strategická rozhodnutí: komu zdražit, koho offboardovat, kde automatizovat.

**Metodologie:**

Portfolio aggregation of 9-02 per-klient marží. Filtr marže < 0. Analýza příčin ztráty (over-servicing, podceněná cena, nestandardní požadavky). Action matrix: zdražit / redukovat rozsah / offboard. Simulace revenue impact per scenario.

**Datové vstupy:**

- Per-klient marže (9-02)
- Historická analýza příčin ztráty
- Timesheet breakdown per aktivita
- Kontraktní struktura (fix/variable)
- Alternativní pricing scenarios

**Výstupní metriky:**

- Počet ztrátových klientů
- Kumulativní ztráta (Kč/rok)
- % portfolia ztrátového
- Root cause distribuce
- Action impact simulace (Kč)

#### ✅ Dobrý stav

**Zdravé portfolio**

0 ztrátových klientů, nejnižší marže v portfoliu 18 %. Pricing discipline napříč portfoliem, žádný over-servicing.

*Indikátory:*

- ✓ 0 ztrátových klientů
- ✓ Min marže 18 %
- ✓ Průměr 34 %
- ✓ 100 % klientů s pozitivním CLV

*Doporučené akce:*

1. Udržet pricing discipline
2. Benchmark pro onboarding nových klientů

#### ❌ Rizikový stav

**Portfolio krvácí na 3 ztrátových klientech**

3 klienti generují kumulativní ztrátu 180 000 Kč/rok. Root cause: 1× podceněná cena (historicky), 1× over-servicing (klient volá denně), 1× nestandardní požadavky bez extra fakturace. Portfolio krvácí 1.5 % revenue.

*Indikátory:*

- ✗ 3 ztrátoví klienti
- ✗ Ztráta −180K / rok
- ✗ Root causes: 33% pricing, 33% over-service, 33% scope creep
- ✗ 2 roky trvající problém

*Nápravná opatření:*

1. Individuální akční plán per klient
2. Klient A: cenová revize +35 %
3. Klient B: redukce rozsahu na smluvní minimum
4. Klient C: offboarding s 90denní notifikací

**Související analýzy:** 9-01, 9-02, 9-06, 12-01

---

<a id="sekce-10"></a>

## Sekce 10: Rizika, fraud, deepfakes

### 10-01 — Churn prediction

**Zdroj:** ML model

| | |
|---|---|
| **Frekvence** | Denně |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Kritický — prevence ztráty revenue |
| **Status** | Produkce |

**Popis:**

Machine learning model predikující pravděpodobnost odchodu klienta na základě desítek signálů: komunikační vzorce, platební morálka, využití služeb, sentiment, externí signály a behaviorální mikrosignály.

Model je natrénován na historických datech o odchodech klientů a dosahuje přesnosti 84 % (AUC-ROC). Predikce se aktualizuje denně a při překročení thresholdu 50 % spouští automatický retention workflow.

Klíčovou hodnotou je čas — model detekuje riziko odchodu průměrně 47 dní před tím, než klient odejde, což dává prostor pro intervenci.

**Metodologie:**

Gradient Boosted Trees (XGBoost): 1) 47 vstupních featur z 8 kategorií, 2) Denní scoring všech aktivních klientů, 3) SHAP values pro vysvětlení top faktorů, 4) Threshold 50 % pro alert, 70 % pro eskalaci, 5) Retention workflow s personalizovanými akcemi.

**Datové vstupy:**

- Sentiment trend (7-01)
- Platební morálka (9-03)
- Frekvence kontaktů (7-04)
- Využití služeb (16-01)
- Externí signály (19-01 až 19-08)
- Behaviorální mikrosignály (17-01 až 17-05)

**Výstupní metriky:**

- Churn pravděpodobnost (0–100 %)
- Top 3 rizikové faktory (SHAP)
- Čas do pravděpodobného odchodu
- Doporučená akce
- Expected revenue loss při odchodu

#### ✅ Dobrý stav

**Portfolio stabilní**

Žádný klient nemá churn pravděpodobnost nad 50 %. Nejvyšší riziko je 23 % u klienta, který zrovna mění jednatele — přirozená dočasná turbulence.

*Indikátory:*

- ✓ 0 klientů nad 50 % rizikem
- ✓ Max riziko 23 %
- ✓ Průměr portfolia 8 %
- ✓ 3 klienti snížili riziko za poslední měsíc

*Doporučené akce:*

1. Pokračovat v monitoringu
2. Sledovat klienta s 23 % — generační změna
3. Aktualizovat model s novými daty

#### ❌ Rizikový stav

**Hrozí ztráta klíčových klientů**

2 klienti s 89 % pravděpodobností odchodu do 60 dní. Hlavní faktory: propad sentimentu, 3× zmínka konkurence, zpomalení plateb. Combined revenue at risk: 1.2M Kč ročně.

*Indikátory:*

- ✗ 2 klienti nad 85 % rizikem
- ✗ Combined revenue at risk: 1.2M Kč/rok
- ✗ Oba zmínili konkurenční nabídku
- ✗ Sentiment propadl o 40+ bodů

*Nápravná opatření:*

1. Okamžitá osobní schůzka s oběma klienty
2. Připravit retention nabídku (sleva / upgrade služeb)
3. Analyzovat root cause — co se stalo
4. Informovat management o riziku ztráty revenue

**Související analýzy:** 10-02, 22-01, 22-02, 7-01

---

### 10-02 — Early warning

**Zdroj:** anomálie

| | |
|---|---|
| **Frekvence** | Real-time |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Kritický — nejranější detekce problému |
| **Status** | Produkce |

**Popis:**

Multi-signal early warning system kombinující slabé behaviorální signály do kompozitního skóre. Jednotlivé signály (ztichnutí, zpomalení plateb, zrušená schůzka) mohou být neškodné, ale jejich souběh tvoří silný prediktor problému. Systém detekuje kompozit dřív než ML churn model (10-01), protože reaguje na dynamickou kombinaci.

**Metodologie:**

Isolation Forest + rule engine: každý klient má vektor 12 signálů (silent days, DSO delta, cancelation count, sentiment drop, feature usage drop, etc.). Kombinované skóre anomaly_score × severity. Alert při ≥ 3 souběžných signálech nad threshold. Eskalace real-time do CRM.

**Datové vstupy:**

- Kontaktní frekvence (7-04)
- Platby (9-03)
- Reenio zrušení (7-10)
- Sentiment (7-01)
- Login aktivita portál (17-xx)
- ARES signály

**Výstupní metriky:**

- Anomaly score per klient (0-100)
- Počet souběžných signálů
- Time-to-alert (dny před 10-01)
- False positive rate
- Precision/recall na historických odchodech

#### ✅ Dobrý stav

**Klidné portfolio bez varování**

0 klientů v early warning zóně, všechny signály pod threshold. Portfolio behaviorálně stabilní.

*Indikátory:*

- ✓ 0 klientů s 3+ signály
- ✓ Anomaly score průměr 12/100
- ✓ Max skóre 34
- ✓ 0 alerts za měsíc

*Doporučené akce:*

1. Udržet sledování

#### ❌ Rizikový stav

**Kombinované signály — klient odchází**

Klient vykazuje 4 souběžné signály: 45 dní bez kontaktu (baseline 7 dní), DSO vyskočil z 14 na 38 dní, zrušil 2 schůzky po sobě, login na portál −80 %. Skóre 87/100.

*Indikátory:*

- ✗ 4 souběžné signály
- ✗ Anomaly score 87/100
- ✗ Detekováno 34 dní před potenciálním churn
- ✗ Churn risk 10-01 zatím jen 42 %

*Nápravná opatření:*

1. Okamžitý personal outreach partnerem
2. Skip standardní retention — jít rovnou k root cause
3. Root cause interview
4. 24h window pro intervence

**Související analýzy:** 10-01, 7-01, 7-04, 9-03

---

### 10-03 — Kreditní riziko

**Zdroj:** historie + ISIR

| | |
|---|---|
| **Frekvence** | Denně |
| **Automatizace** | 98 % automatizováno |
| **Business impact** | Vysoký — ochrana klientských pohledávek |
| **Status** | Produkce |

**Popis:**

Monitoring kreditního rizika obchodních partnerů klienta (dodavatelů i odběratelů). Systém denně kontroluje ISIR (insolvenční rejstřík), OR změny a platební morálku. Včas detekuje, že obchodní partner klienta směřuje k insolvenci — tím chrání klienta před ztrátou pohledávky.

**Metodologie:**

ISIR API (justice.cz/isir) denní check všech IČO z klientských saldokontonta. ARES API pro OR změny (likvidace, změny statutárních orgánů). Scoring: historie plateb + ISIR status + OR události + Creditinfo rating. Alert při insolvenci partnera s otevřenou pohledávkou.

**Datové vstupy:**

- Klient saldokonto — IČO dodavatelů i odběratelů
- ISIR API (/isir/api/search)
- ARES API /ares/v1/ekonomicke-subjekty/{ico}
- Creditinfo / Bisnode rating API
- Historical payment behavior partner

**Výstupní metriky:**

- Počet partnerů v insolvenci
- Exposure per partner (Kč)
- Portfolio kreditní skóre
- Top 10 rizikových partnerů
- Expected credit loss (IFRS 9)

#### ✅ Dobrý stav

**Zdravé portfolio partnerů**

0 partnerů klienta v insolvenci, žádné OR varovné signály. Portfolio kreditní skóre 92/100.

*Indikátory:*

- ✓ 0 partnerů v ISIR
- ✓ 0 likvidací
- ✓ Portfolio score 92/100
- ✓ Expected credit loss < 0.5 %

*Doporučené akce:*

1. Pokračovat v monitoringu

#### ❌ Rizikový stav

**Dodavatel v insolvenci — ohrožená pohledávka**

Klíčový dodavatel klienta vstoupil do insolvence 12.3.2026. Klient má vůči němu pohledávku 340 000 Kč (zálohově placené zboží). Nutné přihlásit pohledávku do 2 měsíců (§ 173 IZ).

*Indikátory:*

- ✗ 1 partner v ISIR
- ✗ Exposure 340K Kč
- ✗ Insolvenční řízení: 12.3.2026
- ✗ Deadline přihlášení: 12.5.2026

*Nápravná opatření:*

1. Okamžitě informovat klienta
2. Připravit přihlášku pohledávky (§ 173 IZ)
3. Nabídnout zastoupení v insolvenčním řízení
4. Opravná položka dle § 8a z. 593/1992 Sb.

**Související analýzy:** 1-04, 10-09, 19-05

---

### 10-04 — CEO fraud

**Zdroj:** 3-way matching

| | |
|---|---|
| **Frekvence** | Real-time per každá platba |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Kritický — přímá finanční ochrana |
| **Status** | Produkce |

**Popis:**

Detekce CEO fraud / business email compromise. Klasický scénář: podvodník získá přístup k emailu jednatele (nebo podvrhne hlas deepfake), pošle urgentní pokyn k platbě na 'nový IBAN dodavatele'. Systém kombinuje 3-way matching (objednávka↔dodací list↔faktura), detekci změny IBAN a hlasovou biometriku.

**Metodologie:**

Multi-vrstvý detektor: 1) 3-way matching engine (objednávka ∈ systému ↔ dodací list ↔ faktura), 2) IBAN change detection v dodavatelské kartotéce, 3) Out-of-pattern platby (částka > baseline × 5 nebo nový dodavatel), 4) Hlasová biometrika na telefonických instrukcích (detekce deepfake), 5) Dual approval workflow při trigger.

**Datové vstupy:**

- Objednávky (ERP objednávkový modul)
- Dodací listy (DocuWare)
- Faktury přijaté (Money S3)
- Dodavatelská kartotéka (IBAN history)
- Hlasové záznamy autorizačních hovorů
- Hlasový otisk jednatele (baseline)

**Výstupní metriky:**

- Počet trigger eventů
- 3-way match rate (%)
- IBAN changes detected
- Voice biometrics confidence
- Blocked payments (Kč, počet)

#### ✅ Dobrý stav

**0 podezřelých transakcí**

Všechny platby mají 3-way match, IBAN dodavatelů stabilní 12+ měsíců, hlasová biometrika potvrzuje jednatele na 99.7 %.

*Indikátory:*

- ✓ 3-way match 100 %
- ✓ 0 IBAN changes
- ✓ Voice biometric 99.7 %
- ✓ 0 trigger eventů

*Doporučené akce:*

1. Udržet kontroly
2. Quarterly fraud awareness training

#### ❌ Rizikový stav

**Akutní podezření na CEO fraud**

Detekována kombinace: IBAN dodavatele změněn včera, dnes přišla urgentní faktura na 890 000 Kč bez objednávky, telefonická autorizace má voice biometric confidence jen 42 %. Vysoká pravděpodobnost podvodu.

*Indikátory:*

- ✗ IBAN changed 24h ago
- ✗ Invoice 890K bez objednávky
- ✗ Voice biometric 42 % (threshold 85)
- ✗ Urgent timing (pátek 16:30)

*Nápravná opatření:*

1. OKAMŽITĚ zablokovat platbu
2. Osobní ověření s jednatelem (ne telefon)
3. Ověřit dodavatele přes alternativní kanál
4. Pokud podvod — nahlásit policii (§ 209 TZ)

**Související analýzy:** 10-05, 10-08, 11-08

---

### 10-05 — Detekce změny IBAN

**Zdroj:** porovnání

| | |
|---|---|
| **Frekvence** | Per každá změna (real-time) |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Kritický — prevence přímých ztrát |
| **Status** | Produkce |

**Popis:**

Specializovaný monitoring změn IBAN v dodavatelské kartotéce. Změna IBAN je nejčastější vektor CEO fraud / invoice fraud. Legitimní změna je vzácná (1-2× za dekádu), vícenásobné změny v krátkém období jsou prakticky jistě podvod.

**Metodologie:**

History table dodavatelských IBAN s timestamp a change source (kdo, kdy, kde). Rate limiting: > 1 změna za 6M = flag. Verifikační workflow: nová IBAN změna musí být potvrzena: 1) emailem z ověřené domény dodavatele, 2) telefonicky na historické číslo, 3) dual approval.

**Datové vstupy:**

- Dodavatelská kartotéka (ERP)
- IBAN change history log
- Source email headers (SPF/DKIM validation)
- Historic dodavatel kontakty
- Dual approval workflow log

**Výstupní metriky:**

- IBAN changes / kvartál
- Rate change per dodavatel
- Change verification success rate
- Blocked suspicious changes
- Avg time od změny k platbě

#### ✅ Dobrý stav

**IBAN stabilita**

Všechny dodavatelské IBAN stabilní 2+ roky, 0 změn za poslední rok. Vysoká data integrity.

*Indikátory:*

- ✓ 0 změn za 12M
- ✓ Průměrná stabilita 38 měsíců
- ✓ 0 verifikačních selhání
- ✓ 100 % IBAN potvrzených zdrojem

*Doporučené akce:*

1. Udržet kontroly

#### ❌ Rizikový stav

**Podezřelá kaskáda IBAN změn**

Dodavatel X změnil IBAN 2× za měsíc (14.3.2026 a 28.3.2026). První změna nebyla ověřena, druhá přišla z emailu s SPF fail. Třetí pokus o změnu dnes — 3. IBAN. Invoice fraud kampaň.

*Indikátory:*

- ✗ 2 změny / měsíc (baseline 0)
- ✗ SPF fail na 2. změně
- ✗ Dnes 3. pokus o změnu
- ✗ IBAN bank country mismatch (CZ → MT → LT)

*Nápravná opatření:*

1. OKAMŽITĚ zablokovat všechny platby dodavateli X
2. Forenzní review posledních plateb
3. Ověřit na ověřené telefonní číslo dodavatele
4. Ohlásit ČNB / FAU při potvrzení podvodu

**Související analýzy:** 10-04, 10-06, 10-08

---

### 10-06 — AML signály

**Zdroj:** vzory plateb

| | |
|---|---|
| **Frekvence** | Denně |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Kritický — AML zákonná povinnost |
| **Status** | Produkce |

**Popis:**

Detekce AML (Anti-Money Laundering) signálů v platbách klienta. Systém hledá vzorce, které naznačují legalizaci výnosů z trestné činnosti: strukturování (smurf platby pod reporting threshold), neobvyklé destinace, komplikované řetězce, pass-through účty. Compliance s AML zákonem č. 253/2008 Sb.

**Metodologie:**

Pattern recognition na bankovních transakcích: 1) Structuring detector (platby 49K, 49.9K systematic), 2) Round-number frequency (podezřelé pravidelné kulaté částky), 3) Geografie odchozích plateb (high-risk jurisdictions FATF), 4) Pass-through accounts (rychlý in/out), 5) Velocity anomálií.

**Datové vstupy:**

- Bankovní transakce klienta (FIO, KB, ČSOB API)
- FATF high-risk jurisdictions list
- SDN sanction lists (EU, OFAC)
- Historical payment baseline
- Klient rizikový profil (NACE, obrat)

**Výstupní metriky:**

- Structuring risk score
- Geographic risk score
- Velocity anomaly count
- SDN match count
- AML composite risk

#### ✅ Dobrý stav

**Standardní finanční chování**

Platby klienta odpovídají business profilu, žádné podezřelé vzorce, 0 transakcí do high-risk zemí, 0 structuring signálů.

*Indikátory:*

- ✓ 0 structuring alerts
- ✓ 0 high-risk destinations
- ✓ 0 SDN matches
- ✓ AML risk score 8/100

*Doporučené akce:*

1. Standard monitoring

#### ❌ Rizikový stav

**Systematické structuring**

Klient dělá týdně 3-4 hotovostní vklady 49 000 Kč (pod report threshold 15 000 EUR). Kumulativně 680K měsíčně, nesedí s fakturovaným obratem. Klasické structuring.

*Indikátory:*

- ✗ 12 structuring platby / měsíc
- ✗ Vklady 49K pod 50K threshold
- ✗ 680K/měsíc mimo business
- ✗ AML risk score 84/100

*Nápravná opatření:*

1. Zablokovat další zpracování (§ 20 AML z.)
2. Ohlásit podezřelý obchod FAU ČR
3. Informovat compliance officer
4. Připravit off-boarding klienta

**Související analýzy:** 10-04, 10-05, 10-07

---

### 10-07 — Compliance gap

**Zdroj:** regulace × činnost

| | |
|---|---|
| **Frekvence** | Kvartálně + při změně regulace |
| **Automatizace** | 70 % automatizováno |
| **Business impact** | Kritický — zákonná povinnost klienta |
| **Status** | Produkce |

**Popis:**

Gap analýza compliance povinností klienta vs. reálný stav. Systém mapuje NACE obor × velikost klienta × území působnosti → seznam povinných licencí, certifikátů, registrací. Porovnává se skutečným stavem. Identifikuje mezery, které mohou vést k pokutě nebo zastavení činnosti.

**Metodologie:**

Rule engine nad legislativní matricí: NACE code × employee count × revenue × geography → required_licenses[]. Cross-check s ARES (živnostenský rejstřík), SÚKL (pokud farmacie), ČNB (finanční služby), SZPI (potraviny). Annual compliance audit report.

**Datové vstupy:**

- ARES živnostenský rejstřík
- SÚKL / ČNB / SZPI / ČOI registry
- GDPR compliance matrix
- ISO/BS/EN standards list
- Legislativní knowledge base (aktualizace)

**Výstupní metriky:**

- Compliance coverage (%)
- Missing licenses/permits count
- Expiring permits (< 90 days)
- Risk exposure (Kč — potenciální pokuta)
- Compliance score 0-100

#### ✅ Dobrý stav

**Plná compliance**

Klient má 100 % pokrytí všech regulačních povinností. Všechny licence platné, žádná expirující do 90 dní.

*Indikátory:*

- ✓ Coverage 100 %
- ✓ 0 missing permits
- ✓ 0 expiring (90 dnů)
- ✓ Score 98/100

*Doporučené akce:*

1. Monitoring expiry dat
2. Proaktivní renewal process

#### ❌ Rizikový stav

**Kritické compliance mezery**

Klient podniká v regulovaném oboru (potraviny) bez 3 povinných certifikátů: HACCP, SZPI registrace, IČP odpovědné osoby. Exposure: až 3M Kč pokuty + zastavení činnosti.

*Indikátory:*

- ✗ Coverage 62 %
- ✗ 3 missing permits
- ✗ Risk exposure 3M Kč
- ✗ Score 34/100

*Nápravná opatření:*

1. Okamžitě informovat klienta písemně
2. Připravit timeline získání certifikátů
3. Konzultace specialisty (HACCP, SZPI)
4. Do získání — doporučit pozastavit rizikové aktivity

**Související analýzy:** 10-11, 19-07

---

### 10-08 — Fakturační nesrovnalosti

**Zdroj:** doklady vs. objednávky

| | |
|---|---|
| **Frekvence** | Denně |
| **Automatizace** | 92 % automatizováno |
| **Business impact** | Kritický — detekce invoice fraud |
| **Status** | Produkce |

**Popis:**

3-way matching kontrola: každá přijatá faktura musí mít odpovídající objednávku a dodací list. Faktury bez párujícího POkázky jsou buď prošly bez kontroly (riziko dvojích plateb, fraud) nebo pochází od neautorizovaného dodavatele. Benford's law pro statistickou detekci manipulovaných čísel.

**Metodologie:**

3-way matching engine s fuzzy matching (IČO, DIČ, částka ±1 %, datum ±7 dní). Pro neshody: automated investigation (hledá dodací list manuálně). Benford's law test pro statistickou detekci: frequency distribution first digit faktur — odchylka od Benford = možná manipulace.

**Datové vstupy:**

- Faktury přijaté (Money S3)
- Objednávkový modul ERP
- Dodací listy (DocuWare workflow)
- Dodavatelská kartotéka
- Benford's law expected distribution

**Výstupní metriky:**

- 3-way match rate (%)
- Unmatched invoices count
- Unmatched amount (Kč)
- Benford's law deviation
- Suspicious vendors (top 5)

#### ✅ Dobrý stav

**Plná auditovatelnost fakturace**

100 % faktur má objednávku i dodací list. Benford's law odchylka 3 % (v normálu < 5 %). 0 podezřelých dodavatelů.

*Indikátory:*

- ✓ Match rate 100 %
- ✓ 0 unmatched
- ✓ Benford deviation 3 %
- ✓ 0 suspicious

*Doporučené akce:*

1. Pokračovat v kontrolách

#### ❌ Rizikový stav

**Masivní fakturační mezery**

17 % faktur nemá objednávku (280 faktur / 1.2M Kč). Benford's law odchylka 18 % — statisticky podezřelé. Top 5 dodavatelů bez PO — 2 neznámá IČO bez dřívější historie.

*Indikátory:*

- ✗ Match rate 83 %
- ✗ 280 unmatched faktur
- ✗ 1.2M Kč bez PO
- ✗ Benford deviation 18 %

*Nápravná opatření:*

1. Forenzní audit 280 faktur
2. Zavést mandatorní PO workflow
3. Prošetřit neznámá IČO (ARES + ISIR)
4. Trestní oznámení při potvrzení fraudu (§ 209 TZ)

**Související analýzy:** 10-04, 10-05, 11-08

---

### 10-09 — Predikce insolvence

**Zdroj:** platby + rejstříky

| | |
|---|---|
| **Frekvence** | Měsíčně + real-time ISIR check |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Kritický — včasné varování insolvence |
| **Status** | Produkce |

**Popis:**

Prediktivní scoring insolvence klienta i jeho obchodních partnerů. Kombinuje platební historii, finanční ukazatele z účetních výkazů, ISIR/OR události a makroekonomické signály. Altman Z-score + vlastní ML model natrénovaný na českém kontextu.

**Metodologie:**

Hybrid model: 1) Altman Z-score (working capital, retained earnings, EBIT, equity, sales), 2) ML model (XGBoost) na CZ insolvencích 2015-2025, 3) ISIR realtime check, 4) OR events (výmaz, likvidace), 5) Makroekonomický overlay (sektor NACE). Výstup: insolvency probability v horizontu 6M, 12M, 24M.

**Datové vstupy:**

- Klient finanční výkazy (1-02)
- Platební chování (9-03)
- ISIR API (/isir/api/search)
- ARES / OR change events
- Altman Z-score formula
- Bisnode / Creditinfo rating

**Výstupní metriky:**

- Insolvency score (0-100)
- Altman Z-score
- Probability 6M / 12M / 24M
- Top contributing factors
- Sector benchmark delta

#### ✅ Dobrý stav

**Finančně silný subjekt**

Score 92/100, Altman Z = 3.8 (safe zone > 3), 0 ISIR signálů, zdravé cash flow, likvidita L2 > 1.5.

*Indikátory:*

- ✓ Score 92/100
- ✓ Altman Z 3.8 (safe)
- ✓ Insolv. pravděp. 12M < 1 %
- ✓ Sector percentile 82

*Doporučené akce:*

1. Monitoring kvartální
2. Nabídnout rozšíření služeb

#### ❌ Rizikový stav

**Vysoké riziko insolvence**

Score 23/100, Altman Z = 0.8 (distress zone < 1.8), 3 měsíce záporný CF, DSO 78 dní, úvěrové kovenanty porušené. Pravděpodobnost insolvence do 6 měsíců 62 %.

*Indikátory:*

- ✗ Score 23/100
- ✗ Altman Z 0.8 (distress)
- ✗ Insolv. pravděp. 6M = 62 %
- ✗ 3M záporný CF

*Nápravná opatření:*

1. Urgentní strategická konzultace (§ 98 IZ povinnost)
2. Cash flow restructuring plán
3. Informovat banku (covenants)
4. Připravit insolvenční návrh pokud nutno

**Související analýzy:** 1-02, 1-03, 9-03, 10-03

---

### 10-10 — Shadow AI detekce

**Zdroj:** DLP logy

| | |
|---|---|
| **Frekvence** | Real-time monitoring |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Kritický — GDPR compliance + konkurenční data |
| **Status** | Produkce |

**Popis:**

Detekce úniku citlivých klientských dat do externích LLM (ChatGPT, Claude, Gemini, Copilot). Zaměstnanci často používají LLM pro úlevu od práce, ale vkládají do nich klientské finanční údaje, IČO, osobní údaje — což je závažné porušení GDPR čl. 32 i smluvních závazků.

**Metodologie:**

DLP (Data Loss Prevention) monitoring: 1) Browser extension monitoring POST requests na known LLM domény (chatgpt.com, claude.ai, gemini.google.com, copilot.microsoft.com), 2) Content inspection — match na klientské IČO, jména, částky, 3) Network-level DLP (firewall egress rules), 4) Training + deterrence.

**Datové vstupy:**

- DLP browser extension logy
- Firewall egress logs (URL + payload hash)
- Klient IČO/jména z CRM
- Employee workstation inventory
- Known LLM endpoints list

**Výstupní metriky:**

- Detekovaných úniků / měsíc
- Účet s nejvíce incidenty
- Typ uniklých dat (IČO, částky, osobní)
- Volume dat (MB)
- Compliance risk score

#### ✅ Dobrý stav

**Žádné úniky do AI**

0 detekovaných úniků, zaměstnanci používají firemní AI Gateway (on-premise RAG) pro sensitive úlohy. Kompletní audit trail.

*Indikátory:*

- ✓ 0 úniků do external LLM
- ✓ 100 % sensitive dotazů přes on-prem AI
- ✓ 0 compliance incidenty
- ✓ Training coverage 100 %

*Doporučené akce:*

1. Udržet awareness training
2. Quarterly red team test

#### ❌ Rizikový stav

**Klientská data v ChatGPT**

Účetní vložila do ChatGPT obraty hlavní knihy klienta včetně IČO a obratu (12M Kč). Data odeslána na servery OpenAI (USA, mimo EU) — porušení GDPR čl. 46 (transfer mimo EU), smluvní povinnosti NDA s klientem.

*Indikátory:*

- ✗ 1 únik: 3.2 MB dat
- ✗ IČO + obraty v prompt
- ✗ Transfer do USA (ne EU)
- ✗ GDPR čl. 46 violation

*Nápravná opatření:*

1. Okamžitě zablokovat LLM domény na firewall
2. Disciplinární řízení dle ZP § 52
3. GDPR breach notification do 72h (čl. 33)
4. Informovat klienta o incidentu

**Související analýzy:** 10-11, 11-07

---

### 10-11 — AI Act rizikové systémy

**Zdroj:** audit nástrojů

| | |
|---|---|
| **Frekvence** | Ročně + při deployment nového AI |
| **Automatizace** | 60 % automatizováno |
| **Business impact** | Kritický — EU AI Act deadline 2.8.2026 |
| **Status** | V přípravě |

**Popis:**

Compliance s EU AI Act (Nařízení (EU) 2024/1689). Systém klasifikuje všechny AI nástroje používané v kanceláři podle rizikových kategorií (minimal, limited, high, unacceptable). High-risk systémy (např. AI pro kreditní scoring, hodnocení zaměstnanců) mají striktní compliance povinnosti — CE značka, risk management system, data governance.

**Metodologie:**

AI inventory s klasifikací per system: 1) Use case (per Annex III AI Act), 2) Risk category, 3) Compliance status (technical documentation, risk management, transparency, human oversight), 4) Gap analysis vs. požadavky, 5) Remediation roadmap do 2.8.2026 (high-risk deadline).

**Datové vstupy:**

- AI system inventory (interní + vendored)
- AI Act Annex III use case list
- Vendor compliance documentation
- Internal AI governance policy
- Risk management system (ISO 42001)

**Výstupní metriky:**

- Počet AI systémů (per risk category)
- Compliance coverage (%)
- High-risk systémy bez CE značky
- Deadline countdown (2.8.2026)
- Remediation cost odhad

#### ✅ Dobrý stav

**Plná AI Act compliance**

Všechny AI systémy klasifikované, 0 high-risk bez CE značky, 100 % transparency pro klienty (AI disclaimer). Ready na 2.8.2026 deadline.

*Indikátory:*

- ✓ 100 % AI inventory
- ✓ 0 non-compliant high-risk
- ✓ 100 % transparency
- ✓ Full documentation

*Doporučené akce:*

1. Annual AI Act review
2. Vendor re-assessment ročně

#### ❌ Rizikový stav

**2 high-risk systémy mimo compliance**

Kancelář používá 2 AI systémy klasifikované jako high-risk (credit scoring pro klienty, employee performance AI). Oba bez CE značky, bez technické dokumentace, bez risk management system. 4 měsíce do deadline, riziko pokuty až 7 % globálního obratu (čl. 99 AI Act).

*Indikátory:*

- ✗ 2 non-compliant high-risk
- ✗ 0 CE značek
- ✗ 0 risk management system
- ✗ Deadline: 2.8.2026 (4M)

*Nápravná opatření:*

1. Okamžitě pozastavit high-risk AI použití
2. CE conformity assessment (notified body)
3. Implementovat ISO 42001 AI management
4. Připravit technickou dokumentaci

**Související analýzy:** 10-07, 10-10

---

<a id="sekce-11"></a>

## Sekce 11: Operativní reporty

### 11-01 — SLA dodržení

**Zdroj:** timestamps

| | |
|---|---|
| **Frekvence** | Denně (automaticky) |
| **Automatizace** | 98 % automatizováno |
| **Business impact** | Vysoký — SLA = spokojenost klienta = retence |
| **Status** | Produkce |

**Popis:**

Monitoring dodržování SLA (Service Level Agreement) s klienty sleduje, zda jsou služby dodávány v dohodnutém čase a kvalitě. Systém měří čas od přijetí požadavku po jeho vyřízení a porovnává s kontraktovaným SLA.

Pro každého klienta je definován individuální SLA dle smlouvy — typicky: uzávěrka do X. dne měsíce, odpověď na dotaz do Y hodin, doklady zpracovány do Z dní. Systém automaticky sleduje plnění a eskaluje při ohrožení.

Historická data o SLA plnění jsou klíčová pro vyjednávání o cenách — prokazatelně vysoké SLA opravňuje premium cenu.

**Metodologie:**

Event-based tracking: 1) Záznam timestamp přijetí požadavku, 2) Záznam timestamp vyřízení, 3) Porovnání s kontraktovaným SLA per typ požadavku, 4) Agregace per klient, per účetní, per typ služby, 5) Trend analýza a predikce budoucího SLA plnění.

**Datové vstupy:**

- Ticketovací systém (timestamps)
- Workflow engine (stavy dokumentů)
- SLA definice per klient (smlouvy)
- Docházka zaměstnanců (kapacita)

**Výstupní metriky:**

- SLA compliance rate (%)
- Průměrný čas vyřízení
- Top porušení SLA (per klient, per typ)
- Trend SLA compliance
- Predikce SLA na následující měsíc

#### ✅ Dobrý stav

**Výborné SLA plnění**

98 % požadavků vyřízeno v rámci SLA. Zbývající 2 % jsou edge cases s objektivními příčinami (chybějící podklady od klienta).

*Indikátory:*

- ✓ 98 % SLA compliance
- ✓ Průměr 4h pod SLA limitem
- ✓ 0 eskalací
- ✓ Trend stabilní

*Doporučené akce:*

1. Komunikovat úspěch klientům
2. Zvážit zpřísnění SLA pro premium klienty
3. Použít data při vyjednávání o cenách

#### ❌ Rizikový stav

**SLA masivně porušeno**

Pouze 62 % požadavků vyřízeno v SLA. Hlavní příčiny: přetížení Q1, nemoc 2 účetních, nárůst klientů bez odpovídajícího navýšení kapacity.

*Indikátory:*

- ✗ 62 % SLA compliance
- ✗ 38 % porušení — 3× průměr
- ✗ 5 eskalací za měsíc
- ✗ Trend klesající 3 měsíce

*Nápravná opatření:*

1. Okamžitě navýšit kapacitu (brigádníci / outsource)
2. Prioritizovat premium klienty
3. Komunikovat klientům reálné termíny
4. Přehodnotit kapacitní plán

**Související analýzy:** 11-03, 11-05, 11-09, 11-10

---

### 11-02 — Opakující se problémy

**Zdroj:** kategorizace

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 80 % automatizováno |
| **Business impact** | Vysoký — process quality a client satisfaction |
| **Status** | Produkce |

**Popis:**

Ticket-level analýza opakujících se problémů per klient. Pohled z operativního úhlu (doplněk k 7-09 který analyzuje z klientské strany). Systém identifikuje top recurring issues a umožňuje process improvement — fix root cause vs. hasit symptomy.

**Metodologie:**

Kategorizace ticketů (Daktela ticket system) pomocí rule engine + NLP clustering. Per klient počet opakování per kategorie za 12M. Pareto analýza top 20 % opakovaných problémů. Root cause tagging při resolution (template: cause + fix).

**Datové vstupy:**

- Daktela ticket system
- Ticket kategorie a tagy
- Resolution notes
- Klient metadata
- Historická data 24M

**Výstupní metriky:**

- Top opakující se problémy (portfolio)
- Recurring rate per kategorie
- Klient s nejvíce opakováními
- Root cause fix rate (%)
- Avg time mezi opakováními

#### ✅ Dobrý stav

**Zdravá operativa**

0 opakujících se problémů v posledních 12M. First-call resolution 92 %, root cause fix coverage 95 %.

*Indikátory:*

- ✓ 0 opakování
- ✓ FCR 92 %
- ✓ Root cause coverage 95 %
- ✓ Stabilní trend

*Doporučené akce:*

1. Udržet kvalitu
2. Dokumentovat best practices

#### ❌ Rizikový stav

**Klient X — chronický problém**

Klient X hlásí stejný problém (chybné zaúčtování faktur z B2B portálu) 5× za rok. Pokaždé ad-hoc fix, žádný root cause. Frustrace roste.

*Indikátory:*

- ✗ 5 opakování / rok
- ✗ Stejný root cause: šablona
- ✗ Každé opakování eskaluje sentiment
- ✗ Klient si stěžuje

*Nápravná opatření:*

1. Formální root cause analysis (5 Whys)
2. Permanent fix šablony
3. Proaktivní komunikace klientovi
4. Kompenzace za opakující se problémy

**Související analýzy:** 7-09, 11-07, 11-09

---

### 11-03 — Bottlenecky uzávěrky

**Zdroj:** workflow

| | |
|---|---|
| **Frekvence** | Měsíčně (po uzávěrce) |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Vysoký — přímý dopad na SLA |
| **Status** | Produkce |

**Popis:**

Workflow analysis měsíční uzávěrky. Identifikuje, který krok uzávěrky (párování, přiúčtování, rezervy, kontrola, schválení) je bottleneck. Prodloužení uzávěrky přímo ohrožuje SLA (dodání reportů klientovi) a indikuje kapacitní nebo procesní problém.

**Metodologie:**

DocuWare workflow timestamps + Money S3 uzávěrkový modul events. Process mining (PM4Py): extrakce process graph, výpočet cycle time per activity, identifikace longest path. Pareto distribuce délky per krok. Bottleneck = krok s > 40 % cycle time.

**Datové vstupy:**

- DocuWare workflow events (timestamps)
- Money S3 uzávěrkové events
- Zaměstnanecká aktivita per krok
- Historický cycle time baseline
- Process mining library PM4Py

**Výstupní metriky:**

- Celkový cycle time uzávěrky (dny)
- Cycle time per krok
- Bottleneck activity
- Queue time (čekání na zaměstnance)
- Trend 12M

#### ✅ Dobrý stav

**Rychlá hladká uzávěrka**

Průměrná měsíční uzávěrka trvá 3 pracovní dny. Žádný krok netrvá déle než 25 % celkového času. Rovnoměrné vytížení, žádný bottleneck.

*Indikátory:*

- ✓ Průměr 3 dny
- ✓ Max krok 18 % cycle
- ✓ 0 bottlenecků
- ✓ Stabilní 12M

*Doporučené akce:*

1. Benchmark pro tým
2. Marketovat 'fast closing' klientům

#### ❌ Rizikový stav

**Bottleneck u párování**

Uzávěrka trvá 14 dní (baseline 3). Krok 'párování plateb s fakturami' trvá 9 dní — 64 % celkového času. Zaměstnanec přetížený, fronta 340 nepárovaných transakcí.

*Indikátory:*

- ✗ Cycle time 14 dní (baseline 3)
- ✗ Párování 9 dní (64 %)
- ✗ Queue 340 transakcí
- ✗ 1 zaměstnanec vytížen 140 %

*Nápravná opatření:*

1. Přidat kapacitu na párování
2. Automation: AI assisted matching
3. Redistribuce workload z přetíženého účetního
4. Edukace klienta — dodávat VS v platbě

**Související analýzy:** 11-01, 11-05, 11-08, 11-09

---

### 11-04 — Sezónnost komunikace

**Zdroj:** časové řady

| | |
|---|---|
| **Frekvence** | Týdně + ad-hoc |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Vysoký — kapacitní plánování |
| **Status** | Produkce |

**Popis:**

Analýza sezónních vzorců v komunikaci s klienty. Účetní kancelář má typické špičky: Q1 (uzávěrka), Q2 (daňová přiznání do 1.4./1.7.), měsíční cykly kolem 25. (DPH). Anomalní nárůst mimo sezónní pattern je varovným signálem (regulační změna, krizový trend, klíčový klient v problému).

**Metodologie:**

Time series decomposition (STL — Seasonal-Trend decomposition using Loess): trend + seasonal + residual. Prophet forecasting s Czech holidays kalendářem. Anomaly detection na residuals (3-sigma rule). Regresní analysis proti externí eventům (novela ZDP, COVID-style events).

**Datové vstupy:**

- Denní kontaktní objem (7-04)
- Ticket counts per day
- Český svátkový kalendář
- Daňový kalendář (DPH, DPPO deadlines)
- Historie 24M+

**Výstupní metriky:**

- Baseline seasonal pattern
- Current vs. predicted volume
- Anomaly events detekovány
- Peak intensity prediction
- Capacity requirement forecast

#### ✅ Dobrý stav

**Predikovatelné vzorce**

Komunikační objem odpovídá sezónní predikci ±8 %. Q1 špička +180 %, květen −15 %, prosinec −25 % — vše v predikovaném rozsahu.

*Indikátory:*

- ✓ Deviation od predikce ±8 %
- ✓ 0 anomaly events
- ✓ Peak Q1 predikovaný
- ✓ Forecast accuracy 94 %

*Doporučené akce:*

1. Capacity plán na základě forecast
2. Early planning Q1 2027

#### ❌ Rizikový stav

**Nečekaná masivní špička**

Duben 2026 volume +300 % oproti predikci. Residual je 8 standard deviations nad normálem. Root cause: neočekávaná novela zákona o DPH → masivní klientské dotazy.

*Indikátory:*

- ✗ Volume +300 % vs. forecast
- ✗ 8-sigma anomaly
- ✗ Root cause: zákonná změna
- ✗ 3× SLA porušení

*Nápravná opatření:*

1. Okamžitě navýšit kapacitu (outsource)
2. Hromadný webinář k DPH změně
3. FAQ/self-service materiál
4. Rebuild forecast model s novým eventem

**Související analýzy:** 11-05, 11-06

---

### 11-05 — Predikce vytížení

**Zdroj:** historické vzorce

| | |
|---|---|
| **Frekvence** | Týdně |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Vysoký — kapacitní rozhodnutí |
| **Status** | Produkce |

**Popis:**

Kapacitní forecast — porovnání predikovaného workloadu (z 11-04) s dostupnou kapacitou týmu (z docházkového systému Anet). Umožňuje proaktivní rozhodnutí o najmutí brigádníků, outsourcingu nebo posunutí interních projektů.

**Metodologie:**

Demand forecast (11-04) × service time per ticket type → required FTE. Supply: Anet docházka + planned dovolenky + produktivita koeficient. Gap = demand − supply. Threshold alert: gap > 15 % na horizont 30 dní. Monte Carlo simulace (konfidence 90 %).

**Datové vstupy:**

- Demand forecast (11-04)
- Anet docházkový systém (plánované absence)
- Historical productivity per role
- Service time per ticket type
- Outsource capacity options

**Výstupní metriky:**

- Predicted FTE demand
- Available FTE supply
- Gap (over/under capacity)
- Utilization forecast (%)
- Recommended actions

#### ✅ Dobrý stav

**Balanced kapacita**

Q2 forecast ukazuje 92 % utilizaci — optimální. Žádný deficit, 3 % buffer. Tým má kapacitu pro plánované projekty.

*Indikátory:*

- ✓ Utilization forecast 92 %
- ✓ 0 deficit days
- ✓ Buffer 3 %
- ✓ Plánované projekty fit

*Doporučené akce:*

1. Standardní plánování

#### ❌ Rizikový stav

**Q1 přetížení**

Q1 forecast 140 % utilizace — významný deficit 18 FTE-days. Hlavní driver: kumulace uzávěrky + daňových přiznání + 3 dovolenkové absence. Nutný outsource.

*Indikátory:*

- ✗ Utilization 140 %
- ✗ Deficit 18 FTE-days
- ✗ 3 absence accumulated
- ✗ SLA risk vysoký

*Nápravná opatření:*

1. Okamžitě zajistit brigádníky (senior + junior)
2. Přesunout nepovinné projekty
3. Outsource partneři: request kapacity
4. Rebalanc dovolenek (pokud možno)

**Související analýzy:** 11-04, 11-06

---

### 11-06 — Vyhoření týmu

**Zdroj:** docházka SCH

| | |
|---|---|
| **Frekvence** | Týdně |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Vysoký — prevence ztráty klíčových lidí |
| **Status** | Produkce |

**Popis:**

Burnout prevention — monitoring známek přepracování v týmu kanceláře SCH-EKONOM. Dlouhodobě víkendová práce, přesčasy, odchody pozdě večer jsou prediktory vyhoření, chybovosti a odchodu zaměstnance. Compliance s § 90-92 zákoníku práce 262/2006 Sb. (odpočinek).

**Metodologie:**

Anet docházkový systém: pracovní hodiny per den, víkendová práce, noční práce. Computation: weekly_hours, weekend_days_count (4+ weeks rolling), late_days (>19:00). Klouzavý průměr + trend. Threshold: 3 víkendy v řadě = alert; > 50h/týden = alert; > 12 dní bez odpočinku = compliance violation.

**Datové vstupy:**

- Anet docházkový systém SCH-EKONOM
- Plán směn
- Docházková karta per zaměstnanec
- Historická baseline per osoba
- § 90-92 ZP limity

**Výstupní metriky:**

- Víkendové dny / 4 týdny
- Průměrné weekly hours
- Late days / měsíc
- Burnout risk score
- Compliance violations (ZP)

#### ✅ Dobrý stav

**Zdravý rytmus týmu**

0 víkendové práce, průměr 38 h/týden, 0 late days. Tým má work-life balance, 0 compliance violations.

*Indikátory:*

- ✓ 0 víkendů
- ✓ Avg 38 h/týden
- ✓ 0 late days
- ✓ Burnout score 12/100

*Doporučené akce:*

1. Udržet kulturu
2. Benchmark pro industry

#### ❌ Rizikový stav

**Kritický burnout risk**

3 účetní pracují 6 víkendů v řadě, průměr 58 h/týden. 1 zaměstnanec už 14 dní bez dne volna (porušení § 92 ZP). Chybovost roste (viz 11-07).

*Indikátory:*

- ✗ 6 víkendů v řadě × 3 lidi
- ✗ Avg 58 h/týden
- ✗ 14 dní bez volna (violation)
- ✗ Burnout score 82/100

*Nápravná opatření:*

1. Okamžitě vynutit den volna (§ 92 ZP)
2. Redistribuovat workload
3. Najmout outsource kapacitu (11-05)
4. 1-on-1 rozhovor se 3 přetíženými

**Související analýzy:** 11-05, 11-07

---

### 11-07 — Chybovost účetního

**Zdroj:** audit trail

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Vysoký — riziko reputace + penalties klientů |
| **Status** | Produkce |

**Popis:**

Per-účetní quality scoring — míra opravných zápisů (storno + oprava) vzhledem k celkovému počtu zápisů. Indikátor odborné způsobilosti, přetížení (koreluje s 11-06 burnout), nebo tréninkové potřeby. Transparentní metric používán v ročním hodnocení.

**Metodologie:**

Audit trail DB (user_id, action, timestamp, entity_type, entity_id): filter reversal/correction actions. Computation: error_rate = reversal_count / total_entries per účetní. Benchmark: portfolio průměr, best-in-class. Context: klient složitost, objem. Fair comparison via normalizované metriky.

**Datové vstupy:**

- Audit trail DB (všechny ERP actions)
- User → role mapping
- Klient složitost index
- Objem entries per účetní
- Historická baseline

**Výstupní metriky:**

- Error rate per účetní (%)
- Benchmark delta vs. průměr
- Trend 6M
- Typ chyb (kategorie)
- Quality score (0-100)

#### ✅ Dobrý stav

**Vynikající kvalita**

Účetní má error rate 0.2 % — významně pod průměrem 1.1 %. 0 chyb v kritických entries (DPH, mzdy). Quality score 94/100.

*Indikátory:*

- ✓ Error rate 0.2 %
- ✓ 3× lepší než průměr
- ✓ 0 kritických chyb
- ✓ Quality score 94/100

*Doporučené akce:*

1. Mentoring juniorů
2. Bonus / uznání

#### ❌ Rizikový stav

**Kritická chybovost**

Účetní má error rate 4.8 % — 24× průměr kanceláře. 12 chyb v DPH přiznáních za kvartál. Možné příčiny: nedostatečný trénink, přetížení (11-06), osobní problémy.

*Indikátory:*

- ✗ Error rate 4.8 %
- ✗ 24× průměr
- ✗ 12 DPH chyb / kvartál
- ✗ Quality score 28/100

*Nápravná opatření:*

1. Okamžitá supervize senior účetním
2. Retraining na identifikovaných oblastech
3. Zkontrolovat burnout (11-06)
4. PIP (performance improvement plan)

**Související analýzy:** 1-07, 11-02, 11-06

---

### 11-08 — 3-way matching

**Zdroj:** DocuWare

| | |
|---|---|
| **Frekvence** | Týdně |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Vysoký — cost-to-serve driver |
| **Status** | Produkce |

**Popis:**

Straight-Through Processing (STP) rate pro 3-way matching (objednávka ↔ dodací list ↔ faktura). Vysoký STP = efektivní automation, nízký STP = manuální práce, vyšší cost-to-serve, vyšší chybovost. Kombinuje s 10-08 (fakturační nesrovnalosti).

**Metodologie:**

DocuWare workflow metrics: pro každou fakturu tracking zda prošla 3-way match automaticky vs. potřebovala manuální intervenci. STP rate = auto_matched / total_invoices. Per klient analysis — klienti s nízkým STP vyžadují process improvement.

**Datové vstupy:**

- DocuWare workflow timestamps
- Invoice processing events
- Manual intervention flags
- Matching engine logs
- Per-klient invoice volume

**Výstupní metriky:**

- STP rate (%)
- Manual intervention rate
- Avg processing time per type
- Cost-to-serve delta (STP vs. manual)
- Top klienti s nízkým STP

#### ✅ Dobrý stav

**Vysoká automatizace**

91 % faktur projde 3-way match automaticky, manuální intervence potřebná jen v 9 % (edge cases). Cost-to-serve 3× nižší u STP případů.

*Indikátory:*

- ✓ STP 91 %
- ✓ Manual 9 %
- ✓ Avg auto processing 14 min
- ✓ Cost delta 3×

*Doporučené akce:*

1. Scale automation k dalším klientům
2. Benchmark industry-leading

#### ❌ Rizikový stav

**Většina manuálně — drain na kapacitě**

Pouze 34 % STP, 66 % faktur manuálně. Hlavní bariéra: 3 top klienti nedodávají strukturované PO (PDF scany). Enormní cost-to-serve dopad.

*Indikátory:*

- ✗ STP 34 %
- ✗ Manual 66 %
- ✗ 3 klienti = 70 % manual volume
- ✗ Avg processing 45 min manual

*Nápravná opatření:*

1. Edukace top 3 klientů (strukturovaná PO)
2. OCR + LLM pro PDF scany
3. EDI integrace s dodavateli
4. Přecenit klienty s nestandardním processem

**Související analýzy:** 10-08, 11-03, 11-09

---

### 11-09 — Doba zpracování dokladu

**Zdroj:** workflow

| | |
|---|---|
| **Frekvence** | Denně (real-time dashboard) |
| **Automatizace** | 98 % automatizováno |
| **Business impact** | Vysoký — přímý vliv na CX |
| **Status** | Produkce |

**Popis:**

End-to-end cycle time od přijetí dokladu (DocuWare ingest) po finalizaci (zaúčtováno, schváleno, archivováno). Klíčová UX metrika — klient vnímá rychlost podle toho, jak dlouho 'čeká'. Prodloužený cycle time indikuje kapacitní problém nebo neefektivní workflow.

**Metodologie:**

DocuWare workflow timestamps — per doklad extrakce: received_at, processing_started_at, processed_at, approved_at, archived_at. Cycle time = archived_at − received_at. Distribuce (p50, p90, p95). Per-klient, per-typ dokladu, per-účetní breakdown.

**Datové vstupy:**

- DocuWare workflow events
- Document metadata (type, klient, complexity)
- Stage transition timestamps
- Queue length per stage
- Účetní workload

**Výstupní metriky:**

- Průměrný cycle time (h)
- p50 / p90 / p95 cycle time
- Per klient breakdown
- Per typ dokladu breakdown
- Stage-level bottleneck

#### ✅ Dobrý stav

**Bleskové zpracování**

Průměrný cycle time 4 h pracovní doby, p95 pod 16 h. Klient přinese doklad ráno, odpoledne má vyřízeno.

*Indikátory:*

- ✓ Průměr 4 h
- ✓ p95 = 16 h
- ✓ 0 dokumentů v queue > 24 h
- ✓ Same-day processing 78 %

*Doporučené akce:*

1. Marketing: 'Same-day' jako USP
2. Benchmark pro tým

#### ❌ Rizikový stav

**Klient čeká 3 dny**

Průměrný cycle time 72 h, p95 = 192 h (8 dní). Klient si opakovaně stěžuje 'poslal jsem vám to minulý týden'. Queue 340 neprocessed documentů.

*Indikátory:*

- ✗ Průměr 72 h (baseline 4)
- ✗ p95 = 192 h
- ✗ Queue 340 docs
- ✗ 12 stížností / měsíc

*Nápravná opatření:*

1. Okamžitě flush queue (outsource)
2. Implementovat STP (11-08)
3. Navýšit kapacitu per 11-05
4. Klientům transparentní ETA

**Související analýzy:** 11-01, 11-03, 11-08, 11-10

---

### 11-10 — Chybějící podklady

**Zdroj:** DocuWare gap

| | |
|---|---|
| **Frekvence** | Týdně |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Kritický — blokuje základní služby |
| **Status** | Produkce |

**Popis:**

Gap analýza podkladů — kolik dokumentů klient ještě nedodal vzhledem k očekávaným (dle fakturační historie, smlouvy, sezóny). Chybějící podklady blokují uzávěrku i aktuální zaúčtování. Vysoký gap rate indikuje chaotického klienta nebo komunikační problém.

**Metodologie:**

Expected document set per klient (baseline z historických 12M: typy dokumentů, měsíční frekvence). Current state DocuWare: co skutečně dorazilo. Gap = expected − received. Kategorizace: faktury přijaté, bankovní výpisy, pokladní doklady, smlouvy. Alert per typ.

**Datové vstupy:**

- DocuWare ingest logs per klient
- Expected document baseline (historie)
- Klient typ podnikání (volume prediction)
- Bankovní výpisy auto-ingest
- Sezónní predikce

**Výstupní metriky:**

- Gap rate (% missing)
- Missing docs count
- Missing types (faktury/výpisy/pokladna)
- Days delayed
- Impact na uzávěrku

#### ✅ Dobrý stav

**Dobře zásobovaný klient**

12 % gap rate (v norma < 15 %). Klient dodává 88 % očekávaných podkladů včas, chybí jen okrajové doklady (kryté auto-reminder).

*Indikátory:*

- ✓ Gap 12 %
- ✓ Missing jen low-priority
- ✓ Auto-reminder vyřešil
- ✓ 0 uzávěrka-blocking

*Doporučené akce:*

1. Standardní monitoring

#### ❌ Rizikový stav

**Klient paralyzuje kancelář**

67 % očekávaných podkladů chybí. Uzávěrka nemožná — chybí 120 faktur, 3 bankovní výpisy, celá pokladna. Účetní neví, co má dělat, klient neodpovídá.

*Indikátory:*

- ✗ Gap 67 %
- ✗ 120 faktur chybí
- ✗ 3 bank výpisy missing
- ✗ Uzávěrka blocked

*Nápravná opatření:*

1. Eskalace partnerem kanceláře k jednateli
2. Písemná výzva s hrozbou pozastavení služeb
3. Scope contract review (zda to nejsou povinnosti klienta)
4. Pokud persist — off-boarding

**Související analýzy:** 11-03, 11-09

---

<a id="sekce-12"></a>

## Sekce 12: Strategie a segmentace

### 12-01 — Segmentace

**Zdroj:** clustering

| | |
|---|---|
| **Frekvence** | Kvartálně |
| **Automatizace** | 80 % automatizováno |
| **Business impact** | Vysoký — efektivita obsluhy a spokojenost klientů |
| **Status** | Produkce |

**Popis:**

Automatická segmentace klientského portfolia pomocí clusteringových algoritmů identifikuje přirozené skupiny klientů s podobnými charakteristikami. Segmentace umožňuje cílený přístup — jiný servis pro velké firmy, jiný pro OSVČ pendlery.

Model zohledňuje: obrat, počet zaměstnanců, obor, typ služeb, komunikační styl, platební morálku a CLV. Výsledkem jsou 3–5 segmentů s jasným profilem a doporučenou strategií.

Segmentace se automaticky aktualizuje kvartálně a detekuje klienty, kteří migrují mezi segmenty — což je samo o sobě důležitý signál.

**Metodologie:**

K-means clustering s optimalizací k (silhouette score): 1) Normalizace featur, 2) PCA pro redukci dimenzí, 3) Clustering, 4) Profilování segmentů, 5) Přiřazení strategie per segment, 6) Detekce migrace mezi segmenty.

**Datové vstupy:**

- Finanční profil klientů (9-xx)
- Komunikační vzorce (7-xx)
- Využití služeb (16-xx)
- Oborová klasifikace (NACE)
- Platební morálka

**Výstupní metriky:**

- Počet segmentů a jejich velikost
- Profil každého segmentu
- CLV per segment
- Migrace mezi segmenty
- Doporučená strategie per segment

#### ✅ Dobrý stav

**Jasná segmentace**

Portfolio je rozděleno do 4 jasných segmentů: Premium (12 klientů, CLV > 300K), Standard (28), OSVČ-pendleři (45), Start-up (8). Každý segment má cílenou strategii.

*Indikátory:*

- ✓ 4 segmenty s jasným profilem
- ✓ Silhouette score 0.72
- ✓ 0 klientů bez přiřazení
- ✓ Strategie definována per segment

*Doporučené akce:*

1. Implementovat cílenou komunikaci
2. Upravit ceníky per segment
3. Přiřadit specializované účetní per segment

#### ❌ Rizikový stav

**Jedna velikost pro všechny**

Neexistuje funkční segmentace — všichni klienti dostávají identický servis bez ohledu na velikost, potřeby a hodnotu. Premium klienti jsou podservisovaní, malí klienti přeservisovaní.

*Indikátory:*

- ✗ Žádná segmentace
- ✗ Premium klienti stěžují na generický přístup
- ✗ OSVČ dostávají reporty pro korporáty
- ✗ Marže nekoreluje s effort

*Nápravná opatření:*

1. Implementovat segmentaci dle tohoto modelu
2. Definovat SLA per segment
3. Přiřadit account managery per segment
4. Upravit komunikační šablony

**Související analýzy:** 12-02, 12-04, 9-01, 16-01

---

### 12-02 — Voice of Customer

**Zdroj:** topic modeling

| | |
|---|---|
| **Frekvence** | Kvartálně (LDA re-fit) |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Vysoký — strategický input pro business |
| **Status** | Produkce |

**Popis:**

Portfolio-wide Voice of Customer analýza — agregace témat z klientské komunikace identifikuje, co nejvíc rezonuje napříč portfoliem. Strategický vstup pro produktový roadmap, marketing a pricing. Posun top tématu z 'stížnosti na cenu' na 'digitalizace' je indikátor zdravého vývoje vztahu se klienty.

**Metodologie:**

LDA topic modeling (gensim) na všech Daktela přepisech + emailech za posledních 12M. Top 20 topics extrakce + ranking podle frekvence × sentiment weight. Trend topics per kvartál. Competitor mention detection (regex + NLP) jako submetric.

**Datové vstupy:**

- Daktela přepisy (agregace portfolio)
- Email komunikace portfolio
- NPS/CSAT dotazníky
- Exit interviews (odcházející klienti)
- Reenio schůzek notes

**Výstupní metriky:**

- Top 10 témat portfolio
- Topic sentiment score
- Topic trend 12M
- Themes by segment (12-01)
- Emerging topics (acceleration)

#### ✅ Dobrý stav

**Klienti volají po inovaci**

Top téma napříč portfoliem: 'digitalizace, API integrace, automation'. 62 % klientů aktivně zmiňuje zájem o pokročilé služby. Sentiment tématu pozitivní.

*Indikátory:*

- ✓ Top topic: 'digitalizace' (28 %)
- ✓ 62 % klientů zmiňuje
- ✓ Topic sentiment +0.72
- ✓ Rostoucí trend 12M

*Doporučené akce:*

1. Investovat do digital offer
2. Pilot s 3-5 premium klienty
3. Marketing message: innovation partner

#### ❌ Rizikový stav

**Stížnosti na cenu dominují**

Top téma: stížnosti na cenu (41 % komunikace), 'drahé', 'konkurence levnější'. Sentiment negativní. Klienti vnímají service jako commoditu, ne hodnotu.

*Indikátory:*

- ✗ Top topic: 'stížnosti na cenu' (41 %)
- ✗ Topic sentiment −0.58
- ✗ 18 % klientů zmiňuje konkurenci
- ✗ Rostoucí trend

*Nápravná opatření:*

1. Value re-positioning kampaň
2. Transparentní pricing breakdown
3. Upsell na nižší-cena + vyšší-value packages
4. Competitor intelligence (12-03)

**Související analýzy:** 7-02, 9-05, 12-03

---

### 12-03 — Competitor intelligence

**Zdroj:** zmínky

| | |
|---|---|
| **Frekvence** | Týdně |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Kritický — direct churn predictor |
| **Status** | Produkce |

**Popis:**

Monitoring zmínek konkurenčních kanceláří (ASB, BDO, KPMG, Deloitte, regionální firmy) v komunikaci klientů. Zmínky konkurence jsou silný leading indicator churn rizika — klient aktivně porovnává nebo už dostává konkurenční nabídky. Agregace poskytuje portfolio-level competitive intelligence.

**Metodologie:**

Named Entity Recognition (spaCy cs_core_news_lg) + custom competitor dictionary (~80 jmen CZ účetních firem + auditoři). Kontext extrakce: price mentioned, service mentioned, switching intent. Per-klient alert při detekci. Portfolio-level aggregation + trend analysis.

**Datové vstupy:**

- Daktela přepisy + emaily (full text)
- Competitor dictionary (maintained list)
- spaCy NER pro organizace
- Kontextový NLP (±10 tokens)
- ARES registry konkurence (pro IČO matching)

**Výstupní metriky:**

- Mentions počet / kvartál
- Top zmiňovaní konkurenti
- Kontext distribuce (price/service/team)
- Switching intent score
- Portfolio churn risk signal

#### ✅ Dobrý stav

**Žádná konkurenční hrozba**

0 zmínek konkurence za poslední kvartál. Klienti spokojeni, neuvažují o změně, neporovnávají s jinými nabídkami.

*Indikátory:*

- ✓ 0 mentions / kvartál
- ✓ Historical avg 0.4 / Q
- ✓ 0 switching intent
- ✓ Stable competitive position

*Doporučené akce:*

1. Udržet kvalitu
2. Marketing: 'klienti zůstávají' message

#### ❌ Rizikový stav

**Klient aktivně porovnává**

Klient zmínil konkurenci 3× za měsíc — konkrétně ASB ('dělali by to za polovinu') a 2× KPMG ('mají portál pro self-service'). Switching intent detekováno. Vysoká pravděpodobnost churn.

*Indikátory:*

- ✗ 3 mentions / měsíc
- ✗ ASB (price) + KPMG (service)
- ✗ Switching intent 0.82
- ✗ Churn risk 10-01: 74 %

*Nápravná opatření:*

1. Okamžitá retention intervence
2. Konkurenční nabídka breakdown — proč my
3. Match relevant features (self-service portál)
4. Loyalty incentive (2 roky pricing lock)

**Související analýzy:** 10-01, 9-04, 12-02

---

### 12-04 — Benchmark

**Zdroj:** portfolio

| | |
|---|---|
| **Frekvence** | Kvartálně |
| **Automatizace** | 70 % automatizováno |
| **Business impact** | Vysoký — strategická hodnota pro klienta |
| **Status** | Produkce |

**Popis:**

Portfolio-wide benchmarking klienta proti průměru jeho oboru (NACE) i proti interním peer group. Klient výrazně pod průměrem je nejen riziko insolvence (10-09), ale i strategická výzva — kancelář může proaktivně nabídnout konzultace, controllingové služby, turnaround podporu.

**Metodologie:**

Bisnode/Creditinfo NACE benchmarks + internal portfolio peer group. Computation: klient percentile per KPI (obrat, marže, produktivita, platební morálka). Composite benchmark score. Peer group: 10 klientů ze stejného NACE + obrat ±30 %. Gap analysis + improvement roadmap.

**Datové vstupy:**

- Klient finanční výkazy (1-02)
- Bisnode/Creditinfo NACE data
- Internal portfolio peer group
- Produktivita KPIs
- Platební morálka (9-03)

**Výstupní metriky:**

- Benchmark percentile per KPI
- Composite score (0-100)
- Peer group comparison
- Gap to median (%)
- Improvement potential (Kč)

#### ✅ Dobrý stav

**Above-average performer**

Klient v 78. percentilu oboru (NACE 69.20 Účetnické služby). Obrat +34 % vs. medián, marže +18 %, produktivita +22 %. Zdravý performer.

*Indikátory:*

- ✓ Percentile 78
- ✓ Obrat +34 % vs. medián
- ✓ Marže +18 %
- ✓ Composite 84/100

*Doporučené akce:*

1. Prezentovat klientovi pozitivní benchmark (value-add)
2. Upsell advisory služby
3. Reference pro marketing

#### ❌ Rizikový stav

**Under-performer — hrozba úpadku**

Klient 40 % pod oborovým průměrem. Obrat −40 %, marže −28 %, produktivita −22 %. Kombinace s 10-09 predikcí insolvence (score 34/100). Vysoké riziko do 12M.

*Indikátory:*

- ✗ Percentile 8
- ✗ Obrat −40 %
- ✗ Marže −28 %
- ✗ Insolvency risk (10-09): 54 %

*Nápravná opatření:*

1. Proaktivní strategická konzultace
2. Nabídnout turnaround advisory
3. Identifikovat quick wins (cash, margin)
4. Risk plan pro kancelář (retention + credit)

**Související analýzy:** 1-02, 10-09, 12-01

---

<a id="sekce-13"></a>

## Sekce 13: Časová dimenze

### 13-01 — Change point detection

**Zdroj:** history

| | |
|---|---|
| **Frekvence** | Týdně |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Vysoký — pochopení příčin změn v chování klientů |
| **Status** | Produkce |

**Popis:**

Bayesovská metoda detekce bodů zlomu v časových řadách klientských dat. Systém automaticky identifikuje momenty, kdy se chování klienta statisticky významně změnilo — a koreluje tyto body s konkrétními událostmi.

Analýza pokrývá všechny měřitelné dimenze: sentiment, platební morálku, frekvenci komunikace, využití služeb, obrat. Každý change point je ohodnocen silou (effect size) a přiřazena pravděpodobná příčina.

Tato analýza je fundamentem pro pochopení kauzality — neprovádíme jen korelace, ale aktivně hledáme co způsobilo změnu.

**Metodologie:**

Bayesovský change point detection (BCPD): 1) Segmentace časové řady na homogenní úseky, 2) Detekce bodů změny s posterior pravděpodobností, 3) Kvantifikace effect size, 4) Cross-reference s událostmi v CRM, 5) Kauzální inference.

**Datové vstupy:**

- Všechny časové řady per klient
- CRM události (změny, incidenty)
- Externí události (legislativa, trh)
- Personální změny (účetní, jednatel)

**Výstupní metriky:**

- Počet change pointů per období
- Síla změny (effect size)
- Pravděpodobná příčina
- Dopad na predikční modely

#### ✅ Dobrý stav

**Stabilní trajektorie**

Za posledních 12 měsíců nebyl detekován žádný statisticky významný change point. Klient je na stabilní trajektorii — predikce jsou spolehlivé.

*Indikátory:*

- ✓ 0 change pointů za 12 měsíců
- ✓ Nízká variance všech metrik
- ✓ Predikce vysoce spolehlivé
- ✓ Konzistentní chování

*Doporučené akce:*

1. Pokračovat v monitoringu
2. Využít stabilitu pro long-term planning

#### ❌ Rizikový stav

**Detekován zlom**

Silný change point detekován 15.1.2026. Koreluje se změnou jednatele. Od tohoto data: sentiment −30 bodů, frekvence kontaktů −60 %, platební morálka zhoršena o 20 dní.

*Indikátory:*

- ✗ Change point 15.1.2026 (p > 0.99)
- ✗ Effect size: silný
- ✗ Příčina: změna jednatele
- ✗ 3 metriky simultánně zhoršeny

*Nápravná opatření:*

1. Osobní schůzka s novým jednatelem
2. Představit služby a tým
3. Přehodnotit strategii pro klienta
4. Sledovat další vývoj intenzivně 90 dní

**Související analýzy:** 13-02, 13-05, 7-01, 10-01

---

### 13-02 — Životní cyklus vztahu

**Zdroj:** timeline

| | |
|---|---|
| **Frekvence** | Týdně (HMM re-evaluace), denně (metriky) |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Vysoký — včasná detekce úpadku vztahu |
| **Status** | Produkce |

**Popis:**

Mapování fáze životního cyklu klientského vztahu na základě multi-dimenzionální časové řady. Systém klasifikuje vztah do fází: Onboarding → Růst → Stabilita → Saturace → Úpadek → Odchod/Obnova. Každá fáze má charakteristické signály v komunikaci, financích a engagementu.

Model využívá hidden Markov model (HMM) trénovaný na historických datech o klientech, kteří prošli celým cyklem. Přechodové pravděpodobnosti mezi fázemi jsou kalibrovány na portfoliu 500+ klientů.

Klíčovou hodnotou je včasná detekce přechodu do fáze Úpadku — v této fázi je retence ještě možná, v pozdějších fázích dramaticky klesá úspěšnost intervence.

**Metodologie:**

Hidden Markov Model (HMM): 1) Definice 6 skrytých stavů (fází), 2) Emission probabilities z 12 observovaných metrik (sentiment, frekvence kontaktu, platební morálka, využití služeb...), 3) Viterbi dekódování aktuální fáze, 4) Forward algorithm pro predikci další fáze, 5) Baum-Welch re-estimace parametrů kvartálně.

**Datové vstupy:**

- CRM interakce (Daktela hovory, emaily, schůzky) — celá historie
- Fakturační data z Money S3/Pohoda — měsíční obrat per klient
- Sentiment skóre z emailové komunikace (NLP pipeline)
- Engagement metriky (open rate, response time, portal logins)
- Smlouvy a jejich změny (DocuWare)

**Výstupní metriky:**

- Aktuální fáze životního cyklu (klasifikace)
- Pravděpodobnost přechodu do další fáze (1M/3M/6M horizont)
- Délka pobytu v aktuální fázi vs. průměr portfolia
- Composite health score (0–100)
- Doporučená akce per fáze (automation trigger)

#### ✅ Dobrý stav

**Fáze růstu, 8. rok spolupráce**

Klient je ve fázi Růstu i po 8 letech — výjimečná trajektorie. Obrat roste 12 % YoY, využívá nové služby, komunikace je proaktivní. Model predikuje setrvání v růstové fázi s 85% pravděpodobností na 12M horizont.

*Indikátory:*

- ✓ Fáze: Růst (HMM posterior > 0.92)
- ✓ Obrat YoY: +12 %
- ✓ 2 nové služby aktivovány za 6M
- ✓ Response time klesající (lepší engagement)

*Doporučené akce:*

1. Nabídnout premium tier / strategické poradenství
2. Požádat o referenci a případovou studii
3. Naplánovat kvartální strategickou schůzku
4. Zafixovat long-term smlouvu s výhodnými podmínkami

#### ❌ Rizikový stav

**Fáze úpadku — komunikace klesá od Q3**

Model detekoval přechod do fáze Úpadku v Q3. Komunikace klesla o 40 %, response time vzrostl z 4h na 72h, klient odmítl 2 schůzky. Bez intervence predikce: 65 % pravděpodobnost odchodu do 6M.

*Indikátory:*

- ✗ Fáze: Úpadek (posterior 0.78, přechod ze Saturace v Q3)
- ✗ Komunikace: −40 % frekvence kontaktu
- ✗ Response time: 4h → 72h
- ✗ 2 odmítnuté schůzky za 2M

*Nápravná opatření:*

1. Senior partner osobní schůzka do 7 dní
2. Připravit analýzu hodnoty (co klient získal za poslední rok)
3. Identifikovat trigger přechodu — co se stalo v Q3?
4. Spustit retention workflow s eskalační maticí

**Související analýzy:** 13-01, 13-05, 10-01, 7-01

---

### 13-03 — Sezónní vzorce

**Zdroj:** časové řady

| | |
|---|---|
| **Frekvence** | Týdně (anomaly detection), měsíčně (profil update) |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Střední — prevence falešných poplachů a detekce skutečných anomálií |
| **Status** | Produkce |

**Popis:**

Dekompozice časových řad klientských metrik na sezónní, trendovou a reziduální složku. Systém identifikuje opakující se vzorce v průběhu roku (daňové uzávěrky, účetní závěrky, dovolené, sezónní podnikání) a detekuje odchylky od očekávaného sezónního chování.

Pro každého klienta je vytvořen individuální sezónní profil na základě 2+ let dat. Odchylka od profilu (neočekávané ticho, neočekávaná aktivita) je silnějším signálem než absolutní hodnota metriky.

Systém kalibruje sezónnost na české i německé kalendáře (svátky, školní prázdniny, daňové termíny) a oborové cykly.

**Metodologie:**

STL dekompozice (Seasonal-Trend decomposition using LOESS): 1) Extrakce sezónní složky per metrika per klient, 2) Konstrukce sezónního profilu (expected behavior per měsíc/týden), 3) Anomaly detection na reziduální složce (z-score > 2.5), 4) Cross-reference s externími kalendáři (ČNB, DE Feiertage, daňové termíny). Kalendáře: api.asvs.cz/svatky, feiertage-api.de/api.

**Datové vstupy:**

- Časové řady komunikace per klient (Daktela CDR + email logs, 24+ měsíců)
- Časové řady financí (fakturace, platby — Money S3 API export)
- Český kalendář svátků — api.asvs.cz/svatky + ruční MFČR daňové termíny
- Německý kalendář svátků — feiertage-api.de/api/?jahr={year}&nur_land=BY
- Oborová sezónnost (NACE kód klienta → referenční profil z ČSÚ)

**Výstupní metriky:**

- Sezónní profil per klient (12 měsíčních indexů per metrika)
- Aktuální odchylka od sezónního profilu (z-score)
- Detekované anomálie (neočekávané ticho/aktivita)
- Sezónní forecast na +3M (expected value ± CI)
- Korelace s externími kalendáři (R²)

#### ✅ Dobrý stav

**Březen nervózní — očekávané**

V březnu (přiznání DPFO, roční zúčtování) klient vykazuje +180 % komunikace oproti průměru — přesně odpovídá jeho sezónnímu profilu z minulých 4 let. Reziduální složka v normě (z-score 0.3).

*Indikátory:*

- ✓ Březnová aktivita: +180 % (profil: +175 %)
- ✓ Reziduál z-score: 0.3 (norma < 2.5)
- ✓ Korelace s daňovým kalendářem: R² = 0.94
- ✓ Forecast přesný: MAE < 8 %

*Doporučené akce:*

1. Neeskalovat — jde o sezónní normu
2. Proaktivně alokovat kapacitu na březen
3. Předpřipravit standardní odpovědi na sezónní dotazy

#### ❌ Rizikový stav

**Nestandardní ticho v březnu**

Klient, který 4 roky v březnu generoval +180 % komunikace, je letos v březnu −60 % pod průměrem. Reziduální z-score 4.1 — silná anomálie. Možné příčiny: přešel ke konkurenci, vnitřní krize, nemoc jednatele.

*Indikátory:*

- ✗ Březnová aktivita: −60 % (profil: +175 %)
- ✗ Reziduál z-score: 4.1 (alarm > 2.5)
- ✗ Žádný kontakt za 18 dní
- ✗ Daňové přiznání nepřipraveno

*Nápravná opatření:*

1. Okamžitý telefonní kontakt — ověřit stav
2. Zkontrolovat ARES/ISIR — insolvence?
3. Ověřit, zda klient nekomunikuje s konkurencí
4. Eskalovat na retention tým — vysoké riziko odchodu

**Související analýzy:** 13-01, 13-04, 19-06, 10-01

---

### 13-04 — Reakce na legislativu

**Zdroj:** korelace

| | |
|---|---|
| **Frekvence** | Per legislativní událost (real-time RSS monitoring) |
| **Automatizace** | 75 % automatizováno |
| **Business impact** | Vysoký — prevence compliance pokut a doměrků |
| **Status** | Produkce |

**Popis:**

Korelační analýza mezi legislativními změnami a chováním klienta. Systém měří, jak rychle a intenzivně klient reaguje na nové zákony, novely a regulace — zda se ptá, přizpůsobuje procesy, nebo ignoruje změny.

Pro účetní kancelář zaměřenou na pendlery CZ/DE je klíčové sledovat reakce na novely DPH, daně z příjmů, sociálního pojištění, A1 formuláře a bilaterální smlouvy. Klient, který nereaguje na legislativní změnu, potřebuje proaktivní intervenci.

Systém parsuje legislativní feedy (Sbírka zákonů, BGBl, EU Official Journal) a koreluje je s klientskou komunikací.

**Metodologie:**

Event study analysis: 1) Identifikace legislativních událostí z RSS feedů (zakonyprolidi.cz, beck-online.de, eur-lex.europa.eu), 2) Definice relevance per klient (dle NACE, pendler status, velikost), 3) Měření reakce (komunikace, dotazy, implementace) v okně T-7 až T+30 dní, 4) Klasifikace: Proaktivní / Reaktivní / Ignorující, 5) Gap analýza — klient ignoruje, ale měl by reagovat.

**Datové vstupy:**

- RSS feed Sbírka zákonů — zakonyprolidi.cz/feed
- RSS feed BGBl (DE) — bgbl.de/feed
- EUR-Lex CELLAR API — relevantní CZ/DE předpisy
- CRM komunikace per klient (email + Daktela hovory) — keyword match
- Klientský profil (pendler, NACE, DPH plátce, zaměstnanci v DE)

**Výstupní metriky:**

- Reakce skóre per legislativní událost per klient (0=ignoruje, 100=proaktivní)
- Průměrná doba reakce (dny od publikace)
- Compliance gap count — relevantní novely bez reakce
- Klasifikace klienta: Proaktivní / Reaktivní / Ignorující
- Risk score z compliance gapu (finanční dopad nereakce)

#### ✅ Dobrý stav

**Proaktivní přizpůsobení**

Klient se ptá na novelu zákona o DPH ještě před její účinností. Sám identifikoval dopad na své podnikání a žádá o konzultaci. Compliance gap = 0.

*Indikátory:*

- ✓ Reakce skóre: 92/100
- ✓ Průměrná doba reakce: −5 dní (ptá se PŘED účinností)
- ✓ 0 compliance gaps za 12M
- ✓ Klasifikace: Proaktivní

*Doporučené akce:*

1. Poskytnout premium konzultace — klient je připraven
2. Nabídnout regulatory alert službu
3. Využít jako referenci pro ostatní klienty

#### ❌ Rizikový stav

**Ignoruje novely — compliance gap**

3 relevantní novely za posledních 6 měsíců — klient na žádnou nereagoval. Novela zákona o DPH ze dne 1.1. mění sazby pro jeho obor — bez přizpůsobení hrozí doměrek. Novela A1 formuláře mění povinnosti pendlerů.

*Indikátory:*

- ✗ Reakce skóre: 8/100
- ✗ 3 compliance gaps (DPH novela, A1 změna, pojištění DE)
- ✗ 0 dotazů od klienta na legislativu za 6M
- ✗ Estimovaný finanční risk: 280 000 Kč (DPH doměrek)

*Nápravná opatření:*

1. Proaktivně informovat klienta o všech 3 novelách
2. Připravit konkrétní dopad analýzu (Kč)
3. Naplánovat implementační schůzku
4. Nastavit automatické notifikace pro budoucí novely

**Související analýzy:** 13-03, 19-06, 4-01, 5-01

---

### 13-05 — Longitudinální trajektorie

**Zdroj:** 10+ let

| | |
|---|---|
| **Frekvence** | Kvartálně |
| **Automatizace** | 70 % automatizováno |
| **Business impact** | Vysoký — detekce neviditelných dlouhodobých trendů |
| **Status** | Produkce |

**Popis:**

Dlouhodobá analýza trajektorie klienta na horizontu 5–15 let. Na rozdíl od krátkodobých analýz (měsíce, kvartály) se tato analýza zaměřuje na sekulární trendy — pomalé, ale fundamentální změny ve vztahu, podnikání a spokojenosti klienta.

Model fituje lineární a nelineární trendy na klíčové metriky a extrapoluje na horizonty 2–5 let. Klíčovou přidanou hodnotou je detekce pomalého, ale soustavného zhoršování — trend, který je neviditelný v měsíčních reportech, ale za 5 let vede k odchodu.

Data pocházejí z celé historie klienta v systému — od prvního kontaktu po současnost.

**Metodologie:**

Longitudinální regrese: 1) Sběr všech historických dat per klient (obrat, komunikace, spokojenost, služby), 2) Fit lineárního a kvadratického trendu, 3) Breakpoint detection (Chow test) pro strukturální zlomy, 4) Extrapolace s confidence intervals, 5) Klasifikace trajektorie: Růst / Stabilita / Úpadek / Obnova.

**Datové vstupy:**

- Kompletní CRM historie (5–15 let) — všechny interakce
- Fakturační historie z Money S3/Pohoda — měsíční obraty
- Smlouvy a jejich změny — DocuWare archiv
- NPS/CSAT data (pokud existují)
- Personální změny (na obou stranách — klient i kancelář)

**Výstupní metriky:**

- Sekulární trend (slope) per klíčová metrika
- R² trendu (síla trendu)
- Predikce na 2/5 let (extrapolace ± CI)
- Detekované strukturální zlomy (breakpoints)
- Klasifikace trajektorie (Růst/Stabilita/Úpadek/Obnova)

#### ✅ Dobrý stav

**Stabilní růst 8 % ročně**

Klient vykazuje konzistentní 8% roční růst obratu i engagementu po celých 10 let spolupráce. Lineární trend s R² = 0.94. Žádné strukturální zlomy. Extrapolace: pokračující růst.

*Indikátory:*

- ✓ Trend: +8 % YoY (lineární, R² = 0.94)
- ✓ 0 strukturálních zlomů za 10 let
- ✓ Engagement roste proporcionálně s obratem
- ✓ Extrapolace 5Y: obrat 2.4× současný

*Doporučené akce:*

1. Investovat do hlubšího vztahu — strategické poradenství
2. Připravit kapacity na rostoucí objem
3. Nabídnout exkluzivní podmínky pro long-term smlouvu

#### ❌ Rizikový stav

**Klesající trend 5 let — bez zásahu odejde**

Obrat klesá −6 % ročně po 5 let. Engagement klesá −12 % ročně. Lineární extrapolace: obrat na nule za 3 roky. Detekován breakpoint 5 let zpět — koreluje s odchodem původního jednatele.

*Indikátory:*

- ✗ Trend: −6 % YoY (R² = 0.88)
- ✗ Breakpoint detekován: před 5 lety (odchod jednatele)
- ✗ Engagement: −12 % YoY
- ✗ Extrapolace 3Y: obrat → 0 (odchod klienta)

*Nápravná opatření:*

1. Urgentní strategická schůzka s aktuálním jednatelem
2. Prezentovat data — vizualizace 10letého trendu
3. Identifikovat a adresovat root cause (vztah s novým jednatelem)
4. Navrhnout restart vztahu — nová smlouva, nový tým, nový přístup

**Související analýzy:** 13-01, 13-02, 13-06, 10-01

---

### 13-06 — Generační změna

**Zdroj:** kontakty + styl

| | |
|---|---|
| **Frekvence** | Měsíčně (ARES scan), průběžně (CRM monitoring) |
| **Automatizace** | 70 % automatizováno |
| **Business impact** | Vysoký — generační změna = kritický bod pro retenci |
| **Status** | Produkce |

**Popis:**

Detekce a analýza generační výměny ve vedení klientské firmy. Systém identifikuje signály předání firmy z jedné generace na druhou — změnu kontaktních osob, komunikačního stylu, rozhodovacích vzorců a technologických preferencí.

Generační výměna je kritický moment — může vést k modernizaci a prohloubení spolupráce, nebo k odchodu klienta (nová generace nemá historický vztah). Včasná identifikace umožňuje adaptaci přístupu.

Model detekuje generační změnu z kombinace signálů: nové kontaktní osoby s jiným příjmením, OR zápis nového jednatele, změna komunikačního stylu (formální → neformální), nové technologické požadavky.

**Metodologie:**

Multi-signal detection: 1) Monitoring OR (ARES API) — změna jednatele/společníka, 2) CRM kontaktní změny — nová osoba s vazbou (příjmení, adresa), 3) NLP analýza komunikačního stylu — shift detection, 4) Behaviorální změny (čas odpovědí, kanál preference), 5) Klasifikace: Pozitivní generační změna / Negativní / Neutrální.

**Datové vstupy:**

- ARES API — GET /ares/v1/ekonomicke-subjekty/{ico} (statutární orgán, datum změny)
- CRM kontaktní databáze — historie změn osob
- Email komunikace — NLP stylová analýza (formálnost, slovní zásoba, délka)
- Daktela CDR — kdo volá, jak dlouho, jak často
- OR výpisy — sbírka listin justice.cz (zápisy změn)

**Výstupní metriky:**

- Detekce generační změny (boolean + confidence)
- Typ změny (syn/dcera, profesionální management, prodej)
- Impact score na vztah (−100 až +100)
- Komunikační gap (starý vs. nový styl)
- Adaptační doporučení (jak přizpůsobit přístup)

#### ✅ Dobrý stav

**Syn přebral — modernizuje**

Syn jednatele převzal firmu před 6 měsíci. Komunikuje digitálně, ptá se na automatizaci, chce cloudové řešení a reporting na mobilu. Obrat +15 % od převzetí. Vztah se prohlubuje.

*Indikátory:*

- ✓ Generační změna detekována (OR zápis + CRM změna)
- ✓ Komunikace: +30 % frekvence, přechod na email/chat
- ✓ 3 nové služby objednány za 6M
- ✓ Sentiment: +25 bodů od převzetí

*Doporučené akce:*

1. Nabídnout moderní balíček služeb (cloud, automatizace)
2. Přizpůsobit komunikaci digitálním kanálům
3. Nabídnout onboarding nového jednatele — představit vše
4. Investovat do vztahu — nová generace = dalších 20 let

#### ❌ Rizikový stav

**Syn přebral — nekomunikuje, nereaguje**

Syn převzal firmu po smrti otce. Nemá vztah ke kanceláři, nereaguje na emaily ani telefony. Platby se zpožďují. Nejspíš zvažuje změnu poskytovatele.

*Indikátory:*

- ✗ Generační změna detekována (OR zápis — nový jednatel)
- ✗ 0 odpovědí na 5 kontaktních pokusů
- ✗ Platby: +25 dní zpoždění od převzetí
- ✗ Žádná komunikace 45 dní

*Nápravná opatření:*

1. Senior partner osobní návštěva — ne email/telefon
2. Připravit přehled hodnoty služeb (co děláme, proč je to důležité)
3. Nabídnout osobní onboarding a přizpůsobení služeb
4. Zvážit přechodnou slevu jako gesto dobré vůle

**Související analýzy:** 13-01, 13-02, 18-01, 19-01

---

### 13-07 — Paměť systému

**Zdroj:** full-text

| | |
|---|---|
| **Frekvence** | Real-time (indexace), on-demand (vyhledávání) |
| **Automatizace** | 80 % automatizováno |
| **Business impact** | Střední — ochrana proti manipulaci a budování znalostní báze |
| **Status** | Produkce |

**Popis:**

Full-text vyhledávání v celé historii komunikace s klientem jako nástroj pro verifikaci tvrzení, detekci rozporů a budování institucionální paměti. Systém indexuje veškerou komunikaci (emaily, záznamy hovorů, zápisy ze schůzek, interní poznámky) do Elasticsearch clusteru.

Klíčovou funkcí je detekce rozporů — když klient tvrdí něco, co je v rozporu s jeho historickou komunikací. Tato schopnost chrání kancelář před manipulací a zajišťuje konzistenci.

Systém také slouží jako knowledge base — nový účetní převezme klienta a během hodin má přístup k 10 letům kontextu.

**Metodologie:**

Full-text indexing (Elasticsearch): 1) Indexace všech komunikačních kanálů (IMAP email sync, Daktela transcription, DocuWare OCR, CRM notes), 2) Entity extraction (osoby, firmy, částky, data), 3) Contradiction detection — NLI model na nových vs. historických tvrzeních, 4) Timeline reconstruction per téma, 5) Semantic search pro knowledge retrieval.

**Datové vstupy:**

- IMAP email archiv — kompletní korespondence (10+ let)
- Daktela CDR + VoIP transcription (speech-to-text)
- DocuWare OCR texty ze skenovaných dokumentů
- CRM poznámky a zápisy ze schůzek
- Interní ticketovací systém — komunikace per ticket

**Výstupní metriky:**

- Počet indexovaných dokumentů per klient
- Detekované rozpory (contradiction alerts)
- Pokrytí historie (od–do, kompletnost)
- Top témata per klient (topic modeling)
- Využití knowledge base (queries per účetní per den)

#### ✅ Dobrý stav

**Historie 10 let dostupná**

Kompletní historie komunikace za 10 let je indexována a prohledatelná. Nový účetní přebírající klienta během 2 hodin prochází klíčové momenty a kontexty. Žádné informace nebyly ztraceny.

*Indikátory:*

- ✓ 12 450 indexovaných dokumentů
- ✓ Pokrytí: 100 % (2016–2026)
- ✓ 0 rozporů detekováno za 12M
- ✓ Knowledge base využívána 3×/týden

*Doporučené akce:*

1. Udržovat kvalitu indexace
2. Pravidelně čistit duplicity
3. Školit nové zaměstnance na práci se systémem

#### ❌ Rizikový stav

**Klient říká X, ale před 3 lety řekl opak**

Klient tvrdí, že nikdy nesouhlasil s navýšením ceny. Systém nalezl email z 15.3.2023 kde explicitně píše: 'S navýšením o 15 % souhlasím.' Rozpor detekován automaticky, evidence dokumentována.

*Indikátory:*

- ✗ Contradiction alert: vysoká konfidence (0.95)
- ✗ Evidence: email z 15.3.2023 vs. aktuální tvrzení
- ✗ Téma: cenotvorba (opakovaný problém)
- ✗ Historicky 3 podobné incidenty

*Nápravná opatření:*

1. Připravit evidenci (screenshot emailu) pro schůzku
2. Komunikovat diplomaticky — ne konfrontačně
3. Navrhnout písemné potvrzení budoucích dohod
4. Aktualizovat risk score klienta

**Související analýzy:** 13-02, 13-05, 7-01, 18-01

---

<a id="sekce-14"></a>

## Sekce 14: Síťová analýza

### 14-01 — Graf klientů

**Zdroj:** cross-match IČO

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Vysoký — detekce fraud a strategické využití vazeb |
| **Status** | Produkce |

**Popis:**

Grafová analýza obchodních vztahů mezi klienty kanceláře na základě křížového porovnání IČO v dodavatelských a odběratelských fakturách. Systém buduje graf propojení a detekuje jak legitimní obchodní vazby, tak podezřelé vzorce.

Znalost vzájemných vazeb mezi klienty je strategicky cenná — umožňuje proaktivní komunikaci při problémech (pokud klient A dluží klientu B, a oba jsou naši klienti).

Systém také detekuje potenciální konflikty zájmů a zajišťuje compliance s profesní etikou.

**Metodologie:**

Grafové algoritmy: 1) Budování grafu z fakturačních dat (IČO matching), 2) Community detection (Louvain), 3) Cycle detection, 4) Centrality measures (betweenness, degree), 5) Anomaly detection (neočekávané hrany).

**Datové vstupy:**

- Vydané faktury všech klientů (IČO odběratele)
- Přijaté faktury všech klientů (IČO dodavatele)
- ARES data pro doplnění
- Historický vývoj grafu

**Výstupní metriky:**

- Počet hran (obchodních vztahů)
- Počet komunit
- Detekované cykly
- Centrální uzly (influenceři)
- Anomálie (nové/zmizelé hrany)

#### ✅ Dobrý stav

**Transparentní vztahy**

Systém identifikoval 12 vzájemných obchodních vztahů mezi klienty. Všechny jsou legitimní a transparentní — žádné podezřelé cykly ani anomálie.

*Indikátory:*

- ✓ 12 identifikovaných vztahů
- ✓ 0 uzavřených cyklů
- ✓ Stabilní graf 6 měsíců
- ✓ Žádné anomálie

*Doporučené akce:*

1. Využít znalost vazeb pro cross-selling
2. Proaktivně informovat při problémech v řetězci
3. Aktualizovat graf měsíčně

#### ❌ Rizikový stav

**Podezřelá smyčka**

Detekována uzavřená smyčka A→B→C→A s identickými částkami (±3 %). Transakce probíhají pravidelně 1× měsíčně. Možný karusel nebo fiktivní obraty.

*Indikátory:*

- ✗ 1 uzavřený cyklus (3 uzly)
- ✗ Identické částky (±3 %)
- ✗ Pravidelnost 1×/měsíc
- ✗ 1 firma v cyklu mladší 6 měsíců

*Nápravná opatření:*

1. Konzultovat s compliance odd.
2. Diskrétně ověřit podstatu transakcí
3. Zvážit nahlášení dle AML zákona
4. Dokumentovat nálezy

**Související analýzy:** 14-02, 14-03, 6-01, 10-06

---

### 14-02 — Influenceři

**Zdroj:** centralita

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 80 % automatizováno |
| **Business impact** | Vysoký — identifikace systémového rizika v portfoliu |
| **Status** | Produkce |

**Popis:**

Identifikace nejvlivnějších uzlů v klientské síti pomocí centrality measures. Klient s vysokou betweenness centralitou je 'bridge' — pokud odejde nebo má problémy, ovlivní to řetězově další klienty. Klient s vysokou degree centralitou je 'hub' — má nejvíce obchodních vazeb.

Analýza identifikuje single points of failure — klienty, jejichž odchod by způsobil kaskádové ztráty. Tito klienti vyžadují zvláštní péči a retention strategii.

Systém vizualizuje síť v grafu s uzly proporcionálními k centralitě a barevně odlišenými dle risk skóre.

**Metodologie:**

Graph centrality analysis: 1) Betweenness centrality — identifikace bridge uzlů, 2) Degree centrality — identifikace hub uzlů, 3) PageRank — celkový vliv v síti, 4) Eigenvector centrality — vliv sousedů, 5) Cascade simulation — Monte Carlo simulace dopadu odchodu top-N uzlů na síť. SQL: SELECT i1.supplier_ico, i1.customer_ico, COUNT(*) FROM invoices i1 JOIN invoices i2 ON i1.supplier_ico = i2.customer_ico GROUP BY 1,2.

**Datové vstupy:**

- Graf klientů z 14-01 (adjacency matrix z fakturačních IČO)
- Doporučení databáze — kdo koho přivedl (CRM field 'referral_source')
- Společní zaměstnanci — cross-match RČ z mzdových záznamů
- Sdílení jednateli/společníci — ARES API statutární orgány
- Revenue per klient (pro weighted graph)

**Výstupní metriky:**

- Top 10 klientů dle betweenness centrality
- Top 10 klientů dle degree centrality
- Cascade risk score per klient (% portfolia at risk)
- Single point of failure count
- Network resilience index (0–100)

#### ✅ Dobrý stav

**Žádný single point of failure**

Síť je distribuovaná — žádný klient nemá betweenness centrality > 0.15. Odchod libovolného klienta ovlivní maximálně 2 % portfolia. Network resilience index: 87.

*Indikátory:*

- ✓ Max betweenness centrality: 0.12
- ✓ Max cascade risk: 2 % portfolia
- ✓ Network resilience: 87/100
- ✓ 0 single points of failure

*Doporučené akce:*

1. Udržovat diverzifikaci portfolia
2. Monitorovat nové vazby, které by mohly vytvořit závislost
3. Kvartální report pro management

#### ❌ Rizikový stav

**1 klient propojený s 8 dalšími — domino riziko**

Klient ABC s.r.o. (IČO 12345678) má betweenness centrality 0.45 — je bridge pro 8 dalších klientů. 3 z nich jsou jeho dodavatelé, 2 odběratelé, 3 přivedl jako referenci. Pokud ABC odejde, cascade risk = 18 % portfolia (2.4M Kč/rok).

*Indikátory:*

- ✗ Betweenness centrality: 0.45 (alarm > 0.3)
- ✗ 8 přímých vazeb na další klienty
- ✗ Cascade risk: 18 % portfolia (2.4M Kč/rok)
- ✗ 3 klienti přišli přes referenci od ABC

*Nápravná opatření:*

1. Prioritizovat retenci ABC — senior partner management
2. Budovat přímé vztahy s 8 propojenými klienty
3. Redukovat závislost — diverzifikovat referenční zdroje
4. Připravit contingency plán pro odchod ABC

**Související analýzy:** 14-01, 14-03, 14-06, 10-01

---

### 14-03 — Sdílené kontakty

**Zdroj:** deduplikace

| | |
|---|---|
| **Frekvence** | Měsíčně (full scan), denně (nové kontakty) |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Vysoký — detekce švarcsystému a compliance rizik |
| **Status** | Produkce |

**Popis:**

Deduplikace kontaktních osob napříč klientským portfoliem. Systém hledá totožné nebo velmi podobné kontaktní osoby u různých firem — stejné jméno, telefon, email, rodné číslo. Sdílený kontakt může signalizovat legitimní holdingovou strukturu, ale také švarcsystém nebo podvodné schéma.

Pro pendlerskou klientelu je toto zvláště relevantní — stejná osoba může být formálně zaměstnána u více firem, což je v kontextu CZ/DE pracovního práva potenciální problém.

Systém provádí fuzzy matching na jménech (Levenshtein distance < 2), exact match na RČ a telefonu, a domain match na emailech.

**Metodologie:**

Entity resolution: 1) Exact match na rodné číslo (RČ) z mzdových záznamů, 2) Fuzzy match na jména (Levenshtein ≤ 2, Soundex CZ), 3) Phone/email exact match, 4) Address proximity (< 50m = same location), 5) Klasifikace: Holding / Švarcsystém / Rodinná firma / False positive. SQL: SELECT rc, COUNT(DISTINCT company_id) as firms FROM employees GROUP BY rc HAVING firms > 1.

**Datové vstupy:**

- CRM kontaktní databáze — všichni kontakti všech klientů
- Mzdové záznamy — RČ, jméno, adresa zaměstnanců
- ARES API — statutární orgány všech klientských firem
- Email adresy a telefonní čísla z komunikace
- OR výpisy — společníci a jednatelé

**Výstupní metriky:**

- Počet sdílených kontaktů (unique osob u 2+ firem)
- Klasifikace per sdílený kontakt (holding/švarcsystém/family)
- Risk score sdílení (0=legitimní, 100=podezřelé)
- Počet firem per sdílená osoba
- Finanční expozice (obrat firem se sdílenými kontakty)

#### ✅ Dobrý stav

**Každý klient unikátní**

Žádné sdílené kontaktní osoby detekovány. Všichni zaměstnanci jsou unikátní pro svou firmu. CRM je čistý a konzistentní.

*Indikátory:*

- ✓ 0 sdílených kontaktů
- ✓ 0 duplikátních RČ v mzdových záznamech
- ✓ CRM deduplication score: 100 %
- ✓ Žádné cross-company vazby

*Doporučené akce:*

1. Pokračovat v měsíčním scanu
2. Udržovat kvalitu CRM dat
3. Ověřovat nové kontakty při onboardingu

#### ❌ Rizikový stav

**Stejná kontaktní osoba u 4 firem — švarcsystém?**

Jan Novák (RČ 850515/1234) nalezen v mzdových záznamech 4 firem — všechny na DPP, celkový úvazek ekvivalent 2.8 FTE. 3 firmy jsou naši klienti. Podezření na švarcsystém nebo zastřený pracovní poměr.

*Indikátory:*

- ✗ 1 osoba u 4 firem (3 naši klienti)
- ✗ Celkový úvazek: 2.8 FTE (nereálné)
- ✗ Všechny DPP — vyhýbání se pojistnému
- ✗ Risk score: 85/100

*Nápravná opatření:*

1. Diskrétně ověřit s klienty podstatu vztahu
2. Konzultovat pracovněprávní oddělení
3. Upozornit klienty na riziko requalifikace (ČSSZ, OSSZ)
4. Dokumentovat nález pro případnou kontrolu

**Související analýzy:** 14-01, 14-04, 23-27, 3-01

---

### 14-04 — Supplier-client

**Zdroj:** transakce

| | |
|---|---|
| **Frekvence** | Měsíčně (full scan), týdně (platební monitoring) |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Vysoký — ochrana klientů a strategický vhled |
| **Status** | Produkce |

**Popis:**

Identifikace dodavatelsko-odběratelských vztahů mezi klienty kanceláře na základě křížového matchingu IČO na fakturách. Pokud klient A vystavuje faktury na IČO klienta B, a oba jsou naši klienti, máme unikátní vhled do obou stran transakce.

Toto je strategicky cenné — vidíme obě strany pohledávky/závazku, můžeme proaktivně řešit platební problémy a optimalizovat cash flow obou stran. Zároveň to vyžaduje absolutní diskrétnost a dodržení informační bariéry.

Systém automaticky identifikuje tyto vazby a taguje je v CRM pro informaci account managerů (bez sdílení konkrétních dat).

**Metodologie:**

IČO cross-matching: 1) SQL JOIN vydané faktury (supplier_ico) s přijatými fakturami (customer_ico) across all clients, 2) Identifikace párů klient-A ↔ klient-B, 3) Kvantifikace objemu vzájemných transakcí, 4) Detekce platebních problémů v řetězci, 5) Alert při insolvenci jedné strany. Query: SELECT a.client_id, b.client_id, SUM(a.amount) FROM issued_invoices a JOIN received_invoices b ON a.supplier_ico = b.ico AND a.customer_ico = b.ico.

**Datové vstupy:**

- Vydané faktury všech klientů — IČO odběratele, částka, splatnost
- Přijaté faktury všech klientů — IČO dodavatele, částka, splatnost
- Saldokonto — stav úhrad per faktura
- ARES API — ověření aktuálnosti IČO
- Insolvence monitoring (ISIR justice.cz) per IČO v řetězci

**Výstupní metriky:**

- Počet supplier-client párů v portfoliu
- Objem vzájemných transakcí (Kč/rok)
- Platební gap — splatnost A→B vs. skutečná úhrada
- Rizikové páry (jeden z páru má problémy)
- Potenciál pro cash flow optimalizaci

#### ✅ Dobrý stav

**Transparentní dodavatelské řetězce**

Identifikováno 8 supplier-client párů. Všechny transakce jsou transparentní, platby probíhají včas. Obě strany vědí o vztahu a kancelář může optimalizovat cash flow.

*Indikátory:*

- ✓ 8 identifikovaných párů
- ✓ Průměrná platba: 3 dny před splatností
- ✓ 0 problematických párů
- ✓ Cash flow optimalizace: úspora 120K/rok

*Doporučené akce:*

1. Nabídnout cash flow optimalizaci oběma stranám
2. Proaktivně informovat při blížící se splatnosti
3. Využít znalost pro lepší plánování

#### ❌ Rizikový stav

**Klient je dodavatel jiného klienta a neví o tom**

Klient ABC dodává klientu XYZ za 2.1M Kč/rok. XYZ má platby 45 dní po splatnosti a zhoršující se sentiment. ABC netuší, že XYZ je náš klient a že víme o platebních problémech. Riziko: ABC přijde o 2.1M pohledávku.

*Indikátory:*

- ✗ Supplier-client pár: ABC → XYZ (2.1M/rok)
- ✗ XYZ: platby +45 dní po splatnosti, trend zhoršující
- ✗ ABC: netuší o problémech XYZ
- ✗ ISIR check XYZ: zatím čistý, ale risk score 72

*Nápravná opatření:*

1. Proaktivně (a diskrétně) upozornit ABC na zpomalení plateb v sektoru
2. Nesdílet konkrétní data o XYZ — informační bariéra
3. Navrhnout ABC pojištění pohledávek (obecně)
4. Intenzivně pracovat s XYZ na zlepšení morálky

**Související analýzy:** 14-01, 14-02, 1-04, 19-02

---

### 14-05 — Zaměstnanec <-> klient

**Zdroj:** komunikace

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 80 % automatizováno |
| **Business impact** | Kritický — bus factor = operační riziko |
| **Status** | Produkce |

**Popis:**

Bipartitní graf zaměstnanec–klient mapující, kdo s kým komunikuje a v jakém objemu. Analýza detekuje nerovnoměrné rozložení práce, závislost na jednom zaměstnanci (bus factor) a preferenční přidělování klientů.

Bus factor = 1 je kritické riziko — pokud odejde nebo onemocní jediný zaměstnanec, který zná klienta, dojde k výpadku služby. Systém měří bus factor per klient a per zaměstnanec.

Analýza také odhaluje 'tiché přetěžování' — zaměstnance, kteří de facto obsluhují více klientů, než by měli, protože kolegové delegují.

**Metodologie:**

Bipartite graph analysis: 1) Konstrukce grafu zaměstnanec↔klient z komunikačních dat, 2) Váhy hran = objem komunikace (emaily + hovory + tickety), 3) Výpočet bus factor per klient (min. počet zaměstnanců se znalostí), 4) Load balancing index per zaměstnanec (skutečný vs. expected objem), 5) Detekce přetížení (> 1.5× expected load).

**Datové vstupy:**

- Email komunikace — From/To per klient per zaměstnanec (IMAP headers)
- Daktela CDR — hovory per agent per klient
- Ticketovací systém — přiřazení ticketů per zaměstnanec per klient
- Docházkový systém — pracovní doba per zaměstnanec
- CRM — formální přiřazení účetní↔klient

**Výstupní metriky:**

- Bus factor per klient (počet zaměstnanců se znalostí)
- Load balancing index per zaměstnanec (actual/expected)
- Top 5 přetížených zaměstnanců
- Top 5 klientů s bus factor = 1
- Knowledge distribution heatmap (zaměstnanec × klient)

#### ✅ Dobrý stav

**Rovnoměrné přidělení**

Průměrný bus factor = 2.8 (min. 2 zaměstnanci znají každého klienta). Load balancing index: 0.85–1.15 u všech zaměstnanců. Žádné přetížení, žádné knowledge silos.

*Indikátory:*

- ✓ Min. bus factor: 2 (žádný klient s bus factor 1)
- ✓ Load balancing: 0.85–1.15 u všech
- ✓ Knowledge distribution: rovnoměrná
- ✓ 0 přetížených zaměstnanců

*Doporučené akce:*

1. Udržovat cross-training program
2. Rotovat klienty kvartálně (sekundární kontakt)
3. Dokumentovat klientské specifika v knowledge base

#### ❌ Rizikový stav

**1 účetní komunikuje s 80% klientů — bus factor**

Účetní Petra komunikuje s 80 % klientů (de facto primary contact). Její load index: 3.2× expected. Bus factor u 12 klientů = 1 (jen Petra). Pokud Petra onemocní nebo odejde, kolaps služby.

*Indikátory:*

- ✗ Petra: 80 % klientů, load index 3.2×
- ✗ 12 klientů s bus factor = 1
- ✗ Ostatní účetní: load index 0.3–0.5×
- ✗ Petra: přesčasy 25h/měsíc

*Nápravná opatření:*

1. Okamžitě zahájit knowledge transfer — Petra dokumentuje
2. Přiřadit sekundární kontakt ke každému klientovi
3. Přerozdělit portfolio — max. 40 % per účetní
4. Zvážit nábor dalšího zaměstnance

**Související analýzy:** 14-01, 23-48, 11-07, 11-09

---

### 14-06 — Doporučení klientů

**Zdroj:** kdo koho přivedl

| | |
|---|---|
| **Frekvence** | Kvartálně |
| **Automatizace** | 60 % automatizováno |
| **Business impact** | Vysoký — referral = nejlevnější akvizice s nejvyšší CLV |
| **Status** | Produkce |

**Popis:**

Analýza referenční sítě — kdo koho přivedl jako klienta. Systém mapuje referral chain a měří net promoter score (NPS) implicitně z chování — klient, který doporučuje, je prokazatelně spokojený.

Referenční klienti mají v průměru 2.3× vyšší CLV, 40 % nižší churn rate a kratší sales cycle. Proto je referenční síť klíčovým růstovým motorem.

Systém identifikuje 'super-referrery' — klienty s 3+ doporučeními — a doporučuje jim VIP péči. Také detekuje, kdy referenční aktivita klesá, což je signál klesající spokojenosti.

**Metodologie:**

Referral network analysis: 1) Extrakce referral dat z CRM (field 'referral_source'), 2) Konstrukce referral tree, 3) Výpočet referral rate per klient (referrals / years), 4) Identifikace super-referrerů (3+ referrals), 5) Trend analýza referral rate per segment, 6) Korelace s NPS/CSAT a CLV.

**Datové vstupy:**

- CRM — pole 'referral_source' / 'doporučil' per klient
- Onboarding záznamy — jak se klient dozvěděl o kanceláři
- NPS/CSAT průzkumy (pokud existují)
- CLV a churn data per klient
- Marketingové kanály (Google Ads, web, sociální sítě) — pro non-referral srovnání

**Výstupní metriky:**

- % klientů z doporučení vs. jiné kanály
- Referral rate per klient (doporučení/rok)
- Super-referreři (3+ doporučení)
- CLV referral vs. non-referral klientů
- Churn rate referral vs. non-referral

#### ✅ Dobrý stav

**40 % klientů z doporučení**

40 % nových klientů za posledních 12 měsíců přišlo z doporučení. 5 super-referrerů přineslo 60 % všech referralů. Referral klienti mají 2.3× vyšší CLV.

*Indikátory:*

- ✓ 40 % klientů z doporučení
- ✓ 5 super-referrerů (3+ doporučení každý)
- ✓ CLV referral klientů: 2.3× vyšší
- ✓ Churn referral klientů: 40 % nižší

*Doporučené akce:*

1. VIP program pro super-referrery (sleva, exkluzivní služby)
2. Referral bonus program (sleva za doporučení)
3. Case study s doporučenými klienty
4. Proaktivně žádat o referenci spokojeně klienty

#### ❌ Rizikový stav

**0 doporučení za 2 roky — klienti nedoporučují**

Za poslední 2 roky žádný nový klient z doporučení. Buď klienti nejsou dostatečně spokojeni, nebo nejsou požádáni. Historický referral rate: 4 klienti/rok → 0.

*Indikátory:*

- ✗ 0 referralů za 24 měsíců
- ✗ Historický průměr: 4/rok (pokles na 0)
- ✗ NPS neměřeno — chybí data
- ✗ 100 % nových klientů z placených kanálů

*Nápravná opatření:*

1. Spustit NPS průzkum — změřit spokojenost
2. Identifikovat příčinu — proč nedoporučují
3. Implementovat strukturovaný referral program
4. Zvážit osobní rozhovory s top klienty o spokojenosti

**Související analýzy:** 14-01, 14-02, 10-01, 9-01

---

<a id="sekce-15"></a>

## Sekce 15: Psychografický profil

### 15-01 — Rozhodovací styl

**Zdroj:** délka cyklů

| | |
|---|---|
| **Frekvence** | Průběžně (per interakce) |
| **Automatizace** | 65 % automatizováno |
| **Business impact** | Střední — optimalizace komunikační strategie |
| **Status** | Produkce |

**Popis:**

Analýza rozhodovacího stylu klienta na základě historických dat o tom, jak rychle a na jakém základě klient dělá rozhodnutí. Systém měří čas od prezentace návrhu po akceptaci/odmítnutí a identifikuje vzorce.

Znalost rozhodovacího stylu umožňuje přizpůsobit komunikaci — data-driven klientům posíláme čísla a analýzy, emocionálním klientům příběhy a reference, nerozhodným klientům jasná doporučení s deadlinem.

Systém také sleduje, zda se rozhodovací styl mění v čase — zpomalení rozhodování je signálem problémů.

**Metodologie:**

Behaviorální analýza: 1) Měření doby rozhodování per typ rozhodnutí, 2) Klasifikace stylu (analytický/intuitivní/delegující/odkládající), 3) Identifikace rozhodovacích triggerů, 4) Trend analýza rychlosti rozhodování.

**Datové vstupy:**

- Nabídky a jejich akceptace/odmítnutí (timestamps)
- Emailová komunikace (dotazy, argumenty)
- Záznamy z hovorů
- Historická rozhodnutí

**Výstupní metriky:**

- Průměrná doba rozhodování
- Klasifikace stylu
- Rozhodovací triggery
- Trend (zrychluje/zpomaluje)

#### ✅ Dobrý stav

**Rozhodný klient**

Klient se rozhoduje do 48 hodin na základě dat. Pokládá konkrétní dotazy, vyžaduje čísla a analýzy. Komunikace je efektivní a produktivní.

*Indikátory:*

- ✓ Průměr 48h do rozhodnutí
- ✓ 100 % rozhodnutí podloženo daty
- ✓ Dotazy jsou konkrétní a věcné
- ✓ Stabilní styl 2+ roky

*Doporučené akce:*

1. Posílat data-driven reporty
2. Připravovat variantní analýzy s čísly
3. Respektovat jeho čas — být stručný

#### ❌ Rizikový stav

**Nerozhodný klient**

Klient odkládá rozhodnutí měsíce. Opakovaně žádá o další informace, ale nikdy se nerozhodne. Blokuje implementaci doporučení a přichází o příležitosti.

*Indikátory:*

- ✗ Průměr 45+ dní do rozhodnutí
- ✗ 60 % rozhodnutí odloženo
- ✗ Opakované žádosti o další data
- ✗ 3 promarněné příležitosti za rok

*Nápravná opatření:*

1. Nastavit jasné deadliny s důsledky
2. Prezentovat jednu jasnou rekomendaci (ne 5 variant)
3. Nabídnout osobní schůzku pro rozhodnutí
4. Kvantifikovat náklady odkládání

**Související analýzy:** 15-02, 15-03, 7-01, 17-01

---

### 15-02 — Riziková tolerance

**Zdroj:** reakce na změny

| | |
|---|---|
| **Frekvence** | Per změnová událost, kvartální profil update |
| **Automatizace** | 65 % automatizováno |
| **Business impact** | Střední — optimalizace rollout strategie |
| **Status** | Produkce |

**Popis:**

Profilování rizikové tolerance klienta na základě historických reakcí na změny — nové služby, změny cen, procesní inovace, legislativní novinky. Systém klasifikuje klienty na spektru od 'early adopter' po 'change resistant'.

Znalost rizikové tolerance je klíčová pro rollout nových služeb a funkcí. Early adopterům nabízíme nové věci jako prvním (beta testeři), konzervativním klientům prezentujeme změny opatrně s důrazem na bezpečnost a stabilitu.

Model se trénuje na historických reakcích: kolik dní trvá akceptace nové služby, kolik otázek klient klade, kolikrát změnu odmítne než přijme.

**Metodologie:**

Behavioral profiling: 1) Katalog změnových událostí per klient (nová služba, cenová úprava, procesní změna), 2) Měření reakce: čas akceptace, počet dotazů, počet odmítnutí, 3) Feature engineering: průměrný acceptance time, rejection rate, question intensity, 4) Clustering (K-means, k=4): Early Adopter / Pragmatist / Conservative / Resistor, 5) Trend — posun na spektru v čase.

**Datové vstupy:**

- CRM — nabídky nových služeb a jejich akceptace/odmítnutí (timestamps)
- Email komunikace — dotazy a námitky per změnová událost
- Daktela hovory — sentiment analýza při diskuzi o změnách
- Fakturace — kdy začal novou službu reálně využívat
- Historické cenové změny — reakce (akceptace / eskalace / odchod)

**Výstupní metriky:**

- Klasifikace: Early Adopter / Pragmatist / Conservative / Resistor
- Průměrný acceptance time (dny)
- Rejection rate (%)
- Question intensity (dotazů per změna)
- Trend na spektru (posun za 12M)

#### ✅ Dobrý stav

**Akceptuje inovace**

Klient klasifikován jako Early Adopter — průměrná akceptace nové služby za 3 dny, 0 % rejection rate. Aktivně se ptá na nové funkce a chce je testovat jako první.

*Indikátory:*

- ✓ Klasifikace: Early Adopter (cluster 1)
- ✓ Acceptance time: 3 dny (portfolio avg: 18 dní)
- ✓ Rejection rate: 0 %
- ✓ 2 služby adoptovány proaktivně (bez nabídky)

*Doporučené akce:*

1. Zařadit do beta testing programu
2. Nabídnout nové služby jako prvnímu
3. Využít jako referenci pro konzervativní klienty
4. Nabídnout inovační konzultace (automatizace, digitalizace)

#### ❌ Rizikový stav

**Odmítá jakoukoliv změnu**

Klient klasifikován jako Resistor — odmítl 4 z 5 nabízených změn, průměrná akceptace (když přijme): 90 dní. Stěžuje si na 'zbytečné změny' a vyžaduje 'aby vše zůstalo jak bylo'.

*Indikátory:*

- ✗ Klasifikace: Resistor (cluster 4)
- ✗ Rejection rate: 80 %
- ✗ Acceptance time (kde přijal): 90 dní
- ✗ 3 stížnosti na změny za rok

*Nápravná opatření:*

1. Prezentovat změny opatrně — důraz na bezpečnost, ne novost
2. Poskytnout osobní demo a podporu při přechodu
3. Nezavádět změny naráz — postupně, po malých krocích
4. Zvážit dedicovanou podporu při povinných změnách (legislativa)

**Související analýzy:** 15-01, 15-03, 15-04, 13-04

---

### 15-03 — Loajalita vs. oportunismus

**Zdroj:** reakce na nabídky

| | |
|---|---|
| **Frekvence** | Kvartálně (profil update), real-time (competitor mention alert) |
| **Automatizace** | 70 % automatizováno |
| **Business impact** | Vysoký — pricing a retention strategie |
| **Status** | Produkce |

**Popis:**

Klasifikace klienta na spektru loajalita–oportunismus na základě historických vzorců chování. Loajální klient zůstává i při mírně vyšší ceně, protože oceňuje vztah a kvalitu. Oportunistický klient porovnává ceny a přechází k levnějšímu poskytovateli.

Systém detekuje signály oportunismu: zmínky konkurence, žádosti o cenové srovnání, vyjednávání při každé faktuře, krátké smlouvy. Signály loajality: nepotřebuje porovnávat, referuje nás, akceptuje úpravy cen, dlouhodobá smlouva.

Klasifikace ovlivňuje pricing strategii — loajálním klientům nabízíme fair cenu s přidanou hodnotou, oportunistickým klientům kompetitivní cenu s lockin mechanismy.

**Metodologie:**

Loyalty scoring model: 1) Feature engineering: délka vztahu, zmínky konkurence (NLP keyword detection v emailech), cenové vyjednávání (frequency), referral history, smlouva délka, 2) Logistická regrese: P(oportunista) = σ(β₀ + β₁×competitor_mentions + β₂×negotiation_freq + ...), 3) Skóre 0–100 (0=absolutní loajalista, 100=čistý oportunista), 4) Threshold: >60 = oportunista, <30 = loajalista, 30–60 = pragmatik.

**Datové vstupy:**

- Email komunikace — NLP keyword search: 'konkurence', 'nabídka', 'levnější', 'jiná kancelář'
- CRM — cenová vyjednávání (počet per rok, výsledek)
- Smlouvy — délka, prodloužení, výpovědní lhůta
- Referral history — počet doporučení (indikátor loajality)
- Reaction to price changes — historické cenové úpravy a reakce

**Výstupní metriky:**

- Loyalty score (0–100, nižší = loajálnější)
- Klasifikace: Loajalista / Pragmatik / Oportunista
- Competitor mention frequency (per kvartál)
- Price negotiation intensity (počet / rok)
- Churn probability conditional on price increase

#### ✅ Dobrý stav

**Loyální 8+ let**

Klient je s kanceláří 8+ let, nikdy nezmínil konkurenci, doporučil 3 klienty. Loyalty score: 12/100 (silný loajalista). Při posledním navýšení ceny (+10 %) reagoval: 'Žádný problém, děláte dobrou práci.'

*Indikátory:*

- ✓ Loyalty score: 12/100
- ✓ 0 zmínek konkurence za celou historii
- ✓ 3 referraly
- ✓ Akceptoval cenové navýšení bez vyjednávání

*Doporučené akce:*

1. Zajistit excelentní servis — neztratit ho
2. Nabídnout long-term smlouvu se stability bonusem
3. Požádat o referenci a testimonial
4. Osobní poděkování za loajalitu

#### ❌ Rizikový stav

**Porovnává ceny každý rok**

Klient každý rok v lednu posílá 'dostal jsem nabídku od konkurence za X' a vyjednává slevu. Loyalty score: 82/100 (oportunista). Průměrně 3× ročně zmíní konkurenci. Smlouva vždy na 1 rok.

*Indikátory:*

- ✗ Loyalty score: 82/100
- ✗ 3 zmínky konkurence/rok
- ✗ Cenové vyjednávání: každý leden
- ✗ Smlouva: 1 rok (odmítá delší)

*Nápravná opatření:*

1. Pricing strategie: kompetitivní cena s jasným value proposition
2. Připravit competitive analysis — proč jsme lepší
3. Implementovat lockin mechanismy (integrace, custom řešení)
4. Zvážit, zda je klient profitabilní po slevách

**Související analýzy:** 15-01, 15-02, 10-01, 22-04

---

### 15-04 — Reakce na problémy

**Zdroj:** historie krizí

| | |
|---|---|
| **Frekvence** | Per krizová událost, kvartální profil review |
| **Automatizace** | 55 % automatizováno |
| **Business impact** | Vysoký — krizová komunikace a prevence eskalací |
| **Status** | Produkce |

**Popis:**

Profilování reakce klienta na problémy a chyby — naše i jeho. Systém analyzuje historické krizové situace a klasifikuje klientův styl řešení problémů. Znalost tohoto profilu je klíčová pro krizovou komunikaci.

Typy reakcí: Konstruktivní (hledá řešení, komunikuje), Eskalační (vyhrožuje, píše právníkovi, žádá management), Tiché odcházení (přestane komunikovat a odejde bez vysvětlení), Denial (popírá problém, nebere odpovědnost).

Pro každý typ máme odlišný krizový protokol — konstruktivním stačí upřímná komunikace, eskalačním potřebujeme senior management engagement, tichým musíme proaktivně volat.

**Metodologie:**

Crisis response profiling: 1) Identifikace krizových událostí z ticketů a eskalací, 2) Analýza klientovy reakce: čas do odpovědi, tón (sentiment NLP), kanál (email/telefon/právník), eskalační level, 3) Klasifikace: Konstruktivní / Eskalační / Tichý / Popírající, 4) Confidence score (počet pozorovaných krizí), 5) Příprava krizového playbook per profil.

**Datové vstupy:**

- Ticketovací systém — eskalované tickety per klient, severity, resolution
- Email komunikace v krizových obdobích — sentiment NLP (VADER + custom CZ model)
- Daktela hovory — krizové hovory (keyword: 'stížnost', 'problém', 'právník')
- CRM — incident log, stížnosti, reklamace
- Výsledky krizí — resolved / escalated / lost client

**Výstupní metriky:**

- Klasifikace: Konstruktivní / Eskalační / Tichý / Popírající
- Průměrný čas do eskalace (dny od problému)
- Severity threshold (při jak velkém problému reaguje)
- Recovery rate (% krizí vyřešených spokojeně)
- Krizový playbook (doporučený protokol)

#### ✅ Dobrý stav

**Konstruktivní komunikace**

Při poslední chybě (špatně zaúčtované DPH) klient zavolal do 2h, klidně popsal problém, akceptoval omluvu a opravu. Recovery rate: 100 % — všechny krize vyřešeny spokojeně.

*Indikátory:*

- ✓ Klasifikace: Konstruktivní (5 pozorovaných krizí)
- ✓ Čas do odpovědi: 2h (konstruktivně)
- ✓ 0 eskalací na management
- ✓ Recovery rate: 100 %

*Doporučené akce:*

1. Udržovat transparentní komunikaci
2. Přiznat chyby rychle a upřímně
3. Klient oceňuje proaktivní informování o problémech
4. Dokumentovat jako best practice pro handling

#### ❌ Rizikový stav

**Eskaluje, vyhrožuje, tiše odchází**

Klient má smíšený profil: při malých problémech tiše akumuluje nespokojenost, při velkém problému okamžitě eskaluje na právníka. 2 ze 4 krizí skončily hrozbou žaloby. Předchozí klient s podobným profilem odešel bez varování.

*Indikátory:*

- ✗ Klasifikace: Eskalační-Tichý hybrid
- ✗ 2 hrozby žalobou za 3 roky
- ✗ Tiché období 3+ měsíce před eskalací
- ✗ Recovery rate: 50 % (2 ze 4 krizí)

*Nápravná opatření:*

1. Preventivně řešit i malé problémy — neakumulovat
2. Při chybě okamžitě senior partner engagement
3. Připravit právní stanovisko preventivně
4. Monitorovat ticha — 2+ týdny bez kontaktu = alarm

**Související analýzy:** 15-01, 15-02, 7-01, 10-01

---

<a id="sekce-16"></a>

## Sekce 16: Produktová inteligence

### 16-01 — Využití služeb vs. smlouva

**Zdroj:** logy

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Vysoký — retence a revenue optimalizace |
| **Status** | Produkce |

**Popis:**

Porovnání skutečného využití služeb s tím, co má klient ve smlouvě. Systém měří engagement per služba a identifikuje jak nevyužité služby (potenciál pro eduaci nebo snížení), tak přetížené služby (potenciál pro upgrade).

Nevyužité služby jsou problém — klient platí za něco, co nepoužívá, a může to vnímat jako předraženost. Proaktivní komunikace o hodnotě služeb nebo úprava balíčku zvyšuje spokojenost.

Naopak, služby s vysokým engagement jsou příležitostí pro upsell — klient zjevně hodnotu vidí.

**Metodologie:**

Engagement scoring: 1) Definice metriky využití per typ služby, 2) Měření skutečného využití z logů, 3) Porovnání se smluvním rozsahem, 4) Gap analýza, 5) Doporučení (edukace / downgrade / upsell).

**Datové vstupy:**

- Smlouvy a definice služeb
- Logy využití (přístupy, dotazy, zpracované doklady)
- Fakturace per služba
- Peer benchmark (co využívají podobní klienti)

**Výstupní metriky:**

- % využití per služba
- Celkový engagement score
- Nevyužité služby (gap)
- Přetížené služby
- Upsell příležitosti

#### ✅ Dobrý stav

**Plné využití**

Klient využívá 95 % smluvního rozsahu. Všechny služby jsou aktivně používány a klient z nich prokazatelně benefituje.

*Indikátory:*

- ✓ 95 % využití
- ✓ Všechny služby aktivní
- ✓ Klient referuje hodnotu
- ✓ Žádná nevyužitá služba

*Doporučené akce:*

1. Zvážit rozšíření o další služby
2. Dokumentovat úspěch pro případovou studii
3. Nabídnout premium tier

#### ❌ Rizikový stav

**Platí za nevyužité**

Klient využívá jen 20 % služeb. 4 z 5 služeb nebyly použity za poslední 3 měsíce. Klient pravděpodobně vnímá cenu jako nepřiměřenou.

*Indikátory:*

- ✗ 20 % využití
- ✗ 4 služby neaktivní 3+ měsíce
- ✗ Klient zmínil «drahé» 2× za kvartál
- ✗ Peer využívá 75 %

*Nápravná opatření:*

1. Naplánovat edukační schůzku
2. Představit hodnotu nevyužitých služeb
3. Zvážit úpravu balíčku
4. Prevence churnu — klient může cítit nízkou hodnotu

**Související analýzy:** 16-02, 16-03, 9-06, 12-01

---

### 16-02 — Skryté mezery

**Zdroj:** peer benchmark

| | |
|---|---|
| **Frekvence** | Kvartálně |
| **Automatizace** | 75 % automatizováno |
| **Business impact** | Vysoký — upsell a revenue growth |
| **Status** | Produkce |

**Popis:**

Identifikace služeb, které klient nevyužívá, ale jeho peer group (podobní klienti dle velikosti, oboru, struktury) ano. Tyto 'skryté mezery' představují upsell příležitosti — klient potřebuje službu, ale neví o ní nebo ji nevnímá jako potřebnou.

Peer group je definována jako klienti se stejným NACE kódem, ±30 % obratem a podobnou strukturou (FTE, pendleři, exportéři). Pro každou peer group systém vypočítá 'typický balíček služeb' a porovná ho s aktuálním balíčkem klienta.

Mezery s nejvyšší penetrací v peer group (>70 %) a vysokou spokojeností (NPS > 8) jsou prioritní pro nabídku.

**Metodologie:**

Peer benchmark gap analysis: 1) Definice peer group per klient (NACE, obrat ±30 %, FTE ±50 %), 2) Výpočet service penetration per peer group (% klientů s danou službou), 3) Identifikace gaps (klient nemá, peer >50 % má), 4) Prioritizace: penetration × satisfaction × revenue potential, 5) Generování personalizované nabídky.

**Datové vstupy:**

- Smlouvy a služby per klient — smluvní evidence v CRM
- Peer group definice — NACE z ARES, obrat z účetnictví, FTE z mezd
- Service catalog — kompletní nabídka služeb kanceláře
- Penetration data — % klientů per služba per segment
- Spokojenost per služba — NPS/CSAT pokud existuje

**Výstupní metriky:**

- Počet identifikovaných mezer per klient
- Top 3 prioritní mezery (penetration × satisfaction × revenue)
- Estimated revenue uplift per mezera
- Peer benchmark pozice (% služeb vs. peer average)
- Personalizovaná nabídka (auto-generated)

#### ✅ Dobrý stav

**Žádné nevyužité příležitosti**

Klient využívá 95 % služeb, které používá jeho peer group. Zbývající 5 % (1 služba) je irelevantní pro jeho specifický případ. Klient je plně saturovaný.

*Indikátory:*

- ✓ Peer coverage: 95 %
- ✓ 0 prioritních mezer
- ✓ Revenue upsell potenciál: minimální
- ✓ Klient nad průměrem peer group

*Doporučené akce:*

1. Focus na kvalitu stávajících služeb
2. Sledovat nové služby v katalogu — mohou vytvořit nové mezery
3. Klient může být ambasadorem pro peer group

#### ❌ Rizikový stav

**Nemá mzdové služby — peer ano**

Klient (výrobní firma, 45 zaměstnanců) nemá mzdové služby. 82 % jeho peer group mzdové služby využívá s NPS 8.4. Klient zpracovává mzdy interně — neefektivně, s chybami. Revenue potenciál: 180K/rok.

*Indikátory:*

- ✗ Gap: mzdové služby (penetration 82 %, NPS 8.4)
- ✗ Gap: controlling (penetration 65 %, NPS 7.8)
- ✗ Gap: reporting (penetration 71 %, NPS 8.1)
- ✗ Revenue potenciál: 420K/rok (všechny gaps)

*Nápravná opatření:*

1. Připravit case study z peer group — 'firma jako vaše ušetřila XY'
2. Nabídnout trial / bezplatnou analýzu mzdového procesu
3. Kvantifikovat náklady interního zpracování vs. outsourcing
4. Naplánovat prezentaci pro jednatele

**Související analýzy:** 16-01, 16-03, 16-04, 12-01

---

### 16-03 — Predikce další potřeby

**Zdroj:** collaborative filtering

| | |
|---|---|
| **Frekvence** | Měsíčně (model retrain), denně (predikce) |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Vysoký — prediktivní upsell |
| **Status** | Produkce |

**Popis:**

Collaborative filtering model predikující, jakou službu klient pravděpodobně bude potřebovat jako další. Model se učí z historických vzorců: klienti, kteří si objednali službu A a B, si typicky do 6 měsíců objednají službu C.

Implementace používá matrix factorization (SVD) na matici klient×služba, doplněnou o content-based features (obor, velikost, fáze). Model je trénován na historických akvizicích služeb s validation split na posledních 12 měsících.

Predikce jsou využívány pro timing marketingových kampaní — klientovi nabídneme službu v momentě, kdy ji s nejvyšší pravděpodobností potřebuje.

**Metodologie:**

Hybrid collaborative filtering: 1) Matrix factorization (SVD, rank=20) na matici klient×služba (binary), 2) Content-based features: NACE, obrat, FTE, stáří vztahu, 3) Temporal patterns: sequence mining (SPADE algorithm) — typické pořadí akvizice služeb, 4) Ensemble: SVD score × content score × temporal score, 5) Precision@3 validace na held-out datech.

**Datové vstupy:**

- Matice klient×služba — historická (kdo co kdy objednal) z CRM
- Klientské features — NACE (ARES), obrat (účetnictví), FTE (mzdy)
- Temporal data — datum aktivace každé služby per klient
- Service dependency graph — které služby jsou prerekvizity
- Churn data — vyloučit churned klienty z training setu

**Výstupní metriky:**

- Top 3 predikované služby per klient (s pravděpodobností)
- Precision@3 na validation setu
- Recall@3 na validation setu
- Predicted timing (kdy bude potřebovat)
- Revenue potential per predikce

#### ✅ Dobrý stav

**80 % přesnost predikce**

Model dosahuje Precision@3 = 80 % na validation setu. Pro klienta ABC predikuje: 1) Controlling (P=0.85, timing: Q2), 2) Cash flow reporting (P=0.72, timing: Q3), 3) Daňové poradenství DE (P=0.68, timing: Q4).

*Indikátory:*

- ✓ Precision@3: 80 %
- ✓ Recall@3: 65 %
- ✓ 3 konkrétní predikce s P > 0.65
- ✓ Timing predikce: Q2/Q3/Q4

*Doporučené akce:*

1. Naplánovat nabídku controllingu na Q2
2. Připravit demo cash flow reportingu na Q3
3. Informovat DE tým o predikci daňového poradenství
4. A/B test: predikce-based vs. random nabídka

#### ❌ Rizikový stav

**Model nelze natrénovat — málo dat**

Matice klient×služba je příliš řídká (sparsity 95 %) — většina klientů má jen 1–2 služby. Model konverguje na triviální predikci (predikuje vždy nejpopulárnější službu). Precision@3: 22 % (= random baseline).

*Indikátory:*

- ✗ Precision@3: 22 % (≈ random)
- ✗ Matice sparsity: 95 %
- ✗ Průměr 1.4 služby per klient
- ✗ Nedostatek variance pro SVD

*Nápravná opatření:*

1. Přepnout na rule-based doporučení (peer benchmark)
2. Sbírat více dat — explicitní preference (průzkumy)
3. Rozšířit feature set o implicitní signály (dotazy, čtení reportů)
4. Re-evaluovat za 6M s více daty

**Související analýzy:** 16-01, 16-02, 16-04, 12-01

---

### 16-04 — Doporučovací systém

**Zdroj:** «klienti jako tento»

| | |
|---|---|
| **Frekvence** | Měsíčně (recommendations refresh) |
| **Automatizace** | 80 % automatizováno |
| **Business impact** | Vysoký — konverze upsell příležitostí |
| **Status** | Produkce |

**Popis:**

Content-based + collaborative doporučovací systém generující personalizované upsell nabídky na základě profilu klienta a chování podobných klientů. Na rozdíl od predikce (16-03) se tento systém zaměřuje na 'co nabídnout TEĎ' — akční doporučení pro obchodní tým.

Systém kombinuje peer benchmark (co mají podobní) s individuálními signály (o co se klient ptal, co hledal, jaké problémy řeší) a generuje personalizovanou nabídku se zdůvodněním pro obchodníka.

Každé doporučení obsahuje: službu, důvod (proč zrovna toto), argumenty (jak prodat), timing (kdy nabídnout) a expected response (jak pravděpodobně zareaguje).

**Metodologie:**

Recommendation engine: 1) Kandidátní služby z peer benchmark gaps (16-02) + collaborative filtering (16-03), 2) Filtr: vyloučit nekompatibilní služby (prerekvizity nesplněny), 3) Ranking: combined score = 0.4×CF + 0.3×peer + 0.3×signal, 4) Enrichment: generování argumentů z knowledge base, 5) Personalizace sdělení dle psychografického profilu (15-01 rozhodovací styl).

**Datové vstupy:**

- Výstupy z 16-02 (peer gaps) a 16-03 (CF predikce)
- Signály zájmu — search queries v portálu, dotazy v emailu (NLP)
- Psychografický profil z 15-01 (rozhodovací styl)
- Service catalog s prerekvizitami a pricing
- Historická success rate per služba per segment

**Výstupní metriky:**

- Top 3 doporučení per klient (služba + score + argumenty)
- Expected conversion rate per doporučení
- Expected revenue per doporučení
- Timing doporučení (optimal moment)
- A/B test results (recommendation vs. random)

#### ✅ Dobrý stav

**3 relevantní upsell příležitosti**

Pro klienta XYZ systém doporučuje: 1) Mzdové služby (score 0.91, revenue 180K/rok, klient se 2× ptal na mzdy), 2) Controlling (score 0.78, revenue 120K/rok, peer 80 % má), 3) DPH poradenství DE (score 0.72, revenue 90K/rok, expanduje do DE).

*Indikátory:*

- ✓ 3 doporučení s score > 0.70
- ✓ Celkový revenue potenciál: 390K/rok
- ✓ Expected conversion: 45 % (historical similar)
- ✓ Všechna doporučení mají explicitní klientský signál

*Doporučené akce:*

1. Obchodník kontaktuje klienta — nabídka mzdových služeb
2. Připravit kalkulaci: interní mzdy vs. outsourcing
3. Naplánovat controlling demo za měsíc (second offer)
4. DE poradenství nabídnout při příští DE konzultaci

#### ❌ Rizikový stav

**Klient max. saturovaný**

Klient využívá 100 % služeb v katalogu relevantních pro jeho segment. Žádné doporučení s score > 0.3. Klient je plně saturovaný — upsell prostor vyčerpán.

*Indikátory:*

- ✗ 0 doporučení s score > 0.3
- ✗ Klient má 12/12 relevantních služeb
- ✗ Revenue per klient: 680K/rok (max. pro segment)
- ✗ Cross-sell do jiného segmentu: nerelevantní

*Nápravná opatření:*

1. Focus na retenci — nezdražovat, nesaturovat
2. Zvážit premium tier s vyšší hodnotou (ne více služeb, ale lepší)
3. Klient jako kandidát na advisory board / beta testing
4. Monitorovat nové služby v katalogu — mohou vytvořit prostor

**Související analýzy:** 16-01, 16-02, 16-03, 15-01

---

<a id="sekce-17"></a>

## Sekce 17: Behaviorální mikrosignály

### 17-01 — Kdy otevírá maily

**Zdroj:** email tracking

| | |
|---|---|
| **Frekvence** | Per email (automaticky) |
| **Automatizace** | 98 % automatizováno |
| **Business impact** | Střední — doplňkový signál pro churn prediction |
| **Status** | Produkce |

**Popis:**

Tracking otevírání emailů měří engagement klienta s naší komunikací. Čas otevření, frekvence a zařízení poskytují cenné informace o prioritě, kterou nám klient přikládá.

Email otevřený do 2 hodin v pracovní době signalizuje, že jsme pro klienta priorita. Email neotevřený 48+ hodin signalizuje nezájem nebo přetížení. Trend je klíčový — zpomalení reakcí je pre-churn signál.

Data jsou anonymizována a slouží výhradně pro zlepšení služby klientovi.

**Metodologie:**

Pixel tracking + link tracking: 1) Zaznamenání open timestamp, 2) Detekce zařízení a lokace, 3) Agregace per klient, 4) Trend analýza, 5) Korelace s churn modelem.

**Datové vstupy:**

- Email tracking data (open/click)
- Metadata emailů (předmět, typ, urgence)
- Baseline per klient
- Kalendář (pracovní dny/svátky)

**Výstupní metriky:**

- Průměrný čas do otevření
- Open rate per typ emailu
- Trend (zrychluje/zpomaluje)
- Zařízení a čas otevření

#### ✅ Dobrý stav

**Engagovaný klient**

Klient otevírá emaily průměrně do 2 hodin v pracovní době. Open rate 95 %. Aktivně kliká na přílohy a odpovídá do 24 hodin.

*Indikátory:*

- ✓ Průměr 2h do otevření
- ✓ Open rate 95 %
- ✓ Přílohy otevřeny do 4h
- ✓ Stabilní trend

*Doporučené akce:*

1. Udržovat kvalitu emailové komunikace
2. Klient je vhodný pro digitální kanály
3. Zvážit rozšíření reportingu emailem

#### ❌ Rizikový stav

**Ignorovaná komunikace**

Klient přestal otevírat emaily. Open rate klesl z 90 % na 15 % za 2 měsíce. Poslední 3 emaily neotevřeny vůbec.

*Indikátory:*

- ✗ Open rate 15 % (z 90 %)
- ✗ 3 neotevřené emaily v řadě
- ✗ 0 kliků na přílohy za měsíc
- ✗ Trend dramaticky klesající

*Nápravná opatření:*

1. Přepnout na telefonní kontakt
2. Ověřit, zda emaily nejdou do spamu
3. Osobní schůzka — klient se zjevně odpojuje
4. Eskalovat do retention workflow

**Související analýzy:** 17-02, 17-03, 7-04, 10-01

---

### 17-02 — Kolikrát přečte nabídku

**Zdroj:** open counts

| | |
|---|---|
| **Frekvence** | Per email (real-time webhook) |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Střední — optimalizace obchodního procesu |
| **Status** | Produkce |

**Popis:**

Měření počtu otevření specifických emailů — zejména nabídek, cenových kalkulací a důležitých dokumentů. Vysoký počet otevření signalizuje zájem a rozhodovací proces, nulový počet signalizuje spam filtr nebo ignoraci.

Systém využívá tracking pixel (1x1 transparentní obrázek) a UTM parametrizované linky v emailech odesílaných přes SendGrid/Mailgun. Každé otevření je zaznamenáno s timestampem, IP adresou a user-agentem.

Vícenásobné otevření nabídky (3+) často předchází akceptaci — klient se vrací a studuje detaily. Jednorázové otevření bez odpovědi signalizuje 'viděl, nezajímá'.

**Metodologie:**

Email engagement analytics: 1) SendGrid/Mailgun webhook events (open, click, bounce), 2) Agregace open count per email per klient, 3) Time-between-opens analýza (urgence), 4) Korelace open count × conversion (nabídka přijata/odmítnuta), 5) Classification: High interest (3+ opens), Moderate (1-2), None (0), Bounce (technical issue).

**Datové vstupy:**

- SendGrid Event Webhook — event_type: 'open', timestamp, useragent, ip
- Mailgun Events API — GET /v3/{domain}/events?event=opened
- Interní email log — subject, recipient, email_type (nabídka/report/info)
- CRM — nabídky a jejich status (pending/accepted/rejected)
- Anti-spam check — SPF, DKIM, DMARC records per klientská doména

**Výstupní metriky:**

- Open count per email per klient
- Time-to-first-open (hodiny od odeslání)
- Re-open pattern (kolikrát se vrátil)
- Korelace opens → conversion (per email type)
- Bounce/spam rate per klientská doména

#### ✅ Dobrý stav

**3× přečteno + odpověď**

Nabídka na rozšíření služeb otevřena 3× v průběhu 2 dní: 1× ihned (mobil, 15:22), 1× další den (desktop, 9:30), 1× před odpovědí (desktop, 14:15). Klient odpověděl: 'Pojďme to probrat.'

*Indikátory:*

- ✓ 3 opens (mobil → desktop → desktop before reply)
- ✓ Time-to-first-open: 2h
- ✓ 2-day decision cycle (matches 15-01 profil)
- ✓ Response: pozitivní, žádá schůzku

*Doporučené akce:*

1. Naplánovat schůzku do 48h — klient je v rozhodovací fázi
2. Připravit detailní kalkulaci — klient studoval detaily
3. Nezasílat reminder — klient je engagovaný

#### ❌ Rizikový stav

**0 otevření — spam filtr nebo nezájem**

Poslední 4 nabídkové emaily mají 0 opens. Technická kontrola: SPF/DKIM OK, doména není na blacklistu. Závěr: klient buď ignoruje, nebo má agresivní firemní spam filtr.

*Indikátory:*

- ✗ 0 opens na posledních 4 emailech
- ✗ SPF/DKIM/DMARC: PASS (ne technický problém)
- ✗ Historický open rate: 85 % → 0 % (dramatický propad)
- ✗ Žádná odpověď na 2 follow-up emaily

*Nápravná opatření:*

1. Přepnout kanál — telefon (Daktela) nebo poštovní zásilka
2. Ověřit u klienta, zda emaily dostává
3. Zkontrolovat, zda klientská IT nezavedla nový spam filtr
4. Eskalovat na retention — 0 engagement = pre-churn signál

**Související analýzy:** 17-01, 17-03, 17-04, 22-03

---

### 17-03 — Otevírá přílohy

**Zdroj:** engagement

| | |
|---|---|
| **Frekvence** | Per dokument (real-time), měsíční agregace |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Střední — validace hodnoty služeb pro klienta |
| **Status** | Produkce |

**Popis:**

Tracking otevírání příloh — reportů, analýz, dokumentů — měří, zda klient skutečně konzumuje obsah, který mu posíláme. Příloha otevřená a prostudovaná = klient vnímá hodnotu. Příloha ignorovaná = buď špatný formát, špatný timing, nebo klient nevidí hodnotu.

Systém měří engagement s přílohami dvěma způsoby: 1) Link tracking — přílohy jsou sdíleny jako trackované linky (ne inline attachments), 2) Portálové logy — dokumenty nahrané na klientský portál mají view tracking.

Klíčový insight: pokud klient neotevírá měsíční reporty 3+ měsíce, reporty nemají pro něj hodnotu — je třeba změnit formát, obsah nebo frekvenci.

**Metodologie:**

Attachment engagement scoring: 1) Link click tracking z SendGrid/Mailgun (click events), 2) Portálové view logy (klientský portál — session tracking), 3) Download tracking (pokud PDF), 4) Time-on-page proxy (link → next action timestamp), 5) Engagement score per dokument type: % opened, avg time-to-open, trend.

**Datové vstupy:**

- SendGrid/Mailgun click events — URL kliknuté v emailu (přílohy jako linky)
- Klientský portál — view/download logy (user_id, document_id, timestamp)
- Dokument metadata — typ (report, analýza, faktura, smlouva), stáří, autor
- Historical engagement per klient per document type
- Email delivery confirmation — vyloučení bounce/spam

**Výstupní metriky:**

- Attachment open rate per klient per document type
- Time-to-first-open per document type
- Trend engagement (3M/6M/12M)
- Most/least engaged document types
- Engagement score (composite: 0–100)

#### ✅ Dobrý stav

**Reporty otevřeny do 24h**

Klient otevírá měsíční reporty průměrně do 6h od odeslání. Kvartální analýzy do 24h. Dokonce si stahuje PDF verze — pravděpodobně je tiskne nebo sdílí s management teamem.

*Indikátory:*

- ✓ Attachment open rate: 95 %
- ✓ Time-to-first-open: 6h (reporty), 24h (analýzy)
- ✓ PDF download: 80 % dokumentů
- ✓ Trend: stabilní 12M

*Doporučené akce:*

1. Udržovat kvalitu reportů — klient je čte
2. Zvážit rozšíření obsahu (detailnější analýzy)
3. Nabídnout interaktivní dashboard místo PDF
4. Klient je vhodný pro premium reporting službu

#### ❌ Rizikový stav

**0 % otevřených příloh za kvartál**

Za poslední 3 měsíce klient neotevřel jedinou přílohu (12 reportů, 3 analýzy, 2 nabídky). Historicky otevíral 70 %. Dramatický propad engagement — buď nevidí hodnotu, nebo se odpojuje.

*Indikátory:*

- ✗ 0 % open rate za 3M (historicky 70 %)
- ✗ 17 neotevřených dokumentů
- ✗ Email open rate: 40 % (čte emaily, ne přílohy)
- ✗ Žádný portálový login za 3M

*Nápravná opatření:*

1. Osobní schůzka — zeptat se, co by klient chtěl dostávat
2. Redukovat objem — posílat méně, ale relevantnější
3. Změnit formát — zkusit video summary místo PDF
4. Eskalovat — 0 engagement = strong pre-churn signál

**Související analýzy:** 17-01, 17-02, 23-40, 10-01

---

### 17-04 — Zařízení a čas

**Zdroj:** user-agent

| | |
|---|---|
| **Frekvence** | Per interakce (real-time), týdenní profil update |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Nízký–Střední — optimalizace komunikačního kanálu a timingu |
| **Status** | Produkce |

**Popis:**

Analýza zařízení a času otevírání emailů a přístupu na portál. User-agent string identifikuje zařízení (desktop/mobil/tablet), operační systém a prohlížeč. V kombinaci s časem otevření vytváří profil pracovních návyků klienta.

Klient, který čte emaily na desktopu v kanceláři (9–17h), je v klidném rozhodovacím režimu. Klient na iPhonu ve 23:00 rozhoduje pod stresem nebo ze špatného svědomí. Klient, který čte vše na mobilu, potřebuje mobile-first komunikaci.

Systém parsuje user-agent stringy z SendGrid/Mailgun open events a webového portálu a vytváří profil device×time per klient.

**Metodologie:**

User-agent + temporal analysis: 1) Parsování UA string (ua-parser-js): device type, OS, browser, 2) Temporal binning: working hours (9-17 CZ, 8-16 DE), evening (17-22), night (22-6), weekend, 3) Heatmap device × time per klient, 4) Anomaly detection: změna vzorce (z desktop na mobil, z denního na noční), 5) Profilování: Office worker / Mobile decision-maker / Night owl / Weekend warrior.

**Datové vstupy:**

- SendGrid/Mailgun open events — user-agent header, timestamp, IP (geoloc)
- Klientský portál — session logs (user-agent, login time, duration)
- IP geolocation — GeoIP2 database (MaxMind) pro lokaci
- Klientský timezone (CZ/DE) z CRM profilu
- Historické vzorce (baseline per klient)

**Výstupní metriky:**

- Device split: desktop % / mobile % / tablet %
- Time split: office hours % / evening % / night % / weekend %
- Profil: Office worker / Mobile / Night owl / Weekend warrior
- Anomálie: změna vzorce (shift detection)
- Optimal send time per klient (max engagement window)

#### ✅ Dobrý stav

**Desktop v kanceláři**

Klient 90 % komunikace řeší na desktopu v pracovní době (9–17h). Stabilní vzorec 2+ roky. Rozhodnutí dělá v kancelářském prostředí — klidně, s přístupem k dokumentům.

*Indikátory:*

- ✓ Desktop: 90 %, Mobile: 8 %, Tablet: 2 %
- ✓ Office hours: 85 %, Evening: 10 %, Night: 3 %, Weekend: 2 %
- ✓ Profil: Office worker (stable 2+ let)
- ✓ 0 anomálií za 12M

*Doporučené akce:*

1. Posílat emaily v 9:00–10:00 (optimal window)
2. Formát: desktop-optimized (tabulky, grafy, přílohy)
3. Plánovat hovory v office hours
4. Klient nepotřebuje mobilní app/portal

#### ❌ Rizikový stav

**iPhone 23:00 — rozhoduje pod stresem**

Klient posledních 6 týdnů čte emaily výhradně na iPhonu po 22:00. Dříve: desktop, office hours. Shift detekován automaticky. Možné příčiny: osobní krize, workoholismus, vyhazov z kanceláře.

*Indikátory:*

- ✗ Shift: Desktop 90% → iPhone 95% za 6 týdnů
- ✗ Shift: Office hours 85% → Night 75%
- ✗ Anomaly score: 4.2 (alarm > 3.0)
- ✗ Odpovídá v 23:30 — stresová rozhodnutí

*Nápravná opatření:*

1. Neodesílat důležité nabídky večer — klient je pod stresem
2. Proaktivně se zeptat: 'Je vše v pořádku?'
3. Nabídnout schůzku v kanceláři (vrátit do klidného prostředí)
4. Monitorovat — pokud pokračuje, eskalovat na well-being check

**Související analýzy:** 17-01, 17-02, 22-03, 23-54

---

### 17-05 — Kdo zpracovává maily

**Zdroj:** podpisy + styl

| | |
|---|---|
| **Frekvence** | Per email (real-time analysis), měsíční profil update |
| **Automatizace** | 75 % automatizováno |
| **Business impact** | Střední — zajištění efektivní komunikace s rozhodovately |
| **Status** | Produkce |

**Popis:**

Detekce, kdo skutečně zpracovává komunikaci na straně klienta — jednatel osobně, asistentka, účetní, nebo AI tool. Systém analyzuje email podpisy, stylometrii (délka vět, slovní zásoba, formálnost) a metadata (From vs. Reply-To, X-Mailer header).

Pokud jednatel delegoval komunikaci na asistentku, naše zprávy se k němu nemusí dostat v plném rozsahu. Strategická komunikace musí být adresována přímo jednateli.

Systém detekuje i změnu — pokud jednatel přestal odpovídat osobně a odpovídá za něj někdo jiný, je to signál změny priorit.

**Metodologie:**

Authorship analysis: 1) Email signature parsing (regexp: /pozdravem|regards|sent from/i), 2) Stylometry: sentence length distribution, vocabulary richness (TTR), formality score, 3) Metadata: From header vs. Reply-To header discrepancy, X-Mailer/User-Agent, 4) Clustering emailů per autor (unsupervised), 5) Change detection — shift v autorství.

**Datové vstupy:**

- Email headers — From, Reply-To, X-Mailer, X-Originating-IP
- Email body — podpis, styl textu, oslovení
- CRM kontaktní databáze — kdo je jednatel, asistentka, účetní
- Historické emaily per kontakt — baseline stylometrie
- Daktela hovory — kdo volá vs. kdo píše

**Výstupní metriky:**

- Detekovaný autor per email (confidence score)
- % komunikace jednatele vs. delegované
- Autorský profil change detection (shift?)
- Delegace trend (roste/klesá)
- Komunikační dosah (dostane jednatel naše zprávy?)

#### ✅ Dobrý stav

**Jednatel osobně**

95 % emailů odpovídá stylometricky jednateli. Podpisy konzistentní, styl formální ale osobní. Jednatel čte a odpovídá osobně — naše komunikace má přímý dopad na rozhodování.

*Indikátory:*

- ✓ 95 % emailů: autorství jednatel (confidence > 0.9)
- ✓ Stylometrie: konzistentní 18M
- ✓ From = Reply-To (žádné delegování)
- ✓ Odpovídá na strategické i operativní emaily

*Doporučené akce:*

1. Komunikovat přímo s jednatelem — funguje
2. Přizpůsobit obsah: jednatel chce stručně a k věci
3. Využít přímý přístup pro strategické nabídky

#### ❌ Rizikový stav

**Asistentka — jednatel se nezajímá**

Posledních 4 měsíce odpovídá jiný autor — kratší věty, jiná slovní zásoba, podpis 'S pozdravem, Jana (za p. Nováka)'. Jednatel delegoval veškerou komunikaci. Naše strategické nabídky se k němu pravděpodobně nedostávají.

*Indikátory:*

- ✗ Shift autorství: jednatel 95% → 15% za 4M
- ✗ Nový autor: 'Jana' (asistentka, confidence 0.88)
- ✗ Strategické emaily odpovězeny genericky
- ✗ Jednatel neodpověděl na přímý email 2×

*Nápravná opatření:*

1. Kontaktovat jednatele přímo — telefon, ne email
2. Osobní schůzka — 'chtěli bychom probrat strategii s vámi'
3. Přizpůsobit komunikaci pro asistentku (operativa) + jednatele (strategie)
4. Zvážit: delegování = klient ztrácí zájem?

**Související analýzy:** 17-01, 17-04, 18-01, 18-03

---

<a id="sekce-18"></a>

## Sekce 18: Organizační inteligence klienta

### 18-01 — Fluktuace v týmu

**Zdroj:** změny kontaktů

| | |
|---|---|
| **Frekvence** | Průběžně (per změna) |
| **Automatizace** | 75 % automatizováno |
| **Business impact** | Střední — dopad na efektivitu spolupráce |
| **Status** | Produkce |

**Popis:**

Monitoring změn kontaktních osob na straně klienta je důležitým indikátorem organizační stability. Vysoká fluktuace kontaktů signalizuje interní problémy — restrukturalizace, špatné pracovní podmínky nebo nespokojenost.

Každá změna kontaktní osoby vyžaduje re-onboarding, který stojí čas i peníze. Systém sleduje počet změn, důvody a dopad na kvalitu spolupráce.

Klíčovým signálem je korelace fluktuace kontaktů se sentimentem a platební morálkou — pokud se zároveň zhoršuje komunikace a platby, je to silný signál problémů.

**Metodologie:**

Change detection: 1) Monitoring kontaktních osob v CRM, 2) Detekce změny (email, telefon, podpis), 3) Korelace s dalšími metrikami, 4) Kvantifikace re-onboarding nákladů.

**Datové vstupy:**

- CRM kontakty per klient
- Email podpisy a adresy
- Záznamy z hovorů (kdo volá)
- Historické kontakty

**Výstupní metriky:**

- Počet změn kontaktů za 12 měsíců
- Průměrná délka kontaktu
- Korelace se sentimentem
- Re-onboarding náklady

#### ✅ Dobrý stav

**Stabilní tým**

Kontaktní osoby jsou stabilní 3+ roky. Účetní a jednatel se nemění — spolupráce je efektivní a znalost kontextu je vysoká.

*Indikátory:*

- ✓ 0 změn za 12 měsíců
- ✓ Průměrná délka kontaktu 3.5 roku
- ✓ Pozitivní sentiment
- ✓ Efektivní komunikace

*Doporučené akce:*

1. Udržovat personální vztahy
2. Investovat do osobní komunikace
3. Nabídnout advanced služby — tým je připraven

#### ❌ Rizikový stav

**Vysoká fluktuace**

4. kontaktní osoba za rok. Každá změna znamená re-onboarding a ztrátu kontextu. Kvalita spolupráce klesá, chyby přibývají.

*Indikátory:*

- ✗ 4 změny za 12 měsíců
- ✗ Průměrná délka kontaktu 3 měsíce
- ✗ Sentiment klesající
- ✗ Re-onboarding náklady 40h/rok

*Nápravná opatření:*

1. Zjistit příčinu fluktuace (exit interview)
2. Vytvořit standardizovaný onboarding
3. Dokumentovat vše písemně (ne ústně)
4. Zvážit eskalaci na jednatele

**Související analýzy:** 18-02, 18-03, 7-01, 13-01

---

### 18-02 — Interní konflikty

**Zdroj:** tón osob

| | |
|---|---|
| **Frekvence** | Per komunikace (real-time NLI), týdenní agregace |
| **Automatizace** | 65 % automatizováno |
| **Business impact** | Střední — prevence chyb z rozporných instrukcí |
| **Status** | Produkce |

**Popis:**

Detekce interních konfliktů u klienta na základě rozporné komunikace od různých kontaktních osob. Pokud spolumajitel říká 'investujte' a účetní říká 'šetřete', existuje interní konflikt, který ovlivňuje naši práci.

Systém porovnává sentiment, instrukce a priority od různých kontaktních osob stejného klienta. Rozpory jsou detekovány NLP modelem trénovaným na contradiction detection (NLI — Natural Language Inference).

Pro účetní kancelář je klíčové nestat se rukojmím interního konfliktu — systém doporučuje eskalaci na jednu autoritativní kontaktní osobu.

**Metodologie:**

Multi-source contradiction detection: 1) Segmentace komunikace per kontaktní osoba per klient, 2) NLI model (Natural Language Inference) na párech instrukcí od různých osob, 3) Sentiment comparison per osoba per téma, 4) Priority conflict detection (osoba A: urgentní, osoba B: neprioritní), 5) Alert při detekci rozporu (confidence > 0.8).

**Datové vstupy:**

- Email komunikace segmentovaná per kontaktní osoba (From header parsing)
- Daktela hovory — transcription per volající (caller_id → CRM kontakt)
- CRM kontakty — role per osoba (jednatel, spolumajitel, účetní, asistentka)
- Tickety a požadavky — kdo zadal, jaká priorita, jaký obsah
- DocuWare podpisy — kdo podepisuje jaké dokumenty

**Výstupní metriky:**

- Počet detekovaných rozporů per klient per měsíc
- Konfliktní osoby (kdo vs. kdo)
- Témata konfliktu (investice, úspory, strategie, operativa)
- Severity konfliktu (nízký/střední/vysoký)
- Doporučení: kdo je autoritativní kontakt

#### ✅ Dobrý stav

**Konzistentní komunikace**

Všechny kontaktní osoby klienta komunikují konzistentně. Jednatel definuje strategii, účetní realizuje operativu — žádné rozpory. NLI model: 0 kontradikčních párů za 12M.

*Indikátory:*

- ✓ 0 detekovaných rozporů za 12M
- ✓ Sentiment alignment: 95 % mezi osobami
- ✓ Jasná hierarchie: jednatel → účetní → asistentka
- ✓ Konzistentní instrukce a priority

*Doporučené akce:*

1. Udržovat komunikaci se všemi kontakty
2. Pokračovat v monitoringu — konflikty mohou vzniknout nečekaně
3. Dokumentovat distribuci komunikace per role

#### ❌ Rizikový stav

**Spolumajitel vs. účetní — protichůdné instrukce**

Spolumajitel A posílá email: 'Investujte do nového stroje, potřebujeme úvěr.' Spolumajitel B volá tentýž den: 'Šetřete, žádné investice.' Účetní píše: 'Nevím, co mám dělat.' 4 kontradikce za 3 měsíce — interní konflikt eskaluje.

*Indikátory:*

- ✗ 4 kontradikce za 3M (NLI confidence > 0.85)
- ✗ Konflikt: spolumajitel A vs. spolumajitel B
- ✗ Témata: investice, cash management, strategie
- ✗ Účetní (třetí strana) zmatená — chybovost roste

*Nápravná opatření:*

1. Svolat společnou schůzku se všemi spolumajiteli
2. Požadovat jednu autoritativní kontaktní osobu pro rozhodnutí
3. Dokumentovat všechny instrukce písemně (ochrana kanceláře)
4. Nezasahovat do konfliktu — zůstat neutrální

**Související analýzy:** 18-01, 18-03, 15-04, 7-01

---

### 18-03 — Formální vs. reálná hierarchie

**Zdroj:** kdo schvaluje

| | |
|---|---|
| **Frekvence** | Kvartálně (full analysis), průběžně (podpisový monitoring) |
| **Automatizace** | 60 % automatizováno |
| **Business impact** | Vysoký — compliance a právní riziko |
| **Status** | Produkce |

**Popis:**

Mapování skutečné rozhodovací hierarchie klienta versus formální struktury z OR. Systém identifikuje, kdo skutečně rozhoduje (de facto), oproti tomu, kdo je formálně oprávněn (de jure).

Pokud jednatel pouze podepisuje dokumenty, ale nerozumí jim (rozhoduje někdo jiný), vzniká riziko — podpis bez porozumění je právně problematický. Systém detekuje tyto situace z komunikačních vzorců.

Analýza je klíčová pro compliance — kancelář musí komunikovat s osobou, která skutečně rozhoduje, a zároveň zajistit, že formální podpis odpovídá skutečnému souhlasu.

**Metodologie:**

Decision authority mapping: 1) OR analýza — formální struktura (ARES API statutární orgán), 2) Komunikační analýza — kdo odpovídá na rozhodovací otázky (email content analysis), 3) Podpisová analýza — kdo podepisuje dokumenty (DocuWare metadata, DocuSign audit trail), 4) Schvalovací workflow — kdo schvaluje faktury, smlouvy, daňové přiznání (ERP approval logs), 5) Gap analysis: formální vs. reálný rozhodovatel.

**Datové vstupy:**

- ARES API — statutární orgán, jednatel, prokurista, společníci
- DocuWare — podpisy na dokumentech (metadata: signer_name, timestamp)
- Email komunikace — kdo odpovídá na rozhodovací otázky (keyword: 'souhlasím', 'schvaluji', 'potvrzuji')
- ERP approval logs — kdo schvaluje faktury v systému
- Daktela hovory — kdo volá při rozhodovacích záležitostech

**Výstupní metriky:**

- Formální hierarchie (OR): jednatel → prokurista → ...
- Reálná hierarchie (detekovaná): kdo skutečně rozhoduje
- Gap score: 0 (shodná) až 100 (zcela odlišná)
- Risk score: podpis bez porozumění (0–100)
- Doporučení: s kým komunikovat per typ rozhodnutí

#### ✅ Dobrý stav

**Jednatel = rozhodovatel**

Formální a reálná hierarchie se shodují. Jednatel odpovídá na strategické i operativní otázky, podepisuje dokumenty, schvaluje faktury. Gap score: 0.

*Indikátory:*

- ✓ Gap score: 0 (formální = reálná hierarchie)
- ✓ Jednatel: 90 % rozhodovacích emailů, 100 % podpisů
- ✓ Risk score: 5/100 (minimální)
- ✓ Konzistentní 2+ roky

*Doporučené akce:*

1. Komunikovat přímo s jednatelem
2. Jednoduchý schvalovací proces — 1 osoba rozhoduje
3. Udržovat vztah s jednatelem jako primárním kontaktem

#### ❌ Rizikový stav

**Jednatel podepíše ale nerozumí — riziko**

Jednatel podepisuje vše do 5 minut od odeslání — bez dotazů, bez studia. Všechny obsahové dotazy odpovídá účetní nebo manželka (není v OR). Gap score: 75. Jednatel je 'rubber stamp' — de facto rozhoduje někdo jiný.

*Indikátory:*

- ✗ Gap score: 75 (vysoký rozpor)
- ✗ Jednatel: podpis za < 5 min (0 dotazů)
- ✗ Reálný rozhodovatel: manželka (0 formální role)
- ✗ Risk score: 82/100 (podpis bez porozumění)

*Nápravná opatření:*

1. Diskrétně ověřit: rozumí jednatel tomu, co podepisuje?
2. Navrhnout konzultační schůzku PŘED podpisem
3. Dokumentovat kdo dává instrukce (ochrana kanceláře)
4. Zvážit formalizaci role manželky (prokura, plná moc)

**Související analýzy:** 18-01, 18-02, 18-04, 15-01

---

### 18-04 — Podpisové vzory

**Zdroj:** reorganizace

| | |
|---|---|
| **Frekvence** | Měsíčně (OR check), per dokument (podpisová verifikace) |
| **Automatizace** | 70 % automatizováno |
| **Business impact** | Vysoký — právní validita dokumentů |
| **Status** | Produkce |

**Popis:**

Monitoring změn v podpisových vzorech klientské firmy — kdo podepisuje, jak se podpisy mění v čase, a co změny signalizují. Častá změna podpisového práva indikuje organizační nestabilitu (výměna vedení, konflikty, restrukturalizace).

Systém extrahuje podpisové vzory z DocuWare (skenované dokumenty s OCR), digitálních podpisů (DocuSign/SignPoint) a OR zápisů. Změny jsou korelovány s událostmi v OR (změna jednatele, prokury).

Pro pendlerskou klientelu je zvláště důležité sledovat podpisové právo pro formuláře A1, ELSTER přiznání a bilaterální dokumenty.

**Metodologie:**

Signature pattern monitoring: 1) Extrakce podpisů z DocuWare (OCR + signature detection ML model), 2) Digitální podpisy — DocuSign/SignPoint audit trail (signer identity, certificate), 3) OR monitoring — ARES API + justice.cz sbírka listin (změny jednatele, prokury), 4) Change detection: nový podpisující, chybějící podpisující, neautorizovaný podpisující, 5) Timeline vizualizace podpisových změn.

**Datové vstupy:**

- DocuWare — skenované dokumenty s podpisy (OCR + signature region detection)
- DocuSign/SignPoint audit trail — digitální podpisy (signer, certificate, timestamp)
- ARES API — aktuální statutární orgán (GET /ares/v1/ekonomicke-subjekty/{ico})
- Justice.cz sbírka listin — zápisy změn v OR (notářské zápisy)
- CRM — autorizované podpisové vzory per klient (manuálně spravované)

**Výstupní metriky:**

- Počet změn podpisového práva per klient per rok
- Aktuální autorizovaní podpisující vs. OR
- Neautorizované podpisy (detekované, ale ne v OR)
- Stabilita score (0=chaotické, 100=stabilní)
- Korelace změn s OR událostmi

#### ✅ Dobrý stav

**Stabilní podpisy**

Podpisový vzor stabilní 3+ roky. Jednatel a prokurista podepisují konzistentně. Vše odpovídá OR zápisu. Žádné neautorizované podpisy.

*Indikátory:*

- ✓ 0 změn podpisového práva za 36M
- ✓ 2 autorizovaní podpisující (jednatel + prokurista)
- ✓ 100 % shoda s OR zápisem
- ✓ Stabilita score: 98/100

*Doporučené akce:*

1. Udržovat aktuální podpisové vzory v CRM
2. Kvartální verifikace proti OR
3. Pokračovat v monitoringu

#### ❌ Rizikový stav

**3 změny podpisu za rok — nestabilita**

3 změny jednatele za 12 měsíců. Aktuální jednatel není v některých dokumentech uveden — podpisuje předchozí jednatel (neautorizovaný). Sbírka listin na justice.cz ukazuje sporné notářské zápisy.

*Indikátory:*

- ✗ 3 změny jednatele za 12M
- ✗ 2 neautorizované podpisy detekované
- ✗ OR zápis: poslední změna 15.3.2026
- ✗ Stabilita score: 12/100

*Nápravná opatření:*

1. Ověřit aktuální stav v OR (stáhnout výpis)
2. Odmítnout dokumenty s neautorizovaným podpisem
3. Konzultovat právní oddělení — platnost podepsaných dokumentů
4. Zvýšit monitoring — týdenní check OR pro tohoto klienta

**Související analýzy:** 18-01, 18-03, 19-01, 13-06

---

<a id="sekce-19"></a>

## Sekce 19: Externí signály

### 19-01 — ARES + VIES

**Zdroj:** API

| | |
|---|---|
| **Frekvence** | Denně |
| **Automatizace** | 98 % automatizováno |
| **Business impact** | Vysoký — ochrana před podvody a ručením |
| **Status** | Produkce |

**Popis:**

Automatická validace obchodních partnerů klientů proti registrům ARES (Administrativní registr ekonomických subjektů) a VIES (VAT Information Exchange System). Systém průběžně ověřuje platnost IČO, DIČ, sídlo a stav registrace.

Detekce neplatných nebo zrušených subjektů chrání klienty před obchodováním s fiktivními firmami, nespolehlivými plátci DPH a subjekty v insolvenci.

Systém kontroluje i změny — pokud se partner přestěhuje, změní právní formu nebo je zrušen, okamžitě informuje.

**Metodologie:**

API monitoring: 1) Denní kontrola IČO proti ARES, 2) Denní kontrola DIČ proti VIES, 3) Cross-reference se seznamem nespolehlivých plátců, 4) Alert při změně nebo zrušení, 5) Historický audit trail kontrol.

**Datové vstupy:**

- IČO a DIČ obchodních partnerů klientů
- ARES REST API
- VIES SOAP API
- Seznam nespolehlivých plátců DPH (MF ČR)
- Insolvenční rejstřík

**Výstupní metriky:**

- Počet ověřených subjektů
- Počet neplatných / zrušených
- Počet nespolehlivých plátců
- Změny oproti poslednímu ověření

#### ✅ Dobrý stav

**Všichni partneři validní**

Všechna IČO a DIČ jsou platná, všichni partneři jsou spolehliví plátci DPH a žádný není v insolvenci.

*Indikátory:*

- ✓ 100 % validních subjektů
- ✓ 0 nespolehlivých plátců
- ✓ 0 insolvencí
- ✓ Žádné změny za měsíc

*Doporučené akce:*

1. Pokračovat v denním monitoringu
2. Archivovat výsledky pro audit trail

#### ❌ Rizikový stav

**Detekován problematický subjekt**

Dodavatel s IČO 12345678 byl zrušen v ARES. Klient s ním má aktivní smlouvu a nezaplacené faktury v hodnotě 340 000 Kč. Riziko ztráty a ručení za DPH.

*Indikátory:*

- ✗ 1 zrušený subjekt v ARES
- ✗ Aktivní smlouva s klientem
- ✗ Nezaplacené faktury 340 000 Kč
- ✗ Subjekt na seznamu nespolehlivých plátců

*Nápravná opatření:*

1. Okamžitě informovat klienta
2. Pozastavit platby dodavateli
3. Konzultovat právní oddělení
4. Přihlásit pohledávku do insolvence

**Související analýzy:** 19-02, 19-08, 10-03, 6-01

---

### 19-02 — Insolvenční rejstřík

**Zdroj:** justice.cz

| | |
|---|---|
| **Frekvence** | Denně (automatický scan) |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Kritický — ochrana pohledávek a compliance |
| **Status** | Produkce |

**Popis:**

Denní monitoring insolvenčního rejstříku (ISIR) na justice.cz pro všechna IČO v klientském portfoliu — jak klientů samotných, tak jejich klíčových obchodních partnerů. Systém detekuje nové insolvenční návrhy, zahájení řízení, rozhodnutí o úpadku a oddlužení.

Včasná detekce insolvence partnera klienta umožňuje přihlásit pohledávky ve lhůtě. Detekce vlastní insolvence klienta vyžaduje okamžitou reakci — úpravu fakturace, přihlášku pohledávek a právní konzultaci.

Systém monitoruje ISIR API a parsuje XML odpovědi s novými událostmi per IČO.

**Metodologie:**

ISIR monitoring: 1) Denní dotaz na ISIR API — GET https://isir.justice.cz/isir/common/stat.do?ico={ico} per IČO, 2) Parsování XML odpovědi — nové spisy, události, rozhodnutí, 3) Klasifikace závažnosti: návrh (warning) / zahájení (high) / úpadek (critical) / oddlužení (info), 4) Cross-reference s fakturačními daty (máme pohledávku?), 5) Automatická notifikace s doporučenou akcí.

**Datové vstupy:**

- ISIR API — https://isir.justice.cz (IČO klientů + IČO partnerů z faktur)
- Fakturační data — otevřené pohledávky per klient/partner
- Saldokonto — stav úhrad per obchodní partner
- CRM — vazby klient↔partner (z analýzy 14-04)
- Právní databáze — lhůty pro přihlášení pohledávek

**Výstupní metriky:**

- Počet monitorovaných IČO
- Nové insolvenční události per den
- Pohledávky at risk (Kč)
- Lhůty pro přihlášení (dny do deadline)
- Status per insolvence (návrh/zahájení/úpadek/oddlužení)

#### ✅ Dobrý stav

**0 nálezů**

Žádné IČO v portfoliu nemá záznam v ISIR. Všichni klienti a jejich klíčoví partneři jsou solventní. Monitoring probíhá bez incidentu.

*Indikátory:*

- ✓ 0 insolvenčních nálezů
- ✓ 450 monitorovaných IČO (klienti + partneři)
- ✓ Denní scan: 100 % kompletní
- ✓ Pohledávky at risk: 0 Kč

*Doporučené akce:*

1. Pokračovat v denním monitoringu
2. Rozšiřovat monitoring o nové partnery z faktur
3. Kvartální report pro management

#### ❌ Rizikový stav

**Klient podal insolvenční návrh**

Klient DEF s.r.o. (IČO 98765432) podal insolvenční návrh — zahájeno řízení. Naše pohledávky: 180K Kč (4 nezaplacené faktury). Lhůta pro přihlášení: 30 dní. Navíc: 3 naši klienti jsou dodavatelé DEF s expozicí 2.1M Kč.

*Indikátory:*

- ✗ Insolvence: DEF s.r.o. — řízení zahájeno
- ✗ Naše pohledávky: 180K Kč
- ✗ Lhůta přihlášení: 30 dní
- ✗ 3 klienti-dodavatelé at risk: 2.1M Kč celkem

*Nápravná opatření:*

1. Okamžitě přihlásit pohledávku 180K do insolvence
2. Informovat 3 klienty-dodavatele (diskrétně, obecně)
3. Zastavit poskytování služeb DEF (konzultace s právníkem)
4. Připravit opravné daňové doklady (DPH)

**Související analýzy:** 19-01, 19-08, 14-04, 1-04

---

### 19-03 — Pracovní inzeráty

**Zdroj:** scraping

| | |
|---|---|
| **Frekvence** | Denně (scraping), okamžitý alert při finance/accounting pozici |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Vysoký — včasná detekce insourcing rizika |
| **Status** | Produkce |

**Popis:**

Web scraping pracovních inzerátů klientských firem na jobs.cz, indeed.cz, profesia.cz a LinkedIn. Inzeráty obsahují cenné signály: najímání = růst, najímání účetního = potenciální insourcing (nahrazení naší služby), propouštění = problémy.

Systém scrapuje portály denně a matchuje firmy dle názvu a IČO. Inzeráty jsou klasifikovány: pozice, obor, seniorita. Zvláštní pozornost je věnována účetním/finančním pozicím — ty přímo ohrožují naši službu.

Pro klienty s 50+ zaměstnanci je najímání CFO/controllera signálem sofistikace — příležitost pro premium služby.

**Metodologie:**

Job listing intelligence: 1) Denní scraping: jobs.cz API (partners), indeed.cz (public), LinkedIn Jobs (RSS), 2) Company matching: název firmy (fuzzy) + IČO (exact, pokud dostupné), 3) Klasifikace pozice: NLP classification (účetní/finance/jiné), seniorita (junior/senior/management), 4) Signal extraction: growth (mnoho pozic) / insourcing risk (účetní pozice) / distress (propouštění zmíněno), 5) Alert při detekci účetní/finanční pozice.

**Datové vstupy:**

- Jobs.cz — partner API / public scraping (firma, pozice, popis, datum)
- Indeed.cz — public scraping
- LinkedIn Jobs — RSS feed per firma (pokud public)
- CRM — IČO a název firmy per klient pro matching
- Historické inzeráty — trend databáze

**Výstupní metriky:**

- Počet aktivních inzerátů per klient
- Typ pozic (účetní/finance vs. jiné)
- Growth signal (počet pozic vs. historie)
- Insourcing risk score (0–100)
- Alert: finance/accounting position detected

#### ✅ Dobrý stav

**Najímá — roste**

Klient inzeruje 5 pozic (2× výrobní, 1× obchodní, 1× IT, 1× HR). Žádná finance/accounting pozice. Signál růstu — obrat pravděpodobně poroste, budou potřebovat rozšíření služeb.

*Indikátory:*

- ✓ 5 aktivních inzerátů (0 finance/accounting)
- ✓ Insourcing risk: 0/100
- ✓ Growth signal: silný (+5 pozic vs. 0 historicky)
- ✓ Predikce: +20 % obrat do 12M

*Doporučené akce:*

1. Proaktivně nabídnout rozšíření služeb (více zaměstnanců = více mezd)
2. Připravit kapacity na rostoucí objem
3. Nabídnout onboarding nových zaměstnanců (pracovní smlouvy, přihlášky)

#### ❌ Rizikový stav

**Najímá účetní — chce nás nahradit?**

Klient inzeruje 'Hlavní účetní/účetní manažer' na jobs.cz. Popis pozice: 'Vedení účetnictví, daňová přiznání, mzdy.' To je přesně to, co děláme my. Insourcing risk: 85/100.

*Indikátory:*

- ✗ 1 inzerát: 'Hlavní účetní' (NLP: accounting, seniorita: senior)
- ✗ Insourcing risk: 85/100
- ✗ Popis pozice překrývá naše služby na 90 %
- ✗ Klient nezminil záměr insourcovat

*Nápravná opatření:*

1. Proaktivní schůzka s jednatelem — 'Všimli jsme si, že hledáte účetní'
2. Prezentovat TCO srovnání: interní účetní vs. naše služby
3. Nabídnout hybridní model (interní operativa + naše supervize)
4. Připravit retention nabídku — premium služba za lepší cenu

**Související analýzy:** 19-01, 19-04, 10-01, 16-01

---

### 19-04 — Tiskové zprávy

**Zdroj:** RSS

| | |
|---|---|
| **Frekvence** | Denně (RSS scan), okamžitý alert při negativní zmínce |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Střední — proaktivní vztah management |
| **Status** | Produkce |

**Popis:**

Monitoring mediálních zmínek klientských firem v českých a německých médiích prostřednictvím RSS feedů a news API. Systém detekuje pozitivní i negativní publicitu a vyhodnocuje dopad na podnikání klienta.

Pozitivní PR (ocenění, expanze, nový produkt) je příležitostí pro gratulaci a prohloubení vztahu. Negativní PR (skandál, soudní spor, environmentální problém) vyžaduje proaktivní reakci — klient bude pod tlakem a může potřebovat podporu.

Systém parsuje RSS feedy hlavních zpravodajských serverů a hledá zmínky dle názvu firmy a jmen klíčových osob.

**Metodologie:**

Media monitoring: 1) RSS feed aggregace: iDNES.cz, Aktuálně.cz, E15.cz, HN.cz, CzechCrunch, + DE: Handelsblatt, WirtschaftsWoche, 2) Keyword matching: název firmy, IČO, jména jednatelů/spolumajitelů, 3) NLP sentiment analýza: pozitivní/neutrální/negativní, 4) Impact scoring: reach × sentiment × relevance, 5) Alert při negativní zmínce s impact score > 50.

**Datové vstupy:**

- RSS feedy: iDNES, Aktuálně, E15, HN, CzechCrunch (CZ)
- RSS feedy: Handelsblatt, WirtschaftsWoche (DE — pro pendlery)
- Google News API — keyword alert per firma
- CRM — názvy firem, jména klíčových osob, obor
- Historické zmínky — trend databáze

**Výstupní metriky:**

- Počet mediálních zmínek per klient per měsíc
- Sentiment distribuce (pozitivní/neutrální/negativní)
- Impact score per zmínka (0–100)
- Top zmínky za období (headline + source + sentiment)
- Trend media presence (roste/klesá)

#### ✅ Dobrý stav

**Pozitivní PR**

Klient zmíněn v E15.cz: 'Firma XYZ získala ocenění Podnikatel roku 2026 v Ústeckém kraji.' Sentiment: pozitivní. Impact score: 75. Příležitost pro gratulaci a case study.

*Indikátory:*

- ✓ 1 pozitivní zmínka (E15.cz, impact 75)
- ✓ Sentiment: 100 % pozitivní za měsíc
- ✓ Ocenění = validace kvality firmy
- ✓ Mediální reach: ~200K čtenářů

*Doporučené akce:*

1. Gratulovat jednateli osobně
2. Nabídnout PR spolupráci — zmínka o naší kanceláři jako partnera
3. Požádat o referenci / testimonial
4. Sdílet na sociálních sítích kanceláře

#### ❌ Rizikový stav

**Negativní média — reputační riziko**

Klient zmíněn v Aktuálně.cz: 'Firma XYZ čelí žalobě za znečištění vody v průmyslové zóně.' Sentiment: negativní. Impact score: 85. Klient bude pod tlakem, možné finanční dopady (pokuta, náhrada škody).

*Indikátory:*

- ✗ 1 negativní zmínka (Aktuálně.cz, impact 85)
- ✗ Téma: environmentální spor (potenciální pokuta)
- ✗ Mediální reach: ~400K čtenářů
- ✗ Potenciální finanční dopad: > 1M Kč

*Nápravná opatření:*

1. Kontaktovat klienta — nabídnout podporu (ne komentovat případ)
2. Připravit finanční scénáře (pokuta, náhrada, právní náklady)
3. Monitorovat vývoj případu intenzivně
4. Zvážit dopad na kredit a cash flow klienta

**Související analýzy:** 19-01, 19-03, 19-06, 7-01

---

### 19-05 — Výběrová řízení

**Zdroj:** portál

| | |
|---|---|
| **Frekvence** | Týdně (tendr scraping), okamžitý alert při výsledku |
| **Automatizace** | 80 % automatizováno |
| **Business impact** | Střední — predikce obratu a kapacitní plánování |
| **Status** | Produkce |

**Popis:**

Monitoring účasti klientů ve veřejných výběrových řízeních a zakázkách prostřednictvím portálů tender.cz, vestnikverejnychzakazek.cz a TED (EU). Výhra zakázky signalizuje růst a potřebu kapacit, prohra signalizuje možné problémy.

Pro účetní kancelář je klíčové vědět, zda klient vyhraje velkou zakázku — bude potřebovat rozšíření služeb (více faktur, subdodavatelé, reporting). Prohra tendru může vést ke cash flow problémům.

Systém páruje klienty s tendry dle IČO a monitoruje výsledky.

**Metodologie:**

Public procurement monitoring: 1) Scraping vestnikverejnychzakazek.cz — search per IČO, 2) TED (Tenders Electronic Daily) API — EU zakázky per IČO, 3) Parsování výsledků: status (podáno/vyhráno/prohráno), hodnota, typ, 4) Impact analysis: vyhraná zakázka → obrat impact, prohraná → opportunity cost, 5) Alert při výhře > 1M Kč nebo 3 prohrách v řadě.

**Datové vstupy:**

- Věstník veřejných zakázek — vestnikverejnychzakazek.cz (IČO search)
- TED API — EU veřejné zakázky (EU/CZ scope)
- Tender.cz — soukromé tendry (pokud public)
- CRM — IČO klientů pro matching
- Finanční data klienta — obrat, cash flow (pro impact analýzu)

**Výstupní metriky:**

- Počet aktivních tendrů per klient
- Win/loss rate (%, historická)
- Hodnota vyhraných zakázek (Kč, YTD)
- Pipeline (podané, čekající na rozhodnutí)
- Impact na predikovaný obrat

#### ✅ Dobrý stav

**Vyhrál zakázku 12M**

Klient vyhrál veřejnou zakázku na 12M Kč (stavební práce, Ústecký kraj). Realizace 18 měsíců. Bude potřebovat rozšíření fakturace, subdodavatelské smlouvy a cash flow management.

*Indikátory:*

- ✓ Vyhraná zakázka: 12M Kč / 18 měsíců
- ✓ Win rate klienta: 40 % (zdravý)
- ✓ Predikovaný obrat impact: +35 % YoY
- ✓ Potřeba rozšíření služeb: mzdy (nábor), fakturace (subdodavatelé)

*Doporučené akce:*

1. Gratulovat a nabídnout podporu při realizaci
2. Proaktivně navrhnout rozšíření mzdových služeb (nábor)
3. Nabídnout subdodavatelský accounting a cash flow reporting
4. Připravit kapacity na zvýšený objem

#### ❌ Rizikový stav

**Prohrál 3 tendry v řadě**

Klient prohrál 3 veřejné zakázky za 6 měsíců — celková hodnota 28M Kč. Win rate: 0 % (historicky 35 %). Firma je závislá na veřejných zakázkách — bez výhry hrozí cash flow krize.

*Indikátory:*

- ✗ 3 prohraná tendry za 6M (hodnota 28M Kč)
- ✗ Win rate: 0 % (historicky 35 %)
- ✗ Žádná aktivní zakázka — prázdný pipeline
- ✗ Cash flow predikce: problém za 4M

*Nápravná opatření:*

1. Proaktivně připravit cash flow scénáře
2. Diskutovat diverzifikaci — snížit závislost na veřejných zakázkách
3. Nabídnout cost optimization konzultaci
4. Monitorovat cash flow intenzivně (týdně)

**Související analýzy:** 19-01, 19-04, 21-02, 2-01

---

### 19-06 — Regulatorní feeds

**Zdroj:** CZ+DE+EU

| | |
|---|---|
| **Frekvence** | Denně (feed monitoring), měsíčně (impact assessment) |
| **Automatizace** | 80 % automatizováno |
| **Business impact** | Vysoký — compliance a přidaná hodnota pro klienty |
| **Status** | Produkce |

**Popis:**

Monitoring legislativních změn relevantních pro klientské portfolio z českých, německých a EU zdrojů. Systém parsuje legislativní feedy, identifikuje relevantní novely per klient (dle NACE, velikosti, pendler status) a generuje impact analýzu.

Pro kancelář zaměřenou na pendlery CZ/DE je kritické sledovat: novely DPH (CZ i DE), změny v sociálním pojištění, A1 formuláře, daňové smlouvy CZ/DE, DSGVO/GDPR, a oborově specifické regulace.

Systém proaktivně informuje klienty o relevatních změnách — přidaná hodnota, kterou konkurence neposkytuje.

**Metodologie:**

Regulatory intelligence: 1) RSS/API monitoring: zakonyprolidi.cz, Sbírka zákonů (MV ČR), BGBl (DE), EUR-Lex CELLAR API, 2) Relevance matching: novelizovaný zákon × klientský profil (NACE, pendler, DPH plátce, DE aktivity), 3) Impact scoring: rozsah změny × počet dotčených klientů × finanční dopad, 4) Auto-generování klientského briefu (CZ/DE dual language), 5) Distribution per klient per relevance.

**Datové vstupy:**

- Sbírka zákonů — zakonyprolidi.cz RSS feed (novelizace zákonů CZ)
- BGBl — bgbl.de RSS (novelizace zákonů DE, relevantní: EStG, SGB, UStG)
- EUR-Lex CELLAR API — EU direktivy a nařízení (ViDA, DAC8, Pillar Two)
- Klientské profily — NACE, pendler status, DPH plátce, DE aktivity
- Historická relevance — které novely ovlivnily které klienty (training data)

**Výstupní metriky:**

- Počet relevantních legislativních změn per měsíc
- Impact score per novela per klient (0–100)
- Počet dotčených klientů per novela
- Compliance gap — klient neimplementoval relevantní novelu
- Proactive briefings sent (počet per měsíc)

#### ✅ Dobrý stav

**Připraven na novely**

Novela DPH (zákon 235/2004 Sb.) účinná od 1.1.2027 — systém identifikoval 45 dotčených klientů. Briefing odeslán 90 dní předem. 42 klientů implementovalo změny. 3 zbývající kontaktováni osobně.

*Indikátory:*

- ✓ Novela DPH: 45 dotčených klientů identifikováno
- ✓ Briefing: 90 dní předem
- ✓ Implementace: 93 % (42/45) do účinnosti
- ✓ 0 compliance incidentů po účinnosti

*Doporučené akce:*

1. Pokračovat v proaktivním informování
2. Followup se 3 klienty, kteří ještě neimplementovali
3. Dokumentovat úspěch pro marketing (přidaná hodnota)

#### ❌ Rizikový stav

**Novela ho zasáhne — neví o tom**

EU nařízení ViDA (VAT in the Digital Age) mění pravidla pro e-invoicing od 2028. Klient exportuje do 5 EU zemí — bude muset implementovat SAF-T a e-invoicing. Klient o ViDA neví. Impact score: 85.

*Indikátory:*

- ✗ ViDA: impact score 85 pro tohoto klienta
- ✗ Klient: 0 dotazů na ViDA (13-04 analysis: ignorující)
- ✗ Implementation deadline: 24 měsíců
- ✗ Estimated implementation cost: 200–400K Kč

*Nápravná opatření:*

1. Proaktivní briefing — schůzka s jednatelem o ViDA
2. Připravit implementační roadmap a cost estimate
3. Nabídnout ViDA readiness assessment jako službu
4. Naplánovat implementation timeline — 24M je méně než se zdá

**Související analýzy:** 13-04, 19-01, 4-01, 5-01

---

### 19-07 — Kurzovní lístek

**Zdroj:** ČNB+EZB API

| | |
|---|---|
| **Frekvence** | Denně (kurzy), okamžitý alert při pohybu > 3 %/měsíc |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Střední–Vysoký — kurzový dopad na pendlery a exportéry |
| **Status** | Produkce |

**Popis:**

Monitoring směnných kurzů z ČNB a ECB API s dopadem na klienty s cizoměnovými transakcemi. Pro pendlerskou klientelu je EUR/CZK kurz kritický — příjmy v EUR, výdaje v CZK. Výrazný pohyb kurzu ovlivňuje reálný příjem a daňovou povinnost.

Systém denně stahuje kurzy z ČNB API, počítá volatilitu, detekuje trendy a identifikuje klienty s největší kurzovou expozicí. Pro tyto klienty generuje doporučení k hedgingu nebo konverzi.

Pro firmy exportující do EU je sledování kurzu klíčové pro cenotvorbu a marži.

**Metodologie:**

FX exposure monitoring: 1) Denní stahování kurzů: GET https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt, 2) ECB API: GET https://data-api.ecb.europa.eu/service/data/EXR/D.CZK.EUR.SP00.A, 3) Volatility calculation (30-day rolling std dev), 4) Exposure mapping per klient (cizoměnové faktury z účetnictví), 5) Alert při pohybu > 3 % za měsíc nebo volatilitě > historical 2σ.

**Datové vstupy:**

- ČNB kurzovní lístek API — denní kurzy (EUR, USD, GBP, PLN, CHF)
- ECB SDMX API — EUR referenční kurzy
- Účetní data klientů — cizoměnové faktury (vydané/přijaté, měna, částka)
- Mzdové záznamy pendlerů — příjem v EUR, výdaje v CZK
- Hedgingové instrumenty — existující zajištění per klient (pokud existuje)

**Výstupní metriky:**

- EUR/CZK denní kurz + 30D/90D/365D průměr
- Volatilita (30D rolling σ)
- Kurzová expozice per klient (Kč)
- Unrealized gain/loss z kurzových pohybů per klient
- Hedging recommendation (ano/ne, instrument, timing)

#### ✅ Dobrý stav

**EUR stabilní, hedging nepotřeba**

EUR/CZK stabilní na 25.20 ± 0.15 za 90 dní. Volatilita: 0.3 % (historicky nízká). Žádný klient nemá expozici > 500K Kč. Hedging není nákladově efektivní.

*Indikátory:*

- ✓ EUR/CZK: 25.20 (30D avg: 25.18, 90D avg: 25.22)
- ✓ Volatilita 30D: 0.3 % (norma < 1 %)
- ✓ Max expozice per klient: 480K Kč
- ✓ Unrealized gain/loss: < ±2 % u všech klientů

*Doporučené akce:*

1. Pokračovat v denním monitoringu
2. Informovat klienty: kurz stabilní, žádná akce potřeba
3. Přehodnotit hedging potřebu za kvartál

#### ❌ Rizikový stav

**EUR +8 % za měsíc — nezajištěná pozice**

EUR/CZK vzrostl z 25.00 na 27.00 za 30 dní (+8 %). 15 pendler-klientů s příjmy v EUR a výdaji v CZK — pozitivní dopad na příjem ale negativní na daňovou povinnost (vyšší základ daně v CZK). 3 exportní firmy s EUR expozicí > 2M Kč bez hedgingu.

*Indikátory:*

- ✗ EUR/CZK: +8 % za 30D (27.00 vs. 25.00)
- ✗ Volatilita 30D: 3.2 % (alarm > 2 %)
- ✗ 15 pendlerů s kurzovým dopadem na DPFO
- ✗ 3 firmy s nezajištěnou expozicí > 2M Kč

*Nápravná opatření:*

1. Informovat pendlery o dopadu na daňovou povinnost
2. Kontaktovat 3 firmy — nabídnout hedging konzultaci
3. Přepočítat zálohy na DPFO pro pendlery
4. Připravit scénáře: co když EUR pokračuje v růstu

**Související analýzy:** 19-01, 5-01, 21-02, 4-01

---

### 19-08 — Sbírka listin

**Zdroj:** justice.cz

| | |
|---|---|
| **Frekvence** | Měsíčně (full scan per IČO) |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Vysoký — compliance a reputace klientů |
| **Status** | Produkce |

**Popis:**

Monitoring povinnosti zveřejnění účetních závěrek ve sbírce listin na justice.cz. České s.r.o. a a.s. mají povinnost zveřejnit účetní závěrku do 12 měsíců po konci účetního období. Nesplnění = pokuta až 100K Kč, rejstříkový soud může zahájit řízení o zrušení.

Systém automaticky kontroluje sbírku listin per IČO a ověřuje, zda jsou zveřejněny výkazy za poslední období. Pro naše klienty zajišťujeme zveřejnění — ale u nových klientů mohou chybět historické výkazy.

Systém také monitoruje sbírku listin obchodních partnerů klientů — chybějící výkazy partnera signalizují neserióznost.

**Metodologie:**

Sbírka listin monitoring: 1) Justice.cz API — GET /sbirka-listin per IČO, 2) Parsování dostupných dokumentů: typ (výroční zpráva, účetní závěrka, zpráva auditora), období, datum zveřejnění, 3) Gap detection: chybějící období (aktuální rok − 1, − 2), 4) Compliance check: je vše zveřejněno v zákonné lhůtě?, 5) Alert při chybějícím období > 12M po konci účetního roku.

**Datové vstupy:**

- Justice.cz sbírka listin API — per IČO klientů a partnerů
- Účetní závěrky — interní (naši klienti: máme data)
- OR výpisy — typ společnosti (s.r.o., a.s.) → povinnost zveřejnění
- Kalendář — účetní období per klient (většina 1.1.–31.12.)
- Partneři klientů — IČO z faktur pro monitoring

**Výstupní metriky:**

- Počet klientů s kompletní sbírkou listin
- Počet klientů s chybějícím obdobím
- Dny od deadline do zveřejnění (negativní = po lhůtě)
- Partneři s chybějícími výkazy (risk signal)
- Potenciální pokuta exposure (Kč)

#### ✅ Dobrý stav

**Výkazy zveřejněny**

Všichni klienti (s.r.o. a a.s.) mají zveřejněné účetní závěrky za poslední 3 roky. Průměrná doba zveřejnění: 45 dní po auditu (v zákonné lhůtě). Compliance: 100 %.

*Indikátory:*

- ✓ 100 % compliance (všechny závěrky zveřejněny)
- ✓ Průměrná doba: 45 dní po schválení
- ✓ 0 chybějících období za 3 roky
- ✓ 0 Kč pokuta exposure

*Doporučené akce:*

1. Pokračovat v proaktivním zveřejňování
2. Nastavit automatické připomínky per klient
3. Ověřit i historické období nových klientů

#### ❌ Rizikový stav

**Nezveřejněny 2 roky — pokuta 100K**

Klient GHI s.r.o. nemá zveřejněné závěrky za 2024 ani 2025. Lhůta pro 2024 vypršela před 6 měsíci. Rejstříkový soud může udělit pokutu až 100K Kč a zahájit řízení o zrušení společnosti. Klient o povinnosti neví.

*Indikátory:*

- ✗ 2 chybějící období (2024, 2025)
- ✗ 6 měsíců po zákonné lhůtě (2024)
- ✗ Pokuta exposure: 100K Kč per období
- ✗ Riziko: řízení o zrušení společnosti

*Nápravná opatření:*

1. Okamžitě informovat klienta o povinnosti a riziku
2. Urychleně připravit a zveřejnit závěrky za oba roky
3. Podat omluvný dopis rejstříkovému soudu
4. Nastavit automatické připomínky — prevence opakování

**Související analýzy:** 19-01, 19-02, 1-01, 4-01

---

<a id="sekce-20"></a>

## Sekce 20: Certifikační autorita a IT

### 20-01 — Životní cyklus certifikátů

**Zdroj:** IT logy

| | |
|---|---|
| **Frekvence** | Denně |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Kritický — výpadek certifikátu blokuje klíčové služby |
| **Status** | Produkce |

**Popis:**

Centrální správa a monitoring všech digitálních certifikátů — kvalifikovaných elektronických podpisů, SSL/TLS certifikátů, ELSTER certifikátů a dalších. Systém sleduje platnost, automaticky upozorňuje na blížící se expirace a spouští obnovovací workflow.

Expirovaný certifikát může paralyzovat podání daňových přiznání, elektronickou komunikaci s úřady nebo způsobit výpadek webových služeb. Prevence je mnohonásobně levnější než řešení následků.

Systém udržuje kompletní inventář certifikátů per klient a per interní systém s jasným vlastníkem a procesem obnovy.

**Metodologie:**

Lifecycle management: 1) Inventarizace všech certifikátů, 2) Denní kontrola platnosti, 3) Alerting: 90 dní (info), 30 dní (warning), 14 dní (critical), 4) Automatický trigger obnovovacího workflow, 5) Verifikace po obnově.

**Datové vstupy:**

- Inventář certifikátů (databáze)
- CT log monitoring (SSL/TLS)
- ELSTER certifikáty (soubory)
- Kvalifikované podpisy (USB tokeny / cloud)
- Kontaktní údaje vlastníků

**Výstupní metriky:**

- Počet aktivních certifikátů
- Expirující do 90/30/14 dní
- Expirované (kritické)
- Úspěšnost včasné obnovy (%)
- Průměrná doba obnovy

#### ✅ Dobrý stav

**Vše pod kontrolou**

Všechny certifikáty jsou platné a žádný neexpiruje v následujících 90 dnech. Obnovovací workflow byl spuštěn pro 2 certifikáty s expirací za 120 dní.

*Indikátory:*

- ✓ 0 expirace do 90 dní
- ✓ 100 % pokrytí inventářem
- ✓ Proaktivní obnova 120 dní předem
- ✓ 0 výpadků za rok

*Doporučené akce:*

1. Pokračovat v monitoringu
2. Aktualizovat inventář při nových klientech

#### ❌ Rizikový stav

**Kritické expirace**

3 certifikáty expirují za 14 dní — 2 ELSTER certifikáty pro pendlery a 1 kvalifikovaný podpis pro DIS+. Bez obnovy nebude možné podat přiznání.

*Indikátory:*

- ✗ 3 certifikáty expirují za 14 dní
- ✗ 2 ELSTER + 1 kvalifikovaný podpis
- ✗ Blokuje podání 8 přiznání
- ✗ Kontaktní osoby nereagují

*Nápravná opatření:*

1. Eskalovat na nejvyšší prioritu
2. Kontaktovat klienty telefonicky
3. Připravit záložní postup (plná moc)
4. Objednat obnovu certifikátů okamžitě

**Související analýzy:** 20-02, 20-04, 20-05, 20-06

---

### 20-02 — Klientská mapa certifikátů

**Zdroj:** databáze

| | |
|---|---|
| **Frekvence** | Měsíčně (inventář audit) |
| **Automatizace** | 75 % automatizováno |
| **Business impact** | Vysoký — certifikáty blokují podání |
| **Status** | Produkce |

**Popis:**

Kompletní inventář digitálních certifikátů per klient — kvalifikované elektronické podpisy (I.CA, PostSignum), ELSTER certifikáty pro DE podání, SSL certifikáty webů a elektronické pečetě. Mapa identifikuje klienty bez potřebných certifikátů.

Klienti bez kvalifikovaného certifikátu nemohou podávat elektronicky přes MOJE daně, datové schránky vyžadující podpis, nebo ELSTER (DE). Kancelář musí buď zastoupit (plná moc) nebo certifikát zajistit.

Systém udržuje inventář v databázi s vazbou na klienta, typ certifikátu, vydavatele, platnost a účel použití.

**Metodologie:**

Certificate inventory management: 1) Inventarizace všech certifikátů z I.CA management API a PostSignum admin, 2) ELSTER certifikáty z lokální databáze (PKCS#12 files), 3) Mapping certifikát → klient → účel, 4) Gap analysis: klient potřebuje (dle služeb) vs. má, 5) Coverage metric per portfolio/segment.

**Datové vstupy:**

- I.CA management API — seznam vydaných certifikátů per IČO/RČ
- PostSignum admin — certifikáty vydané přes Českou poštu
- ELSTER lokální databáze — .pfx soubory per klient per rok
- CRM — služby per klient (které vyžadují certifikát)
- Datové schránky — ISDS seznam aktivních schránek per klient

**Výstupní metriky:**

- Celkový počet certifikátů v inventáři
- Coverage: % klientů s potřebnými certifikáty
- Gap count: klienti bez potřebného certifikátu
- Typ certifikátu distribuce (kvalifikovaný/komerční/ELSTER)
- Expiring within 90D (cross-reference s 20-01)

#### ✅ Dobrý stav

**100 % pokrytí**

Všichni klienti mají certifikáty odpovídající jejich potřebám. 100 % pendlerů má ELSTER certifikát. 100 % s.r.o./a.s. má kvalifikovaný podpis pro MOJE daně. Inventář kompletní a aktuální.

*Indikátory:*

- ✓ Coverage: 100 %
- ✓ 0 certifikačních gaps
- ✓ Inventář: 100 % kompletní
- ✓ Expiring 90D: řešeno (20-01)

*Doporučené akce:*

1. Udržovat inventář při onboardingu nových klientů
2. Kvartální audit coverage vs. služby
3. Dokumentovat certifikační mapu pro ISO/audit

#### ❌ Rizikový stav

**40 % klientů bez kvalifikovaného certifikátu**

Z 200 klientů 80 nemá kvalifikovaný elektronický podpis — podáváme za ně na plnou moc. 15 pendlerů nemá ELSTER certifikát — DPFO DE podání blokováno. Riziko: plné moci mohou být zpochybněny.

*Indikátory:*

- ✗ Coverage: 60 % (gap: 80 klientů bez certifikátu)
- ✗ 15 pendlerů bez ELSTER (DE podání blokováno)
- ✗ 65 klientů na plné moci (riziková závislost)
- ✗ Certifikační gap roste (nový klienti bez certifikátu)

*Nápravná opatření:*

1. Spustit kampaň: asistovaná registrace certifikátů
2. Priorita: 15 pendlerů bez ELSTER (deadline DE přiznání)
3. Nabídnout I.CA certifikát jako součást služby (bundle)
4. Cíl: coverage > 90 % do 6 měsíců

**Související analýzy:** 20-01, 20-04, 20-06, 5-01

---

### 20-03 — SSL/TLS monitoring

**Zdroj:** automatický scan

| | |
|---|---|
| **Frekvence** | Denně (SSL check), okamžitý alert při expiraci |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Střední — bezpečnost a důvěra klientských webů |
| **Status** | Produkce |

**Popis:**

Automatický monitoring SSL/TLS certifikátů na webech a službách klientů i kanceláře. Systém denně kontroluje platnost, konfiguraci a bezpečnostní rating pomocí crt.sh API (Certificate Transparency logs) a vlastního SSL scanneru.

Expirovaný SSL certifikát způsobuje browser warning, ztrátu důvěry zákazníků a potenciální GDPR problém (nešifrovaná komunikace). Proaktivní monitoring předchází těmto situacím.

Systém také detekuje weak ciphers, outdated TLS verze (< 1.2) a misconfigurations.

**Metodologie:**

SSL/TLS monitoring: 1) crt.sh API — GET https://crt.sh/?q={domain}&output=json — monitoring Certificate Transparency logů, 2) OpenSSL check — ssl_scan per doména (certificate chain, expiry, ciphers), 3) Rating: A+ (perfect), A, B, C, F (failure), 4) Alert: expiry < 30D (warning), < 14D (critical), expired (emergency), 5) Configuration check: TLS version, cipher suite, HSTS header.

**Datové vstupy:**

- crt.sh API — https://crt.sh/?q={domain}&output=json — CT log monitoring
- SSL scan — openssl s_client -connect {domain}:443 (certificate details)
- Klientské domény z CRM (webové stránky, e-shop, portál)
- Interní domény kanceláře (portál, email, API)
- Qualys SSL Labs API — SSL Server Test (rating, pokud dostupné)

**Výstupní metriky:**

- Počet monitorovaných domén
- SSL rating distribuce (A+/A/B/C/F)
- Expiring < 30D / < 14D / expired
- TLS version distribuce (1.2/1.3)
- Weak cipher count

#### ✅ Dobrý stav

**Vše A+ rating**

Všech 35 monitorovaných domén má SSL rating A+. TLS 1.3 na 90 %, TLS 1.2 na 10 %. Žádný certifikát neexpiruje do 90 dní. HSTS nasazen na 100 % domén.

*Indikátory:*

- ✓ 35/35 domén: A+ rating
- ✓ 0 expiring < 90D
- ✓ TLS 1.3: 90 %, TLS 1.2: 10 %
- ✓ HSTS: 100 %

*Doporučené akce:*

1. Pokračovat v denním monitoringu
2. Upgrade zbývajících 10 % na TLS 1.3
3. Kvartální security report pro management

#### ❌ Rizikový stav

**2 weby s expirovaným SSL**

2 klientské weby (e-shop a portál) mají expirovaný SSL certifikát — prohlížeč zobrazuje 'Připojení není zabezpečené'. Klienti ztrácí zákazníky. Certifikáty vypršely před 5 dny — systém detekoval, ale klient nereagoval.

*Indikátory:*

- ✗ 2 domény: SSL expired (5 dní)
- ✗ Browser warning aktivní — ztráta zákazníků
- ✗ Klient nereagoval na 3 automatické upomínky
- ✗ GDPR risk: nešifrovaná komunikace na e-shopu

*Nápravná opatření:*

1. Okamžitě kontaktovat klienta telefonicky
2. Nabídnout asistenci s obnovou (Let's Encrypt: automatizace)
3. Doporučit automatický renewal (certbot, ACME)
4. Pro e-shop: upozornit na GDPR riziko nešifrovaných dat

**Související analýzy:** 20-01, 20-02, 20-04, 20-05

---

### 20-04 — Predikce obnovy

**Zdroj:** automatické upomínky

| | |
|---|---|
| **Frekvence** | Denně (model update), per certifikát (workflow trigger) |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Vysoký — prevence výpadků služby |
| **Status** | Produkce |

**Popis:**

Prediktivní systém pro obnovu certifikátů na základě historických dat o obnově per klient. Systém se učí, jak rychle klient reaguje na upomínky a přizpůsobuje timing první upomínky tak, aby obnova proběhla před expirací.

Někteří klienti obnovují den po upomínce (early adopters), jiní potřebují 5 upomínek a osobní telefonát (procrastinators). Systém personalizuje komunikační strategii per klient.

Automatizovaný workflow: upomínka → reminder → eskalace → telefonát → manuální obnova. Každý step má konfigurovaný timing dle klientského profilu.

**Metodologie:**

Renewal prediction model: 1) Historická data obnov per klient (upomínka timestamp → obnova timestamp), 2) Feature engineering: průměrná doba reakce, počet upomínek potřebných, kanál preference, 3) Regression model: predicted_renewal_date = expiry − f(client_profile), 4) Upomínkový workflow: start_date = predicted_renewal_date − safety_margin, 5) Adaptive learning — model se updatuje s každou obnovou.

**Datové vstupy:**

- Certifikátní databáze — expiry dates per certifikát per klient
- Upomínkový log — datum odeslání, kanál (email/SMS/telefon), reakce
- Historická obnovy — datum obnovy vs. datum upomínky per klient
- Klientský profil — reaktivita (z 15-01, 17-01)
- Certifikát metadata — typ, vydavatel, náročnost obnovy (online/návštěva)

**Výstupní metriky:**

- Predicted renewal date per certifikát
- Optimal first reminder date
- Počet upomínek potřebných (predicted)
- On-time renewal rate (%)
- Post-expiry renewal count (failures)

#### ✅ Dobrý stav

**Obnova 30 dní předem**

Model správně predikoval, že klient potřebuje 2 upomínky a 10 dní na obnovu. První upomínka odeslána 45 dní předem. Klient obnovil 30 dní před expirací. On-time rate: 98 % portfolia.

*Indikátory:*

- ✓ Obnova: 30 dní před expirací
- ✓ 2 upomínky (as predicted)
- ✓ On-time renewal rate: 98 %
- ✓ Model accuracy: MAE 4 dny

*Doporučené akce:*

1. Pokračovat s prediktivním workflow
2. Fine-tune model s novými daty
3. Zvážit automatickou obnovu pro jednoduché certifikáty

#### ❌ Rizikový stav

**Obnova po expiraci — výpadek služby**

ELSTER certifikát expiroval před 3 dny — 5 upomínek ignorováno, telefon nezvednut. Pendlerovo DE daňové přiznání nemůže být podáno. Model selhání: klient změnil telefon a email nečte (17-01 drop detected).

*Indikátory:*

- ✗ Expirace: 3 dny po (5 upomínek ignorováno)
- ✗ 0 odpovědí na emaily a hovory
- ✗ ELSTER podání blokováno
- ✗ Deadline DE přiznání: za 11 dní

*Nápravná opatření:*

1. Osobní návštěva / doporučený dopis — urgentní kontakt
2. Připravit emergency obnovu (asistovaná návštěva Czech POINT)
3. Alternativa: podání přes plnou moc (pokud máme)
4. Post-mortem: proč model selhal → update contact verification

**Související analýzy:** 20-01, 20-02, 20-06, 17-01

---

### 20-05 — Detekce zneužití

**Zdroj:** anomálie podepisování

| | |
|---|---|
| **Frekvence** | Real-time (per podpisová operace) |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Kritický — ochrana před zneužitím identity |
| **Status** | Produkce |

**Popis:**

Monitoring vzorů používání digitálních certifikátů pro detekci zneužití nebo kompromitace. Systém analyzuje čas, IP adresu, frekvenci a typ podepisovaných dokumentů a detekuje anomálie oproti normálnímu profilu klienta.

Zneužití certifikátu může znamenat: krádež identity, neautorizované podání daňového přiznání, falšování podpisu. Včasná detekce umožňuje revokaci certifikátu a minimalizaci škod.

Systém buduje behaviorální profil per certifikát — typické časy použití, IP rozsahy, typy operací — a detekuje odchylky.

**Metodologie:**

Certificate usage anomaly detection: 1) Logging všech podpisových operací (timestamp, IP, document_type, certificate_id), 2) Profiling per certifikát: typical_hours, typical_IPs, typical_operations, frequency, 3) Anomaly scoring: Isolation Forest na feature vektoru [hour, IP_distance, operation_type, frequency_delta], 4) Alert při anomaly score > threshold (0.8), 5) OCSP responder check — certifikát nebyl revokován externně?

**Datové vstupy:**

- Podpisový log — timestamp, IP, certificate_id, document_type, result
- OCSP responder — http://ocsp.ica.cz — real-time revocation check
- CRL listy — I.CA, PostSignum — Certificate Revocation Lists
- IP geolocation — MaxMind GeoIP2 (lokace podpisu)
- Historický profil per certifikát (baseline 90D)

**Výstupní metriky:**

- Anomaly score per podpisová operace (0–1)
- Detekované anomálie per den/týden
- Typový breakdown anomálií (time/IP/frequency/operation)
- False positive rate (manuálně ověřené)
- Revokační alert (OCSP/CRL change)

#### ✅ Dobrý stav

**Standardní vzory**

Všechna použití certifikátů odpovídají normálnímu profilu. Podpisy: Po–Pá 8–17h, z kancelářských IP rozsahů, standardní dokumenty. Anomaly score < 0.3 u 100 % operací.

*Indikátory:*

- ✓ 0 anomálií za měsíc (threshold 0.8)
- ✓ Max anomaly score: 0.25
- ✓ 100 % operací v office hours a known IPs
- ✓ OCSP/CRL: 0 revokací

*Doporučené akce:*

1. Pokračovat v monitoringu
2. Updatovat baseline profily kvartálně
3. Testovat false positive threshold

#### ❌ Rizikový stav

**Certifikát použit v 3:00 ráno z neznámé IP**

Kvalifikovaný podpis klienta (I.CA, certifikát ID 45678) použit ve 3:00 z IP adresy v Rumunsku (mimo klientský rozsah) k podpisu neznámého dokumentu. Anomaly score: 0.97. Historicky: klient používá certifikát Po–Pá 9–16h z CZ IP.

*Indikátory:*

- ✗ Anomaly score: 0.97 (alarm > 0.8)
- ✗ Čas: 3:00 (profil: 9–16h)
- ✗ IP: Rumunsko (profil: CZ, 10.0.1.x rozsah)
- ✗ Dokument: neznámý typ (profil: DPH přiznání, faktury)

*Nápravná opatření:*

1. Okamžitě kontaktovat klienta — ověřit operaci
2. Pokud neautorizováno: revokovat certifikát (I.CA API)
3. Incident response: zjistit rozsah kompromitace
4. Ověřit všechny dokumenty podepsané tímto certifikátem za 7D

**Související analýzy:** 20-01, 20-03, 18-04, 23-15

---

### 20-06 — Klient mimo kontakt

**Zdroj:** cross-reference

| | |
|---|---|
| **Frekvence** | Denně (cross-reference check) |
| **Automatizace** | 80 % automatizováno |
| **Business impact** | Kritický — poslední záchrana před výpadkem |
| **Status** | Produkce |

**Popis:**

Cross-reference analýza: certifikáty blížící se k expiraci × komunikační status klienta. Nejkritičtější situace: certifikát expiruje za dny, ale klient neodpovídá na žádný kontaktní pokus. Systém kombinuje data z 20-01 (expirace) a 17-01 (engagement).

Tento scénář vyžaduje eskalační workflow mimo standardní kanály — osobní návštěva, kontaktování jiných osob v firmě, doporučený dopis. V extrémním případě: podání přes plnou moc (pokud existuje).

Systém automaticky detekuje tuto kombinaci a spouští emergency workflow.

**Metodologie:**

Cross-reference alert: 1) Join: certifikáty s expiry < 30D (z 20-01) × klienti s 0 komunikací > 14D (z 17-01), 2) Priority scoring: urgency = 1 / (days_to_expiry) × impact_weight, 3) Eskalační workflow: email → SMS → telefon → náhradní kontakt → osobní návštěva → plná moc fallback, 4) Tracking resolution per klient, 5) Post-mortem analýza příčin nedostupnosti.

**Datové vstupy:**

- Certifikátní databáze — expiry < 30D (z analýzy 20-01)
- Komunikační log — poslední kontakt per klient (email/telefon/portál)
- CRM — náhradní kontaktní osoby (účetní, spolumajitel, asistentka)
- Plné moci — existující platné plné moci per klient
- Eskalační historie — předchozí pokusy o kontakt a jejich výsledek

**Výstupní metriky:**

- Počet klientů v 'mimo kontakt + expiring' stavu
- Urgency score per klient
- Eskalační level per klient (1–5)
- Resolution rate (% vyřešených před expirací)
- Fallback actions executed (plná moc, náhradní kontakt)

#### ✅ Dobrý stav

**Komunikace aktivní**

Žádný klient s blížící se expirací není mimo kontakt. Všechny upomínky byly potvrzeny. Obnovy probíhají dle plánu.

*Indikátory:*

- ✓ 0 klientů v 'mimo kontakt + expiring' stavu
- ✓ 100 % upomínek potvrzeno
- ✓ Resolution rate: 100 %
- ✓ 0 emergency eskalací za kvartál

*Doporučené akce:*

1. Pokračovat v proaktivní komunikaci
2. Aktualizovat náhradní kontakty per klient
3. Ověřovat platnost plných mocí jednou ročně

#### ❌ Rizikový stav

**Certifikát za 7 dní, klient neodpovídá 3 týdny**

ELSTER certifikát pendlera expiruje za 7 dní. Klient neodpověděl na 4 emaily, 3 telefonáty a 1 SMS za 3 týdny. Deadline DE přiznání za 14 dní. Bez certifikátu: penále Finanzamt.

*Indikátory:*

- ✗ Certifikát: expiry za 7 dní (ELSTER)
- ✗ Kontaktní pokusy: 8 (0 odpovědí za 21 dní)
- ✗ DE deadline: 14 dní
- ✗ Penále risk: 0.25 % per měsíc z daně

*Nápravná opatření:*

1. Eskalace level 5: osobní návštěva (pokud adresa známá)
2. Kontaktovat náhradní osobu (manželka, spolumajitel)
3. Zkontrolovat: je klient v pořádku? (ISIR, media, nehoda?)
4. Připravit fallback: podání přes plnou moc (pokud platná)

**Související analýzy:** 20-01, 20-04, 17-01, 23-42

---

<a id="sekce-21"></a>

## Sekce 21: Virtuální CFO

### 21-01 — Real-time ziskovost

**Zdroj:** BI dashboard

| | |
|---|---|
| **Frekvence** | Real-time (kontinuálně) |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Kritický — finanční řízení klienta |
| **Status** | Produkce |

**Popis:**

Real-time monitoring ziskovosti klientské firmy na základě kontinuálního zpracování účetních dat. Systém poskytuje aktuální pohled na marži, zisk a rentabilitu bez nutnosti čekat na měsíční uzávěrku.

Virtuální CFO modul agreguje data z fakturace, bankovních výpisů, mzdového modulu a nákladového účetnictví do real-time dashboardu. Klient vidí svou aktuální finanční situaci kdykoliv.

Klíčovou funkcí je predikce — na základě aktuálního trendu systém predikuje ziskovost na 3/6/12 měsíců a proaktivně navrhuje opatření.

**Metodologie:**

Real-time agregace: 1) Průběžné zpracování transakcí z ERP, 2) Výpočet kumulativní marže a zisku, 3) Porovnání s plánem a historií, 4) Trend extrapolace, 5) Proaktivní alerting při negativním trendu.

**Datové vstupy:**

- Účetní data (průběžně aktualizovaná)
- Bankovní výpisy (denně)
- Mzdové náklady
- Rozpočet a plán
- Oborové benchmarky

**Výstupní metriky:**

- Aktuální marže (%)
- Kumulativní zisk/ztráta
- Trend (3/6/12 měsíců)
- Odchylka od plánu
- Benchmark vs. obor

#### ✅ Dobrý stav

**Zdravá a rostoucí ziskovost**

Marže dosahuje 28 % s rostoucím trendem. Klient je nad oborovým průměrem a plní plán na 112 %.

*Indikátory:*

- ✓ Marže 28 % (obor: 22 %)
- ✓ Trend rostoucí 6 měsíců
- ✓ Plán plněn na 112 %
- ✓ Likvidita dostatečná

*Doporučené akce:*

1. Připravit expanzní scénáře
2. Diskutovat investiční příležitosti
3. Optimalizovat daňovou strukturu

#### ❌ Rizikový stav

**Dramatický pokles ziskovosti**

Marže klesá z 24 % na 11 % za 6 měsíců. Hlavní příčiny: ztráta klíčového klienta, růst mzdových nákladů a neefektivní nákupní proces.

*Indikátory:*

- ✗ Marže 11 % (z 24 %)
- ✗ Trend klesající 6 měsíců
- ✗ 3 hlavní příčiny identifikovány
- ✗ Předpokládaná ztráta do Q3

*Nápravná opatření:*

1. Urgentní schůzka s jednatelem
2. Prezentovat analýzu příčin
3. Navrhnout krizový plán (cost cutting)
4. Restrukturalizovat nákladovou základnu

**Související analýzy:** 21-02, 21-03, 21-04, 2-01

---

### 21-02 — Predikce likvidity

**Zdroj:** model

| | |
|---|---|
| **Frekvence** | Denně (model prediction), real-time (bankovní data) |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Kritický — prevence platební neschopnosti |
| **Status** | Produkce |

**Popis:**

ML model predikující cash flow a likviditu klienta na horizontu 7/30/90 dní. Model integruje historické platební vzorce, sezónnost, otevřené pohledávky/závazky, plánované investice a makroekonomické faktory (kurzy, sazby).

Predikce likvidity je nejcennější službou Virtual CFO — dává klientovi čas reagovat. Propad likvidity predikovaný 30 dní předem umožňuje kontokorent, factoring nebo akceleraci inkasa. Propad predikovaný 3 dny předem je krize.

Model je trénovaný na historických cash flow datech a dosahuje MAE < 8 % na 30D horizontu.

**Metodologie:**

Cash flow prediction: 1) Feature engineering: historické CF (rolling 12M), sezónní profil, otevřené pohledávky (aging bucket), otevřené závazky (splatnost), smluvní platby (nájmy, leasingy, mzdy), FX exposure, 2) Model: XGBoost ensemble na denní granularitě, 3) Horizont: 7D (high confidence) / 30D (medium) / 90D (low, trend), 4) Alert thresholds: available_cash < 2× monthly_opex (warning), < 1× (critical), < 0 (emergency).

**Datové vstupy:**

- Bankovní výpisy — denní zůstatky a pohyby (FIO/KB/ČSOB API)
- Otevřené pohledávky — saldokonto z ERP (Money S3/Pohoda), aging buckets
- Otevřené závazky — splatné a budoucí (faktury, mzdy, nájmy, leasingy)
- Smluvní platby — pravidelné (mzdy 15., nájem 1., pojistné kvartálně)
- ČNB sazby a kurzovní lístek — dopad na úvěry a FX expozici

**Výstupní metriky:**

- Predicted cash position na 7D/30D/90D
- Confidence interval (95 %)
- Days to zero (pokud klesající trend)
- Hlavní rizikové faktory (which payables/receivables drive risk)
- Recommended actions (accelerate receivables / delay payables / credit line)

#### ✅ Dobrý stav

**Likvidita OK 90+ dní**

Model predikuje dostatečnou likviditu na 90+ dní. Cash position: 2.8M Kč (6× monthly opex). Žádné rizikové faktory. Trend: stabilní s mírným růstem.

*Indikátory:*

- ✓ Cash position 7D: 2.8M Kč (CI: 2.6–3.0M)
- ✓ Cash position 30D: 2.5M Kč (CI: 2.1–2.9M)
- ✓ Cash position 90D: 2.3M Kč (CI: 1.7–2.9M)
- ✓ Days to zero: N/A (vždy pozitivní)

*Doporučené akce:*

1. Informovat klienta: finanční zdraví excelentní
2. Diskutovat investiční příležitosti (přebytek likvidity)
3. Zvážit termínovaný vklad na přebytek (optimalizace výnosu)

#### ❌ Rizikový stav

**«Dojdou vám peníze za 3 týdny»**

Model predikuje negativní cash position za 21 dní. Příčina: velká splatná faktura (1.2M) + mzdy (800K) vs. nezaplacené pohledávky (2.1M po splatnosti). Days to zero: 21 (CI: 16–28 dní).

*Indikátory:*

- ✗ Days to zero: 21 dní (CI: 16–28)
- ✗ Kritická faktura: 1.2M splatná za 14D
- ✗ Mzdy: 800K splatné za 12D
- ✗ Pohledávky po splatnosti: 2.1M (nevymožené)

*Nápravná opatření:*

1. Urgentní schůzka s jednatelem — prezentovat predikci
2. Akce 1: aktivní inkaso pohledávek 2.1M (telefonát, urgence)
3. Akce 2: vyjednat odložení faktury 1.2M (dodavatel kontakt)
4. Akce 3: aktivovat kontokorentní úvěr (banka — předschválený?)

**Související analýzy:** 21-01, 21-03, 1-03, 1-04

---

### 21-03 — Automatická optimalizace

**Zdroj:** proaktivní AI

| | |
|---|---|
| **Frekvence** | Měsíčně (nová doporučení), kvartálně (review implementace) |
| **Automatizace** | 80 % automatizováno |
| **Business impact** | Vysoký — přímý finanční dopad pro klienty |
| **Status** | Produkce |

**Popis:**

Proaktivní AI engine generující automatická doporučení pro finanční optimalizaci klienta. Systém analyzuje účetní data, benchmarky a best practices a generuje konkrétní, akcionovatelné návrhy s kvantifikovaným dopadem.

Typy doporučení: daňová optimalizace (legální), cost reduction (identifikace plýtvání), revenue optimization (pricing, mix), working capital optimization (zkrácení DSO, prodloužení DPO), strukturální změny (právní forma, holdingová struktura).

Každé doporučení má: popis, kvantifikovaný benefit (Kč/rok), implementační effort, risk level a deadline.

**Metodologie:**

Rule-based + ML recommendation engine: 1) Rule-based layer: 50+ business rules (if DPPO sazba × obrat > threshold → zvážit s.r.o., if DSO > 45D → implementovat inkasní process...), 2) ML layer: anomaly detection na nákladech vs. peer benchmark (obor, velikost), 3) Prioritizace: benefit × feasibility × urgency, 4) Tracking implementace a actual vs. predicted benefit, 5) Feedback loop — úspěšná doporučení zvyšují váhu podobných.

**Datové vstupy:**

- Účetní data klienta (Money S3/Pohoda) — kompletní výsledovka a rozvaha
- Oborové benchmarky — ČSÚ NACE statistiky, Bisnode/Creditinfo databáze
- Daňové parametry — aktuální sazby, odpočty, slevy (MF ČR)
- Klientský profil — právní forma, obor, velikost, pendler status
- Historie doporučení — která byla implementována, jaký byl skutečný benefit

**Výstupní metriky:**

- Počet aktivních doporučení per klient
- Celkový potenciální benefit (Kč/rok)
- Implementation rate (% doporučení implementovaných)
- Actual vs. predicted benefit (validace modelu)
- Missed opportunity cost (ignorovaná doporučení × benefit)

#### ✅ Dobrý stav

**3 doporučení implementována — úspora 180K**

Za posledních 12 měsíců klient implementoval 3 ze 5 doporučení: 1) Přechod na paušální výdaje (úspora 80K na dani), 2) Změna dodavatele energií (úspora 60K), 3) Optimalizace mzdových příplatků (úspora 40K). Celkem: 180K/rok.

*Indikátory:*

- ✓ Implementation rate: 60 % (3/5)
- ✓ Actual benefit: 180K/rok
- ✓ Predicted benefit: 195K/rok (accuracy 92 %)
- ✓ 2 zbývající doporučení: zvažuje

*Doporučené akce:*

1. Prezentovat ROI — 'naše doporučení ušetřila 180K'
2. Followup na 2 neimplementovaná doporučení
3. Generovat nové doporučení na základě aktuálních dat
4. Využít success story pro marketing

#### ❌ Rizikový stav

**Klient ignoruje doporučení — přichází o 420K ročně**

5 doporučení za 12 měsíců — 0 implementováno. Klient reaguje: 'nemám čas', 'to je složité', 'příště'. Missed opportunity: 420K/rok. Klient si stěžuje na 'vysoké daně' — přitom odmítá legální optimalizaci.

*Indikátory:*

- ✗ Implementation rate: 0 % (0/5)
- ✗ Missed opportunity: 420K/rok
- ✗ 3 odmítnutí, 2 bez odpovědi
- ✗ Klient stěžuje na daně 2×/rok

*Nápravná opatření:*

1. Osobní schůzka — prezentovat celkový missed benefit
2. Zjednodušit doporučení — připravit implementaci za klienta
3. Nabídnout implementation-as-a-service (my to zařídíme)
4. Dokumentovat odmítnutí — ochrana kanceláře

**Související analýzy:** 21-01, 21-02, 21-04, 2-01

---

### 21-04 — Srovnání s oborem

**Zdroj:** benchmark

| | |
|---|---|
| **Frekvence** | Kvartálně (benchmark update) |
| **Automatizace** | 75 % automatizováno |
| **Business impact** | Vysoký — strategické řízení klienta |
| **Status** | Produkce |

**Popis:**

Benchmarkové srovnání finančních ukazatelů klienta s oborem (dle NACE kódu) a velikostní kategorií. Systém porovnává klíčové ratia: rentabilita, likvidita, zadluženost, aktivita (obrat aktiv, DSO, DPO) a produktivita (revenue per FTE).

Data pro benchmark pocházejí z Bisnode/Creditinfo databáze (agregované finanční výkazy CZ firem) a ČSÚ oborových statistik. Klient vidí svou pozici v percentilu — top 10 %, průměr, nebo spodních 10 %.

Srovnání motivuje klienty ke zlepšení — 'jste pod průměrem oboru v likviditě' je silnější argument než 'vaše likvidita je nízká'.

**Metodologie:**

Peer benchmark analysis: 1) Definice peer group: NACE L2 kód + velikostní kategorie (mikro/malá/střední dle EU definice), 2) Sběr benchmark dat: Bisnode/Creditinfo API — percentilové distribuce per KPI per peer group, 3) Výpočet klientských KPIs z účetních dat, 4) Positioning: percentil per KPI, 5) Gap analysis: kde je klient pod mediánem a kolik to 'stojí', 6) Radar chart vizualizace.

**Datové vstupy:**

- Účetní data klienta — výsledovka, rozvaha, CF výkaz
- Bisnode/Creditinfo API — oborové benchmarky (percentilové distribuce per NACE L2)
- ČSÚ — oborové statistiky (průměrné mzdy, produktivita per NACE)
- NACE kód klienta z ARES API
- EU velikostní kategorizace (mikro < 10 zaměstnanců, malá < 50, střední < 250)

**Výstupní metriky:**

- Percentilová pozice per KPI (rentabilita, likvidita, zadluženost, aktivita, produktivita)
- Celkový benchmark score (vážený průměr percentilů, 0–100)
- Top 3 silné stránky (kde je klient nad mediánem)
- Top 3 slabé stránky (kde je pod mediánem)
- Gap cost: kolik Kč by klient získal při dosažení mediánu

#### ✅ Dobrý stav

**Top 20 % v sektoru**

Klient je v top 20 % svého oboru (NACE 25 — výroba kovových konstrukcí). Silné stránky: produktivita (P85) a rentabilita (P82). Likvidita a zadluženost: nad mediánem. Celkový benchmark score: 79/100.

*Indikátory:*

- ✓ Benchmark score: 79/100 (top 20 %)
- ✓ Produktivita: P85 (revenue 3.2M/FTE vs. medián 2.1M)
- ✓ Rentabilita: P82 (ROE 18 % vs. medián 11 %)
- ✓ Likvidita: P65 (current ratio 1.8 vs. medián 1.4)

*Doporučené akce:*

1. Prezentovat výsledky jednateli — motivace + validace
2. Identifikovat zbývající prostor pro zlepšení (likvidita: z P65 na P80)
3. Využít benchmark pro strategické plánování
4. Nabídnout benchmark jako pravidelnou službu (kvartálně)

#### ❌ Rizikový stav

**Spodních 10 % — nutná restrukturalizace**

Klient je ve spodních 10 % oboru. Rentabilita: P8 (ROE 2 %, medián 11 %). Zadluženost: P92 risk (debt/equity 4.5, medián 1.2). Produktivita: P12. Celkový score: 15/100. Bez restrukturalizace: predikce insolvence 24M.

*Indikátory:*

- ✗ Benchmark score: 15/100 (spodních 10 %)
- ✗ ROE: 2 % (P8, medián 11 %)
- ✗ Debt/equity: 4.5 (P92 risk, medián 1.2)
- ✗ Revenue/FTE: 1.1M (P12, medián 2.1M)

*Nápravná opatření:*

1. Urgentní schůzka s jednatelem — prezentovat benchmark data
2. Navrhnout restrukturalizační plán (cost cutting, debt restructuring)
3. Priorita: snížení zadluženosti (refinancing, prodej nepotřebných aktiv)
4. Monitorovat měsíčně — zlepšuje se pozice?

**Související analýzy:** 21-01, 21-02, 21-03, 2-01

---

<a id="sekce-22"></a>

## Sekce 22: Prediktivní vrstva

### 22-01 — Kdy klient odejde

**Zdroj:** ML

| | |
|---|---|
| **Frekvence** | Denně |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Kritický — timing je klíčový pro úspěšnou retenci |
| **Status** | Produkce |

**Popis:**

Hlavní prediktivní model kombinující všechny dostupné signály do jedné predikce: kdy klient odejde. Model integruje data z komunikace, financí, behaviorálních signálů a externích zdrojů.

Na rozdíl od churn prediction (10-01), který predikuje pravděpodobnost, tento model predikuje timing — konkrétní období, kdy k odchodu s největší pravděpodobností dojde. To umožňuje přesné načasování intervence.

Model je validován na historických datech a dosahuje mediánové chyby 12 dní (predikovaný vs. skutečný odchod).

**Metodologie:**

Survival analysis (Cox proportional hazards) + deep learning: 1) Feature engineering z 200+ analýz, 2) Survival function per klient, 3) Hazard rate estimation, 4) Expected time to churn, 5) Confidence interval, 6) Optimal intervention window.

**Datové vstupy:**

- Výstupy všech ostatních analýz (200+)
- Historická data o odchodech
- Seasonality patterns
- External events calendar

**Výstupní metriky:**

- Predikovaný datum odchodu
- Confidence interval
- Hazard rate
- Optimal intervention window
- Expected retention probability s/bez intervence

#### ✅ Dobrý stav

**Klient zůstává**

Hazard rate blízko nule. Klient je stabilní, spokojený a loajální. Žádný prediktivní signál nenaznačuje odchod v horizontu 12 měsíců.

*Indikátory:*

- ✓ Hazard rate 0.02
- ✓ 0 % pravděpodobnost odchodu 12M
- ✓ Všechny signály pozitivní
- ✓ CLV rostoucí

*Doporučené akce:*

1. Investovat do vztahu
2. Nabídnout long-term smlouvu se slevou
3. Požádat o referenci

#### ❌ Rizikový stav

**Odchod za 60 dní**

Model predikuje 87 % pravděpodobnost odchodu v horizontu 60 dní (CI: 45–75 dní). Hlavní faktory: zmínka konkurence, propad sentimentu, zpomalení plateb.

*Indikátory:*

- ✗ 87 % pravděpodobnost odchodu
- ✗ Predikovaný čas: 60 dní (±15)
- ✗ 3 silné prediktory
- ✗ Revenue at risk: 480K/rok

*Nápravná opatření:*

1. Okamžitá intervence — osobní schůzka do 7 dní
2. Připravit retention nabídku
3. Identifikovat a adresovat root cause
4. Zapojit senior management

**Související analýzy:** 22-02, 22-03, 10-01, 7-01

---

### 22-02 — Co ho zachrání

**Zdroj:** uplift modeling

| | |
|---|---|
| **Frekvence** | Denně (model scoring), ad-hoc (per at-risk klient) |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Kritický — optimalizace retention investic |
| **Status** | Produkce |

**Popis:**

Uplift model predikující, jaká intervence má nejvyšší šanci zachránit ohrožený klientský vztah. Na rozdíl od standardního churn modelu (22-01), který predikuje KDY odejde, tento model predikuje CO pomůže.

Model porovnává treatment effect různých intervencí: osobní schůzka, cenová sleva, upgrade služby, změna account managera, executive engagement. Pro každého klienta predikuje uplift — o kolik se zvýší retention probability po dané intervenci.

Klíčové: model rozlišuje 'persuadable' klienty (intervence pomůže) od 'sure things' (zůstanou i bez intervence) a 'lost causes' (odejdou bez ohledu). Investujeme jen do persuadable.

**Metodologie:**

Uplift modeling (T-learner): 1) Training: historická data o intervencích a jejich výsledcích (klient zůstal/odešel po intervenci X), 2) T-learner: 2 modely — P(retain|treatment) a P(retain|no_treatment), uplift = P(T) − P(C), 3) Features: churn score (z 22-01), sentiment, tenure, revenue, reason_for_risk, 4) Treatment options: meeting, discount_5/10/15%, service_upgrade, AM_change, exec_engagement, 5) Output: ranked interventions per klient s expected uplift.

**Datové vstupy:**

- Churn model output (22-01) — aktuální churn probability per klient
- Historická data intervencí — typ, datum, výsledek (CRM activity log)
- Klientský profil — tenure, revenue, segment, psychografický profil (15-01)
- Sentiment timeline — aktuální a historický sentiment
- Cost per intervention (meeting: 2h × rate, discount: margin impact, ...)

**Výstupní metriky:**

- Ranked interventions per klient (intervention + expected uplift + cost)
- ROI per intervention (uplift × CLV ÷ intervention_cost)
- Klient klasifikace: Persuadable / Sure Thing / Lost Cause / Sleeping Dog
- Optimal intervention timing (kdy)
- Expected retention rate po intervenci

#### ✅ Dobrý stav

**Klient stabilní — nepotřeba**

Klient klasifikován jako 'Sure Thing' — churn probability < 5 %, uplift jakékoli intervence < 2 %. Klient je stabilní, spokojený, intervence by neměla přidanou hodnotu (a mohla by být kontraproduktivní — 'proč se ptáte?').

*Indikátory:*

- ✓ Klasifikace: Sure Thing
- ✓ Churn probability: 3 %
- ✓ Max uplift: 1.8 % (statisticky nevýznamný)
- ✓ Žádná intervence doporučena

*Doporučené akce:*

1. Neinvestovat retention budget — klient nepotřebuje záchranu
2. Pokračovat v běžné kvalitě služby
3. Zvážit upsell (klient je spokojený = příležitost)

#### ❌ Rizikový stav

**Osobní schůzka + sleva 10 % = 64 % šance na udržení**

Klient klasifikován jako 'Persuadable' — churn probability 75 %, ale intervence může dramaticky změnit výsledek. Top doporučení: 1) Osobní schůzka + sleva 10 % → uplift 39 %, retention 64 %. 2) Executive engagement → uplift 28 %, retention 53 %.

*Indikátory:*

- ✗ Klasifikace: Persuadable (highest ROI target)
- ✗ Churn probability: 75 % (bez intervence → 25 % retention)
- ✗ Intervention 1: meeting + 10% discount → 64 % retention (uplift +39pp)
- ✗ ROI: CLV 480K × 0.39 uplift ÷ 15K cost = 12.5× ROI

*Nápravná opatření:*

1. Implementovat doporučenou intervenci do 7 dní
2. Senior partner: osobní schůzka s jednatelem
3. Připravit nabídku: 10% sleva na 12M smlouvu
4. Monitorovat efekt intervence 90 dní (actual vs. predicted)

**Související analýzy:** 22-01, 22-03, 10-01, 15-01

---

### 22-03 — Optimální moment kontaktu

**Zdroj:** analýza

| | |
|---|---|
| **Frekvence** | Per kontakt (real-time doporučení), měsíčně (model retrain) |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Střední — efektivita komunikace a produktivita týmu |
| **Status** | Produkce |

**Popis:**

Predikce optimálního momentu pro kontaktování klienta — den v týdnu, hodina, kanál (email/telefon/meeting) a kontext (co sdělit). Model maximalizuje response rate a kvalitu interakce.

Každý klient má unikátní 'reachability profile' — někdo odpovídá nejlépe v úterý ráno, jiný ve čtvrtek odpoledne. Model se učí z historických response dat a průběžně se adaptuje.

Optimalizace timingu zvyšuje efektivitu celého týmu — méně nevyzvednutých hovorů, rychlejší odpovědi, produktivnější schůzky.

**Metodologie:**

Contact optimization: 1) Feature engineering: day_of_week, hour, channel, email_subject_type, prior_context, 2) Response model: P(response | features) — logistic regression per klient (nebo global model pro nové klienty), 3) Quality model: response_quality_score (quick + positive = high), 4) Optimization: maximize P(response) × quality subject to channel constraints, 5) A/B testing: random 20 % control group pro model validaci.

**Datové vstupy:**

- Email komunikace — sent timestamp, response timestamp (IMAP logs)
- Daktela CDR — call timestamp, duration, answered/missed, callback
- CRM — schůzky a jejich outcome (productive/neutral/negative)
- Klientský profil — timezone (CZ/DE), pracovní doba, device preference (17-04)
- Kalendář — svátky CZ/DE, dovolené klienta (pokud známy)

**Výstupní metriky:**

- Optimal contact window per klient (day × hour × channel)
- Predicted response rate per window
- Worst windows (avoid)
- A/B test lift (optimized vs. random timing)
- Average response time (optimized vs. baseline)

#### ✅ Dobrý stav

**Úterý 10:00 — response rate 89 %**

Model identifikoval optimální window: Úterý 10:00 ± 1h, kanál email, předmět typu 'Monthly update'. Historický response rate v tomto okně: 89 % (vs. 45 % random). Klient je v kanceláři, na desktopu, soustředěný.

*Indikátory:*

- ✓ Optimal window: Út 10:00 (email)
- ✓ Response rate: 89 % (vs. 45 % baseline)
- ✓ Average response time: 2.5h (vs. 18h baseline)
- ✓ A/B test lift: +44pp

*Doporučené akce:*

1. Plánovat důležitou komunikaci na Út 10:00
2. Automatizovat odesílání reportů na optimal window
3. Reservovat Út ráno pro klientskou komunikaci

#### ❌ Rizikový stav

**Pátek 16:00 — response rate 12 %**

Klient v pátek odpoledne prakticky nekomunikuje — response rate 12 %. Přesto 30 % naší komunikace odcházelo v pátek 15–17h (convenience bias — účetní dokončuje práci a odesílá). Model doporučuje přesunout vše na Út–Čt dopoledne.

*Indikátory:*

- ✗ Pá 16:00 response rate: 12 %
- ✗ 30 % komunikace odesíláno v tomto okně (suboptimální)
- ✗ Estimated lost responses: 15 per měsíc
- ✗ Potential improvement: +200 % response rate

*Nápravná opatření:*

1. Přenastavit automatické odesílání z Pá na Út–Čt
2. Informovat účetní o optimal windows per klient
3. Implementovat scheduled sending — píše kdykoli, odesílá optimálně
4. Monitorovat zlepšení response rate po změně

**Související analýzy:** 22-01, 22-02, 17-01, 17-04

---

### 22-04 — Cenová elasticita

**Zdroj:** historie

| | |
|---|---|
| **Frekvence** | Ročně (model retrain), ad-hoc (před pricing decision) |
| **Automatizace** | 75 % automatizováno |
| **Business impact** | Kritický — pricing strategie a revenue optimization |
| **Status** | Produkce |

**Popis:**

Odhad cenové elasticity per klient — jak reaguje na změny ceny služeb. Model predikuje pravděpodobnost odchodu jako funkci procentuálního navýšení ceny, a identifikuje 'breaking point' — maximální navýšení, které klient akceptuje.

Pro pricing strategii je to klíčové — u elastických klientů (citlivých na cenu) zvyšujeme opatrně a kompenzujeme hodnotou. U neelastických klientů (loajálních) můžeme navýšit bez rizika.

Model se trénuje na historických price increase events a jejich důsledcích (klient zůstal/odešel/vyjednal slevu).

**Metodologie:**

Price elasticity estimation: 1) Historická data: price_increase_pct, client_response (stayed/left/negotiated), time_since_increase, 2) Survival analysis: Cox PH model — P(churn | price_increase, client_features), 3) Elasticity curve per klient/segment: P(churn) = f(price_increase_pct), 4) Breaking point: P(churn) = 50 % → what price increase?, 5) Confidence interval — bootstrap na historických datech.

**Datové vstupy:**

- Historické cenové změny per klient — datum, % navýšení, absolutní částka
- Klientova reakce na cenovou změnu — akceptace/vyjednávání/odchod (CRM)
- Klientský profil — loyalty score (15-03), tenure, revenue, segment
- Competitor pricing intelligence (pokud dostupné)
- Smlouvy — fixní cena vs. variabilní, délka smlouvy

**Výstupní metriky:**

- Cenová elasticita per klient (0=neelastický, 1=vysoce elastický)
- Breaking point: max akceptovatelné navýšení (%)
- P(churn) per navýšení scenario (5%/10%/15%/20%)
- Expected revenue impact per pricing scenario
- Optimal price increase: max revenue × min churn risk

#### ✅ Dobrý stav

**Toleruje +20 % bez reakce**

Klient je neelastický (elasticita 0.05). Breaking point: +35 %. P(churn) při +20 %: 3 %. Klient oceňuje kvalitu a vztah — cena není primární faktor. Historicky 2 navýšení bez jakékoli reakce.

*Indikátory:*

- ✓ Elasticita: 0.05 (neelastický)
- ✓ Breaking point: +35 %
- ✓ P(churn) při +20 %: 3 %
- ✓ Historicky 2 navýšení (10 %, 12 %) — 0 reakce

*Doporučené akce:*

1. Bezpečné navýšení: až +20 % s minimálním rizikem
2. Navýšit cenu s transparentní komunikací o hodnotě
3. Nenavyšovat maximálně — udržet goodwill
4. Kompenzovat navýšení přidanou hodnotou (nová služba zdarma)

#### ❌ Rizikový stav

**Zlomový bod při +3 % — okamžitý odchod**

Klient je vysoce elastický (elasticita 0.85). Breaking point: +4 %. P(churn) při +5 %: 72 %. Klient aktivně porovnává ceny (15-03: oportunista, loyalty score 82). Jakékoli navýšení vyvolá porovnání s konkurencí.

*Indikátory:*

- ✗ Elasticita: 0.85 (vysoce elastický)
- ✗ Breaking point: +4 %
- ✗ P(churn) při +5 %: 72 %
- ✗ Historicky: vyjednal slevu 2× po navýšení

*Nápravná opatření:*

1. NENAVYŠOVAT cenu — nebo maximálně symbolicky (+2 %)
2. Investovat do lockin mechanismů (integrace, custom řešení)
3. Zvýšit vnímanou hodnotu (přidat službu bez navýšení ceny)
4. Zvážit: je klient profitabilní? Pokud ne, akceptovat odchod

**Související analýzy:** 22-01, 22-02, 15-03, 9-01

---

### 22-05 — Predikce akvizice/fúze

**Zdroj:** signály

| | |
|---|---|
| **Frekvence** | Měsíčně (model scoring), real-time (OR alert) |
| **Automatizace** | 70 % automatizováno |
| **Business impact** | Vysoký — příprava na ownership change |
| **Status** | Produkce |

**Popis:**

Multi-signal detektor pravděpodobnosti, že klient bude akvírován, fúzuje, nebo je prodáván. Akvizice/fúze je kritický moment — nový vlastník může změnit všechny dodavatele včetně účetní kanceláře.

Model agreguje signály z více zdrojů: OR změny (noví společníci), neobvyklé finanční vzorce (due diligence aktivity, clean-up účtů), strategické konzultace (klient se ptá na valuaci), pracovní inzeráty (M&A pozice u klienta), mediální zmínky.

Včasná detekce (6–12M před) umožňuje: budování vztahu s potenciálním acquirem, přípravu transition plánu, positioning jako partner (ne jen vendor).

**Metodologie:**

M&A signal detection: 1) OR monitoring — nový společník/jednatel z jiné firmy (ARES API), 2) Financial pattern detection — neobvyklé audit aktivity, asset revaluation, debt restructuring, 3) Communication signals — klíčová slova: 'due diligence', 'valuace', 'akvizice', 'prodej', 'investor' (NLP na emailech), 4) External signals — M&A news, pracovní inzeráty (CFO, M&A specialist), 5) Composite score: weighted sum of signals → P(M&A event in 12M).

**Datové vstupy:**

- ARES API — změny v OR (společníci, jednatelé, základní kapitál)
- Účetní data — neobvyklé vzorce (revaluace, čištění účtů, mimořádné odpisy)
- Email komunikace — NLP keyword detection (due diligence, valuace, investor)
- Pracovní inzeráty (19-03) — CFO, M&A, Corporate Development pozice
- Mediální zmínky (19-04) — M&A news per klient

**Výstupní metriky:**

- M&A probability score (0–100)
- Signál breakdown (which signals fired, confidence per signal)
- Predicted timeline (months to event)
- Impact assessment: co znamená M&A pro naši službu
- Recommended preparation actions

#### ✅ Dobrý stav

**Stabilní struktura**

M&A probability: 5 %. Žádné signály — stabilní vlastnická struktura 5+ let, žádné OR změny, žádné neobvyklé finanční vzorce, žádné relevantní keyword v komunikaci.

*Indikátory:*

- ✓ M&A probability: 5 % (low)
- ✓ 0 signálů fired
- ✓ Vlastnická struktura: stabilní 5+ let
- ✓ Žádné mediální zmínky o M&A

*Doporučené akce:*

1. Pokračovat v monitoringu
2. Budovat vztah s vlastníky (pojistka pro budoucnost)
3. Standardní kvartální review

#### ❌ Rizikový stav

**3 signály fúze — připravit transition plán**

M&A probability: 72 %. Signály: 1) OR: nový společník (investiční fond, 30 % podíl, zápis před 2M), 2) Accounting: due diligence přípravy (mimořádná inventura, revaluace aktiv), 3) Communication: jednatel zmínil 'strategického partnera' v emailu. Predicted timeline: 6–9M.

*Indikátory:*

- ✗ M&A probability: 72 %
- ✗ Signal 1: nový společník — investiční fond (OR, confidence 0.9)
- ✗ Signal 2: due diligence aktivity (accounting, confidence 0.7)
- ✗ Signal 3: keyword 'strategický partner' (communication, confidence 0.6)

*Nápravná opatření:*

1. Připravit transition plán — co se stane s naší službou po M&A
2. Identifikovat acquirera — má vlastní kancelář? Využije nás?
3. Positioning: stát se 'transition partner' (due diligence support)
4. Budovat vztah s novým společníkem — osobní schůzka

**Související analýzy:** 22-01, 19-01, 19-04, 13-06

---

<a id="sekce-23"></a>

## Sekce 23: Skryté signály — co tam je, ale nikoho nenapadne to hledat

### 23-01 — Čas přijetí->zaúčtování

**Zdroj:** DocuWare timestamps

| | |
|---|---|
| **Frekvence** | Denně |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Střední — procesní efektivita a spokojenost klienta |
| **Status** | Produkce |

**Popis:**

Měření doby od přijetí dokladu v DocuWare po jeho zaúčtování v ERP. Tento zdánlivě jednoduchý ukazatel odhaluje skryté vzorce — které klienty účetní odkládají, kde jsou procesní bottlenecky a kdo má problémy se zaúčtováním.

Data ukazují, že doba zpracování silně koreluje s kvalitou podkladů od klienta, složitostí jeho účetnictví a vztahem účetní–klient. Neobvykle dlouhá doba zpracování u konkrétního klienta signalizuje problém.

Systematické vyhodnocení tohoto ukazatele per účetní per klient odhaluje preference, předsudky i kompetence.

**Metodologie:**

Process mining: 1) Extrakce timestamps z DocuWare (přijetí) a ERP (zaúčtování), 2) Výpočet delta per doklad, 3) Agregace per klient × účetní, 4) Statistická analýza distribuce, 5) Outlier detection, 6) Korelace s kvalitou podkladů a složitostí.

**Datové vstupy:**

- DocuWare timestamps (přijetí, skenování)
- ERP timestamps (zaúčtování, schválení)
- Přiřazení účetní–klient
- Klasifikace typu dokladu
- Metadata dokladu (kvalita, jazyk, formát)

**Výstupní metriky:**

- Průměrná doba zpracování (celková, per klient, per účetní)
- Distribuce (median, P90, P99)
- Outliers per klient × účetní
- Trend v čase
- Korelace s kvalitou podkladů

#### ✅ Dobrý stav

**Efektivní zpracování**

Průměrná doba zpracování je 4 hodiny. Distribuce je rovnoměrná bez extrémních outlierů. Všichni účetní zpracovávají všechny klienty s podobnou rychlostí.

*Indikátory:*

- ✓ Průměr 4h, median 3.5h
- ✓ P90 < 8h
- ✓ Žádný outlier > 24h
- ✓ Rovnoměrné rozložení per účetní

*Doporučené akce:*

1. Monitorovat a udržovat
2. Použít jako benchmark pro nové účetní

#### ❌ Rizikový stav

**Systematické odkládání**

Klient X má průměrnou dobu zpracování 96h — 24× celkový průměr. Účetní A jeho doklady systematicky odkládá na konec fronty. Příčina: složité účetnictví + špatná komunikace.

*Indikátory:*

- ✗ 96h průměr u klienta X (norm: 4h)
- ✗ Účetní A zpracovává X vždy poslední
- ✗ Korelace s nízkou kvalitou podkladů
- ✗ Klient si stěžuje na rychlost

*Nápravná opatření:*

1. Proškolit účetní A na specifika klienta X
2. Zvážit přeřazení klienta na zkušenějšího
3. Komunikovat s klientem o kvalitě podkladů
4. Implementovat SLA s automatickou eskalací

**Související analýzy:** 23-02, 23-05, 11-09, 11-07

---

### 23-02 — Kolikrát faktura otevřena

**Zdroj:** DocuWare open log

| | |
|---|---|
| **Frekvence** | Denně |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Střední — efektivita zpracování a kvalita podkladů |
| **Status** | Produkce |

**Popis:**

Sledování počtu otevření každého dokumentu v DocuWare REST API. Neobvykle vysoký počet otevření konkrétní faktury signalizuje, že účetní má problém s jejím zaúčtováním — nejasný předmět plnění, chybějící údaje, neobvyklá struktura. Naopak doklady otevřené 0× po přijetí indikují, že je někdo systematicky přehlíží.

Data z DocuWare document view/open logů jsou agregovány per doklad per uživatel. Systém detekuje outliers (> 2σ od průměrného počtu otevření pro daný typ dokladu) a koreluje je s dobou zpracování a error rate.

Tato metrika je silným leading indikátorem problémů s kvalitou podkladů od klienta — pokud účetní opakovaně otevírá faktury jednoho klienta, pravděpodobně potřebuje lepší instrukce.

**Metodologie:**

DocuWare REST API — GET /Documents/{id}/History filtrovaný na event_type='View'. Agregace: count(views) per document_id per user_id. Statistická analýza: z-score per document_type. Outlier threshold: z > 2.0. Korelace s processing_time (Pearson r). Trend per client over 6M window.

**Datové vstupy:**

- DocuWare REST API — /Documents/{id}/History (view events)
- DocuWare document metadata (document_type, client_id, received_date)
- ERP processing timestamps (zaúčtování)
- User assignment table (účetní → klient)

**Výstupní metriky:**

- Průměrný počet otevření per doklad per klient
- Outlier doklady (> 2σ) — list s document_id a count
- Korelace otevření × processing_time (Pearson r)
- Trend per klient (zlepšuje/zhoršuje se kvalita podkladů)
- Top 5 klientů s nejvyšším avg view count

#### ✅ Dobrý stav

**Jasné doklady, 1-2 otevření**

Průměrný počet otevření je 1.3× per doklad. Žádné outliers. Účetní zpracovávají doklady efektivně bez opakovaného vracení se k nim.

*Indikátory:*

- ✓ Avg views per document: 1.3
- ✓ 0 outlier dokladů za měsíc
- ✓ Pearson r (views × time) < 0.2
- ✓ Trend stabilní

*Doporučené akce:*

1. Monitorovat a udržovat
2. Použít klienta jako benchmark pro kvalitu podkladů

#### ❌ Rizikový stav

**Účetní neví jak zaúčtovat — 12× otevřeno**

Faktura FV-2026-0847 od klienta X byla otevřena 12×. Účetní se k ní vracela 4 dny. Příčina: nejasný předmět plnění (generický popis 'služby'), chybí rozpad na položky.

*Indikátory:*

- ✗ 12 otevření jednoho dokladu (norm: 1.3)
- ✗ Processing time: 96h (norm: 4h)
- ✗ Klient X má avg 4.7 views/doc (portfolio avg: 1.3)
- ✗ 3 další faktury stejného klienta v outlier zóně

*Nápravná opatření:*

1. Kontaktovat klienta — požádat o detailnější popis plnění
2. Vytvořit šablonu pro zaúčtování typických dokladů klienta
3. Zvážit školení účetní na specifika daného oboru
4. Navrhnout klientovi standardizovaný formát faktur

**Související analýzy:** 23-01, 23-05, 11-09

---

### 23-03 — Přepínání oken

**Zdroj:** OS telemetrie

| | |
|---|---|
| **Frekvence** | Denně (opt-in) |
| **Automatizace** | 70 % automatizováno |
| **Business impact** | Nízký — volitelná optimalizace procesů |
| **Status** | Pilot |

**Popis:**

Volitelná analýza kontextového přepínání (window switching) na pracovní stanici účetní při zpracování konkrétního klienta. Vysoký počet přepnutí mezi aplikacemi (ERP, DocuWare, email, kalkulačka, legislativní portál) signalizuje kognitivní přetížení a složitost klienta.

Data jsou sbírána opt-in z OS telemetrie (focus change events) a korelována s aktuálně zpracovávaným klientem. Systém měří window switches per task session a porovnává s průměrem.

Metrika je silným indikátorem potřeby automatizace nebo zjednodušení procesu pro daného klienta.

**Metodologie:**

OS-level focus change event logging (opt-in). Mapování: session_id → client_id (z aktivního ERP kontextu). Metrika: window_switches_per_session. Statistika: distribuce per klient, z-score per session. Korelace s error_rate a processing_time.

**Datové vstupy:**

- OS telemetrie — focus change events (timestamp, window_title, app_name)
- ERP session context (active client_id)
- Processing task boundaries (session start/end)
- Error log (chyby při zpracování per session)

**Výstupní metriky:**

- Window switches per session per klient
- Distribuce per klient (mean, median, P90)
- Korelace switches × error_rate (Pearson r)
- Top 5 nejsložitějších klientů (by switches)
- Trend v čase (klesá s rostoucí zkušeností?)

#### ✅ Dobrý stav

**Nízká kognitivní zátěž — 3 přepnutí**

Účetní zpracovává klienta plynule — průměrně 3 přepnutí oken per session. Práce je rutinní, procesy zautomatizované.

*Indikátory:*

- ✓ Avg switches: 3 per session
- ✓ Error rate: 0.1 %
- ✓ Processing time v normě
- ✓ Žádné outlier sessions

*Doporučené akce:*

1. Monitorovat jako benchmark
2. Dokumentovat workflow pro knowledge transfer

#### ❌ Rizikový stav

**Kognitivní přetížení — 45 přepnutí**

Účetní při zpracování klienta Z přepíná 45× mezi okny. Koreluje s 3× vyšší chybovostí a 5× delší dobou zpracování. Indikátor potřeby zjednodušení procesu nebo automatizace.

*Indikátory:*

- ✗ 45 window switches per session (norm: 3)
- ✗ Error rate: 2.8 % (norm: 0.1 %)
- ✗ Processing time: 5× průměr
- ✗ Konzistentně vysoké přes 6 měsíců

*Nápravná opatření:*

1. Analyzovat workflow — kde jsou největší bottlenecky
2. Vytvořit integrated view (single pane of glass) pro klienta
3. Automatizovat opakující se kroky (RPA)
4. Zvážit přeřazení na zkušenějšího účetního

**Související analýzy:** 23-01, 23-05, 11-07

---

### 23-04 — Pořadí zpracování

**Zdroj:** queue log

| | |
|---|---|
| **Frekvence** | Denně |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Střední — kvalita služby a interní férovost |
| **Status** | Produkce |

**Popis:**

Analýza pořadí, v jakém účetní zpracovává klienty. Systém sleduje processing queue logs a detekuje systematické odchylky od FIFO principu. Pokud je klient konzistentně zpracováván jako poslední, signalizuje to negativní vztah účetní ke klientovi nebo složitost jeho agendy.

Data z DocuWare queue + ERP task logů jsou transformována na rank per den per účetní. Statistický test (Friedman) ověřuje, zda je pozice klienta v pořadí náhodná, nebo systematicky nízká/vysoká.

Odhalení systematického odkládání umožňuje intervenci — buď přeřazení, nebo dialog o příčinách.

**Metodologie:**

Queue mining: 1) Extrakce task_start timestamps per účetní per klient per den, 2) Výpočet rank (pořadí) per den, 3) Friedman test na signifikanci pozice, 4) Korelace rank × processing_quality, 5) Vizualizace heatmap (účetní × klient × avg rank).

**Datové vstupy:**

- DocuWare processing queue logs (task_id, user_id, client_id, start_time)
- ERP task completion logs
- Přiřazení účetní ↔ klient (assignment table)
- Processing quality metrics (error_rate per task)

**Výstupní metriky:**

- Průměrná pozice klienta v daily queue per účetní
- Friedman test p-value (je pozice systematická?)
- Korelace rank × error_rate
- Heatmap: účetní × klient × avg rank
- Klienti s konzistentně poslední pozicí

#### ✅ Dobrý stav

**FIFO zpracování — spravedlivé**

Pořadí zpracování odpovídá FIFO principu. Friedman test nevykazuje signifikantní odchylky. Všichni klienti mají rovnoměrnou pozici v queue.

*Indikátory:*

- ✓ Friedman p > 0.05 — bez systematické odchylky
- ✓ Avg rank variance per klient: nízká
- ✓ Žádný klient konzistentně poslední
- ✓ Error rate nezávisí na pozici

*Doporučené akce:*

1. Pokračovat v monitoringu
2. Pochválit rovnoměrný přístup

#### ❌ Rizikový stav

**Klient Y vždy poslední**

Klient Y je u účetní A konzistentně na poslední pozici v queue (avg rank 8.7 z 9 klientů) po dobu 4 měsíců. Friedman test p < 0.001. Processing quality u tohoto klienta je o 40 % horší (více chyb).

*Indikátory:*

- ✗ Avg rank 8.7/9 po 4 měsíce
- ✗ Friedman p < 0.001 — signifikantní bias
- ✗ Error rate u klienta Y: 3.2 % (avg 1.1 %)
- ✗ Processing time: 2.3× průměr

*Nápravná opatření:*

1. Dialog s účetní A — proč odkládá klienta Y?
2. Zvážit přeřazení klienta Y na jiného účetního
3. Implementovat automatickou rotaci pořadí
4. Nastavit SLA alert pokud rank > threshold po N dní

**Související analýzy:** 23-01, 23-05, 23-29

---

### 23-05 — Kdo první ráno

**Zdroj:** login × klient

| | |
|---|---|
| **Frekvence** | Denně |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Střední — interní efektivita a férovost |
| **Status** | Produkce |

**Popis:**

Analýza korelace mezi ranním login patternem účetních a volbou prvního zpracovávaného klienta. Systém sleduje VPN/SSO login timestamps a první task_start per den. Účetní přirozeně začínají s 'příjemnými' klienty — systematické vyhýbání se konkrétnímu klientovi na začátku dne je silný signál problematického vztahu.

Data z VPN/login logů (timestamp prvního přihlášení) a ERP task logů (první klient dne) jsou korelovány. Systém buduje first-client frequency matrix a detekuje anomálie.

Odhalení vzorců pomáhá managementu identifikovat skryté problémy v alokaci klientů.

**Metodologie:**

Login analysis: 1) VPN/SSO login event → first_login_time per user per day, 2) ERP task log → first_client_id per user per day, 3) Frequency matrix: user × client → count(first_client), 4) Chi-squared test na rovnoměrnost distribuce, 5) Correlation login_time × first_client choice.

**Datové vstupy:**

- VPN/SSO login logs (user_id, login_timestamp, IP)
- ERP task start logs (user_id, client_id, task_start_time)
- Přiřazení účetní ↔ klient (assignment table)
- Absence calendar (dovolená, nemoc)

**Výstupní metriky:**

- First-client frequency matrix (kdo koho zpracovává první)
- Chi-squared p-value per účetní (rovnoměrnost?)
- Klienti nikdy/zřídka zpracovaní jako první
- Korelace login_time × client_choice
- Trend v čase (mění se preference?)

#### ✅ Dobrý stav

**Rovnoměrné přidělení**

Účetní střídají klienty rovnoměrně jako první ranní úkol. Chi-squared test nevykazuje signifikantní odchylku. Žádný klient není systematicky vynecháván.

*Indikátory:*

- ✓ Chi-squared p > 0.05 per účetní
- ✓ Všichni klienti alespoň 1× first v posledním měsíci
- ✓ Žádný klient < 5 % first-frequency (při rovnoměrném rozložení)
- ✓ Stabilní vzorec v čase

*Doporučené akce:*

1. Pokračovat v monitoringu
2. Vyhodnotit pozitivní vliv na kvalitu služby

#### ❌ Rizikový stav

**Účetní A vždy odkládá klienta B**

Klient B nebyl za 3 měsíce ani jednou zpracován jako první (0/65 dní). Chi-squared p < 0.001. Ostatní klienti rovnoměrně. Koreluje s nižší kvalitou zpracování klienta B.

*Indikátory:*

- ✗ Klient B: 0× first za 3 měsíce
- ✗ Chi-squared p < 0.001
- ✗ Processing quality klienta B: −25 % vs. průměr
- ✗ Účetní A begins with client C 62 % of days

*Nápravná opatření:*

1. Dialog s účetní A — identifikovat příčinu
2. Zvážit redistribuci klientů
3. Implementovat random rotation systém
4. Sledovat dopad na kvalitu po intervenci

**Související analýzy:** 23-04, 23-29, 23-32

---

### 23-06 — Kdy vytištěn doklad

**Zdroj:** printer log

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 80 % automatizováno |
| **Business impact** | Střední — upsell příležitost + efektivita |
| **Status** | Produkce |

**Popis:**

Monitoring tiskových úloh z SNMP logů síťových tiskáren korelovaných s klientským kontextem. Vysoký počet tisků signalizuje, že klient nebo účetní stále pracuje papírově — příležitost pro digitalizaci a upsell.

Systém parsuje SNMP print job logs (tiskárna, uživatel, timestamp, počet stran) a koreluje s aktivním klientem v ERP. Agregace per klient per měsíc odhaluje digitalizační potenciál.

Tato metrika je cenná pro commercial team — klienti s vysokým tiskem jsou ideální kandidáti na digitalizační služby.

**Metodologie:**

SNMP polling tiskáren (OID: hrPrinterStatus, prtJobCount). Job log: user, timestamp, pages. Mapování na aktivního klienta z ERP session context. Agregace: total_pages per client per month. Trend analysis: linear regression. Benchmark: portfolio median.

**Datové vstupy:**

- Síťové tiskárny — SNMP job logs (user, timestamp, pages, printer_id)
- ERP session context (active client_id per user per timestamp)
- Digitalizační status klienta (paper/mixed/digital)
- DocuWare scan vs. print ratio

**Výstupní metriky:**

- Total pages printed per client per month
- Print trend (rostoucí/klesající/stabilní)
- Scan-to-print ratio per client
- Portfolio percentile (kolik % klientů tiskne méně)
- Estimated paper cost per client (CZK/month)

#### ✅ Dobrý stav

**Plně digitální — 0 tisků**

Za klienta nebylo za poslední 3 měsíce vytištěno nic. Veškerá komunikace a dokumentace je digitální. Klient je v top 10 % portfolia.

*Indikátory:*

- ✓ 0 stran za 3 měsíce
- ✓ Scan-to-print ratio: ∞ (only scans)
- ✓ Top 10 % digitalizace v portfoliu
- ✓ DocuWare adoption: 100 %

*Doporučené akce:*

1. Použít jako případovou studii pro ostatní klienty
2. Monitorovat — udržet standard

#### ❌ Rizikový stav

**Papírový středověk — 340 tisků/měsíc**

340 stran za měsíc. Účetní tiskne faktury, sestavy, výpisy. Klient vyžaduje papírové kopie. Estimated paper cost: 680 Kč/měsíc + čas účetní.

*Indikátory:*

- ✗ 340 stran/měsíc (portfolio median: 12)
- ✗ Trend: stabilní (bez zlepšení)
- ✗ Scan-to-print ratio: 0.2 (5× více tisků než skenů)
- ✗ Estimated cost: 680 Kč/měsíc + 4h čas účetní

*Nápravná opatření:*

1. Nabídnout digitalizační balíček (upsell příležitost)
2. Edukovat klienta o výhodách paperless
3. Navrhnout postupný přechod (hybrid → digital)
4. Kalkulovat ROI digitalizace pro klienta

**Související analýzy:** 23-52, 16-01, 16-02

---

### 23-07 — Tón pondělí vs. pátek

**Zdroj:** sentiment × čas

| | |
|---|---|
| **Frekvence** | Měsíčně (recalibrace) |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Střední — optimalizace komunikačního timingu |
| **Status** | Produkce |

**Popis:**

NLP sentiment analýza emailové komunikace bucketed per den v týdnu. Systém detekuje systematické rozdíly v emočním tónu zpráv v závislosti na dni — pondělní zprávy bývají stručnější a negativnější, páteční vstřícnější. Signifikantní rozdíl indikuje pracovní stres klienta.

Sentiment je měřen per zpráva (compound score −1 až +1) pomocí Czech NLP pipeline. Výsledky jsou agregovány per day_of_week per client a testovány Kruskal-Wallis testem na signifikanci rozdílu.

Praktické využití: timing komunikace. Důležité zprávy posílat v dny s pozitivním sentimentem klienta.

**Metodologie:**

NLP pipeline: 1) Email parsing (From, Date, Body), 2) Czech sentiment analysis (BERT-based classifier, compound score), 3) Bucketing per day_of_week, 4) Kruskal-Wallis test na rozdíl sentimentu mezi dny, 5) Post-hoc Dunn test pro pairwise comparison, 6) Effect size (eta²).

**Datové vstupy:**

- Email corpus per klient (From, Date header, Body text)
- Czech NLP sentiment model (fine-tuned BERT)
- Calendar context (svátky, dovolené — pro filtraci)
- Daktela call transcripts (optional — doplňkový sentiment)

**Výstupní metriky:**

- Sentiment per day_of_week per client (mean, CI)
- Kruskal-Wallis H-statistic a p-value
- Best day / worst day per client
- Effect size (eta²) — jak silný je rozdíl
- Doporučený den pro důležitou komunikaci

#### ✅ Dobrý stav

**Konzistentní tón celý týden**

Kruskal-Wallis p > 0.3 — sentiment klienta je konzistentní bez ohledu na den. Žádný systematický vzorec stresu. Komunikace je kdykoli vhodná.

*Indikátory:*

- ✓ Kruskal-Wallis p > 0.3
- ✓ Eta² < 0.01 — zanedbatelný efekt
- ✓ Mean sentiment: 0.45 ± 0.12 (pozitivní)
- ✓ Variabilita per day < 10 %

*Doporučené akce:*

1. Komunikovat v jakýkoli den
2. Monitorovat kvartálně pro změny

#### ❌ Rizikový stav

**Pondělní negativita**

Signifikantní rozdíl: pondělní sentiment 0.12, páteční 0.58 (p < 0.01). Klient je v pondělí stručný, negativní, pomalý v odpovědích. Pátek je jeho nejlepší den.

*Indikátory:*

- ✗ Kruskal-Wallis p < 0.01
- ✗ Eta² = 0.15 — střední efekt
- ✗ Monday sentiment: 0.12 vs. Friday: 0.58
- ✗ Monday response time: 48h vs. Friday: 4h

*Nápravná opatření:*

1. Důležitou komunikaci plánovat na čtvrtek/pátek
2. V pondělí posílat pouze rutinní záležitosti
3. Nabídky a ceníky posílat v pozitivní dny
4. Informovat account managera o optimálním timingu

**Související analýzy:** 15-01, 17-01, 22-03

---

### 23-08 — Délka pozdravů

**Zdroj:** textová analýza

| | |
|---|---|
| **Frekvence** | Týdně |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Nízký — early warning indikátor |
| **Status** | Produkce |

**Popis:**

Tracking evoluce úvodních a závěrečných formulí v emailech klienta. Systém parsuje greeting/salutation z emailového body a klasifikuje formálnost na škále 1-5 (1 = neformální 'Ahoj', 5 = 'Vážený pane inženýre'). Změna formálnosti v čase signalizuje posun ve vztahu.

Náhlý pokles formálnosti (z 'Vážený' na 'Ahoj' za 2 týdny) může znamenat buď budování důvěry, nebo ztrátu respektu. Kontext rozhoduje — systém koreluje s dalšími signály (sentiment, payment behavior).

Graduální pokles formálnosti přes měsíce je normální a pozitivní. Skokový pokles je red flag.

**Metodologie:**

Regex extraction: greeting patterns (Vážený|Dobrý den|Ahoj|Hi|Dear...). Formality score: rule-based classifier (5-point scale). Time series: formality_score per email per client. Change detection: CUSUM algorithm for shift detection. Context enrichment: korelace s sentiment a payment data.

**Datové vstupy:**

- Email corpus — first 5 lines (greeting extraction)
- Email corpus — last 5 lines (salutation extraction)
- Client relationship metadata (tenure, contract type)
- Sentiment scores (for context correlation)

**Výstupní metriky:**

- Current formality score per client (1-5 scale)
- Formality trend (slope per month)
- Change points detected (CUSUM)
- Korelace formality × sentiment × payment
- Anomálie (sudden drop > 2 points)

#### ✅ Dobrý stav

**Stabilní formální komunikace**

Formality score je stabilní na úrovni 4.0 (Dobrý den pane/paní) po celou dobu spolupráce. Konzistentní a profesionální komunikace.

*Indikátory:*

- ✓ Formality score: 4.0 ± 0.3 (stabilní)
- ✓ Trend: 0 (flat)
- ✓ 0 change points za 12M
- ✓ Consistent across all contacts

*Doporučené akce:*

1. Udržovat formální tón z naší strany
2. Monitorovat kvartálně

#### ❌ Rizikový stav

**Prudký pokles formálnosti**

Formality score spadl z 4.5 na 1.5 za 3 týdny. CUSUM detekoval change point 15.3.2026. Koreluje s pozdní platbou naší faktury (−14 dní) a negativním sentimentem. Interpretace: ztráta respektu, ne budování důvěry.

*Indikátory:*

- ✗ Score drop: 4.5 → 1.5 za 3 týdny
- ✗ CUSUM change point: 15.3.2026
- ✗ Korelace s payment delay (r = −0.72)
- ✗ Sentiment současně klesá

*Nápravná opatření:*

1. Upozornit account managera na shift v komunikaci
2. Proaktivní osobní kontakt — zjistit co se stalo
3. Zkontrolovat kvalitu naší služby za poslední měsíc
4. Aktivovat retention protokol pokud koreluje s dalšími signály

**Související analýzy:** 23-10, 23-07, 15-01

---

### 23-09 — Smajlíky

**Zdroj:** emotikon tracking

| | |
|---|---|
| **Frekvence** | Týdně |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Nízký — early warning indikátor vztahu |
| **Status** | Produkce |

**Popis:**

Regex-based detekce emotikon a emoji v emailové komunikaci klienta. Sledování frekvence a typů emotikonů v čase jako proxy indikátor emocionálního angažmá. Náhlé vymizení emotikonů (dříve používal, teď ne) je přesný marker změny postoje.

Systém detekuje Unicode emoji (\\p{Emoji}) i text-based emoticons (:-), :), ;-) etc.) per email per klient. Frekvence je normalizována na emoji per 100 words. Change point detection identifikuje přesné datum změny.

Toto je jeden z nejpřesnějších behavioral markers — lidé přestanou používat emoji ve chvíli, kdy se vztah ochladí, často dny před jakýmkoli explicitním signálem.

**Metodologie:**

Regex detection: 1) Unicode emoji range (\\p{Emoji_Presentation}), 2) Text emoticons pattern (:-?[)(/|DS>]|[;8B][-]?[)(/|DS>]|<3|xD), 3) Normalization: count per 100 words, 4) Time series per client, 5) PELT change point detection, 6) Korelace s sentiment a formality scores.

**Datové vstupy:**

- Email body text per klient (full corpus)
- Timestamp per email
- Word count per email (for normalization)
- Sentiment score per email (for correlation)

**Výstupní metriky:**

- Emoji frequency per 100 words per client
- Emoji type distribution (positive, negative, neutral)
- Change points detected (PELT algorithm)
- Date of last emoji used per client
- Correlation emoji_freq × sentiment (Spearman ρ)

#### ✅ Dobrý stav

**Konzistentní použití emotikonů**

Klient konzistentně používá 2-3 emoji per email (mostly 🙂 a 👍). Stabilní vzorec po 18 měsíců. Pozitivní vztah indikátor.

*Indikátory:*

- ✓ Avg 2.5 emoji per email (stable)
- ✓ 0 change points za 18M
- ✓ Predominantly positive emoji (87 %)
- ✓ Korelace se sentimentem: ρ = 0.65

*Doporučené akce:*

1. Reciprokovat — používat emoji v odpovědích
2. Monitorovat pro případnou změnu

#### ❌ Rizikový stav

**Přestal používat emoji 15.2.**

PELT detekoval change point 15.2.2026. Klient, který 14 měsíců konzistentně používal emoji (avg 3.1/email), náhle přestal (0/email od 15.2.). Koreluje s eskalací ohledně chybné daňové kalkulace 14.2.

*Indikátory:*

- ✗ PELT change point: 15.2.2026 (confidence > 0.99)
- ✗ Before: 3.1 emoji/email, After: 0.0 emoji/email
- ✗ Korelace s incidentem: chybná kalkulace 14.2.
- ✗ Sentiment simultánně poklesl o 0.4 bodu

*Nápravná opatření:*

1. Identifikovat příčinu — incident z 14.2.
2. Proaktivně adresovat problém (omluvit se, napravit)
3. Sledovat návrat emoji jako indikátor usmíření
4. Zapsat do CRM jako relationship warning

**Související analýzy:** 23-08, 23-10, 23-07, 15-01

---

### 23-10 — Vykání/tykání

**Zdroj:** analýza

| | |
|---|---|
| **Frekvence** | Týdně |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Nízký — relationship quality indikátor |
| **Status** | Produkce |

**Popis:**

Formality classifier rozlišující Vy/ty formy v české emailové komunikaci. V českém kontextu je přechod z vykání na tykání signifikantní sociální marker — může signalizovat budování důvěry (pozitivní) nebo ztrátu respektu (negativní). Kontext rozhoduje.

Systém parsuje morfologické tvary (Vy/Vám/Vás vs. ty/tobě/tebe + slovesné koncovky) a klasifikuje každý email. Změna je korelována s dalšími signály pro interpretaci.

V kombinaci s formality score a sentimentem vytváří kompletní obraz komunikačního vztahu.

**Metodologie:**

Czech morphological analysis: 1) Tokenization, 2) POS tagging, 3) Vy-form detection (Vy, Vám, Vás, Váš, Vaše + verb 2nd person plural), 4) Ty-form detection (ty, tobě, tebe, tvůj, tvá + verb 2nd person singular), 5) Classification: formal/informal/mixed, 6) Time series tracking, 7) Context enrichment from sentiment + formality.

**Datové vstupy:**

- Email body text per klient
- Czech morphological analyzer (MorphoDiTa/UDPipe)
- Sentiment score per email
- Formality score per email (23-08)
- Client relationship tenure

**Výstupní metriky:**

- Vy/ty classification per email
- Transition date (pokud nastala změna)
- Direction: formalizace / informalizace
- Context score: positive transition / negative transition
- Historical pattern per client

#### ✅ Dobrý stav

**Konzistentní vykání**

Klient konzistentně vyká po celou dobu spolupráce (3+ roky). Profesionální, respektful komunikace bez změn.

*Indikátory:*

- ✓ 100 % Vy-form za celé období
- ✓ Formality score: stable 4+
- ✓ Sentiment: pozitivní a stabilní
- ✓ Konzistentní across all kontaktní osoby

*Doporučené akce:*

1. Udržovat vykání recipročně
2. Monitorovat pro případnou změnu

#### ❌ Rizikový stav

**Přechod na tykání — ambivalentní signál**

Klient přešel z vykání na tykání 20.3.2026. Sentiment klesá (−0.3), formality score klesá (4→2). Interpretace: negativní posun — spíše ztráta respektu než budování důvěry.

*Indikátory:*

- ✗ Transition: Vy → ty od 20.3.2026
- ✗ Concurrent sentiment drop: −0.3
- ✗ Concurrent formality drop: 4 → 2
- ✗ Context: po nedodržení termínu z naší strany

*Nápravná opatření:*

1. Vyhodnotit kontext — co předcházelo
2. Pokud negativní: proaktivně adresovat problém
3. Pokud pozitivní: reciprokovat (nabídnout tykání)
4. Sledovat další vývoj komunikace

**Související analýzy:** 23-08, 23-09, 15-01

---

### 23-11 — Křestní jméno v předmětu

**Zdroj:** email metadata

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Nízký — relationship personalization indikátor |
| **Status** | Produkce |

**Popis:**

Detekce přítomnosti křestního jména (klienta nebo naší kontaktní osoby) v Subject headeru emailů. Použití jména v předmětu signalizuje osobní vztah — klient cílí zprávu konkrétní osobě, ne 'kanceláři'. Absence jména při dřívějším používání signalizuje depersonalizaci.

Systém porovnává Subject header s databází kontaktních osob (CRM). Sleduje frekvenci per klient over time a detekuje změny.

**Metodologie:**

Subject header parsing: 1) Extrakce Subject z email headers, 2) Name matching against CRM contact list (first_name), 3) Boolean per email: name_present yes/no, 4) Frequency: percentage of emails with name in subject per client per month, 5) Trend analysis and change detection.

**Datové vstupy:**

- Email Subject headers per klient
- CRM contact database (first_name, last_name per contact)
- Account manager ↔ client mapping

**Výstupní metriky:**

- % emails with name in subject per client
- Trend v čase (increasing/decreasing)
- Change point detection (sudden drop)
- Comparison: name-usage per client vs. portfolio avg

#### ✅ Dobrý stav

**Osobní vztah — jméno v předmětu**

Klient adresuje 73 % emailů jménem ('Petro, prosím o...', 'Jano, dotaz k...'). Osobní vztah s konkrétním účetním. Stabilní vzorec.

*Indikátory:*

- ✓ 73 % emails s jménem v předmětu
- ✓ Trend: stabilní
- ✓ Adresuje konkrétní osobu — silná vazba
- ✓ Koreluje s vysokým sentimentem

*Doporučené akce:*

1. Zajistit kontinuitu — při změně účetního řádně předat
2. Využít silnou vazbu pro upsell

#### ❌ Rizikový stav

**Formální distance — bez jména**

Klient přestal používat jméno v předmětu (dříve 65 %, nyní 5 %). Signalizuje depersonalizaci vztahu. Koreluje s obecnými předměty ('Faktura', 'Dotaz').

*Indikátory:*

- ✗ Name frequency drop: 65 % → 5 % za 2 měsíce
- ✗ Předměty se staly generickými
- ✗ Koreluje se změnou kontaktní osoby na straně klienta
- ✗ Sentiment mírně klesá

*Nápravná opatření:*

1. Proaktivní osobní kontakt — znovu navázat vztah
2. Představit se nové kontaktní osobě
3. Nabídnout osobní schůzku

**Související analýzy:** 23-08, 23-10, 18-01

---

### 23-12 — Pravopisné chyby

**Zdroj:** text analýza

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Nízký — wellbeing indikátor klienta |
| **Status** | Produkce |

**Popis:**

Spell-check error rate měření v emailech klienta pomocí Czech spell-check engine (Hunspell s cs_CZ dictionary). Rostoucí počet pravopisných chyb v čase signalizuje stres, únavu nebo jiné problémy na straně klienta. Stabilně nízká chybovost indikuje pečlivost.

Systém normalizuje error rate na chyby per 100 slov a sleduje trend. Náhlý nárůst (dříve 0.5 % → nyní 4 %) je red flag. Korelace s dalšími ukazateli (sentiment, response time, emoji) vytváří kompletní obraz.

**Metodologie:**

Hunspell cs_CZ spell-check: 1) Email body tokenization, 2) Spell-check each token, 3) Error rate = misspelled / total_words × 100, 4) Exclude proper nouns, technical terms, abbreviations, 5) Time series per client, 6) Trend analysis (linear regression), 7) Change point detection.

**Datové vstupy:**

- Email body text per klient
- Hunspell cs_CZ dictionary + custom accounting terms
- Client name/company exclusion list
- Technical term whitelist (DPH, DPPO, DPFO, KH...)

**Výstupní metriky:**

- Error rate per 100 words per client per month
- Trend slope (increasing = concern)
- Change points (sudden increase)
- Korelace error_rate × sentiment × response_time
- Comparison vs. client's historical baseline

#### ✅ Dobrý stav

**Nulová chybovost — pečlivý klient**

Error rate stabilně 0.2 % (1 chyba na 500 slov). Klient píše pečlivě, kontroluje zprávy. Koreluje s kvalitními podklady a včasnými platbami.

*Indikátory:*

- ✓ Error rate: 0.2 % (stable 24M)
- ✓ Trend: flat
- ✓ Korelace s kvalitou podkladů: positive
- ✓ Korelace s platební morálkou: positive

*Doporučené akce:*

1. Monitorovat pro změnu
2. Klient je nízké riziko — standard service

#### ❌ Rizikový stav

**Rostoucí chybovost — stress signál**

Error rate vzrostl z 0.5 % na 4.2 % za 6 týdnů. Koreluje s kratšími emaily, horším sentimentem a pozdějšími odpověďmi. Klient je pod tlakem.

*Indikátory:*

- ✗ Error rate: 0.5 % → 4.2 % za 6 týdnů
- ✗ Korelace se zkrácením emailů (avg words −60 %)
- ✗ Sentiment: −0.3 bodu za stejné období
- ✗ Response time: 4h → 36h

*Nápravná opatření:*

1. Nabídnout pomoc — 'vnímáme, že jste pod tlakem'
2. Být proaktivnější s informacemi (snížit zátěž klienta)
3. Zkontrolovat kvalitu podkladů — pravděpodobně klesne
4. Alert pro account managera

**Související analýzy:** 23-08, 23-13, 15-01

---

### 23-13 — CAPS LOCK

**Zdroj:** frustrace heatmap

| | |
|---|---|
| **Frekvence** | Real-time (per email) |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Vysoký — okamžitý indikátor klientské krize |
| **Status** | Produkce |

**Popis:**

Detekce a kvantifikace CAPS LOCK použití v emailech klienta. Nadměrné psaní VELKÝMI PÍSMENY je univerzální digitální indikátor frustrace a agrese. Systém měří procento slov v CAPS per email (exkluzí akronymů a standardních zkratek).

Metrika je binární na email level (contains_caps_shouting: yes/no) a continuous per word (caps_percentage). Threshold: > 15 % slov v CAPS v emailu = 'shouting detected'.

I jeden email v CAPS je významný signál — vyžaduje okamžitou pozornost a deeskalaci.

**Metodologie:**

CAPS detection: 1) Tokenize email body, 2) Filter out known acronyms (DPH, IČO, DIČ, DPFO, DPPO, KH, SH, ČNB, EUR, CZK...), 3) Calculate caps_ratio = uppercase_words / total_words, 4) Threshold: caps_ratio > 0.15 = shouting, 5) Aggregate per client over time, 6) Alert on any single caps_shouting email.

**Datové vstupy:**

- Email body text per klient
- Czech/accounting acronym whitelist
- Historical caps_ratio per client (baseline)
- Context: subject line + previous thread

**Výstupní metriky:**

- Caps ratio per email per client
- Number of 'shouting' emails per month
- Client caps_ratio vs. portfolio baseline
- Trending: increasing caps usage
- Trigger context (what caused the frustration)

#### ✅ Dobrý stav

**Nulové CAPS — klidná komunikace**

Klient nepoužívá CAPS (caps_ratio < 2 % = jen akronymy). Klidná, profesionální komunikace bez známek frustrace.

*Indikátory:*

- ✓ Caps ratio: 1.5 % (pouze akronymy)
- ✓ 0 shouting emails za 12M
- ✓ Sentiment: pozitivní
- ✓ Stabilní komunikační vzorec

*Doporučené akce:*

1. Monitorovat jako standard
2. Alert na první CAPS email

#### ❌ Rizikový stav

**3 emaily v CAPS — akutní frustrace**

Klient poslal 3 emaily za týden s caps_ratio > 40 %. Kontext: opakovaná chyba v daňovém přiznání. 'PROSÍM OPRAVTE TO KONEČNĚ' — vyžaduje okamžitou eskalaci.

*Indikátory:*

- ✗ 3 emails s caps_ratio > 40 % za 7 dní
- ✗ Historický caps_ratio: 1.5 % (100× nárůst)
- ✗ Kontext: opakovaná chyba v DPPO
- ✗ Sentiment: silně negativní (−0.8)

*Nápravná opatření:*

1. Okamžitá eskalace na senior partnera
2. Osobní telefonát do 2 hodin
3. Připravit kompletní nápravu + omluvu
4. Nabídnout kompenzaci (sleva, extra service)

**Související analýzy:** 23-07, 23-12, 15-04

---

### 23-14 — Font faktur

**Zdroj:** vizuální analýza PDF

| | |
|---|---|
| **Frekvence** | Per faktura (real-time) |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Střední — early detection reorganizace klienta |
| **Status** | Produkce |

**Popis:**

Extrakce font metadata z PDF faktur pomocí pdfplumber/PyMuPDF. Změna fontu v fakturách signalizuje změnu fakturačního software na straně klienta — což často koreluje s organizační změnou (nový účetní, nový ERP, nový management).

Systém extrahuje font_name a font_size z každé PDF faktury, buduje profil per klient a detekuje change points. Změna fontu je jeden z nejspolehlivějších machine-readable indikátorů reorganizace.

Doplňkově systém detekuje i layout changes (pozice loga, struktura tabulky) pomocí bounding box analýzy.

**Metodologie:**

PDF analysis: 1) pdfplumber.open(pdf) → page.chars → font_name, font_size, 2) Dominant font extraction (mode of font_name), 3) Per-client font profile (expected font_name, font_size), 4) Change detection: new font_name != historical font_name, 5) Layout change: bounding box comparison for key elements (logo, table, totals).

**Datové vstupy:**

- PDF faktury per klient (DocuWare REST API → download)
- pdfplumber / PyMuPDF font extraction
- Historical font profile per client
- Layout template per client (bounding boxes)

**Výstupní metriky:**

- Current dominant font per client
- Font change detected (boolean + date)
- Layout change detected (boolean + date)
- Software inference (font → probable software mapping)
- Change frequency (how often client changes layout)

#### ✅ Dobrý stav

**Konzistentní branding**

Klient používá stejný font (Calibri 10pt) a layout ve fakturách po celou dobu spolupráce. Stabilní ERP, stabilní procesy.

*Indikátory:*

- ✓ Font: Calibri 10pt (stable 36M)
- ✓ Layout: unchanged
- ✓ Software inference: Money S3 (consistent)
- ✓ 0 changes detected

*Doporučené akce:*

1. Standard monitoring
2. Font profile aktuální

#### ❌ Rizikový stav

**Změna fontu — nový software**

Od faktury FV-2026-0300 (1.3.2026) změna fontu z Calibri 10pt na Arial 9pt. Layout zcela jiný. Inference: přechod z Money S3 na Pohoda. Signalizuje reorganizaci — nový účetní/management.

*Indikátory:*

- ✗ Font change: Calibri → Arial od 1.3.2026
- ✗ Layout change: complete restructure
- ✗ Software inference: Money S3 → Pohoda
- ✗ Koreluje se změnou kontaktní osoby

*Nápravná opatření:*

1. Proaktivně kontaktovat — 'všimli jsme si změny, potřebujete pomoc?'
2. Nabídnout podporu při migraci na nový systém
3. Aktualizovat zaúčtovací šablony
4. Představit se novému účetnímu/managementu

**Související analýzy:** 23-16, 23-17, 18-01

---

### 23-15 — Hodina vystavení

**Zdroj:** timestamps

| | |
|---|---|
| **Frekvence** | Týdně |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Střední — wellbeing a finanční zdraví klienta |
| **Status** | Produkce |

**Popis:**

Analýza creation timestamps faktur a dalších dokladů klienta. Doklady vystavené mimo pracovní dobu (víkendy, noci) signalizují buď workoholismus jednatele, krizovou situaci, nebo nestandardní provoz. Systém parsuje timestamps z PDF metadata (CreationDate) a z účetního software.

Distribuce vystavení per hour-of-day a day-of-week vytváří 'working pattern' klienta. Anomálie (sobota 2:00 AM) jsou flagovány a korelovány s dalšími signály.

Pro klienty s nočním/víkendovým vzorcem může být relevantní přizpůsobit timing komunikace.

**Metodologie:**

Timestamp analysis: 1) PDF CreationDate extraction (pdfplumber metadata), 2) ERP document timestamps (invoice created_at), 3) Hour-of-day + day-of-week bucketing, 4) Heatmap construction (7×24 matrix), 5) Off-hours ratio: docs_outside_business / total_docs, 6) Anomaly detection: sudden shift to off-hours, 7) Korelace s business health indicators.

**Datové vstupy:**

- PDF metadata — CreationDate (pdfplumber/PyMuPDF)
- ERP document timestamps (Money S3 / Pohoda API export)
- Business hours definition per client (default: Po-Pá 8-18)
- Calendar (svátky, dovolené)

**Výstupní metriky:**

- Working pattern heatmap (7×24 matrix)
- Off-hours ratio (%)
- Peak working hours per client
- Anomálie (sudden shift to nights/weekends)
- Trend v off-hours ratio (increasing = concern)

#### ✅ Dobrý stav

**Standardní pracovní doba**

95 % dokladů vystaveno Po-Pá 9-17. Klient má standardní provoz. Off-hours ratio: 5 % (občasné páteční podvečery).

*Indikátory:*

- ✓ Off-hours ratio: 5 %
- ✓ Peak: úterý-čtvrtek 10-14
- ✓ 0 víkendových dokladů
- ✓ Stabilní pattern 12M

*Doporučené akce:*

1. Standard monitoring
2. Komunikovat v peak hours klienta

#### ❌ Rizikový stav

**Noční/víkendová aktivita — workaholik nebo krize**

Od Q1 2026 nárůst off-hours ratio z 5 % na 38 %. Faktury vystavovány sobota 2:00, neděle 23:00. Koreluje s poklesem platební morálky a rostoucí komunikací. Klient pravděpodobně v cash flow krizi — pracuje přesčas.

*Indikátory:*

- ✗ Off-hours ratio: 5 % → 38 % za 3M
- ✗ Sobotní/nedělní doklady: 12 za Q1
- ✗ Noční doklady (22:00-06:00): 8 za Q1
- ✗ Korelace s payment delay (+15 dní)

*Nápravná opatření:*

1. Proaktivní kontakt — nabídnout finanční poradenství
2. Prověřit cash flow situaci klienta
3. Nabídnout automatizaci (snížit jeho workload)
4. Přizpůsobit komunikaci jeho reálnému schedule

**Související analýzy:** 23-14, 23-20, 17-04

---

### 23-16 — Číselná řada faktur

**Zdroj:** gap analýza

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Vysoký — compliance a fraud detection |
| **Status** | Produkce |

**Popis:**

Detekce mezer v číselné řadě faktur klienta. Systém extrahuje čísla faktur (invoice_number) a buduje sekvenční model. Mezery v číslování (gap) signalizují buď smazané faktury, paralelní fakturaci jiným odběratelům, nebo systémovou chybu.

Gap > 10 v řadě je red flag — klient může mít 'neviditelné' faktury směřující jinam. V kontextu daňového poradenství je to compliance riziko.

Systém buduje expected_next_number model a porovnává s actual_number per doklad.

**Metodologie:**

Sequence analysis: 1) Extract invoice_number per client (regex pattern matching), 2) Sort chronologically, 3) Calculate gaps: next_number − current_number − 1, 4) Flag gaps > configurable threshold (default: 3), 5) Aggregate: total_missing_numbers per period, 6) Trend: growing gaps = parallel invoicing increasing.

**Datové vstupy:**

- Invoice numbers per client (DocuWare + ERP)
- Invoice date (for chronological ordering)
- Client numbering pattern (prefix + sequence)
- Historical gap data (for trend)

**Výstupní metriky:**

- Total gaps per period per client
- Largest single gap (consecutive missing numbers)
- Gap frequency trend (increasing/stable/decreasing)
- Estimated missing invoices count
- Gap × date correlation (gaps cluster around specific dates?)

#### ✅ Dobrý stav

**Sekvenční řada bez mezer**

Faktury klienta tvoří nepřerušenou řadu: FV-001, FV-002, ..., FV-247. Žádné gaps. Klient fakturuje výhradně přes nás.

*Indikátory:*

- ✓ 0 gaps za 12M
- ✓ Kompletní sekvence 001-247
- ✓ Konzistentní numbering pattern
- ✓ Trend: stable (žádné nové gaps)

*Doporučené akce:*

1. Standard monitoring
2. Pochválit klienta za pořádek v evidenci

#### ❌ Rizikový stav

**46 neviditelných faktur**

Gap mezi FV-2001 a FV-2047 — 46 chybějících čísel. Klient buď fakturuje paralelně mimo náš dohled, nebo mazal faktury. Compliance riziko: nepřiznaný příjem.

*Indikátory:*

- ✗ Gap 2001-2047: 46 missing numbers
- ✗ Celkem 73 missing numbers za Q1
- ✗ Trend: gaps rostou (Q4: 12, Q1: 73)
- ✗ Gaps cluster around month-end dates

*Nápravná opatření:*

1. Dotázat se klienta na chybějící čísla
2. Prověřit zda nemá druhý fakturační systém
3. Upozornit na compliance riziko (§ 11 zákona o účetnictví)
4. Navrhnout centralizaci fakturace přes jeden systém

**Související analýzy:** 23-17, 23-18, 23-44

---

### 23-17 — Variabilní symboly

**Zdroj:** pattern analýza

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Střední — efektivita párování plateb |
| **Status** | Produkce |

**Popis:**

Analýza vzorců v variabilních symbolech (VS) faktur klienta pomocí regex pattern matching. Systematické VS (např. 20260301001 = datum+seq) indikují organizovaný systém. Náhodné VS signalizují chaos v evidenci a zvyšují riziko chyb při párování plateb.

Systém klasifikuje VS patterns do kategorií: date-based, sequential, invoice-mirroring, random. Per-client pattern consistency je měřena a trend sledován.

Změna patternu (z systematického na chaotický) je warning signál organizační změny.

**Metodologie:**

Regex classification: 1) Extract VS from invoices/payments, 2) Pattern matching: date-pattern (\\d{8}\\d{3}), sequential (\\d+), invoice-mirror (matches invoice_number), random (no detectable pattern), 3) Consistency score: % of VS matching dominant pattern, 4) Trend analysis, 5) Change point detection on pattern type.

**Datové vstupy:**

- Variabilní symboly z faktur (DocuWare/ERP)
- Variabilní symboly z plateb (bankovní API — FIO, KB, ČSOB)
- Invoice numbers (for mirror detection)
- Payment matching success rate

**Výstupní metriky:**

- Dominant VS pattern type per client
- Pattern consistency score (%)
- Payment matching success rate (related to VS quality)
- Change detection: pattern shift
- Comparison vs. portfolio (% with systematic VS)

#### ✅ Dobrý stav

**Systematické VS — datum+číslo**

98 % VS odpovídá patternu YYYYMMDDNNN. Payment matching success: 99.5 %. Klient má organizovanou evidenci.

*Indikátory:*

- ✓ Pattern: date-based (YYYYMMDDNNN)
- ✓ Consistency: 98 %
- ✓ Payment match rate: 99.5 %
- ✓ 0 neidentifikovaných plateb za Q1

*Doporučené akce:*

1. Standard monitoring
2. Klient je benchmark pro VS systém

#### ❌ Rizikový stav

**Náhodné VS — chaos v evidenci**

VS nemají žádný detekovaný pattern. Consistency score: 12 %. Payment matching: 67 % (33 % vyžaduje manuální párování). Účetní stráví extra 3h/měsíc párováním.

*Indikátory:*

- ✗ Pattern: random (no detectable pattern)
- ✗ Consistency: 12 %
- ✗ Payment match rate: 67 %
- ✗ Extra work: 3h/month manual matching

*Nápravná opatření:*

1. Navrhnout klientovi systematický VS formát
2. Implementovat fuzzy matching pro jeho platby
3. Kalkulovat cost of chaos (3h × hourly rate)
4. Zvážit příplatek za extra manuální práci

**Související analýzy:** 23-16, 23-18, 1-01

---

### 23-18 — Zaokrouhlování

**Zdroj:** statistická analýza

| | |
|---|---|
| **Frekvence** | Kvartálně |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Vysoký — fraud detection a compliance |
| **Status** | Produkce |

**Popis:**

Benford's law analýza distribuce částek na fakturách a platbách klienta. Přirozené finanční data sledují Benfordovo rozložení (první číslice: 1 se vyskytuje ~30 %, 9 se vyskytuje ~5 %). Výrazná odchylka od Benfordova rozložení indikuje manipulaci s částkami.

Doplňkově systém detekuje nadměrné zastoupení 'kulatých' částek (tisíce, statisíce) vs. přirozených. V hotovostních transakcích je kulatost podezřelejší než u bezhotovostních.

Tato analýza je standardní forenzní auditorská technika implementovaná automaticky.

**Metodologie:**

Benford analysis: 1) Extract all amounts (invoices + payments per client), 2) First-digit distribution, 3) Chi-squared goodness-of-fit test vs. Benford expected, 4) Mantissa Arc test for second-order anomalies, 5) Round number detection: amount % 1000 == 0 or amount % 100 == 0, 6) Round ratio: round_amounts / total_amounts, 7) Segment by payment_type (cash vs. bank transfer).

**Datové vstupy:**

- Všechny částky faktur per client (amount_total, amount_vat, amount_base)
- Platby per client (bankovní API + pokladna)
- Payment type (hotovost vs. bezhotovostní)
- Historical amounts (pro trend analýzu min. 100 transakcí)

**Výstupní metriky:**

- Benford chi-squared p-value per client
- First-digit distribution vs. expected (deviation %)
- Round number ratio (overall + per payment_type)
- Cash round ratio vs. bank transfer round ratio
- Anomaly score (composite)

#### ✅ Dobrý stav

**Přirozené rozložení částek**

First-digit distribuce odpovídá Benfordovu zákonu (chi-squared p > 0.3). Round ratio: 8 % (přirozené). Žádné anomálie.

*Indikátory:*

- ✓ Benford chi-sq p > 0.3
- ✓ First-digit deviation: < 5 %
- ✓ Round ratio: 8 % (in norm)
- ✓ Cash round ratio: 12 % (acceptable)

*Doporučené akce:*

1. Standard monitoring
2. Recalibrate annually

#### ❌ Rizikový stav

**80 % kulatých hotovostních částek**

Cash round ratio: 80 % (norm: 15 %). Benford chi-squared p < 0.001. Nadměrné zaokrouhlování v hotovostních transakcích — potenciální daňový únik (nepřiznané tržby, fiktivní výdaje).

*Indikátory:*

- ✗ Cash round ratio: 80 % (norm: 15 %)
- ✗ Benford p < 0.001 — signifikantní odchylka
- ✗ First digit '5' overrepresented (22 % vs. expected 8 %)
- ✗ Bank transfer amounts: normal distribution

*Nápravná opatření:*

1. Prozkoumat hotovostní transakce podrobně
2. Upozornit klienta na compliance riziko
3. Dokumentovat pro případ kontroly FÚ
4. Navrhnout přechod na bezhotovostní platby

**Související analýzy:** 23-16, 23-19, 1-01, 1-05

---

### 23-19 — Jednorázový dodavatel

**Zdroj:** frequency

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Vysoký — fraud detection |
| **Status** | Produkce |

**Popis:**

Analýza frekvence dodavatelů v účetnictví klienta. Systém klasifikuje dodavatele na opakující se (2+ faktury za 12M) a jednorázové (1 faktura). Vysoký poměr jednorázových dodavatelů je red flag — potenciální fiktivní faktury, shell companies, nebo dezorganizace.

Systém cross-referuje jednorázové dodavatele s ARES databází (existence, datum vzniku, obor). Nově vzniklé firmy (< 6 měsíců) s jedinou fakturou jsou highest risk.

Doplňkově systém kontroluje, zda jednorázový dodavatel není propojen s klientem (stejná adresa, stejný jednatel, příbuzenské vztahy).

**Metodologie:**

Supplier frequency analysis: 1) Group invoices by supplier_ico, 2) Count invoices per supplier per 12M, 3) Classify: one-time (1) vs. recurring (2+), 4) One-time ratio = one_time / total_suppliers, 5) ARES check per one-time supplier (GET /ares/v1/ekonomicke-subjekty/{ico}), 6) Age check: company_age < 6M = high risk, 7) Address/person cross-match with client.

**Datové vstupy:**

- Přijaté faktury per client (supplier_ico, amount, date)
- ARES REST API — GET /ares/v1/ekonomicke-subjekty/{ico}
- OR data (justice.cz — jednatel, společníci, sídlo)
- Client data (adresa, jednatel) pro cross-match

**Výstupní metriky:**

- One-time supplier ratio per client
- Total one-time suppliers count per period
- High-risk one-time suppliers (new company + single invoice)
- Cross-match hits (supplier linked to client)
- Average one-time invoice amount vs. recurring

#### ✅ Dobrý stav

**95 % opakujících se dodavatelů**

Klient má stabilní dodavatelský řetězec. 95 % dodavatelů se opakuje. One-time suppliers: 3 za Q1 (nový IT dodavatel, jednorázový servis, sezónní nákup — all verified).

*Indikátory:*

- ✓ One-time ratio: 5 %
- ✓ 3 one-time suppliers (all verified via ARES)
- ✓ 0 high-risk suppliers
- ✓ Stable supplier base 12M

*Doporučené akce:*

1. Standard monitoring
2. Pokračovat v quarterly review

#### ❌ Rizikový stav

**12 jednorázových dodavatelů za Q1**

One-time ratio: 35 %. 12 nových dodavatelů s jedinou fakturou. 3 z nich: firmy mladší 6 měsíců, 1 se shodnou adresou s klientem. High fraud risk.

*Indikátory:*

- ✗ One-time ratio: 35 % (norm: < 10 %)
- ✗ 12 one-time suppliers za Q1 (prev Q: 2)
- ✗ 3 suppliers: company_age < 6M
- ✗ 1 supplier: matching address with client

*Nápravná opatření:*

1. Prověřit 3 nové firmy podrobně (ARES + OR)
2. Konfrontovat klienta s matching address
3. Dokumentovat pro případ kontroly FÚ
4. Nastavit alert na nové one-time suppliers

**Související analýzy:** 23-18, 23-25, 14-04, 19-01

---

### 23-20 — Čas vystavení->zaplacení

**Zdroj:** trend

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Vysoký — predikce finanční tísně |
| **Status** | Produkce |

**Popis:**

Linear regression trend na payment speed (days from invoice_date to payment_date) per klient over time. Klesající trend indikuje zlepšující se finanční zdraví a organizaci. Rostoucí trend je early warning finanční tísně.

Na rozdíl od statického aging (snapshot) tato analýza sleduje dynamiku — i klient s aktuálně dobrým aging může mít zhoršující se trend. Slope koeficient je klíčový output.

Systém zahrnuje i sezónní adjustaci (STL) — rostoucí trend po odfiltrování sezónnosti je silnější signál.

**Metodologie:**

Payment speed trend: 1) Per invoice: payment_speed = payment_date − invoice_date (days), 2) Time series: payment_speed per month (median), 3) STL decomposition (sezónní adjustace), 4) Linear regression on trend component, 5) Slope significance (t-test), 6) Forecast: expected payment_speed at +3M, +6M.

**Datové vstupy:**

- Vydané faktury per client (invoice_date, amount)
- Bankovní výpisy — platby (payment_date, matched_invoice_id)
- Sezónní calendar (daňové termíny, dovolené)
- Historical data (min. 12M pro trend)

**Výstupní metriky:**

- Current median payment speed (days)
- Trend slope (days per month) — positive = worsening
- Slope significance (p-value)
- Seasonally adjusted trend
- Forecast: expected payment speed at +3M, +6M

#### ✅ Dobrý stav

**Klesající trend — klient se zlepšuje**

Payment speed klesá o 0.8 dne/měsíc (p < 0.01). Aktuální median: 12 dní. Forecast 6M: 7 dní. Klient zlepšuje finanční disciplínu.

*Indikátory:*

- ✓ Slope: −0.8 day/month (p < 0.01)
- ✓ Current median: 12 days
- ✓ Forecast 6M: 7 days
- ✓ Consistent improvement 9M

*Doporučené akce:*

1. Pochválit klienta za zlepšení
2. Zvážit early payment discount
3. Sledovat udržitelnost trendu

#### ❌ Rizikový stav

**Rostoucí trend — zhoršení platební morálky**

Payment speed roste o 2.3 dne/měsíc (p < 0.001). Aktuální median: 28 dní. Forecast 6M: 42 dní (za splatností). Koreluje s poklesem obratu klienta.

*Indikátory:*

- ✗ Slope: +2.3 days/month (p < 0.001)
- ✗ Current median: 28 days (splatnost: 30)
- ✗ Forecast 6M: 42 days (over due!)
- ✗ Korelace s revenue decline (r = −0.68)

*Nápravná opatření:*

1. Proaktivní kontakt — nabídnout finanční poradenství
2. Zkrátit splatnost na dalších fakturách
3. Zvážit požadavek na zálohy
4. Sledovat intenzivně — měsíční review

**Související analýzy:** 1-04, 21-02, 23-15

---

### 23-21 — GPS z knih jízd

**Zdroj:** pendleři

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 75 % automatizováno |
| **Business impact** | Vysoký — daňová compliance pendlerů |
| **Status** | Produkce |

**Popis:**

Analýza GPS dat z elektronických knih jízd (GPX formát) zaměstnanců klientů-pendlerů (CZ-DE). Systém porovnává skutečné trasy s deklarovaným bydlištěm a pracovištěm. Nesrovnalosti signalizují potenciální daňový problém (nesprávný domicil, fiktivní bydliště).

GPX track logy jsou parsovány na start/end body a porovnány s declared_address z payroll systému. Vzdálenost start_point × declared_home > threshold je flag.

Pro pendlery je tato analýza compliance-critical — špatný domicil = špatné zdanění.

**Metodologie:**

GPX analysis: 1) Parse GPX trackpoints (lat, lon, timestamp), 2) Extract daily start_point (first trackpoint) and end_point (last trackpoint), 3) Geocode start_point → address (reverse geocoding), 4) Compare with declared_home address (Haversine distance), 5) Flag: distance > 20 km threshold, 6) Pattern: consistent discrepancy over N days.

**Datové vstupy:**

- Knihy jízd — GPX track logs per zaměstnanec
- Payroll: declared home address per zaměstnanec
- Payroll: declared workplace address
- Geocoding API (Mapy.cz / Google Maps)

**Výstupní metriky:**

- Daily start_point × declared_home distance (km)
- Discrepancy frequency (days with distance > threshold)
- Pattern: consistent alternative start location
- Average commute distance (actual vs. declared)
- Flagged employees count

#### ✅ Dobrý stav

**Trasa konzistentní s bydlištěm**

GPS start body odpovídají deklarovanému bydlišti (avg distance: 1.2 km). Trasa je konzistentní 6M. Žádné discrepancies.

*Indikátory:*

- ✓ Avg start-home distance: 1.2 km
- ✓ 0 flagged days (threshold: 20 km)
- ✓ Trasa: declared_home → declared_work
- ✓ Consistent 6M pattern

*Doporučené akce:*

1. Standard monitoring
2. Quarterly re-check

#### ❌ Rizikový stav

**Bydlí 200 km od deklarovaného**

Zaměstnanec start body: consistently Plzeň (avg). Declared home: Liberec (200 km). 85 % pracovních dní start z Plzně. Potenciálně nesprávný domicil → špatné zdanění.

*Indikátory:*

- ✗ Avg start-home distance: 198 km
- ✗ 85 % dní start z alternativní lokace (Plzeň)
- ✗ Declared: Liberec, Actual: Plzeň
- ✗ Pattern consistent 4M

*Nápravná opatření:*

1. Konfrontovat klienta s GPS daty
2. Prověřit daňové důsledky (nesprávný domicil)
3. Aktualizovat payroll data pokud je skutečné bydliště jiné
4. Přepočítat daňové povinnosti za dotčené období

**Související analýzy:** 23-22, 23-23, 23-24

---

### 23-22 — Čas na hranici

**Zdroj:** GPS

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 80 % automatizováno |
| **Business impact** | Vysoký — pendler compliance (183-day rule) |
| **Status** | Produkce |

**Popis:**

Detekce border crossing timestamps z GPS dat knih jízd. Pro pendlery (CZ-DE) je počet a frekvence přejezdů hranice klíčový compliance indikátor. 183-day rule (daňový domicil) závisí na fyzické přítomnosti.

Systém detekuje překročení hranice (latitude crossing CZ-DE border polygon) a počítá dny strávené v každé zemi. Nesrovnalost s deklarovaným pracovním režimem je flagována.

0 přejezdů za měsíc u deklarovaného pendlera = neexistující pendlerství.

**Metodologie:**

Border crossing detection: 1) CZ-DE border polygon (GeoJSON), 2) GPX trackpoint intersection with border, 3) Timestamp of crossing, 4) Days-in-country calculation (CZ vs. DE per day based on last crossing), 5) Monthly summary: days_in_CZ, days_in_DE, crossings_count, 6) Comparison with declared work schedule, 7) 183-day rule tracking (rolling 12M).

**Datové vstupy:**

- GPX track logs per zaměstnanec
- CZ-DE border polygon (GeoJSON from OSM)
- Declared work schedule (days_in_DE per month)
- Calendar (work days, holidays CZ + DE)

**Výstupní metriky:**

- Border crossings per month
- Days in CZ vs. DE per month
- Rolling 183-day status (which country for tax)
- Discrepancy: declared vs. actual days_in_DE
- Flagged employees (0 crossings or major discrepancy)

#### ✅ Dobrý stav

**Pravidelné přejezdy — konzistentní pendler**

20 crossings/month (10 tam, 10 zpět). Days in DE: 22, CZ: 8 (matches declared schedule). 183-day tracking: on track for DE domicil.

*Indikátory:*

- ✓ 20 crossings/month (consistent 12M)
- ✓ Days in DE: 22/month (declared: 22)
- ✓ 183-day status: DE (on track)
- ✓ 0 discrepancy days

*Doporučené akce:*

1. Standard monitoring
2. Quarterly 183-day rule review

#### ❌ Rizikový stav

**0 přejezdů — neexistující pendlerství?**

Zaměstnanec deklarovaný jako pendler (22 dní/měsíc v DE) má 0 border crossings za poslední 2 měsíce. Buď nepracuje v DE, nebo má chybný GPS tracker. Critical compliance risk.

*Indikátory:*

- ✗ 0 border crossings za 2M
- ✗ Declared: 22 days/month in DE
- ✗ GPS shows: activity only in CZ
- ✗ 183-day tracking: reverting to CZ domicil

*Nápravná opatření:*

1. Urgentně ověřit s klientem — pracuje zaměstnanec skutečně v DE?
2. Zkontrolovat GPS zařízení (technická porucha?)
3. Přehodnotit daňový domicil
4. Přepočítat daně pokud zaměstnanec nepracuje v DE

**Související analýzy:** 23-21, 23-24, 23-37

---

### 23-23 — Vzorce tankování

**Zdroj:** stvrzenky

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 75 % automatizováno |
| **Business impact** | Střední — daňová compliance firemní vozidla |
| **Status** | Produkce |

**Popis:**

Geo-matching účtenek za pohonné hmoty s GPS trasami z knih jízd. Systém extrahuje lokaci čerpací stanice z účtenky (adresa nebo GPS metadata) a porovnává s trasou ve stejný den. Tankování mimo trasu signalizuje osobní jízdy účtované jako služební.

Systém používá buffer zone (default: 15 km od trasy) — tankování mimo buffer je flag. Opakované off-route tankování u stejné lokace identifikuje pattern (např. bydliště zaměstnance).

Tato analýza je klíčová pro klienty s firemními vozidly a knihami jízd.

**Metodologie:**

Fuel receipt geo-matching: 1) Extract location from receipt (OCR → address → geocode, or GPS metadata), 2) Load GPX route for same date, 3) Calculate minimum distance: receipt_location to nearest_trackpoint, 4) Flag: distance > buffer_zone (15 km), 5) Pattern analysis: repeated off-route locations, 6) Aggregate: off_route_ratio per employee per month.

**Datové vstupy:**

- Účtenky za PHM (DocuWare — OCR extraction: station_name, address, date)
- GPX track logs per zaměstnanec per day
- Geocoding API (address → lat/lon)
- Employee home address (for pattern detection)

**Výstupní metriky:**

- Off-route fuel ratio per employee per month
- Total off-route fuel amount (CZK)
- Repeated off-route locations (pattern)
- Distance from route per receipt
- Estimated personal use amount (CZK)

#### ✅ Dobrý stav

**Tankování odpovídá trase**

100 % tankování within 15 km buffer od GPS trasy. Zaměstnanec tankuje na trase dom-práce. Žádné anomálie.

*Indikátory:*

- ✓ Off-route ratio: 0 %
- ✓ All receipts within 15 km of route
- ✓ Consistent pattern 12M
- ✓ 0 flagged receipts

*Doporučené akce:*

1. Standard monitoring
2. Quarterly review

#### ❌ Rizikový stav

**Tankuje 500 km od trasy**

Zaměstnanec tankoval v Chorvatsku (500 km od declared route CZ-DE). Opakovaně: 3× za léto. Total off-route fuel: 4 800 Kč. Pattern: osobní dovolená na firemní PHM.

*Indikátory:*

- ✗ Off-route ratio: 15 % (summer months)
- ✗ 3 receipts from HR (500 km from route)
- ✗ Total: 4 800 Kč off-route fuel
- ✗ Pattern: vacation destination

*Nápravná opatření:*

1. Upozornit klienta — osobní jízdy na firemní PHM
2. Vyčíslit daňový dopad (nepeněžní příjem zaměstnance)
3. Navrhnout úpravu vnitřní směrnice (soukromé jízdy)
4. Přeúčtovat jako benefit zaměstnance

**Související analýzy:** 23-21, 23-22, 23-24

---

### 23-24 — Dny bez dojíždění

**Zdroj:** absence

| | |
|---|---|
| **Frekvence** | Týdně |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Vysoký — mzdová a daňová compliance |
| **Status** | Produkce |

**Popis:**

Korelace GPS absence (žádné GPS trackpoints za den) s absence calendar (dovolená, nemoc, sick day). Dny bez GPS aktivity, které nejsou pokryty absencí, signalizují nedeklarovanou nepřítomnost — potenciální problém se mzdami a pojistným.

Systém buduje daily status: GPS_active / GPS_absent a porovnává s HR calendar: holiday / sick / work_day. Mismatch (GPS_absent + work_day) je flagován.

Toto je compliance-critical pro pendlery — nezachycená nepřítomnost ovlivňuje 183-day rule.

**Metodologie:**

Absence correlation: 1) Daily GPS status: active (>= 1 trackpoint) / absent (0 trackpoints), 2) HR calendar: holiday, sick, work_day, 3) Match matrix: GPS_status × calendar_status, 4) Flag: GPS_absent ∩ work_day (unexcused absence), 5) Count flagged days per employee per month, 6) Impact on 183-day calculation.

**Datové vstupy:**

- GPX track logs per zaměstnanec (daily activity detection)
- HR absence calendar (dovolená, nemocenská, OČR...)
- Work day calendar (CZ + DE holidays)
- 183-day tracking data

**Výstupní metriky:**

- Unexcused absence days per employee per month
- GPS-calendar mismatch ratio
- Impact on 183-day calculation (days to recalculate)
- Pattern: recurring unexcused days (e.g., Mondays)
- Total mismatch days portfolio-wide

#### ✅ Dobrý stav

**GPS koreluje s kalendářem — 0 mismatch**

Každý den bez GPS odpovídá zapsané dovolené nebo nemoci. 0 unexcused absences. Perfektní evidence.

*Indikátory:*

- ✓ 0 mismatch days za 6M
- ✓ GPS-calendar correlation: 100 %
- ✓ 183-day tracking: accurate
- ✓ All absences properly documented

*Doporučené akce:*

1. Standard monitoring
2. Pochválit klienta za kvalitní HR evidenci

#### ❌ Rizikový stav

**10 dní bez dojíždění — nedeklarovaná absence**

10 pracovních dní bez GPS aktivity, ale v HR kalendáři jako 'work_day'. Zaměstnanec nepracoval, ale mzda běžela. Potenciální dopad na SZP a 183-day rule.

*Indikátory:*

- ✗ 10 unexcused absence days
- ✗ GPS: 0 trackpoints tyto dny
- ✗ HR calendar: work_day (no leave recorded)
- ✗ Impact: 10 days shift in 183-day calculation

*Nápravná opatření:*

1. Urgentně vyjasnit s klientem — kde byl zaměstnanec?
2. Opravit HR evidenci (doplnit dovolenou/nemocenskou)
3. Přepočítat mzdu pokud nebylo odpracováno
4. Aktualizovat 183-day tracking

**Související analýzy:** 23-21, 23-22, 23-32

---

### 23-25 — Vzájemné fakturace

**Zdroj:** cross-match IČO

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Vysoký — fraud detection a compliance |
| **Status** | Produkce |

**Popis:**

IČO cross-match SQL query přes faktury vydané a přijaté všech klientů kanceláře. Systém identifikuje případy, kdy klient A fakturuje klientu B, a oba jsou naši klienti. Legitimní obchodní vztah vs. umělé transakce — kontext rozhoduje.

Vzájemné fakturace (A↔B: A fakturuje B AND B fakturuje A) jsou zvlášť zajímavé — mohou být legitimní (vzájemný obchod) nebo podezřelé (umělé navyšování obratu).

Query: SELECT a.supplier_ico, a.customer_ico FROM invoices a JOIN clients c1 ON a.supplier_ico = c1.ico JOIN clients c2 ON a.customer_ico = c2.ico.

**Metodologie:**

SQL cross-match: 1) JOIN invoices ON supplier_ico = client.ico AND customer_ico = client.ico, 2) Build directed graph: client → client (weighted by invoice amount), 3) Detect mutual invoicing: A→B AND B→A, 4) Amount symmetry check: |amount_AB − amount_BA| / max(amount_AB, amount_BA), 5) Temporal pattern: synchronized invoicing dates.

**Datové vstupy:**

- Vydané faktury — all clients (supplier_ico, customer_ico, amount, date)
- Přijaté faktury — all clients (same fields)
- Client list (ico, name, industry)
- Historical transaction data for trend

**Výstupní metriky:**

- Cross-invoicing pairs detected (count)
- Mutual invoicing pairs (A↔B, both directions)
- Amount symmetry per pair (high symmetry = suspicious)
- Total cross-invoiced amount per pair
- Temporal synchronization score

#### ✅ Dobrý stav

**Transparentní obchodní vztahy**

4 cross-invoicing pairs detected. All are legitimate: IT support (A→B), consulting (C→D). Amounts asymmetric. No mutual pairs. Transparentní dodavatelský řetězec.

*Indikátory:*

- ✓ 4 cross-invoicing pairs (one-directional)
- ✓ 0 mutual pairs
- ✓ Amount asymmetry: all > 0.5 (different business)
- ✓ Industries match relationship type

*Doporučené akce:*

1. Monitorovat pro nové pairs
2. Využít znalost vztahů pro proaktivní komunikaci

#### ❌ Rizikový stav

**3 klienti fakturují v kruhu**

A→B: 500K, B→C: 480K, C→A: 520K. Amounts suspiciously similar (within 8 %). Dates synchronized (all within 5 days). Classic carousel pattern — potenciální fraud.

*Indikátory:*

- ✗ Circular invoicing: A→B→C→A
- ✗ Amount symmetry > 0.92 (suspicious)
- ✗ Date synchronization: all within 5 days
- ✗ No clear business rationale

*Nápravná opatření:*

1. Prověřit business rationale — co si fakturují?
2. Zkontrolovat substance transakcí
3. Upozornit klienty na compliance riziko
4. Dokumentovat pro případ kontroly FÚ

**Související analýzy:** 23-26, 14-01, 14-04

---

### 23-26 — Uzavřené smyčky

**Zdroj:** graf

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Kritický — carousel fraud detection |
| **Status** | Produkce |

**Popis:**

Cycle detection (DFS) na grafu fakturačních vazeb mezi klienty. Uzavřená smyčka (A→B→C→A) kde toky mají podobné částky je klasický carousel fraud pattern. Systém buduje directed weighted graph z faktur a spouští DFS pro cykly délky 3-6.

Každý detekovaný cyklus je ohodnocen suspicion score na základě: amount similarity, temporal synchronization, business rationale (industry match), entity age.

Toto je automatizovaná verze forenzního auditu, která běží kontinuálně.

**Metodologie:**

Graph cycle detection: 1) Build directed graph G(V=clients, E=invoices, weight=amount), 2) DFS-based cycle detection (length 3-6), 3) Per cycle: amount_similarity = 1 − std(amounts)/mean(amounts), 4) Temporal sync = max(date_diff) within cycle, 5) Suspicion score = f(amount_similarity, temporal_sync, entity_ages), 6) Rank cycles by suspicion score.

**Datové vstupy:**

- Invoice graph (supplier_ico → customer_ico, amount, date)
- Client metadata (industry NACE, company_age, entity_type)
- Historical cycles (for tracking persistence)
- ARES data for entity verification

**Výstupní metriky:**

- Number of cycles detected per period
- Cycle details (participants, amounts, dates)
- Suspicion score per cycle (0-1)
- Cycle persistence (how long has it existed)
- Total amount circulated per cycle

#### ✅ Dobrý stav

**Žádné uzavřené smyčky**

DFS nedetekoval žádné cykly v invoicing grafu. Všechny obchodní vztahy jsou lineární (dodavatel → odběratel). Čisté prostředí.

*Indikátory:*

- ✓ 0 cycles detected
- ✓ Graph is DAG (directed acyclic)
- ✓ All relationships uni-directional
- ✓ Clean 12M

*Doporučené akce:*

1. Standard monitoring (monthly DFS)
2. Alert na první detekovaný cyklus

#### ❌ Rizikový stav

**A→B→C→A za identické částky**

Cyklus: A→B (510K), B→C (490K), C→A (505K). Amount similarity: 0.96. Temporal sync: 3 dny. Suspicion score: 0.89. Všechny entity < 2 roky staré.

*Indikátory:*

- ✗ 3-node cycle detected
- ✗ Amount similarity: 0.96
- ✗ Temporal sync: 3 days
- ✗ All entities < 2 years old

*Nápravná opatření:*

1. Okamžitá eskalace na senior partnera
2. Prověřit substance transakcí u všech 3 klientů
3. ARES deep check na všechny entity
4. Zvážit oznámení FAÚ pokud substance chybí

**Související analýzy:** 23-25, 14-01, 14-03

---

### 23-27 — Sdílení zaměstnanců

**Zdroj:** RČ cross-match

| | |
|---|---|
| **Frekvence** | Kvartálně |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Vysoký — pracovněprávní a daňová compliance |
| **Status** | Produkce |

**Popis:**

Deduplikace rodných čísel (RČ) across payroll tabulek všech klientů kanceláře. Stejné RČ u více klientů odhaluje zaměstnance pracující pro více firem — legitimní (DPP/DPČ) nebo nelegitimní (švarcsystém, fiktivní zaměstnání).

Systém provádí hash-based RČ matching (privacy-preserving) přes payroll data. Matches jsou obohaceny o kontext: typ úvazku, obor klientů, vzájemné propojení klientů.

Stejné RČ u propojených klientů (stejný jednatel) je highest risk — potenciální optimalizace mzdových nákladů.

**Metodologie:**

RČ deduplication: 1) Hash RČ from all payroll tables (SHA-256 with salt), 2) Cross-match hashes, 3) For each match: gather context (employment_type, client_industry, client_relationship), 4) Risk scoring: same_RČ + connected_clients + full_time_at_both = HIGH risk, 5) Alert per match with context.

**Datové vstupy:**

- Payroll data per client — RČ (hashed), employment_type, working_hours
- Client relationship graph (14-01)
- Client metadata (jednatel, společníci)
- Employment type classification (HPP, DPP, DPČ, OSVČ)

**Výstupní metriky:**

- Number of shared employees (same RČ across clients)
- Risk classification per match (low/medium/high)
- Connected client pairs sharing employees
- Employment type distribution of shared employees
- Total shared employees as % of total workforce

#### ✅ Dobrý stav

**Unikátní zaměstnanci**

0 RČ matches across portfolio. Každý zaměstnanec je unikátní u jednoho klienta. Čistá evidence.

*Indikátory:*

- ✓ 0 shared RČ across portfolio
- ✓ All employees unique per client
- ✓ Clean payroll data
- ✓ No cross-employment

*Doporučené akce:*

1. Standard monitoring (quarterly)
2. Maintain hash database

#### ❌ Rizikový stav

**Stejné RČ u 3 propojených klientů**

RČ hash ABC123 found in payroll of clients X, Y, Z. All three clients share same jednatel. Employee listed as HPP (full-time) at all three. Physically impossible — švarcsystém nebo fiktivní zaměstnání.

*Indikátory:*

- ✗ 1 RČ at 3 clients simultaneously
- ✗ All 3 clients share jednatel
- ✗ Employment type: HPP at all three
- ✗ Combined declared hours: 120h/week (impossible)

*Nápravná opatření:*

1. Konfrontovat klienty/jednatele s nálezem
2. Prověřit oprávněnost zaměstnání (reálný výkon práce)
3. Upozornit na právní riziko (§ 5 ZP — švarcsystém)
4. Navrhnout legální řešení (DPP, OSVČ kontrakt)

**Související analýzy:** 23-28, 14-03, 14-05

---

### 23-28 — Sdílené adresy

**Zdroj:** address matching

| | |
|---|---|
| **Frekvence** | Kvartálně |
| **Automatizace** | 80 % automatizováno |
| **Business impact** | Střední — AML/KYC compliance |
| **Status** | Produkce |

**Popis:**

Normalizace a matching adres sídel klientů pro detekci shared addresses. Více firem na stejné adrese může být legitimní (kancelářský komplex) nebo podezřelé (virtuální sídla, schránkové firmy).

Systém normalizuje adresy (lowercase, remove diacritics, standardize street names) a provádí fuzzy matching (Levenshtein distance < 3 or geocode distance < 50m). Clustery > 3 firem na adrese jsou flagovány.

Doplňkově systém prověřuje adresy přes ARES (deklarované vs. skutečné sídlo) a detekuje known virtual office providers.

**Metodologie:**

Address normalization + matching: 1) Normalize: lowercase, strip diacritics, standardize (ul. → ulice, nám. → náměstí), 2) Geocode all addresses, 3) Cluster by proximity (< 50m) OR string similarity (Levenshtein < 3), 4) Count companies per cluster, 5) Flag clusters > 3, 6) Cross-reference with known virtual office addresses, 7) ARES verification.

**Datové vstupy:**

- Client sídlo addresses (from registration / ARES)
- ARES REST API — GET /ares/v1/ekonomicke-subjekty/{ico} (registered address)
- Geocoding API (address → lat/lon)
- Known virtual office provider list

**Výstupní metriky:**

- Address clusters (groups of companies at same address)
- Cluster size distribution
- Virtual office matches (known providers)
- ARES address verification status per client
- New clusters formed (quarterly delta)

#### ✅ Dobrý stav

**Unikátní sídla**

Každý klient má unikátní adresu. Max cluster size: 2 (legitimní sdílená kancelář). 0 virtual office matches.

*Indikátory:*

- ✓ Max cluster size: 2
- ✓ 0 virtual office matches
- ✓ All addresses ARES-verified
- ✓ No new clusters in 12M

*Doporučené akce:*

1. Standard monitoring (quarterly)
2. Update address database

#### ❌ Rizikový stav

**5 firem na 1 adrese — virtuální sídla**

5 klientů na adrese Václavské nám. 12. Adresa identifikována jako virtual office provider. 3 z 5 firem < 1 rok staré, stejné NACE kódy. Suspicion: coordinated entity creation.

*Indikátory:*

- ✗ Cluster size: 5 companies
- ✗ Address: known virtual office provider
- ✗ 3/5 companies < 1 year old
- ✗ Same NACE codes: 6920 (accounting)

*Nápravná opatření:*

1. Prověřit substance — mají reálnou kancelář?
2. ARES + OR deep check na všech 5
3. Prověřit propojení (společný jednatel, společník)
4. Zvýšená due diligence na tyto klienty

**Související analýzy:** 23-27, 14-01, 19-01

---

### 23-29 — Účetní × platební morálka

**Zdroj:** korelace

| | |
|---|---|
| **Frekvence** | Kvartálně |
| **Automatizace** | 80 % automatizováno |
| **Business impact** | Střední — interní performance management |
| **Status** | Produkce |

**Popis:**

Korelační analýza mezi přiřazeným účetním a platební morálkou jeho klientů. Pokud klienti jednoho účetního platí signifikantně lépe než klienti druhého, příčina může být v kvalitě komunikace, upomínek a vztahu účetní–klient.

Systém kontroluje confounding variables: složitost klientů (obrat, obor), délku spolupráce, počet klientů na účetního. Po adjustaci je residuální rozdíl připsatelný účetnímu.

Toto je manažerský nástroj — neobviňuje, ale identifikuje kde pomoci.

**Metodologie:**

Accountant-payment correlation: 1) Per accountant: avg client payment_on_time_ratio, 2) Adjust for confounders: client_revenue, industry, tenure, complexity, 3) ANOVA / mixed-effects model: accountant as random effect, 4) Residual per accountant (adjusted for client mix), 5) Rank accountants by adjusted payment performance, 6) Delta from mean.

**Datové vstupy:**

- Payment data per client (on_time / late per invoice)
- Accountant assignment (client_id ↔ accountant_id)
- Client metadata (revenue, industry, tenure, complexity score)
- Upomínka logs per accountant

**Výstupní metriky:**

- Adjusted on-time payment rate per accountant
- ANOVA p-value (is accountant effect significant?)
- Rank: accountant performance (adjusted)
- Delta from mean per accountant
- Upomínka effectiveness per accountant

#### ✅ Dobrý stav

**Rovnoměrná — systém funguje**

ANOVA p > 0.1 — accountant effect not significant after adjustment. All accountants have similar adjusted payment performance (within ±5 %). System works, not individuals.

*Indikátory:*

- ✓ ANOVA p > 0.1 (no accountant effect)
- ✓ Max delta: ±5 % from mean
- ✓ All accountants within normal range
- ✓ Consistent across quarters

*Doporučené akce:*

1. Pokračovat s aktuální alokací
2. Quarterly re-assessment

#### ❌ Rizikový stav

**Účetní A: 95 %, B: 40 % — signifikantní rozdíl**

ANOVA p < 0.001. Účetní A: adjusted on-time ratio 95 %. Účetní B: 40 %. After adjusting for client complexity, accountant B underperforms by 35 points. Likely cause: B doesn't send upomínky, doesn't follow up.

*Indikátory:*

- ✗ ANOVA p < 0.001 — accountant effect significant
- ✗ Accountant A: 95 % adjusted, B: 40 % adjusted
- ✗ B's delta: −35 % from mean
- ✗ B's upomínka count: 60 % lower than A

*Nápravná opatření:*

1. Coaching pro účetní B — sdílet best practices z A
2. Analyzovat B's upomínka process
3. Implementovat standardní upomínkový workflow
4. Zvážit redistribuci klientů pokud B nezlepší za 3M

**Související analýzy:** 23-04, 23-05, 23-30

---

### 23-30 — Opravy po audit trail

**Zdroj:** počet

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Střední — quality management |
| **Status** | Produkce |

**Popis:**

Měření error rate per účetní na základě audit trail — počet opravných zápisů, stornovacích dokladů a manuálních korekcí v poměru k celkovému počtu zápisů. Vysoký error rate signalizuje potřebu školení nebo přetíženost.

Systém parsuje ERP audit trail (storno, opravný zápis, manuální korekce) a normalizuje na total_entries per user. Trend per účetní per kvartál identifikuje zlepšení/zhoršení.

Kombinace s dalšími metrikami (window switching, overtime) dává holistický obraz výkonu.

**Metodologie:**

Error rate analysis: 1) ERP audit trail: count events with type IN (storno, opravný_zápis, manuální_korekce), 2) Total entries per user per period, 3) Error rate = error_entries / total_entries × 100, 4) Trend: linear regression per user per quarter, 5) Benchmark: portfolio median error rate, 6) Korelace s overtime, client complexity, training history.

**Datové vstupy:**

- ERP audit trail (event_type, user_id, timestamp, affected_entry)
- Total entries per user per period
- User metadata (experience, training dates, certifications)
- Client complexity scores per user's portfolio

**Výstupní metriky:**

- Error rate per user per period (%)
- Trend (improving/worsening)
- Benchmark: percentile vs. team
- Error type distribution (storno vs. korekce vs. other)
- Korelace error_rate × overtime_hours

#### ✅ Dobrý stav

**Excelentní — 0.1 % chybovost**

Error rate 0.1 % — 1 oprava na 1000 zápisů. Top performer v kanceláři. Trend: stable nebo improving. Žádné korelace s overtime.

*Indikátory:*

- ✓ Error rate: 0.1 %
- ✓ Percentile: top 5 % in team
- ✓ Trend: flat (consistently low)
- ✓ 0 storno entries za měsíc

*Doporučené akce:*

1. Recognize excellent performance
2. Use as mentor for new hires

#### ❌ Rizikový stav

**4.8 % error rate — potřebuje školení**

Error rate 4.8 % — 48× horší než top performer. Trend: worsening (+0.3 %/quarter). Koreluje s 15h overtime/month. Likely cause: přetížení + nedostatečné školení na nové předpisy.

*Indikátory:*

- ✗ Error rate: 4.8 % (portfolio median: 1.2 %)
- ✗ Trend: +0.3 %/quarter (worsening)
- ✗ Overtime: 15h/month
- ✗ Korelace error × overtime: r = 0.78

*Nápravná opatření:*

1. Snížit workload (přerozdělit klienty)
2. Naplánovat targeted školení (chybové typy)
3. Mentoring od top performera
4. Sledovat error rate po intervenci (3M)

**Související analýzy:** 23-29, 23-46, 23-32

---

### 23-31 — Klienti zdarma

**Zdroj:** fakturace vs. čas

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 75 % automatizováno |
| **Business impact** | Vysoký — profitabilita kanceláře |
| **Status** | Produkce |

**Popis:**

Porovnání fakturované částky (revenue per client) s odhadnutým časem stráveným na klientovi (cost per client). Klienti, kde cost > revenue, jsou ztrátovými — buď je třeba zvýšit cenu, nebo přehodnotit scope služeb.

Systém kombinuje billing logs (fakturované hodiny × sazba) s timesheet data (skutečně odpracované hodiny × interní cost rate). Delta = revenue − cost per client per month.

Identifikace ztrátových klientů je klíčová pro profitabilitu kanceláře.

**Metodologie:**

Profitability analysis: 1) Revenue per client per month (billing logs: hours × rate), 2) Cost per client per month (timesheet × internal_cost_rate + overhead allocation), 3) Profit = revenue − cost, 4) Margin = profit / revenue × 100, 5) Rank clients by margin, 6) Trend: improving or worsening margin.

**Datové vstupy:**

- Billing logs (client_id, hours_billed, rate_per_hour)
- Timesheet data (client_id, hours_actual, user_id)
- Internal cost rates per user (salary + overhead)
- Fixed fee contracts (client_id, monthly_fee)

**Výstupní metriky:**

- Profit per client per month (CZK)
- Margin per client (%)
- Loss-making clients count
- Total subsidy amount (how much are we losing)
- Hours_actual / hours_billed ratio (efficiency)

#### ✅ Dobrý stav

**0 ztrátových klientů**

Všichni klienti mají pozitivní margin. Lowest margin: 12 % (still profitable). Portfolio avg margin: 38 %. Pricing je korektní.

*Indikátory:*

- ✓ 0 loss-making clients
- ✓ Lowest margin: 12 %
- ✓ Portfolio avg margin: 38 %
- ✓ Hours_actual / hours_billed: 1.1 (minor overdelivery)

*Doporučené akce:*

1. Monitor lowest-margin clients for trend
2. Annual pricing review

#### ❌ Rizikový stav

**4 klienti stojí víc než platí**

4 klienti mají negativní margin. Total monthly loss: 28 000 Kč. Worst: klient X (margin −45 %, subsidy 12 000 Kč/month). Cause: fixed fee set 5 years ago, complexity grew 3×.

*Indikátory:*

- ✗ 4 loss-making clients (portfolio: 85 total)
- ✗ Total monthly subsidy: 28 000 Kč
- ✗ Worst margin: −45 % (client X)
- ✗ Cause: outdated fixed fee pricing

*Nápravná opatření:*

1. Renegociovat ceny u 4 klientů
2. Připravit cost breakdown pro argumentaci
3. Nabídnout tiered pricing (basic + premium)
4. Zvážit ukončení spolupráce pokud odmítnou

**Související analýzy:** 23-29, 23-30, 16-01

---

### 23-32 — Práce přes dovolenou

**Zdroj:** login × absence

| | |
|---|---|
| **Frekvence** | Kvartálně |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Střední — employee wellbeing a retention |
| **Status** | Produkce |

**Popis:**

Korelace VPN/ERP login logů s absence calendar. Přihlášení do systému v době dovolené signalizuje nedokončenou práci, závislost na jedné osobě (bus factor), nebo burnout. Systém detekuje login events v době deklarované dovolené.

Každý login na dovolené je flagován s kontextem: duration (quick check vs. full work session), client context, frequency. Opakované logins na dovolené = systémový problém.

**Metodologie:**

Vacation-login correlation: 1) VPN/SSO login events (user_id, timestamp, duration), 2) HR absence calendar (vacation periods per user), 3) Match: login ∩ vacation = flag, 4) Classify: quick_check (< 15min) vs. work_session (> 15min), 5) Aggregate per user per vacation, 6) Trend: increasing = burnout risk.

**Datové vstupy:**

- VPN/SSO login logs (user_id, login_time, session_duration)
- HR absence calendar (vacation start/end per user)
- ERP access logs (complement to VPN)
- Client context during vacation sessions

**Výstupní metriky:**

- Users with vacation logins per quarter
- Total vacation work hours (across team)
- Work session vs. quick check ratio
- Client context (which clients cause vacation work)
- Trend per user (frequency increasing?)

#### ✅ Dobrý stav

**Nikdo nepracuje na dovolené**

0 vacation login events za Q1. Dovolená je skutečně dovolená. Zastupitelnost funguje, práce je předávána.

*Indikátory:*

- ✓ 0 vacation logins za Q1
- ✓ All vacation days: 0 system access
- ✓ Handover process working
- ✓ No client escalations during vacations

*Doporučené akce:*

1. Pochválit tým za work-life balance
2. Udržovat handover culture

#### ❌ Rizikový stav

**2 pracují na dovolené — burnout riziko**

2 účetní se přihlásili do systému během dovolené celkem 14×. Work sessions: avg 2.5h. Clients: klient X (complex, no backup). Pattern: vacation work increasing quarter-over-quarter.

*Indikátory:*

- ✗ 2 users with vacation logins
- ✗ 14 login events during vacation (Q1)
- ✗ Avg session: 2.5h (not quick checks)
- ✗ Same client: X (no backup assigned)

*Nápravná opatření:*

1. Okamžitě přiřadit zástupce pro klienta X
2. Dialog o workloadu s dotčenými účetními
3. Implementovat mandatory handover before vacation
4. Sledovat burnout indikátory (23-46)

**Související analýzy:** 23-05, 23-46, 23-48

---

### 23-33 — TeamViewer frekvence

**Zdroj:** logy

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Střední — service efficiency a pricing |
| **Status** | Produkce |

**Popis:**

Analýza TeamViewer session logů (API) per klient. Vysoká frekvence remote support sessions signalizuje, že klient neumí pracovat s dodanými nástroji — příležitost pro školení nebo zjednodušení. Nízká frekvence = autonomní klient.

Systém parsuje TeamViewer session logs (client_id, duration, topic) a agreguje per client per month. Trend a porovnání s portfolio avg identifikuje outliers.

Commercial insight: high-support clients by měli platit premium, nebo potřebují investici do školení.

**Metodologie:**

TeamViewer API log analysis: 1) GET /sessions — extract per client: session_count, total_duration, topic, 2) Aggregate per client per month, 3) Benchmark: portfolio median sessions/month, 4) Outlier detection (z-score > 2), 5) Trend per client, 6) Topic clustering (NLP on session notes).

**Datové vstupy:**

- TeamViewer session logs (API or local logs)
- Client ↔ session mapping (client_id from session metadata)
- Session notes/topics (free text)
- Billing data (is support included in fee?)

**Výstupní metriky:**

- Sessions per client per month
- Total support hours per client per month
- Portfolio percentile (how demanding vs. others)
- Topic distribution (what are they calling about)
- Trend (increasing = growing dependency)

#### ✅ Dobrý stav

**Autonomní klient — 2× za měsíc**

2 sessions/month, avg 15 min each. Klient zvládá rutinu sám, support pouze pro edge cases. Below portfolio median.

*Indikátory:*

- ✓ 2 sessions/month (median: 5)
- ✓ Total support time: 30 min/month
- ✓ Topics: edge cases only
- ✓ Trend: decreasing (learning)

*Doporučené akce:*

1. Standard level support
2. Klient je self-sufficient — low-touch account

#### ❌ Rizikový stav

**15× za měsíc — bezmocný klient**

15 sessions/month, avg 45 min each. Total: 11.25h support/month. Topics: basic operations (same questions). Klient nezvládá software — needs training, not support.

*Indikátory:*

- ✗ 15 sessions/month (3× median)
- ✗ Total: 11.25h/month support time
- ✗ Recurring topics: 60 % are same basic questions
- ✗ No improvement trend (flat 6M)

*Nápravná opatření:*

1. Navrhnout formální školení (investice → snížení support)
2. Vytvořit video tutorial pro opakující se dotazy
3. Kalkulovat ROI: training cost vs. ongoing support cost
4. Zvážit premium support pricing pokud školení odmítne

**Související analýzy:** 23-31, 23-35, 16-02

---

### 23-34 — Kdo odhalí odchod

**Zdroj:** intuice

| | |
|---|---|
| **Frekvence** | Kvartálně (retrospective) |
| **Automatizace** | 60 % automatizováno |
| **Business impact** | Vysoký — meta-improvement churn detection |
| **Status** | Produkce |

**Popis:**

Meta-analýza: kdo první identifikoval churn risk — automatický systém, nebo člověk? Systém retrospektivně porovnává datum churn prediction alert vs. datum, kdy účetní/management poprvé zmínil riziko odchodu (z CRM notes, meeting minutes).

Pokud systém detekuje dříve = funguje. Pokud člověk detekuje dříve ale neescaluje = knowledge retention problém. Pokud nikdo nedetekuje = gap v systému.

Tato meta-analýza zlepšuje sám detekční systém — feedback loop.

**Metodologie:**

Retrospective analysis: 1) Identify churned clients (last 24M), 2) Extract system_alert_date (first churn prediction), 3) Extract human_detection_date (first CRM note mentioning risk, NLP search), 4) Compare: system_first vs. human_first, 5) Calculate detection_lead_time (days before actual churn), 6) Analyze false negatives (no detection at all).

**Datové vstupy:**

- Churn prediction logs (alert_date, confidence, client_id)
- CRM notes and meeting minutes (full text search for churn keywords)
- Actual churn dates (contract_end_date)
- Account manager communications (email search)

**Výstupní metriky:**

- System detection rate (% of churns detected pre-event)
- Human detection rate
- System lead time (days before churn)
- Human lead time
- False negative rate (undetected churns)

#### ✅ Dobrý stav

**Systém detekuje dříve než člověk**

Systém detekoval 85 % churns s avg 47 dní lead time. Člověk: 60 % with 22 dní. System outperforms by 25 days. Model works.

*Indikátory:*

- ✓ System detection rate: 85 %
- ✓ System avg lead time: 47 days
- ✓ Human detection rate: 60 %
- ✓ Human avg lead time: 22 days

*Doporučené akce:*

1. Trust and act on system alerts
2. Use human input to improve model (feedback loop)

#### ❌ Rizikový stav

**Účetní věděla ale neřekla**

CRM notes show accountant knew about risk 3 months before churn, but never escalated. System detected only 2 weeks before. Knowledge was trapped in individual — not shared.

*Indikátory:*

- ✗ Human knew: 90 days before churn
- ✗ Human escalated: never
- ✗ System detected: 14 days before
- ✗ Result: client lost, no intervention attempted

*Nápravná opatření:*

1. Implementovat structured churn reporting (monthly questionnaire)
2. Vytvořit incentives pro early churn reporting
3. Train on importance of escalation
4. Improve system model with new signals from this case

**Související analýzy:** 22-01, 22-02, 10-01

---

### 23-35 — DocuWare hledání

**Zdroj:** search logy

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Střední — knowledge management efficiency |
| **Status** | Produkce |

**Popis:**

Analýza DocuWare search query logů. Opakované hledání stejné informace signalizuje chybějící knowledge base nebo nedostatečný filing systém. Systém identifikuje frequently searched queries a neúspěšné searches (0 results).

Query clustering (TF-IDF + cosine similarity) identifikuje tématické clustery opakovaných hledání. Každý cluster s > 3 searches je kandidát na KB článek nebo lepší indexování.

Praktická hodnota: automaticky generované FAQ/KB z reálných search patterns.

**Metodologie:**

Search log analysis: 1) DocuWare search query logs (query_text, user_id, timestamp, results_count), 2) Query clustering: TF-IDF vectorization → cosine similarity → DBSCAN, 3) Frequency per cluster, 4) Zero-result queries analysis, 5) Per-user search patterns, 6) Repeated query detection (same user, same query cluster > 3×/year).

**Datové vstupy:**

- DocuWare search query logs (REST API audit trail)
- Search results count per query
- User context (who searched)
- Document metadata (for understanding what was found/not found)

**Výstupní metriky:**

- Top 20 repeated query clusters
- Zero-result query rate (%)
- Searches per user per month (workload proxy)
- Time-to-find (query_submit → document_open)
- KB article candidates (auto-generated from clusters)

#### ✅ Dobrý stav

**Rychlé nalezení — efektivní DMS**

Avg time-to-find: 12 seconds. Zero-result rate: 3 %. No repeated query clusters > 3×/year. Filing system is effective.

*Indikátory:*

- ✓ Time-to-find: 12 sec avg
- ✓ Zero-result rate: 3 %
- ✓ No frequent repeated queries
- ✓ User satisfaction: high (implied)

*Doporučené akce:*

1. Maintain current filing structure
2. Monitor for degradation

#### ❌ Rizikový stav

**Stejná informace hledána 12×/rok**

Query cluster 'DPPO sazba 2026 snížení' searched 12× by 4 different users. Zero-result rate: 18 %. Knowledge is not captured — recreated from scratch each time.

*Indikátory:*

- ✗ Top cluster: 12× repeated search
- ✗ Zero-result rate: 18 %
- ✗ 4 different users searching same thing
- ✗ Estimated wasted time: 6h/year on this one topic

*Nápravná opatření:*

1. Create KB article for top repeated queries
2. Improve DocuWare indexing (add keywords to documents)
3. Implement auto-suggest based on frequent queries
4. Set up Slack/email notification for zero-result queries

**Související analýzy:** 23-03, 23-06, 11-07

---

### 23-36 — Počasí × platby

**Zdroj:** ČHMÚ × úhrady

| | |
|---|---|
| **Frekvence** | Ročně (recalibrace) |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Nízký — marginální optimalizace komunikace |
| **Status** | Experiment |

**Popis:**

Korelační analýza mezi meteorologickými daty (ČHMÚ API) a platební morálkou klientů. Výzkumy ukazují, že počasí ovlivňuje rozhodování — deštivé dny korelují s horší náladou a pomalejšími rozhodnutími. Systém testuje tuto hypotézu na našich datech.

ČHMÚ API poskytuje denní data (teplota, srážky, délka slunečního svitu) per region. Korelace s payment events (platby provedené v daný den) testuje weather effect.

I pokud je efekt malý, může informovat timing upomínek a komunikace.

**Metodologie:**

Weather-payment correlation: 1) ČHMÚ API — daily weather data (temperature, precipitation, sunshine_hours) per client region, 2) Payment events per day per client, 3) Logistic regression: P(payment) = f(weather_vars, day_of_week, due_date_proximity), 4) Test weather coefficient significance, 5) Effect size quantification.

**Datové vstupy:**

- ČHMÚ API — denní meteorologická data per region
- Payment events (client_id, payment_date, amount)
- Client region (for matching weather station)
- Due dates per invoice (for controlling proximity effect)

**Výstupní metriky:**

- Weather × payment correlation (regression coefficients)
- Precipitation effect on payment probability
- Temperature effect on payment probability
- Best weather conditions for payment collection
- Statistical significance of weather effect

#### ✅ Dobrý stav

**Žádná korelace — počasí neovlivňuje**

Regression coefficients for weather variables are not significant (p > 0.1). Weather has no detectable effect on payment behavior. Decision timing is driven by other factors.

*Indikátory:*

- ✓ Weather coefficients: p > 0.1 (not significant)
- ✓ R² improvement from weather: < 0.01
- ✓ No seasonal weather pattern in payments
- ✓ Other factors dominant (due_date proximity)

*Doporučené akce:*

1. Do not factor weather into communication timing
2. Re-test annually (conditions may change)

#### ❌ Rizikový stav

**Deštivé pondělky — 23 % horší morálka**

Precipitation on Monday has significant negative effect (p < 0.01). Payment probability drops 23 % on rainy Mondays vs. sunny Mondays. Effect size: medium (Cohen's d = 0.35).

*Indikátory:*

- ✗ Rain × Monday: payment probability −23 %
- ✗ p < 0.01 (significant)
- ✗ Cohen's d = 0.35 (medium effect)
- ✗ Consistent across 3 years of data

*Nápravná opatření:*

1. Neposílat upomínky v deštivá pondělí
2. Preferovat slunečné dny pro payment reminders
3. Informovat team o weather effect
4. A/B test: weather-timed vs. random reminders

**Související analýzy:** 23-37, 23-07, 22-03

---

### 23-37 — Svátky DE × pendleři

**Zdroj:** kalendář

| | |
|---|---|
| **Frekvence** | Týdně |
| **Automatizace** | 80 % automatizováno |
| **Business impact** | Vysoký — A1/pendler compliance |
| **Status** | Produkce |

**Popis:**

Korelace německých svátků (Feiertage API — per Bundesland) s aktivitou pendlerů-klientů. Systém predikuje, kdy klient nebude komunikovat (DE svátky) a detekuje neočekávané výpadky mimo svátkový kalendář.

Důležité: Německé svátky se liší per Bundesland (Bayern má víc než ostatní). Systém přiřazuje klientovi relevantní Bundesland a aplikuje správný svátkový kalendář.

Neočekávaný výpadek (mimo svátky + mimo dovolenou) může signalizovat, že klient odjel pracovat do DE bez A1 formuláře — compliance risk.

**Metodologie:**

DE holiday correlation: 1) Feiertage API — GET /api/?jahr={year}&nur_land={bundesland}, 2) Per client: assign bundesland (from work location), 3) Build expected_silence calendar (DE holidays + client vacation), 4) Compare with actual communication pattern, 5) Flag: unexpected silence (not holiday + not vacation), 6) Flag: unexpected activity (during holiday — possible A1 violation).

**Datové vstupy:**

- DE Feiertage API — feiertage-api.de/api/?jahr={year}&nur_land={BW|BY|...}
- Client Bundesland assignment
- Communication pattern per client (emails, calls, portal)
- Client vacation calendar
- A1 certificate records (issued/valid/expired)

**Výstupní metriky:**

- Predicted silence days vs. actual (accuracy)
- Unexpected silences (non-holiday, non-vacation gaps)
- Unexpected activity during DE holidays
- A1 coverage check (working in DE without valid A1?)
- Bundesland holiday accuracy (correct assignment?)

#### ✅ Dobrý stav

**Prediktovatelná aktivita**

Communication pattern matches expected calendar perfectly. Silence during Bayern holidays, active otherwise. A1 certificates valid and covering all work periods.

*Indikátory:*

- ✓ Prediction accuracy: 95 %
- ✓ 0 unexpected silences
- ✓ 0 unexpected activities during holidays
- ✓ A1 coverage: 100 %

*Doporučené akce:*

1. Standard monitoring
2. Pre-renew A1 certificates 30 days before expiry

#### ❌ Rizikový stav

**Nečekaný výpadek — odjel bez A1**

Klient was silent for 5 days outside any holiday/vacation. Last A1 expired 2 weeks ago. GPS data (if available) shows DE activity. Client is working in DE without valid A1 — social insurance violation.

*Indikátory:*

- ✗ 5-day unexpected silence
- ✗ A1 expired 14 days ago
- ✗ No vacation recorded
- ✗ GPS suggests DE activity

*Nápravná opatření:*

1. Urgentní kontakt — je klient v DE?
2. Pokud ano: okamžitě podat žádost o A1
3. Informovat o riziku (pokuta DE authorities)
4. Nastavit A1 auto-renewal reminder

**Související analýzy:** 23-22, 23-24, 13-03

---

### 23-38 — Legislativa × sentiment

**Zdroj:** korelace

| | |
|---|---|
| **Frekvence** | Real-time (per publication event) |
| **Automatizace** | 70 % automatizováno |
| **Business impact** | Střední — proactive service quality |
| **Status** | Produkce |

**Popis:**

Korelace legislativních změn (legislative gazette RSS feed) s klientským sentimentem a communication volume. Systém sleduje publikované novely a měří impact na klientské chování v následujících dnech/týdnech.

RSS feed ze Sbírky zákonů a MFČR je parsován na relevantní legislativní změny (DPH, daně, mzdy, účetnictví). Communication volume per klient per den je korelováno s publication_date.

Pomáhá kanceláři připravit se na vlnu dotazů — proaktivní komunikace místo reaktivní.

**Metodologie:**

Legislative impact analysis: 1) RSS/scraping — Sbírka zákonů, MFČR announcements, 2) NLP classification: relevant (daně, účetnictví, mzdy) vs. irrelevant, 3) Communication volume per client per day, 4) Event study: volume_after_publication / volume_before, 5) Client sentiment change post-publication, 6) Predict expected volume surge per legislation type.

**Datové vstupy:**

- Legislative gazette RSS feed (zakonyprolidi.cz, MFČR)
- Communication volume per client per day
- Client sentiment per day
- Historical legislative events + client response (training data)

**Výstupní metriky:**

- Communication volume surge per legislation event
- Sentiment change per legislation event
- Response time to surge (how fast we handle the wave)
- Most impacted client segments (by industry/size)
- Predicted surge for upcoming legislation

#### ✅ Dobrý stav

**Klidná reakce na novelu**

DPH novela published. Communication volume increased only 15 % (expected: 50 %). Kanceláře proaktivní email odeslán den před platností. Klienti klidní, sentiment stable.

*Indikátory:*

- ✓ Volume surge: +15 % (below predicted +50 %)
- ✓ Sentiment: stable (no drop)
- ✓ Proactive communication sent: yes
- ✓ 0 escalations from clients

*Doporučené akce:*

1. Continue proactive communication strategy
2. Document template for future similar novely

#### ❌ Rizikový stav

**DPH novela = 400 % nárůst dotazů**

DPH novela published Monday. By Friday: +400 % communication volume. Sentiment dropped −0.4. Team overwhelmed — avg response time: 72h (norm: 8h). No proactive communication was sent.

*Indikátory:*

- ✗ Volume surge: +400 %
- ✗ Sentiment drop: −0.4
- ✗ Response time: 72h (norm: 8h)
- ✗ No proactive email sent

*Nápravná opatření:*

1. Immediately send bulk explanatory email to all affected clients
2. Prepare FAQ document for the specific novela
3. Set up legislative monitoring → auto-trigger proactive comms
4. Post-mortem: why wasn't proactive email sent?

**Související analýzy:** 19-06, 13-04, 23-07

---

### 23-39 — Cooling-off time

**Zdroj:** timestamps

| | |
|---|---|
| **Frekvence** | Per crisis event (real-time) |
| **Automatizace** | 80 % automatizováno |
| **Business impact** | Vysoký — relationship damage control |
| **Status** | Produkce |

**Popis:**

Měření response time po krizových událostech (naše chyba, nespokojenost, konflikt). Cooling-off time = doba od krizového emailu po první normální interakci. Krátký cooling-off = odolný vztah. Dlouhý = trvalé poškození.

Systém identifikuje krizové události (negative sentiment spike, CAPS email, escalation note v CRM) a měří čas do normalizace komunikace (sentiment > baseline).

Klíčový indikátor resilience vztahu — některé vztahy přežijí krizi za dny, jiné se nikdy nezotaví.

**Metodologie:**

Crisis recovery measurement: 1) Identify crisis event (sentiment < threshold OR caps_detected OR CRM escalation), 2) Track subsequent communication, 3) Calculate recovery_time = first_email_with_sentiment > baseline − crisis_date, 4) Classify: quick_recovery (< 3 days), normal (3-14 days), slow (14-30 days), no_recovery (> 30 days), 5) Korelace s crisis_severity and intervention_type.

**Datové vstupy:**

- Crisis events (sentiment alerts, CAPS detection, CRM escalations)
- Post-crisis communication (emails, calls)
- Sentiment scores per post-crisis message
- Intervention log (what we did to resolve: call, meeting, discount)

**Výstupní metriky:**

- Average cooling-off time per client
- Recovery classification (quick/normal/slow/none)
- Korelace intervention_type × recovery_speed
- Historical recovery pattern per client
- Overall relationship resilience score

#### ✅ Dobrý stav

**Resilientní vztah — odpověď do 24h po krizi**

Po chybě v DPPO kalkulaci: klient odpověděl do 24h, sentiment normalizován za 3 dny. Quick recovery. Relationship strong enough to absorb incidents.

*Indikátory:*

- ✓ Cooling-off: 24h (response)
- ✓ Sentiment normalization: 3 days
- ✓ Classification: quick_recovery
- ✓ Historical pattern: 3/3 quick recoveries

*Doporučené akce:*

1. Pokračovat v kvalitní komunikaci
2. Klient je resilient — relationship health high

#### ❌ Rizikový stav

**14 dní ticha po chybě**

Po opakované chybě v DPH: klient neodpovídá 14 dní na žádnou komunikaci. Sentiment before silence: strongly negative. Classification: slow_recovery (borderline no_recovery). Relationship severely damaged.

*Indikátory:*

- ✗ Cooling-off: 14 days (and counting)
- ✗ 0 responses to 4 contact attempts
- ✗ Pre-crisis sentiment: −0.7
- ✗ Historical: first crisis — no recovery pattern

*Nápravná opatření:*

1. Senior partner osobní schůzka (ne email/telefon)
2. Připravit kompletní nápravu + kompenzaci
3. Aktivovat retention workflow
4. Pokud neodpoví do 21 dní: fysická návštěva / dopis

**Související analýzy:** 15-04, 23-13, 22-02

---

### 23-40 — Neotevřený report

**Zdroj:** login logy

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Vysoký — engagement a retention |
| **Status** | Produkce |

**Popis:**

Tracking otevření reportů a výstupů doručených klientům přes klientský portál. Systém sleduje, zda klient skutečně otevírá reporty, které pro něj připravujeme. Report nečtený 30+ dní je flag — klient buď nepoužívá portál, nebo nepotřebuje report.

Klienti, kteří platí za službu ale nekonzumují výstupy, jsou paradoxně highest churn risk — nezná hodnotu služby, snadno odejde.

Portal login tracking (session_id, page_views, document_opens) je primární datový zdroj.

**Metodologie:**

Report engagement tracking: 1) Portal document delivery log (report_id, client_id, delivered_date), 2) Portal open log (report_id, client_id, opened_date, view_duration), 3) Calculate: open_rate = opened / delivered per client, 4) Time-to-open: delivered_date → first_open_date, 5) Unread reports: delivered > 30 days ago, opened = false, 6) Trend per client.

**Datové vstupy:**

- Portal document delivery logs
- Portal open/view logs (session tracking)
- Report metadata (type, importance level)
- Client portal login frequency

**Výstupní metriky:**

- Report open rate per client (%)
- Avg time-to-open (days)
- Unread reports count per client
- Longest unread report age (days)
- Portal login frequency per client

#### ✅ Dobrý stav

**Všechny reporty otevřeny**

100 % open rate. Avg time-to-open: 1.5 days. Klient aktivně konzumuje výstupy. Portal login: 8×/month. Engaged client.

*Indikátory:*

- ✓ Open rate: 100 %
- ✓ Time-to-open: 1.5 days
- ✓ Portal logins: 8/month
- ✓ 0 unread reports

*Doporučené akce:*

1. Continue current report format
2. Ask for feedback — are reports useful?

#### ❌ Rizikový stav

**12 měsíců bez otevření**

0 % open rate za 12 měsíců. 12 reports delivered, 0 opened. Portal login: 0 za 12M. Klient platí za službu ale nevidí hodnotu. Churn risk: very high.

*Indikátory:*

- ✗ Open rate: 0 % (12M)
- ✗ 12 unread reports
- ✗ Portal login: 0 za 12M
- ✗ Pays full fee despite zero engagement

*Nápravná opatření:*

1. Kontaktovat klienta — ví, že má portál?
2. Přepnout doručování na email (portal nepoužívá)
3. Prezentovat klíčové insights osobně (ukázat hodnotu)
4. Retention risk — proaktivně budovat awareness hodnoty

**Související analýzy:** 17-03, 23-42, 10-01

---

### 23-41 — Chybějící faktura

**Zdroj:** anomálie

| | |
|---|---|
| **Frekvence** | Denně |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Střední — early warning klientského problému |
| **Status** | Produkce |

**Popis:**

Detekce anomálií v pravidelnosti dodávky dokladů od klienta. Systém buduje expected_delivery_pattern per klient (např. faktury vždy do 5. dne měsíce) a detekuje odchylky. Chybějící expected doklad je flag — klient má buď problém, nebo přestal aktivitu.

Pattern je budován z historických dat (min. 6M). Expected_date ± tolerance (default: 3 dny). Missing_document alert po překročení tolerance.

Tento signál je silnějším indikátorem problému než absence komunikace — klient může nekomunikovat protože je busy, ale chybějící faktura znamená chybějící byznys.

**Metodologie:**

Delivery pattern anomaly: 1) Build delivery schedule per client (historical: avg delivery_day_of_month ± std), 2) Expected delivery window: avg_day ± max(std, 3 days), 3) Monitor: document received within window? 4) Flag: expected but not received (after window close), 5) Severity: 1 missing = low, 2+ consecutive = high, 6) Korelace s communication pattern.

**Datové vstupy:**

- Document delivery history per client (DocuWare receive_date per doc_type)
- Expected delivery schedule (learned from history)
- Communication logs (is client responsive?)
- Client activity status (active/dormant)

**Výstupní metriky:**

- Expected delivery date per client per doc_type
- Missing documents count per month
- Consecutive missing months
- Historical delivery reliability per client (%)
- Korelace missing_docs × communication_gap

#### ✅ Dobrý stav

**Pravidelná dodávka**

Klient dodává faktury do 5. dne měsíce s 98 % reliability (24/24 měsíců). No missing documents. Predictable and reliable.

*Indikátory:*

- ✓ Delivery reliability: 98 %
- ✓ Avg delivery day: 4th (±1 day)
- ✓ 0 missing documents 24M
- ✓ Consistent pattern

*Doporučené akce:*

1. Monitor as standard
2. Flag any deviation immediately

#### ❌ Rizikový stav

**Vždy do 5., tentokrát ne**

Klient who always delivers by 5th hasn't delivered by 10th. No communication either. Last contact: 3 weeks ago. Pattern break after 18 months of perfect reliability.

*Indikátory:*

- ✗ Expected: by 5th, now 10th — missing
- ✗ 18-month reliability: 100 % broken
- ✗ No communication for 3 weeks
- ✗ Last contact: routine email (no issues mentioned)

*Nápravná opatření:*

1. Kontaktovat klienta — 'čekáme na doklady, je vše OK?'
2. Prověřit další signály (portal login, payment behavior)
3. Pokud neodpoví 48h: telefon
4. Zapsat do CRM jako concern flag

**Související analýzy:** 23-42, 23-40, 10-01

---

### 23-42 — Měsíc bez kontaktu

**Zdroj:** drop detection

| | |
|---|---|
| **Frekvence** | Denně |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Kritický — churn detection |
| **Status** | Produkce |

**Popis:**

Communication gap detection — měření doby od posledního kontaktu (email, telefon, portal login, document delivery) s klientem. Threshold > 30 dní je warning, > 60 dní je alert, > 90 dní je critical.

Systém agreguje všechny komunikační kanály (last_email_date, last_call_date, last_portal_login, last_document_received) a bere MAX jako last_contact_date. Days_since_last_contact = today − last_contact_date.

Tichý odchod je nejčastější forma churnu u účetních kanceláří — klient prostě přestane komunikovat.

**Metodologie:**

Gap detection: 1) Per client: last_contact_date = MAX(last_email, last_call, last_portal, last_document), 2) days_since_last_contact = current_date − last_contact_date, 3) Severity: 30-60 days = warning, 60-90 = alert, >90 = critical, 4) Compare with client's historical contact_frequency (personalized thresholds), 5) Auto-escalation workflow per severity level.

**Datové vstupy:**

- Email logs (last received email per client)
- Daktela call logs (last call per client)
- Portal login logs (last login per client)
- DocuWare receive logs (last document per client)

**Výstupní metriky:**

- Days since last contact per client
- Severity level (warning/alert/critical)
- Historical contact frequency per client (for baseline)
- Clients in each severity bucket (count)
- Trend: new entries in alert/critical per month

#### ✅ Dobrý stav

**Pravidelný kontakt**

Max gap: 12 days (between monthly reports). All clients contacted within 30 days. 0 warnings, 0 alerts, 0 critical.

*Indikátory:*

- ✓ 0 clients in warning zone
- ✓ 0 clients in alert zone
- ✓ 0 clients in critical zone
- ✓ Avg contact frequency: bi-weekly

*Doporučené akce:*

1. Maintain current contact rhythm
2. Monitor dashboard daily

#### ❌ Rizikový stav

**4 měsíce ticho — tichý odchod**

Klient: 127 days since last contact (critical). Last email: 4 months ago (routine). No response to 3 follow-ups. Portal: 0 logins. Documents: none received. Classic silent churn pattern.

*Indikátory:*

- ✗ 127 days since last contact (critical)
- ✗ 3 unanswered follow-up emails
- ✗ Portal: 0 logins for 4M
- ✗ 0 documents received for 4M

*Nápravná opatření:*

1. Osobní telefonát (senior partner, ne junior)
2. Pokud neodpoví: doporučený dopis
3. Prověřit ARES — firma ještě existuje?
4. Připravit exit plan (finální vyúčtování, archivace)

**Související analýzy:** 23-41, 23-40, 10-01, 22-01

---

### 23-43 — Chybějící pozice

**Zdroj:** peer benchmark

| | |
|---|---|
| **Frekvence** | Ročně |
| **Automatizace** | 70 % automatizováno |
| **Business impact** | Střední — upsell identifikace |
| **Status** | Produkce |

**Popis:**

Peer benchmark: porovnání organizační struktury klienta s obdobnými firmami (same industry, same size). Chybějící typická pozice (controller, HR manager, IT admin) signalizuje buď nedostatečnou organizační zralost, nebo outsourcing příležitost.

Systém agreguje organizační data z payroll (job titles) across portfolio a buduje 'typical structure' per industry × size segment. Klient bez typické pozice je kandidát na naše doplňkové služby.

Commercial insight: pokud klient nemá controllera ale peers mají, nabídnout outsourced controlling.

**Metodologie:**

Organizational peer benchmark: 1) Extract job_title per employee per client (from payroll), 2) Standardize job titles (NLP mapping to standard roles), 3) Build role_frequency per industry × size segment, 4) Compare client roles vs. segment typical roles, 5) Missing roles = gap, 6) Score: gap_count / expected_roles.

**Datové vstupy:**

- Payroll data — job_title per client per employee
- Client metadata (industry NACE, employee count, revenue)
- Portfolio-wide role frequency database
- Standard role mapping dictionary

**Výstupní metriky:**

- Missing roles per client (vs. segment typical)
- Gap score (0-1, higher = more missing roles)
- Most commonly missing role per segment
- Upsell opportunities (services we could fill the gap)
- Client organizational maturity score

#### ✅ Dobrý stav

**Kompletní tým — žádné missing roles**

Klient má všechny typické role pro svůj segment (industry: manufacturing, 50-100 employees). Includes: controller, HR manager, IT admin. Organizational maturity: high.

*Indikátory:*

- ✓ 0 missing roles vs. segment
- ✓ Gap score: 0
- ✓ All typical positions filled
- ✓ Organizational maturity: high

*Doporučené akce:*

1. Standard service — no upsell needed
2. Annual re-assessment

#### ❌ Rizikový stav

**Nemá controllera — peers mají**

Client (manufacturing, 70 employees) lacks controller position. 85 % of peers in same segment have one. Also missing: HR manager (60 % of peers have one). Gap score: 0.4.

*Indikátory:*

- ✗ Missing: controller (85 % peers have)
- ✗ Missing: HR manager (60 % peers have)
- ✗ Gap score: 0.4 (moderate)
- ✗ No controlling outputs in last 12M

*Nápravná opatření:*

1. Nabídnout outsourced controlling service
2. Prezentovat peer benchmark data klientovi
3. Kalkulovat ROI controlling služby
4. Nabídnout HR administration jako doplňkovou službu

**Související analýzy:** 16-02, 16-04, 23-31

---

### 23-44 — Gap v číselné řadě

**Zdroj:** doklady

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Vysoký — zákonná compliance |
| **Status** | Produkce |

**Popis:**

Rozšířená verze 23-16 (faktury) na VŠECHNY typy dokladů — příjemky, výdejky, pokladní doklady, interní doklady. Systém kontroluje číselnou řadu per typ dokladu per klient. Mezery v jakékoli řadě jsou compliance concern.

Dle zákona o účetnictví (§ 11) musí být doklady číslovány průběžně. Mezera v řadě pokladních dokladů je zvlášť critical — může signalizovat nepřiznaný hotovostní příjem.

Systém buduje per-document-type sequence model a reports gaps periodicky.

**Metodologie:**

Universal document number continuity check: 1) Per client per document_type: extract document_numbers, 2) Sort chronologically, 3) Detect gaps (consecutive missing numbers), 4) Risk scoring: gap_size × document_type_risk (cash receipts > invoices > internal), 5) Aggregate: total gaps per client, 6) Trend: new gaps per quarter.

**Datové vstupy:**

- All document numbers per client per type (ERP export)
- Document type classification (invoice, receipt, internal, payroll...)
- Document type risk weights (cash > bank > internal)
- Historical gap data for trend

**Výstupní metriky:**

- Gaps per document type per client
- Risk-weighted gap score
- Largest gap per type
- Trend: new gaps per quarter
- Compliance risk classification (low/medium/high)

#### ✅ Dobrý stav

**Kompletní řady — 0 gaps**

All document types have complete, unbroken sequences. 0 gaps across all types. Perfect record-keeping.

*Indikátory:*

- ✓ 0 gaps across all document types
- ✓ All sequences complete and continuous
- ✓ Risk-weighted score: 0
- ✓ Clean 12M

*Doporučené akce:*

1. Standard quarterly check
2. Excellent compliance status

#### ❌ Rizikový stav

**12 chybějících pokladních dokladů**

12 gaps in cash receipt sequence (PPD-045 to PPD-056 missing). High risk: cash documents. Possible unreported cash income. Also: 3 gaps in internal docs (lower concern).

*Indikátory:*

- ✗ 12 gaps in cash receipts (highest risk type)
- ✗ 3 gaps in internal documents
- ✗ Risk-weighted score: 0.85 (high)
- ✗ Pattern: gaps cluster around month-end

*Nápravná opatření:*

1. Urgentně konfrontovat klienta
2. Požádat o vysvětlení chybějících dokladů
3. Dokumentovat jako compliance risk
4. Zvážit odmítnutí zodpovědnosti za neúplné účetnictví

**Související analýzy:** 23-16, 23-18, 1-07

---

### 23-45 — Kolektivní nálada

**Zdroj:** interní sentiment

| | |
|---|---|
| **Frekvence** | Denně |
| **Automatizace** | 75 % automatizováno |
| **Business impact** | Vysoký — team health → service quality |
| **Status** | Pilot |

**Popis:**

Agregovaný sentiment z interní komunikace kanceláře (Slack, email, meeting notes). Systém měří celkovou náladu týmu a detekuje signifikantní propady, které korelují s událostmi (restrukturalizace, ztráta klíčového klienta, personální změny).

Sentiment je měřen per message, agregován per den/týden pro celý tým. Moving average (14 dní) vyhlazuje denní fluktuace. Propad > 2σ je alert.

Zdravá kancelář = zdravé klienti. Interní sentiment přímo ovlivňuje kvalitu služby.

**Metodologie:**

Internal sentiment aggregation: 1) Collect internal Slack messages + internal emails (opt-in), 2) NLP sentiment per message, 3) Daily aggregate (weighted by message length), 4) 14-day moving average, 5) Z-score per day (deviation from 90-day rolling mean), 6) Alert: z < −2, 7) Event correlation: link sentiment drops to specific events (CRM).

**Datové vstupy:**

- Internal Slack messages (opt-in, anonymized for individual protection)
- Internal emails between team members
- Meeting notes and summaries
- HR events (hires, departures, restructuring)

**Výstupní metriky:**

- Team sentiment index (daily, weekly)
- 14-day moving average
- Z-score per day
- Event correlation (sentiment drop ↔ specific event)
- Individual variance (optional, anonymized)

#### ✅ Dobrý stav

**Stabilně pozitivní nálada**

Team sentiment index: 0.65 (positive). 14-day MA stable. No z-drops below −1 for 6M. Team is healthy and engaged.

*Indikátory:*

- ✓ Sentiment index: 0.65 (positive zone)
- ✓ Z-score: all within ±1 for 6M
- ✓ No event-triggered drops
- ✓ Low variance across team

*Doporučené akce:*

1. Maintain current culture
2. Quarterly team health check

#### ❌ Rizikový stav

**Propad po restrukturalizaci**

Sentiment index dropped from 0.65 to 0.15 after restructuring announcement. Z-score: −3.2. Duration: 3 weeks and not recovering. Risk: increased errors, decreased service quality, potential departures.

*Indikátory:*

- ✗ Sentiment drop: 0.65 → 0.15
- ✗ Z-score: −3.2 (severe)
- ✗ Duration: 3 weeks (no recovery)
- ✗ Correlated event: restructuring (announced 3 weeks ago)

*Nápravná opatření:*

1. Management transparent communication — address concerns
2. 1:1 meetings with each team member
3. Increased monitoring of service quality (errors, response time)
4. Consider slowing restructuring pace

**Související analýzy:** 23-46, 23-30, 23-48

---

### 23-46 — Burnout index

**Zdroj:** chyby × přesčasy

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 80 % automatizováno |
| **Business impact** | Vysoký — employee retention a service quality |
| **Status** | Produkce |

**Popis:**

Composite burnout index per zaměstnanec vypočítaný z: error rate, overtime hours, vacation usage, sick days, communication sentiment, response time degradation. Index 0-100 where 0 = healthy, 100 = critical burnout.

Každá dimenze je normalizována na 0-1 škálu a vážena. Weights: overtime (0.25), error_rate_trend (0.20), sick_days_trend (0.15), vacation_unused (0.15), sentiment_decline (0.15), response_time_increase (0.10).

Index > 60 = concern, > 80 = intervention needed.

**Metodologie:**

Burnout composite index: 1) Collect per user: overtime_hours, error_rate, sick_days, unused_vacation, sentiment_trend, response_time_trend, 2) Normalize each to 0-1 (min-max per portfolio), 3) Weighted sum: index = Σ(weight_i × norm_i), 4) Scale to 0-100, 5) Thresholds: < 30 = healthy, 30-60 = watch, 60-80 = concern, > 80 = critical.

**Datové vstupy:**

- Overtime hours per user (HR/timesheet system)
- Error rate per user (audit trail — 23-30)
- Sick days per user (HR)
- Unused vacation days per user (HR)
- Internal sentiment per user (23-45, anonymized opt-in)
- Response time per user (email/task response times)

**Výstupní metriky:**

- Burnout index per user (0-100)
- Burnout classification (healthy/watch/concern/critical)
- Dominant contributing factor per user
- Trend: index trajectory (improving/worsening)
- Team average burnout index

#### ✅ Dobrý stav

**Burnout index 12 — zdravý**

Index: 12 (healthy zone). All dimensions in normal range. Employee takes regular vacation, has low overtime, low error rate, positive sentiment.

*Indikátory:*

- ✓ Burnout index: 12/100 (healthy)
- ✓ Overtime: 2h/month (low)
- ✓ Error rate: 0.3 % (excellent)
- ✓ Vacation used: 90 % (healthy)

*Doporučené akce:*

1. Maintain current workload
2. Quarterly re-assessment

#### ❌ Rizikový stav

**Burnout index 78 — kritické**

Index: 78 (concern, approaching critical). Dominant factors: overtime 25h/month (weight: 0.25 × 0.9 = 0.225), error_rate_trend +0.5 %/month (weight: 0.20 × 0.8 = 0.16), unused vacation 15 days (weight: 0.15 × 0.75 = 0.11). Intervention needed.

*Indikátory:*

- ✗ Burnout index: 78/100 (concern/critical boundary)
- ✗ Overtime: 25h/month
- ✗ Error rate trend: +0.5 %/month (worsening)
- ✗ 15 unused vacation days

*Nápravná opatření:*

1. Okamžitě redistribuovat workload
2. Naplánovat dovolenou (minimálně 5 dní)
3. 1:1 meeting s manažerem — identifikovat stresory
4. Sledovat index po intervenci (weekly)

**Související analýzy:** 23-30, 23-32, 23-45

---

### 23-47 — Graf vzájemné podpory

**Zdroj:** kdo komu pomáhá

| | |
|---|---|
| **Frekvence** | Kvartálně |
| **Automatizace** | 70 % automatizováno |
| **Business impact** | Střední — knowledge management a resilience |
| **Status** | Produkce |

**Popis:**

Grafová analýza interních help-request patterns: kdo komu pomáhá? Systém buduje directed graph z interních komunikací (Slack mentions, forwarded emails, shared task assignments) a měří network density a isolated nodes.

Hustá síť = zdravá spolupráce. Isolated nodes = knowledge silos. Central nodes = potential bus factor. Graph je analyzován standardními network metrics (degree, betweenness, clustering coefficient).

Prakticky: pokud Alice nikdy nepomáhá nikomu a nikdo nepomáhá jí, buď je self-sufficient (good) nebo isolated (bad).

**Metodologie:**

Help network analysis: 1) Parse internal Slack mentions (@user + question context), 2) Forwarded email detection (Fwd: + CC additions), 3) Shared task assignments (ERP task forwarding), 4) Build directed graph: helper → helpee (weighted by frequency), 5) Metrics: degree centrality, betweenness, clustering coefficient, isolates, 6) Identify: hubs (helpers), isolates (neither help nor get help).

**Datové vstupy:**

- Slack message logs (mentions, threads, channels)
- Internal email forwarding patterns
- ERP task assignment/forwarding logs
- Team member list and roles

**Výstupní metriky:**

- Network density (0-1, higher = more collaboration)
- Isolated nodes (users with 0 help connections)
- Hub nodes (top helpers — potential bus factor)
- Clustering coefficient (subgroup formation)
- Graph visualization (force-directed layout)

#### ✅ Dobrý stav

**Hustá síť — zdravá spolupráce**

Network density: 0.72 (high). 0 isolated nodes. Everyone both gives and receives help. No single hub dominates (max betweenness: 0.18). Healthy, collaborative team.

*Indikátory:*

- ✓ Network density: 0.72
- ✓ 0 isolates
- ✓ Max betweenness: 0.18 (no single hub)
- ✓ Avg clustering: 0.65 (strong subgroups)

*Doporučené akce:*

1. Maintain collaborative culture
2. Use graph to identify mentoring pairs

#### ❌ Rizikový stav

**3 izolovaní jedinci — knowledge silos**

3 team members are isolated (0 help connections both in and out). They neither ask for help nor provide it. Knowledge is siloed. If any leaves, their clients' knowledge is lost.

*Indikátory:*

- ✗ 3 isolates (out of 12 team members)
- ✗ Network density: 0.35 (low)
- ✗ 1 dominant hub (betweenness 0.45 — single point of failure)
- ✗ Clustering: 0.25 (weak subgroups)

*Nápravná opatření:*

1. Pair isolated members with mentors
2. Implement cross-training program
3. Create knowledge sharing sessions (weekly)
4. Redistribute workload to create natural collaboration needs

**Související analýzy:** 23-48, 14-05, 23-45

---

### 23-48 — Bus factor

**Zdroj:** exkluzivní tickety

| | |
|---|---|
| **Frekvence** | Kvartálně |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Kritický — operational resilience |
| **Status** | Produkce |

**Popis:**

Bus factor analýza: kolik lidí umí zpracovat daného klienta / daný typ úkolu? Systém analyzuje task assignment history — pokud klient X byl VŽDY zpracován výhradně účetním A (nikdy nikým jiným), bus factor = 1. Pokud A onemocní, nikdo nezná specifika klienta X.

Metrika: per klient × task_type → unique_handlers count. Bus factor = min(unique_handlers) across task_types per client.

Cíl: bus factor >= 3 per client (primární + 2 backup).

**Metodologie:**

Bus factor calculation: 1) Task history per client: extract handler_user_id per task per period, 2) Count unique handlers per client per task_type, 3) Bus factor = MIN(unique_handlers) across task_types, 4) Identify: exclusive handlers (only person who ever handled a task_type for client), 5) Risk ranking: clients by bus factor (ascending).

**Datové vstupy:**

- ERP task assignment history (client_id, task_type, handler_user_id, date)
- User absence data (for impact estimation)
- Client complexity score (higher complexity = higher risk)
- Knowledge documentation status per client

**Výstupní metriky:**

- Bus factor per client (minimum unique handlers)
- Exclusive handler pairs (user → client, no backup)
- Clients with bus factor = 1 (highest risk)
- Team bus factor distribution
- Estimated impact if top exclusive handler absent 2 weeks

#### ✅ Dobrý stav

**Bus factor >= 3 — resilient**

All clients have bus factor >= 3. Each client has been handled by at least 3 different accountants in the past 12M. If any person is absent, 2 backups exist.

*Indikátory:*

- ✓ Min bus factor: 3 (across all clients)
- ✓ 0 exclusive handler pairs
- ✓ Cross-training complete
- ✓ Documentation up-to-date per client

*Doporučené akce:*

1. Maintain rotation schedule
2. Annual cross-training refresh

#### ❌ Rizikový stav

**1 člověk — zítra může chybět**

12 clients have bus factor = 1. All exclusively handled by accountant Marie. If Marie is absent, 12 clients have zero coverage. Marie handles 35 % of all tickets — massive concentration risk.

*Indikátory:*

- ✗ 12 clients with bus factor = 1
- ✗ All tied to Marie (single person)
- ✗ Marie: 35 % of all tickets
- ✗ 0 knowledge documentation for 8 of 12 clients

*Nápravná opatření:*

1. Immediately start cross-training backup for Marie's clients
2. Document Marie's client specifics (knowledge capture)
3. Create rotation plan — Marie + backup alternate quarterly
4. Priority: document top 5 highest-revenue clients first

**Související analýzy:** 23-47, 14-05, 23-32

---

### 23-49 — AI Act / ViDA zmínky

**Zdroj:** hovory

| | |
|---|---|
| **Frekvence** | Kvartálně |
| **Automatizace** | 80 % automatizováno |
| **Business impact** | Střední — strategic positioning a upsell |
| **Status** | Produkce |

**Popis:**

Keyword detection v Daktela call transcripts a emailech pro strategicky relevantní regulační témata (AI Act, ViDA — VAT in the Digital Age, IFRS updates, DAC7, CBAM). Klienti, kteří se ptají na budoucí regulace, jsou premium — proaktivní a investují do compliance.

Klienti, kteří se neptají, potřebují edukaci — jsou potenciálně ohroženi regulací, o které nevědí.

Systém slouží i jako trigger pro proaktivní poradenství — jakmile detekuje keyword u jednoho klienta, nabídne edukaci všem relevantním.

**Metodologie:**

Keyword detection: 1) Daktela call transcript search (ASR output), 2) Email body full-text search, 3) Keyword dictionary: {AI_Act, ViDA, DAC7, CBAM, IFRS_16, IFRS_17, digitální_daň, KYC, AML_6}, 4) Per client: mention_count per keyword per quarter, 5) Segment: proactive (mentions > 0) vs. silent (mentions = 0), 6) Portfolio-wide: which topics are trending.

**Datové vstupy:**

- Daktela call transcripts (ASR/AI transcription)
- Email corpus per client (full text)
- Keyword dictionary (regulatory topics)
- Client industry data (for relevance scoring)

**Výstupní metriky:**

- Keyword mentions per client per quarter
- Proactive clients count (mentioned at least 1 keyword)
- Silent clients count (0 mentions, but relevant industry)
- Trending topics (portfolio-wide keyword frequency)
- Relevance score per client per topic (industry match)

#### ✅ Dobrý stav

**Klient se ptá na AI Act**

Klient zmínil AI Act ve 3 hovorech za Q1. Also asked about ViDA and DAC7. Proactive, forward-thinking client. Premium consulting opportunity.

*Indikátory:*

- ✓ 3 AI Act mentions in Q1
- ✓ Also: ViDA (2), DAC7 (1)
- ✓ Classification: proactive
- ✓ Industry relevance: high (IT services)

*Doporučené akce:*

1. Nabídnout AI Act compliance konzultaci
2. Připravit personalized briefing na ViDA/DAC7
3. Pozice: 'strategic advisor, not just accountant'
4. Premium pricing justified by proactive engagement

#### ❌ Rizikový stav

**Nikdo se neptá — budou překvapeni**

75 % klientů v IT sektoru: 0 mentions of AI Act (highly relevant for them). They will be impacted but are unaware. Our role: educate proactively.

*Indikátory:*

- ✗ 75 % relevant clients: 0 keyword mentions
- ✗ AI Act effective date: 12 months away
- ✗ Industry relevance: high (but awareness: zero)
- ✗ Competitor positioning: some already offering AI Act advisory

*Nápravná opatření:*

1. Připravit AI Act briefing pro IT klienty
2. Odeslat proaktivní email/newsletter
3. Nabídnout compliance assessment workshop
4. First-mover advantage: nabídnout dřív než konkurence

**Související analýzy:** 23-50, 23-51, 19-06

---

### 23-50 — IFRS 16 dotazy

**Zdroj:** komunikace

| | |
|---|---|
| **Frekvence** | Kvartálně |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Střední — premium consulting opportunity |
| **Status** | Produkce |

**Popis:**

Specifická detekce dotazů na IFRS 16 (Leases) a další IFRS standardy v komunikaci s klienty. IFRS adoption v CZ je growing trend (zejména pro firmy s mezinárodními matkami). Klient, který se ptá = potential premium consulting client.

Systém detekuje zmínky IFRS (IFRS 16, IFRS 15, IFRS 9) a kontextualizuje — ptá se klient obecně (awareness stage) nebo specificky (implementation stage)?

Téma analýzy komunikace rozšiřuje na všechny strategické konzultační příležitosti.

**Metodologie:**

Communication topic analysis: 1) Full-text search: IFRS patterns (IFRS\\s*\\d+, IAS\\s*\\d+), 2) Context classification: general_question vs. specific_implementation, 3) Per client: topic_engagement_level (none/aware/implementing), 4) Cross-reference with client profile (international parent? audit requirement?), 5) Consulting opportunity scoring.

**Datové vstupy:**

- Email corpus per client
- Daktela call transcripts
- Client profile (parent company, audit requirements)
- Service portfolio (do we offer IFRS consulting?)

**Výstupní metriky:**

- IFRS mention count per client
- Engagement level classification (none/aware/implementing)
- Clients with international parent (IFRS likely mandatory)
- Consulting opportunity score per client
- Total addressable market for IFRS service in portfolio

#### ✅ Dobrý stav

**Proaktivní klient — IFRS consulting opportunity**

Client asked specific IFRS 16 implementation questions (2 emails, 1 call). Has international parent requiring IFRS reporting. Ready for consulting engagement.

*Indikátory:*

- ✓ 3 IFRS 16 mentions (specific implementation questions)
- ✓ International parent: yes (German AG)
- ✓ Audit requirement: yes (mandatory IFRS)
- ✓ Engagement level: implementing

*Doporučené akce:*

1. Nabídnout IFRS 16 implementation project
2. Připravit proposal s scope a pricing
3. Connect with IFRS specialist (internal/external)
4. Premium engagement opportunity: 200K+ CZK project

#### ❌ Rizikový stav

**Ignoruje IFRS — bude mít problém**

Client has German parent requiring IFRS, but 0 IFRS mentions in communication. Likely unaware of obligation or postponing. Audit risk: non-compliance with parent's requirements.

*Indikátory:*

- ✗ 0 IFRS mentions (awareness: none)
- ✗ International parent: German AG (requires IFRS)
- ✗ Upcoming audit: Q4 2026
- ✗ No IFRS adjustments in current reporting

*Nápravná opatření:*

1. Proaktivně informovat o IFRS povinnosti
2. Nabídnout gap analysis (current vs. IFRS required)
3. Varovat před audit riskem
4. Urgence: Q4 audit → start ASAP

**Související analýzy:** 23-49, 23-51, 19-06

---

### 23-51 — «Moc papírování»

**Zdroj:** stížnosti

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 85 % automatizováno |
| **Business impact** | Střední — upsell a customer satisfaction |
| **Status** | Produkce |

**Popis:**

Sentiment-aware keyword detection pro stížnosti na administrativní zátěž. Variace: 'moc papírování', 'složité', 'zbytečná byrokracie', 'proč to nemůže být jednodušší', 'zase formulář'. Systém detekuje frustraci s procesem, ne s naší službou.

Klienti, kteří si stěžují na papírování, jsou ideální kandidáti pro automatizační služby (document upload portal, OCR, auto-classification). Stížnost = sales opportunity.

Systém klasifikuje stížnosti do kategorií: paperwork, complexity, speed, cost, communication.

**Metodologie:**

Complaint detection: 1) Keyword + sentiment combined search (keywords IN negative context), 2) Keywords: papírování, papíry, formuláře, byrokracie, složité, zbytečné, administrativa, 3) Sentiment filter: only negative context (exclude neutral mentions), 4) Categorize: paperwork_complaint, complexity_complaint, speed_complaint, 5) Aggregate per client, 6) Automation opportunity scoring.

**Datové vstupy:**

- Email corpus per client (full text + sentiment)
- Daktela call transcripts + sentiment
- Complaint keyword dictionary (Czech + Slovak variations)
- Client's current service level (basic/standard/premium/digital)

**Výstupní metriky:**

- Complaint count per client per category
- Automation opportunity score per client
- Current digitalization level vs. complaint frequency
- Most complained-about process (per portfolio)
- Revenue opportunity from automation upsell

#### ✅ Dobrý stav

**0 stížností na administrativu**

Client: 0 paperwork complaints in 12M. Uses digital portal, uploads documents electronically. Happy with process efficiency.

*Indikátory:*

- ✓ 0 paperwork complaints
- ✓ Digital service level: premium
- ✓ Portal usage: active (weekly)
- ✓ Satisfaction: high

*Doporučené akce:*

1. Use as reference for automation benefits
2. Maintain service level

#### ❌ Rizikový stav

**Opakované stížnosti — automatizační příležitost**

Client complained about paperwork 7× in 6M. Phrases: 'zase papíry', 'proč to nejde elektronicky', 'v roce 2026 stále tiskneme'. Currently on basic (paper) service level. Clear automation upsell target.

*Indikátory:*

- ✗ 7 paperwork complaints in 6M
- ✗ Current level: basic (paper)
- ✗ Recurring phrases: 'proč elektronicky ne?'
- ✗ Frustration trend: increasing

*Nápravná opatření:*

1. Nabídnout digital upgrade balíček
2. Připravit ROI kalkulaci (time saved + cost)
3. Demo klientského portálu
4. Pricing: premium tier s digitalizací included

**Související analýzy:** 23-06, 23-52, 16-02

---

### 23-52 — Teplocitlivé účtenky

**Zdroj:** typy dokladů

| | |
|---|---|
| **Frekvence** | Kvartálně |
| **Automatizace** | 80 % automatizováno |
| **Business impact** | Střední — archival compliance a upsell |
| **Status** | Produkce |

**Popis:**

Detekce podílu teplocitlivých (thermal) účtenek v dokladové agendy klienta. Thermal receipts fade over time — long-term archival risk. Systém detekuje thermal receipts z: 1) OCR quality score (thermal prints have specific characteristics), 2) Document age vs. readability degradation.

Vysoký podíl thermal receipts = klient preferuje papírové doklady = digitální negramotnost / malé podniky / gastro/retail.

Riziko: thermal receipts older than 2 years may be unreadable → archival compliance risk (§ 31 ZoÚ — 5 year retention).

**Metodologie:**

Thermal receipt detection: 1) OCR confidence score distribution (thermal: lower, inconsistent), 2) Document classification: thermal_receipt vs. printed_invoice vs. digital_pdf, 3) Thermal ratio: thermal_receipts / total_receipts per client, 4) Age × readability check: OCR score of old thermal receipts, 5) Archival risk scoring.

**Datové vstupy:**

- DocuWare documents with OCR metadata (confidence scores)
- Document classification (type: receipt, invoice, etc.)
- Document age (received_date)
- OCR re-scan results for older documents

**Výstupní metriky:**

- Thermal receipt ratio per client (%)
- Archival risk: unreadable receipts count
- Digitalization score (% digital vs. paper)
- Trend: thermal ratio over time (decreasing = improving)
- Estimated archival cost (re-scanning degraded receipts)

#### ✅ Dobrý stav

**Digitální doklady — 0 thermal**

Client: 100 % digital documents (PDF invoices, digital receipts). 0 thermal receipts. Archival risk: zero. Modern, digitally literate client.

*Indikátory:*

- ✓ Thermal ratio: 0 %
- ✓ Digitalization: 100 %
- ✓ Archival risk: none
- ✓ All documents: long-term readable

*Doporučené akce:*

1. Maintain digital workflow
2. Use as case study for paper-to-digital migration

#### ❌ Rizikový stav

**85 % thermal receipts — archival risk**

Client: 85 % thermal receipts (gastro/retail business). 23 receipts from 2024 already partially unreadable (OCR confidence < 40 %). 5-year retention requirement not met for these.

*Indikátory:*

- ✗ Thermal ratio: 85 %
- ✗ 23 partially unreadable receipts (2024)
- ✗ OCR confidence < 40 % on degraded receipts
- ✗ Archival compliance risk: HIGH

*Nápravná opatření:*

1. Urgentně naskenovat/vyfotit degradující receipts
2. Navrhnout přechod na digitální pokladnu
3. Educate: thermal receipts + zákon o účetnictví
4. Nabídnout document management service

**Související analýzy:** 23-06, 23-51, 23-14

---

### 23-53 — První datovka

**Zdroj:** detekce

| | |
|---|---|
| **Frekvence** | Týdně |
| **Automatizace** | 90 % automatizováno |
| **Business impact** | Střední — relationship management a upsell |
| **Status** | Produkce |

**Popis:**

Detekce prvního použití datové schránky (datovka) klientem. Pro firmy, které historicky nepoužívaly datovku (e.g., vše přes poštu), je první datovka signálem generační změny v řízení — nový management, digitalizace, nebo zákonná povinnost.

Systém sleduje prvni_datovka_date per client z komunikačních logů (příchozí zprávy z ISDS). Nový datovka uživatel = event pro account managera.

Kontext: od 2023 povinná datovka pro právnické osoby — ale mnozí ignorují. První skutečné použití (ne jen aktivace) je milestone.

**Metodologie:**

First datovka detection: 1) ISDS communication logs — first message from client via datovka, 2) Compare with historical communication channels per client, 3) If first_datovka_date is recent (< 6M): flag as 'first-time datovka user', 4) Korelace s management changes (new contact person?), 5) Alert account manager.

**Datové vstupy:**

- ISDS/datovka message logs (sender_id, date, subject)
- Client communication history (channels used historically)
- Client contact person changes (CRM)
- Datovka activation date vs. first actual message date

**Výstupní metriky:**

- First datovka date per client
- Time since datovka activation vs. first use
- Channel evolution per client (paper → email → datovka)
- Correlation with management change
- Clients still not using datovka (despite obligation)

#### ✅ Dobrý stav

**Zkušený uživatel datovky — 3+ roky**

Client has been using datovka for 5+ years. Regular usage (monthly). Comfortable with digital communication. Digitally mature.

*Indikátory:*

- ✓ Datovka usage: 5+ years
- ✓ Monthly message frequency
- ✓ No paper correspondence for 3+ years
- ✓ Digital maturity: high

*Doporučené akce:*

1. Standard digital communication
2. No special attention needed

#### ❌ Rizikový stav

**První datovka — generační zlom**

Client's first datovka message received 3 weeks ago. Previously: only paper and email. Coincides with new contact person (son of founder). Generational leadership change in progress.

*Indikátory:*

- ✗ First datovka: 3 weeks ago
- ✗ Previous channels: paper + email only
- ✗ New contact person: son of founder
- ✗ Multiple digital first events in parallel

*Nápravná opatření:*

1. Proaktivně přivítat digitální posun
2. Nabídnout digitální upgrade služeb
3. Představit se novému kontaktu (synovi)
4. Mapovat nové potřeby nového vedení

**Související analýzy:** 13-06, 18-01, 23-54

---

### 23-54 — «Odesláno z iPhonu»

**Zdroj:** podpisy

| | |
|---|---|
| **Frekvence** | Měsíčně |
| **Automatizace** | 95 % automatizováno |
| **Business impact** | Nízký — komunikační optimalizace |
| **Status** | Produkce |

**Popis:**

Detekce device signature v emailech klienta. 'Odesláno z iPhonu' / 'Sent from my iPad' / 'Sent from Samsung Galaxy' v email footer signalizuje mobilní komunikaci. Klient, který vždy odpovídá z mobilu, rozhoduje na cestách — kratší pozornost, rychlejší (ale méně promyšlená) rozhodnutí.

Systém parsuje email footer/signature pro known mobile signatures a User-Agent header (pokud dostupný). Per-client mobile_ratio = mobile_emails / total_emails.

Praktické využití: pro mobile-first klienty zjednodušit komunikaci (kratší emaily, bullet points, mobile-friendly reporty).

**Metodologie:**

Device detection: 1) Parse email body — last 5 lines for known mobile signatures ('Odesláno z', 'Sent from my', 'Get Outlook for'), 2) Parse email User-Agent header (if present), 3) Classify: desktop / mobile / tablet / unknown, 4) Mobile ratio: mobile_emails / total per client, 5) Trend: increasing mobile usage, 6) Response time × device correlation.

**Datové vstupy:**

- Email body text — last 5 lines (signature/footer)
- Email headers — User-Agent, X-Mailer (if available)
- Known mobile signature dictionary
- Response time per email (for device correlation)

**Výstupní metriky:**

- Mobile ratio per client (%)
- Device distribution (desktop/mobile/tablet)
- Response time × device (faster on mobile?)
- Trend: mobile ratio increasing over time?
- Time-of-day × device (mobile at night/weekend?)

#### ✅ Dobrý stav

**Desktop — kancelářový komunikátor**

Client: 92 % desktop emails. Responds from office during business hours. Detailed, thorough responses. Desktop-optimized communication works well.

*Indikátory:*

- ✓ Mobile ratio: 8 % (occasional travel)
- ✓ Primary device: desktop (Outlook)
- ✓ Response hours: 9-17 weekdays
- ✓ Avg email length: 150+ words (thoughtful)

*Doporučené akce:*

1. Standard communication format (detailed, attached reports)
2. Desktop-optimized portal

#### ❌ Rizikový stav

**Vždy iPhone — mobile-first rozhodovatel**

Client: 87 % mobile emails ('Odesláno z iPhonu'). Responds at all hours (23:00, weekends). Short responses (avg 12 words). Makes quick decisions but may miss details in long emails/reports.

*Indikátory:*

- ✗ Mobile ratio: 87 %
- ✗ Primary device: iPhone
- ✗ Response hours: distributed (no clear business hours)
- ✗ Avg email length: 12 words (very brief)

*Nápravná opatření:*

1. Přizpůsobit komunikaci: krátké emaily, bullet points
2. Mobile-friendly report formát (key takeaways first)
3. Pro důležitá rozhodnutí: telefonát, ne email
4. Klíčové info v prvních 2 větách (above the fold on mobile)

**Související analýzy:** 17-04, 23-53, 15-01

---

