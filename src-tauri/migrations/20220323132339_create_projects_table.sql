-- Add migration script here
CREATE TABLE IF NOT EXISTS contexts (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  filename TEXT,
  fileblob BLOB,
  deleted INTEGET NOT NULL,
  created_timestamp INTEGER NOT NULL,
  updated_timestamp INTEGER
)