# sicvangcreagr-credit-conditions-api

A NestJS API for managing credit conditions with Flyway database migrations.

## Prerequisites

- Node.js (v20 or higher)
- npm (v10 or higher)
- Supabase account and project

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
Create a `.env` file with your Supabase credentials:
```
SUPABASE_PASSWORD=your-supabase-password
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-anon-key
PORT=3000
NODE_ENV=development
```

## Database Setup

### Using Supabase Cloud

This project is configured to use Supabase PostgreSQL cloud database. Make sure you have:
1. Created a Supabase project
2. Added your database credentials to the `.env` file

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
- **Supabase** - PostgreSQL cloud database
- **Flyway** - Database migration tool
- **Jest** - Testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting

## License

UNLICENSED
