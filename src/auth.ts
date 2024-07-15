import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { ValidateUser } from "@/lib/validationSchema";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import { getUserByEmail } from "./lib/actions/user";

export const { auth, signIn, signOut, handlers, unstable_update } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
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
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            // if (token.role && session.user) {
            //     session.user.role = token.role as UserRole;
            // }

            // if (session.user) {
            //     session.user.isTwoFactorEnabled =
            //         token.isTwoFactorEnabled as boolean;
            // }

            if (session.user) {
                session.user.name = token.name;
                session.user.email = token.email || "";
                // session.user.isOAuth = token.isOAuth as boolean;
            }

            return session;
        },
        async jwt({ token, user, session, trigger }) {
            if (!token.sub) return token;

            const existingUser = await prisma.user.findUnique({
                where: { id: token.sub },
            });

            console.log(existingUser);

            if (!existingUser) return token;

            // const existingAccount = await getAccountByUserId(existingUser.id);

            // token.isOAuth = !!existingAccount;
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.role = existingUser.role;
            // token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

            return token;
        },
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = ValidateUser.pick({
                    email: true,
                    password: true,
                }).safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUserByEmail(email);
                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password || ""
                    );

                    if (passwordsMatch) return user;
                }

                console.log("Invalid credentials");
                return null;
            },
        }),
    ],
});
