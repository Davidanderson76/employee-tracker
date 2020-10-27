USE employees;

INSERT INTO department
(name)
VALUES
    ('Sales'),
    ('Human Resources'),
    ('Accounting'),
    ('Engineering');

INSERT INTO role
(title, salary, department_id)
VALUES
    ('Lead Salesperson',80000 ,1),
    ('Salesperson', 50000 ,1),
    ('Quality Assurance',45000 ,2),
    ('Lawyer',100000 ,2),
    ('Accountant',55000 ,3),
    ('Accountant Manager',75000 ,3),
    ('Lead Engineer',100000 ,4),
    ('Software Engineer',75000 ,4);

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
    ('Michael', 'Scott',1 ,NULL ),
    ('Jim', 'Halpert',2 ,NULL ),
    ('Dwight', 'Schrute',3 ,1 ),
    ('Andy', 'Bernard',4 ,2 ),
    ('Phyllis', 'Vance',5 ,3 ),
    ('Pam', 'Halpert',6 ,NULL ),
    ('Toby', 'Flenderson',7 ,NULL ),
    ('Oscar', 'Martinez',8 ,3 ),
    ('Kevin', 'Malone',9 ,4 ),
    ('Creed', 'Bratton',10 ,NULL );