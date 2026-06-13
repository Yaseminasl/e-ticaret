import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";

const databasePath = join(process.cwd(), "data", "ecommerce.db");

export const db = new DatabaseSync(databasePath);

db.exec("PRAGMA foreign_keys = ON;");
