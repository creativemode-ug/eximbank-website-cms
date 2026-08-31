import { IColumn } from "@/components/Table/types";
import { IRole } from "@/types";


export const staffColumns: IColumn[] = [
    { 
        name: "first_name", 
        label: "First Name", 
        sortable: false, 
        raw: false,
        element: (value: string) => <span className="capitalize">{value}</span>
    },
    { 
        name: "last_name", 
        label: "Last Name", 
        sortable: false, 
        raw: false,
        element: (value: string) => <span className="capitalize">{value}</span>
    },
    { 
        name: "email", 
        label: "Email", 
        sortable: false, 
        raw: false 
    },
    { 
        name: "role", 
        label: "Role", 
        sortable: false, 
        raw: false,
        element: (value: IRole) => value.name ?? "N/A"
    },
    { 
        name: "updated_at", 
        label: "Updated", 
        sortable: true, 
        raw: false,
        element: (value: string) => new Date(value).toLocaleString()
    }
];

export const roleColumns: IColumn[] = [
    { 
        name: "name", 
        label: "Name", 
        sortable: false, 
        raw: false
    },
    { 
        name: "description", 
        label: "Description", 
        sortable: false, 
        raw: false
    },
    { 
        name: "description", 
        label: "# Permissions", 
        sortable: false, 
        raw: true,
        element: (value: IRole) => value.permissions?.length ?? "N/A"
    },
    { 
        name: "created_at", 
        label: "Created", 
        sortable: true, 
        raw: false,
        element: (value: string) => new Date(value).toLocaleString()
    }
];