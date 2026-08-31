import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { IconBallpen, IconPlus, IconTrash } from "@tabler/icons-react";
import { useStaff, useStaffDelete } from "@/repositories/staff_repository";
import { IStaff } from "@/types";
import { staffColumns } from "@/features/access/fragments/columns";
import { STORAGE_KEYS, setFromStorage } from "@/utils";
import { Action, ContentType, getPermission } from "@/guards/access_guard/permissions";

import Table from "@/components/Table/Table";
import Pagination from "@/components/Table/Pagination";
import useDialog from "@/components/Dialog/useDialog";
import Button from "@/components/Buttons/Button";
import AccessGuard from "@/guards/access_guard";


export default function Staff() {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const { showConfirm, close } = useDialog();

    const { staffs, isLoading } = useStaff (
        { page: currentPage + 1, per_page: 10 }
    );

    const deletion = useStaffDelete(
        () => close()
    );

    const handleDelete = (content: IStaff) => {
        showConfirm({
            theme: "warning",
            title: `Deletion of ${content.first_name}`,
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
        <div className="container py-10">
            <div className="flex justify-between items-center mb-8 md:mb-16">
                <h4 className="xl:text-lg text-primary font-semibold">
                    Manage Staff
                </h4>

                <AccessGuard
                    permissions={getPermission(ContentType.User, [Action.CREATE, Action.ALL])}
                >
                    <Link to="/settings/staff/create">
                        <Button
                            type="button"
                            intent="primary"
                            leftIcon={<IconPlus size={16} />}
                        >
                            Create New User
                        </Button>
                    </Link>
                </AccessGuard>
            </div>

            <div className="mb-8 md:mb-16">
                <Table 
                    columns={staffColumns}
                    data={staffs?.data ?? []}
                    isLoading={isLoading}
                    hasSelection={false}
                    hasActions={true}
                    actions={(content: IStaff) => {
                    return (
                        <>
                            {/* <Link 
                                to={`/settings/staff/${content.id}`}
                                onClick={() => setFromStorage<IStaff>(STORAGE_KEYS.STAFF, content)}
                            >
                                <IconEye 
                                    className="h-5 w-5 text-tertiary" 
                                />
                            </Link> */}

                            <AccessGuard
                                permissions={getPermission(ContentType.User, [Action.UPDATE, Action.ALL])}
                            >
                                <Link 
                                    to={`/settings/staff/update/${content.id}`}
                                    onClick={() => setFromStorage<IStaff>(STORAGE_KEYS.STAFF, content)}
                                >
                                    <IconBallpen 
                                        className="h-5 w-5 text-tertiary" 
                                    />
                                </Link>
                            </AccessGuard>

                            <AccessGuard
                                permissions={getPermission(ContentType.User, [Action.UPDATE, Action.ALL])}
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
                staffs && staffs.data.length > 0 &&
                <Pagination
                    currPage={currentPage}
                    setCurrPage={setCurrentPage}
                    pageCount={staffs.meta.last_page}
                />
            }

            <Outlet />
        </div>
    )
}