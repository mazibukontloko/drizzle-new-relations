import { boolean, index, integer, pgEnum, pgTable, primaryKey, serial, text } from "drizzle-orm/pg-core";

export const nameEnum = pgEnum("names", ["male", "female", "sport", "art"]);

export const users = pgTable('users', {
	id: serial().primaryKey(),
	name: text().notNull(),
	verified: boolean().default(true)
});

export const posts = pgTable('posts', {
	id: serial().primaryKey(),
	content: text().notNull(),
	ownerId: integer('owner_id').references(() => users.id, {onDelete: 'cascade'}),
});

export const groups = pgTable('groups', {
	id: serial().primaryKey(),
	name: nameEnum(),
});

export const usersToGroups = pgTable(
  'users_to_groups',
  {
    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    groupId: integer('group_id')
      .notNull()
      .references(() => groups.id, { onDelete: 'cascade' }),
  },
  (table) => [
		primaryKey({ columns: [table.userId, table.groupId] }),
		index('users_to_groups_user_id_idx').on(table.userId),
		index('users_to_groups_group_id_idx').on(table.groupId),
		index('users_to_groups_composite_idx').on(table.userId, table.groupId),
  ],
);

