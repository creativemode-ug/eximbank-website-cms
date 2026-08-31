import { useQueryClient } from "@tanstack/react-query"
import {
    createFaq,
    deleteFaq,
    getFaq,
    updateFaq,
} from "@/features/faq/requests/faqs"
import { APIResponse, TErrorMessage, TSuccess } from "@/types"
import type { Faq, FaqOptions } from "@/features/faq/types"
import { useMutation, useQuery } from "@tanstack/react-query"

import toast from "react-hot-toast"

const FAQ_KEY = "getFaq"

export function useGetFaq(options: FaqOptions) {
    const { isLoading, isFetching, data } = useQuery({
        queryKey: [
            FAQ_KEY,
            options.page,
            options.per_page,
            options.locale,
            options.search,
        ],
        queryFn: () => getFaq(options),
    })

    return { isLoading, isFetching, questions: data }
}

export function useCreateFaq(onSuccess: TSuccess<APIResponse<Faq>>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createFaq,
        onSuccess: async data => {
            await queryClient.invalidateQueries({ queryKey: [FAQ_KEY] })

            toast.success("created successfully")
            onSuccess(data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}

export function useEditFaq(onSuccess: TSuccess<APIResponse<Faq>>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateFaq,
        onSuccess: async data => {
            await queryClient.invalidateQueries({ queryKey: [FAQ_KEY] })

            toast.success("updated successfully")
            onSuccess(data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}

export function useDeleteFaq(onSuccess: TSuccess<unknown>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteFaq,
        onSuccess: async data => {
            await queryClient.invalidateQueries({ queryKey: [FAQ_KEY] })

            toast.success("deleted successfully")
            onSuccess(data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}
