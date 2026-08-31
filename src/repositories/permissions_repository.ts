import { getPermissions } from "@/services/permissions_service";
import { IPagination } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const PERMISSION_KEY = "getPermissions";

export function usePermissions(
    pager?: IPagination, 
    filter?: Record<string, unknown>
) {
    const { isLoading, isFetching,  isError, data, refetch } = useQuery({
        queryKey: [PERMISSION_KEY, pager?.page, filter],
        queryFn: () => getPermissions(pager, filter),
    });

    return { isLoading, isFetching, isError, permissions: data, refetch }
}