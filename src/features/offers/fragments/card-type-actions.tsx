import {
    Action,
    ContentType,
    getPermission,
} from "@/guards/access_guard/permissions"
import { Link } from "react-router-dom"
import { IconBallpen, IconTrash } from "@tabler/icons-react"
import { CardType } from "@/features/offers/types"
import { Languages } from "@/i18n.config"
import { useDeleteCardType } from "@/features/offers/repositories/card-types"

import AccessGuard from "@/guards/access_guard"
import Button from "@/components/Buttons/Button"
import useDialog from "@/components/Dialog/useDialog"

type CardTypeProps = {
    cardType: CardType
    locale: Languages
}

function CardTypeActions({ cardType, locale }: CardTypeProps) {
    const { showConfirm, close } = useDialog()

    const { mutate, isPending } = useDeleteCardType(() => close())

    const editPermissions = getPermission(ContentType.Product, [
        Action.UPDATE,
        Action.ALL,
    ])
    const deletePermissions = getPermission(ContentType.Product, [
        Action.DELETE,
        Action.ALL,
    ])

    const handleDelete = () => {
        showConfirm({
            theme: "warning",
            title: "Please confirm!",
            message: `Are you sure about deleting item: ${cardType.name}`,
            render: () => (
                <div className="flex justify-end gap-x-4">
                    <Button intent="danger" size="sm" onClick={close}>
                        Cancel
                    </Button>
                    <Button
                        intent="primary"
                        size="sm"
                        loading={isPending}
                        onClick={() => mutate(cardType.id)}
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
                <Link
                    to={`/offers-and-perks/card-types/${cardType.id}/update?locale=${locale}`}
                >
                    <IconBallpen className="size-5 text-tertiary" />
                </Link>
            </AccessGuard>

            <AccessGuard permissions={deletePermissions}>
                <button onClick={handleDelete}>
                    <IconTrash className="size-5 text-tertiary" />
                </button>
            </AccessGuard>
        </div>
    )
}

export default CardTypeActions
