import CategoryCard from "@/app/ui/dashboard/categoryCard";
import { fetchEquipmentCategories } from "../../../lib/data2";

export default async function EquipmentCategory() {
    const categories = await fetchEquipmentCategories();
    return (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
            {categories.map((category) => {
                return (
                    <CategoryCard
                        key={category.equipment}
                        name={category.equipment!}
                        category="equipment"
                    />
                );
            })}
        </div>
    );
}
