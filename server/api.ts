import { API } from "./main.ts";

const authHeader = {
  "auth": "Användarens åtkomsttoken",
};

export const api: Record<string, API> = {
  "logga/in": {
    description: "Används vid inloggning för att skaffa ett åtkomsttoken.",
    body: {
      "user": "string",
      "password": "string",
    },
    handler: (input) => new Response('{"status": true }'),
  },
  "logga/ut": {
    description: "Stänger av det aktiva åtkomsttokenet",
    headers: authHeader,
    handler: (input) => new Response('{"status": true }'),
  },
  "spel": {
    description:
      "Hämtar listan av alla tillgängliga spel för den inloggade användaren",
    headers: authHeader,
    handler: (input) => new Response('{"status": false }'),
  },
};
