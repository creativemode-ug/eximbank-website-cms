import { ReactNode } from "react"
import { Editor } from "@tiptap/react"
import { twMerge } from "tailwind-merge"
import {
    IconPilcrow,
    IconH1,
    IconH2,
    IconH3,
    IconH4,
    IconBold,
    IconItalic,
    IconList,
    IconListNumbers,
    IconLink,
    IconQuote,
    IconBlockquote,
    IconAlignLeft,
    IconAlignCenter,
    IconAlignRight,
    // IconCode,
} from "@tabler/icons-react"

type EditorMenuBarProps = {
    editor: Editor
}

type MenuWidget = {
    label: string
    element: ReactNode
    onClick: VoidFunction
    isEnabled: boolean
}

const EditorMenuBar = ({ editor }: EditorMenuBarProps) => {
    const widgets: MenuWidget[] = [
        {
            label: "Paragraph",
            element: <IconPilcrow className="size-4" />,
            onClick: () => editor.chain().focus().setParagraph().run(),
            isEnabled: editor.isActive("paragraph"),
        },
        {
            label: "Heading 1",
            element: <IconH1 className="size-4" />,
            onClick: () =>
                editor.chain().focus().toggleHeading({ level: 1 }).run(),
            isEnabled: editor.isActive("heading", { level: 1 }),
        },
        {
            label: "Heading 2",
            element: <IconH2 className="size-4" />,
            onClick: () =>
                editor.chain().focus().toggleHeading({ level: 2 }).run(),
            isEnabled: editor.isActive("heading", { level: 2 }),
        },
        {
            label: "Heading 3",
            element: <IconH3 className="size-4" />,
            onClick: () =>
                editor.chain().focus().toggleHeading({ level: 3 }).run(),
            isEnabled: editor.isActive("heading", { level: 3 }),
        },
        {
            label: "Heading 4",
            element: <IconH4 className="size-4" />,
            onClick: () =>
                editor.chain().focus().toggleHeading({ level: 4 }).run(),
            isEnabled: editor.isActive("heading", { level: 4 }),
        },
        {
            label: "Bold",
            element: <IconBold className="size-4" />,
            onClick: () => editor.chain().focus().toggleBold().run(),
            isEnabled: editor.isActive("bold"),
        },
        {
            label: "Italic",
            element: <IconItalic className="size-4" />,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            isEnabled: editor.isActive("italic"),
        },
        {
            label: "List",
            element: <IconList className="size-4" />,
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            isEnabled: editor.isActive("bulletList"),
        },
        {
            label: "Numbered List",
            element: <IconListNumbers className="size-4" />,
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            isEnabled: editor.isActive("orderedList"),
        },
        {
            label: "Link",
            element: <IconLink className="size-4" />,
            onClick: () => editor.chain().focus().toggleLink().run(),
            isEnabled: editor.isActive("link"),
        },
        {
            label: "Quote",
            element: <IconQuote className="size-4" />,
            onClick: () => editor.chain().focus().toggleBlockquote().run(),
            isEnabled: editor.isActive("blockquote"),
        },
        {
            label: "Block Quote",
            element: <IconBlockquote className="size-4" />,
            onClick: () => editor.chain().focus().toggleBlockquote().run(),
            isEnabled: editor.isActive("blockquote"),
        },
        {
            label: "Align Left",
            element: <IconAlignLeft className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("left").run(),
            isEnabled: false,
        },
        {
            label: "Align Center",
            element: <IconAlignCenter className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("center").run(),
            isEnabled: false,
        },
        {
            label: "Align Right",
            element: <IconAlignRight className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("right").run(),
            isEnabled: false,
        },
        // {
        //     label: "Code",
        //     element: <IconCode className="size-4" />,
        //     onClick: () => editor.chain().focus().toggleCode().run(),
        //     isEnabled: editor.isActive('code'),
        // },
    ]

    return (
        <div
            className={twMerge(
                "border border-zinc-200 rounded-lg overflow-hidden p-0.5"
            )}
        >
            <div className="flex flex-wrap gap-0.5">
                {widgets.map((item, index) => (
                    <button
                        type="button"
                        className={twMerge(
                            "text-xs text-zinc-600 py-1.5 px-2 rounded-md",
                            "hover:text-tertiary hover:bg-tertiary-50",
                            item.isEnabled && "text-tertiary bg-tertiary-100"
                        )}
                        key={index}
                        onClick={item.onClick}
                    >
                        {item.element}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default EditorMenuBar
