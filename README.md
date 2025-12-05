# Company Registration & Verification Module

**A Full-Stack Application for Verifying Company Registration Numbers Against Government Databases with Real-Time Validation**

## 📋 Project Overview

This is a comprehensive full-stack web application built with modern technologies to facilitate company registration and real-time verification against government databases. The system provides secure authentication, profile management, file uploads, and real-time validation.

## 🎯 Key Features

✅ **User Authentication**
  - Firebase Email/Password Authentication
  - SMS OTP Verification
  - Email Verification Link
  - JWT-based Session Management (90-day expiry)

✅ **Company Management**
  - Multi-step Registration Process
  - Company Profile Management
  - Logo & Banner Upload (Cloudinary)
  - Real-time Validation

✅ **Security & Validation**
  - Password Hashing (bcrypt)
  - Input Sanitization
  - Helmet.js Headers
  - CORS Protection
  - Role-Based Access Control

✅ **File Management**
  - Cloud Storage (Cloudinary)
  - Image Upload & Processing
  - Secure File URLs

✅ **Testing & Documentation**
  - Unit & Integration Tests (Jest, SuperTest)
  - API Documentation
  - Comprehensive Setup Guide

## 🏗️ Architecture

### Technology Stack

**Backend:**
- Node.js 20
- Express.js 4.18
- PostgreSQL 15+
- Firebase Admin SDK
- Cloudinary SDK
- JWT (90-day tokens)

**Frontend:**
- React 19
- Vite (Build Tool)
- Redux Toolkit (State Management)
- React Query (Data Caching)
- React Hook Form (Form Handling)
- Material-UI (UI Components)
- Axios (HTTP Client)

**Testing & CI/CD:**
- Jest (Unit Testing)
- SuperTest (API Testing)
- GitHub Actions (Deployment Pipeline)

## 📁 Project Structure

```
company-registration-verification/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js          # PostgreSQL Connection
│   │   │   ├── firebase.js          # Firebase Setup
│   │   │   ├── cloudinary.js        # Cloudinary Setup
│   │   │   └── environment.js       # Environment Variables
│   │   ├── services/
│   │   │   ├── authService.js       # Firebase & Auth Logic
│   │   │   ├── companyService.js    # Company Business Logic
│   │   │   └── uploadService.js     # Cloudinary Upload Logic
│   │   ├── models/
│   │   │   ├── userModel.js         # User DB Operations
│   │   │   └── companyModel.js      # Company DB Operations
│   │   ├── controllers/
│   │   │   ├── authController.js    # Auth Route Handlers
│   │   │   └── companyController.js # Company Route Handlers
│   │   ├── routes/
│   │   │   ├── authRoutes.js        # Auth Endpoints
│   │   │   └── companyRoutes.js     # Company Endpoints
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js    # JWT Verification
│   │   │   ├── validationMiddleware.js  # Input Validation
│   │   │   └── errorHandler.js      # Error Handling
│   │   ├── tests/
│   │   │   ├── auth.test.js
│   │   │   ├── company.test.js
│   │   │   └── integration.test.js
│   │   └── server.js                # Express App Entry
│   ├── database/
│   │   └── company_db.sql           # Database Schema
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── axiosClient.js       # Axios Config with JWT
│   │   │   ├── authApi.js           # Auth Endpoints
│   │   │   └── companyApi.js        # Company Endpoints
│   │   ├── store/
│   │   │   ├── authSlice.js         # Redux Auth State
│   │   │   ├── companySlice.js      # Redux Company State
│   │   │   └── store.js             # Redux Store Config
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Settings.jsx
│   │   ├── components/
│   │   │   ├── FormStep.jsx         # Multi-step Form Component
│   │   │   ├── PrivateRoute.jsx     # Protected Routes
│   │   │   ├── ProfileCard.jsx
│   │   │   └── ImageUploader.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useCompany.js
│   │   ├── styles/
│   │   │   ├── theme.js             # MUI Theme Config
│   │   │   └── globals.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── docs/
│   ├── API_DOCUMENTATION.md         # Complete API Docs
│   ├── SETUP_GUIDE.md               # Installation & Setup
│   ├── DATABASE.md                  # Database Schema
│   └── ARCHITECTURE.md              # System Design
│
├── .gitignore
├── LICENSE
└── README.md (this file)
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 15+
- Firebase Project Account
- Cloudinary Account

### Backend Setup

1. **Clone & Navigate:**
```bash
git clone https://github.com/RAHULRATHOD26/company-registration-verification.git
cd company-registration-verification/backend
```

2. **Install Dependencies:**
```bash
npm install
```

3. **Environment Configuration:**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Database Setup:**
```bash
# Import the SQL schema
psql -U postgres -d postgres -f ../database/company_db.sql
```

5. **Start Server:**
```bash
npm run dev  # Development with nodemon
npm start   # Production
```

### Frontend Setup

1. **Navigate & Install:**
```bash
cd ../frontend
npm install
```

2. **Environment Configuration:**
```bash
cp .env.example .env
# Configure API endpoint
```

3. **Start Development:**
```bash
npm run dev
```

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
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
```

