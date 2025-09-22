# Server - Remember Nguyen Backend

## 📋 Description
Backend API server built with NestJS, supporting multi-domain (Remember Nguyen, Babysen, Phoenix, Southern Saturday) with e-commerce and CMS features.

## 🛠 Tech Stack
- **Framework**: NestJS
- **Database**: PostgreSQL (Sequelize ORM)
- **Cache**: Redis
- **NoSQL**: MongoDB (Mongoose)
- **Authentication**: JWT
- **File Storage**: AWS S3
- **Email**: AWS SES
- **Payment**: Stripe
- **Bot**: Telegram Bot
- **Language**: TypeScript

## 📁 Directory Structure
```
server/
├── src/
│   ├── app/                    # Main modules
│   │   ├── auth/              # Authentication
│   │   ├── users/             # User management
│   │   ├── ecom/              # E-commerce modules
│   │   │   ├── product/       # Product management
│   │   │   ├── order/         # Order management
│   │   │   ├── cart/          # Shopping cart
│   │   │   └── ...
│   │   └── ...
│   ├── config/                # Configuration files
│   ├── databases/             # Database providers
│   ├── middlewares/           # Custom middlewares
│   └── utils/                 # Utility functions
├── migrations/                # Database migrations
├── seeders/                   # Database seeders
└── prisma/                    # Prisma schema (if used)
```

## 🚀 Installation and Setup

### System Requirements
- Node.js >= 16
- PostgreSQL >= 12
- Redis >= 6
- MongoDB >= 4.0

### 1. Install Dependencies
```bash
cd server
npm install
# or
yarn install
```

### 2. Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Update values in .env
# - Database credentials
# - JWT secrets
# - AWS credentials
# - API keys
```

### 3. Database Setup
```bash
# Run migrations
npm run migrate

# Run seeders (if needed)
npm run seed:all
```

### 4. Run Application
```bash
# Development mode
npm run dev

# Production mode
npm run start:prod

# Build
npm run build
```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Run with watch mode
npm run start:debug      # Run with debug mode

# Database
npm run migrate          # Run migrations
npm run migrate:undo     # Rollback migration
npm run seed:all         # Run all seeders
npm run make:seed        # Create new seeder

# Build & Production
npm run build           # Build application
npm run start:prod      # Run production
npm run start:stg       # Run staging

# Testing
npm run test            # Run unit tests
npm run test:e2e        # Run e2e tests
npm run test:cov        # Run tests with coverage
```

## 🌐 API Endpoints

### Authentication
- `POST /auth/login` - Login
- `POST /auth/register` - Register
- `POST /auth/refresh` - Refresh token

### Users
- `GET /users` - Get users list
- `GET /users/:id` - Get user info
- `PUT /users/:id` - Update user

### E-commerce
- `GET /ecom/products` - Get products list
- `POST /ecom/products` - Create new product
- `GET /ecom/orders` - Get orders list
- `POST /ecom/cart` - Add to cart

## 🔐 Environment Variables

### Database
```env
DATABASE_HOST=127.0.0.1
DATABASE_PORT=25432
DATABASE_USERNAME=dev_user
DATABASE_PASSWORD=your_password
DATABASE_DB=dev_web
```

### MongoDB
```env
MONGODB_HOST=localhost
MONGODB_PORT=27016
MONGODB_DB=tool
MONGODB_USERNAME=admin
MONGODB_PASSWORD=your_password
```

### Redis
```env
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_password
```

### JWT
```env
JWT_SECRET=your_jwt_secret
JWT_EXPIRED_IN=604800
JWT_ACCESS_TOKEN_EXPIRED_IN=604000000
```

### AWS
```env
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region
AWS_S3_BUCKET=your_bucket_name
```

## 🐳 Docker

### Run with Docker Compose
```bash
cd docker
docker-compose up -d postgres mongodb redis
docker-compose up -d serverapp
```

### Build Docker Image
```bash
docker build -t remember-nguyen-server .
```

## 📊 Monitoring & Logs

### Logs
- Logs are stored in `logs/` directory
- Using Winston with daily rotation
- Format: `app-YYYY-MM-DD.log`

### Health Check
- `GET /health` - Check server status
- `GET /health/db` - Check database connection

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📝 API Documentation

After running the server, access:
- Swagger UI: `http://localhost:4001/api-docs`
- API Documentation: `http://localhost:4001/docs`

## 🔄 Deployment

### Production
```bash
# Build
npm run build

# Start
npm run start:prod
```

### Production Environment Variables
Make sure to update all environment variables for production:
- Database credentials
- JWT secrets
- AWS credentials
- API keys
- CORS settings

## 🆘 Troubleshooting

### Common Issues

1. **Database connection failed**
   - Check PostgreSQL service
   - Check credentials in .env

2. **Redis connection failed**
   - Check Redis service
   - Check port and password

3. **JWT errors**
   - Check JWT_SECRET in .env
   - Ensure secret is strong enough

4. **File upload errors**
   - Check AWS S3 credentials
   - Check bucket permissions

## 📞 Support

- **Developer**: Tuan PT
- **Email**: [your-email@domain.com]
- **Documentation**: [link-to-docs]

## 📄 License

UNLICENSED - Private project
