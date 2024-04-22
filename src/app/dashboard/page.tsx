import { lusitana } from "@/app/ui/fonts";
import { CardsSkeleton } from "../ui/skeletons";
import { Suspense } from "react";
import SampleExercises from "../ui/dashboard/exercises/sample-exercises";
import TargetRandomExercises from "../ui/dashboard/exercises/random-target";
import EquipmentRandomExercises from "../ui/dashboard/exercises/random-equipment";

export const metadata: Metadata = {
    title: "Dashboard",
};

export default function Page() {
    return (
        <main>
            <div className="mb-5">
                <h1
                    className={`${lusitana.className} mb-4 text-xl md:text-2xl`}
                >
                    Sample exercises
                </h1>
                <Suspense fallback={<CardsSkeleton />}>
                    <SampleExercises />
                </Suspense>
            </div>
            <div className="mb-5">
                <h1
                    className={`${lusitana.className} mb-4 text-xl md:text-2xl`}
                >
                    By target
                </h1>
                <Suspense fallback={<CardsSkeleton />}>
                    <TargetRandomExercises />
                </Suspense>
            </div>
            <div className="mb-5">
                <h1
                    className={`${lusitana.className} mb-4 text-xl md:text-2xl`}
                >
                    By equipment
                </h1>
                <Suspense fallback={<CardsSkeleton />}>
                    <EquipmentRandomExercises />
                </Suspense>
            </div>
        </main>
    );
}
