import { ComponentPropsWithRef } from "react"
import { twMerge } from "tailwind-merge"

import Hide from "@/components/hide"

export type FieldLabelProps = ComponentPropsWithRef<"label"> & {
    text?: string
    hint?: string
    required?: boolean
}

function FieldLabel({
    text,
    ref,
    htmlFor,
    className,
    hint,
    required,
    ...attributes
}: FieldLabelProps) {
    return (
        <Hide condition={typeof text !== "string"}>
            <div className="flex justify-between items-end mb-2">
                <label
                    htmlFor={htmlFor}
                    ref={ref}
                    className={twMerge(
                        "text-xs text-zinc-500 font-medium capitalize",
                        required &&
                            "after:content-['*'] after:pl-1 after:text-rose-800",
                        className
                    )}
                    {...attributes}
                >
                    {text}
                </label>

                {hint && (
                    <span className="text-[10px] text-zinc-400">{hint}</span>
                )}
            </div>
        </Hide>
    )
}

export default FieldLabel
