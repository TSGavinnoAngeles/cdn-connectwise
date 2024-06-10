import { Hono } from "hono";
import { createTicket } from "./controllers/createTicket";
import { getTicket } from "./controllers/getTicket";
import { putDetails } from "./controllers/putDetails";
import { uploadDocument } from "./controllers/uploadScreenshot";
import { cors } from "hono/cors";

const app = new Hono();

app.use(cors());

app.get("/", (c) => c.text("Connectwise CDN endpoints."));

app.get("/getTicket/:id", getTicket);

app.post("/createTicket", createTicket);

app.post("/putDetails", putDetails);
app.post("/uploadDocument", uploadDocument);

export default app;
