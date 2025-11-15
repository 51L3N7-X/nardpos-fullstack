# NardPOS Backend - Mini Inventory Management API

This is the backend service for the NardPOS Inventory Management System built with NestJS, TypeORM, and MySQL.

## Features

- **CRUD Operations**: Complete product management (Create, Read, Update, Delete)
- **Search & Pagination**: Search products by name with pagination support
- **Validation**: Input validation using class-validator
- **Documentation**: Swagger/OpenAPI documentation
- **Testing**: Comprehensive unit tests with Jest
- **Database**: MySQL with TypeORM
- **Docker**: Containerized deployment

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/products` | Create a new product |
| GET | `/products` | Get all products (paginated & search) |
| GET | `/products/:id` | Get details of a product |
| PATCH | `/products/:id` | Update a product |
| DELETE | `/products/:id` | Delete a product |

## Product Model

| Field | Type | Notes |
|-------|------|-------|
| id | int | Primary key, auto-increment |
| name | nvarchar | Required |
| sku | nvarchar | Unique |
| price | decimal | Must be positive |
| quantity | int | Default = 0 |
| createdAt | datetime | Auto-generated |

## Prerequisites

- Node.js 18+
- MySQL 8+
- npm or yarn

## Installation

```bash
$ npm install
```

## Environment Setup

1. Copy the environment example file:
```bash
$ cp .env.example .env
```

2. Update the `.env` file with your database configuration:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=root
DB_NAME=nard_inventory
PORT=3000
```

## Database Setup

Make sure MySQL is running and create the database:
```sql
CREATE DATABASE nard_inventory;
```

The application will automatically create the tables using TypeORM synchronization.

## Running the Application

```bash
# development
$ npm run start

# watch mode (recommended for development)
$ npm run start:dev

# production mode
$ npm run start:prod
```

The application will be available at:
- **API**: http://localhost:3000
- **Swagger Documentation**: http://localhost:3000/api

## Testing

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov

# watch mode
$ npm run test:watch
```

## Docker

Build and run with Docker:

```bash
# Build the image
$ docker build -t nardpos-backend .

# Run the container
$ docker run -p 3000:3000 --env-file .env nardpos-backend
```

## Project Structure

```
src/
├── config/           # Configuration files
├── controllers/      # API controllers
├── dto/             # Data Transfer Objects
├── entities/        # TypeORM entities
├── modules/         # NestJS modules
├── repositories/    # Repository pattern implementation
├── services/        # Business logic services
└── main.ts         # Application entry point
```

## API Usage Examples

### Create a Product
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "sku": "SKU123",
    "price": 1000.00,
    "quantity": 5
  }'
```

### Get All Products with Search
```bash
curl "http://localhost:3000/products?search=laptop&page=1&limit=10"
```

### Get Product by ID
```bash
curl http://localhost:3000/products/1
```

### Update a Product
```bash
curl -X PATCH http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Laptop",
    "price": 1200.00
  }'
```

### Delete a Product
```bash
curl -X DELETE http://localhost:3000/products/1
```

## License

This project is licensed under the MIT License.
