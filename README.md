# Task Management API

A RESTful API built with Node.js, Express, TypeScript, and MySQL that allows users to manage tasks and their accounts.

## Features
- User authentication with JWT
- CRUD operations for tasks
- Task status management
- User profile management
- Error handling
- Input validation

## Tech Stack
- Node.js
- Express
- TypeScript
- MySQL
- Prisma ORM
- JWT for authentication
- Zod for validation

## Prerequisites
- Node.js (v14+)
- MySQL
- npm/yarn

## Database Setup

1. Install MySQL if you haven't already
2. Login to MySQL:

mysql -u root -p

3. Create database:
CREATE DATABASE task_management;

4. Update .env file with your MySQL credentials:
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/task_management"

Replace YOUR_PASSWORD with your MySQL root password.
Note: Make sure your MySQL server is running before starting the application.

## Installation & Setup

1. Clone the repository

git clone <https://github.com/MustafaMagdyy/Task-Management-API.git>
cd task-management-api

2. Install dependencies
```bash
npm install
```

3. Environment Setup Create a .env file in the root directory and add:
PORT=3000
DATABASE_URL="mysql://user:password@localhost:3306/task_management"
JWT_SECRET=your_secret_key
NODE_ENV=development

4. Database Setup
```bash
npx prisma generate
npx prisma db push
```


5. Start Development Server
```bash
npm run dev
```

## API Documentation
See API.md for detailed API documentation.

## Project Structure
```plaintext
src/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── middlewares/    # Custom middlewares
├── routes/         # Route definitions
├── services/      # Business logic
├── types/         # TypeScript types
├── utils/         # Utility functions
└── app.ts        # Express app setup
```

## Scripts

- npm run dev: Start development server
- npm run build: Build for production
- npm start: Start production server

