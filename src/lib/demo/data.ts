import type {
  DemoRole,
  NavItem,
  DemoProfile,
  DemoKpi,
  ClientSummary,
  DemoTask,
  DemoAlert,
  DemoFeedItem,
  DemoDeadline,
  DemoDocument,
  ClientDetail,
  ApiEndpoint,
  WorkspaceSnapshot,
} from "./types";

export const DEMO_MODE = true;
export const OWNER_DEMO_PHONE = "+420 603 922 126";

export const demoProfiles: DemoProfile[] = [
  {
    id: "profile_owner",
    surname: "majitel",
    phone: OWNER_DEMO_PHONE,
    role: "owner",
    title: "Majitel účetní firmy",
    summary:
      "Řídicí dashboard celé účetní kanceláře: klienti, rizika, termíny, úkoly a automatizace.",
    domain: "SCH-EKONOM Control Center",
    visibleClientIds: [
      "client_montservis",
      "client_bauteam",
      "client_pendler",
      "client_elektro",
      "client_restaurace",
      "client_kovo",
      "client_logitrans",
    ],
    demoCode: "731037",
  },
  {
    id: "profile_svanda",
    surname: "svanda",
    phone: "+491759096965",
    role: "client",
    title: "Klient firmy",
    summary:
      "Jednoduchý klientský cockpit s dokumenty, cash-flow a dalšími kroky.",
    domain: "Montážní a stavební práce CZ/DE",
    visibleClientIds: ["client_montservis"],
    demoCode: "428611",
  },
  {
    id: "profile_schneider",
    surname: "schneider",
    phone: "+420733296961",
    role: "german-tax",
    title: "Specialista německých daní",
    summary:
      "Pendleři, ELSTER, Kindergeld, A1 a přeshraniční případy v jedné frontě.",
    domain: "Česko-německé daně a agenda DE",
    visibleClientIds: [
      "client_montservis",
      "client_bauteam",
      "client_pendler",
      "client_elektro",
    ],
    demoCode: "153904",
  },
  {
    id: "profile_poupova",
    surname: "poupova",
    phone: "+420777******",
    role: "payroll",
    title: "Mzdová účetní a personalistika",
    summary:
      "Docházka, mzdy, ONZ, exekuce a zaměstnanecké reportingové termíny.",
    domain: "Mzdy, HR a měsíční uzávěrky",
    visibleClientIds: [
      "client_montservis",
      "client_restaurace",
      "client_kovo",
      "client_logitrans",
    ],
    demoCode: "880271",
  },
];

export const navByRole: Record<DemoRole, NavItem[]> = {
  owner: [
    { key: "overview", label: "Přehled firmy" },
    { key: "clients", label: "Klienti" },
    { key: "tasks", label: "Fronta úkolů" },
    { key: "documents", label: "Dokumenty" },
    { key: "automation", label: "Agentní automatizace" },
    { key: "reporting", label: "Analytické centrum" },
    { key: "risks", label: "Rizika" },
    { key: "deadlines", label: "Termíny" },
    { key: "recommendations", label: "Doporučení AI" },
    { key: "security", label: "Schválení" },
  ],
  client: [
    { key: "overview", label: "Přehled" },
    { key: "documents", label: "Dokumenty" },
    { key: "deadlines", label: "Termíny" },
    { key: "recommendations", label: "Doporučení AI" },
    { key: "security", label: "Schválení & rizika" },
  ],
  "german-tax": [
    { key: "overview", label: "Přehled" },
    { key: "clients", label: "Moji klienti" },
    { key: "tasks", label: "Fronta úkolů" },
    { key: "documents", label: "Dokumenty" },
    { key: "automation", label: "Agentní automatizace" },
    { key: "risks", label: "Rizika" },
    { key: "deadlines", label: "Termíny" },
  ],
  payroll: [
    { key: "overview", label: "Přehled" },
    { key: "clients", label: "Moji klienti" },
    { key: "tasks", label: "Fronta úkolů" },
    { key: "documents", label: "Dokumenty" },
    { key: "automation", label: "Agentní automatizace" },
    { key: "risks", label: "Rizika" },
    { key: "deadlines", label: "Termíny" },
  ],
};

