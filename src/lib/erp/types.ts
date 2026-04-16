// ERP Type System — comprehensive types for SCH-EKONOM showcase

export type ErpRole = "owner" | "employee" | "client";

export interface ErpProfile {
  id: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  role: ErpRole;
  title: string;
  department: string;
  photo?: string;
  visibleCompanyIds: string[];
}

export interface Company {
  id: string;
  name: string;
  ico: string;
  dic: string;
  address: string;
  city: string;
  sector: string;
  employeeCount: number;
  assignedAccountantId: string;
  assignedAccountantName: string;
  status: "active" | "onboarding" | "paused";
  monthlyRevenue: number;
  openTasks: number;
  missingDocs: number;
  riskScore: number;
  nextDeadline: string;
  tags: string[];
}

export interface Invoice {
  id: string;
  companyId: string;
  type: "issued" | "received";
  number: string;
  supplier?: string;
  customer?: string;
  description: string;
  amount: number;
  currency: "CZK" | "EUR";
  vatRate: number;
  vatAmount: number;
  issueDate: string;
  dueDate: string;
  paidAt?: string;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  vs: string;
}

export interface BankTransaction {
  id: string;
  companyId: string;
  date: string;
  amount: number;
  currency: "CZK" | "EUR";
  counterparty: string;
  counterpartyAccount: string;
  vs: string;
  ks: string;
  note: string;
  matched: boolean;
  matchedInvoiceId?: string;
}

export interface TaxReturn {
  id: string;
  companyId: string;
  type:
    | "DPPO"
    | "DPFO"
    | "DPH"
    | "silnicni"
    | "nemovitosti"
    | "kontrolni-hlaseni"
    | "souhrnne-hlaseni";
  period: string;
  status: "pending" | "in-progress" | "ready" | "filed" | "accepted";
  dueDate: string;
  filedAt?: string;
  amount?: number;
  assigneeId: string;
}

export interface PayrollRecord {
  id: string;
  companyId: string;
  employeeName: string;
  position: string;
  month: string;
  gross: number;
  net: number;
  incomeTax: number;
  socialInsurance: number;
  healthInsurance: number;
  employerCosts: number;
  status: "calculated" | "approved" | "paid";
}

export interface ErpDocument {
  id: string;
  companyId: string;
  title: string;
  type:
    | "invoice"
    | "contract"
    | "tax-return"
    | "payroll"
    | "receipt"
    | "bank-statement"
    | "correspondence"
    | "certificate"
    | "other";
  source: "upload" | "email" | "scan" | "generated" | "docuware";
  uploadedBy: string;
  uploadedAt: string;
  status: "received" | "processing" | "processed" | "archived" | "missing";
  ocrExtracted: boolean;
  tags: string[];
  size?: string;
}

export interface Deadline {
  id: string;
  companyId: string;
  title: string;
  type: "tax" | "payroll" | "audit" | "compliance" | "internal";
  dueDate: string;
  responsibleId: string;
  responsibleName: string;
  status: "upcoming" | "due-soon" | "overdue" | "completed";
  automated: boolean;
  reminderSent: boolean;
}

export interface CommunicationLog {
  id: string;
  companyId: string;
  channel: "email" | "phone" | "chat" | "whatsapp" | "datovka" | "personal";
  direction: "inbound" | "outbound";
  from: string;
  to: string;
  subject: string;
  preview: string;
  timestamp: string;
  sentiment?: "positive" | "neutral" | "negative";
  resolved: boolean;
}

export interface RiskAlert {
  id: string;
  companyId: string;
  severity: "critical" | "high" | "medium" | "low";
  category:
    | "compliance"
    | "payment"
    | "document"
    | "fraud"
    | "deadline"
    | "churn";
  title: string;
  description: string;
  action: string;
  detectedAt: string;
  resolvedAt?: string;
  autoDetected: boolean;
}

export interface WorkflowProcess {
  id: string;
  companyId: string;
  processName: string;
  steps: WorkflowStep[];
  startedAt: string;
  completedAt?: string;
}

export interface WorkflowStep {
  label: string;
  detail: string;
  timestamp: string;
  status: "done" | "active" | "waiting" | "blocked";
  assigneeId?: string;
}

export interface AuditLogEntry {
  id: string;
  userId: string;
  userName: string;
  action:
    | "create"
    | "update"
    | "delete"
    | "view"
    | "approve"
    | "send"
    | "login"
    | "export";
  entity: string;
  entityId: string;
  timestamp: string;
  details: string;
  ipAddress?: string;
}

export interface CashFlowForecast {
  month: string;
  projected: number;
  actual?: number;
  variance?: number;
}

export interface AgingBucket {
  bucket: "0-30" | "31-60" | "61-90" | "90+";
  count: number;
  total: number;
}

export interface GermanTaxCase {
  id: string;
  companyId: string;
  personName: string;
  type:
    | "Steuererklarung"
    | "Freistellung"
    | "Kindergeld"
    | "A1"
    | "ELSTER"
    | "SOKA-BAU";
  year: string;
  status:
    | "data-collection"
    | "processing"
    | "review"
    | "filed"
    | "accepted"
    | "refund-received";
  refundAmount?: number;
  filedAt?: string;
  finanzamt?: string;
}

export interface Certificate {
  id: string;
  holderId: string;
  holderName: string;
  type: "eIDAS-qualified" | "eIDAS-advanced" | "SSL" | "timestamping";
  issuedAt: string;
  expiresAt: string;
  status: "active" | "expiring-soon" | "expired" | "revoked";
  serialNumber: string;
}

export interface SchEmployee {
  id: string;
  name: string;
  department: string;
  position: string;
  email: string;
  phone: string;
  photo?: string;
  clientIds: string[];
  hoursThisMonth: number;
  processedDocsThisMonth: number;
  avgDocsPerHour: number;
  activeTaskCount: number;
}

export interface DashboardKpi {
  label: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  sub: string;
  tone: "cyan" | "gold" | "green" | "red" | "slate";
}

// Navigation types
export type OwnerNavKey =
  | "dashboard"
  | "klienti"
  | "zamestnanci"
  | "ucetnictvi"
  | "mzdy"
  | "dane-cz"
  | "dane-de"
  | "dokumenty"
  | "komunikace"
  | "automatizace"
  | "rizika"
  | "terminy"
  | "reporting"
  | "nastaveni";
export type EmployeeNavKey =
  | "dashboard"
  | "klienti"
  | "ukoly"
  | "dokumenty"
  | "komunikace"
  | "terminy"
  | "rizika"
  | "dane-de"
  | "reporting";
export type ClientNavKey =
  | "prehled"
  | "dokumenty"
  | "terminy"
  | "finance"
  | "komunikace"
  | "doporuceni"
  | "nastaveni";
