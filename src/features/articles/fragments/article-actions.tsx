import { useDeleteArticle } from "@/features/articles/repositories/articles"
import { IconBallpen, IconEye, IconTrash } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import {
    Action,
    ContentType,
    getPermission,
} from "@/guards/access_guard/permissions"
import type { Article } from "@/features/articles/types"
import { Languages } from "@/i18n.config"

import Button from "@/components/Buttons/Button"
import useDialog from "@/components/Dialog/useDialog"
import AccessGuard from "@/guards/access_guard"

type ArticleActionProps = {
    article: Article
    locale: Languages
}

function ArticleActions({ article, locale }: ArticleActionProps) {
    const { showConfirm, close } = useDialog()
    const { mutate, isPending } = useDeleteArticle(() => close())

    const viewPermissions = getPermission(ContentType.Article, [
        Action.VIEW,
        Action.ALL,
    ])

    const editPermissions = getPermission(ContentType.Article, [
        Action.UPDATE,
        Action.ALL,
    ])

    const deletePermissions = getPermission(ContentType.Article, [
        Action.DELETE,
        Action.ALL,
    ])

    const handleDelete = () => {
        showConfirm({
            theme: "warning",
            title: "Please confirm!",
            message: `Are you sure about deleting item: ${article.title}`,
            render: () => (
                <div className="flex justify-end gap-x-4">
                    <Button intent="danger" size="sm" onClick={close}>
                        Cancel
                    </Button>
                    <Button
                        intent="primary"
                        size="sm"
                        loading={isPending}
                        onClick={() => mutate(article.id)}
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
                <Link to={`/articles/${article.id}`}>
                    <IconEye className="h-5 w-5 text-tertiary" />
                </Link>
            </AccessGuard>

            <AccessGuard permissions={editPermissions}>
                <Link to={`/articles/${article.id}/update?locale=${locale}`}>
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

export default ArticleActions
