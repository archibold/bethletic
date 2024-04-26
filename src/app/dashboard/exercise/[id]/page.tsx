import Exercise from "@/app/ui/dashboard/exercise";
import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
import { Suspense } from "react";
import { ExerciseSkeleton } from "@/app/ui/skeletons";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Exercise",
};
export default function Page({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams?: {
        query?: string;
        name?: string;
    };
}) {
    let label = "Exercises";
    let href = "/dashboard/";
    let breadcrumbs: Array<{ label: string; href: string; active?: boolean }> =
        [];

    if (searchParams?.query) {
        let href = "/dashboard/";
        const splitedLabel = searchParams?.query.split("/");
        breadcrumbs = splitedLabel.map((label, index) => {
            return {
                label: index === 0 ? `By ${label}` : label,
                href: (href = href + label + "/"),
            };
        });
    }

    breadcrumbs.push({
        label: searchParams?.name || "",
        href: `/dashboard/exercise/${params.id}`,
        active: true,
    });
    return (
        <main>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <Suspense fallback={<ExerciseSkeleton />}>
                <Exercise id={params.id} />
            </Suspense>
        </main>
    );
}
