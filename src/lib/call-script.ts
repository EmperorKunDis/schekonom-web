// Czech call script generator for ElevenLabs AI agent
// Handles proper Czech declension (skloňování) for names and context

import { companies, documents, deadlines, invoices } from "./erp/data";

// Czech vocative (5. pád) for common first names
const vocativeMap: Record<string, string> = {
  // Male names
  Martin: "Martine",
  František: "Františku",
  Petr: "Petře",
  Jan: "Jane",
  Tomáš: "Tomáši",
  Pavel: "Pavle",
  Josef: "Josefe",
  Vladimír: "Vladimíre",
  Karel: "Karle",
  Jiří: "Jiří",
  Jaroslav: "Jaroslave",
  Miroslav: "Miroslave",
  Zdeněk: "Zdeňku",
  Milan: "Milane",
  Luboš: "Luboši",
  Ondřej: "Ondřeji",
  David: "Davide",
  Lukáš: "Lukáši",
  Marek: "Marku",
  Jakub: "Jakube",
  Adam: "Adame",
  Robert: "Roberte",
  Daniel: "Danieli",
  Michal: "Michale",
  Otto: "Otto",
  // Female names — vocative = nominative
  Petra: "Petro",
  Jana: "Jano",
  Marie: "Marie",
  Eva: "Evo",
  Anna: "Anno",
  Klára: "Kláro",
  Lenka: "Lenko",
  Monika: "Moniko",
  Ivana: "Ivano",
  Marcela: "Marcelo",
  Jitka: "Jitko",
  Hana: "Hano",
  Kateřina: "Kateřino",
  Linda: "Lindo",
};

function getVocative(firstName: string): string {
  return vocativeMap[firstName] || firstName;
}

// Czech "pane/paní" based on name pattern
function getHonorific(name: string): string {
  const firstName = name.split(" ")[0];
  // Simple heuristic: Czech female first names typically end in -a, -e, -ie
  const lastChar = firstName.slice(-1).toLowerCase();
  const lastTwo = firstName.slice(-2).toLowerCase();
  if (
    lastChar === "a" ||
    lastTwo === "ie" ||
    lastTwo === "ka" ||
    lastTwo === "na"
  ) {
    return "paní";
  }
  return "pane";
}

function getLastNameVocative(name: string, honorific: string): string {
  const parts = name.split(" ");
  const lastName = parts[parts.length - 1];

  if (honorific === "paní") {
    // Female last names in Czech are already in correct form for vocative
    return lastName;
  }

  // Male last names — vocative patterns
  if (lastName.endsWith("ský")) return lastName.slice(0, -1);
  if (lastName.endsWith("ný")) return lastName.slice(0, -1);
  if (lastName.endsWith("ek")) return lastName.slice(0, -2) + "ku";
  if (lastName.endsWith("ec")) return lastName.slice(0, -2) + "če";
  if (lastName.endsWith("da")) return lastName.slice(0, -1) + "o";
  if (lastName.endsWith("ka")) return lastName.slice(0, -1) + "ko";
  if (lastName.endsWith("ář")) return lastName.slice(0, -1) + "ři";
  if (lastName.endsWith("er")) return lastName + "e";
  if (lastName.endsWith("ák")) return lastName.slice(0, -1) + "áku";
  if (lastName.endsWith("ík")) return lastName.slice(0, -1) + "íku";

  return lastName;
}

export interface CallScriptData {
  clientPhone: string;
  clientName: string; // Full name
  companyName: string;
  greeting: string; // "pane Švando" / "paní Nováková"
  missingDocsList: string; // "faktury za březen, potvrzení o příjmech"
  missingDocsCount: number;
  deadlineTitle: string;
  deadlineDate: string;
  unpaidInvoicesCount: number;
  unpaidTotal: string; // formatted CZK
  portalUrl: string;
  callerName: string; // who is calling (employee/owner name)
  prompt: string; // complete agent prompt
  firstMessage: string; // agent's opening line
}

// Contact persons per company — real names + language
const companyContacts: Record<string, { name: string; lang: "cs" | "de" }> = {
  comp_montservis: { name: "Martin Švanda", lang: "cs" },
  comp_bauteam: { name: "Klaus Weber", lang: "de" },
  comp_pendler: { name: "Petr Kovář", lang: "cs" },
  comp_elektro: { name: "Tomáš Novák", lang: "cs" },
  comp_restaurace: { name: "Jana Horáková", lang: "cs" },
  comp_kovo: { name: "Vladimír Procházka", lang: "cs" },
  comp_logitrans: { name: "Pavel Černý", lang: "cs" },
  comp_itconsult: { name: "David Mareš", lang: "cs" },
  comp_wellness: { name: "Eva Francisci", lang: "cs" },
  comp_autoservis: { name: "Jiří Beneš", lang: "cs" },
};

