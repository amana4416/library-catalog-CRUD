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
app.delete('/books/:id', (req, res) =>{
  console.log(req.params);
  let idToDelete = req.params.id;
  let sqlQuery = `
    DELETE FROM "books"
      WHERE "id"=$1;
  `
  let sqlValues = [idToDelete];
  pool.query(sqlQuery, sqlValues)
  .then((dbRes) => {
      res.sendStatus(200);
  })
  .catch((dbErr) => {
      console.log('something broke in DELETE /books/:id', dbErr);
      res.sendStatus(500);
  })
})

// app.put()
app.put('/books/:id', (req, res) => {
  console.log('req.params:', req.params);
  console.log('req.body:', req.body);
  
  let idToUpdate = req.params.id;
  let newAvailability = req.body.availability;

  let sqlQuery = `
    UPDATE "books"
      SET "availability"=$1
        WHERE "id"=$2;
    `
  let sqlValues = [newAvailability, idToUpdate];
  pool.query(sqlQuery, sqlValues)
  .then( (dbRes) => {
    res.sendStatus(200);
  })
  .catch( (dbErr) => {
    console.log('something broke in PUT /books/:id', dbErr)
    res.sendStatus(500);
  })
})

app.listen(PORT, () => {
  console.log(`server is up and running at http://localhost:${PORT}`)
})
