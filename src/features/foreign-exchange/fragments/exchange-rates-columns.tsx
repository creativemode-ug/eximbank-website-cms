import { IColumn } from "@/components/Table/types";
import { ExchangeRate } from "@/features/foreign-exchange/types";

import Badge from "@/components/Badge";

const columns: IColumn[] = [
    { 
        name: "id", 
        label: "Currency", 
        sortable: false, 
        raw: true,
        element: (value: ExchangeRate) => {
            return (
                <div className="flex items-center">
                    <img 
                        src={value.currency.flag} 
                        alt={value.currency.currency} 
                        className="w-8 h-8 rounded-full object-cover mr-3"
                    />
                    <span>{value.currency.currency}</span>
                </div>
            )
        }
    },
    { 
        name: "buying", 
        label: "Buying", 
        sortable: false, 
        raw: false,
    },
    { 
        name: "selling", 
        label: "Selling", 
        sortable: false, 
        raw: false 
    },
    { 
        name: "is_published", 
        label: "Status", 
        sortable: true, 
        raw: false,
        element: (value) => {
            if(value) {
                return <Badge text="published" intent="primary" />
            }
            return <Badge text="draft" intent="default" />
        }
    },
    { 
        name: "created_at", 
        label: "Date Created", 
        sortable: true, 
        raw: false,
        element: (value: string) => new Date(value).toLocaleString()
    }
];

export default columns