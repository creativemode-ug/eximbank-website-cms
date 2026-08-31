import { IColumn } from "@/components/Table/types"

import Avatar from "@/components/Avatar"

const columns: IColumn[] = [
    {
        name: "name",
        label: "Name",
        sortable: false,
        raw: true,
        element: value => {
            return (
                <div className="flex items-center gap-3">
                    <Avatar
                        name={value.name}
                        url={value.banner_image}
                        size={40}
                    />

                    <h4>{value.name}</h4>
                </div>
            )
        },
    },
    {
        name: "head_line",
        label: "Headline",
        sortable: false,
        raw: false,
    },
    {
        name: "action_label",
        label: "Action",
        sortable: false,
        raw: false,
        element: (value?: string) => value?.toUpperCase() ?? "N/A",
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
