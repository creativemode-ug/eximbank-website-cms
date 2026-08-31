import { Outlet, RouteObject } from "react-router-dom";

import Sections from "@/features/sections/pages/sections";
import SectionForm from "@/features/sections/pages/section-form";
import SectionView from "@/features/sections/pages/section-details";


const routes: RouteObject = {
    path: "/sections",
    element: <Outlet />,
    children: [
        {
            index: true,
            element: <Sections />,
        },
        {
            path: "",
            element: <Sections />,
            children: [
                {
                    path: ":sectionId",
                    element: <SectionView />,
                },
            ]
        },
        {
            path: "create",
            element: <SectionForm />,
        },
        {
            path: ":sectionId/update",
            element: <SectionForm />,
        },
    ]
}

export default routes