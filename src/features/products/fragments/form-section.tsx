import { twMerge } from "tailwind-merge"
import type { ReactNode } from "react"

export type FormSectionProps = {
    className?: string
    title: string
    description?: string
    children?: ReactNode
}
function FormSection({
    title,
    description,
    children,
    className,
}: FormSectionProps) {
    return (
        <div className={twMerge("space-y-4", className)}>
            <div className="space-y-0.5">
                <h4 className="capitalize font-semibold text-sm">{title}</h4>
                <p className="text-xs text-zinc-500">{description}</p>
            </div>
            {children}
        </div>
    )
}

export default FormSection
