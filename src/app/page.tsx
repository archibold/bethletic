import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="relative place-items-center grid grid-cols-1 md:grid-cols-2 md-10 md:gap-20">
                <Image
                    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] md:w-full max-w-96 rounded-full"
                    src="/b_logo.jpeg"
                    alt="Next.js Logo"
                    width={350}
                    height={350}
                    priority
                />
                <div className="">
                    <h1 className="text-8xl mb-10">Bethletic</h1>
                    <p className="text-4xl m-0 max-w-[30ch] opacity-50 mb-10">
                        Find the best exercises by target muscle or by
                        equipment.
                    </p>
                    <Link
                        className="rounded-xl bg-amber-300 px-10 py-5"
                        href="/dashboard"
                    >
                        Go to App
                    </Link>
                </div>
            </div>
        </main>
    );
}
