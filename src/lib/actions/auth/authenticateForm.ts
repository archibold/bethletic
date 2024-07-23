"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { ValidateUser } from "@/lib/validationSchema";
import { getUserByEmail } from "../user";
import { generateVerificationToken } from "../../verification/tokens";
import { sendVerificationEmail } from "../../verification/mail";

const LoginUser = ValidateUser.pick({
    email: true,
    password: true,
});

export async function authenticate(
    prevState: { success?: string; error?: string } | undefined,
    formData: FormData
) {
    const validatedFields = LoginUser.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });
    console.log(validatedFields.error);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email does not exist!" };
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(
            existingUser.email
        );

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        );

        return { success: "Confirmation email sent!" };
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
                    return { error: "Invalid credentials." };
                default:
                    return { error: "Something went wrong." };
            }
        }
        throw error;
    }
}
