import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import type { User } from "@/app/lib/definitions";
import bcrypt from "bcryptjs";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    console.log("getUser(): email=", email, "found=", !!user?.[0]);
    return user[0];
  } catch (error) {
    console.error("getUser(): Failed to fetch user due to DB error:", error);
    // Return undefined on DB errors so that authorization fails gracefully
    return undefined;
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);

          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            console.log("authorize(): authenticating email=", email);
            const user = await getUser(email);
            console.log("authorize(): user=", !!user);
            if (!user) return null;
            const isPasswordValid = bcrypt.compareSync(password, user.password);
            console.log("authorize(): password valid=", isPasswordValid);
            if (!isPasswordValid) return null;

            // Si las credenciales son válidas, retornar el usuario
            return user;
          }
          return null;
        } catch (err) {
          console.error("authorize(): unexpected error", err);
          // Return null to avoid throwing to the caller; fail silently as invalid credentials.
          return null;
        }
      },
    }),
  ],
});
