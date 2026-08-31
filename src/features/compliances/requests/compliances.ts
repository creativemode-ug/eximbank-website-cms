import { ListResponse, APIResponse } from "@/types";
import type { ComplianceOptions, Compliance } from "@/features/compliances/types";

import http from "@/http";


export async function getCompliances(options: ComplianceOptions) {
    const response = await http.get<ListResponse<Compliance>>("/compliance-treasuries", {
        params: options
    })

    return response.data
}

export async function importCompliance(input: FormData) {
    const response = await http.post<APIResponse<Compliance>>(
        "/compliance-treasuries/import", input, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return response.data
}

export async function exportCompliance() {
    const response = await http.get(
        "/compliance-treasuries/excel-format", {
        responseType: "blob",
    })

    return response.data
}