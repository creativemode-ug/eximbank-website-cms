import { useQueryClient } from "@tanstack/react-query"
import {
    getProducts,
    getProductDetail,
    createProduct,
    updateProduct,
    deleteProduct,
} from "@/features/products/requests/products"
import { TErrorMessage, TSuccess } from "@/types"
import type { Product, ProductQueryOptions } from "@/features/products/types"
import { useMutation, useQuery } from "@tanstack/react-query"

import toast from "react-hot-toast"

const PRODUCT_KEY = "getProducts"

export function useGetProducts(options: ProductQueryOptions) {
    const { isLoading, isFetching, data } = useQuery({
        queryKey: [
            PRODUCT_KEY,
            options.page,
            options.per_page,
            options.locale,
            options.search,
        ],
        queryFn: () => getProducts(options),
    })

    return { isLoading, isFetching, products: data }
}

export function useGetProductDetail(options: {
    productId?: string
    locale?: string
}) {
    const { isLoading, isFetching, data } = useQuery({
        queryKey: ["getProductDetail", options.locale],
        queryFn: () =>
            getProductDetail({
                productId: options.productId!,
                locale: options.locale!,
            }),
        enabled: options.productId != undefined,
    })

    return { isLoading, isFetching, product: data }
}

export function useCreateProduct(onSuccess: TSuccess<Product>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createProduct,
        onSuccess: async response => {
            await queryClient.invalidateQueries({
                queryKey: [PRODUCT_KEY],
            })

            toast.success("created successfully")
            onSuccess(response.data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}

export function useEditProduct(onSuccess: TSuccess<Product>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateProduct,
        onSuccess: async response => {
            await queryClient.invalidateQueries({
                queryKey: [PRODUCT_KEY],
            })

            toast.success("updated successfully")
            onSuccess(response.data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}

export function useDeleteProduct(onSuccess: TSuccess<unknown>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteProduct,
        onSuccess: async data => {
            await queryClient.invalidateQueries({
                queryKey: [PRODUCT_KEY],
            })

            toast.success("deleted successfully")
            onSuccess(data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}
