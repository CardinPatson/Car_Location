CREATE TABLE "customers" (
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
  "mail" varchar NOT NULL UNIQUE,
  "driving_licence_path" varchar,
  "id_card_path" varchar
);

CREATE TABLE "admins" (
  "id_customer" int NOT NULL
);

CREATE TABLE "cars" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
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
  "air_conditioning" boolean NOT NULL
);

CREATE TABLE "cars_brands" (
  "id" SERIAL PRIMARY KEY,
  "brand" varchar NOT NULL,
  "model" varchar NOT NULL
);

CREATE TABLE "images" (
  "id" int NOT NULL,
  "names" TEXT [] UNIQUE
);

CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "id_car" int DEFAULT -1,
  "id_customer" int DEFAULT NULL,
  "date_order" varchar,
  "date_departure" timestamp,
  "return_date" timestamp,
  "total_price" float
);

ALTER TABLE "cars" ADD FOREIGN KEY ("id") REFERENCES "orders" ("id_car");

ALTER TABLE "customers" ADD FOREIGN KEY ("id") REFERENCES "orders" ("id_customer");

ALTER TABLE "cars" ADD FOREIGN KEY ("id") REFERENCES "images" ("id");

ALTER TABLE "admins" ADD FOREIGN KEY ("id_customer") REFERENCES "customers" ("id");

ALTER TABLE "cars_brands" ADD FOREIGN KEY ("id") REFERENCES "Voiture" ("id");