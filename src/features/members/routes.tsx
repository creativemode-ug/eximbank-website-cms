import { RouteObject } from "react-router-dom";

import Members from "@/features/members/pages/members";
import MemberForm from "@/features/members/pages/member-form"


const routes: RouteObject = {
    path: "/members",
    element: <Members />,
    children: [
        {
            path: "create",
            element: <MemberForm />,
        },
        {
            path: ":memberId/update",
            element: <MemberForm />,
        },
    ]
}

export default routes