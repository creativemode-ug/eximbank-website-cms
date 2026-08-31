import { Tab } from "@headlessui/react";
import { Children, useEffect, useState, ReactNode } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export type Panel = {
    name: string
    icon?: ReactNode
}
export type Props = {
    panels: Panel[]
    panelClassName?: string
    children: ReactNode
}


export default function QueryTabs(props: Props) {
    const { search } = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [tabIndex, setTabIndex] = useState<number>();

    const getDefaultIndex = (): number => {
        const index = props.panels.findIndex((el) => el.name === searchParams.get("tab"));

        return index > -1 ? index : 0
    }

    const changeIndex = (index: number) => {
        const value = index < props.panels.length ? props.panels[index] : props.panels[0];
        setSearchParams({ tab: value.name });
    }

    useEffect(() => {
        setTabIndex(getDefaultIndex());
    }, [search])

    return (
        <Tab.Group 
            defaultIndex={getDefaultIndex()}
            selectedIndex={tabIndex}
            onChange={(index) => changeIndex(index)}
        >
            <Tab.List className={twMerge(
                "flex border border-zinc-200 p-1 rounded-2xl max-w-max",
            )}>
                {
                    props.panels.map((item, index) =>
                        <Tab
                            as="div" 
                            key={index}
                            className={ ({selected}) => {
                                return `flex justify-center items-center cursor-pointer focus:outline-none text-sm px-6 py-1.5 transition-transform duration-300 ease-linear rounded-xl
                                ${selected ? 'text-white bg-primary-accent translate-x-0' : 'text-zinc-400 border-transparent translate-x-1'}`
                            }}>
                            {item.icon}
                            <span>{item.name}</span>
                        </Tab>
                    )
                }
                
            </Tab.List>
            <Tab.Panels className={twMerge(
                props.panelClassName 
            )}>
                {
                    Children.map(props.children, (child, index) => (
                        <Tab.Panel key={index}>{child}</Tab.Panel>
                    ))
                }
            </Tab.Panels>
        </Tab.Group>
    )
}