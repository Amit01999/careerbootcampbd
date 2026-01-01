# 🚀 Private Bank Bootcamp - Deployment Guide

Complete deployment guide for the Private Bank Bootcamp platform.

---

## 📋 Prerequisites

- Docker & Docker Compose installed
- Node.js 18+ (for local development)
- MongoDB 7+ (if not using Docker)
- Redis 7+ (if not using Docker)
- MinIO or AWS S3 account

---

## 🏃 Quick Start (Docker Compose)

### 1. Clone and Setup

```bash
cd /path/to/PrivateBankBootcamp/v3

# Create environment files
cp server/.env.example server/.env
cp client/.env.example client/.env
```

### 2. Configure Environment Variables

Edit `server/.env`:

```env
# IMPORTANT: Change these in production!
JWT_ACCESS_SECRET=your_super_secret_access_key_min_32_chars_long
JWT_REFRESH_SECRET=your_super_secret_refresh_key_min_32_chars_long
SESSION_SECRET=your_session_secret_min_32_chars_long

# Email Configuration (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@bankbootcamp.com

# Firebase (for push notifications)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email

# Payment Gateway (configure when ready)
PAYMENT_PROVIDER=dummy # Change to bkash/nagad/rocket
PAYMENT_API_KEY=your_payment_api_key
PAYMENT_WEBHOOK_SECRET=your_webhook_secret
```

Edit `client/.env`:

```env
VITE_API_URL=http://localhost/api/v1
```

### 3. Start All Services

```bash
# Build and start all containers
docker-compose up -d

# View logs
docker-compose logs -f

# Check status
docker-compose ps
```

### 4. Access the Platform

- **Frontend**: http://localhost
- **API**: http://localhost/api/v1
- **API Health**: http://localhost/api/v1/health
- **MinIO Console**: http://localhost:9001 (minioadmin / minioadmin123)

### 5. Create Admin User

```bash
# Connect to MongoDB
docker exec -it bootcamp-mongodb mongosh -u admin -p admin123 --authenticationDatabase admin

# Switch to bootcamp database
use bootcamp

# Create admin user
db.users.insertOne({
  firstName: "Admin",
  lastName: "User",
  email: "admin@bootcamp.com",
  phone: "+8801700000000",
  password: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5eo5nF3SoJv1e", // password: admin123
  role: "super_admin",
  isActive: true,
  isEmailVerified: true,
  createdAt: new Date(),
  updatedAt: new Date()
})

# Exit
exit
```

### 6. Login and Start Using

Visit http://localhost/auth and login with:
- Email: `admin@bootcamp.com`
- Password: `admin123`

---

## 🛠️ Local Development (Without Docker)

### Backend Setup

```bash
cd server

# Install dependencies
npm install

# Start MongoDB (separate terminal)
mongod

# Start Redis (separate terminal)
redis-server

# Start MinIO (separate terminal)
minio server ./data --console-address ":9001"

# Start backend
npm run dev

# Start worker (separate terminal)
npm run worker
```

### Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

Access:
- Frontend: http://localhost:8080
- Backend API: http://localhost:5000/api/v1

---

## 📦 Production Deployment

### Option 1: Docker Compose (Recommended)

```bash
# Update docker-compose.yml for production
# Set environment variables properly
# Configure SSL certificates

docker-compose -f docker-compose.yml up -d
```

### Option 2: Cloud Deployment (AWS/Azure/GCP)

#### Backend Deployment

```bash
cd server

# Install production dependencies only
npm ci --production

# Build if needed
npm run build

# Start with PM2
pm2 start src/server.js --name bootcamp-api
pm2 start src/workers/index.js --name bootcamp-worker

# Save PM2 configuration
pm2 save
pm2 startup
```

#### Frontend Deployment

```bash
cd client

# Build for production
npm run build

# Output will be in dist/ folder
# Serve with NGINX or deploy to Vercel/Netlify
```

### Option 3: Kubernetes

```bash
# Apply Kubernetes manifests (create these based on docker-compose.yml)
kubectl apply -f k8s/
```

---

## 🔒 SSL/HTTPS Setup

