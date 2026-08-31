import { Modal, ModalPanel, ModalHead } from "@/components/PModal"

import Button from "@/components/Buttons/Button"
import TextField from "@/components/form-fields/text/text-field"
import TextAreaField from "@/components/form-fields/textarea/text-area-field"
import useCardTypeForm from "@/features/products/hooks/useCardTypeForm"

function CardTypeForm() {
    const {
        control,
        isPending,
        handleClose,
        handleSubmit,
        submit,
        cardTypeId,
    } = useCardTypeForm()

    return (
        <Modal isOpen={true} onClose={handleClose}>
            <ModalPanel childClassName="w-full md:max-w-lg">
                <ModalHead
                    title={`${cardTypeId ? "Edit" : "Create"} Card Type`}
                    onClose={handleClose}
                ></ModalHead>
                <div className="p-8">
                    <form className="space-y-8" onSubmit={handleSubmit(submit)}>
                        <div className="space-y-4">
                            <TextField
                                text="Name"
                                name="name"
                                placeholder="E.g. Debit Card"
                                control={control}
                                required
                            />

                            <TextAreaField
                                text="Description"
                                name="description"
                                placeholder="E.g. Lorem ipsum"
                                control={control}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <Button
                                type="button"
                                intent="default"
                                size="md"
                                className="bg-transparent text-primary border border-primary"
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                intent="primary"
                                loading={isPending}
                            >
                                Save changes
                            </Button>
                        </div>
                    </form>
                </div>
            </ModalPanel>
        </Modal>
    )
}

export default CardTypeForm
