import { Context } from "hono";
import { Create, Contact } from "../models/contact";

export const createContact = async (c: Context) => {
  const { firstName, lastName } = (await c.req.json()) as Create;
  const auth = c.req.header("Authorization");
  const clientId = c.req.header("clientId");

  if (!auth || !clientId) {
    return c.text("Authorization Needed", { status: 400 });
  }

  if (!firstName || !lastName) {
    return c.text("First Name and Last Name are required", { status: 400 });
  }

  try {
    const res = await fetch(
      `https://sandbox-na.myconnectwise.net/v4_6_release/apis/3.0/company/contacts`,
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
    let contactId = 0;

    if (res.ok) {
      json.some(
        (contact: { firstName: string; lastName: string; id: number }) => {
          if (
            contact.firstName === firstName &&
            contact.lastName === lastName
          ) {
            contactId = contact.id;
            return true;
          }
          return false;
        }
      );

      if (contactId != 0) {
        return c.text(contactId.toString());
      } else {
        try {
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
              }),
            }
          );

          const json = (await res.json()) as Contact;

          if (res.ok) {
            return c.json(json.id);
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
