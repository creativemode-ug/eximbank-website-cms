import { useForm } from "react-hook-form"
import { useNavigate, useLocation, useParams } from "react-router-dom"
import { useCreateFaq, useEditFaq } from "@/features/faq/repositories/faqs"
import {
    type Faq,
    FaqSchema,
    FaqOptions,
    TypeFaqSchema,
} from "@/features/faq/types"
import { yupResolver } from "@hookform/resolvers/yup"
import { useSearchParamState } from "@/hooks/useSearchParamState"
import { useEffect } from "react"

function useFaqForm() {
    const navigate = useNavigate()
    const location = useLocation()

    const faq = location.state as Faq | null

    const { faqId } = useParams()
    const { paramState } = useSearchParamState<FaqOptions>()

    const { control, handleSubmit, setValue } = useForm({
        resolver: yupResolver(FaqSchema),
    })

    const createMutation = useCreateFaq(() => handleClose())
    const updateMutation = useEditFaq(() => handleClose())
    const isPending = createMutation.isPending || updateMutation.isPending

    const submit = (data: TypeFaqSchema) => {
        if (faqId) {
            updateMutation.mutate({
                faqId: faqId,
                data: data,
            })
        } else {
            createMutation.mutate(data)
        }
    }

    const handleClose = () => navigate(`/faq`)

    useEffect(() => {
        if (faq) {
            setValue("question", faq.question)
            setValue("answer", faq.answer)
            setValue("is_published", faq.is_published == 1 ? true : false)
        }
        setValue("locale", paramState.locale!)
    }, [paramState, faq])

    return {
        control,
        submit,
        handleClose,
        handleSubmit,
        isPending,
        faqId,
    }
}

export default useFaqForm
