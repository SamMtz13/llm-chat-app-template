-- conversations, messages, tickets

CREATE TABLE IF NOT EXISTS conversations (
  id          TEXT PRIMARY KEY,
  metadata    TEXT NOT NULL DEFAULT '{}',
  created_at  TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON conversations (created_at);

CREATE TABLE IF NOT EXISTS messages (
  id               TEXT PRIMARY KEY,
  conversation_id  TEXT NOT NULL,
  role             TEXT NOT NULL,
  content          TEXT NOT NULL,
  detected_intent  TEXT,
  detected_emotion TEXT,
  priority         TEXT,
  ticket_created   INTEGER DEFAULT 0,  -- 0 = false, 1 = true en SQLite
  created_at       TEXT NOT NULL,
  FOREIGN KEY (conversation_id) REFERENCES conversations (id)
);

CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages (conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages (created_at);

CREATE TABLE IF NOT EXISTS tickets (
  id              TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL,
  intent          TEXT NOT NULL,
  emotion         TEXT NOT NULL,
  priority        TEXT NOT NULL,
  status          TEXT NOT NULL DEFAULT 'abierto',
  description     TEXT NOT NULL,
  created_at      TEXT NOT NULL,
  FOREIGN KEY (conversation_id) REFERENCES conversations (id)
);

CREATE INDEX IF NOT EXISTS idx_tickets_conversation_id ON tickets (conversation_id);
CREATE INDEX IF NOT EXISTS idx_tickets_created_at ON tickets (created_at);
