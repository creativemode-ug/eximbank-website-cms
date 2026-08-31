import { Modal, ModalPanel, ModalHead } from "@/components/PModal"

import Button from "@/components/Buttons/Button"
import LocaleSwitch from "@/components/locale-switch"
import TextField from "@/components/form-fields/text/text-field"
import SelectField from "@/components/form-fields/select/select-field"
import useResourceForm from "@/features/products/hooks/useProductResourceForm"
import ConditionalRender from "@/components/conditional-render"
import Hide from "@/components/hide"

function ProductResourceForm() {
    const {
        control,
        isPending,
        handleClose,
        handleSubmit,
        submit,
        resourceId,
        resourceOptions,
        resourceFormOptions,
        resourceTypeValue,
        isForm,
    } = useResourceForm()

    return (
        <Modal isOpen={true} onClose={handleClose}>
            <ModalPanel childClassName="w-full md:max-w-lg">
                <ModalHead
                    title={`${resourceId ? "Edit" : "Create"} Resource`}
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
                                placeholder="E.g. How to Open an account"
                                control={control}
                                required
                            />

                            <SelectField
                                text="Resource Type"
                                name="type"
                                control={control}
                                options={resourceOptions}
                                required
                            />

                            <Hide condition={resourceTypeValue == undefined}>
                                <ConditionalRender condition={isForm}>
                                    <SelectField
                                        text="Select form type"
                                        name="reference"
                                        control={control}
                                        options={resourceFormOptions}
                                    />
                                    <TextField
                                        text="Link"
                                        name="reference"
                                        placeholder="E.g. "
                                        control={control}
                                    />
                                </ConditionalRender>
                            </Hide>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <Button
                                type="button"
                                intent="default"
                                size="md"
                                className="bg-transparent text-primary border border-primary"
                                onClick={() => {}}
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

export default ProductResourceForm
