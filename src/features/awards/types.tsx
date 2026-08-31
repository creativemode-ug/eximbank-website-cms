import { QueryOptions } from "@/types";
import { object, string, number, InferType } from "yup";

export type AwardOptions = QueryOptions;

export type Award = {
    id: string
    name: string
    year: number
    description: string
    locale: string
    is_published: number
    created_at: string
    updated_at: string
}

export const AwardSchema = object().shape({
    name: string().required("name is required").max(80),
    year: number().required("year is required"),
    description: string().required("description is required").max(100),
    is_published: number().default(0).notRequired(),
    locale: string().required("locale is required")
})

export type TAwardSchema = InferType<typeof AwardSchema>