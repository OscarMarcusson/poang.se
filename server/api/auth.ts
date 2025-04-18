import type { API, APIRequest } from "../main.ts";
import { createJWT } from "./jwt.ts";

// deno-lint-ignore-file no-explicit-any
export const apiLoginHandler: API = {
  description: "Används vid inloggning för att skaffa ett åtkomsttoken.",
  body: {
    user: "string",
    password: "string",
  },
  handler: (input: APIRequest) => {
    const payload = input.payload as apiLoginPayload;
    if (!payload.user) return new Response("{}", { status: 400 });

    // TODO: Validate that the user actually exists
    // TODO: Validate the password for that user

    const token = createJWT(payload.user);
    return new Response(payload.user, {
      headers: {
        "Set-Cookie": `auth=${token}; HttpOnly; Secure; SameSite=Strict`,
      },
    });
  },
};

interface apiLoginPayload {
  user: string;
  password: string;
}
