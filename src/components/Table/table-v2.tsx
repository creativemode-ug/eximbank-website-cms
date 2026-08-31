import { ComponentPropsWithRef } from "react"
import { twMerge } from "tailwind-merge"

function Table({
    className,
    ref,
    ...attributes
}: ComponentPropsWithRef<"table">) {
    return (
        <table
            ref={ref}
            className={twMerge("table-fixed min-w-full", className)}
            {...attributes}
        />
    )
}

export default Table
