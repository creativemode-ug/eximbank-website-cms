import { IconLoader } from "@tabler/icons-react";
import { twMerge } from "tailwind-merge";
// import Tooltip from "@/components/widgets/popups/Tooltip";

export type ActionButtonProps = React.ComponentProps<"button"> & {
    children?: React.ReactNode
    loading?: boolean
    tooltip?: string
}

function ActionButton({
    className,
    children,
    loading = false,
    tooltip,
    disabled,
    onClick
}: ActionButtonProps) {

    return (
        <button
            type="button"
            className={twMerge(
                "relative flex items-center text-xs xl:text-sm text-tertiary bg-transparent",
                "p-1.5 hover:bg-tertiary-100 rounded-md focus:outline-none",
                tooltip && "max-w-max group",
                className
            )}
            disabled={disabled}
            onClick={onClick}>
            {
                loading ?
                <IconLoader size={20} className="animate-spin mx-auto" /> :

                children
            }

            {/* {
                props.tooltip &&
                <Tooltip text={props.tooltip} />
            } */}
        </button>
    )
}

export default ActionButton