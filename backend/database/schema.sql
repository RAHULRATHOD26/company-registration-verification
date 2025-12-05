-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_phone (phone)
);

-- Create company_profile table
CREATE TABLE IF NOT EXISTS company_profile (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  company_registration_number VARCHAR(50) UNIQUE NOT NULL,
  cin_number VARCHAR(50),
  company_type VARCHAR(100),
  company_address TEXT,
  company_city VARCHAR(100),
  company_state VARCHAR(100),
  company_pincode VARCHAR(10),
  company_phone VARCHAR(20),
  company_email VARCHAR(255),
  company_website VARCHAR(255),
  company_logo_url VARCHAR(500),
  company_banner_url VARCHAR(500),
  business_category VARCHAR(100),
  business_description TEXT,
  verification_status VARCHAR(50) DEFAULT 'pending',
  verified_on TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_registration_number (company_registration_number),
  INDEX idx_verification_status (verification_status)
);

-- Create otp_table for email/phone verification
CREATE TABLE IF NOT EXISTS otp_table (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  otp_code VARCHAR(6) NOT NULL,
  otp_type VARCHAR(20) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_otp (user_id, otp_type)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email_verified ON users(email_verified);
CREATE INDEX IF NOT EXISTS idx_company_verification_status ON company_profile(verification_status);
CREATE INDEX IF NOT EXISTS idx_otp_expires_at ON otp_table(expires_at);
