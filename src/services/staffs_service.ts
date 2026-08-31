import http from "@/http";
import { IListResponse, IPagination, IStaff, IWriteResponse } from "@/types";
import { IStaffForm } from "@/types/forms";



export async function getStaffs(
    pager?: IPagination, 
    filter?: Record<string, unknown>
) {
    const response = await http.get<IListResponse<IStaff>>("/users", {
        params: {
            ...pager,
            ...filter
        }
    })

    return response.data
}

export async function retrieveStaff(staffId: string) {
    const response = await http.get<IWriteResponse<IStaff>>(`/users/${staffId}`)

    return response.data
}

export async function createStaff(input: IStaffForm) {
    const response = await http.post<IWriteResponse<IStaff>>(
        "/users", input
    )
    return response.data
}

export async function updateStaff(staffId: string, input: IStaffForm) {
    const response = await http.put<IWriteResponse<IStaff>>(
        `/users/${staffId}`, input,
    )

    return response.data
}

export async function deleteStaff(staffId: string) {
    const response = await http.delete<any>(`/users/${staffId}`)
    return response.data
}