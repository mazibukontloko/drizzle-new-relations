CREATE TYPE "names" AS ENUM('male', 'female', 'sport', 'art');--> statement-breakpoint
CREATE TABLE "groups" (
	"id" serial PRIMARY KEY,
	"name" "names"
);
--> statement-breakpoint
CREATE TABLE "users_to_groups" (
	"user_id" integer,
	"group_id" integer,
	CONSTRAINT "users_to_groups_pkey" PRIMARY KEY("user_id","group_id")
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "verified" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "owner_id" DROP DEFAULT;--> statement-breakpoint
DROP SEQUENCE "posts_owner_id_seq";--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "owner_id" SET DATA TYPE integer USING "owner_id"::integer;--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "owner_id" DROP NOT NULL;--> statement-breakpoint
CREATE INDEX "users_to_groups_user_id_idx" ON "users_to_groups" ("user_id");--> statement-breakpoint
CREATE INDEX "users_to_groups_group_id_idx" ON "users_to_groups" ("group_id");--> statement-breakpoint
CREATE INDEX "users_to_groups_composite_idx" ON "users_to_groups" ("user_id","group_id");--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_owner_id_users_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "users_to_groups" ADD CONSTRAINT "users_to_groups_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "users_to_groups" ADD CONSTRAINT "users_to_groups_group_id_groups_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE;