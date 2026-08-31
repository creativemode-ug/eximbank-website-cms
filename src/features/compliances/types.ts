import { SheetAcceptEnum, validateDocFiles, validateFileSize } from "@/utils/validation";
import { mixed, object, string, InferType } from "yup";
import { QueryOptions } from "@/types";

export type ComplianceOptions = QueryOptions;

export type Compliance = {
    id: string
    type: string
    currency: string
    day_bid_14: number
    day_ask_14: number
    one_month_bid: number
    one_month_ask: number
    three_month_bid: number
    three_month_ask: number
    six_month_bid: number
    six_month_ask: number
    is_published: number
    created_at: string
    updated_at: string
}


export const ComplianceTypes = ["swaps", "forward-contract"];

export const ComplianceSchema = object().shape({
    type: string().oneOf(ComplianceTypes).required("type is required"),
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

export type TComplianceSchema = InferType<typeof ComplianceSchema>