import { twMerge } from "tailwind-merge"
import { Fragment } from "react"
import StepWidget, {
    type StepWidgetProps,
} from "@/components/stepper/step-widget"
import Hide from "@/components/hide"

export type StepperProps = {
    axis?: "x" | "y"
    steps: StepWidgetProps[]
    className?: string
}

function Stepper({ axis = "x", steps, className }: StepperProps) {
    return (
        <div
            className={twMerge(
                "flex justify-center w-full",
                axis === "x" ? "flex-rown items-center gap-8" : "flex-col",
                className
            )}
        >
            {steps.map((step, index) => (
                <Fragment key={index}>
                    <StepWidget {...step} />
                    <Hide condition={index == steps.length - 1}>
                        <div className="w-40 h-[1px] rounded-md bg-zinc-200" />
                    </Hide>
                </Fragment>
            ))}
        </div>
    )
}

export default Stepper
