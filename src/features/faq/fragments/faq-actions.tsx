import { useNavigate } from "react-router-dom"
import { IconBallpen, IconTrash } from "@tabler/icons-react"
import { Faq } from "@/features/faq/types"
import { useDeleteFaq } from "@/features/faq/repositories/faqs"
import AccessGuard from "@/guards/access_guard"
import {
    Action,
    ContentType,
    getPermission,
} from "@/guards/access_guard/permissions"

import Button from "@/components/Buttons/Button"
import useDialog from "@/components/Dialog/useDialog"

type Props = {
    faq: Faq
}

function FaqActions({ faq }: Props) {
    const navigate = useNavigate()

    const editPermissions = getPermission(ContentType.Faq, [
        Action.UPDATE,
        Action.ALL,
    ])
    const deletePermissions = getPermission(ContentType.Faq, [
        Action.DELETE,
        Action.ALL,
    ])

    const { showConfirm, close } = useDialog()
    const { mutate, isPending } = useDeleteFaq(() => close())

    const handleEdit = () =>
        navigate(`${faq.id}/update`, {
            state: faq,
        })

    const handleDelete = () => {
        showConfirm({
            theme: "warning",
            title: "Please confirm!",
            message: `Are you sure about deleting item: ${faq.id}`,
            render: () => (
                <div className="flex justify-end gap-x-4">
                    <Button intent="danger" size="sm" onClick={close}>
                        Cancel
                    </Button>
                    <Button
                        intent="primary"
                        size="sm"
                        loading={isPending}
                        onClick={() => mutate(faq.id)}
                    >
                        Continue
                    </Button>
                </div>
            ),
        })
    }

    return (
        <div className="flex items-center gap-3">
            <AccessGuard permissions={editPermissions}>
                <button onClick={handleEdit}>
                    <IconBallpen className="h-5 w-5 text-tertiary" />
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

export default FaqActions
