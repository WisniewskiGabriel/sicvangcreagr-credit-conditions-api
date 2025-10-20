// Flyway configuration for node-flywaydb CLI wrapper
module.exports = {
  flywayArgs: {
    url: process.env.DATABASE_URL || 'jdbc:postgresql://localhost:5432/credit_conditions',
    schemas: 'public',
    locations: 'filesystem:db/migrations',
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    sqlMigrationSuffixes: '.sql',
    baselineOnMigrate: true,
    validateOnMigrate: true,
    outOfOrder: false,
  },
  version: '10.21.0', // Use a recent stable version of Flyway
};
