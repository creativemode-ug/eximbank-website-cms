/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { QueryOptions } from "@/types"
import {
    useCreateOfferCategory,
    useEditOfferCategory,
    useGetOfferCategoryDetail,
} from "@/features/offers/repositories/offer-categories"
import {
    OfferCategorySchema,
    TypeOfferCategorySchema,
} from "@/features/offers/types"
import { yupResolver } from "@hookform/resolvers/yup"
import { useSearchParamState } from "@/hooks/useSearchParamState"


function useOfferCategoriesForm() {
    const navigate = useNavigate()

    const { categoryId } = useParams()
    const { paramState } = useSearchParamState<QueryOptions>()

    const { category } = useGetOfferCategoryDetail({
        categoryId: categoryId,
        locale: paramState.locale,
    })

    const {
        control,
        handleSubmit,
        setValue,
        reset,

    } = useForm({
        resolver: yupResolver(OfferCategorySchema),
    })

    const createMutation = useCreateOfferCategory(() => handleClose())

    const updateMutation = useEditOfferCategory(() => handleClose())

    const isPending = createMutation.isPending || updateMutation.isPending

    const submit = (data: TypeOfferCategorySchema) => {
        if (categoryId) {
            updateMutation.mutate({
                categoryId: categoryId,
                input: data,
            })
        } else {
            createMutation.mutate(data)
        }
    }

    const handleClose = () => {
        reset()
        navigate("/offers-and-perks/categories")
    }

    useEffect(() => {
        setValue("name", category?.data.name ?? "")
        setValue("description", category?.data.description ?? "")
        setValue("locale", paramState.locale!)
    }, [paramState, category])

    return {
        control,
        handleSubmit,
        handleClose,
        submit,
        isPending,
        categoryId,
    }
}

export default useOfferCategoriesForm
