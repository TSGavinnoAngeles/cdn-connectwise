import { Hono } from "hono";
import { addTicket } from "./controllers/addTicket";
import { getTicket } from "./controllers/getTicket";
import { putDetails } from "./controllers/putDetails";

const app = new Hono();

app.get("/", (c) => c.text("Connectwise CDN endpoints."));

app.get("/getTicket/:id", getTicket);

app.post("/createTicket", addTicket);

app.post("/putDetails", putDetails);

export default app;
