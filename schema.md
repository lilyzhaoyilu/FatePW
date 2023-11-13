CREATE TABLE peiwan (
    kook_id INTEGER PRIMARY KEY NOT NULL,
    display_id INTEGER UNIQUE NOT NULL,
    name TEXT NOT NULL,
    label TEXT NOT NULL,
    introduction TEXT,
    location TEXT,
    contact_info TEXT,
    timbre TEXT,
    picture_url TEXT,
    FOREIGN KEY (label) REFERENCES labels (label)
);

CREATE TABLE labels (
  label TEXT NOT NULL,
  kook_role_id INTEGER UNIQUE NOT NULL,
  PRIMARY KEY (label, kook_role_id)
);

CREATE TABLE games_and_price (
  game TEXT NOT NULL,
  price INTEGER NOT NULL,
  main_game BOOLEAN DEFAULT FALSE,
  kook_id INTEGER NOT NULL,
  FOREIGN KEY (kook_id) REFERENCES peiwan (kook_id),
  PRIMARY KEY (kook_id, game)
);