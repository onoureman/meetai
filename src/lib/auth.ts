import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance

import * as schema from "@/db/schema"; // your drizzle schema

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    signUp: {
      email: async ({ name, email, password }) => {
        // Validate input
        if (!email || !password) throw new Error("Missing credentials");

        // Insert user into database
        const user = await db.insert(schema.users).values({
          name,
          email,
          password, // ideally hash this!
        }).returning();

        return user[0]; // return created user
      },
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { ...schema },
  }),
   trustedOrigins: ["http://localhost:3000"],
});