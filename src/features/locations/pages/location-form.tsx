import { Modal, ModalPanel, ModalHead } from "@/components/PModal"

import Button from "@/components/Buttons/Button"
import Hide from "@/components/hide"
import TextField from "@/components/form-fields/text/text-field"
import SelectField from "@/components/form-fields/select/select-field"
import SwitchField from "@/components/form-fields/switch/switch-field"
import useLocationForm from "@/features/locations/hooks/useLocationForm"


function LocationForm() {
    const {
        control,
        submit,
        handleSubmit,
        handleClose,
        locationTypeOptions,
        regionOptions,
        districtOptions,
        isPending,
        selectedRegion,
        place,
    } = useLocationForm()

    return (
        <Modal isOpen={true} onClose={handleClose}>
            <ModalPanel childClassName="w-full md:max-w-xl">
                <ModalHead
                    title={place ? "Edit Locations" : "Create Locations"}
                    description="Please fill every required field"
                    onClose={handleClose}
                />
                <form onSubmit={handleSubmit(submit)} className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-x-8 mb-8">
                        <TextField
                            text="Name"
                            name="name"
                            control={control}
                            required
                        />

                        <SelectField
                            text="Select Type"
                            name="type"
                            control={control}
                            options={locationTypeOptions}
                            required
                        />

                        <SelectField
                            text="Region"
                            name="region"
                            control={control}
                            options={regionOptions()}
                            required
                        />

                        <Hide condition={!selectedRegion}>
                            <SelectField
                                text="District"
                                name="district"
                                control={control}
                                options={districtOptions(selectedRegion)}
                                required
                            />
                        </Hide>

                        <TextField
                            text="Location"
                            name="location"
                            control={control}
                            required
                        />

                        <TextField
                            text="Phone number"
                            name="phone_number"
                            control={control}
                            required
                        />

                        <TextField
                            text="Latitude"
                            name="latitude"
                            control={control}
                            required
                        />

                        <TextField
                            text="Longitude"
                            name="longitude"
                            control={control}
                            required
                        />

                        <SwitchField
                            control={control}
                            name={"is_published"}
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
                            size="md"
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

export default LocationForm
