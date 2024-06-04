// import { Context, Next } from "hono";

// export const authMiddleware = async (c: Context, next: Next) => {
//   const auth = c.req.header("Authorization");
//   const clientId = c.req.header("clientId");

//   if (!auth || !clientId) {
//     return c.text("Authorization Needed", { status: 400 });
//   }

//   c.set("auth", auth);
//   c.set("clientId", clientId);

//   await next();
// };