// German vocative — "Herr Weber", "Frau Schmidt"
function getGermanGreeting(name: string): string {
  const firstName = name.split(" ")[0];
  // Simple gender detection for German names
  const femaleEndings = ["a", "e", "ine", "ita", "ika"];
  const isFemale = femaleEndings.some((e) =>
    firstName.toLowerCase().endsWith(e),
  );
  const lastName = name.split(" ").slice(1).join(" ");
  return isFemale ? `Frau ${lastName}` : `Herr ${lastName}`;
}

// Phonetic map for TTS — foreign words, abbreviations, technical terms
// ElevenLabs reads these literally, so we write them as they should be PRONOUNCED
const phoneticMap: Record<string, string> = {
  // Company/brand names
  "SCH-EKONOM": "S-CHá-Ekonom",
  "SCH EKONOM": "S-CHá-Ekonom",
  // German terms
  Bescheinigung: "bešajnigung",
  Steuererklärung: "štojererklérung",
  Freistellung: "frajštelung",
  Kindergeld: "kindrgelt",
  Lohnsteuerbescheinigung: "lónštojerbešajnigung",
  Elterngeld: "elterngelt",
  Finanzamt: "financamt",
  Steuerbescheid: "štojerbešajt",
  // Abbreviations
  "EU/EWR": "E-Ú lomeno E-Vé-Er",
  ELSTER: "Elster",
  "SOKA-BAU": "Zóka-Bau",
  DPH: "dé-pé-há",
  DPPO: "dé-pé-pé-ó",
  DPFO: "dé-pé-ef-ó",
  ČSSZ: "česká správa sociálního zabezpečení",
  FÚ: "finanční úřad",
  ELDP: "evidenční list důchodového pojištění",
  A1: "á-jedna",
  IČO: "í-čé-ó",
  DIČ: "dí-í-čé",
  // Technical
  "portal.schekonom.cz": "portál S-CHá-Ekonom cé-zet",
  DocuWare: "Dokjuwér",
  eIDAS: "e-ídas",
  SSL: "es-es-el",
  TLS: "té-el-es",
};

