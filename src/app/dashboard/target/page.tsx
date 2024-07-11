import { Suspense } from "react";
import { inter } from "@/app/fonts";
import TargetExercises from "@/components/dashboard/target/target-exercises";
import { CategoriesSkeleton } from "@/components/skeletons";
import { Metadata } from "next";

// export const metadata: Metadata = {
//     title: "By target",
// };

export default function Page() {
    return (
        <main>
            <h1
                className={`${inter.className} font-medium leading-tight tracking-tighter mb-4 text-xl md:text-2xl`}
            >
                By target
            </h1>
            <Suspense fallback={<CategoriesSkeleton />}>
                <TargetExercises />
            </Suspense>
        </main>
    );
}
