import { Routes, Route, Outlet, useRoutes } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Toaster } from "react-hot-toast"

import useCustomQueryClient from "@/hooks/useCustomQueryClient"

import DefaultLayout from "@/layouts/app-layout"

// Routes
import AuthRoutes from "@/features/auth/routes"
import AwardRoutes from "@/features/awards/routes"
import DashboardRoutes from "@/features/dashboard/routes"
import ArticleRoutes from "@/features/articles/routes"
import CompliancesRoute from "@/features/compliances/routes"
import FaqRoutes from "@/features/faq/routes"
import ForeignExchangeRoutes from "@/features/foreign-exchange/routes"
import FormsAndGuideRoutes from "@/features/forms-and-guide/routes"
import LocationsRoutes from "@/features/locations/routes"
import MembersRoutes from "@/features/members/routes"
import VacancyRoutes from "@/features/vacancies/routes"
import ProductCategoryRoutes from "@/features/products/routes"
import SectionRoutes from "@/features/sections/routes"
import OffersRoutes from "@/features/offers/routes"

import SettingsRoutes from "@/routes/settings"
import NotFound from "@/features/not-found"

const AppRoutes = () => {
    return useRoutes([
        AuthRoutes,
        {
            path: "/",
            element: <DefaultLayout />,
            children: [
                DashboardRoutes,
                ArticleRoutes,
                AwardRoutes,
                CompliancesRoute,
                FaqRoutes,
                ForeignExchangeRoutes,
                FormsAndGuideRoutes,
                LocationsRoutes,
                MembersRoutes,
                VacancyRoutes,
                ProductCategoryRoutes,
                SectionRoutes,
                OffersRoutes,
            ],
        },
        {
            path: "*",
            element: <NotFound />,
        },
    ])
}

export default function App() {
    const client = useCustomQueryClient()

    return (
        <main>
            <QueryClientProvider client={client}>
                <ReactQueryDevtools initialIsOpen={false} />
                <Toaster position="top-right" reverseOrder={false} />

                <Routes>
                    <Route path="/" element={<DefaultLayout />}>
                        <Route path="settings/*" element={<SettingsRoutes />} />
                    </Route>
                </Routes>

                <AppRoutes />

                <Outlet />
            </QueryClientProvider>
        </main>
    )
}
