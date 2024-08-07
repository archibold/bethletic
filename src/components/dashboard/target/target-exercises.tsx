// import { fetchTargetCategories } from "@/app/lib/data";
import CategoryCard from "@/components/dashboard/categoryCard";
import { fetchTargetCategories } from "@/lib/data2";

export default async function TargetCategory() {
    const categories = await fetchTargetCategories();
    return (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
            {categories.map((category) => {
                return (
                    <CategoryCard
                        key={category.target}
                        name={category.target!}
                        category="target"
                    />
                );
            })}
        </div>
    );
}
