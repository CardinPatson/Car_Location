CREATE TABLE "cars" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar NOT NULL,
  "price" real,
  "brand_id" int NOT NULL,
  "color" varchar,
  "doors" int NOT NULL,
  "boot_size" int,
  "type" varchar,
<<<<<<< HEAD
  "energy" varchar NOT NULL,
=======
  "fuel" varchar NOT NULL,
>>>>>>> master
  "passengers" int NOT NULL,
  "air_conditioning" boolean NOT NULL,
  "is_available" boolean NOT NULL,
  "is_automatic" boolean NOT NULL,
  "description" text,
  "number_plate" varchar,
<<<<<<< HEAD
);

CREATE TABLE "images" (
=======
  "mileage" int,
  "year" int
);

CREATE TABLE "images" (
  "id" SERIAL PRIMARY KEY NOT NULL,
>>>>>>> master
  "car_id" int NOT NULL,
  "file_names" text[]
);

CREATE TABLE "cars_brands" (
  "id" SERIAL UNIQUE,
  "brand" varchar NOT NULL,
  "model" varchar NOT NULL
);

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "civility" varchar,
  "first_name" varchar NOT NULL,
  "last_name" varchar NOT NULL,
  "password" text NOT NULL,
  "mail" varchar NOT NULL,
  "telephone" bigint,
  "birth_date" date,
  "address" text,
  "driving_licence_path" varchar,
  "id_card_path" varchar,
  "created_at" timestamp DEFAULT 'now()',
  "is_active" boolean DEFAULT false,
<<<<<<< HEAD
=======
  "token" varchar
>>>>>>> master
);

CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "car_id" int NOT NULL,
<<<<<<< HEAD
  "customer_id" int DEFAULT NULL,
  "date_order" varchar NOT NULL,
  "date_departure" timestamp NOT NULL,
=======
  "user_id" int DEFAULT NULL,
  "date_order" varchar NOT NULL,
  "deparature_date" timestamp NOT NULL,
>>>>>>> master
  "return_date" timestamp NOT NULL,
  "total_price" real NOT NULL
);

CREATE TABLE "admins" (
<<<<<<< HEAD
  "customer_id" int UNIQUE
=======
  "user_id" int UNIQUE
>>>>>>> master
);

ALTER TABLE "cars" ADD FOREIGN KEY ("brand_id") REFERENCES "cars_brands" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "images" ADD FOREIGN KEY ("car_id") REFERENCES "cars" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

<<<<<<< HEAD
ALTER TABLE "admins" ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "orders" ADD FOREIGN KEY ("car_id") REFERENCES "cars" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "orders" ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
=======
ALTER TABLE "admins" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "orders" ADD FOREIGN KEY ("car_id") REFERENCES "cars" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "orders" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
>>>>>>> master
