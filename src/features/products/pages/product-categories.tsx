import { Link, Outlet } from "react-router-dom"
import { Fragment } from "react"
import { IconPlus } from "@tabler/icons-react"
import { useGetProductCategories } from "@/features/products/repositories/product-categories"
import { useSearchParamState } from "@/hooks/useSearchParamState"
import type { ProductCategoryOptions } from "@/features/products/types"
import {
    Action,
    ContentType,
    getPermission,
} from "@/guards/access_guard/permissions"
import { useEmptyState } from "@/components/empty-state"

import AccessGuard from "@/guards/access_guard"
import PageHeader from "@/components/page-header"
import Pagination from "@/components/pagination"
import Button from "@/components/Buttons/Button"
import Table from "@/components/Table/Table"
import Searchbox from "@/components/search-box"
import LocaleSwitch from "@/components/locale-switch"
import ProductCategoryColumns from "@/features/products/fragments/product-category-columns"
import ProductCategoryActions from "@/features/products/fragments/product-category-actions"

function ProductCategories() {
    const { paramState } = useSearchParamState<ProductCategoryOptions>({
        page: 1,
    })

    const { categories, isLoading } = useGetProductCategories({ ...paramState })

    const createPermissions = getPermission(ContentType.Product, [
        Action.CREATE,
        Action.ALL,
    ])

    const emptyState = useEmptyState({
        title: "No Product Categories Yet",
        description: `Create categories such as Accounts, Loans 
        Investment Services or Digital Banking to add structure 
        and clarity to your catalog. Use the ➕ Product Category
        button at the top of the page`,
    })

    return (
        <Fragment>
            <Outlet />
            <PageHeader
                title="Product Categories"
                description="Manage product category information including headlines, name, actions etc"
            >
                <AccessGuard permissions={createPermissions}>
                    <Link to={"/services/categories/create"}>
                        <Button
                            type="button"
                            intent="primary"
                            leftIcon={<IconPlus size={16} />}
                        >
                            Product Category
                        </Button>
                    </Link>
                </AccessGuard>
            </PageHeader>

            <div className="flex items-center justify-between gap-4">
                <Searchbox className="w-1/3" />
                <LocaleSwitch />
            </div>

            <Table
                columns={ProductCategoryColumns}
                data={categories?.data ?? []}
                isLoading={isLoading}
                hasSelection={false}
                hasActions={true}
                emptyState={emptyState}
                hasExpandableRow={true}
                actions={category => (
                    <ProductCategoryActions
                        category={category}
                        locale={paramState.locale ?? "en"}
                    />
                )}
            />

            <Pagination pageSize={10} totalCount={0} />
        </Fragment>
    )
}

export default ProductCategories
