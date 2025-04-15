import { api } from "./api.ts";

export const helpPage = `<html>
  <head>
    <style>
      *{
        margin: 0;
        padding: 0;
        font-family: helvetica, arial;
        font-size: 14px;
      }
      body {
        padding: 1rem;
      }
      pre {
        padding: 1ch;
        border: 1px solid lightgray;
        border-radius: 0.5rem;
        font-family: monospace;
        width: fit-content;
      }
      table {
        border: 1px solid lightgray;
        border-radius: 0.5rem;
      }
      td, th {
        padding: 0.1rem 0.5rem;
        text-align: left;
      }
      h1 {
        font-size: 2rem;
      }
      h2 {
        font-size: 1.4rem;
        font-family: monospace;
      }
      h3 {
        font-size: 1rem;
        margin-top: 1em;
      }
      div {
        font-size: 1rem;
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid lightgray;
      }
    </style>
  </head>
  <body>
    <h1>API för poäng.se</h1>
    <p>Detta är den automatiskt genererade dokumentationen för poäng.se-APIet</p>
    ${
  Object.keys(api).map((x) => {
    const start = `<div>
      <h2>api/${x}</h2>
      <p>${api[x].description}</p>`;

    const headers = api[x].headers
      ? `
      <h3>HTTP-huvuden</h3>
      <table>
        <tr>
          <th>Rubrik</th>
          <th>Värde</th>
        </tr>
        ${
        Object.keys(api[x].headers).map((key) =>
          `<tr>
          <td>${key}</td>
          <td>${api[x].headers![key]}</td>
          </tr>`
        ).join("")
      }
      </table>`
      : "";

    const body = api[x].body
      ? `
      <h3>Kropp</h3>
      <pre>${JSON.stringify(api[x].body, undefined, "  ")}</pre>`
      : "";

    return start + headers + body + `
    </div>`;
  }).join("\n\n")
}
  </body>
</html>`;
