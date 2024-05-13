import Breadcrumbs from "@/app/ui/dashboard/breadcrumbs";
// import TargetByName from "@/app/ui/dashboard/target/target-by-name";
import { Suspense } from "react";
import { CardsSkeleton } from "@/app/ui/skeletons";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "By target",
};
export default function Page({ params }: { params: { name: string } }) {
    const name = decodeURI(params.name);

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    {
                        label: `By target`,
                        href: "/dashboard/target/",
                    },
                    {
                        label: name,
                        href: `/dashboard/target/${params.name}`,
                        active: true,
                    },
                ]}
            />
            {/* <Suspense fallback={<CardsSkeleton />}>
                <TargetByName name={name} />
            </Suspense> */}
        </main>
    );
}
