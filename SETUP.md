# Setup Summary

## Project Overview
This project has been set up as a NestJS API with Flyway database migrations for managing credit conditions.

## Installed Technologies

### Core Framework
- **NestJS**: v11.0.1 (latest version)
- **Node.js**: v20.x compatible
- **TypeScript**: v5.7.3

### Database
- **Supabase**: PostgreSQL cloud database
- **Flyway**: v10.21.0 for database migrations (via node-flywaydb wrapper)

### Development Tools
- **ESLint**: v9.18.0 with TypeScript support
- **Prettier**: v3.4.2 for code formatting
- **Jest**: v30.0.0 for testing


## Project Structure

```
.
├── db/
│   └── migrations/           # Flyway SQL migration files
│       └── V1__Initial_schema.sql
├── src/
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts         # Root module with TypeORM config
│   ├── app.service.ts
│   └── main.ts               # Application entry point
├── test/
│   ├── app.e2e-spec.ts       # E2E tests
│   └── jest-e2e.json
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── docker-compose.yml        # Local PostgreSQL setup
├── flyway.config.js          # Flyway configuration
├── package.json              # Dependencies and scripts
├── README.md                 # Project documentation
└── tsconfig.json             # TypeScript configuration
```

## Available Scripts

### Development
- `npm run start:dev` - Start development server with hot reload
- `npm run start:debug` - Start in debug mode
- `npm run start` - Start in normal mode

### Building
- `npm run build` - Build the project

### Testing
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage
- `npm run test:e2e` - Run end-to-end tests

### Code Quality
- `npm run lint` - Lint and auto-fix code
- `npm run format` - Format code with Prettier

### Database Migrations
- `npm run migration:run` - Apply all pending migrations
- `npm run migration:info` - Show migration status
- `npm run migration:validate` - Validate migration files
- `npm run migration:baseline` - Baseline existing database
- `npm run migration:clean` - Clean database (CAUTION!)

## Quick Start Guide

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. **Run database migrations**
   ```bash
   npm run migration:run
   ```

4. **Start development server**
   ```bash
   npm run start:dev
   ```

## Environment Variables

Required environment variables:
- `SUPABASE_PASSWORD` - Your Supabase database password
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_KEY` - Your Supabase anon key
- `PORT` - Application port (default: 3000)
- `NODE_ENV` - Environment (default: development)

## Database Schema

The initial migration (V1__Initial_schema.sql) creates:
- `credit_conditions` table with fields:
  - id (SERIAL PRIMARY KEY)
  - name (VARCHAR 255)
  - description (TEXT)
  - interest_rate (DECIMAL 5,2)
  - min_credit_score (INTEGER)
  - max_loan_amount (DECIMAL 15,2)
  - created_at (TIMESTAMP)
  - updated_at (TIMESTAMP)
- Index on `name` field for faster lookups

## Key Configuration Details

### Database Configuration
- Supabase PostgreSQL cloud database
- Connection configured via Flyway for migrations
- No ORM - direct SQL queries as needed

### Flyway Configuration
- Located in `flyway.config.js`
- Migrations stored in `db/migrations/`
- SQL files follow naming: `V{version}__{description}.sql`
- Baseline on migrate enabled for existing databases

## Next Steps

1. Add your business logic entities
2. Create corresponding database migrations
3. Implement API endpoints
4. Add authentication/authorization
5. Configure production database
6. Set up CI/CD pipelines

## Testing Status

All initial tests passing:
- ✅ Lint check
- ✅ Build process
- ✅ Unit tests (1/1 passing)
- ✅ Application startup

## Notes

- Database migrations should be run before starting the application
- Never use `migration:clean` in production
- Add new migrations with incrementing version numbers (V2, V3, etc.)
- TypeORM synchronize is disabled - use Flyway for all schema changes
