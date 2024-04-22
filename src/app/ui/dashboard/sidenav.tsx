import Link from "next/link";
import NavLinks from "./nav-links";
import Image from "next/image";

export default function SideNav() {
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link
                className="flex h-20 items-center justify-center rounded-md bg-amber-400 md:h-44"
                href="/dashboard"
            >
                <div className="flex flex-col items-center text-white ">
                    <Image
                        className="rounded-full hidden md:flex"
                        src="/logo.jpeg"
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
            </div>
        </div>
    );
}
