# Vercel Deployment Guide - Private Bank Bootcamp

This guide provides two deployment strategies for your application on Vercel.

## Overview

Your application consists of:
- **Frontend**: React + Vite (client folder)
- **Backend**: Express.js API (server folder)

---

## ⚠️ IMPORTANT: Current Issues Explained

**Problem 1**: When you deploy frontend and backend as separate Vercel projects and add a custom domain to the frontend project, Vercel's routing gets confused because both projects are trying to handle requests.

**Problem 2**: The backend requires specific serverless configuration for Vercel, which differs from traditional Node.js hosting.

---

## 🎯 Solution 1: Single Project Deployment (RECOMMENDED)

This is the **simplest and most reliable** approach. Deploy everything as one Vercel project.

### Benefits:
- ✅ Single deployment
- ✅ No CORS issues
- ✅ One domain handles everything
- ✅ Easier to manage
- ✅ No domain routing conflicts

### Step-by-Step Instructions:

#### 1. Create Root-Level vercel.json

Create a new file at `d:\PrivateBankBootcamp\v3\vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "client/dist"
      }
    },
    {
      "src": "server/api/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/api/index.js"
    },
    {
      "src": "/assets/(.*)",
      "dest": "client/dist/assets/$1"
    },
    {
      "src": "/(.*)",
      "dest": "client/dist/index.html"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

#### 2. Update client/package.json

Add this script to [client/package.json](client/package.json):

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "lint": "eslint .",
    "preview": "vite preview",
    "vercel-build": "npm run build"  // ADD THIS LINE
  }
}
```

#### 3. Set Environment Variables in Vercel

**For the project**, add these environment variables in Vercel Dashboard → Settings → Environment Variables:

**Frontend Variables:**
```
VITE_API_URL=/api/v1
VITE_API_TIMEOUT=30000
VITE_APP_NAME=Private Bank Bootcamp
```

**Backend Variables:**
```
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_ACCESS_SECRET=your_super_secret_access_key_min_32_chars_long
JWT_REFRESH_SECRET=your_super_secret_refresh_key_min_32_chars_long
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
FRONTEND_URL=https://yourdomain.com
ENABLE_CORS=true

# Add other required env vars from server/.env.example
```

#### 4. Deploy to Vercel

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from root directory
cd d:\PrivateBankBootcamp\v3
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? private-bank-bootcamp
# - In which directory is your code located? ./
# - Override settings? No
```

#### 5. Configure Custom Domain

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain: `yourdomain.com`
3. Follow DNS configuration instructions from Vercel
4. In Hostinger:
   - Add an A record pointing to Vercel's IP (76.76.21.21)
   - OR Add a CNAME record pointing to `cname.vercel-dns.com`

✅ **Result**:
- `https://yourdomain.com` → Frontend
- `https://yourdomain.com/api/v1/*` → Backend API

---

## 🎯 Solution 2: Two Separate Projects (Advanced)

Use this if you specifically need separate deployments for frontend and backend.

### Step-by-Step Instructions:

#### Backend Project Setup

**1. Keep the files we created:**
- `server/vercel.json` ✅ (already created)
- `server/api/index.js` ✅ (already created)

**2. Deploy Backend to Vercel:**

```bash
cd d:\PrivateBankBootcamp\v3\server
vercel

# Follow prompts:
# - Project name? bootcamp-backend
# - Override settings? No
```

**3. Configure Backend Environment Variables:**

Go to Vercel Dashboard → bootcamp-backend → Settings → Environment Variables

Add all variables from [server/.env.example](server/.env.example):
```
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_ACCESS_SECRET=...
JWT_REFRESH_SECRET=...
FRONTEND_URL=https://yourdomain.com
# ... etc
```

**4. Set Backend Custom Domain:**

In Vercel Dashboard → bootcamp-backend → Settings → Domains:
- Add: `api.yourdomain.com`

In Hostinger DNS:
- Add CNAME record: `api` → `cname.vercel-dns.com`

#### Frontend Project Setup

**1. Keep the file we created:**
- `client/vercel.json` ✅ (already created)

**2. Update Frontend Environment:**

Create `client/.env.production`:
```
VITE_API_URL=https://api.yourdomain.com/api/v1
VITE_API_TIMEOUT=30000
VITE_APP_NAME=Private Bank Bootcamp
VITE_APP_URL=https://yourdomain.com
VITE_ENV=production
```

**3. Deploy Frontend to Vercel:**

```bash
cd d:\PrivateBankBootcamp\v3\client
vercel

# Follow prompts:
# - Project name? bootcamp-frontend
# - Override settings? No
```

**4. Configure Frontend Environment Variables:**

