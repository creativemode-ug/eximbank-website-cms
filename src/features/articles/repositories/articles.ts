import { useQueryClient } from "@tanstack/react-query"
import {
    createArticle,
    deleteArticle,
    getArticleDetails,
    getArticles,
    publishArticle,
    updateArticle,
} from "@/features/articles/requests/articles"
import { APIResponse, TSuccess, TErrorMessage } from "@/types"
import {
    ArticleDetailOption,
    type Article,
    type ArticleOptions,
} from "@/features/articles/types"
import { useMutation, useQuery } from "@tanstack/react-query"

import toast from "react-hot-toast"

const ARTICLE_KEY = "articles"

export function useGetArticles(options?: ArticleOptions) {
    const { isLoading, data } = useQuery({
        queryKey: [
            ARTICLE_KEY,
            options?.page,
            options?.per_page,
            options?.search,
            options?.locale,
        ],
        queryFn: () => getArticles(options),
    })

    return { isLoading, articles: data }
}

export function useGetArticleDetail(options: ArticleDetailOption) {
    const { isLoading, isFetching, data } = useQuery({
        queryKey: ["article-details", options?.articleId, options.locale],
        queryFn: () => getArticleDetails(options),
        enabled: options.articleId != undefined,
    })

    return {
        isLoading,
        isFetching,
        article: data,
    }
}

export function useCreateArticle(onSuccess: TSuccess<APIResponse<Article>>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createArticle,
        onSuccess: async data => {
            await queryClient.invalidateQueries({ queryKey: [ARTICLE_KEY] })

            toast.success("article created successfully")
            onSuccess(data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}

export function useEditArticle(onSuccess: TSuccess<APIResponse<Article>>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateArticle,
        onSuccess: async data => {
            await queryClient.invalidateQueries({ queryKey: [ARTICLE_KEY] })

            toast.success("article updated successfully")
            onSuccess(data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}

export function usePublishArticle(onSuccess: TSuccess<APIResponse<Article>>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: publishArticle,
        onSuccess: async data => {
            await queryClient.invalidateQueries({ queryKey: [ARTICLE_KEY] })

            toast.success("updated successfully")
            onSuccess(data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}

export function useDeleteArticle(onSuccess: TSuccess<unknown>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteArticle,
        onSuccess: async data => {
            await queryClient.invalidateQueries({ queryKey: [ARTICLE_KEY] })

            toast.success("article deleted successfully")
            onSuccess(data)
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "")
        },
    })
}
