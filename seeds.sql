-- Departments
INSERT INTO departments (department) VALUES ("Production");
INSERT INTO departments (department) VALUES ("Marketing");
INSERT INTO departments (department) VALUES ("Research and Development");
INSERT INTO departments (department) VALUES ("Human Resources");

-- Roles
INSERT INTO roles (title, salary, dpt_fk) VALUES ("Production Manager", 100000.00, 1);
INSERT INTO roles (title, salary, dpt_fk) VALUES ("Production Planner", 80000.00, 1);
INSERT INTO roles (title, salary, dpt_fk) VALUES ("Production Specialist", 80000.00, 1);
INSERT INTO roles (title, salary, dpt_fk) VALUES ("Marketing Manager", 100000.00, 2);
INSERT INTO roles (title, salary, dpt_fk) VALUES ("Marketing Coordinator", 75000.00, 2);
INSERT INTO roles (title, salary, dpt_fk) VALUES ("Marketing Specialist", 80000.00, 2);
INSERT INTO roles (title, salary, dpt_fk) VALUES ("R&D Manager", 120000.00, 3);
INSERT INTO roles (title, salary, dpt_fk) VALUES ("Researcher", 70000.00, 3);
INSERT INTO roles (title, salary, dpt_fk) VALUES ("Scientist", 95000.00, 3);
INSERT INTO roles (title, salary, dpt_fk) VALUES ("HR Manager", 100000.00, 4);
INSERT INTO roles (title, salary, dpt_fk) VALUES ("HR Consultant", 70000.00, 4);
INSERT INTO roles (title, salary, dpt_fk) VALUES ("HR Assistant", 60000.00, 4);

-- Employees
INSERT INTO employees (first_name, last_name, role_fk) VALUES ("Jackie", "Jackson", 1);
INSERT INTO employees (first_name, last_name, role_fk) VALUES ("Mary", "Merryweather", 2);
INSERT INTO employees (first_name, last_name, role_fk) VALUES ("Willie", "Williams", 3);
INSERT INTO employees (first_name, last_name, role_fk) VALUES ("Marty", "Martinson", 4);