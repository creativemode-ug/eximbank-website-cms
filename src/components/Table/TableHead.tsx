import { twMerge } from "tailwind-merge"
// import { ArrowUpAZ, ArrowDownAZ } from "lucide-react";
import { IColumn, ISort, SortDirection } from "./types"

interface IProps {
    column: IColumn
    sort?: ISort
    onSortChange: (name: string, direction: SortDirection) => void
}

export default function TableHead({ column, sort, onSortChange }: IProps) {
    const defaultStyle: string = "px-5 py-3"

    const computeAsc = () => {
        return column.name === sort?.field &&
            sort.direction === SortDirection.ASC
            ? "text-zinc-800"
            : "text-zinc-400"
    }

    const computeDesc = () => {
        return column.name === sort?.field &&
            sort.direction === SortDirection.DESC
            ? "text-zinc-800"
            : "text-zinc-400"
    }

    return (
        <th scope="col" className={twMerge(defaultStyle, column.className)}>
            <div className="flex justify-between items-center space-x-2.5 font-medium">
                <span>{column.label}</span>

                {column.sortable && (
                    <div className="flex justify-center items-center space-x-0.5">
                        {/* Up Arrow */}
                        <span
                            className={`text-sm px-px cursor-pointer ${computeAsc()}`}
                            onClick={() =>
                                onSortChange(column.name, SortDirection.ASC)
                            }
                        >
                            {/* <ArrowUpAZ size={14} strokeWidth={2.5} /> */}
                        </span>

                        {/* Down Arrow */}
                        <span
                            className={`text-sm px-px cursor-pointer ${computeDesc()}`}
                            onClick={() =>
                                onSortChange(column.name, SortDirection.DESC)
                            }
                        >
                            {/* <ArrowDownAZ size={14} strokeWidth={2.5} /> */}
                        </span>
                    </div>
                )}
            </div>
        </th>
    )
}
