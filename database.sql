-- Table Schema Template:
CREATE TABLE "books" (
  "id" SERIAL PRIMARY KEY,
  "book" VARCHAR(500) NOT NULL,
  "author" VARCHAR(500) NOT NULL,
  "availability" VARCHAR(5) NOT NULL
);

-- Seed Data Template:
INSERT INTO "books"
  ("book", "author", "availability")
  VALUES
  ('You Truly Assumed', 'Laila Sabreen', 'Yes'),
  ('The Seven Husbands of Evelyn Hugo', 'Taylor Jenkins Reid', 'Yes'),
  ('In Five Years', 'Rebecca Serle', 'Yes'),
  ('Normal People', 'Sally Rooney', 'No');
