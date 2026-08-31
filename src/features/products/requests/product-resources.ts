import { ListResponse, APIResponse } from "@/types"
import { Languages } from "@/i18n.config"
import type {
    ResourceQueryOptions,
    ProductResource,
    TResourceSchema,
} from "@/features/products/types"

import http from "@/http"

export async function getResources(options: ResourceQueryOptions) {
    const response = await http.get<ListResponse<ProductResource>>(
        "/product-resources",
        {
            params: options,
        }
    )

    return response.data
}

export async function getResourceDetail(options: {
    productResourceId: string
    locale: Languages
}) {
    const response = await http.get<APIResponse<ProductResource>>(
        `/product-resources/${options.productResourceId}?locale=${options.locale}`
    )

    return response.data
}

export async function createResource(input: TResourceSchema) {
    const response = await http.post<APIResponse<ProductResource>>(
        "/product-resources",
        input
    )
    return response.data
}

export async function updateResource(input: {
    resourceId: string
    data: TResourceSchema
}) {
    const response = await http.put<APIResponse<ProductResource>>(
        `/product-resources/${input.resourceId}`,
        input.data,
        {
            params: { _method: "PUT" },
        }
    )

    return response.data
}

export async function deleteResource(resourceId: string) {
    const response = await http.delete<unknown>(
        `/product-resources/${resourceId}`
    )
    return response.data
}
