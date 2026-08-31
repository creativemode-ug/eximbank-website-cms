import { useNavigate } from "react-router-dom"
import { Outlet } from "react-router-dom"
import { useGetFaq } from "@/features/faq/repositories/faqs"
import { useSearchParamState } from "@/hooks/useSearchParamState"
import type { FaqOptions, Faq } from "@/features/faq/types"
import { IconPlus } from "@tabler/icons-react"
import {
    Action,
    ContentType,
    getPermission,
} from "@/guards/access_guard/permissions"
import { useEmptyState } from "@/components/empty-state"

import Button from "@/components/Buttons/Button"
import Pagination from "@/components/pagination"
import FaqColumns from "@/features/faq/fragments/faq-columns"
import FaqView from "@/features/faq/fragments/faq-view"
import AccessGuard from "@/guards/access_guard"
import LocaleSwitch from "@/components/locale-switch"
import PageHeader from "@/components/page-header"
import FaqActions from "@/features/faq/fragments/faq-actions"
import Table from "@/components/Table/Table"

export default function Faq() {
    const navigate = useNavigate()

    const { paramState } = useSearchParamState<FaqOptions>({ page: 1 })

    const { questions, isLoading } = useGetFaq({
        page: paramState.page ?? 1,
        per_page: 10,
        locale: paramState.locale,
    })

    const createPermissions = getPermission(ContentType.Faq, [
        Action.CREATE,
        Action.ALL,
    ])

    const handleCreate = () => navigate("create")

    const emptyState = useEmptyState({
        title: "No Faq Yet",
        description: `To add faq, click create faq button above 
        and fill the form accordingly.`,
    })

    return (
        <div className="container py-10 space-y-10">
            <Outlet />

            <PageHeader
                title="Frequently Asked Questions"
                description={`Manage all faq that will be visible on the website, 
                note visiblity is controlled by published checkbox`}
            >
                <AccessGuard permissions={createPermissions}>
                    <Button
                        type="button"
                        intent="primary"
                        leftIcon={<IconPlus size={16} />}
                        onClick={() => handleCreate()}
                    >
                        Create Faq
                    </Button>
                </AccessGuard>
            </PageHeader>

            <div className="flex justify-end">
                <LocaleSwitch />
            </div>

            <Table
                columns={FaqColumns}
                data={questions?.data ?? []}
                isLoading={isLoading}
                hasSelection={false}
                hasActions={true}
                hasExpandableRow={true}
                emptyState={emptyState}
                actions={faq => <FaqActions faq={faq} />}
                expandables={(content: Faq) => <FaqView faq={content} />}
            />

            <Pagination pageSize={10} totalCount={questions?.meta.total ?? 0} />
        </div>
    )
}
