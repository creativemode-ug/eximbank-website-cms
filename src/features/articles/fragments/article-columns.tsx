import { IColumn } from "@/components/Table/types"

import Badge from "@/components/Badge"

const columns: IColumn[] = [
    {
        name: "title",
        label: "Title",
        sortable: false,
        raw: false,
        element: (value: string) => <p className="w-56">{value}</p>,
    },
    {
        name: "type",
        label: "Type",
        sortable: false,
        raw: false,
        element: (value: string) => value.toUpperCase(),
    },
    {
        name: "read_time",
        label: "Minutes",
        sortable: false,
        raw: false,
    },
    {
        name: "priority",
        label: "Priority",
        sortable: false,
        raw: false,
        element: (value: boolean) => {
            if (value) {
                return "TOP STORY"
            }
            return "NORMAL"
        },
    },
    {
        name: "is_published",
        label: "Status",
        sortable: true,
        raw: false,
        element: value => {
            if (value) {
                return <Badge text="published" intent="primary" />
            }
            return <Badge text="draft" intent="default" />
        },
    },
    {
        name: "created_at",
        label: "Date Created",
        sortable: true,
        raw: false,
        element: (value: string) => new Date(value).toLocaleString(),
    },
]

export default columns
