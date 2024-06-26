import { Context } from "hono";
import { Contact } from "../models/contact";
import { createTicketAndContact } from "../models/ticket";
import { Ticket } from "../models/connectwise";
let contactId = 0;

function capitalizeFirstLetter(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function parseContactName(contactName: string): {
  firstName: string;
  lastName: string;
} {
  let firstName = "";
  let lastName = "";

  if (contactName.includes("@") && contactName.includes(".com")) {
    const [emailUser] = contactName.split("@");
    const [first, last] = emailUser.split(".");
    firstName = capitalizeFirstLetter(first);
    lastName = capitalizeFirstLetter(last);
  } else {
    const firstSpaceIndex = contactName.indexOf(" ");
    firstName = capitalizeFirstLetter(
      contactName.substring(0, firstSpaceIndex)
    );
    lastName = capitalizeFirstLetter(
      contactName.substring(firstSpaceIndex + 1)
    );
  }

  return { firstName, lastName };
}

export const createTicketContact = async (c: Context) => {
  const { summary, board, company, type, contactName } =
    (await c.req.json()) as createTicketAndContact;
  const auth = c.req.header("Authorization");
  const clientId = c.req.header("clientId");

  if (!auth || !clientId) {
    return c.text("Authorization Needed", { status: 400 });
  }

  const { firstName, lastName } = parseContactName(contactName);

  if (!firstName || !lastName) {
    return c.text(`Invalid Name ${firstName} ${lastName}`, { status: 400 });
  }

  try {
    // This first try block is to check if the contact exists. Since the only way to get a contact is by ID and not by name,
    //  we have to get all contacts and then check if the contact exists.
    const res = await fetch(
      //The problem here is that it will only check the first 1000 contacts and
      //if the contact is not in the first 1000 contacts it will not be found and would be considered a new contact.
      //We can add the params page to get the next page of 1000 contacts.

      `https://sandbox-na.myconnectwise.net/v4_6_release/apis/3.0/company/contacts?pageSize=1000`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
          clientId: clientId,
        },
      }
    );

    const json = (await res.json()) as Contact;

    if (res.ok) {
      //looks to find the contact in the list of contacts
      const isDuplicate = json.some(
        (contact: { firstName: string; lastName: string; id: number }) => {
          if (
            contact.firstName === firstName &&
            contact.lastName === lastName
          ) {
            contactId = contact.id;
            return true;
          } else {
            contactId = 0;
            return false;
          }
        }
      );

      if (isDuplicate) {
        // If the contact exists, create a ticket with the existing contact ID and return the ticket ID
        try {
          const res = await fetch(
            `https://sandbox-na.myconnectwise.net/v4_6_release/apis/3.0/service/tickets`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: auth,
                clientId: clientId,
              },
              body: JSON.stringify({
                summary: summary,
                board: board,
                company: company,
                type: type,
                contact: { id: contactId },
              }),
            }
          );
          const json = (await res.json()) as Ticket;
          if (res.ok) {
            return c.json(json.id);
          }
          if (!res.ok) {
            return c.text("Failed to create the ticket", { status: 400 });
          }
        } catch (error) {
          return c.text(`Error: ${error}`, { status: 500 });
        }
      } else {
        //This block is for creating a ticket with a new contact
        try {
          // Since the only way to reference a contact is via its ID we need to create a contact first and the get the ID
          const res = await fetch(
            `https://sandbox-na.myconnectwise.net/v4_6_release/apis/3.0/company/contacts`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: auth,
                clientId: clientId,
              },
              body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                ignoreDuplicates: true,
              }),
            }
          );
          const json = (await res.json()) as Contact;
          if (res.ok) {
            contactId = json.id;
            //This block is for creating a ticket with a new contact ID.
            // The let variable contactId is updated with the new contact ID and used to create the ticket
            //This will return our ticket.
            try {
              const res = await fetch(
                `https://sandbox-na.myconnectwise.net/v4_6_release/apis/3.0/service/tickets`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: auth,
                    clientId: clientId,
                  },
                  body: JSON.stringify({
                    summary: summary,
                    board: board,
                    company: company,
                    type: type,
                    contact: { id: contactId },
                  }),
                }
              );
              const json = (await res.json()) as Ticket;
              if (res.ok) {
                return c.json(json.id);
              }
              if (!res.ok) {
                return c.text("Failed to create the ticket", { status: 400 });
              }
            } catch (error) {
              return c.text(`Error: ${error}`, { status: 500 });
            }
          }
          if (!res.ok) {
            return c.text("Failed to create the contact", { status: 400 });
          }
        } catch (error) {
          return c.text(`Error: ${error}`, { status: 500 });
        }
      }
    }

    if (!res.ok) {
      return c.text("Contacts not found", { status: 404 });
    }
  } catch (error) {
    return c.text(`Error: ${error}`, { status: 500 });
  }
};
