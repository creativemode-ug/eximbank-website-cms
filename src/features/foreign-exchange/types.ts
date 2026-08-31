import { SheetAcceptEnum, validateDocFiles, validateFileSize, validateImageFile } from "@/utils/validation";
import { mixed, object, string, number, InferType } from "yup";

export const ArticleType = ["insights", "tenders", "news", "financial"];

export const createCurrencySchema = object().shape({
    flag: mixed().required("flag is required").test(
        "validating-type",
        "file is not in the required format",
        (value) => validateImageFile(value as FileList)
    ).test(
        "validate-size", 
        "file size is above the allowed limit.", 
        (value) => validateFileSize(value as FileList)
    ),
    currency: string().required("currency is required"),
})

export const editCurrencySchema = object().shape({
    flag: mixed().nullable().test(
        "validating-type",
        "file is not in the required format",
        (value) => validateImageFile(value as FileList)
    ).test(
        "validate-size", 
        "file size is above the allowed limit.", 
        (value) => validateFileSize(value as FileList)
    ),
    currency: string().required("currency is required"),
})

export const ExchangeRateSchema = object().shape({
    currency_id: string().required("currency is required"),
    buying: string().required("buying price is required").test(
        "digital-only", "input must be a digit",
        (value) => /^(0|[1-9]\d*)(\.\d+)?$/.test(value)
    ),
    selling: string().required("selling price is required").test(
        "digital-only", "input must be a digit",
        (value) => /^(0|[1-9]\d*)(\.\d+)?$/.test(value)
    ),
    is_published: number().default(0).notRequired(),
})

export type TExchangeRateSchema = InferType<typeof ExchangeRateSchema>

export const uploadSchema = object().shape({
    document: mixed().required("document is required").test(
        "validating-type",
        "file is not in the required format",
        (value) => validateDocFiles(value as any, [SheetAcceptEnum.csv, SheetAcceptEnum.xls, SheetAcceptEnum.xlsx])
    ).test(
        "validate-size", 
        "file size is above the allowed limit.", 
        (value) => validateFileSize(value as any)
    ),
})

export type Currency = {
    id: string
    flag: string
    currency: string
    created_at: string
    updated_at: string
}

export type ExchangeRate = {
    id: string
    buying: string
    selling: string
    is_published: number
    created_at: string
    updated_at: string
    currency: Currency
}