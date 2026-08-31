import { ListResponse, APIResponse } from "@/types"
import {
    OfferDetailOption,
    type Offer,
    type OfferOption,
} from "@/features/offers/types"
import { IPublishForm } from "@/types/forms"

import http from "@/http"

export async function getOffers(options?: OfferOption) {
    const response = await http.get<ListResponse<Offer>>("/offers", {
        params: options,
    })
    return response.data
}

export async function getOfferDetails(options: OfferDetailOption) {
    const response = await http.get<APIResponse<Offer>>(
        `/offers/${options.offerId}`,
        {
            params: {
                locale: options.locale,
            },
        }
    )
    return response.data
}

export async function createOffer(input: FormData) {
    const response = await http.post<APIResponse<Offer>>("/offers", input, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    return response.data
}

export async function updateOffer(data: { offerId: string; input: FormData }) {
    const response = await http.post<APIResponse<Offer>>(
        `/offers/${data.offerId}`,
        data.input,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            params: { _method: "PUT" },
        }
    )

    return response.data
}

export async function publishOffer(input: IPublishForm) {
    const response = await http.put<APIResponse<Offer>>(
        `/offers/${input.id}`,
        input
    )

    return response.data
}

export async function deleteOffer(offerId: string) {
    const response = await http.delete<unknown>(`/offers/${offerId}`)
    return response.data
}
