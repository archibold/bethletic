import { fetchExampleExercise, fetchExerciseByQuery } from "@/app/lib/data";
import Card from "@/app/ui/dashboard/card";

export default async function Exercises({ search }: { search: string }) {
    const sampleSxercises = await fetchExampleExercise();
    const exercises = await fetchExerciseByQuery(search);

    return (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
            {exercises.map((exercise) => {
                return <Card key={exercise._id} exercise={exercise} />;
            })}

            {!!exercises &&
                sampleSxercises.map((exercise) => {
                    return <Card key={exercise._id} exercise={exercise} />;
                })}
        </div>
    );
}
