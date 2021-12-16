CREATE USER 'test'@'localhost' IDENTIFIED BY 'test';

GRANT ALL PRIVILEGES ON `test` . * TO 'test'@'localhost';

FLUSH PRIVILEGES;