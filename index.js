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
}