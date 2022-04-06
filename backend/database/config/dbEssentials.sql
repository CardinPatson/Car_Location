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
  "air_conditioning" boolean NOT NULL,
  "is_available" boolean NOT NULL,
  "is_automatic" boolean NOT NULL,
  "passengers" int NOT NULL,
  "description" Text
);

CREATE TABLE "images" (
  "id_car" int NOT NULL,
  "file_names" text[]
);

CREATE TABLE "cars_brands" (
  "id" SERIAL UNIQUE,
  "brand" varchar NOT NULL,
  "model" varchar NOT NULL
);

ALTER TABLE "cars" ADD FOREIGN KEY ("id_brand") REFERENCES "cars_brands" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "images" ADD FOREIGN KEY ("id_car") REFERENCES "cars" ("id") ON DELETE CASCADE ON UPDATE CASCADE;