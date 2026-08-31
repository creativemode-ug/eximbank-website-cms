import { UseFormRegisterReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";


interface IProps extends React.ComponentProps<"input"> {
    label?: string,
    labelStyle?: string,
    inputStyle?: string,
    hasError?: boolean
    error? : string,
    register: UseFormRegisterReturn;
    prefix?: string
    hint?: string
}


export default function({
    label, 
    labelStyle, 
    inputStyle,
    hasError, 
    error, 
    register, 
    prefix,
    hint,
    className,
    ...extra
}: IProps) {

    return (
        <div className={className}>
            {
                label && (
                    <div className="flex justify-between items-end mb-2">
                        <label 
                            htmlFor={extra.name} 
                            className={twMerge(
                                "text-xs text-zinc-500 font-medium uppercase",
                                extra.required && "after:content-['*'] after:pl-1 after:text-rose-800",
                                labelStyle
                            )}
                        >
                            {label}
                        </label>

                        { 
                            hint && (
                            <span className="text-[10px] text-zinc-400 font-medium">
                                {hint}
                            </span>
                        )}
                    </div>
                ) 
            }

            <div className="relative">
                <input
                    type={extra.type}
                    className={twMerge(
                        "input", 
                        hasError ? "input-error" : inputStyle ?? "input-default",
                        prefix ? "pl-12" : "",
                        (extra.disabled || extra.readOnly) && "bg-primary-100"
                    )} 
                    placeholder={extra.placeholder}
                    {...register} 
                    {...extra}
                />
                
                {
                    prefix &&
                    <div className="absolute inset-y-0 left-0 px-3 flex justify-center items-center cursor-pointer">
                        <div className="text-sm text-primary-400 font-light uppercase">
                            {prefix}
                        </div>
                    </div>
                }

                {
                    error &&
                    <div className="text-xs text-rose-800 font-medium px-1 pt-1">
                        { error ? error : "field is required" }
                    </div>
                }
            </div>
            
        </div>
    )
}