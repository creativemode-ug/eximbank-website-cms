import { IColumn } from "@/components/Table/types"
import { ResourceTypeOptions } from "@/features/products/types"

const columns: IColumn[] = [
    {
        name: "name",
        label: "Name",
        sortable: false,
        raw: false,
    },
    {
        name: "type",
        label: "type",
        sortable: false,
        raw: false,
        element: value => {
            return (
                ResourceTypeOptions.find(el => el.type == value)?.label ?? "N/A"
            )
        },
    },
    {
        name: "reference",
        label: "Reference",
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
