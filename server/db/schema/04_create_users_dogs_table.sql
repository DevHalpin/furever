DROP TABLE IF EXISTS users_dogs CASCADE;

CREATE TABLE users_dogs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  dog_id INTEGER REFERENCES dogs(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
