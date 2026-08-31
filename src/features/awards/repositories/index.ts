import { useQueryClient } from "@tanstack/react-query";
import { createAward, deleteAward, getAwards, updateAwards } from "@/features/awards/requests";
import { APIResponse, TErrorMessage, TSuccess } from "@/types";
import { Award, AwardOptions } from "@/features/awards/types";
import { useMutation, useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";


const AWARD_KEY = "getAwards";

export function useGetAwards(options: AwardOptions) {
    const { isLoading, isFetching, data } = useQuery({
        queryKey: [AWARD_KEY, options.page, options.per_page, options.locale, options.search],
        queryFn: () => getAwards(options),
    });

    return { isLoading, isFetching, awards: data }
}

export function useCreateAward(
    onSuccess: TSuccess<APIResponse<Award>>
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createAward,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [AWARD_KEY] })

            toast.success("created successfully")
            onSuccess(data);
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "");
        },
    })
}

export function useEditAward(
    onSuccess: TSuccess<APIResponse<Award>>
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateAwards,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [AWARD_KEY] })

            toast.success("updated successfully")
            onSuccess(data);
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "");
        },
    })
}

export function useDeleteAward(
    onSuccess: TSuccess<any>
) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: deleteAward,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [AWARD_KEY] })
            
            toast.success("deleted successfully")
            onSuccess(data);
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "");
        },
    })
}