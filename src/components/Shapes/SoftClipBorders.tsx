import { RoundedClipBorders } from "@/components/Shapes"
import { twMerge } from "tailwind-merge"


interface IProps {
    children: JSX.Element
    styleClass?: string
}

export default function SoftClipBorders(props: IProps) {

    return (
        <div className={twMerge(
            "relative clip-soft-border h-full", props.styleClass
        )}>
            {props.children}
            <RoundedClipBorders />
        </div>
    )
}