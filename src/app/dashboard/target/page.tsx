import { Suspense } from "react";
import { lusitana } from "@/app/fonts";
import TargetExercises from "@/app/ui/dashboard/target/target-exercises";
import { CategoriesSkeleton } from "@/app/ui/skeletons";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "By target",
};

export default function Page() {
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                By target
            </h1>
            <Suspense fallback={<CategoriesSkeleton />}>
                <TargetExercises />
            </Suspense>
        </main>
    );
}
