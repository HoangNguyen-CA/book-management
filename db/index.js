const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'local-password',
  host: 'localhost',
  port: 5432,
  database: 'booksapp',
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
