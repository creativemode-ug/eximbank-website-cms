import http from "@/http";
import { APIResponse, QueryOptions, ListResponse } from "@/types";
import type { ExchangeRate } from "@/features/foreign-exchange/types";
import { IPublishForm } from "@/types/forms";



export async function getExchangeRates(options: QueryOptions) {
    const response = await http.get<ListResponse<ExchangeRate>>("/exchange-rates", {
        params: options
    })

    return response.data
}

export async function getExchangeRatesExcel() {
    const response = await http.get<any>("/exchange-rates/export", {
        responseType: "blob"
    })

    const href = URL.createObjectURL(response.data);

    const link = document.createElement("a");
    link.href = href;
    link.setAttribute("download", `exchange-rates-upload-${new Date().toLocaleDateString()}.xls`);
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);

}

export async function uploadExchangeRates(input: FormData) {
    const response = await http.post<APIResponse<ExchangeRate>>(
        "/exchange-rates/upload", input, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    )
    return response.data
}

export async function createExchangeRate(input: any) {
    const response = await http.post<APIResponse<ExchangeRate>>(
        "/exchange-rates", input
    )
    return response.data
}

export async function updateExchangeRate(exchangeId: string, input: any) {
    const response = await http.post<APIResponse<ExchangeRate>>(
        `/exchange-rates/${exchangeId}`, input)

    return response.data
}

export async function publishExchangeRate(input: IPublishForm) {
    const response = await http.put<APIResponse<ExchangeRate>>(`/exchange-rates/${input.id}`, input)

    return response.data
}

export async function deleteExchangeRate(exchangeId: string) {
    const response = await http.delete<any>(`/exchange-rates/${exchangeId}`)
    return response.data
}