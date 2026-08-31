import { Route, Routes } from "react-router-dom";

import Staff from "@/features/access/staff";
import StaffForm from "@/features/access/staff/staff_form";

import Control from "@/features/access/control";
import RoleForm from "@/features/access/control/role_form";



export default function SettingsRoutes() {

    return (
        <Routes>
            <Route index element={<Staff />} />

            <Route path="/staff" element={<Staff />}>
                <Route path="create" element={<StaffForm />} />
                <Route path="update/:id" element={<StaffForm />} />
            </Route>

            <Route path="/roles" element={<Control />}>
                <Route path="create" element={<RoleForm />} />
                <Route path="update/:id" element={<RoleForm />} />
            </Route>

        </Routes>
    )
}