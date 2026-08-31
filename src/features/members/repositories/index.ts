import { useQueryClient } from "@tanstack/react-query";
import { createMember, deleteMember, getMemberDetails, getMembers, publishMember, updateMember } from "@/features/members/requests";
import { APIResponse, TErrorMessage, TSuccess } from "@/types";
import type { Member, MemberDetailOption, MemberOptions } from "@/features/members/types";
import { useMutation, useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";


const MEMBER_KEY = "getMembers";


export function useGetMembers(options: MemberOptions) {
    const { isLoading, isFetching, data } = useQuery({
        queryKey: [MEMBER_KEY, options.page, options.per_page, options.locale, options.search],
        queryFn: () => getMembers(options),
    });

    return { isLoading, isFetching, members: data }
}

export function useGetMemberDetail(options: MemberDetailOption) {
    const { isLoading, isFetching, data } = useQuery({
        queryKey: ["member-details", options?.memberId, options.locale],
        queryFn: () => getMemberDetails(options),
        enabled: options.memberId != undefined
    });

    return {
        isLoading,
        isFetching,
        member: data
    };
}

export function useCreateMember(
    onSuccess: TSuccess<APIResponse<Member>>
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createMember,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [MEMBER_KEY] })

            toast.success("created successfully")
            onSuccess(data);
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "");
        },
    })
}

export function useEditMember(
    onSuccess: TSuccess<APIResponse<Member>>
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateMember,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [MEMBER_KEY] })

            toast.success("updated successfully")
            onSuccess(data);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    })
}

export function usePublishMember(
    onSuccess: TSuccess<APIResponse<Member>>
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: publishMember,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [MEMBER_KEY] })

            toast.success("updated successfully")
            onSuccess(data);
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "");
        },
    })
}

export function useDeleteMember(
    onSuccess: TSuccess<any>
) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: deleteMember,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [MEMBER_KEY] })

            toast.success("deleted successfully")
            onSuccess(data);
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "");
        },
    })
}