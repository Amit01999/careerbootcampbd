# Private Bank Bootcamp - Backend API

Production-ready Node.js/Express backend for the Private Bank Bootcamp job preparation platform.

## Features

- **JWT Authentication** with access and refresh tokens
- **Role-based Access Control** (Student, Admin, Super Admin)
- **Question Bank Management** with PDF/Excel parsing
- **Dynamic Exam Engine** with randomization and auto-grading
- **Payment Integration** (dummy adapter, ready for bKash/Nagad)
- **Job Circulars Management**
- **Real-time Notifications** (in-app and push via Firebase)
- **PDF Report Generation** for exam results
- **Background Job Processing** with BullMQ
- **S3-compatible File Storage**
- **Comprehensive Logging** with Winston
- **Security** with Helmet, rate limiting, input sanitization
- **API Documentation** (Swagger/OpenAPI ready)

## Tech Stack

- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Cache/Queue:** Redis with BullMQ
- **Storage:** S3-compatible (MinIO/AWS S3)
- **Authentication:** JWT with bcrypt
- **File Processing:** pdf-parse, xlsx
- **PDF Generation:** PDFKit
- **Push Notifications:** Firebase Admin SDK
- **Validation:** express-validator, Joi
- **Testing:** Jest, Supertest

## Prerequisites

- Node.js >= 18.0.0
- MongoDB >= 7.0
- Redis >= 7.0
- S3-compatible storage (MinIO for local development)

## Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
```

## Environment Variables

See `.env.example` for all required variables. Key configurations:

```env
# Database
MONGODB_URI=mongodb://admin:admin123@localhost:27017/bootcamp?authSource=admin

# Redis
REDIS_URL=redis://localhost:6379

# JWT Secrets (CHANGE IN PRODUCTION!)
JWT_ACCESS_SECRET=your_super_secret_access_key
JWT_REFRESH_SECRET=your_super_secret_refresh_key

# S3 Storage
S3_ENDPOINT=http://localhost:9000
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin123
S3_BUCKET_NAME=bootcamp-files

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

## Running Locally

### Option 1: Direct Run

```bash
# Development mode with hot reload
npm run dev

# Start worker process (in separate terminal)
npm run worker

# Production mode
npm start
```

### Option 2: Docker Compose (Recommended)

```bash
# From project root
docker-compose up

# This starts:
# - MongoDB
# - Redis
# - MinIO (S3)
# - Backend API
# - Worker process
# - Frontend
```

## Project Structure

```
server/
├── src/
│   ├── config/          # Configuration files (database, redis, s3, etc.)
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware (auth, validation, error handling)
│   ├── models/          # Mongoose models
│   ├── routes/          # Express routes
│   ├── services/        # Business logic services
│   ├── utils/           # Utility functions
│   ├── workers/         # Background job processors
│   ├── app.js           # Express app setup
│   └── server.js        # Server entry point
├── uploads/             # Temporary file uploads
├── logs/                # Application logs
├── package.json
└── README.md
```

## Database Models

### Core Models:
- **User** - Student and admin accounts
- **Question** - Question bank with MCQ/viva questions
- **QuestionFile** - Uploaded question files (PDF/Excel) with parsing status
- **Exam** - Exam configurations and sections
- **ExamAttempt** - User exam attempts with answers and scores
- **Payment** - Payment transactions
- **Circular** - Job circulars
- **Notification** - In-app and push notifications
- **Settings** - System settings
- **AuditLog** - Activity audit trail

## API Endpoints

### Authentication (`/api/v1/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `POST /refresh` - Refresh access token
- `POST /logout` - Logout user
- `GET /me` - Get current user
- `PUT /profile` - Update profile
- `PUT /password` - Change password
- `POST /fcm-token` - Register FCM token for push notifications

