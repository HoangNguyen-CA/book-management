const Router = require('express-promise-router');
const db = require('../db/index');

const router = new Router();

router.get('/', async (req, res) => {
  const doc = await db.query('SELECT * FROM books');

  res.send(doc.rows);
});

router.get('/:id', async (req, res) => {
  res.send('TODO');
});

router.post('/', async (req, res) => {
  const { bookName, authorId } = req.body;

  if (bookName == undefined) throw new Error('book name not defined');
  if (authorId == undefined) throw new Error('author id not defined');

  const authorDoc = await db.query(
    'SELECT * FROM authors WHERE author_id = $1',
    [authorId]
  );

  if (authorDoc.rows.length === 0)
    throw new Error('author with given id not found');

  await db.query('BEGIN');

  const bookDoc = await db.query(
    'INSERT INTO books(book_name) VALUES($1) RETURNING *',
    [bookName]
  );

  const connectDoc = await db.query(
    'INSERT INTO authors_books(author_id, book_id) VALUES($1, $2)',
    [authorId, bookDoc.rows[0].book_id]
  );

  await db.query('COMMIT');

  res.send(bookDoc.rows);
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
