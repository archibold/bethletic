import { Exercise as ExerciseType } from "../../lib/definitions";
import Tag from "./tag";
import Image from "next/image";

export default function Exercise({ exercise }: { exercise: ExerciseType }) {
    return (
        <div className="w-full md:col-span-2 rounded-xl bg-gray-50 p-4">
            <div className="w-full md:col-span-4 flex flex-col md:flex-row">
                <div className="flex-none md:w-60">
                    <div className="flex rounded-xl bg-white p-2 relative justify-center mb-2">
                        <div className="absolute right-2">
                            <Tag name={exercise.equipment} equipment />
                        </div>
                        <Image
                            alt="name"
                            src={exercise.gif_url}
                            className="mr-4 rounded-full"
                            unoptimized={true}
                            width={250}
                            height={250}
                        />
                    </div>
                    <div className="flex pb-2 pt-2 items-center flex-wrap">
                        <Tag name={exercise.target} />
                        {exercise.secondary_muscles.map((muscle) => (
                            <Tag key={muscle} name={muscle} secondary />
                        ))}
                    </div>
                </div>

                <ol className="list-decimal">
                    {exercise.instructions.map((step) => (
                        <li className="py-2 ml-7" key={step}>
                            {step}
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}
