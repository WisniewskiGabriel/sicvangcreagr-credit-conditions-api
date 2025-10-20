# sicvangcreagr-credit-conditions-api

A NestJS API for managing credit conditions with Flyway database migrations.

## Prerequisites

- Node.js (v20 or higher)
- npm (v10 or higher)
- PostgreSQL database

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sicvangcreagr-credit-conditions-api
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit the `.env` file with your database credentials:
```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=credit_conditions
```

## Database Setup

### Using Docker (Recommended for Development)

Start PostgreSQL using Docker Compose:
```bash
docker-compose up -d
```

Stop PostgreSQL:
```bash
docker-compose down
```

Stop and remove all data:
```bash
docker-compose down -v
```

### Running Migrations

This project uses Flyway for database migrations. The migrations are stored in `db/migrations/`.

Run migrations:
```bash
npm run migration:run
```

Other migration commands:
```bash
npm run migration:info      # Show migration status
npm run migration:validate  # Validate migrations
npm run migration:baseline  # Baseline existing database
npm run migration:clean     # Clean database (use with caution!)
```

### Migration File Naming Convention

Flyway migration files follow the pattern: `V<version>__<description>.sql`

Example: `V1__Initial_schema.sql`

## Running the Application

Development mode with hot reload:
```bash
npm run start:dev
```

Production mode:
```bash
npm run build
npm run start:prod
```

Debug mode:
```bash
npm run start:debug
```

## Testing

Run unit tests:
```bash
npm run test
```

Run e2e tests:
```bash
npm run test:e2e
```

Run tests with coverage:
```bash
npm run test:cov
```

## Code Quality

Format code:
```bash
npm run format
```

Lint code:
```bash
npm run lint
```

## Project Structure

```
.
├── db/
│   └── migrations/          # Flyway SQL migration files
├── src/
│   ├── app.controller.ts    # Main application controller
│   ├── app.module.ts        # Root application module
│   ├── app.service.ts       # Main application service
│   └── main.ts              # Application entry point
├── test/                    # E2E tests
├── .env.example             # Environment variables template
├── flyway.config.js         # Flyway configuration
├── migrate.js               # Migration runner script
├── nest-cli.json            # NestJS CLI configuration
├── package.json             # Dependencies and scripts
└── tsconfig.json            # TypeScript configuration
```

## Technology Stack

- **NestJS** (v11) - Progressive Node.js framework
- **TypeORM** - ORM for TypeScript and JavaScript
- **PostgreSQL** - Relational database
- **Flyway** - Database migration tool
- **Jest** - Testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting

## License

UNLICENSED
