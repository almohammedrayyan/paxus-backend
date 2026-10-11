import fs from "node:fs";
import path from "node:path";

function loadEnvironmentFile(): void {
  const environmentFile = path.resolve(process.cwd(), ".env.dev");

  if (!fs.existsSync(environmentFile)) return;

  for (const line of fs.readFileSync(environmentFile, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    const key = match?.[1];
    const rawValue = match?.[2];
    if (!key || rawValue === undefined || process.env[key] !== undefined) continue;

    process.env[key] = rawValue.replace(/^(["'])(.*)\1$/, "$2");
  }
}

function requiredUrl(name: string, fallback: string): URL {
  try {
    return new URL(process.env[name] ?? fallback);
  } catch {
    throw new Error(`${name} must be a valid absolute URL`);
  }
}

loadEnvironmentFile();

export const config = {
  port: Number(process.env.PORT ?? 4080),
  requestTimeoutMs: Number(process.env.REQUEST_TIMEOUT_MS ?? 30_000),
  services: {
    auth: requiredUrl("AUTH_SERVICE_URL", "http://localhost:4082"),
    users: requiredUrl("USER_SERVICE_URL", "http://localhost:4081"),
    courses: requiredUrl("COURSE_SERVICE_URL", "http://localhost:4083"),
  },
};

if (!Number.isInteger(config.port) || config.port < 1 || config.port > 65_535) {
  throw new Error("PORT must be an integer between 1 and 65535");
}

if (!Number.isFinite(config.requestTimeoutMs) || config.requestTimeoutMs <= 0) {
  throw new Error("REQUEST_TIMEOUT_MS must be a positive number");
}
