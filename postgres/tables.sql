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

DROP TABLE IF EXISTS restaurant_feature;
DROP TABLE IF EXISTS features;
DROP TABLE IF EXISTS restaurants;

CREATE TABLE restaurants (
  id          serial PRIMARY KEY,
  name        TEXT NOT NULL,
  description TEXT,
  rights      TEXT,
  latitude    DOUBLE PRECISION,
  longitude   DOUBLE PRECISION,
  created_at  timestamp NOT NULL,
  updated_at  timestamp,
  deleted_at  timestamp,
  CHECK       (rights IN ('A', 'B', 'C'))
);

INSERT INTO restaurants (name, description, rights, latitude, longitude, created_at, updated_at)
VALUES ('Oljenkorsi', 'Hyvä kaljapaikka', 'A', 60.207326, 24.968693, now(), now());
INSERT INTO restaurants (name, description, rights, latitude, longitude, created_at, updated_at)
VALUES ('Old Sophie', 'Ihan ookoo paikka jos tykkää esim. karaokesta tai keskenkertaisesta pizzasta', 'A', 60.209001, 24.948093, now(), now());
INSERT INTO restaurants (name, description, rights, latitude, longitude, created_at, updated_at)
VALUES ('Käpygrilli', 'Ammattilaisille suunnattu kuppila', 'A', 60.210621, 24.950203, now(), now());
INSERT INTO restaurants (name, description, rights, latitude, longitude, created_at, updated_at)
VALUES ('Pub Päätön Kana', 'Hyvä paikka vaikkakin vähän kaukana', 'A', 60.213986, 24.943971, now(), now());
INSERT INTO restaurants (name, description, rights, latitude, longitude, created_at, updated_at)
VALUES ('Ravintola Park Hotel Käpylä', 'Huonon hotellin mahdollisesti vielä huonompi aulabaari', 'A', 60.216655, 24.953099, now(), now());
INSERT INTO restaurants (name, description, rights, latitude, longitude, created_at, updated_at)
VALUES ('Ravintola Olotila', 'Ihan kiva paikka varsinkin jos tykkää', 'A', 60.207406, 24.979429, now(), now());
INSERT INTO restaurants (name, description, rights, latitude, longitude, created_at, updated_at)
VALUES ('Herkku-Haarukka', 'Ammattilaisten suosiossa. Kiva tunnelmallinen terassi kuitenkin ja jos tulee nälkä niin sisältä saa nepskua tai intialaista tai jotain.', 'A', 60.210345, 24.976384, now(), now());
INSERT INTO restaurants (name, description, rights, latitude, longitude, created_at, updated_at)
VALUES ('Gurula', 'Ei varsinaisesti kaljapaikka, mutta hyvä paikka kuitenkin!', NULL, 60.204228, 24.961442, now(), now());

CREATE UNIQUE INDEX restaurant_name_unique_idx ON restaurants (name) WHERE deleted_at IS NULL;

CREATE TABLE reviews (
  id              serial PRIMARY KEY,
  restaurant_id   integer NOT NULL REFERENCES restaurants ON DELETE CASCADE,
  user_id         integer NOT NULL REFERENCES users ON DELETE CASCADE,
  comment         text NOT NULL,
  rating          integer NOT NULL,
  created_at      timestamp NOT NULL,
  updated_at      timestamp,
  deleted_at      timestamp,
  CHECK           (rating IN (1, 2, 3, 4, 5))
);

CREATE INDEX review_restaurant_id_idx ON review (restaurant_id);
CREATE INDEX review_user_id_idx ON review (user_id);

CREATE TABLE features (
  id          serial PRIMARY KEY,
  name        TEXT NOT NULL
);

INSERT INTO features (name) VALUES ('terassi');
INSERT INTO features (name) VALUES ('karaoke');
INSERT INTO features (name) VALUES ('ammattilaisille');
INSERT INTO features (name) VALUES ('keittiö');
INSERT INTO features (name) VALUES ('biljardi');

CREATE UNIQUE INDEX feature_name_unique_idx ON features (name);

CREATE TABLE restaurant_feature (
  restaurant_id   integer NOT NULL REFERENCES restaurants ON DELETE CASCADE,
  feature_id      integer NOT NULL REFERENCES features ON DELETE CASCADE
);

CREATE UNIQUE INDEX restaurant_feature_unique_idx ON restaurant_feature (restaurant_id, feature_id);
