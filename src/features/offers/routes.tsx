import { Navigate, Outlet, RouteObject } from "react-router-dom"

import OffersLayout from "@/features/offers/offers-layout"
import Offers from "@/features/offers/pages/offers"
import OfferForm from "@/features/offers/pages/offer-form"
import OfferDetailView from "@/features/offers/pages/offer-details"
import OfferCategory from "@/features/offers/pages/offer-category"
import OfferCategoryForm from "@/features/offers/pages/offer-category-form"
import CardType from "@/features/offers/pages/card-types"
import CardTypeForm from "@/features/offers/pages/card-type-form"

const routes: RouteObject = {
    path: "/offers-and-perks",
    element: <Outlet />,
    children: [
        {
            index: true,
            element: <Navigate to="/offers-and-perks/offers" />,
        },
        {
            path: "",
            element: <OffersLayout />,
            children: [
                {
                    path: "offers",
                    element: <Offers />,
                    children: [
                        {
                            path: ":offerId",
                            element: <OfferDetailView />,
                        },
                    ],
                },
                {
                    path: "categories",
                    element: <OfferCategory />,
                    children: [
                        {
                            path: "create",
                            element: <OfferCategoryForm />,
                        },
                        {
                            path: ":categoryId/update",
                            element: <OfferCategoryForm />,
                        },
                    ],
                },
                {
                    path: "card-types",
                    element: <CardType />,
                    children: [
                        {
                            path: "create",
                            element: <CardTypeForm />,
                        },
                        {
                            path: ":cardTypeId/update",
                            element: <CardTypeForm />,
                        },
                    ],
                },
            ],
        },

        {
            path: "offers/create",
            element: <OfferForm />,
        },
        {
            path: "offers/:offerId/update",
            element: <OfferForm />,
        },
    ],
}

export default routes
