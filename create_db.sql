CREATE DATABASE IF NOT EXISTS health;
USE health;

CREATE TABLE activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    type VARCHAR(100) NOT NULL,
    duration INT NOT NULL,
    calories INT,
    notes TEXT
);
