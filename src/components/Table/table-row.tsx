import { ComponentPropsWithRef } from "react"
import { twMerge } from "tailwind-merge"

function TableRow({
    ref,
    className,
    ...attributes
}: ComponentPropsWithRef<"tr">) {
    return (
        <tr
            className={twMerge(
                "relative bg-white hover:bg-zinc-50 text-xs",
                className
            )}
            ref={ref}
            {...attributes}
        />
    )
}

export default TableRow
