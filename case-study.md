# NardPOS — Full-Stack Developer Case Study

## TechStack

- **Frontend:** Reactjs (bonus)
- **Backend:** nestjs
- **Deployment:** Docker
- **Database:** mySQL

***

## Objective

Evaluate your ability to design, implement, and test a small full-stack module using the same stack we use at NardPOS:  
NestJS, Angular, MySQL, TypeORM, Docker, and Jest.

**Assessment Criteria:**
- API & database design (TypeORM)
- Angular frontend development
- Code quality, modularity, and scalability
- Unit testing & best practices
- Containerization (Docker setup)

***

## Scenario

You are joining the NardPOS engineering team as a full-stack developer.  
Your task is to build a **Mini Inventory Management Module** — a simplified version of the real NardPOS inventory system.

**The module should allow:**
- Adding, editing, and deleting products
- Viewing a paginated product list
- Searching by product name
- Viewing detailed product information

***

## Requirements

### 1. Backend (NestJS + TypeORM + MySQL)

Build a RESTful API with the following endpoints:

| Method  | Endpoint          | Description                |
| ------- | ----------------- | -------------------------- |
| POST    | /products         | Create a new product       |
| GET     | /products         | Get all products (paginated & search) |
| GET     | /products/:id     | Get details of a product   |
| PUT     | /products/:id     | Update a product           |
| DELETE  | /products/:id     | Delete a product           |

**Product Model**

| Field      | Type      | Notes                       |
| ---------- | --------- | --------------------------- |
| id         | int       | Primary key, auto-increment |
| name       | nvarchar  | Required                    |
| sku        | nvarchar  | Unique                      |
| price      | decimal   | Must be positive            |
| quantity   | int       | Default = 0                 |
| createdAt  | datetime  | Auto-generated              |

**Backend Requirements:**
- Use NestJS + TypeORM with MySQL
- Implement DTOs, Validation Pipes, and Error Handling
- Use Repository pattern (product.repository.ts)
- Add Swagger documentation for all endpoints
- Include Unit Tests using Jest for at least:
  - ProductService (business logic)
  - ProductController (API layer)

**Example test:**
```typescript
it('should create a new product', async () => {
  const result = await service.create({ name: 'Laptop', sku: 'SKU123', price: 1000, quantity: 5 });
  expect(result).toHaveProperty('id');
});
```

***

### 2. Frontend (Angular 17+)

Build a simple Angular UI for managing products:

#### Pages

- **Product List**
  - Displays a table of all products (id, name, sku, price, quantity)
  - Search bar to filter by product name
  - “Add Product” and “Edit” buttons

- **Add / Edit Product**
  - Reactive form with validation
  - Validation: name required, price > 0

- **Product Details**
  - Shows all product info
  - Optional: Include delete confirmation modal

**Frontend Requirements:**
- Use Angular 17+ with TypeScript
- Use Angular Material or any UI library
- Use HTTP Interceptors for API calls
- Include at least 1 unit test for a component or service
- Optional: add toaster/snackbar notifications

***

### 3. Database (MySQL)

- Create a database named `nard_inventory`
- Table: `products`
- Connect via TypeORM configuration
- Use migrations or synchronize schema

**Example .env**
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=root
DB_NAME=nard_inventory
```

***

### 4. Docker Setup

Provide a docker-compose.yml that runs:
- Backend (NestJS)
- Frontend (Angular)
- MySQL

**Example:**
```yaml
version: '3.8'
services:
  mysql:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: nard_inventory
    ports:
      - "3306:3306"

  backend:
    build: ./backend
    ports:
      - "3000:3000"
    depends_on:
      - mysql
    env_file:
      - ./backend/.env

  frontend:
    build: ./frontend
    ports:
      - "4200:80"
    depends_on:
      - backend
```
Each service should include a Dockerfile.

***

### 5. Bonus Points

- Implement JWT authentication
- Add sorting & filtering in the product list
- Add GitHub Actions for CI/CD with Jest tests
- Include pagination in the API & UI
- Provide test data seeding script

***

## Deliverables

Submit a GitHub repository or ZIP file containing:

```
nardpos-fullstack-case-study/
├── backend/
│   ├── src/
│   ├── test/
│   ├── Dockerfile
│   ├── package.json
│   ├── .env.example
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   ├── package.json
├── docker-compose.yml
└── README.md
```

Your `README.md` should include:
- Setup steps
- How to run locally & via Docker
- How to run tests
- Design & architecture notes

***

## Evaluation Criteria

| Area                       | Weight | Description                                  |
| -------------------------- | ------ | --------------------------------------------- |
| Backend (NestJS + TypeORM) | 30%    | Clean API design, validation, error handling  |
| Frontend (Angular)         | 25%    | Functional, responsive, clean structure       |
| Code Quality & Structure   | 20%    | Clean, modular, readable code                |
| Testing (Jest/Karma)       | 15%    | Quality & coverage of unit tests              |
| Docker / Setup             | 10%    | Works out-of-the-box with docker-compose up   |
| Bonus (JWT, CI, Pagination)| +5%    | Extra effort & creativity                     |

***

## Submission

- **Deadline:** 72 hours from receiving the case study
- **Delivery:** GitHub repository (preferred) or ZIP archive
- **Optional:** Record a 3–5 minute Loom/video explaining your design & thought process

***

## Recommended Versions

- Node.js: 18+
- NestJS: 10+
- Angular: 17+
- TypeORM: 0.3+
- MySQL: 8+
- Docker / Compose: Latest
- Testing: Jest (Backend), Karma (Frontend)

***

[1](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/106709525/5287791c-b83d-4592-9a57-c0f8c3362142/Fullstack-NardPOS-Case-Study-1.pdf)