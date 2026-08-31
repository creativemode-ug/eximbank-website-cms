import Button from "@/components/Buttons/Button"
import ChechboxField from "@/components/form-fields/checkbox-group/checkbox-field"
import EditorField from "@/components/form-fields/editor/editor-field"
import FileField from "@/components/form-fields/file/file-field"
import SelectField from "@/components/form-fields/select/select-field"
import TextField from "@/components/form-fields/text/text-field"
import TextAreaField from "@/components/form-fields/textarea/text-area-field"
import PageContainer from "@/components/page-container"
import useVacancyForm from "@/features/vacancies/hooks/useVacancyForm"
import LocaleSwitch from "@/components/locale-switch"
import PageHeader from "@/components/page-header"
import FormSection from "@/features/products/fragments/form-section"

export default function VacancyForm() {
    const {
        control,
        handleClose,
        handleSubmit,
        submit,
        isPending,
        vacancyId,
        typeOptions,
        contractOptions,
    } = useVacancyForm()

    return (
        <PageContainer>
            <PageHeader
                title={vacancyId ? "Edit Vacancy" : "Create Vacancy"}
                description={`Use this form to create or update vacancy. 
                Make sure to fill in all required fields.`}
                className="pb-5 border-b"
            >
                <LocaleSwitch />
            </PageHeader>

            <form
                className="space-y-12 w-full md:w-3/5 mx-auto"
                onSubmit={handleSubmit(submit)}
            >
                <FormSection
                    title="A. Basic information"
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
                        text="Title"
                        name="title"
                        control={control}
                        required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField
                            type="date"
                            text="Deadline"
                            name="deadline"
                            control={control}
                            required
                        />

                        <TextField
                            text="Link"
                            name="link"
                            control={control}
                            required
                        />

                        <TextField
                            text="Location"
                            name="location"
                            control={control}
                            required
                        />
                    </div>

                    <TextAreaField
                        text="Summary"
                        name="summary"
                        control={control}
                        rows={4}
                        required
                    />
                </FormSection>
                <FormSection
                    title="B. Vacancy Description"
                    description={`This section contains detailed description of the vacancy`}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SelectField
                            text="Vacancy Type"
                            name="type"
                            control={control}
                            options={typeOptions}
                            required
                        />

                        <SelectField
                            text="Contract Type"
                            name="contractType"
                            control={control}
                            options={contractOptions}
                            required
                        />
                    </div>

                    <EditorField
                        text="Content"
                        name="description"
                        control={control}
                        required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ChechboxField
                            name="isPublished"
                            control={control}
                            option={{
                                label: "Check here to publish this vacancy",
                                value: "true",
                            }}
                        />
                    </div>
                </FormSection>
                <div className="flex justify-end gap-4">
                    <Button
                        type="button"
                        intent="primary"
                        onClick={handleClose}
                        className="min-w-36 text-primary font-medium bg-white hover:bg-white border border-primary"
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        intent="primary"
                        loading={isPending}
                        className="min-w-36"
                    >
                        Save Changes
                    </Button>
                </div>
            </form>
        </PageContainer>
    )
}
