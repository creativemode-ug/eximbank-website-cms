import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";

interface IProps {
    isOpen: boolean
    title?: string
    size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
    children: React.ReactNode
    onClose: (value: boolean) => void
}

export default function(props: IProps) {

    const computedSize = () => {
        switch(props.size) {
            case "xs":
                return "w-full md:max-w-xs xl:max-w-sm"
            case "sm":
                return "w-full md:max-w-md xl:max-w-lg"
            case "md":
                return "w-full md:max-w-xl xl:max-w-2xl"
            case "lg":
                return "w-full md:max-w-2xl xl:max-w-3xl"
            case "xl":
                return "w-full max-w-3xl xl:max-w-5xl"
            case "2xl":
                return "w-full max-w-4xl xl:max-w-7xl"
            default:
                return "w-full max-w-md"
        }
    }

    return (
        <Transition appear show={props.isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => props.onClose(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-primary-accent/20 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="transition-all ease-linear duration-300 origin-center"
                            enterFrom="scale-0"
                            enterTo="opacity-100"
                            leave="transition-all ease-linear duration-300 origin-center"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Panel 
                                className={twMerge(
                                    "overflow-hidden transform rounded-md bg-white text-left align-middle shadow-xl transition-all",
                                    computedSize()
                                )}
                            >
                                <div>
                                    {
                                        props.title && (
                                        <div className="bg-primary-50 py-4 px-4 md:px-8">
                                            <h4 className="text-primary xl:text-lg font-semibold">
                                                { props.title }
                                            </h4>
                                        </div>
                                    )}
                                    
                                    <div className="px-4 md:px-8 py-8 rounded-b-md max-h-[85vh] overflow-y-auto">
                                        {props.children}
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>

            </Dialog>
        </Transition>
    )
}