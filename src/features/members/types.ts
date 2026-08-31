import { QueryOptions } from "@/types";
import { validateFileSize, validateImageFile } from "@/utils/validation";
import { mixed, object, string, number } from "yup";

export type MemberOptions = QueryOptions;

export type MemberDetailOption = { memberId?: string, locale?: string }

export const MemberType = ["director", "management"]

export const CreateSchema = object().shape({
    image: mixed().required("image is required").test(
        "validating-type",
        "file is not in the required format",
        (value) => validateImageFile(value as FileList)
    ).test(
        "validate-size", 
        "file size is above the allowed limit.",
        (value) => validateFileSize(value as FileList)
    ),
    full_name: string().required("full_name is required"),
    position: string().required("position is required"),
    quote: string().notRequired().default("").max(200),
    type: string().required("type is required").oneOf(MemberType),
    rank: number().default(0).required("rank is required"),
    is_published: number().default(0).notRequired(),

    facebook: string().notRequired(),
    linkedin: string().notRequired(),
    twitter: string().notRequired(),
})

export const EditSchema = object().shape({
    image: mixed().nullable().test(
        "validating-type",
        "file is not in the required format",
        (value) => validateImageFile(value as FileList)
    ).test(
        "validate-size", 
        "file size is above the allowed limit.", 
        (value) => validateFileSize(value as FileList)
    ),
    full_name: string().required("full_name is required"),
    position: string().required("position is required"),
    quote: string().notRequired().default("").max(200),
    type: string().required("type is required").oneOf(MemberType),
    rank: number().default(0).required("rank is required"),
    is_published: number().default(0).notRequired(),

    facebook: string().notRequired(),
    linkedin: string().notRequired(),
    twitter: string().notRequired(),
})


export type Member = {
    id: string
    full_name: string
    position: string
    image: string
    quote: string | null
    type: string
    facebook: string | null
    linkedin: string | null
    twitter: string | null
    rank: number
    is_published: number
    created_at: string
    updated_at: string
}