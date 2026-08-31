import { ListResponse, APIResponse } from "@/types"
import type { TypeFaqSchema, FaqOptions, Faq } from "@/features/faq/types"

import http from "@/http"

export async function getFaq(options: FaqOptions) {
    const response = await http.get<ListResponse<Faq>>("/faqs", {
        params: options,
    })

    return response.data
}

export async function createFaq(input: TypeFaqSchema) {
    const { is_published, ...payload } = input
    const response = await http.post<APIResponse<Faq>>("/faqs", {
        ...payload,
        is_published: is_published ? 1 : 0,
    })
    return response.data
}

export async function updateFaq(input: { faqId: string; data: TypeFaqSchema }) {
    const { is_published, ...payload } = input.data
    const response = await http.put<APIResponse<Faq>>(`/faqs/${input.faqId}`, {
        ...payload,
        is_published: is_published ? 1 : 0,
    })

    return response.data
}

export async function deleteFaq(faqId: string) {
    const response = await http.delete<unknown>(`/faqs/${faqId}`)
    return response.data
}
