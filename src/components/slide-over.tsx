import { twMerge } from "tailwind-merge";
import { Dialog, Transition } from "@headlessui/react";
import { IconX } from "@tabler/icons-react";
import type { ReactNode } from "react";

// 277700,0753103794
export type SlideOverHeadProps = {
    title: string
    description?: string
    icon?: ReactNode
    children?: ReactNode
    onClose: (value: boolean) => void
}

export const SlideOverHead = (props: SlideOverHeadProps) => {

    return (
        <div className="flex justify-between items-center py-4 px-5 bg-tertiary-50">
            <div className="flex-1 flex items-center gap-4">
                {props.icon}
                <div className="text-zinc-600 space-y-1">
                    <h4 className="font-medium">
                        {props.title}
                    </h4>
                    {
                        props.description && (
                            <p className="text-xs text-zinc-500">
                                {props.description}
                            </p>
                        )
                    }
                </div>
            </div>

            {
                props.children ? props.children : (
                    <button 
                        className="apperance-none focus:border-none bg-transparent text-zinc-600 p-1 rounded-lg"
                        onClick={() => props.onClose(false)}
                    >
                        <IconX className="size-5" />
                    </button>
                )
            }
        </div>
    )
}

export type SlideOverPanelProps = {
    className?: string
    childClassName?: string
    children: React.ReactNode
}

export const SlideOverPanel = (props: SlideOverPanelProps) => {

    return (
        <div 
            className={twMerge(
                "fixed inset-0 overflow-hidden",
                props.className
            )}
        >
            <Transition.Child
                as="div"
                enter="transition-transform ease-linear duration-300"
                enterFrom="opacity-85"
                enterTo="opacity-100"
                leave="transition-transform ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-85"
                className={twMerge("h-screen p-4 flex justify-end")}
            >
                <Dialog.Panel 
                    className={twMerge("bg-white overflow-y-auto h-full rounded-lg", props.childClassName)}>
                    {props.children}
                </Dialog.Panel >
            </Transition.Child>
        </div>
    )
}


type SlideOverProps = {
    isOpen: boolean
    children: ReactNode
    onClose: (value: boolean) => void,
    className?: string
}

export const SlideOver = (props: SlideOverProps) => {

    return (
        <Transition appear show={props.isOpen} as={"div"}>
            <Dialog open={props.isOpen} as="div" onClose={props.onClose} className="relative z-10">
                <Transition.Child
                    as={"div"}
                    enter="ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div 
                        className={twMerge(
                            "fixed inset-0 bg-primary-accent/20 backdrop-blur-sm", 
                            props.className
                        )} 
                    />
                </Transition.Child>

                {props.children}
            </Dialog>
        </Transition>
    )
}