// Apply phonetic replacements to text for TTS
function toPhonetic(text: string): string {
  let result = text;
  // Sort by length descending so longer matches replace first
  const sorted = Object.entries(phoneticMap).sort(
    (a, b) => b[0].length - a[0].length,
  );
  for (const [original, phonetic] of sorted) {
    result = result.replaceAll(original, phonetic);
  }
  // Remove status tags like (CHYBÍ), (ZPRACOVÁNO) etc.
  result = result.replace(/\s*\([A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+\)/g, "");
  return result;
}

export function buildCallScript(
  callerName: string,
  companyId: string,
): CallScriptData {
  const company = companies.find((c) => c.id === companyId);
  const companyName = company?.name || "vaší firmy";

  // Get REAL contact person for this company
  const contact = companyContacts[companyId] || {
    name: companyName,
    lang: "cs" as const,
  };
  const clientName = contact.name;
  const isGerman = contact.lang === "de";
  const clientPhone =
    typeof window !== "undefined"
      ? ""
      : process.env.NEXT_PUBLIC_CLIENT_CALL_PHONE || "+420733296961";

  const firstName = clientName.split(" ")[0];
  const honorific = isGerman ? "" : getHonorific(clientName);
  const lastNameVoc = isGerman
    ? ""
    : getLastNameVocative(clientName, honorific);
  const greeting = isGerman
    ? getGermanGreeting(clientName)
    : `${honorific} ${lastNameVoc}`;

  // Missing documents
  const missingDocs = documents.filter(
    (d) => d.companyId === companyId && d.status === "missing",
  );
  const missingDocsList =
    missingDocs.length > 0
      ? missingDocs.map((d) => d.title).join(", ")
      : "účetní podklady za aktuální období";
  const missingDocsCount = missingDocs.length || 1;

  // Deadlines
  const urgentDeadlines = deadlines.filter(
    (d) =>
      d.companyId === companyId &&
      (d.status === "overdue" || d.status === "due-soon"),
  );
  const deadlineTitle =
    urgentDeadlines.length > 0 ? urgentDeadlines[0].title : "měsíční uzávěrku";
  const deadlineDate =
    urgentDeadlines.length > 0
      ? new Intl.DateTimeFormat("cs-CZ", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(new Date(urgentDeadlines[0].dueDate))
      : "konce tohoto měsíce";

  // Unpaid invoices
  const unpaidInvs = invoices.filter(
    (i) =>
      i.companyId === companyId &&
      i.type === "received" &&
      i.status === "overdue",
  );
  const unpaidTotal = new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
    maximumFractionDigits: 0,
  }).format(unpaidInvs.reduce((s, i) => s + i.amount, 0));

  const portalUrl = "portal.schekonom.cz";

  const callerFirst = callerName.split(" ")[0];
  const callerLastNameNom = callerName.split(" ").slice(1).join(" ");

  // Primary missing doc — clean title for speech (no status tags, phonetic)
  const primaryDocRaw =
    missingDocs.length > 0 ? missingDocs[0].title : "účetní podklady";
  const primaryDoc = toPhonetic(primaryDocRaw);
  const missingDocsListPhonetic = toPhonetic(missingDocsList);
  const deadlineTitlePhonetic = toPhonetic(deadlineTitle);
  const companyNamePhonetic = toPhonetic(companyName);
  const portalPhonetic = toPhonetic(portalUrl);

  // ===================== BUILD PROMPT BASED ON LANGUAGE =====================

  let prompt: string;
  let firstMessage: string;

  if (isGerman) {
    // ===== GERMAN VERSION =====
    const unpaidDE =
      unpaidInvs.length > 0
        ? `\nHINWEIS: Der Kunde hat ${unpaidInvs.length} offene Rechnung${unpaidInvs.length > 1 ? "en" : ""} nach Fälligkeit. Erwähnen Sie das NUR wenn das Gespräch gut verläuft: "Übrigens haben wir auch offene Rechnungen nach Fälligkeit bemerkt, Details finden Sie im Portal unter Finanzen."`
        : "";

    prompt = `Du bist Radek, ein professioneller KI-Assistent der Steuerberatungskanzlei SCH-Ekonom aus Cheb, Tschechien.

DEINE IDENTITÄT:
- Du heißt Radek und bist KI-Assistent der Kanzlei
- Den Firmennamen sprichst du als "S-CHá-Ekonom" aus
- Sprich immer Deutsch, höflich und professionell
- Den Kunden sprichst du mit "${greeting}" an
- Sei präzise und konkret

KOMMUNIKATIONSREGELN:
- Sprechen Sie den Kunden immer mit 'Sie' an.
- Wenn der Kunde keine Zeit hat: "Ich verstehe, wann würde es Ihnen besser passen?"
- Wenn der Kunde die Unterlagen zusagt, bedanke dich und erinnere an das Portal: ${portalUrl}, Bereich Dokumente
- Wenn du etwas nicht weißt: "Das kläre ich mit Frau Poupová und wir melden uns bei Ihnen."
- Wenn der Kunde verärgert ist, bleibe ruhig und verständnisvoll
- Zum Abschluss: "Vielen Dank, ${greeting}. Wenn Sie etwas brauchen, zögern Sie nicht, uns zu kontaktieren. Einen schönen Tag noch."

KONTEXT DES ANRUFS:
Sie rufen ${greeting}, Ansprechpartner bei der Firma ${companyName}, an.
Fehlende Unterlage: ${primaryDocRaw}.
${missingDocsCount > 1 ? `Insgesamt fehlen ${missingDocsCount} Dokumente: ${missingDocsList}.` : ""}
Grund: Wir müssen ${deadlineTitle} bis ${deadlineDate} bearbeiten. Ohne die Unterlagen ist die Frist nicht einzuhalten.
Der Kunde kann alles auf ${portalUrl} im Bereich Dokumente hochladen — ein Foto mit dem Handy genügt.${unpaidDE}

GESPRÄCHSABLAUF:
1. Begrüßen, vorstellen, Grund des Anrufs nennen
2. Erklären warum das Dokument benötigt wird und bis wann
3. Hinweis auf Upload-Möglichkeit im Portal
4. Fragen ob der Kunde noch etwas braucht
5. Höflich verabschieden`;

    const primaryDocDE = toPhonetic(primaryDocRaw);
    firstMessage = `Guten Tag, ${greeting}, hier ist Radek von S-CHá-Ekonom. Ich rufe Sie an wegen ${primaryDocDE}. Wir müssen nämlich ${deadlineTitle} bis ${deadlineDate} bearbeiten und ohne ${missingDocsCount > 1 ? "diese Unterlagen" : "dieses Dokument"} ist das leider nicht möglich. Könnten Sie ${missingDocsCount > 1 ? "sie" : "es"} bitte auf unser Portal ${portalUrl} hochladen? Vielen Dank, und wenn Sie etwas brauchen, zögern Sie nicht, uns zu kontaktieren.`;
  } else {
    // ===== CZECH VERSION =====
    prompt = `Jsi Radek, profesionální AI asistent účetní kanceláře S-CHá-Ekonom z Chebu.

TVOJE IDENTITA:
- Jmenuješ se Radek a jsi AI asistent účetní kanceláře
- Název firmy vyslovuj vždy jako "S-CHá-Ekonom"
- Mluv vždy česky, spisovně, přátelsky a profesionálně
- Klienta oslovuj "${greeting}" — vždy ve správném pádu
- Buď stručný, konkrétní a věcný
- Cizí slova a zkratky vyslovuj foneticky česky

DŮLEŽITÁ PRAVIDLA:
- Názvy dokumentů vyslovuj přirozeně, ne po písmenech
- Nikdy nečti technické statusy — ty jsou jen pro systém
- Správně skloňuj a časuj všechno

PRAVIDLA KOMUNIKACE:
- Vykej klientovi
- Pokud nemá čas: "Rozumím, kdy by se Vám to hodilo?"
- Pokud slíbí dodání, připomeň mu adresu portálu: ${portalPhonetic}, sekce Dokumenty
- Pokud nevíš: "To ověřím s paní Poupovou a ozveme se Vám."
- Na konci: "Děkuji Vám, ${greeting}. Kdybyste cokoliv potřeboval${honorific === "paní" ? "a" : ""}, neváhejte se ozvat. Přeji Vám hezký den."

KONTEXT HOVORU:
Voláte kontaktní osobě ${greeting} z firmy ${companyNamePhonetic}.
Chybí nám od klienta: ${primaryDoc}.
${missingDocsCount > 1 ? `Celkem chybí ${missingDocsCount} dokumentů: ${missingDocsListPhonetic}.` : ""}
Musíme zpracovat ${deadlineTitlePhonetic} do ${deadlineDate}. Bez podkladů to nestihneme.
Klient může nahrát na ${portalPhonetic}, sekce Dokumenty — stačí vyfotit telefonem.
${unpaidInvs.length > 0 ? `\nKlient má ${unpaidInvs.length} neuhrazen${unpaidInvs.length === 1 ? "ou fakturu" : unpaidInvs.length < 5 ? "é faktury" : "ých faktur"} po splatnosti (${unpaidTotal}). Zmiň JENOM pokud hovor jde dobře: "Mimochodem, zaznamenali jsme také neuhrazené faktury, podrobnosti najdete na portálu v sekci Finance."` : ""}

STRUKTURA:
1. Pozdravte, představte se, řekněte proč voláte
2. Vysvětlete proč dokument potřebujete a do kdy
3. Řekněte kam nahrát
4. Zeptejte se jestli potřebuje s něčím pomoci
5. Rozlučte se`;

    firstMessage = `Dobrý den, ${greeting}, tady Radek z S-CHá-Ekonom. Volám Vám kvůli ${primaryDoc}. Potřebujeme totiž zpracovat ${deadlineTitlePhonetic} do ${deadlineDate} a bez ${missingDocsCount > 1 ? "těchto podkladů" : "tohoto dokumentu"} to bohužel nebude možné stihnout. Mohl${honorific === "paní" ? "a" : ""} byste ${missingDocsCount > 1 ? "je" : "ho"} prosím nahrát na ${portalPhonetic}? Děkuji, a kdybyste cokoliv potřeboval${honorific === "paní" ? "a" : ""}, neváhejte se nám ozvat.`;
  }

  return {
    clientPhone,
    clientName,
    companyName,
    greeting,
    missingDocsList,
    missingDocsCount,
    deadlineTitle,
    deadlineDate,
    unpaidInvoicesCount: unpaidInvs.length,
    unpaidTotal,
    portalUrl,
    callerName,
    prompt,
    firstMessage,
  };
}
