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

CREATE UNIQUE INDEX restaurant_name_unique_idx ON restaurants (name) WHERE deleted_at IS NULL;

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
