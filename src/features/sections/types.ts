import { QueryOptions } from "@/types"
import { validateFileSize, validateImageFile } from "@/utils/validation"
import { mixed, object, string, number, InferType } from "yup"

export type SectionOption = QueryOptions

export type SectionDetailOption = { sectionId?: string; locale?: string }

export type Section = {
    id: string
    title: string
    sub_title: string
    description: string
    type: string
    placement: string | null
    image: string
    action: string | null
    link: string | null
    start_date: string
    end_date: string
    is_published: number
    created_at: string
    updated_at: string
}

export const SectionTypes = ["carousel", "cta"]
export const Placement = ["home", "about"]

export const SectionSchema = object().shape({
    image: mixed()
        .notRequired()
        .test("validating-type", "file is not in the required format", value =>
            validateImageFile(value as FileList)
        )
        .test("validate-size", "file size is above the allowed limit.", value =>
            validateFileSize(value as FileList)
        ),
    title: string().required("title is required").max(80),
    sub_title: string().required("sub title is required").max(40),
    description: string().required("description is required").min(120).max(200),
    type: string().required("type is required").oneOf(SectionTypes),
    placement: string().default(Placement[0]).oneOf(Placement),
    start_date: string()
        .nullable()
        .test(
            "start-date-check",
            "Start date must be greater or equal to today",
            value => {
                if (!value) return true
                const today = new Date()
                today.setHours(0, 0, 0, 0)
                const input = new Date(value)
                input.setHours(0, 0, 0, 0)
                return input >= today
            }
        )
        .test(
            "start-date-end-date",
            "Start date must be before end date",
            function (value) {
                const { end_date } = this.parent
                return value && end_date
                    ? new Date(value) < new Date(end_date)
                    : true
            }
        ),
    end_date: string().nullable(),
    action_label: string()
        .nullable()
        .test(
            "action-validation",
            "Action is required when link is filled",
            function (value) {
                return this.parent.link ? !!value : true
            }
        ),
    action_link: string()
        .nullable()
        .test(
            "link-validation",
            "Link is required when action is filled",
            function (value) {
                return this.parent.action ? !!value : true
            }
        ),
    is_published: number().default(0).notRequired(),
    locale: string().required("Locale is required"),
})
export type TypeSectionSchema = InferType<typeof SectionSchema>
