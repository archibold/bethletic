import { fetchExampleExercise } from "../../../lib/data";
import Card from "../card";

export default async function SampleExercises() {
    const exercises = await fetchExampleExercise();

    return (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
            {exercises.map((exercise) => {
                return <Card key={exercise._id} exercise={exercise} />;
            })}
        </div>
    );
}
