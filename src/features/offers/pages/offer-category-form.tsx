import { Modal, ModalPanel, ModalHead } from "@/components/PModal"

import Button from "@/components/Buttons/Button"
import LocaleSwitch from "@/components/locale-switch"
import TextField from "@/components/form-fields/text/text-field"
import TextAreaField from "@/components/form-fields/textarea/text-area-field"
import useOfferCategoryForm from "@/features/offers/hooks/useOfferCategoryForm"

function OfferCategoriesForm() {
    const {
        control,
        isPending,
        handleClose,
        handleSubmit,
        submit,
        categoryId,
    } = useOfferCategoryForm()

    return (
        <Modal isOpen={true} onClose={handleClose}>
            <ModalPanel childClassName="w-full md:max-w-xl">
                <ModalHead
                    title={`${categoryId ? "Edit" : "Create"} Product Category`}
                    onClose={handleClose}
                >
                    <LocaleSwitch />
                </ModalHead>
                <div className="p-8">
                    <form className="space-y-8" onSubmit={handleSubmit(submit)}>
                        <div className="space-y-4">
                            <TextField
                                text="Name"
                                name="name"
                                placeholder="E.g. Accounts"
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

export default OfferCategoriesForm
