import { IconCloudUpload } from "@tabler/icons-react"
import { getComplianceExcel } from "@/features/compliances/repositories/compliances"
import { Modal, ModalPanel, ModalHead } from "@/components/PModal"

import Button from "@/components/Buttons/Button"
import FileField from "@/components/form-fields/file/file-field"
import SelectField from "@/components/form-fields/select/select-field"
import useComplianceForm from "@/features/compliances/hooks/useComplianceForm"

function ComplianceImportForm() {
    const {
        control,
        complianceTypeOptions,
        isPending,
        submit,
        handleSubmit,
        handleClose,
    } = useComplianceForm()

    return (
        <Modal isOpen={true} onClose={handleClose}>
            <ModalPanel childClassName="w-full md:max-w-xl">
                <ModalHead
                    title={"Compliance Import Form"}
                    description="Fill every required field"
                    onClose={handleClose}
                />
                <form onSubmit={handleSubmit(submit)} className="p-8 space-y-8">
                    <div className="space-y-4">
                        <SelectField
                            text="Select Type"
                            name="type"
                            control={control}
                            options={complianceTypeOptions}
                            required
                        />

                        <FileField
                            text="Compliance document"
                            name="document"
                            hint="Max file size 2MB"
                            placeholder="Drop an document or browser from your computer, supported files includes xls, xlxs"
                            control={control}
                        />
                    </div>

                    <div className="flex justify-end">
                        <a
                            href="#"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs text-tertiary italic hover:text-primary"
                            onClick={getComplianceExcel}
                        >
                            <IconCloudUpload size={16} />
                            <span>download sample file</span>
                        </a>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            type="button"
                            intent="default"
                            disabled={isPending}
                            onClick={handleClose}
                            size="md"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            intent="primary"
                            loading={isPending}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </ModalPanel>
        </Modal>
    )
}

export default ComplianceImportForm
