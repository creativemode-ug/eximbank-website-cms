import { useQueryClient } from "@tanstack/react-query"
import {
    getCardTypes,
    getCardTypeDetail,
    createCardType,
    updateCardType,
    deleteCardType,
} from "@/features/offers/requests/card-types"
import type { QueryOptions, TErrorMessage, TSuccess } from "@/types"
import type {
    CardType,
    OfferCategoryDetailOption,
} from "@/features/offers/types"
import { useMutation, useQuery } from "@tanstack/react-query"

import toast from "react-hot-toast"

const CARD_TYPE_QUERY_KEY = "get-card-types"

export function useGetCardTypes(options: QueryOptions) {
    const { isLoading, isFetching, data } = useQuery({
        queryKey: [
            CARD_TYPE_QUERY_KEY,
            options.page,
            options.per_page,
            options.locale,
            options.search,
        ],
        queryFn: () => getCardTypes(options),
    })

    return { isLoading, isFetching, cardTypes: data }
}

export function useGetCardTypeDetail(options: OfferCategoryDetailOption) {
    const { isLoading, isFetching, data } = useQuery({
        queryKey: ["card-type-details", options?.categoryId, options.locale],
        queryFn: () => getCardTypeDetail(options),
        enabled: options.categoryId != undefined,
    })

    return {
        isLoading,
        isFetching,
        cardType: data,
    }
}

export function useCreateCardType(onSuccess: TSuccess<CardType>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createCardType,
        onSuccess: async response => {
            await queryClient.invalidateQueries({
                queryKey: [CARD_TYPE_QUERY_KEY],
            })

            toast.success("created successfully")
            onSuccess(response.data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}

export function useEditCardType(onSuccess: TSuccess<CardType>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateCardType,
        onSuccess: async response => {
            await queryClient.invalidateQueries({
                queryKey: [CARD_TYPE_QUERY_KEY],
            })

            toast.success("updated successfully")
            onSuccess(response.data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}

export function useDeleteCardType(onSuccess: TSuccess<unknown>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteCardType,
        onSuccess: async data => {
            await queryClient.invalidateQueries({
                queryKey: [CARD_TYPE_QUERY_KEY],
            })

            toast.success("deleted successfully")
            onSuccess(data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}
