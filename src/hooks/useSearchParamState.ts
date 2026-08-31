import { useSearchParams, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

type ParamValue = string | number | boolean | null | undefined;

export function useSearchParamState<T extends Record<string, ParamValue> = Record<string, ParamValue>>(initialState?: T) {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const [paramState, setParamState] = useState<T>(initialState || {} as T);

    // Sync search params from URL into state
    useEffect(() => {
        const newParams: any = {};
        searchParams.forEach((value, key) => {
            newParams[key] = value;
        });
        setParamState(newParams);
    }, [searchParams]);

    // Function to update search parameters
    const setQueryParam = useCallback((key: keyof T, value: ParamValue) => {
        const currentParams = new URLSearchParams(Array.from(searchParams.entries()));

        if (value === null || value === undefined) {
            currentParams.delete(String(key));
        } else {
            currentParams.set(String(key), String(value));
        }

        navigate(`?${currentParams.toString()}`, { replace: false });
    }, [searchParams, navigate]);

    const hasValues = Object.keys(paramState).length > 0 ;

    return { paramState, setQueryParam, hasValues };
}
