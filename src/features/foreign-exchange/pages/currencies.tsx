import { Outlet, useNavigate } from "react-router-dom";
import { IconBallpen, IconPlus } from "@tabler/icons-react";
import { useSearchParamState } from "@/hooks/useSearchParamState";
import type { QueryOptions } from "@/types";
import { useGetCurrencies } from "@/features/foreign-exchange/repositories/currencies";
import { type Currency } from "@/features/foreign-exchange/types";
import { Action, ContentType, getPermission } from "@/guards/access_guard/permissions";
import Table from "@/components/Table/Table";

import Pagination from "@/components/pagination";
import columns from "@/features/foreign-exchange/fragments/currency-columns";
import AccessGuard from "@/guards/access_guard";
import Button from "@/components/Buttons/Button";




export default function Currency() {
    const navigate = useNavigate();

    const { paramState } = useSearchParamState<QueryOptions>({ page: 1 });

    const { currencies, isLoading } = useGetCurrencies({ 
        page: paramState.page ?? 1, 
        per_page: 10
    });

    const createPermissions = getPermission(ContentType.Currency, [Action.CREATE, Action.ALL])
    const editPermissions = getPermission(ContentType.Currency, [Action.UPDATE, Action.ALL])

    const handleEdit = (value: Currency) => navigate(`${value.id}/update`, {
        state: value
    })

    return (
        <div className="space-y-10">
            <Outlet />

            <div className="flex justify-end mb-4">
                <AccessGuard permissions={createPermissions}>
                    <Button
                        intent="primary"
                        leftIcon={<IconPlus size={16} />}
                        onClick={() => navigate("create")}
                    >
                        Add currency
                    </Button>
                </AccessGuard>
            </div>

            <div className="mb-8 md:mb-16">
                <Table 
                    columns={columns}
                    data={currencies?.data ?? []}
                    isLoading={isLoading}
                    hasSelection={false}
                    hasActions={true}
                    actions={(content: Currency) => {
                    return (
                        <>
                            <AccessGuard permissions={editPermissions}>
                                <button
                                    onClick={() => handleEdit(content)}
                                >
                                    <IconBallpen 
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
                totalCount={currencies?.meta.total ?? 0}
            />
        </div>
    )
}