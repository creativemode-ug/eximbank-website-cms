import { useQueryClient } from "@tanstack/react-query";
import { createExchangeRate, deleteExchangeRate, getExchangeRates, publishExchangeRate, updateExchangeRate, uploadExchangeRates } from "@/features/foreign-exchange/requests/exchange-rates";
import type { APIResponse, QueryOptions, TErrorMessage, TSuccess } from "@/types";
import type { ExchangeRate } from "@/features/foreign-exchange/types";
import { useMutation, useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";



const EXCHANGE_KEY = "getExchangeRates";

export function useGetExchangeRates(options: QueryOptions) {
    const { isLoading, isFetching, data } = useQuery({
        queryKey: [EXCHANGE_KEY, options.page, options.per_page, options.search],
        queryFn: () => getExchangeRates(options),
    });

    return { isLoading, isFetching, exchange_rates: data }
}

export function useUploadExchangeRates(
    onSuccess: TSuccess<APIResponse<ExchangeRate>>
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: FormData) => uploadExchangeRates(input),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [EXCHANGE_KEY] })

            toast.success("uploaded successfully")
            onSuccess(data);
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "");
        },
    })
}

export function useCreateExchangeRate(
    onSuccess: TSuccess<APIResponse<ExchangeRate>>
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: any) => createExchangeRate(input),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [EXCHANGE_KEY] })

            toast.success("created successfully")
            onSuccess(data);
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "");
        },
    })
}

export function useEditExchangeRate(
    onSuccess: TSuccess<APIResponse<ExchangeRate>>
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: {id: string, data: any}) => updateExchangeRate(input.id, input.data),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [EXCHANGE_KEY] })

            toast.success("updated successfully")
            onSuccess(data);
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "");
        },
    })
}

export function usePublishExchangeRate(
    onSuccess: TSuccess<APIResponse<ExchangeRate>>
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: any) => publishExchangeRate(input),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [EXCHANGE_KEY] })

            toast.success("updated successfully")
            onSuccess(data);
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "");
        },
    })
}

export function useDeleteExchangeRate(
    onSuccess: TSuccess<any>
) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (input: string) => deleteExchangeRate(input),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [EXCHANGE_KEY] })

            toast.success("deleted successfully")
            onSuccess(data);
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "");
        },
    })
}