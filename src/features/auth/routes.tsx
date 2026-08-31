import { RouteObject, Navigate } from "react-router-dom";

import AuthLayout from "@/features/auth/layout";
import Login from "@/features/auth/pages/login";


const routes: RouteObject = {
    path: "/auth",
    element: <AuthLayout />,
    children: [
        {
            path: "",
            element: <Navigate to={"login"} />,
        },
        {
            path: "login",
            element: <Login />,
        }
    ]
}

export default routes