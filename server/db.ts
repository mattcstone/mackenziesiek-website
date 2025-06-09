import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  max: 1,
  idleTimeoutMillis: 60000, 
  connectionTimeoutMillis: 15000,
  allowExitOnIdle: false,
  maxUses: 7500, // Close connections after 7500 uses to prevent memory leaks
});

// Enhanced error handling for the pool
pool.on('error', (err) => {
  console.error('Database pool error:', err);
  // Don't exit process on pool errors
});

pool.on('connect', () => {
  console.log('Database pool connected');
});

pool.on('remove', () => {
  console.log('Database connection removed from pool');
});

export const db = drizzle({ client: pool, schema });