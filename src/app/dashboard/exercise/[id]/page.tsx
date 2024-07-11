import Exercise from "@/components/dashboard/exercise";
import Breadcrumbs from "@/components/dashboard/breadcrumbs";
import { Suspense } from "react";
import { ExerciseSkeleton } from "@/components/skeletons";
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
        name?: string;
    };
}) {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    {
                        label: searchParams?.name || "",
                        href: `/dashboard/exercise/${params.id}`,
                        active: true,
                    },
                ]}
            />
            <Suspense fallback={<ExerciseSkeleton />}>
                <Exercise id={params.id} />
            </Suspense>
        </main>
    );
}
