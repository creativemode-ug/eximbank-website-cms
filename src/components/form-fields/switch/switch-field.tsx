import { Switch } from "@headlessui/react"
import { FieldValues, useController } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import { FieldProps } from "@/components/form-fields/types"

import ErrorMessage from "@/components/form-fields/error-message"

export type SwitchFieldProps<T extends FieldValues> = FieldProps<T> & {
    text: string
    className?: string
}

function SwitchField<T extends FieldValues>({
    control,
    className,
    name,
    text,
}: SwitchFieldProps<T>) {
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
    })
    return (
        <div className={twMerge("space-y-1", className)}>
            <div className="inline-flex items-center text-sm text-zinc-500">
                <Switch
                    checked={field.value}
                    onChange={field.onChange}
                    className={`${field.value ? "bg-primary" : "bg-zinc-300"}
                relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                >
                    <span className="sr-only">{text}</span>
                    <span
                        aria-hidden="true"
                        className={`${
                            field.value ? "translate-x-5" : "translate-x-0"
                        }
                    pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                </Switch>
                <span className="ml-3">{text}</span>
            </div>
            <ErrorMessage error={error?.message} />
        </div>
    )
}

export default SwitchField
