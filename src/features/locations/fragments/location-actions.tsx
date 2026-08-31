import { useNavigate } from "react-router-dom"
import { IconBallpen, IconEye, IconTrash } from "@tabler/icons-react"
import { useDeleteLocation } from "@/features/locations/repositories/locations"
import type { Location } from "@/features/locations/types"
import {
    Action,
    ContentType,
    getPermission,
} from "@/guards/access_guard/permissions"

import Button from "@/components/Buttons/Button"
import useDialog from "@/components/Dialog/useDialog"
import AccessGuard from "@/guards/access_guard"

type Props = {
    location: Location
}

function LocationActions({ location }: Props) {
    const navigate = useNavigate()

    const { showConfirm, close } = useDialog()
    const { mutate, isPending } = useDeleteLocation(() => close())

    const editPermissions = getPermission(ContentType.Metric, [
        Action.UPDATE,
        Action.ALL,
    ])

    const deletePermissions = getPermission(ContentType.Metric, [
        Action.DELETE,
        Action.ALL,
    ])

    const handleDelete = () => {
        showConfirm({
            theme: "warning",
            title: "Please confirm!",
            message: `Are you sure about deleting item: ${location.id}`,
            render: () => (
                <div className="flex justify-end gap-x-4">
                    <Button intent="danger" size="sm" onClick={close}>
                        Cancel
                    </Button>
                    <Button
                        intent="primary"
                        size="sm"
                        loading={isPending}
                        onClick={() => mutate(location.id)}
                    >
                        Continue
                    </Button>
                </div>
            ),
        })
    }

    const handleEdit = () =>
        navigate(`${location.id}/update`, {
            state: location,
        })

    const handleView = () =>
        navigate(`${location.id}`, {
            state: location,
        })

    return (
        <div className="flex items-center gap-3">
            <AccessGuard permissions={editPermissions}>
                <button onClick={handleEdit}>
                    <IconBallpen className="h-5 w-5 text-tertiary" />
                </button>
            </AccessGuard>

            <AccessGuard permissions={editPermissions}>
                <button onClick={handleView}>
                    <IconEye className="h-5 w-5 text-tertiary" />
                </button>
            </AccessGuard>

            <AccessGuard permissions={deletePermissions}>
                <button onClick={handleDelete}>
                    <IconTrash className="h-5 w-5 text-tertiary" />
                </button>
            </AccessGuard>
        </div>
    )
}

export default LocationActions
