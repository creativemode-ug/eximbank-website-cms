import { twMerge } from "tailwind-merge";
import { type ReactNode } from "react";

export type DataListItemProps = {
    label: string;
    value?: ReactNode;
    valueClassName?: string;
    labelClassName?: string;
    itemClassName?: string;
};

export type DataListPropsProps = {
    items: DataListItemProps[];
    className?: string;
    labelClassName?: string;
    valueClassName?: string;
    itemClassName?: string;
    horizontal?: boolean;
    horizontalLabelWidth?: string;
};

export default function DataList({
    items,
    className,
    labelClassName: defaultLabelClassName,
    valueClassName: defaultValueClassName,
    itemClassName: defaultItemClassName,
    horizontal = false,
    horizontalLabelWidth = "160px",
}: DataListPropsProps) {
    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div className={twMerge("space-y-2", className)}>
            {items.map((item, index) => {
                const itemLabelClassName =
                    item.labelClassName || defaultLabelClassName;
                const itemValueClassName =
                    item.valueClassName || defaultValueClassName;
                const listItemClassName =
                    item.itemClassName || defaultItemClassName;

                return (
                    <div
                        key={index}
                        className={twMerge(
                            "flex text-sm",
                            horizontal
                                ? "flex-row items-start gap-4"
                                : "flex-col gap-2",
                            listItemClassName
                        )}
                    >
                        <span
                            className={twMerge(
                                "text-zinc-500 dark:text-zinc-300",
                                horizontal
                                    ? `min-w-[${horizontalLabelWidth}] text-left`
                                    : "block",
                                itemLabelClassName
                            )}
                        >
                            {item.label}
                        </span>
                        <div
                            className={twMerge(
                                "font-semibold break-words text-zinc-800 dark:text-white",
                                itemValueClassName
                            )}
                        >
                            {item.value !== undefined ? item.value : "-"}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
