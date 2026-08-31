import { Link, Outlet, useNavigate } from "react-router-dom";
import { IconBallpen, IconPlus, IconTrash } from "@tabler/icons-react";
import { useDeleteMember, useGetMembers } from "@/features/members/repositories";
import { useSearchParamState } from "@/hooks/useSearchParamState";
import type { Member, MemberOptions } from "@/features/members/types";
import { Action, ContentType, getPermission } from "@/guards/access_guard/permissions";
import Table, { TableContainer } from "@/components/Table/Table";


import Pagination from "@/components/pagination";
import columns from "@/features/members/fragments/columns";
import MemberView from "@/features/members/fragments/member-view";
import Button from "@/components/Buttons/Button";
import useDialog from "@/components/Dialog/useDialog";
import AccessGuard from "@/guards/access_guard";
import LocaleSwitch from "@/components/locale-switch";
import PageHeader from "@/components/page-header";



export default function Teams() {
    const navigate = useNavigate();
        
    const { paramState } = useSearchParamState<MemberOptions>({ page: 1 });
    const { showConfirm, close } = useDialog();
    
    const { members, isLoading } = useGetMembers({ 
        page: paramState.page ?? 1, 
        per_page: 10,
        locale: paramState.locale  
    });

    const deletion = useDeleteMember(
        () => close()
    );

    const createPermissions = getPermission(ContentType.Leader, [Action.CREATE, Action.ALL])
    const editPermissions = getPermission(ContentType.Leader, [Action.UPDATE, Action.ALL])
    const deletePermissions = getPermission(ContentType.Leader, [Action.DELETE, Action.ALL])

    const handleCreate = () => navigate("create");

    const handleDelete = (content: Member) => {
        showConfirm({
            theme: "warning",
            title: "Please confirm!",
            message: `Are you sure about deleting item: ${content.full_name}`,
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
                title="Management & Board Members"
            >
                <AccessGuard permissions={createPermissions}>
                    <Button
                        type="button"
                        intent="primary"
                        leftIcon={<IconPlus size={16} />}
                        onClick={() => handleCreate()}
                    >
                        New Position
                    </Button>
                </AccessGuard>
            </PageHeader>

            <TableContainer>
                <div className="flex justify-end px-5">
                    <LocaleSwitch />
                </div>
                <Table 
                    columns={columns}
                    data={members?.data ?? []}
                    isLoading={isLoading}
                    hasSelection={false}
                    hasActions={true}
                    hasExpandableRow={true}
                    actions={(content: Member) => {
                        return (
                            <>
                                <AccessGuard permissions={editPermissions}>
                                    <Link to={`${content.id}/update?locale=${paramState.locale}`}>
                                        <IconBallpen 
                                            className="h-5 w-5 text-tertiary" 
                                        />
                                    </Link>
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
                    expandables={(content: Member) => (
                        <MemberView member={content} />
                    )}
                />
            </TableContainer>

            <Pagination
                pageSize={10}
                totalCount={members?.meta.total ?? 0}
            />

        </div>
    )
}