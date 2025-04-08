---
sidebar_position: 4
title: Restful API 
---

# What is an API and What Are RESTful APIs?

---

## What is an API?

**API** stands for **Application Programming Interface**.
An API is a set of rules and protocols that allows one software application to interact with another. 
Think of it as a contract that specifies how software components should interact.

To better understand, Imagine an API as a restaurant menu. 
The menu lists all the dishes (services) you can order. When you place an order (API request), 
the kitchen (server) prepares it and returns it to you (API response).

### Possibilities opens up by using APIs:
- Allows communication between different systems.
- Makes software modular and reusable.
- Can be public (like weather APIs) or internal to a system.

---

## What is a RESTful API?

**REST** stands for **Representational State Transfer**. 
A **RESTful API** is an API that follows REST architectural principles to interact with resources using 
**HTTP methods**.

### Core REST Principles

#### 1. Resources
- Everything is treated as a resource (e.g., a user, a product, a blog post).
- Resources are represented using URLs.
- Example: `/users/123` represents the user with ID 123.

#### 2. HTTP Methods (Also known as Verbs)
RESTful APIs use standard HTTP methods to perform actions:

| Method  | Action    | Use Case                    |
|---------|-----------|-----------------------------|
| GET     | Read      | Fetch data (e.g., a user)   |
| POST    | Create    | Create new resources        |
| PUT     | Update    | Replace existing resources  |
| PATCH   | Update    | Modify part of a resource   |
| DELETE  | Delete    | Remove a resource           |

#### 3. CRUD Operations
These methods are often associated with the CRUD operations (Create, Read, Update, Delete).
- GET corresponds to "Read".
- POST corresponds to "Create".
- PUT and PATCH correspond to "Update".
- DELETE corresponds to "Delete".

#### 4. Statelessness
Each request from the client to the server must contain all the information the server needs to fulfill the request. The server does **not** store client context between requests.

#### 5. Response Formats
Most REST APIs return data in **JSON** format. Some may support XML or others.

#### 6. HTTP Status Codes
REST APIs use standard HTTP status codes to indicate request success/failure:

| Code | Meaning               | Description                        |
|------|-----------------------|------------------------------------|
| 200  | OK                    | Successful request                 |
| 201  | Created               | Resource created successfully      |
| 400  | Bad Request           | Invalid request format or data     |
| 401  | Unauthorized          | Auth required                      |
| 404  | Not Found             | Resource doesn't exist             |
| 500  | Internal Server Error | Something went wrong on the server |

To Further study about the different standard HTTP status codes, you can check following links:
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
- https://umbraco.com/knowledge-base/http-status-codes/

---

## Tools for Working with APIs

Below are popular tools categorized by their purpose: testing, documentation, design, and mocking.

---

### API Testing & Debugging Tools

#### 1. Postman
- GUI-based API testing tool.
- Send HTTP requests, inspect responses.
- Organize APIs into collections and environments.
- Supports testing, automation, and monitoring.
- [Website](https://www.postman.com/)

#### 2. Insomnia
- Developer-focused API testing tool.
- Cleaner interface compared to Postman.
- Native GraphQL support.
- Great for fast development and debugging.
- [Website](https://insomnia.rest/)

#### 3. Hoppscotch (formerly Postwoman)
- Browser-based open-source Postman alternative.
- Very lightweight and fast.
- Great for quick API checks and demos.
- [Website](https://hoppscotch.io/)

#### 4. curl
- CLI-based tool for making HTTP requests.
- Very powerful for scripting and automation.
- Example:
  ```bash
  curl -X GET https://api.example.com/users
  ```
  
---

# API Documentation & Design Tools

A well-documented API is crucial for developer adoption, collaboration, and maintenance. 
This section covers popular tools and standards used to **design**, **document**, and **visualize** APIs.

---

## OpenAPI Specification (formerly Swagger)

### What is OpenAPI?
OpenAPI is an **open standard** that allows you to describe your RESTful API using a structured format 
(YAML or JSON). It serves as the **blueprint** of your API.

### Why Use It?
- Acts as a **single source of truth** for frontend and backend teams.
- Enables tools to **generate documentation, SDKs, mock servers**, and more.
- Helps automate API testing and validation.

(for further information please check the [website](https://swagger.io/specification/))

---

## Key Tool in the OpenAPI Ecosystem

### Swagger UI
- Converts your OpenAPI spec into **interactive documentation**.
- Lets users **try out endpoints** directly in the browser.
- Supports authentication, custom themes, and plugins.

Example:
```bash
npm install -g swagger-ui
```

---

## API Marketplaces & Discovery

### [RapidAPI](https://rapidapi.com/)
Central hub to find, test, and manage public APIs.
Offers subscription-based access and monitoring.

## Performance & Load Testing Tools

### [K6](https://k6.io/)
Developer-centric load testing tool to write performance test scripts in JavaScript.

### [JMeter](https://jmeter.apache.org/)
Java-based tool for performance and load testing 
which is Highly customizable and used in enterprise environments.