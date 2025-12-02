import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// En Next.js 16, middleware se renombra a proxy
export const proxy = NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/proxy#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
