-- Initial database schema
-- This is an example migration file

-- Create a sample table for credit conditions
CREATE TABLE IF NOT EXISTS credit_conditions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    interest_rate DECIMAL(5, 2) NOT NULL,
    min_credit_score INTEGER,
    max_loan_amount DECIMAL(15, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on name for faster lookups
CREATE INDEX idx_credit_conditions_name ON credit_conditions(name);
