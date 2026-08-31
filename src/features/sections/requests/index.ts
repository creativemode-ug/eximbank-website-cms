import { ListResponse, APIResponse } from "@/types";
import { SectionDetailOption, type Section, type SectionOption } from "@/features/sections/types";
import { IPublishForm } from "@/types/forms";

import http from "@/http";



export async function getSections(options?: SectionOption) {
    const response = await http.get<ListResponse<Section>>("/sections", {
        params: options
    })

    return response.data
}


export async function getSectionDetails(options: SectionDetailOption) {
    const response = await http.get<APIResponse<Section>>(
        `/sections/${options.sectionId}`, {
            params: {
                "locale": options.locale
            }
        })
    return response.data
}

export async function createSection(input: FormData) {
    const response = await http.post<APIResponse<Section>>(
        "/sections", input, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return response.data
}

export async function updateSection(sectionId: string, input: FormData) {
    const response = await http.post<APIResponse<Section>>(
        `/sections/${sectionId}`, input, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return response.data
}

export async function publishSection(input: IPublishForm) {
    const response = await http.put<APIResponse<Section>>(`/sections/${input.id}`, input)

    return response.data
}

export async function deleteSection(sectionId: string) {
    const response = await http.delete<unknown>(`/sections/${sectionId}`)
    return response.data
}