import { useQueryClient } from "@tanstack/react-query";
import { createRole, deleteRole, getRoles, updateRole } from "@/services/role_service";
import { IPagination, IRole, IWriteResponse, TErrorMessage, TSuccess } from "@/types";
import { IRoleForm } from "@/types/forms";
import { useMutation, useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";

export const ROLE_KEY = "getRoles";

export function useRoles(
    pager?: IPagination, 
    filter?: Record<string, unknown>
) {
    const { isLoading, isFetching,  isError, data, refetch } = useQuery({
        queryKey: [ROLE_KEY, pager, filter],
        queryFn: () => getRoles(pager, filter),
    });

    return { isLoading, isFetching, isError, roles: data, refetch }
}

export function useRoleCreate(
    onSuccess: TSuccess<IWriteResponse<IRole>>
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: IRoleForm) => createRole(input),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [ROLE_KEY] })

            toast.success("created successfully")
            onSuccess(data);
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "");
        },
    })
}

export function useRoleEdit(
    onSuccess: TSuccess<IWriteResponse<IRole>>
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: {roleId: string, data: IRoleForm}) => updateRole(input.roleId, input.data),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [ROLE_KEY] })

            toast.success("updated successfully")
            onSuccess(data);
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "");
        }
    })
}

export function useRoleDelete(
    onSuccess: TSuccess<any>
) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (roleId: string) => deleteRole(roleId),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [ROLE_KEY] })

            toast.success("deleted successfully")
            onSuccess(data);
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "");
        },
    })
}