INSERT INTO department
    (name)
VALUES
    ("Management");
INSERT INTO department
    (name)
VALUES
    ("Marketing");
INSERT INTO department
    (name)
VALUES
    ("Logistics");
INSERT INTO department
    (name)
VALUES
    ("Customer Support");

INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Bossman", 1000000, 1);
INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Sales Manager", 500000, 2);
INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Shipping Manager", 200000, 3);

INSERT INTO employee
    (first_name, last_name, role_id)
VALUES
    ("Tommy", "Wiseau", 1);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("John", "Fisherman", 2, 1);

