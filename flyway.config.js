const { Flyway } = require('node-flywaydb');

const flyway = new Flyway({
  migrationLocations: ['filesystem:db/migrations'],
  driver: 'pg',
  url: process.env.DATABASE_URL || 'jdbc:postgresql://localhost:5432/credit_conditions',
  user: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  baselineOnMigrate: true,
  outOfOrder: false,
  validateOnMigrate: true,
});

module.exports = flyway;
