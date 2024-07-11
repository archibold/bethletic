import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL("/dashboard", nextUrl));
            }
            return true;
        },
        session: async ({ session, token, trigger }) => {
            if (session?.user) {
                console.log("----");

                console.log(token);
                console.log("----");
                session.user.id = token.sub || "";
                session.user.name = token.name;
                session.user.email = token.email || "";
            }

            console.log("MARYJKO");
            if (trigger === "update") {
                console.log("ZORDON ZGŁoś się");
            }
            console.log(session);
            console.log("MARYJKO");
            return session;
        },
        jwt({ token, user, session, trigger }) {
            if (trigger === "update") {
                console.log("ZORDON ZGŁoś się 0077");
                token.name = session.user.name;
                token.email = session.user.email;
            }
            // What comes in `session` here is what's updated in the server action
            if (session?.user?.name) {
                token.name = session.user.name;
            }

            if (user?.id) {
                token.id = user.id;
            }

            return token;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
