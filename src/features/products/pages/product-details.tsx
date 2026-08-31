import { Link, useNavigate, useParams } from "react-router-dom"
import {
    useDeleteProduct,
    useGetProductDetail,
} from "@/features/products/repositories/products"
import { useSearchParamState } from "@/hooks/useSearchParamState"
import { IconTrash } from "@tabler/icons-react"
import {
    Action,
    ContentType,
    getPermission,
} from "@/guards/access_guard/permissions"
import {
    ProductContentOptions,
    ProductQueryOptions,
    ProductTypeOptions,
    ResourceTypeEnum,
    ProductTemplateOptions,
    ProductTemplateEnum,
} from "@/features/products/types"
import { useEmptyState } from "@/components/empty-state"
import {
    CircularListItem,
    ListItem,
} from "@/features/products/fragments/list-item"

import AccessGuard from "@/guards/access_guard"
import AsyncData from "@/components/async-data"
import LocaleSwitch from "@/components/locale-switch"
import PageContainer from "@/components/page-container"
import Button from "@/components/Buttons/Button"
import ResourceIcon from "@/assets/card-tick.webp"
import Divider from "@/components/divider"
import Hide from "@/components/hide"
import ConditionalRender from "@/components/conditional-render"
import useDialog from "@/components/Dialog/useDialog"
import LoadingIndicator from "@/components/loading-indicator"
import SubProductDetails from "@/features/products/pages/sub-product-details.tsx"
import { useEffect, useState } from "react"
import StateTabs from "@/components/tab-controls/state-tabs.tsx"

