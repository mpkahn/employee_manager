use employees_db;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Manager', 95000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 175000, 2),
    ('Software Developer', 125000, 2),
    ('Account Manager', 140000, 3),
    ('Accountant', 115000, 3),
    ('Head of legal', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Joey', 'Zayne', 2, NULL),
    ('Michelle', 'Gordo', 3, 1),
    ('Beth', 'Jibli', 1, NULL),
    ('Micah', 'Pontrus', 5, 3),
    ('Holly', 'Pruse', 4, NULL),
    ('Max', 'Green', 8, 5),
    ('Tiffany', 'Bond', 6, NULL),
    ('Bill', 'Lourde', 7, 7);
