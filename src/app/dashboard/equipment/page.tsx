import { lusitana } from "@/app/ui/fonts";
import { fetchEquipmentCategories } from "../../lib/data";
import CategoryCard from "../../ui/dashboard/categoryCard";

export default async function Page() {
    const categories = await fetchEquipmentCategories();
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                By Equipment
            </h1>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                {/* <Suspense fallback={<CardsSkeleton />}> */}
                {categories.map((category) => {
                    return (
                        <CategoryCard
                            key={category.equipment}
                            name={category.equipment}
                            category="equipment"
                        />
                    );
                })}
            </div>
        </main>
    );
}
