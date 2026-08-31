import { twMerge } from "tailwind-merge"
import { byteToKb } from "@/utils/conversion"
import {
    IconMusicCode,
    IconVideo,
    IconFileCv,
    IconFileText,
} from "@tabler/icons-react"
import { getTypeFromFile } from "@/components/form-fields/file/utils"

export type FileListProps = {
    className?: string
    files: FileList
}

export function FileListRender({ files, className }: FileListProps) {
    return (
        <div className={twMerge("gap-2", className)}>
            {Object.keys(files).map((_, index) => {
                const file = files[index]

                return <FileListItem file={file} key={index}></FileListItem>
            })}
        </div>
    )
}

export type FileListItemProps = {
    file: File
}

export function FileListItem({ file }: FileListItemProps) {
    const mediaType = getTypeFromFile(file)

    const getMediaAvatar = () => {
        switch (mediaType) {
            case "image":
                return (
                    <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="size-10 object-cover rounded"
                    />
                )
            case "video":
                return <IconVideo className="size-10" strokeWidth={1.2} />
            case "audio":
                return <IconMusicCode className="size-10" strokeWidth={1.2} />
            case "application":
                return <IconFileCv className="size-10" strokeWidth={1.2} />
            case "text":
                return <IconFileText className="size-10" strokeWidth={1.2} />
            default:
                break
        }
    }

    return (
        <div className="flex items-center border border-tertiary-100 bg-tertiary-50 text-tertiary-700 rounded-md p-2">
            {getMediaAvatar()}
            <div className="flex flex-col space-y-1 text-xs ml-3">
                <h5 className="font-medium capitalize">{file.name}</h5>
                <p>Size: {byteToKb(file.size)} KB</p>
            </div>
        </div>
    )
}
