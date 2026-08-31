import { useEffect, useState } from "react";
import { usePermissions } from "@/repositories/permissions_repository";
import { IContentType } from "@/types";
import { formatToContentType } from "@/utils/conversion";

import Loader from "@/components/loading-indicator";

interface IProps {
    defaultValue?: string[]
    onChange: (value: string[]) => void
}

export default function PermissionInput(props: IProps) {
    const [checkedItems, setCheckedItems] = useState<string[]>(props.defaultValue ?? []);
    const [contentTypes, setContentTypes] = useState<IContentType[]>([]);
    
    const { permissions, isLoading } = usePermissions(
        { page: 1, per_page: 100 }
    );

    const onCheckboxChange = (value: string) => {
        const exists = checkedItems.findIndex(el => el == value);

        if(exists === -1) {
            setCheckedItems([value, ...checkedItems]);
        } else {
            setCheckedItems(checkedItems.filter(el => el !== value))
        }
    }

    useEffect(() => {
        if(checkedItems) props.onChange(checkedItems)
    }, [checkedItems])

    useEffect(() => {
        if(permissions){
            setContentTypes(formatToContentType(permissions.data))
        }
    }, [permissions])

    return (
        <>

        <Loader
            loading={isLoading}
            isEmpty={permissions?.data.length == 0}
        />

        {
            contentTypes && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    contentTypes.map((content) => (
                        <div 
                            className="border-l-4 border-l-primary border border-slate-200 shadow-sm p-2 rounded-md" 
                            key={content.name}
                        >
                            <h4 className="text-xs font-semibold mb-2.5">
                                {content.name}
                            </h4>

                            <div className="grid grid-cols-2 gap-2">
                                {
                                    content.permissions.map((permission) => (
                                        <div className="flex items-center" key={permission.id}>
                                            <input 
                                                type="checkbox" 
                                                id={permission.name} 
                                                value={permission.id}
                                                onChange={() => onCheckboxChange(permission.id)}
                                                checked={checkedItems.includes(permission.id)}        
                                            />
                                            <label 
                                                htmlFor={permission.name} 
                                                className="pl-2 text-[10px] capitalize"
                                            >
                                                {permission.name.split("_").join(" ")}
                                            </label>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        )}
        </>
    )
}