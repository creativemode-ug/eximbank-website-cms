import { FieldValues, useController } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import type { FieldProps } from "@/components/form-fields/types"
import FieldLabel, {
    FieldLabelProps,
} from "@/components/form-fields/field-label"
import SelectInput, {
    type SelectInputProps,
} from "@/components/form-fields/select/select-input"

import ErrorMessage from "@/components/form-fields/error-message"

export type SelectFieldProps<T extends FieldValues> = FieldLabelProps &
    FieldProps<T> &
    SelectInputProps

function SelectField<T extends FieldValues>({
    control,
    name,
    text,
    htmlFor,
    className,
    required,
    hint,
    options,
}: SelectFieldProps<T>) {
    const {
        field,
        fieldState: { error, invalid },
    } = useController({
        name,
        control,
    })

    return (
        <div className={twMerge("space-y-1", className)}>
            <FieldLabel
                text={text}
                htmlFor={htmlFor}
                required={required}
                hint={hint}
            ></FieldLabel>
            <div>
                <SelectInput
                    {...field}
                    className={invalid ? "input-error" : "input-default"}
                    options={options}
                />
                <ErrorMessage error={error?.message} />
            </div>
        </div>
    )
}

export default SelectField
