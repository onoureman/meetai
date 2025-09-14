import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";

import * as schema from "@/db/schema"; 

export const auth = betterAuth({
 socialProviders: {
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        }, 
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        },
    },

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