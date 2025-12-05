const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Compare passwords
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Generate JWT token
const generateJWT = (payload, expiresIn = '90d') => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'your_secret_key_change_in_production', { expiresIn });
};

// Verify JWT token
const verifyJWT = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key_change_in_production');
  } catch (error) {
    return null;
  }
};

// Decode JWT token
const decodeJWT = (token) => {
  return jwt.decode(token);
};

module.exports = { hashPassword, comparePassword, generateJWT, verifyJWT, decodeJWT };
