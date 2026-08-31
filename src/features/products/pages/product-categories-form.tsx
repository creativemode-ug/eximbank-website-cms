import { Modal, ModalPanel, ModalHead } from "@/components/PModal"

import Button from "@/components/Buttons/Button"
import LocaleSwitch from "@/components/locale-switch"
import TextField from "@/components/form-fields/text/text-field"
import TextAreaField from "@/components/form-fields/textarea/text-area-field"
import FileInput from "@/components/FormControlls/FileInput"
import useProductCategoriesForm from "@/features/products/hooks/useProductCategoriesForm"

function ProductCategoriesForm() {
    const {
        control,
        errors,
        isPending,
        handleClose,
        handleSubmit,
        setValue,
        submit,
        productCategoryId,
    } = useProductCategoriesForm()

    return (
        <Modal isOpen={true} onClose={handleClose}>
            <ModalPanel childClassName="w-full md:max-w-xl">
                <ModalHead
                    title={`${
                        productCategoryId ? "Edit" : "Create"
                    } Product Category`}
                    onClose={handleClose}
                >
                    <LocaleSwitch />
                </ModalHead>
                <div className="p-8">
                    <form className="space-y-8" onSubmit={handleSubmit(submit)}>
                        <div className="space-y-4">
                            <FileInput
                                label="Cover image"
                                placeholder="Upload image files here"
                                formats="JPG, JPEG, PNG, WEBP, GIF"
                                hasError={errors.banner_image?.type != null}
                                error={errors.banner_image?.message?.toString()}
                                onChange={(value: unknown) =>
                                    setValue("banner_image", value)
                                }
                                required
                            />

                            <TextField
                                text="Name"
                                name="name"
                                placeholder="E.g. Accounts"
                                control={control}
                                required
                            />

                            <TextField
                                text="Headline"
                                name="head_line"
                                placeholder="E.g. Tailored Solutions For Every Financial Chapter"
                                control={control}
                                required
                            />

                            <TextAreaField
                                text="Description"
                                name="description"
                                placeholder="Describe what category is all about"
                                rows={3}
                                control={control}
                                required
                            />

                            <div className="grid md:grid-cols-2 gap-4">
                                <TextField
                                    text="Action Label"
                                    name="action_label"
                                    placeholder="E.g. Open an account"
                                    control={control}
                                />

                                <TextField
                                    text="Action Link"
                                    name="action_link"
                                    placeholder="E.g. /personal/accounts"
                                    control={control}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            intent="primary"
                            loading={isPending}
                        >
                            Save changes
                        </Button>
                    </form>
                </div>
            </ModalPanel>
        </Modal>
    )
}

export default ProductCategoriesForm
