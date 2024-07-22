"use server";
import { z } from "zod";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { ValidateUser } from "@/lib/validationSchema";
import { getUserByEmail } from "./user";
import prisma from "../prisma";
import { generateVerificationToken } from "../verification/tokens";
import { sendVerificationEmail } from "../verification/mail";

const LoginUser = ValidateUser.pick({
    email: true,
    password: true,
});

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    const validatedFields = LoginUser.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });
    console.log(validatedFields.error);
    if (!validatedFields.success) {
        // TODO; Change to OBJ {success, error}
        // return { error: "Invalid fields!" };
        return "Invalid fields!";
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return "Email does not exist!";
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(
            existingUser.email
        );

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        );

        // return { success: "Confirmation email sent!" };
        return "Confirmation email sent!";
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/dashboard",
        });
    } catch (error) {
        console.log(error);
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

    if (await getUserByEmail(email)) {
        return "User already exists";
    }

    await prisma.user.create({
        data: {
            id,
            name,
            email,
            password: hashedPassword,
        },
    });

    redirect("/login");
}
