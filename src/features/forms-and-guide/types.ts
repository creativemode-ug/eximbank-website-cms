import { QueryOptions } from "@/types";
import { DocAcceptEnum, SheetAcceptEnum, validateDocFiles, validateFileSize, validateImageFile } from "@/utils/validation";
import { mixed, object, string, number } from "yup";

export type DocumentOptions = QueryOptions;

export const DocumentType = ["financial", "annual", "other"];

export type Document = {
    id: string
    cover_image: string
    title: string
    slug: string
    type: string
    attachment: string
    is_published: number | null
    is_featured: number | null
    created_at: string
    updated_at: string
}

const SharedSchema = object().shape({
    title: string().required("title is required"),
    type: string().required("type is required").oneOf(DocumentType),
    is_published: number().default(0).notRequired(),
    is_featured: number().default(0).nullable(),
})

export const CreateDocumentSchema = SharedSchema.shape({
    cover: mixed().required("cover is required").test(
        "validating-type",
        "file is not in the required format",
        (value) => validateImageFile(value as FileList)
    ).test(
        "validate-size", 
        "file size is above the allowed limit.", 
        (value) => validateFileSize(value as FileList, 20000)
    ),
    attachment: mixed().required("attachment is required").test(
        "validating-type",
        "file is not in the required format",
        (value) => validateDocFiles(value as FileList, [
            SheetAcceptEnum.xls, 
            SheetAcceptEnum.xlsx, 
            DocAcceptEnum.pdf
        ])
    ).test(
        "validate-size", 
        "file size is above the allowed limit.", 
        (value) => validateFileSize(value as FileList, 20.5)
    ),
})

export const EditDocumentSchema = SharedSchema.shape({
    cover: mixed().nullable().notRequired().test(
        "validating-type",
        "file is not in the required format",
        (value) => validateImageFile(value as FileList)
    ).test(
        "validate-size", 
        "file size is above the allowed limit.", 
        (value) => validateFileSize(value as FileList, 20000)
    ),
    attachment: mixed().nullable().test(
        "is-correct-file-type",
        "validating-type",
        (value) => validateDocFiles(value as FileList, [
            SheetAcceptEnum.xls, 
            SheetAcceptEnum.xlsx, 
            DocAcceptEnum.pdf
        ])
    ).test(
        "validate-size", 
        "file size is above the allowed limit.", 
        (value) => validateFileSize(value as FileList, 20.5)
    ),
})