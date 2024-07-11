// Loading animation
const shimmer =
    "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent z-100";

export function CardSkeleton() {
    return (
        <div
            className={`${shimmer} w-full md:col-span-2 relative overflow-hidden rounded-xl bg-gray-100 shadow-sm`}
        >
            <div className="flex rounded-xl rounded-b-none bg-white p-2 relative justify-center mb-2">
                <div className="inline-flex m-1 items-center bg-gray-50 px-8 py-3.5 text-sm font-medium text-center  rounded-full  focus:ring-1 focus:outline-none absolute right-2 z-20"></div>
                <div
                    className={`${shimmer} h-[150px] w-[150px] rounded-xl bg-gray-100`}
                />
            </div>
            <div className="ml-3 mr-3 mb-3 mt-1 pb-2 bg-gray-200 h-6 rounded-xl"></div>
            <div className="ml-2 mr-2 relative flex pb-2 pt-2 items-center flex-wrap">
                <div className="inline-flex m-1 items-center bg-gray-200 px-8 py-3.5 text-sm font-medium text-center  rounded-full  focus:ring-1 focus:outline-none "></div>
                <div className="inline-flex m-1 items-center bg-gray-200 px-8 py-3.5 text-sm font-medium text-center  rounded-full  focus:ring-1 focus:outline-none"></div>
                <div className="inline-flex m-1 items-center bg-gray-200 px-8 py-3.5 text-sm font-medium text-center  rounded-full  focus:ring-1 focus:outline-none"></div>
            </div>
        </div>
    );
}
export function ImageSkeleton() {
    return (
        <div className="inline-flex m-1 items-center bg-gray-50 px-8 py-3.5 text-sm font-medium text-center  rounded-full  focus:ring-1 focus:outline-none absolute right-2 z-20"></div>
    );
}

export function ExerciseSkeleton() {
    return (
        <div
            className={`${shimmer} w-full grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 relative overflow-hidden rounded-xl bg-gray-100 shadow-sm p-4`}
        >
            <div className="flex-none md:w-60 ">
                <div className="flex rounded-xl p-2 relative justify-center mb-2">
                    <div className="inline-flex m-1 items-center bg-gray-50 px-8 py-3.5 text-sm font-medium text-center  rounded-full  focus:ring-1 focus:outline-none absolute right-2 z-20"></div>
                    <div className="h-[250px] w-[250px] rounded-xl bg-white" />
                </div>
                <div className="flex pb-2 pt-2 pl-2 items-center flex-wrap">
                    <div className="inline-flex m-1 items-center bg-gray-200 px-8 py-3.5 text-sm font-medium text-center  rounded-full  focus:ring-1 focus:outline-none "></div>
                    <div className="inline-flex m-1 items-center bg-gray-200 px-8 py-3.5 text-sm font-medium text-center  rounded-full  focus:ring-1 focus:outline-none"></div>
                    <div className="inline-flex m-1 items-center bg-gray-200 px-8 py-3.5 text-sm font-medium text-center  rounded-full  focus:ring-1 focus:outline-none"></div>
                </div>
            </div>
            <div className="list-decimal">
                <div className="py-4 px-20 ml-7 mb-3 bg-gray-200 w-full flex-1"></div>
                <div className="py-4 px-20 ml-7 mb-3 bg-gray-200 w-full flex-1"></div>
                <div className="py-4 px-20 ml-7 mb-3 bg-gray-200 w-full flex-1"></div>
                <div className="py-4 px-20 ml-7 mb-3 bg-gray-200 w-full flex-1"></div>
                <div className="py-4 px-20 ml-7 mb-3 bg-gray-200 w-full flex-1"></div>
                <div className="py-4 px-20 ml-7 mb-3 bg-gray-200 w-full flex-1"></div>
            </div>
        </div>
    );
}

export function CategorySkeleton() {
    return (
        <div
            className={`${shimmer} relative w-full md:col-span-2 rounded-xl bg-gray-100 `}
        >
            <div className="flex items-center flex-1 rounded-xl bg-gray-50 p-4 h-14 hover:bg-gray-100">
                <div className=" w-full h-4 rounded-xl bg-gray-200" />
            </div>
        </div>
    );
}

export function CardsSkeleton() {
    return (
        <div className="mb-5">
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
            </div>
        </div>
    );
}

export function CategoriesSkeleton() {
    return (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
        </div>
    );
}
