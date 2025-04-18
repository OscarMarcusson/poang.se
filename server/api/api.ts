import { API } from "../main.ts";
import { apiLoginHandler } from "./auth.ts";

export const authCookie = { auth: "Användarens åtkomsttoken (JWT)" };
export const jsonHeader = { "Content-Type": "text/json; charset=utf-8" };

export const api: Record<string, API> = {
  "auth": apiLoginHandler,
  "register": {
    description: "Skapar en ny användare",
    body: {
      user: "string",
      password: "string",
    },
    handler: (input) =>
      new Response(JSON.stringify(input), {
        headers: jsonHeader,
      }),
  },
  "list": {
    description:
      "Hämtar listan av alla tillgängliga spel för den inloggade användaren",
    cookies: authCookie,
    handler: (input) => new Response('{"status": false }'),
  },
};
