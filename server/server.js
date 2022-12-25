const express = require('express');
const bodyParser = require('body-parser');

const pool = require('./modules/pool.js');

const app = express();

const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static('server/public'));

// app.get()
app.get('/books', (req, res) => {
  console.log('sending books to client');
  let sqlQuery = `
    SELECT * FROM "books"
      ORDER BY "id";
  `;
  pool.query(sqlQuery)
  .then ((dbRes) => {
    res.send(dbRes.rows)
  }).catch((dbErr) => {
    console.log('something broke in GET /books', dbErr)
    res.sendStatus(500);
  })
})

// app.post()
app.post('/books', (req, res) => {
  let newBook = req.body
  console.log('adding a book to the database', newBook);
  let sqlQuery = `
  INSERT INTO "books" ("book", "author", "availability")
    VALUES ($1, $2, $3);
  `
  let sqlValues = [newBook.book, newBook.author, newBook.availability];
  pool.query(sqlQuery, sqlValues)
  .then((dbRes) => {
    res.sendStatus(200);
  }).catch((dbErr) => {
    console.log('something broke in POST /books', dbErr);
    res.sendStatus(500);
  })
})

// app.delete()

// app.put()

app.listen(PORT, () => {
  console.log(`server is up and running at http://localhost:${PORT}`)
})
