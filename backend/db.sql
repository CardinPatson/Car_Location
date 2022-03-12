CREATE TABLE "customers" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar NOT NULL,
  "last_name" varchar NOT NULL,
  "password" varchar NOT NULL,
  "created_at" datetime DEFAULT 'now()',
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
  "id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "price" float,
  "id_brand" int NOT NULL,
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

CREATE TABLE "images" (
  "id" int NOT NULL,
  "pic_name" varchar UNIQUE
);

CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "id_car" int,
  "id_customer" int,
  "date_order" varchar,
  "date_departure" datetime,
  "return_date" datetime,
  "total_price" float
);

CREATE TABLE "admins" (
  "id_customer" int UNIQUE
);

CREATE TABLE "cars_brands" (
  "id_brand" SERIAL PRIMARY KEY,
  "brand" varchar NOT NULL,
  "model" varchar NOT NULL
);

ALTER TABLE "customers" ADD FOREIGN KEY ("id") REFERENCES "admins" ("id_customer");

ALTER TABLE "cars" ADD FOREIGN KEY ("id") REFERENCES "orders" ("id_car");

ALTER TABLE "customers" ADD FOREIGN KEY ("id") REFERENCES "orders" ("id_customer");

ALTER TABLE "cars" ADD FOREIGN KEY ("id") REFERENCES "images" ("id");

ALTER TABLE "cars" ADD FOREIGN KEY ("id_brand") REFERENCES "cars_brands" ("id_brand");