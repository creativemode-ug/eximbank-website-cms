import { useDeleteDocument, usePublishDocument } from "@/features/forms-and-guide/repositories";
import type { Document } from "@/features/forms-and-guide/types";
import { IconBallpen, IconTrash } from "@tabler/icons-react";
import { SlideOver, SlideOverHead, SlideOverPanel } from "@/components/slide-over";
import { useLocation, useNavigate } from "react-router-dom";
import { Action, ContentType, getPermission } from "@/guards/access_guard/permissions";
import DataList, { DataListItemProps,  } from "@/components/data-list";

import useDialog from "@/components/Dialog/useDialog";
import ActionButton from "@/components/Buttons/action-button";
import Button from "@/components/Buttons/Button";
import SwitchInput from "@/components/FormControlls/SwitchInput";
import AccessGuard from "@/guards/access_guard";
import useRouteModal from "@/hooks/useRouterModal";





export default function DocumentDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const document = location.state as Document
    
    const { open, closeModal } = useRouteModal();
    const { showConfirm, close } = useDialog();

    const publishMutation = usePublishDocument();

    const deleteMutation = useDeleteDocument(
        () => close()
    );

    const editDocument = () => {
        navigate(
            `/forms-and-guide/${document.id}/update`, {
            state: document
        })
    }

    const deleteDocument = () => {
        showConfirm({
            theme: "warning",
            title: "Please confirm!",
            message: `Are you sure about deleting item: ${document.title}`,
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
                        loading={deleteMutation.isPending}
                        onClick={() => deleteMutation.mutate(document.id ?? "")}
                    >
                        Continue
                    </Button>
                </div>
            )
        })
    }

    const editPermissions = getPermission(ContentType.Document, [Action.UPDATE, Action.ALL])
    const deletePermissions = getPermission(ContentType.Document, [Action.DELETE, Action.ALL])

    const documentInfo: DataListItemProps[] = [
        {
            label: "ID", 
            value: document.id 
        },
        { 
            label: "Document Name", 
            value: document.title
        },
        { 
            label: "Slug", 
            value: document.slug
        },
        { 
            label: "Document Type", 
            value: document.type
        },
        { 
            label: "Date modified", 
            value: new Date(document.created_at).toLocaleString()
        },
        { 
            label: "Date create", 
            value: new Date(document.updated_at).toLocaleString()
        },
    ];


    return (
        <SlideOver isOpen={open} onClose={closeModal}>
            <SlideOverPanel childClassName="w-full md:max-w-lg">
                <SlideOverHead 
                    title={document.title ?? ""} 
                    description={""} 
                    onClose={closeModal}
                >
                    <div className="flex justify-end items-center space-x-2">
                        
                        <AccessGuard permissions={editPermissions}>
                            <ActionButton onClick={editDocument}>
                                <IconBallpen className="h-4 w-4" />
                            </ActionButton>
                        </AccessGuard>

                        <AccessGuard permissions={deletePermissions}>
                            <ActionButton onClick={deleteDocument}>
                                <IconTrash className="h-4 w-4" />
                            </ActionButton>
                        </AccessGuard>
                        
                    </div>
                </SlideOverHead>

                <div className="p-8">
                    <div className="overflow-hidden mb-8">
                        <img 
                            src={document.cover_image} 
                            alt={document.slug}
                            className="w-auto h-56 object-cover rounded-lg"
                        />
                    </div>

                    <div className="space-y-8">
                        <DataList items={documentInfo} className="space-y-4" />

                        <div className="flex justify-between space-x-4">
                            <SwitchInput 
                                value={document.is_published ? true : false}
                                text="Is Published"
                                onChange={(value) => publishMutation.mutate({
                                    id: document.id,
                                    is_published: value ? 1 : 0
                                })}
                            />

                            <SwitchInput 
                                value={document.is_featured ? true : false}
                                text="Is Featured"
                                onChange={(value) => publishMutation.mutate({
                                    id: document.id,
                                    is_published: value ? 1 : 0
                                })}
                            />
                        </div>
                    </div>
                </div>
            </SlideOverPanel>
        </SlideOver>
    )
}
