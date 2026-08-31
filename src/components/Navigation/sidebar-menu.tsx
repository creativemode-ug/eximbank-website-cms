import { sidebarLinks } from "@/components/Navigation/links"
import { useNavigate } from "react-router-dom"
import { useSnapshot } from "valtio"
import { authStore } from "@/store/auth"

import MenuLink from "@/components/Navigation/MenuLink"
import Logo from "@/assets/logo-primary.png"
import Button from "@/components/Buttons/Button"
import AccessGuard from "@/guards/access_guard"

export default function Sidebar() {
    const navigate = useNavigate()
    const auth = useSnapshot(authStore)

    return (
        <div className="flex flex-col justify-between min-h-screen bg-gradient-to-b from-primary-50 to-transparent border-r border-primary-100 py-10">
            <section className="px-6">
                <div>
                    <img
                        src={Logo}
                        alt="exim-logo"
                        className="h-12 w-auto mx-auto mb-16"
                    />
                </div>

                <nav className="text-xs">
                    {sidebarLinks.map((menu, index) => (
                        <AccessGuard permissions={menu.permissions} key={index}>
                            <MenuLink content={menu} />
                        </AccessGuard>
                    ))}
                </nav>
            </section>

            <section className="px-4 2xl:px-8 text-xs xl:text-sm">
                <div className="flex items-start border border-zinc-200 bg-white py-3 px-4 rounded-md mb-6">
                    <div className="flex justify-center items-center w-8 h-8 rounded-full bg-primary text-white">
                        JD
                    </div>

                    <div className="text-xs ml-3">
                        <h4 className="font-semibold">Exim Admin</h4>
                        <p className="text-zinc-400">admin@exim.co.tz</p>
                    </div>
                </div>

                <Button
                    intent="tertiary"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                        auth.logout()
                        navigate("/auth/login", { replace: true })
                    }}
                >
                    Sign out
                </Button>

                <p className="text-xs text-zinc-400 mt-4">
                    &copy; {new Date().getFullYear()} EXIM Bank. All rights
                    reserved
                </p>
            </section>
        </div>
    )
}
