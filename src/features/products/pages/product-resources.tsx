import { Link, Outlet } from "react-router-dom"
import { Fragment } from "react"
import { IconPlus } from "@tabler/icons-react"
import { useEmptyState } from "@/components/empty-state"
import { useGetProductResources } from "@/features/products/repositories/product-resources"
import { useSearchParamState } from "@/hooks/useSearchParamState"
import type { ResourceQueryOptions } from "@/features/products/types"
import {
    Action,
    ContentType,
    getPermission,
} from "@/guards/access_guard/permissions"

import PageHeader from "@/components/page-header"
import AccessGuard from "@/guards/access_guard"
import Button from "@/components/Buttons/Button"
import Table from "@/components/Table/Table"
import Pagination from "@/components/pagination"
import Searchbox from "@/components/search-box"
import LocaleSwitch from "@/components/locale-switch"
import ProductResourceColumns from "@/features/products/fragments/product-resource-columns"
import ProductResourceActions from "@/features/products/fragments/product-resource-actions"

function ProductResources() {
    const { paramState } = useSearchParamState<ResourceQueryOptions>({
        page: 1,
    })

    const { resources, isLoading } = useGetProductResources({ ...paramState })
    const createPermissions = getPermission(ContentType.Product, [
        Action.CREATE,
        Action.ALL,
    ])

    const emptyState = useEmptyState({
        title: "No Resources Yet",
        description: `To create resource for a product use the ➕ Resource
            button at the top of the page`,
    })

    return (
        <Fragment>
            <Outlet />
            <PageHeader
                title="All Resource"
                description="Manage all resources across products and product types"
            >
                <AccessGuard permissions={createPermissions}>
                    <Link to={"/services/resources/create"}>
                        <Button
                            type="button"
                            intent="primary"
                            leftIcon={<IconPlus size={16} />}
                        >
                            Resource
                        </Button>
                    </Link>
                </AccessGuard>
            </PageHeader>

            <div className="flex items-center justify-between gap-4">
                <Searchbox className="w-1/3" />
                <LocaleSwitch />
            </div>

            <Table
                columns={ProductResourceColumns}
                data={resources?.data ?? []}
                isLoading={isLoading}
                hasSelection={false}
                hasActions={true}
                emptyState={emptyState}
                hasExpandableRow={true}
                actions={resource => (
                    <ProductResourceActions
                        resource={resource}
                        locale={paramState.locale ?? "en"}
                    />
                )}
            />

            <Pagination pageSize={10} totalCount={0} />
        </Fragment>
    )
}

export default ProductResources
