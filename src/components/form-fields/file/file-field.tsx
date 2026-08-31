import { IconCloudUpload } from "@tabler/icons-react"
import { FieldValues, useController } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import { useEffect, useRef, useState } from "react"
import { FieldProps } from "@/components/form-fields/types"
import { FileListRender } from "@/components/form-fields/file/file-list-widgets"
import FieldLabel, {
    FieldLabelProps,
} from "@/components/form-fields/field-label"

import ErrorMessage from "@/components/form-fields/error-message"

export type FileInputProps = {
    className?: string
    placeholder?: string
    hint?: string
    formats?: string
    required?: boolean
    multiple?: boolean
}

export type FileFieldProps<T extends FieldValues> = FieldLabelProps &
    FieldProps<T> &
    FileInputProps

export default function FileField<T extends FieldValues>({
    control,
    name,
    text,
    required,
    htmlFor,
    hint,
    placeholder,
    className,
    formats,
    multiple,
}: FileFieldProps<T>) {
    const ref = useRef(null)
    const [files, setFiles] = useState<FileList | null>(null)

    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
    })

    useEffect(() => {}, [files])

    return (
        <div className={twMerge("space-y-1", className)}>
            <FieldLabel
                text={text}
                htmlFor={htmlFor}
                required={required}
                hint={hint}
            ></FieldLabel>

            <section>
                <input
                    type="file"
                    className="hidden"
                    id={name}
                    ref={ref}
                    onChange={event => {
                        field.onChange(event.target.files)
                        setFiles(event.target.files)
                    }}
                    onBlur={field.onBlur}
                    multiple={multiple}
                />

                <label
                    htmlFor={name}
                    className={twMerge(
                        "relative block w-full h-32 border border-dashed rounded-md cursor-pointer overflow-hidden",
                        error?.message
                            ? "border-rose-800 bg-rose-50"
                            : "border-zinc-200 bg-zinc-50"
                    )}
                >
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-zinc-500">
                        <IconCloudUpload
                            className="w-12 h-12 mb-2"
                            strokeWidth={1.2}
                        />
                        <p className="w-3/5 lg:w-1/2 text-center text-xs">
                            {placeholder} &nbsp; {formats}
                        </p>
                    </div>
                </label>
            </section>

            {files && <FileListRender files={files}></FileListRender>}

            <ErrorMessage error={error?.message} />
        </div>
    )
}
