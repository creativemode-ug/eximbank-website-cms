import { IconCloudUpload } from "@tabler/icons-react";
import { twMerge } from "tailwind-merge";
import { useEffect, useRef, useState } from "react";
import { FileListRender } from "./file-input/file-list-render";

import Label, { type LabelProps } from "@/components/FormControlls/shared/label";
import ErrorMessage from "@/components/FormControlls/shared/error-message";



type FileInputProps = LabelProps & {
    className?: string
    placeholder: string
    hint?: string
    hasError?: boolean
    error? : string,
    default?: string
    onChange: (value: FileList) => void;
    formats: string
    required?: boolean
}


export default function FileInput(props: FileInputProps) {
    const ref = useRef(null);

    const [files, setFiles] = useState<FileList | null>(null);

    useEffect(() => {
        if(files) {
            props.onChange(files);
        }
    }, [files])

    return (
        <div className={props.className}>
            <Label 
                name={props?.name ?? ""} 
                label={props.label} 
                required={props.required}
                labelClassName={props.labelClassName}
                hint={props.hint}
            />

            <section>
                <label 
                    htmlFor={props.label} 
                    onClick={() => ref.current}
                    className={twMerge(
                        "relative block w-full h-32 border border-dashed rounded-md cursor-pointer overflow-hidden",
                        props.hasError ? "border-rose-800 bg-rose-50" : "border-zinc-200 bg-zinc-50",
                    )}
                >
                    <input
                        type="file"
                        className="hidden"
                        id={props.label}
                        placeholder={props.placeholder}
                        ref={ref}
                        onChange={(event) => setFiles(event.target.files)}
                    />

                    {
                        props.default && (
                            <img
                                src={props.default}
                                alt={"default"}
                                className="absolute inset-0 object-cover"
                            />
                        )
                    }

                    <div className="absolute inset-0 flex flex-col justify-center items-center text-zinc-500">
                        <IconCloudUpload className="w-12 h-12 mb-2" strokeWidth={1.2} />
                        <p className="text-xs">
                            {props.placeholder}
                        </p>
                    </div>
                </label>

                <div className="flex justify-between items-center text-[10px] text-zinc-600 py-2">
                    <p>
                        Supported formats: {props.formats}
                    </p>
                </div>
            </section>

            {
                files && (
                    <FileListRender files={files}>  
                    </FileListRender>
                )
            }

            <ErrorMessage hasError={props.hasError} error={props.error} />
            
        </div>
    )
}