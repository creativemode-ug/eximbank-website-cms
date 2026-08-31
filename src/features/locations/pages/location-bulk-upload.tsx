import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { IconCloudUpload } from "@tabler/icons-react"
import {
    LocationResponse,
    LocationTypes,
    UploadSchema,
    type TypeUploadSchema,
} from "@/features/locations/types"
import { useLocationUpload } from "@/features/locations/repositories/locations"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { Modal, ModalPanel, ModalHead } from "@/components/PModal"

import Button from "@/components/Buttons/Button"
import SelectField from "@/components/form-fields/select/select-field"
import SwitchField from "@/components/form-fields/switch/switch-field"
import FileField from "@/components/form-fields/file/file-field"
import LocationErrors from "@/features/locations/fragments/location-errors"

export default function LocationForm() {
    const navigate = useNavigate()
    const [failure, setFailure] = useState<LocationResponse | undefined>(
        undefined
    )

    const { control, handleSubmit, watch } = useForm({
        resolver: yupResolver(UploadSchema),
        defaultValues: {
            delete_all: false,
        },
    })

    const { mutate, isPending } = useLocationUpload(value => {
        if (value.success && (!value.failed_rows || value.failed_rows.length === 0)) {
            navigate(-1)
        } else {
            setFailure(value)
        }
    })

    const submit = (data: TypeUploadSchema) => {
        const formData = new FormData()
        formData.append("type", data.type)
        formData.append("delete_all", data.delete_all ? "1" : "0")

        if (data.document) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            formData.append("file", data.document[0])
        }
        mutate(formData)
    }

    const locationTypeOptions = LocationTypes.map(i => ({
        label: i.toUpperCase(),
        value: i.toLowerCase(),
    }))
    const selectedType = watch("type")

    const handleClose = () => {
        navigate(-1)
    }

    return (
        <Modal isOpen={true} onClose={handleClose}>
            <ModalPanel childClassName="w-full md:max-w-lg">
                <ModalHead
                    title="Bulk Upload Location Data"
                    description="Fill every required field"
                    onClose={handleClose}
                />
                <div className="p-8 space-y-4">
                    {failure && <LocationErrors failures={failure} />}
                    <form onSubmit={handleSubmit(submit)} className="space-y-8">
                        <div className="space-y-4">
                            <SelectField
                                text="Select Type"
                                name="type"
                                control={control}
                                options={locationTypeOptions}
                                required
                            />

                            <FileField
                                text="Compliance document"
                                name="document"
                                hint="Max file size 2MB"
                                placeholder="Drop an document or browser from your computer, supported files includes xls, xlxs"
                                control={control}
                            />
                            <SwitchField
                                text={
                                    selectedType
                                        ? `Delete all existing ${selectedType.toUpperCase()}`
                                        : "Delete all existing records for selected type"
                                }
                                name="delete_all"
                                control={control}
                            />

                            <div className="flex justify-end">
                                <a
                                    href="https://www.eximbank.co.tz/templates/locations-template.xlsx"
                                    className="flex items-center gap-2 text-xs text-tertiary italic hover:text-primary"
                                    download="location-template.xlsx"
                                >
                                    <IconCloudUpload size={16} />
                                    <span>download sample file</span>
                                </a>
                            </div>
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
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </ModalPanel>
        </Modal>
    )
}
