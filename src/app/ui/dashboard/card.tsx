import { lusitana } from "../fonts";
import Image from "next/image";
import Tag from "./tag";
import Link from "next/link";
import { Exercise } from "../../lib/definitions";

export default function Card({
    exercise,
    category,
    subcategory,
}: {
    exercise: Exercise;
    category?: string;
    subcategory?: string;
}) {
    let query = `?name=${exercise.name}`;

    if (category) {
        query += `&query=${category}/${subcategory}`;
    }

    return (
        <div className="w-full md:col-span-2 rounded-xl bg-gray-100 hover:bg-gray-200 relative ">
            <Link
                className="absolute top-0 right-0 left-0 bottom-0 z-10"
                href={`/dashboard/exercise/${exercise._id}${query}`}
            ></Link>
            <div className="flex rounded-xl rounded-b-none bg-white p-2 relative justify-center mb-2">
                <div className="absolute right-2 z-20">
                    <Tag name={exercise.equipment} equipment />
                </div>
                <Image
                    alt="name"
                    src={exercise.gif_url}
                    unoptimized={true}
                    width={150}
                    height={150}
                />
            </div>
            <h2
                className={`${lusitana.className} ml-3 mr-3 text-lg font-medium pb-2`}
            >
                {exercise.name}
            </h2>
            <div className="ml-2 mr-2 relative flex pb-2 pt-2 items-center flex-wrap z-20">
                <Tag name={exercise.target} />
                {exercise.secondary_muscles.map((muscle) => (
                    <Tag key={muscle} name={muscle} secondary />
                ))}
            </div>
        </div>
    );
}
