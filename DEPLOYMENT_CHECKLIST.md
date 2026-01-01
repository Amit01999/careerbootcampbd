# 🚀 Vercel Deployment Checklist - Solution 1 (Single Project)

This checklist ensures you have everything ready for a smooth Vercel deployment.

## ✅ Pre-Deployment Checklist

### 1. Code Preparation
- [x] Root `vercel.json` configured for single project deployment
- [x] Root `package.json` has `vercel-build` script
- [x] Client `package.json` has `vercel-build` script
- [x] Server API wrapper exists at `server/api/index.js`
- [x] Server `app.js` handles database connection for serverless
- [x] Conflicting `vercel.json` files removed from `client/` and `server/` directories
- [x] `.gitignore` files properly exclude `.env` files
- [ ] All `.env` files are in `.gitignore` (never commit secrets!)

### 2. MongoDB Setup
- [ ] MongoDB Atlas account created (free tier works)
- [ ] Database cluster created
- [ ] Database user created with password
- [ ] Network access configured (0.0.0.0/0 for Vercel)
- [ ] Connection string obtained and tested
- [ ] Database name confirmed

### 3. Environment Variables Preparation
- [ ] Review [VERCEL_ENV_VARIABLES.md](VERCEL_ENV_VARIABLES.md)
- [ ] Generate secure JWT secrets (minimum 32 characters)
- [ ] Generate secure session secret (minimum 32 characters)
- [ ] Update `MONGODB_URI` with your Atlas connection string
- [ ] Update `FRONTEND_URL` with your production domain
- [ ] Update `VITE_APP_URL` with your production domain
- [ ] Optional: Configure email (SMTP) settings if needed
- [ ] Optional: Configure S3/file storage if needed

### 4. Git Repository
- [ ] Code pushed to GitHub repository
- [ ] Repository is accessible (public or Vercel has access)
- [ ] All sensitive files are in `.gitignore`
- [ ] `.env` files are NOT committed

### 5. Vercel Account
- [ ] Vercel account created (free tier works)
- [ ] GitHub connected to Vercel
- [ ] Ready to import project

---

## 🎯 Deployment Steps

### Step 1: Push to GitHub

```bash
# Navigate to project root
cd d:\PrivateBankBootcamp\v3

# Check git status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Prepare for Vercel deployment - Solution 1"

# Push to GitHub (replace with your repo URL)
git push origin main
```

### Step 2: Import Project to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as root)
   - **Build Command**: `npm run vercel-build` (auto-detected)
   - **Output Directory**: Leave empty (handled by vercel.json)
   - **Install Command**: `npm install` (auto-detected)

