import SkeletonLoader from "@/components/loaders/skeleton-loader";


export default function DocumentLoader() {

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 md:gap-8">
            {[...Array(10)].map((_, index) => (
                <div className="space-y-3" key={index}>
                    <SkeletonLoader className="h-56 w-full" />
                    <SkeletonLoader className="h-8 w-full" />
                </div>
            ))}
        </div>
    )
}