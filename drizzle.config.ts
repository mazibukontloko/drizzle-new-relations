import "dotenv/config";

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./db/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

// import { defineConfig } from "drizzle-kit";
// export default defineConfig({
//   dialect: "sqlite",
//   schema: "./db/schema.ts",
//   out: "./drizzle",  
//   dbCredentials: {
//     url: "drizzle-new-rel.db",
//   },
// });