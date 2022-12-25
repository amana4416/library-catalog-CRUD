-- Table Schema Template:
CREATE TABLE "books" (
  "id" SERIAL PRIMARY KEY,
  "book" VARCHAR(500) NOT NULL,
  "author" VARCHAR(500) NOT NULL,
  "availability" VARCHAR(500) NOT NULL
);

-- Seed Data Template:
INSERT INTO "books"
  ("book", "author", "availability")
  VALUES
  ('You Truly Assumed', 'Laila Sabreen', 'Yes'),
  ('The Seven Husbands of Evelyn Hugo', 'Taylor Jenkins Reid', 'Yes'),
  ('In Five Years', 'Rebecca Serle', 'Yes'),
  ('Normal People', 'Sally Rooney', 'No');

-- to display books
SELECT * FROM "books"
	ORDER BY "id";

-- to add a new book to the database
INSERT INTO "tasks" ("book", "author", "availability")
  VALUES ($1, $2, $3);

-- delete a book from the database
DELETE FROM "books"
  WHERE "id"=$1;

-- update availablity in database
UPDATE "books"
  SET "availability"=$1
  WHERE "id"=$2;