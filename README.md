# NardPOS - Mini Inventory Management System

This repository contains the source code for the NardPOS Mini Inventory Management System, a full-stack application built as part of a case study. The project includes a NestJS backend, an Angular frontend, and a MySQL database, all containerized with Docker.

## Tech Stack

- **Backend:** NestJS, TypeORM, Jest
- **Frontend:** Angular, Spartan UI (based on shadcn/ui), TailwindCSS, RxJS
- **Database:** MySQL
- **Deployment:** Docker

## Features

- **Product Management:** Full CRUD (Create, Read, Update, Delete) functionality for products.
- **Search:** Filter products by name.
- **Pagination:** Paginated product list for efficient data handling.
- **Validation:** Robust input validation on both the backend and frontend.
- **API Documentation:** Swagger/OpenAPI documentation for all API endpoints.
- **Containerization:** Fully containerized setup using Docker and Docker Compose for easy deployment.
- **Unit Tests:** Comprehensive unit tests for backend services and frontend components.

## Architecture

### Backend

The backend is built with NestJS and follows a modular architecture. Key patterns and components include:

- **Repository Pattern:** The `ProductRepository` abstracts the data layer, making it easy to manage database interactions.
- **DTOs:** Data Transfer Objects (`create-product.dto.ts`, `update-product.dto.ts`) are used for validating and shaping API request bodies.
- **Services:** Business logic is encapsulated within services (`ProductService`).
- **Controllers:** API endpoints are defined in controllers (`ProductController`), which handle incoming requests and responses.
- **Error Handling:** A global exception filter ensures consistent error responses.

### Frontend

The frontend is a single-page application (SPA) built with Angular. Its architecture emphasizes maintainability and scalability:

- **Component-Based:** The UI is broken down into reusable components for different features (product list, form, details).
- **Reactive Forms:** Forms are built using Angular's Reactive Forms module for robust validation and data handling.
- **Services:** API communication is handled by the `ProductService`, which centralizes HTTP requests.
- **HTTP Interceptor:** An interceptor is used to catch and handle API errors globally, providing a better user experience.
- **Modern UI:** The interface is built with Spartan UI, a modern component library for Angular, and styled with TailwindCSS.

## Getting Started

### Prerequisites

- Node.js 18+
- Docker and Docker Compose
- Git

### Docker Setup (Recommended)

This is the easiest way to get the entire application running.

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd nardpos-fullstack-case-study
    ```

2.  **Create an environment file for the backend:**
    Navigate to the `backend` directory and copy the example environment file:
    ```bash
    cd backend
    cp .env.example .env
    ```
    Update the `.env` file with your database credentials if they differ from the defaults.

3.  **Build and run the containers:**
    From the root directory, run:
    ```bash
    docker-compose up --build
    ```

4.  **Access the applications:**
    - **Frontend:** [http://localhost:4200](http://localhost:4200)
    - **Backend API:** [http://localhost:3000/api](http://localhost:3000/api)
    - **Swagger Docs:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### Local Setup

Follow these steps to run the frontend and backend separately on your local machine.

#### Backend

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up the environment file:**
    Copy `.env.example` to `.env` and configure your MySQL database connection.

4.  **Run the development server:**
    ```bash
    npm run start:dev
    ```

#### Frontend

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm start
    ```
    The frontend will be available at `http://localhost:4200`.

## Running Tests

#### Backend Tests

From the `backend` directory, run:

```bash
npm test
```

To see test coverage:

```bash
npm run test:cov
```

#### Frontend Tests

From the `frontend` directory, run:

```bash
npm test
```

## API Endpoints

The following endpoints are available:

| Method | Endpoint          | Description                                  |
|--------|-------------------|----------------------------------------------|
| POST   | `/api/products`     | Create a new product                         |
| GET    | `/api/products`     | Get all products (supports pagination & search) |
| GET    | `/api/products/:id` | Get details of a single product              |
| PATCH  | `/api/products/:id` | Update an existing product                   |
| DELETE | `/api/products/:id` | Delete a product                             |

### Query Parameters for `GET /api/products`

- `page`: The page number for pagination (default: 1).
- `limit`: The number of items per page (default: 10).
- `search`: A string to search for in product names.
