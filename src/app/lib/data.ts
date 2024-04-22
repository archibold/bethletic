import { sql } from "@vercel/postgres";
import { Exercise } from "./definitions";
import { unstable_noStore } from "next/cache";

export async function fetchExampleExercise() {
    try {
        const data = await sql<Exercise>`
        SELECT *
        FROM exercise
        ORDER BY random()
        LIMIT 4`;

        const exampleExercises: Array<Exercise> = data.rows;
        return exampleExercises;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch example exercises.");
    }
}

export async function fetchExampleExerciseByTarget() {
    try {
        type ExercisWithTarget = Exercise & {
            selected_target: string;
        };
        const data = await sql<ExercisWithTarget>`
        WITH union_targets AS (
            SELECT DISTINCT target AS result FROM exercise
            UNION
            SELECT DISTINCT unnest(secondary_muscles) AS result FROM exercise
        ), selected_target AS (
            SELECT result::text AS selected_target FROM union_targets ORDER BY random() LIMIT 1
        )
        SELECT exercise.*, selected_target.selected_target
        FROM exercise
        CROSS JOIN selected_target
        WHERE exercise.target = selected_target.selected_target
        OR selected_target.selected_target = any(exercise.secondary_muscles)
        ORDER BY random()
        LIMIT 4;`;

        const exampleExercises: Array<ExercisWithTarget> = data.rows;
        return exampleExercises;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch example exercises.");
    }
}

export async function fetchExampleExerciseByEquipment() {
    try {
        type ExercisWithEquipment = Exercise & {
            selected_equipment: string;
        };
        const data = await sql<ExercisWithEquipment>`
        WITH union_targets AS (
            SELECT DISTINCT equipment AS result FROM exercise
        ), selected_equipment AS (
            SELECT result::text AS selected_equipment FROM union_targets ORDER BY random() LIMIT 1
        )
        SELECT exercise.*, selected_equipment.selected_equipment
        FROM exercise
        CROSS JOIN selected_equipment
        WHERE exercise.equipment = selected_equipment.selected_equipment
        ORDER BY random()
        LIMIT 4;`;

        const exampleExercises: Array<ExercisWithEquipment> = data.rows;
        return exampleExercises;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch example exercises.");
    }
}

export async function fetchExercisesByTarget(target: string) {
    try {
        const data = await sql<Exercise>`
        SELECT *
        FROM exercise
        WHERE target = ${target}
        OR  ${target}=ANY(secondary_muscles)
        ORDER BY random()`;

        const exercises: Array<Exercise> = data.rows;
        return exercises;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch example exercises.");
    }
}

export async function fetchExercisesByEquipment(equipment: string) {
    try {
        const data = await sql<Exercise>`
        SELECT *
        FROM exercise
        WHERE equipment = ${equipment}
        ORDER BY random()`;

        const exercises: Array<Exercise> = data.rows;
        return exercises;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch example exercises.");
    }
}

export async function fetchExercise(id: string) {
    try {
        const data = await sql<Exercise>`
        SELECT *
        FROM exercise
        WHERE _id = ${id}`;

        const exercise: Exercise = await data.rows[0];
        return exercise;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch example exercises.");
    }
}

export async function fetchTargetCategories() {
    try {
        const data = await sql<Pick<Exercise, "target">>`
        SELECT DISTINCT target FROM exercise
        UNION
        SELECT DISTINCT unnest(secondary_muscles) FROM exercise ORDER BY target`;

        const target: Array<Pick<Exercise, "target">> = data.rows;
        return target;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch example exercises.");
    }
}

export async function fetchEquipmentCategories() {
    try {
        const data = await sql<Pick<Exercise, "equipment">>`
        SELECT DISTINCT equipment
        FROM exercise`;

        const equipment: Array<Pick<Exercise, "equipment">> = data.rows;
        return equipment;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch example exercises.");
    }
}

export async function fetchBodyPartCategories() {
    try {
        const data = await sql<Pick<Exercise, "body_part">>`
        SELECT DISTINCT body_part
        FROM exercise`;

        const body_parts: Array<Pick<Exercise, "body_part">> = data.rows;
        return body_parts;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch example exercises.");
    }
}
