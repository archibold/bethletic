import { lusitana } from "@/app/ui/fonts";
import {
    fetchExampleExercise,
    fetchExampleExerciseByTarget,
    fetchExampleExerciseByEquipment,
} from "../lib/data";
import Card from "../ui/dashboard/card";

export default async function Page() {
    const [
        exercises,
        exercisec_by_random_target,
        exercisec_by_random_equipment,
    ] = await Promise.all([
        fetchExampleExercise(),
        fetchExampleExerciseByTarget(),
        fetchExampleExerciseByEquipment(),
    ]);

    return (
        <main>
            <div className="mb-5">
                <h1
                    className={`${lusitana.className} mb-4 text-xl md:text-2xl`}
                >
                    Sample exercises
                </h1>

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                    {exercises.map((exercise) => {
                        return <Card key={exercise._id} exercise={exercise} />;
                    })}
                </div>
            </div>
            <div className="mb-5">
                <h1
                    className={`${lusitana.className} mb-4 text-xl md:text-2xl`}
                >
                    Exercises by {exercisec_by_random_target[0].selected_target}
                </h1>

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                    {exercisec_by_random_target.map((exercise) => {
                        return <Card key={exercise._id} exercise={exercise} />;
                    })}
                </div>
            </div>
            <div className="mb-5">
                <h1
                    className={`${lusitana.className} mb-4 text-xl md:text-2xl`}
                >
                    Exercises by{" "}
                    {exercisec_by_random_equipment[0].selected_equipment}
                </h1>

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                    {exercisec_by_random_equipment.map((exercise) => {
                        return <Card key={exercise._id} exercise={exercise} />;
                    })}
                </div>
            </div>
        </main>
    );
}
