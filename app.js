const inquirer = require("inquirer");
const cTable = require("console.table");
const orm = require("./config/orm");

const startApp = () => {
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
        "View employeees",
        "Update employee",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.mainMenu) {
        case "Add new department":
          //function
          break;
        case "Add new role":
          //function
          break;
        case "Add new employee":
          //function
          break;
        case "View departments":
          //function
          break;
        case "View roles":
          //function
          break;
        case "View employeees":
          //function
          break;
        case "Update employee":
          //function
          break;
        case "Exit":
          conn.end();
          break;
      }
    });
};

startApp();
