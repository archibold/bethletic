"use server";

import bcrypt from "bcrypt";
import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { ValidateUser } from "@/lib/validationSchema";
import { revalidatePath } from "next/cache";
import { generateNewEmailVerificationToken } from "../verification/tokens";
import { sendVerificationEmail } from "../mail";
import { z } from "zod";
import { isRedirectError } from "next/dist/client/components/redirect";
// import { signOut } from "next-auth/react";

export async function getUserByEmail(email: string) {
    try {
        const user = await prisma.user.findUnique({ where: { email } });

        return user;
    } catch {
        return null;
    }
}

export async function getUserById(id: string) {
    try {
        const user = await prisma.user.findUnique({ where: { id } });

        return user;
    } catch {
        return null;
    }
}

export async function changeName(
    prevState: { success?: string; error?: string } | undefined,
    formData: FormData
) {
    try {
        const validatedFields = ValidateUser.pick({
            name: true,
        }).safeParse({
            name: formData.get("name"),
        });

        if (!validatedFields.success) {
            return {
                error: validatedFields.error.errors.reduce(
                    (acc, er) => acc + er.message + "\n",
                    ""
                ),
            };
        }

        const session = await auth();
        if (!session?.user?.email) throw new Error("Cannot update user");
        const { name } = validatedFields.data;

        const updateUser = prisma.user.update({
            where: {
                email: session?.user?.email,
            },
            data: {
                name,
            },
        });

        const transaction = await prisma.$transaction([updateUser]);
        revalidatePath("/user/profile");
        return { success: "name successful updated" };
    } catch (error) {
        console.error("Database Error:", error);
        return { error: "Update Error" };
    }
}

export async function changeEmail(
    prevState: { success?: string; error?: string } | undefined,
    formData: FormData
) {
    try {
        const validatedFields = ValidateUser.pick({
            email: true,
        }).safeParse({
            email: formData.get("email"),
        });

        if (!validatedFields.success) {
            throw new Error(
                validatedFields.error.errors.reduce(
                    (acc, er) => acc + er.message + "\n",
                    ""
                )
            );
        }
        const session = await auth();
        if (!session?.user?.email) throw new Error("Cannot update user");

        const { email } = validatedFields.data;

        const verificationToken = await generateNewEmailVerificationToken(
            email,
            session?.user?.email
        );

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        );

        revalidatePath("/user/profile");
        return {
            success:
                "Confirmation email sent, you can login with you email when you confirm your email.",
        };
    } catch (error) {
        console.error("Database Error:", error);
        return { error: "Update Error" };
    }
}

const PasswordScheme = ValidateUser.pick({
    password: true,
}).extend({
    confirmPassword: z.string({
        invalid_type_error: "Please confirm your password.",
    }),
});

export async function changePassword(
    prevState: { success?: string; error?: string } | undefined,
    formData: FormData
) {
    try {
        const session = await auth();
        if (!session?.user?.email) throw new Error("Cannot update user");

        const validatedFields = PasswordScheme.safeParse({
            password: formData.get("password"),
            confirmPassword: formData.get("confirm-password"),
        });

        if (!validatedFields.success) {
            return {
                error: validatedFields.error.errors.reduce(
                    (acc, er) => acc + er.message + "\n",
                    ""
                ),
            };
        }

        const { password, confirmPassword } = validatedFields.data;

        if (password !== confirmPassword) {
            return { error: "Passwords don't match." };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.update({
            where: { email: session?.user?.email },
            data: { password: hashedPassword },
        });

        revalidatePath("/user/profile");
        return { success: "Password successful updated" };
    } catch (error) {
        console.error("Database Error:", error);
        return { error: "Update Error" };
    }
}

export async function deleteUser(
    prevState: { success?: string; error?: string } | undefined,
    formData: FormData
) {
    try {
        const session = await auth();
        if (!session?.user?.email) throw new Error("Cannot update user");

        const updateUser = prisma.user.delete({
            where: {
                email: session?.user?.email,
            },
        });

        await prisma.$transaction([updateUser]);

        //TODO: redirect to bye bye page!
        await signOut({ redirect: true, redirectTo: "/" });
    } catch (error) {
        //TODO: I hate beta versions of libraries!!!
        if (isRedirectError(error)) {
            console.error(error);
            throw error;
        }
        console.error("Database Error:", error);
        return { error: "Update Error" };
    }
}
