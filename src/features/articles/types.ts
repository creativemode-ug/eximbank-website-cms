import { QueryOptions } from "@/types"
import { validateFileSize, validateImageFile } from "@/utils/validation"
import { mixed, object, string, number, bool, InferType } from "yup"

export type ArticleOptions = QueryOptions

export type ArticleDetailOption = { articleId?: string; locale?: string }

export type Article = {
    id: string
    title: string
    slug: string
    description: string
    type: string
    image: string
    read_time: number
    priority: number | null
    is_published: number
    created_at: string
    updated_at: string
}

export const ArticleTypes = ["insights", "tenders", "news", "financials"]

export const ArticleSchema = object().shape({
    image: mixed()
        .optional()
        .nullable()
        .test("validating-type", "file is not in the required format", value =>
            validateImageFile(value as FileList)
        )
        .test("validate-size", "file size is above the allowed limit.", value =>
            validateFileSize(value as FileList)
        ),
    title: string().required("title is required").max(100),
    description: string().required("content is required"),
    type: string().required("type is required").oneOf(ArticleTypes),
    readTime: number().required("read time is required"),
    priority: bool().default(false).notRequired(),
    isPublished: bool().default(false).notRequired(),
    locale: string().required("locale is required"),
})

export type TypeArticleSchema = InferType<typeof ArticleSchema>
