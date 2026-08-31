/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { QueryOptions } from "@/types"
import {
    useCreateCardType,
    useEditCardType,
    useGetCardTypeDetail,
} from "@/features/offers/repositories/card-types"
import { CardTypeSchema, TypeCardTypeSchema } from "@/features/offers/types"
import { yupResolver } from "@hookform/resolvers/yup"
import { useSearchParamState } from "@/hooks/useSearchParamState"

function useCardTypeForm() {
    const navigate = useNavigate()

    const { cardTypeId } = useParams()
    const { paramState } = useSearchParamState<QueryOptions>()

    const { cardType } = useGetCardTypeDetail({
        categoryId: cardTypeId,
        locale: paramState.locale,
    })

    const { control, handleSubmit, setValue, reset } = useForm({
        resolver: yupResolver(CardTypeSchema),
    })

    const createMutation = useCreateCardType(() => handleClose())

    const updateMutation = useEditCardType(() => handleClose())

    const isPending = createMutation.isPending || updateMutation.isPending

    const submit = (data: TypeCardTypeSchema) => {
        if (cardTypeId) {
            updateMutation.mutate({
                cardTypeId: cardTypeId,
                data: data,
            })
        } else {
            createMutation.mutate(data)
        }
    }

    const handleClose = () => {
        reset()
        navigate("/offers-and-perks/card-types")
    }

    useEffect(() => {
        setValue("name", cardType?.data.name ?? "")
        setValue("description", cardType?.data.description ?? "")
        // setValue("locale", paramState.locale!)
    }, [paramState, cardType])

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
