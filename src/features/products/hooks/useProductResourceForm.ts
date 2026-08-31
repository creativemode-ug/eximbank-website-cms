/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
    useCreateResource,
    useEditResource,
    useGetProductResourceDetail,
} from "@/features/products/repositories/product-resources"
import {
    ResourceTypeEnum,
    ResourceSchema,
    ResourceQueryOptions,
    TResourceSchema,
    ResourceTypeOptions,
    ResourceFormOptions,
} from "@/features/products/types"
import { yupResolver } from "@hookform/resolvers/yup"
import { useSearchParamState } from "@/hooks/useSearchParamState"

function useResourceForm() {
    const navigate = useNavigate()

    const { resourceId } = useParams()
    const { paramState } = useSearchParamState<ResourceQueryOptions>()
    const { resource } = useGetProductResourceDetail({
        productResourceId: resourceId,
        locale: paramState.locale,
    })

    const { control, handleSubmit, setValue, watch } = useForm({
        resolver: yupResolver(ResourceSchema),
    })

    const createMutation = useCreateResource(() => handleClose())

    const updateMutation = useEditResource(() => handleClose())

    const isPending = createMutation.isPending || updateMutation.isPending

    const isForm = watch("type") == ResourceTypeEnum.FORM.toString()
    const resourceTypeValue = watch("type")

    const resourceOptions = ResourceTypeOptions.flatMap(el => ({
        label: el.label,
        value: el.type.toString(),
    }))
    const resourceFormOptions = ResourceFormOptions.flatMap(el => ({
        label: el.label,
        value: el.type,
    }))

    const submit = (data: TResourceSchema) => {
        if (resourceId) {
            updateMutation.mutate({
                resourceId: resourceId,
                data: data,
            })
        } else {
            createMutation.mutate(data)
        }
    }

    const handleClose = () => navigate("/services/resources")

    useEffect(() => {
        setValue("type", resource?.data.type.toString() ?? "")
        setValue("name", resource?.data.name ?? "")
        setValue("reference", resource?.data.reference ?? "")
        setValue("locale", paramState.locale!)
    }, [paramState, resource])

    return {
        control,
        handleSubmit,
        handleClose,
        submit,
        isPending,
        resourceId,
        resourceOptions,
        resourceFormOptions,
        resourceTypeValue,
        isForm,
    }
}

export default useResourceForm
