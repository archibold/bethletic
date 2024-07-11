import { CardExercise, fetchExerciseByQuery } from "@/lib/data2";
import Card from "@/components/dashboard/card";
// import { GetServerSideProps, GetStaticProps } from "next";
// import { exercise } from "@prisma/client";

export default async function Exercises({ search }: { search: string }) {
    let exercises: CardExercise[] = await fetchExerciseByQuery(search);

    return (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
            {exercises.map((exercise) => {
                return <Card key={exercise.id} exercise={exercise} />;
            })}
        </div>
    );
}
