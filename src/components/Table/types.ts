import type { ReactNode } from "react"

export enum ColumnAlignment {
    LEFT = "text-left",
    RIGHT = "text-right",
    CENTER = "text-center",
}

export enum SortDirection {
    DESC,
    ASC,
}

export type IColumn = {
    name: string
    label: string
    sortable: boolean
    align?: ColumnAlignment
    className?: string
    element?: (content: any) => ReactNode
    raw: boolean
}

export type ISort = {
    field: string
    direction: SortDirection
}
