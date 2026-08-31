import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { IconArrowNarrowRight } from "@tabler/icons-react"
import {
    ProductTemplate1,
    ProductTemplate2,
    ProductTemplate3,
} from "@/features/products/fragments/product-templates"
import { yupResolver } from "@hookform/resolvers/yup"
import { useSearchParamState } from "@/hooks/useSearchParamState"
import {
    ProductFormQueryOptions,
    ProductTemplateEnum,
    ProductTemplateSchema,
    type TProductTemplateSchema,
} from "@/features/products/types"
import { ChoiceOption } from "@/components/form-fields/types"

import Button from "@/components/Buttons/Button"
import RadioGroupField from "@/components/form-fields/radio-group/radio-group-field"

function ProductFormTemplate() {
    const navigate = useNavigate()
    const { paramState } = useSearchParamState<ProductFormQueryOptions>()
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(ProductTemplateSchema),
    })

    const options: ChoiceOption[] = [
        {
            label: "Template 1",
            value: ProductTemplateEnum.Min.toString(),
            widget: <ProductTemplate1 />,
        },
        {
            label: "Template 2",
            value: ProductTemplateEnum.Basic.toString(),
            widget: <ProductTemplate2 />,
        },
        {
            label: "Template 3",
            value: ProductTemplateEnum.Rich.toString(),
            widget: <ProductTemplate3 />,
        },
    ]

    const submit = (values: TProductTemplateSchema) => {
        navigate(
            `content?locale=${paramState.locale}&template=${values.template}`
        )
    }

    return (
        <form onSubmit={handleSubmit(submit)} className="space-y-8">
            <div className="w-full space-y-4">
                <h4 className="text-sm font-medium">Select Template:</h4>

                <RadioGroupField
                    name="template"
                    control={control}
                    options={options}
                    required
                ></RadioGroupField>
            </div>
            <div className="flex justify-end">
                <Button
                    type="submit"
                    intent="primary"
                    rightIcon={<IconArrowNarrowRight className="size-4" />}
                >
                    Proceed
                </Button>
            </div>
        </form>
    )
}

export default ProductFormTemplate
