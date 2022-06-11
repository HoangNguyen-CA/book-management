const Router = require('express-promise-router');
const db = require('../db/index');
const format = require('pg-format');

const router = new Router();

router.get('/', async (req, res) => {
  const doc = await db.query(
    'SELECT books.book_id, book_name, authors.author_id, author_name FROM books LEFT JOIN authors_books ON books.book_id = authors_books.book_id LEFT JOIN authors ON authors_books.author_id = authors.author_id'
  );

  const booksMap = new Map();

  doc.rows.forEach((element) => {
    let bookInfo = booksMap.get(element.book_id);
    if (!bookInfo) {
      let authorsArray = [];
      if (element.author_id && element.author_name)
        authorsArray.push({
          author_id: element.author_id,
          author_name: element.author_name,
        });
      booksMap.set(element.book_id, {
        book_name: element.book_name,
        book_id: element.book_id,
        authors: authorsArray,
      });
    } else {
      bookInfo.authors.push({
        author_id: element.author_id,
        author_name: element.author_name,
      });
    }
  });

  res.send([...booksMap.values()]);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const bookDoc = await db.query('SELECT * FROM books WHERE book_id = $1', [
    id,
  ]);

  if (bookDoc.rows.length === 0) throw Error("book doesn't exist");

  const authorsDoc = await db.query(
    'SELECT authors.* FROM authors_books JOIN authors ON authors_books.author_id = authors.author_id WHERE book_id = $1',
    [id]
  );

  res.send({ ...bookDoc.rows[0], authors: authorsDoc.rows });
});

router.post('/', async (req, res) => {
  const { bookName, authorIds } = req.body;

  if (bookName == undefined) throw new Error('book name not defined');
  if (authorIds == undefined) throw new Error('authorIds not defined');
  if (authorIds.constructor !== Array)
    throw new Error('authorIds must be an array');

  if (authorIds.length >= 1) {
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
    if (bookId == null) throw new Error('bookId not defined');
    const connectValues = authorIds.map((author_id) => [author_id, bookId]);

    const connectDoc = await db.query(
      format(
        'INSERT INTO authors_books(author_id, book_id) VALUES %L RETURNING *',
        connectValues
      )
    );

    await db.query('COMMIT');

    res.send(bookDoc.rows[0]);
  } else {
    // create book with no author
    const bookDoc = await db.query(
      'INSERT INTO books(book_name) VALUES($1) RETURNING *',
      [bookName]
    );
    res.send(bookDoc.rows[0]);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const doc = await db.query(
    'DELETE FROM books WHERE book_id = $1 RETURNING *',
    [id]
  );

  res.send(doc.rows);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { bookName } = req.body;
  if (bookName == undefined) throw new Error('book name not defined');

  const doc = await db.query(
    'UPDATE books SET book_name = $2 WHERE book_id = $1 RETURNING *',
    [id, bookName]
  );

  res.send(doc.rows);
});

module.exports = router;
