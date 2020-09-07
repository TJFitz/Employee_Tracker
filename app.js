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
        "View departments",
        "View roles",
        "View employees",
        "Add new department",
        "Add new role",
        "Add new employee",
        "Remove a department",
        "Remove a role",
        "Remove an employee",
        "Update an employee's role",
        "Exit",
      ],
      loop: false,
    })
    .then((answer) => {
      switch (answer.mainMenu) {
        case "View departments":
          viewBy("department");
          break;
        case "View roles":
          viewBy("role");
          break;
        case "View employees":
          viewBy("employee");
          break;
        case "Add new department":
          addNewDepartment();
          break;
        case "Add new role":
          addNewRole();
          break;
        case "Add new employee":
          addNewEmployee();
          break;
        case "Remove a department":
          removeDepartment();
          break;
        case "Remove a role":
          removeRole();
          break;
        case "Remove an employee":
          removeEmployee();
          break;
        case "Update an employee's role":
          updateEmployeeRole();
          break;
        case "Exit":
          conn.end();
          break;
      }
    });
};

const viewBy = (table) => {
  orm.viewTableBy(table, "1=1", (res) => {
    let data = res;
    console.log("\n");
    console.table(res);
    // I hate this, need to find an actual solution
    console.log(
      "\n",
      "\n",
      "\n",
      "\n",
      "\n",
      "\n",
      "\n",
      "\n",
      "\n",
      "\n",
      "\n"
    );
  });
  // All of the above was bad
  startApp();
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

const removeDepartment = () => {
  orm.viewTableBy("department", "1=1", (res) => {
    let data = res;
    async function deleteDepartment() {
      let currentDepartments = await data.map(
        (entry) => `${entry.id} ${entry.name}`
      );
      inquirer
        .prompt([
          {
            name: "delete",
            type: "list",
            message: "which department would you like to remove?",
            choices: currentDepartments,
            loop: false,
          },
          {
            name: "confirm",
            type: "list",
            message: "Are you sure you want to remove this department?",
            choices: ["Yes", "No"],
            loop: false,
          },
        ])
        .then((answers) => {
          if (answers.confirm === "Yes") {
            let deleteID = parseInt(answers.delete);
            orm.removeDepartment(deleteID, (res) => {
              let data = res;
            });
            startApp();
          } else {
            startApp();
          }
        });
    }
    deleteDepartment();
  });
};

const removeRole = () => {
  orm.viewTableBy("role", "1=1", (res) => {
    let data = res;
    async function deleteRole() {
      let currentRoles = await data.map(
        (entry) =>
          `${entry.id} ${entry.title} ${entry.salary} ${entry.department_id}`
      );
      inquirer
        .prompt([
          {
            name: "delete",
            type: "list",
            message: "which role would you like to remove?",
            choices: currentRoles,
            loop: false,
          },
          {
            name: "confirm",
            type: "list",
            message: "Are you sure you want to remove this role?",
            choices: ["Yes", "No"],
            loop: false,
          },
        ])
        .then((answers) => {
          if (answers.confirm === "Yes") {
            let deleteID = parseInt(answers.delete);
            orm.removeRole(deleteID, (res) => {
              let data = res;
            });
            startApp();
          } else {
            startApp();
          }
        });
    }
    deleteRole();
  });
};

const removeEmployee = () => {
  orm.viewTableBy("employee", "1=1", (res) => {
    let data = res;
    async function DeleteEmployee() {
      let currentEmployees = await data.map(
        (entry) => `${entry.id} ${entry.first_name} ${entry.last_name}`
      );
      inquirer
        .prompt([
          {
            name: "delete",
            type: "list",
            message: "which employee would you like to remove?",
            choices: currentEmployees,
            loop: false,
          },
          {
            name: "confirm",
            type: "list",
            message: "Are you sure you want to remove this employee?",
            choices: ["Yes", "No"],
            loop: false,
          },
        ])
        .then((answers) => {
          if (answers.confirm === "Yes") {
            let deleteID = parseInt(answers.delete);
            orm.removeEmployee(deleteID, (res) => {
              let data = res;
            });
            startApp();
          } else {
            startApp();
          }
        });
    }
    DeleteEmployee();
  });
};

const updateEmployeeRole = () => {
  let targetEmployee;
  let newRole;
  orm.viewTableBy("employee", "1=1", (res) => {
    let data = res;
    async function getEmployeeChoice() {
      let currentEmployees = await data.map(
        (entry) => `${entry.id} ${entry.first_name} ${entry.last_name}`
      );
      inquirer
        .prompt({
          name: "target",
          type: "list",
          message: "which employee's role would you like to update?",
          choices: currentEmployees,
          loop: false,
        })
        .then((answer) => {
          targetEmployee = parseInt(answer.target);
          orm.viewTableBy("role", "1=1", (res) => {
            let data = res;
            async function getRoleChoice() {
              let currentRoles = await data.map(
                (entry) =>
                  `${entry.id} ${entry.title} ${entry.salary} ${entry.department_id}`
              );
              inquirer
                .prompt({
                  name: "target",
                  type: "list",
                  message: "which role would you like to assign?",
                  choices: currentRoles,
                  loop: false,
                })
                .then((answer) => {
                  newRole = parseInt(answer.target);
                  orm.updateRole(newRole, targetEmployee, (res) => {
                    let data = res;
                    startApp();
                  });
                });
            }
            getRoleChoice();
          });
        });
    }
    getEmployeeChoice();
  });
};

startApp();
