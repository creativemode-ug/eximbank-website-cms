import { ComponentPropsWithRef } from "react"
import { twMerge } from "tailwind-merge"

export type RadioInputProps = ComponentPropsWithRef<"input">

function RadioInput({
    name,
    value,
    className,
    readOnly,
    disabled,
    checked,
    ...attributes
}: RadioInputProps) {
    return (
        <input
            {...attributes}
            name={name}
            value={value}
            className={twMerge(
                (disabled || readOnly) && "bg-zinc-100",
                className
            )}
            checked={checked}
            type={"radio"}
        />
    )
}

export default RadioInput
