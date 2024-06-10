//Ticket Creation Interface
export interface ticketCreation {
  summary: string;
  board: boardCreateTicket;
  company: companyCreateTicket;
  type: typeCreateTicket;
}
export interface boardCreateTicket {
  name: string;
}
export interface companyCreateTicket {
  id: number;
}
export interface typeCreateTicket {
  name: string;
}

//PUT Notes Interface
export interface Notes {
  text: string;
  detailDescriptionFlag: boolean;
  member: memberNotes;
  id: number;
}

export interface memberNotes {
  id: number;
}

// System Document Creation Interface
export interface uploadScreenshot {
  file: string;
  title: string;
  id: number;
}

export interface Document {
  id: number;
  title: string;
  fileName: string;
  serverFileName: string;
  owner: string;
  linkFlag: boolean;
  imageFlag: boolean;
  publicFlag: boolean;
  htmlTemplateFlag: boolean;
  readOnlyFlag: boolean;
  size: number;
  urlFlag: boolean;
  documentType: DocumentType;
  guid: string;
  _info: InfoDocument;
}

export interface DocumentType {
  id: number;
  name: string;
  _info: InfoDocumentType;
}

export interface InfoDocumentType {
  DocumentType_href: string;
}
export interface InfoDocument {
  lastUpdated: string;
  updatedBy: string;
}

//Base Ticket Interface
export interface Ticket {
  id: number;
  summary: string;
  recordType: string;
  board: Board;
  status: Status;
  workRole: WorkRole;
  workType: WorkType;
  company: Company;
  site: Site;
  siteName: string;
  addressLine1: string;
  city: string;
  stateIdentifier: string;
  zip: string;
  country: Country;
  contact: Contact;
  contactName: string;
  contactEmailAddress: string;
  type: Type;
  team: Team;
  priority: Priority;
  serviceLocation: ServiceLocation;
  source: Source;
  severity: string;
  impact: string;
  allowAllClientsPortalView: boolean;
  customerUpdatedFlag: boolean;
  automaticEmailContactFlag: boolean;
  automaticEmailResourceFlag: boolean;
  automaticEmailCcFlag: boolean;
  closedFlag: boolean;
  approved: boolean;
  estimatedExpenseCost: number;
  estimatedExpenseRevenue: number;
  estimatedProductCost: number;
  estimatedProductRevenue: number;
  estimatedTimeCost: number;
  estimatedTimeRevenue: number;
  billingMethod: string;
  subBillingMethod: string;
  resolveMinutes: number;
  resPlanMinutes: number;
  respondMinutes: number;
  isInSla: boolean;
  hasChildTicket: boolean;
  hasMergedChildTicketFlag: boolean;
  billTime: string;
  billExpenses: string;
  billProducts: string;
  location: Location;
  department: Department;
  mobileGuid: string;
  sla: Sla;
  slaStatus: string;
  requestForChangeFlag: boolean;
  currency: Currency;
  _info: Info18;
  escalationStartDateUTC: string;
  escalationLevel: number;
  minutesBeforeWaiting: number;
  respondedSkippedMinutes: number;
  resplanSkippedMinutes: number;
  respondedHours: number;
  resplanHours: number;
  resolutionHours: number;
  minutesWaiting: number;
  customFields: CustomField[];
}

export interface Board {
  id: number;
  name: string;
  _info: Info;
}

export interface Info {
  board_href: string;
}

export interface Status {
  id: number;
  name: string;
  Sort: number;
  _info: Info2;
}

export interface Info2 {
  status_href: string;
}

export interface WorkRole {
  id: number;
  name: string;
  _info: Info3;
}

export interface Info3 {
  workRole_href: string;
}

export interface WorkType {
  id: number;
  name: string;
  _info: Info4;
}

export interface Info4 {
  workType_href: string;
}

export interface Company {
  id: number;
  identifier: string;
  name: string;
  _info: Info5;
}

export interface Info5 {
  company_href: string;
  mobileGuid: string;
}

export interface Site {
  id: number;
  name: string;
  _info: Info6;
}

export interface Info6 {
  site_href: string;
  mobileGuid: string;
}

export interface Country {
  id: number;
  name: string;
  _info: Info7;
}

export interface Info7 {
  country_href: string;
}

export interface Contact {
  id: number;
  name: string;
  _info: Info8;
}

export interface Info8 {
  mobileGuid: string;
  contact_href: string;
}

export interface Type {
  id: number;
  name: string;
  _info: Info9;
}

export interface Info9 {
  type_href: string;
}

export interface Team {
  id: number;
  name: string;
  _info: Info10;
}

export interface Info10 {
  team_href: string;
}

export interface Priority {
  id: number;
  name: string;
  sort: number;
  level: string;
  _info: Info11;
}

export interface Info11 {
  priority_href: string;
  image_href: string;
}

export interface ServiceLocation {
  id: number;
  name: string;
  _info: Info12;
}

export interface Info12 {
  location_href: string;
}

export interface Source {
  id: number;
  name: string;
  _info: Info13;
}

export interface Info13 {
  source_href: string;
}

export interface Location {
  id: number;
  name: string;
  _info: Info14;
}

export interface Info14 {
  location_href: string;
}

export interface Department {
  id: number;
  identifier: string;
  name: string;
  _info: Info15;
}

export interface Info15 {
  department_href: string;
}

export interface Sla {
  id: number;
  name: string;
  _info: Info16;
}

export interface Info16 {
  sla_href: string;
}

export interface Currency {
  id: number;
  symbol: string;
  currencyCode: string;
  decimalSeparator: string;
  numberOfDecimals: number;
  thousandsSeparator: string;
  negativeParenthesesFlag: boolean;
  displaySymbolFlag: boolean;
  currencyIdentifier: string;
  displayIdFlag: boolean;
  rightAlign: boolean;
  name: string;
  _info: Info17;
}

export interface Info17 {
  currency_href: string;
}

export interface Info18 {
  lastUpdated: string;
  updatedBy: string;
  dateEntered: string;
  enteredBy: string;
  activities_href: string;
  scheduleentries_href: string;
  documents_href: string;
  configurations_href: string;
  tasks_href: string;
  notes_href: string;
  products_href: string;
  timeentries_href: string;
  expenseEntries_href: string;
}

export interface CustomField {
  id: number;
  caption: string;
  type: string;
  entryMethod: string;
  numberOfDecimals: number;
}
