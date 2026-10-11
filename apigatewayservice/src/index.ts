import http, { IncomingMessage, ServerResponse } from "node:http";
import https from "node:https";
import { config } from "./config.js";

type ServiceName = keyof typeof config.services;

const routes: ReadonlyArray<{ prefix: string; service: ServiceName }> = [
  { prefix: "/api/auth", service: "auth" },
  { prefix: "/api/users", service: "users" },
  { prefix: "/api/educator", service: "users" },
  { prefix: "/api/student", service: "users" },
  { prefix: "/api/institute", service: "users" },
  { prefix: "/api/publish", service: "users" },
  { prefix: "/api/course", service: "courses" },
];

function findRoute(pathname: string) {
  return routes.find(({ prefix }) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

function sendJson(response: ServerResponse, statusCode: number, body: object): void {
  response.writeHead(statusCode, { "content-type": "application/json" });
  response.end(JSON.stringify(body));
}

function proxy(request: IncomingMessage, response: ServerResponse, target: URL): void {
  const transport = target.protocol === "https:" ? https : http;
  const upstreamRequest = transport.request({
    protocol: target.protocol,
    hostname: target.hostname,
    port: target.port || undefined,
    method: request.method,
    path: request.url,
    headers: {
      ...request.headers,
      host: target.host,
      "x-forwarded-host": request.headers.host ?? "",
      "x-forwarded-proto": "http",
    },
    timeout: config.requestTimeoutMs,
  }, (upstreamResponse) => {
    response.writeHead(upstreamResponse.statusCode ?? 502, upstreamResponse.headers);
    upstreamResponse.pipe(response);
  });

  upstreamRequest.on("timeout", () => {
    upstreamRequest.destroy(new Error("Upstream request timed out"));
  });

  upstreamRequest.on("error", (error: NodeJS.ErrnoException) => {
    if (!response.headersSent) {
      sendJson(response, 502, {
        message: "Unable to reach the requested service",
        code: error.code ?? "UPSTREAM_ERROR",
      });
    } else {
      response.destroy(error);
    }
  });

  request.pipe(upstreamRequest);
}

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url ?? "/", "http://gateway.local");

  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "access-control-allow-headers": "Content-Type, Authorization",
    });
    response.end();
    return;
  }

  if (requestUrl.pathname === "/health") {
    sendJson(response, 200, { status: "ok", service: "paxus-api-gateway" });
    return;
  }

  const route = findRoute(requestUrl.pathname);
  if (!route) {
    sendJson(response, 404, { message: "Gateway route not found" });
    return;
  }

  response.setHeader("access-control-allow-origin", "*");
  proxy(request, response, config.services[route.service]);
});

server.listen(config.port, () => {
  console.log(`Paxus API gateway listening on port ${config.port}`);
});

function shutdown(signal: string): void {
  console.log(`${signal} received; closing API gateway`);
  server.close(() => process.exit(0));
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
