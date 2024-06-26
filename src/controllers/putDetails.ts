import { Context } from "hono";
import { Ticket } from "../models/connectwise";
import { Notes } from "../models/notes";

export const putDetails = async (c: Context) => {
  const { id, text, detailDescriptionFlag, member } =
    (await c.req.json()) as Notes;

  const auth = c.req.header("Authorization");
  const clientId = c.req.header("clientId");

  if (!auth || !clientId) {
    return c.text("Authorization Needed", { status: 400 });
  }
  try {
    const res = await fetch(
      `https://sandbox-na.myconnectwise.net/v4_6_release/apis/3.0/service/tickets/${id}/notes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
          clientId: clientId,
        },
        body: JSON.stringify({
          text: text,
          detailDescriptionFlag: detailDescriptionFlag,
          member: member,
        }),
      }
    );

    const json = (await res.json()) as Ticket;

    if (res.ok) {
      return c.json(json);
    }

    if (!res.ok) {
      return c.text("Failed to put the description on the ticket", {
        status: 400,
      });
    }
  } catch (error) {
    return c.text(`Error: ${error}`, { status: 500 });
  }
};
