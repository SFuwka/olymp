import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

// Single file on disk. On a VPS this is the whole "database" -- no server
// process, no RAM overhead beyond your Node process's own memory.
// IMPORTANT: point DB_PATH somewhere persistent (NOT /tmp) so the file
// survives reboots and deploys. Default here is ./data/app.db.
const DB_PATH = process.env.DB_PATH || path.join(process.cwd(), 'data', 'app.db')

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true })

// eslint-disable-next-line no-var
declare global {
    // eslint-disable-next-line no-var
    var _sqliteDb: Database.Database | undefined
}

const db = global._sqliteDb ?? new Database(DB_PATH)
global._sqliteDb = db

// WAL mode: much better for a web app doing concurrent reads/writes than
// the default rollback journal, still very light on resources.
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

db.exec(`
  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    question TEXT,
    clicked_on TEXT,
    handled INTEGER NOT NULL DEFAULT 0,
    handled_at TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at DESC);

  CREATE TABLE IF NOT EXISTS application_views (
    application_id INTEGER NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    session_id TEXT NOT NULL,
    viewed_at TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (application_id, session_id)
  );

  CREATE TABLE IF NOT EXISTS login_attempts (
    ip TEXT PRIMARY KEY,
    fail_count INTEGER NOT NULL DEFAULT 0,
    locked_until TEXT
  );

  CREATE TABLE IF NOT EXISTS push_subscriptions (
    endpoint TEXT PRIMARY KEY,
    session_id TEXT NOT NULL,
    p256dh TEXT NOT NULL,
    auth TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`)

export default db
