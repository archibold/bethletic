"use server";
import { z } from "zod";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { ValidateUser } from "@/lib/validationSchema";
import { getUserByEmail } from "../user";
import prisma from "@/lib/prisma";
import { generateVerificationToken } from "@/lib/verification/tokens";
import { sendVerificationEmail } from "@/lib/mail";

const RegisterUser = ValidateUser.pick({
    name: true,
    email: true,
    password: true,
}).extend({
    confirmPassword: z.string({
        invalid_type_error: "Please confirm your password.",
    }),
});

export async function register(
    prevState: { success?: string; error?: string } | undefined,
    formData: FormData
) {
    const validatedFields = RegisterUser.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirm-password"),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            error: validatedFields.error.errors.reduce(
                (acc, er) => acc + er.message + "\n",
                ""
            ),
        };
    }

    const { name, email, password, confirmPassword } = validatedFields.data;

    // Check if passwords match
    if (password !== confirmPassword) {
        return { error: "Passwords don't match." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();

    if (await getUserByEmail(email)) {
        return { error: "User already exists" };
    }

    await prisma.user.create({
        data: {
            id,
            name,
            email,
            password: hashedPassword,
        },
    });

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    );

    redirect("/login");
}
