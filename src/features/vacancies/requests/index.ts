import { ListResponse, APIResponse, PublishInput } from "@/types"
import type { Vacancy, VacancyOptions } from "@/features/vacancies/types"

import http from "@/http"

export async function getVacancies(options?: VacancyOptions) {
    const response = await http.get<ListResponse<Vacancy>>("/positions", {
        params: options,
    })

    return response.data
}

export async function getVacancyDetails(vacancyId: string) {
    const response = await http.get<APIResponse<Vacancy>>(
        `/positions/${vacancyId}`
    )
    return response.data
}

export async function createVacancy(input: FormData) {
    const response = await http.post<APIResponse<Vacancy>>(
        "/positions",
        input,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    )
    return response.data
}

export async function updateVacancy(input: {
    vacancyId: string
    data: FormData
}) {
    const response = await http.post<APIResponse<Vacancy>>(
        `/positions/${input.vacancyId}`,
        input.data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    )

    return response.data
}

export async function publishVacancy(input: PublishInput) {
    const response = await http.put<APIResponse<Vacancy>>(
        `/positions/${input.id}`,
        input
    )

    return response.data
}

export async function deleteVacancy(vacancyId: string) {
    const response = await http.delete<unknown>(`/positions/${vacancyId}`)
    return response.data
}
