import SkeletonLoader from "@/components/loaders/skeleton-loader"

export function ProductCardLoader() {
    return (
        <div className="border border-zinc-200 rounded-lg p-2 space-y-4">
            <SkeletonLoader className="h-48 w-full rounded-lg" />
            <div className="space-y-2">
                <SkeletonLoader className="h-4 w-1/2" />
                <SkeletonLoader className="h-4 w-1/3" />
            </div>
        </div>
    )
}
