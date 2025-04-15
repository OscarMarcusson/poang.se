import { api } from "./api.ts";
import { helpPage } from "./helpPage.ts";

const apiRoute = new URLPattern();
const port = 8000;

const routes: Record<string, API> = (() => {
  const r: Record<string, API> = {};
  for (const key in api) {
    r[`/api/${key}`] = api[key];
  }
  return r;
})();

Deno.serve({ port }, (request) => {
  const apiMatch = apiRoute.exec(request.url);
  const url = apiMatch?.pathname.input ?? "";

  console.log("Request:", url);
  if (url == "/api" || url == "/api/") {
    return new Response(helpPage, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } else if (url.startsWith("/api/")) {
    const route = routes[url];
    if (!route) {
      return new Response("", {
        status: 404,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
        },
      });
    }

    // TODO: Parse input, if exists. Auto-validate that some fields exist based in the route.input block
    const input: unknown = undefined;
    return route.handler(input);
  }

  console.log(url);
  return new Response(
    "TODO: Try to resolve resources by name, otherwise return index.html",
  );
});

interface APIRequestUrl {
  section?: string;
  task?: string;
}

export interface API {
  description: string;
  headers?: Record<string, string>;
  body?: unknown;
  handler: (input: unknown) => Response;
}
