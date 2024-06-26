import Link from "next/link";

export default function CategoryCard({
    name,
    category,
}: {
    name: string;
    category: string;
}) {
    return (
        <div className="w-full md:col-span-2">
            <Link href={`/dashboard/${category}/${name}`}>
                <div className="rounded-xl bg-gray-50 p-4 hover:bg-gray-100">
                    {name}
                </div>
            </Link>
        </div>
    );
}
