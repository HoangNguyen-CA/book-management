const Router = require('express-promise-router');
const db = require('../db/index');

const router = new Router();

router.post('/', async (req, res) => {
  const { name } = req.body;

  const doc = await db.query(
    'INSERT INTO books(book_name) VALUES($1) RETURNING *',
    [name]
  );
  res.send(doc.rows);
});

router.get('/', async (req, res) => {
  const doc = await db.query('SELECT * FROM books');
  res.send(doc.rows);
});

router.delete('/', async (req, res) => {
  const { name } = req.body;

  const doc = await db.query(
    'DELETE FROM books WHERE book_name = $1 RETURNING *',
    [name]
  );

  res.send(doc.rows);
});

module.exports = router;
