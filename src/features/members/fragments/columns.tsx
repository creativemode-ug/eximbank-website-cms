import { IColumn } from "@/components/Table/types";
import { type Member } from "@/features/members/types";

import Badge from "@/components/Badge";
import Avatar from "@/components/Avatar";


const columns: IColumn[] = [
    { 
        name: "full_name", 
        label: "Name", 
        sortable: false, 
        raw: true,
        element: (value: Member) => (
            <div className="flex items-start gap-3">
                <Avatar 
                    name={value.full_name} 
                    url={value.image} 
                    size={40}
                />

                <div className="flex flex-col">
                    <span>{value.full_name}</span>
                    <span>{value.position}</span>
                </div>
            </div>
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
        name: "rank", 
        label: "Rank", 
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