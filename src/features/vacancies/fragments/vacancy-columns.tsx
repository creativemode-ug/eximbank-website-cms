import { IColumn } from "@/components/Table/types"
import { Vacancy } from "@/features/vacancies/types"

import Badge from "@/components/Badge"
import Avatar from "@/components/Avatar"

const columns: IColumn[] = [
    {
        name: "title",
        label: "Position",
        sortable: false,
        raw: true,
        element: (value: Vacancy) => (
            <Avatar name={value.title} url={value.image} size={40} />
        ),
    },
    {
        name: "type",
        label: "Type",
        sortable: false,
        raw: false,
        element: (value: string) => value.toUpperCase(),
    },
    {
        name: "contract_type",
        label: "Contract Type",
        sortable: false,
        raw: false,
        element: (value: number) => {
            if (value == 1) {
                return "PERMANENT"
            }
            return "CONTRACT"
        },
    },
    {
        name: "location",
        label: "Location",
        sortable: false,
        raw: false,
    },
    {
        name: "deadline",
        label: "Deadline",
        sortable: false,
        raw: false,
        element: (value: string) => new Date(value).toLocaleDateString(),
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
