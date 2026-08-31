import { ComponentPropsWithRef } from "react"
import { twMerge } from "tailwind-merge"

function TableBody({
    ref,
    className,
    ...attributes
}: ComponentPropsWithRef<"tbody">) {
    return (
        <tbody
            className={twMerge(
                "text-zinc-600 divide-y divide-zinc-200",
                className
            )}
            ref={ref}
            {...attributes}
        />
    )
}

export default TableBody
