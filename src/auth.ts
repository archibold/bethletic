import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { ValidateUser } from "@/lib/validationSchema";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import { getUserByEmail, getUserById } from "./lib/actions/user";

export const { auth, signIn, signOut, handlers } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
    callbacks: {
        async signIn({ user, account }) {
            // Allow OAuth without email verification
            if (account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id || "");

            // Prevent sign in without email verification
            if (!existingUser?.emailVerified) return false;

            // if (existingUser.isTwoFactorEnabled) {
            //     const twoFactorConfirmation =
            //         await getTwoFactorConfirmationByUserId(existingUser.id);

            //     if (!twoFactorConfirmation) return false;

            //     // Delete two factor confirmation for next sign in
            //     await db.twoFactorConfirmation.delete({
            //         where: { id: twoFactorConfirmation.id },
            //     });
            // }

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
