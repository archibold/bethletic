import { inter } from "@/app/fonts";
import Tag from "./tag";
import Image from "next/image";
// import { fetchExercise } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { fetchExercise } from "@/lib/data2";

export default async function Exercise({ id }: { id: string }) {
    const exercise = await fetchExercise(id);

    if (!exercise) {
        notFound();
    }

    return (
        <>
            <div className="text-gray-500">
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
            <div className="w-full grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 rounded-xl bg-gray-50 p-4 md:flex-row">
                <div className="flex-none lg:col-span-1">
                    <div className="flex rounded-xl bg-white p-2 relative justify-center mb-2">
                        <div className="absolute right-2">
                            <Tag name={exercise.equipment!} equipment />
                        </div>
                        <Image
                            alt="name"
                            src={exercise.gif_url + ".gif"}
                            className="mr-4 rounded-full"
                            unoptimized={true}
                            width={250}
                            height={250}
                        />
                    </div>
                </div>

                <ol className={`${inter.className} list-decimal lg:col-span-2`}>
                    {/* {exercise.instructions.map((step) => (
                        <li className="py-2 ml-7 max-w-[600px]" key={step}>
                            <p className="leading-snug">{step}</p>
                        </li>
                    ))} */}
                </ol>
            </div>
        </>
    );
}
