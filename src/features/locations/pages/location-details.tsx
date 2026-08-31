import { useLocation, useNavigate } from "react-router-dom"
import { type Location } from "@/features/locations/types"
import { Modal, ModalPanel, ModalHead } from "@/components/PModal"

function LocationDetails() {
    const navigate = useNavigate()
    const location = useLocation()

    const place = location.state as Location

    const values = [
        { label: "Name", value: place?.name },
        { label: "Type", value: place?.type },
        { label: "Region", value: place?.region },
        { label: "District", value: place?.district },
        { label: "Location", value: place?.location },
        {
            label: "Geo-Coordinates",
            value: `${place?.latitude} , ${place?.longitude}`,
        },
        { label: "Phone number", value: place?.phone_number ?? "N/A" },
        {
            label: "Last updated",
            value: place?.updated_at
                ? new Date(place?.updated_at).toDateString()
                : "N/A",
        },
    ]

    const onClose = () => navigate(-1)

    return (
        <Modal isOpen={true} onClose={close}>
            <ModalPanel childClassName="w-full md:max-w-lg 2xl:max-w-md">
                <ModalHead
                    title={`${place?.type} Information`}
                    description="Detail information of agent/branch/atm"
                    onClose={onClose}
                />
                <ul className="divide-y p-5 text-xs 2xl:text-sm">
                    {values.map((item, index) => (
                        <li
                            className="flex justify-between items-center p-2"
                            key={index}
                        >
                            <span className="text-zinc-500">{item.label}</span>
                            <span className="text-right font-medium">
                                {item.value}
                            </span>
                        </li>
                    ))}
                </ul>
            </ModalPanel>
        </Modal>
    )
}

export default LocationDetails
