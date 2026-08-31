import { twMerge } from "tailwind-merge";

export type LabelProps = {
    name?: string
    label?: string
    required?: boolean
    hint?: React.ReactNode
    labelClassName?: string 
}

const Label = (props: LabelProps) => {
    return (
        <>
            {
                props.label && (
                    <div className="flex justify-between items-end text-xs text-zinc-600 mb-2">
                        <label 
                            htmlFor={props.name} 
                            className={twMerge(
                                "uppercase",
                                props.required && "after:content-['*'] after:pl-1 after:text-rose-800",
                                props.labelClassName
                            )}
                        >
                            {props.label}
                        </label>

                        {props.hint}
                    </div>
                )
            }
        </>
    )
}

export default Label