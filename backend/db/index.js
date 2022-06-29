const Pool = require('pg').Pool;

const poolConfig = {
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'password',
  host: process.env.PG_HOST || 'localhost',
  port: 5432,
  database: process.env.PG_DATABASE || "postgres",
}

const pool = new Pool(poolConfig);

module.exports = {
  query: (text, params) => pool.query(text, params),
};
