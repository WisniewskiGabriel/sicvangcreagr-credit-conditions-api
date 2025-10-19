#!/usr/bin/env node

const flyway = require('./flyway.config');

const command = process.argv[2] || 'migrate';

(async () => {
  try {
    console.log(`Running Flyway ${command}...`);
    
    switch (command) {
      case 'migrate':
        const migrateResult = await flyway.migrate();
        console.log('Migration successful!');
        console.log('Migrations applied:', migrateResult.migrationsExecuted);
        break;
        
      case 'info':
        const infoResult = await flyway.info();
        console.log('Migration info:', JSON.stringify(infoResult, null, 2));
        break;
        
      case 'validate':
        await flyway.validate();
        console.log('Validation successful!');
        break;
        
      case 'clean':
        await flyway.clean();
        console.log('Database cleaned!');
        break;
        
      case 'baseline':
        await flyway.baseline();
        console.log('Baseline created!');
        break;
        
      default:
        console.error('Unknown command:', command);
        console.log('Available commands: migrate, info, validate, clean, baseline');
        process.exit(1);
    }
  } catch (error) {
    console.error('Flyway error:', error.message);
    process.exit(1);
  }
})();
