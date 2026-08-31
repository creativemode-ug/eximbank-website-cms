import { QueryOptions } from "@/types"
import { object, string, boolean, InferType } from "yup"

export type FaqOptions = QueryOptions

export type FaqDetailOption = { faqId?: string; locale?: string }

export type Faq = {
    id: string
    question: string
    answer: string
    locale: string
    is_published: number
    created_at: string
    updated_at: string
}

export const FaqSchema = object().shape({
    question: string().required("question is required"),
    answer: string().required("answer is required"),
    is_published: boolean().default(false).optional(),
    locale: string().required("locale is required"),
})

export type TypeFaqSchema = InferType<typeof FaqSchema>
