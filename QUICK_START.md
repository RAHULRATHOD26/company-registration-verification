# 🚀 Quick Start Guide - 5 Minutes Setup

## Why APIs Not Working?

The project files are in GitHub - they need to be **cloned to your computer** and **locally installed** before the URLs work.

---

## ✅ Step-by-Step Setup (Follow Exactly)

### **Step 1: Clone the Repository** (1 minute)

Open your terminal and run:

```bash
git clone https://github.com/RAHULRATHOD26/company-registration-verification.git
cd company-registration-verification
```

### **Step 2: Set Up Backend** (2 minutes)

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Edit `.env` file** (open in VS Code):

```env
# Database (Keep defaults for testing)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=company_registration_db
DB_USER=postgres
DB_PASSWORD=your_password

# Server
PORT=5000
NODE_ENV=development

# JWT (Important!)
JWT_SECRET=your_super_secret_key_32_chars_minimum_12345678
JWT_EXPIRES_IN=90d

# Firebase (Get from Firebase Console - for later)
FIREBASE_PROJECT_ID=your-project
FIREBASE_PRIVATE_KEY=your-key
FIREBASE_CLIENT_EMAIL=your-email

# Cloudinary (Get from Cloudinary - for later)
CLOUDINARY_CLOUD_NAME=your-cloud
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret

# CORS
CORS_ORIGIN=http://localhost:3000
```

**Start Backend:**

```bash
npm run dev
```

✅ If successful, you'll see:
```
Server running on port 5000
```

### **Step 3: Set Up Frontend** (2 minutes in new terminal)

```bash
# Open a NEW terminal window/tab
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Edit `.env` file**:

```env
VITE_API_URL=http://localhost:5000
```

**Start Frontend:**

```bash
npm run dev
```

✅ If successful, you'll see:
```
  VITE v... ready in ... ms
  
  ➜  Local:   http://localhost:5173/
```

---

## 🎯 Now Test It!

Open your browser and go to:

- **Frontend:** http://localhost:5173/ ✅
- **Backend API:** http://localhost:5000/health ✅

---

## ⚠️ Troubleshooting

### **"npm: command not found"**
→ Install Node.js from https://nodejs.org/

### **"Port 5000 already in use"**
→ Kill the process using port 5000:
```bash
# On Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process

# On Mac/Linux
lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

### **"Cannot find module 'express'"**
→ Run `npm install` again in the backend folder

### **Backend works but frontend won't connect**
→ Make sure `.env` has correct `VITE_API_URL=http://localhost:5000`

### **Port 5173 already in use**
→ Kill the process or use different port:
```bash
npm run dev -- --port 5174
```

---

## 📋 Database Setup (Optional - For Later)

If you want to use PostgreSQL:

1. Install PostgreSQL from https://www.postgresql.org/download/
2. Create a database:
```bash
psql -U postgres
create database company_registration_db;
\q
```
3. Import schema:
```bash
psql -U postgres -d company_registration_db -f backend/database/company_db.sql
```

---

## 🔐 Firebase & Cloudinary Setup (For Production)

### Firebase Setup:
1. Go to https://firebase.google.com/
2. Create new project
3. Go to Project Settings → Service Accounts
4. Copy the JSON credentials to `.env`

### Cloudinary Setup:
1. Go to https://cloudinary.com/
2. Sign up and get your credentials
3. Add to `.env`

---

## ✨ Verify Everything Works

### Backend Health Check:
```bash
curl http://localhost:5000/health
```

Should return:
```json
{"status":"OK","timestamp":"2024-12-05T..."}
```

### Frontend Loading:
Open http://localhost:5173 in browser - you should see the login page

---

## 🎓 Project Structure

```
company-registration-verification/
├── backend/          ← API server (Node + Express)
│   ├── src/
│   ├── database/
│   ├── .env.example
│   └── package.json
├── frontend/         ← Web app (React + Vite)
│   ├── src/
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
└── docs/            ← Documentation
```

---

## 🚀 What's Next?

Once both servers are running:

1. Go to http://localhost:5173
2. Click "Register"
3. Fill in the form
4. Test the API at http://localhost:5000

---

## 📝 Common Issues Checklist

- [ ] Node.js installed? (`node --version`)
- [ ] Git installed? (`git --version`)
- [ ] Cloned the repo? (`git clone ...`)
- [ ] Backend npm install done?
- [ ] Backend .env created?
- [ ] Backend running on 5000? (`npm run dev`)
- [ ] Frontend npm install done?
- [ ] Frontend .env created with API_URL?
- [ ] Frontend running on 5173? (`npm run dev`)
- [ ] Can access http://localhost:5173?
- [ ] Can access http://localhost:5000/health?

---

## 💡 Need Help?

Check these files for more details:
- `README.md` - Full documentation
- `docs/IMPLEMENTATION_GUIDE.md` - Code examples
- `PROJECT_SUBMISSION.md` - Project overview

**Happy Coding!** 🎉
