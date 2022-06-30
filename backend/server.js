const express = require('express');
const morgan = require('morgan');
const db = require('./db/index');
const cors = require('cors');

const mountRoutes = require('./routes/index');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

mountRoutes(app);

app.use(async (err, req, res, next) => {
  try {
    await db.query('ROLLBACK'); //rollback any transactions
    console.log('ROLLBACK');
  } catch (e) {}

  let message = 'internal server error';
  if (err.message) message = err.message;
  res.status(400).send(message);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
