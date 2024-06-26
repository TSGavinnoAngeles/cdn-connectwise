import { Context } from "hono";
import { Contact } from "../models/contact";

export const getContact = async (c: Context) => {
  const auth = c.req.header("Authorization");
  const clientId = c.req.header("clientId");

  if (!auth || !clientId) {
    return c.text("Authorization Needed", { status: 400 });
  }
  try {
    const res = await fetch(
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
      return c.json(
        json.map(
          (contact: { firstName: string; lastName: string; id: number }) =>
            `${contact.id} ${contact.firstName} ${contact.lastName}`
        )
      );
    }

    if (!res.ok) {
      return c.text("Contacts not found", { status: 404 });
    }
  } catch (error) {
    return c.text(`Error: ${error}`, { status: 500 });
  }
};
