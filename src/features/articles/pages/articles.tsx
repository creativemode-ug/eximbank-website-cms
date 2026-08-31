import { IconPlus } from "@tabler/icons-react"
import { useGetArticles } from "@/features/articles/repositories/articles"
import { Outlet, useNavigate } from "react-router-dom"
import { ArticleOptions } from "@/features/articles/types"
import {
    Action,
    ContentType,
    getPermission,
} from "@/guards/access_guard/permissions"
import { useSearchParamState } from "@/hooks/useSearchParamState"
import { useEmptyState } from "@/components/empty-state"

import Pagination from "@/components/pagination"
import ArticleColumns from "@/features/articles/fragments/article-columns"
import ArticleActions from "@/features/articles/fragments/article-actions"
import Button from "@/components/Buttons/Button"
import Table from "@/components/Table/Table"
import AccessGuard from "@/guards/access_guard"
import LocaleSwitch from "@/components/locale-switch"
import PageHeader from "@/components/page-header"

function Articles() {
    const navigate = useNavigate()

    const { paramState } = useSearchParamState<ArticleOptions>({ page: 1 })

    const { articles, isLoading } = useGetArticles({
        page: paramState.page ?? 1,
        per_page: 10,
        locale: paramState.locale,
    })

    const handleCreate = () => navigate(`/articles/create`)

    const createPermissions = getPermission(ContentType.Article, [
        Action.CREATE,
        Action.ALL,
    ])

    const emptyState = useEmptyState({
        title: "No Articles Yet",
        description: `To create new article and add structure and clarity 
        to your catalog. Use the create article button 
        at the top of the page`,
    })

    return (
        <div className="container py-10 space-y-10">
            <Outlet />

            <PageHeader
                title="News, Insights, Tenders and Financial advice"
                description={`Manage your articles, news updates, and insights here`}
            >
                <AccessGuard permissions={createPermissions}>
                    <Button
                        type="button"
                        intent="primary"
                        leftIcon={<IconPlus size={16} />}
                        onClick={() => handleCreate()}
                    >
                        Create Article
                    </Button>
                </AccessGuard>
            </PageHeader>

            <div className="flex justify-end px-5">
                <LocaleSwitch />
            </div>

            <Table
                columns={ArticleColumns}
                data={articles?.data ?? []}
                isLoading={isLoading}
                hasSelection={false}
                hasActions={true}
                emptyState={emptyState}
                actions={article => (
                    <ArticleActions
                        article={article}
                        locale={paramState.locale ?? "en"}
                    />
                )}
            />

            <Pagination pageSize={10} totalCount={articles?.meta.total ?? 0} />
        </div>
    )
}

export default Articles
