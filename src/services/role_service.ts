import http from "@/http";
import { IListResponse, IPagination, IRole, IWriteResponse } from "@/types";
import { IRoleForm } from "@/types/forms";



export async function getRoles(
    pager?: IPagination, 
    filter?: Record<string, unknown>
) {
    const response = await http.get<IListResponse<IRole>>("/roles", {
        params: {
            ...pager,
            ...filter
        }
    })

    return response.data
}

export async function createRole(input: IRoleForm) {
    const response = await http.post<IWriteResponse<IRole>>(
        "/roles", input
    )
    return response.data
}

export async function updateRole(roleId: string, input: IRoleForm) {
    const response = await http.put<IWriteResponse<IRole>>(
        `/roles/${roleId}`, input
    )

    return response.data
}

export async function deleteRole(roleId: string) {
    const response = await http.delete<any>(`/roles/${roleId}`)
    return response.data
}