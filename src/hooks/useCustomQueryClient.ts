import { useState } from "react";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import useErrorHandler from "@/hooks/useErrorHandler";

export default function useCustomQueryClient() {
    const { handleError } = useErrorHandler();

    const [queryClient] = useState(
        () => new QueryClient({
            defaultOptions: {
                queries: {
                    refetchInterval: 30000
                }
            },
            queryCache: new QueryCache({
                onError: (error) => {
                    handleError(error as AxiosError)
                }
            })
        })
    );

    return queryClient
}