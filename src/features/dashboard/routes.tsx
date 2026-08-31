import { Navigate, RouteObject } from "react-router-dom";


const routes: RouteObject = {
    path: "/",
    element: <Navigate to="/sections" />,
}

export default routes