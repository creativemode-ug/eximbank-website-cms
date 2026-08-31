import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const FORMATS = [
    "header",
    "bold", "italic", "underline", "strike", "blockquote",
    "list", "bullet", "indent",
    "link", "image"
]

const MODULES = {
    toolbar: [
        [{ "header": [1, 2, 3, 4, false] }],
        ["bold", "italic", "underline","strike", "blockquote", "qoute"],
        [{"list": "ordered"}, {"list": "bullet"}, {"indent": "-1"}, {"indent": "+1"}],
        ["link"],
        ["clean"]
    ],
}


interface IProps {
    label?: string,
    labelStyle?: string,
    hasError?: boolean
    error? : string,
    className?: string
    default?: string
    hint?: string
    required?: boolean
    onChange: (value: string) => void
}

export default function EditorInput(props: IProps) {
    const [value, setValue] = useState<string>("");

    useEffect(() => {
        props.onChange(value)
    }, [value])

    useEffect(() => {
        if(props.default) setValue(props.default)
    }, [props.default])

    return (
        <div className={props.className}>
            {
                props.label && (
                    <div className="flex justify-between items-end mb-2">
                        <label 
                            className={twMerge(
                                "text-xs text-zinc-500 font-medium uppercase",
                                props.required && "after:content-['*'] after:pl-1 after:text-rose-800",
                                props.labelStyle
                            )}
                        >
                            {props.label}
                        </label>

                        { 
                            props.hint && (
                            <span className="text-[8px] text-zinc-500">{props.hint}</span>
                        )}
                    </div>
                ) 
            }

            <ReactQuill 
                theme="snow" 
                value={value} 
                onChange={setValue} 
                className="editor"
                formats={FORMATS}
                modules={MODULES}
            />

            {
                props.hasError &&
                <div className="text-xs text-rose-800 font-medium px-1 pt-1">
                    {
                        props.error ?
                        props.error :
                        "field is required"
                    }
                </div>
            }
        </div>
    )
}