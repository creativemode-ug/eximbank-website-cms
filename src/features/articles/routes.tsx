import { Outlet, RouteObject } from "react-router-dom"

import Articles from "@/features/articles/pages/articles"
import ArticleForm from "@/features/articles/pages/article-form"
import ArticleView from "@/features/articles/pages/article-details"

const routes: RouteObject = {
    path: "/articles",
    element: <Outlet />,
    children: [
        {
            path: "",
            element: <Articles />,
            children: [
                {
                    path: ":articleId",
                    element: <ArticleView />,
                },
            ],
        },
        {
            path: "create",
            element: <ArticleForm />,
        },
        {
            path: ":articleId/update",
            element: <ArticleForm />,
        },
    ],
}

export default routes
