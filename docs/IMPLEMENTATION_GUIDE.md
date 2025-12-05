# Complete Implementation Guide

## Backend Implementation

### File: backend/src/config/database.js
```javascript
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

module.exports = pool;
```

### File: backend/src/config/firebase.js
```javascript
const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = {
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
```

### File: backend/src/config/cloudinary.js
```javascript
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
```

### File: backend/src/middleware/authMiddleware.js
```javascript
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return next(createError(401, 'No token provided'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(createError(401, 'Invalid or expired token'));
  }
};

module.exports = authMiddleware;
```

### File: backend/src/middleware/errorHandler.js
```javascript
const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    success: false,
    error: {
      status,
      message,
    },
  });
};

module.exports = errorHandler;
```

### File: backend/src/services/authService.js
```javascript
const admin = require('../config/firebase');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
  async registerWithFirebase(email, password) {
    try {
      const userRecord = await admin.auth().createUser({
        email,
        password,
      });
      return userRecord;
    } catch (error) {
      throw new Error(`Firebase registration failed: ${error.message}`);
    }
  }

  async sendEmailVerification(uid) {
    try {
      const link = await admin.auth().generateEmailVerificationLink(uid);
      return link;
    } catch (error) {
      throw new Error(`Email verification failed: ${error.message}`);
    }
  }

  async verifyIdToken(token) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      return decodedToken;
    } catch (error) {
      throw new Error(`Token verification failed: ${error.message}`);
    }
  }

  generateJWT(userId, email) {
    return jwt.sign(
      { userId, email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '90d' }
    );
  }
}

module.exports = new AuthService();
```

### File: backend/src/server.js
```javascript
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const companyRoutes = require('./routes/companyRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/company', companyRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
```

## Frontend Implementation

### File: frontend/src/api/axiosClient.js
```javascript
import axios from 'axios';
import store from '../store/store';

const axiosClient = axios.create({
  baseURL: process.env.VITE_API_URL || 'http://localhost:5000',
});

// Add JWT token to requests
axiosClient.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
```

### File: frontend/src/store/authSlice.js
```javascript
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token'),
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCredentials, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
```

## Database Schema: backend/database/company_db.sql
```sql
CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  gender VARCHAR(50),
  mobile_no VARCHAR(20),
  signup_type VARCHAR(50),
  is_mobile_verified BOOLEAN DEFAULT FALSE,
  is_email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS company_profile (
  profile_id SERIAL PRIMARY KEY,
  owner_id INTEGER NOT NULL REFERENCES users(user_id),
  name VARCHAR(255) NOT NULL,
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  postal_code VARCHAR(20),
  website VARCHAR(255),
  industry VARCHAR(100),
  logo_url VARCHAR(500),
  banner_url VARCHAR(500),
  founded_date DATE,
  description TEXT,
  social_links JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_company_owner ON company_profile(owner_id);
```

## API Endpoints Reference

### Authentication Endpoints

**POST /api/auth/register**
- Request: `{ email, password, full_name, mobile_no }`
- Response: `{ success, user_id, token }`

**POST /api/auth/login**
- Request: `{ email, password }`
- Response: `{ success, token, user }`

**GET /api/auth/verify-email?token=EMAIL_TOKEN**
- Response: `{ success, message }`

**POST /api/auth/verify-mobile**
- Request: `{ user_id, otp }`
- Response: `{ success, message }`

### Company Endpoints

**POST /api/company/register** (Protected)
- Request: `{ name, address, city, state, country, postal_code, website, industry, founded_date }`
- Response: `{ success, profile_id }`

**GET /api/company/profile** (Protected)
- Response: `{ success, profile: { ... } }`

**PUT /api/company/profile** (Protected)
- Request: Updates for company fields
- Response: `{ success, updated_profile }`

**POST /api/company/upload-logo** (Protected)
- Request: FormData with image file
- Response: `{ success, logo_url }`

**POST /api/company/upload-banner** (Protected)
- Request: FormData with image file
- Response: `{ success, banner_url }`

## Testing

### Run All Tests
```bash
cd backend
npm test
```

### Example Test: backend/src/tests/auth.test.js
```javascript
const request = require('supertest');
const app = require('../server');

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'Password123!',
        full_name: 'Test User',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it('should login with valid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'Password123!',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
```

## Environment Setup Checklist

- [ ] Node.js 20+ installed
- [ ] PostgreSQL 15+ running
- [ ] Firebase project created with credentials
- [ ] Cloudinary account with API credentials
- [ ] .env files configured in both backend/ and frontend/
- [ ] Database schema imported: `psql -f database/company_db.sql`
- [ ] Backend: `npm install && npm run dev`
- [ ] Frontend: `npm install && npm run dev`
- [ ] API accessible at `http://localhost:5000`
- [ ] Frontend accessible at `http://localhost:5173`

## Troubleshooting Common Issues

**JWT Errors:**
- Ensure JWT_SECRET is 32+ characters
- Check token hasn't expired (90d default)

**Database Connection:**
- Verify PostgreSQL service is running
- Check credentials in .env match database

**Firebase Configuration:**
- Download service account JSON from Firebase Console
- Ensure all credentials are in .env

**Cloudinary Upload Issues:**
- Check file size limits
- Verify CORS settings in Cloudinary

For more detailed information, refer to the README.md and individual module documentation.
