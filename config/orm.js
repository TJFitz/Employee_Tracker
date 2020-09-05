const conn = require("./connection");

const orm = {
  addDepartment: function (table, name, cb) {
    let queryString = "INSERT INTO ?? (name) VALUES (?)";
    conn.query(queryString, [table, name], (err, res) => {
      if (err) throw err;
      cb(res);
    });
  },
  addRole: function (table, title, salary, department, cb) {
    let queryString =
      "INSERT INTO ?? (title, salary, department_id) VALUES (?, ?, ?)";
    conn.query(queryString, [table, title, salary, department], (err, res) => {
      if (err) throw err;
      cb(res);
    });
  },
  addEmployee: function (table, first, last, role, manager, cb) {
    let queryString =
      "INSERT INTO ?? (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
    conn.query(queryString, [table, first, last, role, manager], (err, res) => {
      if (err) throw err;
      cb(res);
    });
  },
  viewTableBy: function (table, condition, cb) {
    let queryString = "SELECT * FROM ?? WHERE ?";
    conn.query(queryString, [table, condition], (err, res) => {
      if (err) throw err;
      cb(res);
    });
  },
};

module.exports = orm;
