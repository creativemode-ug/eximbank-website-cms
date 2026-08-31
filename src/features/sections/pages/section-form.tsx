import useSectionForm from "@/features/sections/hooks/useSectionForm"
import Button from "@/components/Buttons/Button"
import PageHeader from "@/components/page-header"
import SwitchInput from "@/components/FormControlls/SwitchInput"
import TextField from "@/components/form-fields/text/text-field"
import TextAreaField from "@/components/form-fields/textarea/text-area-field"
import FileField from "@/components/form-fields/file/file-field"
import SelectField from "@/components/form-fields/select/select-field"
import LocaleSwitch from "@/components/locale-switch"
import FormSection from "@/features/products/fragments/form-section"
import PageContainer from "@/components/page-container"

function SectionForm() {
    const {
        control,
        handleSubmit,
        submit,
        setValue,
        sectionTypeOptions,
        placementOptions,
        isPending,
        isPublished,
        sectionId,
    } = useSectionForm()

    return (
        <PageContainer className="w-full space-y-8">
            <PageHeader
                title={sectionId ? "Edit Section" : "Create Section"}
                description={`Use this form to create or update call-to-action 
                items and carousels. Make sure to fill in all required fields.`}
                className="pb-5 border-b"
            >
                <LocaleSwitch />
            </PageHeader>

            <form
                className="w-full md:w-4/5 lg:w-3/5 mx-auto space-y-8"
                onSubmit={handleSubmit(submit)}
            >
                <section className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
                    <SelectField
                        text="Section Type"
                        name="type"
                        control={control}
                        options={sectionTypeOptions}
                        required
                    />

                    <SelectField
                        text="Section Placement"
                        name="placement"
                        control={control}
                        options={placementOptions}
                        required
                    />
                </section>
                <FormSection
                    title="A. Section information"
                    description={`This information will be visible to viewers 
                    / public. Includes the image and other details`}
                >
                    <FileField
                        text="Cover Image"
                        name="image"
                        hint="Max file size 2MB"
                        placeholder="Drop an image or browser from your computer, supported files includes JPG, JPEG, PNG, WEBP, GIF"
                        control={control}
                    />

                    <TextField
                        text="Caption"
                        name="sub_title"
                        control={control}
                        required
                    />

                    <TextField
                        text="Title"
                        name="title"
                        hint="max 80 characters"
                        control={control}
                        required
                    />

                    <TextAreaField
                        text="Description"
                        name="description"
                        hint="max 200 characters"
                        control={control}
                        rows={8}
                        required
                    />

                    <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
                        <TextField
                            type="text"
                            text="Action Label"
                            name="action_label"
                            control={control}
                        />

                        <TextField
                            type="text"
                            text="Action Link"
                            name="action_link"
                            control={control}
                        />
                    </div>
                </FormSection>

                <FormSection
                    title="B. Visibilty"
                    description={`This section provide control on when the 
                    section should be visible in terms of date and control publishing`}
                >
                    <div className="grid md:grid-cols-2 items-start gap-8">
                        <TextField
                            type="date"
                            text="Start Date"
                            name="start_date"
                            control={control}
                        />

                        <TextField
                            type="date"
                            text="End Date"
                            name="end_date"
                            control={control}
                        />

                        <SwitchInput
                            value={isPublished == 1 ? true : false}
                            text="Publish"
                            onChange={value =>
                                setValue("is_published", value ? 1 : 0)
                            }
                        />
                    </div>
                </FormSection>

                <section className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
                    <Button type="reset" intent="default" size="md">
                        Reset
                    </Button>
                    <Button
                        type="submit"
                        intent="primary"
                        size="md"
                        loading={isPending}
                    >
                        Save changes
                    </Button>
                </section>
            </form>
        </PageContainer>
    )
}

export default SectionForm
