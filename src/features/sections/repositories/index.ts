import { useQueryClient } from "@tanstack/react-query";
import { createSection, deleteSection, getSectionDetails, getSections, publishSection, updateSection } from "@/features/sections/requests";
import type { APIResponse, TErrorMessage, TSuccess } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Section, SectionDetailOption, SectionOption } from "@/features/sections/types";

import toast from "react-hot-toast";



export const QUERY_KEY = "get-sections";

export function useGetSections(options?: SectionOption) {
    const { isLoading, isFetching, data } = useQuery({
        queryKey: [QUERY_KEY, options?.page, options?.per_page, options?.search, options?.locale],
        queryFn: () => getSections(options),
    });

    return { isLoading, isFetching, sections: data }
}

export function useGetSectionDetail(options: SectionDetailOption) {
    const { isLoading, isFetching, data } = useQuery({
        queryKey: ["section-details", options?.sectionId, options.locale],
        queryFn: () => getSectionDetails(options),
        enabled: options.sectionId != undefined
    });

    return {
        isLoading,
        isFetching,
        section: data
    };
}

export function useCreateSection(
    onSuccess: TSuccess<APIResponse<Section>>
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: FormData) => createSection(input),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })

            toast.success("created successfully")
            onSuccess(data);
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "");
        },
    })
}

export function useEditSection(
    onSuccess: TSuccess<APIResponse<Section>>
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: {id: string, data: FormData}) => updateSection(input.id, input.data),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })

            toast.success("updated successfully")
            onSuccess(data);
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "");
        },
    })
}

export function useSectionPublish(
    onSuccess: TSuccess<APIResponse<Section>>
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: any) => publishSection(input),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
            
            toast.success("updated successfully")
            onSuccess(data);
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "");
        },
    })
}

export function useDeleteSection(
    onSuccess: TSuccess<any>
) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (input: any) => deleteSection(input),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
            
            toast.success("deleted successfully")
            onSuccess(data);
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "");
        },
    })
}