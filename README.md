# 🎓 Private Bank Bootcamp
## Smart Job Preparation Platform (Bank Exam Focused)

A comprehensive MERN stack platform for Bangladesh private bank job preparation with online exams, job circulars, and instant results.

## 🚀 Quick Deploy to Vercel

This project is **ready for Vercel deployment** as a single, unified project. No additional code changes needed!

**To deploy:**
1. Push to GitHub
2. Import to Vercel
3. Set environment variables
4. Deploy!

📖 **Deployment Guides:**
- **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Step-by-step deployment guide
- **[VERCEL_DEPLOYMENT_GUIDE.md](VERCEL_DEPLOYMENT_GUIDE.md)** - Comprehensive Vercel guide
- **[VERCEL_ENV_VARIABLES.md](VERCEL_ENV_VARIABLES.md)** - All environment variables explained

---

## 🌟 Features

### For Students
- ✅ User registration and authentication
- ✅ Browse and purchase exam packages
- ✅ Take randomized online exams with timer
- ✅ Instant results with detailed analysis
- ✅ Subject-wise performance tracking
- ✅ Exam history and progress reports
- ✅ Job circular notifications
- ✅ Payment integration (bKash/Nagad/Rocket ready)

### For Administrators
- ✅ Upload questions via PDF/Excel
- ✅ Auto-parse and review questions
- ✅ Create and manage exams
- ✅ Publish job circulars
- ✅ View analytics and reports
- ✅ User management
- ✅ Payment tracking
- ✅ System settings

---

## 🏗️ Tech Stack

### Frontend
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **UI Library:** shadcn/ui (Radix UI + Tailwind CSS)
- **State Management:** React Query + Context API
- **Routing:** React Router v6
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** MongoDB 7
- **Cache/Queue:** Redis + BullMQ
- **Storage:** MinIO (S3-compatible)
- **Authentication:** JWT
- **Validation:** express-validator + Joi
- **File Processing:** PDF-parse, XLSX
- **Notifications:** Firebase Cloud Messaging

### Infrastructure
- **Containerization:** Docker + Docker Compose
- **Reverse Proxy:** NGINX
- **Process Manager:** PM2 (production)
- **Logging:** Winston + Morgan

---

## 📦 Installation

### Prerequisites
- Docker & Docker Compose (recommended)
- Node.js 18+ (for local development)
- MongoDB 7+
- Redis 7+

### Quick Start with Docker

```bash
# Clone the repository
cd PrivateBankBootcamp/v3

# Configure environment variables
cp server/.env.example server/.env
cp client/.env.example client/.env

# Edit .env files with your configuration
# IMPORTANT: Change JWT secrets and other sensitive data!

# Start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

**Access the platform:**
- Frontend: http://localhost
- API: http://localhost/api/v1
- MinIO Console: http://localhost:9001

### Create Admin User

```bash
docker exec -it bootcamp-mongodb mongosh -u admin -p admin123 --authenticationDatabase admin

use bootcamp

