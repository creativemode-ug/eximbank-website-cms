import http from "@/http"
import type { ListResponse, APIResponse } from "@/types"
import type {
    BulkDeleteInput,
    Location,
    LocationOptions,
    LocationResponse,
    TypeLocationSchema,
} from "@/features/locations/types"

export async function getLocations(options: LocationOptions) {
    const response = await http.get<ListResponse<Location>>("/metrics", {
        params: options,
    })

    return response.data
}

export async function uploadLocations(input: FormData) {
    const response = await http.post<LocationResponse>(
        "/metrics/upload",
        input,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    )
    return response.data
}

export async function createLocation(input: TypeLocationSchema) {
    const { is_published, ...payload } = input
    const response = await http.post<APIResponse<Location>>("/metrics", {
        ...payload,
        is_published: is_published ? 1 : 0,
    })
    return response.data
}

export async function updateLocation(input: {
    locationId: string
    data: TypeLocationSchema
}) {
    const { is_published, ...payload } = input.data
    const response = await http.put<APIResponse<Location>>(
        `/metrics/${input.locationId}`,
        { ...payload, is_published: is_published ? 1 : 0 }
    )

    return response.data
}

export async function deleteLocation(locationId: string) {
    const response = await http.delete<unknown>(`/metrics/${locationId}`)
    return response.data
}

export async function bulkDeleteLocation(input: BulkDeleteInput) {
    const response = await http.post<unknown>(`/metrics/bulk-delete`, input)
    return response.data
}
