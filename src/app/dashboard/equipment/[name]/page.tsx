import { lusitana } from "@/app/ui/fonts";
import { fetchExercisesByEquipment } from "../../../lib/data";
import Card from "../../../ui/dashboard/card";
import Breadcrumbs from "../../../ui/dashboard/breadcrumbs";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { name: string } }) {
    const encodedURI = decodeURI(params.name);
    const exercises = await fetchExercisesByEquipment(encodedURI);

    if (exercises.length === 0) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    {
                        label: `By equipment`,
                        href: "/dashboard/equipment/",
                    },
                    {
                        label: encodedURI,
                        href: `/dashboard/equipment/${params.name}`,
                        active: true,
                    },
                ]}
            />
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                {exercises.map((exercise) => {
                    return (
                        <Card
                            key={exercise._id}
                            exercise={exercise}
                            category="equipment"
                            subcategory={encodedURI}
                        />
                    );
                })}
            </div>
        </main>
    );
}
