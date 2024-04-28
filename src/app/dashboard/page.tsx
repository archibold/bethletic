import { inter } from "@/app/fonts";
import { CardsSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import SampleExercises from "@/app/ui/dashboard/exercises/sample-exercises";
import TargetRandomExercises from "@/app/ui/dashboard/exercises/random-target";
import EquipmentRandomExercises from "@/app/ui/dashboard/exercises/random-equipment";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard",
};

export default async function Page() {
    return (
        <main>
            <div className="mb-5">
                <h1
                    className={`${inter.className} font-medium leading-tight tracking-tighter mb-4 text-xl md:text-2xl`}
                >
                    Sample exercises
                </h1>
                <Suspense fallback={<CardsSkeleton />}>
                    <SampleExercises />
                </Suspense>
            </div>
            <div className="mb-5">
                <h1
                    className={`${inter.className} font-medium leading-tight tracking-tighter mb-4 text-xl md:text-2xl`}
                >
                    By target
                </h1>
                <Suspense fallback={<CardsSkeleton />}>
                    <TargetRandomExercises />
                </Suspense>
            </div>
            <div className="mb-5">
                <h1
                    className={`${inter.className} font-medium leading-tight tracking-tighter mb-4 text-xl md:text-2xl`}
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