export const clientSummaries: ClientSummary[] = [
  {
    id: "client_montservis",
    name: "MontServis Svanda",
    sector: "Montážní a stavební firma",
    region: "Cheb / Bayern",
    ownerLabels: ["Schneider", "Poupova"],
    status: "Čeká na podklady + vysoké riziko IBAN",
    statusTone: "red",
    openTasks: 7,
    overdueItems: 2,
    nextDeadline: "DPH 25.04.",
    tags: ["CZ účetnictví", "DE agenda", "Mzdy", "A1"],
    score: "92 / 100 automatizace",
  },
  {
    id: "client_bauteam",
    name: "BauTeam Nord GmbH",
    sector: "Německá stavební společnost",
    region: "Hof / Cheb",
    ownerLabels: ["Schneider"],
    status: "ELSTER ready ke schválení",
    statusTone: "cyan",
    openTasks: 3,
    overdueItems: 0,
    nextDeadline: "ELSTER 18.04.",
    tags: ["DE firma", "Freistellung", "SOKA-BAU"],
    score: "88 / 100 automatizace",
  },
  {
    id: "client_pendler",
    name: "Pendler Petr K.",
    sector: "Zaměstnanec v Německu",
    region: "Aš / Marktredwitz",
    ownerLabels: ["Schneider"],
    status: "Chybí EU/EWR a kniha jízd",
    statusTone: "gold",
    openTasks: 4,
    overdueItems: 1,
    nextDeadline: "Kindergeld 22.04.",
    tags: ["Pendler", "Kindergeld", "EU/EWR"],
    score: "74 / 100 automatizace",
  },
  {
    id: "client_elektro",
    name: "Elektro Projekt DE-CZ",
    sector: "Elektromontáže",
    region: "Plzeň / Regensburg",
    ownerLabels: ["Schneider"],
    status: "A1 formuláře v procesu",
    statusTone: "green",
    openTasks: 2,
    overdueItems: 0,
    nextDeadline: "A1 17.04.",
    tags: ["Přeshraniční práce", "A1", "DE DPH"],
    score: "84 / 100 automatizace",
  },
  {
    id: "client_restaurace",
    name: "Restaurace U Mostu",
    sector: "Gastro provoz",
    region: "Cheb",
    ownerLabels: ["Poupova"],
    status: "Docházka čeká na import",
    statusTone: "gold",
    openTasks: 5,
    overdueItems: 1,
    nextDeadline: "Mzdy 15.04.",
    tags: ["Mzdy", "Docházka", "DPP"],
    score: "69 / 100 automatizace",
  },
  {
    id: "client_kovo",
    name: "Kovo Dílna Cheb",
    sector: "Výroba",
    region: "Cheb",
    ownerLabels: ["Poupova"],
    status: "Exekuční změna připravena",
    statusTone: "cyan",
    openTasks: 3,
    overdueItems: 0,
    nextDeadline: "ONZ 16.04.",
    tags: ["Mzdy", "Exekuce", "ELDP"],
    score: "81 / 100 automatizace",
  },
  {
    id: "client_logitrans",
    name: "LogiTrans CZ",
    sector: "Logistika",
    region: "Karlovarský kraj",
    ownerLabels: ["Poupova"],
    status: "Mzdová uzávěrka ve frontě",
    statusTone: "cyan",
    openTasks: 4,
    overdueItems: 0,
    nextDeadline: "Přehledy 20.04.",
    tags: ["Řidiči", "Mzdy", "Cestovní náhrady"],
    score: "78 / 100 automatizace",
  },
];

export const tasks: DemoTask[] = [
  {
    id: "task_01",
    clientId: "client_montservis",
    ownerId: "profile_schneider",
    title: "Doplnit EU/EWR pro dvě rodiny pendlerů",
    summary:
      "Bez potvrzeného formuláře nelze dokončit optimalizaci daňového přiznání.",
    type: "cross_border_missing_form",
    priority: "high",
    due: "2026-04-14",
    stage: "Čeká na klienta",
    visibleToClient: true,
  },
  {
    id: "task_02",
    clientId: "client_montservis",
    ownerId: "profile_poupova",
    title: "Schválit mzdový batch za duben",
    summary:
      "Import docházky proběhl, čeká se jen na finální odsouhlasení náhrad.",
    type: "payroll_review",
    priority: "high",
    due: "2026-04-15",
    stage: "Ke schválení",
    visibleToClient: true,
  },
  {
    id: "task_03",
    clientId: "client_montservis",
    ownerId: "profile_poupova",
    title: "Prověřit změnu IBAN u dodavatele Kranbau",
    summary:
      "Detekována odchylka proti historii plateb. Blokace úhrady zůstává aktivní.",
    type: "iban_risk",
    priority: "high",
    due: "2026-04-13",
    stage: "Riziková kontrola",
    visibleToClient: true,
  },
  {
    id: "task_04",
    clientId: "client_montservis",
    ownerId: "profile_svanda",
    title: "Nahrát chybějící fakturu za servisní vůz",
    summary:
      "Bankovní pohyb 18 450 Kč nemá účetní doklad. Bez něj se zastaví uzávěrka DPH.",
    type: "document_missing",
    priority: "high",
    due: "2026-04-13",
    stage: "Akce klienta",
    visibleToClient: true,
  },
  {
    id: "task_05",
    clientId: "client_bauteam",
    ownerId: "profile_schneider",
    title: "Finalizovat Freistellung pro stavbu Hof",
    summary:
      "Systém připravil podklady, chybí jen závěrečná kontrola data platnosti.",
    type: "tax_deadline",
    priority: "medium",
    due: "2026-04-18",
    stage: "Připraveno",
    visibleToClient: false,
  },
  {
    id: "task_06",
    clientId: "client_pendler",
    ownerId: "profile_schneider",
    title: "Vyžádat knihu jízd a nájemní smlouvu",
    summary:
      "Bez doložení dvojí domácnosti nelze uplatnit plný odpočet dojíždění.",
    type: "document_missing",
    priority: "medium",
    due: "2026-04-16",
    stage: "Výzva odeslána",
    visibleToClient: false,
  },
  {
    id: "task_07",
    clientId: "client_elektro",
    ownerId: "profile_schneider",
    title: "Odeslat A1 batch pro čtyři techniky",
    summary: "Data jsou zvalidována, čeká se na digitální podpis.",
    type: "tax_deadline",
    priority: "medium",
    due: "2026-04-17",
    stage: "Čeká na podpis",
    visibleToClient: false,
  },
  {
    id: "task_08",
    clientId: "client_restaurace",
    ownerId: "profile_poupova",
    title: "Importovat nedělní směny z docházky",
    summary: "Klient zatím neposlal export. Bez něj systém neuzamkne mzdy.",
    type: "document_missing",
    priority: "high",
    due: "2026-04-13",
    stage: "Blokováno",
    visibleToClient: false,
  },
  {
    id: "task_09",
    clientId: "client_kovo",
    ownerId: "profile_poupova",
    title: "Přepočítat exekuční srážku od května",
    summary:
      "Nový příkaz byl načten z datové schránky, systém navrhl novou výši srážky.",
    type: "payroll_review",
    priority: "medium",
    due: "2026-04-16",
    stage: "Ke kontrole",
    visibleToClient: false,
  },
  {
    id: "task_10",
    clientId: "client_logitrans",
    ownerId: "profile_poupova",
    title: "Doplnit cestovní náhrady řidičů",
    summary: "Dvě jízdy nemají přiřazené destinace a nelze spočítat sazby.",
    type: "payroll_review",
    priority: "medium",
    due: "2026-04-20",
    stage: "Čeká na podklady",
    visibleToClient: false,
  },
];

