DROP DATABASE IF EXISTS employee_DB_;

CREATE DATABASE employee_DB_;

USE employee_DB_;

CREATE TABLE departments(
    dpt_pk INT(10) PRIMARY KEY auto_increment,
    department VARCHAR(30) NOT NULL
);

CREATE TABLE roles(
    role_pk INT(10) PRIMARY KEY auto_increment,
    title VARCHAR(30) NOT NULL,
    salary DEC(10,2) NOT NULL,
    dpt_fk INT(10) NOT NULL,
    FOREIGN KEY (dpt_fk) REFERENCES departments(dpt_pk)
);

CREATE TABLE employees(
    id INT(10) PRIMARY KEY auto_increment,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_fk INT(10) NOT NULL,
    FOREIGN KEY (role_fk) REFERENCES roles(role_pk),
    manager_id INT(10)
);