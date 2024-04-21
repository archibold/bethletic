import clsx from "clsx";
import Link from "next/link";
export default function Tag({
    name,
    secondary,
    equipment,
}: {
    name: string;
    secondary?: boolean;
    equipment?: boolean;
}) {
    const link = !equipment
        ? `/dashboard/target/${name}`
        : `/dashboard/equipment/${name}`;
    return (
        <Link
            href={link}
            type="button"
            className={clsx(
                "inline-flex m-1 items-center px-3 py-1.5 text-sm font-medium text-center  rounded-full  focus:ring-1 focus:outline-none ",
                {
                    "bg-amber-50 hover:bg-amber-100 focus:ring-amber-300":
                        secondary,
                    "bg-gray-50 hover:bg-slate-100 focus:ring-slate-300":
                        equipment,
                    "bg-red-100 hover:bg-red-200 focus:ring-red-300":
                        !secondary && !equipment,
                }
            )}
        >
            {name}
        </Link>
    );
}
