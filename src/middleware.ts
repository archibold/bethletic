import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
// import {
//     publicRoutes,
//     authRoutes,
//     apiAuthPrefix,
//     DEFULT_LOGIN_REDIRECT,
//     DEFULT_LOGOUT_REDIRECT,
// } from "@/routes";
const { auth } = NextAuth(authConfig);
export default auth;

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpeg$).*)"],
};
