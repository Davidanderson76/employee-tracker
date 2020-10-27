DROP DATABASE IF EXISTS empliyees;

CREATE DATABASE employees;

USE employees;

CREATE TABLE departments (
    id INT auto_increment unsigned PRIMARY KEY,
    name VARCHAR(30) unique NOT NULL
);

CREATE TABLE role (
    id INT auto_increment PRIMARY KEY,
    title VARCHAR(30) unique NOT NULL,
    salary DECIMAL NOT NULL unsigned,
    department_id INT auto_increment unsigned, 
    INDEX dep_ind (department_id),
    FOREIGN KEY (department_id) CONSTRAINT fk_department REFERENCES department(id) ON DELETE CASCADE 
);

CREATE TABLE employee (
    id INT auto_increment PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT auto_increment unsigned,
    INDEX role_ind (role_id),
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    manager_id INT unsigned,
    INDEX man_ind (manager_id),
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);

