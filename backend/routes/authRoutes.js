const express = require('express');
const router = express.Router();
const { register, login, verifyEmail, verifyPhone, resendOTP } = require('../controllers/authController');

// Registration endpoint
router.post('/register', register);

// Login endpoint
router.post('/login', login);

// Email verification endpoint
router.post('/verify-email', verifyEmail);

// Phone verification endpoint
router.post('/verify-phone', verifyPhone);

// Resend OTP endpoint
router.post('/resend-otp', resendOTP);

module.exports = router;
