import { CardsSkeleton } from "@/components/skeletons";
import { Suspense } from "react";
import { Metadata } from "next";
import Exercises from "@/components/dashboard/exercises/exercises";
import Search from "@/components/search";

export const metadata: Metadata = {
    title: "Dashboard",
};

export default function Page({
    searchParams,
}: {
    searchParams: { q: string };
}) {
    const q = searchParams.q || "";

    return (
        <main>
            <div className="mb-5">
                <Search placeholder="Search..." />
                <Suspense fallback={<CardsSkeleton />}>
                    <Exercises search={q} />
                </Suspense>
            </div>
        </main>
    );
}
