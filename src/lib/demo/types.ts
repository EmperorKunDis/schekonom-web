export type DemoRole = "owner" | "client" | "german-tax" | "payroll";

export type DemoNavKey =
  | "overview"
  | "clients"
  | "tasks"
  | "documents"
  | "automation"
  | "reporting"
  | "risks"
  | "deadlines"
  | "recommendations"
  | "security";

export type Tone = "cyan" | "gold" | "green" | "red" | "slate";
export type Severity = "high" | "medium" | "low";
export type WorkflowState = "done" | "active" | "waiting" | "blocked";

export interface NavItem {
  key: DemoNavKey;
  label: string;
}

export interface DemoProfile {
  id: string;
  surname: string;
  phone: string;
  role: DemoRole;
  title: string;
  summary: string;
  domain: string;
  visibleClientIds: string[];
  demoCode: string;
}

export interface DemoKpi {
  label: string;
  value: string;
  sub: string;
  tone: Tone;
}

export interface ClientSummary {
  id: string;
  name: string;
  sector: string;
  region: string;
  ownerLabels: string[];
  status: string;
  statusTone: Tone;
  openTasks: number;
  overdueItems: number;
  nextDeadline: string;
  tags: string[];
  score: string;
}

export interface DemoTask {
  id: string;
  clientId: string;
  ownerId: string;
  title: string;
  summary: string;
  type: string;
  priority: Severity;
  due: string;
  stage: string;
  visibleToClient: boolean;
}

export interface DemoAlert {
  id: string;
  clientId: string;
  title: string;
  summary: string;
  action: string;
  severity: Severity;
  visibleToClient: boolean;
}

export interface DemoFeedItem {
  id: string;
  clientId: string;
  timestamp: string;
  title: string;
  summary: string;
  severity: Severity;
  needsApproval: boolean;
  audience: "all" | "employee" | "client";
}

export interface DemoDeadline {
  id: string;
  clientId: string;
  title: string;
  due: string;
  area: string;
  ownerLabel: string;
  status: string;
  visibleToClient: boolean;
}

export interface DemoDocument {
  id: string;
  clientId: string;
  title: string;
  kind: string;
  source: string;
  receivedAt: string;
  status: string;
  visibleToClient: boolean;
}

export interface WorkflowStep {
  label: string;
  detail: string;
  timestamp: string;
  state: WorkflowState;
}

export interface ClientMetric {
  label: string;
  value: string;
  sub: string;
  tone: Tone;
}

export interface MissingDocument {
  title: string;
  requester: string;
  requestedAt: string;
  channel: string;
  blocking: string;
}

export interface ApprovalItem {
  title: string;
  owner: string;
  due: string;
  status: string;
}

export interface CfoRecommendation {
  title: string;
  summary: string;
  impact: string;
  action: string;
  tone: Tone;
}

export interface ClientDetail {
  id: string;
  name: string;
  sector: string;
  region: string;
  description: string;
  employees: string;
  metrics: ClientMetric[];
  workflow: WorkflowStep[];
  missingDocs: MissingDocument[];
  approvals: ApprovalItem[];
  cfo: CfoRecommendation[];
}

export interface ApiEndpoint {
  method: "GET" | "POST";
  path: string;
  purpose: string;
  status: string;
}

export interface WorkspaceSnapshot {
  profile: DemoProfile;
  nav: NavItem[];
  headline: string;
  helperText: string;
  kpis: DemoKpi[];
  clients: ClientSummary[];
  tasks: DemoTask[];
  alerts: DemoAlert[];
  feed: DemoFeedItem[];
  deadlines: DemoDeadline[];
  documents: DemoDocument[];
  apiSurface: ApiEndpoint[];
  defaultClientId: string;
}
