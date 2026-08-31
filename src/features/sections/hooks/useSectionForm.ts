import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import {
    useCreateSection,
    useEditSection,
    useGetSectionDetail,
} from "@/features/sections/repositories"
import {
    SectionTypes,
    type TypeSectionSchema,
    Placement,
    SectionSchema,
} from "@/features/sections/types"
import { dateToInputFormat } from "@/utils/conversion"
import type { QueryOptions } from "@/types"
import { useSearchParamState } from "@/hooks/useSearchParamState"
import { i18n } from "@/i18n.config"

function useSectionForm() {
    const navigate = useNavigate()

    const { paramState } = useSearchParamState<QueryOptions>()
    const { sectionId } = useParams()
    const { section } = useGetSectionDetail({
        sectionId: sectionId,
        locale: paramState.locale,
    })

    const { control, handleSubmit, setValue, reset, watch } = useForm({
        resolver: yupResolver(SectionSchema),
    })

    const createMutation = useCreateSection(() => handleClose())
    const updateMutation = useEditSection(() => handleClose())
    const isPending = createMutation.isPending || updateMutation.isPending
    const isPublished = watch("is_published", 0)

    const handleClose = () => {
        reset()
        navigate(`/sections?locale=${i18n.defaultLocale}`)
    }

    const submit = (data: TypeSectionSchema) => {
        const formData = new FormData()

        if (data.image) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            formData.append("image", data?.image[0])
        }

        formData.append("title", data.title)
        formData.append("sub_title", data.sub_title)
        formData.append("description", data.description)
        formData.append("type", data.type)
        formData.append("placement", data.placement)
        formData.append("action", data.action_label ?? "")
        formData.append("link", data.action_link ?? "")
        formData.append("is_published", data?.is_published?.toString() ?? "0")
        formData.append("locale", paramState.locale ?? i18n.defaultLocale)

        if (data.start_date != null && data.end_date != null) {
            formData.append("start_date", data.start_date)
            formData.append("end_date", data.end_date)
        }

        if (sectionId) {
            updateMutation.mutate({
                id: sectionId,
                data: formData,
            })
        } else {
            createMutation.mutate(formData)
        }
    }

    const sectionTypeOptions = SectionTypes.map(i => ({
        label: i.toLocaleUpperCase(),
        value: i.toLowerCase(),
    }))

    const placementOptions = Placement.map(i => ({
        label: i.toLocaleUpperCase(),
        value: i.toLowerCase(),
    }))

    useEffect(() => {
        if (section) {
            setValue("title", section.data.title ?? "")
            setValue("sub_title", section.data.sub_title ?? "")
            setValue("description", section.data.description ?? "")
            setValue("type", section.data.type ?? "")
            setValue("placement", section.data.placement ?? "")
            setValue("start_date", dateToInputFormat(section.data.start_date))
            setValue("end_date", dateToInputFormat(section.data.end_date))
            setValue("action_label", section.data.action)
            setValue("action_link", section.data.link)
            setValue("is_published", section.data.is_published ?? 0)
        }
        setValue("locale", paramState.locale as string)
    }, [paramState, section])

    return {
        control,
        handleSubmit,
        submit,
        setValue,
        sectionTypeOptions,
        placementOptions,
        isPending,
        isPublished,
        sectionId,
    }
}

export default useSectionForm