### Company Profile Table
```sql
CREATE TABLE company_profile (
  profile_id SERIAL PRIMARY KEY,
  owner_id INTEGER NOT NULL,
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
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(user_id)
);
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify-email` - Verify email
- `POST /api/auth/verify-mobile` - Verify OTP

### Company Management
- `POST /api/company/register` - Register company (Protected)
- `GET /api/company/profile` - Get company profile (Protected)
- `PUT /api/company/profile` - Update company profile (Protected)
- `POST /api/company/upload-logo` - Upload logo (Protected)
- `POST /api/company/upload-banner` - Upload banner (Protected)

## 📝 Testing

### Run All Tests
```bash
cd backend
npm test
```

### Test Coverage
```bash
npm test -- --coverage
```

### Watch Mode
```bash
npm run test:watch
```

## 📚 Documentation

Complete documentation available in `/docs` folder:
- **API_DOCUMENTATION.md** - Detailed API reference
- **SETUP_GUIDE.md** - Step-by-step setup instructions
- **DATABASE.md** - Database schema & queries
- **ARCHITECTURE.md** - System design & flow diagrams

## 🔧 Configuration

### Environment Variables

See `.env.example` files in both `backend/` and `frontend/` directories for complete list.

**Key Variables:**
- `JWT_SECRET` - Change in production!
- `FIREBASE_*` - Firebase project credentials
- `CLOUDINARY_*` - Cloudinary account credentials
- `DATABASE_*` - PostgreSQL connection settings

## 🐛 Troubleshooting

**JWT Token Issues:**
- Ensure `JWT_SECRET` is set
- Check token expiry (90 days default)

**Database Connection:**
- Verify PostgreSQL is running
- Check connection string in .env

**Firebase Errors:**
- Verify Firebase config JSON
- Check Firebase project is enabled

**Cloudinary Issues:**
- Verify API credentials
- Check image format & size limits

## 📦 Dependencies

### Backend
- express, pg, jsonwebtoken, bcrypt
- firebase-admin, cloudinary, multer
- jest, supertest (testing)

### Frontend
- react, vite, redux-toolkit
- react-query, axios, react-hook-form
- @mui/material (UI components)

## 📄 License

MIT License - See LICENSE file for details

## 👤 Author

**Rahul Rathod**
- GitHub: [@RAHULRATHOD26](https://github.com/RAHULRATHOD26)
- Email: rahul@example.com

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📞 Support

For support, email support@example.com or open an issue on GitHub.

## 🗺️ Roadmap

- [ ] Advanced Analytics Dashboard
- [ ] Multi-language Support
- [ ] Mobile App (React Native)
- [ ] API Rate Limiting
- [ ] Advanced Caching
- [ ] WebSocket Real-time Updates
- [ ] Email Notifications
- [ ] SMS Integration

---

**Last Updated:** December 2024
**Status:** Active Development