5. Click **"Deploy"** (don't add environment variables yet)

### Step 3: Add Environment Variables

**IMPORTANT**: The first deployment will fail because environment variables are missing. This is expected.

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add all required variables from [VERCEL_ENV_VARIABLES.md](VERCEL_ENV_VARIABLES.md)

**Minimum Required Variables:**
```bash
# Frontend
VITE_API_URL=/api/v1
VITE_API_TIMEOUT=30000
VITE_APP_NAME=Private Bank Bootcamp
VITE_APP_URL=https://your-project.vercel.app
VITE_ENV=production
VITE_DEBUG=false

# Backend
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bootcamp
JWT_ACCESS_SECRET=<your-generated-secret>
JWT_REFRESH_SECRET=<your-generated-secret>
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
FRONTEND_URL=https://your-project.vercel.app
ENABLE_CORS=true
BCRYPT_ROUNDS=12
SESSION_SECRET=<your-generated-secret>
```

4. For each variable:
   - Select **All Environments** (Production, Preview, Development)
   - Click **"Save"**

### Step 4: Redeploy

1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click the **three dots** (⋯) → **"Redeploy"**
4. Check **"Use existing Build Cache"** (optional)
5. Click **"Redeploy"**

### Step 5: Configure Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain (e.g., `yourdomain.com`)
3. Follow Vercel's DNS configuration instructions
4. In your DNS provider (Hostinger, GoDaddy, etc.):
   - Add an **A record**: `@` → `76.76.21.21`
   - OR Add a **CNAME record**: `@` → `cname.vercel-dns.com`
5. Wait for DNS propagation (can take up to 48 hours, usually faster)
6. Update environment variables:
   - `VITE_APP_URL=https://yourdomain.com`
   - `FRONTEND_URL=https://yourdomain.com`
7. Redeploy the project

---

## 🧪 Testing Your Deployment

### 1. Test Frontend
- Visit your deployment URL: `https://your-project.vercel.app`
- Check that the homepage loads correctly
- Verify styling and assets load properly

### 2. Test API
- Visit: `https://your-project.vercel.app/api/v1`
- Should return JSON with API information
- Status code should be 200

### 3. Test Authentication
- Try to register a new user
- Try to log in
- Check that JWT tokens are working

### 4. Check Logs
1. Go to Vercel Dashboard → Your Project
2. Click on **Deployments** → Latest deployment
3. Click **"View Function Logs"**
4. Look for:
   - Database connection success message
   - Any error messages
   - API request logs

### 5. Test API Endpoints
Use browser or Postman to test:
- `GET /api/v1/health` - Health check
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- Other endpoints as needed

---

## 🚨 Troubleshooting

### Deployment fails at build stage
**Check:**
- Build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### "Cannot find module" errors
**Fix:**
- Ensure all imports use `.js` extension in server code
- Check case sensitivity in file paths

### "Database connection failed"
**Check:**
- MongoDB Atlas connection string is correct
- Network access allows 0.0.0.0/0 in MongoDB Atlas
- Database user has correct permissions
- Password in connection string is URL-encoded

### "Environment variable undefined"
**Fix:**
- Verify all required variables are set in Vercel
- Check variable names (case-sensitive)
- Redeploy after adding variables

### "CORS error" when calling API
**Check:**
- `FRONTEND_URL` matches your actual domain
- CORS is enabled in backend (`ENABLE_CORS=true`)
- Both frontend and backend are on same deployment

### Function timeout errors
**Fix:**
- Optimize slow database queries
- Consider increasing timeout in `vercel.json` (max 30s on free tier)
- Check for infinite loops or blocking operations

### "502 Bad Gateway" or "504 Gateway Timeout"
**Check:**
- Database connection is succeeding
- No long-running operations in API handlers
- Check Function Logs for specific errors

---

## 📊 Post-Deployment

### Monitor Your Application
- Check Vercel Analytics for traffic
- Monitor Function Logs for errors
- Set up error tracking (optional: Sentry)

### Enable Vercel Features (Optional)
- **Analytics**: Track page views and performance
- **Speed Insights**: Monitor Core Web Vitals
- **Log Drains**: Export logs to external service

### Optimize for Production
- Enable caching headers (already configured in `vercel.json`)
- Consider adding a CDN for static assets
- Monitor and optimize database queries
- Set up automated backups for MongoDB

---

## 🔄 Updating Your Deployment

Every time you push to GitHub:
1. Vercel automatically detects the push
2. Starts a new build
3. Deploys if build succeeds
4. You can preview before promoting to production

Manual deployment:
```bash
cd d:\PrivateBankBootcamp\v3
vercel --prod
```

---

## 📞 Support Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Vercel Discord**: https://vercel.com/discord
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com/
- **Deployment Guide**: [VERCEL_DEPLOYMENT_GUIDE.md](VERCEL_DEPLOYMENT_GUIDE.md)
- **Environment Variables**: [VERCEL_ENV_VARIABLES.md](VERCEL_ENV_VARIABLES.md)

---

## ✅ Success Criteria

Your deployment is successful when:
- ✅ Homepage loads at your domain
- ✅ `/api/v1` endpoint returns JSON
- ✅ User registration works
- ✅ User login works
- ✅ No errors in Function Logs
- ✅ Database queries execute successfully
- ✅ All frontend features work correctly

---

**Ready to deploy?** Follow the steps above and you'll have your application live in minutes!

**Last Updated**: 2026-01-01
