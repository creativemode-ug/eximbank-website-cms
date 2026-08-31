import Tabs, { Panel } from "@/components/tab-controls/query-tabs";
import { IconUserShield, IconKey } from "@tabler/icons-react";

import Roles from "@/features/access/control/roles";
import Permissions from "@/features/access/control/permissions";


const panels: Panel[] = [
    {
        name: "Roles",
        icon: <IconUserShield className="w-4 h-4 mr-2" />
    },
    {
        name: "Permissions",
        icon: <IconKey className="w-4 h-4 mr-2" />
    }
]

export default function () {

    return (
        <div className="container py-10">
            <Tabs panels={panels} panelClassName="mt-8">
                <Roles />

                <Permissions />
            </Tabs>
        </div>
    )
}