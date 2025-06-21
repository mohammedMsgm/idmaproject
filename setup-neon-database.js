import { pool } from './lib/database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setupNeonDatabase() {
  try {
    console.log('🚀 Setting up Neon PostgreSQL database...');
    
    // Test connection first
    const client = await pool.connect();
    console.log('✅ Connected to Neon database successfully');    // Read and execute schema
    const schemaPath = path.join(__dirname, 'database', 'schema-clean.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
      console.log('📋 Executing database schema...');
      // Split the schema into individual statements and execute them
    const statements = schema
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--') && !stmt.startsWith('/*'));
    
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i].trim();
      if (statement) {
        try {
          const result = await client.query(statement);
          successCount++;
          
          // Log specific information for different statement types
          if (statement.toUpperCase().startsWith('CREATE TABLE')) {
            const tableName = statement.match(/CREATE TABLE (?:IF NOT EXISTS )?\s*(\w+)/i);
            console.log(`✅ Created table: ${tableName ? tableName[1] : 'unknown'}`);
          } else if (statement.toUpperCase().startsWith('INSERT')) {
            console.log(`✅ Inserted data: ${result.rowCount || 0} rows affected`);
          } else if (statement.toUpperCase().startsWith('CREATE INDEX')) {
            const indexName = statement.match(/CREATE INDEX (?:IF NOT EXISTS )?\s*(\w+)/i);
            console.log(`✅ Created index: ${indexName ? indexName[1] : 'unknown'}`);
          }
        } catch (error) {
          errorCount++;
          console.log(`⚠️  Error in statement ${i + 1}: ${error.message}`);
          if (error.code !== '42P01' && error.code !== '42P07') { // Ignore "relation does not exist" and "relation already exists"
            console.log(`   Statement: ${statement.substring(0, 100)}...`);
          }
        }
      }
    }
    
    console.log(`✅ Schema execution completed: ${successCount} successful, ${errorCount} warnings/errors`);
    
    // Test basic operations
    console.log('🧪 Testing database operations...');
      // Check if tables exist
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log('📊 Created tables:', tablesResult.rows.map(row => row.table_name));
    
    if (tablesResult.rows.length === 0) {
      console.log('⚠️  No tables found! There might be an issue with the schema execution.');
    } else {
      // Check data in key tables
      for (const table of ['users', 'doctor_profiles']) {
        if (tablesResult.rows.some(row => row.table_name === table)) {
          try {
            const countResult = await client.query(`SELECT COUNT(*) as count FROM ${table}`);
            console.log(`📈 ${table}: ${countResult.rows[0].count} records`);
          } catch (error) {
            console.log(`⚠️  Could not count records in ${table}: ${error.message}`);
          }
        }
      }
    }
    
    client.release();
    console.log('🎉 Neon database setup completed successfully!');
    
  } catch (error) {
    console.error('❌ Error setting up Neon database:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run the setup
setupNeonDatabase();