db.users.insertOne({
  firstName: "Admin",
  lastName: "User",
  email: "admin@bootcamp.com",
  phone: "+8801700000000",
  password: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5eo5nF3SoJv1e",
  role: "super_admin",
  isActive: true,
  isEmailVerified: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

**Login:** admin@bootcamp.com / admin123

---

## 🚀 Development

### Backend

```bash
cd server
npm install
npm run dev        # Start dev server
npm run worker     # Start background worker
```

### Frontend

```bash
cd client
npm install
npm run dev        # Start dev server (http://localhost:8080)
```

---

## 📖 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication
All authenticated requests require Bearer token:
```
Authorization: Bearer <access_token>
```

### Main Endpoints

**Authentication**
- POST `/auth/register` - Register new user
- POST `/auth/login` - Login
- POST `/auth/logout` - Logout
- GET `/auth/me` - Get current user

**Exams (Student)**
- GET `/exams` - List all exams
- GET `/exams/:id` - Get exam details
- POST `/exams/:id/start` - Start exam attempt
- POST `/exams/attempts/:id/submit` - Submit exam
- GET `/exams/attempts/:id/result` - Get result

**Admin - Questions**
- POST `/admin/questions` - Create question
- POST `/admin/questions/upload` - Upload question file
- GET `/admin/questions/files` - List uploaded files
- PUT `/admin/questions/files/:id/approve/:index` - Approve question

**Admin - Exams**
- POST `/admin/exams` - Create exam
- PATCH `/admin/exams/:id/publish` - Publish exam
- GET `/admin/exams/:id/statistics` - Get analytics

**Circulars**
- GET `/circulars` - List job circulars
- GET `/circulars/:id` - Get circular details
- POST `/admin/circulars` - Create circular (admin)

**Payments**
- POST `/payments/initiate` - Initiate payment
- GET `/payments/my-payments` - Payment history

**Notifications**
- GET `/notifications` - Get notifications
- GET `/notifications/unread-count` - Unread count
- PATCH `/notifications/:id/read` - Mark as read

Full API documentation: See [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 📁 Project Structure

```
v3/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   ├── contexts/    # React contexts
│   │   ├── lib/         # Utilities
│   │   └── App.tsx
│   └── Dockerfile
│
├── server/              # Node.js backend
│   ├── src/
│   │   ├── controllers/ # Route handlers
│   │   ├── routes/      # API routes
│   │   ├── models/      # MongoDB schemas
│   │   ├── middleware/  # Express middleware
│   │   ├── services/    # Business logic
│   │   ├── workers/     # Background jobs
│   │   └── server.js
│   └── Dockerfile
│
├── nginx/               # NGINX configuration
├── docker-compose.yml   # Docker orchestration
└── DEPLOYMENT.md        # Deployment guide
```

---

## 🔐 Security Features

- JWT-based authentication with token rotation
- Password hashing with bcrypt
- Rate limiting on API endpoints
- Input validation and sanitization
- MongoDB injection protection
- XSS protection
- CORS configuration
- Helmet.js security headers
- Audit logging for admin actions

---

## 📊 Key Metrics

- **API Endpoints:** 60+
- **Database Models:** 10
- **Frontend Components:** 70+
- **UI Components (shadcn):** 55+
- **Languages:** English + Bangla (বাংলা)

---

## 🧪 Testing

```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

---

## 📝 Environment Variables

### Backend (.env)

```env
# Server
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb://admin:admin123@localhost:27017/bootcamp?authSource=admin

# Redis
REDIS_URL=redis://localhost:6379

# JWT (CHANGE THESE!)
JWT_ACCESS_SECRET=your_super_secret_access_key_32_chars_min
JWT_REFRESH_SECRET=your_super_secret_refresh_key_32_chars_min

# S3 Storage
S3_ENDPOINT=http://localhost:9000
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin123

# Email
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Firebase (for push notifications)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key

# Payment
PAYMENT_PROVIDER=dummy  # Change to bkash/nagad/rocket
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api/v1
```

---

## 📚 Documentation

- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Complete deployment guide
- **[IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md)** - Implementation details
- **[SRS Document](SRS_JOB%20Prep%20Platform_31%20oct.pdf)** - Requirements specification

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check MongoDB connection
docker-compose logs mongodb

# Verify environment variables
cat server/.env

# Check port conflicts
lsof -i :5000
```

### Frontend errors
```bash
# Clear cache and rebuild
cd client
rm -rf node_modules dist
npm install
npm run build
```

### Database issues
```bash
# Reset database
docker-compose down -v
docker-compose up -d
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests
5. Submit a pull request

---

## 📄 License

MIT License - See LICENSE file for details

---

## 👥 Team

- **Project:** Smart Job Preparation Platform
- **Client:** Private Bank Bootcamp
- **Target:** Bangladesh Private Bank Job Candidates

---

## 📞 Support

For issues or questions:
1. Check the [DEPLOYMENT.md](DEPLOYMENT.md) guide
2. Review logs: `docker-compose logs`
3. Create an issue on GitHub

---

## 🎯 Roadmap

- [x] Core exam system
- [x] Job circulars
- [x] Payment integration structure
- [x] Admin dashboard
- [x] Docker deployment
- [ ] Mobile apps (Android/iOS)
- [ ] AI-powered question recommendations
- [ ] Live exam proctoring
- [ ] Video tutorials
- [ ] Community forums

---

## ⭐ Features Highlight

- **Instant Results** - Get scores immediately after submission
- **Smart Randomization** - Different question sets for each student
- **Progress Tracking** - Detailed analytics and improvement graphs
- **Bilingual** - Full English and Bangla support
- **Mobile Ready** - Responsive design for all devices
- **Scalable** - Supports 5000+ concurrent users
- **Secure** - Bank-grade security measures

---

**🚀 Ready to deploy? See [DEPLOYMENT.md](DEPLOYMENT.md)**

**📊 Want implementation details? See [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md)**

---

Made with ❤️ for Bangladesh Private Bank Job Aspirants
