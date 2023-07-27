const { Pool } = require('pg')

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "customer",
})

module.exports = {
  query: (text, params) => pool.query(text, params),
}