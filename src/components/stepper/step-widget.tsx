import { useLocation } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import type { ReactNode } from "react"

export type StepWidgetProps = {
    label: string
    icon: ReactNode
    regex: RegExp
}

function StepWidget({ label, icon, regex }: StepWidgetProps) {
    const { pathname } = useLocation()
    const isActive = regex.test(pathname)

    return (
        <div
            className={twMerge(
                "text-xs text-zinc-600 space-y-2",
                "flex flex-col items-center",
                isActive && "text-primary"
            )}
        >
            <div
                className={twMerge(
                    "flex justify-center items-center p-2",
                    "border border-zinc-200 rounded-full",
                    isActive && "text-white bg-primary border-primary"
                )}
            >
                {icon}
            </div>
            <p>{label}</p>
        </div>
    )
}

export default StepWidget
