import { IContentType, IPermission } from "@/types";

export const byteToMb = (bytes: number) => Math.round(bytes / (1024 * 1024));

export const byteToKb = (bytes: number) => Math.round(bytes / 1024);


export function dateToInputFormat(date: string | null | undefined) {
    if(date) {
        let _date = new Date(date);
        let _month = _date.getMonth() + 1 > 10 ? _date.getMonth() + 1 : `0${_date.getMonth() + 1}`

        return `${_date.getFullYear()}-${_month}-${_date.getDate()}`
    }
    return ""
}

export function formatToContentType(permissions: IPermission[]) {
    const contentType: IContentType[] = [];

    const model_types = permissions.map((el) => (el.model_type));

    const unique_model_types = model_types.filter((value, index, array) => array.indexOf(value) === index)
        
    unique_model_types.forEach((value) => {
        contentType.push({
            "name": value.replace("App\\Models\\", ""),
            "permissions": permissions.filter((el) => el.model_type == value)
        })
    })

    return contentType
}