### Using Let's Encrypt (Certbot)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is set up automatically
sudo certbot renew --dry-run
```

### Manual SSL Certificate

1. Place certificates in `nginx/ssl/`:
   - `fullchain.pem`
   - `privkey.pem`

2. Uncomment HTTPS server block in `nginx/nginx.conf`

3. Restart NGINX:
   ```bash
   docker-compose restart nginx
   ```

---

## 📊 Monitoring & Logs

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f worker

# Last 100 lines
docker-compose logs --tail=100 backend
```

### Health Checks

```bash
# API Health
curl http://localhost/api/v1/health

# MongoDB Status
docker exec bootcamp-mongodb mongosh --eval "db.adminCommand('ping')"

# Redis Status
docker exec bootcamp-redis redis-cli ping
```

---

## 🔄 Backup & Restore

### MongoDB Backup

```bash
# Backup
docker exec bootcamp-mongodb mongodump --uri="mongodb://admin:admin123@localhost:27017/bootcamp?authSource=admin" --out=/backup

# Copy to host
docker cp bootcamp-mongodb:/backup ./backup-$(date +%Y%m%d)

# Restore
docker exec bootcamp-mongodb mongorestore --uri="mongodb://admin:admin123@localhost:27017/bootcamp?authSource=admin" /backup
```

### Automated Backups

Add to crontab:

```bash
# Daily backup at 2 AM
0 2 * * * /path/to/backup-script.sh
```

---

## 🐛 Troubleshooting

### Backend Won't Start

```bash
# Check logs
docker-compose logs backend

# Common issues:
# 1. MongoDB connection - verify MONGODB_URI
# 2. Missing environment variables
# 3. Port conflicts - change PORT in .env
```

### Frontend Not Loading

```bash
# Check if backend is accessible
curl http://localhost/api/v1/health

# Rebuild frontend
docker-compose build frontend
docker-compose up -d frontend
```

### File Upload Fails

```bash
# Check MinIO is running
docker-compose ps minio

# Verify S3 credentials in server/.env
# Create bucket manually if needed
```

### Worker Not Processing Jobs

```bash
# Check Redis connection
docker exec bootcamp-redis redis-cli ping

# Check worker logs
docker-compose logs worker

# Restart worker
docker-compose restart worker
```

---

## 🔧 Maintenance

### Update Dependencies

```bash
# Backend
cd server && npm update

# Frontend
cd client && npm update

# Rebuild containers
docker-compose build
docker-compose up -d
```

### Database Migrations

```bash
# Run migrations
cd server && npm run migrate
```

### Clear Cache

```bash
# Clear Redis cache
docker exec bootcamp-redis redis-cli FLUSHALL
```

---

## 📈 Scaling

### Horizontal Scaling

```bash
# Scale backend instances
docker-compose up -d --scale backend=3

# Scale worker instances
docker-compose up -d --scale worker=2
```

### Load Balancer Setup

Add NGINX load balancing configuration for multiple backend instances.

---

## 🔐 Security Checklist

- [ ] Change all default passwords and secrets
- [ ] Configure SSL/HTTPS
- [ ] Set up firewall rules
- [ ] Enable rate limiting (already configured in NGINX)
- [ ] Configure CORS properly
- [ ] Set up intrusion detection
- [ ] Enable audit logging
- [ ] Regular security updates
- [ ] Backup encryption
- [ ] 2FA for admin accounts

---

## 📞 Support

For issues or questions:
- Check logs first
- Review this documentation
- Create an issue on GitHub

---

## ✅ Post-Deployment Checklist

- [ ] All services running
- [ ] Admin user created
- [ ] Can login successfully
- [ ] Can upload questions
- [ ] Can create exams
- [ ] Can take exams
- [ ] Results are calculated correctly
- [ ] Payments work (or dummy payment works)
- [ ] Notifications are sent
- [ ] Job circulars can be created
- [ ] Backup system configured
- [ ] Monitoring set up
- [ ] SSL certificates installed
- [ ] Domain configured

---

🎉 **Deployment Complete!**

Your Private Bank Bootcamp platform is now live!
