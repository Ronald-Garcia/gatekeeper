import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";


const DATABASE_FILE = "sqlite.db";

// Initialize the SQLite database and export the connection
export const connection = new Database(DATABASE_FILE);

// Create the database and export it
export const db = drizzle(connection, { schema });