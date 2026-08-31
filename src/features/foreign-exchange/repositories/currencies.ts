import { useQueryClient } from "@tanstack/react-query";
import { createCurrency, deleteCurrency, getCurrencies, publishCurrency, updateCurrency } from "@/features/foreign-exchange/requests/currencies";
import type { APIResponse, QueryOptions, TErrorMessage, TSuccess } from "@/types";
import type { Currency } from "@/features/foreign-exchange/types";
import { useMutation, useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";


const CURRENCY_KEY = "getCurrencies";

export function useGetCurrencies(options: QueryOptions) {
    const { isLoading, isFetching, data } = useQuery({
        queryKey: [CURRENCY_KEY, options?.page, options?.per_page, options?.search],
        queryFn: () => getCurrencies(options),
    });

    return { isLoading, isFetching, currencies: data }
}

export function useCreateCurrency(
    onSuccess: TSuccess<APIResponse<Currency>>
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: FormData) => createCurrency(input),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [CURRENCY_KEY] })

            toast.success("created successfully")
            onSuccess(data);
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "");
        },
    })
}

export function useEditCurrency(
    onSuccess: TSuccess<APIResponse<Currency>>
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: {id: string, data: FormData}) => updateCurrency(input.id, input.data),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [CURRENCY_KEY] })

            toast.success("updated successfully")
            onSuccess(data);
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "");
        },
    })
}

export function usePublishCurrency(
    onSuccess: TSuccess<APIResponse<Currency>>
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: any) => publishCurrency(input),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [CURRENCY_KEY] })

            toast.success("updated successfully")
            onSuccess(data);
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "");
        },
    })
}

export function useDeleteCurrency(
    onSuccess: TSuccess<any>
) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (input: any) => deleteCurrency(input),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [CURRENCY_KEY] })

            toast.success("deleted successfully")
            onSuccess(data);
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "");
        },
    })
}