function ProductDetails() {
    const navigate = useNavigate()
    const { productId } = useParams()
    const { paramState } = useSearchParamState<ProductQueryOptions>()
    const [activeSubProductId, setActiveSubProductId] = useState<string>("")

    const { product, isLoading } = useGetProductDetail({
        locale: paramState.locale,
        productId: productId,
    })

    useEffect(() => {
        if (
            product?.data.subProducts &&
            product?.data.subProducts.length > 0 &&
            !activeSubProductId
        ) {
            setActiveSubProductId(product?.data.subProducts[0].id)
        }
    }, [product?.data.subProducts, activeSubProductId])

    const tabPanels =
        product?.data.subProducts?.map(subProduct => ({
            name: subProduct.name,
        })) || []

    const handleTabChange = (index: number) => {
        if (product?.data.subProducts[index]) {
            setActiveSubProductId(product?.data.subProducts[index].id)
        }
    }

    const emptyState = useEmptyState({
        title: "No Product Found",
        description: `Sorry product with such ID and associated parameters is not available`,
    })

    const { showConfirm, close } = useDialog()

    const { mutate, isPending } = useDeleteProduct(() => {
        close()
        navigate("/services/products")
    })

    const editPermissions = getPermission(ContentType.Product, [
        Action.UPDATE,
        Action.ALL,
    ])
    const deletePermissions = getPermission(ContentType.Product, [
        Action.DELETE,
        Action.ALL,
    ])

    const handleDelete = () => {
        showConfirm({
            theme: "warning",
            title: "Please confirm!",
            message: `Are you sure about deleting item product`,
            render: () => (
                <div className="flex justify-end gap-x-4">
                    <Button intent="danger" size="sm" onClick={close}>
                        Cancel
                    </Button>
                    <Button
                        intent="primary"
                        size="sm"
                        loading={isPending}
                        onClick={() => mutate(productId!)}
                    >
                        Continue
                    </Button>
                </div>
            ),
        })
    }

    const getTemplateName = (value: number) => {
        const data = ProductTemplateOptions.find(
            el => el.value == value.toString()
        )
        return data?.label ?? ""
    }

    const getProductTypeName = (value: number) => {
        const data = ProductTypeOptions.find(el => el.value == value.toString())
        return data?.label ?? ""
    }

    const getOptions = () => {
        const types = product!.data.options.flatMap(el => el.type)
        const uniqueTypes = types.filter(
            (el, index, arr) => arr.indexOf(el) === index
        )

        return (
            uniqueTypes?.map(el => ({
                type: el,
                label: ProductContentOptions.find(i => i.value == el.toString())
                    ?.label,
                options: product?.data.options.filter(i => i.type == el),
            })) ?? []
        )
    }

    return (
        <PageContainer>
            <AsyncData
                loading={isLoading}
                loader={
                    <LoadingIndicator
                        loading={isLoading}
                        className="h-screen"
                    />
                }
                fallback={emptyState}
                data={product?.data}
            >
                {item => (
                    <div>
                        <section className="flex justify-between items-center gap-4 mb-16">
                            <div className="text-sm capitalize space-y-2">
                                <h4 className="font-medium">{item.title}</h4>
                                <div className="flex items-center gap-2 text-zinc-500">
                                    <span>
                                        {getTemplateName(item.layout)} Template
                                    </span>
                                    <Divider
                                        axis="y"
                                        className="h-5 bg-zinc-300"
                                    />
                                    <span>{getProductTypeName(item.type)}</span>
                                    <Divider
                                        axis="y"
                                        className="h-5 bg-zinc-300"
                                    />

                                    {item.layout === 3 && (
                                        <div
                                            className={
                                                "flex items-center gap-2"
                                            }
                                        >
                                            <AccessGuard
                                                permissions={editPermissions}
                                            >
                                                <Link
                                                    to={`/services/products/${item.id}/add-sub-product`}
                                                    className="underline text-primary"
                                                >
                                                    Add Sub-Products
                                                </Link>
                                            </AccessGuard>
                                            <Divider
                                                axis="y"
                                                className="h-5 bg-zinc-300"
                                            />
                                        </div>
                                    )}

                                    <AccessGuard permissions={editPermissions}>
                                        <Link
                                            to={`/services/products/${item.id}/edit/content?template=${item.layout}&locale=${paramState.locale}`}
                                            className="underline text-primary"
                                        >
                                            Edit Product
                                        </Link>
                                    </AccessGuard>
                                </div>
                            </div>
                            <div className="flex gap-8">
                                <LocaleSwitch />

                                <div className="flex gap-2">
                                    <AccessGuard
                                        permissions={deletePermissions}
                                    >
                                        <Button
                                            intent="danger"
                                            leftIcon={
                                                <IconTrash className="size-4" />
                                            }
                                            onClick={handleDelete}
                                        >
                                            Delete Product
                                        </Button>
                                    </AccessGuard>
                                </div>
                            </div>
                        </section>

                        <Hide
                            condition={item.layout == ProductTemplateEnum.Min}
                        >
                            <div className="w-full xl:w-3/5 space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-xs text-zinc-400 uppercase">
                                    <Divider
                                        axis="x"
                                        className="max-w-12 h-1 bg-tertiary rounded-none"
                                    />
                                    <span className="font-semibold uppercase">
                                        {item.highlight_caption ?? "-"}
                                    </span>
                                    <Divider
                                        axis="x"
                                        className="max-w-12 h-1 bg-tertiary rounded-none"
                                    />
                                </div>
                                <h4 className="text-lg font-bold text-primary capitalize">
                                    {item.highlight_title}
                                </h4>
                                <p className="text-xs md:text-sm text-primary">
                                    {item.highlight_description}
                                </p>
                            </div>
                        </Hide>

                        {/* Product Body */}
                        <div className="flex flex-wrap md:flex-nowrap gap-8">
                            <section className="w-full md:w-3/5">
                                <div className="p-6 bg-tertiary-accent/50 border border-tertiary-accent/70 rounded-md mb-8">
                                    <section className="min-h-96">
                                        <img
                                            src={
                                                item?.banner_img ??
                                                "https://placehold.net/600x800.png"
                                            }
                                            alt={item.title}
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    </section>

                                    <section className="space-y-4">
                                        <h2 className="font-semibold uppercase">
                                            {item.title}
                                        </h2>

                                        <div className="text-primary text-sm space-y-4">
                                            <p>{item.description}</p>

                                            {getOptions().map(el => (
                                                <div
                                                    className="space-y-2"
                                                    key={el.label}
                                                >
                                                    <h4 className="font-semibold">
                                                        {el.label}
                                                    </h4>
                                                    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                        {el.options?.map(
                                                            (opt, index) => (
                                                                <ConditionalRender
                                                                    condition={
                                                                        el.type ==
                                                                        1
                                                                    }
                                                                >
                                                                    <ListItem
                                                                        key={
                                                                            opt.id
                                                                        }
                                                                    >
                                                                        {
                                                                            opt.content
                                                                        }
                                                                    </ListItem>

                                                                    <CircularListItem
                                                                        figure={
                                                                            index
                                                                        }
                                                                        key={
                                                                            opt.id
                                                                        }
                                                                    >
                                                                        {
                                                                            opt.content
                                                                        }
                                                                    </CircularListItem>
                                                                </ConditionalRender>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            </section>

                            <section className="w-full md:w-2/5">
                                {/* Resources */}
                                {item.resources.map(resource => (
                                    <div
                                        className="space-y-4"
                                        key={resource.id}
                                    >
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={ResourceIcon}
                                                alt="resource-icon"
                                                className="size-6"
                                            />
                                            <h4 className="text-sm font-medium">
                                                {resource.name}
                                            </h4>
                                        </div>
                                        {resource.type ==
                                            ResourceTypeEnum.IMAGE && (
                                            <img
                                                src={resource.reference}
                                                alt="image"
                                            />
                                        )}
                                        {resource.type ==
                                            ResourceTypeEnum.VIDEO && (
                                            <div className="overflow-hidden rounded-md">
                                                <video
                                                    width="800"
                                                    height="800"
                                                    controls
                                                >
                                                    <source
                                                        src={resource.reference}
                                                        type="video/mp4"
                                                    />
                                                    <source
                                                        src={resource.reference}
                                                        type="video/ogg"
                                                    />
                                                    Your browser does not
                                                    support the video tag.
                                                </video>
                                            </div>
                                        )}
                                        {resource.type ==
                                            ResourceTypeEnum.FORM && (
                                            <div className="bg-zinc-50 h-56 rounded-lg"></div>
                                        )}
                                    </div>
                                ))}
                            </section>
                        </div>

                        {/*Sub Products*/}
                        {item.subProducts && item.subProducts.length > 0 && (
                            <section className="mt-8 space-y-4">
                                <div className="pt-8 space-y-4">
                                    <h3 className="font-semibold mb-4">
                                        Sub Products
                                    </h3>
                                    <StateTabs
                                        panels={tabPanels}
                                        onTabChange={handleTabChange}
                                        defaultIndex={0}
                                    >
                                        {item.subProducts.map(subProduct => (
                                            <SubProductDetails
                                                key={subProduct.id}
                                                subProductId={subProduct.id}
                                                locale={paramState.locale}
                                            />
                                        ))}
                                    </StateTabs>
                                </div>
                            </section>
                        )}
                    </div>
                )}
            </AsyncData>
        </PageContainer>
    )
}

export default ProductDetails
