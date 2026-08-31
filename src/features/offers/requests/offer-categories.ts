import { ListResponse, APIResponse } from "@/types"
import type {
    OfferOption,
    TypeOfferCategorySchema,
    OfferCategory,
    OfferCategoryDetailOption,
} from "@/features/offers/types"

import http from "@/http"

export async function getOfferCategories(options?: OfferOption) {
    const response = await http.get<ListResponse<OfferCategory>>(
        `/offer-categories`,
        {
            params: options,
        }
    )
    return response.data
}

export async function getOfferDetails(options: OfferCategoryDetailOption) {
    const response = await http.get<APIResponse<OfferCategory>>(
        `/offer-categories/${options.categoryId}`,
        {
            params: {
                locale: options.locale,
            },
        }
    )
    return response.data
}

export async function createOfferCategory(input: TypeOfferCategorySchema) {
    const response = await http.post<APIResponse<OfferCategory>>(
        "/offer-categories",
        input
    )
    return response.data
}

export async function updateOfferCategory(data: {
    categoryId: string
    input: TypeOfferCategorySchema
}) {
    const response = await http.post<APIResponse<OfferCategory>>(
        `/offer-categories/${data.categoryId}`,
        data.input,
        {
            params: { _method: "PUT" },
        }
    )

    return response.data
}

export async function deleteOfferCategory(categoryId: string) {
    const response = await http.delete<unknown>(
        `/offer-categories/${categoryId}`
    )
    return response.data
}