### Exams (`/api/v1/exams`)
- `GET /` - List all exams (with filters)
- `GET /:id` - Get exam details
- `POST /:id/start` - Start exam attempt
- `PUT /attempts/:id/save` - Save progress (autosave)
- `POST /attempts/:id/submit` - Submit exam
- `GET /attempts/:id/result` - Get exam result
- `GET /my-attempts` - Get user's attempt history
- `GET /:id/leaderboard` - Get exam leaderboard

*(Additional endpoints for payments, circulars, notifications, admin features - see full API documentation)*

## Background Jobs

The system uses BullMQ with Redis for background job processing:

1. **Question File Processing** - Parse uploaded PDF/Excel files
2. **PDF Report Generation** - Generate exam result PDFs
3. **Notification Delivery** - Send push notifications, emails, SMS
4. **Auto-submit Expired Exams** - Automatically submit expired attempts

### Running Workers

```bash
# Start worker process
npm run worker
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:ci

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## Database Seeding

```bash
# Seed database with sample data
npm run seed
```

This creates:
- Admin user (admin@bootcamp.com / Admin@123)
- 100 sample questions across subjects
- 5 sample exams
- 10 job circulars

## Security Features

- **Password Hashing** with bcrypt (12 rounds)
- **JWT Authentication** with access/refresh token rotation
- **HTTP-only Cookies** for refresh tokens
- **Rate Limiting** on authentication and sensitive endpoints
- **Input Validation** with express-validator
- **NoSQL Injection Prevention** with express-mongo-sanitize
- **XSS Protection** with helmet
- **CORS** configuration
- **Request Logging** and audit trails

## Performance Optimizations

- **Database Indexing** on frequently queried fields
- **Connection Pooling** for MongoDB
- **Redis Caching** for session data
- **Compression** middleware
- **Pagination** for list endpoints
- **Background Job Processing** for heavy tasks
- **Stateless API** design for horizontal scaling

## Deployment

### Deploy to Render

1. Create new Web Service on Render
2. Connect your GitHub repository
3. Configure environment variables in Render dashboard
4. Deploy:

```bash
# Render auto-detects Node.js and runs:
npm install
npm start
```

### Deploy to Railway

1. Create new project on Railway
2. Add MongoDB and Redis services
3. Connect GitHub repo
4. Configure environment variables
5. Railway auto-deploys on push

### MongoDB Atlas Setup

1. Create cluster at mongodb.com
2. Create database user
3. Whitelist IP addresses (or 0.0.0.0/0 for development)
4. Get connection string
5. Update MONGODB_URI in environment variables

### Redis Cloud Setup

1. Create database at redis.com or upstash.com
2. Get connection URL
3. Update REDIS_URL in environment variables

## Monitoring and Logging

- **Winston Logger** for structured logging
- Logs stored in `logs/` directory
- Separate files for errors and combined logs
- Console output in development
- JSON format for production (easy parsing)

### Log Levels:
- `error` - Error events
- `warn` - Warning events
- `info` - Informational messages
- `http` - HTTP requests
- `debug` - Debugging information

## Troubleshooting

### MongoDB Connection Issues
```bash
# Check MongoDB is running
docker ps | grep mongo

# View MongoDB logs
docker logs bootcamp-mongodb
```

### Redis Connection Issues
```bash
# Check Redis is running
docker ps | grep redis

# Test Redis connection
redis-cli ping
```

### File Upload Issues
- Check `uploads/temp` directory exists and is writable
- Verify S3 credentials in .env
- Check MinIO is running (if using local S3)

### Worker Not Processing Jobs
- Ensure Redis is running and accessible
- Check worker logs for errors
- Verify BullMQ connection to Redis

## API Documentation

Full API documentation available at `/api/v1/docs` when running in development mode.

To generate OpenAPI/Swagger documentation:
```bash
npm run docs:generate
```

## Contributing

1. Create feature branch
2. Write tests for new features
3. Ensure all tests pass
4. Run linter and fix issues
5. Submit pull request

## License

MIT

## Support

For issues and questions:
- GitHub Issues: https://github.com/yourusername/private-bank-bootcamp/issues
- Email: support@bootcamp.com
