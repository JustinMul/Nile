-- Table outlining the various items and their characteristics
DROP TABLE IF EXISTS items CASCADE;


CREATE TABLE items (
  id SERIAL PRIMARY KEY NOT NULL,
  admin_id INTEGER REFERENCES admins(id) ON DELETE CASCADE,

  title VARCHAR(255) NOT NULL,
  description TEXT,
  thumbnail_photo_url VARCHAR(255) NOT NULL,
  cover_photo_url VARCHAR(255) NOT NULL,
  cost INTEGER  NOT NULL DEFAULT 0,
  date DATE,
  sold BOOLEAN NOT NULL DEFAULT FALSE,
  country VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  province VARCHAR(255) NOT NULL
);
