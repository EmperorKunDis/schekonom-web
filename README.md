# SCH-EKONOM digitální cockpit

Veřejná interaktivní ukázka digitálního klientského portálu pro účetní kancelář SCH-EKONOM. Projekt kombinuje prezentační web se statickým demo rozhraním pro role majitele, zaměstnance a klienta.

[Otevřít živé demo](https://sch.praut.cz/)

> Demo pracuje pouze s lokálními ukázkovými daty. Nejde o produkční klientský portál, skutečné přihlášení ani backend napojený na účetní data.

## Co demo ukazuje

- veřejnou prezentaci služeb účetní kanceláře;
- role a navigaci pro majitele, zaměstnance a klienta;
- dashboardy, klienty, úkoly, dokumenty a termíny;
- reporting, rizika, komunikaci a schvalovací scénáře;
- responzivní rozhraní připravené pro statický export;
- demo autentizační tok nad lokálními daty.

## Technologie podle části

| Část | Technologie |
| --- | --- |
| Aplikační framework | Next.js 16 |
| Uživatelské rozhraní | React 19, TypeScript, Tailwind CSS |
| Statický hosting | GitHub Pages |

## Lokální vývoj

```bash
npm ci
npm run dev
```

Vývojový server je dostupný na `http://localhost:3000`.

Kontrola kvality a produkční build:

```bash
npm run lint
npm run build
```

Projekt používá statický export (`output: "export"`). Vygenerovaný web se ukládá do adresáře `out/`.

## Nasazení na GitHub Pages

Pro běh na projektové subpath nastavte při buildu `NEXT_PUBLIC_BASE_PATH`:

```bash
NEXT_PUBLIC_BASE_PATH=/schekonom-web npm run build
```

`next.config.ts` z této hodnoty odvodí `basePath` a `assetPrefix`. Workflow v `.github/workflows/deploy.yml` zajišťuje Pages build a publikaci; před změnou rout ověřte, že všechny interní odkazy používají helper ze `src/lib/paths.ts`.

## Architektura dema

```text
src/app/          # veřejné a portalové routy
src/components/   # marketingové a portalové komponenty
src/lib/auth/     # demo session a guard
src/lib/demo/     # lokální profily, data a mock API
src/lib/erp/      # navigace, typy a doménová ukázková data
src/lib/paths.ts  # odkazy kompatibilní s Pages base path
```

## Co jsem se naučil

Naučil jsem se navrhnout rozsáhlé klientské rozhraní tak, aby služby, úkoly, dokumenty, reporting a schvalování působily jako jeden celek. Statický export na GitHub Pages ukázal, jak pečlivě je potřeba řešit routing a assety na subpath. Zároveň jsem se naučil jasně označit rozdíl mezi interaktivním demem nad lokálními daty a skutečným produkčním portálem.

## Bezpečnost a hranice

- Do demo dat nevkládejte skutečné klienty, telefonní čísla, dokumenty ani účetní údaje.
- Demo kódy a lokální session nejsou produkční autentizace.
- Veřejný build neobsahuje backend ani trvalou databázi.
- Produkční použití by vyžadovalo serverovou autentizaci, autorizaci, auditní stopu a samostatnou práci s citlivými daty.
