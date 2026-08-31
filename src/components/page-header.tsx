import { twMerge } from "tailwind-merge"
import type { ReactNode } from "react"

export type PageHeaderProps = {
    className?: string
    title: string
    titleClassName?: string
    description?: string
    children?: ReactNode
}

const PageHeader = ({
    className,
    title,
    titleClassName,
    description,
    children,
}: PageHeaderProps) => {
    return (
        <div
            className={twMerge("flex items-center justify-between", className)}
        >
            <div className="w-4/5 md:w-3/5 xl:w-1/3 space-y-1">
                <h2
                    className={twMerge(
                        "text-primary font-semibold 2xl:text-lg",
                        titleClassName
                    )}
                >
                    {title}
                </h2>

                <p className="text-xs text-zinc-500">{description}</p>
            </div>

            {children}
        </div>
    )
}

export default PageHeader
