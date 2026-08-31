import { IColumn } from "@/components/Table/types"

import Badge from "@/components/Badge"
import ConditionalRender from "@/components/conditional-render"

const columns: IColumn[] = [
    {
        name: "name",
        label: "Name",
        sortable: false,
        raw: false,
    },
    {
        name: "type",
        label: "Type",
        sortable: false,
        raw: false,
        element: (value: string) => {
            if (value == "branch")
                return <Badge text={value.toUpperCase()} intent="primary" />

            if (value == "atm")
                return <Badge text={value.toUpperCase()} intent="secondary" />

            return <Badge text={value.toUpperCase()} intent="tertiary" />
        },
    },
    {
        name: "region",
        label: "Region",
        sortable: false,
        raw: false,
    },
    {
        name: "phone_number",
        label: "Phone",
        sortable: false,
        raw: false,
        element: (value: string | null) => value ?? "N/A",
    },
    {
        name: "is_published",
        label: "Status",
        sortable: true,
        raw: false,
        element: value => {
            return (
                <ConditionalRender condition={value}>
                    <Badge text="published" intent="primary" />
                    <Badge text="draft" intent="default" />
                </ConditionalRender>
            )
        },
    },
]

export default columns
