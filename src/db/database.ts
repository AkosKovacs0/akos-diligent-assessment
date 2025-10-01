import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { mkdirSync, existsSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Use different databases for test and development
const dbPath =
  process.env.NODE_ENV === "test"
    ? ":memory:"
    : path.join(__dirname, "../../data/tickets.db");

// Ensure data directory exists (only for non-test environments)
if (process.env.NODE_ENV !== "test") {
  const dataDir = path.dirname(dbPath);
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }
}

const database = new Database(dbPath);

// Enable foreign keys
database.pragma("foreign_keys = ON");

// Export database instance
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const db: any = database;

// Create tables
export function initializeDatabase() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS tickets (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('open', 'in-progress', 'closed')),
      priority TEXT NOT NULL CHECK(priority IN ('low', 'medium', 'high', 'urgent')),
      assignee TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    )

    -- How to make this faster?
  `;

  db.exec(createTableSQL);

  console.log("✅ Database initialized");
}

// Reset database (useful for testing)
export function resetDatabase() {
  db.exec("DROP TABLE IF EXISTS tickets");
  initializeDatabase();
}

// Close database connection
export function closeDatabase() {
  db.close();
}
