import { Modal, ModalPanel, ModalHead } from "@/components/PModal"

import Button from "@/components/Buttons/Button"
import TextField from "@/components/form-fields/text/text-field"
import EditorField from "@/components/form-fields/editor/editor-field"
import SwitchField from "@/components/form-fields/switch/switch-field"
import LocaleSwitch from "@/components/locale-switch"
import useFaqForm from "@/features/faq/hooks/useFaqForm"

function FaqForm() {
    const { control, submit, handleClose, handleSubmit, isPending, faqId } =
        useFaqForm()

    return (
        <Modal isOpen={true} onClose={handleClose}>
            <ModalPanel childClassName="w-full md:max-w-2xl">
                <ModalHead
                    title={`${faqId ? "Edit" : "Create"} FAQ`}
                    description="Please fill every required field"
                    onClose={handleClose}
                >
                    <LocaleSwitch />
                </ModalHead>
                <form onSubmit={handleSubmit(submit)} className="p-8 space-y-8">
                    <div className="space-y-4">
                        <TextField
                            text="Question"
                            name="question"
                            control={control}
                            required
                        />

                        <EditorField
                            text="Answer"
                            name="answer"
                            control={control}
                            required
                        />

                        <SwitchField
                            control={control}
                            name="is_published"
                            text="Publish"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            type="button"
                            intent="default"
                            size="md"
                            disabled={isPending}
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
            </ModalPanel>
        </Modal>
    )
}

export default FaqForm
