import { ComponentPropsWithRef } from "react"
import { twMerge } from "tailwind-merge"


export type TextInputProps = ComponentPropsWithRef<"input">

function TextInput({
    type,
    className,
    placeholder,
    readOnly,
    disabled,
    ...attributes
}: TextInputProps) {
    return (
        <input
            type={type}
            className={twMerge(
                "input",
                (disabled || readOnly) && "bg-zinc-100",
                className
            )}
            placeholder={placeholder}
            {...attributes}
        />
    )
}

export default TextInput
