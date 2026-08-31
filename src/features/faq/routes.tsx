import { RouteObject } from "react-router-dom"

import Faqs from "@/features/faq/pages/faqs"
import FaqForm from "@/features/faq/pages/faq-form"

const routes: RouteObject = {
    path: "/faq",
    element: <Faqs />,
    children: [
        {
            path: "create",
            element: <FaqForm />,
        },
        {
            path: ":faqId/update",
            element: <FaqForm />,
        },
    ],
}

export default routes
