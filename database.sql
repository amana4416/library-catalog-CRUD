-- Table Schema Template:
CREATE TABLE "books" (
  "id" SERIAL PRIMARY KEY,
  "book" VARCHAR(500) NOT NULL,
  "availability" BOOLEAN
);

-- Seed Data Template:
INSERT INTO "books"
  ("book", "author", "availability")
  VALUES
  ('You Truly Assumed', 'Laila Sabreen', true),
  ('The Seven Husbands of Evelyn Hugo', 'Taylor Jenkins Reid', true),
  ('In Five Years', 'Rebecca Serle', true),
  ('Normal People', 'Sally Rooney', false);
