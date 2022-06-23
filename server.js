const express = require('express');
const morgan = require('morgan');
const db = require('./db/index');
const path = require('path');

const mountRoutes = require('./routes/index');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

mountRoutes(app);

//Serve static files
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}


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
