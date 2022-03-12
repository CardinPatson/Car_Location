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
  "id_car_brand" int NOT NULL,
  "name" varchar NOT NULL,
  "price" float,
  "color" varchar,
  "doors" int NOT NULL,
  "boot_size" int,
  "type" varchar,
  "energy" varchar NOT NULL,
  "is_automatic" boolean NOT NULL,
  "passengers" int NOT NULL,
  "air_conditioning" boolean NOT NULL,
  "description" varchar
);

CREATE TABLE "cars_brands" (
  "id" SERIAL PRIMARY KEY ON DELETE RESTRICT,
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

ALTER TABLE "orders" ADD FOREIGN KEY ("id_car") REFERENCES "cars" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("id_customer") REFERENCES "customers" ("id");

ALTER TABLE "images" ADD FOREIGN KEY ("id") REFERENCES "cars" ("id");

ALTER TABLE "admins" ADD FOREIGN KEY ("id_customer") REFERENCES "customers" ("id");

ALTER TABLE "cars_brands" ADD FOREIGN KEY ("id") REFERENCES "cars" ("id");

ALTER TABLE "cars_brands" ADD FOREIGN KEY ("id") REFERENCES "cars" ("id_car_brand");