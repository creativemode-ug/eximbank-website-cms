import { ComponentPropsWithRef } from "react"
import { twMerge } from "tailwind-merge"

export type TextAreaInputProps = ComponentPropsWithRef<"textarea">

function TextAreaInput({
    className,
    placeholder,
    readOnly,
    disabled,
    ...attributes
}: TextAreaInputProps) {
    return (
        <textarea
            className={twMerge(
                "input",
                (disabled || readOnly) && "bg-zinc-100",
                className
            )}
            placeholder={placeholder}
            {...attributes}
        ></textarea>
    )
}

export default TextAreaInput