export const alerts: DemoAlert[] = [
  {
    id: "alert_01",
    clientId: "client_montservis",
    title: "Změna IBAN oproti historii dodavatele",
    summary: "Nová faktura od Kranbau obsahuje účet, který nebyl nikdy použit.",
    action: "Zablokovat úhradu a vyžádat hlasové potvrzení + smluvní přílohu.",
    severity: "high",
    visibleToClient: true,
  },
  {
    id: "alert_02",
    clientId: "client_montservis",
    title: "Chybějící faktura blokuje DPH uzávěrku",
    summary: "Bankovní odchozí platba nemá odpovídající doklad v DMS.",
    action: "Automatická výzva přes WhatsApp a e-mail byla odeslána klientovi.",
    severity: "high",
    visibleToClient: true,
  },
  {
    id: "alert_03",
    clientId: "client_pendler",
    title: "Neúplná dokumentace pro Kindergeld",
    summary: "Chybí ověřený překlad potvrzení o studiu.",
    action: "Připravit checklist a znovu vyžádat podklady.",
    severity: "medium",
    visibleToClient: false,
  },
  {
    id: "alert_04",
    clientId: "client_restaurace",
    title: "Docházka nebyla importována včas",
    summary: "Nedělní směny zatím nejsou ve mzdovém systému.",
    action: "Přepnout klienta do prioritní fronty a urgovat export.",
    severity: "medium",
    visibleToClient: false,
  },
  {
    id: "alert_05",
    clientId: "client_kovo",
    title: "Nový exekuční příkaz",
    summary: "Systém zachytil novou datovou zprávu a vytvořil návrh srážky.",
    action: "Potvrdit výpočet před mzdovou uzávěrkou.",
    severity: "low",
    visibleToClient: false,
  },
];

export const feed: DemoFeedItem[] = [
  {
    id: "feed_01",
    clientId: "client_montservis",
    timestamp: "08:14",
    title: "Systém spároval bankovní pohyb s vydanou fakturou",
    summary: "Příchozí úhrada 124 600 Kč byla zaúčtována bez zásahu účetní.",
    severity: "low",
    needsApproval: false,
    audience: "all",
  },
  {
    id: "feed_02",
    clientId: "client_montservis",
    timestamp: "08:17",
    title: "Detekována změna IBAN proti historii dodavatele",
    summary: "Faktura dodavatele Kranbau byla přepnuta do rizikové fronty.",
    severity: "high",
    needsApproval: true,
    audience: "all",
  },
  {
    id: "feed_03",
    clientId: "client_montservis",
    timestamp: "08:19",
    title: "Odeslána výzva k doplnění EU/EWR",
    summary: "Klient obdržel checklist přes e-mail a WhatsApp.",
    severity: "medium",
    needsApproval: false,
    audience: "all",
  },
  {
    id: "feed_04",
    clientId: "client_montservis",
    timestamp: "08:24",
    title: "Vygenerováno CFO doporučení k cash-flow",
    summary: "Predikce ukazuje tlak na likviditu za 19 dní.",
    severity: "medium",
    needsApproval: false,
    audience: "all",
  },
  {
    id: "feed_05",
    clientId: "client_bauteam",
    timestamp: "08:31",
    title: "ELSTER podání připraveno ke schválení",
    summary: "Automatický rozpad příloh a kontrola sazeb dokončeny.",
    severity: "low",
    needsApproval: true,
    audience: "employee",
  },
  {
    id: "feed_06",
    clientId: "client_restaurace",
    timestamp: "08:37",
    title: "Docházka klienta stále chybí",
    summary: "Voice reminder byl naplánován na 11:00.",
    severity: "medium",
    needsApproval: false,
    audience: "employee",
  },
  {
    id: "feed_07",
    clientId: "client_kovo",
    timestamp: "08:42",
    title: "Datová schránka: nový exekuční příkaz načten",
    summary: "Systém připravil novou srážku a označil ji jako low-risk.",
    severity: "low",
    needsApproval: true,
    audience: "employee",
  },
  {
    id: "feed_08",
    clientId: "client_montservis",
    timestamp: "08:46",
    title: "Klientovi byl otevřen bezpečný upload slot",
    summary: "Chybějící doklad lze nahrát bez další komunikace s kanceláří.",
    severity: "low",
    needsApproval: false,
    audience: "client",
  },
];

