import { useQueryClient } from "@tanstack/react-query"
import {
    getSubProducts,
    createSubProduct,
    updateSubProduct,
    deleteSubProduct, getSubProductDetail,
} from "@/features/products/requests/sub-products"
import { TErrorMessage, TSuccess } from "@/types"
import type {ProductQueryOptions, SubProduct} from "@/features/products/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast"


const SUB_PRODUCT_KEY = "getSubProducts"

export function useGetSubProducts(options: ProductQueryOptions) {
    const { isLoading, isFetching, data } = useQuery({
        queryKey: [
            SUB_PRODUCT_KEY,
            options.page,
            options.per_page,
            options.locale,
            options.search,
        ],
        queryFn: () => getSubProducts(options),
    })

    return { isLoading, isFetching, subProducts: data }
}

export function useGetSubProductDetail(options: {
    subProductId?: string
    locale?: string
}) {
    const { isLoading, isFetching, data } = useQuery({
        queryKey: ["getSubProductDetail", options.locale],
        queryFn: () =>
            getSubProductDetail({
                subProductId: options.subProductId!,
                locale: options.locale!,
            }),
        enabled: options.subProductId != undefined,
    })

    return { isLoading, isFetching, subProduct: data }
}


export function useCreateSubProduct(onSuccess: TSuccess<SubProduct>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createSubProduct,
        onSuccess: async response => {
            await queryClient.invalidateQueries({
                queryKey: [SUB_PRODUCT_KEY],
            })

            toast.success("created successfully")
            onSuccess(response.data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}

export function useEditSubProduct(onSuccess: TSuccess<SubProduct>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateSubProduct,
        onSuccess: async response => {
            await queryClient.invalidateQueries({
                queryKey: [SUB_PRODUCT_KEY],
            })

            toast.success("updated successfully")
            onSuccess(response.data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}

export function useDeleteSubProduct(onSuccess: TSuccess<unknown>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteSubProduct,
        onSuccess: async data => {
            await queryClient.invalidateQueries({
                queryKey: [SUB_PRODUCT_KEY],
            })

            toast.success("deleted successfully")
            onSuccess(data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}
