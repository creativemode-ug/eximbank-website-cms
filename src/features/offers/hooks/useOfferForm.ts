import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import {
    useCreateOffer,
    useEditOffer,
    useGetOfferDetail,
} from "@/features/offers/repositories/offers"
import { useGetOfferCategories } from "@/features/offers/repositories/offer-categories"
import { useGetCardTypes } from "@/features/offers/repositories/card-types"
import {
    OfferType,
    OfferSchema,
    TypeOfferSchema,
} from "@/features/offers/types"
import type { QueryOptions } from "@/types"
import { useSearchParamState } from "@/hooks/useSearchParamState"
import { BaseSelectOption } from "@/components/form-fields/types"

export default function OfferForm() {
    const navigate = useNavigate()

    const { offerId } = useParams()
    const { paramState } = useSearchParamState<QueryOptions>()

    const { offer } = useGetOfferDetail({
        offerId: offerId,
        locale: paramState.locale,
    })

    const { categories } = useGetOfferCategories({
        page: paramState.page ?? 1,
        per_page: 20,
        locale: paramState.locale,
    })

    const { cardTypes } = useGetCardTypes({
        page: paramState.page ?? 1,
        per_page: 20,
        locale: paramState.locale,
    })

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(OfferSchema),
    })

    const descFieldArray = useFieldArray({
        control,
        name: "descriptions",
    })

    const condFieldArray = useFieldArray({
        control,
        name: "conditions",
    })

    const createMutation = useCreateOffer(() => handleClose())
    const updateMutation = useEditOffer(() => handleClose())
    const isPending = createMutation.isPending || updateMutation.isPending

    const offerTypeOptions: BaseSelectOption[] = OfferType.map(type => ({
        label: type.name.toUpperCase(),
        value: type.id.toString(),
    }))

    const cardTypesOptions: BaseSelectOption[] =
        cardTypes?.data.map(card => ({
            label: card.name,
            value: card.id,
        })) ?? []

    const categoryOptions: BaseSelectOption[] =
        categories?.data.map(category => ({
            label: category.name,
            value: category.id,
        })) ?? []

    const handleClose = () => {
        navigate("/offers-and-perks/offers")
        reset()
    }

    const submit = (data: TypeOfferSchema) => {
        const formData = new FormData()

        if (data.image) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            formData.append("banner_image", data.image[0])
        }

        formData.append("title", data.title)
        formData.append("caption", data.caption)
        formData.append("offer_type", data.type.toString())
        formData.append("offer_category_id", data.categoryId)
        formData.append("card_type_id", data.cardType)
        formData.append("discount", data.discount.toString())
        formData.append("action_label", data.action_label)
        formData.append("action_link", data.action_link)
        formData.append("redeem", data.redeem)
        formData.append("locale", data.locale)

        data.descriptions?.forEach((element, index) => {
            formData.append(`descriptions[${index}]`, element.content)
        })
        data.conditions?.forEach((element, index) => {
            formData.append(`conditions[${index}]`, element.content)
        })

        if (offerId) {
            updateMutation.mutate({
                offerId: offerId,
                input: formData,
            })
        } else {
            createMutation.mutate(formData)
        }
    }

    useEffect(() => {
        if (offer) {
            setValue("title", offer.data.title)
            setValue("caption", offer.data.caption)
            setValue("type", offer.data.offer_type)
            setValue("discount", parseInt(offer.data.discount))
            setValue("redeem", offer.data.redeem)
            setValue("categoryId", offer.data.offer_category_id)
            setValue("cardType", offer.data.card_type_id ?? "")
            setValue("action_label", offer.data.action_label)
            setValue("action_link", offer.data.action_link)
            if (offer.data.descriptions) {
                const descValues = offer.data.descriptions.map(el => ({
                    content: el,
                }))
                setValue("descriptions", descValues)
            }

            if (offer.data.conditions) {
                const descValues = offer.data.conditions.map(el => ({
                    content: el,
                }))
                setValue("conditions", descValues)
            }
        }
        setValue("locale", paramState.locale!)
    }, [paramState, offer])

    return {
        control,
        handleSubmit,
        errors,
        handleClose,
        submit,
        isPending,
        offerTypeOptions,
        cardTypesOptions,
        categoryOptions,
        descFieldArray,
        condFieldArray,
        offerId,
    }
}
