import { ListResponse, APIResponse } from "@/types"
import type {
    ProductQueryOptions,
    Product,
    ProductDetail,
} from "@/features/products/types"
import { Languages } from "@/i18n.config"

import http from "@/http"

export async function getProducts(options: ProductQueryOptions) {
    const response = await http.get<ListResponse<Product>>("/products", {
        params: options,
    })

    return response.data
}

export async function getProductDetail(options: {
    productId: string
    locale: Languages
}) {
    const response = await http.get<APIResponse<ProductDetail>>(
        `/products/${options.productId}?locale=${options.locale}`,
        {
            params: options,
        }
    )

    return response.data
}

export async function createProduct(input: FormData) {
    const response = await http.post<APIResponse<Product>>("/products", input, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    return response.data
}

export async function updateProduct(input: {
    productId: string
    data: FormData
}) {
    const response = await http.post<APIResponse<Product>>(
        `/products/${input.productId}`,
        input.data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            params: { _method: "PUT" },
        }
    )

    return response.data
}

export async function deleteProduct(productId: string) {
    const response = await http.delete<unknown>(`/products/${productId}`)
    return response.data
}
