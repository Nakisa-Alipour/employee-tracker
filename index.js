
// Import required modules
const { prompt } = require('inquirer');
const mysql = require('mysql2');


// Create a connection to the MySQL database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'employee_db'
    },
    console.log(`Connected to the books_db database.`)
);


// Connect to the database and start the application
db.connect(function(err) {
    if (err) throw err;
    console.log('Connected to the employee_db database.');
    userPrompts();
});


// Function to prompt the user for actions
function userPrompts() {
    prompt({
        type: "list",
        name: "userChoice",
        message: "What would you like to do?",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
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


// Function to view all departments
function viewAllDepartments() {
    db.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        console.table(results);
        userPrompts();
    });
}

// Function to view all roles
function viewAllRoles() {
    db.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id',
    (err, results) => {
        if (err) throw err;
        console.table(results);
        userPrompts();
    });
}


// Function to view all employees
function viewAllEmployees() {
    db.query(
      `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
      FROM employee 
      INNER JOIN role ON employee.role_id = role.id 
      INNER JOIN department ON role.department_id = department.id 
      LEFT JOIN employee AS manager ON employee.manager_id = manager.id`,
      (err, results) => {
        if (err) throw err;
        console.table(results);
        userPrompts();
      });
}

// Function to add a department
function addDepartment() {
    prompt({
      type: 'input',
      name: 'departmentName',
      message: 'Enter the name of the department:'
    }).then(answer => {
      db.query('INSERT INTO department (name) VALUES (?)', [answer.departmentName], (err, result) => {
        if (err) throw err;
        console.log('Department added successfully!');
        userPrompts();
      });
    });
  }


// Function to add a role
function addRole() {
    db.query('SELECT * FROM department', (err, departments) => {
        if (err) throw err;
        prompt([
            {
                type: 'input',
                name: 'roleTitle',
                message: 'Enter the title of the role:'
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'Enter the salary for the role:'
            },
            {
                type: 'list',
                name: 'departmentId',
                message: 'Select the department for the role:',
                choices: departments.map(department => ({
                name: department.name,
                value: department.id
            })),
            validate: input => (input ? true : 'Please select a department.')
        }
    ]).then(answers => {
        db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
          [answers.roleTitle, answers.roleSalary, answers.departmentId], (err, result) => 
          {
            if (err) throw err;
            console.log('Role added successfully!');
            userPrompts();
          }
        );
    });
});
}


// Function to add an employee
function addEmployee() {
    db.query('SELECT * FROM role', (err, roles) => {
        if (err) throw err;
        prompt([
            {
                type: 'input',
                name: 'firstName',
                message: "Enter the employee's first name:"
            },
            {
                type: 'input',
                name: 'lastName',
                message: "Enter the employee's last name:"
            },
            {
                type: 'list',
                name: 'roleId',
                message: "Select the employee's role:",
                choices: roles.map(role => ({
                name: role.title,
                value: role.id
            }))
            },
            {
                type: 'input',
                name: 'managerId',
                message: "Enter the employee's manager ID:"
            }
        ]).then(answers => {
            db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
            [answers.firstName, answers.lastName, answers.roleId, answers.managerId],
            (err, result) => {
                if (err) throw err;
                console.log('Employee added successfully!');
                userPrompts();
            });
        });
    });
}


// Function to update employee role 
function updateEmployeeRole() {
    db.query('SELECT * FROM employee', (err, employees) => {
        if (err) throw err;
        db.query('SELECT * FROM role', (err, roles) => {
            if (err) throw err;
            prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: 'Select the employee to update:',
                    choices: employees.map(employee => ({
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id
                    }))
                },
                {
                    type: 'list',
                    name: 'roleId',
                    message: 'Select the new role for the employee:',
                    choices: roles.map(role => ({
                    name: role.title,
                    value: role.id
                }))
            }
        ]).then(answers => {
            db.query('UPDATE employee SET role_id = ? WHERE id = ?',
            [answers.roleId, answers.employeeId],
            (err, result) => {
                if (err) throw err;
                console.log('Employee role updated successfully!');
                userPrompts();
            });
        });
    });
});
}
  