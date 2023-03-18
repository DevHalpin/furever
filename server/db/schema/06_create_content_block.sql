DROP TABLE IF EXISTS content_block CASCADE;

CREATE TABLE content_block (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  dog_id INTEGER REFERENCES dogs(id) ON DELETE CASCADE,
  like_id INTEGER REFERENCES likes(id) ON DELETE CASCADE,
  media_id INTEGER REFERENCES dog_media(id) ON DELETE CASCADE,
  comments TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);