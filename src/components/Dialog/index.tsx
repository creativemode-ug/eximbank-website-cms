import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import { IconAlertHexagon, IconAward, IconBulb, IconSquareRoundedMinus } from "@tabler/icons-react";



interface IProps {
    isOpen: boolean
    theme: "primary" | "success" | "danger" | "warning"
    title: string
    message: string,
    render?: () => ReactNode,
    onClose: (value: boolean) => void
}


export default function DialogModal(props: IProps) {
    const defaultIconStyle = "w-8 h-8 text-primary";

    const getIcon = () => {
        switch(props.theme) {
            case "primary":
                return <IconBulb className={`${defaultIconStyle}`} />
            case "success":
                return <IconAward className={`${defaultIconStyle}`} />
            case "warning":
                return <IconAlertHexagon className={`${defaultIconStyle}`} />
            default:
                return <IconSquareRoundedMinus className={`${defaultIconStyle}`} />
        }
    }

    return (
        <Transition appear show={props.isOpen} as={Fragment}>
            <Dialog 
                as="div" 
                className="relative z-50" 
                onClose={() => props.onClose(false)}
            >
                <Transition.Child
                    as={Fragment}
                    enter="transition ease-in duration-300"
                    enterFrom="opacity-0 scale-70"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-out duration-300"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-70">
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in duration-300"
                            enterFrom="opacity-0 scale-70"
                            enterTo="opacity-100 scale-100"
                            leave="transition ease-out duration-300"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-70">
                            
                            <Dialog.Panel className="w-full md:max-w-md xl:max-w-lg transform rounded-xl bg-white text-left align-middle">
                                <div className="py-6 px-8">
                                    <div className="flex items-center mb-8">
                                        {getIcon()}
                                        <h4 className="text-sm md:text-base lg:text-lg font-semibold ml-3">
                                            {props.title}
                                        </h4>
                                    </div>
                                    

                                    <p className="text-xs md:text-sm text-zinc-600 mb-8">
                                        {props.message}
                                    </p>
                                    
                                    {props.render && props.render()}
                                </div>
                            </Dialog.Panel>

                        </Transition.Child>
                    </div>
                </div>
                
            </Dialog>
        </Transition>
    )
}