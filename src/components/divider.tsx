import { twMerge } from "tailwind-merge"

type DividerProps = {
    axis: "x" | "y"
    className?: string
}

const Divider = ({ axis, className }: DividerProps) => {
    return (
        <div
            className={twMerge(
                "bg-zinc-200 rounded-md",
                axis == "x" ? "flex-1 h-px" : "w-px h-6",
                className
            )}
        ></div>
    )
}

export default Divider
