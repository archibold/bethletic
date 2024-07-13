"use server";

import { auth, unstable_update } from "@/auth";
import prisma from "@/lib/prisma";
import { UserScheme } from "@/lib/validationSchema";
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

export async function changeUserInfo(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        const validatedFields = UserScheme.pick({
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
        console.log("blablaj");
        unstable_update({ user: { email, name } });

        return true;
    } catch (error) {
        console.error("Database Error:", error);
        return "Update Error";
    }
}
