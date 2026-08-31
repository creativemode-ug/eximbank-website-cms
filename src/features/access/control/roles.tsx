import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { IconBallpen, IconPlus, IconTrash } from "@tabler/icons-react";
import { useRoleDelete, useRoles} from "@/repositories/roles_repository";
import { IRole } from "@/types";
import { roleColumns } from "@/features/access/fragments/columns";
import { STORAGE_KEYS, setFromStorage } from "@/utils";
import { Action, ContentType, getPermission } from "@/guards/access_guard/permissions";

import Button from "@/components/Buttons/Button";
import useDialog from "@/components/Dialog/useDialog";
import Pagination from "@/components/Table/Pagination";
import Table from "@/components/Table/Table";
import AccessGuard from "@/guards/access_guard";


export default function Roles() {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const { showConfirm, close } = useDialog();
    
    const { roles, isLoading } = useRoles(
        { page: currentPage + 1, per_page: 10 }
    );

    const deletion = useRoleDelete(
        () => close()
    );

    const handleDelete = (content: IRole) => {
        showConfirm({
            theme: "warning",
            title: `Deletion of ${content.name}`,
            message: `Are you sure you want to delete this item? This action 
            cannot be undone. If yes please click continues to verify`,
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
        <div>
            <div className="flex justify-between items-center mb-8 md:mb-16">
                <h4 className="xl:text-lg text-primary font-semibold">
                    Manage Roles
                </h4>

                <AccessGuard
                    permissions={getPermission(ContentType.Role, [Action.CREATE, Action.ALL])}
                >
                    <Link to="/settings/roles/create">
                        <Button
                            type="button"
                            intent="primary"
                            leftIcon={<IconPlus size={16} />}
                        >
                            Create New Role
                        </Button>
                    </Link>
                </AccessGuard>
            </div>

            <div className="mb-8 md:mb-16">
                <Table 
                    columns={roleColumns}
                    data={roles?.data ?? []}
                    isLoading={isLoading}
                    hasSelection={false}
                    hasActions={true}
                    actions={(content: IRole) => {
                    return (
                        <>
                            {/* <Link 
                                to={`/settings/roles/${content.id}`}
                                onClick={() => setFromStorage<IRole>(STORAGE_KEYS.ROLE, content)}
                            >
                                <IconEye 
                                    className="h-5 w-5 text-tertiary" 
                                />
                            </Link> */}
                            <AccessGuard
                                permissions={getPermission(ContentType.Role, [Action.UPDATE, Action.ALL])}
                            >
                                <Link 
                                    to={`/settings/roles/update/${content.id}`}
                                    onClick={() => setFromStorage<IRole>(STORAGE_KEYS.ROLE, content)}
                                >
                                    <IconBallpen 
                                        className="h-5 w-5 text-tertiary" 
                                    />
                                </Link>
                            </AccessGuard>

                            <AccessGuard
                                permissions={getPermission(ContentType.Role, [Action.DELETE, Action.ALL])}
                            >
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
                }} />
            </div>

            {
                roles && roles.data.length > 0 &&
                <Pagination
                    currPage={currentPage}
                    setCurrPage={setCurrentPage}
                    pageCount={roles.meta.last_page}
                />
            }

            <Outlet />
        </div>
    )
}