import Button from "@/components/Buttons/Button"
import ChechboxField from "@/components/form-fields/checkbox-group/checkbox-field"
import EditorField from "@/components/form-fields/editor/editor-field"
import FileField from "@/components/form-fields/file/file-field"
import SelectField from "@/components/form-fields/select/select-field"
import TextField from "@/components/form-fields/text/text-field"
import LocaleSwitch from "@/components/locale-switch"
import PageContainer from "@/components/page-container"
import PageHeader from "@/components/page-header"
import useArticleForm from "@/features/articles/hooks/useArticleForm"
import FormSection from "@/features/products/fragments/form-section"

const ArticleForm = () => {
    const {
        control,
        handleSubmit,
        handleClose,
        submit,
        isPending,
        articleId,
        articleTypeOptions,
    } = useArticleForm()

    return (
        <PageContainer>
            <PageHeader
                title={articleId ? "Edit Article" : "Create Article"}
                description={`Use this form to create or update article. 
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
                    title="A. Article information"
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <SelectField
                            text="Article Type"
                            name="type"
                            control={control}
                            options={articleTypeOptions}
                            required
                        />

                        <TextField
                            type="number"
                            text="Read Time (Minutes)"
                            name="readTime"
                            control={control}
                            required
                        />
                    </div>

                    <EditorField
                        text="Content"
                        name="description"
                        control={control}
                        required
                    />
                </FormSection>
                <FormSection
                    title="B. Visibilty"
                    description={`This section provide control on when the 
                    section should be visible in terms of priority and control publishing`}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ChechboxField
                            name="priority"
                            control={control}
                            option={{
                                label: "Check to mark as top story",
                                value: "true",
                            }}
                        />

                        <ChechboxField
                            name="isPublished"
                            control={control}
                            option={{
                                label: "Check here to publish this article",
                                value: "true",
                            }}
                        />
                    </div>
                </FormSection>

                {/* <EditorInput
                        className="md:col-span-2"
                        label="Article content"
                        hasError={errors.description?.type != null}
                        error={errors.description?.message?.toString()}
                        default={article?.data.description}
                        onChange={value => setValue("description", value)}
                        required
                    />

                    <SwitchInput
                        value={watch("priority", 0) == 1 ? true : false}
                        text="Check to mark as top story"
                        onChange={value => setValue("priority", value ? 1 : 0)}
                    />

                    <SwitchInput
                        value={watch("is_published", 0) == 1 ? true : false}
                        text="Publish"
                        onChange={value =>
                            setValue("is_published", value ? 1 : 0)
                        }
                    /> */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button
                        type="button"
                        intent="primary"
                        size="md"
                        onClick={handleClose}
                        className="text-primary font-medium bg-white hover:bg-white border border-primary"
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        intent="primary"
                        size="md"
                        className="w-full"
                        loading={isPending}
                    >
                        Save Changes
                    </Button>
                </div>
            </form>
        </PageContainer>
    )
}

export default ArticleForm
