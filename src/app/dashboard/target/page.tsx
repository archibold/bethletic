import { lusitana } from "@/app/ui/fonts";
import TargetExercises from "../../ui/dashboard/target/target-exercises";
import { Suspense } from "react";
import { CategoriesSkeleton } from "../../ui/skeletons";

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
