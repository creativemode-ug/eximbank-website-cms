import { useGetSections } from "@/features/sections/repositories"
import { IconPlus } from "@tabler/icons-react"
import { Outlet, useNavigate } from "react-router-dom"
import {
    Action,
    ContentType,
    getPermission,
} from "@/guards/access_guard/permissions"
import type { SectionOption } from "@/features/sections/types"
import { useSearchParamState } from "@/hooks/useSearchParamState"
import { useEmptyState } from "@/components/empty-state"

import Button from "@/components/Buttons/Button"
import Pagination from "@/components/pagination"
import AccessGuard from "@/guards/access_guard"
import LocaleSwitch from "@/components/locale-switch"
import Table from "@/components/Table/Table"
import PageHeader from "@/components/page-header"
import SectionColumns from "@/features/sections/fragments/section-columns"
import SectionActions from "@/features/sections/fragments/section-actions"

function Sections() {
    const navigate = useNavigate()

    const { paramState } = useSearchParamState<SectionOption>({ page: 1 })

    const { sections, isLoading } = useGetSections({
        page: paramState.page ?? 1,
        per_page: 10,
        locale: paramState.locale,
    })

    const handleCreate = () => navigate(`/sections/create`)

    const createPermissions = getPermission(ContentType.Section, [
        Action.CREATE,
        Action.ALL,
    ])

    const emptyState = useEmptyState({
        title: "No Banners Yet",
        description: `Create banner or call to action section to 
        add structure and clarity to your catalog. Use the Create Section button 
        at the top of the page`,
    })

    return (
        <div className="container py-10 space-y-10">
            <Outlet />

            <PageHeader
                title="Banners & CTA"
                description={`Manage all call to actions and sliding banners here`}
            >
                <AccessGuard permissions={createPermissions}>
                    <Button
                        type="button"
                        intent="primary"
                        leftIcon={<IconPlus size={16} />}
                        onClick={() => handleCreate()}
                    >
                        Create Section
                    </Button>
                </AccessGuard>
            </PageHeader>

            <div className="flex justify-end px-5">
                <LocaleSwitch />
            </div>
            <Table
                columns={SectionColumns}
                data={sections?.data ?? []}
                isLoading={isLoading}
                hasSelection={false}
                hasActions={true}
                emptyState={emptyState}
                actions={section => (
                    <SectionActions
                        section={section}
                        locale={paramState.locale ?? "en"}
                    />
                )}
            />

            <Pagination pageSize={10} totalCount={sections?.meta.total ?? 0} />
        </div>
    )
}

export default Sections
