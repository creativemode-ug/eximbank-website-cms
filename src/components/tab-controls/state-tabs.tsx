import { Tab } from "@headlessui/react";
import { Children, useState, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type Panel = {
    name: string
    icon?: ReactNode
}

export type Props = {
    panels: Panel[]
    panelClassName?: string
    children: ReactNode
    defaultIndex?: number
    onTabChange?: (index: number, panel: Panel) => void
}

export default function StateTabs(props: Props) {
    const [tabIndex, setTabIndex] = useState<number>(props.defaultIndex || 0);

    const changeIndex = (index: number) => {
        setTabIndex(index);
        const panel = props.panels[index];
        props.onTabChange?.(index, panel);
    }

    return (
        <Tab.Group
            selectedIndex={tabIndex}
            onChange={changeIndex}
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