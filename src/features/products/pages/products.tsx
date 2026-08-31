import { Link, Outlet } from "react-router-dom"
import { Fragment } from "react"
import { IconPlus } from "@tabler/icons-react"
import { useEmptyState } from "@/components/empty-state"
import { useGetProducts } from "@/features/products/repositories/products"
import { useSearchParamState } from "@/hooks/useSearchParamState"
import type { ProductQueryOptions } from "@/features/products/types"
import { ProductCardLoader } from "@/features/products/fragments/loaders"
import {
    Action,
    ContentType,
    getPermission,
} from "@/guards/access_guard/permissions"

import ProductCard from "@/features/products/fragments/product-card"
import PageHeader from "@/components/page-header"
import AccessGuard from "@/guards/access_guard"
import Button from "@/components/Buttons/Button"
import Pagination from "@/components/pagination"
import Searchbox from "@/components/search-box"
import LocaleSwitch from "@/components/locale-switch"
import AsyncData from "@/components/async-data"

function Products() {
    const { paramState } = useSearchParamState<ProductQueryOptions>({
        page: 1,
    })

    const { products, isLoading } = useGetProducts({ ...paramState })
    const createPermissions = getPermission(ContentType.Product, [
        Action.CREATE,
        Action.ALL,
    ])

    const emptyState = useEmptyState({
        title: "No Product Yet",
        description: `Create product such as Wafanyakazi Account(Account), 
            Nyumba Yangu Loan(Loans) or Motor Insurance (Insurance) to 
            add structure and clarity to your catalog. Use the ➕ Product 
            button at the top of the page`,
    })

    return (
        <Fragment>
            <Outlet />
            <PageHeader
                title="All Products"
                description="Manage all products across categories and types i.e. Personal and Business"
            >
                <AccessGuard permissions={createPermissions}>
                    <Link to={"/services/products/create"}>
                        <Button
                            type="button"
                            intent="primary"
                            leftIcon={<IconPlus size={16} />}
                        >
                            Product
                        </Button>
                    </Link>
                </AccessGuard>
            </PageHeader>

            <div className="flex items-center justify-between gap-4">
                <Searchbox className="w-1/3" />
                <LocaleSwitch />
            </div>

            <AsyncData
                data={products?.data ?? []}
                loading={isLoading}
                loader={
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {[...Array(8)].map((_, index) => (
                            <ProductCardLoader key={index} />
                        ))}
                    </div>
                }
                fallback={emptyState}
            >
                {products => (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {products.map(el => (
                            <ProductCard product={el} key={el.id} />
                        ))}
                    </div>
                )}
            </AsyncData>

            <Pagination pageSize={10} totalCount={products?.meta.total ?? 0} />
        </Fragment>
    )
}

export default Products