export const deadlines: DemoDeadline[] = [
  {
    id: "deadline_01",
    clientId: "client_montservis",
    title: "Přiznání k DPH",
    due: "2026-04-25",
    area: "CZ daně",
    ownerLabel: "Poupova",
    status: "Blokováno chybějící fakturou",
    visibleToClient: true,
  },
  {
    id: "deadline_02",
    clientId: "client_montservis",
    title: "Mzdový batch duben",
    due: "2026-04-15",
    area: "Mzdy",
    ownerLabel: "Poupova",
    status: "Čeká na schválení",
    visibleToClient: true,
  },
  {
    id: "deadline_03",
    clientId: "client_montservis",
    title: "EU/EWR kompletace",
    due: "2026-04-14",
    area: "DE agenda",
    ownerLabel: "Schneider",
    status: "Čeká na klienta",
    visibleToClient: true,
  },
  {
    id: "deadline_04",
    clientId: "client_bauteam",
    title: "ELSTER submission",
    due: "2026-04-18",
    area: "DE daně",
    ownerLabel: "Schneider",
    status: "Připraveno ke schválení",
    visibleToClient: false,
  },
  {
    id: "deadline_05",
    clientId: "client_elektro",
    title: "A1 formuláře",
    due: "2026-04-17",
    area: "HR / DE",
    ownerLabel: "Schneider",
    status: "Čeká na podpis",
    visibleToClient: false,
  },
  {
    id: "deadline_06",
    clientId: "client_restaurace",
    title: "Mzdy a odvody",
    due: "2026-04-15",
    area: "Mzdy",
    ownerLabel: "Poupova",
    status: "Docházka chybí",
    visibleToClient: false,
  },
];

export const documents: DemoDocument[] = [
  {
    id: "doc_01",
    clientId: "client_montservis",
    title: "Faktura Kranbau 04/2026",
    kind: "Dodavatelská faktura",
    source: "E-mail PDF",
    receivedAt: "2026-04-12 07:48",
    status: "Riziková kontrola IBAN",
    visibleToClient: true,
  },
  {
    id: "doc_02",
    clientId: "client_montservis",
    title: "Výpis banky 12.04.",
    kind: "Bankovní import",
    source: "API banky",
    receivedAt: "2026-04-12 08:02",
    status: "Spárováno",
    visibleToClient: true,
  },
  {
    id: "doc_03",
    clientId: "client_montservis",
    title: "Docházka duben",
    kind: "Mzdový podklad",
    source: "XLS export",
    receivedAt: "2026-04-12 08:05",
    status: "Importováno",
    visibleToClient: true,
  },
  {
    id: "doc_04",
    clientId: "client_montservis",
    title: "EU/EWR žádost",
    kind: "DE formulář",
    source: "Klientský upload",
    receivedAt: "čeká se",
    status: "Chybí",
    visibleToClient: true,
  },
  {
    id: "doc_05",
    clientId: "client_bauteam",
    title: "Freistellung 2026",
    kind: "DE formulář",
    source: "DocuWare",
    receivedAt: "2026-04-11 16:10",
    status: "Připraveno",
    visibleToClient: false,
  },
  {
    id: "doc_06",
    clientId: "client_restaurace",
    title: "Docházka neděle",
    kind: "Mzdový podklad",
    source: "Chybí",
    receivedAt: "čeká se",
    status: "Blokuje mzdy",
    visibleToClient: false,
  },
  {
    id: "doc_07",
    clientId: "client_kovo",
    title: "Exekuční příkaz 2026/04",
    kind: "Datová schránka",
    source: "DIS+ import",
    receivedAt: "2026-04-12 08:40",
    status: "Návrh srážky hotov",
    visibleToClient: false,
  },
];

