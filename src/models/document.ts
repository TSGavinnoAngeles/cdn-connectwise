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
