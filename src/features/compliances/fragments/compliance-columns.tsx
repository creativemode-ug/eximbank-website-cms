import { IColumn } from "@/components/Table/types"
import { Compliance } from "@/features/compliances/types"

const intl = Intl.NumberFormat()

const columns: IColumn[] = [
    {
        name: "type",
        label: "Type",
        sortable: false,
        raw: false,
        element: (value: string) => value.toUpperCase(),
    },
    {
        name: "currency",
        label: "Currency",
        sortable: false,
        raw: false,
    },
    {
        name: "day_bid_14",
        label: "14 Day Bid/Ask",
        sortable: false,
        raw: true,
        element: (value: Compliance) =>
            `${intl.format(value.day_bid_14)} - ${intl.format(
                value.day_ask_14
            )}`,
    },
    {
        name: "one_month_bid",
        label: "1 Month Bid/Ask",
        sortable: false,
        raw: true,
        element: (value: Compliance) =>
            `${intl.format(value.one_month_bid)} - ${intl.format(
                value.one_month_ask
            )}`,
    },
    {
        name: "three_month_bid",
        label: "3 Month Bid/Ask",
        sortable: false,
        raw: true,
        element: (value: Compliance) =>
            `${intl.format(value.three_month_bid)} - ${intl.format(
                value.three_month_ask
            )}`,
    },
    {
        name: "six_month_bid",
        label: "6 Month Bid/Ask",
        sortable: false,
        raw: true,
        element: (value: Compliance) =>
            `${intl.format(value.six_month_bid)} - ${intl.format(
                value.six_month_ask
            )}`,
    },
    {
        name: "created_at",
        label: "Created",
        sortable: true,
        raw: false,
        element: (value: string) => new Date(value).toLocaleString(),
    },
]

export default columns
