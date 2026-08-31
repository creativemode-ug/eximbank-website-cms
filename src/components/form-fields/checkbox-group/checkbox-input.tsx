import { ComponentPropsWithRef } from "react"
import { twMerge } from "tailwind-merge"

export type CheckboxInputProps = ComponentPropsWithRef<"input">

function CheckboxInput({
    name,
    value,
    className,
    readOnly,
    disabled,
    checked,
    ...attributes
}: CheckboxInputProps) {
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
            type={"checkbox"}
        />
    )
}

export default CheckboxInput
