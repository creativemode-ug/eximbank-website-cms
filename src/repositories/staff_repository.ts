import { createStaff, deleteStaff, getStaffs, retrieveStaff, updateStaff } from "@/services/staffs_service";
import { IPagination, IStaff, IWriteResponse, TErrorMessage, TSuccess } from "@/types";
import { IStaffForm } from "@/types/forms";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

export const STAFF_KEY = "getStaff";

export function useStaff(
    pager?: IPagination, 
    filter?: Record<string, unknown>
) {
    const { isLoading, isFetching, isError, data } = useQuery({
        queryKey: [STAFF_KEY, pager, filter],
        queryFn: () => getStaffs(pager, filter),
    });

    return { isLoading, isFetching, isError, staffs: data }
}

export function useStaffDetail(staffId: string) {
    const { isLoading, isFetching, isError, data } = useQuery({
        queryKey: ["retrieveStaff", staffId],
        queryFn: () => retrieveStaff(staffId),
    });

    return { isLoading, isFetching, isError, staff: data }
}

export function useStaffCreate(
    onSuccess: TSuccess<IWriteResponse<IStaff>>
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: IStaffForm) => createStaff(input),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [STAFF_KEY] })

            toast.success("created successfully")
            onSuccess(data);
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "");
        },
    })
}

export function useStaffEdit(
    onSuccess: TSuccess<IWriteResponse<IStaff>>
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: {staffId: string, data: IStaffForm}) => updateStaff(input.staffId, input.data),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [STAFF_KEY] })

            toast.success("updated successfully")
            onSuccess(data);
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "");
        },
    })
}

export function useStaffDelete(
    onSuccess: TSuccess<any>
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (staffId: string) => deleteStaff(staffId),
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [STAFF_KEY] })
            
            toast.success("deleted successfully")
            onSuccess(data);
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "");
        },
    })
}