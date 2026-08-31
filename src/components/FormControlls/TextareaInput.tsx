import { UseFormRegisterReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";


interface TextAreaInputProps extends React.ComponentProps<"textarea"> {
    label?: string,
    labelStyle?: string,
    inputStyle?: string,
    hasError?: boolean
    error? : string,
    register: UseFormRegisterReturn;
    hint?: string
}

export default function TextAreaInput({
    label, 
    labelStyle, 
    inputStyle,
    hasError, 
    error, 
    register, 
    hint,
    className,
    ...extra
}: TextAreaInputProps){

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
                <textarea
                    className={twMerge(
                        "input", 
                        hasError ? "input-error" : inputStyle ?? "input-default",
                        (extra.disabled || extra.readOnly) && "bg-primary-100"
                    )} 
                    placeholder={extra.placeholder}
                    {...register}
                    {...extra}
                ></textarea>
            </div>

            {
                hasError &&
                <div className="text-xs text-rose-800 font-medium px-1 pt-1">
                    { error ? error :"field is required" }
                </div>
            }
        </div>
    )
}
