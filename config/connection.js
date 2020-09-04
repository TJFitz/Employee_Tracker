const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employeesDB",
});

conn.connect((err) => {
  if (err) throw err;
});

module.exports = conn;
