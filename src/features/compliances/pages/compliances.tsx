import { useGetCompliances } from "@/features/compliances/repositories/compliances"
import { Link, Outlet } from "react-router-dom"
import { IconPlus } from "@tabler/icons-react"
import { useSearchParamState } from "@/hooks/useSearchParamState"
import { useEmptyState } from "@/components/empty-state"
import { ComplianceOptions } from "@/features/compliances/types"
import {
    Action,
    ContentType,
    getPermission,
} from "@/guards/access_guard/permissions"

import Button from "@/components/Buttons/Button"
import Pagination from "@/components/pagination"
import Table from "@/components/Table/Table"
import ComplianceColumns from "@/features/compliances/fragments/compliance-columns"
import AccessGuard from "@/guards/access_guard"
import PageHeader from "@/components/page-header"

function Compliances() {
    const { paramState } = useSearchParamState<ComplianceOptions>({ page: 1 })

    const { compliances, isLoading } = useGetCompliances({
        page: paramState.page ?? 1,
        per_page: 10,
    })

    const createPermissions = getPermission(ContentType.Faq, [
        Action.CREATE,
        Action.ALL,
    ])

    const emptyState = useEmptyState({
        title: "No Compliance Yet",
        description: `To add compliance records, click import button at the top,
            select category, upload file and click submit`,
    })

    return (
        <div className="container py-10 space-y-10">
            <Outlet />

            <PageHeader
                title="Manage Compliances"
                description={`Create and edit swaps and forward contracts compliances here`}
            >
                <AccessGuard permissions={createPermissions}>
                    <Link to="import">
                        <Button
                            type="button"
                            intent="primary"
                            leftIcon={<IconPlus size={16} />}
                        >
                            Import
                        </Button>
                    </Link>
                </AccessGuard>
            </PageHeader>

            <Table
                columns={ComplianceColumns}
                data={compliances?.data ?? []}
                isLoading={isLoading}
                hasSelection={false}
                hasActions={true}
                emptyState={emptyState}
                actions={undefined}
            />

            <Pagination
                pageSize={10}
                totalCount={compliances?.meta.total ?? 0}
            />
        </div>
    )
}

export default Compliances
