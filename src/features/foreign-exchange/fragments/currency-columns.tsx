import { IColumn } from "@/components/Table/types";

const columns: IColumn[] = [
    { 
        name: "flag", 
        label: "Flag", 
        sortable: false, 
        raw: false,
        element: (value: string) => {
            return (
                <img 
                    src={value} 
                    alt="flag" 
                    className="w-8 h-8 rounded-full object-cover"
                />
            )
        },
    },
    { 
        name: "currency", 
        label: "Currency", 
        sortable: false, 
        raw: false
    },
    { 
        name: "created_at", 
        label: "Created", 
        sortable: true, 
        raw: false,
        element: (value: string) => new Date(value).toLocaleString()
    },
    { 
        name: "updated_at", 
        label: "Updated", 
        sortable: true, 
        raw: false,
        element: (value: string) => new Date(value).toLocaleString()
    }
];

export default columns