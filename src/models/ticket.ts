//Ticket Creation Interface
export interface ticketCreation {
  summary: string;
  board: boardCreateTicket;
  company: companyCreateTicket;
  type: typeCreateTicket;
}
export interface createTicketAndContact {
  summary: string;
  board: boardCreateTicket;
  company: companyCreateTicket;
  type: typeCreateTicket;
  contactName: string;
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
