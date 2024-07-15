"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { ValidateUser } from "@/lib/validationSchema";
import { revalidatePath } from "next/cache";

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

type UserProfileFormState = {
    success: boolean;
    errorMessage?: string | undefined;
};
export async function changeUserInfo(
    prevState: UserProfileFormState,
    formData: FormData
) {
    try {
        const validatedFields = ValidateUser.pick({
            name: true,
            email: true,
        }).safeParse({
            name: formData.get("name"),
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

        const { name, email } = validatedFields.data;

        const updateUser = prisma.user.update({
            where: {
                email: email,
            },
            data: {
                email,
                name,
            },
        });

        const transaction = await prisma.$transaction([updateUser]);
        revalidatePath("/user/profile");
        return { success: true };
    } catch (error) {
        console.error("Database Error:", error);
        return { success: false, errorMessage: "Update Error" };
    }
}
