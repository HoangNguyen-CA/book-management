const express = require('express');
const morgan = require('morgan');

const mountRoutes = require('./routes/index');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

mountRoutes(app);

const PORT = 3000;

app.use((err, req, res, next) => {
  let message = 'Error!';
  if (err.message) message = err.message;
  res.send(message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
