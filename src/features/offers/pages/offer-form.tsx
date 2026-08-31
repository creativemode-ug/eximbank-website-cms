import { IconPlus, IconMinus } from "@tabler/icons-react"

import Button from "@/components/Buttons/Button"
import ActionButton from "@/components/Buttons/action-button"
import PageHeader from "@/components/page-header"
import LocaleSwitch from "@/components/locale-switch"
import PageContainer from "@/components/page-container"
import useOfferForm from "@/features/offers/hooks/useOfferForm"
import FormSection from "@/features/products/fragments/form-section"
import TextField from "@/components/form-fields/text/text-field"
import TextAreaField from "@/components/form-fields/textarea/text-area-field"
import FileField from "@/components/form-fields/file/file-field"
import SelectField from "@/components/form-fields/select/select-field"
import Divider from "@/components/divider"

function OfferForm() {
    const {
        control,
        isPending,
        handleSubmit,
        submit,
        offerId,
        offerTypeOptions,
        cardTypesOptions,
        categoryOptions,
        descFieldArray,
        condFieldArray,
    } = useOfferForm()

    return (
        <PageContainer className="w-full">
            <PageHeader
                title={offerId ? "Edit Offer" : "Create Offer"}
                description={`Please fill every required field and ensure 
                you select correct language`}
            >
                <LocaleSwitch />
            </PageHeader>

            <Divider axis="x" />

            <form
                className="w-full md:w-2/3 mx-auto space-y-8"
                onSubmit={handleSubmit(submit)}
            >
                <section className="grid md:grid-cols-3 gap-8">
                    <SelectField
                        text="Select Offer Type"
                        name="type"
                        control={control}
                        options={offerTypeOptions}
                        required
                    ></SelectField>
                    <SelectField
                        text="Select Offer Category"
                        name="categoryId"
                        control={control}
                        options={categoryOptions}
                        required
                    ></SelectField>
                    <SelectField
                        text="Select Card Type"
                        name="cardType"
                        control={control}
                        options={cardTypesOptions}
                        required
                    ></SelectField>
                </section>

                <FormSection
                    title="A. Offer Information"
                    description={`This information will appear on the 
                    offer cover, visible before users click to view 
                    more details.`}
                >
                    <FileField
                        text="Cover Image"
                        name="image"
                        hint="Max file size 2MB - (600x600)"
                        placeholder="Drop an image or browser from your computer, supported files includes JPG, JPEG, PNG, WEBP, GIF"
                        control={control}
                    />

                    <TextField
                        text="Title"
                        name="title"
                        placeholder="Offer type e.g. Unlock Premium Fitness"
                        control={control}
                        required
                    />

                    <TextField
                        text="Caption"
                        name="caption"
                        placeholder="e.g. Enjoy world class premium fitness facilities"
                        control={control}
                        required
                    />

                    <TextAreaField
                        text="How to Redeem"
                        name="redeem"
                        rows={3}
                        control={control}
                        required
                    />
                </FormSection>

                <FormSection
                    title="B. Descriptions and conditions"
                    description={`This is the information that will be 
                    displayed inside the offer to help customers learn 
                    more about it.`}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField
                            type="number"
                            text="Discount (%)"
                            name="discount"
                            placeholder="18"
                            control={control}
                        />

                        <TextField
                            text="Action Label"
                            name="action_label"
                            placeholder="E.g. Visit Portal"
                            control={control}
                        />

                        <TextField
                            text="Action Link"
                            name="action_link"
                            placeholder="E.g. www.example.com"
                            control={control}
                        />
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Descriptions</h4>

                        <ul className="space-y-3">
                            {descFieldArray.fields.map((field, index) => (
                                <li
                                    className="flex items-center gap-3"
                                    key={field.id}
                                >
                                    <TextField
                                        name={`descriptions.${index}.content`}
                                        placeholder="Write content here"
                                        control={control}
                                        className="w-full"
                                    />

                                    <ActionButton
                                        className="text-red-500 border border-zinc-200 hover:bg-transparent"
                                        onClick={() =>
                                            descFieldArray.remove(index)
                                        }
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
                                onClick={() =>
                                    descFieldArray.append({ content: "" })
                                }
                                leftIcon={<IconPlus className="size-4" />}
                            >
                                Add Descriptions
                            </Button>
                            <Divider axis="x" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Conditions</h4>

                        <ul className="space-y-3">
                            {condFieldArray.fields.map((field, index) => (
                                <li
                                    className="flex items-center gap-3"
                                    key={field.id}
                                >
                                    <TextField
                                        name={`conditions.${index}.content`}
                                        placeholder="Write content here"
                                        control={control}
                                        className="w-full"
                                    />

                                    <ActionButton
                                        className="text-red-500 border border-zinc-200 hover:bg-transparent"
                                        onClick={() =>
                                            condFieldArray.remove(index)
                                        }
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
                                onClick={() =>
                                    condFieldArray.append({ content: "" })
                                }
                                leftIcon={<IconPlus className="size-4" />}
                            >
                                Add Conditions
                            </Button>
                            <Divider axis="x" />
                        </div>
                    </div>
                </FormSection>

                <div>
                    <Button type="submit" intent="primary" loading={isPending}>
                        Save changes
                    </Button>
                </div>
            </form>
        </PageContainer>
    )
}

export default OfferForm
