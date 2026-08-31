/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { QueryOptions } from "@/types"
import { useNavigate, useParams } from "react-router-dom"
import {
    useCreateCardType,
    useEditCardType,
    useGetCardTypeDetail,
} from "@/features/products/repositories/card-types"
import { CardTypeSchema, TCardTypeSchema } from "@/features/products/types"
import { yupResolver } from "@hookform/resolvers/yup"
import { useSearchParamState } from "@/hooks/useSearchParamState"

function useCardTypeForm() {
    const navigate = useNavigate()

    const { cardTypeId } = useParams()
    const { paramState } = useSearchParamState<QueryOptions>()
    const { resource } = useGetCardTypeDetail(cardTypeId)

    const { control, handleSubmit, setValue } = useForm({
        resolver: yupResolver(CardTypeSchema),
    })

    const createMutation = useCreateCardType(() => handleClose())
    const updateMutation = useEditCardType(() => handleClose())
    const isPending = createMutation.isPending || updateMutation.isPending

    const submit = (data: TCardTypeSchema) => {
        if (cardTypeId) {
            updateMutation.mutate({
                cardTypeId: cardTypeId,
                data: data,
            })
        } else {
            createMutation.mutate(data)
        }
    }

    const handleClose = () => navigate("/services/card-types")

    useEffect(() => {
        setValue("name", resource?.data.name ?? "")
        setValue("description", resource?.data.description ?? "")
    }, [paramState, resource])

    return {
        control,
        handleSubmit,
        handleClose,
        submit,
        isPending,
        cardTypeId,
    }
}

export default useCardTypeForm
