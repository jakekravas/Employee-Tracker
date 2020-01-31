DROP DATABASE IF EXISTS employee_DB;

CREATE DATABASE employee_DB;

USE employee_DB;
CREATE TABLE departments(
    id INT(10) PRIMARY KEY auto_increment,
    name VARCHAR(30) NOT NULL
);

USE employee_DB;
SELECT * FROM employees;

USE employee_DB;
SELECT * FROM roles INNER JOIN departments ON departments.id = roles.department_id;

USE employee_DB;
CREATE TABLE roles(
    id INT(10) PRIMARY KEY auto_increment,
    title VARCHAR(30) NOT NULL,
    salary DEC(10,2) NOT NULL,
    department_id INT(10) NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

USE employee_DB;
CREATE TABLE employees(
    id INT(10) PRIMARY KEY auto_increment,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT(10) NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    manager_id INT(10)
);

USE employee_DB;
INSERT INTO employees(first_name, last_name, role_id) VALUES ("Jake", "Kravas", 1);

USE employee_DB;
SELECT * FROM employees;