import { useQueryClient } from "@tanstack/react-query"
import {
    bulkDeleteLocation,
    createLocation,
    deleteLocation,
    getLocations,
    updateLocation,
    uploadLocations,
} from "@/features/locations/requests/locations"
import { APIResponse, TErrorMessage, TSuccess } from "@/types"
import type { Location, LocationOptions, LocationResponse } from "@/features/locations/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast"

const LOCATION_KEY = "locations"

export function useGetLocations(options: LocationOptions) {
    const { isLoading, isFetching, data } = useQuery({
        queryKey: [
            LOCATION_KEY,
            options.page,
            options.per_page,
            options.keyword,
        ],
        queryFn: () => getLocations(options),
    })

    return { isLoading, isFetching, locations: data }
}

export function useLocationUpload(onSuccess: TSuccess<LocationResponse>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (input: FormData) => uploadLocations(input),
        onSuccess: async data => {
            await queryClient.invalidateQueries({ queryKey: [LOCATION_KEY] })

            toast.success("uploaded successfully")
            onSuccess(data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}

export function useCreateLocation(onSuccess: TSuccess<APIResponse<Location>>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createLocation,
        onSuccess: async data => {
            await queryClient.invalidateQueries({ queryKey: [LOCATION_KEY] })

            toast.success("created successfully")
            onSuccess(data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}

export function useEditLocation(onSuccess: TSuccess<APIResponse<Location>>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateLocation,
        onSuccess: async data => {
            await queryClient.invalidateQueries({ queryKey: [LOCATION_KEY] })

            toast.success("updated successfully")
            onSuccess(data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}

export function useDeleteLocation(onSuccess?: TSuccess<unknown>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteLocation,
        onSuccess: async data => {
            await queryClient.invalidateQueries({ queryKey: [LOCATION_KEY] })

            toast.success("deleted successfully")
            onSuccess?.(data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}

export function useBulkDeleteLocation(onSuccess?: TSuccess<unknown>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: bulkDeleteLocation,
        onSuccess: async data => {
            await queryClient.invalidateQueries({ queryKey: [LOCATION_KEY] })

            toast.success("deleted successfully")
            onSuccess?.(data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}
