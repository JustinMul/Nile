-- table used to store messages
DROP TABLE IF EXISTS messages_session CASCADE;

CREATE TABLE messages_session (
  id SERIAL PRIMARY KEY NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE
);


DROP TABLE IF EXISTS messages_log CASCADE;

CREATE TABLE messages_log (
  id SERIAL PRIMARY KEY NOT NULL,
  message VARCHAR(255) NOT NULL,
  messages_session_id INTEGER REFERENCES messages_session(id) ON DELETE CASCADE
);
