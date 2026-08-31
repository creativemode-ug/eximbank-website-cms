import { RouteObject } from "react-router-dom";

import Compliances from "@/features/compliances/pages/compliances";
import ComplianceImportForm from "@/features/compliances/pages/compliance-import-form"


const routes: RouteObject = {
    path: "/compliances",
    element: <Compliances />,
    children: [
        {
            path: "import",
            element: <ComplianceImportForm />,
        },
    ]
}

export default routes