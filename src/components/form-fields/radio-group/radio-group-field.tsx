import { FieldValues, useController } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import type { FieldProps, ChoiceOption } from "@/components/form-fields/types"
import FieldLabel, {
    FieldLabelProps,
} from "@/components/form-fields/field-label"

import RadioInput from "@/components/form-fields/radio-group/radio-input"
import ErrorMessage from "@/components/form-fields/error-message"
import ConditionalRender from "@/components/conditional-render"

export type RadioFieldProps<T extends FieldValues> = FieldLabelProps &
    FieldProps<T> & {
        options: ChoiceOption[]
    }

function RadioGroupField<T extends FieldValues>({
    control,
    name,
    text,
    htmlFor,
    className,
    required,
    hint,
    options,
}: RadioFieldProps<T>) {
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
            <fieldset className="flex items-center gap-4">
                {options.map(option => (
                    <label
                        className={twMerge(
                            option.widget !== undefined
                                ? "w-full"
                                : "flex items-center space-x-2"
                        )}
                        key={option.value}
                    >
                        <RadioInput
                            id={option.value}
                            ref={field.ref}
                            name={name}
                            className={twMerge(
                                "size-4",
                                option.widget && "hidden"
                            )}
                            onChange={() => {
                                field.onChange(option.value)
                            }}
                            onBlur={field.onBlur}
                            value={option.value}
                            checked={option.value === field.value}
                        />

                        <ConditionalRender
                            condition={option.widget === undefined}
                        >
                            <span className="grow text-sm">{option.label}</span>

                            <div
                                className={twMerge(
                                    "w-full ring-1 ring-offset-1 ring-transparent rounded-lg",
                                    option.value == field.value &&
                                        "ring-primary"
                                )}
                            >
                                {option.widget}
                            </div>
                        </ConditionalRender>
                    </label>
                ))}
            </fieldset>
            <ErrorMessage error={error?.message} />
        </div>
    )
}

export default RadioGroupField
