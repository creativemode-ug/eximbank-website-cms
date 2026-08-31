import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";


export interface IProps extends React.ComponentProps<"select"> {
    label?: string,
    labelStyle?: string,
    inputStyle?: string,
    hasError?: boolean
    error? : string,
    register: UseFormRegisterReturn;
    options: Array<any>;
    valueName?: string;
    displayName?: string;
    hint?: string
}

export default function SelectInput({
    children,
    labelStyle,
    inputStyle,
    defaultValue,
    hasError,
    label,
    options,
    className,
    valueName,
    displayName,
    multiple = false,
    error,
    register,
    hint,
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
                            <span className="text-[8px] text-zinc-500">{hint}</span>
                        )}
                    </div>
                ) 
            }

            <div className={"relative"}>
                <select
                    multiple={multiple}
                    // @ts-ignore
                    defaultValue={defaultValue ? defaultValue : ""}
                    className={twMerge(
                        "input", 
                        hasError ? "input-error" : inputStyle ?? "input-default",
                        extra.disabled && "bg-zinc-100"
                    )}
                    {...register}
                    {...extra}
                    
                >
                    <option disabled={true} value="">
                        Choose
                    </option>
                    {
                        options.map((item, index) => (
                            <option value={valueName ? item[valueName] : item} key={index}>
                                {displayName ? item[displayName] : item}
                            </option>
                        ))
                    }
                </select>
            </div>

            {
                error &&
                <div className="text-xs text-rose-800 font-medium px-1 pt-1">
                    { error ? error : "field is required" }
                </div>
            }
        </div>
    );
};
