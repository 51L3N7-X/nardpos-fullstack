# Quick Start Guide - NardPOS Backend

## Option 1: Development with Docker MySQL (Recommended)

### 1. Start MySQL with Docker
```bash
# Start MySQL container
docker-compose -f docker-compose.dev.yml up -d

# Check if MySQL is running
docker-compose -f docker-compose.dev.yml ps
```

### 2. Set up environment
```bash
cd backend
cp .env.example .env
```

### 3. Install dependencies and start backend
```bash
npm install
npm run start:dev
```

### 4. Access the application
- **API**: http://localhost:3000
- **Swagger Documentation**: http://localhost:3000/api

## Option 2: Full Docker Stack

### Run everything with Docker
```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

## Option 3: Local MySQL Installation

### 1. Install MySQL locally
Download and install MySQL 8.0+ from https://dev.mysql.com/downloads/

### 2. Create database
```sql
CREATE DATABASE nard_inventory;
```

### 3. Update .env file
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=nard_inventory
PORT=3000
```

### 4. Start backend
```bash
cd backend
npm install
npm run start:dev
```

## Testing the API

### Using curl
```bash
# Create a product
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "sku": "SKU123",
    "price": 1000.00,
    "quantity": 5
  }'

# Get all products
curl http://localhost:3000/products

# Get product by ID
curl http://localhost:3000/products/1
```

### Using Swagger UI
Visit http://localhost:3000/api for interactive API documentation.

## Stopping Services

### Docker MySQL only
```bash
docker-compose -f docker-compose.dev.yml down
```

### Full Docker stack
```bash
docker-compose down
```

## Troubleshooting

### MySQL Connection Issues
1. Make sure MySQL container is running: `docker ps`
2. Check MySQL logs: `docker-compose -f docker-compose.dev.yml logs mysql`
3. Verify database exists: Connect to MySQL and run `SHOW DATABASES;`

### Backend Issues
1. Check if port 3000 is available
2. Verify .env file configuration
3. Check backend logs for detailed error messages
