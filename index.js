const inquirer = require('inquirer');
const mysql = require('./db');

const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'employee_db'
    },
    console.log(`Connected to the books_db database.`)
  );

  connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to the employee_db database.');
    userPrompts();
  });


function userPrompts() {
    prompt({
        type: "list",
        name: "userChoice",
        message: "What would you like to do?",
        choice: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "View Employees By Manager",
            "View Employees By Department",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "Delete Department", 
            "Delete Role",
            "Delete Employee",
            "Quit"
        ]
    })

    .then(answer => {
        switch (answer.userChoice) {
          case 'View All Departments':
            viewAllDepartments();
            break;
          case 'View All Roles':
            viewAllRoles();
            break;
          case 'View All Employees':
            viewAllEmployees();
            break;
          case 'View Employees By Manager':
            viewEmployeesByManager();
            break;
          case 'View Employees By Department':
            viewEmployeesByDepartment();
            break;
          case 'Add Department':
            addDepartment();
            break;
          case 'Add Role':
            addRole();
            break;
          case 'Add Employee':
            addEmployee();
            break;
          case 'Update Employee Role':
            updateEmployeeRole();
            break;
          case 'Update Employee Manager':
            updateEmployeeManager();
            break;
          case 'Delete Department':
            deleteDepartment();
            break;
          case 'Delete Role':
            deleteRole();
            break;
          case 'Delete Employee':
            deleteEmployee();
            break;
          case 'Quit':
            console.log('Exiting the application...');
            db.end();
            break;
          default:
            console.log('Invalid choice. Please try again.');
            userPrompts();
        }
      });

}

function viewAllDepartments() {
    db.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        console.table(results);
        userPrompts();
    });
}


function viewAllRoles() {
    db.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id',
    (err, results) => {
        if (err) throw err;
        console.table(results);
        userPrompts();
    });
}