export const clientDetails: Record<string, ClientDetail> = {
  client_montservis: {
    id: "client_montservis",
    name: "MontServis Svanda",
    sector: "Montážní a stavební firma",
    region: "Cheb / Bayern",
    description:
      "Ideální showcase klient. Kombinuje české účetnictví, mzdy, německou agendu, výjezdy techniků a vysokou frekvenci dokumentů.",
    employees: "18 zaměstnanců + 6 výjezdových techniků",
    metrics: [
      {
        label: "Cash 14 dní",
        value: "1,26 mil. Kč",
        sub: "Pokles o 11 %",
        tone: "gold",
      },
      {
        label: "DPH fronta",
        value: "14 dokladů",
        sub: "1 blokovaný",
        tone: "red",
      },
      {
        label: "Mzdy",
        value: "96 % připraveno",
        sub: "Čeká na schválení",
        tone: "cyan",
      },
      {
        label: "DE agenda",
        value: "3 případy",
        sub: "EU/EWR + A1",
        tone: "cyan",
      },
    ],
    workflow: [
      {
        label: "Přijato",
        detail: "Dodavatelská faktura dorazila e-mailem.",
        timestamp: "07:48",
        state: "done",
      },
      {
        label: "Vytěženo",
        detail: "OCR a validace IČO, částky a DPH proběhly bez chyby.",
        timestamp: "07:49",
        state: "done",
      },
      {
        label: "Zvalidováno",
        detail: "Systém srovnal dodavatele s historií a registrem.",
        timestamp: "07:50",
        state: "done",
      },
      {
        label: "Vyhodnoceno AI",
        detail: "Zachycena změna IBAN a vznikl risk ticket.",
        timestamp: "08:17",
        state: "active",
      },
      {
        label: "Čeká na člověka",
        detail: "Potvrzení bankovního účtu a chybějící faktury k platbě.",
        timestamp: "now",
        state: "blocked",
      },
      {
        label: "Odesláno",
        detail:
          "Po schválení se automaticky vytvoří platební návrh a auditní stopa.",
        timestamp: "pending",
        state: "waiting",
      },
    ],
    missingDocs: [
      {
        title: "Faktura za servisní vůz",
        requester: "Agent Finance Bot",
        requestedAt: "08:19",
        channel: "WhatsApp + e-mail",
        blocking: "Bez dokladu se zastaví DPH uzávěrka.",
      },
      {
        title: "EU/EWR potvrzení za 2 zaměstnance",
        requester: "Schneider",
        requestedAt: "08:21",
        channel: "Klientský upload slot",
        blocking: "Nelze dokončit německou optimalizaci.",
      },
    ],
    approvals: [
      {
        title: "Potvrdit nový účet dodavatele Kranbau",
        owner: "Svanda / Poupova",
        due: "Dnes",
        status: "Vysoká priorita",
      },
      {
        title: "Schválit mzdový batch za duben",
        owner: "Svanda",
        due: "15.04.",
        status: "Čeká na potvrzení",
      },
    ],
    cfo: [
      {
        title: "Cash-flow tlak za 19 dní",
        summary:
          "Při současném tempu odvodů a splatností bude dostupná hotovost pod interním prahem.",
        impact: "Riziko odkladu investice do dvou vozidel.",
        action: "Pozastavit neurgentní nákup a vymoci dvě opožděné pohledávky.",
        tone: "gold",
      },
      {
        title: "DPH lze uzavřít bez čekání na účetní",
        summary:
          "Jakmile klient dodá chybějící fakturu, systém odblokuje workflow a připraví podání.",
        impact: "Úspora 2-3 hodin manuální práce.",
        action: "Nahrát doklad přes bezpečný slot a potvrdit účet dodavatele.",
        tone: "cyan",
      },
    ],
  },
  client_bauteam: {
    id: "client_bauteam",
    name: "BauTeam Nord GmbH",
    sector: "Německá stavební společnost",
    region: "Hof / Cheb",
    description:
      "Firma s opakovanými přeshraničními stavebními zakázkami a častou agendou Freistellung.",
    employees: "31 zaměstnanců",
    metrics: [
      {
        label: "ELSTER",
        value: "Ready",
        sub: "Čeká na schválení",
        tone: "cyan",
      },
      {
        label: "SOKA-BAU",
        value: "2 reporty",
        sub: "Tento týden",
        tone: "green",
      },
      {
        label: "Freistellung",
        value: "Platnost 11 měsíců",
        sub: "Návrh obnovy",
        tone: "cyan",
      },
      {
        label: "DE DPH",
        value: "Bez odchylek",
        sub: "Kontrola hotová",
        tone: "green",
      },
    ],
    workflow: [
      {
        label: "Přijato",
        detail: "DE podklady načteny z ELSTER exportu.",
        timestamp: "07:10",
        state: "done",
      },
      {
        label: "Vytěženo",
        detail: "Přílohy automaticky rozřazeny.",
        timestamp: "07:12",
        state: "done",
      },
      {
        label: "Zvalidováno",
        detail: "Sazby a kategorie potvrzeny.",
        timestamp: "07:13",
        state: "done",
      },
      {
        label: "Vyhodnoceno AI",
        detail: "Systém navrhl Freistellung renewal.",
        timestamp: "07:20",
        state: "active",
      },
      {
        label: "Odesláno",
        detail: "Po podpisu bude podání odesláno.",
        timestamp: "pending",
        state: "waiting",
      },
    ],
    missingDocs: [
      {
        title: "Potvrzení stavby Hof",
        requester: "Schneider",
        requestedAt: "09:00",
        channel: "E-mail",
        blocking: "Potřeba doložit rozšíření Freistellung.",
      },
    ],
    approvals: [
      {
        title: "Schválit ELSTER batch",
        owner: "Schneider",
        due: "18.04.",
        status: "Ke schválení",
      },
    ],
    cfo: [
      {
        title: "Bezprostřední riziko nulové",
        summary:
          "Všechny kritické tax workflows jsou připravené, žádné blokující odchylky.",
        impact: "Kapacitu lze přesunout na další DE klienty.",
        action: "Podepsat ELSTER a uzavřít batch.",
        tone: "green",
      },
    ],
  },
  client_pendler: {
    id: "client_pendler",
    name: "Pendler Petr K.",
    sector: "Zaměstnanec v Německu",
    region: "Aš / Marktredwitz",
    description:
      "Ukázka individuální přeshraniční agendy, kde největší hodnotu dělá sběr důkazních podkladů.",
    employees: "1 osoba / rodina",
    metrics: [
      {
        label: "Kindergeld",
        value: "2 děti",
        sub: "Doplňuje se potvrzení",
        tone: "gold",
      },
      {
        label: "Dojíždění",
        value: "0,38 EUR/km",
        sub: "Chybí kniha jízd",
        tone: "gold",
      },
      {
        label: "DPFO DE",
        value: "V návrhu",
        sub: "3 odpočty aktivní",
        tone: "cyan",
      },
      {
        label: "Spis",
        value: "74 % hotovo",
        sub: "Čeká na klienta",
        tone: "cyan",
      },
    ],
    workflow: [
      {
        label: "Přijato",
        detail: "Lohnsteuerbescheinigung načtena.",
        timestamp: "07:30",
        state: "done",
      },
      {
        label: "Vytěženo",
        detail: "Příjmy a odvody vytěženy.",
        timestamp: "07:31",
        state: "done",
      },
      {
        label: "Zvalidováno",
        detail: "Kontrola s minulým rokem proběhla.",
        timestamp: "07:34",
        state: "done",
      },
      {
        label: "Čeká na člověka",
        detail: "Klient nedodal knihu jízd a EU/EWR.",
        timestamp: "07:50",
        state: "blocked",
      },
      {
        label: "Odesláno",
        detail: "Bude připraveno po dodání podkladů.",
        timestamp: "pending",
        state: "waiting",
      },
    ],
    missingDocs: [
      {
        title: "Kniha jízd",
        requester: "Schneider",
        requestedAt: "08:35",
        channel: "WhatsApp",
        blocking: "Bez ní se neprokáže rozsah dojíždění.",
      },
    ],
    approvals: [
      {
        title: "Potvrdit překlad potvrzení o studiu",
        owner: "Klient",
        due: "22.04.",
        status: "Čeká na dodání",
      },
    ],
    cfo: [
      {
        title: "Největší ztráta je v nedodaných podkladech",
        summary: "Workflow stojí kvůli dokumentům, ne kvůli odborné kapacitě.",
        impact: "Agentní výzvy zkracují čekání.",
        action: "Přepnout klienta do sekvence urgencí.",
        tone: "gold",
      },
    ],
  },
  client_elektro: {
    id: "client_elektro",
    name: "Elektro Projekt DE-CZ",
    sector: "Elektromontáže",
    region: "Plzeň / Regensburg",
    description:
      "Příklad firmy s pravidelnými výjezdy techniků a potřebou A1 formulářů.",
    employees: "12 techniků",
    metrics: [
      { label: "A1", value: "4 ks", sub: "Čeká na podpis", tone: "cyan" },
      {
        label: "DE práce",
        value: "3 stavby",
        sub: "Tento měsíc",
        tone: "green",
      },
      { label: "DPH DE", value: "OK", sub: "Kontrola hotová", tone: "green" },
      { label: "Spis", value: "84 %", sub: "Bez blokace", tone: "green" },
    ],
    workflow: [
      {
        label: "Přijato",
        detail: "Seznam výjezdů importován.",
        timestamp: "08:00",
        state: "done",
      },
      {
        label: "Vytěženo",
        detail: "Data přiřazena ke čtyřem technikům.",
        timestamp: "08:01",
        state: "done",
      },
      {
        label: "Zvalidováno",
        detail: "Kolize termínů nebyla nalezena.",
        timestamp: "08:03",
        state: "done",
      },
      {
        label: "Vyhodnoceno AI",
        detail: "A1 balíček připraven.",
        timestamp: "08:05",
        state: "active",
      },
      {
        label: "Odesláno",
        detail: "Po podpisu půjde na ČSSZ.",
        timestamp: "pending",
        state: "waiting",
      },
    ],
    missingDocs: [],
    approvals: [
      {
        title: "Podepsat A1 batch",
        owner: "Schneider",
        due: "17.04.",
        status: "Čeká",
      },
    ],
    cfo: [
      {
        title: "Workflow je plně standardizovaný",
        summary: "Ukázka klienta, kde agentní vrstva pracuje téměř bez zásahu.",
        impact: "Nízká personální náročnost.",
        action: "Dát do režimu zero-touch.",
        tone: "green",
      },
    ],
  },
  client_restaurace: {
    id: "client_restaurace",
    name: "Restaurace U Mostu",
    sector: "Gastro provoz",
    region: "Cheb",
    description:
      "Typický mzdový klient se směnami, brigádníky a nepravidelnou docházkou.",
    employees: "22 zaměstnanců + brigádníci",
    metrics: [
      {
        label: "Docházka",
        value: "84 %",
        sub: "Nedělní směny chybí",
        tone: "gold",
      },
      {
        label: "Mzdy",
        value: "Ve frontě",
        sub: "Import blokovaný",
        tone: "gold",
      },
      { label: "DPP/DPČ", value: "7 smluv", sub: "Aktivní", tone: "cyan" },
      {
        label: "Odvody",
        value: "Bez odchylek",
        sub: "Minulý měsíc OK",
        tone: "green",
      },
    ],
    workflow: [
      {
        label: "Přijato",
        detail: "Část docházky dorazila z POS systému.",
        timestamp: "07:55",
        state: "done",
      },
      {
        label: "Vytěženo",
        detail: "Směny rozpoznány.",
        timestamp: "07:56",
        state: "done",
      },
      {
        label: "Zvalidováno",
        detail: "Chybí nedělní směny.",
        timestamp: "08:00",
        state: "blocked",
      },
      {
        label: "Čeká na člověka",
        detail: "Nutná urgence klienta.",
        timestamp: "now",
        state: "active",
      },
      {
        label: "Odesláno",
        detail: "Po doplnění systém dokončí mzdy.",
        timestamp: "pending",
        state: "waiting",
      },
    ],
    missingDocs: [
      {
        title: "Export nedělních směn",
        requester: "Poupova",
        requestedAt: "08:37",
        channel: "Voice reminder",
        blocking: "Bez něj nelze uzavřít mzdy.",
      },
    ],
    approvals: [
      {
        title: "Potvrdit brigádnické odměny",
        owner: "Klient",
        due: "15.04.",
        status: "Čeká na data",
      },
    ],
    cfo: [
      {
        title: "Největší problém je sběr vstupů",
        summary: "Mzdy by byly hotové, kdyby klient dodal jednotný export.",
        impact: "Fronta lidské práce je zbytečně zatěžována.",
        action: "Přesunout klienta na standardní docházkový konektor.",
        tone: "gold",
      },
    ],
  },
  client_kovo: {
    id: "client_kovo",
    name: "Kovo Dílna Cheb",
    sector: "Výroba",
    region: "Cheb",
    description:
      "Výrobní firma s pravidelnou mzdovou agendou a občasnou exekuční změnou.",
    employees: "47 zaměstnanců",
    metrics: [
      {
        label: "Mzdy",
        value: "97 %",
        sub: "Jeden zásah exekuce",
        tone: "cyan",
      },
      { label: "Exekuce", value: "1 změna", sub: "Nízké riziko", tone: "cyan" },
      { label: "ELDP", value: "Ready", sub: "Bez blokace", tone: "green" },
      {
        label: "Odvody",
        value: "Plán hotov",
        sub: "Čeká na export",
        tone: "green",
      },
    ],
    workflow: [
      {
        label: "Přijato",
        detail: "Datová schránka načtena.",
        timestamp: "08:40",
        state: "done",
      },
      {
        label: "Vytěženo",
        detail: "Nový exekuční příkaz rozpoznán.",
        timestamp: "08:41",
        state: "done",
      },
      {
        label: "Vyhodnoceno AI",
        detail: "Navržena nová srážka.",
        timestamp: "08:42",
        state: "active",
      },
      {
        label: "Čeká na člověka",
        detail: "Potřeba finální kontrola.",
        timestamp: "08:44",
        state: "waiting",
      },
      {
        label: "Odesláno",
        detail: "Po kontrole bude zahrnuto do mezd.",
        timestamp: "pending",
        state: "waiting",
      },
    ],
    missingDocs: [],
    approvals: [
      {
        title: "Potvrdit novou srážku",
        owner: "Poupova",
        due: "16.04.",
        status: "Ke kontrole",
      },
    ],
    cfo: [
      {
        title: "Výjimky jsou přesně to, co má řešit člověk",
        summary: "Rutina je automatizovaná, výjimka jde na účetní.",
        impact: "Tým šetří čas bez ztráty kontroly.",
        action: "Potvrdit výpočet a uzamknout batch.",
        tone: "cyan",
      },
    ],
  },
  client_logitrans: {
    id: "client_logitrans",
    name: "LogiTrans CZ",
    sector: "Logistika",
    region: "Karlovarský kraj",
    description:
      "Klient s cestovními náhradami a řidiči v nepravidelných směnách.",
    employees: "14 řidičů",
    metrics: [
      {
        label: "Cestovní náhrady",
        value: "2 nejasné jízdy",
        sub: "Chybí destinace",
        tone: "gold",
      },
      { label: "Mzdy", value: "86 %", sub: "Ve frontě", tone: "cyan" },
      {
        label: "Docházka",
        value: "Importováno",
        sub: "Bez chyb",
        tone: "green",
      },
      { label: "Odvody", value: "Ready", sub: "Po uzávěrce", tone: "green" },
    ],
    workflow: [
      {
        label: "Přijato",
        detail: "Jízdy načteny z palubních jednotek.",
        timestamp: "08:10",
        state: "done",
      },
      {
        label: "Vytěženo",
        detail: "Systém nenašel dvě destinace.",
        timestamp: "08:13",
        state: "active",
      },
      {
        label: "Čeká na člověka",
        detail: "Nutné doplnit cesty.",
        timestamp: "08:14",
        state: "blocked",
      },
      {
        label: "Vyhodnoceno AI",
        detail: "Navržené sazby připraveny.",
        timestamp: "pending",
        state: "waiting",
      },
      {
        label: "Odesláno",
        detail: "Po doplnění se uzavře batch.",
        timestamp: "pending",
        state: "waiting",
      },
    ],
    missingDocs: [
      {
        title: "Destinace dvou jízd",
        requester: "Poupova",
        requestedAt: "08:20",
        channel: "Klientský portál",
        blocking: "Bez doplnění nelze spočítat náhrady.",
      },
    ],
    approvals: [
      {
        title: "Potvrdit konečné sazby",
        owner: "Klient",
        due: "20.04.",
        status: "Čeká na podklady",
      },
    ],
    cfo: [
      {
        title: "Cestovní data jsou vhodná na plnou automatizaci",
        summary:
          "Po doplnění destinací lze klienta posunout do bezdotykového režimu.",
        impact: "Nižší zátěž payroll týmu.",
        action: "Napojit palubní systém přímo do API.",
        tone: "cyan",
      },
    ],
  },
};

