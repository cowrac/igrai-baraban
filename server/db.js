const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',         
  host: 'localhost',
  database: 'drum_school',
  password: 'igortimparol9008', 
  port: 5432,
});

module.exports = pool;
