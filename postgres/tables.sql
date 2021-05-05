CREATE TABLE users (
  id          serial PRIMARY KEY,
  username    text NOT NULL,
  password    text NOT NULL,
  is_admin    boolean NOT NULL DEFAULT false,
  created_at  timestamp NOT NULL,
  updated_at  timestamp,
  deleted_at  timestamp
);

CREATE UNIQUE INDEX user_username_unique_idx ON users (username) WHERE deleted_at IS NULL;
