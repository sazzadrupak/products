CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "categories" (
  "category_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "name" varchar(255) NOT NULL,
  PRIMARY KEY ("category_id")
);

CREATE TABLE "products" (
  "product_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "name" varchar(255) NOT NULL,
  "description" text NOT NULL,
  PRIMARY KEY ("product_id")
);

CREATE TABLE "product_categories" (
  "product_id" uuid NOT NULL,
  "category_id" uuid NOT NULL,
  PRIMARY KEY ("product_id", "category_id"),
  FOREIGN KEY ("product_id") REFERENCES "products" ("product_id"),
  FOREIGN KEY ("category_id") REFERENCES "categories" ("category_id")
);