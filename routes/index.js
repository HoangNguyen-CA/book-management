const authors = require('./authors.js');
const books = require('./books');

module.exports = (app) => {
  app.use('/authors', authors);
  app.use('/books', books);
};
