import { fetchExercisesByTarget } from "../../../lib/data";
import Card from "../card";
import { notFound } from "next/navigation";

export default async function EquipmenyByName({ name }: { name: string }) {
    const exercises = await fetchExercisesByTarget(name);

    if (exercises.length === 0) {
        notFound();
    }

    return (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
            {exercises.map((exercise) => {
                return (
                    <Card
                        key={exercise._id}
                        exercise={exercise}
                        category="target"
                        subcategory={name}
                    />
                );
            })}
        </div>
    );
}
