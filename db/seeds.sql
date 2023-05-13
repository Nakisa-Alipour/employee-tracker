
-- Inserting values into the 'department' table
INSERT INTO department (name) VALUES
('Finance'),
('Human Resources'),
('Marketing');

-- Inserting values into the 'role' table
INSERT INTO role (title, salary, department_id) VALUES
('Manager', 5000, 1),
('Analyst', 3000, 1),
('Assistant', 2000, 2),
('Coordinator', 2500, 3);

-- Inserting values into the 'employee' table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Michael', 'Johnson', 3, 1),
('Emily', 'Williams', 4, 2);
