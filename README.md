# Ticket API Backend - Candidate Assessment

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new)

A TypeScript backend API with pagination for managing support tickets. This project demonstrates REST API design, database integration, and comprehensive testing with Vitest.

**Your task is to implement pagination for these tickets.**

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: SQLite (better-sqlite3)
- **Testing**: Vitest + Supertest (in-memory DB for tests)
- **Dev Tools**: tsx (for hot-reload development)

## Prerequisites

### Option 1: Local Development

- Node.js 18+
- npm or yarn

### Option 2: Dev Container (Recommended for Interviews)

- [Docker](https://www.docker.com/products/docker-desktop)
- [VS Code](https://code.visualstudio.com/)
- [Dev Containers Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

**Or use [GitHub Codespaces](https://github.com/features/codespaces)** for zero-setup development in the browser!

## Quick Start

### Using Dev Container (Recommended)

1. Open the project in VS Code
2. Press `F1` and select "Dev Containers: Reopen in Container"
3. Wait for the container to build and start
4. Everything is automatically set up! 🎉

The server will be running at http://localhost:3000

See [.devcontainer/README.md](.devcontainer/README.md) for more details.

### Local Installation

```bash
npm install
```

## Running the Application

### Development Mode (with hot-reload)

```bash
npm run dev
```

The database will be automatically initialized and seeded with sample data on first run.

### Production Build

```bash
npm run build
npm start
```

The server will start on `http://localhost:3000`

### Database Management

```bash
# Manually seed/reseed the database
npm run db:seed
```

The SQLite database file is stored in `data/tickets.db`. Tests use an in-memory database for isolation.

## API Endpoints

### 1. Get All Tickets (Paginated)

```
GET /api/v1/tickets
```

**Query Parameters:**

- `page` (optional): Page number, default is 1
- `limit` (optional): Items per page, default is 10, max is 100
- `status` (optional): Filter by status (`open`, `in-progress`, `closed`)
- `priority` (optional): Filter by priority (`low`, `medium`, `high`, `urgent`)

**Example Requests:**

```bash
# Get first page with default limit (10)
curl http://localhost:3000/api/v1/tickets

# Get page 2 with 5 items per page
curl http://localhost:3000/api/v1/tickets?page=2&limit=5

# Filter by status
curl http://localhost:3000/api/v1/tickets?status=open

# Filter by priority
curl http://localhost:3000/api/v1/tickets?priority=urgent

# Combined filters
curl http://localhost:3000/api/v1/tickets?status=open&priority=high&page=1&limit=5
```

**Response:**

> TODO

### 2. Get Single Ticket

```
GET /api/v1/tickets/:id
```

**Example Request:**

```bash
curl http://localhost:3000/api/v1/tickets/1
```

**Response:**

```json
{
  "id": "1",
  "title": "Fix login page bug",
  "description": "Users unable to login with special characters in password",
  "status": "open",
  "priority": "high",
  "createdAt": "2025-09-15T10:00:00Z",
  "updatedAt": "2025-09-15T10:00:00Z",
  "assignee": "john.doe@example.com"
}
```

### 3. Health Check

```
GET /health
```

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2025-10-01T12:00:00.000Z"
}
```

## Running Tests

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Coverage

The test suite includes:

- ✅ Pagination functionality
- ✅ Query parameter validation
- ✅ Filtering by status and priority
- ✅ Edge cases (invalid parameters, out of range pages)
- ✅ 404 error handling
- ✅ Data structure validation
- ✅ Health check endpoint

## Project Structure

```
.
├── src/
│   ├── __tests__/
│   │   └── tickets.test.ts      # Vitest test suite
│   ├── db/
│   │   ├── database.ts          # Database initialization
│   │   └── seed.ts              # Database seeding
│   ├── repositories/
│   │   └── ticketRepository.ts  # Database operations
│   ├── routes/
│   │   └── tickets.ts           # Ticket routes
│   ├── types/
│   │   └── ticket.ts            # TypeScript types
│   ├── utils.ts                 # Utility functions
│   └── server.ts                # Express server setup
├── data/
│   └── tickets.db               # SQLite database (auto-generated)
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

## Candidate Assessment Tasks

This project can be used for assessing candidates on the following tasks:

### Easy Tasks

1. Add a new filter parameter (e.g., filter by assignee)
2. Add input validation for query parameters
3. Add a new field to the Ticket type

### Medium Tasks

1. Implement sorting (by date, priority, status)
2. Add a POST endpoint to create new tickets
3. Implement search functionality (search by title/description)
4. Add request logging middleware

### Hard Tasks

1. ~~Replace mock data with a database~~ ✅ Already implemented with SQLite!
2. Add POST/PUT/DELETE endpoints for CRUD operations
3. Implement authentication and authorization
4. Add rate limiting
5. Implement WebSocket support for real-time updates
6. Add full-text search functionality
7. Migrate to PostgreSQL with connection pooling

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
```

## Development Container

This project includes a complete development container configuration that provides:

- ✅ **Zero Setup** - Candidates can start coding immediately
- ✅ **Consistent Environment** - Same setup for everyone
- ✅ **All Tools Included** - TypeScript, testing, database tools
- ✅ **VS Code Extensions** - Pre-configured with recommended extensions
- ✅ **GitHub Codespaces Ready** - Work entirely in the browser

Perfect for candidate assessments! See [.devcontainer/README.md](.devcontainer/README.md) for details.
