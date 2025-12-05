const { sendEmail, sendSMS } = require('../services/notificationService');
const { hashPassword, comparePassword, generateJWT } = require('../utils/authUtils');
const pool = require('../config/database');

// Register handler
const register = async (req, res) => {
  try {
    const { email, phone, password, firstName, lastName } = req.body;
    
    // Check if user exists
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await hashPassword(password);
    
    // Create user
    const result = await pool.query(
      'INSERT INTO users (email, phone, password, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [email, phone, hashedPassword, firstName, lastName]
    );
    
    res.status(201).json({ message: 'User registered successfully', userId: result.rows[0].id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login handler
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = result.rows[0];
    const validPassword = await comparePassword(password, user.password);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = generateJWT({ userId: user.id, email: user.email }, '90d');
    res.json({ message: 'Login successful', token, userId: user.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Email verification handler
const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    // OTP verification logic
    res.json({ message: 'Email verified' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Phone verification handler
const verifyPhone = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    // OTP verification logic
    res.json({ message: 'Phone verified' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Resend OTP handler
const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    // Generate and send OTP
    res.json({ message: 'OTP sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login, verifyEmail, verifyPhone, resendOTP };
