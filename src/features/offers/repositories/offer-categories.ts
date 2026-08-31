import { useQueryClient } from "@tanstack/react-query"
import {
    getOfferCategories,
    createOfferCategory,
    updateOfferCategory,
    deleteOfferCategory,
    getOfferDetails,
} from "@/features/offers/requests/offer-categories"
import type { QueryOptions, TErrorMessage, TSuccess } from "@/types"
import type {
    OfferCategory,
    OfferCategoryDetailOption,
} from "@/features/offers/types"
import { useMutation, useQuery } from "@tanstack/react-query"

import toast from "react-hot-toast"

const OFFER_CATEGORY_KEY = "get-offer-categories"

export function useGetOfferCategories(options: QueryOptions) {
    const { isLoading, isFetching, data } = useQuery({
        queryKey: [
            OFFER_CATEGORY_KEY,
            options.page,
            options.per_page,
            options.locale,
            options.search,
        ],
        queryFn: () => getOfferCategories(options),
    })

    return { isLoading, isFetching, categories: data }
}

export function useGetOfferCategoryDetail(options: OfferCategoryDetailOption) {
    const { isLoading, isFetching, data } = useQuery({
        queryKey: ["offer-category-details", options?.categoryId, options.locale],
        queryFn: () => getOfferDetails(options),
        enabled: options.categoryId != undefined,
    })

    return {
        isLoading,
        isFetching,
        category: data,
    }
}

export function useCreateOfferCategory(onSuccess: TSuccess<OfferCategory>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createOfferCategory,
        onSuccess: async response => {
            await queryClient.invalidateQueries({
                queryKey: [OFFER_CATEGORY_KEY],
            })

            toast.success("created successfully")
            onSuccess(response.data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}

export function useEditOfferCategory(onSuccess: TSuccess<OfferCategory>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateOfferCategory,
        onSuccess: async response => {
            await queryClient.invalidateQueries({
                queryKey: [OFFER_CATEGORY_KEY],
            })

            toast.success("updated successfully")
            onSuccess(response.data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}

export function useDeleteOfferCategory(onSuccess: TSuccess<unknown>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteOfferCategory,
        onSuccess: async data => {
            await queryClient.invalidateQueries({
                queryKey: [OFFER_CATEGORY_KEY],
            })

            toast.success("deleted successfully")
            onSuccess(data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}
