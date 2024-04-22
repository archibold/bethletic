import { lusitana } from "@/app/ui/fonts";
import EquipmentExercises from "../../ui/dashboard/equipment/equipment-exercises";
import { Suspense } from "react";
import { CategoriesSkeleton } from "../../ui/skeletons";

export default function Page() {
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                By equipment
            </h1>
            <Suspense fallback={<CategoriesSkeleton />}>
                <EquipmentExercises />
            </Suspense>
        </main>
    );
}
