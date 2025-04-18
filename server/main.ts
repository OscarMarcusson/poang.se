import { api } from "./api/api.ts";
import { verifyJWT } from "./api/jwt.ts";
import { helpPage } from "./helpPage.ts";
import { convertCookieStringToRecord } from "./utility/cookie-parser.ts";

const apiRoute = new URLPattern();
const port = 8000;

const routes: Record<string, API> = (() => {
  const r: Record<string, API> = {};
  for (const key in api) {
    r[`/api/${key}`] = api[key];
  }
  return r;
})();

Deno.serve({ port }, async (request) => {
  const apiMatch = apiRoute.exec(request.url);
  const parsedRequest: APIRequest = {
    url: apiMatch?.pathname.input ?? "",
    cookies: {},
  };

  parsedRequest.cookies = convertCookieStringToRecord(
    request.headers.get("cookie")
  );
  parsedRequest.user = parsedRequest.cookies.auth
    ? verifyJWT(parsedRequest.cookies.auth)
    : undefined;

  if (parsedRequest.url == "/api" || parsedRequest.url == "/api/") {
    return new Response(helpPage, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } else if (parsedRequest.url.startsWith("/api/")) {
    const route = routes[parsedRequest.url];
    if (!route) {
      return new Response("", {
        status: 404,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
        },
      });
    }

    if (route.body) {
      if (!request.body) {
        return new Response(
          "En kropp med följande fält förväntades:\n" +
            Object.keys(route.body).join("\n"),
          { status: 400 }
        );
      }
      parsedRequest.payload = {};
      const body = await request.json();
      const missing: string[] = [];
      for (const key in route.body) {
        if (body[key] !== undefined) {
          parsedRequest.payload[key] = body[key];
        } else {
          missing.push(key);
        }
      }
      if (missing.length > 0) {
        return new Response("Saknade dessa fält:\n" + missing.join("\n"), {
          status: 400,
        });
      }
    } else if (request.body) {
      return new Response(parsedRequest.url + " tar inte emot en kropp", {
        status: 400,
      });
    }

    console.log(parsedRequest);
    return route.handler(parsedRequest);
  }

  return new Response(
    "TODO: Try to resolve resources by name, otherwise return index.html"
  );
});

export interface API {
  description: string;
  cookies?: Record<string, string>;
  body?: unknown;
  handler: (input: APIRequest) => Response | Promise<Response>;
}

export interface APIRequest {
  url: string;
  user?: string;
  cookies: Record<string, string>;
  // deno-lint-ignore no-explicit-any
  payload?: any;
}
