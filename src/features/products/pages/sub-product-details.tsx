import {useDeleteSubProduct, useGetSubProductDetail} from "@/features/products/repositories/sub-products.ts";
import ConditionalRender from "@/components/conditional-render.tsx";
import {CircularListItem, ListItem} from "@/features/products/fragments/list-item.tsx";
import {ProductContentOptions} from "@/features/products/types.ts";
import LoadingIndicator from "@/components/loading-indicator.tsx";
import AsyncData from "@/components/async-data.tsx";
import AccessGuard from "@/guards/access_guard";
import Button from "@/components/Buttons/Button.tsx";
import {IconEdit, IconTrash} from "@tabler/icons-react";
import {Action, ContentType, getPermission} from "@/guards/access_guard/permissions.ts";
import useDialog from "@/components/Dialog/useDialog.ts";
import {useNavigate, useParams} from "react-router-dom";

interface SubProductDetailsProps {
    subProductId: string
    locale?: string
}

const SubProductDetails = ({subProductId, locale}: SubProductDetailsProps) => {
    const {showConfirm, close} = useDialog()
    const navigate = useNavigate()
    const {productId} = useParams()

    const {subProduct, isLoading} = useGetSubProductDetail({
        locale: locale,
        subProductId: subProductId,
    })

    const getOptions = () => {
        const types = subProduct?.data.options.flatMap(el => el.type)
        const uniqueTypes = types?.filter(
            (el, index, arr) => arr.indexOf(el) === index
        )

        return (
            uniqueTypes?.map(el => ({
                type: el,
                label: ProductContentOptions.find(i => i.value == el.toString())
                    ?.label,
                options: subProduct?.data.options.filter(i => i.type == el),
            })) ?? []
        )
    }

    const editPermissions = getPermission(ContentType.Product, [
        Action.UPDATE,
        Action.ALL,
    ])

    const deletePermissions = getPermission(ContentType.Product, [
        Action.DELETE,
        Action.ALL,
    ])

    const {mutate, isPending} = useDeleteSubProduct(() => {
        close()
        navigate(`/services/products/${productId}`)
    })


    const handleDelete = () => {
        showConfirm({
            theme: "warning",
            title: "Please confirm!",
            message: `Are you sure about deleting item sub-product`,
            render: () => (
                <div className="flex justify-end gap-x-4">
                    <Button intent="danger" size="sm" onClick={close}>
                        Cancel
                    </Button>
                    <Button
                        intent="primary"
                        size="sm"
                        loading={isPending}
                        onClick={() => mutate(subProductId!)}
                    >
                        Continue
                    </Button>
                </div>
            ),
        })
    }

    return (
        <AsyncData
            loading={isLoading}
            loader={
                <LoadingIndicator
                    loading={isLoading}
                    className="h-screen"
                />
            }
            fallback={""}
            data={subProduct?.data}
        >
            {item => (
                <>
                    <div className={"w-full flex justify-end gap-2 mb-2"}>
                        <div className="flex gap-4 items-center">
                            <AccessGuard permissions={editPermissions}>
                                <Button intent={"primary"} leftIcon={<IconEdit className="size-4"/>}
                                        onClick={() => navigate(`/services/products/${productId}/edit-sub-product?subProductId=${subProductId}`)}
                                >
                                    Edit
                                </Button>
                            </AccessGuard>
                            <AccessGuard
                                permissions={deletePermissions}
                            >
                                <Button
                                    intent="danger"
                                    leftIcon={
                                        <IconTrash className="size-4"/>
                                    }
                                    onClick={handleDelete}
                                >
                                    Delete
                                </Button>
                            </AccessGuard>
                        </div>
                    </div>
                    <section className="p-6 bg-tertiary-accent/50 border border-tertiary-accent/70 rounded-md mb-8">
                        <div className="space-y-4">
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
                                                            el.type == 1
                                                        }
                                                    >
                                                        <ListItem
                                                            key={opt.id}
                                                        >
                                                            {
                                                                opt.content
                                                            }
                                                        </ListItem>

                                                        <CircularListItem
                                                            figure={
                                                                index
                                                            }
                                                            key={opt.id}
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
                        </div>
                    </section>
                </>)}</AsyncData>

    );
};

export default SubProductDetails;
