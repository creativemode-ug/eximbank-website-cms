import { FieldValues, useController } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import type {
    FieldProps,
    BaseSelectOption,
} from "@/components/form-fields/types"
import FieldLabel, {
    FieldLabelProps,
} from "@/components/form-fields/field-label"

import CheckboxInput from "@/components/form-fields/checkbox-group/checkbox-input"
import ErrorMessage from "@/components/form-fields/error-message"

export type CheckboxFieldProps<T extends FieldValues> = FieldLabelProps &
    FieldProps<T> & {
        option: BaseSelectOption
    }

function ChechboxField<T extends FieldValues>({
    control,
    name,
    text,
    htmlFor,
    className,
    required,
    hint,
    option,
}: CheckboxFieldProps<T>) {
    const {
        field,
        fieldState: { error },
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
            <fieldset>
                <label className="flex items-center gap-2" key={option.value}>
                    <CheckboxInput
                        id={option.value}
                        {...field}
                        checked={field.value}
                    />

                    <span className="text-xs xl:text-sm text-zinc-500">
                        {option.label}
                    </span>
                </label>
            </fieldset>
            <ErrorMessage error={error?.message} />
        </div>
    )
}

export default ChechboxField
