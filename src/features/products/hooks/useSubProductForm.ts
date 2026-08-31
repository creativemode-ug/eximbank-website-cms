import {useFieldArray, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    ProductContentOptions, SubProductFormQueryOptions,
    SubProductSchema,
    type TSubProductSchema
} from "@/features/products/types.ts";
import {
    useCreateSubProduct,
    useEditSubProduct,
    useGetSubProductDetail
} from "@/features/products/repositories/sub-products.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSearchParamState} from "@/hooks/useSearchParamState.ts";


 function useSubProductForm() {
     const navigate = useNavigate()
     const { productId } = useParams()
     const [removedOptions, setRemovedOptions] = useState<string[]>([])
     const { paramState } = useSearchParamState<SubProductFormQueryOptions>()
     const { subProduct } = useGetSubProductDetail({
         locale: paramState.locale,
         subProductId: paramState.subProductId,
     })

     const {
         control,
         setValue,
         handleSubmit,
         reset,
         watch,
     } = useForm({
         resolver: yupResolver(SubProductSchema),
     })

     const { fields, append, remove } = useFieldArray({
         control,
         name: "options",
     })

     const createMutation = useCreateSubProduct(() => handleClose())
     const updateMutation = useEditSubProduct(() => handleClose())
     const isPending = createMutation.isPending || updateMutation.isPending
     const options = watch("options")

     const handleClose = () => {
         reset()
         navigate(`/services/products/${productId}`)
     }

     const appendOption = () => {
         append({ type: "", content: "" })
     }

     const removeOption = (index: number) => {
         remove(index)
         try {
             const removedId = options[index].id
             if (removedId) setRemovedOptions([...removedOptions, removedId])
         } catch {
             //
         }
     }


     const submit = (data: TSubProductSchema) => {
         const formData = new FormData()
         formData.append("product_id", String(productId))
         formData.append("name", data.name)
         formData.append("description", data.description ?? "")
         formData.append("locale", data.locale)

         data.options.forEach((element, index) => {
             if (element.id) {
                 formData.append(`options[${index}][id]`, element!.id)
             }
             formData.append(`options[${index}][type]`, element.type)
             formData.append(`options[${index}][content]`, element.content)
         })

         removedOptions.forEach((element, index) => {
             formData.append(`removed_options[${index}]`, element)
         })

         if (paramState.subProductId) {
             updateMutation.mutate({
                 subProductId: paramState.subProductId,
                 data: formData,
             })
         } else {
             createMutation.mutate(formData)
         }
     }

     useEffect(() => {
         const options = subProduct?.data.options.map(el => ({
             id: el.id,
             type: el.type.toString(),
             content: el.content,
         }))

         setValue("name", subProduct?.data.name ?? "")
         setValue("description", subProduct?.data.description ?? "")
         setValue("options", options ?? [])
         setValue("locale", paramState.locale!)
     }, [paramState, subProduct])

     return {
         control,
         submit,
         handleSubmit,
         contentOptions: ProductContentOptions,
         appendOption,
         removeOption,
         setValue,
         fields,
         isPending,
         productId,
     }

 }

export default useSubProductForm

