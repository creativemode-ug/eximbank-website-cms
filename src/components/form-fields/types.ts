import type { ReactNode } from "react"
import type { FieldValues, Path, Control } from "react-hook-form"

export type FieldProps<T extends FieldValues> = {
    name: Path<T>
    control: Control<T>
}

export type BaseSelectOption = {
    label: string
    value: string
}

export type ChoiceOption = BaseSelectOption & {
    widget?: ReactNode
}
