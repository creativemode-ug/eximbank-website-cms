import http from "@/http";
import { APIResponse, ListResponse, QueryOptions } from "@/types";
import { IPublishForm } from "@/types/forms";
import { Currency } from "@/features/foreign-exchange/types";



export async function getCurrencies(options: QueryOptions) {
    const response = await http.get<ListResponse<Currency>>("/currencies", {
        params: options
    })

    return response.data
}

export async function createCurrency(input: FormData) {
    const response = await http.post<APIResponse<Currency>>(
        "/currencies", input, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return response.data
}

export async function updateCurrency(currencyId: string, input: FormData) {
    const response = await http.post<APIResponse<Currency>>(
        `/currencies/${currencyId}`, input, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return response.data
}

export async function publishCurrency(input: IPublishForm) {
    const response = await http.put<APIResponse<Currency>>(`/currencies/${input.id}`, input)

    return response.data
}

export async function deleteCurrency(currencyId: string) {
    const response = await http.delete<any>(`/currencies/${currencyId}`)
    return response.data
}