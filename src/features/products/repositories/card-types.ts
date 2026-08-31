import { useQueryClient } from "@tanstack/react-query"
import {
    getCardTypes,
    getCardTypeDetail,
    createCardType,
    updateCardType,
    deleteCardType,
} from "@/features/products/requests/card-types"
import { QueryOptions, TErrorMessage, TSuccess } from "@/types"
import type { CardType } from "@/features/products/types"
import { useMutation, useQuery } from "@tanstack/react-query"

import toast from "react-hot-toast"

const RESOURCE_KEY = "getCardTypes"

export function useGetCardTypes(options: QueryOptions) {
    const { isLoading, isFetching, data } = useQuery({
        queryKey: [
            RESOURCE_KEY,
            options.page,
            options.per_page,
            options.locale,
            options.search,
        ],
        queryFn: () => getCardTypes(options),
    })

    return { isLoading, isFetching, cardTypes: data }
}

export function useGetCardTypeDetail(cardTypeId?: string) {
    const { isLoading, isFetching, data } = useQuery({
        queryKey: ["getCardTypeDetails", cardTypeId],
        queryFn: () => getCardTypeDetail(cardTypeId!),
        enabled: cardTypeId != undefined,
    })

    return { isLoading, isFetching, resource: data }
}

export function useCreateCardType(onSuccess?: TSuccess<CardType>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createCardType,
        onSuccess: async response => {
            await queryClient.invalidateQueries({
                queryKey: [RESOURCE_KEY],
            })

            toast.success("created successfully")
            onSuccess?.(response.data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}

export function useEditCardType(onSuccess?: TSuccess<CardType>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateCardType,
        onSuccess: async response => {
            await queryClient.invalidateQueries({
                queryKey: [RESOURCE_KEY],
            })

            toast.success("updated successfully")
            onSuccess?.(response.data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}

export function useDeleteCardType(onSuccess?: TSuccess<unknown>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteCardType,
        onSuccess: async data => {
            await queryClient.invalidateQueries({
                queryKey: [RESOURCE_KEY],
            })

            toast.success("deleted successfully")
            onSuccess?.(data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}
