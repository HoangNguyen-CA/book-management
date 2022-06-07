const Router = require('express-promise-router');
const db = require('../db/index');

const router = new Router();

router.get('/', async (req, res) => {
  const doc = await db.query('SELECT * FROM authors');

  res.json(doc.rows);
});

router.post('/', async (req, res) => {
  const { authorName } = req.body;
  if (authorName == undefined) throw new Error('author name missing');

  const doc = await db.query(
    'INSERT INTO authors(author_name) VALUES($1) RETURNING *',
    [authorName]
  );

  res.json(doc.rows);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const doc = await db.query('SELECT * FROM authors WHERE author_id = $1', [
    id,
  ]);

  res.send(doc.rows);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const doc = await db.query(
    'DELETE FROM authors WHERE author_id = $1 RETURNING *',
    [id]
  );

  res.send(doc.rows);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { authorName } = req.body;
  if (authorName == undefined) throw new Error('author name missing');

  const doc = await db.query(
    'UPDATE authors SET author_name = $2 WHERE author_id = $1 RETURNING *',
    [id, authorName]
  );

  res.send(doc.rows);
});

module.exports = router;