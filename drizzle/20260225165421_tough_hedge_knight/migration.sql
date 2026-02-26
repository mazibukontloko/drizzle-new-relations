CREATE TABLE "posts" (
	"id" serial PRIMARY KEY,
	"content" text NOT NULL,
	"owner_id" serial
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL
);
