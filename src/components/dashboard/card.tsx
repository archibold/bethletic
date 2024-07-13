import { inter } from "@/app/fonts";
import Image from "next/image";
import Tag from "./tag";
import Link from "next/link";
import { getSmallImageUrl } from "@/lib/utils";
import { CardExercise } from "@/lib/data2";

export default function Card({
    exercise,
    category,
    subcategory,
}: {
    exercise: CardExercise;
    category?: string;
    subcategory?: string;
}) {
    let query = `?name=${exercise.name}`;

    if (category) {
        query += `&query=${category}/${subcategory}`;
    }

    const gif_url = getSmallImageUrl(exercise.gif_url!);

    return (
        <div className="w-full md:col-span-2 rounded-xl bg-gray-100 hover:bg-gray-200 relative ">
            <Link
                className="absolute top-0 right-0 left-0 bottom-0 z-10"
                href={`/dashboard/exercise/${exercise.id}${query}`}
            ></Link>
            <div className="flex rounded-xl rounded-b-none bg-white p-2 relative justify-center mb-2">
                <div className="absolute right-2 z-20">
                    <Tag name={exercise.equipment!} equipment />
                </div>
                <Image
                    alt="name"
                    src={gif_url}
                    unoptimized={true}
                    width={150}
                    height={150}
                />
            </div>
            <h2
                className={`${inter.className} leading-tight tracking-tighter mx-3 text-xl`}
            >
                {exercise.name}
            </h2>
            <div className="m-3 mt-0 text-gray-500">
                <p>
                    {/* {exercise.secondary_muscles.map((muscle, index) => {
                        return (
                            muscle +
                            (index + 1 != exercise.secondary_muscles.length
                                ? ", "
                                : "")
                        );
                    })} */}
                </p>
            </div>
        </div>
    );
}
