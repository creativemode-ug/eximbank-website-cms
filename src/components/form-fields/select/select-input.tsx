import { ComponentPropsWithRef } from "react"
import { twMerge } from "tailwind-merge"
import type { BaseSelectOption } from "@/components/form-fields/types"

export type SelectInputProps = ComponentPropsWithRef<"select"> & {
    options: BaseSelectOption[]
}

function SelectInput({
    className,
    disabled,
    options,
    ...attributes
}: SelectInputProps) {
    return (
        <select
            className={twMerge("input", disabled && "bg-zinc-100", className)}
            {...attributes}
        >
            <option value=""></option>
            {options.map(el => (
                <option value={el.value} key={el.value}>{el.label}</option>
            ))}
        </select>
    )
}

export default SelectInput
