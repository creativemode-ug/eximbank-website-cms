import type { ReactNode } from "react";


export type AsyncDataProps<T> = {
    loading: boolean
    loader: ReactNode
    fallback: ReactNode
    data?: T
    children: (data: T) => ReactNode
}

export default function AsyncData<T>(props: AsyncDataProps<T>) {
    const isArray = props.data instanceof Array;

    if(props.loading) return props.loader

    if(!props.data) return props.fallback

    if(isArray) {
        let _temp = props.data as Array<unknown>
        if(_temp.length == 0) return props.fallback
    }

    return props.children(props.data)
}