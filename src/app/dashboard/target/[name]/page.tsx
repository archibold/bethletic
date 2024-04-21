import { lusitana } from "@/app/ui/fonts";
import { fetchExercisesByTarget } from "../../../lib/data";
import Card from "../../../ui/dashboard/card";
import Breadcrumbs from "../../../ui/dashboard/breadcrumbs";

export default async function Page({ params }: { params: { name: string } }) {
    const encodedURI = decodeURI(params.name);
    const exercises = await fetchExercisesByTarget(encodedURI);
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    {
                        label: `By target`,
                        href: "/dashboard/target/",
                    },
                    {
                        label: encodedURI,
                        href: `/dashboard/target/${params.name}`,
                        active: true,
                    },
                ]}
            />
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                {exercises.map((exercise) => {
                    return (
                        <Card
                            key={exercise._id}
                            id={exercise._id}
                            title={exercise.name}
                            url={exercise.gif_url}
                            bodyPart={exercise.body_part}
                            equipment={exercise.equipment}
                            target={exercise.target}
                            secondaryMuscles={exercise.secondary_muscles}
                            category="target"
                            subcategory={encodedURI}
                        />
                    );
                })}
            </div>
        </main>
    );
}
