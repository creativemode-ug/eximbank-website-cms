import { twMerge } from "tailwind-merge"
import { type ReactNode } from "react"

type TemplateProps = {
    children: ReactNode
}

function TemplateContainer({ children }: TemplateProps) {
    return (
        <div
            className={twMerge(
                "bg-white border border-zinc-200 rounded-lg shadow-sm",
                "hover:border-primary/20 p-5 space-y-8"
            )}
        >
            {children}
        </div>
    )
}

function TemplateHighlights() {
    return (
        <div className="space-y-3">
            <div className="flex items-center space-x-4">
                <div className="h-2.5 w-8 bg-zinc-200 rounded-sm" />
                <div className="h-4 w-1/4 bg-zinc-200 rounded" />
                <div className="h-2.5 w-8 bg-zinc-200 rounded-sm" />
            </div>

            <div className="h-4 w-1/2 bg-zinc-200 rounded" />
            <div className="h-10 w-1/2 bg-zinc-200 rounded" />
        </div>
    )
}

function TemplateContent({ children }: TemplateProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="h-40 lg:h-full bg-zinc-200 rounded-md"></div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <div className="h-4 w-1/2 bg-zinc-200 rounded" />
                    <div className="h-10 w-full bg-zinc-200 rounded" />
                </div>

                {children}
            </div>
        </div>
    )
}

function TemplateContentOptions() {
    return (
        <div className="space-y-2">
            <div className="h-4 w-1/2 bg-zinc-200 rounded" />
            <ul className="space-y-2">
                {[...Array(2)].map((_, index) => (
                    <li
                        className="relative h-3.5 w-full bg-zinc-200 rounded"
                        key={index}
                    >
                        <div className="absolute inset-y-0 -left-1.5 flex items-center">
                            <div className="bg-zinc-200 border-2 border-white size-3 rounded-full" />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

function TemplateExtensions() {
    return (
        <div className="space-y-2">
            <div className="flex gap-2">
                <div className="h-2.5 w-1/5 bg-zinc-200 rounded-sm" />
                <div className="h-2.5 w-1/5 bg-zinc-200 rounded-sm" />
            </div>
            <div className="h-10 w-1/2 bg-zinc-200 rounded" />
        </div>
    )
}

export function ProductTemplate1() {
    return (
        <TemplateContainer>
            <TemplateHighlights />
            <TemplateContent>
                <TemplateContentOptions />
            </TemplateContent>
        </TemplateContainer>
    )
}

export function ProductTemplate2() {
    return (
        <TemplateContainer>
            <div className="space-y-4">
                <TemplateHighlights />
                <div className="h-6 w-20 bg-zinc-200 rounded" />
            </div>
            <TemplateContent>
                <TemplateContentOptions />
            </TemplateContent>
        </TemplateContainer>
    )
}

export function ProductTemplate3() {
    return (
        <TemplateContainer>
            <div className="space-y-4">
                <TemplateHighlights />
                <div className="h-6 w-20 bg-zinc-200 rounded" />
            </div>
            <TemplateContent>
                <TemplateContentOptions />
            </TemplateContent>
            <TemplateExtensions />
        </TemplateContainer>
    )
}
