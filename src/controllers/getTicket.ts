import { Context } from "hono";
import { Ticket } from "../models/connectwise";

export const getTicket = async (c: Context) => {
  const { id } = c.req.param();
  const auth = c.req.header("Authorization");
  const clientId = c.req.header("clientId");

  if (!auth || !clientId) {
    return c.text("Authorization Needed", { status: 400 });
  }
  try {
    const res = await fetch(
      `https://sandbox-na.myconnectwise.net/v4_6_release/apis/3.0/service/tickets/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
          clientId: clientId,
        },
      }
    );

    const json = (await res.json()) as Ticket;

    if (res.ok) {
      return c.json(json);
    }

    if (!res.ok) {
      console.log(json);
      return c.text("Ticket not found", { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return c.text(`Error: ${error}`, { status: 500 });
  }
};
