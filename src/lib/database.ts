import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { DatabaseSync } from "node:sqlite";

const sourceDatabasePath = join(process.cwd(), "data", "ecommerce.db");

function getDatabasePath() {
  if (process.env.VERCEL !== "1") {
    return sourceDatabasePath;
  }

  const runtimeDatabasePath = join(tmpdir(), "yasomanya-ecommerce.db");

  if (!existsSync(runtimeDatabasePath)) {
    mkdirSync(dirname(runtimeDatabasePath), { recursive: true });
    copyFileSync(sourceDatabasePath, runtimeDatabasePath);
  }

  return runtimeDatabasePath;
}

export const db = new DatabaseSync(getDatabasePath());

db.exec("PRAGMA foreign_keys = ON;");
