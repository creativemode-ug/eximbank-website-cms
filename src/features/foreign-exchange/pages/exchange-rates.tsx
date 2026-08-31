import { Outlet, useNavigate } from "react-router-dom";
import type { QueryOptions } from "@/types";
import { useSearchParamState } from "@/hooks/useSearchParamState";
import { ExchangeRate } from "@/features/foreign-exchange/types";
import { useDeleteExchangeRate, useGetExchangeRates } from "@/features/foreign-exchange/repositories/exchange-rates";
import { IconBallpen, IconCloudUpload, IconPlus, IconTrash } from "@tabler/icons-react";
import { Action, ContentType, getPermission } from "@/guards/access_guard/permissions";

import Table from "@/components/Table/Table";
import Pagination from "@/components/pagination";
import columns from "@/features/foreign-exchange/fragments/exchange-rates-columns";
import useDialog from "@/components/Dialog/useDialog";
import Button from "@/components/Buttons/Button";
import AccessGuard from "@/guards/access_guard";


export default function Exchange() {
    const navigate = useNavigate();

    const { paramState } = useSearchParamState<QueryOptions>({ page: 1 });
    const { showConfirm, close } = useDialog();

    const { exchange_rates, isLoading } = useGetExchangeRates({
        page: paramState.page ?? 1, 
        per_page: 10
    });

    const deletion = useDeleteExchangeRate(
        () => close()
    );

    const createPermissions = getPermission(ContentType.Exchangerate, [Action.CREATE, Action.ALL])
    const editPermissions = getPermission(ContentType.Exchangerate, [Action.UPDATE, Action.ALL])
    const deletePermissions = getPermission(ContentType.Exchangerate, [Action.DELETE, Action.ALL])

    const handleEdit = (value: ExchangeRate) => navigate(`${value.id}/update`, {
            state: value
        })

    const handleDelete = (content: ExchangeRate) => {
        showConfirm({
            theme: "warning",
            title: "Please confirm!",
            message: `Are you sure about deleting item: ${content.currency.currency}`,
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
        <div className="space-y-10">
            <Outlet />
            <div className="flex items-center justify-end gap-2">
                <AccessGuard permissions={createPermissions}>
                    <Button
                        intent="primary"
                        leftIcon={<IconPlus size={16} />}
                        onClick={() => navigate("create")}
                    >
                        Add Rate
                    </Button>
                </AccessGuard>

                <AccessGuard permissions={createPermissions}>
                    <Button
                        intent="tertiary"
                        leftIcon={<IconCloudUpload size={16} />}
                        onClick={() => navigate("upload")}
                    >
                        Upload
                    </Button>
                </AccessGuard>
            </div>

            <div className="mb-8 md:mb-16">
                <Table 
                    columns={columns}
                    data={exchange_rates?.data ?? []}
                    isLoading={isLoading}
                    hasSelection={false}
                    hasActions={true}
                    actions={(content: ExchangeRate) => {
                    return (
                        <>
                            <AccessGuard permissions={editPermissions}>
                                <button onClick={() => handleEdit(content)}>
                                    <IconBallpen 
                                        className="h-5 w-5 text-tertiary" 
                                    />
                                </button>
                            </AccessGuard>

                            <AccessGuard permissions={deletePermissions}>
                                <button onClick={() => handleDelete(content)}>
                                    <IconTrash 
                                        className="h-5 w-5 text-tertiary" 
                                    />
                                </button>
                            </AccessGuard>
                        </>
                    )
                }} />
            </div>

            <Pagination
                pageSize={10}
                totalCount={exchange_rates?.meta.total ?? 0}
            />
        </div>
    )
}