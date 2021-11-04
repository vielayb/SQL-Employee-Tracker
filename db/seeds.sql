INSERT INTO departments (name)
VALUES 
('Development'),
('Administration');

INSERT INTO roles (title, salary, department_id)
  VALUES 
      ('Manager', 150000, 1),
      ('Front_End', 70000, 2),
      ('Back_End', 90000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, 1),
  ('Virginia', 'Woolf', 1, 1),
  ('Piers', 'Gaveston', 1, 2),
  ('Charles', 'LeRoi', 2, 1),
  ('Katherine', 'Mansfield', 2, 1),
  ('Dora', 'Carrington', 3, 2),
  ('Edward', 'Bellamy', 3, 2),
  ('Montague', 'Summers', 3, 1),
  ('Octavia', 'Butler', 3, 1),
  ('Unica', 'Zurn', 2, 1);


  