import { ListResponse, APIResponse } from "@/types"
import type {
    ProductCategoryOptions,
    ProductCategory,
} from "@/features/products/types"
import { Languages } from "@/i18n.config"

import http from "@/http"

export async function getProductCategories(options: ProductCategoryOptions) {
    const response = await http.get<ListResponse<ProductCategory>>(
        "/product-categories",
        {
            params: options,
        }
    )

    return response.data
}

export async function getProductCategoryDetail(options: {
    productCategoryId: string
    locale: Languages
}) {
    const response = await http.get<APIResponse<ProductCategory>>(
        `/product-categories/${options.productCategoryId}?locale=${options.locale}`
    )

    return response.data
}

export async function createProductCategory(input: FormData) {
    const response = await http.post<APIResponse<ProductCategory>>(
        "/product-categories",
        input,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    )
    return response.data
}

export async function updateProductCategory(input: {
    productCategoryId: string
    data: FormData
}) {
    const response = await http.post<APIResponse<ProductCategory>>(
        `/product-categories/${input.productCategoryId}`,
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

export async function deleteProductCategory(productCategoryId: string) {
    const response = await http.delete<unknown>(
        `/product-categories/${productCategoryId}`
    )
    return response.data
}
