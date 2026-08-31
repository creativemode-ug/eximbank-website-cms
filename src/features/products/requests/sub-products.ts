import type {ProductQueryOptions, SubProduct} from "@/features/products/types.ts";
import http from "@/http";
import {APIResponse, ListResponse} from "@/types";
import {Languages} from "@/i18n.config.ts";

export async function getSubProducts(options: ProductQueryOptions) {
    const response = await http.get<ListResponse<SubProduct>>("/sub-products", {
        params: options,
    })

    return response.data
}

export async function getSubProductDetail(options: {
    subProductId: string
    locale: Languages
}) {
    const response = await http.get<APIResponse<SubProduct>>(
        `/sub-products/${options.subProductId}?locale=${options.locale}`,
        {
            params: options,
        }
    )

    return response.data
}

export async function createSubProduct(input: FormData) {
    const response = await http.post<APIResponse<SubProduct>>("/sub-products", input, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    return response.data
}

export async function updateSubProduct(input: {
    subProductId: string
    data: FormData
}) {
    const response = await http.post<APIResponse<SubProduct>>(
        `/sub-products/${input.subProductId}`,
        input.data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            params: { _method: "PUT" },
        }
    )

    return response.data
}

export async function deleteSubProduct(subProductId: string) {
    const response = await http.delete<unknown>(`/sub-products/${subProductId}`)
    return response.data
}