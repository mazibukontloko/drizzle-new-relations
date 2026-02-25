import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { relations } from "./relations";

const sqlite = new Database('drizzle-new-rel.db');
export const db = drizzle({ client: sqlite, relations });
    