import { twMerge } from "tailwind-merge"
import { ReactNode } from "react"
import { useLocation, Link } from "react-router-dom"

export type Tab = {
    path: string
    name: string
    regexPattern: string
    icon?: ReactNode
}

export type LinkTabsProps = {
    tabs: Tab[]
    className?: string
}

function LinkTabs({ tabs, className }: LinkTabsProps) {
    const { pathname } = useLocation()

    const isPathActive = (value: string) => new RegExp(value).test(pathname)

    return (
        <div className={twMerge("max-w-max", className)}>
            <div className="flex w-full bg-zinc-50 border rounded-lg overflow-hidden p-0.5">
                {tabs.map(item => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={twMerge(
                            "cursor-pointer focus:outline-none text-xs font-medium",
                            "px-6 py-1.5 rounded-md",
                            isPathActive(item.regexPattern)
                                ? "text-white bg-primary-accent"
                                : "text-zinc-500 border-transparent"
                        )}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default LinkTabs
