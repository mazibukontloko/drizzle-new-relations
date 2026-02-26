import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
	posts: {
		author: r.one.users({
			from: r.posts.ownerId,
			to: r.users.id,
		}),
	},
	// users: {
	// 	groups: r.many.groups({
	// 		from: r.users.id.through(r.usersToGroups.userId),
	// 		to: r.groups.id.through(r.usersToGroups.groupId),
	// 	}),
    // },
    // groups: {
    //   	participants: r.many.users(),
    // },
    groups: {
      verifiedUsers: r.many.users({
        from: r.groups.id.through(r.usersToGroups.groupId),
        to: r.users.id.through(r.usersToGroups.userId),
        where: {
          verified: true,
        },
      }),
    },
	users: {
		groups: r.many.groups()
	},
}));