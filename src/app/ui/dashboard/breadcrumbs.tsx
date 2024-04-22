"use client";
import { clsx } from "clsx";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface Breadcrumb {
    label: string;
    href: string;
    active?: boolean;
}

export default function Breadcrumbs({
    breadcrumbs,
}: {
    breadcrumbs: Breadcrumb[];
}) {
    const router = useRouter();
    return (
        <nav aria-label="Breadcrumb" className="mb-6 block">
            <button
                className="mb-2 pr-2 pt-2 pb-2 rounded-s text-gray-200 flex items-center justify-center hover:bg-gray-200 hover:text-gray-50"
                onClick={router.back}
            >
                <ArrowLeftIcon className="mr-2 h-4 w-4" /> Go back
            </button>
            <ol
                className={clsx(
                    lusitana.className,
                    "flex text-xl md:text-2xl flex-wrap"
                )}
            >
                {breadcrumbs.map((breadcrumb, index) => (
                    <li
                        key={breadcrumb.href}
                        aria-current={breadcrumb.active}
                        className={clsx(
                            "flex",
                            breadcrumb.active
                                ? "text-gray-900"
                                : "text-gray-500"
                        )}
                    >
                        <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                        {index < breadcrumbs.length - 1 ? (
                            <span className="mx-3 inline-block">/</span>
                        ) : null}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
