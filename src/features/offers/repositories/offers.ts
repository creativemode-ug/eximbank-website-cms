import { useQueryClient } from "@tanstack/react-query"
import {
    createOffer,
    deleteOffer,
    getOfferDetails,
    getOffers,
    publishOffer,
    updateOffer,
} from "@/features/offers/requests/offers"
import type { APIResponse, TErrorMessage, TSuccess } from "@/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import type {
    Offer,
    OfferDetailOption,
    OfferOption,
} from "@/features/offers/types"

import toast from "react-hot-toast"

export const QUERY_KEY = "get-offers"

export function useGetOffers(options?: OfferOption) {
    const { isLoading, isFetching, data } = useQuery({
        queryKey: [
            QUERY_KEY,
            options?.page,
            options?.per_page,
            options?.search,
            options?.locale,
        ],
        queryFn: () => getOffers(options),
    })

    return { isLoading, isFetching, offers: data }
}

export function useGetOfferDetail(options: OfferDetailOption) {
    const { isLoading, isFetching, data } = useQuery({
        queryKey: ["offer-details", options?.offerId, options.locale],
        queryFn: () => getOfferDetails(options),
        enabled: options.offerId != undefined,
    })

    return {
        isLoading,
        isFetching,
        offer: data,
    }
}

export function useCreateOffer(onSuccess: TSuccess<APIResponse<Offer>>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createOffer,
        onSuccess: async data => {
            await queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })

            toast.success("created successfully")
            onSuccess(data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}

export function useEditOffer(onSuccess: TSuccess<APIResponse<Offer>>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateOffer,
        onSuccess: async data => {
            await queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })

            toast.success("updated successfully")
            onSuccess(data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}

export function useOfferPublish(onSuccess: TSuccess<APIResponse<Offer>>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: publishOffer,
        onSuccess: async data => {
            await queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })

            toast.success("updated successfully")
            onSuccess(data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}

export function useDeleteOffer(onSuccess: TSuccess<unknown>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteOffer,
        onSuccess: async data => {
            await queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })

            toast.success("deleted successfully")
            onSuccess(data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}