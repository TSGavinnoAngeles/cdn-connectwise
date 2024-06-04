import { Hono } from "hono";
import { createTicket, Ticket, putNotes } from "../models/connectwise";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!!!");
});

app.post("/getTicket", async (c) => {
  const { id } = await c.req.json();
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
    return c.text("Error", { status: 500 });
  }
});

app.post("/createTicket", async (c) => {
  const { summary, board, company, type } =
    (await c.req.json()) as createTicket;
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
      return c.json(json);
    }

    if (!res.ok) {
      console.log(json);
      return c.text("Failed to create the ticket", { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return c.text("Error", { status: 500 });
  }
});

app.post("/putDetails", async (c) => {
  const { id, text, detailDescriptionFlag, member } =
    (await c.req.json()) as putNotes;
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
      console.log(json);
      return c.text("Failed to put the description on the ticket", {
        status: 400,
      });
    }
  } catch (error) {
    console.log(error);
    return c.text("Error", { status: 500 });
  }
});
app.post;

export default app;
