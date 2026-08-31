import { ComponentPropsWithRef } from "react"
import { twMerge } from "tailwind-merge"

function TableHead({
    ref,
    className,
    ...attributes
}: ComponentPropsWithRef<"th">) {
    return (
        <th
            ref={ref}
            className={twMerge("text-xs font-medium", className)}
            {...attributes}
        />
    )
}

export default TableHead
