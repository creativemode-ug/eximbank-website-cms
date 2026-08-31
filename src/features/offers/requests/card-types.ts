import { ListResponse, APIResponse, QueryOptions } from "@/types"
import type {
    TypeCardTypeSchema,
    CardType,
    OfferCategoryDetailOption,
} from "@/features/offers/types"

import http from "@/http"

export async function getCardTypes(options?: QueryOptions) {
    const response = await http.get<ListResponse<CardType>>(`/card-types`, {
        params: options,
    })
    return response.data
}

export async function getCardTypeDetail(options: OfferCategoryDetailOption) {
    const response = await http.get<APIResponse<CardType>>(
        `/card-types/${options.categoryId}`,
        {
            params: {
                locale: options.locale,
            },
        }
    )
    return response.data
}

export async function createCardType(input: TypeCardTypeSchema) {
    const response = await http.post<APIResponse<CardType>>(
        "/card-types",
        input
    )
    return response.data
}

export async function updateCardType(input: {
    cardTypeId: string
    data: TypeCardTypeSchema
}) {
    const response = await http.post<APIResponse<CardType>>(
        `/card-types/${input.cardTypeId}`,
        input.data,
        {
            params: { _method: "PUT" },
        }
    )

    return response.data
}

export async function deleteCardType(cardTypeId: string) {
    const response = await http.delete<unknown>(`/card-types/${cardTypeId}`)
    return response.data
}
