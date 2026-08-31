import { ComponentPropsWithRef } from "react"
import { twMerge } from "tailwind-merge"

function TableHeader({
    ref,
    className,
    ...attributes
}: ComponentPropsWithRef<"thead">) {
    return (
        <thead
            ref={ref}
            className={twMerge(
                "text-[10px] text-zinc-600 capitalize",
                className
            )}
            {...attributes}
        />
    )
}

export default TableHeader
