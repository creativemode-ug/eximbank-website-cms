import { useQueryClient } from "@tanstack/react-query"
import {
    getCompliances,
    importCompliance,
    exportCompliance,
} from "@/features/compliances/requests/compliances"
import { APIResponse, TErrorMessage, TSuccess } from "@/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { ComplianceOptions } from "@/features/compliances/types"

import toast from "react-hot-toast"

const COMPLIANCES_KEY = "compliances"

export function useGetCompliances(options: ComplianceOptions) {
    const { isLoading, isFetching, data } = useQuery({
        queryKey: [
            COMPLIANCES_KEY,
            options.page,
            options.per_page,
            options.search,
        ],
        queryFn: () => getCompliances(options),
    })

    return { isLoading, isFetching, compliances: data }
}

export function useImportCompliance(onSuccess: TSuccess<APIResponse<unknown>>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (input: FormData) => importCompliance(input),
        onSuccess: async data => {
            await queryClient.invalidateQueries({ queryKey: [COMPLIANCES_KEY] })

            toast.success("uploaded successfully")
            onSuccess(data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}

export async function getComplianceExcel() {
    const response = await exportCompliance()

    const href = URL.createObjectURL(response)

    const link = document.createElement("a")
    link.href = href
    link.setAttribute(
        "download",
        `compliance-sample-${new Date().toLocaleDateString()}.xls`
    )
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    URL.revokeObjectURL(href)
}
