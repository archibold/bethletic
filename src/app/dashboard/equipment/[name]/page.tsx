import Breadcrumbs from "../../../ui/dashboard/breadcrumbs";
import EquipmenyByName from "../../../ui/dashboard/equipment/equipment-by-name";
import { Suspense } from "react";
import { CardsSkeleton } from "../../../ui/skeletons";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "By exercise",
};

export default function Page({ params }: { params: { name: string } }) {
    const name = decodeURI(params.name);

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    {
                        label: `By equipment`,
                        href: "/dashboard/equipment/",
                    },
                    {
                        label: name,
                        href: `/dashboard/equipment/${params.name}`,
                        active: true,
                    },
                ]}
            />
            <Suspense fallback={<CardsSkeleton />}>
                <EquipmenyByName name={name} />
            </Suspense>
        </main>
    );
}
