import { ListResponse, APIResponse } from "@/types";
import type { Member, MemberDetailOption, MemberOptions } from "@/features/members/types";
import { IPublishForm } from "@/types/forms";

import http from "@/http";



export async function getMembers(options: MemberOptions) {
    const response = await http.get<ListResponse<Member>>("/leaders", {
        params: options
    })

    return response.data
}

export async function getMemberDetails(options: MemberDetailOption) {
    const response = await http.get<APIResponse<Member>>(
        `/leaders/${options.memberId}`, {
            params: {
                "locale": options.locale
            }
        })
    return response.data
}

export async function createMember(input: FormData) {
    const response = await http.post<APIResponse<Member>>(
        "/leaders", input, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return response.data
}

export async function updateMember(input: { memberId: string, data: FormData }) {
    const response = await http.post<APIResponse<Member>>(
        `/leaders/${input.memberId}`, input.data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return response.data
}

export async function publishMember(input: IPublishForm) {
    const response = await http.put<APIResponse<Member>>(`/leaders/${input.id}`, input)

    return response.data
}

export async function deleteMember(memberId: string) {
    const response = await http.delete<any>(`/leaders/${memberId}`)
    return response.data
}