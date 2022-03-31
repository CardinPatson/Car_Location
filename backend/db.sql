CREATE TABLE "customers" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar NOT NULL,
  "last_name" varchar NOT NULL,
  "password" varchar NOT NULL,
  "is_active" boolean DEFAULT false,
  "created_at" timestamp DEFAULT 'now()',
  "birth_date" date,
  "birth_place" varchar,
  "birth_country" varchar,
  "address" varchar,
  "telephone" bigint,
  "mail" varchar NOT NULL,
  "driving_licence_path" varchar,
  "ide_card_path" varchar
);

CREATE TABLE "cars" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar NOT NULL,
  "price" float,
  "id_brand" int NOT NULL,
  "color" varchar,
  "doors" int NOT NULL,
  "boot_size" int,
  "type" varchar,
  "energy" varchar NOT NULL,
  "is_available" boolean, -- NOT NULL -> APRES quand l'agenda est fait !
  "is_automatic" boolean NOT NULL,
  "passengers" int NOT NULL,
  "air_conditioning" boolean NOT NULL,
  "description" Text
);

CREATE TABLE "images" (
  "id" int NOT NULL,
  "pic_name" varchar UNIQUE
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

CREATE TABLE "admins" (
  "id_customer" int UNIQUE
);

CREATE TABLE "cars_brands" (
  "id" SERIAL UNIQUE,
  "brand" varchar NOT NULL,
  "model" varchar NOT NULL
);

ALTER TABLE "admins" ADD FOREIGN KEY ("id_customer") REFERENCES "customers" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "orders" ADD FOREIGN KEY ("id_car") REFERENCES "cars" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "orders" ADD FOREIGN KEY ("id_customer") REFERENCES "customers" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "cars" ADD FOREIGN KEY ("id_brand") REFERENCES "cars_brands" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "images" ADD FOREIGN KEY ("id") REFERENCES "cars" ("id") ON DELETE CASCADE ON UPDATE CASCADE;