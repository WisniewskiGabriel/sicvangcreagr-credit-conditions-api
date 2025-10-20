// Flyway configuration for node-flywaydb CLI wrapper
module.exports = {
  flywayArgs: {
    url: 'jdbc:postgresql://db.sgjnlhmzhqyydnstwzki.supabase.co:5432/postgres',
    schemas: 'public',
    locations: 'filesystem:db/migrations',
    user: 'postgres',
    password: process.env.SUPABASE_PASSWORD || '',
    sqlMigrationSuffixes: '.sql',
    baselineOnMigrate: true,
    validateOnMigrate: true,
    outOfOrder: false,
  },
  version: '10.21.0', // Use a recent stable version of Flyway
};
