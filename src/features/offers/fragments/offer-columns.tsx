import { IdName } from "@/types"
import { IColumn } from "@/components/Table/types"
import { Offer, OfferTypeEnum } from "@/features/offers/types"

import AvatarCard from "@/components/avatar-card"

const columns: IColumn[] = [
    {
        name: "title",
        label: "Title",
        sortable: false,
        raw: true,
        element: (value: Offer) => (
            <AvatarCard
                url={value.banner_image}
                title={value.title}
                description={value.caption}
                className="w-[24rem]"
                size={48}
            />
        ),
    },
    {
        name: "offer_type",
        label: "Offer Type",
        sortable: false,
        raw: false,
        element: (value: number) =>
            value == OfferTypeEnum.GLOBAL ? "Global" : "Local",
    },
    {
        name: "category",
        label: "Category",
        sortable: false,
        raw: false,
        element: (value: IdName) => value.name,
    },
    {
        name: "action_label",
        label: "Action Label",
        sortable: false,
        raw: false,
        element: (value: string | null) => value?.toUpperCase(),
    },
    {
        name: "discount",
        label: "Discount (%)",
        sortable: false,
        raw: false,
        element: (value: number) => value.toString(),
    },
]

export default columns
