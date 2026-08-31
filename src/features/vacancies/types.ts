import { QueryOptions } from "@/types"
import { validateFileSize, validateImageFile } from "@/utils/validation"
import { object, string, number, mixed, bool, InferType } from "yup"

export type VacancyOptions = QueryOptions

export const VacancyType = ["onsite", "remotely"]
export const ContractType = [
    { value: 1, label: "permanent" },
    { value: 2, label: "contract" },
]

export const VacancySchema = object({
    image: mixed()
        .nullable()
        .test("validating-type", "File is not in the required format", value =>
            validateImageFile(value as FileList)
        )
        .test("validate-size", "File size is above the allowed limit", value =>
            validateFileSize(value as FileList)
        ),
    title: string().required("Title is required").max(80),
    summary: string().required("Summary is required"),
    description: string().required("Content is required"),
    type: string()
        .required("Type is required")
        .oneOf(VacancyType, "Invalid position type"),
    contractType: number()
        .required("Contract type is required")
        .oneOf(
            ContractType.map(type => type.value),
            "Invalid contract type"
        ),
    location: string().required("Location is required"),
    link: string().url("Must be a valid URL").notRequired(),
    deadline: string().required("Deadline is required"),
    isPublished: bool().default(false).notRequired(),
})

export type TypeVacancySchema = InferType<typeof VacancySchema>

export type Vacancy = {
    id: string
    title: string
    slug: string
    summary: string
    description: string
    type: string
    contract_type: {
        value: number
        label: string
    }
    image: string
    location: string
    duration: string
    link: string
    deadline: string
    published_at: string
    is_published: number
    created_at: string
    updated_at: string
}
