import { RouteObject } from "react-router-dom";

import Awards from "@/features/awards/pages/awards";
import AwardForm from "@/features/awards/pages/award-form";
import AwardView from "@/features/awards/pages/award-details";


const routes: RouteObject = {
    path: "/awards",
    element: <Awards />,
    children: [
        {
            path: "create",
            element: <AwardForm />,
        },
        {
            path: ":awardId/update",
            element: <AwardForm />,
        },
        {
            path: ":awardId",
            element: <AwardView />,
        },
    ]
}

export default routes