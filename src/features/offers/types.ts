import type { QueryOptions, IdName, Timestamp } from "@/types"
import { validateFileSize, validateImageFile } from "@/utils/validation"
import { mixed, object, string, number, InferType, array } from "yup"

export type OfferOption = QueryOptions

export type OfferDetailOption = { offerId?: string; locale?: string }

export type OfferCategoryDetailOption = { categoryId?: string; locale?: string }

export type CardType = {
    id: string
    name: string
    description: string
}

export type Offer = Timestamp & {
    id: string
    title: string
    caption: string
    descriptions: string[]
    discount: string
    offer_type: number
    offer_category_id: string
    card_type_id: string
    category: IdName
    card_type: IdName
    banner_image: string
    action_link: string
    action_label: string
    redeem: string
    conditions: string[]
}

export enum OfferTypeEnum {
    GLOBAL = 1,
    LOCAL = 2,
}

export const OfferType = [
    { id: OfferTypeEnum.GLOBAL, name: "global" },
    { id: OfferTypeEnum.LOCAL, name: "local" },
]

export type OfferType = OfferTypeEnum.GLOBAL | OfferTypeEnum.LOCAL

export type OfferCategory = {
    id: string
    name: string
    description: string | null
}

export const CardTypeSchema = object().shape({
    name: string().required("name is required").max(80).trim(),
    description: string().required("description is required").trim(),
})

export type TypeCardTypeSchema = InferType<typeof CardTypeSchema>

export const OfferCategorySchema = object().shape({
    name: string().required("name is required").max(80).trim(),
    description: string().required("description is required").trim(),
    locale: string().required("locale is required"),
})

export type TypeOfferCategorySchema = InferType<typeof OfferCategorySchema>

export const StringSchema = object().shape({
    content: string().required("content is required"),
})

export const OfferSchema = object().shape({
    image: mixed()
        .notRequired()
        .test("validating-type", "file is not in the required format", value =>
            validateImageFile(value as FileList)
        )
        .test("validate-size", "file size is above the allowed limit.", value =>
            validateFileSize(value as FileList)
        ),
    title: string().required("title is required").min(10).max(80),
    caption: string().required("caption is required").min(40).max(100),
    descriptions: array(StringSchema)
        .min(1, "At least one description is required")
        .default([]),
    conditions: array(StringSchema)
        .min(1, "At least one condition is required")
        .default([]),
    discount: number().required("discount is required"),
    type: number()
        .required("type is required")
        .oneOf(
            [OfferTypeEnum.GLOBAL, OfferTypeEnum.LOCAL],
            "Invalid offer type"
        ),
    categoryId: string().required("category id is required"),
    cardType: string().required("card type is required"),
    locale: string().required("Locale is required"),
    redeem: string().required("redeem is required"),
    action_link: string().url().required("link is requires"),
    action_label: string().required("label is required"),
})

export type TypeOfferSchema = InferType<typeof OfferSchema>
