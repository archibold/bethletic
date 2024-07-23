"use server";

import prisma from "@/lib/prisma";
import { getUserByEmail } from "../user";
import { getVerificationTokenByToken } from "@/lib/verification/verificiation-token";

export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);
    console.log(existingToken);
    if (!existingToken) {
        return { error: "Token does not exist!" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { error: "Token has expired!" };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: "Email does not exist!" };
    }

    await prisma.user.update({
        where: { id: existingUser.id },
        data: {
            emailVerified: new Date(),
            email: existingToken.email,
        },
    });

    await prisma.verificationToken.delete({
        where: { id: existingToken.id },
    });
    console.log("OJEJUS");
    return { success: "Email verified!" };
};
