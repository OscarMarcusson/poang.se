import type { API, APIRequest } from "../main.ts";
import { createJWT } from "./jwt.ts";

// deno-lint-ignore-file no-explicit-any
export const apiRefreshHandler: API = {
  description: "Förnyar åtkomsttokenet.",
  handler: (input: APIRequest) => {
    if (!input.user) {
      return new Response("", { status: 401 });
    }

    const token = createJWT(input.user);
    return new Response(input.user, {
      headers: {
        "Set-Cookie": `auth=${token}; HttpOnly; Secure; SameSite=Strict`,
      },
    });
  },
};
