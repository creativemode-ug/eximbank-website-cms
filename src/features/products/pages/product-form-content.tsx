import { Fragment } from "react"
import { useNavigate } from "react-router-dom"
import {
    IconArrowNarrowLeft,
    IconArrowNarrowRight,
    IconPlus,
    IconMinus,
} from "@tabler/icons-react"
import { ProductTemplateEnum } from "@/features/products/types"

import Button from "@/components/Buttons/Button"
import ActionButton from "@/components/Buttons/action-button"
import RadioGroupField from "@/components/form-fields/radio-group/radio-group-field"
import FormSection from "@/features/products/fragments/form-section"
import TextField from "@/components/form-fields/text/text-field"
import TextAreaField from "@/components/form-fields/textarea/text-area-field"
import FileField from "@/components/form-fields/file/file-field"
import SelectField from "@/components/form-fields/select/select-field"
import ChechboxField from "@/components/form-fields/checkbox-group/checkbox-field"
import useProductForm from "@/features/products/hooks/useProductForm"
import Divider from "@/components/divider"
import ConditionalRender from "@/components/conditional-render"

function ProductFormContent() {
    const navigate = useNavigate()
    const {
        control,
        submit,
        handleSubmit,
        productTypeOptions,
        categoryOptions,
        resourceOptions,
        contentOptions,
        cardTypeOptions,
        appendOption,
        removeOption,
        fields,
        isPending,
        template,
    } = useProductForm()

    return (
        <form onSubmit={handleSubmit(submit)} className="space-y-8">
            <section className="w-full md:w-1/2 space-y-8">
                <RadioGroupField
                    text="Select Product type: "
                    name="type"
                    control={control}
                    options={productTypeOptions}
                    required
                ></RadioGroupField>
                <SelectField
                    text="Select Product category"
                    name="category"
                    control={control}
                    options={categoryOptions}
                    required
                ></SelectField>
            </section>
            <FormSection
                title="A. Cover information"
                description={`This information will appear on the 
                product cover, visible before users click to view 
                more details.`}
            >
                <FileField
                    text="Cover Image"
                    name="bannerImage"
                    hint="Max file size 2MB"
                    placeholder="Drop an image or browser from your computer, supported files includes JPG, JPEG, PNG, WEBP, GIF"
                    control={control}
                />
            </FormSection>
            <FormSection
                title="B. Product Information"
                description={`This is the information that will be 
                displayed inside the product to help customers learn 
                more about it.`}
            >
                <ConditionalRender
                    condition={template == ProductTemplateEnum.Min}
                >
                    <div className="text-center text-zinc-500 uppercase py-4">
                        This template does not support this section
                    </div>
                    <Fragment>
                        <TextField
                            text="Highlight Caption"
                            name="highlightCaption"
                            placeholder="Default value will be product name"
                            control={control}
                        />

                        <TextField
                            text="Highlight Header"
                            name="highlightTitle"
                            placeholder=""
                            control={control}
                        />

                        <TextAreaField
                            text="Highlight Summary"
                            name="highlightDescription"
                            placeholder=""
                            rows={3}
                            control={control}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TextField
                                text="Action Label"
                                name="actionLabel"
                                placeholder="E.g. Visit Watumishi Portal"
                                control={control}
                            />

                            <TextField
                                text="Action Link"
                                name="actionLink"
                                placeholder="E.g. www.example.com"
                                control={control}
                            />
                        </div>
                    </Fragment>
                </ConditionalRender>
            </FormSection>
            <FormSection
                title="C. Product Description"
                description={`This section gathers information regarding 
                product details, which includes the description, reasons 
                for acquiring the product, requirements, benefits, and 
                available options.`}
            >
                <TextField
                    text="Name"
                    name="name"
                    placeholder="e.g. Corporate Current Account"
                    control={control}
                    required
                />

                <TextAreaField
                    text="Description"
                    name="description"
                    placeholder="Write product description in details, should not exceed 400 characters"
                    rows={5}
                    control={control}
                />

                <div className="space-y-4">
                    <h4 className="text-sm font-semibold">
                        Features, Benefits, Reasons, etc
                    </h4>

                    <ul className="space-y-3">
                        {fields.map((field, index) => (
                            <li
                                className="flex items-center gap-3"
                                key={field.id}
                            >
                                <SelectField
                                    name={`contentOptions.${index}.type`}
                                    control={control}
                                    options={contentOptions}
                                    className="shrink"
                                />

                                <TextField
                                    name={`contentOptions.${index}.content`}
                                    placeholder="Write content here"
                                    control={control}
                                    className="w-3/4"
                                />

                                <ActionButton
                                    className="text-red-500 border border-zinc-200 hover:bg-transparent"
                                    onClick={() => removeOption(index)}
                                >
                                    <IconMinus className="size-4" />
                                </ActionButton>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-2">
                        <Divider axis="x" />
                        <Button
                            type="button"
                            intent="default"
                            className="border border-zinc-200 bg-transparent"
                            onClick={appendOption}
                            leftIcon={<IconPlus className="size-4" />}
                        >
                            Add Bullets
                        </Button>
                        <Divider axis="x" />
                    </div>
                </div>
            </FormSection>
            <FormSection
                title="D. Customer Interaction"
                description={`This content helps customers take the necessary next 
                steps after reviewing the product requirements. It may include forms, 
                relevant links, and exchange rate updates for specific sections.`}
            >
                <div className="flex flex-col space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SelectField
                            text="Select one component for this section:"
                            name="resourceIds"
                            control={control}
                            options={resourceOptions}
                            required
                        ></SelectField>

                        <SelectField
                            text="Select Card Type (for card products):"
                            name="cardTypeId"
                            control={control}
                            options={cardTypeOptions}
                        ></SelectField>
                    </div>

                    <ChechboxField
                        name="isPublished"
                        control={control}
                        option={{
                            label: "Check here to publish this product",
                            value: "true",
                        }}
                    />
                </div>
            </FormSection>
            <div className="flex justify-between items-center gap-8">
                <Button
                    type="button"
                    intent="tertiary"
                    leftIcon={<IconArrowNarrowLeft className="size-4" />}
                    onClick={() => navigate(-1)}
                >
                    Back
                </Button>

                <Button
                    type="submit"
                    intent="primary"
                    rightIcon={<IconArrowNarrowRight className="size-4" />}
                    loading={isPending}
                >
                    Proceed
                </Button>
            </div>
        </form>
    )
}

export default ProductFormContent
