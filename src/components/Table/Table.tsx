import { IconMinus, IconPlus } from "@tabler/icons-react"
import {
    ChangeEvent,
    Fragment,
    useEffect,
    useState,
    type ReactNode,
} from "react"
import { twMerge } from "tailwind-merge"
import { IColumn, ISort, SortDirection } from "@/components/Table/types"

import OldTableHead from "@/components/Table/TableHead"
import ConditionalRender from "@/components/conditional-render"
import TableV2 from "@/components/Table/table-v2"
import TableLoading from "@/components/Table/table-loading"
import TableHead from "@/components/Table/table-head"
import TableHeader from "@/components/Table/table-header"
import TableBody from "@/components/Table/table-body"
import TableCell from "@/components/Table/table-cell"
import TableRow from "@/components/Table/table-row"
import Hide from "@/components/hide"

export type TableContainerProps = {
    className?: string
    children: ReactNode
}

export const TableContainer = (props: TableContainerProps) => {
    return (
        <div
            className={twMerge(
                "overflow-x-auto overflow-y-hidden w-full space-y-5 py-5 border border-zinc-100 rounded-md",
                props.className
            )}
        >
            {props.children}
        </div>
    )
}

export type TableProps<T> = {
    columns: IColumn[]
    data: ReadonlyArray<T>
    isLoading?: boolean
    hasSelection?: boolean
    hasActions?: boolean
    hasExpandableRow?: boolean
    emptyState?: ReactNode
    actions?: (context: T) => ReactNode
    expandables?: (context: T) => ReactNode
    onExpanding?: (context: T) => void
    onSelection?: (items: Array<T>) => void
    onSorting?: (field: string, direction: SortDirection) => void
}

