import { ReactNode, ComponentPropsWithRef } from "react"
import { twMerge } from "tailwind-merge"
import { IconLoader } from "@tabler/icons-react"
import { cva } from "class-variance-authority"

export type ButtonProps = ComponentPropsWithRef<"button"> & {
    loading?: boolean
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    children: ReactNode
    intent: "primary" | "secondary" | "tertiary" | "danger" | "default"
    size?: "sm" | "md" | "lg"
}

function Button({
    children,
    disabled,
    intent,
    size,
    loading,
    leftIcon,
    rightIcon,
    className,
    ...props
}: ButtonProps) {
    const buttonClass = () => {
        const defaultClass =
            "relative inline-flex justify-center items-center rounded-md transition-all duration-300 ease-linear"

        const config = {
            variants: {
                intent: {
                    primary: "bg-primary text-white hover:bg-primary/90",

                    secondary: "bg-secondary text-white hover:bg-secondary-500",

                    tertiary: "bg-tertiary text-white hover:bg-tertiary-500",

                    danger: "bg-rose-800 text-white hover:bg-rose-700",

                    default: "bg-zinc-100",
                },
                size: {
                    sm: "px-4 py-2 text-xs",
                    md: "px-5 py-2.5 text-sm",
                    lg: "px-6 py-3.5 text-base",
                },
            },
        }

        return cva(
            defaultClass,
            config
        )({
            intent: intent,
            size: size ?? "sm",
        })
    }

    return (
        <button
            className={twMerge(buttonClass(), className)}
            disabled={loading || disabled}
            {...props}
        >
            {loading && (
                <div className="absolute z-10 inset-0 flex justify-center items-center">
                    <IconLoader className="w-5 h-5 animate-spin" />
                </div>
            )}

            <div
                className={twMerge(loading && "invisible", leftIcon && "mr-2")}
            >
                {leftIcon}
            </div>

            <span className={twMerge(loading && "invisible")}>{children}</span>

            <div
                className={twMerge(loading && "invisible", rightIcon && "ml-2")}
            >
                {rightIcon}
            </div>
        </button>
    )
}

export default Button