export const apiSurface: ApiEndpoint[] = [
  {
    method: "POST",
    path: "/api/demo/auth/request-code",
    purpose: "Validuje demo profil a spouští SMS na telefon majitele.",
    status: "live mock",
  },
  {
    method: "POST",
    path: "/api/demo/auth/verify-code",
    purpose: "Ověří OTP a vydá demo session token.",
    status: "live mock",
  },
  {
    method: "GET",
    path: "/api/me",
    purpose: "Vrací roli, navigaci a oprávnění pro workspace.",
    status: "ready",
  },
  {
    method: "GET",
    path: "/api/dashboard",
    purpose: "Vrací KPI, klienty, feed, termíny a rizika podle role.",
    status: "ready",
  },
  {
    method: "GET",
    path: "/api/clients",
    purpose: "Vrací jen klienty, které daný profil smí vidět.",
    status: "ready",
  },
  {
    method: "GET",
    path: "/api/clients/:id",
    purpose: "Detail klienta: workflow, dokumenty, CFO doporučení, schválení.",
    status: "ready",
  },
  {
    method: "GET",
    path: "/api/tasks",
    purpose: "Fronta úkolů a missing docs radar.",
    status: "ready",
  },
  {
    method: "GET",
    path: "/api/agent-feed",
    purpose: "Časová osa automatických akcí a výjimek.",
    status: "ready",
  },
  {
    method: "GET",
    path: "/api/metrics/overview",
    purpose: "Agregované metriky automatizace a termínů.",
    status: "ready",
  },
];

