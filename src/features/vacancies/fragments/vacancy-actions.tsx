import { useDeleteVacancy } from "@/features/vacancies/repositories"
import { IconBallpen, IconEye, IconTrash } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import {
    Action,
    ContentType,
    getPermission,
} from "@/guards/access_guard/permissions"
import type { Vacancy } from "@/features/vacancies/types"
import { Languages } from "@/i18n.config"

import Button from "@/components/Buttons/Button"
import useDialog from "@/components/Dialog/useDialog"
import AccessGuard from "@/guards/access_guard"

type vacancyActionProps = {
    vacancy: Vacancy
    locale: Languages
}

function VacancyActions({ vacancy, locale }: vacancyActionProps) {
    const { showConfirm, close } = useDialog()
    const { mutate, isPending } = useDeleteVacancy(() => close())

    const editPermissions = getPermission(ContentType.Position, [
        Action.UPDATE,
        Action.ALL,
    ])
    const deletePermissions = getPermission(ContentType.Position, [
        Action.DELETE,
        Action.ALL,
    ])
    const viewPermissions = getPermission(ContentType.Position, [
        Action.VIEW,
        Action.ALL,
    ])

    const handleDelete = () => {
        showConfirm({
            theme: "warning",
            title: "Please confirm!",
            message: `Are you sure about deleting item: ${vacancy.title}`,
            render: () => (
                <div className="flex justify-end gap-x-4">
                    <Button intent="danger" size="sm" onClick={close}>
                        Cancel
                    </Button>
                    <Button
                        intent="primary"
                        size="sm"
                        loading={isPending}
                        onClick={() => mutate(vacancy.id)}
                    >
                        Continue
                    </Button>
                </div>
            ),
        })
    }

    return (
        <div className="flex items-center gap-3">
            <AccessGuard permissions={viewPermissions}>
                <Link to={`/positions/${vacancy.id}`}>
                    <IconEye className="h-5 w-5 text-tertiary" />
                </Link>
            </AccessGuard>

            <AccessGuard permissions={editPermissions}>
                <Link to={`/positions/${vacancy.id}/update?locale=${locale}`}>
                    <IconBallpen className="h-5 w-5 text-tertiary" />
                </Link>
            </AccessGuard>

            <AccessGuard permissions={deletePermissions}>
                <button onClick={handleDelete}>
                    <IconTrash className="h-5 w-5 text-tertiary" />
                </button>
            </AccessGuard>
        </div>
    )
}

export default VacancyActions
