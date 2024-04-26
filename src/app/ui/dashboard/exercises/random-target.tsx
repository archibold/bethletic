import { fetchExampleExerciseByTarget } from "@/app/lib/data";
import Card from "@/app/ui/dashboard/card";

export default async function TargetRandomExercises() {
    const exercisec_by_random_target = await fetchExampleExerciseByTarget();
    return (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
            {exercisec_by_random_target.map((exercise) => {
                return <Card key={exercise._id} exercise={exercise} />;
            })}
        </div>
    );
}
