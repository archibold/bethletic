import prisma from "@/lib/prisma";
import { exercises } from "@prisma/client";

export type CardExercises = Omit<
    exercises,
    "instructions" | "api_id" | "body_part"
>;

export async function fetchExerciseByQuery(search: string) {
    //TODO: try catch??
    if (search === "") return [];
    const fechedExercise: CardExercises[] = await prisma.exercises.findMany({
        where: {
            OR: [
                { body_part: { startsWith: search, mode: "insensitive" } },
                { equipment: { startsWith: search, mode: "insensitive" } },
                { name: { startsWith: search, mode: "insensitive" } },
                { target: { startsWith: search, mode: "insensitive" } },
                { secondary_muscles: { hasSome: [search] } },
            ],
        },
        select: {
            equipment: true,
            name: true,
            target: true,
            secondary_muscles: true,
            gif_url: true,
            id: true,

            body_part: false,
            api_id: false,
            instructions: false,
        },
    });
    console.log("hejo");
    console.log(fechedExercise);

    return fechedExercise;
}

export async function fetchExercise(id: string) {
    try {
        const fetchedExercise: exercises | null =
            await prisma.exercises.findFirst({
                where: {
                    id,
                },
            });

        return fetchedExercise;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch example exercises.");
    }
}

export async function fetchEquipmentCategories() {
    try {
        const fetchedEquipmentCategories = await prisma.exercises.findMany({
            distinct: ["equipment"],
            orderBy: {
                equipment: "asc",
            },
        });
        console.log(fetchedEquipmentCategories);
        return fetchedEquipmentCategories;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch example exercises.");
    }
}

export async function fetchTargetCategories() {
    try {
        const fetchedEquipmentCategories = await prisma.exercises.findMany({
            distinct: ["target"],
            orderBy: {
                target: "asc",
            },
        });
        return fetchedEquipmentCategories;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch example exercises.");
    }
}
