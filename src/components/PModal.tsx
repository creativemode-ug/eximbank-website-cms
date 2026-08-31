import { twMerge } from "tailwind-merge"
import { Dialog, Transition } from "@headlessui/react"
import { IconX } from "@tabler/icons-react"

export type ModalHeadProps = {
    title: string
    description?: string
    icon?: React.ReactNode
    children?: React.ReactNode
    onClose: (value: boolean) => void
}

export const ModalHead = (props: ModalHeadProps) => {
    return (
        <div className="flex justify-between items-center p-4 bg-tertiary/5 rounded-md m-1.5">
            <div className="flex-1 flex items-center gap-4">
                {props.icon}
                <div className="space-y-1">
                    <h4 className="text-sm font-medium capitalize">
                        {props.title}
                    </h4>
                    {props.description && (
                        <p className="text-xs text-zinc-500">
                            {props.description}
                        </p>
                    )}
                </div>
            </div>

            {props.children ? (
                props.children
            ) : (
                <button
                    className="apperance-none focus:border-none bg-transparent text-zinc-600 p-1 rounded-lg"
                    onClick={() => props.onClose(false)}
                >
                    <IconX className="size-4" />
                </button>
            )}
        </div>
    )
}

export type ModalPanelProps = {
    className?: string
    childClassName?: string
    children: React.ReactNode
}

export const ModalPanel = (props: ModalPanelProps) => {
    return (
        <div
            className={twMerge(
                "flex w-screen min-h-full items-center justify-center p-4",
                props.className
            )}
        >
            <Transition.Child
                as="div"
                enter="transition-all ease-linear duration-300 origin-center"
                enterFrom="scale-0"
                enterTo="opacity-100"
                leave="transition-all ease-linear duration-300 origin-center"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className={props.childClassName}
            >
                <Dialog.Panel className="bg-white overflow-y-auto rounded-lg">
                    {props.children}
                </Dialog.Panel>
            </Transition.Child>
        </div>
    )
}

type ModalProps = {
    isOpen: boolean
    children: React.ReactNode
    onClose: (value: boolean) => void
    className?: string
}

export const Modal = (props: ModalProps) => {
    return (
        <Transition appear show={props.isOpen} as={"div"}>
            <Dialog
                open={props.isOpen}
                as="div"
                onClose={props.onClose}
                className="relative z-10"
            >
                <Transition.Child
                    as={"div"}
                    enter="ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className={twMerge(
                            "fixed inset-0 bg-primary-accent/20 backdrop-blur-sm",
                            props.className
                        )}
                    />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    {props.children}
                </div>
            </Dialog>
        </Transition>
    )
}
