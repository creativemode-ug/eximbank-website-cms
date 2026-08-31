import { IColumn } from "@/components/Table/types"

import Badge from "@/components/Badge"

const columns: IColumn[] = [
    {
        name: "question",
        label: "Question",
        sortable: false,
        raw: false,
        element: (value: string) => value,
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
