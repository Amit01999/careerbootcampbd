# Vercel Environment Variables Configuration

This file lists all environment variables that must be configured in Vercel Dashboard.

## Where to Set Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add each variable below

---

## 🎯 For Single Project Deployment (RECOMMENDED)

### Frontend Variables (VITE_*)

```bash
VITE_API_URL=/api/v1
VITE_API_TIMEOUT=30000
VITE_APP_NAME=Private Bank Bootcamp
VITE_APP_URL=https://yourdomain.com
VITE_ENV=production
VITE_DEBUG=false
```

### Backend Variables

#### Required - Database
```bash
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bootcamp?retryWrites=true&w=majority
DB_NAME=bootcamp
```

#### Required - JWT Authentication
```bash
JWT_ACCESS_SECRET=your_super_secret_access_key_min_32_chars_long_CHANGE_THIS
JWT_REFRESH_SECRET=your_super_secret_refresh_key_min_32_chars_long_CHANGE_THIS
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

#### Required - CORS
```bash
FRONTEND_URL=https://yourdomain.com
ENABLE_CORS=true
```

#### Required - Security
```bash
BCRYPT_ROUNDS=12
SESSION_SECRET=your_session_secret_min_32_chars_long_CHANGE_THIS
```

#### Optional - Email (if using email features)
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
EMAIL_FROM=noreply@bootcamp.com
```

#### Optional - File Storage (if using S3/MinIO)
```bash
S3_ENDPOINT=https://your-s3-endpoint.com
S3_ACCESS_KEY=your-s3-access-key
S3_SECRET_KEY=your-s3-secret-key
S3_BUCKET_NAME=bootcamp-files
S3_REGION=us-east-1
S3_USE_SSL=true
```

#### Optional - Redis (if using Upstash)
```bash
REDIS_URL=redis://default:password@your-upstash-endpoint.upstash.io:6379
```

#### Optional - Firebase (for push notifications)
```bash
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
```

#### Optional - Rate Limiting
```bash
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Optional - File Upload Settings
```bash
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
```

#### Optional - Logging
```bash
LOG_LEVEL=info
```

#### Optional - Exam Settings
```bash
DEFAULT_EXAM_DURATION=60
DEFAULT_QUESTIONS_PER_EXAM=50
ENABLE_NEGATIVE_MARKING=true
NEGATIVE_MARK_PERCENTAGE=0.25
```

---

## 🔐 Generating Secure Secrets

For JWT and session secrets, use strong random strings. You can generate them using:

### On Windows PowerShell:
```powershell
[Convert]::ToBase64String((1..48 | ForEach-Object { Get-Random -Maximum 256 }))
```

### On Mac/Linux:
```bash
openssl rand -base64 48
```

### Online:
Visit [https://www.random.org/strings/](https://www.random.org/strings/) and generate a 48-character string.

---

## 📊 MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist all IPs (0.0.0.0/0) for Vercel access
5. Get your connection string
6. Replace `<username>`, `<password>`, and `<dbname>` in the connection string

Example:
```
mongodb+srv://myuser:mypassword@cluster0.abcde.mongodb.net/bootcamp?retryWrites=true&w=majority
```

---

## 🔧 Setting Variables in Vercel

### Method 1: Via Dashboard (Recommended)
1. Go to project settings
2. Click "Environment Variables"
3. Add each variable with:
   - **Key**: Variable name (e.g., `MONGODB_URI`)
   - **Value**: The actual value
   - **Environment**: Select all (Production, Preview, Development)
4. Click "Save"

### Method 2: Via Vercel CLI
```bash
vercel env add MONGODB_URI
# Enter value when prompted
# Select environments (Production, Preview, Development)
```

### Method 3: Bulk Import via .env file
```bash
vercel env pull .env.vercel
# Edit .env.vercel with all your variables
vercel env add < .env.vercel
```

---

## ⚠️ Important Notes

1. **Never commit** `.env` files to git
2. **Always change** default secrets in production
3. **Use MongoDB Atlas** (not local MongoDB) for Vercel deployment
4. **Whitelist Vercel IPs** or use `0.0.0.0/0` in MongoDB Atlas
5. **Re-deploy** after adding/changing environment variables

---

## 🧪 Verifying Variables

After setting variables, you can check if they're loaded:

1. Deploy your project
2. Go to Vercel Dashboard → Deployments → Latest → View Function Logs
3. Check for any "undefined" environment variable errors

---

## 🆘 Troubleshooting

### "MONGODB_URI is not defined"
- Make sure the variable is set in Vercel Dashboard
- Check spelling and capitalization
- Re-deploy after adding the variable

### "Database connection failed"
- Verify MongoDB Atlas connection string
- Ensure network access is configured (0.0.0.0/0)
- Check database user credentials
- Verify database name in connection string

### "JWT token invalid"
- Ensure JWT secrets are set and match between deployments
- Don't change JWT secrets after users have logged in (invalidates tokens)

---

**Last Updated**: 2026-01-01
