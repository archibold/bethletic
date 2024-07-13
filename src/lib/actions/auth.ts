"use server";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "./user";
import prisma from "../prisma";
export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirectTo: "/dashboard",
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials.";
                default:
                    return "Something went wrong.";
            }
        }
        throw error;
    }
}

export async function register(
    prevState: string | undefined,
    formData: FormData
) {
    const validatedFields = RegisterSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirm-password"),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return validatedFields.error.errors.reduce(
            (acc, er) => acc + er.message + "\n",
            ""
        );
    }

    const { name, email, password, confirmPassword } = validatedFields.data;

    // Check if passwords match
    if (password !== confirmPassword) {
        return "Passwords don't match.";
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "Email already in use!" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();

    await prisma.user.create({
        data: {
            id,
            name,
            email,
            password: hashedPassword,
        },
    });

    // const verificationToken = await generateVerificationToken(email);
    // await sendVerificationEmail(
    //     verificationToken.email,
    //     verificationToken.token
    // );

    redirect("/auth/login");

    return { success: "Confirmation email sent!" };
}
