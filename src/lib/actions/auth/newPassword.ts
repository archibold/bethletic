"use server";

import * as z from "zod";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { getUserByEmail } from "../user";
import { getPasswordResetTokenByToken } from "@/lib/verification/password-reset-token";
import { ValidateUser } from "@/lib/validationSchema";

const PasswordScheme = ValidateUser.pick({
    password: true,
}).extend({
    confirmPassword: z.string({
        invalid_type_error: "Please confirm your password.",
    }),
});
export async function newPassword(
    token: string | null,
    prevState: { success?: string; error?: string } | undefined,
    formData: FormData
) {
    if (!token) {
        return { error: "Missing token!" };
    }

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

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
        return { error: "Invalid token!" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { error: "Token has expired!" };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: "Email does not exist!" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword },
    });

    await prisma.passwordResetToken.delete({
        where: { id: existingToken.id },
    });

    return { success: "Password updated!" };
}
