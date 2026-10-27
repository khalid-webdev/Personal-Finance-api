# Personal Finance Transaction API

A RESTful API for managing personal income, expenses, and transaction
categories, built with Node.js, Express, TypeScript, and MongoDB.

This project is a learning implementation of financial data modeling,
backend architecture, request validation, authentication, and automated
testing, with an emphasis on relational database concepts.

## Tech Stack

- Node.js
- TypeScript (strict mode)
- Express.js
- MongoDB
- Mongoose
- Joi
- pnpm

## Current Status

- Early development — project scaffold and health-check endpoint.
- TypeScript project scaffold with strict mode.
- Express application and health-check endpoint.
- Joi environment configuration validation.
- MongoDB connection setup.
- User schema.
- Transaction category schema and compound unique index

Transaction CRUD, authentication, request validation, and automated
tests are still in development.

## Planned Features

-User registration and login
-Authenticated, user-owned transactions

- Income and expense transaction CRUD
- Transaction categories
- Filtering, sorting, and pagination
- Monthly income and expense summaries
- Joi request validation
- Centralized error handling
- Automated tests

## Getting Started

### Prerequisites

- Node.js (a supported LTS release)
- pnpm
- MongoDB running locally or an accessible MongoDB instance

### Installation

Clone the repository, then run:

```bash
pnpm install
```

Create your local environment file:

```bash
cp .env.example .env
```

On Windows, you can copy `.env.example` to `.env` manually.

Update the environment variables as needed.

### Environment Variables

| Variable    | Description               |
| ----------- | ------------------------- |
| PORT        | HTTP server port          |
| NODE_ENV    | Application environment   |
| MONGODB_URI | MongoDB connection string |

### Development

```bash
pnpm dev
```

### Type Checking

```bash
pnpm typecheck
```

### Production Build

```bash
pnpm build
pnpm start
```

## Health Check

`GET /api/v1/health`

Example response:

```json
{
  "status": "success",
  "message": "Personal Finance API is running"
}
```

## Architecture

The application will progressively use separated layers:

- Routes — define API endpoints
- Controllers — handle HTTP requests and responses
- Services — implement business rules
- Models — define database schemas and queries
- Validators — validate incoming data with Joi
- Middleware — handle authentication and shared request processing
- Config — manage environment configuration and database connections

## Data Modeling Principles

- Each transaction belongs to a user.
- Each transaction references a category.
- Financial amounts are stored as integer minor units.
- Database queries must respect user ownership.
- Pagination and filtering are validated.
- Monthly summaries are calculated using database aggregation.

## Security Principles

- Never store plaintext passwords.
- Validate untrusted request data.
- Keep secrets out of version control.
- Enforce transaction ownership in database queries.
- Return safe, consistent error responses.
- Test authentication and authorization boundaries.

## Testing

Automated tests will be added as the API features are implemented.
The project will include tests for validation, business logic,
authentication, data ownership, and transaction endpoints.

## Learning Goals

- Strict TypeScript in a real backend project
- MongoDB schemas and relational modeling concepts
- REST API architecture
- Authentication and authorization
- Financial data representation
- Aggregation, filtering, and pagination
- Error handling and automated testing

## License

MIT
