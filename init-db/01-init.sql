-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS nard_inventory;

-- Use the database
USE nard_inventory;

-- Grant privileges (optional, for additional users)
-- CREATE USER IF NOT EXISTS 'nardpos'@'%' IDENTIFIED BY 'nardpos123';
-- GRANT ALL PRIVILEGES ON nard_inventory.* TO 'nardpos'@'%';
-- FLUSH PRIVILEGES;

-- The tables will be created automatically by TypeORM synchronization
