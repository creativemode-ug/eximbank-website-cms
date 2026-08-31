import { Outlet, useNavigate } from "react-router-dom"
import { IconPlus } from "@tabler/icons-react"
import { useGetVacancies } from "@/features/vacancies/repositories"
import { useSearchParamState } from "@/hooks/useSearchParamState"
import type { VacancyOptions } from "@/features/vacancies/types"
import {
    Action,
    ContentType,
    getPermission,
} from "@/guards/access_guard/permissions"
import { useEmptyState } from "@/components/empty-state"

import Table from "@/components/Table/Table"
import Pagination from "@/components/pagination"
import PageHeader from "@/components/page-header"
import columns from "@/features/vacancies/fragments/vacancy-columns"
import VacancyActions from "@/features/vacancies/fragments/vacancy-actions"
import Button from "@/components/Buttons/Button"
import AccessGuard from "@/guards/access_guard"

function Vacancies() {
    const navigate = useNavigate()

    const { paramState } = useSearchParamState<VacancyOptions>({ page: 1 })

    const { vacancies, isLoading } = useGetVacancies({
        page: paramState.page ?? 1,
        per_page: 10,
        search: paramState.search,
    })

    const emptyState = useEmptyState({
        title: "No Vacancies Yet",
        description: `To create new article and add structure and clarity 
        to your catalog. Use the create article button 
        at the top of the page`,
    })

    const createPermissions = getPermission(ContentType.Position, [
        Action.CREATE,
        Action.ALL,
    ])

    return (
        <div className="container py-10 space-y-10">
            <Outlet />

            <PageHeader
                title="Job Posts"
                description="Manage all EXIM website vacancy posts here"
            >
                <AccessGuard permissions={createPermissions}>
                    <Button
                        type="button"
                        intent="primary"
                        leftIcon={<IconPlus size={16} />}
                        onClick={() => navigate("/positions/create")}
                    >
                        Create Vacancy
                    </Button>
                </AccessGuard>
            </PageHeader>

            <Table
                columns={columns}
                data={vacancies?.data ?? []}
                isLoading={isLoading}
                hasSelection={false}
                hasActions={true}
                emptyState={emptyState}
                actions={vacancy => (
                    <VacancyActions
                        vacancy={vacancy}
                        locale={paramState.locale ?? "en"}
                    />
                )}
            />

            <Pagination pageSize={10} totalCount={vacancies?.meta.total ?? 0} />
        </div>
    )
}

export default Vacancies
