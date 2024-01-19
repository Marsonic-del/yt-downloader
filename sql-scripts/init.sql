-- Create user
CREATE USER vova WITH PASSWORD 'password';

-- Create database and grant privileges
CREATE DATABASE hollywood WITH OWNER vova;


-- Create the 'logs' table
CREATE TABLE logs (
  id SERIAL PRIMARY KEY,
  ip VARCHAR(45),
  link VARCHAR(255),
  log_date TIMESTAMP
);
