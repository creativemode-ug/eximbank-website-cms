import { QueryOptions } from "@/types"
import { object, string, number, boolean, mixed, InferType } from "yup"
import {
    SheetAcceptEnum,
    validateDocFiles,
    validateFileSize,
} from "@/utils/validation"

export enum LocationTypeEnum {
    ATM = "atm",
    BRANCHES = "branch",
    AGENTS = "agents",
}
export const LocationTypes = [
    LocationTypeEnum.ATM,
    LocationTypeEnum.AGENTS,
    LocationTypeEnum.BRANCHES,
]

export type LocationOptions = Omit<QueryOptions, "search"> & {
    keyword?: string
}

// export type LocationDetailOption = { memberId?: string, locale?: string }

export const LocationSchema = object().shape({
    name: string().default(""),
    type: string().oneOf(LocationTypes).required("type is required"),
    region: string().required("region is required"),
    district: string().required("district is required"),
    location: string().required("location is required"),
    phone_number: string().default(""),
    latitude: number().required("latitude is required"),
    longitude: number().required("longitude is required"),
    is_published: boolean().default(false).optional(),
})

export type TypeLocationSchema = InferType<typeof LocationSchema>

export const UploadSchema = object().shape({
    type: string().oneOf(LocationTypes).required("type is required"),
    document: mixed()
        .required("document is required")
        .test("validating-type", "file is not in the required format", value =>
            validateDocFiles(value as any, [
                SheetAcceptEnum.csv,
                SheetAcceptEnum.xls,
                SheetAcceptEnum.xlsx,
            ])
        )
        .test("validate-size", "file size is above the allowed limit.", value =>
            validateFileSize(value as any)
        ),
    delete_all: boolean().default(false).optional(),
})

export type TypeUploadSchema = InferType<typeof UploadSchema>

export type BulkDeleteInput = {
    ids: string[] | number[]
}

export type Location = {
    id: string
    name: string
    type: LocationTypeEnum
    region: string
    district: string
    location: string
    phone_number: string
    latitude: number
    longitude: number
    is_published: number
    created_at: string
    updated_at: string
}

export type LocationResponse = {
    success: boolean
    failed_rows: Array<{
        row: Location
        error: string[]
    }>
}
