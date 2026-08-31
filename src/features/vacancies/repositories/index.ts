import { useQueryClient } from "@tanstack/react-query"
import {
    createVacancy,
    deleteVacancy,
    getVacancies,
    getVacancyDetails,
    publishVacancy,
    updateVacancy,
} from "@/features/vacancies/requests"
import { APIResponse, TSuccess, TErrorMessage } from "@/types"
import type { Vacancy, VacancyOptions } from "@/features/vacancies/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast"

const QUERY_KEY = "vacancies"

export function useGetVacancies(options?: VacancyOptions) {
    const { isLoading, isFetching, data } = useQuery({
        queryKey: [
            QUERY_KEY,
            options?.page,
            options?.per_page,
            options?.search,
            options?.locale,
        ],
        queryFn: () => getVacancies(options),
    })

    return { isLoading, isFetching, vacancies: data }
}

export function useGetVacancyDetail(vacancyId?: string) {
    const { isLoading, isFetching, data } = useQuery({
        queryKey: ["vacancy-details", vacancyId],
        queryFn: () => getVacancyDetails(vacancyId!),
        enabled: vacancyId != undefined,
    })

    return {
        isLoading,
        isFetching,
        vacancy: data,
    }
}

export function useCreateVacancy(onSuccess?: TSuccess<APIResponse<Vacancy>>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (input: FormData) => createVacancy(input),
        onSuccess: async data => {
            await queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })

            toast.success("created successfully")
            onSuccess?.(data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}

export function useEditVacancy(onSuccess?: TSuccess<APIResponse<Vacancy>>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateVacancy,
        onSuccess: async data => {
            await queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })

            toast.success("Position updated successfully")
            onSuccess?.(data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}

export function usePublishVacancy(onSuccess?: TSuccess<APIResponse<Vacancy>>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: publishVacancy,
        onSuccess: async data => {
            await queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })

            toast.success("Position updated successfully")
            onSuccess?.(data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}

export function useDeleteVacancy(onSuccess?: TSuccess<unknown>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteVacancy,
        onSuccess: async data => {
            await queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })

            toast.success("deleted successfully")
            onSuccess?.(data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}
