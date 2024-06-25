//contact creation interface
import { Info18 } from "./connectwise";

export interface Create {
  firstName: string;
  lastName: string;
}

export interface Contact {
  [x: string]: any;
  id: number;
  firstName: string;
  lastName: string;
  company: Company;
  site: Site;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  country: Country;
  relationship: Relationship;
  relationshipOverride: string;
  department: Department;
  inactiveFlag: boolean;
  defaultMergeContactId: number;
  securityIdentifier: string;
  managerContact: ManagerContact;
  assistantContact: AssistantContact;
  title: string;
  school: string;
  nickName: string;
  marriedFlag: boolean;
  childrenFlag: boolean;
  children: string;
  significantOther: string;
  portalPassword: string;
  portalSecurityLevel: number;
  disablePortalLoginFlag: boolean;
  unsubscribeFlag: boolean;
  gender: ["Female", "Male"];
  birthDay: string;
  anniversary: string;
  presence: "NoAgent" | "Online" | "Away" | "DoNotDisturb" | "Offline";
  mobileGuid: string;
  facebookUrl: string;
  twitterUrl: string;
  linkedInUrl: string;
  defaultPhoneType: string;
  defaultPhoneNbr: string;
  defaultPhoneExtension: string;
  defaultBillingFlag: boolean;
  defaultFlag: boolean;
  companyLocation: CompanyLocation;
  communicationItems: CommunicationItems;
  types: Types;
  integratorTags: string[];
  customFields: CustomFields;
  photo: Photo;
  ignoreDuplicates: boolean;
  _info: Info;
  typeIds: number[];
}
[];

export interface Company {
  id: number;
  identifier: string;
  name: string;
  _info: {
    [key: string]: string;
  };
}

export interface Site {
  id: number;
  name: string;
  _info: {
    [key: string]: string;
  };
}

export interface Country {
  id: number;
  identifier: string;
  name: string;
  _info: {
    [key: string]: string;
  };
}

export interface Relationship {
  id: number;
  name: string;
  _info: {
    [key: string]: string;
  };
}

export interface Department {
  id: number;
  name: string;
  _info: {
    [key: string]: string;
  };
}
export interface ManagerContact {
  id: number;
  name: string;
  _info: {
    [key: string]: string;
  };
}

export interface AssistantContact {
  id: number;
  name: string;
  _info: {
    [key: string]: string;
  };
}

export interface CompanyLocation {
  id: number;
  name: string;
  _info: {
    [key: string]: string;
  };
}

export interface CommunicationItems {
  id: number;
  type: {
    id: number;
    name: string;
    _info: {
      [key: string]: string;
    };
  };
  value: string;
  extension: string;
  defaultFlag: boolean;
  domain: string;
  communicationType: ["Email", "Phone", "Fax"];
}
[];

export interface Types {
  id: number;
  name: string;
  _info: {
    [key: string]: string;
  };
}
[];

export interface CustomFields {
  id: number;
  caption: string;
  type: [
    "TextArea",
    "Button",
    "Currency",
    "Date",
    "Hyperlink",
    "IPAddress",
    "Checkbox",
    "Number",
    "Percent",
    "Text",
    "Password"
  ];
  entryMethod: ["ManualEntry", "Date", "DropList", "FileUpload"];
  numberOfDecimals: number;
  value: any;
}
[];

export interface Photo {
  id: number;
  name: string;
  _info: {
    [key: string]: string;
  };
}

export interface Info {
  [key: string]: string;
}
