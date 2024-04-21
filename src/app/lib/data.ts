import { sql } from "@vercel/postgres";
import { Exercise } from "./definitions";

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

export async function fetchExercisesByTarget(target: string) {
    try {
        const data = await sql<Exercise>`
      SELECT *
      FROM exercise
      WHERE target = ${target}
      OR  ${target}=ANY(secondary_muscles)
      ORDER BY random()
      LIMIT 4`;

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
      ORDER BY random()
      LIMIT 4`;

        const exercises: Array<Exercise> = data.rows;
        console.log(exercises);
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
        // console.log(exercise);
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

        const target: Array<Pick<Exercise, "target">> = data.rows.map(
            (exercise) => {
                return {
                    ...exercise,
                };
            }
        );
        // console.log(body_parts);
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

        const equipment: Array<Pick<Exercise, "equipment">> = data.rows.map(
            (exercise) => {
                return {
                    ...exercise,
                };
            }
        );
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

        const body_parts: Array<Pick<Exercise, "body_part">> = data.rows.map(
            (exercise) => {
                return {
                    ...exercise,
                };
            }
        );
        // console.log(body_parts);
        return body_parts;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch example exercises.");
    }
}
