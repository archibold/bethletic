import { lusitana } from "@/app/ui/fonts";
import { fetchTargetCategories } from "../../lib/data";
import CategoryCard from "../../ui/dashboard/categoryCard";

export default async function Page() {
    const categories = await fetchTargetCategories();
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                By target exercises
            </h1>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                {/* <Suspense fallback={<CardsSkeleton />}> */}
                {categories.map((category) => {
                    return (
                        <CategoryCard
                            key={category.target}
                            name={category.target}
                            category="target"
                        />
                    );
                })}
                {/* </Suspense> */}
            </div>
            {/* <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<RevenueChartSkeleton />}>
                    <RevenueChart />
                </Suspense>
                <Suspense fallback={<LatestInvoicesSkeleton />}>
                    <LatestInvoices />
                </Suspense>
            </div> */}
        </main>
    );
}
