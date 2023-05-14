/*
  This file contains the SQL schema for creating the employee_db database and its tables.
*/

-- Drop the database if it already exists
DROP DATABASE IF EXISTS employee_db;

-- Create the employee_db database
CREATE DATABASE employee_db;

-- Use the employee_db database
USE employee_db;

-- Create the department table
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- Create the role table
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id)
    REFERENCES department (id)
    ON DELETE SET NULL
);

-- Create the employee table
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT NOT NULL,
  manager_id INT,
  FOREIGN KEY (role_id)
    REFERENCES role (id),
  FOREIGN KEY (manager_id)
    REFERENCES role(id)
    ON DELETE SET NULL
);
