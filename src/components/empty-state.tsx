import type { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

import EmpyStateImage from "@/assets/empty-state.png"

export type EmptyStateProps = {
    image?: string
    icon?: ReactNode
    title: string
    description: string
    trailing?: ReactNode
    className?: string
}

export const EmptyState = ({
    image = EmpyStateImage,
    title,
    description,
    className,
    trailing,
}: EmptyStateProps) => {
    return (
        <div
            className={twMerge(
                "flex flex-col justify-center items-center min-w-full space-y-8",
                className
            )}
        >
            <img src={image} alt="exim" className="object-cover size-24" />

            <div className="w-full md:max-w-md xl:max-w-lg text-center space-y-8">
                <div className="space-y-2">
                    <h4 className="text-base font-semibold">{title}</h4>
                    <p className="text-xs 2xl:text-sm text-zinc-500">
                        {description}
                    </p>
                </div>

                {trailing}
            </div>
        </div>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useEmptyState(props: EmptyStateProps) {
    return <EmptyState {...props} />
}
