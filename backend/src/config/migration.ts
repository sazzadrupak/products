import Boom from '@hapi/boom';
import path, { dirname } from 'path';
import Postgrator from 'postgrator';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

import pgPool from './db';

async function migration() {
  try {
    await pgPool.connect();
    const postgrator = new Postgrator({
      migrationPattern: path.join(__dirname, '../../migrations', '*'),
      driver: 'pg',
      database: process.env.POSTGRES_DB,
      execQuery: (query) => pgPool.query(query),
      schemaTable: '__schemaversion',
    });

    postgrator.on('validation-started', (migration) => {
      console.log(`Verifying checksum of migration ${migration.filename}`);
    });

    postgrator.on('migration-started', (migration) => {
      console.log(`Running ${migration.filename}`);
    });
    const migrations = await postgrator.migrate();
    postgrator.on('migration-finished', (migration) => console.log(migration));

    if (migrations.length === 0) {
      console.info('Database is up to date');
    } else {
      console.info('Database is successfully migrated');
    }
  } catch (error) {
    console.error('Migration error:', error);
    throw Boom.internal('Migration failure!');
  }
}

export default migration;
