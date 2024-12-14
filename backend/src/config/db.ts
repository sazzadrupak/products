import pg from 'pg';
const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_DB,
} = process.env;
const connectionString = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;
const pgPool = new pg.Pool({
  connectionString,
  max: 80,
  idleTimeoutMillis: 30000,
});

export default pgPool;
