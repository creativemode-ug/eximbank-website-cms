import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";


export type PageContainerProps = {
    className?: string
    children: ReactNode
}

export default function PageContainer({ className, children }: PageContainerProps) {

    return (
        <div className={twMerge("container py-10 space-y-10", className)}>
            {children}
        </div>
    )
}