#!/usr/bin/env node
/**
 * Crea el proyecto de Sanity, el dataset, CORS para el Studio embebido y
 * escribe NEXT_PUBLIC_SANITY_PROJECT_ID en .env.local.
 *
 * Requiere: `sanity login` (Node 22) y una cuenta en sanity.io.
 */
import { execFileSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(new URL(".", import.meta.url)));
const sanityBin = join(root, "node_modules", ".bin", "sanity");
const envPath = join(root, ".env.local");

function run(args) {
  return execFileSync(sanityBin, args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function upsertEnv(key, value) {
  const current = existsSync(envPath) ? readFileSync(envPath, "utf8") : "";
  const line = `${key}=${value}`;
  const next = current.includes(`${key}=`)
    ? current.replace(new RegExp(`^${key}=.*$`, "m"), line)
    : `${current}${current && !current.endsWith("\n") ? "\n" : ""}${line}\n`;
  writeFileSync(envPath, next);
}

const created = JSON.parse(
  run([
    "projects",
    "create",
    "ACF Antequera",
    "--dataset",
    "production",
    "--dataset-visibility",
    "public",
    "--yes",
    "--json",
  ]),
);

const projectId = created.projectId ?? created.id;
if (!projectId) {
  console.error("Sanity no devolvió un project ID:", created);
  process.exit(1);
}

const origins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:4321",
];
for (const origin of origins) {
  try {
    run(["cors", "add", origin, "--credentials", "--yes", "--project-id", projectId]);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!/already exists/i.test(message)) {
      console.warn(`CORS ${origin}:`, message);
    }
  }
}

upsertEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", projectId);
upsertEnv("NEXT_PUBLIC_SANITY_DATASET", "production");
upsertEnv("NEXT_PUBLIC_SANITY_API_VERSION", "2026-01-01");
if (!existsSync(envPath) || !readFileSync(envPath, "utf8").includes("SANITY_REVALIDATE_SECRET=")) {
  upsertEnv("SANITY_REVALIDATE_SECRET", randomBytes(24).toString("hex"));
}

console.log(`Proyecto listo: ${projectId}`);
console.log("Reinicia yarn dev y abre http://localhost:3000/studio");
