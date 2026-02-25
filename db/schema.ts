import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable('users', {
	id: integer().primaryKey({autoIncrement: true}),
	name: text().notNull()
});
export const posts = sqliteTable('posts', {
	id: integer().primaryKey({autoIncrement: true}),
	content: text().notNull(),
	ownerId: integer('owner_id'),
});

