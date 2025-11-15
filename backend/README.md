<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

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

```bash
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
