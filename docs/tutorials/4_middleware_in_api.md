---
sidebar_position: 5
title: Middleware In API Design
---

# Middleware in API Design

Middleware is a foundational concept in designing robust APIs. It provides a structured way to process requests and responses, allowing for modular and maintainable logic such as authentication, validation, logging, and more.

This document provides an overview of middleware, its common use cases, and how to implement it using TypeScript (Express), along with best practices and examples.

---

## What is Middleware?

**Middleware** is a function that executes during the **request-response cycle** in a web server. Middleware functions can:

- Inspect and modify the **request** and **response** objects.
- Perform operations like **logging**, **authentication**, or **validation**.
- **End** the request-response cycle early.
- Pass control to the **next** middleware using `next()`.

Frameworks like **Express.js**, **Flask**, **Django**, and **ASP.NET** make extensive use of middleware.

---

## Why should we use Middleware?

Middleware helps you:
- Separate concerns.
- Keep code clean and reusable.
- Handle cross-cutting concerns like logging, security, etc.
- Build scalable API architectures.

---

## Common use cases of Middleware

Below are the most common and useful types of middleware functions used in API design:

---

### 1. Authentication and Authorization

Middleware can verify that a request has proper credentials (like a [JWT](https://jwt.io/introduction)) and check if the user has the right permissions.

```ts
// authMiddleware.ts
import { Request, Response, NextFunction } from 'express';

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers['authorization'];

  if (!token || token !== 'Bearer mytoken') {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  // In real-world apps, decode and verify token
  req.user = { id: '123', role: 'admin' }; // Example
  next();
}
```

---

### 2. Logging

Use logging middleware to monitor incoming requests, which is essential for debugging and analytics.
It will helps trace problems and understand API usage patterns.

```ts
// logger.ts
import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction): void {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
}
```

---

### 3. Input Validation

Ensure that incoming data (body, query, headers) is valid before processing it and prevents bad or malicious data from 
reaching your core logic.

```ts
// validateUser.ts
import { Request, Response, NextFunction } from 'express';

export function validateUser(req: Request, res: Response, next: NextFunction): void {
  const { email } = req.body;

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    res.status(400).json({ error: 'Invalid email format' });
    return;
  }

  next();
}
```

However, this can be done in other ways like using [Zod library](https://zod.dev/) for TypeScript 
schema declaration and validation.

Similar to this, there is a built-in feature for python named [data class](http://docs.python.org/3/library/dataclasses.html) 
which has been added in version 3.7 and being used since.

---

### 4. Error Handling

A centralized place to catch and handle errors throughout your app to Keeps your error responses consistent and 
manageable.

```ts
// errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
}
```

---

### 5. CORS Handling

CORS middleware controls which origins can access your API, typically used when connecting a frontend hosted elsewhere 
which Enables safe cross-origin communication with web apps.

```ts
// corsMiddleware.ts
import { Request, Response, NextFunction } from 'express';

export function corsMiddleware(req: Request, res: Response, next: NextFunction): void {
  res.setHeader('Access-Control-Allow-Origin', 'https://example.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
}
```

---

### 6. Rate Limiting

Rate limiting protects your API from being overwhelmed or abused by limiting the number of requests per client/IP to 
deters abuse and preserves server performance.

```ts
// limiter.ts
import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});
```

---

## Best Practices for Middleware

There are series of best practices that can be followed when using/creating middleware for you APIs which are:
- Keep middleware small and focused on a single task.
- Always handle errors and edge cases properly.
- Use external libraries for common tasks like logging or CORS.
- Apply middleware selectively where needed (global vs route-specific).
- Ensure the correct order of middleware — it affects behavior!

---

## Summary table of different type of Middleware use cases

| Use Case         | What It Does                     | Benefit                            |
|------------------|----------------------------------|------------------------------------|
| Authentication   | Verifies identity                | Secure endpoints                   |
| Logging          | Logs method, URL, time           | Debugging and monitoring           |
| Input Validation | Checks request data              | Prevent bad input                  |
| Error Handling   | Catches and handles exceptions   | Consistent error response          |
| CORS Handling    | Controls allowed origins         | Enables frontend-backend comms     |
| Rate Limiting    | Limits number of client requests | Prevents abuse and server overload |

