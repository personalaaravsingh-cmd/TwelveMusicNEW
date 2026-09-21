import { existsSync } from "node:fs";
import { execFileSync } from "node:child_process";

const entry = new URL("./dist/index.js", import.meta.url);

if (!existsSync(entry)) {
  console.log("[Twelve Music] dist/index.js not found. Building TypeScript...");
  execFileSync(process.platform === "win32" ? "npx.cmd" : "npx", ["tsc"], {
    stdio: "inherit",
  });
}

if (!existsSync(entry)) {
  throw new Error("[Twelve Music] TypeScript build completed but dist/index.js was not generated.");
}

await import(entry.href);
