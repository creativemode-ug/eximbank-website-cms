import { Navigate, Outlet, type RouteObject } from "react-router-dom"

import ProductLayout from "@/features/products/product-layout"
import Products from "@/features/products/pages/products"
import ProductDetails from "@/features/products/pages/product-details"
import ProductsFormLayout from "@/features/products/pages/product-form-layout"
import ProductsFormTemplate from "@/features/products/pages/product-form-template"
import ProductsFormContent from "@/features/products/pages/product-form-content"
import ProductCategories from "@/features/products/pages/product-categories"
import ProductCategoriesForm from "@/features/products/pages/product-categories-form"
import ProductResources from "@/features/products/pages/product-resources"
import ProductResourceForm from "@/features/products/pages/product-resource-form"
import SubProductsForm from "@/features/products/pages/sub-products-form.tsx"
import CardTypes from "@/features/products/pages/card-types"
import CardTypeForm from "@/features/products/pages/card-type-form"

const routes: RouteObject = {
    path: "/services",
    element: <Outlet />,
    children: [
        {
            index: true,
            element: <Navigate to="/services/products" />,
        },
        {
            path: "",
            element: <ProductLayout />,
            children: [
                {
                    path: "products",
                    element: <Products />,
                },
                {
                    path: "categories",
                    element: <ProductCategories />,
                    children: [
                        {
                            path: "create",
                            element: <ProductCategoriesForm />,
                        },
                        {
                            path: ":productCategoryId/update",
                            element: <ProductCategoriesForm />,
                        },
                        {
                            path: ":productCategoryId",
                            element: <ProductCategories />,
                        },
                    ],
                },
                {
                    path: "resources",
                    element: <ProductResources />,
                    children: [
                        {
                            path: "create",
                            element: <ProductResourceForm />,
                        },
                        {
                            path: ":resourceId/update",
                            element: <ProductResourceForm />,
                        },
                    ],
                },
                {
                    path: "card-types",
                    element: <CardTypes />,
                    children: [
                        {
                            path: "create",
                            element: <CardTypeForm />,
                        },
                        {
                            path: ":cardTypeId/update",
                            element: <CardTypeForm />,
                        },
                    ],
                },
            ],
        },
        {
            path: "products/create",
            element: <ProductsFormLayout />,
            children: [
                {
                    path: "",
                    element: <ProductsFormTemplate />,
                },
                {
                    path: "content",
                    element: <ProductsFormContent />,
                },
                {
                    path: "publish",
                    element: <ProductsFormTemplate />,
                },
            ],
        },
        {
            path: "products/:productId/edit",
            element: <ProductsFormLayout />,
            children: [
                {
                    path: "",
                    element: <ProductsFormTemplate />,
                },
                {
                    path: "content",
                    element: <ProductsFormContent />,
                },
                {
                    path: "publish",
                    element: <ProductsFormTemplate />,
                },
            ],
        },
        {
            path: "products/:productId/add-sub-product",
            element: <SubProductsForm />,
        },
        {
            path: "products/:productId/edit-sub-product",
            element: <SubProductsForm />,
        },
        {
            path: "products/:productId",
            element: <ProductDetails />,
        },
    ],
}

export default routes
