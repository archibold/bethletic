"use server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        await signIn("credentials", formData);
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

const RegisterUser = z.object({
    name: z.string({
        invalid_type_error: "Please enter your name.",
    }),
    email: z
        .string({
            invalid_type_error: "Please enter an email address.",
        })
        .email({ message: "Please enter valid email address" }),
    password: z
        .string({
            invalid_type_error: "Please enter a password.",
        })
        .min(6),
    confirmPassword: z.string({
        invalid_type_error: "Please confirm your password.",
    }),
});

export async function register(
    prevState: string | undefined,
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

    console.log(password);

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();

    try {
        await sql`
      INSERT INTO users (id, name, email, password)
      VALUES (${id}, ${name}, ${email}, ${hashedPassword})
    `;
    } catch (error) {
        return "Database Error: Failed to Create Account.";
    }

    redirect("/auth/login");
}
