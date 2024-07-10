import Link from "next/link";
import NavLinks from "./nav-links";
import Image from "next/image";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";

export default function SideNav() {
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link
                className="mb-2 flex h-20 items-center justify-center rounded-md bg-amber-100 md:h-44"
                href="/dashboard"
            >
                <div className="flex flex-col items-center ">
                    <Image
                        className="opacity-50 rounded-full hidden md:flex mb-2"
                        src="/b_logo.jpeg"
                        alt="logo"
                        width={100}
                        height={100}
                    />
                    <p className="text-4xl">Bethletic</p>
                </div>
            </Link>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
                {/* <Link
                    href="/dashboard/user/"
                    className={clsx(
                        "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-red-50 p-3 text-sm font-medium hover:bg-red-100 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3",
                        {
                            "!bg-red-100 text-red-600": pathname === link.href,
                        }
                    )}
                >
                    <LinkIcon className="w-6" />
                    <p className="hidden md:block">{link.name}</p>
                </Link> */}
                <form
                    action={async () => {
                        "use server";
                        await signOut();
                    }}
                >
                    <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                        <PowerIcon className="w-6" />
                        <div className="hidden md:block">Sign Out</div>
                    </button>
                </form>
            </div>
        </div>
    );
}