const normalizePhone = (value: string) => value.replace(/\s+/g, "");

export function findProfileByCredentials(surname: string, phone: string) {
  const normalizedSurname = surname.trim().toLowerCase();
  const normalizedPhone = normalizePhone(phone.trim());

  return demoProfiles.find(
    (profile) =>
      profile.surname.toLowerCase() === normalizedSurname &&
      normalizePhone(profile.phone) === normalizedPhone,
  );
}

function buildKpis(profile: DemoProfile): DemoKpi[] {
  if (profile.role === "owner") {
    return [
      {
        label: "Aktivní klienti",
        value: "7",
        sub: "Napříč CZ účetnictvím, DE daněmi a mzdami",
        tone: "cyan",
      },
      {
        label: "Rizika k řízení",
        value: "6",
        sub: "2 high, 4 medium",
        tone: "red",
      },
      {
        label: "Úkoly týmu",
        value: "12",
        sub: "Schneider, Poupova, Svanda",
        tone: "gold",
      },
      {
        label: "Automatizace",
        value: "88 %",
        sub: "Párování, validace, reporting",
        tone: "green",
      },
    ];
  }

  if (profile.role === "client") {
    return [
      {
        label: "Co čeká na vás",
        value: "3 položky",
        sub: "Doklad, EU/EWR, schválení účtu",
        tone: "gold",
      },
      {
        label: "Co už běží samo",
        value: "19 kroků",
        sub: "Párování, validace, notifikace",
        tone: "cyan",
      },
      {
        label: "Blížící se platba",
        value: "15.04.",
        sub: "Mzdový batch",
        tone: "cyan",
      },
      {
        label: "Cash horizon",
        value: "19 dní",
        sub: "Pak hrozí tlak na likviditu",
        tone: "gold",
      },
    ];
  }

  if (profile.role === "german-tax") {
    return [
      {
        label: "Aktivní DE případy",
        value: "4",
        sub: "Pendleři + firmy",
        tone: "cyan",
      },
      {
        label: "Čeká na EU/EWR",
        value: "2",
        sub: "Blokuje optimalizaci",
        tone: "gold",
      },
      {
        label: "ELSTER ready",
        value: "1 batch",
        sub: "Čeká na schválení",
        tone: "green",
      },
      {
        label: "Rizika",
        value: "2 high",
        sub: "IBAN + chybějící podklady",
        tone: "red",
      },
    ];
  }

  return [
    {
      label: "Mzdy ke schválení",
      value: "3 klienti",
      sub: "MontServis, Restaurace, LogiTrans",
      tone: "cyan",
    },
    {
      label: "Docházka blokuje",
      value: "1 klient",
      sub: "Restaurace U Mostu",
      tone: "gold",
    },
    {
      label: "ONZ / exekuce",
      value: "2 zásahy",
      sub: "Kovo + nový nástup",
      tone: "cyan",
    },
    {
      label: "Termín dnes",
      value: "15:00",
      sub: "Mzdová kontrola batch",
      tone: "red",
    },
  ];
}

