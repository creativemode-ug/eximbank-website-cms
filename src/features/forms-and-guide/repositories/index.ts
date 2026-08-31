import { useQueryClient } from "@tanstack/react-query";
import { createDocument, deleteDocument, getDocuments, publishDocument, editDocument } from "@/features/forms-and-guide/requests";
import type { TErrorMessage, TSuccess, APIResponse } from "@/types";
import type { Document, DocumentOptions } from "@/features/forms-and-guide/types";
import { useMutation, useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";

const QUERY_KEY = "documents";


export function useGetDocuments(options?: DocumentOptions) {
    const { isLoading, isFetching, data } = useQuery({
        queryKey: [QUERY_KEY, options?.page, options?.per_page, options?.search, options?.locale],
        queryFn: () => getDocuments(options),
    });

    return { isLoading, isFetching, documents: data }
}

export function useCreateDocument(
    onSuccess?: TSuccess<APIResponse<Document>>
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: FormData) => createDocument(input),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })

            toast.success("created successfully")
            onSuccess?.(data);
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "");
        },
    })
}

export function useEditDocument(
    onSuccess?: TSuccess<APIResponse<Document>>
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editDocument,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })

            toast.success("updated successfully")
            onSuccess?.(data);
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "");
        },
    })
}

export function usePublishDocument(
    onSuccess?: TSuccess<APIResponse<Document>>
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: publishDocument,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })

            toast.success("updated successfully")
            onSuccess?.(data);
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "");
        },
    })
}

export function useDeleteDocument(
    onSuccess?: TSuccess<any>
) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: deleteDocument,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
            
            toast.success("deleted successfully")
            onSuccess?.(data);
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "");
        },
    })
}