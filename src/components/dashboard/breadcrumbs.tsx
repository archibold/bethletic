"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { inter } from "@/app/fonts";
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
        <nav aria-label="Breadcrumb" className="block">
            <button
                className="mb-2 p-2 rounded-md text-gray-300 flex items-center justify-center hover:bg-gray-200 hover:text-gray-50"
                onClick={router.back}
            >
                <ArrowLeftIcon className="mr-2 h-4 w-4" /> Go back
            </button>
            <ol
                className={clsx(
                    inter.className,
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
                        <Link href={breadcrumb.href}>
                            <h1 className="leading-tight tracking-tighter">
                                {breadcrumb.label}
                            </h1>
                        </Link>
                        {index < breadcrumbs.length - 1 ? (
                            <span className="mx-3 inline-block">/</span>
                        ) : null}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
