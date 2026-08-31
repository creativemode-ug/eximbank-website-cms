import { ComponentProps, type ReactNode } from "react"
import { twMerge } from "tailwind-merge"

type ListItemProps = ComponentProps<"li"> & {
    children: ReactNode
}

type CircularListItemProps = ComponentProps<"li"> & {
    figure?: number
}

export const ListItem = ({ className, children }: ListItemProps) => {
    return (
        <li
            className={twMerge(
                "text-xs 2xl:text-sm list-disc ml-2.5",
                className
            )}
        >
            {children}
        </li>
    )
}

export const CircularListItem = ({
    figure,
    children,
    className,
}: CircularListItemProps) => {
    return (
        <li
            className={twMerge(
                "relative bg-tertiary-accent py-2 pl-4 pr-2 text-xs 2xl:text-sm rounded",
                className
            )}
        >
            <div className="absolute inset-y-0 -left-2 flex flex-col justify-center items-start">
                <div
                    className={twMerge(
                        "bg-gradient-to-br from-primary to-primary-accent",
                        "ring-2 ring-tertiary-accent/50 w-5 h-5 rounded-full",
                        "text-white font-medium flex flex-col justify-center items-center"
                    )}
                >
                    <span>{figure}</span>
                </div>
            </div>

            <div className="relative z-10">{children}</div>
        </li>
    )
}
