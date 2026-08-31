import { RouteObject } from "react-router-dom"

import Locations from "@/features/locations/pages/locations"
import LocationForm from "@/features/locations/pages/location-form"
import LocationDetails from "@/features/locations/pages/location-details"
import LocationUpload from "@/features/locations/pages/location-bulk-upload"

const routes: RouteObject = {
    path: "/locations",
    element: <Locations />,
    children: [
        {
            path: "create",
            element: <LocationForm />,
        },
        {
            path: ":locationId",
            element: <LocationDetails />,
        },
        {
            path: ":locationId/update",
            element: <LocationForm />,
        },
        {
            path: "bulk",
            element: <LocationUpload />,
        },
    ],
}

export default routes
