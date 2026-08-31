import { useQueryClient } from "@tanstack/react-query"
import {
    getResources,
    getResourceDetail,
    createResource,
    updateResource,
    deleteResource,
} from "@/features/products/requests/product-resources"
import { TErrorMessage, TSuccess } from "@/types"
import type {
    ProductResource,
    ResourceQueryOptions,
} from "@/features/products/types"
import { useMutation, useQuery } from "@tanstack/react-query"

import toast from "react-hot-toast"


const RESOURCE_KEY = "getProductResources"

export function useGetProductResources(options: ResourceQueryOptions) {
    const { isLoading, isFetching, data } = useQuery({
        queryKey: [
            RESOURCE_KEY,
            options.page,
            options.per_page,
            options.locale,
            options.search,
        ],
        queryFn: () => getResources(options),
    })

    return { isLoading, isFetching, resources: data }
}

export function useGetProductResourceDetail(options: {
    productResourceId?: string,
    locale?: string,
}) {
    const { isLoading, isFetching, data } = useQuery({
        queryKey: ["getProductResourceDetails", options.locale],
        queryFn: () => getResourceDetail({
            productResourceId: options.productResourceId!,
            locale: options.locale!
        }),
        enabled: options.productResourceId != undefined,
    })

    return { isLoading, isFetching, resource: data }
}

export function useCreateResource(onSuccess?: TSuccess<ProductResource>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createResource,
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

export function useEditResource(onSuccess?: TSuccess<ProductResource>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateResource,
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

export function useDeleteResource(onSuccess?: TSuccess<unknown>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteResource,
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
