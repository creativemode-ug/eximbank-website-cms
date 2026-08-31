import http from "@/http";
import { IListResponse, IPagination, IPermission } from "@/types";



export async function getPermissions(
    pager?: IPagination, 
    filter?: Record<string, unknown>
) {
    const response = await http.get<IListResponse<IPermission>>("/permissions", {
        params: {
            ...pager,
            ...filter
        }
    })

    return response.data
}