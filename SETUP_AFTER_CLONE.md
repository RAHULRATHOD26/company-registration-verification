# 📋 Setup Instructions - After Cloning Repository

After you clone this repository, follow these steps to add the missing backend files and run the project locally.

---

## ✅ STEP 1: Clone the Repository (If Not Done Already)

```bash
git clone https://github.com/RAHULRATHOD26/company-registration-verification.git
cd company-registration-verification
```

---

## 📁 STEP 2: Create Folder Structure in Backend

In your `backend/` folder, create these folders:

```
backend/
├── middleware/
├── routes/
├── server.js
└── ... (other files)
```

---

## 📄 STEP 3: Add These Files to Your Backend

### File 1: `backend/middleware/errorHandler.js`

```javascript
const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ success: false, error: { status, message } });
};
module.exports = errorHandler;
```

### File 2: `backend/routes/authRoutes.js`

```javascript
const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
  res.json({ success: true, message: 'Register endpoint' });
});

router.post('/login', (req, res) => {
  res.json({ success: true, message: 'Login endpoint' });
});

router.get('/verify-email', (req, res) => {
  res.json({ success: true, message: 'Email verified' });
});

router.post('/verify-mobile', (req, res) => {
  res.json({ success: true, message: 'Mobile verified' });
});

module.exports = router;
```

### File 3: Update `backend/server.js`

Replace the entire content with:

```javascript
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');

const authRoutes = require('./routes/authRoutes');
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

---

## ⚙️ STEP 4: Configure Environment Variables

1. In `backend/` folder, open `.env` file
2. Update these values:

```env
# Database (Keep defaults for testing)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=company_registration_db
DB_USER=postgres
DB_PASSWORD=password

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_super_secret_key_32_chars_minimum_12345678
JWT_EXPIRES_IN=90d

# CORS
CORS_ORIGIN=http://localhost:3000

# Firebase (Add later)
FIREBASE_PROJECT_ID=your-project
FIREBASE_PRIVATE_KEY=your-key
FIREBASE_CLIENT_EMAIL=your-email

# Cloudinary (Add later)
CLOUDINARY_CLOUD_NAME=your-cloud
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret
```

---

## 🚀 STEP 5: Install Dependencies & Run Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ You should see: **`Server running on port 5000`**

---

## 🧪 STEP 6: Test Backend

Open a new terminal and run:

```bash
# Test health endpoint
curl http://localhost:5000/health
```

Expected response:
```json
{"status":"OK","timestamp":"2025-12-05T..."}
```

---

## 🎨 STEP 7: Run Frontend (Optional - In New Terminal)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Copy env file
cp .env.example .env

# Start frontend
npm run dev
```

✅ Frontend will be at: **http://localhost:5173/**

---

## ✨ Summary

| Service | URL | Status |
|---------|-----|--------|
| Backend API | http://localhost:5000 | ✅ Running |
| Health Check | http://localhost:5000/health | ✅ Working |
| Frontend | http://localhost:5173 | ✅ Running |

---

## 🐛 Troubleshooting

### "Cannot find module authRoutes"
✅ Solution: Make sure you created `backend/routes/authRoutes.js` file

### "Cannot find module errorHandler"
✅ Solution: Make sure you created `backend/middleware/errorHandler.js` file

### "Port 5000 already in use"
✅ Solution: Kill the process or use different port:
```bash
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process
```

### "npm: command not found"
✅ Solution: Install Node.js from https://nodejs.org/

---

## 📌 Next Steps

1. ✅ Clone repository
2. ✅ Add the 3 files above to backend
3. ✅ Update `.env` file
4. ✅ Run `npm install` in backend
5. ✅ Run `npm run dev` in backend
6. ✅ Test with `curl http://localhost:5000/health`
7. ✅ (Optional) Run frontend

---

**Happy Coding!** 🎉