Go to Vercel Dashboard → bootcamp-frontend → Settings → Environment Variables

```
VITE_API_URL=https://api.yourdomain.com/api/v1
VITE_API_TIMEOUT=30000
VITE_APP_NAME=Private Bank Bootcamp
VITE_APP_URL=https://yourdomain.com
VITE_ENV=production
```

**5. Set Frontend Custom Domain:**

In Vercel Dashboard → bootcamp-frontend → Settings → Domains:
- Add: `yourdomain.com`

In Hostinger DNS:
- Add CNAME record: `@` → `cname.vercel-dns.com` (for root domain)
- OR Add A record: `@` → `76.76.21.21`

✅ **Result**:
- `https://yourdomain.com` → Frontend
- `https://api.yourdomain.com/api/v1/*` → Backend API

---

## 🔧 Important Backend Modifications

### Remove Database Connection from Serverless Handler

Your current `server/src/server.js` starts the database connection, which won't work in serverless. We need to modify `server/src/app.js`.

**Update [server/src/app.js](server/src/app.js)** - Add at the top:

```javascript
import dotenv from 'dotenv';
import connectDB from './config/database.js';

// Load environment variables
dotenv.config();

// Connect to database (only once, serverless will reuse)
let isConnected = false;

const ensureDbConnection = async () => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
};

// Call before handling requests
ensureDbConnection().catch(err => console.error('DB connection failed:', err));
```

---

## 🚨 Fixing Backend Errors

Common Vercel deployment errors and fixes:

### Error: "Cannot find module"
**Solution**: Make sure all imports use `.js` extension:
```javascript
import app from '../src/app.js';  // ✅ Correct
import app from '../src/app';      // ❌ Wrong
```

### Error: "Database connection timeout"
**Solutions**:
1. Use MongoDB Atlas (not local MongoDB)
2. Whitelist Vercel IPs in MongoDB Atlas (or use 0.0.0.0/0 for all)
3. Ensure MONGODB_URI is set in Vercel environment variables

### Error: "Function timeout"
**Solution**: Add to `server/vercel.json`:
```json
{
  "functions": {
    "api/index.js": {
      "maxDuration": 30
    }
  }
}
```

### Error: Redis/BullMQ not working
**Solution**: Vercel serverless doesn't support long-running workers. Options:
1. Use a separate service for Redis (Upstash, Redis Cloud)
2. Remove BullMQ functionality for Vercel deployment
3. Use Vercel Cron Jobs for scheduled tasks

---

## 📋 Pre-Deployment Checklist

- [ ] MongoDB Atlas database is set up and accessible
- [ ] All environment variables are documented
- [ ] Remove any local-only dependencies (Redis, file uploads to local storage)
- [ ] Test build locally: `npm run build` in both client and server
- [ ] All `.env` files are added to `.gitignore`
- [ ] API endpoints are tested with production database
- [ ] CORS is configured correctly for production domain

---

## 🧪 Testing Your Deployment

After deployment:

1. **Test Frontend**: Visit `https://yourdomain.com`
2. **Test API**: Visit `https://yourdomain.com/api/v1` (or `https://api.yourdomain.com/api/v1`)
3. **Check Logs**: Vercel Dashboard → Your Project → Deployments → Latest → View Function Logs

---

## 💡 Recommendations

1. **Use Solution 1** (Single Project) - It's simpler and has fewer moving parts
2. **Use MongoDB Atlas** for production database (not local MongoDB)
3. **Use Upstash Redis** if you need Redis functionality on Vercel
4. **Use AWS S3 or Cloudinary** for file uploads (not local storage)
5. **Monitor Logs** in Vercel Dashboard to catch errors early

---

## 🆘 Troubleshooting

### "Domain shows backend API instead of frontend"
This happens when you have two projects fighting for the same domain.

**Fix**:
- Remove domain from both projects in Vercel Dashboard
- Delete both projects
- Start fresh with Solution 1 (Single Project)

### "Backend returns 500 errors"
**Check**:
1. Vercel Function Logs for error details
2. Environment variables are set correctly
3. Database connection string is correct
4. All required environment variables are present

### "API calls from frontend fail with CORS error"
**Check**:
1. `FRONTEND_URL` environment variable in backend matches your domain
2. Backend CORS configuration includes your domain
3. Credentials are set correctly in axios configuration

---

## 📞 Need Help?

If you encounter issues:
1. Check Vercel Function Logs
2. Verify all environment variables
3. Test API endpoints directly using Postman/curl
4. Check this guide's troubleshooting section

---

**Last Updated**: 2026-01-01
**Author**: Claude Code Assistant