function buildHeadline(profile: DemoProfile) {
  if (profile.role === "owner") {
    return {
      headline: "Majitelský dashboard účetní firmy",
      helperText:
        "Jeden řídicí pohled na klienty, rizika, termíny, týmové úkoly a automatizace. Majitel vidí priority celé kanceláře, ne jen jednoho klienta.",
    };
  }

  if (profile.role === "client") {
    return {
      headline: "Klientský cockpit bez účetního chaosu",
      helperText:
        "Vidíte jen to podstatné: co chybí, co SCH-EKONOM řeší za vás a kde vzniká riziko.",
    };
  }

  if (profile.role === "german-tax") {
    return {
      headline: "Přeshraniční agenda jako řízené workflow",
      helperText:
        "Německé daně, ELSTER, EU/EWR a A1 nejsou poznámky v e-mailu, ale přesné fronty, stavy a rozhodovací body.",
    };
  }

  return {
    headline: "Mzdová operativa bez ručního dohledávání",
    helperText:
      "Docházka, mzdy, exekuce a termíny jsou v jedné vrstvě. Tým řeší jen výjimky, ne rutinu.",
  };
}

export function buildWorkspaceSnapshot(
  profile: DemoProfile,
): WorkspaceSnapshot {
  const visibleClientSet = new Set(profile.visibleClientIds);
  const visibleClients = clientSummaries.filter((client) =>
    visibleClientSet.has(client.id),
  );

  const filteredTasks = tasks.filter((task) => {
    if (!visibleClientSet.has(task.clientId)) return false;
    if (profile.role === "owner") return true;
    return profile.role === "client"
      ? task.visibleToClient
      : task.ownerId === profile.id || task.clientId === "client_montservis";
  });

  const filteredAlerts = alerts.filter((alert) => {
    if (!visibleClientSet.has(alert.clientId)) return false;
    return profile.role === "client" ? alert.visibleToClient : true;
  });

  const filteredFeed = feed.filter((item) => {
    if (!visibleClientSet.has(item.clientId)) return false;
    if (profile.role === "owner") return true;
    if (profile.role === "client") {
      return item.audience === "all" || item.audience === "client";
    }
    return item.audience === "all" || item.audience === "employee";
  });

  const filteredDeadlines = deadlines.filter((deadline) => {
    if (!visibleClientSet.has(deadline.clientId)) return false;
    return profile.role === "client" ? deadline.visibleToClient : true;
  });

  const filteredDocuments = documents.filter((document) => {
    if (!visibleClientSet.has(document.clientId)) return false;
    return profile.role === "client" ? document.visibleToClient : true;
  });

  const defaultClientId = visibleClientSet.has("client_montservis")
    ? "client_montservis"
    : (visibleClients[0]?.id ?? "client_montservis");

  const { headline, helperText } = buildHeadline(profile);

  return {
    profile,
    nav: navByRole[profile.role],
    headline,
    helperText,
    kpis: buildKpis(profile),
    clients: visibleClients,
    tasks: filteredTasks,
    alerts: filteredAlerts,
    feed: filteredFeed,
    deadlines: filteredDeadlines,
    documents: filteredDocuments,
    apiSurface,
    defaultClientId,
  };
}

export function getClientDetail(clientId: string) {
  return clientDetails[clientId];
}
