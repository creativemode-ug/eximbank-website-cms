import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { IconChevronDown } from "@tabler/icons-react";
import { TypeMenuLink } from "@/components/Navigation/links";
import { Transition } from "@headlessui/react";


export type MenuLinkProps = {
    content: TypeMenuLink
    onClick?: () => void
}

function MenuLink({ content, onClick }: MenuLinkProps) {
    const location = useLocation();

    const isActivePath = (path: string) => {
        const segments = location.pathname.split("/").slice(1);
        const menu_segments = path.split("/").slice(1);

        return segments.some(el => menu_segments.includes(el))
    }

    return (
        <div className="relative font-medium" onClick={onClick}>            
            {
                content.subMenus === undefined ? (
                    <Link 
                        to={content.path} 
                        className={twMerge(
                            "flex items-center space-x-4 px-4 py-2 w-full border rounded-md",
                            isActivePath(content.path) ? 
                            "text-white bg-primary" : 
                            "text-primary border-transparent hover:bg-primary-100"
                        )}
                    >
                        {content.icon}

                        <span>
                            {content.label}
                        </span>
                    </Link>
                ) : (
                    <div>
                        <Link
                            to={content.path} 
                            className={twMerge(
                                "flex justify-between items-center px-4 py-2 w-full border rounded-md",
                                isActivePath(content.path) ? 
                                "text-white bg-primary" : 
                                "text-primary border-transparent hover:bg-primary-100"
                            )}
                        >
                            <div className="flex items-center space-x-4">
                                {content.icon}

                                <span>
                                    {content.label}
                                </span>
                            </div>

                            <IconChevronDown 
                                className={twMerge(
                                    "h-4 w-4",
                                    isActivePath(content.path) && "rotate-180"
                                )} 
                            />
                        </Link>

                        <Transition
                            show={isActivePath(content.path)}
                            as="div"
                            enter="transition ease-out duration-300"
                            enterFrom="transform opacity-0 scale-y-95"
                            enterTo="transform opacity-100 scale-y-100"
                            leave="transition ease-in duration-300"
                            leaveFrom="transform opacity-100 scale-y-100"
                            leaveTo="transform opacity-0 scale-y-95"
                        >
                            <div className="ml-4 my-2 space-y-1">
                                {
                                    content.subMenus.map((menu, index) => (
                                        <Link 
                                            to={menu.path ?? ""} 
                                            className={twMerge(
                                                "flex items-center space-x-4 px-4 py-2 w-full rounded-md text-primary",
                                                location.pathname == menu.path && "bg-primary-100"
                                            )}
                                            key={index}
                                        >
                                            {menu.icon}
                                            <span>{menu.label}</span>
                                        </Link>
                                    ))
                                }
                            </div>
                        </Transition>
                    </div>
                )
            }
        </div>
    )
}

export default MenuLink