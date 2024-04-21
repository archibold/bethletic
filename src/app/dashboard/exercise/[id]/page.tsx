import { notFound } from "next/navigation";
import { fetchExercise } from "../../../lib/data";
import Exercise from "../../../ui/dashboard/exercise";
import Breadcrumbs from "../../../ui/dashboard/breadcrumbs";

export default async function Page({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams?: {
        query?: string;
    };
}) {
    const exercise = await fetchExercise(params.id);
    let label = "Exercises";
    let href = "/dashboard/";
    let breadcrumbs: Array<{ label: string; href: string; active?: boolean }> =
        [];

    if (!exercise) {
        notFound();
    }

    if (searchParams?.query) {
        let href = "/dashboard/";
        const splitedLabel = searchParams?.query.split("/");
        breadcrumbs = splitedLabel.map((label, index) => {
            return {
                label: index === 0 ? `By ${label}` : label,
                href: (href = href + label + "/"),
            };
        });

        console.log(breadcrumbs);
    }
    breadcrumbs.push({
        label: exercise.name,
        href: `/dashboard/exercise/${exercise._id}`,
        active: true,
    });
    return (
        <main>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <Exercise exercise={exercise} />
        </main>
    );
}
