import { ReactNode } from "react";
import { useSnapshot } from "valtio";
import { authStore } from "@/store/auth";

import { comparePermissions } from "./permissions";


interface IProps {
    children: ReactNode,
    permissions: string[]
}

export default function AccessGuard({children, permissions = []}: IProps){
    const store = useSnapshot(authStore);

    if(permissions.length == 0) return <>{children}</>

    return <>{comparePermissions(store.getPermissions(), permissions) && children}</>    
}