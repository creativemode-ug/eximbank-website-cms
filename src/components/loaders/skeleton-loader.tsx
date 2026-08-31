import { twMerge } from "tailwind-merge"

type Props = {
    className?: string
}

export default function SkeletonLoader({ className }: Props) {

    return (
        <div className={twMerge("h-4 w-4 bg-zinc-200 animate-pulse rounded", className)} />
    )
}