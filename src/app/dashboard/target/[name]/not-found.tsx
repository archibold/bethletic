import Link from "next/link";

export default function NotFound() {
    return (
        <div className="h-full w-full flex justify-center items-center flex-col gap-2">
            Looks like cannot find any exercises for this target
            <Link
                className="inline-flex m-1 items-center px-3 py-1.5 text-sm font-medium text-center  rounded-full  focus:ring-1 focus:outline-none bg-blue-100 hover:bg-blue-200 focus:ring-blue-300"
                href="/dashboard/target"
            >
                Go back
            </Link>
        </div>
    );
}
