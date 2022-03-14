-- data table for features linked to used and item ID
DROP TABLE IF EXISTS features CASCADE;

CREATE TABLE features (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE
);
