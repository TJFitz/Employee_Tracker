const inquirer = require("inquirer");
const cTable = require("console.table");
const orm = require("./config/orm");
const conn = require("./config/connection");

const startApp = () => {
  console.log("\n");
  inquirer
    .prompt({
      name: "mainMenu",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add new department",
        "Add new role",
        "Add new employee",
        "View departments",
        "View roles",
        "View employees",
        "Exit",
      ],
      loop: false,
    })
    .then((answer) => {
      switch (answer.mainMenu) {
        case "Add new department":
          addNewDepartment();
          break;
        case "Add new role":
          addNewRole();
          break;
        case "Add new employee":
          addNewEmployee();
          break;
        case "View departments":
          viewBy("department");
          break;
        case "View roles":
          viewBy("role");
          break;
        case "View employees":
          viewBy("employee");
          break;
        case "Exit":
          conn.end();
          break;
      }
    });
};

const addNewDepartment = () => {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "Please enter the name of this department",
    })
    .then((answer) => {
      orm.addDepartment("department", answer.department, (res) => {
        let data = res;
      });
      startApp();
    });
};

const addNewRole = () => {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Please enter the new role title",
      },
      {
        name: "salary",
        type: "input",
        message: "Please enter the salary for this role",
      },
      {
        name: "department",
        type: "input",
        message: "Please enter the department id for this role",
      },
    ])
    .then((answers) => {
      orm.addRole(
        "role",
        answers.title,
        answers.salary,
        answers.department,
        (res) => {
          let data = res;
        }
      );
      startApp();
    });
};

const addNewEmployee = () => {
  inquirer
    .prompt([
      {
        name: "first",
        type: "input",
        message: "Please enter the employee's first name",
      },
      {
        name: "last",
        type: "input",
        message: "Please enter the employee's last name",
      },
      {
        name: "role",
        type: "input",
        message: "Please enter the employee's role",
      },
      {
        name: "manager",
        type: "input",
        message: "Please enter the employee's manager id",
      },
    ])
    .then((answers) => {
      orm.addEmployee(
        "employee",
        answers.first,
        answers.last,
        answers.role,
        answers.manager,
        (res) => {
          let data = res;
        }
      );
      startApp();
    });
};

const viewBy = (table) => {
  orm.viewTableBy(table, "1=1", (res) => {
    let data = res;
    console.log("\n");
    console.table(res);
    console.log("\n", "\n", "\n", "\n", "\n", "\n", "\n", "\n");
  });
  startApp();
};

startApp();
