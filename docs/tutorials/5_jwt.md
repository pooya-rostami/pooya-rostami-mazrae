---
sidebar_position: 6
title: JWT
---

## What is a JWT?

A **JSON Web Token (JWT)** is a secure way of transmitting information between parties as a **JSON object**. It's widely used in **authentication systems**, where servers need a way to verify the identity of clients (e.g., browsers or mobile apps) without storing session state on the server.

Each JWT contains three base64-encoded components:

1. **Header**: Specifies the signing algorithm (e.g., HS256) and token type (usually “JWT”).
2. **Payload**: Holds user-related data (also called **claims**). This can include things like `userId`, `email`, `roles`, etc.
3. **Signature**: Created by hashing the encoded header and payload with a secret key using the algorithm specified in the header.

Example:
```
Header:    {"alg": "HS256", "typ": "JWT"}
Payload:   {"userId": 123, "email": "joe@example.com"}
Signature: HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
```

JWTs are **not encrypted** by default — they are merely encoded. So **never store sensitive data** like passwords in them.

---

## Why Use JWT?

JWTs are popular in modern web and mobile development for several reasons:

### 1. Stateless Authentication
JWT enables stateless authentication, meaning the server doesn’t need to keep a session or track user state. This is ideal for:

- RESTful APIs
- Microservices
- Serverless environments

No need for database lookups on every request — user identity is self-contained in the token.

---

### 2. Scalability
JWTs allow your backend to scale horizontally with ease. There’s no need to sync session data between instances, making it great for distributed or cloud-native systems.

---

### 3. Cross-domain and Cross-platform Support
JWTs are platform-agnostic and can be used across:

- Browsers
- Mobile apps
- IoT devices
- Microservices

They're transmitted via standard HTTP headers or URLs and don’t rely on cookies.

---

### 4. Fine-grained Control via Claims
JWTs support custom claims, enabling:

- Role-based access control (RBAC)
- Scoped permissions
- Expiration management

---

### 5. Widely Supported
JWT libraries are available for most modern languages and frameworks, making integration easy.

---

## Alternatives to JWT

### 1. Session-Based Authentication

**How it works:**
- Server stores user session in memory or database.
- Client gets a session ID, usually via a cookie.
- Each request includes the session ID.

**Pros:**
- Simple and secure (especially with cookies + HTTPS)
- Easy session revocation

**Cons:**
- Requires stateful server
- Difficult to scale horizontally

**Best for:** Traditional server-rendered web apps.

---

### 2. [OAuth 2.0](https://oauth.net/2/) + Access Tokens

**How it works:**
- Involves authorization servers and resource servers.
- Often uses JWT as access tokens.

**Pros:**
- Secure and standardized
- Supports scopes, delegated access

**Cons:**
- More complex to implement
- Overkill for small-scale apps

**Best for:** APIs needing 3rd-party access (e.g., “Login with Google”).

---

### 3. API Keys

**How it works:**
- Static API key is sent with requests.

**Pros:**
- Simple to implement
- Good for service-to-service authentication

**Cons:**
- No user identity
- No expiration or standard revocation

**Best for:** Internal APIs or machine-to-machine auth.

---

### 4. Paseto (Platform-Agnostic Security Tokens)

**How it works:**
- Secure alternative to JWT with built-in encryption options.

**Pros:**
- Safer by design
- Easier to audit
- No insecure algorithms

**Cons:**
- Less widely adopted
- Fewer libraries

**Best for:** Apps wanting JWT-style features with better defaults.

---

## Setting Up JWT in a Node.js + Express + TypeScript Project

### Setup & Dependencies

```bash
npm init -y
npm install express jsonwebtoken dotenv
npm install --save-dev typescript ts-node @types/express @types/jsonwebtoken
npx tsc --init
```

### Project Structure

```
jwt-auth-demo/
├── src/
│   ├── index.ts
│   ├── auth.ts
│   └── types.ts
├── .env
├── tsconfig.json
```

### .env

```
JWT_SECRET=supersecretkey123
```

---

## Example TypeScript Code

### `types.ts`

```ts
export interface UserPayload {
  id: number;
  email: string;
}
```

---

### `auth.ts`

```ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserPayload } from './types';

const SECRET = process.env.JWT_SECRET || 'fallback_secret';

export function generateToken(user: UserPayload): string {
  return jwt.sign(user, SECRET, { expiresIn: '1h' });
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user as UserPayload;
    next();
  });
}
```

---

### `index.ts`

```ts
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { generateToken, authenticateToken } from './auth';
import { UserPayload } from './types';

dotenv.config();
const app = express();
app.use(express.json());

const PORT = 3000;

const dummyUser: UserPayload = { id: 1, email: 'test@example.com' };

app.post('/login', (req: Request, res: Response) => {
  const token = generateToken(dummyUser);
  res.json({ token });
});

app.get('/protected', authenticateToken, (req: Request, res: Response) => {
  res.json({
    message: 'Access granted to protected route',
    user: req.user
  });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
```

---

## How to Test JWT Auth

### 1. Get a Token

Use [Postman](https://www.postman.com/) or `curl`:

```bash
curl -X POST http://localhost:3000/login
```

You’ll receive a JSON response:

```json
{ "token": "eyJhbGciOi..." }
```

### 2. Access Protected Route

```bash
curl -H "Authorization: Bearer <your_token>" http://localhost:3000/protected
```

You should see a success message and user data if the token is valid.
However, you can also take the JSON response and paste it to the [JWT debugger](https://jwt.io/#debugger-io) to see 
and check the result.

---

## Good Practices

- **Use HTTPS** in production to prevent token interception.
- **Set reasonable expiration times** (`expiresIn`) and implement token refresh strategies.
- **Blacklist tokens** on logout (especially for critical apps).
- Avoid storing JWTs in `localStorage` if possible (consider `HttpOnly` cookies for XSS protection).

---

## Summary

JWTs provide a fast, scalable, and secure way to handle authentication in modern applications. With this approach:

- Users authenticate once and receive a token.
- The token is used on every request to prove their identity.
- The server doesn’t have to store session state — it's all in the token.

JWTs are a key piece of modern [**REST APIs**](3_restful_api.md), **microservices**, and **serverless architectures**.