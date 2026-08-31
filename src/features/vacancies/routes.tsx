import { Outlet, RouteObject } from "react-router-dom"

import Vacancies from "@/features/vacancies/pages/vacancies"
import VacancyForm from "@/features/vacancies/pages/vacancy-form"
import PositionView from "@/features/vacancies/pages/vacancy-view"

const routes: RouteObject = {
    path: "/positions",
    element: <Outlet />,
    children: [
        {
            path: "",
            element: <Vacancies />,
            children: [
                {
                    path: ":vacancyId",
                    element: <PositionView />,
                },
            ],
        },
        {
            path: "create",
            element: <VacancyForm />,
        },
        {
            path: ":vacancyId/update",
            element: <VacancyForm />,
        },
    ],
}

export default routes
