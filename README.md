# Employee Tracker

## Description

Employee Tracker is a command-line application that allows business owners to view and manage departments, roles, and employees in their company. The application is built using Node.js, Inquirer, and MySQL, providing an efficient solution for organizing and planning business operations.

The application provides a user-friendly interface through the command-line, allowing users to perform various tasks such as viewing departments, roles, and employees, adding new departments, roles, and employees, as well as updating employee roles.


## Walkthrough Video

[![play image](https://user-images.githubusercontent.com/124220654/232980789-98efdcfd-579f-4389-a10f-8822b54bbeaa.jpg)](https://clipchamp.com/watch/Dne8sd75Qkl)


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)


## Installation

To install and run the Employee Tracker application, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project's root directory.
3. Install the required dependencies by running the following command: `npm install` and `npm i inquirer@8.2.4`
4. Ensure you have MySQL installed and running on your system and also add your **mysql password** in index.js file before running the application.
5. Modify the database connection details in the `index.js` file to match your MySQL configuration (host, user, password, database).
6. Run the application using the following command: `node index.js`


## Usage

Upon running the Employee Tracker application, you will be presented with a series of options to manage your company's employee database. Use the arrow keys to navigate through the options and press Enter to make a selection.

- View All Departments: Displays a formatted table showing the names and IDs of all departments.
- View All Roles: Displays a formatted table showing job titles, role IDs, departments, and salaries for all roles.
- View All Employees: Displays a formatted table showing employee details, including IDs, names, job titles, departments, salaries, and managers.
- Add Department: Allows you to add a new department to the database by entering its name.
- Add Role: Enables you to add a new role to the database by providing the title, salary, and department for the role.
- Add Employee: Lets you add a new employee to the database by entering their first name, last name, role, and manager.
- Update Employee Role: Allows you to update the role of an existing employee by selecting the employee and their new role.

Follow the on-screen prompts and provide the necessary information to perform each task.


## Contributing

Contributions to the Employee Tracker project are welcome and encouraged! If you have any improvements or bug fixes in mind, feel free to submit a pull request. Please ensure that your PR adheres to the established coding standards and passes all tests.




