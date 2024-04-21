import { lusitana } from "@/app/ui/fonts";
import { fetchBodyPartCategories, fetchExampleExercise } from "../lib/data";
import Card from "../ui/dashboard/card";

export default async function Page() {
    const exercises = await fetchExampleExercise();
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Sample exercises
            </h1>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                {/* <Suspense fallback={<CardsSkeleton />}> */}
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
                        />
                    );
                })}
                {/* </Suspense> */}
            </div>
            {/* <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<RevenueChartSkeleton />}>
                    <RevenueChart />
                </Suspense>
                <Suspense fallback={<LatestInvoicesSkeleton />}>
                    <LatestInvoices />
                </Suspense>
            </div> */}
        </main>
    );
}
