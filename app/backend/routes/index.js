const authors = require('./authors.js');
const books = require('./books');

module.exports = (app) => {
  app.use('/api/authors', authors);
  app.use('/api/books', books);
};
