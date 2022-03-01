CREATE TABLE "client" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar NOT NULL,
  "last_name" varchar NOT NULL,
  "password" varchar NOT NULL,
  "created_at" timestamp DEFAULT 'now()',
  "birth_date" date,
  "birth_place" varchar,
  "birth_country" varchar,
  "address" varchar,
  "telephone" bigint,
  "mail" varchar NOT NULL UNIQUE
);

CREATE TABLE "voiture" (
  "id" SERIAL PRIMARY KEY,
  "price" float,
  "brand" varchar NOT NULL,
  "model" varchar NOT NULL,
  "color" varchar,
  "doors" int NOT NULL,
  "boot_size" int,
  "type" varchar,
  "energy" varchar NOT NULL,
  "is_automatic" boolean NOT NULL,
  "passengers" int NOT NULL,
  "air_cond" boolean NOT NULL
);

CREATE TABLE "images" (
  "id" int NOT NULL,
  "pic_name" varchar UNIQUE
);

CREATE TABLE "commands" (
  "id" SERIAL PRIMARY KEY,
  "id_car" int DEFAULT -1,
  "id_cl" int DEFAULT NULL,
  "com_date" varchar,
  "com_start_date" timestamp ,
  "com_end_date" timestamp ,
  "price" float
);

ALTER TABLE "voiture" ADD FOREIGN KEY ("id") REFERENCES "commands" ("id_car");

ALTER TABLE "client" ADD FOREIGN KEY ("id") REFERENCES "commands" ("id_cl");

ALTER TABLE "voiture" ADD FOREIGN KEY ("id") REFERENCES "images" ("id");

COMMENT ON TABLE "Client" IS 'table 'Client' contains client information';
