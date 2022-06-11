const express = require('express');
const morgan = require('morgan');
const db = require('./db/index');

const mountRoutes = require('./routes/index');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

mountRoutes(app);

const PORT = 5000;

app.use(async (err, req, res, next) => {
  try {
    await db.query('ROLLBACK'); //rollback any transactions
    console.log('ROLLBACK');
  } catch (e) {}

  let message = 'internal server error';
  if (err.message) message = err.message;
  res.status(400).send(message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
