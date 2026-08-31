import { type ReactNode } from "react"
import { twMerge } from "tailwind-merge"

export type TableContainerProps = {
    className?: string
    children: ReactNode
}

function TableContainer({ className, children }: TableContainerProps) {
    return (
        <div
            className={twMerge(
                "overflow-x-auto overflow-y-hidden w-full space-y-5 py-5",
                "border border-zinc-100 rounded-md",
                className
            )}
        >
            {children}
        </div>
    )
}

export default TableContainer
