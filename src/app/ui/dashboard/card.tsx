import { lusitana } from "../fonts";
import Image from "next/image";
import Tag from "./tag";
import Link from "next/link";

export default function Card({
    title,
    url,
    bodyPart,
    equipment,
    target,
    secondaryMuscles,
    category,
    id,
    subcategory,
}: {
    id: number;
    title: string;
    url: string;
    bodyPart: string;
    equipment: string;
    target: string;
    secondaryMuscles: string[];
    category?: string;
    subcategory?: string;
}) {
    let query = "";
    if (category) {
        query = `?query=${category}/${subcategory}`;
    }
    return (
        <div className="w-full md:col-span-2">
            <Link href={`/dashboard/exercise/${id}${query}`}>
                <div className="rounded-xl bg-gray-50 p-4 hover:bg-gray-100">
                    <div className="w-full md:col-span-4">
                        <div className="flex rounded-xl bg-white p-2 relative justify-center mb-2">
                            <div className="absolute right-2">
                                <Tag name={equipment} equipment />
                            </div>
                            <Image
                                alt="name"
                                src={url}
                                className="mr-4 rounded-full"
                                unoptimized={true}
                                width={150}
                                height={150}
                            />
                        </div>
                        <h2 className="ml-2 text-lg font-medium pb-2">
                            {title}
                        </h2>
                        <div className="flex pb-2 pt-2 items-center flex-wrap">
                            <Tag name={target} />
                            {secondaryMuscles.map((muscle) => (
                                <Tag key={muscle} name={muscle} secondary />
                            ))}
                        </div>
                    </div>
                </div>
            </Link>
            {/* <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Example
            </h2> */}
        </div>
    );
}
