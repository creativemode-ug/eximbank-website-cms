import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";


interface IProps extends React.ComponentProps<"span"> {
    intent: "primary" | "secondary" | "tertiary" | "error" | "default";
    text: string | number;
}

export default function Badge(props: IProps) {
    const {className, ...rest} = props; 
    const badgeClass = () => {

        const defaultClass = `inline-flex items-center text-[10px] font-semibold uppercase px-2 py-0.5 border rounded`

        const config = {
            variants: {
                intent: {
                    primary: "bg-primary-50 border-primary-200 text-primary ",

                    secondary: "bg-secondary-50 border-secondary-200 text-secondary",

                    tertiary: "bg-tertiary-50 border-tertiary-200 text-tertiary",

                    error: "bg-rose-50 border-rose-200 text-rose-700",

                    default: "bg-zinc-50 border-zinc-200 text-zinc-500",
                }
            }
        }

        return cva(defaultClass, config)({
            intent: props.intent
        })
    };

    return (
        <span 
            className={twMerge(badgeClass(), props.className)}
            {...rest}
        >
            {props.text}
        </span>
    );
};
