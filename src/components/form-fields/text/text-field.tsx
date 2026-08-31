import { FieldValues, useController } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import { FieldProps } from "@/components/form-fields/types"
import FieldLabel, {
    FieldLabelProps,
} from "@/components/form-fields/field-label"
import TextInput, {
    TextInputProps,
} from "@/components/form-fields/text/text-input"

import ErrorMessage from "@/components/form-fields/error-message"

export type TextFieldProps<T extends FieldValues> = TextInputProps &
    FieldLabelProps &
    FieldProps<T>

function TextField<T extends FieldValues>({
    control,
    type,
    name,
    text,
    className,
    placeholder,
    required,
    htmlFor,
    hint,
    ...attributes
}: TextFieldProps<T>) {
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
                <TextInput
                    type={type}
                    className={twMerge(
                        "input",
                        invalid ? "input-error" : "input-default"
                    )}
                    placeholder={placeholder}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value}
                    {...attributes}
                />

                <ErrorMessage error={error?.message} />
            </div>
        </div>
    )
}

export default TextField
