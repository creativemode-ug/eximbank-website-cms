import { ListResponse, APIResponse } from "@/types";
import { Award, AwardOptions, TAwardSchema } from "@/features/awards/types";

import http from "@/http";


export async function getAwards(options: AwardOptions) {
    const response = await http.get<ListResponse<Award>>("/awards", {
        params: options
    })

    return response.data
}

export async function createAward(input: TAwardSchema) {
    const response = await http.post<APIResponse<Award>>(
        "/awards", input
    )
    return response.data
}

export async function updateAwards(input: {awardId: string, data: TAwardSchema}) {
    const response = await http.put<APIResponse<Award>>(
        `/awards/${input.awardId}`, input.data,
    )

    return response.data
}

export async function deleteAward(awardId: string) {
    const response = await http.delete<any>(`/awards/${awardId}`)
    return response.data
}