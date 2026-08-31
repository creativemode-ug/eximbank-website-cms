import { twMerge } from "tailwind-merge";

import Avatar from "@/components/Avatar";



export type AvatarCardProps = {
    title: string
    description: string
    url?: string
    icon?: React.ReactNode
    size?: number
    titleClassName?: string
    children?: React.ReactNode
    className?: string
}

const AvatarCard = (props: AvatarCardProps) => {
    
    return (
        <div className={twMerge("flex items-start gap-3", props.className)}>
            {
                props.icon ? (
                    <div className="p-2 border border-neutral-200 shadow-sm rounded-md">
                        {props.icon}
                    </div>
                ): (
                    <Avatar
                        name={props.title} 
                        url={props.url}
                        size={props.size}
                    />
                )
            }

            <div className="flex-1 space-y-0.5">
                <h5 className={twMerge("text-sm text-neutral-800 font-medium", props.titleClassName)}>
                    {props.title}
                </h5>
                <p className="text-xs">
                    {props.description}
                </p>
                {props.children}
            </div>
        </div>
    )
}

export default AvatarCard