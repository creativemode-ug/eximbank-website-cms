import { IColumn } from "@/components/Table/types";
import { Section } from "@/features/sections/types";

import Badge from "@/components/Badge";
import Avatar from "@/components/Avatar";


const columns: IColumn[] = [
    { 
        name: "full_name", 
        label: "Name", 
        sortable: false, 
        raw: true,
        element: (value: Section) => (
            <Avatar 
                name={value.title ?? ""} 
                url={value.image} 
                size={40}
            />
        )
    },
    { 
        name: "type", 
        label: "Type", 
        sortable: false, 
        raw: false,
        element: (value: string) => value.toUpperCase(),
    },
    { 
        name: "placement", 
        label: "Placement", 
        sortable: false, 
        raw: false,
        element: (value: string | null) => value?.toUpperCase(),
    },
    { 
        name: "action", 
        label: "Actions", 
        sortable: false, 
        raw: false,
        element: (value: string | null) => value !== 'null' ? value : "N/A",
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
        name: "start_date", 
        label: "Start-End", 
        sortable: true, 
        raw: true,
        element: (value: Section) => {
            if(value.start_date && value.end_date) {
                return `${new Date(value.start_date).toLocaleDateString()} to ${new Date(value.end_date).toLocaleDateString()}`
            }
            return "N/A"
        }
    }
];

export default columns