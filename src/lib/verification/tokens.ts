import { v4 as uuidv4 } from "uuid";

import prisma from "../prisma";
import { getVerificationTokenByEmail } from "./verificiation-token";
import { getPasswordResetTokenByEmail } from "./password-reset-token";

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getPasswordResetTokenByEmail(email);

    if (existingToken) {
        await prisma.passwordResetToken.delete({
            where: { id: existingToken.id },
        });
    }

    const passwordResetToken = await prisma.passwordResetToken.create({
        data: {
            email,
            token,
            expires,
        },
    });

    return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await prisma.verificationToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }

    const id = uuidv4();

    const verficationToken = await prisma.verificationToken.create({
        data: {
            id,
            email,
            token,
            expires,
        },
    });

    return verficationToken;
};

export const generateNewEmailVerificationToken = async (
    email: string,
    oldEmail: string
) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await prisma.verificationToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }

    const id = uuidv4();

    const verficationToken = await prisma.verificationToken.create({
        data: {
            id,
            email,
            token,
            expires,
            oldEmail,
        },
    });

    return verficationToken;
};
