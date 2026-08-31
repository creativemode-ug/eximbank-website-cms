import { authStore } from "@/store/auth";
import { useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSnapshot } from "valtio";



interface IProps {
    children: ReactNode
}


export default function(props: IProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const store = useSnapshot(authStore);
    
    useEffect(() => {
        if(store.getToken() == null) {
            navigate("/auth/login", {replace: true});
        }
    }, [store.user, location.pathname])


    return (
        <main>{props.children}</main>
    );
}