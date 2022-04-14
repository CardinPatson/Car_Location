CREATE TABLE "cars" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar NOT NULL,
  "price" real,
  "brand_id" int NOT NULL,
  "color" varchar,
  "doors" int NOT NULL,
  "boot_size" int,
  "type" varchar,
  "energy" varchar NOT NULL,
  "fuel" varchar NOT NULL,
  "passengers" int NOT NULL,
  "air_conditioning" boolean NOT NULL,
  "is_available" boolean NOT NULL,
  "is_automatic" boolean NOT NULL,
  "description" text,
  "number_plate" varchar,
  "mileage" int,
  "year" int
);

CREATE TABLE "images" (
  "id" SERIAL PRIMARY KEY NOT NULL,
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
  "token" varchar
);

CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "car_id" int NOT NULL,
  "user_id" int DEFAULT NULL,
  "date_order" varchar NOT NULL,
  "deparature_date" timestamp NOT NULL,
  "return_date" timestamp NOT NULL,
  "total_price" real NOT NULL
);

CREATE TABLE "admins" (
  "customer_id" int UNIQUE
);

ALTER TABLE "cars" ADD FOREIGN KEY ("brand_id") REFERENCES "cars_brands" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "images" ADD FOREIGN KEY ("car_id") REFERENCES "cars" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "admins" ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "orders" ADD FOREIGN KEY ("car_id") REFERENCES "cars" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "orders" ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("id") ON DELETE CASCADE ON UPDATE CASCADE;




SELECT A.au_lname, A.au_fname, A.au_city

FROM dba.Authors AS A

JOIN dba.BookAuthor AS BA ON A.au_id = BA.au_id

JOIN dba.Books AS B ON BA.ba_id = B.ba_id

WHERE A.au_city = 'califoria' and B.type = 'travel'
ORDER BY A.au_city, A.au_lname, A.au_fname;