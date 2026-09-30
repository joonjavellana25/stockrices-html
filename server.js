const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 8000;

function loadDotEnv(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const env = {};
  for (const rawLine of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const separator = line.indexOf("=");
    if (separator === -1) {
      continue;
    }

    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    const quoted =
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"));
    if (quoted) {
      value = value.slice(1, -1);
    }

    env[key] = value;
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }

  return env;
}

const fileEnv = loadDotEnv(path.join(ROOT, ".env"));
const apiKey = process.env.TWELVE_DATA_API_KEY || fileEnv.TWELVE_DATA_API_KEY || ""; // API key from your .env

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".svg": "image/svg+xml",
};

function isBlocked(urlPath) {
  const normalized = urlPath.replace(/\\/g, "/").toLowerCase();
  return (
    normalized === "/.env" ||
    normalized.startsWith("/.env.") ||
    normalized === "/.gitignore" ||
    normalized.includes("/.git/")
  );
}

function send(res, status, body, headers) {
  res.writeHead(status, headers);
  res.end(body);
}

http
  .createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);

    if (urlPath === "/js/env.js") {
      send(
        res,
        200,
        `window.STOCK_ENV = ${JSON.stringify({ apiKey })};\n`,
        {
          "Cache-Control": "no-store",
          "Content-Type": "application/javascript; charset=utf-8",
        }
      );
      return;
    }

    const relativePath = urlPath === "/" ? "/index.html" : urlPath;
    if (isBlocked(relativePath)) {
      send(res, 404, "Not found");
      return;
    }

    const filePath = path.normalize(path.join(ROOT, relativePath));
    if (!filePath.startsWith(ROOT)) {
      send(res, 403, "Forbidden");
      return;
    }

    fs.readFile(filePath, (err, content) => {
      if (err) {
        send(res, 404, "Not found");
        return;
      }

      const ext = path.extname(filePath);
      send(res, 200, content, {
        "Content-Type": MIME_TYPES[ext] || "application/octet-stream",
      });
    });
  })
  .listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
