import { RouteObject } from "react-router-dom";

import FormsAndGuide from "@/features/forms-and-guide/pages/forms-and-guide";
import DocumentForm from "@/features/forms-and-guide/pages/document-form";
import DocumentDetails from "@/features/forms-and-guide/pages/document-details";


const routes: RouteObject = {
    path: "/forms-and-guide",
    element: <FormsAndGuide />,
    children: [
        {
            path: "create",
            element: <DocumentForm />,
        },
        {
            path: ":documentId",
            element: <DocumentDetails />,
        },
        {
            path: ":documentId/update",
            element: <DocumentForm />,
        },
    ]
}

export default routes