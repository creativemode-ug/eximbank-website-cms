import type { QueryOptions, Timestamp } from "@/types"
import {
    validateFileSize,
    validateImageFile,
} from "@/components/form-fields/file/utils"
import { object, string, mixed, array, bool, type InferType } from "yup"
import { Languages } from "@/i18n.config"

export type ProductQueryOptions = QueryOptions
export type ProductCategoryOptions = QueryOptions
export type ResourceQueryOptions = QueryOptions

export type ProductFormQueryOptions = {
    template: string
    locale: Languages
}

export type SubProductFormQueryOptions = {
    subProductId: string
    locale: Languages
}

export type Product = Timestamp & {
    id: string
    type: ProductTypeEnum
    layout: ProductTemplateEnum
    category: ProductCategory
    banner_img: string | null
    banner_img_path?: string | null
    title: string
    slug: string
    highlight_title: string | null
    highlight_caption: string | null
    highlight_description: string | null
    description: string | null
    action_link: string | null
    action_label?: string | null
    is_published: boolean
    locale: Languages
}

export type SubProduct = Timestamp & {
    id: string
    name: string
    description: string | null
    locale: Languages
    options: Array<ProductContentOption>
}

export type ProductDetail = Product & {
    resources: ProductResource[]
    options: Array<ProductContentOption>
    subProducts: SubProduct[]
}

export type ProductContentOption = {
    id: string
    type: ProductOptionEnum
    content: string
}

export type ProductCategoryDetailOption = {
    productCategorId?: string
    locale?: string
}

export type ProductCategory = Timestamp & {
    id: string
    name: string
    slug: string
    description: string
    head_line: string
    banner_image: string
    action_label: string | null
    action_link: string | null
}

export type ProductResource = Timestamp & {
    id: string
    type: number
    reference: string
    name: string
}

export enum ProductTypeEnum {
    Personal = 1,
    Business = 2,
}

export enum ProductTemplateEnum {
    Min = 1,
    Basic = 2,
    Rich = 3,
}

export enum ResourceTypeEnum {
    FORM = 1,
    VIDEO = 2,
    IMAGE = 3,
}

export enum ProductOptionEnum {
    FEATURE = 1,
    ELIGIBILITY = 2,
    REASONS = 3,
}

export enum ProductFormEnum {
    Inqury = "Inquiry-Form",
    Product = "Product-Form",
    Quote = "Quote-Form",
    Wakala = "Wakala-Form",
}

export type CardType = {
    id: string
    name: string
    description: string
}

export const ProductTemplateOptions = [
    { label: "Minimum", value: ProductTemplateEnum.Min.toString() },
    { label: "Basic", value: ProductTemplateEnum.Basic.toString() },
    { label: "Rich", value: ProductTemplateEnum.Rich.toString() },
]

export const ProductTypeOptions = [
    { label: "Personal", value: ProductTypeEnum.Personal.toString() },
    { label: "Business", value: ProductTypeEnum.Business.toString() },
]

export const ResourceTypeOptions = [
    { label: "Form", type: ResourceTypeEnum.FORM },
    { label: "Video", type: ResourceTypeEnum.VIDEO },
    { label: "Image", type: ResourceTypeEnum.IMAGE },
]

export const ProductContentOptions = [
    {
        label: "Features & Benefits",
        value: ProductOptionEnum.FEATURE.toString(),
    },
    {
        label: "Requirements",
        value: ProductOptionEnum.ELIGIBILITY.toString(),
    },
    {
        label: "Reason to enroll",
        value: ProductOptionEnum.REASONS.toString(),
    },
]

export const ResourceFormOptions = [
    { label: "Inquiry Form", type: ProductFormEnum.Inqury },
    { label: "Product Form", type: ProductFormEnum.Product },
    { label: "Get Quote", type: ProductFormEnum.Quote },
    { label: "Wakala Form", type: ProductFormEnum.Wakala },
]

export const ProductCategorySchema = object().shape({
    banner_image: mixed()
        .optional()
        .nullable()
        .test("validating-type", "file is not in the required format", value =>
            validateImageFile(value as FileList)
        )
        .test("validate-size", "file size is above the allowed limit.", value =>
            validateFileSize(value as FileList)
        ),
    name: string().required("name is required"),
    description: string().required("description is required"),
    head_line: string().required("headline is required"),
    action_label: string().optional().nullable(),
    action_link: string().url().optional().nullable(),
    locale: string().required("locale is required"),
})

export type TProductCategorySchema = InferType<typeof ProductCategorySchema>

export const ProductTemplateSchema = object().shape({
    template: string().required("product template is required"),
})

export type TProductTemplateSchema = InferType<typeof ProductTemplateSchema>

export const ProductContentOptionSchema = object().shape({
    id: string().optional().nullable(),
    type: string().required("option type is required"),
    content: string().required("option content is required"),
})

export type TProductContentOptionSchema = InferType<
    typeof ProductContentOptionSchema
>

export const ProductSchema = object().shape({
    type: string().required("product type is required"),
    category: string().required("product category is required"),
    name: string().required("product name is required"),
    bannerImage: mixed()
        .optional()
        .nullable()
        .test("validating-type", "file is not in the required format", value =>
            validateImageFile(value as FileList)
        )
        .test("validate-size", "file size is above the allowed limit.", value =>
            validateFileSize(value as FileList)
        ),
    highlightCaption: string().max(40).optional().nullable(),
    highlightTitle: string().max(80).optional().nullable(),
    highlightDescription: string().max(400).optional().nullable(),
    description: string().optional().nullable(),
    actionLabel: string().optional().nullable(),
    actionLink: string().optional().nullable(),
    resourceIds: string().required("resource type is required"),
    cardTypeId: string().optional().nullable(),
    contentOptions: array(ProductContentOptionSchema).default([]),
    isPublished: bool().default(false).notRequired(),
    locale: string().required("locale is required"),
})

export type TProductSchema = InferType<typeof ProductSchema>

export const ResourceSchema = object().shape({
    name: string().required("name is required").min(3).max(60),
    type: string().required("type is required"),
    reference: string().required("reference is required"),
    locale: string().required("locale is required"),
})

export type TResourceSchema = InferType<typeof ResourceSchema>

export const SubProductSchema = object().shape({
    product_id: string().required("product id is required"),
    locale: string().required("location is required"),
    name: string().required("name is required"),
    description: string().required("description is required"),
    options: array(ProductContentOptionSchema).default([]),
})

export type TSubProductSchema = InferType<typeof SubProductSchema>

export const CardTypeSchema = object().shape({
    name: string().required("name is required").trim().min(3).max(60),
    description: string().required("type is required").trim().max(80),
})

export type TCardTypeSchema = InferType<typeof CardTypeSchema>
