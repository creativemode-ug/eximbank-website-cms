import { useQueryClient } from "@tanstack/react-query"
import {
    getProductCategories,
    getProductCategoryDetail,
    createProductCategory,
    updateProductCategory,
    deleteProductCategory,
} from "@/features/products/requests/product-categories"
import { TErrorMessage, TSuccess } from "@/types"
import type {
    ProductCategory,
    ProductCategoryOptions,
} from "@/features/products/types"
import { useMutation, useQuery } from "@tanstack/react-query"

import toast from "react-hot-toast"

const PRODUCT_CATEGORY_KEY = "getProductCategories"

export function useGetProductCategories(options: ProductCategoryOptions) {
    const { isLoading, isFetching, data } = useQuery({
        queryKey: [
            PRODUCT_CATEGORY_KEY,
            options.page,
            options.per_page,
            options.locale,
            options.search,
        ],
        queryFn: () => getProductCategories(options),
    })

    return { isLoading, isFetching, categories: data }
}

export function useGetProductCategoryDetail(options: {
    productCategoryId?: string
    locale?: string
}) {
    const { isLoading, isFetching, data } = useQuery({
        queryKey: ["getProductCategoryDetail", options.locale],
        queryFn: () =>
            getProductCategoryDetail({
                productCategoryId: options.productCategoryId!,
                locale: options.locale!,
            }),
        enabled: options.productCategoryId != undefined,
    })

    return { isLoading, isFetching, category: data }
}

export function useCreateProductCategory(onSuccess: TSuccess<ProductCategory>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createProductCategory,
        onSuccess: async response => {
            await queryClient.invalidateQueries({
                queryKey: [PRODUCT_CATEGORY_KEY],
            })

            toast.success("created successfully")
            onSuccess(response.data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}

export function useEditProductCategory(onSuccess: TSuccess<ProductCategory>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateProductCategory,
        onSuccess: async response => {
            await queryClient.invalidateQueries({
                queryKey: [PRODUCT_CATEGORY_KEY],
            })

            toast.success("updated successfully")
            onSuccess(response.data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}

export function useDeleteProductCategory(onSuccess: TSuccess<unknown>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteProductCategory,
        onSuccess: async data => {
            await queryClient.invalidateQueries({
                queryKey: [PRODUCT_CATEGORY_KEY],
            })

            toast.success("deleted successfully")
            onSuccess(data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}