function Table<T extends Record<string, any>>({
    actions,
    expandables,
    columns,
    data = [],
    isLoading = false,
    hasActions,
    hasExpandableRow = false,
    hasSelection = false,
    onExpanding,
    onSelection,
    onSorting,
    emptyState,
}: TableProps<T>) {
    const [sortField, setSortField] = useState<ISort>()
    const [selectedRows, setSelectedRows] = useState<T[]>([])
    const [expandableRow, setExpandableRow] = useState<number>(-1)

    const expandebleSpanLength = (): number => {
        if (hasActions) {
            return columns.length + 1
        }
        return columns.length
    }

    const handleSort = (field: string, direction: SortDirection) => {
        setSortField({ field, direction })

        if (onSorting) {
            onSorting(field, direction)
        }
    }

    const handleSelection = (
        event: ChangeEvent<HTMLInputElement>,
        content: T | null
    ) => {
        let temp = selectedRows
        if (content !== null) {
            event.target.checked
                ? temp.push(content)
                : deleteSelectedItem(content)
        } else {
            event.target.checked ? (temp = data as T[]) : (temp = [])
        }
        setSelectedRows(temp)
        if (onSelection) {
            onSelection(temp)
        }
    }

    const deleteSelectedItem = (content: T) => {
        const temp = selectedRows
        temp.splice(
            temp.findIndex(
                el => JSON.stringify(el) === JSON.stringify(content)
            ),
            1
        )
        setSelectedRows(temp)
        if (onSelection) {
            onSelection(temp)
        }
    }

    const getDataValue = (
        data: T,
        columnKeyName: string,
        returnRawData: boolean
    ): T | unknown => {
        if (returnRawData) {
            return data
        }
        if (Object.keys(data).includes(columnKeyName)) {
            return data[columnKeyName]
        }
    }

    useEffect(() => {
        if (expandableRow >= 0 && onExpanding) {
            onExpanding(data[expandableRow])
        }
    }, [expandableRow])

    useEffect(() => {
        if (sortField === null) {
            const defaultSorted = columns.find(
                element => element.sortable === true
            )
            if (defaultSorted !== undefined) {
                setSortField({
                    field: defaultSorted.name,
                    direction: SortDirection.ASC,
                })
            }
        }
    }, [columns, sortField])

    return (
        <div className="overflow-x-auto overflow-y-hidden w-full rounded-lg">
            <TableV2>
                <TableHeader>
                    <Hide condition={columns.length == 0}>
                        <TableRow className="bg-primary-50">
                            <Hide condition={!hasSelection}>
                                <TableHead className="px-6">
                                    <input
                                        type="checkbox"
                                        onChange={event =>
                                            handleSelection(event, null)
                                        }
                                    />
                                </TableHead>
                            </Hide>
                            {columns.map((column, index) => (
                                <OldTableHead
                                    column={column}
                                    sort={sortField}
                                    onSortChange={handleSort}
                                    key={index}
                                />
                            ))}

                            <Hide condition={!hasActions}>
                                <TableHead>Actions</TableHead>
                            </Hide>
                        </TableRow>
                    </Hide>
                </TableHeader>

                <TableBody>
                    <ConditionalRender condition={isLoading}>
                        <TableLoading cellCount={columns.length} />

                        <ConditionalRender condition={data.length == 0}>
                            <TableRow className="hover:bg-transparent">
                                <TableCell className="py-24" colSpan={100}>
                                    {emptyState}
                                </TableCell>
                            </TableRow>

                            {data.map((row, rowIndex) => (
                                <Fragment>
                                    <TableRow key={rowIndex}>
                                        <Hide condition={!hasSelection}>
                                            <TableCell className="px-6">
                                                <input
                                                    type="checkbox"
                                                    onChange={event =>
                                                        handleSelection(
                                                            event,
                                                            row
                                                        )
                                                    }
                                                    checked={selectedRows.some(
                                                        element =>
                                                            element === row
                                                    )}
                                                    className="bg-white border border-zinc-200 ring-0 focus:border-zinc-200 focus:outline-none focus:ring-0 rounded"
                                                />
                                            </TableCell>
                                        </Hide>

                                        {columns.map((column, columnIndex) => (
                                            <TableCell key={columnIndex}>
                                                <ConditionalRender
                                                    condition={
                                                        typeof column.element !==
                                                        "function"
                                                    }
                                                >
                                                    {/* return value by key */}
                                                    <>{row[column.name]}</>
                                                    {/* return value and render by
                                                element provided */}

                                                    {column.element &&
                                                        column.element!(
                                                            getDataValue(
                                                                row,
                                                                column.name,
                                                                column.raw
                                                            )
                                                        )}
                                                </ConditionalRender>
                                            </TableCell>
                                        ))}

                                        <Hide condition={!hasActions}>
                                            <TableCell key={rowIndex}>
                                                <div className="flex justify-center items-center gap-4">
                                                    {actions!(row)}
                                                    <Hide
                                                        condition={
                                                            hasExpandableRow
                                                        }
                                                    >
                                                        <button
                                                            onClick={() => {
                                                                expandableRow ===
                                                                rowIndex
                                                                    ? setExpandableRow(
                                                                          -1
                                                                      )
                                                                    : setExpandableRow(
                                                                          rowIndex
                                                                      )
                                                            }}
                                                        >
                                                            <ConditionalRender
                                                                condition={
                                                                    expandableRow ==
                                                                    rowIndex
                                                                }
                                                            >
                                                                <IconPlus
                                                                    className={
                                                                        "size-4"
                                                                    }
                                                                />

                                                                <IconMinus
                                                                    className={
                                                                        "size-4"
                                                                    }
                                                                />
                                                            </ConditionalRender>
                                                        </button>
                                                    </Hide>
                                                </div>
                                            </TableCell>
                                        </Hide>
                                    </TableRow>

                                    <Hide
                                        condition={expandableRow !== rowIndex}
                                    >
                                        <TableRow className="overflow-x-hidden">
                                            <TableCell
                                                colSpan={expandebleSpanLength()}
                                            >
                                                {expandables?.(row)}
                                            </TableCell>
                                        </TableRow>
                                    </Hide>
                                </Fragment>
                            ))}
                        </ConditionalRender>
                    </ConditionalRender>
                </TableBody>

                {/* <tbody className={bodyClassName}>
                    {data.map((content: Record<string, any>, rowIndex) => (
                        <Fragment key={rowIndex}>
                            <tr className={rowClassName}>
                                {hasSelection && (
                                    <td className="px-4 py-3 text-center whitespace-pre-line">
                                        <input
                                            type="checkbox"
                                            onChange={event =>
                                                handleSelection(event, content)
                                            }
                                            checked={selectedRows.some(
                                                element =>
                                                    element.id === content.id
                                            )}
                                            className="bg-white border border-zinc-200 ring-0 focus:border-zinc-200 focus:outline-none focus:ring-0 rounded"
                                        />
                                    </td>
                                )}

                                {columns.map((header, columnIndex) => (
                                    <td
                                        className={twMerge(
                                            "px-4 py-3 whitespace-pre-line",
                                            header.align != undefined
                                                ? header.align
                                                : "text-left"
                                        )}
                                        key={columnIndex * 444}
                                    >
                                        {header.element
                                            ? header.element(
                                                  getDataValue(
                                                      header.name.split("."),
                                                      content,
                                                      header.raw
                                                  )
                                              )
                                            : content[header.name]}
                                    </td>
                                ))}

                                {hasActions && (
                                    <td className="px-4 py-3 whitespace-pre-line">
                                        <div className="flex justify-center space-x-4 items-center">
                                            {actions?.(content)}

                                            {hasExpandableRow && (
                                                <button
                                                    onClick={() => {
                                                        expandableRow ===
                                                        rowIndex
                                                            ? setExpandableRow(
                                                                  -1
                                                              )
                                                            : setExpandableRow(
                                                                  rowIndex
                                                              )
                                                    }}
                                                    className="flex justify-center items-center w-5 h-5 mr-2 bg-primary-100 text-primary rounded cursor-pointer"
                                                >
                                                    <IconPlus
                                                        className={`h-4 w-4 ${
                                                            expandableRow ===
                                                            rowIndex
                                                                ? "hidden"
                                                                : ""
                                                        }`}
                                                    />

                                                    <IconMinus
                                                        className={`h-4 w-4 ${
                                                            expandableRow ===
                                                            rowIndex
                                                                ? ""
                                                                : "hidden"
                                                        }`}
                                                    />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                )}
                            </tr>

                            {expandableRow === rowIndex && hasExpandableRow && (
                                <tr className="overflow-x-hidden">
                                    <td colSpan={expandebleSpanLength()}>
                                        {expandables?.(content)}
                                    </td>
                                </tr>
                            )}
                        </Fragment>
                    ))}
                </tbody> */}
            </TableV2>
        </div>
    )
}

export default Table
