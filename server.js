const express = require('express');
const pool = require('./db');
const { wrapAsync } = require('./utils');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log('Request', req.originalUrl);
  next();
});

app.post(
  '/books',
  wrapAsync(async (req, res) => {
    const { name } = req.body;

    const doc = await pool.query(
      'INSERT INTO books(book_name) VALUES($1) RETURNING *',
      [name]
    );
    res.send(doc.rows);
  })
);

app.get(
  '/books',
  wrapAsync(async (req, res) => {
    const doc = await pool.query('SELECT * FROM books');
    res.send(doc.rows);
  })
);

app.delete(
  '/books',
  wrapAsync(async (req, res) => {
    const { name } = req.body;

    const doc = await pool.query(
      'DELETE FROM books WHERE book_name = $1 RETURNING *',
      [name]
    );

    res.send(doc.rows);
  })
);

const PORT = 3000;

app.use((req, res, next, err) => {
  res.send('Error!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
