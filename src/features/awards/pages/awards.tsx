import { useGetAwards, useDeleteAward } from "@/features/awards/repositories";
import type { Award, AwardOptions } from "@/features/awards/types";
import { useSearchParamState } from "@/hooks/useSearchParamState";
import { Outlet, useNavigate } from "react-router-dom";
import { IconBallpen, IconEye, IconPlus, IconTrash } from "@tabler/icons-react";
import { Action, ContentType, getPermission } from "@/guards/access_guard/permissions";
import { i18n } from "@/i18n.config";
import Table, { TableContainer } from "@/components/Table/Table";

import Button from "@/components/Buttons/Button";
import useDialog from "@/components/Dialog/useDialog";
import Pagination from "@/components/pagination";
import LocaleSwitch from "@/components/locale-switch";
import PageHeader from "@/components/page-header";
import columns from "@/features/awards/fragments/columns";
import AccessGuard from "@/guards/access_guard";



export default function Awards() {
    const navigate = useNavigate();
    
    const { paramState } = useSearchParamState<AwardOptions>({ page: 1 });
    const { showConfirm, close } = useDialog();
    
    const { awards, isLoading } = useGetAwards({
        page: paramState.page ?? 1, 
        per_page: 10,
        locale: paramState.locale
    });

    const deletion = useDeleteAward(
        () => close()
    );

    const createPermissions = getPermission(ContentType.Award, [Action.CREATE, Action.ALL])
    const viewPermissions = getPermission(ContentType.Award, [Action.VIEW, Action.ALL])
    const editPermissions = getPermission(ContentType.Award, [Action.UPDATE, Action.ALL])
    const deletePermissions = getPermission(ContentType.Award, [Action.DELETE, Action.ALL])

    const handleCreate = () => navigate(`create?locale=${i18n.defaultLocale}`);

    const handleView = (value: Award) => navigate(`${value.id}`, {
        state: value
    });
    const handleEdit = (value: Award) => navigate(`${value.id}/update`, {
        state: value
    });

    const handleDelete = (content: Award) => {
        showConfirm({
            theme: "warning",
            title: "Please confirm!",
            message: `Are you sure about deleting item: ${content.id}`,
            render: () => (
                <div className="flex justify-end gap-x-4">
                    <Button
                        intent="danger"
                        size="sm"
                        onClick={close}
                    >
                        Cancel
                    </Button>
                    <Button
                        intent="primary"
                        size="sm"
                        loading={deletion.isPending}
                        onClick={() => deletion.mutate(content.id)}
                    >
                        Continue
                    </Button>
                </div>
            )
        })
    }

    return (
        <div className="container py-10 space-y-10">
            <Outlet />

            <PageHeader 
                title="Manage Awards"
            >
                <AccessGuard permissions={createPermissions}>
                    <Button
                        type="button"
                        intent="primary"
                        leftIcon={<IconPlus size={16} />}
                        onClick={() => handleCreate()}
                    >
                        New Award
                    </Button>
                </AccessGuard>
            </PageHeader>

            <TableContainer>
                <div className="flex justify-end px-5">
                    <LocaleSwitch />
                </div>
                <Table 
                    columns={columns}
                    data={awards?.data ?? []}
                    isLoading={isLoading}
                    hasSelection={false}
                    hasActions={true}
                    actions={(content: Award) => {
                        return (
                            <>
                                <AccessGuard permissions={viewPermissions}>
                                    <button onClick={() => handleView(content)}>
                                        <IconEye 
                                            className="h-5 w-5 text-tertiary" 
                                        />
                                    </button>
                                </AccessGuard>

                                <AccessGuard permissions={editPermissions}>
                                    <button onClick={() => handleEdit(content)}>
                                        <IconBallpen 
                                            className="h-5 w-5 text-tertiary" 
                                        />
                                    </button>
                                </AccessGuard>

                                <AccessGuard permissions={deletePermissions}>
                                    <button 
                                        onClick={() => handleDelete(content)}
                                    >
                                        <IconTrash 
                                            className="h-5 w-5 text-tertiary" 
                                        />
                                    </button>
                                </AccessGuard>
                            </>
                        )
                    }} 
                />
            </TableContainer>
            
            <Pagination
                pageSize={10}
                totalCount={awards?.meta.total ?? 0}
            />

        </div>
    )
}