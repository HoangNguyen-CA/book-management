const Router = require('express-promise-router');
const db = require('../db/index');
const format = require('pg-format');

const router = new Router();

router.get('/', async (req, res) => {
  const doc = await db.query('SELECT * FROM books');

  res.send(doc.rows);
});

router.get('/:id', async (req, res) => {
  res.send('TODO');
});

router.post('/', async (req, res) => {
  const { bookName, authorIds } = req.body;

  if (bookName == undefined) throw new Error('book name not defined');
  if (authorIds == undefined) throw new Error('authorIds not defined');
  if (authorIds.constructor !== Array)
    throw new Error('authorIds must be an array');

  const authorDoc = await db.query(
    format('SELECT * FROM authors WHERE author_id IN %L', [authorIds])
  );

  if (authorDoc.rows.length !== authorIds.length)
    throw new Error('authorIds array not valid');

  if (authorDoc.rows.length === 0)
    throw new Error('author with given id not found');

  await db.query('BEGIN');

  const bookDoc = await db.query(
    'INSERT INTO books(book_name) VALUES($1) RETURNING *',
    [bookName]
  );
  const bookId = bookDoc.rows[0].book_id;
  const connectValues = authorIds.map((author_id) => [author_id, bookId]);

  const connectDoc = await db.query(
    format(
      'INSERT INTO authors_books(author_id, book_id) VALUES %L RETURNING *',
      connectValues
    )
  );

  await db.query('COMMIT');

  res.send(connectDoc.rows);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const doc = await db.query(
    'DELETE FROM books WHERE book_id = $1 RETURNING *',
    [id]
  );

  res.send(doc.rows);
});

module.exports = router;
