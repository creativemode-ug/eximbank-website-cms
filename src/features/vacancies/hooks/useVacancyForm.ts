import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import {
    VacancyOptions,
    VacancyType,
    VacancySchema,
    TypeVacancySchema,
    ContractType,
} from "@/features/vacancies/types"
import {
    useGetVacancyDetail,
    useCreateVacancy,
    useEditVacancy,
} from "@/features/vacancies/repositories"
import { i18n } from "@/i18n.config"
import { useSearchParamState } from "@/hooks/useSearchParamState"

export default function useVacancyForm() {
    const navigate = useNavigate()

    const { paramState } = useSearchParamState<VacancyOptions>()
    const { vacancyId } = useParams()

    const { vacancy } = useGetVacancyDetail(vacancyId)

    const { handleSubmit, control, setValue, reset } = useForm({
        resolver: yupResolver(VacancySchema),
    })

    const createMutation = useCreateVacancy(() => handleClose())
    const updateMutation = useEditVacancy(() => handleClose())
    const isPending = createMutation.isPending || updateMutation.isPending

    const handleClose = () => {
        reset()
        navigate(`/positions`)
    }

    const typeOptions = VacancyType.map(i => ({
        label: i.toLocaleUpperCase(),
        value: i.toLowerCase(),
    }))

    const contractOptions = ContractType.map(i => ({
        label: i.label.toLocaleUpperCase(),
        value: i.value.toString(),
    }))

    const submit = (data: TypeVacancySchema) => {
        const formData = new FormData()

        if (data.image) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            formData.append("image", data.image[0])
        }

        formData.append("title", data.title)
        formData.append("summary", data.summary)
        formData.append("description", data.description)
        formData.append("type", data.type)
        formData.append("contract_type", `${data.contractType}`)
        formData.append("location", data.location)
        formData.append("link", data.link ?? "")
        formData.append("deadline", data.deadline)
        formData.append("is_published", data.isPublished ? "1" : "0")
        formData.append("duration", "0")
        formData.append("locale", i18n.defaultLocale)

        if (vacancy) {
            updateMutation.mutate({
                vacancyId: vacancy.data.id,
                data: formData,
            })
        } else {
            createMutation.mutate(formData)
        }
    }

    useEffect(() => {
        if (vacancy) {
            const deadline = new Date(vacancy?.data.deadline)
                .toISOString()
                .substring(0, 10)

            setValue("title", vacancy.data.title)
            setValue("summary", vacancy.data.summary)
            setValue("description", vacancy.data.description)
            setValue("type", vacancy.data.type)
            setValue("contractType", vacancy.data.contract_type.value)
            setValue("location", vacancy.data.location)
            setValue("link", vacancy.data.link)
            setValue("deadline", deadline)
            setValue(
                "isPublished",
                vacancy.data.is_published == 1 ? true : false
            )
        }
        // setValue("locale", paramState.locale as string)
    }, [paramState, vacancy])

    return {
        control,
        handleSubmit,
        handleClose,
        submit,
        typeOptions,
        contractOptions,
        isPending,
        vacancyId,
    }
}
