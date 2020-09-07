const conn = require("./connection");

const orm = {
  viewTableBy: function (table, condition, cb) {
    let queryString = "SELECT * FROM ?? WHERE ?";
    conn.query(queryString, [table, condition], (err, res) => {
      if (err) throw err;
      cb(res);
    });
  },
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
  removeDepartment: function (id, cb) {
    let queryString = "DELETE FROM department WHERE id = ?";
    conn.query(queryString, [id], (err, res) => {
      if (err) throw err;
      cb(res);
    });
  },
  removeRole: function (id, cb) {
    let queryString = "DELETE FROM role WHERE id = ?";
    conn.query(queryString, [id], (err, res) => {
      if (err) throw err;
      cb(res);
    });
  },
  removeEmployee: function (id, cb) {
    let queryString = "DELETE FROM employee WHERE id = ?";
    conn.query(queryString, [id], (err, res) => {
      if (err) throw err;
      cb(res);
    });
  },
  updateRole: function (newRole, id, cb) {
    let queryString = "UPDATE employee SET role_id = ? WHERE id = ?";
    conn.query(queryString, [newRole, id], (err, res) => {
      if (err) throw err;
      cb(res);
    });
  },
};

module.exports = orm;
