import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { authStore } from "@/store/auth";

import Logo from "@/assets/logo-primary.png";
import Pattern from "@/assets/exim-pattern.svg"
import SoftClipBorders from "@/components/Shapes/SoftClipBorders";



export default function AuthLayout() {
    const navigate = useNavigate();
    const store = useSnapshot(authStore);

    useEffect(() => {
        if(store.getToken() !== null) {
            navigate("/", { replace: true });
        }
    }, [])

    return (
        <main className="flex flex-wrap lg:flex-nowrap min-h-screen">
            <div className="w-full md:w-2/5 xl:w-2/5 min-h-full p-8 lg:px-24 2xl:px-40 flex flex-col justify-between order-last md:order-first">
               <div>
                    <img 
                        src={Logo} 
                        alt="logo" 
                        className="h-12 w-auto mr-auto md:mb-16"
                    />
               </div>

                <Outlet />

                <div></div>
            </div>

            <div className="w-full md:w-3/5 xl:w-3/5 min-h-full p-8 lg:px-24 2xl:px-28">
                <SoftClipBorders>
                    <div 
                        className="w-full h-full bg-primary bg-no-repeat bg-cover bg-center clip-trapezium-br-sm"
                        style={{
                            backgroundImage: `url(${Pattern})`
                        }}
                    >

                    </div>
                </SoftClipBorders>
            </div>
            
        </main>
    )
}