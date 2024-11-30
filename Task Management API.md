
# Task Management API

A RESTful API for managing tasks and user accounts. This API allows users to:

-   Create and manage their account
-   Create, read, update, and delete tasks
-   Filter tasks by status
-   Update their profile

## Authentication

The API uses JWT (JSON Web Token) for authentication. All endpoints except registration and login require a valid JWT token in the Authorization header.

## Base URL

`http://localhost:3000/v1`

## Response Format

All responses follow the format:
{
    "status": "success" | "fail",
    "data": { ... } | { "message": "error message" }
}

## Endpoints

### Authentication

## Register

Creates a new user account.

-   **Method**: POST
-   **URL**: `/auth/register`
-   **Body**:
{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
}
**Success Response** (201 Created):
{
    "status": "success",
    "data": {
        "user": {
            "id": 1,
            "email": "user@example.com",
            "name": "John Doe",
            "createdAt": "2024-11-30T...",
            "updatedAt": "2024-11-30T..."
        },
        "token": "eyJhbGc..."
    }
}
**Error Response** (400 Bad Request):
{
    "status": "fail",
    "message": "Email already exists"
}

## Login

Authenticates user and returns JWT token.

-   **Method**: POST
-   **URL**: `/auth/login`
-   **Body**:
{
    "email": "user@example.com",
    "password": "password123"
}

**Success Response** (200 OK):
{
    "status": "success",
    "data": {
        "user": {
            "id": 1,
            "email": "user@example.com",
            "name": "John Doe"
        },
        "token": "eyJhbGc..."
    }
}
**Error Response** (401 Unauthorized):
{
    "status": "fail",
    "message": "Invalid email or password"
}

### Tasks

## Create Task

Creates a new task for authenticated user.

-   **Method**: POST
-   **URL**: `/tasks`
-   **Headers**: Authorization: Bearer {{jwt}}
-   **Body**:
{
    "title": "Task Title",
    "description": "Task description",
    "dueDate": "2024-12-01T00:00:00.000Z",
    "status": "PENDING"
}
**Success Response** (201 Created):
{
    "status": "success",
    "data": {
        "task": {
            "id": 1,
            "title": "Task Title",
            "description": "Task description",
            "status": "PENDING",
            "dueDate": "2024-12-01T00:00:00.000Z",
            "createdAt": "2024-11-30T...",
            "updatedAt": "2024-11-30T...",
            "userId": 1
        }
    }
}
**Error Response** (400 Bad Request):
{
    "status": "fail",
    "message": "title: Title is required"
}
## Get All Tasks

Retrieves all tasks for authenticated user.

-   **Method**: GET
-   **URL**: `/tasks`
-   **Headers**: Authorization: Bearer {{jwt}}
-   **Query Params**: status (optional) - PENDING | IN_PROGRESS | COMPLETED
-   **Success Response** (200 OK):
{
    "status": "success",
    "data": {
        "tasks": [
            {
                "id": 1,
                "title": "Task Title",
                "description": "Task description",
                "status": "PENDING",
                "dueDate": "2024-12-01T00:00:00.000Z",
                "createdAt": "2024-11-30T...",
                "updatedAt": "2024-11-30T...",
                "userId": 1
            }
        ]
    }
}
## Get Single Task

Retrieves a specific task by ID.

-   **Method**: GET
-   **URL**: `/tasks/:id`
-   **Headers**: Authorization: Bearer {{jwt}}
-   **Success Response** (200 OK):
{
    "status": "success",
    "data": {
        "task": {
            "id": 1,
            "title": "Task Title",
            "description": "Task description",
            "status": "PENDING",
            "dueDate": "2024-12-01T00:00:00.000Z",
            "createdAt": "2024-11-30T...",
            "updatedAt": "2024-11-30T...",
            "userId": 1
        }
    }
}
**Error Response** (404 Not Found):
{
    "status": "fail",
    "message": "Task not found"
}
## Update Task

Updates an existing task.

-   **Method**: PATCH
-   **URL**: `/tasks/:id`
-   **Headers**: Authorization: Bearer {{jwt}}
-   **Body**:
{
    "title": "Updated Title",
    "status": "IN_PROGRESS",
    "description": "Updated description"
}
**Success Response** (200 OK):
{
    "status": "success",
    "data": {
        "task": {
            "id": 1,
            "title": "Updated Title",
            "description": "Updated description",
            "status": "IN_PROGRESS",
            "dueDate": "2024-12-01T00:00:00.000Z",
            "createdAt": "2024-11-30T...",
            "updatedAt": "2024-11-30T...",
            "userId": 1
        }
    }
}
**Error Response** (404 Not Found):
{
    "status": "fail",
    "message": "Task not found"
}
## Delete Task

Deletes a task.

-   **Method**: DELETE
-   **URL**: `/tasks/:id`
-   **Headers**: Authorization: Bearer {{jwt}}
-   **Success Response** (204 No Content)
-   **Error Response** (404 Not Found):
{
    "status": "fail",
    "message": "Task not found"
}
-   **Error Response** (403 Forbidden ):
{ "status": "fail", "message": "Not authorized" }

### User Profile

## Get Profile

Retrieves the authenticated user's profile.

-   **Method**: GET
-   **URL**: `/users/profile`
-   **Headers**: Authorization: Bearer {{jwt}}
-   **Success Response** (200 OK):
{
    "status": "success",
    "data": {
        "user": {
            "id": 1,
            "email": "user@example.com",
            "name": "John Doe",
            "createdAt": "2024-11-30T...",
            "updatedAt": "2024-11-30T..."
        }
    }
}
## Update Profile

Updates the authenticated user's profile information.

-   **Method**: PATCH
-   **URL**: `/users/profile`
-   **Headers**: Authorization: Bearer {{jwt}}
-   **Body**:
{
    "name": "New Name"
}
**Success Response** (200 OK):
{
    "status": "success",
    "data": {
        "user": {
            "id": 1,
            "email": "user@example.com",
            "name": "New Name",
            "createdAt": "2024-11-30T...",
            "updatedAt": "2024-11-30T..."
        }
    }
}
**Error Response** (400 Bad Request):
{
    "status": "fail",
    "message": "name: Must be at least 2 characters"
}






