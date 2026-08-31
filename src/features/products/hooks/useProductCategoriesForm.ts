/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
    useCreateProductCategory,
    useEditProductCategory,
    useGetProductCategoryDetail,
} from "@/features/products/repositories/product-categories"
import {
    ProductCategorySchema,
    ProductCategoryOptions,
    TProductCategorySchema,
} from "@/features/products/types"
import { yupResolver } from "@hookform/resolvers/yup"
import { useSearchParamState } from "@/hooks/useSearchParamState"

function useProductCategoriesForm() {
    const navigate = useNavigate()

    const { productCategoryId } = useParams()
    const { paramState } = useSearchParamState<ProductCategoryOptions>()

    const { category } = useGetProductCategoryDetail({
        productCategoryId: productCategoryId,
        locale: paramState.locale,
    })

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(ProductCategorySchema),
    })

    const createMutation = useCreateProductCategory(() => handleClose())

    const updateMutation = useEditProductCategory(() => handleClose())

    const isPending = createMutation.isPending || updateMutation.isPending

    const submit = (data: TProductCategorySchema) => {
        const formData = new FormData()
        if (data.banner_image) {
            // @ts-expect-error
            formData.append("banner_image", data.banner_image[0])
        }

        if (data.action_label && data.action_link) {
            formData.append("action_label", data.action_label)
            formData.append("action_link", data.action_link)
        }

        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("head_line", data.head_line)
        formData.append("locale", paramState.locale as string)

        if (productCategoryId) {
            updateMutation.mutate({
                productCategoryId: productCategoryId,
                data: formData,
            })
        } else {
            createMutation.mutate(formData)
        }
    }

    const handleClose = () => {
        reset()
        navigate("/services/categories")
    }

    useEffect(() => {
        setValue("name", category?.data.name ?? "")
        setValue("description", category?.data.description ?? "")
        setValue("head_line", category?.data.head_line ?? "")
        setValue("action_label", category?.data.action_label ?? "")
        setValue("action_link", category?.data.action_link ?? "")
        setValue("locale", paramState.locale!)
    }, [paramState, category])

    return {
        control,
        handleSubmit,
        setValue,
        errors,
        handleClose,
        submit,
        isPending,
        productCategoryId,
    }
}

export default useProductCategoriesForm
