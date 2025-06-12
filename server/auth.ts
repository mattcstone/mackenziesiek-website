import bcrypt from 'bcrypt';
import session from 'express-session';
import connectPg from 'connect-pg-simple';
import type { Express, Request, Response, NextFunction } from 'express';
import { db } from './db';
import { adminUsers } from '@shared/schema';
import { eq } from 'drizzle-orm';

const PgSession = connectPg(session);

// Configure session middleware
export function setupSession(app: Express) {
  const sessionStore = new PgSession({
    conString: process.env.DATABASE_URL,
    tableName: 'sessions',
    createTableIfMissing: false,
  });

  app.use(session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET || 'realty-blog-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
  }));
}

// Hash password utility
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

// Verify password utility
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Create default admin user if none exists
export async function createDefaultAdmin() {
  try {
    const existingAdmin = await db.select().from(adminUsers).limit(1);
    
    if (existingAdmin.length === 0) {
      const hashedPassword = await hashPassword('mackenzie2024!');
      
      await db.insert(adminUsers).values({
        username: 'mackenzie',
        password: hashedPassword,
        email: 'mackenzie@mattstoneteam.com',
        firstName: 'Mackenzie',
        lastName: 'Siek',
        isActive: true,
      });
      
      console.log('Default admin user created: username "mackenzie", password "mackenzie2024!"');
    }
  } catch (error) {
    console.error('Error creating default admin:', error);
  }
}

// Middleware to check if user is authenticated
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session?.user) {
    return next();
  }
  
  res.status(401).json({ message: 'Authentication required' });
}

// Middleware to check authentication for admin routes
export function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session?.user?.isAdmin) {
    return next();
  }
  
  res.status(401).json({ message: 'Admin authentication required' });
}

// Extend session type
declare module 'express-session' {
  interface SessionData {
    user?: {
      id: number;
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      isAdmin: boolean;
    };
  }
}