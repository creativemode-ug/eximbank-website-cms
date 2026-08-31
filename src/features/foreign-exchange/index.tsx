import Tabs, { Panel } from "@/components/tab-controls/query-tabs";
import { IconCoin, IconExchange } from "@tabler/icons-react";

import Exchange from "@/features/foreign-exchange/pages/exchange-rates";
import Currency from "@/features/foreign-exchange/pages/currencies";


const panels: Panel[] = [
    {
        name: "Exchange",
        icon: <IconExchange className="w-4 h-4 mr-2" />
    },
    {
        name: "Currency",
        icon: <IconCoin className="w-4 h-4 mr-2" />
    }
]

export default function ForeignExchange() {

    return (
        <div className="container py-10">
            <Tabs panels={panels} panelClassName="mt-8">
                <Exchange />

                <Currency />
            </Tabs>
        </div>
    )
}