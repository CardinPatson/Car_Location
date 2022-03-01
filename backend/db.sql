CREATE TABLE "Client" (
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
  "mail" varchar NOT NULL
);

CREATE TABLE "Voiture" (
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

CREATE TABLE "Images" (
  "id" int NOT NULL,
  "pic_name" varchar UNIQUE
);

CREATE TABLE "Commands" (
  "id" SERIAL PRIMARY KEY,
  "id_car" int DEFAULT -1,
  "id_cl" int DEFAULT NULL,
  "com_date" varchar,
  "com_start_date" timestamp ,
  "com_end_date" timestamp ,
  "price" float
);

ALTER TABLE "Voiture" ADD FOREIGN KEY ("id") REFERENCES "Commands" ("id_car");

ALTER TABLE "Client" ADD FOREIGN KEY ("id") REFERENCES "Commands" ("id_cl");

ALTER TABLE "Voiture" ADD FOREIGN KEY ("id") REFERENCES "Images" ("id");

COMMENT ON TABLE "Client" IS 'table 'Client' contains client information';
