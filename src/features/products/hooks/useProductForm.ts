import { useEffect, useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { useParams } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup"
import { type ChoiceOption } from "@/components/form-fields/types"
import type { ProductFormQueryOptions } from "@/features/products/types"
import { useGetProductResources } from "@/features/products/repositories/product-resources"
import { useGetProductCategories } from "@/features/products/repositories/product-categories"
import { useGetCardTypes } from "@/features/products/repositories/card-types"
import {
    useCreateProduct,
    useEditProduct,
} from "@/features/products/repositories/products"
import { useSearchParamState } from "@/hooks/useSearchParamState"
import { useGetProductDetail } from "@/features/products/repositories/products"
import {
    ProductContentOptions,
    ProductTypeOptions,
    ProductSchema,
    type TProductSchema,
} from "@/features/products/types"

function useProductForm() {
    const { productId } = useParams()
    const { paramState } = useSearchParamState<ProductFormQueryOptions>()
    const [removedOptions, setRemovedOptions] = useState<string[]>([])

    const { resources } = useGetProductResources({ ...paramState })
    const { categories } = useGetProductCategories({ ...paramState })
    const { cardTypes } = useGetCardTypes({ ...paramState })
    const { product } = useGetProductDetail({
        locale: paramState.locale,
        productId: productId,
    })
    const { control, setValue, handleSubmit, reset, watch } = useForm({
        resolver: yupResolver(ProductSchema),
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "contentOptions",
    })

    const createMutation = useCreateProduct(() => handleClose())
    const updateMutation = useEditProduct(() => handleClose())
    const isPending = createMutation.isPending || updateMutation.isPending
    const contentOptions = watch("contentOptions")

    const handleClose = () => {
        reset()
        if (window) {
            window.location.replace(
                window.location.origin + "/services/products"
            )
        }
    }

    const resourceOptions: ChoiceOption[] =
        resources?.data.flatMap(el => ({
            label: `${el.name}`,
            value: el.id.toString(),
        })) ?? []

    const cardTypeOptions: ChoiceOption[] =
        cardTypes?.data.flatMap(el => ({
            label: `${el.name}`,
            value: el.id.toString(),
        })) ?? []

    const categoryOptions: ChoiceOption[] =
        categories?.data.flatMap(el => ({
            label: `${el.name}`,
            value: el.id.toString(),
        })) ?? []

    const appendOption = () => {
        append({ type: "", content: "" })
    }

    const removeOption = (index: number) => {
        remove(index)
        try {
            const removedId = contentOptions[index].id
            if (removedId) setRemovedOptions([...removedOptions, removedId])
        } catch {
            //
        }
    }

    const submit = (data: TProductSchema) => {
        const formData = new FormData()
        if (data.bannerImage) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            formData.append("banner_img", data.bannerImage[0])
        }

        if (data.actionLabel && data.actionLink) {
            formData.append("action_label", data.actionLabel)
            formData.append("action_link", data.actionLink)
        }
        formData.append("type", data.type)
        formData.append("product_category_id", data.category)
        formData.append("layout", paramState.template)
        formData.append("title", data.name)
        formData.append("highlight_caption", data.highlightCaption ?? "")
        formData.append("highlight_title", data.highlightTitle ?? "")
        formData.append(
            "highlight_description",
            data.highlightDescription ?? ""
        )
        formData.append("description", data.description ?? "")
        formData.append("resource_ids[0]", data.resourceIds)
        formData.append("is_published", data.isPublished ? "1" : "0")
        formData.append("locale", data.locale)

        data.contentOptions.forEach((element, index) => {
            if (element.id) {
                formData.append(`options[${index}][id]`, element!.id)
            }
            formData.append(`options[${index}][type]`, element.type)
            formData.append(`options[${index}][content]`, element.content)
        })

        removedOptions.forEach((element, index) => {
            formData.append(`removed_options[${index}]`, element)
        })

        if (productId) {
            updateMutation.mutate({
                productId: productId,
                data: formData,
            })
        } else {
            createMutation.mutate(formData)
        }
    }

    useEffect(() => {
        const options = product?.data.options.map(el => ({
            id: el.id,
            type: el.type.toString(),
            content: el.content,
        }))

        if (product) {
            setValue("type", product.data.type.toString() ?? "")
            setValue("category", product.data.category.id.toString() ?? "")
            setValue("name", product.data.title ?? "")
            setValue("highlightCaption", product.data.highlight_caption)
            setValue("highlightTitle", product.data.highlight_title ?? "")
            setValue(
                "highlightDescription",
                product.data.highlight_description ?? ""
            )
            setValue("description", product.data.description ?? "")
            setValue("actionLabel", product.data.action_label ?? "")
            setValue("actionLink", product.data.action_link ?? "")
            setValue("resourceIds", product.data.resources[0]?.id ?? "")
            setValue("isPublished", product.data.is_published ?? false)
            setValue("contentOptions", options ?? [])
        }
        setValue("locale", paramState.locale!)
    }, [paramState, product])

    return {
        control,
        submit,
        handleSubmit,
        productTypeOptions: ProductTypeOptions,
        categoryOptions,
        resourceOptions,
        contentOptions: ProductContentOptions,
        cardTypeOptions,
        appendOption,
        removeOption,
        fields,
        isPending,
        productId,
        template: parseInt(paramState.template),
    }
}

export default useProductForm
