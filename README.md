# **Justify Text API**

This project is a RESTful API written in **Node.js with TypeScript** that justifies a block of text to ensure each line
contains exactly **80 characters**(80 by default). It supports **token-based authentication** and **rate limiting** via
**Redis**.

The API also uses **Swagger** for API documentation and is **deployed on Render** with a Redis backend running in *
*Docker**.

## **Live Demo**

The API is live at: **[fullstack-habib-sellami.onrender.com](https://fullstack-habib-sellami.onrender.com/api-docs)**



---

## **Table of Contents**

- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Rate Limiting](#rate-limiting)
- [Installation](#installation)
- [Docker Setup](#docker-setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Scripts](#scripts)
- [Testing](#testing)
- [Deployment](#deployment)

---

## **Features**

- **Text Justification**: Ensures text is justified to exactly 80 characters per line.
- **Redis for Rate Limiting**: Limits each token to **80,000 words per day**.
- **Token-based Authentication**: Users must generate tokens via `/api/token`.
- **Dockerized Redis**: Redis is used for rate limiting, managed with Docker Compose.
- **Swagger Documentation**: API endpoints are documented using Swagger that can be accessed at `/api-docs`.
- **TypeScript Support**: Written in TypeScript for type safety and better code quality.
- **Linting & Formatting**: Uses ESLint and Prettier for code consistency.
- **Error Handling**: Custom error handling for better user experience.
- **Unit Testing**: Includes unit tests for all API endpoints.
- **Zod Validation**: Uses Zod for request validation and sanitization.
- **Pre-commit Hooks**: Runs linting and tests before each commit.

---

## **API Endpoints**

### 1. **POST /api/token**

Generates a new authentication token for the given email address.

**Request:**

```json
{
  "email": "foo@bar.com"
}
```

**Response:**

```json
{
  "token": "abc123xyz"
}
```

**Errors:**

- **400 Bad Request**: Email is required.

---

### 2. **POST /api/justify**

Justifies a block of text to exactly **80 characters per line**. Requires an authorization token.

**Request Headers:**

```
Authorization: Bearer <your_token>
Content-Type: text/plain
```

**Request Body:**

```
Your text here.
```

**Response:**

```
Your justified text here.
```

**Errors:**

- **400 Bad Request**: No text provided.
- **401 Unauthorized**: Invalid or missing token.
- **402 Payment Required**: Daily word limit exceeded (80,000 words).

---

## **Rate Limiting**

The API uses **Redis** to track the number of words processed by each token. Every token is allowed to process a maximum
of **80,000 words per day**. If the word count exceeds this limit, the API responds with:

```
402 Payment Required
```

---

## **Installation**

### **Local Setup**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SellamiHabib/FULLSTACK-Habib-Sellami
   cd FULLSTACK-Habib-Sellami
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   ```
3. **Fill the .env file with the required variables**
   ```bash
   PORT=8080
   APP_URL=http://localhost:8080
   JWT_SECRET=PLACEHOLDER
   REDIS_HOST=redis-stack
   REDIS_PASSWORD=PLACEHOLDER
   REDIS_PORT=6379
   ```

---

## **Docker Setup**

This project uses **Docker Compose** to set up Redis.

1. **Install Docker and Docker Compose**:  
   [Get Docker](https://docs.docker.com/get-docker/)

2. **Docker Compose Configuration (`docker-compose.yml`):**

   ```yaml
   version: '3'
   services:
     redis:
       image: redis:alpine
       ports:
         - '6379:6379'
   ```

3. **Start Redis using Docker Compose:**
   ```bash
   docker-compose up -d
   ```

This command will start Redis on **localhost:6379**.

---

## **Environment Variables**

Create a `.env` file with the following variables:

```
PORT=8080
SECRET_KEY=your-secret-key
REDIS_URL=redis://localhost:6379
```

---

## **Usage**

### **Run the Development Server**

```bash
yarn dev
```

The server will start at **http://localhost:8080**.

### **Build for Production**

```bash
yarn build
yarn start
```

---

## **Scripts**

Here are the scripts available in the **package.json**:

- **`start`**: Starts the server using the built JavaScript files.
    ```bash
    yarn start
    ```

- **`dev`**: Starts the server in development mode using **ts-node**.
  ```bash
    yarn dev
  ```
- **`build`**: Compiles the TypeScript files to JavaScript.
  ```bash
    yarn build
    ```
- **`lint`**: Lints the TypeScript files using **ESLint**.
    ```bash
    yarn lint
    ```
- **`test`**: Runs the unit tests using **Jest**.
    ```bash
    yarn test
  ```
- **`test:cov`**: Runs the unit tests and generates a coverage report.
  ```bash
  yarn test:cov
  ```
- **`format`**: Formats the TypeScript files using **Prettier**.
    ```bash
    yarn format
    ```
- **`lint:fix`**: Fixes the linting errors using **ESLint**.
    ```bash
    yarn lint:fix
    ```
- **`type-check`**: Checks the TypeScript types using **tsc**.
    ```bash
    yarn type-check
    ```
- **`with-env`**: Runs a command with environment variables loaded from the `.env` file.
    ```bash
    yarn with-env <env>
    ```

## **Testing**

The API includes unit tests for all the endpoints. You can run the tests using the following command:

```bash

yarn test:cov

```

**Test Coverage:**

![img_1.png](img_1.png)

---

## **Deployment**

The API is deployed on **Render**.

---

## **Acknowledgments**

- **Node.js & TypeScript**: Backend development.
- **Redis**: Rate limiting and caching.
- **Docker**: Container management for Redis.
- **Swagger**: API documentation.
- **Render**: Hosting the API.
- **Zod**: Schema validation.

---
