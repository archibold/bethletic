import { inter } from "@/app/fonts";
import EquipmentExercises from "@/components/dashboard/equipment/equipment-exercises";
import { Suspense } from "react";
import { CategoriesSkeleton } from "@/components/skeletons";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "By exercise",
};

export default function Page() {
    return (
        <main>
            <h1
                className={`${inter.className} font-medium leading-tight tracking-tighter mb-4 text-xl md:text-2xl`}
            >
                By equipment
            </h1>
            <Suspense fallback={<CategoriesSkeleton />}>
                <EquipmentExercises />
            </Suspense>
        </main>
    );
}
