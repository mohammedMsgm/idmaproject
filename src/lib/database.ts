import { Pool } from 'pg';

const pool = new Pool({
  // Use DATABASE_URL if available (Neon), otherwise use individual parameters
  connectionString: process.env.DATABASE_URL,
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'idma_platform',
  password: process.env.DB_PASSWORD || 'password',
  port: parseInt(process.env.DB_PORT || '5432'),
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

export { pool };

// Helper function to execute queries
export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};

// Test database connection
export const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Database connected successfully');
    client.release();
    return true;
  } catch (err) {
    console.error('Database connection error:', err);
    return false;
  }
};
