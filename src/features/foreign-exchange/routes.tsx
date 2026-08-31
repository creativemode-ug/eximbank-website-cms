import { RouteObject, Navigate } from "react-router-dom";

import Layout from "@/features/foreign-exchange/layout";
import Currency from "@/features/foreign-exchange/pages/currencies";
import CurrencyForm from "@/features/foreign-exchange/pages/currencies-form";
import Exchange from "@/features/foreign-exchange/pages/exchange-rates";
import ExchangeRatesForm from "@/features/foreign-exchange/pages/exchange-rates-form";
import ExchangeBulkUpload from "@/features/foreign-exchange/pages/exchange-bulk-upload";


const routes: RouteObject = {
    path: "/foreign-exchange",
    element: <Layout />,
    children: [
        {
            path: "",
            element: <Navigate to={"exchange"} />,
        },
        {
            path: "exchange",
            element: <Exchange />,
            children: [
                {
                    path: "upload",
                    element: <ExchangeBulkUpload />,
                },
                {
                    path: "create",
                    element: <ExchangeRatesForm />,
                },
                {
                    path: ":id/update",
                    element: <ExchangeRatesForm />,
                }
            ]
        },
        {
            path: "currency",
            element: <Currency />,
            children: [
                {
                    path: "create",
                    element: <CurrencyForm />,
                },
                {
                    path: ":id/update",
                    element: <CurrencyForm />,
                }
            ]
        }
    ]
}

export default routes