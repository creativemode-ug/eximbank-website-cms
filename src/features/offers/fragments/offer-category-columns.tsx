import { IColumn } from "@/components/Table/types"

const columns: IColumn[] = [
    {
        name: "name",
        label: "Name",
        sortable: false,
        raw: false,
    },
    {
        name: "description",
        label: "Description",
        sortable: false,
        raw: false,
    },
    {
        name: "updated_at",
        label: "Update At",
        sortable: false,
        raw: false,
        element: (value: string) => new Date(value).toLocaleString(),
    },
]

export default columns
