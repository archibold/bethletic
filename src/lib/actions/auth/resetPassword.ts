"use server";

import { getUserByEmail } from "../user";
import { generatePasswordResetToken } from "../../verification/tokens";
import { sendPasswordResetEmail } from "../../verification/mail";
import { ValidateUser } from "../../validationSchema";

const RegisterUser = ValidateUser.pick({
    email: true,
});

export async function resetPassword(
    prevState: { success?: string; error?: string } | undefined,
    formData: FormData
) {
    const validatedFields = RegisterUser.safeParse({
        email: formData.get("email"),
    });

    if (!validatedFields.success) {
        return { error: "Invalid email!" };
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return { error: "Email not found!" };
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    );

    return { success: "Reset email sent!" };
}
