import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
	posts: {
		author: r.one.users({
			from: r.posts.ownerId,
			to: r.users.id,
		}),
	}
}))