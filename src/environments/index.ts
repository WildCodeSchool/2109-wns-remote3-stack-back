import dotenv from 'dotenv';

// Get environments variables from .env file
dotenv.config();

// Environment
export const NODE_ENV = process.env.NODE_ENV || 'development';

// Specific exports
export * from './application';
