import { ComponentPropsWithRef } from "react"
import { twMerge } from "tailwind-merge"

function TableCell({
    ref,
    className,
    ...attributes
}: ComponentPropsWithRef<"td">) {
    return (
        <td
            ref={ref}
            className={twMerge("p-4 align-middle text-xs", className)}
            {...attributes}
        />
    )
}

export default TableCell
