import http from "@/http"
import { ListResponse, APIResponse } from "@/types"
import {
    ArticleDetailOption,
    type Article,
    type ArticleOptions,
} from "@/features/articles/types"
import { IPublishForm } from "@/types/forms"

export async function getArticles(options?: ArticleOptions) {
    const response = await http.get<ListResponse<Article>>("/articles", {
        params: options,
    })

    return response.data
}

export async function getArticleDetails(options: ArticleDetailOption) {
    const response = await http.get<APIResponse<Article>>(
        `/articles/${options.articleId}`,
        {
            params: {
                locale: options.locale,
            },
        }
    )
    return response.data
}

export async function createArticle(input: FormData) {
    const response = await http.post<APIResponse<Article>>("/articles", input, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    return response.data
}

export async function updateArticle(input: {
    articleId: string
    data: FormData
}) {
    const response = await http.post<APIResponse<Article>>(
        `/articles/${input.articleId}`,
        input.data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    )

    return response.data
}

export async function publishArticle(input: IPublishForm) {
    const response = await http.put<APIResponse<Article>>(
        `/articles/${input.id}`,
        input
    )

    return response.data
}

export async function deleteArticle(articleId: string) {
    const response = await http.delete<unknown>(`/articles/${articleId}`)
    return response.data
}
