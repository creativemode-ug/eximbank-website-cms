import { FieldValues, useController } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import { FieldProps } from "@/components/form-fields/types"
import FieldLabel, {
    FieldLabelProps,
} from "@/components/form-fields/field-label"
import TextAreaInput, {
    TextAreaInputProps,
} from "@/components/form-fields/textarea/text-area-input"

import ErrorMessage from "@/components/form-fields/error-message"

export type TextAraFieldProps<T extends FieldValues> = TextAreaInputProps &
    FieldLabelProps &
    FieldProps<T>

function TextAreaField<T extends FieldValues>({
    control,
    name,
    text,
    className,
    placeholder,
    required,
    htmlFor,
    hint,
    ...attributes
}: TextAraFieldProps<T>) {
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
                <TextAreaInput
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

export default TextAreaField
