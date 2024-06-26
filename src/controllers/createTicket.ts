import { Context } from "hono";
import { Ticket } from "../models/connectwise";
import { ticketCreation } from "../models/ticket";

export const createTicket = async (c: Context) => {
  const { summary, board, company, type } =
    (await c.req.json()) as ticketCreation;
  const auth = c.req.header("Authorization");
  const clientId = c.req.header("clientId");

  if (!auth || !clientId) {
    return c.text("Authorization Needed", { status: 400 });
  }
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
};
