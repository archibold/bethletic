import prisma from "./prisma";
import { exercise } from "@prisma/client";

export type CardExercise = Omit<
    exercise,
    "instructions" | "api_id" | "body_part"
>;

export async function fetchExerciseByQuery(search: string) {
    //TODO: try catch??
    if (search === "") return [];
    const fechedExercise: CardExercise[] = await prisma.exercise.findMany({
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

    return fechedExercise;
}

export async function fetchExercise(id: string) {
    try {
        const fetchedExercise: exercise | null =
            await prisma.exercise.findFirst({
                where: {
                    id: parseInt(id),
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
        const fetchedEquipmentCategories = await prisma.exercise.findMany({
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
        const fetchedEquipmentCategories = await prisma.exercise.findMany({
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
