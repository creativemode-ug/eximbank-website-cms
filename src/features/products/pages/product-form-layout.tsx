import {
    IconFileText,
    IconClipboardText,
    IconArrowNarrowLeft,
} from "@tabler/icons-react"
import { Link, Outlet } from "react-router-dom"
import { StepWidgetProps } from "@/components/stepper/step-widget"

import Stepper from "@/components/stepper/stepper"
import LocaleSwitch from "@/components/locale-switch"

function ProductFormLayout() {
    const steps: StepWidgetProps[] = [
        {
            label: "Choose Template",
            icon: <IconFileText className="size-4" />,
            regex: new RegExp("^/services/products/create$"),
        },
        {
            label: "Add Content",
            icon: <IconClipboardText className="size-4" />,
            regex: new RegExp("^/services/products/create/content$"),
        },
        {
            label: "Publish Product",
            icon: <IconFileText className="size-4" />,
            regex: new RegExp("^/services/products/create/publish$"),
        },
    ]

    return (
        <div className="space-y-16 py-8">
            <div className="space-y-8">
                <div className="container flex justify-between items-center gap-4">
                    <Link
                        to={"/services/products"}
                        className="flex items-center gap-3 text-sm"
                    >
                        <IconArrowNarrowLeft className="size-4" />
                        <span>Back to Products</span>
                    </Link>
                    <LocaleSwitch />
                </div>

                <Stepper steps={steps} />
            </div>

            <div className="w-full xl:max-w-2xl mx-auto">
                <Outlet />
            </div>
        </div>
    )
}

export default ProductFormLayout
