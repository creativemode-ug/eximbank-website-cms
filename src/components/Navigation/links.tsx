import {
    IconFileLambda,
    IconNews,
    IconExchange,
    IconCards,
    IconGift,
    IconBasket,
    // IconHotelService,
    // IconPhotoHeart,
    IconSettings2,
    IconHelpOctagon,
    IconAward,
    IconCertificate2,
    IconMapPin2,
    IconUsers,
    IconUserShield,
    IconFileCertificate,
} from "@tabler/icons-react"
import { ReactNode } from "react"
import {
    ContentType,
    Action,
    getPermission,
} from "@/guards/access_guard/permissions"

export interface TypeMenuLink {
    label: string
    path: string
    icon?: ReactNode
    permissions: string[]
    subMenus?: Omit<TypeMenuLink, "subMenus">[]
}

export const sidebarLinks: TypeMenuLink[] = [
    // {
    //     label: "Dashbord",
    //     path: "/",
    //     icon: <IconFileLambda size={20} strokeWidth={1.6} />
    // },
    {
        label: "Banners & CTA",
        path: "/sections",
        icon: <IconCards size={20} strokeWidth={1.6} />,
        permissions: [
            ...getPermission(ContentType.Section, [Action.LIST, Action.ALL]),
        ],
    },
    // {
    //     label: "Services",
    //     path: "/services",
    //     icon: <IconHotelService size={20} strokeWidth={1.6} />,
    //     permissions: [...getPermission(ContentType.Service, [Action.LIST, Action.ALL])]
    // },
    {
        label: "Articles",
        path: "/articles",
        icon: <IconNews size={20} strokeWidth={1.6} />,
        permissions: [
            ...getPermission(ContentType.Article, [Action.LIST, Action.ALL]),
        ],
    },
    {
        label: "Forms & Guide",
        path: "/forms-and-guide",
        icon: <IconFileLambda size={20} strokeWidth={1.6} />,
        permissions: [
            ...getPermission(ContentType.Document, [Action.LIST, Action.ALL]),
        ],
    },
    {
        label: "Products",
        path: "/services",
        icon: <IconBasket size={20} strokeWidth={1.6} />,
        permissions: [
            ...getPermission(ContentType.Service, [Action.LIST, Action.ALL]),
        ],
    },
    {
        label: "Career",
        path: "/positions",
        icon: <IconCertificate2 size={20} strokeWidth={1.6} />,
        permissions: [
            ...getPermission(ContentType.Position, [Action.LIST, Action.ALL]),
        ],
    },
    {
        label: "Offers & Perks",
        path: "/offers-and-perks",
        icon: <IconGift size={20} strokeWidth={1.6} />,
        permissions: [
            ...getPermission(ContentType.Product, [Action.LIST, Action.ALL]),
        ],
    },
    {
        label: "Foreign Exchange",
        path: "/foreign-exchange",
        icon: <IconExchange size={20} strokeWidth={1.6} />,
        permissions: [
            ...getPermission(ContentType.Exchangerate, [
                Action.LIST,
                Action.ALL,
            ]),
        ],
    },
    {
        label: "Compliances",
        path: "/compliances",
        icon: <IconFileCertificate size={20} strokeWidth={1.6} />,
        permissions: [
            ...getPermission(ContentType.Exchangerate, [
                Action.LIST,
                Action.ALL,
            ]),
        ],
    },
    {
        label: "FAQ",
        path: "/faq",
        icon: <IconHelpOctagon size={20} strokeWidth={1.6} />,
        permissions: [
            ...getPermission(ContentType.Faq, [Action.LIST, Action.ALL]),
        ],
    },
    {
        label: "Awards",
        path: "/awards",
        icon: <IconAward size={20} strokeWidth={1.6} />,
        permissions: [
            ...getPermission(ContentType.Award, [Action.LIST, Action.ALL]),
        ],
    },
    {
        label: "Locations",
        path: "/locations",
        icon: <IconMapPin2 size={20} strokeWidth={1.6} />,
        permissions: [
            ...getPermission(ContentType.Metric, [Action.LIST, Action.ALL]),
        ],
    },
    {
        label: "Team",
        path: "/members",
        icon: <IconUsers size={20} strokeWidth={1.6} />,
        permissions: [
            ...getPermission(ContentType.Leader, [Action.LIST, Action.ALL]),
        ],
    },
    {
        label: "Settings",
        path: "/settings",
        icon: <IconSettings2 size={20} strokeWidth={1.6} />,
        permissions: [
            ...getPermission(ContentType.User, [Action.LIST, Action.ALL]),
            ...getPermission(ContentType.Role, [Action.LIST, Action.ALL]),
        ],
        subMenus: [
            {
                label: "Staff",
                path: "/settings/staff",
                icon: <IconUsers size={20} strokeWidth={1.6} />,
                permissions: [
                    ...getPermission(ContentType.User, [
                        Action.LIST,
                        Action.ALL,
                    ]),
                ],
            },
            {
                label: "Roles & Permissions",
                path: "/settings/roles",
                icon: <IconUserShield size={20} strokeWidth={1.6} />,
                permissions: [
                    ...getPermission(ContentType.Role, [
                        Action.LIST,
                        Action.ALL,
                    ]),
                ],
            },
        ],
    },
]
