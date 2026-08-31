import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { authStore } from "@/store/auth";
import { useSnapshot } from "valtio";
import { useStaffDetail } from "@/repositories/staff_repository";

import AuthGuard from "@/guards/auth_guard";
import Sidebar from "@/components/Navigation/sidebar-menu";



export default function AppLayout() {
    const store = useSnapshot(authStore);

    const { staff, isLoading } = useStaffDetail(store.getUserEmail() ?? "");

    useEffect(() => {
        if(staff) store.setUser(staff.data)
    }, [staff, isLoading])
    
    return (
        <AuthGuard>
            <div className="flex max-h-screen">
                <section className="hidden md:block w-1/4 xl:w-1/5 2xl:w-[20%]">
                    <Sidebar />
                </section>

                <section className="flex-1 overflow-y-auto">
                    <Outlet />
                </section>
            </div>
        </AuthGuard>
    );
}