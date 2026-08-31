import { useEffect } from "react"
import { FieldValues, useController } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import { FieldProps } from "@/components/form-fields/types"
import FieldLabel, {
    FieldLabelProps,
} from "@/components/form-fields/field-label"
import { useEditor, EditorContent } from "@tiptap/react"

import TextAlign from "@tiptap/extension-text-align"
import StarterKit from "@tiptap/starter-kit"
import EditorMenuBar from "@/components/form-fields/editor/editor-menu-bar"
import ErrorMessage from "@/components/form-fields/error-message"

export type EditorFieldProps<T extends FieldValues> = FieldLabelProps &
    FieldProps<T>

function EditorField<T extends FieldValues>({
    control,
    name,
    text,
    className,
    required,
    htmlFor,
    hint,
}: EditorFieldProps<T>) {
    const {
        field,
        fieldState: { error, invalid },
    } = useController({
        name,
        control,
    })

    const editor = useEditor({
        extensions: [StarterKit, TextAlign],
        content: field.value, // initial content
        onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            field.onChange(html)
        },
        editorProps: {
            attributes: {
                class: `tiptap prose focus:outline-none min-w-full min-h-40 input ${
                    invalid ? "input-error" : "input-default"
                }`,
            },
        },
    })

    useEffect(() => {
        if (editor && field.value !== editor.getHTML()) {
            editor.commands.setContent(field.value || "")
        }
    }, [editor, field.value])

    return (
        <div className={twMerge("space-y-1", className)}>
            <FieldLabel
                text={text}
                htmlFor={htmlFor}
                required={required}
                hint={hint}
            ></FieldLabel>

            <div className="space-y-2">
                <EditorMenuBar editor={editor} />
                <EditorContent editor={editor} />

                <ErrorMessage error={error?.message} />
            </div>
        </div>
    )
}

export default EditorField
