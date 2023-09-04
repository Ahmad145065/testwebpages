const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'mysql.cme5zhlvh69v.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'admin1234',
  database: 'mydatabase'
});

module.exports = connection;
